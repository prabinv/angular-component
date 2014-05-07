'use strict';

// ReSharper disable WrongExpressionStatement
describe('Controller: BlockCtrl', function() {

  beforeEach(module('vn-bem'));

  var $controller;
  var $rootScope;

  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_$controller_, _$rootScope_) {
    // ReSharper restore InconsistentNaming
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  function getController() {
    return $controller('BlockCtrl', {
      $scope: $rootScope.$new()
    });
  }

  it('returns block name when getBlock() is called', function() {
    var controller = getController();
    expect(controller.getBlock()).to.be.undefined;
    controller.block = 'foo';
    expect(controller.getBlock()).to.eq('foo');
  });

  it('returns modifiers name when getModifiers() is called', function() {
    var controller = getController();
    expect(controller.getBlock()).to.be.undefined;
    controller.modifiers = 'foo bar';
    expect(controller.getModifiers()).to.eq('foo bar');
  });

});
