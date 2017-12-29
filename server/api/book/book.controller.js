/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/books              ->  index
 * POST    /api/books              ->  create
 * GET     /api/books/:id          ->  show
 * PUT     /api/books/:id          ->  update
 * DELETE  /api/books/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Book = require('./book.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

// Gets a list of Books
export function index(req, res) {

  //Create the query
  var query = {};
  var sortBy = req.query.sortBy;
  if(sortBy && sortBy.length > 0){
      switch(sortBy) {
        case "author.gender":
          query["author.gender"] = sortBy;
          break;
        case "genre":
          query["genre"] = sortBy;
          break;
        default:
          break;
      }
  }

  if(req.query.gender && req.query.gender.length > 0){
    query["author.gender"] = req.query.gender;
  }

  if(req.query.genre && req.query.genre.length > 0){
    query["genre"] = req.query.genre;
  }

  //Make sure limit and page are numbers and above 1
  if(!req.query.limit || parseFloat(req.query.limit) < 1){
    req.query.limit = 25;
  }
  if(!req.query.page || parseFloat(req.query.page) < 1){
    req.query.page = 1;
  }

  //Create the offset (ex. page = 1 and limit = 25 would result in 0 offset. page = 2 and limit = 25 would result in 25 offset.)
  var offset = (req.query.page - 1) * req.query.limit;

  //Testing if offset is bigger then result, if yes set offset to zero
  Book.count(query, function(err, count) {
    if(offset > count){
      offset = 0;
    }

    //Create object for pagination query
    var options = {
      select: 'name author genre publish_date',
      sort: req.query.sortBy,
      offset: offset,
      limit: parseFloat(req.query.limit)
    };

    //Do the actual pagination
    Book.paginate(query, options)
      .then(responseWithResult(res))
      .catch(handleError(res));

  });
}

export function genres(req, res) {

  Book.distinct('genre')
    .execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}
