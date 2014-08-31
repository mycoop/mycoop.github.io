angular.module('adminApp').
    controller('DashboardCtrl', function ($scope, $state, User) {
        $scope.userActivity = [];
        User.getUsers(function(data){
            $scope.users = data;
            _.each(data, function(user){
                $scope.userActivity.push({
                    userPermission: getUserPermission(user),
                    user: user,
                    time: '5 hours ago',
                    activity: 'Did some very important stuff',
                    location: 'BOA > Department1',
                    section: 'Leadership'
                })
            })
        });
        var getUserPermission = function(user){
            switch (user.permissionLevelId){
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