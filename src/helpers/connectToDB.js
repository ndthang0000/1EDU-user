const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Mongoose is connected')
  } catch (error) {
    console.log('Mongoose is encountered an error')
    console.log(error)
  }
}

module.exports = connectToDB
