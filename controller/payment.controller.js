const { isValidObjectId } = require("mongoose")
const { chargeForSale } = require("../config/stripe.config")
const { SaleModel } = require("../model/sale.model")
const { errorMessageFormatter } = require("../utils/helpers")

const payWithStripe = async (req, res) => {
  try {
    const { saleId } = req.query
    const { source } = req.body

    if(!isValidObjectId(saleId)) return res.status(400).json({ error: 'Invalid sale id.'})
    if(!source) return res.status(400).json({ error: 'No source information provided.'})

    const sale = await SaleModel.findById(saleId)

    if(!sale) return res.status(404).json({ error: 'Sale not found.'})

    const charge = await chargeForSale(sale, source)

    return res.status(200).json({ charge })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  payWithStripe
}