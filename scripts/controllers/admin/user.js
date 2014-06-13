'use strict';

angular.module('adminApp')
    .controller('UsersCtrl', function ($scope, $rootScope, User) {
        function updateUsers() {
            User.getUsers(function (data) {
                $scope.users = data;
            });
        }

        updateUsers();

        $scope['delete'] = function (user) {
            if (user.isDeleting) {
                User.deleteUser(user, function () {
                    updateUsers();
                })
            } else {
                user.isDeleting = true;
            }
        };

        $scope.deleteSelectedUsers = function () {
            _.each(_.where($scope.users, {selected: true}), function (user) {
                User.deleteUser(user, updateUsers);
            });
        };


        $scope.$watch('allUsersSelected', function (val) {

            _.each($scope.users, function (user) {
                user.selected = val;
            })
        });

    })
    .controller('EditUserCtrl', function ($scope, $rootScope, $stateParams, $modal, User, Group, $state) {
        if ($stateParams.id) {
            $scope.isEdit = true;
            User.getUser($stateParams.id, function (data) {
                $scope.user = angular.copy(data);
            })
        }

        Group.getGroups(function (data) {
            $scope.groups = data;
        });

        $scope.choseGroups = function () {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/chose-groups.html',
                controller: 'ChooseGroupModalCtrl',
                resolve: {
                    groups: function () {
                        return $scope.groups;
                    }
                }
            });

            modalInstance.result.then(function (params) {
                $scope.userGroups = params.selectedItems;
            }, function () {
                console.log('success');
            });
        };

        $scope.save = function () {
            if ($scope.form.$invalid) {
                $scope.error = true;
            } else {
            }
            if ($scope.isEdit) {

                $state.transitionTo($state.current.name.replace('.edit', ''));
            } else {
                $state.transitionTo($state.current.name.replace('.add', ''));
            }
//            if($scope.isEdit){
//                User.updateUser($scope.user, function(){
//                    $state.transitionTo($state.current().replace('.edit',''));
//                })
//            } else{
//                User.addUser($scope.user, function(){
//                    $state.transitionTo($state.current().replace('.add',''));
//                })
//            }
        };
        $scope.cancel = function () {
            console.log(JSON.stringify($state.current.name));
            if ($scope.isEdit) {

                $state.transitionTo($state.current.name.replace('.edit', ''));
            } else {
                $state.transitionTo($state.current.name.replace('.add', ''));
            }
        }
    })
    .controller('UserCtrl', function ($scope, $rootScope, $stateParams, $modal, User, Group, $state) {
        if ($stateParams.id) {
            User.getUser($stateParams.id, function (data) {
                $scope.user = angular.copy(data);
                Group.getGroups( function (groups) {
                    $scope.groups = groups;
                    $scope.userGroups = [groups[0], groups[1]];
                    _.each($scope.userGroups, function(item){
//                        item.selected = true;
                    })
                });
            });
        }


        $scope.choseGroups = function () {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/chose-groups.html',
                controller: 'ChooseGroupModalCtrl',
                resolve: {
                    groups: function () {
                        return $scope.groups;
                    }
                }
            });

            modalInstance.result.then(function (params) {
                $scope.userGroups = params.selectedItems;
            }, function () {
                console.log('success');
            });
        };


    })
    .controller('MultipleUserCtrl', function($scope, $rootScope, $stateParams, $modal, User, Group, $state){
        Group.getGroups( function (groups) {
            $scope.groups = groups;
        });
        $scope.users = [{isEdit: true, groups: []}];
        $scope.addMore = function(){
            $scope.users.push({isEdit: true, groups: []})
        };
        $scope.save = function(user){
            if(!user.name || !user.email){
                $scope.isError = true;
                $scope.errorMessage = "Please fill all fields";
            } else if(!validateEmail(user.email)){
                $scope.isError = true;
                $scope.errorMessage = "Email is not valid";
            } else{
                $scope.isError = false;
                user.isEdit = false;
            }
        }
    });
