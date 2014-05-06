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
        $scope.email = '';
        $scope.password = '';
        $scope.login = function(){
            if($scope.email == 'tmiller@google.com' && $scope.password == 'password123'){
                $location.path('/');
            } else{
                $scope.isPasswordIncorrect = true;
            }
        };
        $scope.$watch('email', function(){
            $scope.isPasswordIncorrect = false;
        });
        $scope.$watch('password', function(){
            $scope.isPasswordIncorrect = false;
        });
    });
