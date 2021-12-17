const express = require('express')

const router = express.Router()

const { cartController } = require('../controllers')

router.get('/get/:id', cartController.cart)
router.post('/add', cartController.add)
router.post('/delete', cartController.deletee)
router.get('/', cartController.home)

module.exports = router
