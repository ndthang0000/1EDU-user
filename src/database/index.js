const mongoose = require('mongoose');
connect=async()=>{
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f3ytn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('connect database successfully')
    }catch(err){
        console.log(err)
    }
}
module.exports={connect}