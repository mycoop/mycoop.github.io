'use strict';

angular
    .module('myCoopOnlineApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.router'
//        'ui.state'state
    ])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', { url: '/home'})
            .state('home.profile', {  templateUrl:'/my-coop/views/home.html', url: '/profile'})
            .state('home.admin', {   template:'<h1>User Administration</h1>',  url: '/admin'})
            .state('home.resource', {   template:'<h1>Resource Directories</h1>',  url: '/resource'});


        $stateProvider
            .state('impact', {  url: '/impact'})
            .state('impact.profile', {  template:'<h1>Program Area Profile</h1>', url: '/profile'})
            .state('impact.processes', { templateUrl:'/my-coop/views/business-processes.html', url: '/processes'})
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
            .state('tools.print', {  template:'<h1>Print Center</h1>', url: '/print'})
            .state('tools.audit', {  template:'<h1>Audit Center</h1>', url: '/audit'})
            .state('tools.notification', {  template:'<h1>Notification Interface</h1>', url: '/notification'});

    }).run(function ($rootScope, $location, $state, $stateParams) {
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
    });
