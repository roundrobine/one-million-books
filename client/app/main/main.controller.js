'use strict';
(function() {

  var MainCtrl = function ($scope, BooksService) {

    var vm = this;
    const SORT_BY_TITLE = 'name';
    const SORT_BY_AUTHOR_NAME = "author.name";
    vm.propToSortOn = '';
    vm.reverse = false;
    vm.isLoading = false;

    // In this example, we set up our model using a class.
    var DynamicItems = function() {

      this.pageSize = 150;
      this.waitStep = 135;
      this.pageNumber = 0;
      this.numLoaded = 0;
      this.toWait = 0;
      this.books = [];

    };


    // we implement the contract of getItemAtIndex function.
    DynamicItems.prototype.getItemAtIndex = function(index) {
      if (index > this.numLoaded) {
        this.fetchMoreItems(index, vm.propToSortOn);
        return null;
      }
      return this.books[index];
    };


    // we implement the contract of getLength function
    // For infinite scroll behavior, we always return a slightly higher
    // number than the previously loaded items.
    DynamicItems.prototype.getLength = function() {
      return this.numLoaded + 35;
    };


    DynamicItems.prototype.fetchMoreItems = function(index, sortBy) {
      var limit = this.pageSize;
      var waitStep = this.waitStep;
      if(sortBy){
        vm.isLoading = true;
        limit = 10 * limit;
        waitStep = 10 * waitStep;
      }
      if (this.toWait < index) {
        this.toWait += waitStep;
        this.pageNumber += 1;
        BooksService.paged({
            page: this.pageNumber,
            limit: limit,
            sortBy: sortBy
          },
          function (books) {
            this.books = this.books.concat(books.docs);
            this.numLoaded = this.toWait;
            vm.isLoading = false;
          }.bind(this));
      }
    }

    vm.sort = function(sortBy){
      vm.dinamicBooks = null;
      vm.topIndex = 0;
      vm.propToSortOn = sortBy;
      vm.reverse = !vm.reverse;
      if(vm.reverse){
        vm.propToSortOn = '-' + vm.propToSortOn;
      }
      vm.dinamicBooks = new DynamicItems();
    };

    vm.dinamicBooks = new DynamicItems();

  };

  MainCtrl.$inject = ['$scope', 'BooksService'];

  angular.module('oneMillionBooksApp')
    .controller('MainCtrl', MainCtrl);

}());
