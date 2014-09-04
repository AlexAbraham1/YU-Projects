'use strict';

angular.module('yuProjectsApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/projects/create', {
                templateUrl: 'app/projects/create/create-project.html',
                controller: 'CreateProjectCtrl'
            });
    });