const { default: mongoose } = require("mongoose")
const { CartModel } = require("../model/cart.model")
const { errorMessageFormatter } = require("../utils/helpers")
const { doesProductExists } = require("./product.controller")
const { getSubscription } = require("./shop.controller")

const getValidatedProduct = async (item, user) => {
  try {
    const product = await doesProductExists(item)
    if(!product) throw new Error('Product does not exists.')
    
    const productPrice = await getSubscription(product.shop, user._id)
    if(!productPrice) throw new Error('User is not subscribed.')

    let net_total = item.quantity * product.prices[productPrice.subscription]
      
    if(product.tax) {
      const TAX = 1 + product.tax/100
      net_total = net_total * TAX
    }

    return {
        net_total,
        product: {
        product: product._id,
        shop: product.shop,
        quantity: item.quantity,
        in_stock: product.quantity,
        total: net_total,
        price: product.prices[productPrice.subscription]
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

const getCartById = async (cid, user) => {
  try {
    const filterOptions = {
      _id: mongoose.Types.ObjectId(cid),
      user: mongoose.Types.ObjectId(user._id)
    }
    const cart = await CartModel.aggregate([
      { $match: filterOptions },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" }
    ])

    return cart[0]
  } catch (err) {
    throw new Error(err)
  }
}

const addToCart = async (req, res) => {
  try {
    const items = req.body.items

    const doesItemExists = await CartModel.findOne({ 'items.product': items[0].product })
    if(doesItemExists) return res.status(400).json({ error: `Item already exists at cart._id: ${doesItemExists._id}` })

    const { product, net_total } = await getValidatedProduct(items[0], req.user)

    const cart = await CartModel.findOneAndUpdate({ user: req.user._id, shop: product.shop }, { $push: { items: product }, $inc: { net_total } }, { upsert: true, new: true })

    return res.status(200).json({ cart })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getCartItems = async (req, res) => {
  try {
    const filterOptions = {
      _id: mongoose.Types.ObjectId(req.user._id)
    }
    const cart = await CartModel.find({ user: req.user._id }).populate('items.product user shop', 'productName name quantity')

    if(!cart) return res.status(200).json({ cart: null })

    return res.status(200).json({ cart })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateCartItemQuantity = async (req, res) => {
  try {
    const { items } = req.body

    const { product, net_total } = await getValidatedProduct(items[0], req.user)

    const prevProduct = await CartModel.findOne({ user: req.user._id, 'items._id': items[0]._id }, { 'items.$': true })

    if(!prevProduct) return res.status(404).json({ error: 'Cart item not found.'})

    const prev = prevProduct.items[0]

    const cart = await CartModel.findOneAndUpdate({ user: req.user._id, 'items._id': items[0]._id }, { $set: { 'items.$': product }, $inc: { net_total: net_total - prev.total } }, { new: true })

    return res.status(200).json({ cart })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const removeFromCart = async (req, res) => {
  try {
    const { cid, prodId } = req.query

    if(!cid || !prodId) return res.status(400).json({ error: "cid and prodId query params are required." })

    const prev = await CartModel.findOne({ user: req.user._id, _id: cid }, { items: { product: prodId, total: true }, net_total: true})

    const cart = await CartModel.findOneAndUpdate({ user: req.user._id, _id: cid }, { $pull: { items: { product: prodId }}, $inc: { net_total: (prev.items[0].total * -1) }}, { new: true })

    if(!cart) return res.status(404).json({ error: 'No cart found.'})

    return res.status(200).json({ cart })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const deleteCart = async (req, res) => {
  try {
    const { cid } = req.query

    if(!cid) return res.status(400).json({ error: "cid query param is required." })

    const cart = await CartModel.deleteOne({ user: req.user._id, _id: cid })

    if(!cart) return res.status(404).json({ error: 'No cart found.'})

    return res.status(200).json({ cart })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}


module.exports = {
  getCartById,
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  deleteCart
}