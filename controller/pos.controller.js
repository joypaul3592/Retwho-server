const { default: mongoose } = require("mongoose")
const { PosModel } = require("../model/pos.model")
const { errorMessageFormatter, getBillMarkup, generatePdf } = require("../utils/helpers")
const { isShopOwner } = require("./shop.controller")

const getPos = async (pid, user) => {
  try {
    const pos = await PosModel.findOne({ _id: pid, user: user._id }).populate('user sold_to', 'name email')
    return pos
  } catch (error) {
    throw new Error(error)
  }
}

const savePos = async (req, res) => {
  try {
    const data = req.body

    const shop = await isShopOwner(req.user._id)
    if(!shop) return res.status(404).json({ error: 'Shop does not exists.' })

    const pos = await PosModel.create({ ...data, shop: shop._id, user: req.user._id })

    return res.status(201).json({ pos })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getPosById = async (req, res) => {
  try {
    const { posId } = req.query

    const filterOptions = {
      user: mongoose.Types.ObjectId(req.user._id)
    }

    if(posId) filterOptions._id = mongoose.Types.ObjectId(posId)

    const pos = await PosModel.aggregate([
      { $match: filterOptions },
      {
        $lookup: {
          from: 'shops',
          localField: 'shop',
          foreignField: '_id',
          as: 'shop',
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          let: {
            items: '$items'
          },
          as: 'items',
          pipeline: [
            {
              $project: {
                name: "$productName",
                total: {
                  $first: {
                    $filter: {
                      input: '$$items',
                      as: 'products',
                      cond: {
                        $eq: ['$$products.product', '$_id']
                      }
                    }
                  }
                }
              }
            },
            {
              $replaceRoot: { newRoot: { $mergeObjects: [ '$total', "$$ROOT" ] } }
            }
          ]
        }
      },
      { $unwind: '$shop' },
      { $unwind: '$user' },
      {
        $project: {
          items: {
            product: true,
            uniqueCode: true,
            quantity: true,
            price: true,
            name: true
          },
          user: {
            name: '$user.name',
            email: '$user.email',
            companyEmail: '$user.companyEmail',
          },
          shop: {
            name: '$shop.name',
            email: '$shop.email',
            companyEmail: '$shop.companyEmail',
          },
          net_total: true,
          tax: true,
          payment_method: true,
          paid_amount: true,
          return_amount: true,
          createdAt: true,
          updatedAt: true,
          __v: true
        }
      }
    ])


    if(!pos) return res.status(404).json({ error: "POS not found."})

    return res.status(200).json({ pos })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updatePos = async (req, res) => {
  try {
    const { posId } = req.query
    const { user, ...data } = req.body

    if(!posId) return res.status(400).json({ error: "?posId query is required."})

    const pos = await PosModel.findOneAndUpdate({ _id: posId, user: req.user._id }, data, { new: true })
    if(!pos) return res.status(404).json({ error: "POS not found."})

    return res.status(200).json({ pos })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const deletePos = async (req, res) => {
  try {
    const { posId } = req.query
    if(!posId) return res.status(400).json({ error: "?posId query is required."})

    const pos = await PosModel.deleteOne({ _id: posId,user: req.user._id })

    return res.status(200).json({ pos })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getPosPdf = async (req, res) => {
  try {
    const { posId } = req.query
    if(!posId) return res.status(400).json({ error: "?posId query is required."})

    const filterOptions = {
      _id: mongoose.Types.ObjectId(posId),
      user: mongoose.Types.ObjectId(req.user._id)
    }

    const pos = await PosModel.aggregate([
      { $match: filterOptions },
      {
        $lookup: {
          from: 'shops',
          localField: 'shop',
          foreignField: '_id',
          as: 'shop',
        }
      },
      {
        $lookup: {
          from: 'shops',
          localField: 'sold_to',
          foreignField: '_id',
          as: 'sold_to',
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          let: {
            items: '$items'
          },
          as: 'items',
          pipeline: [
            {
              $project: {
                name: "$productName",
                total: {
                  $first: {
                    $filter: {
                      input: '$$items',
                      as: 'products',
                      cond: {
                        $eq: ['$$products.product', '$_id']
                      }
                    }
                  }
                }
              }
            },
            {
              $replaceRoot: { newRoot: { $mergeObjects: [ '$total', "$$ROOT" ] } }
            }
          ]
        }
      },
      { $unwind: '$shop' },
      { $unwind: '$sold_to' },
      { $unwind: '$user' },
      {
        $project: {
          items: {
            product: true,
            uniqueCode: true,
            quantity: true,
            price: true,
            name: true,
            total: true
          },
          user: {
            name: '$user.name',
            email: '$user.email',
            companyEmail: '$user.companyEmail',
          },
          shop: {
            name: '$shop.name',
            email: '$shop.email',
            companyEmail: '$shop.companyEmail',
            streetAddress: '$shop.streetAddress',
            state_province_region: '$shop.state_province_region',
          },
          sold_to: {
            name: '$sold_to.name',
            email: '$sold_to.email',
            companyEmail: '$sold_to.companyEmail',
            streetAddress: '$sold_to.streetAddress',
            state_province_region: '$sold_to.state_province_region',
          },
          net_total: true,
          tax: true,
          payment_method: true,
          paid_amount: true,
          return_amount: true,
          createdAt: true,
          updatedAt: true,
          __v: true
        }
      }
    ])

    if(!pos) return res.status(404).json({ error: "POS not found."})

    const billMarkup = getBillMarkup(pos[0])
    const { pdf, location } = await generatePdf(billMarkup)
    
    return res.status(200).send({ pdf, location })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  getPos,
  savePos,
  getPosById,
  updatePos,
  deletePos,
  getPosPdf
}