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
            User.login({email: $scope.email, password: $scope.password}, function(data){
                $rootScope.isLoggedIn = true;
                User.getUser(data.id, function(user){
                    $rootScope.profile = user;
                    if(user.permissionLevelId == 1){
                        $location.path('/admin-welcome');
                    } else{
                        $location.path('/user-welcome');
                    }
                });
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
