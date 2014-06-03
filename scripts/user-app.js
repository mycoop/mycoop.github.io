'use strict';

angular
    .module('userApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.router',
        'ngGrid',
        'google-maps',
        'resources.process',
        'resources.user',
        'resources.org-entity',
        'ui.bootstrap',
        'controls'
//        'ui.state'state
    ]).run(function ($rootScope, $location, $state, $stateParams, OrgEntity) {
        $rootScope.showNav = '';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if($rootScope.orgEntityId != $stateParams.orgEntityId){
                    $rootScope.orgEntityId = $stateParams.orgEntityId;
                    OrgEntity.getEntity($rootScope.orgEntityId, function(data){
//                        alert(JSON.stringify(data));
                        $rootScope.orgEntity = data;
                    })
                }
            });



        $rootScope.toggleNav = function () {
            $rootScope.showNav = $rootScope.showNav ? '' : 'show_nav';
        };

        $rootScope.redirect = function (path) {
            $location.path(path);
        };
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
    }).controller('NodeModalCtrl', function ($scope, $modalInstance, node) {
        $scope.node = node;
        $scope.ok = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }).controller('ErrorModalCtrl', function ($scope, $modalInstance, message) {
        $scope.message = message;
        $scope.ok = function () {
            $modalInstance.close();
        };
    }).config(function ($stateProvider) {
        $stateProvider
            .state('home', { url: '/home?orgEntityId'})
            .state('home.main', {  templateUrl: '/views/user/home.html', url: '/main'})
            .state('home.hierarchy', {   templateUrl:'/views/user/hierarchy.html',  url: '/hierarchy', controller:'HierarchyCtrl'})
            .state('home.map', {   templateUrl:'/views/user/map.html',  url: '/map', controller:'MapCtrl'})
            .state('home.components', {   templateUrl:'/views/user/components.html',  url: '/components', controller:'ComponentsCtrl'})
    });
