angular.module('myCoopOnlineApp').
    controller('orgChartCtrl', function ($scope) {


        $scope.items = [
            {
                id: 0,
                parent: null,
                title: "Your organization",
                url: '#/home',
                linkText: 'Staff'
//            description: "VP, Public Sector",
            },
            {
                id: 1,
                parent: 0,
                title: "Business unit 1",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },
            {
                id: 2,
                parent: 0,
                title: "Business unit 2",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },

            {
                id: 3,
                parent: 0,
                title: "Location 1",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },

            {
                id: 4,
                parent: 0,
                title: "Location 2",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },

            {
                id: 5,
                parent: 1,
                title: "Department 1",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },

            {
                id: 6,
                parent: 2,
                title: "Department 2",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },

            {
                id: 7,
                parent: 3,
                title: "Department 3",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },

            {
                id: 8,
                parent: 3,
                title: "Accounting",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            },

            {
                id: 8,
                parent: 4,
                title: "Accounting",
//            description: "VP, Human Resources",
                image: "demo/images/photos/b.png"
            }
        ];


    }).directive('ngChart', function () {
        return {
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
                options.hasSelectorCheckbox = primitives.common.Enabled.False;
                scope.options = options;
                scope.setCursorItem = function (cursorItem) {
                    options.cursorItem = cursorItem;
                };

                options.templates = [getBasicTemplate()];
                options.onItemRender = onTemplateRender;
                options.normalLevelShift = 20;
                options.dotLevelShift = 10;
                options.lineLevelShift = 10;
                options.normalItemsInterval = 20;
                options.dotItemsInterval = 10;
                options.lineItemsInterval = 5;
                options.buttonsPanelSize = 48;

                options.pageFitMode = primitives.common.PageFitMode.None;
                options.graphicsType = primitives.common.GraphicsType.Auto;
                options.hasSelectorCheckbox = primitives.common.Enabled.True;
                options.hasButtons = primitives.common.Enabled.True;
                options.defaultTemplateName = "basicTemplate";
                options.visibility = primitives.common.Visibility.Normal;
                /* chart uses mouse drag to pan items, disable it in order to avoid conflict with drag & drop */
                options.enablePanning = false;
                var updateItems = function () {
                    options.items = [];
                    _.each(scope[attrs.ngModel], function (item) {
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
                        )
                    });
                };

                function onTemplateRender(event, data) {
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

                                        Reparent(fromChart, fromValue, toChart, toValue);

                                        primitives.common.stopPropagation(event);
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

                    var itemConfig = data.context;


//                    var itemConfig = data.context;
                     if (data.templateName == "basicTemplate") {
                        data.element.find("[name=photo]").attr({ "src": itemConfig.image, "alt": itemConfig.title });
                        data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });
                        data.element.find("[name=link] a").attr({ "href": itemConfig.url}).text(itemConfig.linkText);

                         var fields = ["title", "description", "phone", "email"];
                        for (var index = 0; index < fields.length; index++) {
                            var field = fields[index];

                            var element = data.element.find("[name=" + field + "]");
                            if (element.text() != itemConfig[field]) {
                                element.text(itemConfig[field]);
                            }
                        }
                    }
                    /* Set item id as custom data attribute here */
                    data.element.attr("data-value", itemConfig.id);

                }

                function getBasicTemplate() {
                    var result = new primitives.orgdiagram.TemplateConfig();
                    result.name = "basicTemplate";

                    result.itemSize = new primitives.common.Size(150, 60);
                    result.minimizedItemSize = new primitives.common.Size(3, 3);
                    result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


                    var itemTemplate = jQuery(
                            '<div class="bp-item bp-corner-all bt-item-frame">'
                            + '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 146px; height: 20px;">'
                            + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 138px; height: 18px;">'
                            + '</div>'
                            + '</div>'
                            + '<div name="link" class="bp-item" style="top: 26px; left: 6px; width: 162px; height: 18px; font-size: 12px;"><a href=""></a></div>'
                            + '<div name="phone" class="bp-item" style="top: 26px; left: 56px; width: 162px; height: 18px; font-size: 12px;"></div>'
                            + '<div name="email" class="bp-item" style="top: 44px; left: 56px; width: 162px; height: 18px; font-size: 12px;"></div>'
                            + '<div name="description" class="bp-item" style="top: 62px; left: 56px; width: 162px; height: 36px; font-size: 10px;"></div>'
                            + '</div>'
                    ).css({
                            width: result.itemSize.width + "px",
                            height: result.itemSize.height + "px"
                        }).addClass("bp-item bp-corner-all bt-item-frame");
                    result.itemTemplate = itemTemplate.wrap('<div>').parent().html();

                    return result;
                }

                element.droppable({
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
                            toValue = null;
                            toChart = name;

                            Reparent(fromChart, fromValue, toChart, toValue);

                            primitives.common.stopPropagation(event);
                        }
                    }
                });

                scope.$watch(attrs.ngModel, function () {
                    updateItems();
                    if (!chart) {
                        chart = jQuery(element).orgDiagram(options);
                    } else {
                        chart.orgDiagram(options);
                        chart.orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
                    }
                }, true);

                function Reparent(fromChart, value, toChart, toParent) {
                    /* following verification needed in order to avoid conflict with jQuery Layout widget */
                    if (fromChart != null && value != null && toChart != null) {
                        console.log("Reparent fromChart:" + fromChart + ", value:" + value + ", toChart:" + toChart + ", toParent:" + toParent);
                        var item = options.items[value];
                        var fromItems = jQuery("#" + fromChart).orgDiagram("option", "items");
                        var toItems = jQuery("#" + toChart).orgDiagram("option", "items");
                        if (toParent != null) {
                            var toParentItem = options.items[toParent];
                            if (!isParentOf(item, toParentItem)) {

                                var children = getChildrenForParent(item);
                                children.push(item);
                                for (var index = 0; index < children.length; index++) {
                                    var child = children[index];
                                    fromItems.splice(primitives.common.indexOf(fromItems, child), 1);
                                    toItems.push(child);
                                }
                                item.parent = toParent;
                            } else {
                                console.log("Droped to own child!");
                            }
                        } else {
                            var children = getChildrenForParent(item);
                            children.push(item);
                            for (var index = 0; index < children.length; index++) {
                                var child = children[index];
                                fromItems.splice(primitives.common.indexOf(fromItems, child), 1);
                                toItems.push(child);
                            }
                            item.parent = null;
                        }
                        jQuery("#orgdiagram").orgDiagram("update", primitives.common.UpdateMode.Refresh);
                        jQuery("#orgdiagram2").orgDiagram("update", primitives.common.UpdateMode.Refresh);
                    }
                }


                function getChildrenForParent(parentItem) {
                    var children = {};
                    for (var id in options.items) {
                        var item = options.items[id];
                        if (children[item.parent] == null) {
                            children[item.parent] = [];
                        }
                        children[item.parent].push(id);
                    }
                    var newChildren = children[parentItem.id];
                    var result = [];
                    if (newChildren != null) {
                        while (newChildren.length > 0) {
                            var tempChildren = [];
                            for (var index = 0; index < newChildren.length; index++) {
                                var item = options.items[newChildren[index]];
                                result.push(item);
                                if (children[item.id] != null) {
                                    tempChildren = tempChildren.concat(children[item.id]);
                                }
                            }
                            newChildren = tempChildren;
                        }
                    }
                    return result;
                }

                function isParentOf(parentItem, childItem) {
                    var result = false,
                        index,
                        len,
                        itemConfig;
                    if (parentItem.id == childItem.id) {
                        result = true;
                    } else {
                        while (childItem.parent != null) {
                            childItem = options.items[childItem.parent];
                            if (childItem.id == parentItem.id) {
                                result = true;
                                break;
                            }
                        }
                    }
                    return result;
                };

            }
        };
    });