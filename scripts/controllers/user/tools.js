angular.module('userApp').
    controller('DocumentEditorCtrl', function ($scope, TextEditor, $timeout, Document) {
        $scope.showEditor= true;
        $scope.totalReplacements = 0;
        Document.getDocuments(function(data){
            $scope.docs = data;
            _.each($scope.docs, function(doc){
                doc.selected = true;
            })
        });

        function searchAndReplace(index, collection){
            var doc = collection[index];
            if(doc){
                doc.isUpdating = true;
                TextEditor.searchAndReplace(doc.Name, $scope.search, $scope.replace, function(data){
                    $scope.totalReplacements += parseInt(data);
                    doc.isUpdating = false;
                    doc.isUpdated = true;
                    $scope.dynamic++;
                    searchAndReplace(index+1, collection);
                });
            } else{
                $scope.finished = true;
                $timeout(function(){
                    $scope.isUpdating = false;
                },2000);

            }
        }

       $scope.performSearchAndReplace = function(){
           if($scope.search && $scope.replace){
               var collection = _.where($scope.docs, {selected: true});
               _.each($scope.docs, function(item){
                   item.isUpdated = false;
               });

               $scope.maxCount = collection.length;
               $scope.totalReplacements = 0;
               $scope.dynamic = 1;
               $scope.finished = false;
               $scope.isUpdating = true;
               searchAndReplace(0, collection);

           }
       }
    });