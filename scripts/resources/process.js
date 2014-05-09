angular.module('resources.process',[])
    .factory('Process', ['$http',function($http){
        var processes = [
            {name: 'Helicopter Launch Failure', description: 'The helicopter failed to launch.',
                location: 'Lansing, MI, USA', locationType: 'Program Area Location'},
            {name: 'Warehouse Electrical Failure', description: 'The utility company electrical services has failed.',
                location: 'Northeast USA, Southeast Asia, Australia, Brazil', locationType: 'Program Area Location'},
            {name: 'Warehouse Fire', description: 'A fire has started in warehouse.',
                location: 'JPMorgan Fire Response', locationType: 'Delivery Channel Name'},
            {name: 'Warehouse Flood', description: 'There is a flood of any kind in the Warehouse.',
                location: 'Worldwide', locationType: 'Program Area Location'},
        ];
        var service = {
            getProcesses: function(callback){
                callback(processes);
            },
            addProcess: function(process, callback){
                processes.push(process);
                callback();
            }
        };
        return service;
    }]);

