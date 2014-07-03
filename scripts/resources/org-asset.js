angular.module('resources.org-asset', [])
    .factory('OrgAsset', ['$http', function ($http) {
        var factors = [
            {id: 1, name: 'Products', selected: true, assetName: 'Product', desc: 'What are the goods produced by the Organization?', items: [{name: '', desc: ''}] },
            {id: 2, name: 'Services', selected: true, assetName: 'Service', desc: 'What are the services offered by the Organization?', items: [{name: '', desc: ''}] },
            {id: 3, name: 'Activities or Business Processes', assetName:'Asset', selected: true, desc: 'Identify Assets and their description', items: [{name: '', desc: ''}] }
        ];
        var service = {
            getAssets: function (callback) {
                callback(factors);
            },
            getAsset: function (id, callback) {
                var res = _.findWhere(factors, {id: parseInt(id, 10)});
                callback(res);
            },
            addAsset: function (asset, callback) {
                asset.id = _.max(factors, function (item) { return item.id;}).id + 1;
                asset.desc = 'Identify Assets and their description';
                asset.items = [{name: '', desc: ''}];
                asset.assetName = 'Asset';
                factors.push(asset);
                callback();
            }
        };
        return service;
    }]);
