'use strict';

angular.module('yuProjectsApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/admin', {
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl'
            })
            .when('/admin/users', {
                templateUrl: 'app/admin/users/users.html',
                controller: 'UsersCtrl'
            })
            .when('/admin/projects', {
                templateUrl: 'app/admin/projects/admin-projects.html',
                controller: 'AdminProjectsCtrl'
            });
    });