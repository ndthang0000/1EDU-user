const express = require('express')
const router = express.Router()

const { teacherController } = require('../controllers')
const { multerMiddleware } = require('../middlewares')

router.get('/:id/course/schedule', teacherController.schedule)
router.post('/:id/course/schedule', teacherController.createSchedule)
router.get('/:id/course/create', teacherController.create)
router.post('/:id/course/create', multerMiddleware.single('image'), teacherController.saveCreate)
router.get('/:id/course/:slug/edit', teacherController.editCourse)
router.post('/:id/course/:slug/edit', multerMiddleware.single('image'), teacherController.saveEditCourse)
router.get('/:id/course/:slug/detail', teacherController.detailCourse)
router.get('/:id', teacherController.home)

module.exports = router
