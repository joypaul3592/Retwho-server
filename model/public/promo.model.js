const { default: mongoose } = require("mongoose");
const { Roles } = require("../../utils/constants");


const PromoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: false,
    default: Roles.ADMIN
  }
}, { timestamps: true })


module.exports = {
  PromoModel: mongoose.model('promo', PromoSchema)
}