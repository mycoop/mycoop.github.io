
angular.module('directives.location', []).
    directive('location', function () {
        return {
            restrict: 'A',
            templateUrl: '/views/templates/location.html',
            scope: {
                address: '=',
                coords: '='
            },
            link: function (scope, element, attributes) {
                scope.onMapClick = function(event){
                    scope.setMarker(event.latLng);
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
                    scope.map.setZoom(15);
                    console.log('marker set')
                };
                scope.$watch('coords', function(){
                    if (scope.coords.lat && scope.coords.lng) {
                        scope.setMarker(new google.maps.LatLng(scope.coords.lat, scope.coords.lng));
                    }
                });
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
