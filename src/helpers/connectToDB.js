const mongoose = require('mongoose')

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://1edu_cnpm:sdfjsdfkjdshkfdshkfsdksdfhkjrtregdfgdfkjgdfkj@cluster0.f3ytn.mongodb.net/1edu_database?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('connect database successfully')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectToDB
