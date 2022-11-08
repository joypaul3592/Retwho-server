const moment = require('moment')
const { default: mongoose } = require('mongoose')
const { chargeForSale } = require('../config/stripe.config')
const { SaleModel } = require('../model/sale.model')
const { DefaultDays, SalePaymentMethod, SalePaymentStatus, Roles, ResultLimit } = require('../utils/constants')
const { errorMessageFormatter } = require('../utils/helpers')
const { getCartById } = require('./cart.controller')
const { getPos } = require('./pos.controller')
const { doesProductExists, updatedProductQuantity } = require('./product.controller')


// const getValidSales = async (items) => {
//   const validProducts = []
//   let net_total = 0
//   const errors = []

//   for(idx in items) {
//     try {
//       const isProduct = await doesProductExists(items[idx])
    
//       if(!isProduct) {
//         errors.push(`Product: ${items[idx].product} does not exists.`)
//         continue
//       }

//       if(isProduct.quantity < items[idx].quantity) {
//         errors.push(`Product: ${items[idx].product} is avaiable of quantity ${isProduct.quantity}.`)
//         continue
//       }

//       console.log(isProduct)

//       let total = items[idx].quantity * isProduct.prices['basic']
      
//       if(isProduct.tax) {
//         const TAX = 1 + isProduct.tax/100
//         total = total * TAX
//       }

//       net_total += total
//       console.log(isProduct)
//       const validProduct = {
//         ...items[idx], total, shop: isProduct.shop, uniqueCode: isProduct.uniqueCode, productName: isProduct.productName,  price: isProduct.prices[priceType]
//       }


//       validProducts.push(validProduct)
//     } catch (err) {
//       errors.push(err)
//     }
//   }

//   return { validProducts, net_total, errors }
// }

const createDirectSale = async (req, res) => {
  try {
    const { saleData, method, source } = req.body

    if(!SalePaymentMethod.has(method)) throw new Error({ message: "Payment method (?method=card|cash|check) is required." })
    
    let charge = {
      id: null
    }

    const items = []
    const errors = []

    let revenue = 0

    for(idx in saleData.items) {
      const product = await doesProductExists(saleData.items[idx])
      
      if(!product) {
        errors.push({
          type: 'product not found',
          _id: saleData.items[idx].product,
          name: saleData.items[idx].productName
        })
        saleData.net_total = saleData.net_total - saleData.items[idx].total
      } else if (product.quantity < saleData.items[idx].quantity) {
        errors.push({
          type: 'unavailable',
          _id: saleData.items[idx].product,
          name: saleData.items[idx].productName
        })
        saleData.net_total = saleData.net_total - saleData.items[idx].total
      } else {
        revenue += saleData.items[idx].total - (product.buying_price * saleData.items[idx].quantity)
        items.push({
          product: product._id,
          productName: product.productName, 
          uniqueCode: product.uniqueCode,
          quantity: saleData.items[idx].quantity,
          price: saleData.items[idx].price,
          total: saleData.items[idx].total
        })
      }
    }

    if(method === 'card' && paid_amount <= 0.49) return res.status(400).json({ error: 'Invalid paid amount.' })

    if(method === 'card' && !source) {
      throw new Error({ message: "Source token is required as payload." })
    } else if (method === 'card') {
      charge = await chargeForSale(
        source,
        {
          paid_amount: saleData.paid_amount,
          payment_from: saleData.sold_to,
          payment_to: saleData.shop
        }
      )
      if(!charge.status) throw new Error({ message: "Payment failed. See charge for more information." })
    }

    const saleReport = await SaleModel.create({
      revenue,
      items: items,
      paid_amount: saleData.paid_amount,
      shipping_address: saleData.shipping_address,
      net_total: saleData.net_total,
      payment_method: saleData.payment_method,
      shop: req.user.shop,
      user: {
        _id: req.user._id,
        name: saleData.name
      },
      card_payment_id: charge.id
    })
    
    await saleReport.populate('items.product user shop', 'name')

    // decrease product quantity
    saleReport.items.forEach(item => {
      updatedProductQuantity(item.product, { $inc: { quantity: item.quantity * -1, sold_amount: item.quantity * 1 }})
    })

    return res.status(200).json({ saleReport, errors })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const createSale = async (req, res) => {
  try {
    const { cid, method } = req.query
    const { source, paid_amount, shipping_address } = req.body

    if(!cid) return res.status(400).json({ error: 'Missing ?cid= param.' })
    if(!SalePaymentMethod.has(method) || !shipping_address) return res.status(400).json({ error: 'Invalid payment method or shipping address.' })
    
    if(method === 'card' && paid_amount <= 0.49) return res.status(400).json({ error: 'Invalid paid amount.' })

    const cart = await getCartById(cid, req.user)
    
    if(!cart) return res.status(404).json({ error: 'Cart not found.' })

    const items = []
    const errors = []

    let revenue = 0

    for(idx in cart.items) {
      const product = await doesProductExists(cart.items[idx])
      
      if(!product) {
        errors.push({
          type: 'product not found',
          _id: cart.items[idx].product,
          name: cart.items[idx].productName
        })
        cart.net_total = cart.net_total - cart.items[idx].total
      } else if (product.quantity < cart.items[idx].quantity) {
        errors.push({
          type: 'unavailable',
          _id: cart.items[idx].product,
          name: cart.items[idx].productName
        })
        cart.net_total = cart.net_total - cart.items[idx].total
      } else {
        revenue += cart.items[idx].total - (product.buying_price * cart.items[idx].quantity)
        items.push({
          product: product._id,
          productName: product.productName, 
          uniqueCode: product.uniqueCode,
          quantity: cart.items[idx].quantity,
          price: cart.items[idx].price,
          total: cart.items[idx].total
        })
      }
    }

    let charge = {
      id: null
    }

    if(method === 'card' && !source) {
      return res.status(400).json({ error: "Source token is required as payload." })
    } else if (method === 'card') {
      charge = await chargeForSale(
        source,
        {
          paid_amount,
          payment_from: req.user.shop,
          payment_to: cart.shop
        }
      )
      if(!charge.status) return res.status(400).json({
        charge,
        error: "Payment failed. See charge for more information."
      })
    }

    const saleReport = await SaleModel.create({
      revenue,
      items,
      paid_amount,
      shipping_address,
      payment_method: method,
      user: {
        _id: req.user._id,
        name: cart.user.name
      },
      shop: cart.shop,
      net_total: cart.net_total
    })
    
    await saleReport.populate('items.product user shop', 'name')

    // decrease product quantity
    saleReport.items.forEach(item => {
      updatedProductQuantity(item.product, { $inc: { quantity: item.quantity * -1, sold_amount: item.quantity * 1 }})
    })

    return res.status(200).json({ saleReport, errors })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getSaleReport = async (req, res) => {
  try {
    const query = req.query

    const days = parseInt(query.days) ?? DefaultDays

    const dateFrom = moment(query.startDate).endOf('day').toDate()
    const dateTo = moment(query.startDate).startOf('day').subtract(days - 1, 'days').toDate()
    
    const reportOptions = {
      filter: {
        createdAt: {
          $lte: dateFrom,
          $gte: dateTo
        }
      },
      sort: {
        createdAt: +query.sort
      }
    }

    if(req.user.role !== Roles.ADMIN) reportOptions.filter.shop = mongoose.Types.ObjectId(req.user.shop)

    const saleReport = await SaleModel.aggregate([
      { $match: reportOptions.filter },
      { $sort: reportOptions.sort },
      {
        $group: {
          _id: "$shop",
          reports: {
            $push: {
              user: "$user",
              items: "$items",
              shipping_status: '$shipping_status',
              payment_status: "$payment_status",
              payment_method: "$payment_method",
              card_payment_id: "$card_payment_id",
              return_amount: "$return_amount",
              net_total: '$net_total',
              paid_amount: '$paid_amount',
              due_amount: '$due_amount',
              _id: "$_id"
            },
          },
          total_sale: {
            $sum: "$net_total"
          },
          total_paid_amount: {
            $sum: "$paid_amount"
          },
          total_due_amount: {
            $sum: "$due_amount"
          }
        }
      },
      {
        $lookup: {
          from: 'shops',
          localField: '_id',
          foreignField: '_id',
          as: 'shop',
        }
      },
      { $unwind: '$shop'},
      {
        $project: {
          user: true,
          reports: true,
          shop: {
            _id: '$shop._id',
            name: '$shop.name'
          },
          total_sale: true,
          total_paid_amount: true,
          total_due_amount: true,
        }
      }
    ])

    return res.status(200).json({ saleReport })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateSale = async (req, res) => {
  try {
    const { sid } = req.query
    const { paid_amount, shipping_status, shipping_address, payment_method, source } = req.body
    let { payment_status } = req.body

    let charge = {
      id: null
    }

    const filterOptions = {
      _id: sid
    }

    if(req.user.role !== Roles.ADMIN) {
      filterOptions.shop = req.user.shop
    }

    const prevSale = await SaleModel.findOne({ ...filterOptions }, { net_total: true, payment_status: true })

    let due_amount = prevSale.net_total - paid_amount
    let return_amount = 0
    
    if(due_amount <= 0) payment_status = SalePaymentStatus.PAID
    else if(due_amount && payment_status === SalePaymentStatus.PAID) return res.status(400).json({ error: `Payment is due ${due_amount} and cannot be set to be paid.` })

    if(!SalePaymentMethod.has(payment_method)) return res.status(400).json({ error: "Payment method (?method=card|cash|check) is required." })
    
    if(payment_method === 'card' && !source) {
      return res.status(400).json({ error: "Source token is required as payload." })
    } else if (payment_method === 'card') {
      charge = await chargeForSale(
        source,
        {
          paid_amount,
          payment_from: req.user.shop,
          payment_to: cart.shop
        }
      )

      if(!charge.status) return res.status(400).json({
        charge,
        error: "Payment failed. See charge for more information."
      })
    }
    
    if(due_amount < 0) {
      return_amount = Math.abs(due_amount)
      due_amount = 0
    }

    const sale = await SaleModel.findOneAndUpdate(
      { ...filterOptions }, 
      { 
        paid_amount, 
        shipping_status, 
        shipping_address, 
        payment_status, 
        payment_method,
        due_amount,
        return_amount
      }, 
      { new: true }
    )

    return res.status(200).json({ sale })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const createPosSale = async (req, res) => {
  try {
    const { pid, method } = req.query
    const { source } = req.body

    const pos = await getPos(pid, req.user)
    
    if(!pos) return res.status(404).json({ error: 'Pos not found.' })

    if(!SalePaymentMethod.has(method)) return res.status(400).json({ error: "Payment method (?method=card|cash|check) is required." })
    
    let charge = {
      id: null
    }

    if(method === 'card' && !source) {
      return res.status(400).json({ error: "Source token is required as payload." })
    } else if (method === 'card') {
      charge = await chargeForSale(
        source,
        {
          paid_amount: pos.paid_amount,
          payment_from: pos.sold_to,
          payment_to: pos.shop
        }
      )
      if(!charge.status) return res.status(400).json({
        charge,
        error: "Payment failed. See charge for more information."
      })
    }

    const items = []
    const errors = []

    let revenue = 0

    for(idx in pos.items) {
      const product = await doesProductExists(pos.items[idx])
      
      if(!product) {
        errors.push({
          type: 'product not found',
          _id: pos.items[idx].product,
          name: pos.items[idx].productName
        })
        pos.net_total = pos.net_total - pos.items[idx].total
      } else if (product.quantity < pos.items[idx].quantity) {
        errors.push({
          type: 'unavailable',
          _id: pos.items[idx].product,
          name: pos.items[idx].productName
        })
        pos.net_total = pos.net_total - pos.items[idx].total
      } else {
        revenue += pos.items[idx].total - (product.buying_price * pos.items[idx].quantity)
        items.push({
          product: product._id,
          productName: product.productName, 
          uniqueCode: product.uniqueCode,
          quantity: pos.items[idx].quantity,
          price: pos.items[idx].price,
          total: pos.items[idx].total
        })
      }
    }

    const saleReport = await SaleModel.create({
      revenue,
      items,
      paid_amount: pos.paid_amount,
      shipping_address: pos.shipping_address,
      net_total: pos.net_total,
      payment_method: pos.payment_method,
      shop: pos.shop,
      user: {
        _id: req.user._id,
        name: pos.name
      },
      card_payment_id: charge.id
    })
    
    await saleReport.populate('items.product user shop', 'name')

    // decrease product quantity
    saleReport.items.forEach(item => {
      updatedProductQuantity(item.product, { $inc: { quantity: item.quantity * -1, sold_amount: item.quantity * 1 }})
    })

    return res.status(200).json({ saleReport, errors })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getSaleReportsAll = async (req, res) => {
  try {
    const { _id, shop, page, sort, payment_status, limit } = req.query
    let { fromDate, toDate } = req.query

    if(!page || !sort) return res.status(400).json({ error: '?page= and ?sort= params are required.' })

    fromDate = fromDate ? moment(fromDate).startOf('day').toDate() : moment(fromDate).startOf('day').subtract(7, 'days').toDate()
    toDate = toDate ? moment(toDate).endOf('day').toDate() : moment(toDate).startOf('day').subtract(1, 'days').toDate()
    
    const reportOptions = {
      filter: {
        createdAt: {
          $gte: fromDate,
          $lte: toDate
        }
      },
      sort: {
        createdAt: +sort
      }
    }

    if(shop) {
      reportOptions.filter.shop = mongoose.Types.ObjectId(shop)
    }
    if(req.user.role !== Roles.ADMIN) {
      reportOptions.filter.shop = mongoose.Types.ObjectId(req.user.shop)
    }
    if(_id) {
      delete reportOptions.filter.createdAt
      reportOptions.filter._id = mongoose.Types.ObjectId(_id)
    }
    if(payment_status) reportOptions.filter.payment_status = payment_status

    const skip = limit ? +page * limit : +page * ResultLimit

    const saleReports = await SaleModel.aggregate([
      { $match: reportOptions.filter },
      { $sort: reportOptions.sort },
      { $skip: skip },
      { $limit: +limit || ResultLimit },
      {
        $lookup: {
          from: 'shops',
          localField: 'shop',
          foreignField: '_id',
          as: 'shop',
          pipeline: [{
            $project: {
              name: "$name",
              companyPhone: "$companyPhone",
              state_province_region: "$state_province_region",
              streetAddress: "$streetAddress",
            }
          }]
        }
      },
      { $unwind: '$shop'},
    ])

    const totalReports = await SaleModel.count(reportOptions.filter)

    return res.status(200).json({ totalReports, saleReports })

  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}


module.exports = {
  createDirectSale,
  createSale,
  getSaleReport,
  // getValidSales,
  updateSale,
  createPosSale,
  getSaleReportsAll
}