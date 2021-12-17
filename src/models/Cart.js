const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Cart = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  studentId: { type: Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, default: 1 }
}, { timestamps: true })

module.exports = mongoose.model('Cart', Cart)
