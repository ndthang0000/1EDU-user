const express = require('express')
const router = express.Router()
const CourseController=require('../controllers/CourseController')


router.get('/',CourseController.index)
module.exports=router