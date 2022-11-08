const { Router } = require('express')
const { createShop, updateShop, getAllShops, deleteShop } = require('../controller/shop.controller')
const { Can_User_Modify } = require('../middleware/auth.middleware')
const shopRoutes = Router()


shopRoutes.post('/', Can_User_Modify, createShop)
shopRoutes.put('/', Can_User_Modify, updateShop)
shopRoutes.get('/', getAllShops)
shopRoutes.delete('/', Can_User_Modify, deleteShop)

module.exports = {
  shopRoutes
}