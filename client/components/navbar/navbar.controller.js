'use strict';

angular.module('yuProjectsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.hasSubmitted = function () {
//      if (Auth.isLoggedIn()) {
//        Project.get()
//      }
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
