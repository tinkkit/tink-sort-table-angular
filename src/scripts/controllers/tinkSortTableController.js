'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', ['ngLodash']);
  }
  module.controller('TinkSortTableController',['lodash',function(_){
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
    ctrl.sortHeader = function(prop,type){
      if(dataModel){
          if(currentSort.prop === prop){
            if(currentSort.order === 1){
              currentSort.order = -1;
            }else{
              currentSort.order = 1;
            }
        }else{
          if(currentSort.prop !== null){
            headers[currentSort.prop].fn(-1);
          }
          currentSort.order = 1;
          currentSort.prop = prop;
        }
        sortData(currentSort.order,prop,dataModel,type);
        headers[prop].fn(currentSort.order);
      }      
    };

    function sortData(order,prop,data,type){
      if(type === 'date'|| type === 'Date'){

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

          if(order){
            return order*obj1Val.localeCompare(obj2Val);
          }else{
            return obj1Val.localeCompare(obj2Val);
          }

        });
      }
    }

  }]);
})();