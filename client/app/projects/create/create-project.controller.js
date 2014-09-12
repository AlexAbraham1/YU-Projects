'use strict';

angular.module('yuProjectsApp')
    .controller('CreateProjectCtrl', function ($scope, Project, Auth, Modal, $location) {
        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.addProject = function (form) {
            $scope.submitted = true;
            if (form.$valid && $scope.isLoggedIn()) {
                $scope.project.members = [];
                $scope.project.author = $scope.project.members[0] = Auth.getCurrentUser();
                Project.save($scope.project, function () {
                    Modal.popup.success({
                        title: "Thank you for your submission!",
                        html: '<p>We will notify you if it is approved!</p>'
                    });
                    $scope.submitted = false;
                    $scope.project = null;
                    $location.path('/projects/');
                });
            }

        };



    });
