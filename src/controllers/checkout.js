const { CartModel, CourseModel, StudentCourseModel } = require('../models')
const { helper } = require('../helpers')

const cart = async (req, res) => {
  const allCart = await CartModel.find({ studentId: req.user._id })
  const listCourse = allCart.map(item => {
    return item.courseId
  })
  const allCourse = await CourseModel.find({ _id: { $in: listCourse } }).populate('teacherId')
  console.log(allCourse)
  return res.render('checkout', { allCourse, formatMoney: helper.formatMoney, formatTime: helper.formatTime, sum: helper.sum })
}
const one = async (req, res) => {
  const { id } = req.params
  const allCourse = await CourseModel.find({ _id: id }).populate('teacherId')
  return res.render('checkout', { allCourse, formatMoney: helper.formatMoney, formatTime: helper.formatTime, sum: helper.sum })
}
const checkout = async (req, res) => {
  const { courseId } = req.body
  if (!Array.isArray(courseId)) {
    const newJoin = new StudentCourseModel({
      courseId: courseId,
      studentId: req.user._id
    })
    await newJoin.save()
    await CartModel.deleteOne({ studentId: req.user._id, courseId: courseId })
    const findCourse = await CourseModel.findOne({ _id: courseId })
    findCourse.quantityStudent = findCourse.quantityStudent + 1
    await findCourse.save()
    return res.redirect('/profile/course')
  }
  const listCourse = []
  courseId.forEach(async (item) => {
    listCourse.push(item)
    const newJoin = new StudentCourseModel({
      courseId: item,
      studentId: req.user._id
    })
    await newJoin.save()
    const findCourse = await CourseModel.findOne({ _id: item })
    findCourse.quantityStudent = findCourse.quantityStudent + 1
    await findCourse.save()
  })
  const countCartDelete = await CartModel.deleteMany({ $and: [{ studentId: req.user._id }, { courseId: { $in: listCourse } }] })
  console.log('Đã xóa : ', countCartDelete)
  return res.redirect('/profile/course')
}
module.exports = {
  cart,
  one,
  checkout
}
