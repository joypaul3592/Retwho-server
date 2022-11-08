const { Router } = require('express')
const { registerUser, addUser, getAuthUserByEmail, updateUserRoleAndPrice, deleteUser, getAllEmployee, getAllUser, approveUser } = require('../controller/user.controller')
const { Can_User_Modify, Only_Admin } = require('../middleware/auth.middleware')
const { upload } = require('../middleware/files.middleware')
const { UserRegisterFileFields } = require('../utils/constants')
const userRoutes = Router()

userRoutes.post('/register', upload.fields(UserRegisterFileFields), registerUser)
userRoutes.put('/register', Only_Admin, approveUser)

userRoutes.get('/auth/user', Can_User_Modify, getAuthUserByEmail)
userRoutes.get('/user', Can_User_Modify, getAllEmployee)

userRoutes.post('/user', Can_User_Modify, addUser)
userRoutes.put('/user', Can_User_Modify, updateUserRoleAndPrice)
userRoutes.delete('/user', Can_User_Modify, deleteUser)

userRoutes.get('/user/all', getAllUser)


module.exports = {
  userRoutes
}