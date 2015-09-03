(function () {

  'use strict';

  angular.module('mm.getWidth', []);

  angular
    .module('mm.getWidth')
    .directive('getWidth', getWidth);

  getWidth.$inject = ['$window', '$timeout'];

  function getWidth($window, $timeout) {

    return {
      restrict: 'A',
      scope: {
        width: '=getWidth'
      },
      link: link
    };

    ////////////

    function link(scope, element, attrs) {
      var el = element[0];
      var timeout;
      scope.width = getElementWidth();

      activate();

      ////////////

      function activate() {
        addListeners();
      }

      /**
       * Add listener that fetches element width on window resize
       */
      function addListeners() {
        angular.element($window).on('resize', debounceSetElementWidth);

        scope.$on('$destroy', function () {
          angular.element($window).off('resize', debounceSetElementWidth);
        });
      }

      /**
       * Debounces `setElementWidth` by adding a small delay
       * between calls to prevent overloading
       */
      function debounceSetElementWidth() {
        debounce(setElementWidth, 10, false);
      }

      /**
       * Set the element width
       */
      function setElementWidth() {
        scope.$apply(function () {
          scope.width = getElementWidth();
        });
      }

      /**
       * Get the width of the element
       *
       * @returns {number}
       */
      function getElementWidth() {
        return parseInt(el.clientWidth);
      }

      /**
       * Debounce
       * http://stackoverflow.com/a/22056002/58795
       *
       * @param func
       * @param wait
       * @param immediate
       */
      function debounce(func, wait, immediate) {
        /*jshint validthis:true */
        var context = this, args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      }
    }
  }

})();
