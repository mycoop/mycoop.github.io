'use strict';

angular
    .module('myCoopOnlineApp', [
        'ngCookies',
        'ngResource',
        'ngRoute',
    ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/home'
            });
    }).run(function ($rootScope, $location) {
        var isInitChecking = true;
        $rootScope.showNav = '';

        $rootScope.toggleNav = function () {
            $rootScope.showNav = $rootScope.showNav ? '' : 'show_nav';
        };
//        HOME
//            Organization Profile (Admin View)
//            User Administration
//            Resource Directories
//        BUSINESS IMPACT ANALYSIS
//            Program Area Profile
//            Business Processes
//            Staffing Requirements
//            Resource Requirement
//            Critical Application (Software) Requirements
//            Quantitative Impacts
//            Qualitative Impacts
//            External Dependencies
//            Internal Dependencies
//            Vital Records
//            Interoperable Communications (Telephony
//            Requirements)
//            Other Requirement
//            BIA Results
//            BIA Review (summary)
//            Compliance Check and Comparison
//        BUSINESS CONTINUITY PLAN
//            Program Area Profile
//            Plan Objective - Executive Summary
//        RISK ASSESSMENT AND PLANNING
//            Program Area Profile
//            Plan Objective - Executive Summary
//        DISASTER RECOVERY PLAN
//            Program Area Profile
//            Plan Objective - Executive Summary
//        TOOLS
//            Reporting
//            Application Controls (Content Approval etc)
//            Print Center
//            Audit Center
//            Notification Interface


        var pages = [
            { name: 'Organization Profile (Admin View)', selected: false, parent: 'HOME'},
            { name: 'User Administration', selected: false, parent: 'HOME'},
            { name: 'Resource Directories', selected: false, parent: 'HOME'},
            { name: 'Organization Profile (Admin View)', selected: false, parent: 'HOME'},
            { name: 'Organization Profile (Admin View)', selected: false, parent: 'HOME'},

        ];

        $rootScope.setCurrentPage = function (page) {
            $rootScope.isFederalSelected = '';
            $rootScope.isHomeSelected = '';
            switch (page) {
                case 'federal':
                    $rootScope.isFederalSelected = 'on';
                    break;
                case 'home':
                    $rootScope.isHomeSelected = 'on';
            }
        };

        $rootScope.redirect = function (path) {
            $location.path(path);
        };
        $rootScope.$on("$locationChangeStart", function (event, nextLocation, currentLocation) {
            $rootScope.setCurrentPage($location.path().replace('/', ''));
//            alert($rootScope.isFederalSelected);
        });
    });
