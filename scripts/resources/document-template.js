angular.module('resources.document-template', [])
    .factory('DocumentTemplate', ['$http', function ($http) {
        var service = {
            getTemplates: function (callback) {
                $http.get('/api/document-template').success(callback);
//                callback([
//                    {
//                        reference: "MC00001",
//                        name:"ISO22031:2012 Gap Assessment",
//                        purpose:"To assess the level of compliance of an organisation against the ISO 22301 standard",
//                        pagesCount:"4 worksheets",
//                        sections:"All areas of the ISO22301 standard are covered"
//                    },
//                    {
//                        reference: "MC04001",
//                        name:"Business Continuity Context, Requirements and Scope",
//                        purpose:"To set out the organisational context of the BCMS. It describes what the organisation does, how it does it, what factors influence the way it operates and the reasons for the definition of the scope of the BCMS",
//                        pagesCount:"18",
//                        sections:"4.Context of the Organisation 4.1 Understanding of the  organisation and its context 4.2 Understanding the needs and expectations of interested parties 4.2.1 General 4.2.2 Legal and regulatory requirements 4.3 Determining the scope of the BCMS 4.3.1 General 4.3.2 Scope of the BCMS 4.4 Business continuity management system"
//                    },
//                    {
//                        reference: "MC04002",
//                        name:"Legal and Regulatory Requirements Procedure",
//                        purpose:"Describes how the applicable legal and regulatory requirements relevant to the BCMS will be identified, accessed, assessed, documented, maintained and communicated",
//                        pagesCount:"8",
//                        sections:"4. Context of the Organisation 4.2 Understanding the needs and expectations of interested parties 4.2.2 Legal and regulatory requirements"
//                    },
//                    {
//                        reference: "MC05001",
//                        name:"Business Continuity Policy",
//                        purpose:"The Business Continuity policy acts as the root “Quality Manual” of the Business Continuity Management System (BCMS) and must be approved by Top Management (defined as the “person or group of people who direct and control the organisation at the highest level”) as evidence of their commitment",
//                        pagesCount:"12",
//                        sections:"5.3 Policy"
//                    },
//                    {
//                        reference: "MC05002",
//                        name:"Roles, Responsibilities and Authorities",
//                        purpose:"To define the roles, responsibilities and authorities within the BCMS",
//                        pagesCount:"11",
//                        sections:"5.2 Management commitment 5.4 Organisational roles, responsibilities and authorities"
//                    }]);
            },
            getTemplate: function(id, callback){
                $http.get('/api/document-template/'+ id).success(callback);
            },
            updateTemplate: function(template, callback){
                $http.post('/api/document-template/' + template.id, template).success(callback);
            },
            deleteTemplate: function (id, callback) {
                $http.delete('/api/document-template/' + id).success(callback);
            }
        };
        return service;
    }]);
