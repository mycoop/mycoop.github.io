angular.module('adminApp').
    controller('GroupsCtrl', function ($scope, $state, Group) {
        $scope.group = {};
        function updateGroups() {
            Group.getGroups(function (data) {
                $scope.groups = data;
            });
        }
        updateGroups();

        $scope.deleteSelectedGroups = function () {
            _.each(_.where($scope.groups, {selected: true}), function (group) {
                Group.deleteGroup(group, updateGroups);
            });
        };

        $scope.$watch('allGroupsSelected', function (val) {

            _.each($scope.groups, function (group) {
                group.selected = val;
            })
        });

        $scope.save = function(){
            if ($scope.form.$invalid) {
                $scope.error = true;
            } else {
                Group.addGroup($scope.group, function(){
                    $state.transitionTo('config.security.groups')
                });
            }
        };

    })
    .controller('GroupMembershipCtrl', function($scope, $state, $stateParams, Group){
        if($stateParams.id){
            Group.getGroup($stateParams.id, function(data){
                $scope.group = data;
            })
        }

        $scope.deleteGroup = function(){
            Group.deleteGroup($scope.group, function(){
                $state.transitionTo('config.security.groups')
            })
        };

        Group.getPermissions(function(data){
            $scope.permissions = data;
        });
    });