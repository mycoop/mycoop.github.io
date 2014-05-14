
angular.module('myCoopOnlineApp').
controller('orgChartCtrl', function ($scope) {

    var options = new primitives.orgdiagram.Config();

    var items = [
        new primitives.orgdiagram.ItemConfig({
            id: 0,
            parent: null,
            title: "Your organization",
//            description: "VP, Public Sector",
        }),
        new primitives.orgdiagram.ItemConfig({
            id: 1,
            parent: 0,
            title: "Business unit 1",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),
        new primitives.orgdiagram.ItemConfig({
            id: 2,
            parent: 0,
            title: "Business unit 2",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),

        new primitives.orgdiagram.ItemConfig({
            id: 3,
            parent: 0,
            title: "Location 1",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),

        new primitives.orgdiagram.ItemConfig({
            id: 4,
            parent: 0,
            title: "Location 2",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),

        new primitives.orgdiagram.ItemConfig({
            id: 5,
            parent: 1,
            title: "Department 1",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),

        new primitives.orgdiagram.ItemConfig({
            id: 6,
            parent: 2,
            title: "Department 2",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),

        new primitives.orgdiagram.ItemConfig({
            id: 7,
            parent: 3,
            title: "Department 3",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),

        new primitives.orgdiagram.ItemConfig({
            id: 8,
            parent: 3,
            title: "Accounting",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),

        new primitives.orgdiagram.ItemConfig({
            id: 8,
            parent: 4,
            title: "Accounting",
//            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
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