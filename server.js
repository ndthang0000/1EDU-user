const express = require('express')
const app = express()
const path = require('path')

const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const config = require('./src/config')
const route = require('./src/routes')
const { databaseUtil } = require('./src/helpers')
const { passportMiddleware } = require('./src/middlewares')

// Connect DB
databaseUtil.connectDatabase().then(() => {
  // View Engine
  app.set('view engine', 'ejs')
  app.set('views', path.join(__dirname, '/src/views'))
  app.use(express.static(path.join(__dirname, '/public')))

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(logger('dev'))

  // Session

  const sessionStore = new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
  })

  app.use(session({
    store: sessionStore,
    secret: config.SECRET_KEY,
    saveUninitialized: true,
    cookie: {
      // Creating 24 hours * 7 days from milliseconds
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    resave: false
  }))

  // Passport
  passportMiddleware.applyPassportMiddleware(passport)
  app.use(passport.initialize())
  app.use(passport.session())
  app.use((req, res, next) => {
    if (req.isAuthenticated()) {
      res.locals.user = req.user
    } else {
      res.locals.user = false
    }
    next()
  })
  // Routes
  route(app)

  // Listen
  app.listen(config.PORT, () => {
    console.log('Server is listening on port', config.PORT)
  })
}).catch((error) => {
  console.log('Error', error)
})
