'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: BlockCtrl', function() {

  beforeEach(module('vn.bem'));

  var $controller;
  var $rootScope;

  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_$controller_, _$rootScope_) {
    // ReSharper restore InconsistentNaming
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  function getController(scope) {
    var $scope = $rootScope.$new();
    return $controller('BlockCtrl', {
      $scope: angular.extend($scope, scope)
    });
  }

  it('returns block name when getBlock() is called', function() {
    var controller = getController();
    expect(controller.getBlock()).to.be.empty;
    controller = getController({
      vnBlock: 'foo'
    });
    expect(controller.getBlock()).to.eq('foo');
  });

  it('returns modifiers name when getModifiers() is called', function() {
    var controller = getController();
    expect(controller.getBlock()).to.be.empty;
    controller = getController({
      vnModifiers: 'foo bar'
    });
    expect(controller.getModifiers()).to.eq('foo bar');
  });

});
