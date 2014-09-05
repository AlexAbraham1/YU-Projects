'use strict';

describe('Controller: SingleCtrl', function () {

  // load the controller's module
  beforeEach(module('yuProjectsApp'));

  var SingleCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleCtrl = $controller('SingleCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
