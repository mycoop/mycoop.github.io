define([], function () {
    return _.mixin({argsToArray: function (e) {
        return Array.prototype.slice.call(e)
    }, getParameterByName: function (e) {
        e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var t = "[\\?&]" + e + "=([^&#]*)", n = new RegExp(t), r = n.exec(window.location.search);
        return r === null ? null : decodeURIComponent(r[1].replace(/\+/g, " "))
    }, getAllParametersAsObject: function (e) {
        var t = {}, n = e.split("?")[1];
        if (n) {
            var r = n.split("&");
            if (r.length > 1)if (r[0] == "")for (var i = 1; i < r.length; i++) {
                var s = r[i].split("=")[0], o = r[i].split("=")[1];
                t[s] = o
            } else for (var i = 0; i < r.length; i++) {
                var s = r[i].split("=")[0], o = r[i].split("=")[1];
                t[s] = o
            } else if (n.split("=")) {
                var s = n.split("=")[0], o = n.split("=")[1];
                t[s] = o
            }
        }
        return t
    }, format: function () {
        var e = Array.prototype.slice.call(arguments), t = e.shift();
        return t.replace(/\{(\d+)\}/g, function (t, n) {
            return typeof e[n] != "undefined" ? e[n] : t
        })
    }, commafy: function (e) {
        return e += "", e.replace(/(^|[^\w.])(\d{4,})/g, function (e, t, n) {
            return t + n.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,")
        })
    }, modelArrayToJson: function (e, t) {
        var n = [];
        _.each(e, function (e) {
            n.push(e.toJSON())
        });
        if (_.isString(t)) {
            var r = {};
            return r[t] = n, r
        }
        return n
    }}), _.extend(Backbone.Validation.messages, {noSpaces: "{0} can't have any spaces"}), _.extend(Backbone.Validation.validators, {equalToNonSensitive: function (e, t, n, r, i) {
        if (_.isUndefined(e) || _.isUndefined(i[n]))return!1;
        if (e.toLowerCase() !== i[n].toLowerCase())return _.format(Backbone.Validation.messages.equalTo, Backbone.Validation.labelFormatters.sentenceCase(t, r), Backbone.Validation.labelFormatters.sentenceCase(i[n], r))
    }}), _.extend(Backbone.Validation.validators, {passwordStrength: function (e, t, n, r) {
        if (_.isUndefined(e))return!1;
        if (!_.isUndefined($.fn.ius_passwordStrength) && $.fn.ius_passwordStrength.getStrength(e) === "bad")return _.format(Backbone.Validation.messages.rangeLength, Backbone.Validation.labelFormatters.sentenceCase(t, r), n[0], n[1])
    }}), _.extend(Backbone.Validation.validators, {noSpaces: function (e, t, n, r) {
        if (_.isUndefined(e))return!1;
        if (n && ($.trim(e) === "" && e != "" || e != "" && e.indexOf(" ") > -1))return _.format(Backbone.Validation.messages.noSpaces, Backbone.Validation.labelFormatters.sentenceCase(t, r))
    }}), _.extend(Backbone.Validation.validators, {skipRemainingIfEmpty: function (e) {
        if (!_.isString(e) || e.length == 0)return!1
    }}), _.extend(Backbone.Validation.validators, {skipRemainingIfOtherEmpty: function (e, t, n, r, i) {
        var s = i[n];
        if (!_.isString(s) || s.length == 0)return!1
    }}), Backbone.Model.prototype.toJSON = function (e) {
        if (this._isSerializing)return this.id || this.cid;
        this._isSerializing = !0;
        var t = _.clone(this.attributes);
        return _.each(t, function (e, n) {
            _.isUndefined(e) == 0 && _.isNull(e) == 0 && _.isUndefined(n) == 0 && _.isNull(n) == 0 && _.isFunction(e.toJSON) && (t[n] = e.toJSON())
        }), this._isSerializing = !1, _.isObject(e) ? _.extend(t, e) : t
    }, null
});