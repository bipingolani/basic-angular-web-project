(function(){
    'use strict';

    /**
 * @ngdoc directive
 * @name remoteTestApp.addCommentsPopUp
 * @description
 * # addCommentsPopUp
 * directive in the remoteTestApp.
 */
    angular.module('remoteTestApp')
        .directive("addCommentsPopUp", ['dataService',addCommentsPopUP]);

    function addCommentsPopUP(dataService) {
        var addPopUpLinkFunc = function (scope, elem, attr) {
            if (!scope.content || scope.content.trim()==='') {
                scope.content = '';
            }
            
            function calculateTextLength(text){
                if(text){
                    var temp=text;
                    if(text.indexOf('&nbsp;')!==-1){
                        temp = temp.replace(/&nbsp;/g, '');
                    }
                    if(text.indexOf('<br>')!==-1){
                        temp = temp.replace(/<br>/g, '');
                    }
                    if(text.indexOf('\n')!==-1){
                        temp = temp.replace(/<br>/g, '');
                    }
                    return temp.trim().length || 0;
                }else{
                    return 0;
                }
            }
            scope.saveComments = function () {
                var commentDetails = {
                    name: scope.name,
                    content: scope.content
                };
                dataService.setComment(scope.templateIndex,commentDetails,scope.commentIndex);
                scope.close();
            };
            scope.close=function(){
                if(angular.isFunction(scope.callback)){
                    scope.callback();
                }
            };
            scope.validateName = function(value){
                scope.nameLength = calculateTextLength(value);
            };
            scope.validateComment = function (value) {
                scope.contentLength = calculateTextLength(value);
            };
            
            if(scope.commentIndex){
                var loadComment = dataService.getComment(scope.templateIndex,scope.commentIndex);
                scope.name = loadComment.name;
                scope.content = loadComment.content;
                scope.validateName(scope.name);
                scope.validateComment(scope.content);
            }else{
                scope.validateName(scope.name);
                scope.validateComment(scope.content);
            }
            
        };
        return {
            restrict: 'EA',
            templateUrl: 'common/directives/addCommentsPopUp/addCommentsPopUp.html',
            scope: {
                templateIndex: '@',
                commentIndex:'@?',
                callback:'&'
            },
            link: addPopUpLinkFunc
        };
    }

})();
