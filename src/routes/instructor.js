const express = require('express')
const router = express.Router()
const {instructorController} = require('../controllers')

router.get('/', instructorController.home)
module.exports = router
