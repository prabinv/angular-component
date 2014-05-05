'use strict';

window.bem = (function() {

  function createElement(dataAttrs, modifier) {
    dataAttrs = dataAttrs || {};
    dataAttrs['vn-modifier'] = modifier || '';
    var $elem = angular.element('<div/>');
    Object.keys(dataAttrs).forEach(function(key) {
      $elem.attr('data-' + key, dataAttrs[key]);
    });
    return $elem;
  }

  return {
    block: function(name, modifier) {
      return createElement({ 'vn-block': name }, modifier);
    },
    element: function(name, modifier) {
      return createElement({ 'vn-element': name }, modifier);
    }
  };

})();
