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
    var $bar = bem.element('bar');
    var $foo = bem.block('foo').append($bar);
    var $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
    var $element = $block.children().first();
    expect($element).to.have.class('foo__bar');

    $bar.attr('data-vn-element', '');
    $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
    $element = $block.children().first();
    expect($element).not.to.have.class('foo__');
  });

  it('supports .block__element--modifier scenario', function() {
    var $foo = bem.block('foo').append(bem.element('bar', 'baz'));
    var $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
    var $element = $block.children().first();
    expect($element).to.have.class('foo__bar');
    expect($element).to.have.class('foo__bar--baz');
  });

  it('supports .block--modifier__element scenario', function() {
    var $foo = bem.block('foo', 'bar').append(bem.element('baz'));
    var $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
    expect($block).to.have.class('foo--bar');
    var $element = $block.children().first();
    expect($element).to.have.class('foo--bar__baz');
  });

  it('supports .block--modifier__element--modifier scenario', function() {
    var $foo = bem.block('foo', 'bar').append(bem.element('baz', 'qux'));
    var $block = $compile($foo)($rootScope.$new());
    expect($block).to.have.class('foo');
    expect($block).to.have.class('foo--bar');
    var $element = $block.children().first();
    expect($element).to.have.class('foo--bar__baz');
    expect($element).to.have.class('foo--bar__baz--qux');
  });

});
