const { CourseModel } = require('../models')
const { helper } = require('../helpers/')

const home = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const allCourse = await CourseModel.find({ teacherId: id })
  res.render('teacher', { allCourse, formatMoney: helper.formatMoney, formatTime: helper.formatTime })
}

const create = async (req, res) => {
  res.render('teacher-course-create')
}

const editCourse = async (req, res) => {
  const { id, slug } = req.params
  const course = await CourseModel.findOne({ teacherId: id, slug: slug })
  res.render('teacher-course-edit', { course, formatTime: helper.formatTimeType2 })
}

const detailCourse = async (req, res) => {
  const { id, slug } = req.params
  const course = await CourseModel.findOne({ teacherId: id, slug: slug })
  res.render('teacher-course-detail', { course, formatTime: helper.formatTime })
}

const saveCreate = async (req, res) => {
  const fee = parseInt(req.body.fee)
  const feeDiscount = parseInt(req.body.feeDiscount)
  const numberLesson = parseInt(req.body.numberLesson)
  const newCourse = new CourseModel({
    ...req.body,
    fee,
    feeDiscount,
    numberLesson,
    imageUrl: '/uploads/' + req.file.filename,
    teacherId: req.params.id
  })
  await newCourse.save()

  res.render('teacher-course-detail', { course: newCourse, formatTime: helper.formatTime })
}

const saveEditCourse = async (req, res) => {
  const { id, slug } = req.params
  const course = await CourseModel.findOne({ teacherId: id, slug: slug })
  console.log(req.body)
  course.fee = parseInt(req.body.fee)
  course.feeDiscount = parseInt(req.body.feeDiscount)
  course.numberLesson = parseInt(req.body.numberLesson)
  course.name = req.body.name
  course.des = req.body.des
  course.startDate = req.body.startDate
  course.endDate = req.body.endDate
  if (req.file) {
    course.imageUrl = '/uploads/' + req.file.filename
  }
  await course.save()
  res.render('teacher-course-detail', { course, formatTime: helper.formatTime })
}

module.exports = {
  home,
  create,
  editCourse,
  detailCourse,
  saveCreate,
  saveEditCourse
}
