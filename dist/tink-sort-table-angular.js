'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', []);
  }
  module.controller('TinkSortTableController',['$scope',function($scope){
    var ctrl = this,
    dataModel = null,
    currentSort = {prop:null,order:null},
    headers = [];

    ctrl.init = function(data){
      dataModel = data;
    }
    ctrl.register = function(data){
      headers[data.prop]={fn:data.fn};
    }
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
        dataModel = dataModel.sort(sort_by(currentSort.prop, currentSort.order));
        headers[prop].fn(currentSort.order);
      }      
    }

    function sort_by(field, reverse, primer){
       var key = primer ? 
           function(x) {return primer(x[field])} : 
           function(x) {return x[field]};

       reverse = !reverse ? 1 : -1;

       return function (a, b) {
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
         } 
    }

  }]);
})();;'use strict';
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
})();;'use strict';
(function(module) {
  try {
    module = angular.module('tink.sorttable');
  } catch (e) {
    module = angular.module('tink.sorttable', []);
  }
  module.directive('tinkSortTable',[function(){
    return {
      restrict:'AE',
      controller:'TinkSortTableController',
      scope:{
        tinkSortTable:'='
      },
      link:function(scope,elem,attr,ctrl){
        if(elem.get(0).tagName !== 'TABLE'){
          console.warn('sorter has to be set on table !')
          return;
        }
         function fetchFromObject(obj, prop){
            if(typeof obj === 'undefined') return false;
            var _index = prop.indexOf('.')
            if(_index > -1)  return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index+1));
            return obj[prop];
        }
        ctrl.init(scope.tinkSortTable);
        //var rows# = $(elem).get(0).tBodies.length;
        //var head# = $(elem).get(0).tHead.length;
      }
    };
  }]);
})();;angular.module('tink.sorttable').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/tinkDatePickerField.html',
    "<div role=datepicker class=\"dropdown-menu datepicker\" ng-class=\"'datepicker-mode-' + $mode\"> <table style=\"table-layout: fixed; height: 100%; width: 100%\"> <thead> <tr class=text-center> <th> <button tabindex=-1 type=button ng-disabled=pane.prev aria-label=\"vorige maand\" class=\"btn pull-left\" ng-click=$selectPane(-1)> <i class=\"fa fa-chevron-left\"></i> </button> </th> <th colspan=\"{{ rows[0].length - 2 }}\"> <button tabindex=0 type=button class=\"btn btn-block text-strong\" ng-click=$toggleMode()> <strong style=\"text-transform: capitalize\" ng-bind=title></strong> </button> </th> <th> <button tabindex=0 type=button ng-disabled=pane.next aria-label=\"volgende maand\" class=\"btn pull-right\" ng-click=$selectPane(+1)> <i class=\"fa fa-chevron-right\"></i> </button> </th> </tr> <tr class=datepicker-days ng-bind-html=labels ng-if=showLabels></tr> </thead> <tbody> <tr ng-repeat=\"(i, row) in rows\" height=\"{{ 100 / rows.length }}%\"> <td class=text-center ng-repeat=\"(j, el) in row\"> <button tabindex=0 type=button class=btn style=\"width: 100%\" ng-class=\"{'btn-selected': el.selected, 'btn-today': el.isToday && !el.elected, 'btn-grayed':el.isMuted}\" ng-focus=elemFocus($event) ng-click=$select(el.date) ng-disabled=el.disabled> <span role=\"\" ng-class=\"{'text-muted': el.muted}\" ng-bind=el.label></span> </button> </td> </tr> </tbody> </table> </div>"
  );


  $templateCache.put('templates/tinkDatePickerInput.html',
    "<div class=datepicker-input-fields tabindex=-1> <input role=date aria-label=datepicker tabindex=-1 tink-format-input data-format=00/00/0000 data-placeholder=dd/mm/jjjj data-date dynamic-name=dynamicName data-max-date=maxDate data-min-date=minDate ng-model=\"ngModel\">\n" +
    "<span role=\"datepicker icon\" class=datepicker-icon> <i class=\"fa fa-calendar\"></i> </span> </div>"
  );

}]);
