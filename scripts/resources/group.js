angular.module('resources.group',[])
    .factory('Group', ['$http', 'User',function($http, User){
        var groups = [
            {id: '1', createdDate: new Date().setDate(1),  modifiedDate: new Date(), name: 'Administrators', description: ''},
            {id: '2', createdDate: new Date().setDate(1), modifiedDate: new Date(), name: 'Workspace Editors', description: ''},
            {id: '3', createdDate: new Date().setDate(1), modifiedDate: new Date(), name: 'Developers', description: ''},
            {id: '5', createdDate: new Date().setDate(1), modifiedDate: new Date(), name: 'Addons', description: 'User granted to third-party addons'},
            {id: '6', createdDate: new Date().setDate(1), modifiedDate: new Date(), name: 'Users', description: ''},
            {id: '7', createdDate: new Date().setDate(1), modifiedDate: new Date(), name: 'Site Admins', description: ''},
            {id: '8', createdDate: new Date().setDate(1), modifiedDate: new Date(), name: 'System Admins', description: ''},
        ];
        var permissions = [
            {name: 'Contributor'},
            {name: 'Workspace Administrator'},
            {name: 'Approver'},
            {name: 'Browser'},
        ];
        User.getUser('1', function(data){
            _.each(groups, function(item){
                item.createdBy = data;
                return item;
            })
        });

        User.getUser('3', function(data){

            _.each(groups, function(item){
                item.modifiedBy = data;
                return item;
            })
        });

        User.getUsers(function(data){
            _.each(groups, function(item){
                item.users = data;
                return item;
            })
        });

        _.each(groups, function(item){
            item.workspacePermissions = [
                {restricted: true, name: 'Department 1', permission: permissions[0], dateAdded: new Date() },
                {restricted: false, name: 'Department 2', permission: permissions[0], dateAdded: new Date() },
                {restricted: true, name: 'Location A', permission: permissions[1], dateAdded: new Date() },
                {restricted: false, name: 'Location B', permission: permissions[2], dateAdded: new Date() },
                {restricted: false, name: 'Location D', permission: permissions[3], dateAdded: new Date() }
            ]
        });
        var service = {
            getPermissions: function(callback){
                callback(permissions);
            },
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
                group.createdDate = new Date();
                group.modifiedDate = new Date();
                group.users = groups[0].users;
                group.createdBy = groups[0].createdBy;
                group.modifiedBy = groups[0].createdBy;
                group.id = _.max(groups, function(item){return item.id;}) + 1;
                groups.unshift(group);
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
