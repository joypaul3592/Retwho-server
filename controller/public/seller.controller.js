const { UserModel } = require("../../model/user.model")
const { errorMessageFormatter } = require("../../utils/helpers")

const getSellers = async (req, res) => {
  try {
    const { role } = req.query

    const sellers = await UserModel.find({ role: role }, { _id: false, agree: false, feinCode: false, license: false, password: false, resalecert: false })

    return res.status(200).json({ sellers })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  getSellers
}