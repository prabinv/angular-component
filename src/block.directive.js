'use strict';

module.exports = [
  'bem',
  function(bem) {
    return {
      restrict: 'A',
      controller: 'BlockCtrl',
      compile: function(tElement, tAttrs) {
        var block = tAttrs.vnBlock;
        var modifiers = tAttrs.vnModifiers;
        bem.addClasses(tElement, {
          block: block,
          blockModifiers: modifiers
        });
        return {
          pre: function(scope, iElement, iAttrs, controller) {
            controller.block = block;
            controller.modifiers = modifiers;
          }
        };
      }
    };
  }
];
