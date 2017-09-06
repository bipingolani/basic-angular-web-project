'use strict';

/**
 * @ngdoc service
 * @name remoteTestApp.dataService
 * @description
 * # dataService is used as single point for all data related changes 
 * which is accessible via dependency injection through out the application.
 */
angular.module('remoteTestApp')
    .service("dataService", function ($http) {
    
        //used variable to avoid issues relating to "this" keyword. 
        var self = this;    

        self.getServerResponse = function(){
            return $http.get("data.json").then(function(success){
                self.templateList = success.data.templateList;
                return self.templateList;
            })
                .catch(function(error){
                    console.log(error); 
                    return undefined;
            });
        };
        // Functions to perform CRUD operations
        self.getComment = function (templateIdx, commentIdx) {
            return self.templateList[templateIdx].comments[commentIdx];
        };
        self.setComment = function (templateIdx, val, commentIdx) {
            if (commentIdx) {
                self.templateList[templateIdx].comments[commentIdx].name = val.name;
                self.templateList[templateIdx].comments[commentIdx].content = val.content;
            } else {
                self.templateList[templateIdx].comments.unshift(val);
            }
        };
        self.deleteComment = function (templateIdx, commentIdx) {
            self.templateList[templateIdx].comments.splice(commentIdx,1);
        };

    });