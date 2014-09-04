'use strict';

angular.module('yuProjectsApp')
    .controller('CreateProjectCtrl', function ($scope, Project, Auth) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.projects = Project.query();

        $scope.addProject = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Project.save($scope.project, function (newProject) {
                    $scope.projects.push(newProject);
                });
            }

        };


        $scope.removeProject = function (project) {
            console.log("project", project);
            Project.remove({ id: project._id });
            angular.forEach($scope.projects, function (u, i) {
                if (u === project) {
                    $scope.projects.splice(i, 1);
                }
            });
        };
    });