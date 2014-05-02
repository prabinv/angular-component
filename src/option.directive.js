'use strict';

module.exports = [
  function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'option.html',
      scope: {
        label: '@',
        name: '@',
        displayTypes: '=',
        option: '=',
        items: '=',
        ngModel: '='
      },
      compile: function() {
        return {
          pre: function(scope, iElement, iAttrs) {
            if (iAttrs.modifier) {
              iElement.addClass('vn-option--' + iAttrs.modifier);
            }
          }
        };
      }
    };
  }
];
