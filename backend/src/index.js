const express = require('express')
const mongoose = require('mongoose')
const mongoDB = require('../config')

const DB = mongoose.connect(mongoDB)

const app = express()

app.get('/', (req, res) => {
  return res.send(`Hellow ${req.query.name}`)
})

app.listen(3000)
