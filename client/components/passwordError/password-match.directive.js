'use strict';

angular.module('yuProjectsApp')
  .directive('passwordMatch', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                passwordMatch: '='
            },
            link: function (scope, elm, attrs, ctrl) {
                var check = function(value) {
                    if (value) {
                        ctrl.$parsers.unshift(function (viewValue) {
                            var origin = scope.passwordMatch;
                            if (origin !== viewValue) {
                                ctrl.$setValidity("passwordMatch", false);
                                return undefined;
                            } else {
                                ctrl.$setValidity("passwordMatch", true);
                                return viewValue;
                            }
                        });
                    }
                };
                scope.$watch(function() {
                    var combined;

                    if (scope.passwordMatch || ctrl.$viewValue) {
                        combined = scope.passwordMatch + '_' + ctrl.$viewValue;
                    }
                    return combined;
                }, check);


            }
        };
  });
