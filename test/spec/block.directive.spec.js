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
    var $div = angular.element('<div/>').attr('data-vn-block', 'foo');
    var $component = $compile($div)($rootScope.$new());
    expect($component).to.have.class('foo');
  });

  it('supports .block--modifier scenario', function() {
    var $div = angular.element('<div/>')
      .attr('data-vn-block', 'foo')
      .attr('data-vn-modifier', 'bar');
    var $component = $compile($div)($rootScope.$new());
    expect($component).to.have.class('foo');
    expect($component).to.have.class('foo--bar');

    $div.attr('data-vn-modifier', '');
    $component = $compile($div)($rootScope.$new());
    expect($component).to.have.class('foo');
    expect($component).not.to.have.class('foo--');
  });

});
