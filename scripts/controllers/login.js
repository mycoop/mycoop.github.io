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
    .controller('LoginCtrl', function ($scope, $rootScope, $route, $location) {
        $scope.email = '';
        $scope.password = '';
        $rootScope.isLoggedIn = false;
        $scope.login = function(){
            if(($scope.email == 'tmiller@google.com' && $scope.password == 'password123') ||
                ($scope.email == 'mr.gusev.k@gmail.com' && $scope.password == '123') ){
                $rootScope.isLoggedIn = true;
                $location.path('/admin-welcome');
            } else if($scope.email == 'jcoop@google.com' && $scope.password == 'password123'){
                $rootScope.isLoggedIn = true;
                $location.path('/user-welcome');
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
