const { CourseModel } = require('../models')
const { helper } = require('../helpers')
const home = async (req, res) => {
  try {
    // const newCourse = new CourseModel({
    //   name: 'IT Pro',
    //   des: 'Nhap Mon Cong Nghe Phan Mem',
    //   quantityStudent: 170,
    //   fee: 258,
    //   imageUrl: 'image1.png',
    //   teacherId: '61b35d7ea313d12c86ff2d3e'
    // })
    // await newCourse.save()
    // console.log(newCourse)
    // const newTeacher = new UserModel({
    //   email: 'ndthang@gmail.com',
    //   password: 'Ducthang123456',
    //   name: 'Peter Nguyễn',
    //   age: 32,
    //   role: 1,
    //   information: 'Đã học tại trường KHTN\nCó kinh nghiệm giảng dạy tại nhiều trường',
    //   tel: '0357156559'
    // })
    // await newTeacher.save()
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