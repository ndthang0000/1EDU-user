const { CourseModel } = require('../models')

const home = async (req, res) => {
  console.log(CourseModel)
  return res.render('blog')
}

module.exports = {
  home
}
