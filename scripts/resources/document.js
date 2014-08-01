angular.module('resources.document',[])
    .factory('Document', ['$http',function($http){
        var service = {
            getDocuments: function(callback){
                $http.get('/api/document').success(callback);
            },
            addDocument: function(document, callback){
                $http.post('/api/document', document).success(callback);
            },
            searchAndReplace: function(fileId, search, replace, callback){
                $http.post('/api/searchandreplace/?fileId='+fileId, {SearchStatement: search, ReplaceStatement: replace}).success(callback);
            }
        };
        return service;
    }]);
