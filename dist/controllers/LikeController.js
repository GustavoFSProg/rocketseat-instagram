'use strict';

const postModel = require('../models/post');

module.exports = {
  async store(req, res) {
    const post = await postModel.findById(req.params.id);

    post.likes += 1;
    await post.save();
    req.io.emit('Like', post);

    return res.json({ post });
  }
};