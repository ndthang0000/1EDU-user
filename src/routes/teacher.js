const express = require('express')
const router = express.Router()

const { teacherController } = require('../controllers')

router.get('/:id', teacherController.home)
router.get('/:id/course/create', teacherController.create)
router.get('/:id/course/:slug/edit', teacherController.editCourse)
router.get('/:id/course/:slug/detail', teacherController.detailCourse)

module.exports = router
