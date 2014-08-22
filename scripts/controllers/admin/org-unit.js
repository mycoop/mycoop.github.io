angular.module('adminApp')
    .controller('OrgUnitsCtrl', function ($scope, OrgUnit) {

    })
    .controller('OrgUnitEditCtrl', function ($scope, $state, $stateParams, Modal, WorkspaceTemplate, OrgUnit, User, Group) {
        $scope.unit = {
            location: {},
            name: "",
            address: ""
        };
        $scope.permissionLevels = [
//            {name: '', id: 0},
            {name: 'Administrator', id: 1},
            {name: 'Contributor', id: 2},
            {name: 'Approver', id: 3},
            {name: 'Browser', id: 4}
        ];
        $scope.permissions = [];
        $scope.permissionLevel = $scope.permissionLevels[0];
        $scope.permissionEntities = [];

        $scope.addPermission = function () {
            if($scope.newPermission.entity && $scope.newPermission.permissionLevel.id){
                var newPermission = {
                    entityType:  $scope.newPermission.entity.entityType,
                    entity: {name: $scope.newPermission.entity.name, id: $scope.newPermission.entity.id},
                    permissionLevel: $scope.newPermission.permissionLevel
                };
                $scope.permissions.push(newPermission);
                if ($scope.isEdit) {
                    createPermission(newPermission);
                }
            }
        };

        function createPermission(newPermission) {
            if (newPermission.entityType == 'User') {
                OrgUnit.addUserPermission($scope.unit.id, newPermission.entity.id, newPermission.permissionLevel.id);
            } else {
                OrgUnit.addGroupPermission($scope.unit.id, newPermission.entity.id, newPermission.permissionLevel.id);
            }
        }

        $scope.selectWorkspace = function (workspace) {
            $scope.selectedWorkspace = workspace;
            $scope.unit.workspaceTemplateId = workspace.id;
        };
        User.getUsers(function (users) {
            $scope.users = users;
            _.each(users, function(user){
                $scope.permissionEntities.push({
                    name: user.firstName + ' ' + user.lastName,
                    id: user.id,
                    entityType: 'User'
                });
            });
            OrgUnit.getOrgUnits(function (units) {
                $scope.units = units;
                $scope.units.unshift({name: '-- no parent --', id: 0});

                WorkspaceTemplate.getTemplates(function (data) {
                    $scope.workspaceTemplates = data;
                    if ($stateParams.id) {
                        $scope.isEdit = true;
                        OrgUnit.getOrgUnit($stateParams.id, function (unit) {
                            $scope.unit = unit;
                            $scope.owner = _.findWhere(users, {id: unit.ownerId});
                            $scope.parent = _.findWhere(units, {id: unit.parentId});
                            $scope.selectedWorkspace = _.findWhere(data, {id: unit.workspaceTemplateId});
                        });
                    } else {
                        $scope.owner = users[2];
                        $scope.unit.ownerId = users[2].id;
                    }
                });
            });
        });

        Group.getGroups(function(groups){
            $scope.groups = groups;
            _.each(groups, function(group){
                $scope.permissionEntities.push({
                    name: group.name,
                    id: group.id,
                    entityType: 'Group'
                });
            });
        });
        $scope.onOwnerSelected = function ($item, $model, $label) {
            $scope.unit.ownerId = $item.id;
        };
        $scope.onParentSelected = function ($item, $model, $label) {
            $scope.unit.parentId = $item.id;
        };

        $scope.onPermissionSelected = function ($item, $model, $label) {
            $scope.newPermission.entity = $item;
        };
        $scope.save = function () {
            if ($scope.form.$invalid) {
                $scope.error = true;
            } else {

//                var parent = _.findWhere($scope.units, {name: $scope.parent});
//                $scope.unit.parentId = parent && parent.id ? parent.id : null;
                if ($scope.isEdit) {
                    OrgUnit.updateOrgUnit($scope.unit, function () {
                        $state.transitionTo('config.orgunits', {}, {reload: true});
                    });
                } else {
                    if(!$scope.selectedWorkspace){           //
                        $scope.unit.workspaceTemplateId = 1; // kostyl
                    }                                        //
                    OrgUnit.addOrgUnit($scope.unit, function (data) {
                        $scope.unit.id = data.id;
                        _.each($scope.permissions, function (item) {
                            createPermission(item);
                        });
                        $state.go('^', {}, {reload: true});
                    });
                }
            }
        };

        $scope.deleteOrgUnit = function(){
            Modal.openYesNoModal('Warning!', 'Are you sure want to delete org unit \''+$scope.unit.name+'\'?', function(){
                OrgUnit.deleteOrgUnit($scope.unit.id, function(){
                    $state.go('^', {}, {reload: true});
                })
            });
        }
    });