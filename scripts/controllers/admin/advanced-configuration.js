angular.module('adminApp').
    controller('AdvancedConfigCtrl', function ($scope) {
        $scope.directories = [
            {name: 'Employee Contacts', action: '', recordCount: 0, standard: 'All', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Business Location', action: '', recordCount: 0, standard: 'All', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Business Activities', action: '', recordCount: 0, standard: 'All', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Vendors', action: '', recordCount: 0, standard: 'All', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'External Partners', action: '', recordCount: 0, standard: 'Optional', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Applications', action: '', recordCount: 0, standard: 'All', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Additional Resources', action: '', recordCount: 0, standard: 'ISO 22301', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Communications', action: '', recordCount: 0, standard: 'FEMA', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Customers', action: '', recordCount: 0, standard: 'Optional', modifiedBy: 'Userid1', dateModified: new Date()},
            {name: 'Hardware/Equipment', action: '', recordCount: 0, standard: 'All', modifiedBy: 'Userid1', dateModified: new Date()}
        ];

    });