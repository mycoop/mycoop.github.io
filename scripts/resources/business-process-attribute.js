angular.module('resources.business-process-attribute', [])
    .factory('BusinessProcessAttribute', function ($http) {
        var service = {
            getAttributes: function (callback) {
                $http.get('/api/business-process-attribute').success(callback);
            },
            addAttribute: function (attribute, callback) {
                $http.post('/api/business-process-attribute', attribute).success(callback);
            },
            updateAttribute: function (attribute, callback) {
                $http.post('/api/business-process-attribute/'+attribute.id, attribute).success(callback);
            },
            deleteAttribute: function (id, callback) {
                $http.delete('/api/business-process-attribute/' + id).success(callback);
            },
            getAttributeTypes: function (callback) {
                $http.get('/api/attribute-type').success(callback);
            },
            addAttributeType: function (attributeType, callback) {
                $http.post('/api/attribute-type', attributeType).success(callback);
            },
            updateAttributeType: function (attributeType, callback) {
                $http.post('/api/attribute-type/' + attributeType.id, attributeType).success(callback);
            },
            deleteAttributeType: function (id, callback) {
                $http.delete('/api/attribute-type/' + id).success(callback);
            }
        };
        return service;
    });
