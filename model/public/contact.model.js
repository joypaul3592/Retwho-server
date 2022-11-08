const { default: mongoose } = require("mongoose");

const ContactSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  query: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = {
  ContactModel: mongoose.model('contact', ContactSchema)
}