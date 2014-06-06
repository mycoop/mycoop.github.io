angular.module('adminApp').
    controller('InterfaceConfigCtrl', function ($scope) {
        $scope.colorScheme = [
            {code: '#205081', title: 'Top Bar'},
            {code: '#ffffff', title: 'Top Bar Text'},
            {code: '#3b7fc4', title: 'Header Button Background'},
            {code: '#ffffff', title: 'Header Button Text'},
            {code: '#3b73af', title: 'Top Bar Menu  Background'},
            {code: '#ffffff', title: 'Top Bar Menu Selected Text'},
            {code: '#333333', title: 'Top Bar Menu Item Text'},
            {code: '#3b73af', title: 'Menu Item Selected Background'},
            {code: '#ffffff', title: 'Menu Item Selected Text'},
            {code: '#3b73af', title: 'Page Menu Selected Background'},
            {code: '#333333', title: 'Page Menu Item Text'},
            {code: '#333333', title: 'Heading Text'},
            {code: '#999999', title: 'Space Name Text'},
            {code: '#3b73af', title: 'Links'},
            {code: '#cccccc', title: 'Borders and Dividers'}
        ];
    });