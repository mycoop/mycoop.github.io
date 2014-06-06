angular.module('adminApp').
    controller('SystemPermissionsCtrl', function ($scope) {
        $scope.permissions = [
            {className: 'System Administrators', canUse: true, canAttach: true, canUpdateStatus: true,  canUpdatePersonalSpace: true,
                canCreateSpace: true, confluenceAdmin: true, systemAdmin: true, disabled: true},
            {className: 'Contributors', canUse: true, canAttach: true, canUpdateStatus: true,  canUpdatePersonalSpace: true,
                canCreateSpace: true, confluenceAdmin: false, systemAdmin: false},
            {className: 'Workspace Admins', canUse: true, canAttach: true, canUpdateStatus: true,  canUpdatePersonalSpace: false,
                canCreateSpace: false, confluenceAdmin: true, systemAdmin: false},
            {className: 'Approvers', canUse: true, canAttach: true, canUpdateStatus: true,  canUpdatePersonalSpace: false,
                canCreateSpace: true, confluenceAdmin: true, systemAdmin: false},
        ]
    });