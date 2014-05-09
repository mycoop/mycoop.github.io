'use strict';

angular.module('myCoopOnlineApp')
    .controller('BusinessProcessCtrl', function ($scope, $rootScope, Process) {
         Process.getProcesses(function(data){
             $scope.processes = data;
         })

    })
    .controller('BusinessProcessAddCtrl', function ($scope, $rootScope, Process, $state) {
        $scope.process = {
            name: '',
            description: '',
            location: 'Lansing, MI, USA'
        };

        $scope.save = function(){
            Process.addProcess($scope.process, function(){

                $state.transitionTo('impact.processes');
            })
        }
    });
