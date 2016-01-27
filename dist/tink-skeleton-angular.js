'use strict';
(function(module) {
  try {
    module = angular.module('tink.skeleton');
  } catch (e) {
    module = angular.module('tink.skeleton', []);
  }
  module.directive('tinkSkeleton', [function () {
    return {
      restrict: 'EA',
      scope: {
        text: '@'
      },
      templateUrl: 'templates/skeleton.html',
      replace: true,

      link: function(scope) {

        // Do this on load
        function initialize() {
          console.log(scope.text);
        }

        initialize();
      }
    };
  }]);
})();
;angular.module('tink.skeleton').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/skeleton.html',
    "<h1 class=\"h3 text-center\">{{text}}</h1>"
  );

}]);
