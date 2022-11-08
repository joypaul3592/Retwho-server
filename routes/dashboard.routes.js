const { Router } = require('express')
const { getActivity, getSaleChartReport } = require('../controller/dashboard.controller')
const dashboardRoutes = Router()

dashboardRoutes.get('/', getActivity)
dashboardRoutes.get('/sale', getSaleChartReport)

module.exports = {
  dashboardRoutes
}