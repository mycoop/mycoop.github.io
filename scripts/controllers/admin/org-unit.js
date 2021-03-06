angular.module('adminApp')
    .controller('OrgUnitsCtrl', function ($scope, OrgUnit) {

    })
    .controller('OrgUnitEditCtrl', function ($scope, $state, $stateParams, $timeout, $rootScope, Modal, Component, WorkspaceTemplate, OrgUnit, User, Group) {
        $scope.unit = {
            location: {
                name: ""
            },
            name: ""
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

        $scope.askToContinue = function () {
            Modal.openYesNoModal('Overview', 'You will be logged in as End User to continue the demo. Are you ready?', function () {
                window.location.replace('/user/#/home/main');
            });
        };

        $scope.addPermission = function () {
            if ($scope.newPermission.entity && $scope.newPermission.permissionLevel.id) {
                var newPermission = {
                    entityType: $scope.newPermission.entity.entityType,
                    entity: {name: $scope.newPermission.entity.name, id: $scope.newPermission.entity.id},
                    permissionLevel: $scope.newPermission.permissionLevel
                };
                $scope.permissions.push(newPermission);
                $scope.newPermission.entity = null;
                if ($scope.isEdit) {
                    createPermission(newPermission);
                }
            }
        };

        $scope.deletePermission = function (permission) {
            $scope.permissions.remove(permission);
            if ($scope.isEdit) {
                if (permission.entityType == 'User') {
                    OrgUnit.deleteUserPermission($scope.unit.id, permission.entity.id, permission.permissionLevel.id);
                } else {
                    OrgUnit.deleteGroupPermission($scope.unit.id, permission.entity.id, permission.permissionLevel.id);
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
            _.each(users, function (user) {
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
                            getWorkspaceDocuments(unit.workspaceTemplateId);
                        });
                        OrgUnit.getUserPermissions($stateParams.id, function (data) {
                            _.each(data, function (permission) {
                                $scope.permissions.push({
                                    entityType: 'User',
                                    entity: {name: permission.user.firstName + ' ' + permission.user.lastName, id: permission.user.id},
                                    permissionLevel: _.findWhere($scope.permissionLevels, {id: permission.permissionLevelId})
                                });
                            })
                        });
                        OrgUnit.getGroupPermissions($stateParams.id, function (data) {
                            _.each(data, function (permission) {
                                $scope.permissions.push({
                                    entityType: 'Group',
                                    entity: {name: permission.group.name, id: permission.group.id},
                                    permissionLevel: _.findWhere($scope.permissionLevels, {id: permission.permissionLevelId})
                                });
                            })
                        });
                    } else {
                        $scope.owner = users[2];
                        $scope.unit.ownerId = users[2].id;
                    }
                });
            });
        });

        function getWorkspaceDocuments(workspaceTemplateId) {
            WorkspaceTemplate.getDocumentTemplates(workspaceTemplateId, function (documents) {
                var groupedDocs = _.groupBy(documents, function (doc) {
                    return doc.componentId;
                });
                $scope.components = [];
                Component.getComponents(function (components) {
                    _.each(components, function (item) {
                        if (groupedDocs[item.id]) {
                            item.documentTemplates = groupedDocs[item.id];
                            $scope.components.push(item);
                        }
                    });
                });
            });
        }

        Group.getGroups(function (groups) {
            $scope.groups = groups;
            _.each(groups, function (group) {
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
                    if (!$scope.selectedWorkspace) {           //
                        $scope.unit.workspaceTemplateId = 1; // kostyl
                    }                                        //
                    OrgUnit.addOrgUnit($scope.unit, function (data) {
                        $scope.unit.id = data.id;
                        _.each($scope.permissions, function (item) {
                            createPermission(item);
                        });
                        if (true) {
                            $timeout(function () {
                                $state.go('^.details', {id: data.id});
                            }, 100);
                        } else {
//                            $state.go('^', {}, {reload: true});
                        }
                    });
                }
            }
        };

        $scope.deleteOrgUnit = function () {
            Modal.openYesNoModal('Warning!', 'Are you sure want to delete org unit \'' + $scope.unit.name + '\'?', function () {
                OrgUnit.deleteOrgUnit($scope.unit.id, function () {
                    $state.go('^', {}, {reload: true});
                })
            });
        }
    });