﻿'use strict';

module.exports = [
  function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      replace: true,
      templateUrl: 'labeled-radio.html',
      scope: {
        ngModel: '=',
        label: '@',
        name: '@',
        value: '@',
        ngValue: '=',
        ngChecked: '=',
        change: '&ngChange'
      },
      compile: function(tElement, tAttrs) {
        var $radio = tElement.find('input');

        var value = tAttrs.value;
        var ngValue = tAttrs.ngValue;
        if (typeof value !== 'undefined' && typeof ngValue === 'undefined') {
          $radio.removeAttr('data-ng-value');
        }
      }
    };
  }
];
