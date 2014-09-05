'use strict';

angular.module('yuProjectsApp')
  .controller('UsersCtrl', function ($scope, User, Modal, Logger) {
        $scope.users = User.query();

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
