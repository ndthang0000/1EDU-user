const express = require('express')
const router = express.Router()

router.get('/me', (req, res) => {
  res.json({
    user: req.user
  })
})

module.exports = router
