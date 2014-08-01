angular.module('userApp').
    controller('DocumentEditorCtrl', function ($scope, TextEditor, $timeout) {
        $scope.showEditor= true;
       $scope.performSearchAndReplace = function(){
           if($scope.search && $scope.replace){
               $scope.showResult = true;
               $scope.showEditor = false;
               $scope.dynamic = 0;
               $timeout(function(){
                   $scope.dynamic = 100;
               },100);
               $timeout(function(){
               },6100);
               TextEditor.searchAndReplace('BankOfAmericaCOOP.docx', $scope.search, $scope.replace, function(data){
                 $timeout(function(){
                     $scope.showEditor = true;
                     $scope.showResult = false;
                 },1200);
               });
           }
       }
    });