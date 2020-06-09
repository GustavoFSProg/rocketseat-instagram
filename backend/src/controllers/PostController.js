const postModel = require('../models/post')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
  async index(req, res) {
    const data = await postModel.find().sort('-createdAt')

    return res.json({ data })
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body
    const { filename: image } = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(path.resolve(req.file.destination, 'resized', filename))

    fs.unlinkSync(req.file.path)

    const post = await postModel.create({
      author,
      description,
      place,
      hashtags,
      image: filename,
    })

    req.io.emit('Post', post)

    return res.json(post), console.log(req.file)
  },
}
