'use strict';

module.exports = [
  function() {
    return {
      addClasses: function($elem, options) {

        options = options || {};

        var base = options.block;

        if (!base) {
          return;
        }

        var element = options.element;
        if (element) {
          base += '__' + element;
        }

        $elem.addClass(base);

        var modifiers = options.modifiers;
        if (!modifiers) {
          return;
        }

        angular.forEach(modifiers.split(/ +/), function(modifier) {
          $elem.addClass(base + '--' + modifier);
        });

      }
    };
  }
];
