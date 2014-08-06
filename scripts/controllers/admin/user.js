'use strict';

angular.module('adminApp')
    .controller('UsersCtrl', function ($scope, $rootScope, User, Modal) {
        function updateUsers() {
            User.getUsers(function (data) {
                $scope.users = data;
            });
        }

        updateUsers();

        $scope['delete'] = function (user) {
            if (user.isDeleting) {
                User.deleteUser(user.id, function () {
                    updateUsers();
                })
            } else {
                user.isDeleting = true;
            }
        };

        $scope.deleteSelectedUsers = function () {
            var deletedUsers = _.where($scope.users, {selected: true});
            if (deletedUsers.length > 0) {
                Modal.openYesNoModal('Warning!', 'Are you sure you want to delete ' + deletedUsers.length + ' users?', function () {
                    _.each(deletedUsers, function (user) {
                        User.deleteUser(user.id, updateUsers);
                    });
                });
            }
        };


        $scope.$watch('allUsersSelected', function (val) {
            _.each($scope.users, function (user) {
                user.selected = val;
            })
        });

    })
    .controller('EditUserCtrl', function ($scope, $rootScope, $stateParams, $modal, User, Group, $state, Modal) {
        $scope.userGroups = [];
        $scope.user = {permissionLevelId: 1};
        if ($stateParams.id) {
            $scope.isEdit = true;
            User.getUser($stateParams.id, function (data) {
                $scope.user = data;
                $scope.user.id = $stateParams.id;
                User.getUserGroups(data.id, function (groups) {
                    $scope.userGroups = groups;
                    $scope.oldUserGroups = angular.copy(groups);
                })
            })
        }

        Group.getGroups(function (data) {
            $scope.groups = data;
        });

        $scope.deleteUser = function () {
            Modal.openYesNoModal('Warning!', 'Are you sure you want to delete this user?', function(){
                User.deleteUser($stateParams.id, function () {
                    $state.transitionTo('config.security.users', {}, {reload: true});
                });
            });
        };

        $scope.onNewGroupAdded = function ($item, $model, $label) {
            $scope.userGroups.unshift($item);
            $scope.newGroup = null;
        };

        $scope.save = function () {
            if ($scope.form.$invalid || $scope.passwordForm.$invalid) {
                $scope.error = true;
            } else {
                if ($scope.isEdit) {
                    User.updateUser($scope.user, function () {
                        setGroups(function () {
                            $state.transitionTo($state.current.name.replace('.edit', ''), {}, {reload: true});
                        });
                    });
                } else {
                    User.addUser($scope.user, function (data) {
                        $scope.user.id = data.id;
                        setGroups(function () {
                            $state.transitionTo($state.current.name.replace('.add', ''), {}, {reload: true});
                        });
                    });
                }
            }
        };

        $scope.removeUserFromGroup = function(group){

            $scope.userGroups.remove(group);
            Group.removeUserFromGroup(group.id, $scope.user.id, function(){

            });
        };
        function setGroups(callback) {
            _.each($scope.userGroups, function (group) {
                if (!_.contains($scope.oldUserGroups, group)) {
                    Group.addUserToGroup(group.id, $scope.user.id);
                }
            });

//            _.each($scope.oldUserGroups, function (group) {
//                if (!_.contains($scope.userGroups, group)) {
//                    Group.removeUserFromGroup(group.id, $scope.user.id);
//                }
//            });
            callback();
        }

        $scope.cancel = function () {
            console.log(JSON.stringify($state.current.name));
            if ($scope.isEdit) {
                $state.transitionTo($state.current.name.replace('.edit', ''), {}, {reload: true});
            } else {
                $state.transitionTo($state.current.name.replace('.add', ''), {}, {reload: true});
            }
        }
    })
    .controller('MultipleUserCtrl', function ($scope, $rootScope, $stateParams, $modal, User, Group, $state) {
        Group.getGroups(function (groups) {
            $scope.groups = groups;
        });
        $scope.users = [
            {isEdit: true, groups: []}
        ];
        $scope.addMore = function () {
            $scope.users.push({isEdit: true, groups: []})
        };
        $scope.save = function (user) {
            if (!user.name || !user.email) {
                $scope.isError = true;
                $scope.errorMessage = "Please fill all fields";
            } else if (!validateEmail(user.email)) {
                $scope.isError = true;
                $scope.errorMessage = "Email is not valid";
            } else {
                $scope.isError = false;
                user.isEdit = false;
            }
        }
    });
