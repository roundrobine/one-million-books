'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  author:{
    name: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    }
  },
  genre: {
    type: String,
    required: true
  },
  publish_date: {
    type: Date,
    required: true
  }
});

export default mongoose.model('Book', BookSchema);
