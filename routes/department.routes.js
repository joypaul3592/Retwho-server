const { Router } = require('express')
const { createDepartment, updateDepartment, getAllDepartments, deleteDepartment } = require('../controller/department.controller')
const { Can_User_Modify } = require('../middleware/auth.middleware')
const departmentRoutes = Router()


departmentRoutes.post('/', Can_User_Modify, createDepartment)
departmentRoutes.put('/', Can_User_Modify, updateDepartment)
departmentRoutes.get('/', getAllDepartments)
departmentRoutes.delete('/', Can_User_Modify, deleteDepartment)

module.exports = {
  departmentRoutes
}