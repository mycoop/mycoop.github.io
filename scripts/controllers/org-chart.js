function updateChart(chart, element, options) {
    if (!chart) {
        chart = jQuery(element).orgDiagram(options);
    } else {
        chart.orgDiagram(options);
    }
    chart.orgDiagram("update", primitives.orgdiagram.UpdateMode.Refresh);
}
angular.module('myCoopOnlineApp').
    controller('orgChartCtrl', function ($scope, $modal) {


        $scope.items = [
            {
                id: 0,
                parent: null,
                title: "Your organization",
                url: '#/home/admin',
                linkText: 'Staff'
//            description: "VP, Public Sector",
            },
            {
                id: 1,
                parent: 0,
                title: "Business unit 1",
                url: '#/home/admin',
                linkText: 'Staff'
            },
            {
                id: 2,
                parent: 0,
                title: "Business unit 2",
                url: '#/home/admin',
                linkText: 'Staff'
            },

            {
                id: 3,
                parent: 0,
                title: "Location 1",
                url: '#/home/admin',
                linkText: 'Staff'
            },

            {
                id: 4,
                parent: 0,
                title: "Location 2",
                url: '#/home/admin',
                linkText: 'Staff'
            },

            {
                id: 5,
                parent: 1,
                title: "Department 1",
                url: '#/home/admin',
                linkText: 'Staff'
            },

            {
                id: 6,
                parent: 2,
                title: "Department 2",
                url: '#/home/admin',
                linkText: 'Staff'
            },

            {
                id: 7,
                parent: 3,
                title: "Department 3",
                url: '#/home/admin',
                linkText: 'Staff'
            },

            {
                id: 8,
                parent: 3,
                title: "Accounting",
                url: '#/home/admin',
                linkText: 'Staff'
            },

            {
                id: 8,
                parent: 4,
                title: "Accounting",
                url: '#/home/admin',
                linkText: 'Staff'
            }
        ];

        $scope.reparent = function( itemId, toParentId) {
            if (itemId != null && toParentId != null) {
                console.log("Reparent  value:" + itemId + ", toParent:" + toParentId);
                var item = _.findWhere($scope.items, {id: itemId});
                var newParentItem = _.findWhere($scope.items, {id: toParentId});

                if(newParentItem.parent != itemId){
                    askUsers(item, toParentId);
                }
            }
        };

        $scope.showModal = function(name){
            var modalInstance = $modal.open({
                templateUrl: 'views/templates/' + name + '-entity.html',
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
        $scope.open = function (size) {

        };
    }).directive('ngChart', function ($compile) {
        return {
            scope: {
                items: '=',
                callback: '&onReparent'
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
                options.hasSelectorCheckbox = primitives.common.Enabled.False;
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
                options.onMouseClick = onMouseClick;

                options.pageFitMode = primitives.common.PageFitMode.FitToPage;
                options.graphicsType = primitives.common.GraphicsType.Auto;
                options.hasSelectorCheckbox = primitives.common.Enabled.False;
                options.hasButtons = primitives.common.Enabled.True;
                options.defaultTemplateName = "basicTemplate";
                options.visibility = primitives.common.Visibility.Normal;

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



                                        scope.$apply(function(){
                                            scope.callback({itemId: options.items[fromValue].id, toParentId: options.items[toValue].id});
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

                    var itemConfig = data.context;


//                    var itemConfig = data.context;
                    if (data.templateName == "basicTemplate") {
                        data.element.find("[name=photo]").attr({ "src": itemConfig.image, "alt": itemConfig.title });
//                        data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });
                        data.element.find("[name=link]").html('<i  class="glyphicon glyphicon-user link_in_node"></i> ');
                        data.element.find("[name=actions]").html('<i  class="glyphicon glyphicon-road link_in_node"></i> ');
                        data.element.find("[name=phone]").html('<i  class="glyphicon glyphicon-share-alt link_in_node"></i> ');
                        data.element.find("[name=email]").html('<i  class="glyphicon glyphicon-trash link_in_node"></i> ');
//                        data.element.find("[name=actions]").html('<i onclick="toggleMenu('+itemConfig.id+')"  class="glyphicon glyphicon-cog link_in_node">' +
//                            "<div id='menu"+ itemConfig.id+"' style='display:none; position:absolute; width: 200px; padding: 6px 10px;" +
//                        "background: #ffffff; z-index: 100000; border: 1px solid #808080; border-radius: 3px'>"+
//                        "<h3 class='text-primary'>Actions menu</h3>" +
//                        "<ul class='list-unstyled'>" +
//                            '<li><a data-menu-action="merge" class="item-action-button">- Merge</a></li>' +
//                            '<li><a  data-menu-action="reassign"  class="item-action-button">- Reassign</a></li>' +
//                            '<li><a  data-menu-action="delete" class="item-action-button">- Delete</a></li>' +
//                            '<li><a  data-menu-action="clone"  class="item-action-button">- Clone</a></li>' +
//                        '</ul>' +
//                        '</div></i> ');
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

//                    $compile(data.element.contents())(scope);
                }

                function getBasicTemplate() {
                    var result = new primitives.orgdiagram.TemplateConfig();
                    result.name = "basicTemplate";

                    result.itemSize = new primitives.common.Size(150, 60);
                    result.minimizedItemSize = new primitives.common.Size(3, 3);
                    result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);

                    var itemTemplate = jQuery(
                        '<div class="bp-item bp-corner-all bt-item-frame" style="overflow: visible">'
                            + '<div name="titleBackground" class="bp-item bp-corner-all" style="top: 2px; background: transparent;  left: 2px; width: 146px; height: 20px;">'
                            + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 138px; height: 18px; color: #414141;"><span></span><input type="text" class="little_input form-control" style="height: 17px; font-size: 12px; display: none;"><i class="glyphicon glyphicon-pencil link_in_node"></i>'
                            + '</div>'
                            + '</div>'
                            + '<div name="link" class="bp-item" style="top: 26px; left: 8px; width: 162px; height: 18px; font-size: 12px;"></div>'
                            + '<div name="actions" class="bp-item" style="overflow: visible;top: 26px; left: 28px; width: 162px; height: 18px; font-size: 12px;"></div>'
                            + '<div name="phone" class="bp-item" style="top: 26px; left: 48px; width: 162px; height: 18px; font-size: 12px;"><span></span></div>'
                            + '<div name="email" class="bp-item" style="top: 26px; left: 66px; width: 162px; height: 18px; font-size: 12px;"><span></span></div>'
                            + '<div name="description" class="bp-item" style="top: 62px; left: 56px; width: 162px; height: 36px; font-size: 10px;"><span></span></div>'
                            + '</div>'
                    ).css({
                            width: result.itemSize.width + "px",
                            height: result.itemSize.height + "px"
                        }).addClass("bp-item bp-corner-all bt-item-frame");

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
                    updateChart(chart, element, options);
                }, true);

            },
            controller: function($scope){
                $scope.makeSomeMadness = function(id){
//
//                    console.log(item);
                    var item =  _.find($scope.items, function(cur){
                        return cur.id == id;
                    });
                    return item.title;
                };
                $scope.funct = function(id, text){
                    var item =  _.find($scope.items, function(cur){
                        return cur.id == id;
                    });
                    item.title = text;
                    $scope.updateItems();
                    updateChart($scope.chart_, $scope.element_, $scope.options_);
                };
            }
        };
    });

var toggleMenu = function(id){
  $('#menu'+id).show();
};

function onMouseClick(event, data) {
    var target = jQuery(event.originalEvent.target);
    if (target.hasClass("item-action-button")) {
        var menu = target.closest("div");

        angular.element($("#org-container")).scope().showModal(target.attr('data-menu-action'));
        menu.hide();

        data.cancel = true;
    }
}