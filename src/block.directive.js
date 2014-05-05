'use strict';

module.exports = [
  function() {
    return {
      restrict: 'A',
      controller: 'BlockCtrl',
      scope: {
        vnBlock: '@',
        vnModifier: '@'
      },
      compile: function(tElement, tAttrs) {
        var block = tAttrs.vnBlock || '';
        tElement.addClass(block);

        var modifier = tAttrs.vnModifier || '';
        if (modifier) {
          tElement.addClass(block + '--' + modifier);
        }
      }
    };
  }
];
