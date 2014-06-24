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
        $rootScope.currentDocument = {
            id:1,
            area: 'Department 1',
            title: 'Business Impact Analysis',
            details: 'This report identifies the key business continuity requirements for each critical business activity',
            deadline: new Date().setDate((new Date()).getDate() + 5),
            scheduledDate: new Date().setDate((new Date()).getDate() + 6),
            status: 'gold'
        };
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
    }).config(function ($stateProvider, $urlRouterProvider, $provide) {
        $urlRouterProvider.otherwise("/home/main");
        $provide.decorator('$uiViewScroll', function ($delegate) {
            return function (uiViewElement) {
//                var top = uiViewElement.getBoundingClientRect().top;

                $('body').ScrollTo({ duration: 300 });
//                alert(top)
//                $( "body" ).scrollTop( 300 )
                // var top = uiViewElement.getBoundingClientRect().top;
                // window.scrollTo(0, (top - 30));
                // Or some other custom behaviour...
            };
        });
        $stateProvider
            .state('home', { url: '/home?orgEntityId'})
            .state('home.main', {  templateUrl: '/views/user/home.html', url: '/main'})
            .state('home.hierarchy', {   templateUrl: '/views/user/hierarchy.html', url: '/hierarchy', controller: 'HierarchyCtrl'})
            .state('home.map', {   templateUrl: '/views/user/map.html', url: '/map', controller: 'MapCtrl'})
            .state('home.components', {   templateUrl: '/views/user/components.html', url: '/components', controller: 'ComponentsCtrl'})
            .state('home.review', {   templateUrl: '/views/user//review/review.html', url: '/review'})
            .state('home.review.ready', {   templateUrl: '/views/user/review/ready-to-review.html', url: '/ready'})
            .state('home.review.landing', {   templateUrl: '/views/user/review/review-landing.html', url: '/landing'})
            .state('home.review.analysis', {   templateUrl: '/views/user/review/document-analysis.html', url: '/analysis', controller:'ReviewCtrl'})
            .state('home.review.results', {   templateUrl: '/views/user/review/review-results.html', url: '/results'})
            .state('home.review.errors', {   templateUrl: '/views/user/review/review-errors.html', url: '/errors'})
            .state('home.review.summary', {   templateUrl: '/views/user/review/post-review.html', url: '/summary'})


        $stateProvider
            .state('impact', {  url: '/impact?orgEntityId'})
            .state('impact.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('impact.processes', { templateUrl: '/views/admin/business-processes.html', controller: 'BusinessProcessCtrl', url: '/processes'})
            .state('impact.scope', { templateUrl: '/views/user/purpose-and-scope.html', url: '/purpose-and-scope'})
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


        $stateProvider
            .state('continuity', {  url: '/continuity?orgEntityId'})
            .state('continuity.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('continuity.objective', {  template: '<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('risk', {   url: '/risk?orgEntityId'})
            .state('risk.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('risk.objective', {  template: '<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('disaster', {  url: '/disaster?orgEntityId'})
            .state('disaster.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('disaster.objective', {  template: '<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('tools', { url: '/tools?orgEntityId'})
            .state('tools.reporting', {  template: '<h1>Reporting</h1>', url: '/reporting'})
            .state('tools.controls', {  template: '<h1>Application Controls (Content Approval etc)</h1>', url: '/controls'})
            .state('tools.print', {  templateUrl: '/views/admin/print-center.html', url: '/print', controller: 'PrintCenterCtrl'})
            .state('tools.audit', {  template: '<h1>Audit Center</h1>', url: '/audit'})
            .state('tools.notification', {  template: '<h1>Notification Interface</h1>', url: '/notification'})
            .state('tools.templatesuite', {  templateUrl: '/views/admin/templatesuite.html', url: '/template-suite'})
//            .state('tools.templatecollection', {  templateUrl:'/views/admin/template-collection.html', url: '/template-collection', controller: 'TemplateCollectionCtrl'})
            .state('tools.sectioneditor', {  templateUrl: '/views/admin/section-editor.html', url: '/section-editor', controller: 'SectionEditorCtrl'});

    });
