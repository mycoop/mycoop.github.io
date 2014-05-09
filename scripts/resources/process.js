angular.module('resources.process',[])
    .factory('Process', ['$http',function($http){
        var processes = [
            {name: 'Helicopter Launch Failure', description: 'The helicopter failed to launch.',
                location: 'Lansing, MI, USA', locationType: 'Program Area Location',
                '04h':'4', '524h':'4', '23d':'5', '1w': '6' },
            {name: 'Warehouse Electrical Failure', description: 'The utility company electrical services has failed.',
                location: 'Northeast USA, Southeast Asia, Australia, Brazil', locationType: 'Program Area Location',
                '04h':'5', '524h':'3', '23d':'5', '1w': '6'},
            {name: 'Warehouse Fire', description: 'A fire has started in warehouse.',
                location: 'JPMorgan Fire Response', locationType: 'Delivery Channel Name',
                '04h':'4', '524h':'5', '23d':'6', '1w': '7'},
            {name: 'Warehouse Flood', description: 'There is a flood of any kind in the Warehouse.',
                location: 'Worldwide', locationType: 'Program Area Location',
                '04h':'1', '524h':'1', '23d':'1', '1w': '1'},
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
