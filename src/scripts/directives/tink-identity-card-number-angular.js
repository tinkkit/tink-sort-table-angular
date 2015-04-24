'use strict';
(function(module) {
  try {
    module = angular.module('tink.identitycardnumber');
  } catch (e) {
    module = angular.module('tink.identitycardnumber', ['tink.safeApply','tink.formathelper']);
  }
  module.directive('tinkIdentityNumber',['$window','safeApply',function($window,safeApply){
     return {
      restrict:'AE',
      controller:'tinkFormatController',
      require:['tinkIdentityNumber','ngModel','?^form'],
      template: function() {
        var isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);
        var isTouch = ('createTouch' in $window.document) && isNative;
        if (isTouch) {
          return '<div><input class="hide-styling" type="text"><div>';
        } else {
          return '<div tabindex="-1"><div id="input" class="faux-input" contenteditable="true">{{placeholder}}</div></div>';
        }
      },
      link:function(scope,elm,attr,ctrl){
        elm.attr('tabindex','-1');
        var isNative = /(ip(a|o)d|iphone|android)/ig.test($window.navigator.userAgent);
        var isTouch = ('createTouch' in $window.document) && isNative;
        var controller = ctrl[0];
        var form = ctrl[2];
        var ngControl = ctrl[1];
        var element = elm.find('div>:first');
        //variable
        var config = {
          format: '000-0000000-00',
          placeholder: 'xxx-xxxxxxx-xx'
        };

         ngControl.$parsers.unshift(function(value) {
          checkvalidty(value);
          return value;
         });

         ngControl.$formatters.push(function(modelValue) {
          if(modelValue !== undefined){
            if(modelValue && modelValue.length === 11){
              modelValue = modelValue.substr(0,2) + '.' + modelValue.substr(2,2)+ '.' + modelValue.substr(4,2)+'-'+ modelValue.substr(6,3)+'-'+modelValue.substr(9,2);
            }

            if(validFormat(modelValue)){
              if(isTouch){
                element.val(modelValue);
              }else{
                controller.setValue(modelValue,null);
              }
            }else{
              modelValue = null;
              ngControl.$setViewValue(modelValue);
            }
            checkvalidty(modelValue);

          }
          return modelValue;
         });

         element.unbind('input').unbind('keydown').unbind('change');
        //on blur update the model.
        element.on('blur', function() {
          safeApply(scope,function(){
            var value;
            if (isTouch) {
              value = element.val();
            }else{
              value = controller.getValue();
            }
            checkvalidty(value);
              if(isRRNoValid(value)){
                ngControl.$setViewValue(value);
                ngControl.$render();
              }else{
                 ngControl.$setViewValue(null);
              }
              /*if(value === 'xx.xx.xx-xxx.xx' || value === ''){
                ngControl.$setViewValue(null);
              }*/
          });
        });

         var isRequired = (function(){
            if(attr.required === 'true' || attr.required === '' || attr.required === 'required'){
              return true;
            }else{
              return false;
            }
          })();

          function validFormat(value){
            if(value && value.length === 11){
              return value.match(/[0-9]*/g);
            }else if(value && value.length === 15){
              return value.match(/[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9][0-9]/g);
            }else{
              return false;
            }
          }


         function isRRNoValid(n) {
          if(typeof n !== 'string' && n.length !== 12){
            return false;
          }

              n = n.replace(/[^\d]*/g, '');

              var checkDigit = n.substr(n.length - 2, 2);
              var modFunction = function(nr) {
                var modu = nr % 97;
                if(modu === 0){
                  return 97;
                } else {
                  return parseInt(modu);
                }
              };
              var nrToCheck = parseInt(n.substr(0, 10));

              // first check without 2
              if (modFunction(nrToCheck) === parseInt(checkDigit)) {
                return true;
              }else{
                return false;
              }
          }

         function checkvalidty(value){

          if(value === config.placeholder || value === '' || value === null || value === undefined){
            ngControl.$setValidity('format',true);
          }else{
            ngControl.$setValidity('format',isRRNoValid(value));
          }

          if(isRequired){
            if(controller.getValue() === config.placeholder || value === '' || value === null || value === undefined){
              ngControl.$setValidity('required',false);
              ngControl.$setValidity('format',true);
            }else{
              ngControl.$setValidity('required',true);
            }
          }
         }

         if (!isTouch) {
            controller.init(element,config,form,ngControl);
         }
      }
    };
  }]);
})();