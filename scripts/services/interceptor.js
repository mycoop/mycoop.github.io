angular.module('myCoopApp')
    .factory('securityInterceptor', ['$location', '$q', 'SecurityService', '$rootScope',
        function ($location, $q, SecurityService, $rootScope) {
            return function (promise) {
                return promise.then(function (response) {
                    if (!$rootScope.profile) {
//                        $rootScope.profile.id = ;
                        SecurityService.authenticate();
                    }
                    return response;
                }, function (response) {
                    console.info(response.status);
                    $rootScope.showError(response.config.url + ' - ' + response.status + ' : ' + response.data.message)
                    if (response.status == 401 && SecurityService.isAuthenticated()) {
                        SecurityService.authCode = 401;
                        $rootScope.isAuthenticated = false;
                        window.location.replace('/login');
                    }
                    if (response.status == 404) {
                        window.location.replace('/404.html');
                    }
                    return $q.reject(response);
                });
            };
        }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.responseInterceptors.push('securityInterceptor');
    }]);
