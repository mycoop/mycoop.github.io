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
        'resources.org-asset',
        'resources.party',
        'ngMap',
        'ui.bootstrap',
        'controls',
        'controllers.common',
        'filters'
    ]).run(function ($rootScope, $location, $state, $stateParams, OrgEntity) {
        $rootScope.showNav = '';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.orgEntityId = 103;
        $rootScope.docs = [
            {
                id: 1,
                area: 'Department 1',
                title: 'Business Impact Analysis',
                details: 'This report identifies the key business continuity requirements for each critical business activity',
                deadline: new Date().setDate((new Date()).getDate() + 5),
                scheduledDate: new Date().setDate((new Date()).getDate() + 6),
                status: 'gold'
            },
            {
                documentReference: "MC04001",
                title: "Business Continuity Context, Requirements and Scope",
                purpose: "To set out the organisational context of the BCMS. It describes what the organisation does, how it does it, what factors influence the way it operates and the reasons for the definition of the scope of the BCMS",
                Pages: "18",
                Sections: "4.Context of the Organisation 4.1 Understanding of the  organisation and its context 4.2 Understanding the needs and expectations of interested parties 4.2.1 General 4.2.2 Legal and regulatory requirements 4.3 Determining the scope of the BCMS 4.3.1 General 4.3.2 Scope of the BCMS 4.4 Business continuity management system"
            }
        ];
        $rootScope.currentDocument = $rootScope.docs[1];
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
                    OrgEntity.getEntity($rootScope.orgEntityId, function (data) {
                        $rootScope.orgEntity = data;
                        $rootScope.orgEntityId = data.id;
                    });
//                    $state.transitionTo($state.current, {orgEntityId: $rootScope.orgEntityId || 103}, {
//                        reload: true
//                    });
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
                if ($('body').scrollTop() > 0) {
                    $('body').ScrollTo({ duration: 0 });
                }
            };
        });

        $stateProvider
            .state('home', { url: '/home?orgEntityId'})
            .state('home.main', {  templateUrl: '/views/user/home.html', url: '/main'})
            .state('home.hierarchy', {   templateUrl: '/views/user/hierarchy.html', url: '/hierarchy', controller: 'HierarchyCtrl'})
            .state('home.map', {   templateUrl: '/views/user/map.html', url: '/map', controller: 'MapCtrl'})
            .state('home.components', {   templateUrl: '/views/user/components.html', url: '/components', controller: 'ComponentsCtrl'});



        $stateProvider
            .state('dashboard', { url: '/dashboard?orgEntityId'})
            .state('dashboard.map', {   templateUrl: '/views/admin/map.html', url: '/map', controller: 'mapCtrl'});


        $stateProvider
            .state('plan', {templateUrl: '/views/user/plan/plan-master.html', url: '/plan?orgEntityId', controller: 'PlanCtrl'})
            .state('plan.organization', {  templateUrl: '/views/user/plan/plan-organization.html', url: '/organization', controller: 'PlanCtrl'})
            .state('plan.organization.mission', {  templateUrl: '/views/user/context-activities/clause-template.html', url: '/mission', controller: 'ClauseCtrl'})

            .state('plan.organization.analysis', {   templateUrl: '/views/user/context-activities/analysis.html', url: '/analysis', controller:'SelectAnalysisCtrl'})
            .state('plan.organization.analysis.swot', {   templateUrl: '/views/user/context-activities/swot-analysis.html', url: '/swot', controller:'SwotAnalysisCtrl'})
            .state('plan.organization.analysis.pest', {   templateUrl: '/views/user/context-activities/pest-analysis.html', url: '/pest', controller: 'PestAnalysisCtrl'})
            .state('plan.organization.analysis.forces', { templateUrl: '/views/user/context-activities/five-forces-analysis.html', url: '/five-forces', controller: 'FiveForcesCtrl'})
            .state('plan.organization.analysis.other', {   templateUrl: '/views/user/context-activities/other-analysis.html', url: '/other'})

            .state('plan.organization.activities', {  templateUrl: '/views/user/plan/key-org-activities.html', url: '/key-activities', controller: 'KeyOrgActivitiesCtrl'})
            .state('plan.organization.editAsset', {  templateUrl: '/views/user/plan/edit-org-asset.html', url: '/edit-asset?assetId', controller: 'ActivityFactorEditCtrl'})

            .state('plan.organization.parties', {  templateUrl: '/views/user/plan/interested-parties.html', url: '/parties'})
            .state('plan.organization.parties.edit', {  templateUrl: '/views/user/plan/interested-parties-edit.html', url: '/edit', controller:'InterestedPartiesCtrl'})

            .state('plan.organization.legal', {  templateUrl: '/views/user/plan/legal-master.html', url: '/legal', controller:'LegalCtrl'})
            .state('plan.organization.legal.procedure', {  templateUrl: '/views/user/plan/legal-procedure.html', url: '/procedure', controller:'LegalCtrl'})
            .state('plan.organization.legal.access', {  templateUrl: '/views/user/plan/legal-access.html', url: '/access', controller:'LegalCtrl'})
            .state('plan.organization.legal.implications', {  templateUrl: '/views/user/plan/legal-implications.html', url: '/implications', controller:'LegalCtrl'})
            .state('plan.organization.legal.editParty', {  templateUrl: '/views/user/plan/legal-edit-implication.html', url: '/edit-implication?partyId', controller:'LegalCtrl'})

            .state('plan.organization.impact', {  templateUrl: '/views/user/plan/potential-impact.html', url: '/impact', controller:'PotentialImpactCtrl'})
            .state('plan.organization.polices', {  templateUrl: '/views/user/plan/polices.html', url: '/polices', controller: 'PolicyDocumentCtrl'})



            .state('plan.leadership', {   template: '<h1>Leadership</h1>', url: '/leadership'})
            .state('plan.planning', {   template: '<h1>Planning</h1>', url: '/planning'})
            .state('plan.support', {   template: '<h1>Support</h1>', url: '/support'});



        $stateProvider.state('do', { url: '/do?orgEntityId'})
            .state('do.risk', {   template: '<h1>Risk Assessment</h1>', url: '/risk-assessment'})
            .state('do.impact', {  url: '/impact'})
            .state('do.impact.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('do.impact.processes', { templateUrl: '/views/admin/business-processes.html', controller: 'BusinessProcessCtrl', url: '/processes'})
            .state('do.impact.scope', { templateUrl: '/views/user/purpose-and-scope.html', url: '/purpose-and-scope'})
            .state('do.impact.processes-add', { templateUrl: '/views/admin/business-process.add.html', controller: 'BusinessProcessAddCtrl', url: '/processes-add'})
            .state('do.impact.staff', {  template: '<h1>Staffing Requirements</h1>', url: '/staff'})
            .state('do.impact.resource', {  template: '<h1>Resource Requirement</h1>', url: '/resource'})
            .state('do.impact.criticalApp', {  template: '<h1>Critical Application (Software) Requirements</h1>', url: '/critical-app'})
            .state('do.impact.quantitativeImpacts', {  template: '<h1>Quantitative Impacts</h1>', url: '/quantitative-impacts'})
            .state('do.impact.internalDependencies', {  template: '<h1>External Dependencies</h1>', url: '/internal-dependencies'})
            .state('do.impact.externalDependencies', {  template: '<h1>Internal Dependencies</h1>', url: '/external-dependencies'})
            .state('do.impact.vitalRecords', {  template: '<h1>Vital Records</h1>', url: '/vital-records'})
            .state('do.impact.communications', {  template: '<h1>Interoperable Communications</h1>', url: '/communications'})
            .state('do.impact.other', {  template: '<h1>Other Requirements</h1>', url: '/other'})
            .state('do.impact.results', {  template: '<h1>BIA Results </h1>', url: '/results'})
            .state('do.impact.review', {  template: '<h1>BIA Review</h1>', url: '/review'})
            .state('do.impact.compliance', {  template: '<h1>Compliance Check and Comparison</h1>', url: '/compliance'})

            .state('do.continuity', {   template: '<h1>Business Continuity Strategy</h1>', url: '/continuity'})
            .state('do.procedures', {   template: '<h1>Establish and Implement BC Procedures</h1>', url: '/procedures'})
            .state('do.testing', {   template: '<h1> Exercising and Testing</h1>', url: '/testing'});

        $stateProvider
            .state('check', { url: '/check?orgEntityId'})
            .state('check.evaluation', {   template: '<h1>Performance Evaluation</h1>', url: '/evaluation'});

        $stateProvider
            .state('act', { url: '/act?orgEntityId'})
            .state('act.improvement', {   template: '<h1>Improvement</h1>', url: '/improvement'});

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
            .state('tools.reporting', {  template: '<h1>Performance Indicators</h1>', url: '/reporting'})
            .state('tools.print', {  templateUrl: '/views/admin/print-center.html', url: '/print', controller: 'PrintCenterCtrl'})
            .state('tools.review', {   templateUrl: '/views/user//review/review.html', url: '/review'})
            .state('tools.review.ready', {   templateUrl: '/views/user/review/ready-to-review.html', url: '/ready'})
            .state('tools.review.landing', {   templateUrl: '/views/user/review/review-landing.html', url: '/landing'})
            .state('tools.review.analysis', {   templateUrl: '/views/user/review/document-analysis.html', url: '/analysis ', controller: 'ReviewCtrl'})
            .state('tools.review.results', {   templateUrl: '/views/user/review/review-results.html', url: '/results'})
            .state('tools.review.errors', {   templateUrl: '/views/user/review/review-errors.html', url: '/errors'})
            .state('tools.review.summary', {   templateUrl: '/views/user/review/post-review.html', url: '/summary'});
    });
