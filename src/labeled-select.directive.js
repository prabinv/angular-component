'use strict';

module.exports = [
  function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      replace: true,
      transclude: true,
      templateUrl: 'labeled-select.html',
      scope: {
        ngModel: '=',
        label: '@',
        name: '@',
        required: '@',
        ngRequired: '='
      },
      compile: function(tElement, tAttrs) {
        var $select = tElement.find('select');

        $select.attr('data-ng-options', tAttrs.options);

        var required = tAttrs.required;
        var ngRequired = tAttrs.ngRequired;
        if (typeof required !== 'undefined' && typeof ngRequired === 'undefined') {
          $select.removeAttr('data-ng-required');
        }

        return {
          pre: function(scope, iElement, iAttrs) {
            var m = iAttrs.options && iAttrs.options.match(/in +(\w+)/);
            var dataSourceName = m && m[1];
            if (dataSourceName) {
              scope[dataSourceName] = scope.$parent[dataSourceName];
            }
          }
        };
      }
    };
  }
];
