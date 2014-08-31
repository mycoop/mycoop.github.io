angular.module('resources.incident', [])
    .factory('Incident', ['$http', function ($http) {
        var $scope = {};
        $scope.incidentTypes = {
            fire: {isActive: true, id: 1, name: 'Fire'},
            biohazard: {isActive: true, id: 2, name: 'Biohazard/Pandemic'},
            weather: {isActive: true, id: 3, name: 'Inclement Weather'},
            network: {isActive: true, id: 4, name: 'Network Outage'}
        };

        $scope.incidentPriorities = {
            low: {isActive: true, id: 1, name: 'High'},
            medium: {isActive: true, id: 2, name: 'Medium'},
            high: {isActive: true, id: 3, name: 'Low'},
            urgent: {isActive: true, id: 4, name: ''}
        };
        $scope.facilityTypes = {
            primary: {isActive: true, id: 1, name: 'Primary Facilities'},
            recovery: {isActive: true, id: 2, name: 'Recovery Sites'},
            manufacturing: {isActive: true, id: 3, name: 'Manufacturing'}
        };


        var service = {
            addIncident: function (incident, callback) {
                $http.post('/api/incident', incident).success(callback);
            },
            updateIncident: function (incident, callback) {
                $http.post('/api/incident/' + incident.id, incident).success(callback);
            },
            getIncidents: function (callback) {
                $http.get('/api/incident').success(function (data) {
//                    alert(123)
                    _.each(data, function (incident) {
                        incident.incidentType = _.findWhere($scope.incidentTypes, {id: incident.type});
                        incident.priorityType = _.findWhere($scope.incidentPriorities, {id: incident.priority});
                        incident.facilityType = _.findWhere($scope.facilityTypes, {id: incident.facilityType});
                        if(!incident.duration){
                            incident.duration = new Date() - new Date(incident.startTime);
                            incident.isContinue = true;
                        }
                    });
                    callback(data)
                });
            },
            getIncident: function (id, callback) {
                $http.get('/api/incident/' + id).success(callback);
            },
            deleteIncident: function (user, callback) {
                $http.post('/api/user/', user).success(callback);
            },
            addOrgunit: function (userId, callback) {
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
