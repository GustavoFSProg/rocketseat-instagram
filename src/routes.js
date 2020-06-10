const express = require('express')
const multer = require('multer')
const postController = require('./controllers/PostController')
const uploadsConfig = require('./config/upload')
const likeController = require('./controllers/LikeController')

const upload = multer(uploadsConfig)

const routes = new express.Router()

routes.get('/', postController.getAll)
routes.post('/posts', upload.single('image'), postController.store)
routes.get('/posts', postController.index)

routes.post('/posts/:id/like', likeController.store)

module.exports = routes
