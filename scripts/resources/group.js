angular.module('resources.group',[])
    .factory('Group', ['$http',function($http){
        var groups = [
            {id: 1, name: 'Administrators', description: ''},
            {id: 2, name: 'Workspace Editors', description: ''},
            {id: 3, name: 'Developers', description: ''},
            {id: 4, name: 'Confluence Administrators', description: ''}
        ];
        var service = {
            getGroups: function(callback){
                callback(groups);
            },
            getGroup: function(id, callback){
                callback(_.where(groups, {id: id})[0]);
            },
            getUsersGroups: function(userId, calback){
                calback([groups[3],groups[2]])
            },
            addGroup: function(group, callback){
                group.dateAdded = new Date();
                groups.push(group);
                callback();
            },
            updateGroup: function(group, callback){
                groups[groups.indexOf(_.findWhere(groups, {id: group.id}))] = group;
                callback();
            },
            deleteGroup: function(group, callback){
                groups.splice(groups.indexOf(group),1);
                callback();
            }
        };
        return service;
    }]);
