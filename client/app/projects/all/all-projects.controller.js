'use strict';

angular.module('yuProjectsApp')
  .controller('AllProjectsCtrl', function ($scope, Auth, Project) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    var currentUser = Auth.getCurrentUser();
    $scope.projects = Project.query({active: true, req: 'name description languages author votes'});

    $scope.voteUp = function (project) {
      if (!currentUser.voted) {
        project.votes++;
      } else if (!currentUser.voted.direction) {
        project.votes += 2;
      }
      //TODO allow for rating multiple project
      //Push to array of voted
      Project.update({id: project._id}, project);
      Auth.getCurrentUser().voted =  {direction: true};

    };

    $scope.voteDown = function (project) {
      if (!currentUser.voted) {
        project.votes--;
      } else if (currentUser.voted.direction) {
        project.votes -= 2;
      }
      Project.update({id: project._id}, project);
      Auth.getCurrentUser().voted =  {direction: false};
    };
  });
