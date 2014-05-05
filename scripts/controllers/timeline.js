'use strict';

angular.module('myCoopApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/timeline', {
                templateUrl: '/my-coop/views/timeline.html',
                controller: 'TimelineCtrl'
            });
    })
    .controller('TimelineCtrl', function ($scope, $rootScope, $route, $location) {

    });
