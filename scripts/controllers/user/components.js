angular.module('userApp').
    controller('ComponentsCtrl', function ($scope) {

        $scope.map = {
            center: {
                latitude: 42.724699,
                longitude: -84.546672
            },
            zoom: 13
        };
        $scope.marker = {
            coords:{
                latitude: 42.724699,
                longitude: -84.546672
            }
        }
    });