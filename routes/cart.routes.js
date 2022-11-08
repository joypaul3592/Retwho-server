const { Router } = require('express')
const { addToCart, updateCartItemQuantity, getCartItems, removeFromCart, deleteCart } = require('../controller/cart.controller')
const { Can_User_Sale } = require('../middleware/auth.middleware')
const cartRoutes = Router()


cartRoutes.post('/', Can_User_Sale, addToCart)
cartRoutes.patch('/', Can_User_Sale, updateCartItemQuantity)
cartRoutes.put('/', Can_User_Sale, removeFromCart)
cartRoutes.get('/', getCartItems)
cartRoutes.delete('/', Can_User_Sale, deleteCart)

module.exports = {
  cartRoutes
}