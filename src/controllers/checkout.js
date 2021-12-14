const { CourseModel, StudentCourseModel } = require('../models')
const { helper } = require('../helpers')

const cart = async (req, res) => {
  return res.render('checkout')
}
const one = async (req, res) => {
  const { id } = req.params
  const allCourse = await CourseModel.find({ _id: id }).populate('teacherId')
  return res.render('checkout', { allCourse, formatMoney: helper.formatMoney, formatTime: helper.formatTime, sum: helper.sum })
}
const checkout = async (req, res) => {
  // const newJoin = new StudentCourseModel({
  //   courseId: 1
  // })
  const { courseId } = req.body
  if (!Array.isArray(courseId)) {
    const newJoin = new StudentCourseModel({
      courseId: courseId,
      studentId: req.user._id
    })
    await newJoin.save()
    return res.redirect('/')
  }
  courseId.forEach(async (item) => {
    const newJoin = new StudentCourseModel({
      courseId: item,
      studentId: req.user._id
    })
    await newJoin.save()
  })
  return res.redirect('/')
}
module.exports = {
  cart,
  one,
  checkout
}
