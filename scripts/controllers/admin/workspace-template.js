'use strict';

angular.module('adminApp')
    .controller('WorkspaceTemplateCtrl', function ($scope, WorkspaceTemplate) {
        WorkspaceTemplate.getTemplates(function (data) {
            $scope.templates = data;
        });
    })
    .controller('WorkspaceTemplateEditCtrl', function ($scope, $state, $stateParams, $upload, WorkspaceTemplate, OrgUnit, Component) {
        $scope.documentProgress = 0;
        $scope.docsChangesCount = -1;
        Component.getComponents(function (components) {
            $scope.components = components;
            if ($stateParams.id) {
                $scope.isEdit = true;
                WorkspaceTemplate.getTemplate($stateParams.id, function (data) {
                    $scope.template = data;
                    $scope.oldUsers = [];
                    WorkspaceTemplate.getDocumentTemplates(data.id, function (docs) {
                        $scope.oldDocs = [];
                        _.each(docs, function (item) {
                            $scope.oldDocs.push(item);
                        });
                        var ids = _.pluck($scope.oldDocs, 'id');
                        forEachComponentDocuments(function (doc) {
                            if (_.contains(ids, doc.id)) {
                                doc.selected = true;
                                $scope.onDocumentSelectionChanged(doc);
                            }
                        });
                    });
                });
            }
        });

        function forEachComponentDocuments(action) {
            _.each($scope.components, function (component) {
                _.each(component.documentTemplates, function (document) {
                    action(document);
                });
            });
        }

        $scope.onComponentSelectionChanged = function (component) {
            _.each(component.documentTemplates, function (item) {
                item.selected = component.selected;
            });
        };

        $scope.onDocumentSelectionChanged = function (document) {
            var component = _.findWhere($scope.components, {id: document.componentId});
            var allDeselected = true;
            _.each(component.documentTemplates, function (item) {
                if (item.selected) {
                    allDeselected = false;
                }
            });
            component.selected = !allDeselected;
        };

        function getDocsToAdd() {
            var result = [];
            var selectedDocs = getSelectedDocs();
            var oldIds = _.pluck($scope.oldDocs, 'id');
            _.each(selectedDocs, function (doc) {
                if (!_.contains(oldIds, doc.id)) {
                    result.push(doc);
                }
            });
            return result;
        }

        function getDocsToRemove() {
            var result = [];
            var newIds = _.pluck(getSelectedDocs(), 'id');
            _.each($scope.oldDocs, function (doc) {
                if (!_.contains(newIds, doc.id)) {
                    result.push(doc);
                }
            });
            return result;
        }

        function getSelectedDocs() {
            var result = [];
            forEachComponentDocuments(function (doc) {
                if (doc.selected) {
                    result.push(doc);
                }
            });
            return result;
        }

        $scope.save = function () {
            $scope.documentProgress = 0;

            if ($scope.isEdit) {
                WorkspaceTemplate.updateTemplate($scope.template, function (data) {
                    var docsToAdd = getDocsToAdd();
                    console.log('Docs to add count:' + docsToAdd.length);
                    var docsToRemove = getDocsToRemove();
                    console.log('Docs to remove count:' + docsToRemove.length);
                    $scope.docsChangesCount = docsToAdd.length + docsToRemove.length;
                    _.each(docsToAdd, function (item) {
                        WorkspaceTemplate.addDocumentTemplate($scope.template.id, item.id, function () {
                            $scope.documentProgress++;
                        });
                    });
                    _.each(docsToRemove, function (item) {
                        WorkspaceTemplate.removeDocumentTemplate($scope.template.id, item.id, function () {
                            $scope.documentProgress++;
                        });
                    });
                });
            } else {
                $scope.docsToAdd = getSelectedDocs();
                WorkspaceTemplate.addTemplate($scope.template, function (data) {
                    $scope.docsChangesCount = $scope.docsToAdd.length;
                    _.each($scope.docsToAdd, function (item) {
                        WorkspaceTemplate.addDocumentTemplate(data.id, item.id, function () {
                            $scope.documentProgress++;
                        });
                    });
                });
            }
        };

        $scope.$watch('documentProgress', function () {
            console.log('Doc changes progress: ' + $scope.documentProgress);
            if ($scope.documentProgress == $scope.docsChangesCount) {
                $state.go('^', {}, {reload: true});
            }
        });

    });