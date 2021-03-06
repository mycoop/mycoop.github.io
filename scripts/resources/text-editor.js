angular.module('resources.textEditor', [])
    .factory('TextEditor', ['$http', function ($http) {
        var service = {
            getConfig: function (fileId, callback) {
                $http.get('/office/webeditor.ashx?type=get&fileName=' +  encodeURIComponent(fileId)).success(callback);
                //  callback({validateKey: '12321321'})
            },
            searchAndReplace: function (fileId, search, replace, callback) {
                $http.post('/api/searchandreplace/?fileId=' + fileId, {SearchStatement: search, ReplaceStatement: replace}).success(callback);
            }
        };
        return service;
    }]);
