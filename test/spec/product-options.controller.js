'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: ProductOptionsCtrl', function() {

  beforeEach(module('vn.productOptions'));

  var controller;
  var scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('ProductOptionsCtrl', {
      $scope: scope
    });
  }));

  it('attaches foo to the scope', function() {
    expect(scope.foo).to.eq('bar');
  });

});
