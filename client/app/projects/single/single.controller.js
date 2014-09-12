'use strict';

angular.module('yuProjectsApp')
  .controller('SingleCtrl', function ($scope, Project, $routeParams, Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.user = Auth.getCurrentUser()._id;
    $scope.project = Project.get({id: $routeParams.projectId});
    $scope.post = {};
    $scope.errors = {};


    $scope.addComment = function (form) {
      $scope.submitted = true;
      console.log(form);
      if (form.$valid) {
        var comment = {
          body: $scope.post.body,
          by: {
            _id: Auth.getCurrentUser()._id,
            name: Auth.getCurrentUser().name,
            email: Auth.getCurrentUser().email
          }
        };
        Project.addComment({id: $scope.project._id}, comment, function(com) {
          $scope.project.comments.push(com);
        });
      }
    };

    $scope.deleteComment = function (comment) {
      Project.deleteComment({id: $scope.project._id, secondController: comment._id}, function() {
        if ($scope.project.comments.length) {
          var idx = $scope.project.comments.indexOf(comment);
          if (idx > -1) {
            $scope.project.comments.splice(idx, 1);
          }
        }
      });
    };

    $scope.canEdit = function (comment) {
      return Auth.isAdmin() || (comment.by._id == Auth.getCurrentUser()._id);
    };

    $scope.canJoin = function () {
      var isMember = _.some($scope.project.members, function(member){
        return (member._id === $scope.user);
      });
      console.log(isMember);
      return (Auth.isLoggedIn() && isMember);
    };
  });
