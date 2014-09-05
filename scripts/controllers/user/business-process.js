'use strict';

angular.module('userApp')
    .controller('BusinessProcessCtrl', function ($scope, Modal, $rootScope, BusinessProcess) {
        $scope.gridData = []
        function updateProcesses() {
            BusinessProcess.getBusinessProcesses(function (data) {
                _.each(data, function (item) {
                    item.address = item.location.address;
                });
                $scope.processes = data;
            });
        }

        updateProcesses();
        $scope.gridOptions = { data: 'processes',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
//            headerRowTemplate: 'headerRow',
            columnDefs: [
                {field: 'name', displayName: 'Name', width: '30%'},
                {field: 'description', displayName: 'Description', width: '40%'},
                {field: 'address', displayName: 'Location', enableCellEdit: true, width: '30%'}
            ]};


        $scope.cloneProcess = function (process) {
            var newProcess = angular.copy(process);
            delete newProcess.id;
            BusinessProcess.addBusinessProcess(newProcess,function(){
                updateProcesses();
            })
        };
        $scope.deleteProcess = function (process) {
            Modal.openYesNoModal('Warning!', 'Are you sure want to delete this business process?', function () {
                BusinessProcess.deleteBusinessProcess(process.id, function () {
                    updateProcesses();
                })
            })
        };
        $scope.bulkUpdate = function () {
            $scope.isBulkUpdating = true;
        };

        $scope.saveBulkUpdate = function () {
            $scope.isBulkUpdating = false;
        }
    })
    .controller('BusinessProcessEditCtrl', function ($scope, $rootScope, $stateParams, BusinessProcess, BusinessProcessAttribute, $state) {
        $scope.process = {
            orgUnitId: 1028,
            name: '',
            description: '',
            location: {address: ''}
        };
        BusinessProcessAttribute.getAttributeTypes(function (types) {
            $scope.attributeTypes = types;
            BusinessProcessAttribute.getAttributes(function (data) {
                $scope.attributes = data;
                if ($stateParams.id) {
                    $scope.isEdit = true;
                    BusinessProcess.getBusinessProcess($stateParams.id, function (data) {
                        $scope.process = data
                    });
                    BusinessProcess.getAttributes($stateParams.id, function (data) {
                        $scope.oldAttributes = [];
                        _.each(data, function (item) {
                            $scope.oldAttributes.push(item);
                        });

                        var ids = _.pluck($scope.oldAttributes, 'id');
                        _.each($scope.attributes, function (item) {
                            item.selected = _.contains(ids, item.id);
                            var type = _.findWhere($scope.attributeTypes, {id: item.attributeTypeId});
                            type.selected = type.selected || item.selected;
                        });
                    });
                }
            });
        });


        $scope.save = function () {

            if ($scope.isEdit) {
                BusinessProcess.updateBusinessProcess($scope.process, function (data) {
                    $state.go('^', {}, {reload: true});
                    _.each(getAttributesToAdd(), function (item) {
                        BusinessProcess.addAttribute($scope.process.id, item.id);
                    });
                    _.each(getAttributesToRemove(), function (item) {
                        BusinessProcess.deleteAttribute($scope.process.id, item.id);
                    });
                });
            } else {
                BusinessProcess.addBusinessProcess($scope.process, function (data) {
                    _.each($scope.attributes, function (attribute) {
                        if (attribute.selected) {
                            BusinessProcess.addAttribute($scope.process.id, attribute.id);
                        }
                    });

                    $state.go('^', {}, {reload: true});
                });
            }
        };
        $scope.cancel = function () {
            $state.transitionTo('impact.processes');
        };

        function getAttributesToAdd() {
            var result = [];
            var selectedAttributes = getSelectedAttributes();
            var oldIds = _.pluck($scope.oldAttributes, 'id');
            _.each(selectedAttributes, function (doc) {
                if (!_.contains(oldIds, doc.id)) {
                    result.push(doc);
                }
            });
            return result;
        }

        function getAttributesToRemove() {
            var result = [];
            var newIds = _.pluck(getSelectedAttributes(), 'id');
            _.each($scope.oldAttributes, function (doc) {
                if (!_.contains(newIds, doc.id)) {
                    result.push(doc);
                }
            });
            return result;
        }

        function getSelectedAttributes() {
            var result = [];
            _.each($scope.attributes, function (doc) {
                if (doc.selected) {
                    result.push(doc);
                }
            });
            return result;
        }
    })
    .controller('BusinessProcessRelationshipCtrl', function ($scope, $rootScope, BusinessProcess, BusinessProcessAttribute) {
        $scope.groups = {};
        $scope.graphData = [];
        $scope.attributeProgress = 0;
        $scope.attributeProgressGoal = -1;
        $scope.addedAttributeIds = [];
        $scope.constraints = [
            {
                "has": { "type": "group1" },
                "type": "position",
                "x": 0.2,
                "y": 0.2,
                "weight": 0.7
            },
            {
                "has": { "type": "group2" },
                "type": "position",
                "x": 0.8,
                "y": 0.2,
                "weight": 0.7
            },
            {
                "has": { "type": "group3" },
                "type": "position",
                "x": 0.2,
                "y": 0.5,
                "weight": 0.7
            },
            {
                "has": { "type": "group4" },
                "type": "position",
                "x": 0.8,
                "y": 0.5,
                "weight": 0.7
            },
            {
                "has": { "type": "group5" },
                "type": "position",
                "x": 0.2,
                "y": 0.8,
                "weight": 0.7
            },
            {
                "has": { "type": "group8" },
                "type": "position",
                "x": 0.8,
                "y": 0.8,
                "weight": 0.7
            }
        ];

        $scope.$watch('attributeProgress', function () {
            console.log($scope.attributeProgress + ' - ' + $scope.attributeProgressGoal)
            if ($scope.attributeProgress == $scope.attributeProgressGoal) {
//                alert(123)
                _.each($scope.processes, function (process) {
                    _.each(process.attributes, function (attribute) {
                        var node;
                        if (!_.contains($scope.addedAttributeIds, attribute.id)) {
                            node = {
                                id: attribute.id,
                                name: attribute.name,
                                type: _.findWhere($scope.attributeTypes, {id: attribute.attributeTypeId}).name,
                                depends: []
                            };
                            $scope.graphData.push(node);
                            $scope.addedAttributeIds.push(attribute.id);
                        } else {
                            node = _.findWhere($scope.graphData, {id: attribute.id});
                        }
                        node.depends.push(process.name);
                    });
                });
                console.log(JSON.stringify($scope.graphData));
                $scope.initGraph();
            }
        });

        $scope.initGraph = function () {
            var index = 0;
            _.each($scope.groups, function (group) {
                if ($scope.constraints[index]) {
                    $scope.constraints[index].has.type = group.name;
                }
                index++;
            });

            config.constraints = $scope.constraints;
            config.types = $scope.groups;
            config.data = $scope.graphData;
            initializeGraph();

        };

        BusinessProcessAttribute.getAttributeTypes(function (types) {
            $scope.attributeTypes = types;
            _.each(types, function (item) {
                $scope.groups[item.name] = {name: item.name};
            });
            BusinessProcess.getBusinessProcesses(function (processes) {
                $scope.processes = processes;
                $scope.groups.processes = {name: 'Business Process'};
                $scope.attributeProgress = 0;
                $scope.attributeProgressGoal = processes.length;
                _.each(processes, function (process) {
                    var node = {
                        id: process.id + 'p',
                        name: process.name,
                        type: "processes",
                        depends: []
                    };
                    $scope.graphData.push(node);
                    BusinessProcess.getAttributes(process.id, function (processAttributes) {
                        process.attributes = processAttributes;
                        $scope.attributeProgress++;
                    });
                });
            });
        });
    });
