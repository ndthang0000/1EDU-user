const { CourseModel } = require('../models')
const { helper } = require('../helpers')

const home = async (req, res) => {
  const allCourse = await CourseModel.find({}).populate('teacherId')
  res.render('home', { allCourse, formatTime: helper.formatTime, formatMoney: helper.formatMoney })
}

module.exports = {
  home
}
