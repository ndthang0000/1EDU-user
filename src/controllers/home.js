const { CourseModel, CategoryModel } = require('../models')
const { helper } = require('../helpers')

const home = async (req, res) => {
  const allCourse = await CourseModel.find({}).populate('teacherId').limit(9)
  const category = await CategoryModel.find({})
  res.render('home', { allCourse, category, formatTime: helper.formatTime, formatMoney: helper.formatMoney })
}

module.exports = {
  home
}
