angular.module('controllers.incident', []).
    controller('IncidentCtrl', function ($scope, $state, $stateParams, Incident, $filter) {

        $scope.isFinished = false;
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

        if($stateParams.id){
            $scope.isEdit = true;
            Incident.getIncident($stateParams.id, function(data){
                data.incidentType = _.findWhere($scope.incidentTypes, {id: data.type});
                data.priorityType = _.findWhere($scope.priorityTypes, {id: data.priority});
                data.facilityType = _.findWhere($scope.facilityTypes, {id: data.facilityType});
                data.endTime = new Date(new Date(data.startTime).getTime() + data.duration);
                $scope.isFinished = data.duration ? true : false;
                $scope.incident = data;
            });
        }

        $scope.save = function(){
//            $scope.incident.priorityTypeId =  $scope.incident.
//            var startTime = (new Date($scope.startDate)).setHours((new Date($scope.startTime).getHours()))
//            $scope.incident.startTime = (new Date($scope.startDate).setHours().toString();
            if($scope.form.$invalid){
                $scope.error = true;
            }
            else{
                $scope.incident.type = $scope.incident.incidentType.id;
                $scope.incident.priority = $scope.incident.priorityType.id;
                $scope.incident.facilityType = $scope.incident.facilityType.id;
                $scope.incident.startTime = $filter('date')($scope.incident.startTime, 'yyyy-MM-dd HH:mm:ss Z');
//                $scope.incident.duration = (new Date($scope.endTime)) - (new Date($scope.startTime));
                if($scope.isFinished){
                    $scope.incident.duration = ((new Date($scope.incident.endTime)).getTime() - (new Date($scope.incident.startTime)).getTime());
                    console.log($scope.incident.duration);
                }
                if($scope.isEdit){
                    $scope.incident.duration = $scope.isFinished ? $scope.incident.duration : 0;
                    Incident.updateIncident($scope.incident, function(){
                        $state.go('dashboard.map');
                    });
                } else{
                    Incident.addIncident($scope.incident, function(){
                        $state.go('dashboard.map');
                    });
                }
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