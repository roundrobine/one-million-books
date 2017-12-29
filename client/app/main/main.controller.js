'use strict';
(function() {

  var MainCtrl = function ($scope, BooksService, bookGenres) {

    var vm = this;
    const SORT_BY_TITLE = 'name';
    const SORT_BY_AUTHOR_NAME = "author.name";
    const INITIAL_WAIT_STEP = 120;
    const PAGE_SIZE = 150;
    const GENRE_FINANCE = "Finance";
    const GENRE_HORROR = "Horror";
    const HALLOWEEN_DAY = 31;
    //momentjs months are 0 indexed
    const HALLOWEEN_MONTH = 9;

    vm.propToSortOn = '';
    vm.propToFilterOn = '';
    vm.reverse = false;
    vm.isLoading = false;
    bookGenres.unshift("All");
    vm.bookGenres = bookGenres;
    vm.bookGenreSelected = 'All';
    vm.genderOptions = ['All', 'male', 'female'];
    vm.authorGenderSelected = 'All';

    // In this example, we set up our model using a class.
    var DynamicItems = function() {
      this.pageSize = PAGE_SIZE;
      this.waitStep = INITIAL_WAIT_STEP;
      this.pageNumber = 0;
      this.numLoaded = 0;
      this.toWait = 0;
      this.lastPageBooks = 0;
      this.books = [];
      //-1 is used to distinguish initial request from empty list of books
      this.total = -1;
    };


    // we implement the contract of getItemAtIndex function.
    DynamicItems.prototype.getItemAtIndex = function(index) {
      if (index > this.numLoaded && (this.total > this.numLoaded || (this.numLoaded === 0 && this.total === -1))) {
        this.fetchMoreItems(index, vm.propToSortOn);
        return null;
      }
      return this.books[index];
    };


    // we implement the contract of getLength function
    // For infinite scroll behavior, we always return a slightly higher
    // number than the previously loaded items.
    DynamicItems.prototype.getLength = function() {
      if((this.total === this.numLoaded) ||
        (this.total === 0 && this.numLoaded === 0 && this.waitStep > INITIAL_WAIT_STEP))
        return this.numLoaded;
      return this.numLoaded + 50;
    };


    DynamicItems.prototype.fetchMoreItems = function(index, sortBy) {
      var limit = this.pageSize;
      var waitStep = this.waitStep;
      var bookGenre = vm.bookGenreSelected;
      var authorGender = vm.authorGenderSelected;


      if(vm.bookGenreSelected === 'All'){
         bookGenre = '';
      }
      if(vm.authorGenderSelected === 'All'){
         authorGender = '';
      }
      if(sortBy){
        vm.isLoading = true;
        limit = 5 * limit;
        waitStep = 5 * waitStep;
      }
      if (this.toWait < index && (this.lastPageBooks === limit || this.lastPageBooks === 0) ) {
        this.toWait += waitStep;
        this.pageNumber += 1;
        BooksService.paged({
            page: this.pageNumber,
            limit: limit,
            sortBy: sortBy,
            genre: bookGenre,
            gender: authorGender

          },
          function (books) {
            vm.isLoading = false;
            this.lastPageBooks = books.docs.length;
            this.total = books.total;
            this.books = this.books.concat(books.docs);
            if(this.total >= limit) {
              this.numLoaded = this.toWait;
            } else {
              this.numLoaded = this.total;
            }

            for(var i=0; i < this.books.length; i++){
              var isLastFriday = isLastFridayForMonth(this.books[i].publish_date);
              var isHalloweenDay = isHalloween(this.books[i].publish_date);
              if(isLastFriday && this.books[i].genre === GENRE_FINANCE){
                this.books[i].lastFridayTag = true;
              }
              if(isHalloweenDay && this.books[i].genre === GENRE_HORROR){
                this.books[i].halloween = true;
              }
            }

          }.bind(this));
      }
    };

    vm.sort = function(sortBy){
      vm.topIndex = 0;
      vm.propToSortOn = sortBy;
      vm.reverse = !vm.reverse;
      if(vm.reverse){
        vm.propToSortOn = '-' + vm.propToSortOn;
      }
      vm.dinamicBooks = new DynamicItems();
    };

    vm.filter = function(filterBy){
      vm.topIndex = 0;
      vm.dinamicBooks = new DynamicItems();
    };

    var isLastFridayForMonth = function (publishDate) {
      var lastDay = moment(publishDate).utc().endOf('month').startOf('day');
      var sub = 0;
      if (lastDay.day() >= 5)
        sub = lastDay.day() - 5;
      else
        sub = lastDay.day() + 2;
      var datToCompare = moment(lastDay.subtract(sub, 'days').format('YYYY-MM-DD'));
      return datToCompare.isSame(moment(publishDate, 'YYYY-MM-DD'), 'day');
    };

    var isHalloween = function (publishDate) {
      var day = moment(publishDate).utc().date();
      var month = moment(publishDate).utc().month();
      return (day === HALLOWEEN_DAY && month === HALLOWEEN_MONTH);
    };

    vm.dinamicBooks = new DynamicItems();
  };




  MainCtrl.$inject = ['$scope', 'BooksService', 'bookGenres'];

  angular.module('oneMillionBooksApp')
    .controller('MainCtrl', MainCtrl);

}());
