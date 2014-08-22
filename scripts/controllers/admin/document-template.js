'use strict';

angular.module('adminApp')
    .controller('DocumentTemplateCtrl', function ($scope, DocumentTemplate, Component, Modal) {

        Component.getComponents(function (data) {
            $scope.components = data;
        });

        $scope.deleteTemplate = function(template){
            Modal.openYesNoModal('Warning!', 'Are you sure want to delete template \"' + template.name + '\"?', function(){
               DocumentTemplate.deleteTemplate(template.id, function(){
                   $scope.refreshTemplates();
               }) ;
            });
        };

        $scope.selectedSlide = 0;

        $scope.myInterval = -1;
        var slides = $scope.slides = [];
        $scope.yourTemplatesSlides = [];
        $scope.addSlide = function (i) {
            slides.push({
                image: '/../../images/fileicon.png',
                name: $scope.datasource[i].reference,
                text: $scope.datasource[i].name,
                data: $scope.datasource[i]
            });
        };
        $scope.refreshTemplates = function (){
            DocumentTemplate.getTemplates(function (data) {
                $scope.datasource = data;
                for (var i = 0; i < $scope.datasource.length; i++) {
                    $scope.addSlide(i);
                }
            });
        };
        $scope.refreshTemplates();

    })
    .controller('DocumentTemplateEditCtrl', function ($scope, $state, $stateParams, $upload, Modal, DocumentTemplate, Component) {
        $scope.progress = 0;

        $scope.deleteTemplate = function(){
            Modal.openYesNoModal('Warning!', 'Are you sure want to delete template \"' + $scope.template.name + '\"?', function(){
                DocumentTemplate.deleteTemplate($scope.template.id, function(){
                    $state.go('^', {}, {reload: tr});
                }) ;
            });
        };

        Component.getComponents(function (components) {
            $scope.components = components;
            if ($stateParams.id) {
                $scope.isEdit = true;
                DocumentTemplate.getTemplate($stateParams.id, function (data) {
                    $scope.template = data;
                    $scope.component = _.findWhere($scope.components,{id: data.componentId});
                });
            }
        });

        $scope.onComponentSelect = function(){
//            alert( $scope.component.id);
            $scope.template.componentId = $scope.component.id;
        };

        function doUpload(){
            $scope.isSaving = true;
            $scope.upload = $upload.upload({
                url: '/api/document-template', //upload.php script, node.js route, or servlet url
                method: 'POST',
                //headers: {'header-key': 'header-value'},
                //withCredentials: true,
                data: {fileUploadObj: $scope.template},
                file: $scope.file // or list of files ($files) for html5 only
                //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                // customize file formData name ('Content-Disposition'), server side file variable name.
                //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                //formDataAppender: function(formData, key, val){}
            }).progress(function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);

//                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
                $state.go('^');
            });
        }
        $scope.save = function(){
            if($scope.isEdit){
                DocumentTemplate.updateTemplate($scope.template, function(){
                    $state.go('^', {}, {reload: true});
                })
            } else{
                doUpload();
            }
        };
        $scope.onFileSelect = function ($files) {
            $scope.file = $files[0];
        };

    });