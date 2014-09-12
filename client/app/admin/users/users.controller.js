'use strict';

angular.module('yuProjectsApp')
  .controller('UsersCtrl', function ($scope, User, Modal, Logger) {
    $scope.users = User.query();
    $scope.roles = [
      {label: 'User', value: 'user'},
      {label: 'Admin', value: 'admin'}
    ];
    $scope.userRole = $scope.roles[0];

    $scope.edit = function (user) {
      user.isEditing = !user.isEditing;
      if (user.isEditing) {
        var idx = _.indexOf($scope.roles, _.find($scope.roles, {value: user.role}));
        $scope.userRole = $scope.roles[idx];
      }
    };

    $scope.submitEdit = function (user, userRole) {
      user.role = userRole.value;
      User.changeRole({id: user._id}, {user: user._id , newRole: userRole.value}, function () {
        Logger.logSuccess("Successfully changed user's role");
      });
    };

    $scope.delete = function (user) {
      var removeUser = function () {
        User.remove({ id: user._id });
        angular.forEach($scope.users, function (u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
        Logger.logError("Successfully deleted user");
      };
      Modal.confirm.delete(user.name, removeUser);
    };
  });
