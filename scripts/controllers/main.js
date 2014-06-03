'use strict';

angular.module('myCoopApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/admin-welcome', {
                templateUrl: '/views/main-admin.html',
                controller: 'MainCtrl'
            })
            .when('/user-welcome', {
                templateUrl: '/views/main-user.html',
                controller: 'MainCtrl'
            })
            .when('/print', {
                templateUrl: '/views/view-plan.html',
                controller: 'MainCtrl'
            });
    })
    .controller('MainCtrl', function ($scope, $rootScope, $route, $location) {
        $rootScope.isLoggedIn = true;
    });
