angular.module('resources.group', [])
    .factory('Group', ['$http', 'User', function ($http, User) {
        var service = {
            getPermissions: function (callback) {
                callback(permissions);
            },
            getGroups: function (callback) {
                $http.get('/api/group').success(callback);
            },
            getGroup: function (id, callback) {
                $http.get('/api/group/' + id).success(callback);
            },
            addGroup: function (group, callback) {
                $http.post('/api/group/', group).success(callback);
            },
            getGroupUsers: function (groupId, callback) {
                $http.get('/api/group/' + groupId + '/user/').success(callback);
            },
            addUserToGroup: function (groupId, userId, callback) {
                $http.post('/api/group/' + groupId + '/user/' + userId, {}).success(callback);
            },
            removeUserFromGroup: function(groupId, userId, callback){
                $http.delete('/api/group/'+groupId+'/user/'+userId).success(callback);
            },
            updateGroup: function (group, callback) {
                $http.post('/api/group/' + group.id, group).success(callback);
            },
            deleteGroup: function (groupId, callback) {
                $http.delete('/api/group/' + groupId).success(callback);
            }
        };
        return service;
    }]);
