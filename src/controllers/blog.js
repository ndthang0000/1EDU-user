const { CourseSchedule } = require('../models')

const home = async (req, res) => {
  await CourseSchedule.deleteMany({ courseId: '61beefa0bbac8f0bef2a3e77' })
  return res.render('blog')
}

module.exports = {
  home
}
