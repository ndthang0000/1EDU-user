const express = require('express')
const router = express.Router()
const { profileController } = require('../controllers')
const { multerMiddleware } = require('../middlewares')

router.get('/me', profileController.home)
router.post('/me', multerMiddleware.single('avatar'), profileController.saveProfile)
router.get('/course', profileController.course)

module.exports = router
