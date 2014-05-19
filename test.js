jQuery(window).load(function () {
    var options = new primitives.orgdiagram.Config();

    var items = [
        new primitives.orgdiagram.ItemConfig({
            id: 0,
            parent: null,
            title: "Scott Aasrud",
            description: "VP, Public Sector",
            image: "demo/images/photos/a.png",
            phone: "(123) 456-78-90",
            email: "itema@org.com",
            image: "demo/images/photos/a.png",
            templateName: "contactTemplate",
            itemTitleColor: "red"
        }),
        new primitives.orgdiagram.ItemConfig({
            id: 1,
            parent: 0,
            title: "Ted Lucas",
            description: "VP, Human Resources",
            image: "demo/images/photos/b.png"
        }),
        new primitives.orgdiagram.ItemConfig({
            id: 2,
            parent: 0,
            title: "Joao Stuger",
            description: "Business Solutions, US",
            image: "demo/images/photos/c.png",
            templateName: "photoTemplate"
        })
    ];



    options.items = items;
    options.cursorItem = 0;
    options.templates = [getPhotoTemplate(), getContactTemplate()];
    options.onItemRender = onTemplateRender;

    jQuery("#basicdiagram").orgDiagram(options);


    function onTemplateRender(event, data) {
        switch (data.renderingMode) {
            case primitives.common.RenderingMode.Create:
                /* Initialize widgets here */
                break;
            case primitives.common.RenderingMode.Update:
                /* Update widgets here */
                break;
        }

        var itemConfig = data.context;

        if (data.templateName == "photoTemplate") {
            data.element.find("[name=photo]").attr({ "src": itemConfig.image, "alt": itemConfig.title });
            data.element.find("[name=title]").text(itemConfig.title);
        } else if (data.templateName == "contactTemplate") {
            data.element.find("[name=photo]").attr({ "src": itemConfig.image, "alt": itemConfig.title });
            data.element.find("[name=titleBackground]").css({ "background": itemConfig.itemTitleColor });

            var fields = ["title", "description", "phone", "email"];
            for (var index = 0; index < fields.length; index++) {
                var field = fields[index];

                var element = data.element.find("[name=" + field + "]");
                if (element.text() != itemConfig[field]) {
                    element.text(itemConfig[field]);
                }
            }
        }
    }
    function getContactTemplate() {
        var result = new primitives.orgdiagram.TemplateConfig();
        result.name = "contactTemplate";

        result.itemSize = new primitives.common.Size(220, 120);
        result.minimizedItemSize = new primitives.common.Size(3, 3);
        result.highlightPadding = new primitives.common.Thickness(2, 2, 2, 2);


        var itemTemplate = jQuery(
                '<div class="bp-item bp-corner-all bt-item-frame">'
                + '<div name="titleBackground" class="bp-item bp-corner-all bp-title-frame" style="top: 2px; left: 2px; width: 216px; height: 20px;">'
                + '<div name="title" class="bp-item bp-title" style="top: 3px; left: 6px; width: 208px; height: 18px;">'
                + '</div>'
                + '</div>'
                + '<div class="bp-item bp-photo-frame" style="top: 26px; left: 2px; width: 50px; height: 60px;">'
                + '<img name="photo" style="height=60px; width=50px;" />'
                + '</div>'
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

});