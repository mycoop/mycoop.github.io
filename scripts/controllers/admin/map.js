angular.module('adminApp').
    controller('mapCtrl', function ($scope) {
        $scope.map = {
            center: {
                latitude: 32.8206646,
                longitude: -96.7313396
            },
            control:{},
            zoom: 9
        };

        $scope.refreshMap = function(id){
//            alert(123)
            switch (id){
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
            control:{},
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
                id: 2,
                title: 'Plano',
                people: 46,
                latitude: 33.019707,
                longitude: -96.698552,
                icon: '/images/orange-pin.png'
            }
        ]

    })
;