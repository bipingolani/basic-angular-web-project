(function(){
    'use strict';

/**
 * @ngdoc controller
 * @name remoteTestApp.homeController
 * @description
 * Home controller is responsible for home tab.
 * controller in the remoteTestApp.
 */
    angular.module('remoteTestApp')
        .controller("homeController", ['$scope', 'dataService', homeController]);
    
    function homeController($scope, dataService) {
        
        $scope.showPopUp = false;
        
        //Using data service to populate data as single source through out application
        var dataPromise = dataService.getServerResponse();
        dataPromise.then(function(success){
            $scope.templateList = success;
        })
        .catch(function(error){
            console.log(error);
        });
        
        //getLikeButtonClass function sets like button class dynamically for UP vote nad down vote as well
        $scope.getLikeButtonClass = function (idx, type) {
            if (type == "UP") {
                if (idx % 2 === 0) {
                    return 'voteButtons noColorThumpsUp';
                } else {
                    return 'voteButtons coloredThumpsUp';
                }
            } else {
                if (idx % 2 === 0) {
                    return 'voteButtons noColorThumpsDown';
                } else {
                    return 'voteButtons coloredThumpsDown';
                }
            }
        };

        $scope.increaseLike = function (idx) {
            if ($scope.templateList[idx].likeCount < 10) {
                $scope.templateList[idx].likeCount++;
            }
        };
        $scope.decreaseLike = function (idx) {
            if ($scope.templateList[idx].likeCount > 0) {
                $scope.templateList[idx].likeCount--;
            }
        };
        
        $scope.showPopUpFunc = function (templateIdx,commentIdx) {
            $scope.showPopUp = !$scope.showPopUp;
            $scope.templateIndex = templateIdx;
            $scope.commentIndex = commentIdx;
        };
        
        $scope.removeComment = function(templateIdx,commentIdx){
            dataService.deleteComment(templateIdx,commentIdx);
        };
        
        $scope.closePopup= function(){
            $scope.showPopUp = false;
        };
    }
})();

