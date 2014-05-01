/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn.option', [
    require('vn-labeled-radio').name
  ])
  .run(function($templateCache) {
    $templateCache.put('option.html', require('./option.html'));
    $templateCache.put('radios.html', require('./radios.html'));
    $templateCache.put('select.html', require('./select.html'));
  })
  .directive('vnOption', require('./option.directive.js'));
