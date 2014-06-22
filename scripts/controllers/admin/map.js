angular.module('adminApp').
    controller('mapCtrl', function ($scope, $timeout) {
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

        $scope.refreshMap = function (id) {
//            alert(123)
            switch (id) {
                case 1:
                    $scope.map.control.refresh($scope.map.center);
                    break;
                case 2:
                    $scope.incidentsMap.control.refresh($scope.incidentsMap.center);
                    break;
            }
        };

        $scope.incidentsMap = {
            center: {
                latitude: 33.019962,
                longitude: -96.697830
            },
            control: {},
            zoom: 9
        };

        $scope.locations = [
            {
                id: 1,
                title: 'Dallas',
                people: 53,
                latitude: 32.778142,
                longitude: -96.799317
            },
            {
                id: 2,
                title: 'Plano',
                people: 46,
                latitude: 33.019707,
                longitude: -96.698552
            },
            {
                id: 3,
                title: 'Fort Worth',
                people: 28,
                latitude: 32.755474,
                longitude: -97.331351
            }
        ];

        $scope.incidents = [
            {
                id: 1,
                title: 'Manufacturing Fire',
                incidentType: $scope.incidentTypes.fire,
                incidentPriority: $scope.incidentPriorities.high,
                facilityType: $scope.facilityTypes.manufacturing,
                location: 'HQ',
                place: 'Dallas',
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
                location: 'Office',
                place: 'Fort Worth',
                startTime: new Date(),
                duration: '10h 21m',
                staffImpacted: 4,
                orgUnitsImpacted: 2,
                latitude: 32.755474,
                longitude: -97.331351
            },

            {
                id: 1,
                title: 'Basement Flooded',
                incidentType: $scope.incidentTypes.weather,
                incidentPriority: $scope.incidentPriorities.low,
                facilityType: $scope.facilityTypes.recovery,
                location: 'HQ',
                place: 'Plano',
                startTime: new Date(),
                duration: '6h 17m',
                staffImpacted: 3,
                orgUnitsImpacted: 1,
                latitude: 33.019707,
                longitude: -96.698552
            },
        ];

        function getFacilityIconUrl(incident) {
            switch (incident.facilityType.id) {
                case $scope.facilityTypes.manufacturing.id:
                    return '/images/icons/map/manufacture.svg';
                    break;
                case $scope.facilityTypes.primary.id:
                    return '/images/icons/map/primary.svg';
                    break;
                case $scope.facilityTypes.recovery.id:
                    return '/images/icons/map/recovery.svg';
                    break;

            }
        }

        function getIncidentTypeIconUrl(incident) {
            switch (incident.incidentType.id) {
                case $scope.incidentTypes.fire.id:
                    return '/images/icons/map/fire.svg';
                    break;
                case $scope.incidentTypes.biohazard.id:
                    return '/images/icons/map/biohazard.svg';
                    break;
                case $scope.incidentTypes.network.id:
                    return '/images/icons/map/network.svg';
                    break;
                case $scope.incidentTypes.weather.id:
                    return '/images/icons/map/weather.svg';
                    break;

            }
        }

        function createMarkers() {
            $timeout(function () { // wait for map directive to load
                _.each($scope.incidents, function (incident) {
                    new RichMarker({
                        map: $scope.map,   // !! $scope.map
                        position: new google.maps.LatLng(incident.latitude, incident.longitude),
                        flat: true,
                        anchor: RichMarkerPosition.MIDDLE,
                        content: '<div class="pin-complex" style="background-image: url(\''+ getFacilityIconUrl(incident)+ "\')\">"
                                + '<div class="pin-secondary" style="background-image: url(\'' + getIncidentTypeIconUrl(incident) + '\')"></div>'
                                +'</div>'
                    });
                });
            });
        }

        createMarkers();
    })
;