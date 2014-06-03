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
        'controls',
        'filters'
    ]).run(function ($rootScope, $location, $state, $stateParams, OrgEntity) {
        $rootScope.showNav = '';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if ($stateParams.orgEntityId) {
                    if ($rootScope.orgEntityId != $stateParams.orgEntityId) {
                        $rootScope.orgEntityId = $stateParams.orgEntityId;
                        OrgEntity.getEntity($rootScope.orgEntityId, function (data) {
                            $rootScope.orgEntity = data;
                        })
                    }
                } else {
                    $state.transitionTo($state.current, {orgEntityId: $rootScope.orgEntityId || 103}, {
                        reload: true
                    });
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
    }).config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home/main");
        $stateProvider
            .state('home', { url: '/home?orgEntityId'})
            .state('home.main', {  templateUrl: '/views/user/home.html', url: '/main'})
            .state('home.hierarchy', {   templateUrl: '/views/user/hierarchy.html', url: '/hierarchy', controller: 'HierarchyCtrl'})
            .state('home.map', {   templateUrl: '/views/user/map.html', url: '/map', controller: 'MapCtrl'})
            .state('home.components', {   templateUrl: '/views/user/components.html', url: '/components', controller: 'ComponentsCtrl'});

        $stateProvider
            .state('impact', {  url: '/impact?orgEntityId'})
            .state('impact.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('impact.processes', { templateUrl: '/views/admin/business-processes.html', controller: 'BusinessProcessCtrl', url: '/processes'})
            .state('impact.processes-add', { templateUrl: '/views/admin/business-process.add.html', controller: 'BusinessProcessAddCtrl', url: '/processes-add'})
            .state('impact.staff', {  template: '<h1>Staffing Requirements</h1>', url: '/staff'})
            .state('impact.resource', {  template: '<h1>Resource Requirement</h1>', url: '/resource'})
            .state('impact.criticalApp', {  template: '<h1>Critical Application (Software) Requirements</h1>', url: '/critical-app'})
            .state('impact.quantitativeImpacts', {  template: '<h1>Quantitative Impacts</h1>', url: '/quantitative-impacts'})
            .state('impact.internalDependencies', {  template: '<h1>External Dependencies</h1>', url: '/internal-dependencies'})
            .state('impact.externalDependencies', {  template: '<h1>Internal Dependencies</h1>', url: '/external-dependencies'})
            .state('impact.vitalRecords', {  template: '<h1>Vital Records</h1>', url: '/vital-records'})
            .state('impact.communications', {  template: '<h1>Interoperable Communications</h1>', url: '/communications'})
            .state('impact.other', {  template: '<h1>Other Requirements</h1>', url: '/other'})
            .state('impact.results', {  template: '<h1>BIA Results </h1>', url: '/results'})
            .state('impact.review', {  template: '<h1>BIA Review</h1>', url: '/review'})
            .state('impact.compliance', {  template: '<h1>Compliance Check and Comparison</h1>', url: '/compliance'});

    });
