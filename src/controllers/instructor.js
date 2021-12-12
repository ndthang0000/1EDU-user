const { UserModel } = require('../models')

const home = async (req, res) => {
  const allTeacher = await UserModel.find({ role: 1 }).limit(8)
  res.render('instructor', { allTeacher })
}

module.exports = {
  home
}
