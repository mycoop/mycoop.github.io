'use strict';
function CarouselDemoCtrl($scope) {
    $scope.myInterval = -1;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length;
        slides.push({
            image: '/../../my-coop/images/fileicon.png',
            name: 'MC04001',
            text: 'Business Continuity Context, Requirements and Scope'
        });
    };
    for (var i=0; i<4; i++) {
        $scope.addSlide();
    }
}