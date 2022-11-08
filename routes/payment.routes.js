const { Router } = require('express')
const { payWithStripe } = require('../controller/payment.controller')
const paymentRoutes = Router()

paymentRoutes.post('/stripe', payWithStripe)

module.exports = {
  paymentRoutes
}