const express = require('express')
const router = express.Router()
const ContactRouter = require('../controllers/ContactController')

router.get('/', ContactRouter.index)
module.exports = router
