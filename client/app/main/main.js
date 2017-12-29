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
          bookGenres: function(BooksService) {
            return BooksService.genres().$promise;
          }
        }
      });
  });
