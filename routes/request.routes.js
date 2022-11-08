const { Router } = require('express')
const { requestShop, getAllRequests, updateRequestApproval, connectWholesellerToRetailer } = require('../controller/request.controller')
const { Only_Admin, Can_User_Modify } = require('../middleware/auth.middleware')
const requestRoutes = Router()


requestRoutes.post('/', requestShop)
requestRoutes.get('/', Can_User_Modify, getAllRequests)
requestRoutes.put('/', Only_Admin, updateRequestApproval)

requestRoutes.post('/connect', Only_Admin, connectWholesellerToRetailer)


module.exports = {
  requestRoutes
}