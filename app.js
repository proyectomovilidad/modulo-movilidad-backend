'use strict'
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const routing = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}))
//app.use(express.urlencoded({ limit: '500mb', extended: false }))
//app.use(express.json({limit: '500mb'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, 'public')))
//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
//    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
//    next()
//})


routing(app)
module.exports = app