'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vn-element', function() {

  // load the directive's module
  beforeEach(module('vn.bem'));

  var $rootScope;
  var $compile;

  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    // ReSharper restore InconsistentNaming
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  it('supports .block__element scenario', function() {
    var $div = block('foo').append(element('bar'));
    var $component = $compile($div)($rootScope.$new());
    expect($component).to.have.class('foo');
    var $element = $component.children().first();
    expect($element).to.have.class('foo__bar');
  });

  it('supports .block__element--modifier scenario', function() {
    var $div = block('foo').append(element('bar', 'baz'));
    var $component = $compile($div)($rootScope.$new());
    expect($component).to.have.class('foo');
    var $element = $component.children().first();
    expect($element).to.have.class('foo__bar');
    expect($element).to.have.class('foo__bar--baz');
  });

  it('supports .block--modifier__element scenario', function() {
    var $div = block('foo', 'bar').append(element('baz'));
    var $component = $compile($div)($rootScope.$new());
    expect($component).to.have.class('foo');
    expect($component).to.have.class('foo--bar');
    var $element = $component.children().first();
    expect($element).to.have.class('foo--bar__baz');
  });

  it('supports .block--modifier__element--modifier scenario', function() {
    var $div = block('foo', 'bar').append(element('baz', 'qux'));
    var $component = $compile($div)($rootScope.$new());
    expect($component).to.have.class('foo');
    expect($component).to.have.class('foo--bar');
    var $element = $component.children().first();
    expect($element).to.have.class('foo--bar__baz');
    expect($element).to.have.class('foo--bar__baz--qux');
  });

  function block(name, modifier) {
    return createElement({ 'vn-block': name }, modifier);
  }

  function element(name, modifier) {
    return createElement({ 'vn-element': name }, modifier);
  }

  function createElement(dataAttrs, modifier) {
    dataAttrs = dataAttrs || {};
    dataAttrs['vn-modifier'] = modifier || '';
    var $elem = angular.element('<div/>');
    Object.keys(dataAttrs).forEach(function(key) {
      $elem.attr('data-' + key, dataAttrs[key]);
    });
    return $elem;
  }

});
