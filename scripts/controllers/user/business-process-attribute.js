angular.module('userApp').
    controller('BusinessProcessAttributeCtrl', function ($scope, Modal, BusinessProcessAttribute) {
        BusinessProcessAttribute.getAttributeTypes(function(types){
            $scope.attributeTypes = types;
            $scope.selectedType = types[0];
            BusinessProcessAttribute.getAttributes(function(attributes){
                $scope.attributes = attributes;
            });
        });
        $scope.deleteAttribute = function(attribute){
            Modal.openYesNoModal('Warning!', 'Are you sure want to delete this attribute?', function(){
                BusinessProcessAttribute.deleteAttribute(attribute.id);
                $scope.attributes.remove(attribute);
            });
        };
        $scope.editAttribute = function(attribute){
            BusinessProcessAttribute.updateAttribute(attribute, function(){
                attribute.isEdit = false;
            });
        };

        $scope.addAttributeType = function(){
            BusinessProcessAttribute.addAttributeType($scope.newType, function(){
                $scope.isTypeAdding = false;
                $scope.newType.name = "";
                BusinessProcessAttribute.getAttributeTypes(function(types){
                    $scope.attributeTypes = types;
                    $scope.selectedType = types[0];
                })
            })
        };
        $scope.deleteAttributeType = function(type){
            Modal.openYesNoModal('Warning!', 'Are you sure want to delete this attribute category?', function(){
                $scope.attributeTypes.remove(type);
                if(type == $scope.selectedType){
                    $scope.selectedType = $scope.attributeTypes[0];
                }
                BusinessProcessAttribute.deleteAttributeType(type.id)
            });
        };
        $scope.addAttribute = function(){
            $scope.newAttribute.attributeTypeId = $scope.selectedType.id;
            BusinessProcessAttribute.addAttribute($scope.newAttribute, function(data){
                $scope.isAdding= false;
                $scope.newAttribute.name = "";
                $scope.newAttribute.description = "";
                BusinessProcessAttribute.getAttributes(function(attributes){
                    $scope.attributes = attributes;
                });
            });
        };
    });