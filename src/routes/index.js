const CourseRouter = require('./course')
const HomeRouter = require('./home')
const InstructorRouter = require('./instructor')
const BlogRouter = require('./blog')
const ContactRouter = require('./contact')
const authRouter = require('./auth')
const profileRouter = require('./profile')
const TeacherRouter = require('./teacher')

const { authMiddleware } = require('../middlewares')

function route (app) {
  app.use('/course', CourseRouter)
  app.use('/instructor', InstructorRouter)
  app.use('/blog', BlogRouter)
  app.use('/', HomeRouter)
  app.use('/auth', authRouter)
  app.use('/contact', authMiddleware.isAuthenticated, ContactRouter)
  app.use('/profile', authMiddleware.isAuthenticated, profileRouter)
  app.use('/teacher', authMiddleware.isTeacher, TeacherRouter)
}

module.exports = route
