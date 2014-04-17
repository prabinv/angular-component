/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn.labeledSelect', [])
  .run(function($templateCache) {
    $templateCache.put('labeled-select.html', require('./labeled-select.html'));
  })
  .directive('vnLabeledSelect', require('./labeled-select.directive.js'));
