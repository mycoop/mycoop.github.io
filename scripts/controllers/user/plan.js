angular.module('userApp')
    .controller('PlanCtrl', function ($scope, $rootScope, $state) {
        $rootScope.currentDocument = $rootScope.docs[1];
        $rootScope.currentISOArea = 'clause 4.1 Understanding of the Organization and its Context';
        $scope.organization = {
            name: 'Organization and its Context',
            state: $state.href('plan.organization'),
            items: [
                { name: 'Understanding Mission, Objectives, Values and Strategies', state: $state.href('plan.organization.mission') },
                { name: 'Analyse Organization Internal/External Environment', state: $state.href('plan.organization.analysis') },
                { name: 'Key Organization\'s Activities', state: $state.href('plan.organization.activities') },
                { name: 'Interested Parties', state: $state.href('plan.organization.parties') },
                { name: 'Legal and Regulatory Requirements', state: $state.href('plan.organization.legal') },
                { name: 'Potential Impact of Disruptive Incident', state: $state.href('plan.organization.impact') },
                { name: 'Business Polices and Objectives', state: $state.href('plan.organization.polices') },
                { name: 'Organizational Risk Appetite', state: '' },
                { name: 'Business Continuity Requirements and Objectives', state: '' },
                { name: 'BCMS Scope', state: '' }
            ]
        };

        $scope.leadership = {
            name: 'Leadership',
            state: $state.href('plan.leadership'),
            items: [
                { name: 'BCMS Business Case', state: '' },
                { name: 'Project Team', state: '' },
                { name: 'BCMS Objectives', state: '' },
                { name: 'Project Plan', state: '' },
                { name: 'Communications Plan for the BCMS Project', state: '' },
                { name: 'Management Approval', state: '' }
            ]
        };

        $scope.planning = {
            name: 'Planning',
            state: $state.href('plan.planning'),
            items: [
                { name: 'Actions to address risk and opportunities', state: ''},
                { name: 'Business Continuity Objectives and plans to achieve them', state: ''}
            ]
        };

        $scope.support = {
            name: 'Support',
            state: $state.href('plan.support'),
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
                    OrgAsset.addAsset({name: asset.name, selected: asset.selected}, function () {
                    });
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
    })
    .controller('InterestedPartiesCtrl', function ($scope) {
        $scope.isEdit = false;
        $scope.parties = [
            {
                name: 'Stakeholder 1',
                status: 'Internal',
                interestNature: '',
                degree: '',
                considerations: '',
                notes: '',
                selected: true
            },
            {
                name: 'Stakeholder 2',
                status: 'Internal',
                interestNature: '',
                degree: '',
                considerations: '',
                notes: ''
            },
            {
                name: 'Stakeholder 3',
                status: 'Internal',
                interestNature: '',
                degree: '',
                considerations: '',
                notes: ''
            },
            {
                name: 'Stakeholder 4',
                status: 'Internal',
                interestNature: '',
                degree: '',
                considerations: '',
                notes: ''
            }
        ];
        $scope.selectedItem = $scope.parties[0];

        $scope.addParty = function () {
            var newParty = {name: 'New stakeholder'};
            $scope.parties.push(newParty);
            $scope.selectedItem = newParty;
            $scope.isEdit = true;
        };

        $scope.deleteInterestedParty = function (item) {
            $scope.parties.remove(item);
            $scope.seletedItem = $scope.parties[0];
        };

    })
    .controller('PotentialImpactCtrl', function ($scope) {
        $scope.impacts = [
            {
                area: 'Loss of sales revenue',
                degree: 'Low',
                desc: ''
            },
            {
                area: 'Risk to life or health and safety grounds',
                degree: 'High',
                desc: ''
            },
            {
                area: 'Loss of reputation/customer confidence',
                degree: 'Low',
                desc: ''
            },
            {
                area: 'Inability to meet our legal obligations',
                degree: 'High',
                desc: ''
            },
            {
                area: 'Breach of contractual obligations',
                degree: 'Low',
                desc: ''
            },
            {
                area: 'Loss of business opportunity',
                degree: 'High',
                desc: ''
            }
        ]
    })
    .controller('PolicyDocumentCtrl', function ($scope, $modal) {

        $scope.showNewDocumentModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/new-policy-document.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        return '';
                    }
                }
            });

            modalInstance.result.then(function (params) {

            }, function () {
                console.log('success');
            });
        };

    })
    .controller('LegalCtrl', function ($scope, $state, $stateParams, $rootScope, Party) {
        $rootScope.currentISOArea = 'clause 4.2.2 Legal and Regulatory Requirements';

        if($stateParams.partyId){
            Party.getParty($stateParams.partyId, function(data){
                $scope.party = data;
            });
        }
        Party.getParties(function(data){
            $scope.parties = angular.copy(data);
        });
        $scope.addParty = function () {
            var newParty = {name: 'New item'};
            $scope.parties.push(newParty);
            $scope.selectedItem = newParty;
            $scope.isEdit = true;
            Party.addParty($scope.selectedItem);
        };
        $scope.editParty = function(party){
            $state.transitionTo('plan.organization.legal.editParty', {partyId: party.id});
        };
        $scope.save = function(){
        };
        $scope.deleteInterestedParty = function (item) {
            $scope.parties.remove(item);
            $scope.seletedItem = $scope.parties[0];
        };

    });