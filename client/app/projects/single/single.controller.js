'use strict';

angular.module('yuProjectsApp')
  .controller('SingleCtrl', function ($scope, Project, $routeParams, Auth, Logger) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.user = Auth.getCurrentUser()._id;
    $scope.project = Project.get({id: $routeParams.projectId}, function () {
      $scope.isMember = _.some($scope.project.members, function(member){
        if (_.contains(member, Auth.getCurrentUser().name)) return true;
      });
    });
    $scope.post = {};
    $scope.errors = {};

    $scope.addComment = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        var comment = {
          body: $scope.post.body,
          by: {
            _id: Auth.getCurrentUser()._id,
            name: Auth.getCurrentUser().name,
            email: Auth.getCurrentUser().email
          }
        };
        Project.addComment({id: $scope.project._id}, comment, function (com) {
          Logger.logSuccess("Comment successfully added!");
          $scope.project.comments.push(com);
          form.$setPristine();
          form.post = null;
          $scope.post = null;
        });
      }
    };

    $scope.join = function () {
      var member = {
        _id: Auth.getCurrentUser()._id,
        name: Auth.getCurrentUser().name,
        email: Auth.getCurrentUser().email
      };
      Project.addMember({id: $scope.project._id}, member, function (mem) {
        Logger.logSuccess("Successfully became a project member!");
        $scope.project.members.push(mem);
        $scope.isMember = true;
      });
    };

    $scope.deleteComment = function (comment) {
      Project.deleteComment({id: $scope.project._id, secondController: comment._id}, function () {
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
  });
