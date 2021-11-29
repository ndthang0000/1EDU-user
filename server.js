const express = require('express')
const app = express()
const path = require('path')
const route = require('./src/routes/route')

const { connectToDB } = require('./src/helpers')

require('dotenv').config()

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public'))) // public
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views'))

// Connect DB
connectToDB()

// Routes
route(app)

// Listen
app.listen(3000)
