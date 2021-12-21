const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Schema = mongoose.Schema

const Course = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  idTeacher: Schema.Types.ObjectId,
  des: String,
  quantityStudent: { type: Number, default: 0 },
  fee: Number,
  feeDiscount: Number,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numberLesson: Number,
  imageUrl: { type: String, required: true },
  rating: { point: { type: Number, default: 0 }, quantity: { type: Number, default: 0 } },
  categoryId: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  levelId: [{ type: Schema.Types.ObjectId, ref: 'Level' }],
  teacherId: { type: Schema.Types.ObjectId, ref: 'User' },
  slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true })

module.exports = mongoose.model('Course', Course)
