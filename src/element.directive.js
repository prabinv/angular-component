'use strict';

module.exports = [
  'bem',
  function(bem) {
    return {
      require: '^vnBlock',
      restrict: 'A',
      compile: function() {
        return function(scope, iElement, iAttrs, blockCtrl) {
          bem.addClasses(iElement, {
            block: blockCtrl.getBlock(),
            element: iAttrs.vnElement,
            modifiers: iAttrs.vnModifiers
          });
        };
      }
    };
  }
];
