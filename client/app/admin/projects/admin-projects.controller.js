'use strict';

angular.module('yuProjectsApp')
  .controller('AdminProjectsCtrl', function ($scope, Project, Modal, Logger) {
    $scope.projects = Project.query();

    $scope.deleteProject = function (project) {
      var removeProject = function () {
        Project.remove({ id: project._id });
        angular.forEach($scope.projects, function (u, i) {
          if (u === project) {
            $scope.projects.splice(i, 1);
          }
        });
        Logger.logError("Successfully deleted project");
      };
      Modal.confirm.delete(project.name, removeProject);
    };

    $scope.toggleActivation = function (project) {
      project.active = !project.active;
      Project.update(project);
      if (!project.active) {
        Logger.logWarning("Successfully deactivated a project!");
      } else {
        Logger.logSuccess("Successfully activated a project!");
      }

    };

    $scope.projectStatus = function (project) {
      return project.active ? "Deactivate" : "Activate";
    };

    $scope.getStatus = function (project) {
      return !project.active ? "NOT ACTIVE" : "ACTIVE";
    };
  });
