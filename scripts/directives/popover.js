
angular.module('directives.popover', []).
    directive('popoverProcess', function ($interpolate) {
        var html ='Created by: {{createdBy}} <br/>Modified by: {{modifiedBy}}<br/>Date created: {{createdDate | date}}<br/>Date modified: {{modifiedDate | date}}'
        var interpolateContentWith = $interpolate(html);

        return {
            restrict: 'A',
            scope: {
                process: '='
            },
            link: function (scope, element, attributes) {

                var options = {
                    html: true,
                    trigger: 'hover',
                    title: 'Info',
                    content: interpolateContentWith(scope.process),
                    placement: 'top'
                };
                $(element).popover(options);
            }
        }
    });
