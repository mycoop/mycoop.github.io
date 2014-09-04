angular.module('resources.user', [])
    .factory('User', function ($http, $filter) {

        var detectBrowserByUserAgent = function (userAgent) {
            if (/Firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
                return 'Firefox' ; //+ Number(RegExp.$1);
            }
            else if (/MSIE (\d+\.\d+);/.test(userAgent)) {
                return 'IE' ; //+ Number(RegExp.$1)
            }
            else if (/Chrome[\/\s](\d+\.\d+)/.test(userAgent)) {
                return 'Chrome' ; //+ Number(RegExp.$1);
            }
            else if (/Opera[\/\s](\d+\.\d+)/.test(userAgent)) {
                return 'Opera' ; //+ Number(RegExp.$1);
            }
            else if (/Safari[\/\s](\d+\.\d+)/.test(userAgent)) {
                return 'Safari' ; //+ Number(RegExp.$1);
            }
        };

        var service = {
            login: function (user, callback, error) {
                $http.post('/api/sign/in', user).success(callback).error(error);
            },
            logout: function (callback) {
                $http.post('/api/sign/out').success(callback);
            },
            getUsers: function (callback) {
                $http.get('/api/user/').success(callback);
            },
            getUser: function (id, callback) {
                $http.get('/api/user/' + id).success(callback);
            },
            getCurrent: function (callback) {
                $http.get('/api/user/current').success(callback);
            },
            addUser: function (user, callback) {
                $http.post('/api/user/', user).success(callback);
            },
            getUserGroups: function (userId, callback) {
                $http.get('/api/user/' + userId + '/group/').success(callback);
            },
            updateUser: function (user, callback) {
                $http.post('/api/user/' + user.id, user).success(callback);
            },
            getLoginHistory: function (startTime, callback) {
                startTime = $filter('date')(startTime,  'MM.dd.yyyy');
                $http.get('/api/user/history?startTime='+startTime).success(function(data){
                    _.each(data, function(item){
                        item.browser = detectBrowserByUserAgent(item.userAgent);
                        item.status = item.status.replace('login/', '');
                    });
                    callback(data);
                });
            },
            deleteUser: function (userId, callback) {
                $http.delete('/api/user/' + userId).success(callback);
            }
        };
        return service;
    });
