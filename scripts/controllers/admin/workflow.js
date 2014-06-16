angular.module('adminApp')
    .controller('AssignmentsCtrl', function($scope, User){

        $scope.tasks = [
            {
                area:'Department 1',
                title: 'Business Impact Analysis',
                details: 'This report identifies the key business continuity requirements for each critical business activity',
                deadline: new Date().setDate((new Date()).getDate() + 5),
                scheduledDate: new Date().setDate((new Date()).getDate() + 6),
                status: 'gold'
            },
            {
                area:'Department 3',
                title: 'Risk Assessment Report',
                details: 'This report provides evidence of the systematic assessment of risks to the organisation’s prioritised activities and the processes, systems, information, people, assets, outsource partners and other resources that support them',
                deadline: new Date().setDate((new Date()).getDate() + 5),
                scheduledDate: new Date().setDate((new Date()).getDate() + 6),
                status: 'bronze'
            },
            {
                area:'Location B',
                title: 'Business Continuity Plan',
                details: 'The Business Continuity Plan sets out in detail how a particular strategy will be implemented in order to meet the defined requirements. It is intended to be used at the point at which an incident has occurred.',
                deadline: new Date().setDate((new Date()).getDate() + 5),
                scheduledDate: new Date().setDate((new Date()).getDate() + 6),
                status: 'silver'
            }
        ];
        User.getUsers(function(data){
            $scope.tasks[0].user = data[0];
            $scope.tasks[1].user = data[1];
            $scope.tasks[2].user = data[2];
        });
    })
    .controller('WorkflowCtrl', function ($scope, User) {

        $scope.datasource = [
            {
                documentReference: "MC00001",
                Title:"ISO22031:2012 Gap Assessment",
                Purpose:"To assess the level of compliance of an organisation against the ISO 22301 standard",
                Pages:"4 worksheets",
                Sections:"All areas of the ISO22301 standard are covered"
            },
            {
                documentReference: "MC04001",
                Title:"Business Continuity Context, Requirements and Scope",
                Purpose:"To set out the organisational context of the BCMS. It describes what the organisation does, how it does it, what factors influence the way it operates and the reasons for the definition of the scope of the BCMS",
                Pages:"18",
                Sections:"4.Context of the Organisation 4.1 Understanding of the  organisation and its context 4.2 Understanding the needs and expectations of interested parties 4.2.1 General 4.2.2 Legal and regulatory requirements 4.3 Determining the scope of the BCMS 4.3.1 General 4.3.2 Scope of the BCMS 4.4 Business continuity management system"
            },
            {
                documentReference: "MC04002",
                Title:"Legal and Regulatory Requirements Procedure",
                Purpose:"Describes how the applicable legal and regulatory requirements relevant to the BCMS will be identified, accessed, assessed, documented, maintained and communicated",
                Pages:"8",
                Sections:"4. Context of the Organisation 4.2 Understanding the needs and expectations of interested parties 4.2.2 Legal and regulatory requirements"
            },
            {
                documentReference: "MC05001",
                Title:"Business Continuity Policy",
                Purpose:"The Business Continuity policy acts as the root “Quality Manual” of the Business Continuity Management System (BCMS) and must be approved by Top Management (defined as the “person or group of people who direct and control the organisation at the highest level”) as evidence of their commitment",
                Pages:"12",
                Sections:"5.3 Policy"
            },
            {
                documentReference: "MC05002",
                Title:"Roles, Responsibilities and Authorities",
                Purpose:"To define the roles, responsibilities and authorities within the BCMS",
                Pages:"11",
                Sections:"5.2 Management commitment 5.4 Organisational roles, responsibilities and authorities"
            }];


        $scope.today = function() {
            $scope.dt = new Date();
            $scope.dt2 = new Date();
        };
        $scope.today();
        $scope.selected = undefined;

        User.getUsers(function(data){
           $scope.users = data;
        });
        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };


        $scope.open2 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened2 = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.format2 = $scope.formats[0];
    });