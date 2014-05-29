'use strict';

angular.module('myCoopOnlineApp')
    .controller('TemplateCollectionCtrl', function ($scope, $modal, $rootScope) {
        $scope.moreDetails = function(){
            var modalInstance = $modal.open({
                templateUrl: 'views/templates/more-details.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        var item =  _.findWhere(slides, {active: true}).data;
                        return {text: item.Purpose, title: item.Title};
                    }
                }
            });

            modalInstance.result.then(function () {
                addToTemplates();
            }, function () {
                console.log('success');
            });
        };

        function addToTemplates(){
            var item = _.findWhere(slides, {active: true}).data;
            if(!_.contains($scope.templates, item)){
                $scope.templates.push(item);

            }
        }

        $scope.templates = [];
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

        $scope.myInterval = -1;
        var slides = $scope.slides = [];
        $scope.addSlide = function(i) {
            slides.push({
                image: '/../../my-coop/images/fileicon.png',
                name: $scope.datasource[i].documentReference,
                text: $scope.datasource[i].Title,
                data: $scope.datasource[i]
            });
        };
        for (var i=0; i<$scope.datasource.length; i++) {
            $scope.addSlide(i);
        }
    });