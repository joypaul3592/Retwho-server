const { default: mongoose } = require("mongoose");

const RequestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  subscription: {
    type: String,
    trim: true,
    required: true
  },
  approved: {
    type: Boolean,
    required: false,
    default: false
  }
}, { timestamps: true })

module.exports = {
  RequestModel: mongoose.model('request', RequestSchema)
}