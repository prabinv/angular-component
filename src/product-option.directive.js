'use strict';

module.exports = [
  function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'product-option.html',
      scope: {
        vnModifiers: '@',
        label: '@',
        name: '@',
        displayTypes: '=',
        option: '=',
        items: '=',
        change: '&ngChange'
      }
    };
  }
];
