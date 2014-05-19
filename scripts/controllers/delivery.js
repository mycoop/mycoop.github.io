angular.module('myCoopOnlineApp').
    controller('DeliveryEditCtrl', function ($scope) {
        $scope.isCollapsed = true;
        $scope.methods = [
            {name: 'Air cargo'},
            {name: 'Courier'},
            {name: 'Electronic'},
            {name: 'Email'},
            {name: 'Fax'},
            {name: 'In Person'},
            {name: 'Internet'},
            {name: 'Intranet'},
            {name: 'Overland mail'},
            {name: 'Rail'},
            {name: 'Road'},
        ];
    });