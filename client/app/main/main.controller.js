'use strict';

angular.module('yuProjectsApp')
  .controller('MainCtrl', function ($scope) {
    $scope.features = [
      {name: "Cool Projects", info: "Work on awesome projects with fellow classmates", icon: "fa-cogs" },
      {name: "Skill building", info: "Learn and improve your skils", icon: "fa-desktop"}
    ];

  });
