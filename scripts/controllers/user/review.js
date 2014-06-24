angular.module('userApp').
    controller('ReviewCtrl', function ($scope, $timeout) {
        $scope.dynamic=0;
        $timeout(function(){
            $scope.dynamic = 100;
        },100);
        $timeout(function(){
            $scope.isReady = true;
        },6100);
    });