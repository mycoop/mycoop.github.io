angular.module('services.workflow', [])
    .factory('Workflow', function () {
        var service = {
            currentItem: {},
            currentIndex: 0,
            nextItem:{},
            previousItem: {},
            config: [],
            next: function(){
                if(this.config[currentIndex+1]){
//                    return this.
                }
            }
        };

        return service;
    });
