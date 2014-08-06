angular.module('interceptor', [])
    .factory('securityInterceptor', ['$location', '$q', '$rootScope',
        function ($location, $q, SecurityService, $rootScope) {
            return function (promise) {
                return promise.then(function (response) {
                    return response;
                }, function (response) {
                    console.info(response.status);
                    if (response.status == 401) {
                        window.location.replace('/#/login');
                    }
                    if (response.status == 404) {
//                        window.location.replace('/404.html');
                    }
                    return $q.reject(response);
                });
            };
        }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.responseInterceptors.push('securityInterceptor');
    }]);
