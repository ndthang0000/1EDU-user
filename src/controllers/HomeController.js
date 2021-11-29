
class HomeController{
    async index(req,res){
        res.render('home')
    }
}
module.exports=new HomeController