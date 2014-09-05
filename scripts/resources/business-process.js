angular.module('resources.business-process', [])
    .factory('BusinessProcess', function ($http) {
        var service = {
            getBusinessProcesses: function (callback) {
                $http.get('/api/business-process').success(callback);
            },
            getBusinessProcess: function (id, callback) {
                $http.get('/api/business-process/' + id).success(callback);
            },
            addBusinessProcess: function (businessProcess, callback) {
                $http.post('/api/business-process/', businessProcess).success(callback);
            },
            updateBusinessProcess: function (businessProcess, callback) {
                $http.post('/api/business-process/' + businessProcess.id, businessProcess).success(callback);
            },
            deleteBusinessProcess: function (businessProcessId, callback) {
                $http.delete('/api/business-process/' + businessProcessId).success(callback);
            },
            getAttributes: function (id, callback) {
                $http.get('/api/business-process/' + id + '/attribute/').success(callback);
            },
            addAttribute: function (processId, attributeId, callback) {
                $http.post('/api/business-process/' + processId + '/attribute/' + attributeId, {}).success(callback);
            },
            deleteAttribute: function (processId, attributeId, callback) {
                $http.delete('/api/business-process/' + processId + '/attribute/' + attributeId).success(callback);
            }
        };
        return service;
    });
