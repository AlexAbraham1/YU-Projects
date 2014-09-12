'use strict';

angular.module('yuProjectsApp')
  .controller('AdminCtrl', function ($scope, User, Project, Modal, Logger) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.projects = Project.query();

  });
