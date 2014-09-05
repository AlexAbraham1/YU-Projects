'use strict';

angular.module('yuProjectsApp')
    .controller('AllProjectsCtrl', function ($scope, Auth, Project, User) {
        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.projects = Project.query({active: true, req: 'name description languages author'});




    });
