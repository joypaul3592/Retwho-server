const { InfoModel } = require("../../model/decorations/info.model")
const { Roles } = require("../../utils/constants")
const { errorMessageFormatter } = require("../../utils/helpers")


const getInfo = async (req, res) => {
  try {
    const info = await InfoModel.findOne({ role: Roles.ADMIN }, { role: false, user: false })

    return res.status(201).json({ info })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const updateInfo = async (req, res) => {
  try {
    const data = req.body

    const info = await InfoModel.findOneAndUpdate({ role: Roles.ADMIN }, { ...data, user: req.user._id, role: Roles.ADMIN }, { new: true, upsert: true })

    return res.status(201).json({ info })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  getInfo,
  updateInfo
}