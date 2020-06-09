const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const mongoDB = require('../config')
const path = require('path')
const cors = require('cors')

const app = express()
const DB = mongoose.connect(mongoDB)

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io

  next()
})

const cors = require(cors())

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
)
app.use(require('./routes'))

server.listen(3000)

console.log('API Running at port 3000')
