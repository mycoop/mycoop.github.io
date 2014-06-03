angular.module('resources.org-entity',[])
    .service('OrgEntity', function($http, $cookies){
        var entities =  [
            {
                id: 15,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: false, parent:  null,
                title: "Basic organization",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },
            {
                id: 103,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: true, parent:  null,
                title: "Your organization",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },
            {
                id: 1,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: true, parent:  103,
                title: "Business unit 1",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },
            {
                id: 2,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: false, parent:  103,
                title: "Business unit 2",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },

            {
                id: 3,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: true, parent:  103,
                title: "Location 1",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },

            {
                id: 4,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: true, parent:  103,
                title: "Location 2",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },

            {
                id: 5,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: false, parent:  1,
                title: "Department 1",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },

            {
                id: 6,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: false, parent:  2,
                title: "Department 2",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },

            {
                id: 7,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: true, parent:  3,
                title: "Department 3",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },

            {
                id: 8,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: true, parent:  4,
                title: "Accounting",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            },

            {
                id: 9,
                owner: 'Joe Smith', location: 'Lansing, MI, USA' ,  access: true, parent:  4,
                title: "Accounting 2",
                url: '#/home/admin',
                linkText: 'Staff',
                createdDate: 1400414718000,
                modifiedDate: 1400501118000
            }
        ];
        if($cookies.entities){
            entities = JSON.parse($cookies.entities);
        } else{
            $cookies.entities = JSON.stringify(entities);
        }
        var saveToCookies = function(){
            $cookies.entities = JSON.stringify(entities);
        };
        var service = {
            getEntities: function(callback){
//                setTimeout(function(){
                    callback(angular.copy(entities));
//                },10);
            },
            getEntity: function(id, callback){
                var result = _.findWhere(entities, {id: parseInt(id)});
                    callback(result);
            },
            addEntity: function(entity, callback){
                entities.push(entity);
                saveToCookies();
                callback();
            },
            deleteEntity: function(entity, callback){
                entities.splice(entities.indexOf(entity),1);
                saveToCookies();
                callback();
            }
        };
        return service;
    });
