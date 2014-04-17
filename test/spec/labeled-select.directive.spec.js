'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vn.labeledSelect', function() {

  // load the directive's module
  beforeEach(module('vn.labeledSelect'));

  var $rootScope;
  var $compile;

  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    // ReSharper restore InconsistentNaming
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('generates a labeled-select block', function() {
    var $component = compile();
    expect($component).to.have.class('labeled-select');
    expect($component).to.have('.labeled-select__label');
    expect($component).to.have('.labeled-select__select');
  });

  it('generates a label', function() {
    var $component = compile('data-label="foo"');
    expect($component.find('.labeled-select__label')).to.have.text('foo');
  });

  it('passes "name" through to the inner select', function() {
    var $component = compile('name="foo"');
    expect($component.find('.labeled-select__select')).to.have.attr('name', 'foo');
  });

  it('passes "required" through to the inner select', function() {
    var $component = compile('required="foo"');
    var $select = $component.find('.labeled-select__select');
    expect($select).to.have.attr('required', 'required');
  });

  it('passes "ng-required" through to the inner select', function() {
    var $scope = $rootScope.$new();
    $scope.isRequired = true;
    var $component = compile('data-ng-required="isRequired"', $scope);
    var $select = $component.find('.labeled-select__select');
    expect($select).to.have.attr('required', 'required');
    $scope.isRequired = false;
    $component = compile('data-ng-required="isRequired"', $scope);
    $select = $component.find('.labeled-select__select');
    expect($select).not.to.have.attr('required');
  });

  it('overrides "required" when "ng-required" is set', function() {
    var $scope = $rootScope.$new();
    $scope.isRequired = true;
    var $component = compile('required="foo" data-ng-required="isRequired"', $scope);
    var $select = $component.find('.labeled-select__select');
    expect($select).to.have.attr('required', 'required');
    $scope.isRequired = false;
    $component = compile('required="foo" data-ng-required="isRequired"', $scope);
    $select = $component.find('.labeled-select__select');
    expect($select).not.to.have.attr('required');
  });

  it('passes "data-options" through to the inner select as "data-ng-options"', function() {
    var $component = compile('data-options="c.name for c in colors"');
    var $select = $component.find('.labeled-select__select');
    expect($select).to.have.attr('data-ng-options', 'c.name for c in colors');
    expect($select.children('option').length).to.eq(5);
  });

  it('binds to a model, selecting the proper option on bind', function() {
    var $component = compile('data-options="c.name for c in colors"');
    var $select = $component.find('.labeled-select__select');
    expect($select.find('option[selected]')).to.have.text('red');
  });

  function compile(attrs, $scope) {
    $scope = $scope || $rootScope.$new();
    var template = $compile(angular.element(
      '<div data-vn-labeled-select data-ng-model="color" ' + (attrs || '') + '></div>'));
    var $component = template(addFixtureData($scope));
    $rootScope.$digest();
    return $component;
  }

  function addFixtureData($scope) {
    $scope.colors = [
      { name: 'black' },
      { name: 'white' },
      { name: 'red' },
      { name: 'blue' },
      { name: 'yellow' }
    ];
    $scope.color = $scope.colors[2];
    return $scope;
  }
});
