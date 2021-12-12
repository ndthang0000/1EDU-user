const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/auth/login')
}

const isNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  next()
}

const isTeacher = (req, res, next) => {
  if (req.user.role === 1) {
    return next()
  }
  return res.redirect('/')
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  isTeacher
}
