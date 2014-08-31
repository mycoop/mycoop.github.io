'use strict';

angular
    .module('adminApp', [
        'angularFileUpload',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ui.router',
        'ngGrid',
        'resources.process',
        'resources.user',
        'resources.group',
        'resources.org-entity',
        'resources.document-template',
        'resources.workspace-template',
        'resources.component',
        'resources.textEditor',
        'resources.incident',
        'services.modal',
        'services.security',
        'interceptor',
        'ui.bootstrap',
        'controls',
        'ngAnimate',
        'filters',
        'ngMap',
        'angular-carousel',
        'angularSpectrumColorpicker',
        'controllers.common',
        'controllers.incident'
    ]).run(function ($rootScope, $location, $state, $stateParams, SecurityService, User) {
        SecurityService.testLogin();
        $rootScope.showNav = '';
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.logout = function () {
            User.logout(function () {
                window.location.replace('/#/login');
            });
        };

        User.getCurrent(function(data){
            $rootScope.profile = data;
        });

        $rootScope.toggleNav = function () {
            $rootScope.showNav = $rootScope.showNav ? '' : 'show_nav';
        };

        $rootScope.redirect = function (path) {
            $location.path(path);
        };

        $rootScope.previousPage = function () {
            if ($rootScope.prevState)
                $state.transitionTo($rootScope.prevState);
        };

        $rootScope.nextPage = function () {
            if ($rootScope.nextState)
                $state.transitionTo($rootScope.nextState);
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
    }).controller('ChooseGroupModalCtrl', function ($scope, $modalInstance, groups) {
        $scope.items = groups;
        $scope.ok = function () {
            $modalInstance.close({selectedItems: _.where($scope.items, {selected: true})});
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }).controller('ErrorModalCtrl', function ($scope, $modalInstance, message) {
        $scope.message = message;
        $scope.ok = function () {
            $modalInstance.close();
        };
    })
    .config(function ($stateProvider, $provide) {
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
            .state('home', { url: '/home'})
            .state('home.profile', {  templateUrl: '/views/admin/organization.html', url: '/profile', controller: 'OrganizationCtrl'})
            .state('home.setup', {  templateUrl: '/views/admin/setup.html', url: '/setup', controller: 'SetupCtrl'})
            .state('home.admin', {   templateUrl: '/views/admin/config/users/users.html', url: '/admin', controller: 'UsersCtrl'})
            .state('home.user', {   templateUrl: '/views/admin/config/users/edit-user.html', url: '/user/:id', controller: 'EditUserCtrl'})
            .state('home.resource', { templateUrl: '/views/admin/resource-directories.html', url: '/resource', controller: 'ResourceDirectoriesCtrl'})
            .state('home.resource.employee', { templateUrl: '/views/admin/employee-directory.html', url: '/employee', controller: 'EmployeeContactsCtrl'})
            .state('home.resource.additional', { templateUrl: '/views/admin/employee-directory.html', url: '/additional', controller: 'AdditionalResourcesCtrl'})
            .state('home.info', {  templateUrl: '/views/admin/information.html', url: '/info'})
            .state('home.org', {  templateUrl: '/views/admin/org.html', url: '/org', controller: 'orgChartCtrl'})
            .state('home.delivery', {  templateUrl: '/views/admin/delivery-edit.html', url: '/delivery-edit', controller: 'DeliveryEditCtrl'});

        $stateProvider
            .state('setup', { url: '/setup', templateUrl: '/views/admin/setup/setup.html'})
            .state('setup.profile', {  templateUrl: '/views/admin/organization.html', url: '/profile', controller: 'OrganizationCtrl'})
            .state('setup.standards', { templateUrl: '/views/admin/setup/standards.html', url: '/standards', controller: 'OrganizationCtrl'})
            .state('setup.resources', { templateUrl: '/views/admin/resource-directories.html', url: '/resources', controller: 'ResourceDirectoriesCtrl'})
            .state('setup.resources.employee', { templateUrl: '/views/admin/employee-directory.html', url: '/employee', controller: 'EmployeeContactsCtrl'})
            .state('setup.resources.additional', { templateUrl: '/views/admin/employee-directory.html', url: '/additional', controller: 'AdditionalResourcesCtrl'})
            .state('setup.templates', { templateUrl: '/views/admin/template-collection.html', url: '/template-collection', controller: 'TemplateCollectionCtrl'})
            .state('setup.ui', {  templateUrl: '/views/admin/config/ui.html', url: '/ui', controller: 'InterfaceConfigCtrl'})
            .state('setup.config', {  templateUrl: '/views/admin/config/workflow/workflow-config.html', url: '/workflow-config'})
            .state('setup.users', {   templateUrl: '/views/admin/config/users/users.html', url: '/users', controller: 'UsersCtrl'})
            .state('setup.users.add', {   templateUrl: '/views/admin/config/users/edit-user.html', url: '/add', controller: 'EditUserCtrl'})
            .state('setup.users.edit', {   templateUrl: '/views/admin/config/users/edit-user.html', url: '/edit?id', controller: 'EditUserCtrl'})
            .state('setup.map', {  templateUrl: '/views/admin/map.html', url: '/map', controller: 'mapCtrl'})
            .state('setup.hierarchy', {  templateUrl: '/views/admin/org.html', url: '/org', controller: 'orgChartCtrl'})
            .state('setup.review', {  templateUrl: '/views/admin/setup/setup-review.html', url: '/review'});


        $stateProvider
            .state('config', { url: '/configure'})
            .state('config.profile', {  templateUrl: '/views/admin/organization.html', url: '/profile', controller: 'OrganizationCtrl'})
            .state('config.standards', { templateUrl: '/views/admin/setup/standards.html', url: '/standards', controller: 'OrganizationCtrl'})
            .state('config.general', { templateUrl: '/views/admin/config/general-configuration.html', url: '/general', controller: 'GeneralConfigCtrl'})
            .state('config.advanced', { templateUrl: '/views/admin/config/advanced-configuration.html', url: '/advanced', controller: 'AdvancedConfigCtrl'})
            .state('config.ui', { templateUrl: '/views/admin/config/ui.html', url: '/look-and-feel', controller: 'InterfaceConfigCtrl'})
            .state('config.', {  templateUrl: '/views/admin/org.html', url: '/hierarchy', controller: 'orgChartCtrl'})

            .state('config.orgunits', {  templateUrl: '/views/admin/org.html', url: '/hierarchy', controller: 'orgChartCtrl'})
            .state('config.orgunits.details', {  templateUrl: '/views/admin/config/org-units/org-unit-details.html', url: '/details?id', controller: 'orgChartCtrl'})
            .state('config.orgunits.add', {  templateUrl: '/views/admin/config/org-units/org-unit-edit.html', url: '/add', controller: 'OrgUnitEditCtrl'})
            .state('config.orgunits.edit', {  templateUrl: '/views/admin/config/org-units/org-unit-edit.html', url: '/edit?id', controller: 'OrgUnitEditCtrl'})

            .state('config.security', { url: '/security', templateUrl: '/views/admin/nested-view.html'})
            .state('config.security.system', { url: '/system-permissions', templateUrl: '/views/admin/config/system-permissions.html', controller: 'SystemPermissionsCtrl' })
            .state('config.security.users', {   templateUrl: '/views/admin/config/users/users.html', url: '/users', controller: 'UsersCtrl'})
            .state('config.security.users.add', {   templateUrl: '/views/admin/config/users/edit-user.html', url: '/add', controller: 'EditUserCtrl'})
            .state('config.security.users.edit', {   templateUrl: '/views/admin/config/users/edit-user.html', url: '/edit?id', controller: 'EditUserCtrl'})
            .state('config.security.users.details', {   templateUrl: '/views/admin/config/users/details-user.html', url: '/details?id', controller: 'EditUserCtrl'})
            .state('config.security.users.multiple', {   templateUrl: '/views/admin/config/users/multiple-users.html', url: '/multiple', controller: 'MultipleUserCtrl'})
            .state('config.security.groups', { templateUrl: '/views/admin/config/groups/groups.html', url: '/groups', controller: 'GroupsCtrl'})
            .state('config.security.groups.add', {templateUrl: '/views/admin/config/groups/add-group.html', url: '/add', controller: 'GroupsCtrl'})
            .state('config.security.groups.details', {templateUrl: '/views/admin/config/groups/group-details.html', url: '/membership?id', controller: 'GroupMembershipCtrl'})
            .state('config.security.groups.settings', {templateUrl: '/views/admin/config/groups/group-settings.html', url: '/settings?id', controller: 'GroupMembershipCtrl'})
            .state('config.security.groups.workspace', {templateUrl: '/views/admin/config/groups/group-workspace.html', url: '/workspace?id', controller: 'GroupWorkspaceCtrl'})
            .state('config.security.groups.delete', {templateUrl: '/views/admin/config/groups/delete-group.html', url: '/delete?id', controller: 'GroupMembershipCtrl'})
            .state('config.security.workspace', { url: '/workspace-permissions'})

            .state('config.resources', { templateUrl: '/views/admin/resource-directories.html', url: '/resources', controller: 'ResourceDirectoriesCtrl'})
            .state('config.resources.employee', { templateUrl: '/views/admin/employee-directory.html', url: '/employee', controller: 'EmployeeContactsCtrl'})
            .state('config.resources.additional', { templateUrl: '/views/admin/employee-directory.html', url: '/additional', controller: 'AdditionalResourcesCtrl'})
            .state('config.templates', { templateUrl: '/views/admin/template-collection.html', url: '/template-collection', controller: 'TemplateCollectionCtrl'})
            .state('config.backup', {  templateUrl: '/views/admin/config/backup-manager.html', url: '/backup-manager'})
            .state('config.workflow', {  templateUrl: '/views/admin/config/workflow/workflow.html', url: '/workflow-config', controller: 'AssignmentsCtrl'})
            .state('config.workflow.add', {  templateUrl: '/views/admin/config/workflow/create-workflow.html', url: '/add', controller: 'WorkflowCtrl'})
            .state('config.billing', {  templateUrl: '/views/admin/config/billing.html', url: '/billing'})
            .state('config.review', {  templateUrl: '/views/admin/setup/setup-review.html', url: '/review'});


        $stateProvider
            .state('dashboard', { url: '/dashboard', abstract:true, template: '<ui-view/>'})
            .state('dashboard.main', { url: '/main', templateUrl: '/views/admin/dashboard/dashboard.html', controller: 'DashboardCtrl'})
            .state('dashboard.map', {  templateUrl: '/views/admin/map.html', url: '/map', controller: 'mapCtrl'});


        $stateProvider
            .state('impact', {  url: '/impact'})
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


        $stateProvider
            .state('continuity', {  url: '/continuity'})
            .state('continuity.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('continuity.objective', {  template: '<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('risk', {   url: '/risk'})
            .state('risk.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('risk.objective', {  template: '<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('disaster', {  url: '/disaster'})
            .state('disaster.profile', {  template: '<h1>Program Area Profile</h1>', url: '/profile'})
            .state('disaster.objective', {  template: '<h1>Plan Objective - Executive Summary</h1>', url: '/objective'});


        $stateProvider
            .state('tools', { url: '/tools'})
            .state('tools.reporting', {  template: '<h1>Reporting</h1>', url: '/reporting'})

            .state('tools.incident', { url: '/incident', abstract:true, template: '<ui-view/>'})
            .state('tools.incident.report', { templateUrl: '/views/templates/incident-edit.html', url: '/report', controller: 'IncidentCtrl'})
            .state('tools.incident.edit', {  templateUrl: '/views/templates/incident-edit.html', url: '/edit?id', controller: 'IncidentCtrl'})

            .state('tools.controls', {  template: '<h1>Application Controls</h1>', url: '/controls'})
            .state('tools.print', {  templateUrl: '/views/admin/print-center.html', url: '/print', controller: 'PrintCenterCtrl'})
            .state('tools.audit', {  template: '<h1>Audit Center</h1>', url: '/audit'})
            .state('tools.notification', {  template: '<h1>Notification Interface</h1>', url: '/notification'})

            .state('tools.document-templates', {  templateUrl: '/views/admin/document-template/document-templates.html', url: '/document-template', controller: 'DocumentTemplateCtrl'})
            .state('tools.document-templates.add', {  templateUrl: '/views/admin/document-template/document-template-edit.html', url: '/add', controller: 'DocumentTemplateEditCtrl'})
            .state('tools.document-templates.edit', {  templateUrl: '/views/admin/document-template/document-template-edit.html', url: '/edit?id', controller: 'DocumentTemplateEditCtrl'})

            .state('tools.workspace-templates', {  templateUrl: '/views/admin/config/workspace/workspace-templates.html', url: '/workspace-template', controller: 'WorkspaceTemplateCtrl'})
            .state('tools.workspace-templates.add', {  templateUrl: '/views/admin/config/workspace/workspace-template-edit.html', url: '/add', controller: 'WorkspaceTemplateEditCtrl'})
            .state('tools.workspace-templates.edit', {  templateUrl: '/views/admin/config/workspace/workspace-template-edit.html', url: '/edit?id', controller: 'WorkspaceTemplateEditCtrl'})

//            .state('tools.templatecollection', {  templateUrl: '/views/admin/template-collection.html', url: '/template-collection', controller: 'TemplateCollectionCtrl'})
            .state('tools.billing', {  template: '<h1>Billing</h1>', url: '/billing'})
            .state('tools.sectioneditor', {  templateUrl: '/views/admin/section-editor.html', url: '/section-editor', controller: 'SectionEditorCtrl'});

    });
