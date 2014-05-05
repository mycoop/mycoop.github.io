(function () {
    function a(a) {
        a = a.tagName;
        return"undefined" !== typeof a ? q[a.toLowerCase()] : a
    }

    function b(a, c, e, h) {
        var n = a.shift();
        if (n) {
            var A = c[e] = c[e] || [];
            if ("]" == n)if (j(A))"" != h && A.push(h); else if ("object" == typeof A) {
                c = a = A;
                e = [];
                for (prop in c)c.hasOwnProperty(prop) && e.push(prop);
                a[e.length] = h
            } else c[e] = [c[e], h]; else {
                ~n.indexOf("]") && (n = n.substr(0, n.length - 1));
                if (!t.test(n) && j(A))if (0 == c[e].length)A = c[e] = {}; else {
                    var A = {}, f;
                    for (f in c[e])A[f] = c[e][f];
                    c[e] = A
                }
                b(a, A, n, h)
            }
        } else j(c[e]) ? c[e].push(h) : c[e] = "object" == typeof c[e] ? h : "undefined" == typeof c[e] ? h : [c[e], h]
    }

    function c(a) {
        for (var a = String(a).split(/&|;/), c = function (a, n) {
            try {
                n = decodeURIComponent(n.replace(/\+/g, " "))
            } catch (c) {
            }
            var g = n.indexOf("="), l;
            a:{
                for (var h = n.length, e, s = 0; s < h; ++s)if (e = n[s], "]" == e && (l = !1), "[" == e && (l = !0), "=" == e && !l) {
                    l = s;
                    break a
                }
                l = void 0
            }
            h = n.substr(0, l || g);
            l = n.substr(l || g, n.length);
            l = l.substr(l.indexOf("=") + 1, l.length);
            "" == h && (h = n, l = "");
            g = h;
            h = l;
            if (~g.indexOf("]")) {
                var m = g.split("[");
                b(m, a, "base", h)
            } else {
                if (!t.test(g) && j(a.base)) {
                    l = {};
                    for (m in a.base)l[m] = a.base[m];
                    a.base = l
                }
                m = a.base;
                l = m[g];
                void 0 === l ? m[g] = h : j(l) ? l.push(h) : m[g] = [l, h]
            }
            return a
        }, e = 0, h = a.length >> 0, n = {base: {}}; e < h;)e in a && (n = c.call(void 0, n, a[e], e, a)), ++e;
        return n.base
    }

    function j(a) {
        return"[object Array]" === Object.prototype.toString.call(a)
    }

    function e(a, b) {
        1 === arguments.length && !0 === a && (b = !0, a = void 0);
        for (var a = a || window.location.toString(), e = b || !1, h = decodeURI(a), e = u[e ? "strict" : "loose"].exec(h), h = {attr: {}, param: {}, seg: {}}, n = 14; n--;)h.attr[m[n]] = e[n] || "";
        h.param.query =
            c(h.attr.query);
        h.param.fragment = c(h.attr.fragment);
        h.seg.path = h.attr.path.replace(/^\/+|\/+$/g, "").split("/");
        h.seg.fragment = h.attr.fragment.replace(/^\/+|\/+$/g, "").split("/");
        h.attr.base = h.attr.host ? (h.attr.protocol ? h.attr.protocol + "://" + h.attr.host : h.attr.host) + (h.attr.port ? ":" + h.attr.port : "") : "";
        return{data: h, attr: function (a) {
            a = r[a] || a;
            return"undefined" !== typeof a ? this.data.attr[a] : this.data.attr
        }, param: function (a) {
            return"undefined" !== typeof a ? this.data.param.query[a] : this.data.param.query
        },
            fparam: function (a) {
                return"undefined" !== typeof a ? this.data.param.fragment[a] : this.data.param.fragment
            }, segment: function (a) {
                if ("undefined" === typeof a)return this.data.seg.path;
                a = 0 > a ? this.data.seg.path.length + a : a - 1;
                return this.data.seg.path[a]
            }, fsegment: function (a) {
                if ("undefined" === typeof a)return this.data.seg.fragment;
                a = 0 > a ? this.data.seg.fragment.length + a : a - 1;
                return this.data.seg.fragment[a]
            }}
    }

    var q = {a: "href", img: "src", form: "action", base: "href", script: "src", iframe: "src", link: "href"}, m = "source protocol authority userInfo user password host port relative path directory file query fragment".split(" "),
        r = {anchor: "fragment"}, u = {strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/, loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}, t = /^[0-9]+$/;
    "undefined" !== typeof CI.$ ? (CI.$.fn.url = function (b) {
        var c = "";
        this.length && (c = CI.$(this).attr(a(this[0])) || "");
        return e(c, b)
    },
        CI.$.url = e) : window.purl = e
});
var CI = {consts: {CONFIG_DEBUG: "debug", CONFIG_SERVICE: "service", CONFIG_SITEID: "siteId", CONFIG_DOMAIN: "domain", CONFIG_SECURECOOKIES: "secureCookies", CONFIG_COOKIEPATH: "cookiePath", CONFIG_SCREEN_TITLE_PARENT_ID: "screenTitleParentId", CONFIG_SENDING_OMNITURE_ENABLED: "omnitureEnabled", CONFIG_OMNITURE_HOST: "omnitureHost", CONFIG_PAGE_CHANNEL: "pageChannel", CONFIG_MINIMIZE_HEAD_REQUESTS: "minimizeHeadRequests", CONFIG_CONVERTRO_SCRIPT_LOCATION: "convertroFileLocation", CONFIG_THROW_EXCEPTIONS: "throwExceptions", PARAM_CID: "cid",
    PARAM_PRIORITY_CODE: "priorityCode", PARAM_AD_ID: "adid", PARAM_PRODUCT_ID: "productid", PARAM_TEST: "test", EVENT_CLICK: "click", EVENT_CHANGE: "change", EVENT_SUBMIT: "submit", EVENT_PAGELOAD: "pageView", EVENT_PAGEDETAIL: "pageDetail", EVENT_PAGEUNLOAD: "pageUnload", EVENT_DISQUAL: "disqual", EVENT_PRINT: "print", EVENT_ABTEST: "abTest", EVENT_LOGIN: "login", EVENT_ACCOUNT: "createAccount", EVENT_OMNITURE_COOKIE_REQUESTED: "OmnitureCookieRequested", EVENT_OII_ACCOUNT_RECOVERY_NAME: "oiiAccountRecovery", EVENT_OII_SIGNIN_ERROR_NAME: "oiiSignInError",
    EVENT_SEARCH_NAME: "search", EVENT_FIELD_VALIDATION_NAME: "fieldValidation", EVENT_SCREEN_LOAD_SUCCESS: "ScreenLoad:Success", EVENT_SCREEN_LOAD_DETAIL: "DataLoad:Detail", EVENT_SIGNIN_SUCCESS: "SignIn:Success", EVENT_CREATEACCOUNT_SUCCESS: "CreateAccount:Success", EVENT_MOJO_ABTEST: "ABTest:Success", EVENT_DISQUAL_EVENT: "disqualEvent", EVENT_OII_ACCOUNT_RECOVERY: "OIIAccountRecoveryError", EVENT_OII_SIGNIN_ERROR: "OIISignInError", EVENT_PRODUCT_OFFERING_VIEW: "ProductOfferingView", EVENT_SEARCH_PERFORMED: "SearchPerformed",
    EVENT_EXPLICIT_CHANGE: "ExplicitChangeEvent", EVENT_FIELD_VALIDATION: "FieldValidationEvent", EVENT_CREATE_ACCOUNT_FROM_MTT_DASHBOARD: "DashboardCreateAccountDetected", EVENT_SIGNOUT_DETECTED: "SignOut:Success", COOKIE_CISID: "cisession", COOKIE_ADOBE_AUDIENCE: "aam_did", COOKIE_OMNITURE: "s_vi", COOKIE_TT_IPGEO: "tt_ipgeo", COOKIE_TTO_LOCATION: "tto_location", CURRENT_TAX_YEAR: "2013", CLIENT_VERSION: "2.0.26", SCHEMA_VERSION: "1.0"}, searchEngineList: [
    {d: "daum", u: "http://www.daum.net/", p: "q"},
    {d: "eniro", u: "http://www.eniro.se/",
        p: "search_word"},
    {d: "naver", u: "http://www.naver.com/", p: "query"},
    {d: "google", u: "http://www.google.com/", p: "q"},
    {d: "yahoo", u: "http://www.yahoo.com/", p: "p"},
    {d: "msn", u: "http://www.msn.com/", p: "q"},
    {d: "bing", u: "http://www.bing.com/", p: "q"},
    {d: "aol", u: "http://www.aol.com/", p: "query"},
    {d: "aol", u: "http://www.aol.com/", p: "encquery"},
    {d: "aol", u: "http://www.aol.com/", p: "q"},
    {d: "lycos", u: "http://www.lycos.com/", p: "query"},
    {d: "ask", u: "http://www.ask.com/", p: "q"},
    {d: "altavista", u: "http://www.altavista.com/",
        p: "q"},
    {d: "netscape", u: "http://search.netscape.com/", p: "query"},
    {d: "cnn", u: "http://www.cnn.com/SEARCH/", p: "query"},
    {d: "about", u: "http://www.about.com/", p: "terms"},
    {d: "mamma", u: "http://www.mamma.com/", p: "query"},
    {d: "alltheweb", u: "http://www.alltheweb.com/", p: "q"},
    {d: "voila", u: "http://www.voila.fr/", p: "rdata"},
    {d: "virgilio", u: "http://search.virgilio.it/", p: "qs"},
    {d: "live", u: "http://www.bing.com/", p: "q"},
    {d: "baidu", u: "http://www.baidu.com/", p: "wd"},
    {d: "alice", u: "http://www.alice.com/", p: "qs"},
    {d: "yandex",
        u: "http://www.yandex.com/", p: "text"},
    {d: "najdi", u: "http://www.najdi.org.mk/", p: "q"},
    {d: "mama", u: "http://www.mamma.com/", p: "query"},
    {d: "seznam", u: "http://www.seznam.cz/", p: "q"},
    {d: "search", u: "http://www.search.com/", p: "q"},
    {d: "wp", u: "http://www.wp.pl/", p: "szukaj"},
    {d: "onetcenter", u: "http://online.onetcenter.org/", p: "qt"},
    {d: "szukacz", u: "http://www.szukacz.pl/", p: "q"},
    {d: "yam", u: "http://www.yam.com/", p: "k"},
    {d: "pchome", u: "http://www.pchome.com/", p: "q"},
    {d: "kvasir", u: "http://www.kvasir.no/", p: "q"},
    {d: "sesam",
        u: "http://sesam.no/", p: "q"},
    {d: "ozu", u: "http://www.ozu.es/", p: "q"},
    {d: "terra", u: "http://www.terra.com/", p: "query"},
    {d: "mynet", u: "http://www.mynet.com/", p: "q"},
    {d: "ekolay", u: "http://www.ekolay.net/", p: "q"},
    {d: "rambler", u: "http://www.rambler.ru/", p: "words"}
], debug: function () {
    try {
        if ("false" !== (CI.configManager.getConfig(CI.consts.CONFIG_DEBUG) || "false"))showDebug(), debug(arguments[0]), window.console && console.log.apply && (window.console.firebug ? console.log.apply(this, arguments) : console.log.apply(console,
            arguments))
    } catch (a) {
        if (CI.util.getThrowExceptionConfig())throw a;
    }
}};
CI.jquery = CI.jquery || {};
CI.$ = CI.jquery;
CI.$.cookie = CI.$.cookie || {};
CI.$.timer = CI.$.timer || {};
CI.clientLogger = CI.clientLogger || {};
CI.clientLogger.warn = CI.clientLogger.warn || {};
CI.clientLogger.error = CI.clientLogger.error || {};
CI.tracker = function () {
    CI.debug("CI.tracker created")
};
CI.tracker.prototype = {docAlias: document, navAlias: navigator, winAlias: window, init: function (a, b, c, j, e) {
    try {
        this.loadJquery(j), this.loadConfig(b, c), this.loadClientLogger(e), this.checkBrowser(), this.initCookies(), this.instrument(), this.setDNT(), this.trackThirdPartyEvents(), this.setTestName()
    } catch (q) {
        if (CI.debug(q.message), CI.clientLogger.error && CI.clientLogger.error("[cil error]: exception occurred during CIL init.. " + q.message), CI.util.getThrowExceptionConfig())throw q;
    }
}, loadClientLogger: function (a) {
    try {
        "undefined" !== typeof a && null != a && (CI.clientLogger = a, a.warn && (CI.clientLogger.warn = a.warn), a.error && (CI.clientLogger.error = a.error))
    } catch (b) {
        CI.debug("could not load client logger")
    }
}, loadJquery: function (a) {
    if ("undefined" !== typeof a && null != a) {
        CI.jquery = CI.$ = a;
        if (a.cookie)CI.$.cookie = a.cookie; else if (jQuery.cookie)CI.$.cookie = jQuery.cookie; else throw Error("no jquery in scope to set cookie plugin");
        if (a.timer)CI.$.timer = a.timer; else if (jQuery.timer)CI.$.timer = jQuery.timer; else throw Error("no jquery in scope to set timer plugin");
    } else if (CI.debug("no client namespaced jquery in scope -- trying standard"), CI.clientLogger.warn && CI.clientLogger.warn("no client jquery in scope -- trying standard"), jQuery) {
        CI.jquery = CI.$ = jQuery;
        if (jQuery.cookie)CI.$.cookie = jQuery.cookie; else throw CI.clientLogger.error && CI.clientLogger.error("no jquery in scope to set cookie plugin"), Error("no jquery in scope to set cookie plugin");
        if (jQuery.timer)CI.$.timer = jQuery.timer; else throw CI.clientLogger.error && CI.clientLogger.error("no jquery in scope to set timer plugin"),
            Error("no jquery in scope to set timer plugin");
    } else throw CI.clientLogger.error && CI.clientLogger.error("no jquery in scope"), Error("no jquery in scope");
}, loadConfig: function (a, b) {
    if ("undefined" == typeof a || "" == a)throw Error("Invalid config path: " + a);
    if (void 0 !== b)try {
        var c = CI.$.parseXML(b);
        $xml = CI.$(c);
        CI.configManager.init($xml)
    } catch (j) {
        throw CI.debug("Invalid config xml: " + j.message), Error("Invalid config xml: " + j.message);
    } else CI.$.ajax({type: "GET", async: !1, url: a, dataType: "xml", error: function (a, b) {
        CI.clientLogger.error && CI.clientLogger.error("[cil error]: could not load CIL config: " + b);
        throw Error("could not load CIL config: " + b);
    }, success: CI.configManager.init})
}, initCookies: function () {
    CI.data.setSessionId(CI.cookies.getSession());
    var a = CI.cookies.getCookieValueByName(CI.consts.COOKIE_OMNITURE);
    if (CI.clientLogger.warn) {
        var b = document.cookie, c = b.split("; ").length;
        CI.clientLogger.warn("[cil info]: number of cookies: " + c + " size of document.cookie: " + b.length);
        null == a && CI.clientLogger.warn("[cil warn]: omniture cookie not detected ... ")
    }
    null ==
    a && (a = {}, a.eventType = CI.consts.EVENT_OMNITURE_COOKIE_REQUESTED, CI.data.fillAndCaptureEvent(a))
}, checkBrowser: function () {
    CI.util.isIEVerion8() && (CI.data.isIE8 = !0)
}, instrument: function () {
    var a = CI.consts, b = CI.configManager;
    this.enableUnloadTracking();
    b.hasGlobalTracker(a.EVENT_CLICK) && this.enableClickTracking();
    b.hasGlobalTracker(a.EVENT_CHANGE) && this.enableChangeTracking();
    var c = function () {
        var a = {};
        a.eventType = CI.consts.EVENT_PRINT;
        CI.data.fillAndCaptureEvent(a)
    }, j = 0;
    try {
        window.onbeforeprint = c, window.matchMedia &&
            window.matchMedia("print").addListener(function (a) {
                a.matches && (a = (new Date).getTime(), 5E3 < a - j ? (j = a, a = !0) : a = !1, a && c())
            })
    } catch (e) {
        CI.debug("window.onbeforeprint not supported " + e.message)
    }
}, trackThirdPartyEvents: function () {
    "undefined" != typeof Mojo && "function" == typeof Mojo.events.pubsub.subscribeForEvent && (Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_SCREEN_LOAD_SUCCESS, this.trackPageLoad, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_SCREEN_LOAD_DETAIL, this.mojoPageDetailHandler,
        this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_SIGNIN_SUCCESS, this.mojoPageSignInHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_CREATEACCOUNT_SUCCESS, this.mojoCreateAccountHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_DISQUAL_EVENT, this.disqualHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_MOJO_ABTEST, this.abTestHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_OII_ACCOUNT_RECOVERY, this.oiiErrorHandler, this),
        Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_OII_SIGNIN_ERROR, this.oiiSignInErrorHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_PRODUCT_OFFERING_VIEW, this.productOfferingViewHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_SEARCH_PERFORMED, this.searchPerformedHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_EXPLICIT_CHANGE, this.handleExplicitChangeEvent, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_FIELD_VALIDATION, this.handleFieldValidation,
        this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_CREATE_ACCOUNT_FROM_MTT_DASHBOARD, this.mojoCreateAccountDetectedHandler, this), Mojo.events.pubsub.subscribeForEvent(CI.consts.EVENT_SIGNOUT_DETECTED, this.clearAuthIdCookieCache, this))
}, clearAuthIdCookieCache: function () {
    try {
        CI.data.getAppData().AUTH_ID = null
    } catch (a) {
        CI.clientLogger.error && CI.clientLogger.error("[cil error]: error clearing authId from cache: " + a.message)
    }
}, setDNT: function () {
    var a = navigator.doNotTrack;
    if (null == a || "undefined" ==
        a)a = navigator.msDoNotTrack;
    if ("yes" == a || !0 == a)CI.data.setDoNotTrack(), CI.debug("Do Not Track (DNT) is set")
}, setTestName: function () {
    var a = CI.util.getUrlParameter(CI.consts.PARAM_TEST);
    CI.util.isEmpty(a) || CI.data.setTestName(a)
}, productOfferingViewHandler: function (a) {
    if (a instanceof Object) {
        var b = a.recommendation, c = a.checkboxes, j = a.userstate, e = {};
        e.version = a.version;
        e.recommendation = b;
        e.checkboxes = c;
        a = {};
        a.eventType = CI.consts.EVENT_PAGEDETAIL;
        b = {};
        b.userState = j;
        b.pageConfig = e;
        a.value = b;
        CI.data.fillAndCaptureEvent(a)
    }
},
    searchPerformedHandler: function (a) {
        var a = a.query, b = {};
        b.eventType = CI.consts.EVENT_SEARCH_NAME;
        b.value = a.replace(/(\r\n|\n|\r)/gm, " ");
        CI.data.fillAndCaptureEvent(b)
    }, mojoPageDetailHandler: function (a, b) {
        var c = {};
        c.eventType = CI.consts.EVENT_PAGEDETAIL;
        c.screenId = a;
        c.value = b;
        CI.data.fillAndCaptureEvent(c)
    }, mojoPageSignInHandler: function () {
        this.beaconEvent(CI.consts.EVENT_SIGNIN_SUCCESS);
        var a = {};
        a.eventType = CI.consts.EVENT_LOGIN;
        CI.data.fillAndCaptureEvent(a)
    }, mojoCreateAccountDetectedHandler: function () {
        this.beaconEvent(CI.consts.EVENT_CREATE_ACCOUNT_FROM_MTT_DASHBOARD);
        var a = CI.data.getUserId();
        void 0 != a && null != a && (a = CI.util.getMD5value(a), convertroclient.initializeOnPageLoad(), convertroclient.beaconNewAuthorizationEvent(CI.consts.CURRENT_TAX_YEAR, a))
    }, mojoCreateAccountHandler: function () {
        var a = {};
        a.eventType = CI.consts.EVENT_ACCOUNT;
        CI.data.fillAndCaptureEventImmediately(a)
    }, disqualHandler: function (a) {
        try {
            var b = a.DisqualificationLocation, c = a.DisqualificationReasons, a = {};
            a.eventType = CI.consts.EVENT_DISQUAL;
            a.screenId = b;
            a.value = c.join();
            CI.data.fillAndCaptureEventImmediately(a)
        } catch (j) {
            if (CI.debug("Error capturing disqual event: " +
                j.message), CI.util.getThrowExceptionConfig())throw j;
        }
    }, abTestHandler: function (a) {
        if (a instanceof Object && (a = a.segment)) {
            var b = {};
            b.eventType = CI.consts.EVENT_ABTEST;
            b.value = a;
            CI.data.fillAndCaptureEvent(b)
        }
    }, oiiErrorHandler: function (a) {
        if (a instanceof Object) {
            var a = a.event, b = {};
            b.eventType = CI.consts.EVENT_OII_ACCOUNT_RECOVERY_NAME;
            b.value = a;
            CI.data.fillAndCaptureEvent(b)
        }
    }, oiiSignInErrorHandler: function (a) {
        if (a instanceof Object && (a = a.errorcode)) {
            var b = {};
            b.eventType = CI.consts.EVENT_OII_SIGNIN_ERROR_NAME;
            b.value = a;
            CI.data.fillAndCaptureEvent(b)
        }
    }, trackPageLoad: function (a) {
        var b = {};
        b.eventType = CI.consts.EVENT_PAGELOAD;
        b.value = a;
        CI.data.fillAndCaptureEvent(b);
        this.beaconPage(a);
        CI.data.isIE8 && this.enableIE8DropdownChangeTracking()
    }, beaconPage: function (a) {
        null != a && "" != a && (a = CI.configManager.getBeacon(a)) && this.fireBeacons(a)
    }, beaconEvent: function (a) {
        null != a && "" != a && (a = CI.configManager.getEventBeacon(a)) && this.fireBeacons(a)
    }, fireBeacons: function (a) {
        for (var b = 0; b < a.length; b++)this.fireBeacon(a[b])
    }, fireBeacon: function (a) {
        var b =
            "", b = CI.data.isDoNotTrack() ? "1" : "0", c = CI.configManager.getBeaconConfigBase(a.configName);
        CI.affiliate_library.beacon({beaconFor: a.configName, src: a.src, type: a.type, category: a.category, baseUrl: c, dntFlag: b}, null, null)
    }, enableClickTracking: function () {
        this.addListener(this.docAlias, "click", this.handleClickEvent)
    }, enableChangeTracking: function () {
        this.addListener(this.docAlias, "change", this.handleChangeEvent)
    }, enableIE8DropdownChangeTracking: function () {
        CI.$("select").off(".ci", this.handleChangeEvent);
        CI.$("select").on("change.ci",
            this.handleChangeEvent)
    }, enableUnloadTracking: function () {
        this.addListener(this.winAlias, "unload", this.handleUnload)
    }, addListener: function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }, handleUnload: function () {
        var a = {};
        a.eventType = CI.consts.EVENT_PAGEUNLOAD;
        CI.data.fillAndCaptureEventImmediately(a)
    }, handleClickEvent: function (a) {
        try {
            var b = CI.util.getCrossBrowserEvent(a), c = CI.configManager.doEventCapture(b);
            if (null != c) {
                a = {};
                a.eventType = b.type;
                CI.util.addToObjIfNotNull(c,
                    "tagName", a);
                CI.util.addToObjIfNotNull(c, "name", a);
                CI.util.addToObjIfNotNull(c, "id", a);
                CI.util.addToObjIfNotNull(c, "value", a);
                CI.util.addToObjIfNotNull(c, "className", a);
                CI.util.addToObjIfNotNull(c, "type", a);
                CI.util.addToObjIfNotNull(c, "href", a);
                if (c.attributes) {
                    if (c.attributes["data-ci"]) {
                        var j = c.attributes["data-ci"];
                        j.nodeValue && (a.data_ci = j.nodeValue)
                    }
                    c.attributes["data-timeline-year"] && (j = c.attributes["data-timeline-year"], j.nodeValue && (a.data_timeline_year = j.nodeValue))
                }
                var e = CI.$(c).text(),
                    q = null != e ? CI.$.trim(e) : "";
                CI.util.addToObjIfNotNull(c, "src", a);
                CI.util.addToObjIfNotNull(c, "alt", a);
                if ("input" == a.tagName.toLowerCase()) {
                    var m = c.type.toLowerCase();
                    if (("radio" == m || "checkbox" == m) && CI.util.isIEVerion8())a.eventType = "change", "checkbox" == m && CI.util.addToObjIfNotNull(c, "checked", a, "value"); else if ("submit" != m && "reset" != m)return
                } else if ("a" == a.tagName.toLowerCase() || "button" == a.tagName.toLowerCase())a.value = "" != q ? CI.util.removeLineBreaks(q) : a.id;
                CI.data.fillAndCaptureEventImmediately(a)
            }
        } catch (r) {
            if (CI.clientLogger.error &&
                CI.clientLogger.error("error capturing click event: " + r.message), CI.debug("Error capturing click event: " + r.message), CI.util.getThrowExceptionConfig())throw r;
        }
    }, handleFieldValidation: function (a) {
        var b = {};
        b.eventType = CI.consts.EVENT_FIELD_VALIDATION_NAME;
        b.id = a.id;
        b.value = a.errorCode;
        CI.data.fillAndCaptureEvent(b)
    }, handleExplicitChangeEvent: function (a) {
        var b = {};
        b.eventType = CI.consts.EVENT_CHANGE;
        b.id = a.id;
        b.value = "true";
        CI.data.fillAndCaptureEvent(b)
    }, handleChangeEvent: function (a) {
        try {
            var b = CI.util.getCrossBrowserEvent(a),
                c = CI.configManager.doEventCapture(b);
            if (null != c) {
                a = {};
                a.eventType = b.type;
                CI.util.addToObjIfNotNull(c, "tagName", a);
                CI.util.addToObjIfNotNull(c, "name", a);
                CI.util.addToObjIfNotNull(c, "id", a);
                CI.util.addToObjIfNotNull(c, "value", a);
                CI.util.addToObjIfNotNull(c, "className", a);
                CI.util.addToObjIfNotNull(c, "type", a);
                if ("input" == a.tagName.toLowerCase()) {
                    var j = c.type.toLowerCase();
                    if ("password" == j || "email" == j)return;
                    "tel" == j && (a.value = "true");
                    if ("text" == j) {
                        if (!CI.configManager.doChangeInputCapture(c.id))return;
                        a.value && (a.value = CI.util.removeLineBreaks(a.value))
                    }
                    "checkbox" == j && CI.util.addToObjIfNotNull(c, "checked", a, "value")
                }
                CI.data.fillAndCaptureEvent(a)
            }
        } catch (e) {
            if (CI.debug("Error capturing change event: " + e.message), CI.clientLogger.error && CI.clientLogger.error("[cil error]: error capturing change event: " + e.message), CI.util.getThrowExceptionConfig())throw e;
        }
    }, setDataMapping: function (a) {
        CI.mapping.setDataMappingJson(a)
    }};
