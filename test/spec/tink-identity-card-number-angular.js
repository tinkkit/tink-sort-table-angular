'use strict';
describe('sortable', function() {

  beforeEach(module('tink.sorttable'));

  var tinkSortTableController,
  scope,
  timeout,
  element;

  beforeEach(inject(function ($rootScope, $controller,$timeout,$compile) {
    element = '<table tink-sort-table="data" tink-callback="sorted($property,$order,$type)" tink-asc="asc" tink-sort-field="header" class="table-responsive table-interactive">'+
       '<thead>'+
           '<tr>'+
               '<th tink-sort-header="volgnummer" tink-sort-type="date">Nummer</th>'+
               '<th tink-sort-header="familienaam">Naam</th>'+
               '<th tink-sort-header="voornaam">Voornaam</th>'+
               '<th>Notities</th>'+
               '<th>Advies</th>'+
               '<th></th>'+
           '</tr>'+
       '</thead>'+
       '<tbody>'+
           '<tr ng-repeat="rapport in ctrl.rapporten.data" class="clickableTableRow">'+
               '<td>{{rapport.volgnummer | date:"dd/MM/yyyy"}}</td>'+
               '<td>{{ rapport.familienaam }}</td>'+
               '<td>{{ rapport.voornaam }}</td>'+
               '<td>'+
                   '<span class="fa-stack fa-1x commentBoxIcon">'+
                       '<i class="fa fa-comment fa-2x fa-stack-1x"></i>'+
                       '<strong class="fa-stack-1x fa-stack-text fa-inverse"></strong>'+
                   '</span>'+
               '</td>'+
               '<td><span class="bcsdIcon" ng-class="{questionIcon: rapport.advies.code == "ONB", checkIcon: rapport.advies.code == "AKK", crossIcon: rapport.advies.code == "NAK"}"><i class="fa"></i></span></td>'+
               '<td><i class="fa fa-angle-right"></i></td>'+
           '</tr>'+
       '</tbody>'+
   '</table>';

    scope = $rootScope.$new();
    scope.tinkCallback = function(){console.log('ln')}
    element = $compile(element)(scope);
    timeout = $timeout;
    tinkSortTableController = element.isolateScope().ctrl;
    scope = element.isolateScope();
    scope.$digest();
  }));

  it('test sort function', function () {
    var data = {prop:'test',fn:function(){ console.log('test1'); } };

    spyOn(data, 'fn');

    tinkSortTableController.register(data);
    tinkSortTableController.sort(data.prop,true);

    expect(tinkSortTableController.getCurrentSort().prop).toBe(data.prop);
    expect(tinkSortTableController.getCurrentSort().order).toBe(true);
    expect(data.fn).toHaveBeenCalled();

  });

  it('test sort function x2', function () {
    var data = {prop:'test',fn:function(){ console.log('test2'); } };

    spyOn(data, 'fn');

    tinkSortTableController.register(data);
    tinkSortTableController.sort(data.prop);

    expect(tinkSortTableController.getCurrentSort().prop).toBe(data.prop);
    expect(tinkSortTableController.getCurrentSort().order).toBe(true);
    expect(data.fn).toHaveBeenCalled();

  });

  it('test clicksort', function () {
    var data = {prop:'test',fn:function(){ console.log('test3'); } };

    spyOn(tinkSortTableController, 'sort');
    spyOn(data, 'fn');

    tinkSortTableController.sortClick(data.prop);
    scope.$digest();

    timeout(function(){
        expect(tinkSortTableController.sort).toHaveBeenCalled();
        expect(tinkSortTableController.getCurrentSort().prop).toBe(data.prop);
        expect(tinkSortTableController.getCurrentSort().order).toBe(true);
        expect(data.fn).toHaveBeenCalled();
    },0);
  });

  it('test scope on controller first sort', function () {
    var data = {prop:'test',fn:function(){ console.log('test4'); } };

    tinkSortTableController.sortClick(data.prop);
    expect(scope.tinkSortField).toBe(data.prop);
    expect(scope.tinkAsc).toBe(true);
  });

  it('test scope on controller second sort', function () {

    var data = {prop:'test',fn:function(){  } };
    tinkSortTableController.register(data);
    scope.$digest();
    tinkSortTableController.sortClick(data.prop);
    scope.$digest();
    

    expect(scope.tinkSortField).toBe(data.prop);
    expect(scope.tinkAsc).toBe(true);

    tinkSortTableController.sortClick(data.prop);
    scope.$digest();

    expect(scope.tinkSortField).toBe(data.prop);
    expect(scope.tinkAsc).toBe(false);

  });

});