'use strict';

angular
    .module('adminApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.router',
        'ngGrid',
        'resources.process',
        'resources.user',
        'resources.org-entity',
        'ui.bootstrap',
        'controls'
//        'ui.state'state
    ]).run(function ($rootScope, $location, $state, $stateParams) {
        $rootScope.showNav = '';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;


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
    }).controller('ErrorModalCtrl', function($scope, $modalInstance, message){
        $scope.message = message;
        $scope.ok = function () {
            $modalInstance.close();
        };
    }).config(function ($stateProvider) {
        $stateProvider
            .state('home', { url: '/home'})
            .state('home.profile', {  templateUrl:'/views/admin/organization.html', url: '/profile', controller:'OrganizationCtrl'})
            .state('home.admin', {   templateUrl:'/views/admin/admin.html',  url: '/admin', controller:'UsersCtrl'})
            .state('home.user', {   templateUrl:'/views/admin/user.html',  url: '/user/:id', controller:'UserCtrl'})
            .state('home.resource', {   template:'<h1>Resource Directories</h1><p><a href="http://www.fema.gov">FEMA</a><p><a href="http://www.iso.org">ISO</a>',  url: '/resource'})
            .state('home.info', {  templateUrl:'/views/admin/information.html', url: '/info'})
            .state('home.org', {  templateUrl:'/views/admin/org.html', url: '/org', controller: 'orgChartCtrl'})
            .state('home.delivery', {  templateUrl:'/views/admin/delivery-edit.html', url: '/delivery-edit', controller: 'DeliveryEditCtrl'});



        $stateProvider
            .state('impact', {  url: '/impact'})
            .state('impact.profile', {  template:'<h1>Program Area Profile</h1>', url: '/profile'})
            .state('impact.processes', { templateUrl:'/views/admin/business-processes.html', controller: 'BusinessProcessCtrl', url: '/processes'})
            .state('impact.processes-add', { templateUrl:'/views/admin/business-process.add.html', controller: 'BusinessProcessAddCtrl', url: '/processes-add'})
            .state('impact.staff', {  template:'<h1>Staffing Requirements</h1>', url: '/staff'})
            .state('impact.resource', {  template:'<h1>Resource Requirement</h1>', url: '/resource'})
            .state('impact.criticalApp', {  template:'<h1>Critical Application (Software) Requirements</h1>', url: '/critical-app'})
            .state('impact.quantitativeImpacts', {  template:'<h1>Quantitative Impacts</h1>', url: '/quantitative-impacts'})
            .state('impact.internalDependencies', {  template:'<h1>External Dependencies</h1>', url: '/internal-dependencies'})
            .state('impact.externalDependencies', {  template:'<h1>Internal Dependencies</h1>', url: '/external-dependencies'})
            .state('impact.vitalRecords', {  template:'<h1>Vital Records</h1>', url: '/vital-records'})
            .state('impact.communications', {  template:'<h1>Interoperable Communications</h1>', url: '/communications'})
            .state('impact.other', {  template:'<h1>Other Requirements</h1>', url: '/other'})
            .state('impact.results', {  template:'<h1>BIA Results </h1>', url: '/results'})
            .state('impact.review', {  template:'<h1>BIA Review</h1>', url: '/review'})
            .state('impact.compliance', {  template:'<h1>Compliance Check and Comparison</h1>', url: '/compliance'});


        $stateProvider
            .state('continuity', {  url: '/continuity'})
            .state('continuity.profile', {  template:'<h1>Program Area Profile</h1>', url: '/profile'})
            .state('continuity.objective', {  template:'<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('risk', {   url: '/risk'})
            .state('risk.profile', {  template:'<h1>Program Area Profile</h1>', url: '/profile'})
            .state('risk.objective', {  template:'<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('disaster', {  url: '/disaster'})
            .state('disaster.profile', {  template:'<h1>Program Area Profile</h1>', url: '/profile'})
            .state('disaster.objective', {  template:'<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('tools', { url: '/tools'})
            .state('tools.reporting', {  template:'<h1>Reporting</h1>', url: '/reporting'})
            .state('tools.controls', {  template:'<h1>Application Controls (Content Approval etc)</h1>', url: '/controls'})
            .state('tools.print', {  templateUrl:'/views/admin/view-plan.html', url: '/print'})
            .state('tools.audit', {  template:'<h1>Audit Center</h1>', url: '/audit'})
            .state('tools.notification', {  template:'<h1>Notification Interface</h1>', url: '/notification'})
            .state('tools.templatesuite', {  templateUrl:'/views/admin/templatesuite.html', url: '/template-suite'})
            .state('tools.templatecollection', {  templateUrl:'/views/admin/template-collection.html', url: '/template-collection', controller: 'TemplateCollectionCtrl'})
            .state('tools.sectioneditor', {  templateUrl:'/views/admin/section-editor.html', url: '/section-editor', controller: 'SectionEditorCtrl'});

    });