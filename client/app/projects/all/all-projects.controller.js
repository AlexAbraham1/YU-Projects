'use strict';

angular.module('yuProjectsApp')
  .controller('AllProjectsCtrl', function ($scope, Auth, Project) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    var currentUser = Auth.getCurrentUser();
    $scope.projects = Project.query({active: true, req: 'name description languages author votes'});

    $scope.voteUp = function (project) {
      if (!currentUser.voted || !currentUser.voted.direction) {
        project.votes++;
        Project.update({id: project._id}, project);
        Auth.getCurrentUser().voted = {direction: true};
      }

    };

    $scope.voteDown = function (project) {
      if (!currentUser.voted || currentUser.voted.direction) {
        project.votes--;
        Project.update({id: project._id}, project);
        Auth.getCurrentUser().voted =  {direction: false};
      }
    };
  });
