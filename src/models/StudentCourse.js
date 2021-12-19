const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StudentCourse = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { isRating: { type: Boolean, default: false }, point: { type: Number, default: 0 } }
}, { timestamps: true })

module.exports = mongoose.model('StudentCourse', StudentCourse)
