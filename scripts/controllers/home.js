'use strict';

angular.module('myCoopOnlineApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: '/my-coop/views/home.html',
                controller: 'HomeCtrl'
            });
    })
    .controller('HomeCtrl', function ($scope, $rootScope, $route, $location) {

    });
