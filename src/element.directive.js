'use strict';

module.exports = [
  function() {
    return {
      require: '^vnBlock',
      restrict: 'A',
      compile: function() {
        return function(scope, iElement, iAttrs, blockCtrl) {
          var block = blockCtrl.getBlockName();
          var cls = block;

          var blockModifier = blockCtrl.getModifierName();
          if (blockModifier) {
            cls += '--' + blockModifier;
          }

          var element = iAttrs.vnElement || '';
          if (!element) {
            return;
          }

          cls += '__' + element;

          iElement.addClass(cls);

          var elementModifier = iAttrs.vnModifier || '';
          if (elementModifier) {
            cls += '--' + elementModifier;
          }

          iElement.addClass(cls);
        };
      }
    };
  }
];
