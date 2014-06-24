angular.module('adminApp').
    controller('PrintCenterCtrl', function ($scope, $timeout) {
        $scope.onFilterChange = function(){
            updateSortable();
        };
        $scope.statuses = [
            {name: 'Current'},
            {name: 'Not Current'},
            {name: 'Pending Approval'}
        ];
        $scope.locations = [
            {
                name: 'Location A',
                docs: [
                    {
                        status: $scope.statuses[0],
                        documentReference: "MC04001",
                        Title: "Business Continuity Context, Requirements and Scope",
                        Purpose: "To set out the organisational context of the BCMS. It describes what the organisation does, how it does it, what factors influence the way it operates and the reasons for the definition of the scope of the BCMS",
                        Pages: "18",
                        Sections: "4.Context of the Organisation 4.1 Understanding of the  organisation and its context 4.2 Understanding the needs and expectations of interested parties 4.2.1 General 4.2.2 Legal and regulatory requirements 4.3 Determining the scope of the BCMS 4.3.1 General 4.3.2 Scope of the BCMS 4.4 Business continuity management system"
                    },
                    {
                        status: $scope.statuses[2],
                        documentReference: "MC04002",
                        Title: "Legal and Regulatory Requirements Procedure",
                        Purpose: "Describes how the applicable legal and regulatory requirements relevant to the BCMS will be identified, accessed, assessed, documented, maintained and communicated",
                        Pages: "8",
                        Sections: "4. Context of the Organisation 4.2 Understanding the needs and expectations of interested parties 4.2.2 Legal and regulatory requirements"
                    }
                ]
            },
            {name: 'Location B',
                docs: [
                    {
                        status: $scope.statuses[0],
                        documentReference: "MC05001",
                        Title: "Business Continuity Policy",
                        Purpose: "The Business Continuity policy acts as the root “Quality Manual” of the Business Continuity Management System (BCMS) and must be approved by Top Management (defined as the “person or group of people who direct and control the organisation at the highest level”) as evidence of their commitment",
                        Pages: "12",
                        Sections: "5.3 Policy"
                    },
                    {
                        status: $scope.statuses[1],
                        documentReference: "MC05002",
                        Title: "Roles, Responsibilities and Authorities",
                        Purpose: "To define the roles, responsibilities and authorities within the BCMS",
                        Pages: "11",
                        Sections: "5.2 Management commitment 5.4 Organisational roles, responsibilities and authorities"
                    }
                ]},
            {name: 'Department 1',
                docs: [
                    {
                        status: $scope.statuses[0],
                        documentReference: "MC00001",
                        Title: "ISO22031:2012 Gap Assessment",
                        Purpose: "To assess the level of compliance of an organisation against the ISO 22301 standard",
                        Pages: "4 worksheets",
                        Sections: "All areas of the ISO22301 standard are covered"
                    }
                ]}
        ];
        function updateSortable(){
            $timeout(function(){
                $('.sortable').shapeshift();
            })
        }
        updateSortable();
    });