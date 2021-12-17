const { CourseModel } = require('../models')
const { helper } = require('../helpers')
const home = async (req, res) => {
  try {
    const allCourse = await CourseModel.find({}).sort({ updatedAt: -1 }).populate('teacherId').limit(9)
    res.render('course', { allCourse, formatTime: helper.formatTime, formatMoney: helper.formatMoney })
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

module.exports = {
  home,
  search,
  detail
}
