
angular.module('directives.location', []).
    directive('location', function ($timeout) {
        return {
            restrict: 'A',
            templateUrl: '/views/templates/location.html',
            scope: {
                address: '=',
                coords: '=',
                showMap: '='
            },
            link: function (scope, element, attributes) {
                scope.onMapClick = function(event){
                    scope.setMarker(event.latLng);
                };
                scope.toggleMap = function(){
                    scope.showMap = !scope.showMap;
                    $timeout(function(){
                        google.maps.event.trigger(scope.map,"resize");
                    }, 50);
                };
                var firstSet = 0;
                scope.setMarker = function(coords){
                    if(scope.marker){
                        scope.marker.setPosition(coords);
                    } else{
                        scope.marker = new google.maps.Marker({position: coords, map: scope.map});
                    }
                    scope.coords.lat = coords.lat();
                    scope.coords.lng = coords.lng();
                    scope.map.setCenter(coords);
//                    scope.map.setZoom(15);
                    console.log('marker set')
                };
                scope.$watch('coords', function(){
                    init();
                });
                function init (){
                    if (scope.coords.lat && scope.coords.lng) {
                        scope.setMarker(new google.maps.LatLng(scope.coords.lat, scope.coords.lng));
                    }
                }
                scope.findLocation = function(){
                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                            address : scope.address
                        },
                        function(results, status) {
                            if (status.toLowerCase() == 'ok') {
                                // Get center
                                var coords = new google.maps.LatLng(
                                    results[0]['geometry']['location'].lat(),
                                    results[0]['geometry']['location'].lng()
                                );


                                scope.setMarker(coords);

                            }
                        }
                    );
                };
            }
        }
    });
