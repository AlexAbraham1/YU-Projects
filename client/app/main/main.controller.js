'use strict';

angular.module('yuProjectsApp')
    .controller('MainCtrl', function ($scope, Auth) {
        $scope.features = [
            {name: "Programming Projects", info: "Work on awesome projects with fellow classmates", icon: "fa-cogs", bg: "primary" },
            {name: "Skill building", info: "Learn and improve your skills", icon: "fa-desktop", bg: "danger" },
            {name: "Meet new people", info: "Be part of a small team where you can meet new like-minded people", icon: "fa-users", bg: "success" }
        ];

        $scope.isLoggedIn = Auth.isLoggedIn;
    });
