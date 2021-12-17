const blogController = require('./blog')
const authController = require('./auth')
const contactController = require('./contact')
const homeController = require('./home')
const instructorController = require('./instructor')
const courseController = require('./course')
const teacherController = require('./teacher')
const checkoutController = require('./checkout')
const cartController = require('./cart')

module.exports = {
  blogController,
  authController,
  courseController,
  instructorController,
  homeController,
  contactController,
  teacherController,
  checkoutController,
  cartController
}
