const { CategoryModel } = require('../models')

const home = async (req, res) => {
  // const category = await CategoryModel.find({})
  // category.forEach(async (item) => {
  //   const quantity = await CourseModel.count({ categoryId: { $elemMatch: item._id } })
  //   item.quantity = quantity
  //   await item.save()
  // })
  const category = await CategoryModel.find({})
  return res.render('blog', { category })
}

module.exports = {
  home
}
