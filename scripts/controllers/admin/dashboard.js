angular.module('adminApp').
    controller('DashboardCtrl', function ($scope, $rootScope, $state, DocumentTemplate, User, OrgUnit) {
        $scope.userActivity = [];
        $scope.loginHistory = [];
        User.getUsers(function (data) {
            $scope.users = data;
            _.each(data, function (user) {
                $scope.userActivity.push({
                    userPermission: getUserPermission(user),
                    user: user,
                    time: '5 hours ago',
                    activity: 'Did some very important stuff',
                    location: 'BOA > Department1',
                    section: 'Leadership'
                });
            })
        });

        OrgUnit.getOrgUnits(function (data) {
            $scope.workspaces = data;
            data[0].starred = true;
            data[2].starred = true;
        });

        DocumentTemplate.getTemplates(function (data) {
            $scope.templates = data;
        });

        $scope.launchWizard = function () {
            $rootScope.isWizard = true;
            $state.go('demo');
        };

        var startTime = (new Date()).setMonth(7);
        User.getLoginHistory(startTime, function (data) {
            _.each(data, function (item) {
                item.userPermission = getUserPermission(item.user);
            });
            $scope.loginHistory = data;
        });
        var getUserPermission = function (user) {
            switch (user.permissionLevelId) {
                case 1:
                    return 'contributor';
                case 2:
                    return 'contributor';
                case 3:
                    return 'approver';
                case 4:
                    return 'reader';
            }
        };

    });