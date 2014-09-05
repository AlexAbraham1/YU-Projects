'use strict';

angular.module('yuProjectsApp')
    .service('Project', function ($resource) {
        return $resource('/api/projects/:id/:controller', {
                id: '@_id'
            },
            {
                'update': { method:'PUT' }
            });
    });
