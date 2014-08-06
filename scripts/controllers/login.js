'use strict';

angular.module('myCoopApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl',
                access: 'free'
            });
    })
    .controller('LoginCtrl', function ($scope, $rootScope, $route, $location, User) {
        $scope.email = '';
        $scope.password = '';
        $rootScope.isLoggedIn = false;
        $scope.login = function(){
            User.login({email: $scope.email, password: $scope.password}, function(){
                $rootScope.isLoggedIn = true;
                $location.path('/admin-welcome');
            }, function(){
                $scope.isPasswordIncorrect = true;
            });
        };
        $scope.$watch('email', function(){
            $scope.isPasswordIncorrect = false;
        });
        $scope.$watch('password', function(){
            $scope.isPasswordIncorrect = false;
        });
    });
