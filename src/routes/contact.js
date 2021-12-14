const express = require('express')
const router = express.Router()
const { contactController } = require('../controllers')

router.get('/', contactController.home)
router.post('/', contactController.signInTeacher)
module.exports = router
