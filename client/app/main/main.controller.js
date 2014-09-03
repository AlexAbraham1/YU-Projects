'use strict';

angular.module('yuProjectsApp')
    .controller('MainCtrl', function ($scope, Auth, Modal) {
        $scope.features = [
            {name: "Cool Projects", info: "Work on awesome projects with fellow classmates", icon: "fa-cogs" },
            {name: "Skill building", info: "Learn and improve your skills", icon: "fa-desktop"},
            {name: "Meet new people", info: "Be part of a small team where you can meet new like-minded people", icon: "fa-users"}
        ];

        $scope.isLoggedIn = Auth.isLoggedIn;

        $scope.open = function () {


        };

    });
