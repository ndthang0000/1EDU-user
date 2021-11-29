const express = require('express')
const router = express.Router()

const { blogController } = require('../controllers')

router.get('/', blogController.home)

module.exports = router
