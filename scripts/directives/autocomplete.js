
angular.module('directives.autocomplete', []).
    directive('autocomplete', function () {

        return {
            template :'<input type="text" placeholder="Type something and hit enter" class="form-control"/>',
            restrict: 'A',
            scope: {
                items: '=',
                selectedItems: '='
            },
            link: function (scope, element, attributes) {
                function convertSource(){
                    _.each(scope.items, function(item){
                        item.label = item.name;
                        item.value = item.id;
                    });
                }
                function setSource(){
                    (element).find('input')
                        .on('tokenfield:createdtoken', function (e) {
                            var name  = e.attrs['value'];
                            alert(name);
                            var item = _.findWhere(scope.items, {id: name});
                            item.selected = true;
                            scope.selectedItems.push(item);
                        })

                        .tokenfield({
                            autocomplete: {
                                source: scope.items,
                                delay: 100
                            },
                            showAutocompleteOnFocus: true
                        });
                }

                function setPreselectedItems(){
                    var preselectedString = '';
                    _.each(_.where(scope.items, {selected: true}), function(item){
                       preselectedString += item.label + ',';
                    });
                    $(element).find('input').attr('value', preselectedString);
                }

                var init = true;
                scope.$watch('items', function(){
                    convertSource();
                    setPreselectedItems();
                    setSource();
                });
            }
        }
    });
