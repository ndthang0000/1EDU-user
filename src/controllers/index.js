const blogController = require('./blog')
const contactController = require('./contact')
const homeController = require('./home')
const instructorController = require('./instructor')
const courseController = require('./course')
const teacherController = require('./teacher')
const checkoutController = require('./checkout')
const cartController = require('./cart')
const profileController = require('./profile')

module.exports = {
  blogController,
  courseController,
  instructorController,
  homeController,
  contactController,
  teacherController,
  checkoutController,
  cartController,
  profileController
}
