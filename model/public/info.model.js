const { default: mongoose } = require("mongoose");

const InfoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  parent: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  offices: [{
    type: String,
    required: true
  }],
  workingHours: {
    days: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
  },
  sales: {
    type: String,
    required: true
  },
  support: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = {
  InfoModel: mongoose.model('info', InfoSchema)
}