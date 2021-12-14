const express = require('express')
const router = express.Router()
const passport = require('passport')

const { authMiddleware } = require('../middlewares')
const { UserModel } = require('../models')

router.post('/register', async (req, res) => {
  const findExistUser = await UserModel.findOne({ email: req.body.email })
  if (findExistUser) {
    return res.status(200).json({ success: false })
  }
  const newUser = new UserModel({
    ...req.body
  })
  await newUser.save()
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
