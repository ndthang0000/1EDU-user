const mongoose = require('mongoose')
const config = require('../config')

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Mongoose is connected')
  } catch (error) {
    console.log('Mongoose is encountered an error')
    console.log(error)
  }
}

module.exports = {
  connectDatabase
}
