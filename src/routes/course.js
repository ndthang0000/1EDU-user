const express = require('express')
const router = express.Router()
const {courseController} = require('../controllers')

router.get('/', courseController.home)
module.exports = router

// Folders
// folder-name
// nguyen-chanh-dai

// Files
// camelCase
// userController.js
// courseController.js
