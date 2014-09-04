'use strict';

angular
    .module('myCoopApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'resources.user',
        'services.security',
        'filters',
        'ui.bootstrap'
    ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/login'
            });
    }).run(function ($rootScope, $location, User) {
//        $rootScope.isLoggedIn = false;
        var isInitChecking = true;

        User.getCurrent(function (data) {
            $rootScope.profile = data;
        })

        $rootScope.redirect = function (path) {
            $location.path(path);
        };

        $rootScope.logout = function () {
            $rootScope.isLoggedIn = false;
            $location.path('/login')
        };
        $rootScope.goToLogin = function () {
            SecurityService.redirectToLogin($location.path());
        };
        $rootScope.goToSignup = function () {
            $location.path("/signup");
        };

//        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
//
//            if ( !SecurityService.isAuthenticated()) {
//                console.log('App not authenticated');
//                var path = $location.path();
//                console.log(next.controller);
//                if (next.access != 'free') {
//                    console.info("Not authenticated");
//                    console.info(path);
//                    SecurityService.redirectToLogin(path);
//                }
//            }
//        });
//        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
//            if (isInitChecking) {
//                event.preventDefault();
//                SecurityService.testLogin(function () {
//                        $route.reload();
//                    },
//                    function () {
//                        $route.reload();
//                    });
//                isInitChecking = false;
//            }
//        });
    });
