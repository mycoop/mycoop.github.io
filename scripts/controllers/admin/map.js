angular.module('adminApp').
    controller('mapCtrl', function ($scope) {
        $scope.map = {
            center: {
                latitude: 32.8206646,
                longitude: -96.7313396
            },
            zoom: 9
        };
        //dallas 32.778142, -96.799317
        //plano 33.019707, -96.698552
        //fort worth 32.755474, -97.331351
        $scope.markers = [
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
        ]
    })
;