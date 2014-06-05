'use strict';

angular.module('adminApp')
    .controller('UsersCtrl', function ($scope, $rootScope, User) {
        function updateUsers() {
            User.getUsers(function(data){
                $scope.users = data;
            });
        }
        updateUsers();
        $scope['delete'] = function(user){
            if(user.isDeleting){
                User.deleteUser(user, function(){
                    updateUsers();
                })
            } else{
                user.isDeleting = true;
            }
        };

    })
    .controller('UserCtrl', function ($scope, $rootScope, $stateParams, User, $state) {
        if($stateParams.id){
            $scope.isEdit = true;
            User.getUser($stateParams.id, function(data){
                $scope.user = angular.copy(data);
            })
        }

        $scope.save = function(){
            if($scope.form.$invalid){
                $scope.error = true;
            } else{
                if($scope.isEdit){
                    User.updateUser($scope.user, function(){
                        $state.transitionTo('setup.users');
                    })
                } else{
                    User.addUser($scope.user, function(){
                        $state.transitionTo('setup.users');
                    })
                }
            }

        };
        $scope.cancel = function(){
            $state.transitionTo('setup.users');
        }
    });
