'use strict';

angular.module('yuProjectsApp')
  .controller('SingleCtrl', function ($scope, Project, $routeParams) {
    $scope.ready = false;

    Project.get({id: $routeParams.projectId}, function (project) {
      $scope.project = project;
      $scope.ready = true;
    });

  });
