const mongoose = require('mongoose')

const Schema = mongoose.Schema

const StudentCourse = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  studentId: { type: Schema.Types.ObjectId, ref: 'User' },
  isRating: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('StudentCourse', StudentCourse)
