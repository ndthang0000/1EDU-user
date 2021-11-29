const express = require('express')
const router = express.Router()
const {contactController} = require('../controllers')

router.get('/', contactController.home)
module.exports = router
