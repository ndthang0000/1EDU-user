const { CourseModel, StudentCourseModel, CourseSchedule } = require('../models')
const { helper } = require('../helpers')
const home = async (req, res) => {
  let { page } = req.query
  if (!page) {
    page = 1
  }
  try {
    const allCourse =
      await CourseModel
        .find({}).sort({ updatedAt: -1 })
        .populate('teacherId')
        .limit(6).skip(page * 6 - 6 || 0)
    const quantity = await CourseModel.count()
    console.log(quantity)
    res.render('course',
      {
        allCourse,
        currentPage: page,
        quantity: parseInt(quantity / 6) + 1,
        formatTime: helper.formatTime,
        formatMoney: helper.formatMoney
      })
  } catch (e) {
    console.log(e)
  }
}
const search = async (req, res) => {
  try {
    const listCourse = []
    const keyword = req.query.search
    const allCourse = await CourseModel.find({}).sort({ updatedAt: -1 }).populate('teacherId').limit(9)
    //
    for (const i in allCourse) {
      if (allCourse[i].name.indexOf(keyword) !== -1 || allCourse[i].des.indexOf(keyword) !== -1 || allCourse[i].teacherId.name.indexOf(keyword) !== -1) {
        listCourse.push(allCourse[i])
      }
    }
    res.render('course', { allCourse: listCourse, formatTime: helper.formatTime, formatMoney: helper.formatMoney })
  } catch (e) {
    console.log(e)
  }
}
const detail = async (req, res) => {
  const { slug } = req.params
  const course = await CourseModel.findOne({ slug: slug })
  res.render('course-detail', { course, formatTime: helper.formatTime, formatMoney: helper.formatMoney, newLine: helper.newLine })
}
const getArray = async (req, res) => {
  const { cart } = req.body
  console.log(cart)
  const allCourse = await CourseModel.find({ _id: cart })
  res.status(200).json({ allCourse, success: true })
}
const getOne = async (req, res) => {
  const { id } = req.params
  const course = await StudentCourseModel.findOne({ courseId: id }).populate('courseId')
  if (course) {
    return res.status(200).json({ course, success: true })
  }
  res.status(400).json({ success: false })
}
const getSchedule = async (req, res) => {
  try {
    const allSchedule = await CourseSchedule.find({ courseId: req.params.id })
    res.status(200).json({ success: true, allSchedule })
  } catch (e) {
    return res.json({ success: false })
  }
}

module.exports = {
  home,
  search,
  detail,
  getArray,
  getOne,
  getSchedule
}
