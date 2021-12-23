// const { CourseModel, CategoryModel } = require('../models')

const home = async (req, res) => {
  // const category = await CategoryModel.find({})
  // category.forEach(async (item) => {
  //   const quantity = await CourseModel.count({ categoryId: { $elemMatch: item._id } })
  //   item.quantity = quantity
  //   await item.save()
  // })
  return res.render('blog')
}

module.exports = {
  home
}
