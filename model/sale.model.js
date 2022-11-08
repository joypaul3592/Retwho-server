const { default: mongoose } = require("mongoose")
const { SaleShippingStatus, SalePaymentStatus } = require("../utils/constants")

const SaleSchema = mongoose.Schema({
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    uniqueCode: {
      type: String,
      required: true
    },
    productName: {
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
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  user: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  net_total: {
    type: Number,
    required: true
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
    required: false,
    default: 0
  },
  shipping_status: {
    type: String,
    required: false,
    default: SaleShippingStatus.PENDING
  },
  shipping_address: {
    type: String,
    required: true
  },
  payment_status: {
    type: String,
    required: false,
    default: SalePaymentStatus.PENDING
  },
  payment_method: {
    type: String,
    required: true
  },
  card_payment_id: {
    type: String,
    required: false,
    default: null
  },
  revenue: {
    type: Number,
    required: false,
    default: 0
  }
}, { timestamps: true })

SaleSchema.pre('save', function(next) {
  const sale = this;

  due_amount = sale.net_total - sale.paid_amount

  if(sale.due_amount <= 0) sale.payment_status = SalePaymentStatus.PAID
  
  if(due_amount < 0) sale.return_amount = Math.abs(due_amount)
  else sale.due_amount = due_amount
  
  next()
})


module.exports = {      
  SaleModel: mongoose.model('Sale', SaleSchema)
}