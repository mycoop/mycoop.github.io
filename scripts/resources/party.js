angular.module('resources.party', [])
    .factory('Party', ['$http', function ($http) {
        var parties = [
        ];
        var service = {
            getParties: function (callback) {
                callback(parties);
            },
            getParty: function (id, callback) {
                var res = _.findWhere(parties, {id: parseInt(id, 10)});
                callback(res);
            },
            addParty: function (party, callback) {
                party.id = parties.length > 0 ? _.max(parties, function (item) { return item.id;}).id + 1 : 1;
                parties.push(party);
                callback();
            }
        };
        return service;
    }]);
