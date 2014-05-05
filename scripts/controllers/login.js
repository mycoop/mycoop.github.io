'use strict';

angular.module('myCoopApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/my-coop/views/login.html',
                controller: 'LoginCtrl',
                access: 'free'
            });
    })
    .controller('LoginCtrl', function ($scope, $rootScope, $route, $location) {
        $scope.credentials = {
            email: '',
            password: ''
        };
        $scope.login = function(){
            if($scope.credentials.email == 'tmiller@google.com' && $scope.credentials.password == 'password123'){
                $location.path('/');
            }
        }
    });
