
angular.module('filters', [])
    .filter('dotText', ['$rootScope', function ($rootScope) {
        return function (input) {
            var result = input;
            if(input.length > 40){
                result = input.slice(0, 40) + '...';
            }
            return result;
        };
    } ]);