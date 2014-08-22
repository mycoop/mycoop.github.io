angular.module('resources.org-entity', [])
    .service('OrgUnit', function ($http, $cookies) {
        var entities = [
            {
                id: 15,
                owner: 'Joe Smith', location: 'Lansing, MI, USA', access: false, parent: null,
                title: "Basic organization",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            }
        ];

        var service = {
            getOrgUnits: function (callback) {
                $http.get('/api/orgunit').success(callback);
            },
            getOrgUnit: function (id, callback) {
                if (id == 15) {
                    callback(entities[0]);
                } else {
                    $http.get('/api/orgunit/' + id).success(callback);
                }
            },
            addOrgUnit: function (entity, callback) {
                $http.post('/api/orgunit/', entity).success(callback);
            },
            updateOrgUnit: function (entity, callback) {
                $http.post('/api/orgunit/' + entity.id, entity).success(callback);
            },
            addUserPermission: function (orgunitId, userId, permissionId, callback) {
                $http.post('/api/orgunit/' + orgunitId + '/user/' + userId + '/permission/' + permissionId).success(callback);
            },
            addGroupPermission: function (orgunitId, groupId, permissionId, callback) {
                $http.post('/api/orgunit/' + orgunitId + '/group/' + groupId + '/permission/' + permissionId).success(callback);
            },
            deleteOrgUnit: function (id, callback) {
                $http.delete('/api/orgunit/' + id).success(callback);
            }
        };
        return service;
    });
