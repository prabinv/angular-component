/* global angular: true */
'use strict';

var angular = require('angular');

module.exports = angular.module('vn.productOptions', [])
  .run(function($templateCache) {
    $templateCache.put('product-options.html', require('./product-options.html'));
  })
  .directive('productOptions', require('./product-options.directive.js'))
  .controller('ProductOptionsCtrl', require('./product-options.controller.js'));
