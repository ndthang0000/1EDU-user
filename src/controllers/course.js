
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
    // // const newTeacher = new UserModel({
    // //   email: 'thannguyen@gmail.com',
    // //   password: 'Ducthang123456'
    // // })
    // // await newTeacher.save()
    res.render('course')
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  home
}
