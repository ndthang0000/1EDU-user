const express = require('express')
const router = express.Router()
const { profileController } = require('../controllers')
const { multerMiddleware } = require('../middlewares')

router.get('/me', profileController.home)
router.post('/me/avatar', multerMiddleware.single('avatar'), profileController.saveImage)
router.post('/me', profileController.saveProfile)
router.get('/course', profileController.course)

module.exports = router
