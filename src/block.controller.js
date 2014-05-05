'use strict';

module.exports = [
  '$scope',
  function(
    $scope) {

    this.getBlockName = function() {
      return $scope.vnBlock;
    };

    this.getModifierName = function() {
      return $scope.vnModifier || '';
    };

  }
];
