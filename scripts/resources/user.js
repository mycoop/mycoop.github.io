angular.module('resources.user', [])
    .factory('User', ['$http', function ($http) {
        var service = {
            login: function (user, callback, error) {
                $http.post('/api/sign/in', user).success(callback).error(error);
            },
            logout: function(callback){
                $http.post('/api/sign/out').success(callback);
            },
            getUsers: function (callback) {
                $http.get('/api/user/').success(callback);
            },
            getUser: function (id, callback) {
                $http.get('/api/user/' + id).success(callback);
            },
            getCurrent: function(callback){
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
            deleteUser: function (userId, callback) {
                $http.delete('/api/user/' + userId).success(callback);
            }
        };
        return service;
    }]);
