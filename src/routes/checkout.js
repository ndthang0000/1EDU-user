const express = require('express')

const router = express.Router()

const { checkoutController } = require('../controllers')

router.get('/', checkoutController.cart)
router.post('/', checkoutController.checkout)
router.get('/:id', checkoutController.one)
module.exports = router
