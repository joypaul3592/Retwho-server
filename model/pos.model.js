const { default: mongoose } = require("mongoose");
const { SalePaymentStatus, SalePaymentMethod } = require("../utils/constants");

const PosSchema = mongoose.Schema({
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    uniqueCode: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  }],
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
  sold_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  net_total: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
  payment_status: {
    type: String,
    required: false,
    default: SalePaymentStatus.PENDING
  },
  paid_amount: {
    type: Number,
    required: true,
    default: 0
  },
  due_amount: {
    type: Number,
    required: false,
    default: 0
  },
  return_amount: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  shipping_address: {
    type: String,
    required: true
  }
}, { timestamps: true })

PosSchema.pre('save', function(next) {
  const pos = this;

  let due_amount = pos.net_total - pos.paid_amount

  if(!pos.due_amount) pos.payment_status = SalePaymentMethod.PAID
  if(due_amount < 0) pos.return_amount = Math.abs(due_amount)
  else pos.due_amount = due_amount
  
  next()
})


module.exports = {
  PosModel: mongoose.model('pos', PosSchema)
}