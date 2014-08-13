angular.module('map', [])
    .factory('Map', function ($location, $q, SecurityService, $rootScope) {
        function Map(map){
            this.map = map;
            this.setCenter = function(lat, lng){

            };
            this.locate = function(address){

            };
            this.addMarker = function(){

            };
//            this.
        }
        return {
            init: function(map){
                return new Map(map);
            }
        };
        });
