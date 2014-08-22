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

        $scope.map = {
            center: {
                latitude: 32.8206646,
                longitude: -96.7313396
            },
            control: {},
            zoom: 9
        };


        //
        //
        //
        //
        //
        //32.908854, -96.629744
        $scope.incidents = [
            {
                id: 1,
                title: 'Manufacturing Fire',
                incidentType: $scope.incidentTypes.fire,
                incidentPriority: $scope.incidentPriorities.high,
                facilityType: $scope.facilityTypes.manufacturing,
                location: 'Plano(HQ)',
                startTime: new Date(),
                duration: '3h 43m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 32.778142,
                longitude: -96.799317
            },

            {
                id: 2,
                title: 'Mail Server Outage',
                incidentType: $scope.incidentTypes.network,
                incidentPriority: $scope.incidentPriorities.medium,
                facilityType: $scope.facilityTypes.primary,
                location: 'Fort Worth',
                startTime: new Date(),
                duration: '10h 21m',
                staffImpacted: 4,
                orgUnitsImpacted: 2,
                latitude: 32.755474,
                longitude: -97.331351
            },

            {
                id: 3,
                title: 'Basement Flooded',
                incidentType: $scope.incidentTypes.weather,
                incidentPriority: $scope.incidentPriorities.low,
                facilityType: $scope.facilityTypes.recovery,
                location: 'Plano(HQ)',
                startTime: new Date(),
                duration: '6h 17m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 33.019707,
                longitude: -96.698552
            },

            {
                id: 3,
                title: 'Basement Flooded',
                incidentType: $scope.incidentTypes.weather,
                incidentPriority: $scope.incidentPriorities.medium,
                facilityType: $scope.facilityTypes.primary,
                location: 'Plano(HQ)',
                startTime: new Date(),
                duration: '6h 17m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 32.952863,
                longitude: -96.963218
            },

            {
                id: 3,
                title: 'Basement Flooded',
                incidentType: $scope.incidentTypes.weather,
                incidentPriority: $scope.incidentPriorities.low,
                facilityType: $scope.facilityTypes.recovery,
                location: 'Plano(HQ)',
                startTime: new Date(),
                duration: '6h 17m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 32.868701,
                longitude:  -96.937126
            },

            {
                id: 3,
                title: 'Basement Flooded',
                incidentType: $scope.incidentTypes.weather,
                incidentPriority: $scope.incidentPriorities.low,
                facilityType: $scope.facilityTypes.manufacturing,
                location: 'Plano(HQ)',
                startTime: new Date(),
                duration: '6h 17m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 32.670086,
                longitude:  -96.864341
            },

            {
                id: 3,
                title: 'Basement Flooded',
                incidentType: $scope.incidentTypes.weather,
                incidentPriority: $scope.incidentPriorities.low,
                facilityType: $scope.facilityTypes.primary,
                location: 'HQ',
                startTime: new Date(),
                duration: '6h 17m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 32.902145,
                longitude: -97.134880
            },

            {
                id: 3,
                title: 'Basement Flooded',
                incidentType: $scope.incidentTypes.network,
                incidentPriority: $scope.incidentPriorities.low,
                facilityType: $scope.facilityTypes.recovery,
                location: 'Plano(HQ)',
                startTime: new Date(),
                duration: '6h 17m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 32.638868,
                longitude: -96.724266
            },
        ];
        var service = {
            addIncident: function (incident, callback) {
//                $http.post('/api/sign/in', user).success(callback);
                incident.incidentType = _.findWhere($scope.incidentTypes, {id: incident.incidentType.id});
                incident.incidentPriority = _.findWhere($scope.incidentPriorities, {id: incident.priorityType.id});
                incident.facilityType = _.findWhere($scope.facilityTypes, {id: incident.facilityType.id});
                incident.duration = '6h 17m';
                $scope.incidents.push(incident);
                callback();
            },
            updateIncident: function(callback){
                $http.post('/api/sign/out').success(callback);
            },
            getIncidents: function (callback) {
                callback($scope.incidents)
            },
            getIncident: function (id, callback) {
                $http.get('/api/user/' + id).success(callback);
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
