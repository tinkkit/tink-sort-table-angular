'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', []);
  }
  module.directive('tinkSortHeader',[function(){
    return {
      require:'^tinkSortTable',
      restrict:'A',
      link:function(scope,elem,attr,ctrl){
        var action = function(data){
          console.log(data);
          $(elem).removeClass('sort-asc').removeClass('sort-desc');
          if(data === 0 || data === false){
            $(elem).addClass('sort-asc');
          }else if(data === 1 || data === true ){
            $(elem).addClass('sort-desc');
          }
        }
        $(elem).addClass('pointer');
        $(elem).bind('click',function(){
          scope.$apply(function(){
            ctrl.sortHeader(attr.tinkSortHeader);
          })
        })
       
        ctrl.register({prop:attr.tinkSortHeader,fn:action});   
      }
    };
  }]);
})();