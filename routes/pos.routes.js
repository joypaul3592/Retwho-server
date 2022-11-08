const { Router } = require('express')
const { savePos, updatePos, deletePos, getPosById, getPosPdf } = require('../controller/pos.controller')
const { Can_User_Modify } = require('../middleware/auth.middleware')
const posRoutes = Router()


posRoutes.post('/', Can_User_Modify, savePos)
posRoutes.put('/', Can_User_Modify, updatePos)
posRoutes.delete('/', Can_User_Modify, deletePos)
posRoutes.get('/', getPosById)

posRoutes.get('/document', getPosPdf)

module.exports = {
  posRoutes
}