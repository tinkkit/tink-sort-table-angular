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
})();