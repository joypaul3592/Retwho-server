const moment = require('moment')
const { default: mongoose } = require('mongoose')
const { ProductModel } = require("../model/product.model")
const { SaleModel } = require("../model/sale.model")
const { Roles } = require("../utils/constants")
const { errorMessageFormatter } = require("../utils/helpers")

const getActivity = async (req, res) => {
  try {
    const filterOptions = {}

    if(req.user.role !== Roles.ADMIN) filterOptions.shop = mongoose.Types.ObjectId(req.user.shop)

    const sales = await SaleModel.aggregate([
      { $match: filterOptions },
      {
        $group: {
          _id: 1,
          total_sales: {
            $sum: '$net_total'
          },
          total_purchases: {
            $sum: 1
          },
          total_revenue: {
            $sum: '$revenue'
          }
        }
      },
      {
        $project: {
          total_sales: true,
          total_purchases: true,
          total_revenue: true
        }
      }
    ])

    const products = await ProductModel.aggregate([
      { $match: filterOptions },
      {
        $group: {
          _id: 1,
          sold_amounts: {
            $sum: '$sold_amount'
          },
          total_products: {
            $sum: 1
          },
          total_stock: {
            $sum: '$quantity'
          }
        }
      },
      {
        $project: {
          sold_amounts: true,
          total_products: true,
          total_stock: true
        }
      }
    ])

    return res.status(200).json({ sales: sales[0], products: products[0] })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}


const getSaleChartReport = async (req, res) => {
  try {
    let { fromDate, toDate } = req.query

    fromDate = fromDate ? moment(fromDate).startOf('day').toDate() : moment(fromDate).startOf('day').subtract(7, 'days').toDate()
    toDate = toDate ? moment(toDate).endOf('day').toDate() : moment(toDate).startOf('day').subtract(1, 'days').toDate()

    const filterOptions = {
      createdAt: {
        $gte: fromDate,
        $lte: toDate
      }
    }

    if(req.user.role !== Roles.ADMIN) filterOptions.shop = mongoose.Types.ObjectId(req.user.shop)

    const sales = await SaleModel.aggregate([
      { $match: filterOptions },
      { $group: {
          _id: {
            $add: [
            { $dayOfYear: "$createdAt"}, 
            { $multiply: 
              [400, {$year: "$createdAt"}]
            }
          ]},   
          revenues: {
            $push: '$revenue'
          },
          net_totals: {
            $push: '$net_total'
          },
          total_sale: {
            $sum: '$net_total'
          },
          total_revenue: {
            $sum: '$revenue'
          },
          sales: {
            $sum: 1
          },
          first: { $min: "$createdAt" }
        }
      },
      { $sort: {_id: -1} },
      { $limit: 15 },
      { $project: { 
          _id: false,
          revenues: true,
          total_sale: true,
          net_totals: true,
          total_revenue: true,
          sales: true,
          createdAt: {
            $dateToString:{format: "%Y-%m-%d", date: "$first"}
          }
        } 
      }
    ])


    return res.status(200).json({ fromDate, toDate, sales })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  getActivity,
  getSaleChartReport
}