const {Course} = require('../models')

const home = async (req, res) => {
  try{
    const newCourse = new Course({
      name:'Course 1',
      des:'This is my course',
      quantityStudent:200,
      fee:200,
      imageUrl:'image1.png'
    })
    await newCourse.save()
    console.log(newCourse)
    res.render('course')
  }
  catch(e){
    console.log(e)
  }
}

module.exports = {
  home
}
