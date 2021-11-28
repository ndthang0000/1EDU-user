const CourseRouter = require('./course')
const HomeRouter=require('./home')
const InstructorRouter=require('./instructor')
const BlogRouter=require('./blog')
const ContactRouter=require('./contact')

function route(app){
    app.use('/course',CourseRouter)
    app.use('/instructor',InstructorRouter)
    app.use('/blog',BlogRouter)
    app.use('/contact',ContactRouter)
    app.use('/',HomeRouter)
}

module.exports=route