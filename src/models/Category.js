const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Category = new Schema({
  tittle: { type: String, required: true, unique: true },
  imageUrl: { type: String, default: '/images/work-1.jpg' },
  quantity: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Category', Category)
