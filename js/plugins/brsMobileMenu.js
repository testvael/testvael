$.fn.brsMobileMenu = function (options) {
    var $thisMenu = this;
    var settings = $.extend(
        {
            selector: $thisMenu,
            itemSelector: "> li",
            menuButtonSelector: "[brsMobileMenu-btn]",
            search: true,
            searchOptions: {
                action: "",
                method: "GET",
                input: {
                    type: "text",
                    placeholder: "Ara..",
                    id: "search",
                    name: "s"
                },
                button: {
                    text: "Ara"
                }
            },
            customMenuItems: null,
            headerContent: null,
            footerContent: null
        },
        options
    );
    var menu = settings.selector.clone();
    var items = menu.find(settings.itemSelector);

    var uuidv4_text = uuidv4();
    var menuHtml =
        '<div class="brsMobileMenu" id="brsMobileMenu-' + (uuidv4_text) + '"><div class="brsMobileMenu-overflow"></div>' +
        '<div class="mobile-menu-area ' +
        (settings.search == false ? "no-search" : "") +
        ' " data-menu-scroll="true">' +
        '<div class="mobile-menu-btn no-default"><i class="far fa-times"></i></div>';
    if (settings.search == true) {
        menuHtml +=
            '<div class="search">' +
            '<form action="' +
            settings.searchOptions.action +
            '" method="' +
            settings.searchOptions.method +
            '">' +
            "<input" +
            ' type="' +
            settings.searchOptions.input.type +
            '"' +
            ' placeholder="' +
            settings.searchOptions.input.placeholder +
            '"' +
            ' id="' +
            settings.searchOptions.input.id +
            '"' +
            ' name="' +
            settings.searchOptions.input.name +
            '"' +
            ">" +
            '<button type="submit">' +
            settings.searchOptions.button.text +
            "</button>" +
            "</form>" +
            "</div>";
    }
    menuHtml += '<div class="menu">';
    if (settings.headerContent != null) {
        menuHtml +=
            '<div class="brsMobileMenu-header">' +
            settings.headerContent +
            "</div>";
    }

    if (items.length > 0 && settings.itemSelector != false) {
        menuHtml += '<ul>';
        $.each(items, function (key, value) {
            if ($(value).find("> ul").length > 0) {
                var tempHTML = $(value).clone();
                tempHTML.find("ul").remove();
                menuHtml +=
                    '<li class="sub">' +
                    $(tempHTML).html() +
                    '<div class="sub-menu"><div class="title">' +
                    $(tempHTML).html() +
                    "</div><ul>";
                if ($(value).find("> ul > li").length > 0) {
                    $.each($(value).find("> ul > li"), function (key2, value2) {
                        if ($(value2).find("> ul").length > 0) {
                            var tempHTML = $(value2).clone();
                            tempHTML.find("ul").remove();
                            menuHtml +=
                                '<li class="sub">' +
                                $(tempHTML).html() +
                                '<div class="sub-menu"><div class="title">' +
                                $(tempHTML).html() +
                                "</div><ul>";
                            if ($(value2).find("> ul > li").length > 0) {
                                $.each($(value2).find("> ul > li"), function (key3, value3) {
                                    if ($(value3).find("> ul").length > 0) {
                                        var tempHTML = $(value3).clone();
                                        tempHTML.find("ul").remove();
                                        menuHtml +=
                                            '<li class="sub">' +
                                            $(tempHTML).html() +
                                            '<div class="sub-menu"><div class="title">' +
                                            $(tempHTML).html() +
                                            "</div><ul>";
                                        if ($(value3).find("> ul > li").length > 0) {
                                            $.each($(value3).find("> ul > li"), function (
                                                key4,
                                                value4
                                            ) {
                                                menuHtml += "<li>" + $(value4).html() + "</li>";
                                            });
                                        }
                                        menuHtml += "</ul></li>";
                                    } else {
                                        menuHtml += "<li>" + $(value3).html() + "</li>";
                                    }
                                });
                            }
                            menuHtml += "</ul></li>";
                        } else {
                            menuHtml += "<li>" + $(value2).html() + "</li>";
                        }
                    });
                }
                menuHtml += "</ul></li>";
            } else {
                menuHtml += "<li>" + $(value).html() + "</li>";
            }
        });
        if (
            settings.customMenuItems != null &&
            $.isArray(settings.customMenuItems)
        ) {
            $.each(settings.customMenuItems, function (key, menuItem) {
                if (
                    (menuItem.isParent == true &&
                        menuItem.children != null &&
                        $.isArray(menuItem.children)) ||
                    (menuItem.children != false &&
                        menuItem.isParent == true &&
                        $.isArray(menuItem.children))
                ) {
                    menuHtml +=
                        '<li class="sub ' +
                        (menuItem.class != null ? menuItem.class : "") +
                        '" id="' +
                        (menuItem.id != null ? menuItem.id : "") +
                        '" ' +
                        (menuItem.customAttrs != null ? menuItem.customAttrs : "") +
                        '><a href="">' +
                        menuItem.title +
                        '</a><div class="sub-menu"><div class="title"><a href="">' +
                        menuItem.title +
                        "</a></div><ul>";

                    $.each(menuItem.children, function (childKey, childMenuItem) {
                        menuHtml +=
                            '<li class="' +
                            (childMenuItem.class != null ? childMenuItem.class : "") +
                            '" id="' +
                            (childMenuItem.id != null ? childMenuItem.id : "") +
                            '" ' +
                            (childMenuItem.customAttrs != null
                                ? childMenuItem.customAttrs
                                : "") +
                            '><a href="' +
                            (childMenuItem.link.href != null ? childMenuItem.link.href : "") +
                            '" class=' +
                            (childMenuItem.link.class != null
                                ? childMenuItem.link.class
                                : "") +
                            ' id="' +
                            (childMenuItem.link.id != null ? childMenuItem.link.id : "") +
                            '" ' +
                            (childMenuItem.link.customAttrs != null
                                ? childMenuItem.link.customAttrs
                                : "") +
                            ">" +
                            (childMenuItem.link.title != null
                                ? childMenuItem.link.title
                                : "") +
                            "</a></li>";
                    });

                    menuHtml += "</ul></div></li>";
                } else {
                    menuHtml +=
                        '<li class="' +
                        (menuItem.class != null ? menuItem.class : "") +
                        '" id="' +
                        (menuItem.id != null ? menuItem.id : "") +
                        '" ' +
                        (menuItem.customAttrs != null ? menuItem.customAttrs : "") +
                        '><a href="' +
                        (menuItem.link.href != null ? menuItem.link.href : "") +
                        '" class=' +
                        (menuItem.link.class != null ? menuItem.link.class : "") +
                        ' id="' +
                        (menuItem.link.id != null ? menuItem.link.id : "") +
                        '" ' +
                        (menuItem.link.customAttrs != null
                            ? menuItem.link.customAttrs
                            : "") +
                        ">" +
                        (menuItem.link.title != null ? menuItem.link.title : "") +
                        "</a></li>";
                }
            });
        }
        menuHtml += '</ul>';
    }

    if (settings.footerContent != null) {
        menuHtml +=
            '<div class="brsMobileMenu-footer">' +
            settings.footerContent +
            "</div></div></div></div>";
    } else {
        menuHtml += "</ul></div></div></div>";
    }
    $("body").prepend(menuHtml);

    var $base = $(menuHtml);
    $("html").delegate(settings.menuButtonSelector, "click", function (e) {
        e.preventDefault();
        $("#brsMobileMenu-" + uuidv4_text).addClass("open");
        $("body").addClass("brsMobileMenu-open");
        $("html, body").addClass("brsMobileMenu-no-scroll");
        $("html,body").animate(
            {
                scrollTop: $("#brsMobileMenu-" + uuidv4_text).offset().top
            },
            100
        );
        return false;
    });
    $("html").delegate("form button", "click", function (e) {
        e.preventDefault();
        $(this)
            .parents("form")
            .submit();
        return false;
    });
    $("html").delegate("#brsMobileMenu-" + uuidv4_text + " .menu ul li.sub > a", "click", function (e) {
        e.preventDefault();
        $(this)
            .parent()
            .addClass("open");
        $(this)
            .parent()
            .parent()
            .addClass("opened");
        $(this)
            .parent()
            .parents(".sub-menu")
            .addClass("opened");
        if ($(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-header .title').length > 0) {
            $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-header .title span').text($(this).text());
            $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-header .title a').addClass('active');
        }
        $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-footer').hide();
        return false;
    });
    $("html").delegate("#brsMobileMenu-" + uuidv4_text + "  .menu ul li > a[inpage]", "click", function (e) {
        var $menu = $(this).parents(".brsMobileMenu");
        $menu.removeClass("open");
        $("body").removeClass("brsMobileMenu-open");
        $("html, body").removeClass("brsMobileMenu-no-scroll");
        if ($menu.find(".mobile-menu-area").hasClass("no-search")) {
            $menu.find(".menu").css({
                height: $(window).height(),
                overflow: "auto"
            });
        } else {
            $menu.find(".menu").css({
                height: $(window).height() - 72,
                overflow: "auto"
            });
        }
    });
    $("html").delegate(".brsMobileMenu-header .title a.back-btn", "click", function (e) {
        e.preventDefault();
        $(this).removeClass('active');
        var title = $(this).parents('.title').attr('data-default-title');
        $(this).parent().find('span').text(title);
        $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.mobile-menu-area .menu ul li.sub.open').removeClass("open").parent().removeClass('opened');
        $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-footer').show();
        return false;
    });
    $("html").delegate("#brsMobileMenu-" + uuidv4_text + " .menu ul li.sub .sub-menu .title > a", "click", function (e) {
            e.preventDefault();
            $(this)
                .parent()
                .parent()
                .parent()
                .removeClass("open");
            $(this)
                .parent()
                .parent()
                .removeClass("opened");
            $(this)
                .parent()
                .parent()
                .parent()
                .parent()
                .removeClass("opened");
            $(this)
                .parent()
                .parent()
                .parent()
                .parent()
                .parent()
                .removeClass("opened");
            if ($(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-header .title').length > 0) {
                var title = $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-header .title').attr('data-default-title');
                $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-header .title span').text(title);
                $(this).parents("#brsMobileMenu-" + uuidv4_text).find('.brsMobileMenu-header .title a').removeClass('active');
            }
            return false;
        }
    );
    $("html").delegate("#brsMobileMenu-" + uuidv4_text + " .mobile-menu-btn, #brsMobileMenu-" + uuidv4_text + " .brsMobileMenu-overflow", "click", function (e) {
            e.preventDefault();
            var $menu = $(this).parents("#brsMobileMenu-" + uuidv4_text);
            $menu.removeClass("open");
            $("body").removeClass("brsMobileMenu-open");
            $("html, body").removeClass("brsMobileMenu-no-scroll");
            if ($menu.find(".mobile-menu-area").hasClass("no-search")) {
                $menu.find(".menu").css({
                    height: $(window).height(),
                    overflow: "auto"
                });
            } else {
                $menu.find(".menu").css({
                    height: $(window).height() - 72,
                    overflow: "auto"
                });
            }
            return false;
        }
    );

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};