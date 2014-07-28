angular.module('resources.textEditor',[])
    .factory('TextEditor', ['$http',function($http){
        var service = {
           getConfig: function(fileId, callback){
//               $http.get('/api/editor?'+fileId).success(callback);
               callback({validateKey: '12321321'})
           }
        };
        return service;
    }]);
