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
        $rootScope.isLoggedIn = true;
        $scope.password = '';
        $scope.login = function(){
            if(($scope.email == 'tmiller@google.com' && $scope.password == 'password123') ||
                ($scope.email == 'mr.gusev.k@gmail.com' && $scope.password == '123') ){
                $location.path('/main');
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
