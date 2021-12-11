const LocalStrategy = require('passport-local').Strategy

const { UserModel } = require('../models')

const registerStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await UserModel.create({ email, password })
      return done(null, user)
    } catch (error) {
      done(error)
    }
  }
)

const loginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await UserModel.findOne({ email })

      if (!user) {
        return done(null, false, { message: 'Incorrect username' })
      }

      const validate = await user.isValidPassword(password)

      if (!validate) {
        return done(null, false, { message: 'Incorrect password' })
      }

      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
)

const serializeUser = (user, done) => done(null, user._id)

const deserializeUser = async (id, done) => {
  try {
    const user = await UserModel.findById(id)
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}

const applyPassportMiddleware = (passport) => {
  passport.use('register', registerStrategy)
  passport.use('login', loginStrategy)

  passport.serializeUser(serializeUser)
  passport.deserializeUser(deserializeUser)

  return passport
}

module.exports = {
  applyPassportMiddleware
}
