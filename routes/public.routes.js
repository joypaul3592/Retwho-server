const { Router } = require('express')
const { addContact, deleteContactMessages, getConatctMessages } = require('../controller/public/contact.controller')
const { getInfo, updateInfo } = require('../controller/public/info.controller')
const { getPromo, updatePromo } = require('../controller/public/promo.controller')
const { getSellers } = require('../controller/public/seller.controller')
const { Auth_Rqeuired, Only_Admin } = require('../middleware/auth.middleware')

const publicRoutes = Router()

publicRoutes.get('/info', getInfo)
publicRoutes.put('/info', Auth_Rqeuired, Only_Admin, updateInfo)

// contact routes
publicRoutes.post('/contact', addContact)
publicRoutes.get('/contact', Auth_Rqeuired, Only_Admin, getConatctMessages)
publicRoutes.delete('/contact', Auth_Rqeuired, Only_Admin, deleteContactMessages)

// seller routes
publicRoutes.get('/seller', getSellers)

// promo routes
publicRoutes.get('/promo', getPromo)
publicRoutes.put('/promo', Auth_Rqeuired, Only_Admin, updatePromo)


module.exports = {
  publicRoutes
}