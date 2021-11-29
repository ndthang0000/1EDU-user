
class InstructorController{
    async index(req,res){
        res.render('instructor')
    }
}
module.exports=new InstructorController