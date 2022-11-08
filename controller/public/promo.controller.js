const { PromoModel } = require("../../model/public/promo.model")
const { Roles } = require("../../utils/constants")
const { errorMessageFormatter } = require("../../utils/helpers")


const getPromo = async (req, res) => {
  try {
    const promo = await PromoModel.findOne({ role: Roles.ADMIN }, { role: false, user: false })

    return res.status(201).json({ promo })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updatePromo = async (req, res) => {
  try {
    const { title, url } = req.body

    const promo = await PromoModel.findOneAndUpdate({ role: Roles.ADMIN }, { title, url, user: req.user._id, role: Roles.ADMIN }, { new: true, upsert: true })

    return res.status(201).json({ promo })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  getPromo,
  updatePromo
}