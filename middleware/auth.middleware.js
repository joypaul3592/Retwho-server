const { getAuth } = require('firebase-admin/auth')
const { errorMessageFormatter } = require('../utils/helpers')
const { getUserByEmail } = require('../controller/user.controller')
const { AllowedUsersForModification, Roles, AllowedSaleRole, UserRegisterType } = require('../utils/constants')

const Auth_Rqeuired = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if(!authorization) return res.status(401).json({ error: 'Authentication Required.' })
    
    const token = authorization.split('Bearer ')[1]
    const { uid, email, role, shop } = await getAuth().verifyIdToken(token)

    
    if(!uid) return res.status(401).json({ error: 'Unauthorized User' })
    
    const user = await getUserByEmail(email)

    if(UserRegisterType.has(user.role) && !user.approved) return res.status(401).json({ error: 'User is not approved by the admin.' })
    
    req.user = { uid, email, _id: user?._id }

    if(role) req.user.role = role
    if(shop) req.user.shop = shop
    
    next()
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const Can_User_Modify = (req, res, next) => {
  if(!AllowedUsersForModification.has(req.user.role)) return res.status(401).json({ error: 'User request can not be fullfilled.'})
  next()
}

const Only_Admin = (req, res, next) => {
  if(req.user.role !== Roles.ADMIN) return res.status(401).json({ error: 'User request can not be fullfilled.'})
  next()
}

const Only_Retailer_And_Wholeseller = (req, res, next) => {
  if(req.user.role !== Roles.RETAILER || req.user.role !== Roles.WHOLESELLER) return res.status(401).json({ error: 'User request can not be fullfilled.'})
  next()
}

const Can_User_Sale = (req, res, next) => {
  if(!AllowedSaleRole.has(req.user.role)) return res.status(401).json({ error: 'User request can not be fullfilled.'})
  next()
}


module.exports = {
  Auth_Rqeuired,
  Can_User_Modify,
  Only_Admin,
  Only_Retailer_And_Wholeseller,
  Can_User_Sale
}