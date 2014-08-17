'use strict';

angular.module('adminApp')
    .controller('DocumentTemplateCtrl', function ($scope, $modal, DocumentTemplate, Component) {

        Component.getComponents(function (data) {
            $scope.components = data;
        });


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
        DocumentTemplate.getTemplates(function (data) {
            $scope.datasource = data;
            for (var i = 0; i < $scope.datasource.length; i++) {
                $scope.addSlide(i);
            }
        })

    })
    .controller('DocumentTemplateEditCtrl', function ($scope, $state, $stateParams, $upload, DocumentTemplate, Component) {
        $scope.progress = 0;
        if ($stateParams.id) {
            $scope.isEdit = true;
            DocumentTemplate.getTemplate($stateParams.id, function (data) {
                $scope.template = data;
            });
        }

        Component.getComponents(function (data) {
            $scope.components = data;
        });

        $scope.onComponentSelect = function($item, $model, $label){
            $scope.template.componentId = $item.id;
        };

        $scope.save = function(){

            console.log(JSON.stringify($scope.template));
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
            //.error(...)
            //.then(success, error, progress);
            // access or attach event listeners to the underlying XMLHttpRequest.
            //.xhr(function(xhr){xhr.upload.addEventListener(...)})
        };
        $scope.onFileSelect = function ($files) {
            $scope.file = $files[0];
        };

    });