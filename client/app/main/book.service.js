/**
 * Created by Dimitar on 24/12/2017.
 */
'use strict';
(function() {
  var BooksService = function($resource) {

    return $resource('/api/books/:id', {
      id: '@id'
    }, {
      paged: {
        method:'GET'
      },
      genres: {
        method: 'GET',
        isArray: true,
        params: {
          id:'genres'
        }
      }
    });
  };

  BooksService.$inject = ['$resource'];

  angular.module('oneMillionBooksApp').factory('BooksService',
    BooksService);

}());
