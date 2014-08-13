angular.module('adminApp')
    .controller('OrgUnitsCtrl', function ($scope, OrgUnit) {

    })
    .controller('OrgUnitEditCtrl', function ($scope, $state, $stateParams, OrgUnit, User) {
        $scope.unit = {
            location: {},
            name: "",
            address: ""
        };
        User.getUsers(function (data) {
            $scope.users = data;
            OrgUnit.getOrgUnits(function (units) {
                $scope.units = units;
                $scope.units.unshift({name: '-- no parent --', id: null});

                if ($stateParams.id) {
                    $scope.isEdit = true;
                    OrgUnit.getOrgUnit($stateParams.id, function (unit) {
                        $scope.unit = unit;
                        $scope.owner = _.findWhere(data, {id: unit.ownerId});
                        $scope.parent = _.findWhere(units, {id: unit.parentId});
                    });
                } else {
                    $scope.owner = data[2];
                    $scope.unit.ownerId = data[2].id;
                }
            });
        });
        $scope.onOwnerSelected = function ($item, $model, $label) {
            $scope.unit.ownerId = $item.id;
        };
        $scope.onParentSelected = function ($item, $model, $label) {
            $scope.unit.parentId = $item.id;
        };

        $scope.save = function () {
            if ($scope.form.$invalid) {
                $scope.error = true;
            } else {

                var parent = _.findWhere($scope.units, {name: $scope.parent});
                $scope.unit.parentId = parent ? parent.id : null;
                if ($scope.isEdit) {
                    OrgUnit.updateOrgUnit($scope.unit, function () {
                        $state.transitionTo('config.orgunits', {}, {reload: true});
                    });
                } else {
//                if(owner){
//                    $scope.ownerId = owner.id;
//                } else{
//                    $scope.isError = true;
//                }
                    OrgUnit.addOrgUnit($scope.unit, function (data) {
                        $state.transitionTo('config.orgunits', {}, {reload: true});
                    });
                }
            }
        };
    });