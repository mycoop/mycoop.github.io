'use strict';

angular.module('myCoopApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/options', {
                templateUrl: '/my-coop/views/options.html',
                controller: 'OptionsCtrl'
            });
    })
    .controller('OptionsCtrl', function ($scope, $rootScope, $route, $location) {

    });
