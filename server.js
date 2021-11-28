const express = require('express')
const app = express()
const path = require('path');
const route=require('./src/route/route')
const database=require('./src/database/index')
require('dotenv').config()

app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())

app.use(express.static(path.join(__dirname,'/src/public'))) // public 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));



database.connect()
route(app)

app.listen(3000)