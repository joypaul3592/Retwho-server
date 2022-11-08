const { default: mongoose } = require("mongoose")
const { validateEmail } = require("../utils/validators")

const ShopSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    trim: true,
    required: true
  },
  approved: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subscription: {
      type: String,
      trim: true,
      required: true
    }
  }],
  city: {
    type: String,
    trim: true,
    required: true
  },
  companyEmail: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: validateEmail,
      message: props => `${props.value} is not a valid email`
    },
  },
  companyName: {
    type: String,
    trim: true,
    required: true
  },
  companyPhone: {
    type: String,
    trim: true,
    required: true
  },
  country: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: validateEmail,
      message: props => `${props.value} is not a valid email`
    },
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  postalCode: {
    type: String,
    trim: true,
    required: true
  },
  state_province_region: {
    type: String,
    trim: true,
    required: true
  },
  streetAddress: {
    type: String,
    trim: true,
    required: true
  }
}, { timestamps: true })

module.exports = {      
  ShopModel: mongoose.model('Shop', ShopSchema)
}