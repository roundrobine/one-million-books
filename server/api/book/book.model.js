'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var mongoosePaginate = require('mongoose-paginate');

var BookSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    index: true
  },
  author:{
    name: {
      type: String,
      required: true,
      index: true
    },
    gender: {
      type: String,
      required: true
    }
  },
  genre: {
    type: String,
    required: true,
    index: true
  },
  publish_date: {
    type: Date,
    required: true
  }
});

BookSchema.plugin(mongoosePaginate);

export default mongoose.model('Book', BookSchema);
