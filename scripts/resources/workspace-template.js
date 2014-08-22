angular.module('resources.workspace-template', [])
    .factory('WorkspaceTemplate', ['$http', function ($http) {
        var service = {
            getTemplates: function (callback) {
                $http.get('/api/workspace-template').success(callback);
            },
            getTemplate: function (id, callback) {
                $http.get('/api/workspace-template/' + id).success(callback);
            },
            addTemplate: function (template, callback) {
                $http.post('/api/workspace-template', template).success(callback);
            },
            updateTemplate: function(template, callback){
                $http.post('/api/workspace-template/' + template.id, template).success(callback);
            },
            deleteTemplate: function (id, callback) {
                $http.delete('/api/workspace-template/' + id).success(callback);
            },
            getDocumentTemplates: function(id, callback){
                $http.get('/api/workspace-template/'+id+'/document-template/').success(callback);
            },
            addDocumentTemplate: function(workspaceId, documentId, callback){
                $http.post('/api/workspace-template/' + workspaceId + '/document-template/' + documentId).success(callback);
            },
            removeDocumentTemplate: function(workspaceId, documentId, callback){
                $http.delete('/api/workspace-template/' + workspaceId + '/document-template/' + documentId).success(callback);
            }
        };
        return service;
    }]);
