(function(){
    'use strict';

    /**
 * @ngdoc overview
 * @name remoteTestApp
 * @description
 * # remoteTestApp
 * Main module of the application.
 */
    var app = angular.module("remoteTestApp",['ngRoute','ngSanitize']);
    app.config(function($routeProvider){
        $routeProvider.
        when('/home',{
            templateUrl:'templates/homeTemplate/homeTemplate.html',
            controller:'homeController'
        }).when('/about',{
            template:'<div class="inProgressElement">ABOUT PAGE</div>'
        }).when('/portfolio',{
            template:'<div class="inProgressElement">PORTFOLIO PAGE</div>'
        }).when('/blog',{
            template:'<div class="inProgressElement">BLOG PAGE</div>'
        }).otherwise({redirectTo : '/home'});
    });
})();
