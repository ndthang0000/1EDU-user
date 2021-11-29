const blogController = require('./blog')
const authController = require('./auth')
const contactController = require('./contact')
const homeController = require('./home')
const instructorController = require('./instructor')
const courseController = require('./course')

module.exports = {
  blogController,
  authController,
  courseController,
  instructorController,
  homeController,
  contactController
}
