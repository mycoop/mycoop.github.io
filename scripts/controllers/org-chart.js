
angular.module('myCoopOnlineApp').
controller('orgChartCtrl', function ($scope) {

    var options = new primitives.orgdiagram.Config();

    var items = [
        new primitives.orgdiagram.ItemConfig({
            id: 0,
            parent: null,
            title: "Scott Aasrud",
            description: "VP, Public Sector",
            image: "demo/images/photos/a.png"
        }),
        new primitives.orgdiagram.ItemConfig({
            id: 1,
            parent: 0,
            title: "Ted Lucas",
            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),
        new primitives.orgdiagram.ItemConfig({
            id: 2,
            parent: 0,
            title: "Joao Stuger",
            description: "Business Solutions, US",
            image: "demo/images/photos/c.png"
        })
    ];

    options.items = items;
    options.cursorItem = 0;
    options.hasSelectorCheckbox = primitives.common.Enabled.True;

    $scope.options = options;

    $scope.setCursorItem = function (cursorItem) {
        $scope.options.cursorItem = cursorItem;
    };

}).directive('ngChart', function () {
    return {
        link: function (scope, element, attrs) {
            var chart = null;

            scope.$watch(attrs.ngModel, function (options) {
                if (!chart) {
                    chart = jQuery(element).orgDiagram(scope[attrs.ngModel]);
                } else {
                    chart.orgDiagram(scope[attrs.ngModel]);
                    chart.orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
                }
            }, true);
        }
    };
});