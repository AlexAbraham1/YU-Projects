'use strict';

angular.module('yuProjectsApp')
  .controller('SingleCtrl', function ($scope, Project, $routeParams) {
    $scope.project = Project.get({id: $routeParams.projectId});
  });
