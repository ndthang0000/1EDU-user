const { CourseModel } = require('../models')
const { helper } = require('../helpers/')

const home = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const allCourse = await CourseModel.find({ teacherId: id })
  console.log(allCourse)
  res.render('teacher', { allCourse })
}
const create = async (req, res) => {
  res.render('teacher-course-create')
}
const editCourse = async (req, res) => {
  res.render('teacher')
}
const detailCourse = async (req, res) => {
  const { id, slug } = req.params
  const course = await CourseModel.findOne({ teacherId: id, slug: slug })
  res.render('teacher-course-detail', { course, formatTime: helper.formatTime })
}
module.exports = {
  home,
  create,
  editCourse,
  detailCourse
}
