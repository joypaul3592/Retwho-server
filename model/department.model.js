const { default: mongoose } = require("mongoose")

// TODO: use property names from frontend
const DepartmentSchema = mongoose.Schema({
  dept_name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  },
  tax_stage: {
    type: String,
    required: true
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  }
}, { timestamps: true })

module.exports = {      
  DepartmentModel: mongoose.model('Department', DepartmentSchema)
}