'use strict';

module.exports = [
  '$scope',
  function(
    $scope) {

    this.getBlock = function() {
      return $scope.vnBlock;
    };

    this.getModifiers = function() {
      return $scope.vnModifiers;
    };

  }
];
