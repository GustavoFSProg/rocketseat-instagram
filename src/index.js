const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const path = require('path')

dotenv.config()

const app = express()
const DB = mongoose.connect(process.env.mongoDB)

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use(express.json())
app.use(cors())

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
)
app.use(require('./routes'))

server.listen(3000)

console.log('API Running at port 3000')
