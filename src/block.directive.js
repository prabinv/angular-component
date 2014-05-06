'use strict';

module.exports = [
  'bem',
  function(bem) {
    return {
      restrict: 'A',
      controller: 'BlockCtrl',
      scope: {
        vnBlock: '@'
      },
      compile: function(tElement, tAttrs) {
        bem.addClasses(tElement, {
          block: tAttrs.vnBlock,
          modifiers: tAttrs.vnModifiers
        });
      }
    };
  }
];
