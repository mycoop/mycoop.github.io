'use strict';

angular.module('myCoopOnlineApp')
    .controller('BusinessProcessCtrl', function ($scope, $rootScope, Process) {
        $scope.gridData = []
        function updateProcesses() {
            Process.getProcesses(function(data){
                $scope.processes = data;

            });
        }
        updateProcesses();
        $scope.gridOptions = { data: 'processes',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true ,
            headerRowTemplate: 'headerRow',
            columnDefs: [
                {field: 'name', displayName: 'Name', width: '20%'},
                {field: 'description', displayName: 'Description', width: '20%'},
                {field: 'location', displayName: 'Location', enableCellEdit: false, width: '20%'},
                {field: '04h', displayName: '0-4h', width: '10%'},
                {field: '524h', displayName: '5-24h',  width: '10%'},
                {field: '23d', displayName: '2-3 days', width: '10%'},
                {field: '1w', displayName: '1 week',  width: '10%'}
            ]};


        $scope.clone = function(process){
            var newProcess = angular.copy(process);
            delete newProcess.location;
            delete newProcess.locationType;
            Process.addProcess(newProcess, function(){
                updateProcesses();
            })
        };
        $scope.delete = function(process){
            if(process.isDeleting){
                Process.deleteProcess(process, function(){
                    updateProcesses();
                })
            } else{
                process.isDeleting = true;
            }
        };
        $scope.bulkUpdate = function(){
            $scope.isBulkUpdating = true;
        };

        $scope.saveBulkUpdate = function(){
            $scope.isBulkUpdating = false;
        }
    })
    .controller('BusinessProcessAddCtrl', function ($scope, $rootScope, Process, $state) {
        $scope.process = {
            name: '',
            description: '',
            location: 'Lansing, MI, USA'
        };

        $scope.save = function(){

            $scope.process.locationType = 'Program Area Location';
            Process.addProcess($scope.process, function(){
                $state.transitionTo('impact.processes');
            })
        }
        $scope.cancel = function(){
            $state.transitionTo('impact.processes');
        }
    });
