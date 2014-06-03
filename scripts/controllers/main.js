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
        $scope.tasks = [
            {
                area:'Department 1',
                title: 'Business Impact Analysis',
                details: 'This report identifies the key business continuity requirements for each critical business activity',
                deadline: new Date().setDate((new Date()).getDate() + 5),
                scheduledDate: new Date().setDate((new Date()).getDate() + 6),
                status: 'gold'
            },
            {
                area:'Department 3',
                title: 'Risk Assessment Report',
                details: 'This report provides evidence of the systematic assessment of risks to the organisation’s prioritised activities and the processes, systems, information, people, assets, outsource partners and other resources that support them',
                deadline: new Date().setDate((new Date()).getDate() + 5),
                scheduledDate: new Date().setDate((new Date()).getDate() + 6),
                status: 'bronze'
            },
            {
                area:'Location B',
                title: 'Business Continuity Plan',
                details: 'The Business Continuity Plan sets out in detail how a particular strategy will be implemented in order to meet the defined requirements. It is intended to be used at the point at which an incident has occurred.',
                deadline: new Date().setDate((new Date()).getDate() + 5),
                scheduledDate: new Date().setDate((new Date()).getDate() + 6),
                status: 'silver'
            }
        ]
    });
