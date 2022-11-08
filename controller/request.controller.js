const { RequestModel } = require("../model/request.model")
const { addUserToApproved, doesShopExist, removeUserFromApproved } = require("./shop.controller")
const { errorMessageFormatter } = require('../utils/helpers')
const { Roles } = require("../utils/constants")

const requestShop = async (req, res) => {
  try {
    const { shopId } = req.query
    const { subscription, user } = req.body

    const shop = await doesShopExist(shopId)
    if(!shop) return res.status(404).json({ error: 'Shop does not exists' })

    const requestObj = {
      shop: shop._id,
      subscription
    }

    if(req.user.role === Roles.RETAILER) {
      requestObj.user = req.user._id
    } else if(String(shop.user) === String(req.user._id)) {
      requestObj.user = user
    }

    const request = await RequestModel.create(requestObj)

    return res.status(200).json({ request })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getAllRequests = async (req, res) => {
  try {
    const filterOptions = { ...req.query }
    const requests = await RequestModel.find(filterOptions).populate('user shop')
    return res.status(200).json({ requests })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateRequestApproval = async (req, res) => {
  try {
    const { rid } = req.query
    const { approved, subscription } = req.body

    const request = await RequestModel.findById(rid)
    if(!request) return res.status(404).json({ error: 'No request found.' })

    if(approved) await addUserToApproved(request.shop, { user: request.user, subscription })
    else if(approved === false) await removeUserFromApproved(request.shop, { user: request.user, subscription })

    const requests = await RequestModel.findOneAndUpdate({ _id: rid }, { approved, subscription }, { new: true })

    return res.status(200).json({ requests })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const connectWholesellerToRetailer = async (req, res) => {
  try {
    const { shop, retailer, subscription, approved } = req.body

    const request = await RequestModel.create({ shop, user: retailer, subscription, approved })

    await addUserToApproved(shop, { user: retailer, subscription })

    return res.status(200).json({ request })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  requestShop,
  getAllRequests,
  updateRequestApproval,
  connectWholesellerToRetailer
}