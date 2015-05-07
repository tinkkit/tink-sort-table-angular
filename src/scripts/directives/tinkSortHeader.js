'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', ['ngLodash']);
  }
  module.directive('tinkSortHeader',[function(){
    return {
      require:'^tinkSortTable',
      restrict:'A',
      link:function(scope,elem,attr,ctrl){$(elem).addClass('is-sortable');
        $(elem).addClass('is-sortable');
        var action = function(data){
          $(elem).removeClass('sort-asc').removeClass('sort-desc');
          if(data === 1){
            $(elem).addClass('sort-asc');
          }else if(data === -1 ){
            $(elem).addClass('sort-desc');
          }
        };
        $(elem).bind('click',function(){
          scope.$apply(function(){
            ctrl.sortHeader(attr.tinkSortHeader,attr.tinkSortType);
          });
        });

        ctrl.register({prop:attr.tinkSortHeader,fn:action});
      }
    };
  }]);
})();