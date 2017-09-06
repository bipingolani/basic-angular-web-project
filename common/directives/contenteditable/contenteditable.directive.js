'use strict';

/**
 * @ngdoc directive
 * @name remoteTestApp.contenteditable
 * @description
 * 
 * **This code is provided in Angular DOCS** * 
 */
angular.module('remoteTestApp').
directive('contenteditable', ['$sce', function($sce) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };

            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$evalAsync(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if ( attrs.stripBr && (html == '<br>' || html == '<br><br>' || html=='&nbsp;') ) {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
        }
    };
}]);