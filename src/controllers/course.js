// const { UserModel } = require('../models')

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
    res.render('course')
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  home
}
