angular.module('userApp')
    .controller('PlanCtrl', function ($scope, $rootScope, $state) {
        $rootScope.currentDocument = $rootScope.docs[1];
        $scope.organization = {
            name: 'Organization and its Context',

            items: [
                { name: 'Understanding Mission, Objectives, Values and Strategies', state: $state.href('plan.organization.mission') },
                { name: 'Analyse Organization Internal/External Environment', state: $state.href('plan.organization.analysis') },
                { name: 'Key Organization\'s Activities', state: $state.href('plan.organization.activities') },
                { name: 'Interested Parties', state: $state.href('plan.organization.parties') },
                { name: 'Legal and Regulatory Requirements', state: '' },
                { name: 'Potential Impact of Disruptive Incident', state: '' },
                { name: 'Business Polices and Objectives', state: '' },
                { name: 'Organizational Risk Appetite', state: '' },
                { name: 'Business Continuity Requirements and Objectives', state: '' },
                { name: 'BCMS Scope', state: '' }
            ]
        };

        $scope.leadership = {
            name: 'Leadership',
            items: [
                { name: 'BCMS Business Case', state: '' },
                { name: 'Project Team', state: '' },
                { name: 'BCMS Objectives', state: '' },
                { name: 'Project Plan', state: '' },
                { name: 'Communications Plan for the BCMS Project', state: '' },
                { name: 'Management Approval', state: '' },
            ]
        };

        $scope.planning = {
            name: 'Planning',
            items: [
                { name: 'Actions to address risk and opportunities', state: ''},
                { name: 'Business Continuity Objectives and plans to achieve them', state: ''},
            ]
        };

        $scope.support = {
            name: 'Support',
            items: [
                { name: 'Resources', state: ''},
                { name: 'Competence', state: ''},
                { name: 'Awareness', state: ''},
                { name: 'Communication', state: ''},
                { name: 'Document Information', state: ''}
            ]
        };
    })
    .controller('KeyOrgActivitiesCtrl', function ($scope, $rootScope, $state, OrgAsset) {
        OrgAsset.getAssets(function (data) {
            $scope.factors = angular.copy(data);
        });
        $scope.addFactor = function () {
            $scope.factors.push({selected: true, name: '', isEdit: true})
        };


        $scope.proceedAssets = function () {
            _.each($scope.factors, function (asset) {
                if (!asset.id) {
                    OrgAsset.addAsset({name: asset.name, selected: asset.selected}, function(){});
                }
            });
            $state.transitionTo('plan.organization.editAsset', {assetId: $scope.factors[0].id, orgEntityId: $rootScope.orgEntityId})
        }
    })
    .controller('ActivityFactorEditCtrl', function ($scope, $rootScope, $state, $stateParams, OrgAsset) {
        if ($stateParams.assetId) {
            OrgAsset.getAsset($stateParams.assetId, function (data) {
                $scope.asset = data;
            });
        }
        OrgAsset.getAssets(function (data) {
            $scope.assets = _.where(data, {selected: true});

        });

        $scope.nextAsset = function () {
            var index = $scope.assets.indexOf($scope.asset);
            if ($scope.assets[index + 1]) {
                $state.transitionTo('plan.organization.editAsset', {assetId: $scope.assets[index + 1].id, orgEntityId: $rootScope.orgEntityId});
            } else {
                $state.transitionTo('plan.organization.parties', { orgEntityId: $rootScope.orgEntityId});
            }
        };

        $scope.prevAsset = function () {
            var index = $scope.assets.indexOf($scope.asset);
            if ($scope.assets[index - 1]) {
                $state.transitionTo('plan.organization.editAsset', {assetId: $scope.assets[index - 1].id, orgEntityId: $rootScope.orgEntityId});
            } else {
                $state.transitionTo('plan.organization.activities', { orgEntityId: $rootScope.orgEntityId});
            }
        }
    });
