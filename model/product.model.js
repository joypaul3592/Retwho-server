const { default: mongoose } = require("mongoose")
const { validateEmail } = require("../utils/validators")

const ProductSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productName: {
    type: String,
    trim: true,
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  sku: {
    type: String,
    trim: true,
    required: false
  },
  uniqueCode: {
    type: String,
    trim: true,
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    required: false
  }],
  image: {
    type: String,
    trim: true,
    required: false
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    trim: true,
    required: true
  },
  // prices: {
  //   basic: {
  //     type: Number,
  //     required: true
  //   },
  //   standard: {
  //     type: Number,
  //     required: true
  //   },
  //   premium: {
  //     type: Number,
  //     required: true
  //   },
  // },
  productOffer: {
    basic: [{
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],
    standard: [{
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],
    premium: [{
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: {
      validator: validateEmail,
      message: props => `${props.value} is not a valid email`
    },
  },
  tax: {
    type: Number,
    required: false,
    default: 0
  },
  modifier: {
    type: Number,
    required: false,
    default: 0
  },
  sold_amount: {
    type: Number,
    required: false,
    default: 0
  },
  buying_price: {
    type: Number,
  },
}, { timestamps: true })


module.exports = {
  ProductModel: mongoose.model('Product', ProductSchema)
}