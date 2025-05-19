const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  imgURL: {
    type: String,
    required: true
  },
  imgDate: {
    type: String,
    required: true
  },
  imgTitle: {
    type: String,
    required: true
  },
  gratitudeText: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
