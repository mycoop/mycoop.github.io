'use strict';

angular.module('myCoopOnlineApp')
    .controller('OrganizationCtrl', function ($scope, $rootScope, Process) {
        $scope.industries = [
            {name: 'Healthcare and Public Health'},
            {name: 'Financial Services'},
            {name: 'Chemical'},
            {name: 'Commercial Facilities'},
            {name: 'Communications'},
            {name: 'Manufacturing'},
            {name: 'Dams'},
            {name: 'Defense Industrial Base'},
            {name: 'Emergency Services'},
            {name: 'Energy'},
            {name: 'Food and Agricultural'},
            {name: 'Government Facilities'},
            {name: 'Information Technology'},
            {name: 'Nuclear reactors, Materials and Waste'},
            {name: 'Transportation Systems'},
            {name: 'Water and Wastewater Systems'}
        ];
        $scope.$watch('selectedIndustry', function(){
            if($scope.selectedIndustry)
           $scope.showStandarts = true;
        });
        $scope.licenses = [
            {type: 'Administrators', total: '3', used: '2', remaining: '1'},
            {type: 'Contributors (Planners / Content Managers)', total: '5', used: '2', remaining: '3'},
            {type: 'Readers', total: '15', used: '12', remaining: '3'},
            {type: 'Approvers', total: '6', used: '4', remaining: '2'},
        ]

    });