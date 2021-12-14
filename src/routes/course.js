const express = require('express')
const router = express.Router()
const { courseController } = require('../controllers')

router.get('/', courseController.home)
router.get('/search', courseController.search)
router.get('/:slug', courseController.detail)
module.exports = router

// Folders
// folder-name
// nguyen-chanh-dai

// Files
// camelCase
// userController.js
// courseController.js
