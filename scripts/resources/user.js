angular.module('resources.user',[])
    .factory('User', ['$http',function($http){
//        James Cahit, Joe Smith, Anne Wilson, Jimmy Jones
        var users = [
            {id: '1', firstName: 'James', lastName: 'Cahit', username: 'jcahit', email: 'jcahit@mail.com', phone: '', dateAdded: new Date('5.14.2014')},
            {id: '2', firstName: 'Joe', restricted: true, lastName: 'Smith', username: 'jsmith', email: 'jsmith@mail.com', phone: '', dateAdded: new Date('5.2.2014')},
            {id: '3', firstName: 'Anne', lastName: 'Wilson', username: 'awilson', email: 'awilson@mail.com', phone: '', dateAdded: new Date('4.24.2014')},
            {id: '4', firstName: 'Jimmy', lastName: 'Jones', username: 'jjones', email: 'jjones@mail.com', phone: '', dateAdded: new Date('4.15.2014')},
        ];
        var service = {
            getUsers: function(callback){
                callback(users);
            },
            getUser: function(id, callback){
              callback(_.where(users, {id: id})[0]);
            },
            addUser: function(user, callback){
                user.dateAdded = new Date();
                users.push(user);
                callback();
            },
            updateUser: function(user, callback){
               users[users.indexOf(_.findWhere(users, {id: user.id}))] = user;
                callback();
            },
            deleteUser: function(user, callback){
                users.splice(users.indexOf(user),1);
                callback();
            }
        };
        return service;
    }]);
