const { UserModel, CategoryModel } = require('../models')

const home = async (req, res) => {
  const category = await CategoryModel.find({})
  const allTeacher = await UserModel.find({ role: 1 }).limit(8)
  res.render('instructor', { allTeacher, category })
}

module.exports = {
  home
}
