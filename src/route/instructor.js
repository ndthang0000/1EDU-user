const express = require('express')
const router = express.Router()
const InstructorController=require('../controller/InstructorController')


router.get('/',InstructorController.index)
module.exports=router