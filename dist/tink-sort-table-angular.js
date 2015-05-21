'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', ['ngLodash']);
  }
module.controller('TinkSortTableController',['lodash','$scope',function(_,scope){
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

    ctrl.reSort = function(){
      if(currentSort && currentSort.prop !== null){
        ctrl.sortHeader(currentSort.prop,currentSort.type,currentSort.order)
      }
    }
    ctrl.sortHeader = function(prop,type,order){
      if(dataModel){
          if(currentSort.prop === prop){
            if(currentSort.order === 1){
              currentSort.order = -1;
            }else{
              currentSort.order = 1;
            }
        }else{
          if(currentSort.prop !== null){
            headers[currentSort.prop].fn(-99);
          }
          currentSort.order = 1;
          currentSort.prop = prop;
        }
        if(order){
          currentSort.order = order;
        }
        if(scope.tinkCallback){
          var stringOrder = 'asc';
          if(currentSort.order === 1){
            stringOrder = 'asc';
          }else{
            stringOrder = 'desc';
          }
          scope.tinkCallback({$property:prop,$order:stringOrder,$type:type});
        }
        currentSort.type = type;
        if(scope.tinkSort !== false && scope.tinkSort !== 'false'){
          sortData(currentSort.order,prop,dataModel,type);
        }
        headers[prop].fn(currentSort.order);
      }
    };

    function sortData(order,prop,data,type){
      if(type && type.toLowerCase() === 'date'){
            dataModel = dataModel.sort(function(a,b){
              var obj1Val = a[prop];
              var obj2Val = b[prop];
              return order*(obj1Val-obj2Val);
            });
      }else{
        dataModel = dataModel.sort(function(obj1, obj2) {
          var obj1Val = obj1[prop];
          var obj2Val = obj2[prop];

          if(!_.isString(obj1Val)){
            obj1Val = obj1Val.toString();
          }

          if(!_.isString(obj2Val)){
            obj2Val = obj2Val.toString();
          }
            return order*obj1Val.localeCompare(obj2Val);

        });
      }
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
        tinkInitSort:'@',
        tinkSortType:'@',
        tinkInitSortOrder:'@',
        tinkCallback:'&',
        tinkSort:'='
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
            ctrl.sortHeader(attr.tinkSortHeader,attr.tinkSortType);   
          }else{
            ctrl.reSort();
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
})();;