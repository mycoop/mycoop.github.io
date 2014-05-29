'use strict';

angular.module('myCoopApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: '/my-coop/views/main.html',
                controller: 'MainCtrl'
            })
            .when('/print', {
                templateUrl: '/my-coop/views/view-plan.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, $rootScope, $route, $location) {
        $rootScope.isLoggedIn = true;
    });
