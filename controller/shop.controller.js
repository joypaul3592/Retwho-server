const { getAuth } = require('firebase-admin/auth')
const { default: mongoose } = require("mongoose")
const { ShopModel } = require('../model/shop.model')
const { ResultLimit } = require('../utils/constants')
const { errorMessageFormatter } = require('../utils/helpers')
const { validateObjectId } = require('../utils/validators')

const doesShopExist = async (id) => {
  try {
    const isShop = await ShopModel.findOne({ _id: id })
    return isShop
  } catch (err) {
    throw new Error(err.message)
  }
}

const isShopOwner = async (userId) => {
  try {
    const isOwner = await ShopModel.findOne({ user: userId })
    return isOwner
  } catch (err) {
    throw new Error(err.message)
  }
}

const addUserToApproved = async (shopId, approved) => {
  try {
    const shop = await ShopModel.findOneAndUpdate({ _id: shopId }, { $addToSet: { approved } }, { new: true })
    if(!shop) throw new Error({ message: 'Shop does not exists.' })
    return shop
  } catch (err) {
    throw new Error(err.message)
  }
}

const removeUserFromApproved = async (shopId, approved) => {
  try {
    const shop = await ShopModel.findOneAndUpdate({ _id: shopId }, { $pull: { approved } }, { new: true })
    if(!shop) throw new Error({ message: 'Shop does not exists.' })
    return shop
  } catch (err) {
    throw new Error(err.message)
  }
}

const getSubscription = async (shopId, user) => {
  try {
    const shop = await ShopModel.findOne({ _id: shopId }, { approved: { user: user, subscription: true }})
    if(!shop) throw new Error({ message: 'Shop does not exists.' })
    return shop.approved[0]
  } catch (err) {
    throw new Error(err.message)
  }
}

const createShop = async (req, res) => {
  try {
    const data = req.body

    const isShop = await isShopOwner(req.user._id)
    if(isShop) return res.status(400).json({ error: 'User already have a shop.' })

    const shop = await ShopModel.create({ ...data, user: req.user._id, role: req.user.role })

    const firebaseUser = await getAuth().getUserByEmail(req.user.email)
    await getAuth().setCustomUserClaims(req.user.uid, { ...firebaseUser.customClaims, shop: shop._id })

    return res.status(201).json({ shop })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateShop = async (req, res) => {
  try {
    const shopId = req.query.shopId
    const data = req.body

    const isValidId = validateObjectId(shopId)
    if(!isValidId) return res.status(404).json({ error: 'Shop does not exists' })

    const shop = await ShopModel.findByIdAndUpdate(shopId, data, { new: true })
    if(!shop) return res.status(404).json({ error: 'Shop does not exists' })

    return res.status(200).json({ shop })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getAllShops = async (req, res) => {
  try {
    const { sort, page, limit, ...filterOptions } = { ...req.query }

    if(!sort || ! page) return res.status(400).json({ error: 'sort=-1/1 & page=number is required.' })

    if(filterOptions._id) filterOptions._id = mongoose.Types.ObjectId(filterOptions._id)
    if(filterOptions.user) filterOptions.user = mongoose.Types.ObjectId(filterOptions.user)

    const skip = limit ? +page * limit : +page * ResultLimit

    const totalShops = await ShopModel.count(filterOptions)
    
    const shops = await ShopModel.aggregate([
      { $match: filterOptions },
      { 
        $sort: {
          createdAt: +sort
        }
      },
      {
        $skip: skip
      },
      {
        $limit: +limit || ResultLimit
      },
      {
        $project: {
          user: true,
          role: true,
          city: true,
          companyEmail: true,
          companyName: true,
          companyPhone: true,
          country: true,
          email: true,
          name: true,
          postalCode: true,
          state_province_region: true,
          streetAddress: true,
          createdAt: true,
          updatedAt: true,
          __v: true,
          susbcribers: {
            $ifNull: [
              {
                $first: {
                  $filter: {
                    input: '$approved',
                    as: 'subscribed',
                    cond: {
                      $eq: ['$$subscribed.user', { $toObjectId: req.user._id }]
                    }
                  }
                }
              }, null
            ]
          }
        }
      }
    ])
    return res.status(200).json({ totalShops, shops })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const deleteShop = async (req, res) => {
  try {
    const shopId = req.query.shopId
    
    const isValidId = validateObjectId(shopId)
    if(!isValidId) return res.status(403).json({ error: 'Shop does not exists.'})

    const deleted = await ShopModel.deleteOne({ _id: shopId })

    return res.status(200).json({ deleted })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}


module.exports = {
  doesShopExist,
  isShopOwner,
  addUserToApproved,
  removeUserFromApproved,
  getSubscription,
  createShop,
  updateShop,
  getAllShops,
  deleteShop
}