'use strict';

angular
    .module('myCoopOnlineApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.router',
        'ngGrid',
        'resources.process',
        'resources.user',
        'ui.bootstrap'
//        'ui.state'state
    ]).run(function ($rootScope, $location, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
//        $state.transitionTo('home.profile');
        var isInitChecking = true;
        $rootScope.showNav = '';

        $rootScope.toggleNav = function () {
            $rootScope.showNav = $rootScope.showNav ? '' : 'show_nav';
        };


        var pages = [
            { name: 'Organization Profile (Admin View)', selected: false, parent: 'HOME'},
            { name: 'User Administration', selected: false, parent: 'HOME'},
            { name: 'Resource Directories', selected: false, parent: 'HOME'},
            { name: 'Organization Profile (Admin View)', selected: false, parent: 'HOME'},
            { name: 'Organization Profile (Admin View)', selected: false, parent: 'HOME'}
        ];

        $rootScope.redirect = function (path) {
            $location.path(path);
        };
//        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
//            $rootScope.setCurrentPage($location.path().replace('/', ''));
////            alert($rootScope.isFederalSelected);
//        });
    }).controller('ModalInstanceCtrl', function ($scope, $modalInstance, message) {
        $scope.message = message;
        $scope.input = {confirm: false};
        $scope.isMoveUsers = true;
        $scope.ok = function () {
            $modalInstance.close($scope.input);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
