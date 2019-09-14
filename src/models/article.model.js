const mongoose = require('mongoose');

const articleModel = mongoose.model(
  'Article',
  new mongoose.Schema(
    {
      title: String,
      content: String
    },
    { timestamps: true }
  )
);

module.exports = articleModel;
