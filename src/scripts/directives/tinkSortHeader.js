'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', []);
  }
  module.directive('tinkSortHeader',[function(){
    return {
      require:'^sorter',
      restrict:'A',
      link:function(scope,elem,attr,ctrl){
        var action = function(data){
          console.log('do stuff',data);
          $(elem).removeClass('sort-asc').removeClass('sort-desc');
          if(data){
            $(elem).addClass('sort-asc');
          }else{
            $(elem).addClass('sort-desc');
          }
        }
        $(elem).addClass('pointer');
        $(elem).bind('click',function(){
          scope.$apply(function(){
            ctrl.sortHeader(attr.headSorter);
          })
        })
       
        ctrl.register({prop:attr.headSorter,fn:action});   
      }
    };
  }]);
})();