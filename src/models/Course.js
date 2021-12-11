const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Schema = mongoose.Schema

const Course = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  idTeacher: Schema.Types.ObjectId,
  des: String,
  quantityStudent: Number,
  rating: { point: Number, quantity: Number },
  fee: Number,
  imageUrl: { type: String, required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User' },
  slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true })

module.exports = mongoose.model('Course', Course)
