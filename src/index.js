const cors = require('cors')
const dotenv = require('dotenv')
const config = require('./config/upload')
const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const path = require('path')

dotenv.config()
const app = express()

const PORT = process.env.PORT || 8000

app.set('PORT', PORT)

mongoose.connect(process.env.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use(express.json())
app.use(cors())
app.use('/', routes)

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
)

server.listen(PORT)

console.log('API Running at port 3000')
