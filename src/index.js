const dotenv = require('dotenv')
const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const path = require('path')

dotenv.config()

let port = process.env.PORT

if (port == null || port === '') {
  port = 8000
}

mongoose.connect(process.env.mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((req, res, next) => {
  req.io = io

  next()
})

app.use(express.json())
app.use(cors())
app.use(routes)

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))
)

server.listen(port)

console.log('API Running at port 3000')
