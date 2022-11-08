const { default: mongoose } = require("mongoose")

const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

const validateObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = {
  validateEmail,
  validateObjectId
}