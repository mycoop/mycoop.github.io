'use strict';
angular.module('myCoopApp')
    .factory('SecurityService', ['$http', '$location', '$rootScope',
        function ($http, $location, $rootScope) {

            var service = {
                authCode: null,
                currentUser: null,
                fromUrl: "/",
                isAuthenticated: function () {
                    return service.authCode === 200;
                },
                redirectToLogin: function (fromUrl) {
                    service.fromUrl = fromUrl;
                    $location.path('/login');
                },
                authenticate: function (callback, error) {
                    console.log('authentication process');
                    $http.get('/api/v1/profile', {}).success(function (data) {
                        console.log('successfully got profile');
                        service.authCode = 200;
                        $rootScope.isAuthenticated = true;
                        $rootScope.profile = data;
                        console.log($rootScope.profile.id);
                        callback();
                    }).error(error);
                },
                login: function (email, password, errorCallback) {
                    var $http = $injector.get('$http');
                    $http.post('/api/v1/login', { email: email, password: password }).success(
                        function (response, status) {
//                            service.authenticate(function () {
                                $location.path(service.fromUrl);
//                            });
                        }).error(errorCallback);
                },
                logout: function () {
                    var $http = $injector.get('$http');
                    var $route = $injector.get('$route');
                    $http.post('/api/v1/logout', {}).success(function () {
                        service.authCode = 0;
                        console.info("logout");
                        $rootScope.isAuthenticated = false;
                        $rootScope.profile = {};
                        window.location.replace('/');
                    });
                },
                signup: function (userModel, success, error) {
                    var $http = $injector.get('$http');
                    $http.post('/api/v1/login/create', userModel).success(success).error(error);
                },
                verify: function (email, verificationCode) {
                    var $http = $injector.get('$http');
                    $http.post('/api/v1/login/verify', { email: email, verificationCode: verificationCode })
                        .success(function () {
                            console.info("verification ok");
                            service.authenticate(function () {
                                $location.path('/');
                            });
                        });
                },
                resetPasswordRequest: function (email, success, error) {
                    var $http = $injector.get('$http');
                    $http.post('/api/v1/login/reset', { email: email })
                        .success(success)
                        .error(error);
                },
                resetPassword: function (email, password, resetCode) {
                    var $http = $injector.get('$http');
                    $http.put('/api/v1/login/', { email: email, password: password, resetCode: resetCode })
                        .success(function () {
                            console.info(" reset password  ok");
                            service.authenticate(function () {
                                $location.path('/');
                                $rootScope.showMessage($rootScope.dictionary['password_changed']);
                            });
                        });
                },
                testLogin: function (sucsess, error) {
                    service.authenticate(sucsess, error);
                }
            };

            return service;
        } ]);