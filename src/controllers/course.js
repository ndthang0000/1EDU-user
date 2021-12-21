const { CourseModel, StudentCourseModel, CourseSchedule, UserModel, CategoryModel, LevelModel } = require('../models')
const { helper } = require('../helpers')
const home = async (req, res) => {
  let { page } = req.query
  if (!page) {
    page = 1
  }
  try {
    const allCourse =
      await CourseModel
        .find({}).sort({ updatedAt: -1 })
        .populate('teacherId')
        .limit(6).skip(page * 6 - 6 || 0)
    const quantity = await CourseModel.count()
    const category = await CategoryModel.find({})
    const allTeacher = await UserModel.find({ role: 1 })
    const level = await LevelModel.find({})
    res.render('course',
      {
        allCourse,
        category,
        allTeacher,
        level,
        currentPage: page,
        quantity: parseInt(quantity / 6) + 1,
        formatTime: helper.formatTime,
        formatMoney: helper.formatMoney
      })
  } catch (e) {
    console.log(e)
  }
}

const search = async (req, res) => {
  let { search, category, teacher, type } = req.query
  let newCategory = []
  let newTeacher = []
  let newType = []
  const categoryList = await CategoryModel.find({})
  const typeList = await LevelModel.find({})
  const teacherList = await UserModel.find({ role: 1 }).limit(5)
  if (!search) {
    search = ' '
  }
  function myCate (item) {
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].tittle === item) {
        return categoryList[i]._id
      }
    }
  }
  function myLevel (item) {
    for (let i = 0; i < typeList.length; i++) {
      if (typeList[i].tittle === item) {
        return typeList[i]._id
      }
    }
  }
  function myTeacher (item) {
    for (let i = 0; i < teacherList.length; i++) {
      if (teacherList[i].name === item) {
        return teacherList[i]._id
      }
    }
  }
  if (category) {
    if (Array.isArray(category)) {
      newCategory = category.map(myCate)
      category = category.map(myCate)
    } else {
      for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].tittle === category) {
          newCategory = [categoryList[i]._id]
          category = [categoryList[i]._id]
        }
      }
    }
  } else {
    newCategory = categoryList.map(item => item._id)
    category = []
  }
  if (type) {
    if (Array.isArray(type)) {
      newType = type.map(myLevel)
      type = type.map(myLevel)
    } else {
      for (let i = 0; i < typeList.length; i++) {
        if (typeList[i].tittle === type) {
          newType = [typeList[i]._id]
          type = [typeList[i]._id]
        }
      }
    }
  } else {
    newType = typeList.map(item => item._id)
    type = []
  }
  if (teacher) {
    if (Array.isArray(teacher)) {
      newTeacher = teacher.map(myTeacher)
      teacher = teacher.map(myTeacher)
    } else {
      for (let i = 0; i < teacherList.length; i++) {
        if (teacherList[i].name === teacher) {
          newTeacher = [teacherList[i]._id]
          teacher = [teacherList[i]._id]
        }
      }
    }
  } else {
    newTeacher = teacherList.map(item => item._id)
    teacher = []
  }

  try {
    const listCourse = []
    const allCourse = await CourseModel.find({ teacherId: { $in: newTeacher }, categoryId: { $in: newCategory }, levelId: { $in: newType } })
      .sort({ updatedAt: -1 })
      .populate('teacherId')
      .populate('levelId')
      .populate('categoryId')
      .limit(6)
    //
    for (const i in allCourse) {
      if (allCourse[i].name.toLowerCase().indexOf(search) !== -1 ||
        allCourse[i]?.des.toLowerCase().indexOf(search) !== -1 ||
        allCourse[i].teacherId.name.toLowerCase().indexOf(search) !== -1) {
        listCourse.push(allCourse[i])
      }
    }
    console.log(newType)
    res.render('course-search', {
      allCourse: listCourse,
      category: categoryList,
      allTeacher: teacherList,
      level: typeList,
      formatTime: helper.formatTime,
      formatMoney: helper.formatMoney,
      currentPage: 1,
      quantity: parseInt(listCourse.length / 6) + 1,
      search,
      newCategory: category,
      newTeacher: teacher,
      newType: type
    })
  } catch (e) {
    console.log(e)
  }
}
const detail = async (req, res) => {
  const { slug } = req.params
  const course = await CourseModel.findOne({ slug: slug }).populate('categoryId')
  res.render('course-detail', { course, formatTime: helper.formatTime, formatMoney: helper.formatMoney, newLine: helper.newLine })
}
const getArray = async (req, res) => {
  const { cart } = req.body
  const allCourse = await CourseModel.find({ _id: cart })
  res.status(200).json({ allCourse, success: true })
}
const getOne = async (req, res) => {
  const { id } = req.params
  const course = await StudentCourseModel.findOne({ courseId: id }).populate('courseId')
  if (course) {
    return res.status(200).json({ course, success: true })
  }
  res.status(400).json({ success: false })
}
const getSchedule = async (req, res) => {
  try {
    const allSchedule = await CourseSchedule.find({ courseId: req.params.id })
    res.status(200).json({ success: true, allSchedule })
  } catch (e) {
    return res.json({ success: false })
  }
}

module.exports = {
  home,
  search,
  detail,
  getArray,
  getOne,
  getSchedule
}
