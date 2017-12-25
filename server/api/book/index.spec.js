'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bookCtrlStub = {
  index: 'bookCtrl.index',
};

var routerStub = {
  get: sinon.spy(),
};

// require the index with our stubbed out modules
var bookIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './book.controller': bookCtrlStub
});

describe('Book API Router:', function() {

  it('should return an express router instance', function() {
    expect(bookIndex).to.equal(routerStub);
  });

  describe('GET /api/books', function() {

    it('should route to book.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'bookCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/books/:id', function() {

    it('should route to book.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'bookCtrl.show')
        ).to.have.been.calledOnce;
    });

  });
});