"object" !== typeof JSON && (JSON = {});
(function () {
    function a(a) {
        return 10 > a ? "0" + a : a
    }

    function b(a) {
        e.lastIndex = 0;
        return e.test(a) ? '"' + a.replace(e, function (a) {
            var b = r[a];
            return"string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function c(a, e) {
        var j, r, h, n, A = q, f, d = e[a];
        d && ("object" === typeof d && "function" === typeof d.toJSON) && (d = d.toJSON(a));
        "function" === typeof u && (d = u.call(e, a, d));
        switch (typeof d) {
            case "string":
                return b(d);
            case "number":
                return isFinite(d) ? String(d) : "null";
            case "boolean":
            case "null":
                return String(d);
            case "object":
                if (!d)return"null";
                q += m;
                f = [];
                if ("[object Array]" === Object.prototype.toString.apply(d)) {
                    n = d.length;
                    for (j = 0; j < n; j += 1)f[j] = c(j, d) || "null";
                    h = 0 === f.length ? "[]" : q ? "[\n" + q + f.join(",\n" + q) + "\n" + A + "]" : "[" + f.join(",") + "]";
                    q = A;
                    return h
                }
                if (u && "object" === typeof u) {
                    n = u.length;
                    for (j = 0; j < n; j += 1)"string" === typeof u[j] && (r = u[j], (h = c(r, d)) && f.push(b(r) + (q ? ": " : ":") + h))
                } else for (r in d)Object.prototype.hasOwnProperty.call(d, r) && (h = c(r, d)) && f.push(b(r) + (q ? ": " : ":") + h);
                h = 0 === f.length ? "{}" : q ? "{\n" + q + f.join(",\n" +
                    q) + "\n" + A + "}" : "{" + f.join(",") + "}";
                q = A;
                return h
        }
    }

    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    });
    var j = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, q, m, r = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, u;
    "function" !== typeof JSON.stringify && (JSON.stringify = function (a, b, e) {
        var j;
        m = q = "";
        if ("number" === typeof e)for (j = 0; j < e; j += 1)m += " "; else"string" === typeof e && (m = e);
        if ((u = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length))throw Error("JSON.stringify");
        return c("", {"": a})
    });
    "function" !== typeof JSON.parse && (JSON.parse = function (a, b) {
        function c(a, n) {
            var e, f, d = a[n];
            if (d && "object" === typeof d)for (e in d)Object.prototype.hasOwnProperty.call(d, e) && (f = c(d, e), void 0 !== f ? d[e] = f : delete d[e]);
            return b.call(a, n, d)
        }

        var e, a = String(a);
        j.lastIndex = 0;
        j.test(a) && (a = a.replace(j, function (a) {
            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return e = eval("(" + a + ")"), "function" === typeof b ? c({"": e}, "") : e;
        throw new SyntaxError("JSON.parse");
    })
})();
function showDebug() {
    window.top.debugWindow = window.open("", "Debug", "left=0,top=0,width=700,height=200,scrollbars=yes,status=yes,resizable=yes");
    window.top.debugWindow.opener = self;
    window.top.debugWindow.document.open();
    window.top.debugWindow.document.write("<HTML><HEAD><TITLE>Debug Window</TITLE></HEAD><BODY><PRE>\n")
}
function debug(a) {
    window.top.debugWindow && !window.top.debugWindow.closed && window.top.debugWindow.document.write(a + "\n")
}
function hideDebug() {
    window.top.debugWindow && !window.top.debugWindow.closed && (window.top.debugWindow.close(), window.top.debugWindow = null)
};
CI.configManager = function () {
    function a(a) {
        a = t[a];
        return"undefined" == a || null == a ? null : a
    }

    function b(a) {
        var b = CI.$(a).attr("eventType"), c = [];
        CI.$(a).find("element").each(function () {
            var a = CI.$(this).attr("type"), n = CI.$(this).attr("targetId"), b = CI.$(this).attr("searchParent");
            c.push({type: a, targetId: n, searchParent: b})
        });
        return new h(b, c)
    }

    function c(a) {
        var b = CI.$(a).attr("tag"), c = CI.$(a).attr("value"), a = CI.$(a).attr("type");
        return{tag: b, value: c, type: a}
    }

    function j(a) {
        var b = CI.$(a).attr("configName"), c = CI.$(a).attr("src"),
            d = CI.$(a).attr("type"), a = CI.$(a).attr("category");
        return{configName: b, src: c, type: d, category: a}
    }

    function e(a, b) {
        var c = a.parentNode;
        return null != c && CI.util.objContainsField(c, "tagName") ? b.containNonSearchType(c.tagName) ? c : e(c, b) : null
    }

    var q = {}, m = {}, r = [], u = {}, t = {}, s = {}, F = {}, D = function (a, b, c, d) {
            return{getTrackers: function () {
                return b
            }, getTracker: function (a) {
                for (var n = 0; n < b.length; n++) {
                    var c = b[n];
                    if (c.getEventType() == a)return c
                }
                return null
            }, getBeacons: function () {
                return d
            }, getCustomVars: function () {
                return c
            }}
        },
        h = function (a, b) {
            return{getEventType: function () {
                return a
            }, containsType: function (a) {
                return null == getType(a) ? !1 : !0
            }, containNonSearchType: function (a) {
                var b = this.getType(a);
                return null != b && b.type == a.toLowerCase() && !CI.util.objContainsField(b, "searchParent") ? !0 : !1
            }, getType: function (a) {
                for (var n = 0; n < b.length; n++) {
                    var c = b[n];
                    if (c.type == a.toLowerCase())return c
                }
                return null
            }, containsTypeAndTargetId: function (a, n) {
                if (null != a && null != n)for (var c = 0; c < b.length; c++) {
                    var e = b[c];
                    if (e.type == a.toLowerCase() && e.targetId ==
                        n)return!0
                }
                return!1
            }}
        };
    return{init: function (a) {
        try {
            CI.$(a).find("global > configs > config").each(function () {
                var a = CI.$(this).attr("name"), b = CI.$(this).attr("value");
                q[a] = b
            });
            if (!q.domain) {
                var e = window.location.hostname, f = e;
                if (!/^(((([0-9A-F]{1,4}:){7}([0-9A-F]{1,4}|:))|(([0-9A-F]{1,4}:){6}(:[0-9A-F]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-F]{1,4}:){5}(((:[0-9A-F]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-F]{1,4}:){4}(((:[0-9A-F]{1,4}){1,3})|((:[0-9A-F]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-F]{1,4}:){3}(((:[0-9A-F]{1,4}){1,4})|((:[0-9A-F]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-F]{1,4}:){2}(((:[0-9A-F]{1,4}){1,5})|((:[0-9A-F]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-F]{1,4}:){1}(((:[0-9A-F]{1,4}){1,6})|((:[0-9A-F]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-F]{1,4}){1,7})|((:[0-9A-F]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?|(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3})$/gi.test(e)) {
                    var d =
                        e.split("."), g = d.length;
                    2 <= g && (f = d[g - 2] + "." + d[g - 1])
                }
                q.domain = f
            }
            CI.$(a).find("global > trackers > tracker").each(function () {
                r.push(b(CI.$(this).get(0)))
            });
            CI.$(a).find("global > beaconConfigs > beaconConfig").each(function () {
                var a = CI.$(this).get(0), b = CI.$(a).attr("name"), a = CI.$(a).attr("base");
                CI.debug("beaconConfig: name=" + b + " base=" + a);
                s[b] = a
            });
            CI.$(a).find("global > cookieConfigs > cookieConfig").each(function () {
                var a = CI.$(this).get(0), b = CI.$(a).attr("cookieName"), n = CI.$(a).attr("expirationPeriodType"),
                    a = CI.$(a).attr("expirationPeriod"), c = 0, c = parseFloat(a);
                "minutes" == n && (c /= 1440);
                F[b] = {periodType: n, valueFromConfig: a, expireAfter: c}
            });
            CI.$(a).find("global > data > field").each(function () {
                var a = CI.$(this).get(0), b = CI.$(a).attr("target"), n = CI.$(a).attr("path"), a = CI.$(a).attr("type");
                m[b] = {target: b, path: n, type: a}
            });
            CI.$(a).find("events > event").each(function () {
                var a = CI.$(this).get(0), b = "", n = [], b = CI.consts[CI.$(a).attr("name")];
                if ("undefined" != b && null != b)CI.$(a).find("beacon").each(function () {
                    n.push(j(CI.$(this).get(0)))
                });
                else throw Error("Invalid event name found in config: " + CI.$(a).attr("name"));
                u[b] = n
            });
            CI.$(a).find("pages > page").each(function () {
                for (var a = [], n = [], d = [], f = CI.$(this).attr("id"), g = CI.$(this).find("tracker"), e = 0; e < g.length; e++)a.push(b(g.get(e)));
                g = CI.$(this).find("customVar");
                for (e = 0; e < g.length; e++)n.push(c(g.get(e)));
                g = CI.$(this).find("beacon");
                for (e = 0; e < g.length; e++)d.push(j(g.get(e)));
                t[f] = new D(f, a, n, d)
            })
        } catch (l) {
            if (CI.clientLogger.error && CI.clientLogger.error("exception occurred during config.init " +
                l.message), CI.debug("could not initialize config: " + l.message), CI.util.getThrowExceptionConfig())throw l;
        }
    }, getConfig: function (a) {
        return q[a]
    }, setConfig: function (a, b) {
        q[a] = b
    }, hasGlobalTracker: function (a) {
        for (var b = 0; b < r.length; b++)if (r[b].getEventType() == a)return!0;
        return!1
    }, getCustomVars: function (b) {
        return(b = a(b)) ? b.getCustomVars() : null
    }, getBeacon: function (b) {
        b = a(b);
        return null != b ? b.getBeacons() : null
    }, getBeaconConfigBase: function (a) {
        return s[a]
    }, getEventBeacon: function (a) {
        return u[a]
    }, getCookieExpirationConfig: function (a) {
        return F[a]
    },
        doEventCapture: function (b) {
            var c;
            c = b.type;
            var f = null, d = a(CI.data.getScreenId());
            d && (f = d.getTracker(c));
            if (null == f)a:{
                for (f = 0; f < r.length; f++)if (d = r[f], d.getEventType() == c) {
                    f = d;
                    break a
                }
                f = null
            }
            c = f;
            if (null == c)return CI.debug("configManager.doEventCapture not configured to caputer " + b.type), null;
            if (!CI.util.objContainsField(b.target, "tagName"))return null;
            f = c.getType(b.target.tagName);
            return null != f ? CI.util.objContainsField(f, "searchParent") ? e(b.target, c) : b.target : null
        }, doChangeInputCapture: function (b) {
            a:{
                var c =
                    CI.data.getScreenId();
                if (null != c && (c = a(c), null != c && (c = c.getTracker("change"), null != c))) {
                    b = c.containsTypeAndTargetId("input", b);
                    break a
                }
                b = !1
            }
            return b
        }, getDataField: function (a) {
            return m[a]
        }}
}();
CI.util = {getGuid: function (a) {
    for (var b = (new Date).getTime() + "", a = a - b.length, c = 0; c < a; c++)b += Math.floor(15 * Math.random()).toString(15) + (8 == c || 12 == c || 16 == c || 20 == c ? "-" : "");
    return b
}, getCrossBrowserEvent: function (a) {
    if (a)this.eventObj = a; else if (this.eventObj = window.event, !this.eventObj)for (var b = window.frames.length, a = 0; a < b; a++) {
        try {
            this.eventObj = window.frames[a].event
        } catch (c) {
        }
        if (this.eventObj)break
    }
    if (a = this.eventObj)this.type = a.type, a.target ? this.target = a.target : a.srcElement && (this.target = a.srcElement),
        3 == this.target.nodeType && (this.target = this.target.parentNode), a.which ? this.which = a.which : a.keyCode ? this.which = a.keyCode : a.button && (this.which = a.botton);
    return this
}, getMD5value: function (a) {
    var b = "", c = "";
    if ("undefined" != a && "" != a)var c = CI.md5.hex_md5(a), b = c.substr(0, 4), j = Math.round(a.length / 2), c = a.substr(0, j), a = a.substr(j, a.length - 1), b = b + a + c;
    return b
}, addToObjIfNotNull: function (a, b, c, j) {
    this.objContainsField(a, b) && (null != j && "undefined" != j ? c[j] = a[b] : c[b] = a[b])
}, objContainsField: function (a, b) {
    return null !=
        a && "undefined" != a && ("undefined" != typeof a[b] && null != a[b] && b in a) && (0 < a[b].length || "boolean" === typeof a[b] || "object" === typeof a[b]) ? !0 : !1
}, isEmpty: function (a) {
    return void 0 === a || null == a || 0 >= a.length ? !0 : !1
}, doesObjectContainAnyFields: function (a) {
    for (var b in a)if (a.hasOwnProperty(b))return!0;
    return!1
}, getUrlParameter: function (a) {
    return decodeURIComponent((RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(window.location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}, getIsOmnitureSendingFlag: function () {
    var a =
        CI.configManager.getConfig(CI.consts.CONFIG_SENDING_OMNITURE_ENABLED);
    return void 0 != a && /^true$/i.test(a) ? !0 : !1
}, getThrowExceptionConfig: function () {
    var a = CI.configManager.getConfig(CI.consts.CONFIG_THROW_EXCEPTIONS);
    return void 0 != a && /^true$/i.test(a) ? !0 : !1
}, pad: function (a) {
    norm = Math.abs(Math.floor(a));
    return(10 > norm ? "0" : "") + norm
}, formatLocalDate: function (a) {
    if (!a)return"";
    var b = a.getTimezoneOffset(), b = (0 > b ? "+" : "-") + this.pad(parseInt(Math.abs(b / 60)), 2) + this.pad(Math.abs(b % 60), 2);
    return a.getFullYear() +
        "-" + this.pad(a.getMonth() + 1) + "-" + this.pad(a.getDate()) + "T" + this.pad(a.getHours()) + ":" + this.pad(a.getMinutes()) + ":" + this.pad(a.getSeconds()) + b
}, dateToISOString: function (a) {
    return a.toISOString ? a.toISOString() : a.getUTCFullYear() + "-" + this.pad(a.getUTCMonth() + 1) + "-" + this.pad(a.getUTCDate()) + "T" + this.pad(a.getUTCHours()) + ":" + this.pad(a.getUTCMinutes()) + ":" + this.pad(a.getUTCSeconds()) + "." + String((a.getUTCMilliseconds() / 1E3).toFixed(3)).slice(2, 5) + "Z"
}, getOmnitureTParamFormattedDate: function (a) {
    if (!a)return"";
    var b = a.getTimezoneOffset();
    return this.pad(a.getDate()) + "/" + this.pad(a.getMonth()) + "/" + a.getFullYear() + " " + this.pad(a.getHours()) + ":" + this.pad(a.getMinutes()) + ":" + this.pad(a.getSeconds()) + " " + a.getDay() + " " + b
}, getOmnitureEndpoint: function () {
    return CI.configManager.getConfig(CI.consts.CONFIG_OMNITURE_HOST)
}, getConvertroScriptLocation: function () {
    return CI.configManager.getConfig(CI.consts.CONFIG_CONVERTRO_SCRIPT_LOCATION)
}, removeLineBreaks: function (a) {
    try {
        return a.replace(/(\r\n|\n|\r)/gm, " ")
    } catch (b) {
        return CI.debug("could not remove line breaks from input string -- returning empty"),
            ""
    }
}, getFirstScreenText: function () {
    var a = "", b = CI.configManager.getConfig(CI.consts.CONFIG_SCREEN_TITLE_PARENT_ID);
    try {
        var c = document.getElementById(b);
        if (null != c) {
            var j = this.getFirstTextValue(c);
            null != j && (a = this.removeLineBreaks(j))
        }
    } catch (e) {
        CI.debug("Could not get page name: " + e.message)
    }
    return a
}, getFirstTextValue: function (a) {
    if (3 === a.nodeType && !(a.parentNode && "SCRIPT" === a.parentNode.nodeName)) {
        var b = a.nodeValue;
        if (void 0 != b && null != b && (b = CI.$.trim(b), 0 != b.length))return b
    }
    for (b = 0; b < a.childNodes.length; b++) {
        var c =
            this.getFirstTextValue(a.childNodes[b]);
        if (null != c)return c
    }
    return null
}, getHeaderValue: function (a) {
    var b = new XMLHttpRequest;
    b.open("HEAD", document.location, !1);
    b.send(null);
    var b = b.getAllResponseHeaders().toLowerCase(), b = b.replace(/\r\n/g, "\n"), c = b.indexOf(a), c = c + a.length + 1, a = b.indexOf("\n", c);
    return b.substring(c, a)
}, isIEVerion8: function () {
    try {
        0 < navigator.userAgent.toLowerCase().indexOf("msie 8.0") && (ieIE = !0)
    } catch (a) {
        if (CI.debug("Error determining if browser is IE8:" + a.message), CI.clientLogger.error &&
            CI.clientLogger.error("[cil error]: Error determining if browser is IE8:" + a.message), CI.util.getThrowExceptionConfig())throw a;
    }
    return!1
}, generateGuid: function () {
    var a;
    a = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
        var c = 16 * Math.random() | 0;
        return("x" == a ? c : c & 3 | 8).toString(16)
    });
    return a + "-" + (new Date).getTime()
}};
CI.md5 = function () {
    function a(a, h) {
        a[h >> 5] |= 128 << h % 32;
        a[(h + 64 >>> 9 << 4) + 14] = h;
        for (var f = 1732584193, d = -271733879, g = -1732584194, l = 271733878, p = 0; p < a.length; p += 16)var s = f, q = d, r = g, F = l, f = c(f, d, g, l, a[p + 0], 7, -680876936), l = c(l, f, d, g, a[p + 1], 12, -389564586), g = c(g, l, f, d, a[p + 2], 17, 606105819), d = c(d, g, l, f, a[p + 3], 22, -1044525330), f = c(f, d, g, l, a[p + 4], 7, -176418897), l = c(l, f, d, g, a[p + 5], 12, 1200080426), g = c(g, l, f, d, a[p + 6], 17, -1473231341), d = c(d, g, l, f, a[p + 7], 22, -45705983), f = c(f, d, g, l, a[p + 8], 7, 1770035416), l = c(l, f, d, g, a[p + 9], 12,
                -1958414417), g = c(g, l, f, d, a[p + 10], 17, -42063), d = c(d, g, l, f, a[p + 11], 22, -1990404162), f = c(f, d, g, l, a[p + 12], 7, 1804603682), l = c(l, f, d, g, a[p + 13], 12, -40341101), g = c(g, l, f, d, a[p + 14], 17, -1502002290), d = c(d, g, l, f, a[p + 15], 22, 1236535329), f = j(f, d, g, l, a[p + 1], 5, -165796510), l = j(l, f, d, g, a[p + 6], 9, -1069501632), g = j(g, l, f, d, a[p + 11], 14, 643717713), d = j(d, g, l, f, a[p + 0], 20, -373897302), f = j(f, d, g, l, a[p + 5], 5, -701558691), l = j(l, f, d, g, a[p + 10], 9, 38016083), g = j(g, l, f, d, a[p + 15], 14, -660478335), d = j(d, g, l, f, a[p + 4], 20, -405537848), f = j(f, d, g, l, a[p +
                9], 5, 568446438), l = j(l, f, d, g, a[p + 14], 9, -1019803690), g = j(g, l, f, d, a[p + 3], 14, -187363961), d = j(d, g, l, f, a[p + 8], 20, 1163531501), f = j(f, d, g, l, a[p + 13], 5, -1444681467), l = j(l, f, d, g, a[p + 2], 9, -51403784), g = j(g, l, f, d, a[p + 7], 14, 1735328473), d = j(d, g, l, f, a[p + 12], 20, -1926607734), f = b(d ^ g ^ l, f, d, a[p + 5], 4, -378558), l = b(f ^ d ^ g, l, f, a[p + 8], 11, -2022574463), g = b(l ^ f ^ d, g, l, a[p + 11], 16, 1839030562), d = b(g ^ l ^ f, d, g, a[p + 14], 23, -35309556), f = b(d ^ g ^ l, f, d, a[p + 1], 4, -1530992060), l = b(f ^ d ^ g, l, f, a[p + 4], 11, 1272893353), g = b(l ^ f ^ d, g, l, a[p + 7], 16, -155497632),
            d = b(g ^ l ^ f, d, g, a[p + 10], 23, -1094730640), f = b(d ^ g ^ l, f, d, a[p + 13], 4, 681279174), l = b(f ^ d ^ g, l, f, a[p + 0], 11, -358537222), g = b(l ^ f ^ d, g, l, a[p + 3], 16, -722521979), d = b(g ^ l ^ f, d, g, a[p + 6], 23, 76029189), f = b(d ^ g ^ l, f, d, a[p + 9], 4, -640364487), l = b(f ^ d ^ g, l, f, a[p + 12], 11, -421815835), g = b(l ^ f ^ d, g, l, a[p + 15], 16, 530742520), d = b(g ^ l ^ f, d, g, a[p + 2], 23, -995338651), f = e(f, d, g, l, a[p + 0], 6, -198630844), l = e(l, f, d, g, a[p + 7], 10, 1126891415), g = e(g, l, f, d, a[p + 14], 15, -1416354905), d = e(d, g, l, f, a[p + 5], 21, -57434055), f = e(f, d, g, l, a[p + 12], 6, 1700485571), l = e(l, f,
                d, g, a[p + 3], 10, -1894986606), g = e(g, l, f, d, a[p + 10], 15, -1051523), d = e(d, g, l, f, a[p + 1], 21, -2054922799), f = e(f, d, g, l, a[p + 8], 6, 1873313359), l = e(l, f, d, g, a[p + 15], 10, -30611744), g = e(g, l, f, d, a[p + 6], 15, -1560198380), d = e(d, g, l, f, a[p + 13], 21, 1309151649), f = e(f, d, g, l, a[p + 4], 6, -145523070), l = e(l, f, d, g, a[p + 11], 10, -1120210379), g = e(g, l, f, d, a[p + 2], 15, 718787259), d = e(d, g, l, f, a[p + 9], 21, -343485551), f = m(f, s), d = m(d, q), g = m(g, r), l = m(l, F);
        return[f, d, g, l]
    }

    function b(a, b, c, d, g, e) {
        a = m(m(b, a), m(d, e));
        return m(a << g | a >>> 32 - g, c)
    }

    function c(a, c, f, d, g, e, h) {
        return b(c & f | ~c & d, a, c, g, e, h)
    }

    function j(a, c, f, d, g, e, h) {
        return b(c & d | f & ~d, a, c, g, e, h)
    }

    function e(a, c, f, d, g, e, h) {
        return b(f ^ (c | ~d), a, c, g, e, h)
    }

    function q(b, c) {
        var f = r(b);
        16 < f.length && (f = a(f, b.length * h));
        for (var d = Array(16), g = Array(16), e = 0; 16 > e; e++)d[e] = f[e] ^ 909522486, g[e] = f[e] ^ 1549556828;
        f = a(d.concat(r(c)), 512 + c.length * h);
        return a(g.concat(f), 640)
    }

    function m(a, b) {
        var c = (a & 65535) + (b & 65535);
        return(a >> 16) + (b >> 16) + (c >> 16) << 16 | c & 65535
    }

    function r(a) {
        for (var b = [], c = (1 << h) - 1, d = 0; d < a.length * h; d +=
            h)b[d >> 5] |= (a.charCodeAt(d / h) & c) << d % 32;
        return b
    }

    function u(a) {
        for (var b = "", c = (1 << h) - 1, d = 0; d < 32 * a.length; d += h)b += String.fromCharCode(a[d >> 5] >>> d % 32 & c);
        return b
    }

    function t(a) {
        for (var b = F ? "0123456789ABCDEF" : "0123456789abcdef", c = "", d = 0; d < 4 * a.length; d++)c += b.charAt(a[d >> 2] >> 8 * (d % 4) + 4 & 15) + b.charAt(a[d >> 2] >> 8 * (d % 4) & 15);
        return c
    }

    function s(a) {
        for (var b = "", c = 0; c < 4 * a.length; c += 3)for (var d = (a[c >> 2] >> 8 * (c % 4) & 255) << 16 | (a[c + 1 >> 2] >> 8 * ((c + 1) % 4) & 255) << 8 | a[c + 2 >> 2] >> 8 * ((c + 2) % 4) & 255, e = 0; 4 > e; e++)b = 8 * c + 6 * e > 32 * a.length ?
            b + D : b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d >> 6 * (3 - e) & 63);
        return b
    }

    var F = 0, D = "", h = 8;
    return{hex_md5: function (b) {
        return t(a(r(b), b.length * h))
    }, b64_md5: function (b) {
        return s(a(r(b), b.length * h))
    }, str_md5: function (b) {
        return u(a(r(b), b.length * h))
    }, hex_hmac_md5: function (a, b) {
        return t(q(a, b))
    }, b64_hmac_md5: function (a, b) {
        return s(q(a, b))
    }, str_hmac_md5: function (a, b) {
        return u(q(a, b))
    }}
}();
CI.queue = function () {
    function a(a) {
        try {
            if ("" == t && (t = CI.configManager.getConfig(CI.consts.CONFIG_SERVICE)), a.event && a.event.event_name && "pageUnload" != a.event.event_name) {
                var m = JSON.stringify(a), h = a.application.app_id, n = "?eventCategory=" + a.event.event_category + "&eventName=" + a.event.event_name + "&eventId=" + a.event.event_id, s = a.session.properties.sequence_no;
                s && (n += "&sequenceNo=" + s);
                CI.$.ajax({type: "POST", url: t + n, data: m, headers: {client: h}, contentType: "application/json; charset=utf-8", async: !0, cache: !1,
                    beforeSend: b, success: c, error: j, complete: e})
            }
        } catch (f) {
            if (CI.clientLogger.error && CI.clientLogger.error("[cil error]: exception occurred during queue.sendRequest. " + f.message), CI.util.getThrowExceptionConfig())throw f;
        }
    }

    function b() {
        m = (new Date).getTime()
    }

    function c() {
        CI.debug("queue.requestSuccess")
    }

    function j() {
        "undefined" != typeof CI && (null != CI && "function" == typeof CI.debug) && CI.debug("CI.queue.requestError")
    }

    function e() {
        r = (new Date).getTime() - m;
        "undefined" != typeof CI && (null != CI && "function" == typeof CI.debug) &&
        CI.debug("CI.queue.requestComplete: duration=" + r + " ms")
    }

    var q = [], m = 0, r = 0, u, t = "";
    u = $.timer(function () {
        for (; 0 < q.length;) {
            var b = q.splice(0, 1);
            try {
                a(b[0])
            } catch (c) {
                "undefined" != typeof CI && (null != CI && "function" == typeof CI.debug) && CI.debug(c.message)
            }
        }
    });
    u.set({time: 1E3});
    try {
        $.timer(function () {
            u.play();
            "undefined" != typeof CI && (null != CI && "function" == typeof CI.debug) && CI.debug("CI.queue timer started")
        }).once(3E3)
    } catch (s) {
        u.play(), "undefined" != typeof CI && (null != CI && "function" == typeof CI.debug) && CI.debug("CI.queue timer started in catch block")
    }
    return{addEvent: function (a) {
        CI.configManager.getConfig(CI.consts.CONFIG_DEBUG);
        q.push(a)
    }, fireEvent: function (b) {
        a(b)
    }}
}();
CI.data = function () {
    function a() {
        var a = window.location.hostname;
        if (a != document.domain)for (var b = CI.searchEngineList, c = 0; c < b.length; c++) {
            var d = b[c].d, e = b[c].u, h = b[c].p;
            if (0 <= a.indexOf(d) && (h = CI.util.getUrlParameter(h)))return CI.debug("Referrer param: url=" + e + " domain=" + d + " parameter=" + h), e
        }
    }

    function b() {
        var b = {}, c = CI.util.getUrlParameter(CI.consts.PARAM_CID);
        j.isEmpty(c) || (b.campaign_id = c);
        c = document.referrer;
        if (void 0 != c && null != c && 0 != c.length) {
            b.referrer_url = c;
            var f = a(c);
            f && "" != f && (b.visit_referrer =
                a(c))
        }
        j.isEmpty(D) || (b.test_id = D);
        c = j.getUrlParameter(e.PARAM_PRIORITY_CODE);
        j.isEmpty(c) && (c = CI.cookies.getCookieValueByName(CI.consts.PARAM_PRIORITY_CODE));
        j.isEmpty(c) || (b.priority_code = c);
        return b
    }

    function c(a, c) {
        e.EVENT_PAGELOAD == a.eventType && CI.data.setScreenId(a.value);
        var f = {};
        f.data_version = e.SCHEMA_VERSION;
        var d = {};
        d.app_id = q.getConfig(e.CONFIG_SITEID);
        d.app_name = q.getConfig(e.CONFIG_SITEID);
        d.os = navigator.platform;
        f.application = d;
        var d = f.application, g = {};
        g.browser_version = navigator.appVersion;
        g.browser_name = navigator.appName;
        g.browser_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        g.browser_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        g.encoding = document.characterSet;
        g.user_agent = navigator.userAgent;
        g.url = window.location.href;
        g.url_host_name = window.location.hostname;
        g.query_param = window.location.search;
        d.browser = g;
        d = {};
        d.event_id = j.generateGuid();
        d.timestamp = (new Date).getTime();
        d.screen_id = CI.data.getScreenId();
        var g = a.eventType, h = null;
        e.EVENT_CLICK == g || e.EVENT_CHANGE == g ? h = "dom" : e.EVENT_PAGELOAD == g || e.EVENT_PAGEDETAIL == g || e.EVENT_PAGEUNLOAD == g ? h = "page" : e.EVENT_DISQUAL == g ? h = "disqual" : e.EVENT_PRINT == g ? h = "browser" : e.EVENT_ABTEST == g ? h = "test" : e.EVENT_LOGIN == g || e.EVENT_ACCOUNT == g || e.EVENT_OMNITURE_COOKIE_REQUESTED == g ? h = "appSession" : e.EVENT_OII_ACCOUNT_RECOVERY_NAME == g || e.EVENT_OII_SIGNIN_ERROR_NAME == g || e.EVENT_FIELD_VALIDATION_NAME == g ? h = "error" : CI.consts.EVENT_SEARCH_NAME == g && (h = "user");
        d.event_category = h;
        d.event_name =
            a.eventType;
        d.event_value = "pageDetail" == a.eventType ? a.value.userState : a.value;
        f.event = d;
        d = f.event;
        g = {};
        g.channel = q.getConfig(e.CONFIG_PAGE_CHANNEL);
        g.page_path = window.location.pathname;
        g.page_title = document.title;
        g.page_name = CI.data.getScreenId() + " - " + j.getFirstScreenText();
        g.is_error_page = "false";
        e.EVENT_PAGEDETAIL == a.eventType && (a.value && j.objContainsField(a.value, "userState")) && (g.page_detail = a.value.userState);
        d.page = g;
        f.event.traffic = b(a);
        d = null;
        e.EVENT_PAGEDETAIL == a.eventType && (a.value && a.value.authId) &&
        (d = a.value.authId);
        g = d;
        d = {};
        h = CI.cookies.getVisitor();
        d.visitor_id = h.id;
        var m = CI.cookies.incrementSessionSequenceNo();
        d.session_id = m.id;
        var r = CI.data.getUserId();
        "undefined" != r && null != r ? d.user_id = r : "undefined" != g && null != g && (d.user_id = g);
        d.properties = {};
        d.properties.sequence_no = m.sequenceNo;
        d.properties.visitor_count = h.visitCounter;
        d.properties.visitor_start_time = h.startTime;
        if (g = CI.cookies.getCookieValueByName(CI.consts.COOKIE_OMNITURE))d.properties.om_visitor_id = g;
        if (g = CI.cookies.getCookieValueByName(CI.consts.COOKIE_TT_IPGEO))d.properties.tt_ipgeo =
            g;
        if (g = CI.cookies.getCookieValueByName(CI.consts.COOKIE_TTO_LOCATION))d.properties.tto_location = g;
        f.session = d;
        f.application.properties = {};
        f.application.properties.client_version = e.CLIENT_VERSION;
        d = CI.util.getUrlParameter(CI.consts.PARAM_PRODUCT_ID);
        j.isEmpty(d) && (d = CI.cookies.getCookieValueByName(CI.consts.PARAM_PRODUCT_ID));
        if (!d || j.isEmpty(d))d = "0";
        null != d && (f.application.properties.product_id = d);
        d = f.event;
        g = {};
        a.id && (g.ui_element_id = a.id);
        a.type && (g.ui_element_type = a.type);
        a.name && (g.ui_element_name =
            a.name);
        a.src && (g.ui_element_src = a.src);
        a.alt && (g.ui_element_alt = a.alt);
        a.href && (g.link_url = a.href);
        a.data_ci && (g.ui_element_data_ci = a.data_ci);
        a.data_timeline_year && (g.ui_element_data_timeline_year = a.data_timeline_year);
        a.value && a.value.pageConfig && (g.page_config = a.value.pageConfig);
        a.eventType == CI.consts.EVENT_SEARCH_NAME && (h = {}, h.search_type = q.getConfig(e.CONFIG_SITEID), h.search_method = "manual", g.search = h);
        g = j.doesObjectContainAnyFields(g) ? g : null;
        d.properties = g;
        null == f.event.properties && delete f.event.properties;
        b(a);
        e.EVENT_DISQUAL == a.eventType && (f.event.properties.location = a.screenId);
        s = f;
        d = !1;
        !0 === CI.util.getIsOmnitureSendingFlag() && (g = CI.util.getOmnitureEndpoint(), h = !1, m = CI.cookies.getCookieValueByName(CI.consts.COOKIE_OMNITURE), "undefined" == typeof m || null == m ? f.event && (f.event.event_name && f.event.event_name == CI.consts.EVENT_OMNITURE_COOKIE_REQUESTED) && (d = h = !0) : h = !0, g && h && (new OmnitureTransformer(f, g)).doTransformAndSend(d));
        c ? CI.queue.fireEvent(f) : CI.queue.addEvent(f)
    }

    var j = CI.util, e = CI.consts, q = CI.configManager,
        m = "", r = null, u = null, t = null, s = null, F = !1, D = null, h = {};
    return{fillAndCaptureEvent: function (a) {
        try {
            t = a, c(a, !1)
        } catch (b) {
            if (CI.debug(b.message), CI.clientLogger.error && CI.clientLogger.error("[cil error]: exception occurred model.fillAndCaptureEvent... " + b.message), CI.util.getThrowExceptionConfig())throw b;
        }
    }, fillAndCaptureEventImmediately: function (a) {
        try {
            t = a, c(a, !0)
        } catch (b) {
            if (CI.debug(b.message), CI.clientLogger.error && CI.clientLogger.error("[cil error]: exception occurred during model.fillAndCaptureEventImmediately " +
                b.message), CI.util.getThrowExceptionConfig())throw b;
        }
    }, setScreenId: function (a) {
        r = a
    }, getScreenId: function () {
        return r
    }, getAppId: function () {
        return""
    }, getAppData: function () {
        return h
    }, getProductSku: function () {
        return 1
    }, setSessionId: function (a) {
        m = a
    }, getSessionId: function () {
        return m
    }, getLastEventProtocol: function () {
        return t
    }, getLastCIEvent: function () {
        return s
    }, getUserId: function () {
        var a = h.AUTH_ID;
        if (void 0 === a || null == a)a = CI.configManager.getDataField("AUTH_ID"), void 0 !== a && "cookie" == a.type && (h.AUTH_ID =
            CI.cookies.getCookieValueByName(a.path));
        return h.AUTH_ID
    }, setDoNotTrack: function () {
        F = !0
    }, isDoNotTrack: function () {
        return F
    }, setTestName: function (a) {
        D = a
    }, setUserState: function (a) {
        u = a
    }, getUserState: function () {
        return u
    }, setPageConfig: function () {
    }}
}();
function OmnitureTransformer(a, b) {
    var c = [], j = [], e = {}, q = {}, m = {}, r = "", u = "", t = "", s = "", F = "";
    this.doTransformAndSend = function (D) {
        if (a.event && a.event.event_name && "pageUnload" == a.event.event_name)return!0;
        CI.util.objContainsField(a, "application") && (e = a.application);
        CI.util.objContainsField(a, "session") && (q = a.session);
        CI.util.objContainsField(a, "event") && (m = a.event);
        if (m && q && e) {
            e.properties && e.properties.product_id && c.push("v4=" + encodeURIComponent(e.properties.product_id));
            CI.util.isEmpty(CI.util.objContainsField(m,
                "event_id")) || c.push("h5=" + encodeURIComponent(m.event_id));
            CI.util.objContainsField(m, "screen_id") && c.push("c19=" + encodeURIComponent(m.screen_id));
            if (CI.util.objContainsField(m, "traffic")) {
                var h = m.traffic;
                CI.util.objContainsField(h, "campaign_id") && c.push("v0=" + encodeURIComponent(h.campaign_id));
                CI.util.objContainsField(h, "referrer_url") && c.push("r=" + encodeURIComponent(h.referrer_url));
                CI.util.objContainsField(h, "priority_code") && c.push("v12=" + encodeURIComponent(h.priority_code))
            }
            if (CI.util.objContainsField(m,
                "page")) {
                h = m.page;
                CI.util.objContainsField(h, "channel") && c.push("ch=" + encodeURIComponent(h.channel));
                CI.util.objContainsField(h, "page_name") && c.push("pageName=" + encodeURIComponent(h.page_name));
                var n = m.event_name;
                n && "login" == n || n && "createAccount" == n || CI.util.objContainsField(h, "page_detail") && c.push("c7=" + encodeURIComponent(h.page_detail));
                CI.util.objContainsField(h, "is_error_page") && ("true" == h.is_error_page ? c.push("pageType=" + encodeURIComponent("error page")) : c.push("pageType=" + encodeURIComponent(" ")))
            }
            if (CI.util.objContainsField(e,
                "browser") && (h = e.browser))CI.util.objContainsField(h, "url") && c.push("g=" + encodeURIComponent(h.url)), h.browser_height && c.push("bh=" + encodeURIComponent(h.browser_height)), h.browser_height && c.push("bw=" + encodeURIComponent(h.browser_width));
            CI.util.objContainsField(q, "session_id") && c.push("c41=" + encodeURIComponent(q.session_id));
            CI.util.objContainsField(q, "user_id") && (F = q.user_id, s = CI.util.getMD5value(F), c.push("c4=" + encodeURIComponent(s)))
        }
        if (CI.util.objContainsField(q, "properties")) {
            h = q.properties;
            if (CI.util.objContainsField(h, "om_visitor_id") && (n = h.om_visitor_id) && "" != n)n = n.substring(7, n.length - 4), c.push("vid=" + encodeURIComponent(n));
            CI.util.objContainsField(h, "tto_location") && c.push("c40=" + encodeURIComponent(h.tto_location));
            if (CI.util.objContainsField(h, "tt_ipgeo") && (h = h.tt_ipgeo))if (h = h.split("|"), n = [], h) {
                var A = h[2], f = h[3], d = h[4], g = h[5], l = h[6];
                n.push(h[1]);
                n.push(A);
                n.push(f);
                n.push(d);
                n.push(g);
                n.push(l);
                n.push("TT");
                c.push("state=" + encodeURIComponent(n.join("|")))
            }
        }
        h = m.event_name;
        n = m.event_category;
        A = m.screen_id;
        f = q.user_id;
        d = m.event_value;
        if (m.properties) {
            if (m.properties.link_url)var p = m.properties.link_url;
            if (m.properties.ui_element_id)var y = m.properties.ui_element_id;
            m.properties.search && c.push("c14=" + encodeURIComponent(m.event_value))
        }
        if (n && "dom" == n && (h && "change" == h && (y && d) && (y = y + "=" + d, c.push("v28=" + encodeURIComponent(y)), c.push("c14=" + encodeURIComponent(y))), h && "click" == h)) {
            if (m.properties)if (m.properties.ui_element_id)var B = m.properties.ui_element_id; else m.properties.ui_element_data_ci ?
                B = m.properties.ui_element_data_ci : m.properties.data_timeline_year && (B = m.properties.data_timeline_year);
            if (d) {
                y = d;
                y = B ? B + "|" + y + "=" : y + "=";
                if (p)y += p; else try {
                    y += e.browser.url
                } catch (G) {
                }
                c.push("v29=" + encodeURIComponent(y));
                c.push("c14=" + encodeURIComponent(y))
            }
        }
        n && "page" == n && (h && "pageView" == h && (A && "CreateAccountMobileScreen" == A) && (c.push("c7=" + encodeURIComponent("TTO->Auth")), c.push("c6=" + encodeURIComponent("TTO->Auth")), c.push("c5=" + encodeURIComponent("TTO")), f && (s || (s = CI.util.getMD5value(f)), j.push("event10:" +
            s))), h && "pageUnload" == h && c.push("c14=" + encodeURIComponent("unload event")));
        n && "browser" == n && h && "print" == h && c.push("c14=" + encodeURIComponent("print event"));
        n && "appSession" == n && (h && "login" == h && (c.push("c7=" + encodeURIComponent("TTO->Auth Transfer")), c.push("c6=" + encodeURIComponent("TTO->Auth Transfer")), c.push("c5=" + encodeURIComponent("TTO")), f && (s || (s = CI.util.getMD5value(f)), j.push("event10:" + s))), h && "createAccount" == h && (c.push("c7=" + encodeURIComponent("TTO->Auth")), c.push("c6=" + encodeURIComponent("TTO->Auth")),
            c.push("c5=" + encodeURIComponent("TTO")), f && (s || (s = CI.util.getMD5value(f)), j.push("event10:" + s))));
        n && "error" == n && h && (h == CI.consts.EVENT_OII_ACCOUNT_RECOVERY_NAME || h == CI.consts.EVENT_OII_SIGNIN_ERROR_NAME || h == CI.consts.EVENT_FIELD_VALIDATION_NAME) && c.push("c3=" + encodeURIComponent(d));
        h && "pageDetail" == h && (m.properties && m.properties.page_config) && (m.properties.page_config.checkboxes && c.push("v28=" + encodeURIComponent(m.properties.page_config.checkboxes)), m.properties.page_config.recommendation && c.push("v24=" +
            encodeURIComponent(m.properties.page_config.recommendation)), m.properties.page_config.version && c.push("c14=" + encodeURIComponent(m.properties.page_config.version)));
        if (!h || !("login" == h || "createAccount" == h || "pageView" == h && A && "CreateAccountMobileScreen" == A))e.properties ? e.properties.product_id ? (p = e.properties.product_id) && "4" == p ? c.push("c5=FFA") : c.push("c5=NONFFA") : c.push("c5=NONFFA") : c.push("c5=NONFFA"), c.push("c6=MyTurboTax");
        0 < j.length && (p = j.join(","), c.push("events=" + encodeURIComponent(p)));
        h && "pageView" ==
            h || (h && "pageUnload" == h ? c.push("pe=lnk_e") : c.push("pe=lnk_o"), c.push("pev2=" + encodeURIComponent(h)));
        r = CI.omnitureClient.getClientServerTimeOffset();
        u = CI.omnitureClient.getServerVia();
        if ("" == r || "false" == CI.configManager.getConfig(CI.consts.CONFIG_MINIMIZE_HEAD_REQUESTS)) {
            "" == t && (t = CI.configManager.getConfig(CI.consts.CONFIG_SERVICE));
            var v = (new Date).getTime();
            CI.$.ajax({type: "HEAD", url: t, async: !1, complete: function (a) {
                var b = a.getResponseHeader("Date"), a = a.getResponseHeader("Via");
                CI.omnitureClient.setServerVia(a);
                try {
                    if ("string" === typeof b) {
                        var b = new Date(b), c = b.getTime(), d = (new Date).getTime();
                        CI.omnitureClient.setClientServerTimeOffset(d - (d - v) / 2 - c)
                    } else CI.omnitureClient.setClientServerTimeOffset(0)
                } catch (e) {
                    CI.omnitureClient.setClientServerTimeOffset(0)
                }
            }})
        }
        p = (new Date).getTime();
        B = new Date(p - CI.omnitureClient.getClientServerTimeOffset());
        p = u;
        (y = B) || (y = new Date);
        B = CI.util.formatLocalDate(y);
        CI.util.dateToISOString(y);
        y = CI.util.getOmnitureTParamFormattedDate(y);
        c.push("c2=" + encodeURIComponent(B));
        c.push("t=" +
            encodeURIComponent(y));
        p && c.push("server=" + p);
        D ? CI.omnitureClient.fireCookieRequest(b, c) : CI.omnitureClient.fireEvent(b, c);
        return!0
    }
};
CI.omnitureClient = function () {
    function a() {
        start = (new Date).getTime()
    }

    function b() {
        CI.debug("om request success")
    }

    function c() {
        CI.debug("om request error")
    }

    function j() {
        requestDuration = (new Date).getTime() - start;
        CI.debug("om.requestComplete: duration=" + requestDuration + " ms")
    }

    var e = "", q = "", m = "";
    return{fireEvent: function (m, q) {
        "" == e && (e = CI.configManager.getConfig(CI.consts.CONFIG_OMNITURE_HOST));
        endpoint = m + ("s" + (new Date).getTime() + "0");
        data = q.join("&");
        try {
            if (window.XDomainRequest) {
                var t = new XDomainRequest;
                t ? (t.open("get", endpoint + "?" + data), t.onerror = function () {
                    CI.clientLogger.error && CI.clientLogger.error("[cil error]: omniture XDR failed ... xdr.responseText:" + t.responseText)
                }, t.onprogress = function () {
                }, t.ontimeout = function () {
                }, t.onload = function () {
                }, t.timeout = 4E3, setTimeout(function () {
                    t.send()
                }, 500)) : (CI.clientLogger.error && CI.clientLogger.error("[cil error]: failed to create the xdr object .."), c(""))
            } else CI.$.ajax({type: "GET", url: endpoint, data: data, async: !0, cache: !1, beforeSend: a, success: b, error: c,
                complete: j})
        } catch (s) {
            if (CI.clientLogger.error && CI.clientLogger.error("[cil error]: could not make omniture AJAX request " + s.message), CI.util.getThrowExceptionConfig())throw s;
        }
    }, fireCookieRequest: function (a, b) {
        CI.debug("performing om image request");
        endpoint = a + ("s" + (new Date).getTime() + "0");
        data = b.join("&");
        var c = endpoint + "?" + data;
        try {
            "undefined" !== typeof CI.data.isIE8 && null != CI.data.isIE8 && CI.data.isIE8 ? CI.$(function () {
                null == CI.cookies.getCookieValueByName(CI.consts.COOKIE_OMNITURE) ? CI.$("<img>").attr({src: c,
                    id: "omnitureImg", width: 2, height: 2, style: "display:none"}).appendTo(document.body) : CI.clientLogger.warn && CI.clientLogger.warn("[cil error]: apparently document.ready() took long, so we don't need to request a cookie")
            }) : CI.$("<img>").attr({src: c, id: "omnitureImg", width: 2, height: 2, style: "display:none"}).appendTo(document.body)
        } catch (e) {
            if (CI.debug(e.message), CI.clientLogger.error && CI.clientLogger.error("[cil error]: could not make omniture image request " + e.message), CI.util.getThrowExceptionConfig())throw Error("[cil error]: could not make omniture image request " +
                e.message);
        }
    }, setClientServerTimeOffset: function (a) {
        q = a
    }, getClientServerTimeOffset: function () {
        return q
    }, setServerVia: function (a) {
        m = a
    }, getServerVia: function () {
        return m
    }}
}();
CI.cookiedata = function () {
};
CI.cookiedata.activeSession = function () {
    this.id = "";
    this.pageviewCount = 1;
    this.sequenceNo = 0;
    this.startTime = (new Date).getTime()
};
CI.cookiedata.closedSession = function () {
    this.id = "";
    this.activeSession = null;
    this.endTime = (new Date).getTime()
};
CI.cookiedata.visitor = function (a) {
    this.id = a;
    this.firstTime = this.lastTime = this.startTime = (new Date).getTime();
    this.visitCounter = 0
};
CI.cookiedata.visitor.prototype = {};
var __cvo = {account: "intuit", sitemap: {366910430: "1", 2149283497: "1", 3914893220: "1", 1926608857: "1", 2140382506: "1", 286933737: "1", 3356661142: "1"}, server: "intuit.sp1.convertro.com"};
"undefined" === typeof window.$CVO && (window.$CVO = []);
$CVO.trackEvent = function (a, b, c) {
    null != a && null == c && (c = 1, null == b && (b = "{type}-{userid}"));
    $CVO.push(["trackEvent", {type: a, id: b, amount: c}])
};
$CVO.trackUser = function (a, b) {
    b = b || {};
    b.id = a;
    $CVO.push(["trackUser", b])
};
$CVO.getCode = function (a) {
    if (!a)return $CVO.sid;
    var b = 100, c = function () {
        $CVO.sid ? a($CVO.sid) : setTimeout(c, b *= 1.1)
    };
    c()
};
$CVO.getOfflineCode = function () {
    return $CVO.mid
};
$CVO.setOfflineCode = function (a) {
    $CVO.push(["setOfflineCode", a])
};
$CVO.attachEvent = function (a, b, c, j) {
    null == j && (j = 1, null == b && (b = "{type}-{userid}"));
    $CVO.push(["attachEvent", a, b, c, j])
};
$CVO.getVersion = function () {
    return 2136
};
$CVO.onUserDataReady = function (a) {
    $CVO.push(["onUserDataReady", a])
};
function __cvo_overrides() {
    for (var a = /__cvo_([\w]+)=(.*?)(?:[^\w\.-]|$)/g, b, c = document.cookie + navigator.userAgent; null != (b = a.exec(c));)__cvo[b[1]] = b[2]
}
function __cvo_hash(a) {
    var b = 5381, c = Math.pow(2, 32);
    for (i = 0; i < a.length; i++)var j = a.charCodeAt(i), b = (33 * b + j) % c;
    return b
}
function __cvo_get_site_id(a) {
    var b, c, j;
    if (a) {
        0 != a.indexOf("//") && (a = "//" + a);
        var e = document.createElement("a");
        e.href = a;
        b = e.pathname;
        c = "";
        j = e.hostname
    } else a = document.URL, b = document.location.pathname, c = document.title, j = document.domain;
    if ("sitematch"in __cvo)for (var q = __cvo.sitematch, e = 0; e < q.length; e++) {
        var m = q[e], r = "";
        switch (m[0]) {
            case "url":
                r = a;
                break;
            case "path":
                r = b;
                break;
            case "title":
                r = c
        }
        var u = m[2];
        if (r.match(m[1]))return u
    }
    if ("sitemap"in __cvo) {
        a = __cvo.sitemap;
        for (b = [j, "." + j]; b[b.length - 1].match(/^\.[^.]+/);)b[b.length] =
            b[b.length - 1].replace(/\.[^.]+/, "");
        b[b.length - 1] = ".";
        for (e = 0; e < b.length; e++)if (c = __cvo_hash(b[e]), c in a)return a[c]
    }
    return 0
}
function __cvo_get_tagvars() {
    return window.__cvo_params || {}
}
function __cvo_info() {
    $CVO.server = __cvo.server;
    $CVO.account = __cvo.account;
    $CVO.site_id = __cvo.site_id;
    $CVO.atHead = new Date;
    $CVO.atBody = $CVO.atHead;
    $CVO.tagvars = __cvo_get_tagvars()
}
function __cvo_core() {
    var a = /(?:^|;\s)__cvo_server=(.*?)(?:;\s|$)/;
    if ($CVO.tserver = document.cookie.match(a) || navigator.userAgent.match(a))$CVO.tserver = $CVO.tserver[1];
    __cvo_lif('<html><head></head><body><script src="//' + ($CVO.tserver || $CVO.server) + "/trax/init/" + $CVO.account + "/" + $CVO.site_d + '"><\/script></body></html>')
}
function __cvo_lif(a) {
    var b, c = document.createElement("iframe");
    c.src = 'javascript:""';
    c.id = "__cvo_iframe";
    c.style.position = "absolute";
    c.style.left = "-2000px";
    document.body.insertBefore(c, document.body.firstChild);
    b = document.getElementById(c.id).contentWindow;
    try {
        b && b.document && b.document.write && (b.document.write(a), b.document.close())
    } catch (j) {
        c.src = "javascript:var d=document.open();d.domain='" + document.domain + "';void(0);";
        try {
            b && b.document && b.document.write && (b.document.write(a), b.document.close())
        } catch (e) {
            $CVO.error =
                e
        }
    }
    return b
}
function __cvo_run() {
    __cvo.site_id = __cvo_get_site_id();
    var a = __cvo.site_id + "";
    "exclude" != a && 0 != a.length && (__cvo_info(), __cvo_core())
}
function __cvo_main() {
    __cvo_overrides();
    if (window.__cvo_started) {
        if (!__cvo.loader)return!1
    } else if (__cvo_started = !0, __cvo.loader) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = !0;
        a.src = "//stage.convertro.com/unitag/" + __cvo.account + "/" + __cvo.loader + ".js";
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b);
        return!1
    }
    __cvo_run();
    return!0
}
function __cvo_eval(a) {
    return eval(a)
}
function __cvo_core() {
    function a(a) {
        for (var b, c, d, e, g = "", f = 0; f < a.length;) {
            b = a.charCodeAt(f++);
            c = a.charCodeAt(f++);
            d = a.charCodeAt(f++);
            e = b >> 2;
            b = (b & 3) << 4 | c >> 4;
            c = (c & 15) << 2 | d >> 6;
            d &= 63;
            var j = a.length - f, g = g + h.charAt(e) + h.charAt(b);
            -2 < j && (g += h.charAt(c));
            -1 < j && (g += h.charAt(d))
        }
        return g
    }

    function b(a) {
        return a.replace(/[a-zA-Z]/g, function (a) {
            return String.fromCharCode(("Z" >= a ? 90 : 122) >= (a = a.charCodeAt(0) + 13) ? a : a - 26)
        })
    }

    function c(a) {
        var b = document.createElement("a");
        b.href = a;
        return b
    }

    var j = "$Rev$", e = j.match(/\d+/),
        q = function (a) {
            return String(a)
        }, j = e ? e[0] : "unknown", m = function (a) {
            u.lastIndex = 0;
            return u.test(a) ? '"' + a.replace(u, function (a) {
                var b = F[a];
                return"string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }, r = function (a, b) {
            var c, d, e, g, h = t, f, j = b[a];
            "function" === typeof D && (j = D.call(b, a, j));
            switch (typeof j) {
                case "string":
                    return m(j);
                case "number":
                    return isFinite(j) ? String(j) : "null";
                case "boolean":
                case "null":
                    return String(j);
                case "object":
                    if (!j)return"null";
                    t += s;
                    f = [];
                    if ("[object Array]" ===
                        Object.prototype.toString.apply(j)) {
                        g = j.length;
                        for (c = 0; c < g; c += 1)f[c] = r(c, j) || "null";
                        e = 0 === f.length ? "[]" : t ? "[\n" + t + f.join(",\n" + t) + "\n" + h + "]" : "[" + f.join(",") + "]";
                        t = h;
                        return e
                    }
                    if (D && "object" === typeof D) {
                        g = D.length;
                        for (c = 0; c < g; c += 1)"string" === typeof D[c] && (d = D[c], (e = r(d, j)) && f.push(m(d) + (t ? ": " : ":") + e))
                    } else for (d in j)Object.prototype.hasOwnProperty.call(j, d) && (e = r(d, j)) && f.push(m(d) + (t ? ": " : ":") + e);
                    e = 0 === f.length ? "{}" : t ? "{\n" + t + f.join(",\n" + t) + "\n" + h + "}" : "{" + f.join(",") + "}";
                    t = h;
                    return e
            }
        }, u = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        t, s, F = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, D, q = function (a, b, c) {
            var d;
            s = t = "";
            if ("number" === typeof c)for (d = 0; d < c; d += 1)s += " "; else"string" === typeof c && (s = c);
            if ((D = b) && "function" !== typeof b && ("object" !== typeof b || "number" !== typeof b.length))throw Error("stringify");
            return r("", {"": a})
        }, h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", n = "createElement", n = "createElement", A = "domain", f = "match", f = "match", A = "domain", d = window.__cvo ? 1 : 0, g, l = window,
        p = d ? window : window.parent, y = document, B = d ? document : window.parent.document, G = navigator, v = l.$CVO = p.$CVO, O = [], ja = {}, Xa = (new Date).getTime(), Z = B.location.protocol, aa = v.server, zb = window.screen.width + "x" + window.screen.height + "x" + window.screen.colorDepth, ka, Ya = [];
    if (G.plugins)for (var Ab = G.plugins.length, Ba = 0; Ba < Ab; Ba++) {
        var S = G.plugins[Ba];
        if (S) {
            var Bb = S.filename.replace(/\.(plugin|dll)$/i, ""), la = S.name, S = (S.description[f](/\d/g) || []).join(""), la = (la[f](/\d/g) || []).join("");
            Ya.push(Bb + "," + (S.length > la.length ?
                S : la))
        }
    }
    ka = Ya.join(";");
    var ma = "";
    if (!v.skip && !l.__cvo_skip) {
        v.W = l;
        v.D = y;
        v.L = O;
        v.showlog = function () {
            alert(O.join("\n"))
        };
        var Ca = function () {
            return((new Date).getTime() - Xa) / 1E3
        }, w = function (a) {
            O.push(Ca().toFixed(3) + " - " + a)
        }, ba = function (a) {
            a = "string" == typeof a ? a : a.toString();
            O.push(Ca().toFixed(3) + " ~ " + a);
            var b = l.console;
            b && b.log && (b.log("warning"), b.log(a))
        }, T = function (a) {
            var b;
            b = "string" == typeof a ? a : a.toString();
            O.push(Ca().toFixed(3) + " ! " + b);
            (b = l.console) && b.log && (b.log("error"), b.log(a), b.log(O));
            v.error = a
        };
        v.INFO = w;
        v.WARN = ba;
        v.ERROR = T;
        try {
            for (var W, na = 3, Za = document.createElement("div"), Cb = Za.all || []; Za.innerHTML = "<\!--[if gt IE " + ++na + "]><br><![endif]--\>", Cb[0];);
            W = 4 < na ? na : !na;
            var Db = (G.userAgent[f](/\bAndroid ([\d\.]+)/) || [])[1], Eb = (G.userAgent[f](/; Googlebot\/([\d\.]+)/) || [])[1], $a = W ? 8 > W ? 2083 : 9 > W ? 4096 : 65535 : 65535, Fb = v.atHead.getTime(), ab = v.tagvars || {}, bb = Z + "//d1ivexoxmp59q7.cloudfront.net/2.gif", X, P, ca, Da, oa, Ea, pa = Number("1"), Gb = Number("0"), Hb = Number("0"), Q = Number("6"), Fa = Number("0"),
                da = Number("0"), Ga = Number("0"), U = Number("1"), Ha = Number("10000"), Ib = Number("0"), Ia = Number("1"), Ja = pa ? p.__cvo.site_id : "", Jb = p.__cvo_get_site_id || function () {
                    T("ZOMGG1")
                }, Ka = p.__cvo_hash || function () {
                    T("ZOMGG2")
                }, La = U ? "ptrx" : "trax", Y = "", cb = "", N = "", db = "", eb = "", Ma = [], Na = [], fb = [], gb = 0, Oa = [], qa = 0, hb = 0, ra = 0, I = function (a) {
                    ib(a);
                    X && Fa && H != z && (V(function () {
                        w("ss-fcb: F* " + z);
                        P.set("cvo_sid1", z)
                    }), H = z)
                }, ib = function (a) {
                    v.sid = z = a;
                    z.length ? sa("cvo_sid1", z, 5E3) : ta("cvo_sid1")
                }, ua = function (a) {
                    (v.mid = K = a) && K.length ? sa("cvo_mid1",
                        K, 5E3) : ta("cvo_mid1")
                }, ea = function (a) {
                    var b = g ? g.document : y, c = b[n]("script");
                    c.src = a;
                    a = b.getElementsByTagName("script")[0];
                    a.parentNode.insertBefore(c, a)
                }, sa = function (a, b, c, d) {
                    if (c) {
                        var e = new Date;
                        e.setTime(e.getTime() + 864E5 * c);
                        c = "; expires=" + e.toGMTString()
                    } else c = "";
                    e = "";
                    d ? e = "; " + A + "=." + d : (d = /[^.]*.(?:[^.]*|..\...|...\...)$/.exec(y[A])[0], d != y[A] && (e = "; " + A + "=." + d));
                    y.cookie = a + "=" + b + c + ("; path=/" + e)
                }, fa = function (a) {
                    for (var a = RegExp("^ *" + a + "="), b = y.cookie.split(";"), c = b.length; c--;) {
                        var d = b[c].replace(a,
                            "");
                        if (d != b[c])return d
                    }
                    return null
                }, ta = function (a) {
                    sa(a, "", -1);
                    y.cookie = a + "=; expires=Thu, 01-Jan-70 00:00:01 GMT;"
                }, va = function (a, b, c) {
                    var d = a.indexOf(b);
                    if (-1 == d)return null;
                    a = a.substr(d + b.length);
                    c = a.indexOf(c);
                    return-1 == c ? a : a.substr(0, c)
                }, wa = function (a, b) {
                    ("object" === typeof HTMLElement ? b instanceof HTMLElement : b && "object" === typeof b && 1 === b.nodeType && "string" === typeof b.nodeName) && a(b);
                    var c = 100, d = function () {
                        var e = B.getElementById(b);
                        e ? a(e) : setTimeout(d, c *= 1.1)
                    };
                    d()
                }, jb = function (a) {
                    var b = 50, c =
                        function () {
                            y.body ? a() : setTimeout(c, b *= 1.1)
                        };
                    c()
                };
            v.run = function () {
                for (var a = [], b = 0; b < arguments.length; b++)a[b] = arguments[b];
                b = a.shift();
                a = ja[b].apply(null, a);
                Pa();
                return a
            };
            v.pos = 0;
            v.push = function () {
                for (var a = 0; a < arguments.length; a++)v[v.length] = arguments[a];
                Pa()
            };
            var Pa = function () {
                if (ra && C)for (; v.pos < v.length;)try {
                    if (!(v.pos >= v.length)) {
                        var a = v[v.pos++];
                        if (!a || "function" != typeof a.slice)throw"Non-array element in $CVO";
                        var b = a.slice(0);
                        if (!b.length)throw"Empty array element in $CVO";
                        var c = b.shift();
                        ja[c].apply(null, b)
                    }
                } catch (d) {
                    T(d)
                }
            }, E = null, Qa = null, kb = null, Ra = function (a) {
                if ((a = a || p.event) && a.keyCode) {
                    var b = a.keyCode, c = 48 <= b && 105 >= b, d = !1;
                    if (!b.toString()[f](/^(8|9|3[4567890]|46)$/) && !c)d = !0; else if (c && E.value && E.value.length >= Q)if (window.getSelection)d = E.selectionStart == E.selectionEnd; else if (b = B.selection) {
                        d = E.value;
                        c = b.createRange().duplicate();
                        c.moveEnd("character", d.length);
                        var e = "" == c.text ? d.length : d.lastIndexOf(c.text), c = b.createRange().duplicate();
                        c.moveStart("character", -d.length);
                        d =
                            e == c.text.length
                    }
                    d && (a.stopPropagation ? (a.stopPropagation(), a.preventDefault()) : (a.cancelBubble = !0, a.returnValue = !1))
                }
                var g = lb();
                if (g != kb)if (kb = g, !g || g.length < Q)ua(), mb(); else {
                    if (g != E.value) {
                        b = E;
                        a = 0;
                        if (document.selection)b.focus(), a = B.selection.createRange(), a.moveStart("character", -b.value.length), a = a.text.length; else if (b.selectionStart || "0" == b.selectionStart)a = b.selectionStart;
                        E.value = g;
                        b = E;
                        if (b.createTextRange)b = b.createTextRange(), b.move("character", a), b.select(); else if (b.selectionStart || "0" ==
                            b.selectionStart)b.selectionStart = a, b.selectionEnd = a, b.focus()
                    }
                    E.style.border = "solid 2px orange";
                    Qa && clearTimeout(Qa);
                    Qa = setTimeout(function () {
                        nb(g)
                    }, 100)
                }
            }, mb = function () {
                E.style.border = "dashed 2px red"
            }, nb = function (a) {
                ea(Z + "//" + aa + "/" + La + "/code/intuit/" + Ja + "/?code=" + a)
            }, lb = function () {
                return E.value.toUpperCase().replace(/[^A-Z0-9]/g, "").substr(0, Q)
            }, xa = [], ob = !1, pb = !1, Sa = {}, Ta = function (a) {
                var b = {};
                for (k in a)a.hasOwnProperty(k) && (b[k] = a[k]);
                return b
            }, Ua = function (a) {
                return c(a).hostname.match(/\bintuit\.com$/) ?
                    a.replace(/([&?])(authid|uid|app|pt|TTOBUid|TTOBFiId)=[^&?]*/gi, "$1cvo_sanitized_$2=") : a
            }, ga = function (a, d, e) {
                var g = "string" != typeof a ? Ta(a) : {type: a, id: d, value: e};
                if (a = g.attach)delete g.attach, w("te-a: attaching " + a), wa(function (a) {
                    var b = "", c = "", d = "";
                    try {
                        b = a.tagName.toLowerCase(), c = (a.id || "").toLowerCase(), d = (a.name || "").toLowerCase()
                    } catch (e) {
                        ba(e)
                    }
                    var f, h;
                    if ("a" == b)f = "onclick", h = function () {
                        var b = !1;
                        document.createEvent ? (b = document.createEvent("MouseEvents"), b.initMouseEvent("click", !0, !0, window,
                            0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), b = !a.dispatchEvent(b)) : a.fireEvent && (b = !a.fireEvent("onclick"));
                        b || (window.location = a.href)
                    }; else if ("form" == b)f = "onsubmit", h = function () {
                        a.submit()
                    }; else {
                        T("te-a: <" + b + "> is not supported");
                        return
                    }
                    g.cvosrc ? w("te-a: attached cvosrc " + g.cvosrc + " on " + b + " <" + c + ">" + d) : (g.type = g.type || "dom-" + (d || c || tagname), w("te-a: attached typ " + g.type + " on " + b + " <" + c + ">" + d));
                    var j = a[f];
                    g.cb = function () {
                        a[f] = j;
                        h()
                    };
                    a[f] = function () {
                        ga(g);
                        return!1
                    }
                }, a); else {
                    var a = String(g.id || ""), d = g.type ||
                        "", e = g.value || g.amount || g.sp, f = g.site, h = g.cvosrc, l = Number(qa >= v.pos), m = l ? null : g.cb;
                    fb[++gb] = m;
                    m = Va && K ? K : z;
                    d && !a && (a = "{t}-{c}");
                    for (var n = /{\s*(\w+)\s*(\d*)\s*}|$/g, s = 0, p = ""; null != (match = n.exec(a));) {
                        p += a.substr(s, match.index - s);
                        if (match.index == a.length)break;
                        s = match[2] || 32;
                        switch (match[1] || "") {
                            case "random":
                            case "r":
                                p += Math.random().toString().substr(2, s);
                                break;
                            case "type":
                            case "t":
                                p += d ? d.toString().substr(0, s) : "NULL";
                                break;
                            case "phone":
                            case "p":
                                p += m.substr(0, Math.max(s, Q));
                                break;
                            case "cvoid":
                            case "cid":
                            case "c":
                                p +=
                                    m.substr(0, s);
                                break;
                            case "userid":
                            case "uid":
                            case "u":
                                p += m.substr(0, s);
                                break;
                            case "date":
                            case "d":
                                var q = new Date, s = ("0" + q.getDate()).slice(-2), r = ("0" + (q.getMonth() + 1)).slice(-2), q = q.getFullYear(), p = p + ("" + q + r + s)
                        }
                        s = n.lastIndex
                    }
                    a = p || a;
                    null == e && (e = 1);
                    m = Ja;
                    !isNaN(parseFloat(f)) && isFinite(f) ? m = f : f && (m = Jb(f));
                    f = B.URL;
                    n = B.referrer;
                    oa ? Ea ? (f = ca, n = Da) : n = ca : ca && (n = Da, f = ca);
                    n = Ua(n);
                    f = Ua(f);
                    h && (ha = c(f), f = ha.protocol + "//" + ha.host + "/internal?cvosrc=" + h, n = "");
                    for (var t in ab)f += "&" + t + "=" + encodeURIComponent(ab[t]);
                    qb(["trackEvent", d, a, e, m]);
                    w(">> te: " + z + "; " + d + "; " + a + "; " + e);
                    h = Number(!C);
                    (new Date).getTime();
                    p = ya ? "&tst=" + ya : "";
                    t = Z + "//" + aa + ("/" + La + "/hit") + "/intuit/" + m + "/";
                    a = t + "?sid=" + (z || "") + "&mid=" + (K || "") + "&eid=" + a + "&cid=" + (C || "") + "&jid=&typ=" + d + "&val=" + e + "&isa=" + (Va || "") + "&pag=" + encodeURIComponent(f) + "&ref=" + encodeURIComponent(n) + "&fup=" + l + "&cbi=" + gb + "&new=" + h + "&nji=" + Gb + p + "&ver=" + j + "&sts=1389990402&bts=" + (new Date).getTime() + "&ath=" + v.atHead.getTime() + "&atb=" + v.atBody.getTime() + "&dis=" + zb;
                    W && 9 <= W && (a +=
                        "&jua=" + encodeURIComponent(G.userAgent));
                    h = "";
                    if (U) {
                        e = Ia ? b(ma) : ma;
                        l = Ia ? b(ka) : ka;
                        d = "";
                        da && (d += "&lid=" + (Y || ""));
                        h = "&tid=" + N + d + "&tmz=" + (new Date).getTimezoneOffset() + "&pfe=" + (Ia ? "1" : "0");
                        d = h + "&ish=1";
                        l = h + "&ish=0" + ("&plu=" + encodeURIComponent(l));
                        d += "&plu=" + Ka(ka);
                        Ga && (l += "&fon=" + encodeURIComponent(e), d += "&fon=" + Ka(ma));
                        if (ya && (e = ya.match(/^(\w+)-(\d+)$/)) && "bigget" == e[1]) {
                            s = e[2];
                            for (l += "&foo="; s--;)l += "A"
                        }
                        h = d
                    }
                    a += h;
                    d = "&log=" + encodeURIComponent(O.join("\n"));
                    a += $a > a.length + d.length ? d : "";
                    $a < a.length && (a =
                        t + "?ovz=1&sid=" + (z || ""));
                    ea(a)
                }
            }, rb = function (a) {
                if (!hb) {
                    if (Ib) {
                        var b = B.referrer[f](/\/\/([^\/]*)/);
                        if (b && b[1] && b[1] == B[A]) {
                            w("Xi");
                            return
                        }
                    }
                    ga(a || {});
                    hb = 1
                }
            }, qb = function (a) {
                Ma.push(a);
                for (var b = 0; b < Na.length; b++) {
                    for (var c = Na[b], d = c[c.length - 1], e = 1, g = 0; g < c.length - 1; g++)c[g] != a[g] && (e = 0);
                    e && d(a)
                }
            }, V = function (a) {
                P ? a() : X ? Oa.push(a) : T("afo: wtf")
            }, L = function () {
                ra = 1;
                v.is_agent = Va = Number(Hb) || z && Number("0" == z.charAt(0));
                rb();
                Pa()
            }, tb = function () {
                if (U)if (za = sb(N), w("i.p: T " + za), J ? (w("i.p.u: U " + J), J.match(/[10]/) &&
                    I(J)) : C ? (w("i.p.c.m: C " + C), C.match(/[10]/) || I(za)) : I(za), X) {
                    var a = setTimeout(function () {
                        ba("i.p.f.e-to");
                        L()
                    }, Ha);
                    V(function () {
                        clearTimeout(a);
                        ra ? w("i.p.f-cb.tr: L " + Y) : (w("i.p.f-cb.e: L " + Y), L())
                    })
                } else L(); else X && Fa ? (V(function () {
                    H = P.get("cvo_sid1");
                    w("i.f: F " + H)
                }), J ? (w("i.f.u: U " + J), I(J), L()) : C ? (w("i.f.c: C " + C), V(function () {
                    H ? H != C ? (w("i.f.c-cb: F+"), I(H), qa = v.pos, v.pos = 0, L()) : w("i.f.c-cb: F=") : (w("i.f.c-cb: F-"), I(C))
                }), v.sid = z = C, L()) : (w("i.f.e: J " + (pa ? "static" : "")), a = setTimeout(function () {
                    ba("i.f.e-to");
                    pa || ib("");
                    L()
                }, Ha), V(function () {
                    clearTimeout(a);
                    ra ? H ? H != z ? (w("i.f.e-cb.t: F+"), I(H), qa = v.pos, v.pos = 0, L()) : w("i.f.e-cb.t: F=") : w("i.f.e-cb.t: F-") : (H ? (w("i.f.e-cb.e: F+ "), I(H)) : (w("i.f.e-cb.e: F-"), pa || I("")), L())
                }))) : (I(J || C || ""), w("i.e: " + (J ? "U" : C ? "C" : "J") + " " + z), L())
            }, sb, ub, vb = function (a, b, c) {
                for (var d = []; 0 < a.length;) {
                    var e;
                    e = b;
                    for (var g = c, f = [], h = 0, j = 0; j < a.length; j++) {
                        x = a[j];
                        var h = x + h * e, l = Math.floor(h / g), h = h % g;
                        (f.length || l) && f.push(l)
                    }
                    e = [f, h];
                    a = e[0];
                    d.unshift(e[1])
                }
                return d
            }, Aa = "23456789ABCDEFGHJKMNPQRSTUVWXYZ".split("");
            sb = function (a) {
                var b, c, d, e, g;
                b = "";
                for (var f = 0; f < a.length;)c = h.indexOf(a.charAt(f++)), d = h.indexOf(a.charAt(f++)), e = h.indexOf(a.charAt(f++)), g = h.indexOf(a.charAt(f++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | e >> 2, e = (e & 3) << 6 | g, g = a.length - f, b += String.fromCharCode(c), -2 < g && (b += String.fromCharCode(d)), -1 < g && (b += String.fromCharCode(e));
                f = [];
                for (a = 0; a < b.length; a++)f.push(b.charCodeAt(a));
                b = vb(f, 256, Aa.length);
                f = "";
                for (a = 0; a < b.length; a++)f += Aa[b[a]];
                for (; 12 > f.length;)f = Aa[0] + f;
                return f
            };
            ub = function (b) {
                for (var c = [], d = 0; d <
                    b.length; d++)c.push("23456789ABCDEFGHJKMNPQRSTUVWXYZ".indexOf(b.charAt(d)));
                b = vb(c, Aa.length, 256);
                c = "";
                for (d = 0; d < b.length; d++)c += String.fromCharCode(b[d]);
                for (; 8 > c.length;)c = "\x00" + c;
                return a(c)
            };
            var wb = function () {
                for (var b = String.fromCharCode(0 | 8 * Math.random()), c = 8; --c;)b += String.fromCharCode(0 | 256 * Math.random());
                return a(b)
            }, xb = function () {
                var a;
                if (a = U)(a = fa("cvo_tid1")) ? (w("iCT val: " + a), a = a.split("|"), N = a[0], db = a[1]) : C && !C.match(/[10]/) ? (N = ub(C), w("iCT s2t: " + N)) : (N = wb(), w("iCT gen: " + N)), a = (w("$iP: " +
                    N), X);
                if (a) {
                    var b = setTimeout(function () {
                        ba("$iP.f-to")
                    }, Ha);
                    V(function () {
                        clearTimeout(b);
                        if (da && da) {
                            var a = P.get("cvo_tid1");
                            a ? (a = a.split("|"), Y = a[0], cb = a[1]) : (Y = wb(), lso_tid_ts = null)
                        }
                        Ga && (ma = P.fonts().join(";"))
                    })
                }
            }, ja = {trackPage: rb, trackEvent: ga, trackSource: function (a) {
                a = "string" != typeof a ? Ta(a) : {cvosrc: a};
                ga(a)
            }, trackUser: function (a) {
                var a = a instanceof Object ? Ta(a) : {id: a}, b = a.id;
                ("string" == typeof b || "object" == typeof b && b.constructor === String) && 0 < b.indexOf("@") && (a.id = "hashed-" + Ka(b));
                var c = /^\w+$/,
                    b = Z + "//" + aa + "/" + La + "/user/intuit/" + Ja + "/?bts=" + (new Date).getTime() + "&sid=" + z, d = [], e;
                for (e in a)if (c.test(e)) {
                    var f = "string" == typeof a[e] ? a[e] : q(a[e]);
                    d.push(e + "=" + encodeURIComponent(f))
                }
                d.length && (e = B.URL, e = Ua(e), b += "&" + d.join("&"), b += "&pag=" + encodeURIComponent(e), b += "&log=" + encodeURIComponent(O.join("\n")), qb(["trackUser"]), w(">> tu: " + z), ea(b))
            }, attachEvent: function (a, b, c, d) {
                w("aE: " + a);
                ga({id: b, type: c, value: d, attach: a})
            }, trackEventDone: function (a, b) {
                var c = fb[a];
                "function" == typeof c && c(b)
            }, showCode: function (a) {
                wa(function (a) {
                    var b =
                        z.match(/^[10]/) ? z : z.substr(0, Q);
                    "INPUT" == a.tagName ? a.value = z : a.innerHTML = b;
                    w("% " + b)
                }, a)
            }, skipRun: function (a) {
                for (var b = [], c = 1; c < arguments.length; c++)b.push(arguments[c]);
                Ea = 1;
                ja[a].apply(null, b);
                Ea = 0
            }, setOfflineCode: function (a) {
                E && (E.value = a);
                nb(a)
            }, inputCode: function (a) {
                "0" == z.charAt(0) && wa(function (a) {
                    a.innerHTML = "";
                    var b = E = B[n]("input");
                    b.id = "__cvo_input_code";
                    var c = Q - 0;
                    b.setAttribute("size", c + 3);
                    b.setAttribute("maxlength", c);
                    b.setAttribute("autocomplete", "off");
                    b.style.textTransform = "uppercase";
                    b.style.outline = "none";
                    b.value = (K || "").substr(0, Q);
                    b.onchange = b.onblur = b.onkeydown = b.onclick = b.onkeyup = function (a) {
                        Ra(a)
                    };
                    Ra();
                    a.appendChild(b)
                }, a)
            }, gotCode: function (a, b) {
                E && lb() != a ? Ra() : (ua(b), E && (b ? E.style.border = "solid 2px limegreen" : mb()))
            }, showEnteredCode: function (a) {
                wa(function (a) {
                    var b = K ? K.substr(0, Q) : "NOCODE";
                    a.innerHTML = b
                }, a)
            }, setUserSid: function (a) {
                z != a && I(a);
                C = z
            }, resetCode: function () {
                ua("")
            }, loadScript: ea, onTrackReady: function (a) {
                qa > v.pos || a()
            }, onAction: function () {
                for (var a = [], b = 0; b < arguments.length; b++)a[b] =
                    arguments[b];
                Na.push(a);
                for (var c = a[a.length - 1], b = 0; b < Ma.length; b++) {
                    for (var d = Ma[b], e = 1, f = 0; f < a.length - 1; f++)a[f] != d[f] && (e = 0);
                    e && c(d)
                }
            }, stampTids: function (a) {
                var b = (0 | Number(new Date) / 1E3) - a, c = N + "|" + (db || a) + "|" + a + "|" + b;
                sa("cvo_tid1", c, 5E3);
                da && (c = Y + "|" + (cb || a) + "|" + a + "|" + b, V(function () {
                    w("$st: F* " + c);
                    P.set("cvo_tid1", c)
                }));
                C = z
            }, setServer: function (a) {
                aa = v.server = a
            }, onUserDataReady: function (a) {
                ob ? a(Sa) : xa.push(a);
                pb || (pb = !0, w(">> ud: " + z), a = Z + "//" + aa + "/uda/da1/intuit/?sid=" + (z || "") + "&ver=" + j + "&bts=" +
                    (new Date).getTime(), ea(a))
            }, recvUserData: function (a) {
                Sa = a;
                ob = !0;
                for (a = 0; a < xa.length; a++)if ("function" == typeof xa[a])xa[a](Sa)
            }, getCode: function (a) {
                if (a)a(z); else return z
            }}, H, za, z, K, Va, J = va(B.URL, "cvo_sid1=", "&"), C = fa("cvo_sid1"), yb = va(B.URL, "cvo_mid1=", "&");
            yb ? ua(yb) : v.mid = K = fa("cvo_mid1");
            if ("all" == va(B.URL, "cvo_optout=", "&")) {
                var Kb = B.referrer, ha = document.createElement("a");
                ha.href = Kb;
                ha.hostname.match(/\b(?:youtube|conduit)\.com$/) || (J = "100000000000")
            }
            var ya = va(B.URL, "cvotest=", "&"), U = U && !(J +
                " " + C).match(/[10]/), M = fa("__cvo_skip_doc");
            if (M) {
                var M = M.replace(/%7C(?=https?%3A%2F%2)/, "|"), R = fa("__cvo_skip_run");
                ta("__cvo_skip_doc");
                ta("__cvo_skip_run");
                M = M.split("|");
                ca = decodeURIComponent(M[0]);
                Da = decodeURIComponent(M[1]);
                if (R) {
                    R = decodeURIComponent(R);
                    w("sk.r: " + R);
                    oa = __cvo_eval("[" + R + "]");
                    for (R = oa.length; R--;)M = oa[R], M.unshift("skipRun"), v.unshift(M)
                } else w("sk.d")
            }
            w("@ " + ((Xa - Fb) / 1E3).toFixed(3));
            if (X = function () {
                if (G.plugins && G.plugins["Shockwave Flash"]) {
                    if (G.plugins["Shockwave Flash"].description &&
                        (!G.mimeTypes || !G.mimeTypes["application/x-shockwave-flash"] || G.mimeTypes["application/x-shockwave-flash"].enabledPlugin))return!0
                } else if (l.ActiveXObject)try {
                    if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return!0
                } catch (a) {
                }
                return!1
            }() && !Db && !Eb && (Fa || U && (da || Ga))) {
                w("F");
                l.__cvo_f_loaded = function (a) {
                    P = a || y.getElementById("__cvo_f");
                    v.F = P;
                    for (w("fld"); Oa.length;)Oa.shift()()
                };
                var Wa;
                Wa = '<object id="__cvo_f_not" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"><param name=Movie value="' +
                    bb + '"><param name=AllowScriptAccess value="always"><embed id="__cvo_f" allowscriptaccess="always" style="" src="' + bb + '" type="application/x-shockwave-flash"/></embed></object>';
                if (d)eb = Wa; else {
                    var ia = y[n]("div");
                    ia.style.position = "absolute";
                    ia.style.left = "-2000px";
                    ia.style.display = "inline";
                    jb(function () {
                        var a = y.body;
                        a.insertBefore(ia, a.firstChild);
                        ia.innerHTML = Wa
                    })
                }
            }
            if (d) {
                var Lb = '<html><head><script>var Wp=window.parent;var $CVO=Wp.$CVO;function __cvo_f_loaded(){Wp.__cvo_f_loaded(document.getElementById("__cvo_f"));}<\/script></head><body><div>' +
                    eb + "</div></body></html>";
                jb(function () {
                    g = __cvo_lif(Lb);
                    xb();
                    tb()
                })
            } else xb(), tb()
        } catch (Mb) {
            T(Mb)
        }
    }
}
Number("1") || __cvo_core();
__cvo_main() && function () {
    var a;
    a:{
        a = RegExp("^ *cvo_uv_sent=");
        for (var b = document.cookie.split(";"), c = b.length; c--;) {
            var j = b[c].replace(a, "");
            if (j != b[c]) {
                a = j;
                break a
            }
        }
        a = null
    }
    a || ($CVO.push(["trackEvent", "unique-visitor"]), a = 5E3, b = void 0, a ? (c = new Date, c.setTime(c.getTime() + 864E5 * a), a = "; expires=" + c.toGMTString()) : a = "", c = "", b ? c = "; domain=." + b : (b = /[^.]*.(?:[^.]*|..\...|...\...)$/.exec(document.domain)[0], b != document.domain && (c = "; domain=." + b)), document.cookie = "cvo_uv_sent=1" + a + "; path=/" + c)
}();
var convertroclient = function () {
    return{initializeOnPageLoad: function () {
    }, beaconProductCompleteEvent: function (a, b, c, j) {
        $CVO = window.$CVO || [];
        $CVO.push(["trackEvent", {type: b, id: "complete-" + a + "-" + c, amount: Number(j) ? j : "0.01"}]);
        $CVO.push(["trackUser", {id: c}])
    }, beaconNewAuthorizationEvent: function (a, b) {
        $CVO = window.$CVO || [];
        $CVO.push(["trackEvent", {type: "new.auth", id: "newauth-" + a + "-" + b, amount: "1"}]);
        $CVO.push(["trackUser", {id: b}])
    }, beaconExistingAuthorizationEvent: function (a, b) {
        $CVO = window.$CVO || [];
        $CVO.push(["trackEvent",
            {type: "existing.auth", id: "existauth-" + a + "-" + b, amount: "1"}]);
        $CVO.push(["trackUser", {id: b}])
    }}
}();
CI.cookies = function () {
    function a(a) {
        var b = CI.$.cookie(a);
        null == b && CI.debug("Cookie: " + a + " not found");
        return b
    }

    function b(b) {
        b = a(b);
        return null != b ? (b = decodeURIComponent(b.replace(t, " ")), JSON.parse(b)) : null
    }

    function c(a, b) {
        var c = void 0, e = {}, j = CI.configManager.getCookieExpirationConfig(b).expireAfter;
        if (j && "number" === typeof j && Math.ceil(j) != j) {
            var m = new Date;
            m.setTime(m.getTime() + 864E5 * j);
            j = m
        }
        e.expires = j;
        e.path = CI.configManager.getConfig(CI.consts.CONFIG_COOKIEPATH);
        e.domain = CI.configManager.getConfig(CI.consts.CONFIG_DOMAIN);
        j = null;
        void 0 == c && (c = CI.configManager.getConfig(CI.consts.CONFIG_SECURECOOKIES));
        void 0 != c && /^true$/i.test(c) && (j = "secure");
        e.secure = j;
        c = encodeURIComponent(JSON.stringify(a));
        CI.$.cookie(b, c, e)
    }

    function j(a) {
        var b = new CI.cookiedata.visitor(CI.util.getGuid(20));
        null != a && (b.firstTime = a, b.lastTime = a);
        c(b, u);
        return b
    }

    function e(a) {
        var c = b(u);
        if (void 0 == c || null == c)c = j(a);
        return c
    }

    function q(a) {
        var b = e(a);
        b ? (b.visitCounter++, c(b, u)) : j(a)
    }

    function m() {
        var a = new CI.cookiedata.activeSession;
        a.id = CI.util.getGuid(20);
        c(a, CI.consts.COOKIE_CISID);
        var b = a.startTime, j = e(b);
        j.lastTime = b;
        c(j, u);
        q(a.startTime);
        return a
    }

    function r() {
        var a = b(CI.consts.COOKIE_CISID);
        if (void 0 == a || null == a)a = m();
        return a
    }

    var u = "civisitor", t = "/+/g";
    return{getCookieValueByName: function (b) {
        return a(b)
    }, getVisitor: function () {
        return e()
    }, incrementVisitCounter: function () {
        q()
    }, createSession: function () {
        return m()
    }, getSession: function () {
        return r()
    }, incrementSessionPageViewCounter: function () {
        var a = r();
        a.pageviewCount++;
        c(a, CI.consts.COOKIE_CISID);
        return a
    }, incrementSessionSequenceNo: function () {
        var a = r();
        a.sequenceNo++;
        c(a, CI.consts.COOKIE_CISID);
        return a
    }, getClosedSession: function () {
        var a = b("ciclosedsession");
        void 0 == a && (a = null);
        return a
    }, createClosedSession: function () {
        var a = new CI.cookiedata.closedSession, j = b(CI.consts.COOKIE_CISID);
        void 0 != j && null != j ? (a.id = j.id, a.activeSession = j) : a.id = CI.util.getGuid(20);
        c(a, "ciclosedsession");
        var j = a.endTime, m = e(j);
        m.lastTime = j;
        c(m, u);
        return a
    }}
}();
CI.mapping = function () {
    var a;
    return{setDataMappingJson: function (b) {
        a = b
    }, getFieldPath: function (b) {
        return a[b]
    }}
}();
CI.AffiliateLibrary = {};
CI.AffiliateLibrary.Client = {};
CI.affiliate_library = function () {
    return{beacon: function (a) {
        try {
            var b = null;
            if ("DoubleClick" == a.beaconFor) {
                b = new CI.AffiliateLibrary.DoubleClickBeacon;
                b.src = a.src;
                b.type = a.type;
                b.category = a.category;
                var c = b, j = CI.util.getUrlParameter(CI.consts.PARAM_PRODUCT_ID);
                CI.util.isEmpty(j) && (j = CI.cookies.getCookieValueByName(CI.consts.PARAM_PRODUCT_ID));
                if (!j || CI.util.isEmpty(j))j = "0";
                c.productId = j;
                b.baseUrl = a.baseUrl;
                var c = b, e, q = CI.data.getUserId();
                e = void 0 != q && null != q ? CI.util.getMD5value(q) : null;
                c.hashedAuthId =
                    e;
                b.orderId = 1;
                b.cid = CI.util.getUrlParameter(CI.consts.PARAM_CID);
                b.priorityCode = CI.util.getUrlParameter(CI.consts.PARAM_PRIORITY_CODE);
                b.adID = CI.util.getUrlParameter(CI.consts.PARAM_AD_ID);
                b.adobeAudienceId = CI.cookies.getCookieValueByName(CI.consts.COOKIE_ADOBE_AUDIENCE);
                e = b;
                var m, r = CI.cookies.getCookieValueByName(CI.consts.COOKIE_OMNITURE);
                m = void 0 != r && null != r ? CI.util.getMD5value(r) : null;
                e.hashedOmnitureID = m;
                b.dntFlag = a.dntFlag;
                (new CI.AffiliateLibrary.Client.NueDoubleClickBeacon).render(b)
            }
        } catch (u) {
            CI.debug("Error sending data to affiliate beaconing. " +
                u.name + " and message is " + u.message)
        }
    }}
}();
(function () {
    var a = !1, b = /xyz/.test(function () {
        xyz
    }) ? /\b_super\b/ : /.*/;
    this.ApAffiliateBeaconingBaseClass = function () {
    };
    ApAffiliateBeaconingBaseClass.extend = function (c) {
        function j() {
            !a && this.init && this.init.apply(this, arguments)
        }

        var e = this.prototype;
        a = !0;
        var q = new this;
        a = !1;
        for (var m in c)q[m] = "function" == typeof c[m] && "function" == typeof e[m] && b.test(c[m]) ? function (a, b) {
            return function () {
                var c = this._super;
                this._super = e[a];
                var j = b.apply(this, arguments);
                this._super = c;
                return j
            }
        }(m, c[m]) : c[m];
        j.prototype =
            q;
        j.prototype.constructor = j;
        j.extend = arguments.callee;
        return j
    }
})();
CI.AffiliateLibrary.Beacon = ApAffiliateBeaconingBaseClass.extend({orderNumber: null, orders: [], hashedAuthId: null, orderType: null, baseUrl: null, construct: function () {
}});
CI.AffiliateLibrary.OrderLineItem = function (a, b, c) {
    this.productCode = a;
    this.quantity = b;
    this.price = c
};
CI.AffiliateLibrary.DoubleClickBeacon = CI.AffiliateLibrary.Beacon.extend({construct: function () {
    this._super()
}, baseUrl: null, src: null, type: null, category: null, productId: null, orderId: null, hashedAuthId: null, cid: null, priorityCode: null, referrerURL: null, adID: null, adobeAudienceId: null, hashedOmnitureID: null, dntFlag: null, calculateUsFromSku: function () {
}});
CI.AffiliateLibrary.Client.NueDoubleClickBeacon = ApAffiliateBeaconingBaseClass.extend({CONST_AP_DOUBLECLICK_FRAME_NAME: "APDoubleClickFrame", CONST_AP_DOUBLECLICK_DIV_NAME: "APDoubleClickDiv", CONST_HTML_ELEMENT_STYLE: "display:none", CONST_ON_SCREEN_SIZE: 2, CONST_PRODUCTID_ENDING: ",0,0.00", formatProductId: function (a) {
    var b = 0;
    "undefined" != a && null != a && (b = a);
    return b + this.CONST_PRODUCTID_ENDING
}, formatField: function (a, b) {
    return"undefined" != b && null != b ? a + "=" + b + ";" : ""
}, render: function (a) {
    if (a) {
        var b = a.baseUrl,
            c = "";
        try {
            c += this.formatField("src", a.src);
            c += this.formatField("type", a.type);
            c += this.formatField("cat", a.category);
            c += this.formatField("u12", this.formatProductId(a.productId));
            c += this.formatField("u18", a.dntFlag);
            c += this.formatField("u28", a.adobeAudienceId);
            c += this.formatField("u31", a.hashedAuthId);
            c += this.formatField("ord", a.orderId);
            c += "num=" + (new Date).getTime();
            b += ";" + c + "?";
            "true" == CI.configManager.getConfig(CI.consts.CONFIG_DEBUG) && alert(b);
            var j = jQuery("#" + this.CONST_AP_DOUBLECLICK_DIV_NAME);
            0 == j.length ? (jQuery("<div style='" + this.CONST_HTML_ELEMENT_STYLE + "'></div>").attr({name: this.CONST_AP_DOUBLECLICK_DIV_NAME, id: this.CONST_AP_DOUBLECLICK_DIV_NAME, width: this.CONST_ON_SCREEN_SIZE, height: this.CONST_ON_SCREEN_SIZE}).appendTo(document.body), j = document.getElementById(this.CONST_AP_DOUBLECLICK_DIV_NAME)) : (j = document.getElementById(this.CONST_AP_DOUBLECLICK_DIV_NAME), j.removeChild(j.firstChild));
            jQuery("<iframe noresize scrolling='no' frameborder='yes' allowtransparency='false' style='" + this.CONST_HTML_ELEMENT_STYLE +
                "' ></iframe>").attr({name: this.CONST_AP_DOUBLECLICK_FRAME_NAME, id: this.CONST_AP_DOUBLECLICK_FRAME_NAME, width: this.CONST_ON_SCREEN_SIZE, height: this.CONST_ON_SCREEN_SIZE, src: b}).appendTo(j)
        } catch (e) {
            CI.debug("Could not handle " + e.message)
        }
    }
}});
