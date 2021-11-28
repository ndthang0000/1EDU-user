const express = require('express')
const router = express.Router()
const BlogController=require('../controller/BlogController')


router.get('/',BlogController.index)
module.exports=router