const { getAuth } = require('firebase-admin/auth')
const { default: mongoose } = require("mongoose")
const { UserModel, RoleUserModel } = require("../model/user.model")
const { UserRegisterType, AllowedFiles, ResultLimit } = require("../utils/constants")
const { uploadToCloudinary } = require('../config/files.config')
const { errorMessageFormatter, setShopUserRole, getAuthUser } = require('../utils/helpers')
const { isShopOwner } = require('./shop.controller')

const getUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email })
    return user
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    throw new Error(errorMessage)
  }
}

const registerUser =  async (req, res) => {
  try {
    const data = req.body
    const type = req.query.type
    const files = req.files

    if(!files.feinCopy) return res.status(400).json({ error: 'Invalid Request. "felinCopy" not provided or invalid file type.' })
    if(!files.resalecert) return res.status(400).json({ error: 'Invalid Request. "resalecert" not provided or invalid file type.' })


    // invalid type parameter provided
    if(!UserRegisterType.has(type)) return res.status(400).json({ error: 'Invalid "type" parameter.' })

    // create new user
    const user = await UserModel(data)

    // upload files
    for(const fileName in files) {
      if(!AllowedFiles.has(fileName)) continue
      const locaFilePath = files[fileName][0].path
      const result = await uploadToCloudinary(locaFilePath, 'register')
      user[fileName] = result
    }
    // asssign role
    user.role = type
    // set approved to false by default
    user.approved = false
    await user.save()

    const firebaseUser = await getAuth().getUserByEmail(user.email)
    await getAuth().setCustomUserClaims(req.user.uid, { ...firebaseUser.customClaims, role: type, _id: user._id })

    // excludes password from returned user
    const { password, ...rest } = user._doc

    return res.status(201).json({ user: rest })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const addUser = async (req, res) => {
  try {
    const data = req.body
    
    const shopOwner = await isShopOwner(req.user._id)
    if(!shopOwner) return res.status(403).json({ error: 'User can not add user to this shop.' })

    await setShopUserRole(data.email, data.role, data.priceType)

    const user = await RoleUserModel.create({ ...data, employer: req.user._id, shop: shopOwner._id })

    return res.status(201).json({ user })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getAuthUserByEmail = async (req, res) => {
  try {
    const { email } = req.query

    const user = await getAuthUser(email)

    return res.status(201).json({ user })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateUserRoleAndPrice = async (req, res) => {
  try {
    const data = req.body

    const isAuthorized = await RoleUserModel.findOneAndUpdate({ email: data.email, employer: req.user._id }, { ...data }, { new: true })
    if(!isAuthorized) return res.status(403).json({ error: 'User is not authorized to perform this action.' })

    await setShopUserRole(data.email, data.role, isAuthorized._id, req.user._id)

    return res.status(200).json({ success: true })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { email } = req.query

    const isAuthorized = await RoleUserModel.findOne({ email: email, employer: req.user._id })
    if(!isAuthorized) return res.status(403).json({ error: 'User is not authorized to perform this action.' })

    await setShopUserRole(email, null, null)

    const user = await RoleUserModel.deleteOne({ email: email })

    return res.status(200).json({ user })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getAllEmployee = async (req, res) => {
  try {
    const filterOptions = { ...req.query }
    const employees = await RoleUserModel.find({ ...filterOptions, employer: req.user._id })
    return res.status(200).json({ employees })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getAllUser = async (req, res) => {
  try {
    const { sort, page, _id, role, email, limit } = { ...req.query }

    if(!sort || ! page) return res.status(400).json({ error: 'sort=-1/1 & page=number is required.' })

    const filterOptions = {}
    const skip = limit ? +page * limit : +page * ResultLimit
    
    if(_id) filterOptions._id = mongoose.Types.ObjectId(_id)
    if(email) filterOptions.email = email
    if(role) filterOptions.role = role
    
    const totalUser = await UserModel.count(filterOptions)

    const users = await UserModel
      .find({ ...filterOptions }, { password: false })
      .sort({ createdAt: sort })
      .skip(skip)
      .limit(limit || ResultLimit)

    return res.status(200).json({ totalUser, users })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const approveUser = async (req, res) => {
  try {
    const { _id } = req.query
    const { approved } = req.body

    if(!_id) return res.status(400).json({ error: "User _id must be provided as query parameter." })

    const user = await UserModel.findOneAndUpdate({ _id }, { approved }, { new: true })
    if(!user) return res.status(404).json({ error: "User not found." })

    const { password, ...rest } = user._doc

    return res.status(200).json({ user: rest })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  getUserByEmail,
  registerUser,
  addUser,
  getAuthUserByEmail,
  updateUserRoleAndPrice,
  deleteUser,
  getAllEmployee,
  getAllUser,
  approveUser
}