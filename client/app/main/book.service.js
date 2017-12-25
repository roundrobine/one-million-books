/**
 * Created by Dimitar on 24/12/2017.
 */
'use strict';
(function() {
  var BooksService = function($resource) {

    return $resource('/api/books/:id', {
      id: '@id'
    });
  };

  RulesService.$inject = ['$resource'];

  angular.module('phisheduproApp').factory('BooksService',
    BooksService);

}());
