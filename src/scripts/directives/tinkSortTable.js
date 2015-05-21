'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', ['ngLodash']);
  }
  module.directive('tinkSortTable',[function(){
    return {
      restrict:'AE',
      controller:'TinkSortTableController',
      scope:{
        tinkSortTable:'=',
        tinkInitSort:'@',
        tinkSortType:'@',
        tinkInitSortOrder:'@',
        tinkCallback:'&'
      },
      link:function(scope,elem,attr,ctrl){
        if(elem.get(0).tagName !== 'TABLE'){
          console.warn('sorter has to be set on table !');
          return;
        }
        $(elem).addClass('table-interactive');

        scope.$watch('tinkSortTable',function(){
          ctrl.init(scope.tinkSortTable);

          var order = 1;
          if(scope.tinkInitSort){
            if(scope.tinkInitSortOrder){
              if(scope.tinkInitSortOrder.toLowerCase() === 'desc'){
                order = -1;
              }
            }

            ctrl.sortHeader(scope.tinkInitSort,scope.tinkSortType,order);
          }
        });
         /*function fetchFromObject(obj, prop){
            if(typeof obj === 'undefined') return false;
            var _index = prop.indexOf('.')
            if(_index > -1)  return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1));
            return obj[prop];
        }*/
        //var rows# = $(elem).get(0).tBodies.length;
        //var head# = $(elem).get(0).tHead.length;
      }
    };
  }]);
})();