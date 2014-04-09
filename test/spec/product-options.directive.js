'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: productOptions', function() {

  // load the directive's module
  beforeEach(module('vn.productOptions'));

  var $component;

  beforeEach(inject(function($rootScope, $compile) {
    var $scope = $rootScope.$new();
    var html = '<div data-product-options></div>';
    $component = $($compile(angular.element(html))($scope));
    $rootScope.$digest();
  }));

  it('contains product options text', function() {
    expect($component.html()).to.eq('<p>This is the product options view.</p>');
  });
});
