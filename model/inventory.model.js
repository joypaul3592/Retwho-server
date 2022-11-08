const { default: mongoose } = require("mongoose");

const InventorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  buying_price: {
    type: Number,
    required: true
  },
  selling_price: {
    type: Number,
    required: true
  },
  minimum_stock: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = {
  InventoryModel: mongoose.model('inventory', InventorySchema)
}