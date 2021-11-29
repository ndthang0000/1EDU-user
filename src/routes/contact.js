const express = require('express')
const router = express.Router()
const ContactRouter=require('../controller/ContactController')


router.get('/',ContactRouter.index)
module.exports=router