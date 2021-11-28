
class CourseController{
    async index(req,res){
        res.render('course')
    }
}
module.exports=new CourseController