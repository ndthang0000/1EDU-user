const { CourseModel, CourseSchedule, LevelModel, CategoryModel } = require('../models')
const { helper } = require('../helpers/')

const home = async (req, res) => {
  const { id } = req.params
  const allCourse = await CourseModel.find({ teacherId: id })
  res.render('teacher', { allCourse, formatMoney: helper.formatMoney, formatTime: helper.formatTime })
}

const create = async (req, res) => {
  const category = await CategoryModel.find({})
  const type = await LevelModel.find({})
  res.render('teacher-course-create', { category, type })
}

const editCourse = async (req, res) => {
  const { id, slug } = req.params
  const course = await CourseModel.findOne({ teacherId: id, slug: slug })
  const category = await CategoryModel.find({})
  const type = await LevelModel.find({})
  res.render('teacher-course-edit', { course, category, type, formatTime: helper.formatTimeType2, formatMoney: helper.formatMoney })
}

const detailCourse = async (req, res) => {
  const { id, slug } = req.params
  const course = await CourseModel.findOne({ teacherId: id, slug: slug })
  res.render('teacher-course-detail', { course, formatTime: helper.formatTime, newLine: helper.newLine, formatMoney: helper.formatMoney })
}

const saveCreate = async (req, res) => {
  let category = []
  let level = []
  if (!Array.isArray(req.body?.category)) {
    if (req.body?.category) {
      category.push(req.body.category)
    }
  } else {
    category = req.body.category
  }
  if (!Array.isArray(req.body?.level)) {
    if (req.body?.level) {
      level.push(req.body.level)
    }
  } else {
    level = req.body.level
  }
  const newCourse = new CourseModel({
    ...req.body,
    categoryId: category,
    levelId: level,
    fee: parseInt(req.body.fee),
    feeDiscount: parseInt(req.body.feeDiscount),
    numberLesson: parseInt(req.body.numberLesson),
    imageUrl: '/uploads/' + req.file.filename,
    teacherId: req.params.id
  })
  await newCourse.save()

  res.render('teacher-course-detail', { course: newCourse, formatTime: helper.formatTime, newLine: helper.newLine, formatMoney: helper.formatMoney })
}

const saveEditCourse = async (req, res) => {
  const { id, slug } = req.params
  let category = []
  let level = []
  if (!Array.isArray(req.body?.category)) {
    if (req.body?.category) {
      category.push(req.body.category)
    }
  } else {
    category = req.body.category
  }
  if (!Array.isArray(req.body?.level)) {
    if (req.body?.level) {
      level.push(req.body.level)
    }
  } else {
    level = req.body.level
  }
  const course = await CourseModel.findOne({ teacherId: id, slug: slug })
  course.levelId = level
  course.categoryId = category
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
  res.render('teacher-course-detail', { course, formatTime: helper.formatTime, newLine: helper.newLine, formatMoney: helper.formatMoney })
}
const schedule = async (req, res) => {
  console.log(req.body)
  const allSchedule = await CourseSchedule.find({ courseId: req.params.id })
  const course = await CourseModel.findById(req.params.id)
  res.render('teacher-course-schedule', { allSchedule, course, formatTime: helper.formatTime, newLinee: helper.newLinee })
}
const createSchedule = async (req, res) => {
  for (let i = 0; i < req.body.number; i++) {
    const newSchedule = await CourseSchedule({
      seq: i,
      courseId: req.params.id
    })
    await newSchedule.save()
  }
  const allSchedule = await CourseSchedule.find({ courseId: req.params.id })
  const course = await CourseModel.findById(req.params.id)
  res.render('teacher-course-schedule', { allSchedule, course, formatTime: helper.formatTime, newLinee: helper.newLinee })
}
const scheduleEditContent = async (req, res) => {
  try {
    console.log(req.body.newContent)
    console.log(req.params.id)
    const schedule = await CourseSchedule.findOneAndUpdate({ _id: req.params.id }, { content: req.body.newContent })
    console.log(schedule)
    res.status(200).json({ success: true })
  } catch (e) {
    res.status(400).json({ success: false })
  }
}

module.exports = {
  home,
  create,
  editCourse,
  detailCourse,
  saveCreate,
  saveEditCourse,
  schedule,
  createSchedule,
  scheduleEditContent
}
