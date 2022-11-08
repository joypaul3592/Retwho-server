const { InventoryModel } = require("../model/inventory.model")
const { errorMessageFormatter } = require("../utils/helpers")
const { validateObjectId } = require("../utils/validators")
const { doesProductExists } = require("./product.controller")

const getAllInventory = async (req, res) => {
  try {
    const filterOptions = { ...req.query, user: req.user._id }

    const inventory = await InventoryModel.find(filterOptions)

    return res.status(200).json({ inventory })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const addToInventory = async (req, res) => {
  try {
    const data = req.body

    const isProduct = await doesProductExists(data)
    if(!isProduct) return res.status(404).json({ error: 'Product does not exists.'})

    data.buying_price = isProduct.prices[req.user.priceType]

    const inventory = await InventoryModel.create({ ...data, user: req.user._id })
    return res.status(200).json({ inventory })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateInventory = async (req, res) => {
  try {
    const invId = req.query.invId
    const data = req.body

    const isValidId = validateObjectId(invId)
    if(!isValidId) return res.status(404).json({ error: 'Item does not exists' })

    const inventory = await InventoryModel.updateOne({ _id: invId, user: req.user._id }, data, { new: true })
    if(!inventory) return res.status(404).json({ error: 'Item does not exists' })

    return res.status(200).json({ inventory })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const deleteInventoryItem = async (req, res) => {
  try {
    const invId = req.query.invId
    
    const isValidId = validateObjectId(invId)
    if(!isValidId) return res.status(403).json({ error: 'Item does not exists.'})

    const item = await InventoryModel.find({ _id: invId })
    if(!item) return res.status(404).json({ error: 'Item not found.'})

    const deleted = await InventoryModel.deleteOne({ _id: invId, user: req.user._id })

    return res.status(200).json({ deleted })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  getAllInventory,
  addToInventory,
  updateInventory,
  deleteInventoryItem
}