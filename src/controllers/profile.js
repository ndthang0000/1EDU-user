const { UserModel, StudentCourseModel } = require('../models')

const home = async (req, res) => {
  const quantity = await StudentCourseModel.count({ studentId: req.user._id })
  return res.render('profile', { quantity })
}
const saveProfile = async (req, res) => {
  if (req.file) {
    const avatar = '/uploads/' + req.file.filename
    await UserModel.findOneAndUpdate({ _id: req.user._id }, { avatar: avatar })
  }
  res.redirect('/profile/me')
}
const course = async (req, res) => {
  const allCourse = await StudentCourseModel.find({ studentId: req.user._id }).populate('courseId').sort({ createdAt: -1 })
  res.render('profile-course', { allCourse })
}

module.exports = {
  home,
  saveProfile,
  course
}
