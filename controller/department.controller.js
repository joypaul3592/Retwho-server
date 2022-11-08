const { doesShopExist } = require("./shop.controller")
const { DepartmentModel } = require('../model/department.model')
const { errorMessageFormatter } = require('../utils/helpers')
const { validateObjectId } = require("../utils/validators")


const doesDepartmentExist = (id) => {
  try {
    const isDepartment = DepartmentModel.findOne({ _id: id })
    return isDepartment
  } catch (err) {
    throw new Error(err.message)
  }
}

const createDepartment = async (req, res) => {
  try {
    const data = req.body

    const isShop = await doesShopExist(data.shop)
    if (!isShop) return res.status(404).json({ error: 'Shop does not exists' })

    const department = await DepartmentModel(data)
    await department.save()

    // fill in properties from Shop
    await department.populate('shop')

    return res.status(201).json({ department })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateDepartment = async (req, res) => {
  try {
    const deptId = req.query.deptId
    const { dept_name, active, tax_stage, shop } = req.body

    const isValidId = validateObjectId(deptId)
    if (!isValidId) return res.status(404).json({ error: 'Department does not exists' })

    if (shop) {
      const isValidShopId = validateObjectId(shop)
      if (!isValidShopId) return res.status(404).json({ error: 'Shop does not exists' })
    }

    const department = await DepartmentModel.findByIdAndUpdate(deptId, { dept_name, active, tax_stage, shop }, { new: true })
    if (!department) return res.status(404).json({ error: 'Department does not exists' })

    return res.status(200).json({ department })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getAllDepartments = async (req, res) => {
  const result = req.query.shop;
  try {
    if (result.length > 20) {
      const filterOptions = { ...req.query }
      const departments = await DepartmentModel.find(filterOptions).populate('shop')
      return res.status(200).json({ departments })
    }
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}


const deleteDepartment = async (req, res) => {
  try {
    const deptId = req.query.deptId

    const isValidId = validateObjectId(deptId)
    if (!isValidId) return res.status(403).json({ error: 'Department does not exists.' })

    const deleted = await DepartmentModel.deleteOne({ _id: deptId })

    return res.status(200).json({ deleted })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}


module.exports = {
  doesDepartmentExist,
  createDepartment,
  updateDepartment,
  getAllDepartments,
  deleteDepartment
}