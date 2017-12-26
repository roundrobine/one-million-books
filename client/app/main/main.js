'use strict';

angular.module('oneMillionBooksApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm',
        resolve: {
          books: function(BooksService) {
            return BooksService.paged(
              { page: 1,
                limit: 50,}).$promise;
          }
        }
      });
  });
