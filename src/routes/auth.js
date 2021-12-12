const express = require('express')
const router = express.Router()
const passport = require('passport')

const { authMiddleware } = require('../middlewares')

router.get('/register', authMiddleware.isNotAuthenticated, (req, res) => {
  res.render('auth/register')
})

router.post('/register', (req, res) => {
  console.log(req.body)
  res.status(200).json({ success: true })
})

router.get('/login', authMiddleware.isNotAuthenticated, (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('login', {
  failureRedirect: '/auth/login?res=FAILED',
  successRedirect: '/'
}))

router.get('/logout', authMiddleware.isAuthenticated, (req, res) => {
  req.logOut()
  res.redirect('/auth/login')
})

module.exports = router
