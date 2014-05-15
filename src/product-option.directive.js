﻿'use strict';

module.exports = [
  function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'option.html',
      scope: {
        vnModifiers: '@',
        label: '@',
        name: '@',
        displayTypes: '=',
        option: '=',
        items: '=',
        ngModel: '='
      }
    };
  }
];
