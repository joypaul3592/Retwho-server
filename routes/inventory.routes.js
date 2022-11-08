const { Router } = require('express')
const { getAllInventory, addToInventory, updateInventory, deleteInventoryItem } = require('../controller/inventory.controller')
const { Can_User_Modify } = require('../middleware/auth.middleware')
const inventoryRoutes = Router()


inventoryRoutes.get('/', getAllInventory)
inventoryRoutes.post('/', Can_User_Modify, addToInventory)
inventoryRoutes.put('/', Can_User_Modify, updateInventory)
inventoryRoutes.delete('/', Can_User_Modify, deleteInventoryItem)

module.exports = {
  inventoryRoutes
}