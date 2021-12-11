const passportMiddleware = require('./passport')
const authMiddleware = require('./auth')
const multerMiddleware = require('./multer')

module.exports = {
  passportMiddleware,
  authMiddleware,
  multerMiddleware
}
