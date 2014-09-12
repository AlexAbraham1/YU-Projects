'use strict';

angular.module('yuProjectsApp')
  .controller('AllProjectsCtrl', function ($scope, Auth, Project) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    var currentUser = Auth.getCurrentUser();
    $scope.projects = Project.query({active: true, req: 'name description languages author votes'});

    $scope.vote = function (project, direction) {
      var vote = _.find(currentUser.votes, function(v){
        return v.projectId == project._id;
      });
      if (!Auth.getCurrentUser().votes) Auth.getCurrentUser().votes = [];
      if (direction === 'up') {
        if (!vote) project.votes++;
        else if (!vote.direction && vote)  project.votes += 2;
        Auth.getCurrentUser().votes.push({
          projectId: project._id,
          direction: true
        });
      } else if (direction === 'down') {
        if (!vote) project.votes--;
        else if (vote.direction && vote)  project.votes -= 2;
        Auth.getCurrentUser().votes.push({
          projectId: project._id,
          direction: false
        });
      }
      Project.update({id: project._id}, project);
    };
  });
