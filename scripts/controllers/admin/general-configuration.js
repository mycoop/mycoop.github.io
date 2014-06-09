angular.module('adminApp').
    controller('GeneralConfigCtrl', function ($scope) {
       $scope.contactMessage = 'Please, enter the information about your request for the site administrators.' +
        'If you are reporting an error, please be sure you include the infomation on what you were doing and' +
        'the time the problem occurred.'
        $scope.format = {
            encoding: 'UTF-8',
            time: 'hh:mm a',
            dateTime: 'MMM dd, yyyy HH:mm',
            date: 'MMM dd, yyyy',
            longNumber: '##################'
        };

        $scope.currentDate = new Date();

        $scope.languages = [
            {name: 'Deutsch (Deutschland)'},
            {name: 'English (United Kingdom)'},
            {name: 'Español (España)'},
            {name: 'Français (France)'},
            {name: '日本語 (日本)'}
        ];

        $scope.defaultLanguage = $scope.languages[1];
    });