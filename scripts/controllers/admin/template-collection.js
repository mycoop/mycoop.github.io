'use strict';

angular.module('adminApp')
    .controller('TemplateCollectionCtrl', function ($scope, $modal, $rootScope) {
        $scope.moreDetails = function(){
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/more-details.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        var item =  $scope.datasource[$scope.selectedSlide];
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
            var item =  $scope.datasource[$scope.selectedSlide];
            if(!_.contains($scope.templates, item)){
                $scope.templates.push(item);
                $scope.yourTemplatesSlides.push({
                    image: '/../../images/fileicon.png',
                    name: item.documentReference,
                    text: item.Title,
                    data: item
                });

            } else  {
                showError('This item is already in your template collection.')
            }
        }

        function showError(message){
            var modalInstance = $modal.open({
                templateUrl: 'views/templates/error.html',
                controller: 'ErrorModalCtrl',
                resolve: {
                    message: function () {
                        return message;
                    }
                }
            });

            modalInstance.result.then(function () {
                console.log('Error ok');
            }, function () {
                console.log('success');
            });
        }
        $scope.templates = [];

        $scope.selectedSlide = 0;

        $scope.myInterval = -1;
        var slides = $scope.slides = [];
        $scope.yourTemplatesSlides = [];
        $scope.addSlide = function(i) {
            slides.push({
                image: '/../../images/fileicon.png',
                name: $scope.datasource[i].reference,
                text: $scope.datasource[i].name,
                data: $scope.datasource[i]
            });
        };
        for (var i=0; i<$scope.datasource.length; i++) {
            $scope.addSlide(i);
        }
    });