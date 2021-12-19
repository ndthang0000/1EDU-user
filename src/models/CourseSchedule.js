const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Schedule = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  seq: { type: Number, required: true },
  content: { type: String, default: 'Nôi dung bài học' },
  date: { type: Date, default: new Date() }
}, { timestamps: true })

module.exports = mongoose.model('Schedule', Schedule)
