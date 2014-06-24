function initPopups() {
    $('tr.orphan-item').draggable({
        revert: "invalid",
        containment: "document",
        appendTo: "body",
        helper: "clone",
        cursor: "move",
        "zIndex": 10000,
        delay: 300,
        distance: 10
    });
}
function updateChart(chart, element, options, scope) {
    if (!chart) {
        chart = jQuery(element).orgDiagram(options);
    } else {
        chart.orgDiagram(options);
    }

    $.get('/views/templates/manage-entity.html', function (data) {
        $('[name ="actions"]').popover({title: 'Actions', placement: 'bottom', content: data, html: true, trigger: 'click'});
    });
    $('[name="link"]').tooltip({title: 'Manage users'});
    $('#orgdiagram').click(function (event) {
        if (!$(event.target).hasClass('item-popup'))
            $('[name ="actions"]').popover('hide')
    });
    chart.droppable({
        greedy: true,
        drop: function (event, ui) {
            /* Check drop event cancelation flag
             * This fixes following issues:
             * 1. The same event can be received again by updated chart
             * so you changed hierarchy, updated chart and at the same drop position absolutly
             * irrelevant item receives again drop event, so in order to avoid this use primitives.common.stopPropagation
             * 2. This particlular example has nested drop zones, in order to
             * suppress drop event processing by nested droppable and its parent we have to set "greedy" to false,
             * but it does not work.
             * In this example items can be droped to other items (except immidiate children in order to avoid looping)
             * and to any free space in order to make them rooted.
             * So we need to cancel drop  event in order to avoid double reparenting operation.
             */
            if (!event.cancelBubble) {
                scope.$apply(function () {
                    scope.callback({itemId: parseInt(jQuery(ui.draggable).attr("data-value"), 10), toParentId: null});
                });

                primitives.common.stopPropagation(event);
            }
        }
    });

    chart.orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
    initPopups();
}
angular.module('adminApp').
    controller('orgChartCtrl', function ($scope, $modal, $log, OrgEntity) {
        $scope.selectedNode = {node: {name: 'asdda'}};


        $scope.selectedNodeId = 0;

        $scope.showNewEntityModal = function () {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/new-entity.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        return '';
                    }
                }
            });

            modalInstance.result.then(function (params) {
                var parent = params.confirm ? $scope.selectedNodeId : null;
                OrgEntity.addEntity({id: $scope.items.length * 100, parent: parent, title: params.name, createdDate: new Date(), modifiedDate: new Date()},
                refreshEntities);
//                refreshEntities();
            }, function () {
                console.log('success');
            });
        };

        function refreshEntities() {
            OrgEntity.getEntities(function (data) {
                $scope.items = data;
                updateOrphans();
            });
        }

        refreshEntities();


        $scope.reparent = function (itemId, toParentId) {
            if (itemId != toParentId) {
                var item = _.findWhere($scope.items, {id: itemId});
                if (itemId != null && toParentId != null) {
                    console.log("Reparent  value:" + itemId + ", toParent:" + toParentId);
                    if (checkAncestors(itemId, toParentId)) {
                        askAction(item, toParentId);
                    } else {
                        showError('You are attempting to set up a child node as a parent!')
                    }
                } else if (!toParentId) {
                    item.parent = null;
                }
            }
        };

        function checkAncestors(itemId, toParentId) {
            var ancestors = [];
            var newParentItem = _.findWhere($scope.items, {id: toParentId});
            getParents(newParentItem, ancestors);
            console.log(JSON.stringify(ancestors));
            return !_.contains(ancestors, itemId);

        }

        function getParents(item, collection) {
            if (item.parent || item.parent) {
                collection.push(item.parent);
                getParents(_.findWhere($scope.items, {id: item.parent}), collection);
            }
        }

        function askAction(item, toParentId) {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/choose-action.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        return 'Move all users';
                    }
                }
            });

            modalInstance.result.then(function (isMoveUsers) {
                askUsers(item, toParentId);
            }, function () {
//                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        $scope.showModal = function (name) {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/' + name + '-entity.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        return 'Move all users';
                    }
                }
            });

            modalInstance.result.then(function (isMoveUsers) {
                console.log('success');
            }, function () {
                console.log('success');
            });
        };

        function askUsers(item, toParentId) {
            var modalInstance = $modal.open({
                templateUrl: 'askUsersModal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    message: function () {
                        return 'Move all users';
                    }
                }
            });

            modalInstance.result.then(function (isMoveUsers) {
                item.parent = toParentId;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        function showError(message) {
            var modalInstance = $modal.open({
                templateUrl: '/views/templates/error.html',
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

        function updateOrphans() {
            $scope.orphans = _.where($scope.items, {parent: null})
        }


        $scope.$watch('items', function () {
            updateOrphans();
        }, true);

    }).directive('ngChart', function ($compile) {
        return {
            scope: {
                items: '=',
                callback: '&onReparent',
                selectedNodeId: '=',
                withSelect: '=',
                isEditable: '='
            },
            link: function (scope, element, attrs) {
                var chart = null;
                var options = new primitives.orgdiagram.Config();

                var orgdiagram = null;
                var orgdiagram2 = null;

                var counter = 0;
                var m_timer = null;
                var fromValue = null;
                var fromChart = null;
                var toValue = null;
                var toChart = null;


                options.cursorItem = 0;

//                options.hasSelectorCheckbox = scope.withSelect ? primitives.common.Enabled.True :  primitives.common.Enabled.False;
                options.templates = [getBasicTemplate()];
                options.onItemRender = onTemplateRender;
                options.normalLevelShift = 20;
                options.dotLevelShift = 10;
                options.lineLevelShift = 10;
                options.normalItemsInterval = 20;
                options.dotItemsInterval = 10;
                options.lineItemsInterval = 5;
                options.buttonsPanelSize = 48;
                options.editMode = true;
//                options.onMouseClick = onOrgChartClick;
                options.onSelectionChanged = function () {

                };
                options.pageFitMode = primitives.common.PageFitMode.FitToPage;
                options.graphicsType = primitives.common.GraphicsType.Auto;
                options.hasSelectorCheckbox = primitives.common.Enabled.False;
                options.hasButtons = primitives.common.Enabled.True;
                options.defaultTemplateName = "basicTemplate";
                options.visibility = primitives.common.Visibility.Normal;
                options.hasSelectorCheckbox = scope.withSelect ? primitives.common.Enabled.True : primitives.common.Enabled.False;

                options.onCursorChanged = function (e, data) {
                    scope.$apply(function () {
                        scope.selectedNodeId = data.context.id;
                    });
                };

                /* chart uses mouse drag to pan items, disable it in order to avoid conflict with drag & drop */
                options.enablePanning = false;
                var updateItems = function () {
                    options.items = [];
                    _.each(scope.items, function (item) {
                        console.log(JSON.stringify(item));
                        options.items.push(
                            new primitives.orgdiagram.ItemConfig({
                                id: item.id,
                                parent: item.parent,
                                title: item.title,
                                templateName: "basicTemplate",
                                url: item.url,
                                linkText: item.linkText
                            })
                        );
                        return item;
                    });
                };
                scope.updateItems = updateItems;


                function onTemplateRender(event, data) {
                    if (scope.isEditable) {
                        switch (data.renderingMode) {
                            case primitives.common.RenderingMode.Create:
                                data.element.draggable({
                                    revert: "invalid",
                                    containment: "document",
                                    appendTo: "body",
                                    helper: "clone",
                                    cursor: "move",
                                    "zIndex": 10000,
                                    delay: 300,
                                    distance: 10,
                                    start: function (event, ui) {
                                        fromValue = parseInt(jQuery(this).attr("data-value"), 10);
                                        fromChart = "orgdiagram";
                                    }
                                });
                                data.element.droppable({
                                    /* this option is supposed to suppress event propogation from nested droppable to its parent
                                     *  but it does not work
                                     */
                                    greedy: true,
                                    drop: function (event, ui) {
                                        if (!event.cancelBubble) {
                                            console.log("Drop accepted!");
                                            toValue = parseInt(jQuery(this).attr("data-value"), 10);
                                            toChart = "orgdiagram";
                                            fromValue = parseInt(jQuery(ui.draggable).attr("data-value"), 10)
                                            scope.$apply(function () {
                                                scope.callback({itemId: fromValue, toParentId: toValue});
                                            });

//                                        primitives.common.stopPropagation(event);
                                        } else {
                                            console.log("Drop ignored!");
                                        }
                                    },
                                    over: function (event, ui) {
                                        toValue = parseInt(jQuery(this).attr("data-value"), 10);
                                        toChart = "orgdiagram";

                                        /* this is needed in order to update highlighted item in chart,
                                         * so this creates consistent mouse over feed back
                                         */
                                        jQuery("#orgdiagram").orgDiagram({ "highlightItem": toValue });
                                        jQuery("#orgdiagram").orgDiagram("update", primitives.common.UpdateMode.PositonHighlight);
                                    },
                                    accept: function (draggable) {
                                        /* be carefull with this event it is called for every available droppable including invisible items on every drag start event.
                                         * don't varify parent child relationship between draggable & droppable here it is too expensive.
                                         */
                                        return (jQuery(this).css("visibility") == "visible");
                                    }
                                });
                                /* Initialize widgets here */
                                break;
                            case primitives.common.RenderingMode.Update:
                                /* Update widgets here */
                                break;
                        }
                    }
                    var itemConfig = data.context;


//                    var itemConfig = data.context;
                    if (data.templateName == "basicTemplate") {
                        data.element.find("[name=photo]").attr({ "src": itemConfig.image, "alt": itemConfig.title });
//                        data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });
                        data.element.find("[name=link]").html('<a href="#/home/admin" style="height: 24px"><i style="font-size: 1.5em" class="glyphicon glyphicon-user link_in_node"></i> </a>');
                        data.element.find(".actions").html('<i  style="font-size: 1.5em"  class="glyphicon glyphicon-cog item-popup link_in_node" data-trigger="tooltip" data-title="hjlasdf"></i> ');
//
                        var fields = ["title", "description", "phone", "email"];

                        for (var index = 0; index < fields.length; index++) {
                            var field = fields[index];
                            var element = data.element.find("[name=" + field + "]");

                            if (element.text() != itemConfig[field]) {
                                $('span', element).text(itemConfig[field]);
                            }
                        }
                        data.element.find("[name=title]").attr({'data-node-id': itemConfig.id});
//                         data.element.find("[name=title] span").html('{{makeSomeMadness('+itemConfig.id+')}}');
                    }
                    /* Set item id as custom data attribute here */
                    data.element.attr("data-value", itemConfig.id);
                    data.element.attr("data-entity", true);

//                    $compile(data.element.contents())(scope);
                }

                function getBasicTemplate() {
                    var result = new primitives.orgdiagram.TemplateConfig();
                    result.name = "basicTemplate";

                    result.itemSize = new primitives.common.Size(150, 60);
                    result.minimizedItemSize = new primitives.common.Size(3, 3);
                    result.highlightPadding = new primitives.common.Thickness(1, 1, 1, 1);

                    var itemTemplate;
                    if (scope.isEditable) {
                        itemTemplate = jQuery(
                                '<div class="bp-item bt-item-frame" style="overflow: visible">'
                                + '<div name="titleBackground" class="bp-item bp-corner-all" style="top: 2px; background: transparent;  left: 2px; width: 146px; height: 20px;">'
                                + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 138px; height: 18px; color: #414141;"><span></span><input type="text" class="little_input form-control" style="height: 17px; font-size: 12px; display: none;"><i style="position:absolute; top: 1px;  right: 3px;" class="glyphicon glyphicon-pencil link_in_node"></i>'
                                + '</div>'
                                + '</div>'
                                + '<div name="link" class="bp-item" style="top: 26px; left: 38px; "></div>'
                                + '<div name="actions" class="bp-item actions" style="top: 26px; left: 85px;"></div>'
                                + '</div>'
                        ).css({
                                width: result.itemSize.width + "px",
                                height: result.itemSize.height + "px"
                            }).addClass("bp-item bt-item-frame item-popup");
                    } else {
                        itemTemplate = jQuery(
                                '<div class="bp-item bt-item-frame" style="overflow: visible">'
                                + '<div name="titleBackground" class="bp-item bp-corner-all" style="top: 2px; background: transparent;  left: 2px; width: 146px; height: 20px;">'
                                + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 138px; height: 18px; color: #414141;"><span></span><input type="text" class="little_input form-control" style="height: 17px; font-size: 12px; display: none;">'
                                + '</div>'
                                + '</div>'
                                + '<div name="link" class="bp-item" style="top: 26px; left: 38px; "></div>'
                                + '<div class="bp-item" style="top: 26px; left: 85px;"></div>'
                                + '</div>'
                        ).css({
                                width: result.itemSize.width + "px",
                                height: result.itemSize.height + "px"
                            }).addClass("bp-item bt-item-frame");
                    }
                    var bootStrapVerticalButtonsGroup = jQuery("<div></div>")
                        .css({
                            position: "absolute",
                            overflow: "hidden",
                            top: result.cursorPadding.top + "px",
                            left: (result.itemSize.width + result.cursorPadding.left + 10) + "px",
                            width: "35px",
                            height: (result.itemSize.height + 1) + "px"
                        }).addClass("btn-group btn-group-vertical");

//                    bootStrapVerticalButtonsGroup.append('<button class="btn btn-small" data-buttonname="info" type="button"><i class="icon-info-sign"></i></button>');
//                    bootStrapVerticalButtonsGroup.append('<button class="btn btn-small" data-buttonname="edit" type="button"><i class="icon-edit"></i></button>');
//                    bootStrapVerticalButtonsGroup.append('<button class="btn btn-small" data-buttonname="remove" type="button"><i class="icon-remove"></i></button>');
//
//                    itemTemplate.append(bootStrapVerticalButtonsGroup);

                    result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

                    return result;
                }

                scope.chart_ = chart;
                scope.element_ = element;
                scope.options_ = options;
                scope.$watch('items', function () {
                    updateItems();
                    updateChart(chart, element, options, scope);
                }, true);

            },
            controller: function ($scope) {
                $scope.makeSomeMadness = function (id) {
                    var item = _.find($scope.items, function (cur) {
                        return cur.id == id;
                    });

                    return item.title;
                };
                $scope.funct = function (id, text) {
                    var item = _.find($scope.items, function (cur) {
                        return cur.id == id;
                    });
                    item.title = text;
                    $scope.updateItems();
                    updateChart($scope.chart_, $scope.element_, $scope.options_);
                };
            }
        };
    });

var toggleMenu = function (id) {
    $('#menu' + id).show();
};


//
//function onOrgChartClick(event, data) {
//    var target = jQuery(event.originalEvent.target);
//    if (target.attr('data-entity')) {
//        alert(123);
////        var menu = target.closest("div.popover").prev("div");
//
//        angular.element($("#org-container")).scope().selectNode(target.attr('data-value'));
////        menu.hide();
//
//        data.cancel = true;
//    }
//}