'use strict';

angular.module('yuProjectsApp')
    .controller('SignupCtrl', function ($scope, Auth, $location, $window, Modal) {
        $scope.user = {};
        $scope.errors = {};

        $scope.register = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                    name: $scope.user.name,
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function () {
                        Modal.popup.success({
                                title: "Thank you for signing up!",
                                html: '<p>We will notify you with further details!</p>'
                            }, function () {
                                $location.path('/');
                            });
                    })
                    .catch(function (err) {
                        err = err.data;
                        $scope.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, function (error, field) {
                            form[field].$setValidity('mongoose', false);
                            $scope.errors[field] = error.message;
                        });
                    });
            }
        };

        $scope.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    });
