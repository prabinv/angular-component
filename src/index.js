/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vnProductOption', [
    require('vn-labeled-radio').name,
    require('vn-bem').name
  ])
  .run(function($templateCache) {
    $templateCache.put('product-option.html', require('./product-option.html'));
    $templateCache.put('radios.html', require('./radios.html'));
    $templateCache.put('select.html', require('./select.html'));
  })
  .directive('vnProductOption', require('./product-option.directive.js'));
