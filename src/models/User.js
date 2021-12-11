const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: { type: String, required: true },
  role: { type: Number, required: true, default: 0 }, // 0 is student , 1 is teacher
  avatar: { type: String, default: '/images/avatar.png' },
  age: Number,
  information: { type: String }, // belong to teacher
  tel: String // belong to teacher
})

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password)
  return compare
}

const UserModel = mongoose.model('User', UserSchema, 'users')

module.exports = UserModel
