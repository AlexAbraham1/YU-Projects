'use strict';

angular.module('yuProjectsApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/projects', {
                templateUrl: 'app/projects/all/all-projects.html',
                controller: 'AllProjectsCtrl'
            })
            .when('/projects/:projectId', {
                templateUrl: 'app/projects/single/single.html',
                controller: 'SingleCtrl'
            })
            .when('/create', {
                templateUrl: 'app/projects/create/create-project.html',
                controller: 'CreateProjectCtrl'
            });
    });