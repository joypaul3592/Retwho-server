const { ContactModel } = require("../../model/decorations/contact.model")
const { errorMessageFormatter } = require("../../utils/helpers")

const addContact = async (req, res) => {
  try {
    const data = req.body

    const contact = await ContactModel.create(data)

    return res.status(201).json({ contact })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const getConatctMessages = async (req, res) => {
  try {
    const filterOptions = req.query

    const contact = await ContactModel.find(filterOptions)

    return res.status(201).json({ contact })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

const deleteContactMessages = async (req, res) => {
  try {
    const { cid } = req.query

    const contact = await ContactModel.deleteOne({ _id: cid })

    return res.status(201).json({ contact })
  } catch (err) {
    const errorMessage = errorMessageFormatter(err)
    return res.status(500).json(errorMessage)
  }
}

module.exports = {
  addContact,
  getConatctMessages,
  deleteContactMessages
}