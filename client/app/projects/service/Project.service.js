'use strict';

angular.module('yuProjectsApp')
  .service('Project', function ($resource) {
    return $resource('/api/projects/:id/:controller/:secondController', {
        id: '@_id',
        controller: '@_controller',
        secondController: '@_secondController'
      },
      {
        'update': { method: 'PUT' },
        'addComment': {
          method: 'POST',
          params: {
            controller: 'comment'
          }
        },
        'deleteComment': {
          method: 'DELETE',
          params: {
            controller: 'comment'
          }
        }
      });
  });
