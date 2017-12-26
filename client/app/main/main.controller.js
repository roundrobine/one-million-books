'use strict';
(function() {

  var MainCtrl = function ($scope, BooksService, books) {

    var vm = this;
    const SORT_BY_TITLE = 'name';
    const SORT_BY_AUTHOR_NAME = "author.name";
    vm.propToSortOn = '';
    vm.reverse = false;

    // In this example, we set up our model using a class.
    // is that we implement getItemAtIndex and getLength.
    var DynamicItems = function(books) {
      /**
       * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
       */
      this.loadedPages = {};

      /** @type {number} Total number of items. */
      this.numItems = books.total;

      /** @const {number} Number of items to fetch per request. */
      this.PAGE_SIZE = 50;
    };

    // Required.
    DynamicItems.prototype.getItemAtIndex = function(index) {
      var pageNumber = Math.floor(index / this.PAGE_SIZE);
      var page = this.loadedPages[pageNumber];

      if (page) {
        return page[index % this.PAGE_SIZE];
      }
      else if (page !== null) {
        this.fetchPage_(pageNumber);
      }
    };

    // Required.
    DynamicItems.prototype.getLength = function() {
      return this.numItems;
    };


    DynamicItems.prototype.fetchPage_ = function(pageNumber) {
      // Set the page to null so we know it is already being fetched.
      this.loadedPages[pageNumber] = null;

      if(books){
        this.loadedPages[pageNumber] = [];
        var pageOffset = books.offset;
        this.loadedPages[pageNumber] = books.docs;
        books = null;
      }else {
        BooksService.paged({
          page: pageNumber +1,
          limit: this.PAGE_SIZE
        },
        function (books) {
          this.loadedPages[pageNumber] = [];
          var pageOffset = books.offset;
          this.loadedPages[pageNumber] = books.docs;
        }.bind(this));
     }
    };

    vm.sort = function(keyname){
      vm.propToSortOn = keyname;
      vm.reverse = !vm.reverse;
      if(vm.reverse){
        vm.propToSortOn = '-' + vm.propToSortOn;
      }
      //getResultsPage($scope.currenPage);
    };

    vm.dinamicBooks = new DynamicItems(books);

  };

  MainCtrl.$inject = ['$scope', 'BooksService', 'books'];

  angular.module('oneMillionBooksApp')
    .controller('MainCtrl', MainCtrl);

}());
