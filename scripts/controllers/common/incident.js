angular.module('controllers.incident', []).
    controller('IncidentCtrl', function ($scope, $state, Incident) {


        $scope.facilityTypes = [
            {id: 1, name: 'Primary Facilities'},
            {id: 2, name: 'Recovery Sites'},
            {id: 3, name: 'Manufacturing'}
        ];

        $scope.incidentTypes = [
            {id: 1, name:'Fire'},
            {id: 2, name:'Biohazard/Pandemic'},
            {id: 3, name:'Inclement Weather'},
            {id: 4, name:'network Outage'}
        ];
        $scope.priorityTypes = [
            {id: 1, name: 'Low'},
            {id: 2, name: 'Medium'},
            {id: 3, name: 'High'}
        ];

        $scope.incident = {
            priorityType: $scope.priorityTypes[0],
            incidentType: $scope.incidentTypes[0],
            facilityType: $scope.facilityTypes[0],
        location:{}
        };

        $scope.save = function(){
//            $scope.incident.priorityTypeId =  $scope.incident.
//            var startTime = (new Date($scope.startDate)).setHours((new Date($scope.startTime).getHours()))
//            $scope.incident.startTime = (new Date($scope.startDate).setHours().toString();
            if($scope.form.$invalid){
                $scope.error = true;
            }
            else{
                if($scope.isFinished){
                    $scope.incident.duration = ((new Date($scope.incident.endTime)).getDate() - (new Date($scope.incident.startTime)).getDate());
                    console.log($scope.incident.duration);
                }

                $scope.incident.latitude = $scope.incident.location.lat;
                $scope.incident.longitude = $scope.incident.location.lng;
                $scope.incident.location = $scope.incident.address;
                Incident.addIncident($scope.incident, function(){
                    $state.go('dashboard.map');
                })
            }
        };

        $scope.dt = new Date();
        $scope.incident.startTime = $scope.dt;
        $scope.incident.endTime = $scope.dt;



        $scope.openStart = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.startTimeOpened = true;
        };

        $scope.openEnd = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.endTimeOpened = true;
        };


        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };




    });