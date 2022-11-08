const mongoose = require('mongoose')

const connectDatabase = (mongodb_uri) => {
  try {
    mongoose.connect(mongodb_uri)

    mongoose.connection.on('connected', () => {
      console.log('connceted to DB')
    })
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  connectDatabase
}