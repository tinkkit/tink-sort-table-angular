'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', ['ngLodash']);
  }
module.controller('TinkSortTableController',['lodash','$scope','$timeout',function(_,scope,timeout){
    var ctrl = this,
    dataModel = null,
    currentSort = {prop:null,order:null},
    headers = [];

    ctrl.init = function(data){
      dataModel = data;
    };
    ctrl.register = function(data){
      if(currentSort && data && currentSort.prop === data.prop){
        data.fn(currentSort.order);
      }
      headers[data.prop]={fn:data.fn};
    };

    ctrl.sort = function(property,order){
      if(currentSort.prop && headers[currentSort.prop]){
        headers[currentSort.prop].fn(-99);
      }
      
      if(property){
        
        if(order !== undefined || order !== null){
          currentSort.order = order;
        }else{
          currentSort.order = true;
        }
        currentSort.prop = property;
        headers[property].fn(currentSort.order);
      }
    }

    ctrl.sortClick = function(prop,type){
      scope.tinkSortField = prop;
      if(currentSort.prop === prop){
        scope.tinkAsc = !currentSort.order;
      }else{
        scope.tinkAsc = true;
      }
      //wait for digest
      $timeout(function(){
        scope.tinkCallback({$property:prop,$order:scope.tinkAsc,$type:type});
      },0);      
    }

    Object.byString = function(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

  }]);
})();;'use strict';
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
        
        var action = function(data){
          $(elem).removeClass('sort-asc').removeClass('sort-desc');
          if(data === true){
            $(elem).addClass('sort-asc');
          }else if(data === false){
            $(elem).addClass('sort-desc');
          }
        };

        if(attr.tinkSortHeader !== null && attr.tinkSortHeader !== undefined && attr.tinkSortHeader !== ''){
          $(elem).addClass('is-sortable');
          $(elem).bind('click',function(){
            scope.$apply(function(){
              ctrl.sortClick(attr.tinkSortHeader,attr.tinkSortType);
            });
          });
        }      

        ctrl.register({prop:attr.tinkSortHeader,fn:action});
      }
    };
  }]);
})();;'use strict';
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
        tinkCallback:'&',
        tinkAsc:'=',
        tinkSortField:'='
      },
      link:function(scope,elem,attr,ctrl){
        if(elem.get(0).tagName !== 'TABLE'){
          console.warn('sorter has to be set on table !');
          return;
        }
        $(elem).addClass('table-interactive');


        scope.$watch('tinkAsc',function(newV){
           ctrl.sort(scope.tinkSortField,newV); 
        });

        scope.$watch('tinkSortField',function(newV){
           ctrl.sort(newV,scope.tinkAsc); 
        });

          scope.$watch('tinkSortTable',function(){
            ctrl.sort(scope.tinkSortField,scope.tinkAsc);
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
})();;