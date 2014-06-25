angular.module('adminApp').
    controller('ResourceDirectoriesCtrl', function ($scope, $state) {
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

        $scope.act = function (d) {
            switch (d.name){
                case 'Employee Contacts':
                    $state.transitionTo('config.resources.employee');
                    break;
                case 'Additional Resources':
                    $state.transitionTo('config.resources.additional');
                    break;
            }
        }
    })
    .controller('EmployeeContactsCtrl', function ($scope) {
        $scope.getTableStyle = function () {
            var rowHeight = 30;
            var headerHeight = 32;
            return {
                height: ($scope.data.length * rowHeight + headerHeight) + "px"
            };
        };
        $scope.gridOptions = {
            data: 'data',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            columnDefs: [
                {field: 'name', displayName: 'Internal Field Name', enableCellEdit: false},
                {field: 'alias', displayName: 'Alias Field Name'},
                {field: 'status', displayName: 'Status', enableCellEdit: false, cellTemplate: '/views/templates/select-cell-template.html'}
            ]};

        $scope.statuses = [
            {name: 'Hidden'},
            {name: 'Optional'},
            {name: 'Required'}
        ];
        $scope.data = [
            {name: 'Employee ID', alias: '', status: $scope.statuses[2]},
            {name: 'First Name', alias: '', status: $scope.statuses[2]},
            {name: 'Last Name', alias: '', status: $scope.statuses[2]},
            {name: 'Job Title', alias: '', status: $scope.statuses[1]},
            {name: 'Department', alias: '', status: $scope.statuses[1]},
            {name: 'Sub Unit', alias: '', status: $scope.statuses[1]},
            {name: 'Business Email', alias: '', status: $scope.statuses[1]},
            {name: 'Business Phone', alias: '', status: $scope.statuses[1]},
            {name: 'Alternate Phone 1', alias: '', status: $scope.statuses[1]},
            {name: 'Alternate Phone 2', alias: '', status: $scope.statuses[1]},
            {name: 'Alternate Phone 3', alias: '', status: $scope.statuses[1]},
            {name: 'Alternate Email', alias: '', status: $scope.statuses[1]},
            {name: 'Work Address 1', alias: '', status: $scope.statuses[1]},
            {name: 'Work Address 1', alias: '', status: $scope.statuses[1]},
            {name: 'Work Building', alias: '', status: $scope.statuses[1]},
            {name: 'Work Floor', alias: '', status: $scope.statuses[1]},
            {name: 'Work City', alias: '', status: $scope.statuses[1]},
            {name: 'Work State', alias: '', status: $scope.statuses[1]},
            {name: 'Work Zip', alias: '', status: $scope.statuses[1]},
            {name: 'Work Province', alias: '', status: $scope.statuses[1]},
            {name: 'Work Country', alias: '', status: $scope.statuses[1]},
            {name: 'Language', alias: '', status: $scope.statuses[1]},
            {name: 'Custom 1', alias: '', status: $scope.statuses[0]}
        ];
    })
    .controller('AdditionalResourcesCtrl', function ($scope) {
        $scope.getTableStyle = function () {
            var rowHeight = 30;
            var headerHeight = 32;
            return {
                height: ($scope.data.length * rowHeight + headerHeight) + "px"
            };
        };
        $scope.gridOptions = {
            data: 'data',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEdit: true,
            columnDefs: [
                {field: 'id', displayName: 'SysID', enableCellEdit: false, width: 70},
                {field: 'name', displayName: 'Internal Field Name', enableCellEdit: false},
                {field: 'alias', displayName: 'Alias Field Name'},
                {field: 'status', displayName: 'Status', enableCellEdit: false, cellTemplate: '/views/templates/select-cell-template.html'}
            ]};

        $scope.statuses = [
            {name: 'Hidden'},
            {name: 'Optional'},
            {name: 'Required'}
        ];
        $scope.data = [
            {id: Math.round(Math.random() * 1000000), name: 'Laptops', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Fax machines', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Network PC\'s', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Landlines', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Internet Access', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Work Stations', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Work Vehicles', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Car Parking', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Specialized Equipment', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'External Suppliers', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Custom 1', alias: '', status: $scope.statuses[1]},
            {id: Math.round(Math.random() * 1000000), name: 'Custom 2', alias: '', status: $scope.statuses[1]}
        ];
    });
