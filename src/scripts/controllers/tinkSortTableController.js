'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', []);
  }
  module.controller('TinkSortTableController',[function(){
    var ctrl = this,
    dataModel = null,
    currentSort = {prop:null,order:null},
    headers = [];

    ctrl.init = function(data){
      dataModel = data;
    };
    ctrl.register = function(data){
      headers[data.prop]={fn:data.fn};
    };
    ctrl.sortHeader = function(prop){
      if(dataModel){
          if(currentSort.prop === prop){
          currentSort.order = !currentSort.order;
        }else{
          if(currentSort.prop !== null){
            headers[currentSort.prop].fn(-1);
          }
          currentSort.order = 1;
          currentSort.prop = prop;
        }
        dataModel = dataModel.sort(sortBy(currentSort.prop, currentSort.order));
        headers[prop].fn(currentSort.order);
      }      
    };

    function sortBy(field, reverse, primer){
       var key = primer ? 
           function(x) {return primer(x[field]);} : 
           function(x) {return x[field];};

       reverse = !reverse ? 1 : -1;

       return function (a, b) {
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
         };
    }

  }]);
})();