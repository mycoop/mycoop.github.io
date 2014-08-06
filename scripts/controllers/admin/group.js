angular.module('adminApp').
    controller('GroupsCtrl', function ($scope, $state, Group, Modal) {
        $scope.group = {};

        function updateGroups() {
            Group.getGroups(function (data) {
                $scope.groups = data;
            });
        }

        updateGroups();

        $scope.deleteSelectedGroups = function () {
            var deletedGroups = _.where($scope.groups, {selected: true});
            Modal.openYesNoModal('Warning!', 'Are you sure you want to delete ' + deletedGroups.length + ' groups', function () {
                _.each(deletedGroups, function (group) {
                    $scope.groups.remove(group);
                    Group.deleteGroup(group);
                });
            });
        };

        $scope.$watch('allGroupsSelected', function (val) {
            _.each($scope.groups, function (group) {
                group.selected = val;
            })
        });

        $scope.save = function () {
            if ($scope.form.$invalid) {
                $scope.error = true;
            } else {
                Group.addGroup($scope.group, function (data) {
                    $state.transitionTo('config.security.groups.settings', {id: data.id});
                });
            }
        };
    })
    .controller('GroupMembershipCtrl', function ($scope, $state, $stateParams, Group, User, Modal) {
        if ($stateParams.id) {
            Group.getGroup($stateParams.id, function (data) {
                $scope.group = data;
                Group.getGroupUsers($stateParams.id, function(data){
                    $scope.group.users = data;
                    $scope.oldUsers = [];
                    _.each(data,function(item){
                        $scope.oldUsers.push(item);
                    })
                });
            });
            User.getUsers(function (data) {
                $scope.users = data;
            });
        }
        $scope.removeUserFromGroup = function(user){
            $scope.group.users.remove(user);
            Group.removeUserFromGroup($scope.group.id, user.id, function(){

            });
        };
        function setusers(callback) {
            _.each($scope.group.users, function (user) {
                if (!_.contains($scope.oldUsers, user)) {
                    Group.addUserToGroup($scope.group.id, user.id);
                }
            });
            callback();
        }

        $scope.save = function(){
            Group.updateGroup({id: $scope.group.id, name: $scope.group.name, description: $scope.group.description },
                function(){
                    setusers(function(){
                        $state.transitionTo('config.security.groups',{},{reload: true});
                    });
                });
        };

        $scope.onNewUserAdded = function ($item, $model, $label) {
            $scope.group.users.unshift($item);
            $scope.newUser = null;
        };

        $scope.deleteGroup = function () {
//            Modal.openYesNoModal('Warning!', 'Are you sure you want to delete this group?', function () {
                Group.deleteGroup($scope.group.id, function () {
                    $state.transitionTo('config.security.groups', {}, {reload: true});
                });
//            });
        };

    })
    .controller('GroupWorkspaceCtrl', function ($scope, $modal, $stateParams, Group, $log, OrgEntity) {
        if ($stateParams.id) {
            Group.getGroup($stateParams.id, function (data) {
                $scope.group = data;
            })
        }

        function refreshEntities() {
            OrgEntity.getEntities(function (data) {
                $scope.items = data;
            });
        }

        refreshEntities();
    });
