'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vn-block', function() {

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

  it('adds a .block class when vn-block attribute is provided', function() {
    var $foo = bem.block('foo');
    var $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
  });

  it('supports .block--modifier scenario', function() {
    var $foo = bem.block('foo', 'bar');
    var $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
    expect($block).to.have.class('foo--bar');

    $foo.attr('data-vn-modifier', '');
    $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
    expect($block).not.to.have.class('foo--');
  });

});
