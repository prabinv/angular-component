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

  it('returns block name when getBlockName() is called', function() {
    var controller = getController();
    expect(controller.getBlockName()).to.be.empty;
    controller = getController({
      vnBlock: 'foo'
    });
    expect(controller.getBlockName()).to.eq('foo');
  });

  it('returns modifier name when getModifierName() is called', function() {
    var controller = getController();
    expect(controller.getModifierName()).to.be.empty;
    controller = getController({
      vnModifier: 'foo'
    });
    expect(controller.getModifierName()).to.eq('foo');
  });

});
