'use strict';

angular.module('myCoopOnlineApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/federal', {
                templateUrl: '/my-coop/views/federal.html',
                controller: 'FederalCtrl'
            });
    })
    .controller('FederalCtrl', function ($scope, $rootScope, $route, $location) {

    });
