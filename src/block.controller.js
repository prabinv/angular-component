'use strict';

module.exports = [
  '$scope',
  function(
    $scope) {

    this.getBlock = function() {
      return $scope.vnBlock;
    };

  }
];
