'use strict';

var express = require('express');
var controller = require('./book.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/genres', controller.genres);

module.exports = router;
