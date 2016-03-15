/*
directive.js
Author: Capstone Child First Group 54
        Sarah Louise Leong
Last Updated: 10 March 2015
Description: directive function for angularjs module
              select directive - to manually set the placeholder (default-option) of the select attr
*/


app.directive('select', function($interpolate) {
  return {
    restrict: 'E',
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      var defaultOptionTemplate;
      scope.defaultOptionText = attrs.defaultOption || 'Select...';
      defaultOptionTemplate = '<option value="" disabled selected style="display: none;">{{defaultOptionText}}</option>';
      elem.prepend($interpolate(defaultOptionTemplate)(scope));
    }
  };
});