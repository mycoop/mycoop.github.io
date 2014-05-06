'use strict';

angular
    .module('myCoopOnlineApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
    ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/home'
            });
    }).run(function ($rootScope, $location) {
        var isInitChecking = true;
        $rootScope.showNav = '';

        $rootScope.toggleNav = function(){
            $rootScope.showNav = $rootScope.showNav ? '' : 'show_nav';
        };
        $rootScope.setCurrentPage = function(page){
            $rootScope.isFederalSelected = '';
            $rootScope.isHomeSelected = '';
            switch (page){
                case 'federal':
                    $rootScope.isFederalSelected = 'on';
                    break;
                case 'home':
                    $rootScope.isHomeSelected = 'on';
            }
        };
        $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        });

        $rootScope.redirect = function (path) {
            $location.path(path);
        };
        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            $rootScope.setCurrentPage($location.path().replace('/', ''));
//            alert($rootScope.isFederalSelected);
        });
    });
