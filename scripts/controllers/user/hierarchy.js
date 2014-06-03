angular.module('userApp').
    controller('HierarchyCtrl', function ($scope, $rootScope, $modal, $state, $stateParams, OrgEntity) {
        OrgEntity.getEntities(function (data) {
            $scope.items = data;
        });
        $scope.onNodeSelected = function (id) {
            if(_.findWhere($scope.items, {id: id}).access){
                $state.transitionTo('home.main', {orgEntityId: id});
            }
        };


        $scope.nodeAction = function(id, action){
            switch (action){
                case 'summary':
                    showSummaryModal(_.findWhere($scope.items, {id: parseInt(id,10)}));
                    break;
                case 'status':
                    break;
                case 'map':
                    $state.transitionTo('home.map', {orgEntityId: id});
//                    alert(123)
                    break;
                case 'navigate':
//                    $stateParams.orgEntityId = id;
                    $state.transitionTo('home.main', {orgEntityId: id});
                    break;
            }
        };

        var showSummaryModal = function (node) {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/node-summary.html',
                controller: 'NodeModalCtrl',
                resolve: {
                    node: function () {
                        return node;
                    }
                }
            });

            modalInstance.result.then(function () {

            }, function () {
                console.log('success');
            });
        };

    })
    .directive('d3Tree', function ($compile) {
        return {
            scope: {
                items: '=',
                callback: '&onNodeClick',
                selectedNodeId: '='
            },
            link: function (scope, element, attrs) {
                $('body').on('click', function (e) {
                    $('[data-toggle="popover"]').each(function () {
                        //the 'is' for buttons that trigger popups
                        //the 'has' for icons within a button that triggers a popup
                        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                            $(this).popover('hide');
                        }
                    });
                });
                var margin = {top: 20, right: 120, bottom: 20, left: 220},
                    width = 960 - margin.right - margin.left,
                    height = 800 - margin.top - margin.bottom;

                var i = 0,
                    duration = 750,
                    root;

                var actionsTemplate;

                var tree = d3.layout.tree()
                    .size([height, width]);

                var diagonal = d3.svg.diagonal()
                    .projection(function (d) {
                        return [d.y, d.x];
                    });
                var svg = d3.select("#" + attrs['id']).append("svg")
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                function convertToD3Source(items) {
                    var output = _.where(items, {parent: null});
                    _.each(items, function (item) {
                        item.name = item.title;
                        if (item.parent) {
                            var parent = _.findWhere(items, {id: item.parent});
                            if (!parent.children) {
                                parent.children = [];
                            }
                            parent.children.push(item);
                        }
                        return item;
                    });
                    return output;
                }

                scope.$watch('items', function () {
                    var source = convertToD3Source(scope.items);
                    root = _.findWhere(source, {id: 103});
                    root.x0 = height / 2;
                    root.y0 = 0;

                    function collapse(d) {
                        if (d.children) {
                            d._children = d.children;
                            d._children.forEach(collapse);
                            d.children = null;
                        }
                    }

//                    root.children.forEach(collapse);
                    update(root);

                });


                d3.select(self.frameElement).style("height", "800px");

                // Define the zoom function for the zoomable tree

                function zoom() {
                    svgGroup.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                }


                // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
                var zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", zoom);

                // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

                function centerNode(source) {
                    scale = zoomListener.scale();
                    x = -source.y0;
                    y = -source.x0;
                    x = x * scale + viewerWidth / 2;
                    y = y * scale + viewerHeight / 2;
                    d3.select('g').transition()
                        .duration(duration)
                        .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
                    zoomListener.scale(scale);
                    zoomListener.translate([x, y]);
                }

                function update(source) {

                    // Compute the new tree layout.
                    var nodes = tree.nodes(root).reverse(),
                        links = tree.links(nodes);

                    // Normalize for fixed-depth.
                    nodes.forEach(function (d) {
                        d.y = d.depth * 150;
                    });

                    // Update the nodes…
                    var node = svg.selectAll("g.node")
                        .data(nodes, function (d) {
                            return d.id || (d.id = ++i);
                        });

                    // Enter any new nodes at the parent's previous position.
                    var nodeEnter = node.enter().append("g")
                        .attr("class", "node")
                        .attr("transform", function (d) {
                            return "translate(" + source.y0 + "," + source.x0 + ")";
                        })
                        .on("click", click)
                        .on("dblclick", dbclick);

                    var circle = nodeEnter.append("circle")
                        .attr("r", 1e-6)
                        .attr('data-node-id', function(d){return d.id;})
                        .attr("class", function(d){
                            return d.access ? "my-circle" : "";
                        })
                        .attr('data-toggle', 'popover')
//                        .style("fill", function (d) {
//                            return d._children ? "lightsteelblue" : "#fff";
//                        });


                    nodeEnter.append("text")
                        .attr("x", function (d) {
                            return d.children || d._children ? -10 : 10;
                        })
                        .attr("dy", ".35em")
                        .attr("text-anchor", function (d) {
                            return d.children || d._children ? "end" : "start";
                        })
                        .text(function (d) {
                            return d.name;
                        })
                        .style("fill-opacity", 1e-6);

                    // Transition nodes to their new position.
                    var nodeUpdate = node.transition()
                        .duration(duration)
                        .attr("transform", function (d) {
                            return "translate(" + d.y + "," + d.x + ")";
                        });

                    nodeUpdate.select("circle")
                        .attr("r", 4.5)
//                        .style("fill", function (d) {
//                            return d._children ? "lightsteelblue" : "#fff";
//                        });

                    nodeUpdate.select("text")
                        .style("fill-opacity", 1);

                    // Transition exiting nodes to the parent's new position.
                    var nodeExit = node.exit().transition()
                        .duration(duration)
                        .attr("transform", function (d) {
                            return "translate(" + source.y + "," + source.x + ")";
                        })
                        .remove();

                    nodeExit.select("circle")
                        .attr("r", 1e-6);

                    nodeExit.select("text")
                        .style("fill-opacity", 1e-6);


                    // Update the links…
                    var link = svg.selectAll("path.link")
                        .data(links, function (d) {
                            return d.target.id;
                        });

                    // Enter any new links at the parent's previous position.
                    link.enter().insert("path", "g")
                        .attr("class", "link")
                        .attr("d", function (d) {
                            var o = {x: source.x0, y: source.y0};
                            return diagonal({source: o, target: o});
                        });

                    // Transition links to their new position.
                    link.transition()
                        .duration(duration)
                        .attr("d", diagonal);

                    // Transition exiting nodes to the parent's new position.
                    link.exit().transition()
                        .duration(duration)
                        .attr("d", function (d) {
                            var o = {x: source.x, y: source.y};
                            return diagonal({source: o, target: o});
                        })
                        .remove();

                    // Stash the old positions for transition.
                    nodes.forEach(function (d) {
                        d.x0 = d.x;
                        d.y0 = d.y;
                    });
                    initPopover();
                }

                function initPopover(){
                    $.get('/views/templates/actions-list.html', function (data) {
                        actionsTemplate = data;
                        $('.my-circle').each(function(){
                            var id = $(this).attr('data-node-id');
                            var template = data.replace(/{id}/g, id.toString());
                            $(this).popover({
                                container: 'body',
                                placement: 'bottom',
                                title: 'Actions',
                                html: true,
                                content: template,
                                trigger: 'click'
                            });
                        });
                        // this works!
//                    $('[name ="actions"]').popover({title: 'Actions', placement: 'bottom', content: data, html: true, trigger: 'click'});

                    });
                }

                // Toggle children on click.
                function click(d) {
//                    if (d.children) {
//                        d._children = d.children;
//                        d.children = null;
//                    } else {
//                        d.children = d._children;
//                        d._children = null;
//                    }
//                    update(d);
                }

                function dbclick(d) {
                    $('.my-circle').popover('hide');
                    scope.callback({id: d.id});
                }
            }
        };
    });

function onActionClick(id, action){
    $('.my-circle').popover('hide');
//    alert(123);
    angular.element('#d3-chart-container').scope().nodeAction(id, action);
}