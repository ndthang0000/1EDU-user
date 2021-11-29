const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connect database successfully')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectToDB
