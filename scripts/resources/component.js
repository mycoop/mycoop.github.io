angular.module('resources.component', [])
    .factory('Component', function ($http) {
        var service = {
            getComponents: function (callback) {
                $http.get('/api/component').success(callback);
            },
            getComponent: function (id, callback) {
                $http.get('/api/component/' + id).success(callback);
            },
            addComponent: function (component, callback) {
                $http.post('/api/component/', component).success(callback);
            },
            updateComponent: function (component, callback) {
                $http.post('/api/component/' + component.id, component).success(callback);
            },
            deleteComponent: function (componentId, callback) {
                $http.delete('/api/component/' + componentId).success(callback);
            }
        };
        return service;
    });
