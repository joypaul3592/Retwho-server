const { Router } = require('express')
const { createSale, getSaleReport, updateSale, createPosSale, getSaleReportsAll, createDirectSale } = require('../controller/sale.controller')
const { Can_User_Sale } = require('../middleware/auth.middleware')
const saleRoutes = Router()


saleRoutes.post('/', Can_User_Sale, createSale)
saleRoutes.put('/', Can_User_Sale, updateSale)
saleRoutes.get('/', getSaleReport)
saleRoutes.get('/report', getSaleReportsAll)

saleRoutes.post('/pos', Can_User_Sale, createPosSale)
saleRoutes.post('/direct', Can_User_Sale, createDirectSale)

module.exports = {
  saleRoutes
}