angular.module('userApp')
    .controller('SelectAnalysisCtrl', function($scope, $state){
        $scope.analysisType = 'swot';
        $scope.goToAnalysis= function(){
            $state.transitionTo('plan.organization.' + $scope.analysisType);
        }
    })
    .controller('PestAnalysisCtrl', function ($scope) {
        $scope.political = [
            {content: 'New federal and state tax polices affecting accounting'},
            {content: 'New employment laws affecting HR and employee handbook'}

        ];
        $scope.economic = [
            {content: 'Domestic and international economic growth'}
        ];
        $scope.social = [
            {content: 'Population growth rates'}
        ];
        $scope.technological = [
            {content: 'R&D activity'}
        ];

        $scope.addRow = function (section) {
            switch (section) {
                case 1:
                    $scope.political.push({content: ''});
                    break;
                case 2:
                    $scope.economic.push('');
                    break;
                case 3:
                    $scope.social.push('');
                    break;
                case 4:
                    $scope.technological.push('');
                    break;
            }
        };

        $scope.deleteRow = function (row, section) {
            switch (section) {
                case 1:
                    $scope.political.remove(row);
                    break;
                case 2:
                    $scope.economic.remove(row);
                    break;
                case 3:
                    $scope.social.remove(row);
                    break;
                case 4:
                    $scope.technological.remove(row);
                    break;
            }
        }
    })
    .controller('FiveForcesCtrl', function ($scope, $modal) {
        $scope.showForceStatusModal = function (power) {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/force-status.html',
                controller: 'ForceStatusCtrl',
                resolve: {
                    force: function () {
                        return power;
                    },
                    statuses: function(){
                        return $scope.statuses;
                    }
                }
            });

            modalInstance.result.then(function (status) {
                $scope.changeStatus(power, status.id);
            }, function () {
                console.log('success');
            });
        };

        $scope.statuses = {
            high: {name: 'HIGH', id: 3},
            moderate: {name: 'MODERATE', id: 2},
            low: {name: 'LOW', id: 1}
        };
        $scope.powers = {
            suppliers: {
                name: 'Bargaining power Suppliers',
                status: $scope.statuses.high,
                items: [
                    {content: 'Many suppliers'},
                    {content: 'Many alternatives for suppliers'},
                    {content: 'Low switching cost'}
                ]
            },
            byers: {
                name: 'Bargaining power Buyers',
                status: $scope.statuses.high,
                items: [
                    {content: 'Very low switching cost'},
                    {content: 'Very low loyalty'},
                ]
            },
            barriers: {
                name: 'Barriers to entry',
                status: $scope.statuses.moderate,
                items: [
                    {content: 'No regulations'},
                    {content: 'Easy to enter as local player'},
                    {content: 'High operating cost, but low cost of entry'},
                    {content: 'Big learning curve'}
                ]
            },
            threat: {
                name: 'Threat of  substitutes',
                status: $scope.statuses.low,
                items: [
                    {content: 'Many substitutes'},
                    {content: 'High segmentation'},
                    {content: 'High localization'}
                ]
            },
            rivalry: {
                name: 'Competition/Rivalry'
            }
        };

        function calcRivalryStatus(){
            var sum = $scope.powers.suppliers.status.id + $scope.powers.byers.status.id +
                $scope.powers.barriers.status.id + $scope.powers.threat.status.id;
            var statusId = Math.round(sum/4);
            $scope.powers.rivalry.status = _.findWhere($scope.statuses, {id: statusId});
        }

        $scope.changeStatus = function(power, statusId){
            power.status = _.findWhere($scope.statuses, {id: statusId});
            calcRivalryStatus();
        };

        $scope.addRow = function (section) {
            switch (section) {
                case 1:
                    $scope.powers.suppliers.items.push({content: ''});
                    break;
                case 2:
                    $scope.powers.byers.items.push({content: ''});
                    break;
                case 3:
                    $scope.powers.barriers.items.push({content: ''});
                    break;
                case 4:
                    $scope.powers.threat.items.push({content: ''});
                    break;
            }
        };

        $scope.deleteRow = function (row, section) {
            switch (section) {
                case 1:
                    $scope.powers.suppliers.items.remove(row);
                    break;
                case 2:
                    $scope.powers.byers.items.remove(row);
                    break;
                case 3:
                    $scope.powers.barriers.items.remove(row);
                    break;
                case 4:
                    $scope.powers.threat.items.remove(row);
                    break;
            }
        }
    })
    .controller('SwotAnalysisCtrl', function ($scope) {

        $scope.strengths = [
            {content: 'Fast return on investment'},
            {content: 'Will shorten something'}
        ];
        $scope.weaknesses = [
            {content: 'some content'}
        ];
        $scope.opportunities = [
            {content: 'some content'}
        ];
        $scope.threats = [
            {content: 'some content'}
        ];
        $scope.addRow = function (section) {
            switch (section) {
                case 1:
                    $scope.strengths.push({content: ''});
                    break;
                case 2:
                    $scope.weaknesses.push({content: ''});
                    break;
                case 3:
                    $scope.opportunities.push({content: ''});
                    break;
                case 4:
                    $scope.threats.push({content: ''});
                    break;
            }
        };

        $scope.deleteRow = function (row, section) {
            switch (section) {
                case 1:
                    $scope.suppliers.items.remove(row);
                    break;
                case 2:
                    $scope.byers.items.remove(row);
                    break;
                case 3:
                    $scope.barriers.items.remove(row);
                    break;
                case 4:
                    $scope.threat.items.remove(row);
                    break;
            }
        }
    })
    .controller('ForceStatusCtrl', function ($scope, $modalInstance, force, statuses) {
        $scope.force = angular.copy(force);
        $scope.statuses = statuses;
        $scope.force.status = _.findWhere(statuses, {id: $scope.force.status.id})
        $scope.ok = function () {
            $modalInstance.close($scope.force.status);
        };
    });