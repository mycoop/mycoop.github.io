function addPasswordMeterToPage(e, t) {
    $("#" + e).append(createPWMeter()), $("#" + t).keyup(function () {
        chkPass($(this).val())
    })
}
function createPWMeter() {
    var e = document.createElement("div");
    e.id = "pwMeter";
    var t = document.createElement("div");
    t.id = "pwStrTxt", t.innerHTML = "Password strength: ";
    var n = document.createElement("div");
    return n.id = "pwStrBar", e.appendChild(t), e.appendChild(n), e.style.display = "none", e
}
function resetMeter() {
    var e = document.getElementById("pwMeter"), t = document.getElementById("pwStrBar");
    t.style.backgroundPosition = "-72px 0px", e.style.display == "none" && (e.style.display = "block")
}
function updateMeter(e) {
    var t = document.getElementById("pwStrBar"), n = -72;
    e > 4 ? e = 4 : e < 0 && (e = 0), n += (e + 1) * 14, t.style.backgroundPosition = n + "px " + "0px"
}
function chkPass(e) {
    resetMeter();
    if (e.length < 1)return;
    var t = new PasswordMeter, n = t.checkPassword(e);
    updateMeter(n)
}
function PasswordMeter() {
    this.Score = {count: 0, adjusted: 0, beforeRedundancy: 0}, this.Complexity = {limits: [20, 40, 60, 80, 100], value: this.COMPLEXITY.VERYWEAK}, this.PasswordLength = {count: 0, minimum: 6, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: .5, bonus: 10, penalty: -20}, this.RecommendedPasswordLength = {count: 0, minimum: 8, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 1.2, bonus: 10, penalty: -10}, this.BasicRequirements = {count: 0, minimum: 3, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 1, bonus: 10, penalty: -10}, this.Redundancy = {value: 1, permitted: 2, formula: "TBD", status: this.STATUS.FAILED, rating: 0}, this.UppercaseLetters = {count: 0, minimum: 1, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 10, penalty: -10}, this.LowercaseLetters = {count: 0, minimum: 1, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 10, penalty: -10}, this.Numerics = {count: 0, minimum: 1, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 10, penalty: -10}, this.Symbols = {count: 0, minimum: 1, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 10, penalty: -10}, this.MiddleSymbols = {count: 0, minimum: 1, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 10, penalty: -10}, this.MiddleNumerics = {count: 0, minimum: 1, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 10, penalty: -10}, this.SequentialLetters = {data: "abcdefghijklmnopqrstuvwxyz", length: 3, count: 0, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: -1, bonus: 0, penalty: -10}, this.SequentialNumerics = {data: "0123456789", length: 3, count: 0, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: -1, bonus: 0, penalty: -10}, this.KeyboardPatterns = {data: ["qwertyuiop", "asdfghjkl", "zyxcvbnm", "!@#$%^&*()_", "1234567890", "qazwsxedcrfvtgbyhnujmik,ol.p;/[']\\"], length: 4, count: 0, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: -1, bonus: 0, penalty: -10}, this.RepeatedSequences = {length: 3, count: 0, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 0, penalty: -10}, this.MirroredSequences = {length: 3, count: 0, formula: "TBD", status: this.STATUS.FAILED, rating: 0, factor: 0, bonus: 0, penalty: -10}, this.checkPassword = function (e) {
        e || (e = "");
        var t = -1, n = -1, r = -1, i = -1;
        this.PasswordLength.count = e.length, this.RecommendedPasswordLength.count = e.length;
        var s = e.split("");
        for (var o = 0; o < s.length; o++)s[o].match(/[A-Z]/g) ? (t != -1 && t + 1 == o && (this.nConsecutiveUppercaseLetters++, this.nConsecutiveLetters++), t = o, this.UppercaseLetters.count++) : s[o].match(/[a-z]/g) ? (n != -1 && n + 1 == o && (this.nConsecutiveLowercaseLetters++, this.nConsecutiveLetters++), n = o, this.LowercaseLetters.count++) : s[o].match(/[0-9]/g) ? (o > 0 && o < s.length - 1 && this.MiddleNumerics.count++, r != -1 && r + 1 == o && (this.nConsecutiveNumbers++, this.nConsecutiveLetters++), r = o, this.Numerics.count++) : s[o].match(new RegExp(/[^a-zA-Z0-9]/g)) && (o > 0 && o < s.length - 1 && this.MiddleSymbols.count++, i != -1 && i + 1 == o && (this.nConsecutiveSymbols++, this.nConsecutiveLetters++), i = o, this.Symbols.count++);
        if (s.length > 1) {
            var u = new Array;
            for (var o = 0; o < s.length; o++) {
                var a = !1;
                for (var f = o + 1; f < s.length; f++)s[o] == s[f] && (a = !0);
                a == 0 && u.push(s[o])
            }
            this.Redundancy.value = s.length / u.length
        }
        var l = e.toLowerCase();
        if (this.PasswordLength.count >= this.SequentialLetters.length)for (var c = 0; c < this.SequentialLetters.data.length - this.SequentialLetters.length; c++) {
            var h = this.SequentialLetters.data.substring(c, c + this.SequentialLetters.length), d = this.strReverse(h);
            l.indexOf(h) != -1 && this.SequentialLetters.count++, l.indexOf(d) != -1 && this.SequentialLetters.count++
        }
        if (this.PasswordLength.count >= this.SequentialNumerics.length)for (var c = 0; c < this.SequentialNumerics.data.length - this.SequentialNumerics.length; c++) {
            var h = this.SequentialNumerics.data.substring(c, c + this.SequentialNumerics.length), d = this.strReverse(h);
            l.indexOf(h) != -1 && this.SequentialNumerics.count++, l.indexOf(d) != -1 && this.SequentialNumerics.count++
        }
        var v = new Array;
        if (this.PasswordLength.count >= this.KeyboardPatterns.length)for (p in this.KeyboardPatterns.data) {
            var m = this.KeyboardPatterns.data[p];
            for (var c = 0; c < m.length - this.KeyboardPatterns.length; c++) {
                var h = m.substring(c, c + this.KeyboardPatterns.length), d = this.strReverse(h);
                l.indexOf(h) != -1 && v[h] == undefined && (this.KeyboardPatterns.count++, v[h] = h), l.indexOf(d) != -1 && v[d] == undefined && (this.KeyboardPatterns.count++, v[d] = d)
            }
        }
        if (this.PasswordLength.count > this.RepeatedSequences.length)for (var c = 0; c < l.length - this.RepeatedSequences.length; c++) {
            var h = l.substring(c, c + this.RepeatedSequences.length), g = l.indexOf(h, c + this.RepeatedSequences.length);
            g != -1 && this.RepeatedSequences.count++
        }
        if (this.PasswordLength.count > this.MirroredSequences.length)for (var c = 0; c < l.length - this.MirroredSequences.length; c++) {
            var h = l.substring(c, c + this.MirroredSequences.length), d = this.strReverse(h), g = l.indexOf(d, c + this.MirroredSequences.length);
            g != -1 && this.MirroredSequences.count++
        }
        this.Score.count = this.PasswordLength.count * this.PasswordLength.factor, this.PasswordLength.count < this.PasswordLength.minimum ? this.PasswordLength.rating = this.PasswordLength.penalty : this.PasswordLength.count >= this.PasswordLength.minimum && (this.PasswordLength.rating = this.PasswordLength.bonus + (this.PasswordLength.count - this.PasswordLength.minimum) * this.PasswordLength.factor), this.Score.count += this.PasswordLength.rating, this.PasswordLength.count >= this.RecommendedPasswordLength.minimum ? this.RecommendedPasswordLength.rating = this.RecommendedPasswordLength.bonus + (this.PasswordLength.count - this.RecommendedPasswordLength.minimum) * this.RecommendedPasswordLength.factor : this.RecommendedPasswordLength.rating = this.RecommendedPasswordLength.penalty, this.Score.count += this.RecommendedPasswordLength.rating, this.LowercaseLetters.count > 0 ? this.LowercaseLetters.rating = this.LowercaseLetters.bonus + this.LowercaseLetters.count * this.LowercaseLetters.factor : this.LowercaseLetters.rating = this.LowercaseLetters.penalty, this.Score.count += this.LowercaseLetters.rating, this.UppercaseLetters.count > 0 ? this.UppercaseLetters.rating = this.UppercaseLetters.bonus + this.UppercaseLetters.count * this.UppercaseLetters.factor : this.UppercaseLetters.rating = this.UppercaseLetters.penalty, this.Score.count += this.UppercaseLetters.rating, this.Numerics.count > 0 ? this.Numerics.rating = this.Numerics.bonus + this.Numerics.count * this.Numerics.factor : this.Numerics.rating = this.Numerics.penalty, this.Score.count += this.Numerics.rating, this.Symbols.count > 0 ? this.Symbols.rating = this.Symbols.bonus + this.Symbols.count * this.Symbols.factor : this.Symbols.rating = this.Symbols.penalty, this.Score.count += this.Symbols.rating, this.MiddleSymbols.count > 0 ? this.MiddleSymbols.rating = this.MiddleSymbols.bonus + this.MiddleSymbols.count * this.MiddleSymbols.factor : this.MiddleSymbols.rating = this.MiddleSymbols.penalty, this.Score.count += this.MiddleSymbols.rating, this.MiddleNumerics.count > 0 ? this.MiddleNumerics.rating = this.MiddleNumerics.bonus + this.MiddleNumerics.count * this.MiddleNumerics.factor : this.MiddleNumerics.rating = this.MiddleNumerics.penalty, this.Score.count += this.MiddleNumerics.rating, this.SequentialLetters.count == 0 ? this.SequentialLetters.rating = this.SequentialLetters.bonus : this.SequentialLetters.rating = this.SequentialLetters.penalty + this.SequentialLetters.count * this.SequentialLetters.factor, this.Score.count += this.SequentialLetters.rating, this.SequentialNumerics.count == 0 ? this.SequentialNumerics.rating = this.SequentialNumerics.bonus : this.SequentialNumerics.rating = this.SequentialNumerics.penalty + this.SequentialNumerics.count * this.SequentialNumerics.factor, this.Score.count += this.SequentialNumerics.rating, this.KeyboardPatterns.count == 0 ? this.KeyboardPatterns.rating = this.KeyboardPatterns.bonus : this.KeyboardPatterns.rating = this.KeyboardPatterns.penalty + this.KeyboardPatterns.count * this.KeyboardPatterns.factor, this.Score.count += this.KeyboardPatterns.rating, this.RepeatedSequences.count == 0 ? this.RepeatedSequences.rating = this.RepeatedSequences.bonus : this.RepeatedSequences.rating = this.RepeatedSequences.penalty + this.RepeatedSequences.count * this.RepeatedSequences.factor, this.Score.count += this.RepeatedSequences.rating, this.MirroredSequences.count == 0 ? this.MirroredSequences.rating = this.MirroredSequences.bonus : this.MirroredSequences.rating = this.MirroredSequences.penalty + this.MirroredSequences.count * this.MirroredSequences.factor, this.Score.count += this.MirroredSequences.rating, this.BasicRequirements.count = 0, this.PasswordLength.status = this.determineStatus(this.PasswordLength.count - this.PasswordLength.minimum), this.PasswordLength.status != this.STATUS.FAILED && this.BasicRequirements.count++, this.UppercaseLetters.status = this.determineStatus(this.UppercaseLetters.count - this.UppercaseLetters.minimum), this.UppercaseLetters.status != this.STATUS.FAILED && this.BasicRequirements.count++, this.LowercaseLetters.status = this.determineStatus(this.LowercaseLetters.count - this.LowercaseLetters.minimum), this.LowercaseLetters.status != this.STATUS.FAILED && this.BasicRequirements.count++, this.Numerics.status = this.determineStatus(this.Numerics.count - this.Numerics.minimum), this.Numerics.status != this.STATUS.FAILED && this.BasicRequirements.count++, this.Symbols.status = this.determineStatus(this.Symbols.count - this.Symbols.minimum), this.Symbols.status != this.STATUS.FAILED && this.BasicRequirements.count++, this.BasicRequirements.status = this.determineStatus(this.BasicRequirements.count - this.BasicRequirements.minimum), this.BasicRequirements.status != this.STATUS.FAILED ? this.BasicRequirements.rating = this.BasicRequirements.bonus + this.BasicRequirements.factor * this.BasicRequirements.count : this.BasicRequirements.rating = this.BasicRequirements.penalty, this.Score.count += this.BasicRequirements.rating, this.RecommendedPasswordLength.status = this.determineStatus(this.PasswordLength.count - this.RecommendedPasswordLength.minimum), this.MiddleNumerics.status = this.determineStatus(this.MiddleNumerics.count - this.MiddleNumerics.minimum), this.MiddleSymbols.status = this.determineStatus(this.MiddleSymbols.count - this.MiddleSymbols.minimum), this.SequentialLetters.status = this.determineBinaryStatus(this.SequentialLetters.count), this.SequentialNumerics.status = this.determineBinaryStatus(this.SequentialNumerics.count), this.KeyboardPatterns.status = this.determineBinaryStatus(this.KeyboardPatterns.count), this.RepeatedSequences.status = this.determineBinaryStatus(this.RepeatedSequences.count), this.MirroredSequences.status = this.determineBinaryStatus(this.MirroredSequences.count), this.Score.beforeRedundancy = this.Score.count;
        if (this.PasswordLength.status != this.STATUS.FAILED) {
            if (!(this.Redundancy.value <= this.Redundancy.permitted) && this.Score.count > 0) {
                var y = this.Redundancy.value - this.Redundancy.permitted + 1;
                this.Score.count = this.Score.count * (1 / y)
            }
        } else this.Score.count > 0 && (this.Score.count = this.Score.count * (1 / this.Redundancy.value));
        this.Score.count > 100 ? this.Score.adjusted = 100 : this.Score.count < 0 ? this.Score.adjusted = 0 : this.Score.adjusted = this.Score.count;
        for (var b = 0; b < this.Complexity.limits.length; b++)if (this.Score.adjusted <= this.Complexity.limits[b]) {
            this.Complexity.value = b;
            break
        }
        return this.Complexity.value
    }
}
function isSupported() {
    var e = document.createElement("input");
    return"placeholder"in e
}
function focusSearchBar() {
    $("#navSearchBox").is(":visible") || showSearchBox();
    var e = setInterval(function () {
        var e = $(window).attr("innerWidth") != undefined ? window.innerWidth : document.documentElement.clientWidth;
        e >= 767 && $("#navSearchBox").toggleClass("positionLeft"), $("#SearchFormSubmit").toggleClass("positionLeft")
    }, 75);
    setTimeout(function () {
        clearInterval(e), $("#navSearchBox").removeClass("positionLeft"), $("#SearchFormSubmit").removeClass("positionLeft"), document.getElementById("navSearchBox").focus()
    }, 750)
}
function showSearchBox() {
    if (!$("#navSearchBox").is(":visible")) {
        var e = $("header").width();
        $("#navSearchBox").css({width: e}).addClass("visible"), $(window).on("resize.searchForm", function () {
            $("#navSearchForm .TD-x3").hasClass("visible") ? $("#navSearchBox").css({width: $("header").width()}) : $(window).off("resize.searchForm")
        }), $("#navSearchForm .TD-x3, #navSearchForm .searchBoxClose").addClass("visible").click(function () {
            $("#navSearchBox, #navSearchForm .TD-x3, #navSearchForm .searchBoxClose").removeClass("visible"), $(window).off("resize.searchForm")
        })
    }
}
var jQueryFn = function (e, t) {
    function H(e) {
        var t = e.length, n = w.type(e);
        return w.isWindow(e) ? !1 : e.nodeType === 1 && t ? !0 : n === "array" || n !== "function" && (t === 0 || typeof t == "number" && t > 0 && t - 1 in e)
    }

    function j(e) {
        var t = B[e] = {};
        return w.each(e.match(S) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function q(e, n, r, i) {
        if (!w.acceptData(e))return;
        var s, o, u = w.expando, a = e.nodeType, f = a ? w.cache : e, l = a ? e[u] : e[u] && u;
        if ((!l || !f[l] || !i && !f[l].data) && r === t && typeof n == "string")return;
        l || (a ? l = e[u] = c.pop() || w.guid++ : l = u), f[l] || (f[l] = a ? {} : {toJSON: w.noop});
        if (typeof n == "object" || typeof n == "function")i ? f[l] = w.extend(f[l], n) : f[l].data = w.extend(f[l].data, n);
        return o = f[l], i || (o.data || (o.data = {}), o = o.data), r !== t && (o[w.camelCase(n)] = r), typeof n == "string" ? (s = o[n], s == null && (s = o[w.camelCase(n)])) : s = o, s
    }

    function R(e, t, n) {
        if (!w.acceptData(e))return;
        var r, i, s = e.nodeType, o = s ? w.cache : e, u = s ? e[w.expando] : w.expando;
        if (!o[u])return;
        if (t) {
            r = n ? o[u] : o[u].data;
            if (r) {
                w.isArray(t) ? t = t.concat(w.map(t, w.camelCase)) : t in r ? t = [t] : (t = w.camelCase(t), t in r ? t = [t] : t = t.split(" ")), i = t.length;
                while (i--)delete r[t[i]];
                if (n ? !z(r) : !w.isEmptyObject(r))return
            }
        }
        if (!n) {
            delete o[u].data;
            if (!z(o[u]))return
        }
        s ? w.cleanData([e], !0) : w.support.deleteExpando || o != o.window ? delete o[u] : o[u] = null
    }

    function U(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(I, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : F.test(r) ? w.parseJSON(r) : r
                } catch (s) {
                }
                w.data(e, n, r)
            } else r = t
        }
        return r
    }

    function z(e) {
        var t;
        for (t in e) {
            if (t === "data" && w.isEmptyObject(e[t]))continue;
            if (t !== "toJSON")return!1
        }
        return!0
    }

    function it() {
        return!0
    }

    function st() {
        return!1
    }

    function ot() {
        try {
            return o.activeElement
        } catch (e) {
        }
    }

    function ct(e, t) {
        do e = e[t]; while (e && e.nodeType !== 1);
        return e
    }

    function ht(e, t, n) {
        if (w.isFunction(t))return w.grep(e, function (e, r) {
            return!!t.call(e, r, e) !== n
        });
        if (t.nodeType)return w.grep(e, function (e) {
            return e === t !== n
        });
        if (typeof t == "string") {
            if (ut.test(t))return w.filter(t, e, n);
            t = w.filter(t, e)
        }
        return w.grep(e, function (e) {
            return w.inArray(e, t) >= 0 !== n
        })
    }

    function pt(e) {
        var t = dt.split("|"), n = e.createDocumentFragment();
        if (n.createElement)while (t.length)n.createElement(t.pop());
        return n
    }

    function Mt(e, t) {
        return w.nodeName(e, "table") && w.nodeName(t.nodeType === 1 ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function _t(e) {
        return e.type = (w.find.attr(e, "type") !== null) + "/" + e.type, e
    }

    function Dt(e) {
        var t = Ct.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function Pt(e, t) {
        var n, r = 0;
        for (; (n = e[r]) != null; r++)w._data(n, "globalEval", !t || w._data(t[r], "globalEval"))
    }

    function Ht(e, t) {
        if (t.nodeType !== 1 || !w.hasData(e))return;
        var n, r, i, s = w._data(e), o = w._data(t, s), u = s.events;
        if (u) {
            delete o.handle, o.events = {};
            for (n in u)for (r = 0, i = u[n].length; r < i; r++)w.event.add(t, n, u[n][r])
        }
        o.data && (o.data = w.extend({}, o.data))
    }

    function Bt(e, t) {
        var n, r, i;
        if (t.nodeType !== 1)return;
        n = t.nodeName.toLowerCase();
        if (!w.support.noCloneEvent && t[w.expando]) {
            i = w._data(t);
            for (r in i.events)w.removeEvent(t, r, i.handle);
            t.removeAttribute(w.expando)
        }
        if (n === "script" && t.text !== e.text)_t(t).text = e.text, Dt(t); else if (n === "object")t.parentNode && (t.outerHTML = e.outerHTML), w.support.html5Clone && e.innerHTML && !w.trim(t.innerHTML) && (t.innerHTML = e.innerHTML); else if (n === "input" && xt.test(e.type))t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value); else if (n === "option")t.defaultSelected = t.selected = e.defaultSelected; else if (n === "input" || n === "textarea")t.defaultValue = e.defaultValue
    }

    function jt(e, n) {
        var r, s, o = 0, u = typeof e.getElementsByTagName !== i ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== i ? e.querySelectorAll(n || "*") : t;
        if (!u)for (u = [], r = e.childNodes || e; (s = r[o]) != null; o++)!n || w.nodeName(s, n) ? u.push(s) : w.merge(u, jt(s, n));
        return n === t || n && w.nodeName(e, n) ? w.merge([e], u) : u
    }

    function Ft(e) {
        xt.test(e.type) && (e.defaultChecked = e.checked)
    }

    function tn(e, t) {
        if (t in e)return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = en.length;
        while (i--) {
            t = en[i] + n;
            if (t in e)return t
        }
        return r
    }

    function nn(e, t) {
        return e = t || e, w.css(e, "display") === "none" || !w.contains(e.ownerDocument, e)
    }

    function rn(e, t) {
        var n, r, i, s = [], o = 0, u = e.length;
        for (; o < u; o++) {
            r = e[o];
            if (!r.style)continue;
            s[o] = w._data(r, "olddisplay"), n = r.style.display, t ? (!s[o] && n === "none" && (r.style.display = ""), r.style.display === "" && nn(r) && (s[o] = w._data(r, "olddisplay", an(r.nodeName)))) : s[o] || (i = nn(r), (n && n !== "none" || !i) && w._data(r, "olddisplay", i ? n : w.css(r, "display")))
        }
        for (o = 0; o < u; o++) {
            r = e[o];
            if (!r.style)continue;
            if (!t || r.style.display === "none" || r.style.display === "")r.style.display = t ? s[o] || "" : "none"
        }
        return e
    }

    function sn(e, t, n) {
        var r = $t.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function on(e, t, n, r, i) {
        var s = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0, o = 0;
        for (; s < 4; s += 2)n === "margin" && (o += w.css(e, n + Zt[s], !0, i)), r ? (n === "content" && (o -= w.css(e, "padding" + Zt[s], !0, i)), n !== "margin" && (o -= w.css(e, "border" + Zt[s] + "Width", !0, i))) : (o += w.css(e, "padding" + Zt[s], !0, i), n !== "padding" && (o += w.css(e, "border" + Zt[s] + "Width", !0, i)));
        return o
    }

    function un(e, t, n) {
        var r = !0, i = t === "width" ? e.offsetWidth : e.offsetHeight, s = qt(e), o = w.support.boxSizing && w.css(e, "boxSizing", !1, s) === "border-box";
        if (i <= 0 || i == null) {
            i = Rt(e, t, s);
            if (i < 0 || i == null)i = e.style[t];
            if (Jt.test(i))return i;
            r = o && (w.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + on(e, t, n || (o ? "border" : "content"), r, s) + "px"
    }

    function an(e) {
        var t = o, n = Qt[e];
        if (!n) {
            n = fn(e, t);
            if (n === "none" || !n)It = (It || w("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (It[0].contentWindow || It[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = fn(e, t), It.detach();
            Qt[e] = n
        }
        return n
    }

    function fn(e, t) {
        var n = w(t.createElement(e)).appendTo(t.body), r = w.css(n[0], "display");
        return n.remove(), r
    }

    function vn(e, t, n, r) {
        var i;
        if (w.isArray(t))w.each(t, function (t, i) {
            n || cn.test(e) ? r(e, i) : vn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        }); else if (!n && w.type(t) === "object")for (i in t)vn(e + "[" + i + "]", t[i], n, r); else r(e, t)
    }

    function _n(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i = 0, s = t.toLowerCase().match(S) || [];
            if (w.isFunction(n))while (r = s[i++])r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }

    function Dn(e, t, n, r) {
        function o(u) {
            var a;
            return i[u] = !0, w.each(e[u] || [], function (e, u) {
                var f = u(t, n, r);
                if (typeof f == "string" && !s && !i[f])return t.dataTypes.unshift(f), o(f), !1;
                if (s)return!(a = f)
            }), a
        }

        var i = {}, s = e === An;
        return o(t.dataTypes[0]) || !i["*"] && o("*")
    }

    function Pn(e, n) {
        var r, i, s = w.ajaxSettings.flatOptions || {};
        for (i in n)n[i] !== t && ((s[i] ? e : r || (r = {}))[i] = n[i]);
        return r && w.extend(!0, e, r), e
    }

    function Hn(e, n, r) {
        var i, s, o, u, a = e.contents, f = e.dataTypes;
        while (f[0] === "*")f.shift(), s === t && (s = e.mimeType || n.getResponseHeader("Content-Type"));
        if (s)for (u in a)if (a[u] && a[u].test(s)) {
            f.unshift(u);
            break
        }
        if (f[0]in r)o = f[0]; else {
            for (u in r) {
                if (!f[0] || e.converters[u + " " + f[0]]) {
                    o = u;
                    break
                }
                i || (i = u)
            }
            o = o || i
        }
        if (o)return o !== f[0] && f.unshift(o), r[o]
    }

    function Bn(e, t, n, r) {
        var i, s, o, u, a, f = {}, l = e.dataTypes.slice();
        if (l[1])for (o in e.converters)f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s) {
            e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift();
            if (s)if (s === "*")s = a; else if (a !== "*" && a !== s) {
                o = f[a + " " + s] || f["* " + s];
                if (!o)for (i in f) {
                    u = i.split(" ");
                    if (u[1] === s) {
                        o = f[a + " " + u[0]] || f["* " + u[0]];
                        if (o) {
                            o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                            break
                        }
                    }
                }
                if (o !== !0)if (o && e["throws"])t = o(t); else try {
                    t = o(t)
                } catch (c) {
                    return{state: "parsererror", error: o ? c : "No conversion from " + a + " to " + s}
                }
            }
        }
        return{state: "success", data: t}
    }

    function zn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {
        }
    }

    function Wn() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {
        }
    }

    function Yn() {
        return setTimeout(function () {
            Xn = t
        }), Xn = w.now()
    }

    function Zn(e, t, n) {
        var r, i = (Gn[t] || []).concat(Gn["*"]), s = 0, o = i.length;
        for (; s < o; s++)if (r = i[s].call(n, t, e))return r
    }

    function er(e, t, n) {
        var r, i, s = 0, o = Qn.length, u = w.Deferred().always(function () {
            delete a.elem
        }), a = function () {
            if (i)return!1;
            var t = Xn || Yn(), n = Math.max(0, f.startTime + f.duration - t), r = n / f.duration || 0, s = 1 - r, o = 0, a = f.tweens.length;
            for (; o < a; o++)f.tweens[o].run(s);
            return u.notifyWith(e, [f, s, n]), s < 1 && a ? n : (u.resolveWith(e, [f]), !1)
        }, f = u.promise({elem: e, props: w.extend({}, t), opts: w.extend(!0, {specialEasing: {}}, n), originalProperties: t, originalOptions: n, startTime: Xn || Yn(), duration: n.duration, tweens: [], createTween: function (t, n) {
            var r = w.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
            return f.tweens.push(r), r
        }, stop: function (t) {
            var n = 0, r = t ? f.tweens.length : 0;
            if (i)return this;
            i = !0;
            for (; n < r; n++)f.tweens[n].run(1);
            return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
        }}), l = f.props;
        tr(l, f.opts.specialEasing);
        for (; s < o; s++) {
            r = Qn[s].call(f, e, l, f.opts);
            if (r)return r
        }
        return w.map(l, Zn, f), w.isFunction(f.opts.start) && f.opts.start.call(e, f), w.fx.timer(w.extend(a, {elem: e, anim: f, queue: f.opts.queue})), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function tr(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = w.camelCase(n), i = t[r], s = e[n], w.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = w.cssHooks[r];
            if (o && "expand"in o) {
                s = o.expand(s), delete e[r];
                for (n in s)n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function nr(e, t, n) {
        var r, i, s, o, u, a, f = this, l = {}, c = e.style, h = e.nodeType && nn(e), p = w._data(e, "fxshow");
        n.queue || (u = w._queueHooks(e, "fx"), u.unqueued == null && (u.unqueued = 0, a = u.empty.fire, u.empty.fire = function () {
            u.unqueued || a()
        }), u.unqueued++, f.always(function () {
            f.always(function () {
                u.unqueued--, w.queue(e, "fx").length || u.empty.fire()
            })
        })), e.nodeType === 1 && ("height"in t || "width"in t) && (n.overflow = [c.overflow, c.overflowX, c.overflowY], w.css(e, "display") === "inline" && w.css(e, "float") === "none" && (!w.support.inlineBlockNeedsLayout || an(e.nodeName) === "inline" ? c.display = "inline-block" : c.zoom = 1)), n.overflow && (c.overflow = "hidden", w.support.shrinkWrapBlocks || f.always(function () {
            c.overflow = n.overflow[0], c.overflowX = n.overflow[1], c.overflowY = n.overflow[2]
        }));
        for (r in t) {
            i = t[r];
            if ($n.exec(i)) {
                delete t[r], s = s || i === "toggle";
                if (i === (h ? "hide" : "show"))continue;
                l[r] = p && p[r] || w.style(e, r)
            }
        }
        if (!w.isEmptyObject(l)) {
            p ? "hidden"in p && (h = p.hidden) : p = w._data(e, "fxshow", {}), s && (p.hidden = !h), h ? w(e).show() : f.done(function () {
                w(e).hide()
            }), f.done(function () {
                var t;
                w._removeData(e, "fxshow");
                for (t in l)w.style(e, t, l[t])
            });
            for (r in l)o = Zn(h ? p[r] : 0, r, f), r in p || (p[r] = o.start, h && (o.end = o.start, o.start = r === "width" || r === "height" ? 1 : 0))
        }
    }

    function rr(e, t, n, r, i) {
        return new rr.prototype.init(e, t, n, r, i)
    }

    function ir(e, t) {
        var n, r = {height: e}, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t)n = Zt[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function sr(e) {
        return w.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }

    var n, r, i = typeof t, s = e.location, o = e.document, u = o.documentElement, a = e.jQuery, f = e.$, l = {}, c = [], h = "1.10.2", p = c.concat, d = c.push, v = c.slice, m = c.indexOf, g = l.toString, y = l.hasOwnProperty, b = h.trim, w = function (e, t) {
        return new w.fn.init(e, t, r)
    }, E = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, S = /\S+/g, x = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, T = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, N = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, C = /^[\],:{}\s]*$/, k = /(?:^|:|,)(?:\s*\[)+/g, L = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, A = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g, O = /^-ms-/, M = /-([\da-z])/gi, _ = function (e, t) {
        return t.toUpperCase()
    }, D = function (e) {
        if (o.addEventListener || e.type === "load" || o.readyState === "complete")P(), w.ready()
    }, P = function () {
        o.addEventListener ? (o.removeEventListener("DOMContentLoaded", D, !1), e.removeEventListener("load", D, !1)) : (o.detachEvent("onreadystatechange", D), e.detachEvent("onload", D))
    };
    w.fn = w.prototype = {jquery: h, constructor: w, init: function (e, n, r) {
        var i, s;
        if (!e)return this;
        if (typeof e == "string") {
            e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? i = [null, e, null] : i = T.exec(e);
            if (i && (i[1] || !n)) {
                if (i[1]) {
                    n = n instanceof w ? n[0] : n, w.merge(this, w.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : o, !0));
                    if (N.test(i[1]) && w.isPlainObject(n))for (i in n)w.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this
                }
                s = o.getElementById(i[2]);
                if (s && s.parentNode) {
                    if (s.id !== i[2])return r.find(e);
                    this.length = 1, this[0] = s
                }
                return this.context = o, this.selector = e, this
            }
            return!n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : w.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), w.makeArray(e, this))
    }, selector: "", length: 0, toArray: function () {
        return v.call(this)
    }, get: function (e) {
        return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
    }, pushStack: function (e) {
        var t = w.merge(this.constructor(), e);
        return t.prevObject = this, t.context = this.context, t
    }, each: function (e, t) {
        return w.each(this, e, t)
    }, ready: function (e) {
        return w.ready.promise().done(e), this
    }, slice: function () {
        return this.pushStack(v.apply(this, arguments))
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, eq: function (e) {
        var t = this.length, n = +e + (e < 0 ? t : 0);
        return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
    }, map: function (e) {
        return this.pushStack(w.map(this, function (t, n) {
            return e.call(t, n, t)
        }))
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: d, sort: [].sort, splice: [].splice}, w.fn.init.prototype = w.fn, w.extend = w.fn.extend = function () {
        var e, n, r, i, s, o, u = arguments[0] || {}, a = 1, f = arguments.length, l = !1;
        typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !w.isFunction(u) && (u = {}), f === a && (u = this, --a);
        for (; a < f; a++)if ((s = arguments[a]) != null)for (i in s) {
            e = u[i], r = s[i];
            if (u === r)continue;
            l && r && (w.isPlainObject(r) || (n = w.isArray(r))) ? (n ? (n = !1, o = e && w.isArray(e) ? e : []) : o = e && w.isPlainObject(e) ? e : {}, u[i] = w.extend(l, o, r)) : r !== t && (u[i] = r)
        }
        return u
    }, w.extend({expando: "jQuery" + (h + Math.random()).replace(/\D/g, ""), noConflict: function (t) {
        return e.$ === w && (e.$ = f), t && e.jQuery === w && (e.jQuery = a), w
    }, isReady: !1, readyWait: 1, holdReady: function (e) {
        e ? w.readyWait++ : w.ready(!0)
    }, ready: function (e) {
        if (e === !0 ? --w.readyWait : w.isReady)return;
        if (!o.body)return setTimeout(w.ready);
        w.isReady = !0;
        if (e !== !0 && --w.readyWait > 0)return;
        n.resolveWith(o, [w]), w.fn.trigger && w(o).trigger("ready").off("ready")
    }, isFunction: function (e) {
        return w.type(e) === "function"
    }, isArray: Array.isArray || function (e) {
        return w.type(e) === "array"
    }, isWindow: function (e) {
        return e != null && e == e.window
    }, isNumeric: function (e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }, type: function (e) {
        return e == null ? String(e) : typeof e == "object" || typeof e == "function" ? l[g.call(e)] || "object" : typeof e
    }, isPlainObject: function (e) {
        var n;
        if (!e || w.type(e) !== "object" || e.nodeType || w.isWindow(e))return!1;
        try {
            if (e.constructor && !y.call(e, "constructor") && !y.call(e.constructor.prototype, "isPrototypeOf"))return!1
        } catch (r) {
            return!1
        }
        if (w.support.ownLast)for (n in e)return y.call(e, n);
        for (n in e);
        return n === t || y.call(e, n)
    }, isEmptyObject: function (e) {
        var t;
        for (t in e)return!1;
        return!0
    }, error: function (e) {
        throw new Error(e)
    }, parseHTML: function (e, t, n) {
        if (!e || typeof e != "string")return null;
        typeof t == "boolean" && (n = t, t = !1), t = t || o;
        var r = N.exec(e), i = !n && [];
        return r ? [t.createElement(r[1])] : (r = w.buildFragment([e], t, i), i && w(i).remove(), w.merge([], r.childNodes))
    }, parseJSON: function (t) {
        if (e.JSON && e.JSON.parse)return e.JSON.parse(t);
        if (t === null)return t;
        if (typeof t == "string") {
            t = w.trim(t);
            if (t && C.test(t.replace(L, "@").replace(A, "]").replace(k, "")))return(new Function("return " + t))()
        }
        w.error("Invalid JSON: " + t)
    }, parseXML: function (n) {
        var r, i;
        if (!n || typeof n != "string")return null;
        try {
            e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
        } catch (s) {
            r = t
        }
        return(!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && w.error("Invalid XML: " + n), r
    }, noop: function () {
    }, globalEval: function (t) {
        t && w.trim(t) && (e.execScript || function (t) {
            e.eval.call(e, t)
        })(t)
    }, camelCase: function (e) {
        return e.replace(O, "ms-").replace(M, _)
    }, nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }, each: function (e, t, n) {
        var r, i = 0, s = e.length, o = H(e);
        if (n)if (o)for (; i < s; i++) {
            r = t.apply(e[i], n);
            if (r === !1)break
        } else for (i in e) {
            r = t.apply(e[i], n);
            if (r === !1)break
        } else if (o)for (; i < s; i++) {
            r = t.call(e[i], i, e[i]);
            if (r === !1)break
        } else for (i in e) {
            r = t.call(e[i], i, e[i]);
            if (r === !1)break
        }
        return e
    }, trim: b && !b.call("﻿ ") ? function (e) {
        return e == null ? "" : b.call(e)
    } : function (e) {
        return e == null ? "" : (e + "").replace(x, "")
    }, makeArray: function (e, t) {
        var n = t || [];
        return e != null && (H(Object(e)) ? w.merge(n, typeof e == "string" ? [e] : e) : d.call(n, e)), n
    }, inArray: function (e, t, n) {
        var r;
        if (t) {
            if (m)return m.call(t, e, n);
            r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
            for (; n < r; n++)if (n in t && t[n] === e)return n
        }
        return-1
    }, merge: function (e, n) {
        var r = n.length, i = e.length, s = 0;
        if (typeof r == "number")for (; s < r; s++)e[i++] = n[s]; else while (n[s] !== t)e[i++] = n[s++];
        return e.length = i, e
    }, grep: function (e, t, n) {
        var r, i = [], s = 0, o = e.length;
        n = !!n;
        for (; s < o; s++)r = !!t(e[s], s), n !== r && i.push(e[s]);
        return i
    }, map: function (e, t, n) {
        var r, i = 0, s = e.length, o = H(e), u = [];
        if (o)for (; i < s; i++)r = t(e[i], i, n), r != null && (u[u.length] = r); else for (i in e)r = t(e[i], i, n), r != null && (u[u.length] = r);
        return p.apply([], u)
    }, guid: 1, proxy: function (e, n) {
        var r, i, s;
        return typeof n == "string" && (s = e[n], n = e, e = s), w.isFunction(e) ? (r = v.call(arguments, 2), i = function () {
            return e.apply(n || this, r.concat(v.call(arguments)))
        }, i.guid = e.guid = e.guid || w.guid++, i) : t
    }, access: function (e, n, r, i, s, o, u) {
        var a = 0, f = e.length, l = r == null;
        if (w.type(r) === "object") {
            s = !0;
            for (a in r)w.access(e, n, a, r[a], !0, o, u)
        } else if (i !== t) {
            s = !0, w.isFunction(i) || (u = !0), l && (u ? (n.call(e, i), n = null) : (l = n, n = function (e, t, n) {
                return l.call(w(e), n)
            }));
            if (n)for (; a < f; a++)n(e[a], r, u ? i : i.call(e[a], a, n(e[a], r)))
        }
        return s ? e : l ? n.call(e) : f ? n(e[0], r) : o
    }, now: function () {
        return(new Date).getTime()
    }, swap: function (e, t, n, r) {
        var i, s, o = {};
        for (s in t)o[s] = e.style[s], e.style[s] = t[s];
        i = n.apply(e, r || []);
        for (s in t)e.style[s] = o[s];
        return i
    }}), w.ready.promise = function (t) {
        if (!n) {
            n = w.Deferred();
            if (o.readyState === "complete")setTimeout(w.ready); else if (o.addEventListener)o.addEventListener("DOMContentLoaded", D, !1), e.addEventListener("load", D, !1); else {
                o.attachEvent("onreadystatechange", D), e.attachEvent("onload", D);
                var r = !1;
                try {
                    r = e.frameElement == null && o.documentElement
                } catch (i) {
                }
                r && r.doScroll && function s() {
                    if (!w.isReady) {
                        try {
                            r.doScroll("left")
                        } catch (e) {
                            return setTimeout(s, 50)
                        }
                        P(), w.ready()
                    }
                }()
            }
        }
        return n.promise(t)
    }, w.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        l["[object " + t + "]"] = t.toLowerCase()
    }), r = w(o), function (e, t) {
        function ot(e, t, n, i) {
            var s, o, u, a, f, l, p, m, g, w;
            (t ? t.ownerDocument || t : E) !== h && c(t), t = t || h, n = n || [];
            if (!e || typeof e != "string")return n;
            if ((a = t.nodeType) !== 1 && a !== 9)return[];
            if (d && !i) {
                if (s = Z.exec(e))if (u = s[1]) {
                    if (a === 9) {
                        o = t.getElementById(u);
                        if (!o || !o.parentNode)return n;
                        if (o.id === u)return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(u)) && y(t, o) && o.id === u)return n.push(o), n
                } else {
                    if (s[2])return H.apply(n, t.getElementsByTagName(e)), n;
                    if ((u = s[3]) && r.getElementsByClassName && t.getElementsByClassName)return H.apply(n, t.getElementsByClassName(u)), n
                }
                if (r.qsa && (!v || !v.test(e))) {
                    m = p = b, g = t, w = a === 9 && e;
                    if (a === 1 && t.nodeName.toLowerCase() !== "object") {
                        l = mt(e), (p = t.getAttribute("id")) ? m = p.replace(nt, "\\$&") : t.setAttribute("id", m), m = "[id='" + m + "'] ", f = l.length;
                        while (f--)l[f] = m + gt(l[f]);
                        g = $.test(e) && t.parentNode || t, w = l.join(",")
                    }
                    if (w)try {
                        return H.apply(n, g.querySelectorAll(w)), n
                    } catch (S) {
                    } finally {
                        p || t.removeAttribute("id")
                    }
                }
            }
            return Nt(e.replace(W, "$1"), t, n, i)
        }

        function ut() {
            function t(n, r) {
                return e.push(n += " ") > s.cacheLength && delete t[e.shift()], t[n] = r
            }

            var e = [];
            return t
        }

        function at(e) {
            return e[b] = !0, e
        }

        function ft(e) {
            var t = h.createElement("div");
            try {
                return!!e(t)
            } catch (n) {
                return!1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function lt(e, t) {
            var n = e.split("|"), r = e.length;
            while (r--)s.attrHandle[n[r]] = t
        }

        function ct(e, t) {
            var n = t && e, r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || O) - (~e.sourceIndex || O);
            if (r)return r;
            if (n)while (n = n.nextSibling)if (n === t)return-1;
            return e ? 1 : -1
        }

        function ht(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e
            }
        }

        function pt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return(n === "input" || n === "button") && t.type === e
            }
        }

        function dt(e) {
            return at(function (t) {
                return t = +t, at(function (n, r) {
                    var i, s = e([], n.length, t), o = s.length;
                    while (o--)n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function vt() {
        }

        function mt(e, t) {
            var n, r, i, o, u, a, f, l = N[e + " "];
            if (l)return t ? 0 : l.slice(0);
            u = e, a = [], f = s.preFilter;
            while (u) {
                if (!n || (r = X.exec(u)))r && (u = u.slice(r[0].length) || u), a.push(i = []);
                n = !1;
                if (r = V.exec(u))n = r.shift(), i.push({value: n, type: r[0].replace(W, " ")}), u = u.slice(n.length);
                for (o in s.filter)(r = G[o].exec(u)) && (!f[o] || (r = f[o](r))) && (n = r.shift(), i.push({value: n, type: o, matches: r}), u = u.slice(n.length));
                if (!n)break
            }
            return t ? u.length : u ? ot.error(e) : N(e, a).slice(0)
        }

        function gt(e) {
            var t = 0, n = e.length, r = "";
            for (; t < n; t++)r += e[t].value;
            return r
        }

        function yt(e, t, n) {
            var r = t.dir, s = n && r === "parentNode", o = x++;
            return t.first ? function (t, n, i) {
                while (t = t[r])if (t.nodeType === 1 || s)return e(t, n, i)
            } : function (t, n, u) {
                var a, f, l, c = S + " " + o;
                if (u) {
                    while (t = t[r])if (t.nodeType === 1 || s)if (e(t, n, u))return!0
                } else while (t = t[r])if (t.nodeType === 1 || s) {
                    l = t[b] || (t[b] = {});
                    if ((f = l[r]) && f[0] === c) {
                        if ((a = f[1]) === !0 || a === i)return a === !0
                    } else {
                        f = l[r] = [c], f[1] = e(t, n, u) || i;
                        if (f[1] === !0)return!0
                    }
                }
            }
        }

        function bt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--)if (!e[i](t, n, r))return!1;
                return!0
            } : e[0]
        }

        function wt(e, t, n, r, i) {
            var s, o = [], u = 0, a = e.length, f = t != null;
            for (; u < a; u++)if (s = e[u])if (!n || n(s, r, i))o.push(s), f && t.push(u);
            return o
        }

        function Et(e, t, n, r, i, s) {
            return r && !r[b] && (r = Et(r)), i && !i[b] && (i = Et(i, s)), at(function (s, o, u, a) {
                var f, l, c, h = [], p = [], d = o.length, v = s || Tt(t || "*", u.nodeType ? [u] : u, []), m = e && (s || !t) ? wt(v, h, e, u, a) : v, g = n ? i || (s ? e : d || r) ? [] : o : m;
                n && n(m, g, u, a);
                if (r) {
                    f = wt(g, p), r(f, [], u, a), l = f.length;
                    while (l--)if (c = f[l])g[p[l]] = !(m[p[l]] = c)
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? j.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = wt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : H.apply(o, g)
            })
        }

        function St(e) {
            var t, n, r, i = e.length, o = s.relative[e[0].type], u = o || s.relative[" "], a = o ? 1 : 0, l = yt(function (e) {
                return e === t
            }, u, !0), c = yt(function (e) {
                return j.call(t, e) > -1
            }, u, !0), h = [function (e, n, r) {
                return!o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r))
            }];
            for (; a < i; a++)if (n = s.relative[e[a].type])h = [yt(bt(h), n)]; else {
                n = s.filter[e[a].type].apply(null, e[a].matches);
                if (n[b]) {
                    r = ++a;
                    for (; r < i; r++)if (s.relative[e[r].type])break;
                    return Et(a > 1 && bt(h), a > 1 && gt(e.slice(0, a - 1).concat({value: e[a - 2].type === " " ? "*" : ""})).replace(W, "$1"), n, a < r && St(e.slice(a, r)), r < i && St(e = e.slice(r)), r < i && gt(e))
                }
                h.push(n)
            }
            return bt(h)
        }

        function xt(e, t) {
            var n = 0, r = t.length > 0, o = e.length > 0, u = function (u, a, l, c, p) {
                var d, v, m, g = [], y = 0, b = "0", w = u && [], E = p != null, x = f, T = u || o && s.find.TAG("*", p && a.parentNode || a), N = S += x == null ? 1 : Math.random() || .1;
                E && (f = a !== h && a, i = n);
                for (; (d = T[b]) != null; b++) {
                    if (o && d) {
                        v = 0;
                        while (m = e[v++])if (m(d, a, l)) {
                            c.push(d);
                            break
                        }
                        E && (S = N, i = ++n)
                    }
                    r && ((d = !m && d) && y--, u && w.push(d))
                }
                y += b;
                if (r && b !== y) {
                    v = 0;
                    while (m = t[v++])m(w, g, a, l);
                    if (u) {
                        if (y > 0)while (b--)!w[b] && !g[b] && (g[b] = D.call(c));
                        g = wt(g)
                    }
                    H.apply(c, g), E && !u && g.length > 0 && y + t.length > 1 && ot.uniqueSort(c)
                }
                return E && (S = N, f = x), w
            };
            return r ? at(u) : u
        }

        function Tt(e, t, n) {
            var r = 0, i = t.length;
            for (; r < i; r++)ot(e, t[r], n);
            return n
        }

        function Nt(e, t, n, i) {
            var o, u, f, l, c, h = mt(e);
            if (!i && h.length === 1) {
                u = h[0] = h[0].slice(0);
                if (u.length > 2 && (f = u[0]).type === "ID" && r.getById && t.nodeType === 9 && d && s.relative[u[1].type]) {
                    t = (s.find.ID(f.matches[0].replace(rt, it), t) || [])[0];
                    if (!t)return n;
                    e = e.slice(u.shift().value.length)
                }
                o = G.needsContext.test(e) ? 0 : u.length;
                while (o--) {
                    f = u[o];
                    if (s.relative[l = f.type])break;
                    if (c = s.find[l])if (i = c(f.matches[0].replace(rt, it), $.test(u[0].type) && t.parentNode || t)) {
                        u.splice(o, 1), e = i.length && gt(u);
                        if (!e)return H.apply(n, i), n;
                        break
                    }
                }
            }
            return a(e, h)(i, t, !d, n, $.test(e)), n
        }

        var n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b = "sizzle" + -(new Date), E = e.document, S = 0, x = 0, T = ut(), N = ut(), C = ut(), k = !1, L = function (e, t) {
            return e === t ? (k = !0, 0) : 0
        }, A = typeof t, O = 1 << 31, M = {}.hasOwnProperty, _ = [], D = _.pop, P = _.push, H = _.push, B = _.slice, j = _.indexOf || function (e) {
            var t = 0, n = this.length;
            for (; t < n; t++)if (this[t] === e)return t;
            return-1
        }, F = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", I = "[\\x20\\t\\r\\n\\f]", q = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", R = q.replace("w", "w#"), U = "\\[" + I + "*(" + q + ")" + I + "*(?:([*^$|!~]?=)" + I + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + R + ")|)|)" + I + "*\\]", z = ":(" + q + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + U.replace(3, 8) + ")*)|.*)\\)|)", W = new RegExp("^" + I + "+|((?:^|[^\\\\])(?:\\\\.)*)" + I + "+$", "g"), X = new RegExp("^" + I + "*," + I + "*"), V = new RegExp("^" + I + "*([>+~]|" + I + ")" + I + "*"), $ = new RegExp(I + "*[+~]"), J = new RegExp("=" + I + "*([^\\]'\"]*)" + I + "*\\]", "g"), K = new RegExp(z), Q = new RegExp("^" + R + "$"), G = {ID: new RegExp("^#(" + q + ")"), CLASS: new RegExp("^\\.(" + q + ")"), TAG: new RegExp("^(" + q.replace("w", "w*") + ")"), ATTR: new RegExp("^" + U), PSEUDO: new RegExp("^" + z), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + I + "*(even|odd|(([+-]|)(\\d*)n|)" + I + "*(?:([+-]|)" + I + "*(\\d+)|))" + I + "*\\)|)", "i"), bool: new RegExp("^(?:" + F + ")$", "i"), needsContext: new RegExp("^" + I + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + I + "*((?:-\\d)?\\d*)" + I + "*\\)|)(?=[^-]|$)", "i")}, Y = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /^(?:input|select|textarea|button)$/i, tt = /^h\d$/i, nt = /'|\\/g, rt = new RegExp("\\\\([\\da-f]{1,6}" + I + "?|(" + I + ")|.)", "ig"), it = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r !== r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, r & 1023 | 56320)
        };
        try {
            H.apply(_ = B.call(E.childNodes), E.childNodes), _[E.childNodes.length].nodeType
        } catch (st) {
            H = {apply: _.length ? function (e, t) {
                P.apply(e, B.call(t))
            } : function (e, t) {
                var n = e.length, r = 0;
                while (e[n++] = t[r++]);
                e.length = n - 1
            }}
        }
        u = ot.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? t.nodeName !== "HTML" : !1
        }, r = ot.support = {}, c = ot.setDocument = function (e) {
            var t = e ? e.ownerDocument || e : E, n = t.defaultView;
            if (t === h || t.nodeType !== 9 || !t.documentElement)return h;
            h = t, p = t.documentElement, d = !u(t), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function () {
                c()
            }), r.attributes = ft(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), r.getElementsByTagName = ft(function (e) {
                return e.appendChild(t.createComment("")), !e.getElementsByTagName("*").length
            }), r.getElementsByClassName = ft(function (e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", e.getElementsByClassName("i").length === 2
            }), r.getById = ft(function (e) {
                return p.appendChild(e).id = b, !t.getElementsByName || !t.getElementsByName(b).length
            }), r.getById ? (s.find.ID = function (e, t) {
                if (typeof t.getElementById !== A && d) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, s.filter.ID = function (e) {
                var t = e.replace(rt, it);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete s.find.ID, s.filter.ID = function (e) {
                var t = e.replace(rt, it);
                return function (e) {
                    var n = typeof e.getAttributeNode !== A && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), s.find.TAG = r.getElementsByTagName ? function (e, t) {
                if (typeof t.getElementsByTagName !== A)return t.getElementsByTagName(e)
            } : function (e, t) {
                var n, r = [], i = 0, s = t.getElementsByTagName(e);
                if (e === "*") {
                    while (n = s[i++])n.nodeType === 1 && r.push(n);
                    return r
                }
                return s
            }, s.find.CLASS = r.getElementsByClassName && function (e, t) {
                if (typeof t.getElementsByClassName !== A && d)return t.getElementsByClassName(e)
            }, m = [], v = [];
            if (r.qsa = Y.test(t.querySelectorAll))ft(function (e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || v.push("\\[" + I + "*(?:value|" + F + ")"), e.querySelectorAll(":checked").length || v.push(":checked")
            }), ft(function (e) {
                var n = t.createElement("input");
                n.setAttribute("type", "hidden"), e.appendChild(n).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && v.push("[*^$]=" + I + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || v.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), v.push(",.*:")
            });
            return(r.matchesSelector = Y.test(g = p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)) && ft(function (e) {
                r.disconnectedMatch = g.call(e, "div"), g.call(e, "[s!='']:x"), m.push("!=", z)
            }), v = v.length && new RegExp(v.join("|")), m = m.length && new RegExp(m.join("|")), y = Y.test(p.contains) || p.compareDocumentPosition ? function (e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !!r && r.nodeType === 1 && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && e.compareDocumentPosition(r) & 16)
            } : function (e, t) {
                if (t)while (t = t.parentNode)if (t === e)return!0;
                return!1
            }, L = p.compareDocumentPosition ? function (e, n) {
                if (e === n)return k = !0, 0;
                var i = n.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(n);
                if (i)return i & 1 || !r.sortDetached && n.compareDocumentPosition(e) === i ? e === t || y(E, e) ? -1 : n === t || y(E, n) ? 1 : l ? j.call(l, e) - j.call(l, n) : 0 : i & 4 ? -1 : 1;
                return e.compareDocumentPosition ? -1 : 1
            } : function (e, n) {
                var r, i = 0, s = e.parentNode, o = n.parentNode, u = [e], a = [n];
                if (e === n)return k = !0, 0;
                if (!s || !o)return e === t ? -1 : n === t ? 1 : s ? -1 : o ? 1 : l ? j.call(l, e) - j.call(l, n) : 0;
                if (s === o)return ct(e, n);
                r = e;
                while (r = r.parentNode)u.unshift(r);
                r = n;
                while (r = r.parentNode)a.unshift(r);
                while (u[i] === a[i])i++;
                return i ? ct(u[i], a[i]) : u[i] === E ? -1 : a[i] === E ? 1 : 0
            }, t
        }, ot.matches = function (e, t) {
            return ot(e, null, null, t)
        }, ot.matchesSelector = function (e, t) {
            (e.ownerDocument || e) !== h && c(e), t = t.replace(J, "='$1']");
            if (r.matchesSelector && d && (!m || !m.test(t)) && (!v || !v.test(t)))try {
                var n = g.call(e, t);
                if (n || r.disconnectedMatch || e.document && e.document.nodeType !== 11)return n
            } catch (i) {
            }
            return ot(t, h, null, [e]).length > 0
        }, ot.contains = function (e, t) {
            return(e.ownerDocument || e) !== h && c(e), y(e, t)
        }, ot.attr = function (e, n) {
            (e.ownerDocument || e) !== h && c(e);
            var i = s.attrHandle[n.toLowerCase()], o = i && M.call(s.attrHandle, n.toLowerCase()) ? i(e, n, !d) : t;
            return o === t ? r.attributes || !d ? e.getAttribute(n) : (o = e.getAttributeNode(n)) && o.specified ? o.value : null : o
        }, ot.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, ot.uniqueSort = function (e) {
            var t, n = [], i = 0, s = 0;
            k = !r.detectDuplicates, l = !r.sortStable && e.slice(0), e.sort(L);
            if (k) {
                while (t = e[s++])t === e[s] && (i = n.push(s));
                while (i--)e.splice(n[i], 1)
            }
            return e
        }, o = ot.getText = function (e) {
            var t, n = "", r = 0, i = e.nodeType;
            if (!i)for (; t = e[r]; r++)n += o(t); else if (i === 1 || i === 9 || i === 11) {
                if (typeof e.textContent == "string")return e.textContent;
                for (e = e.firstChild; e; e = e.nextSibling)n += o(e)
            } else if (i === 3 || i === 4)return e.nodeValue;
            return n
        }, s = ot.selectors = {cacheLength: 50, createPseudo: at, match: G, attrHandle: {}, find: {}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (e) {
            return e[1] = e[1].replace(rt, it), e[3] = (e[4] || e[5] || "").replace(rt, it), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
        }, CHILD: function (e) {
            return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === "nth" ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && ot.error(e[0]), e
        }, PSEUDO: function (e) {
            var n, r = !e[5] && e[2];
            return G.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && K.test(r) && (n = mt(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
        }}, filter: {TAG: function (e) {
            var t = e.replace(rt, it).toLowerCase();
            return e === "*" ? function () {
                return!0
            } : function (e) {
                return e.nodeName && e.nodeName.toLowerCase() === t
            }
        }, CLASS: function (e) {
            var t = T[e + " "];
            return t || (t = new RegExp("(^|" + I + ")" + e + "(" + I + "|$)")) && T(e, function (e) {
                return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute !== A && e.getAttribute("class") || "")
            })
        }, ATTR: function (e, t, n) {
            return function (r) {
                var i = ot.attr(r, e);
                return i == null ? t === "!=" : t ? (i += "", t === "=" ? i === n : t === "!=" ? i !== n : t === "^=" ? n && i.indexOf(n) === 0 : t === "*=" ? n && i.indexOf(n) > -1 : t === "$=" ? n && i.slice(-n.length) === n : t === "~=" ? (" " + i + " ").indexOf(n) > -1 : t === "|=" ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
            }
        }, CHILD: function (e, t, n, r, i) {
            var s = e.slice(0, 3) !== "nth", o = e.slice(-4) !== "last", u = t === "of-type";
            return r === 1 && i === 0 ? function (e) {
                return!!e.parentNode
            } : function (t, n, a) {
                var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling", m = t.parentNode, g = u && t.nodeName.toLowerCase(), y = !a && !u;
                if (m) {
                    if (s) {
                        while (v) {
                            c = t;
                            while (c = c[v])if (u ? c.nodeName.toLowerCase() === g : c.nodeType === 1)return!1;
                            d = v = e === "only" && !d && "nextSibling"
                        }
                        return!0
                    }
                    d = [o ? m.firstChild : m.lastChild];
                    if (o && y) {
                        l = m[b] || (m[b] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                        while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if (c.nodeType === 1 && ++h && c === t) {
                            l[e] = [S, p, h];
                            break
                        }
                    } else if (y && (f = (t[b] || (t[b] = {}))[e]) && f[0] === S)h = f[1]; else while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if ((u ? c.nodeName.toLowerCase() === g : c.nodeType === 1) && ++h) {
                        y && ((c[b] || (c[b] = {}))[e] = [S, h]);
                        if (c === t)break
                    }
                    return h -= i, h === r || h % r === 0 && h / r >= 0
                }
            }
        }, PSEUDO: function (e, t) {
            var n, r = s.pseudos[e] || s.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
            return r[b] ? r(t) : r.length > 1 ? (n = [e, e, "", t], s.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function (e, n) {
                var i, s = r(e, t), o = s.length;
                while (o--)i = j.call(e, s[o]), e[i] = !(n[i] = s[o])
            }) : function (e) {
                return r(e, 0, n)
            }) : r
        }}, pseudos: {not: at(function (e) {
            var t = [], n = [], r = a(e.replace(W, "$1"));
            return r[b] ? at(function (e, t, n, i) {
                var s, o = r(e, null, i, []), u = e.length;
                while (u--)if (s = o[u])e[u] = !(t[u] = s)
            }) : function (e, i, s) {
                return t[0] = e, r(t, null, s, n), !n.pop()
            }
        }), has: at(function (e) {
            return function (t) {
                return ot(e, t).length > 0
            }
        }), contains: at(function (e) {
            return function (t) {
                return(t.textContent || t.innerText || o(t)).indexOf(e) > -1
            }
        }), lang: at(function (e) {
            return Q.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(rt, it).toLowerCase(), function (t) {
                var n;
                do if (n = d ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || n.indexOf(e + "-") === 0; while ((t = t.parentNode) && t.nodeType === 1);
                return!1
            }
        }), target: function (t) {
            var n = e.location && e.location.hash;
            return n && n.slice(1) === t.id
        }, root: function (e) {
            return e === p
        }, focus: function (e) {
            return e === h.activeElement && (!h.hasFocus || h.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        }, enabled: function (e) {
            return e.disabled === !1
        }, disabled: function (e) {
            return e.disabled === !0
        }, checked: function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && !!e.checked || t === "option" && !!e.selected
        }, selected: function (e) {
            return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        }, empty: function (e) {
            for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeName > "@" || e.nodeType === 3 || e.nodeType === 4)return!1;
            return!0
        }, parent: function (e) {
            return!s.pseudos.empty(e)
        }, header: function (e) {
            return tt.test(e.nodeName)
        }, input: function (e) {
            return et.test(e.nodeName)
        }, button: function (e) {
            var t = e.nodeName.toLowerCase();
            return t === "input" && e.type === "button" || t === "button"
        }, text: function (e) {
            var t;
            return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === e.type)
        }, first: dt(function () {
            return[0]
        }), last: dt(function (e, t) {
            return[t - 1]
        }), eq: dt(function (e, t, n) {
            return[n < 0 ? n + t : n]
        }), even: dt(function (e, t) {
            var n = 0;
            for (; n < t; n += 2)e.push(n);
            return e
        }), odd: dt(function (e, t) {
            var n = 1;
            for (; n < t; n += 2)e.push(n);
            return e
        }), lt: dt(function (e, t, n) {
            var r = n < 0 ? n + t : n;
            for (; --r >= 0;)e.push(r);
            return e
        }), gt: dt(function (e, t, n) {
            var r = n < 0 ? n + t : n;
            for (; ++r < t;)e.push(r);
            return e
        })}}, s.pseudos.nth = s.pseudos.eq;
        for (n in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})s.pseudos[n] = ht(n);
        for (n in{submit: !0, reset: !0})s.pseudos[n] = pt(n);
        vt.prototype = s.filters = s.pseudos, s.setFilters = new vt, a = ot.compile = function (e, t) {
            var n, r = [], i = [], s = C[e + " "];
            if (!s) {
                t || (t = mt(e)), n = t.length;
                while (n--)s = St(t[n]), s[b] ? r.push(s) : i.push(s);
                s = C(e, xt(i, r))
            }
            return s
        }, r.sortStable = b.split("").sort(L).join("") === b, r.detectDuplicates = k, c(), r.sortDetached = ft(function (e) {
            return e.compareDocumentPosition(h.createElement("div")) & 1
        }), ft(function (e) {
            return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute("href") === "#"
        }) || lt("type|href|height|width", function (e, t, n) {
            if (!n)return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2)
        }), (!r.attributes || !ft(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), e.firstChild.getAttribute("value") === ""
        })) && lt("value", function (e, t, n) {
            if (!n && e.nodeName.toLowerCase() === "input")return e.defaultValue
        }), ft(function (e) {
            return e.getAttribute("disabled") == null
        }) || lt(F, function (e, t, n) {
            var r;
            if (!n)return(r = e.getAttributeNode(t)) && r.specified ? r.value : e[t] === !0 ? t.toLowerCase() : null
        }), w.find = ot, w.expr = ot.selectors, w.expr[":"] = w.expr.pseudos, w.unique = ot.uniqueSort, w.text = ot.getText, w.isXMLDoc = ot.isXML, w.contains = ot.contains
    }(e);
    var B = {};
    w.Callbacks = function (e) {
        e = typeof e == "string" ? B[e] || j(e) : w.extend({}, e);
        var n, r, i, s, o, u, a = [], f = !e.once && [], l = function (t) {
            r = e.memory && t, i = !0, o = u || 0, u = 0, s = a.length, n = !0;
            for (; a && o < s; o++)if (a[o].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                r = !1;
                break
            }
            n = !1, a && (f ? f.length && l(f.shift()) : r ? a = [] : c.disable())
        }, c = {add: function () {
            if (a) {
                var t = a.length;
                (function i(t) {
                    w.each(t, function (t, n) {
                        var r = w.type(n);
                        r === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && r !== "string" && i(n)
                    })
                })(arguments), n ? s = a.length : r && (u = t, l(r))
            }
            return this
        }, remove: function () {
            return a && w.each(arguments, function (e, t) {
                var r;
                while ((r = w.inArray(t, a, r)) > -1)a.splice(r, 1), n && (r <= s && s--, r <= o && o--)
            }), this
        }, has: function (e) {
            return e ? w.inArray(e, a) > -1 : !!a && !!a.length
        }, empty: function () {
            return a = [], s = 0, this
        }, disable: function () {
            return a = f = r = t, this
        }, disabled: function () {
            return!a
        }, lock: function () {
            return f = t, r || c.disable(), this
        }, locked: function () {
            return!f
        }, fireWith: function (e, t) {
            return a && (!i || f) && (t = t || [], t = [e, t.slice ? t.slice() : t], n ? f.push(t) : l(t)), this
        }, fire: function () {
            return c.fireWith(this, arguments), this
        }, fired: function () {
            return!!i
        }};
        return c
    }, w.extend({Deferred: function (e) {
        var t = [
            ["resolve", "done", w.Callbacks("once memory"), "resolved"],
            ["reject", "fail", w.Callbacks("once memory"), "rejected"],
            ["notify", "progress", w.Callbacks("memory")]
        ], n = "pending", r = {state: function () {
            return n
        }, always: function () {
            return i.done(arguments).fail(arguments), this
        }, then: function () {
            var e = arguments;
            return w.Deferred(function (n) {
                w.each(t, function (t, s) {
                    var o = s[0], u = w.isFunction(e[t]) && e[t];
                    i[s[1]](function () {
                        var e = u && u.apply(this, arguments);
                        e && w.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o + "With"](this === r ? n.promise() : this, u ? [e] : arguments)
                    })
                }), e = null
            }).promise()
        }, promise: function (e) {
            return e != null ? w.extend(e, r) : r
        }}, i = {};
        return r.pipe = r.then, w.each(t, function (e, s) {
            var o = s[2], u = s[3];
            r[s[1]] = o.add, u && o.add(function () {
                n = u
            }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = function () {
                return i[s[0] + "With"](this === i ? r : this, arguments), this
            }, i[s[0] + "With"] = o.fireWith
        }), r.promise(i), e && e.call(i, i), i
    }, when: function (e) {
        var t = 0, n = v.call(arguments), r = n.length, i = r !== 1 || e && w.isFunction(e.promise) ? r : 0, s = i === 1 ? e : w.Deferred(), o = function (e, t, n) {
            return function (r) {
                t[e] = this, n[e] = arguments.length > 1 ? v.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
            }
        }, u, a, f;
        if (r > 1) {
            u = new Array(r), a = new Array(r), f = new Array(r);
            for (; t < r; t++)n[t] && w.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
        }
        return i || s.resolveWith(f, n), s.promise()
    }}), w.support = function (t) {
        var n, r, s, u, a, f, l, c, h, p = o.createElement("div");
        p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*") || [], r = p.getElementsByTagName("a")[0];
        if (!r || !r.style || !n.length)return t;
        u = o.createElement("select"), f = u.appendChild(o.createElement("option")), s = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = p.className !== "t", t.leadingWhitespace = p.firstChild.nodeType === 3, t.tbody = !p.getElementsByTagName("tbody").length, t.htmlSerialize = !!p.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = r.getAttribute("href") === "/a", t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !!r.style.cssFloat, t.checkOn = !!s.value, t.optSelected = f.selected, t.enctype = !!o.createElement("form").enctype, t.html5Clone = o.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, s.checked = !0, t.noCloneChecked = s.cloneNode(!0).checked, u.disabled = !0, t.optDisabled = !f.disabled;
        try {
            delete p.test
        } catch (d) {
            t.deleteExpando = !1
        }
        s = o.createElement("input"), s.setAttribute("value", ""), t.input = s.getAttribute("value") === "", s.value = "t", s.setAttribute("type", "radio"), t.radioValue = s.value === "t", s.setAttribute("checked", "t"), s.setAttribute("name", "t"), a = o.createDocumentFragment(), a.appendChild(s), t.appendChecked = s.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, p.attachEvent && (p.attachEvent("onclick", function () {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).click());
        for (h in{submit: !0, change: !0, focusin: !0})p.setAttribute(l = "on" + h, "t"), t[h + "Bubbles"] = l in e || p.attributes[l].expando === !1;
        p.style.backgroundClip = "content-box", p.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = p.style.backgroundClip === "content-box";
        for (h in w(t))break;
        return t.ownLast = h !== "0", w(function () {
            var n, r, s, u = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;", a = o.getElementsByTagName("body")[0];
            if (!a)return;
            n = o.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(p), p.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = p.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, p.innerHTML = "", p.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", w.swap(a, a.style.zoom != null ? {zoom: 1} : {}, function () {
                t.boxSizing = p.offsetWidth === 4
            }), e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(p, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(p, null) || {width: "4px"}).width === "4px", r = p.appendChild(o.createElement("div")), r.style.cssText = p.style.cssText = u, r.style.marginRight = r.style.width = "0", p.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof p.style.zoom !== i && (p.innerHTML = "", p.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = p.offsetWidth === 3, p.style.display = "block", p.innerHTML = "<div></div>", p.firstChild.style.width = "5px", t.shrinkWrapBlocks = p.offsetWidth !== 3, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = p = s = r = null
        }), n = u = a = f = r = s = null, t
    }({});
    var F = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, I = /([A-Z])/g;
    w.extend({cache: {}, noData: {applet: !0, embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}, hasData: function (e) {
        return e = e.nodeType ? w.cache[e[w.expando]] : e[w.expando], !!e && !z(e)
    }, data: function (e, t, n) {
        return q(e, t, n)
    }, removeData: function (e, t) {
        return R(e, t)
    }, _data: function (e, t, n) {
        return q(e, t, n, !0)
    }, _removeData: function (e, t) {
        return R(e, t, !0)
    }, acceptData: function (e) {
        if (e.nodeType && e.nodeType !== 1 && e.nodeType !== 9)return!1;
        var t = e.nodeName && w.noData[e.nodeName.toLowerCase()];
        return!t || t !== !0 && e.getAttribute("classid") === t
    }}), w.fn.extend({data: function (e, n) {
        var r, i, s = null, o = 0, u = this[0];
        if (e === t) {
            if (this.length) {
                s = w.data(u);
                if (u.nodeType === 1 && !w._data(u, "parsedAttrs")) {
                    r = u.attributes;
                    for (; o < r.length; o++)i = r[o].name, i.indexOf("data-") === 0 && (i = w.camelCase(i.slice(5)), U(u, i, s[i]));
                    w._data(u, "parsedAttrs", !0)
                }
            }
            return s
        }
        return typeof e == "object" ? this.each(function () {
            w.data(this, e)
        }) : arguments.length > 1 ? this.each(function () {
            w.data(this, e, n)
        }) : u ? U(u, e, w.data(u, e)) : null
    }, removeData: function (e) {
        return this.each(function () {
            w.removeData(this, e)
        })
    }}), w.extend({queue: function (e, t, n) {
        var r;
        if (e)return t = (t || "fx") + "queue", r = w._data(e, t), n && (!r || w.isArray(n) ? r = w._data(e, t, w.makeArray(n)) : r.push(n)), r || []
    }, dequeue: function (e, t) {
        t = t || "fx";
        var n = w.queue(e, t), r = n.length, i = n.shift(), s = w._queueHooks(e, t), o = function () {
            w.dequeue(e, t)
        };
        i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
    }, _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return w._data(e, n) || w._data(e, n, {empty: w.Callbacks("once memory").add(function () {
            w._removeData(e, t + "queue"), w._removeData(e, n)
        })})
    }}), w.fn.extend({queue: function (e, n) {
        var r = 2;
        return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? w.queue(this[0], e) : n === t ? this : this.each(function () {
            var t = w.queue(this, e, n);
            w._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && w.dequeue(this, e)
        })
    }, dequeue: function (e) {
        return this.each(function () {
            w.dequeue(this, e)
        })
    }, delay: function (e, t) {
        return e = w.fx ? w.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, clearQueue: function (e) {
        return this.queue(e || "fx", [])
    }, promise: function (e, n) {
        var r, i = 1, s = w.Deferred(), o = this, u = this.length, a = function () {
            --i || s.resolveWith(o, [o])
        };
        typeof e != "string" && (n = e, e = t), e = e || "fx";
        while (u--)r = w._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
        return a(), s.promise(n)
    }});
    var W, X, V = /[\t\r\n\f]/g, $ = /\r/g, J = /^(?:input|select|textarea|button|object)$/i, K = /^(?:a|area)$/i, Q = /^(?:checked|selected)$/i, G = w.support.getSetAttribute, Y = w.support.input;
    w.fn.extend({attr: function (e, t) {
        return w.access(this, w.attr, e, t, arguments.length > 1)
    }, removeAttr: function (e) {
        return this.each(function () {
            w.removeAttr(this, e)
        })
    }, prop: function (e, t) {
        return w.access(this, w.prop, e, t, arguments.length > 1)
    }, removeProp: function (e) {
        return e = w.propFix[e] || e, this.each(function () {
            try {
                this[e] = t, delete this[e]
            } catch (n) {
            }
        })
    }, addClass: function (e) {
        var t, n, r, i, s, o = 0, u = this.length, a = typeof e == "string" && e;
        if (w.isFunction(e))return this.each(function (t) {
            w(this).addClass(e.call(this, t, this.className))
        });
        if (a) {
            t = (e || "").match(S) || [];
            for (; o < u; o++) {
                n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(V, " ") : " ");
                if (r) {
                    s = 0;
                    while (i = t[s++])r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                    n.className = w.trim(r)
                }
            }
        }
        return this
    }, removeClass: function (e) {
        var t, n, r, i, s, o = 0, u = this.length, a = arguments.length === 0 || typeof e == "string" && e;
        if (w.isFunction(e))return this.each(function (t) {
            w(this).removeClass(e.call(this, t, this.className))
        });
        if (a) {
            t = (e || "").match(S) || [];
            for (; o < u; o++) {
                n = this[o], r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(V, " ") : "");
                if (r) {
                    s = 0;
                    while (i = t[s++])while (r.indexOf(" " + i + " ") >= 0)r = r.replace(" " + i + " ", " ");
                    n.className = e ? w.trim(r) : ""
                }
            }
        }
        return this
    }, toggleClass: function (e, t) {
        var n = typeof e;
        return typeof t == "boolean" && n === "string" ? t ? this.addClass(e) : this.removeClass(e) : w.isFunction(e) ? this.each(function (n) {
            w(this).toggleClass(e.call(this, n, this.className, t), t)
        }) : this.each(function () {
            if (n === "string") {
                var t, r = 0, s = w(this), o = e.match(S) || [];
                while (t = o[r++])s.hasClass(t) ? s.removeClass(t) : s.addClass(t)
            } else if (n === i || n === "boolean")this.className && w._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : w._data(this, "__className__") || ""
        })
    }, hasClass: function (e) {
        var t = " " + e + " ", n = 0, r = this.length;
        for (; n < r; n++)if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(V, " ").indexOf(t) >= 0)return!0;
        return!1
    }, val: function (e) {
        var n, r, i, s = this[0];
        if (!arguments.length) {
            if (s)return r = w.valHooks[s.type] || w.valHooks[s.nodeName.toLowerCase()], r && "get"in r && (n = r.get(s, "value")) !== t ? n : (n = s.value, typeof n == "string" ? n.replace($, "") : n == null ? "" : n);
            return
        }
        return i = w.isFunction(e), this.each(function (n) {
            var s;
            if (this.nodeType !== 1)return;
            i ? s = e.call(this, n, w(this).val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : w.isArray(s) && (s = w.map(s, function (e) {
                return e == null ? "" : e + ""
            })), r = w.valHooks[this.type] || w.valHooks[this.nodeName.toLowerCase()];
            if (!r || !("set"in r) || r.set(this, s, "value") === t)this.value = s
        })
    }}), w.extend({valHooks: {option: {get: function (e) {
        var t = w.find.attr(e, "value");
        return t != null ? t : e.text
    }}, select: {get: function (e) {
        var t, n, r = e.options, i = e.selectedIndex, s = e.type === "select-one" || i < 0, o = s ? null : [], u = s ? i + 1 : r.length, a = i < 0 ? u : s ? i : 0;
        for (; a < u; a++) {
            n = r[a];
            if ((n.selected || a === i) && (w.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !w.nodeName(n.parentNode, "optgroup"))) {
                t = w(n).val();
                if (s)return t;
                o.push(t)
            }
        }
        return o
    }, set: function (e, t) {
        var n, r, i = e.options, s = w.makeArray(t), o = i.length;
        while (o--) {
            r = i[o];
            if (r.selected = w.inArray(w(r).val(), s) >= 0)n = !0
        }
        return n || (e.selectedIndex = -1), s
    }}}, attr: function (e, n, r) {
        var s, o, u = e.nodeType;
        if (!e || u === 3 || u === 8 || u === 2)return;
        if (typeof e.getAttribute === i)return w.prop(e, n, r);
        if (u !== 1 || !w.isXMLDoc(e))n = n.toLowerCase(), s = w.attrHooks[n] || (w.expr.match.bool.test(n) ? X : W);
        if (r === t)return s && "get"in s && (o = s.get(e, n)) !== null ? o : (o = w.find.attr(e, n), o == null ? t : o);
        if (r !== null)return s && "set"in s && (o = s.set(e, r, n)) !== t ? o : (e.setAttribute(n, r + ""), r);
        w.removeAttr(e, n)
    }, removeAttr: function (e, t) {
        var n, r, i = 0, s = t && t.match(S);
        if (s && e.nodeType === 1)while (n = s[i++])r = w.propFix[n] || n, w.expr.match.bool.test(n) ? Y && G || !Q.test(n) ? e[r] = !1 : e[w.camelCase("default-" + n)] = e[r] = !1 : w.attr(e, n, ""), e.removeAttribute(G ? n : r)
    }, attrHooks: {type: {set: function (e, t) {
        if (!w.support.radioValue && t === "radio" && w.nodeName(e, "input")) {
            var n = e.value;
            return e.setAttribute("type", t), n && (e.value = n), t
        }
    }}}, propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, n, r) {
        var i, s, o, u = e.nodeType;
        if (!e || u === 3 || u === 8 || u === 2)return;
        return o = u !== 1 || !w.isXMLDoc(e), o && (n = w.propFix[n] || n, s = w.propHooks[n]), r !== t ? s && "set"in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get"in s && (i = s.get(e, n)) !== null ? i : e[n]
    }, propHooks: {tabIndex: {get: function (e) {
        var t = w.find.attr(e, "tabindex");
        return t ? parseInt(t, 10) : J.test(e.nodeName) || K.test(e.nodeName) && e.href ? 0 : -1
    }}}}), X = {set: function (e, t, n) {
        return t === !1 ? w.removeAttr(e, n) : Y && G || !Q.test(n) ? e.setAttribute(!G && w.propFix[n] || n, n) : e[w.camelCase("default-" + n)] = e[n] = !0, n
    }}, w.each(w.expr.match.bool.source.match(/\w+/g), function (e, n) {
        var r = w.expr.attrHandle[n] || w.find.attr;
        w.expr.attrHandle[n] = Y && G || !Q.test(n) ? function (e, n, i) {
            var s = w.expr.attrHandle[n], o = i ? t : (w.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
            return w.expr.attrHandle[n] = s, o
        } : function (e, n, r) {
            return r ? t : e[w.camelCase("default-" + n)] ? n.toLowerCase() : null
        }
    });
    if (!Y || !G)w.attrHooks.value = {set: function (e, t, n) {
        if (!w.nodeName(e, "input"))return W && W.set(e, t, n);
        e.defaultValue = t
    }};
    G || (W = {set: function (e, n, r) {
        var i = e.getAttributeNode(r);
        return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", r === "value" || n === e.getAttribute(r) ? n : t
    }}, w.expr.attrHandle.id = w.expr.attrHandle.name = w.expr.attrHandle.coords = function (e, n, r) {
        var i;
        return r ? t : (i = e.getAttributeNode(n)) && i.value !== "" ? i.value : null
    }, w.valHooks.button = {get: function (e, n) {
        var r = e.getAttributeNode(n);
        return r && r.specified ? r.value : t
    }, set: W.set}, w.attrHooks.contenteditable = {set: function (e, t, n) {
        W.set(e, t === "" ? !1 : t, n)
    }}, w.each(["width", "height"], function (e, t) {
        w.attrHooks[t] = {set: function (e, n) {
            if (n === "")return e.setAttribute(t, "auto"), n
        }}
    })), w.support.hrefNormalized || w.each(["href", "src"], function (e, t) {
        w.propHooks[t] = {get: function (e) {
            return e.getAttribute(t, 4)
        }}
    }), w.support.style || (w.attrHooks.style = {get: function (e) {
        return e.style.cssText || t
    }, set: function (e, t) {
        return e.style.cssText = t + ""
    }}), w.support.optSelected || (w.propHooks.selected = {get: function (e) {
        var t = e.parentNode;
        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
    }}), w.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        w.propFix[this.toLowerCase()] = this
    }), w.support.enctype || (w.propFix.enctype = "encoding"), w.each(["radio", "checkbox"], function () {
        w.valHooks[this] = {set: function (e, t) {
            if (w.isArray(t))return e.checked = w.inArray(w(e).val(), t) >= 0
        }}, w.support.checkOn || (w.valHooks[this].get = function (e) {
            return e.getAttribute("value") === null ? "on" : e.value
        })
    });
    var Z = /^(?:input|select|textarea)$/i, et = /^key/, tt = /^(?:mouse|contextmenu)|click/, nt = /^(?:focusinfocus|focusoutblur)$/, rt = /^([^.]*)(?:\.(.+)|)$/;
    w.event = {global: {}, add: function (e, n, r, s, o) {
        var u, a, f, l, c, h, p, d, v, m, g, y = w._data(e);
        if (!y)return;
        r.handler && (l = r, r = l.handler, o = l.selector), r.guid || (r.guid = w.guid++), (a = y.events) || (a = y.events = {}), (h = y.handle) || (h = y.handle = function (e) {
            return typeof w === i || !!e && w.event.triggered === e.type ? t : w.event.dispatch.apply(h.elem, arguments)
        }, h.elem = e), n = (n || "").match(S) || [""], f = n.length;
        while (f--) {
            u = rt.exec(n[f]) || [], v = g = u[1], m = (u[2] || "").split(".").sort();
            if (!v)continue;
            c = w.event.special[v] || {}, v = (o ? c.delegateType : c.bindType) || v, c = w.event.special[v] || {}, p = w.extend({type: v, origType: g, data: s, handler: r, guid: r.guid, selector: o, needsContext: o && w.expr.match.needsContext.test(o), namespace: m.join(".")}, l);
            if (!(d = a[v])) {
                d = a[v] = [], d.delegateCount = 0;
                if (!c.setup || c.setup.call(e, s, m, h) === !1)e.addEventListener ? e.addEventListener(v, h, !1) : e.attachEvent && e.attachEvent("on" + v, h)
            }
            c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), o ? d.splice(d.delegateCount++, 0, p) : d.push(p), w.event.global[v] = !0
        }
        e = null
    }, remove: function (e, t, n, r, i) {
        var s, o, u, a, f, l, c, h, p, d, v, m = w.hasData(e) && w._data(e);
        if (!m || !(l = m.events))return;
        t = (t || "").match(S) || [""], f = t.length;
        while (f--) {
            u = rt.exec(t[f]) || [], p = v = u[1], d = (u[2] || "").split(".").sort();
            if (!p) {
                for (p in l)w.event.remove(e, p + t[f], n, r, !0);
                continue
            }
            c = w.event.special[p] || {}, p = (r ? c.delegateType : c.bindType) || p, h = l[p] || [], u = u[2] && new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = s = h.length;
            while (s--)o = h[s], (i || v === o.origType) && (!n || n.guid === o.guid) && (!u || u.test(o.namespace)) && (!r || r === o.selector || r === "**" && o.selector) && (h.splice(s, 1), o.selector && h.delegateCount--, c.remove && c.remove.call(e, o));
            a && !h.length && ((!c.teardown || c.teardown.call(e, d, m.handle) === !1) && w.removeEvent(e, p, m.handle), delete l[p])
        }
        w.isEmptyObject(l) && (delete m.handle, w._removeData(e, "events"))
    }, trigger: function (n, r, i, s) {
        var u, a, f, l, c, h, p, d = [i || o], v = y.call(n, "type") ? n.type : n, m = y.call(n, "namespace") ? n.namespace.split(".") : [];
        f = h = i = i || o;
        if (i.nodeType === 3 || i.nodeType === 8)return;
        if (nt.test(v + w.event.triggered))return;
        v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), a = v.indexOf(":") < 0 && "on" + v, n = n[w.expando] ? n : new w.Event(v, typeof n == "object" && n), n.isTrigger = s ? 2 : 3, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = r == null ? [n] : w.makeArray(r, [n]), c = w.event.special[v] || {};
        if (!s && c.trigger && c.trigger.apply(i, r) === !1)return;
        if (!s && !c.noBubble && !w.isWindow(i)) {
            l = c.delegateType || v, nt.test(l + v) || (f = f.parentNode);
            for (; f; f = f.parentNode)d.push(f), h = f;
            h === (i.ownerDocument || o) && d.push(h.defaultView || h.parentWindow || e)
        }
        p = 0;
        while ((f = d[p++]) && !n.isPropagationStopped())n.type = p > 1 ? l : c.bindType || v, u = (w._data(f, "events") || {})[n.type] && w._data(f, "handle"), u && u.apply(f, r), u = a && f[a], u && w.acceptData(f) && u.apply && u.apply(f, r) === !1 && n.preventDefault();
        n.type = v;
        if (!s && !n.isDefaultPrevented() && (!c._default || c._default.apply(d.pop(), r) === !1) && w.acceptData(i) && a && i[v] && !w.isWindow(i)) {
            h = i[a], h && (i[a] = null), w.event.triggered = v;
            try {
                i[v]()
            } catch (g) {
            }
            w.event.triggered = t, h && (i[a] = h)
        }
        return n.result
    }, dispatch: function (e) {
        e = w.event.fix(e);
        var n, r, i, s, o, u = [], a = v.call(arguments), f = (w._data(this, "events") || {})[e.type] || [], l = w.event.special[e.type] || {};
        a[0] = e, e.delegateTarget = this;
        if (l.preDispatch && l.preDispatch.call(this, e) === !1)return;
        u = w.event.handlers.call(this, e, f), n = 0;
        while ((s = u[n++]) && !e.isPropagationStopped()) {
            e.currentTarget = s.elem, o = 0;
            while ((i = s.handlers[o++]) && !e.isImmediatePropagationStopped())if (!e.namespace_re || e.namespace_re.test(i.namespace))e.handleObj = i, e.data = i.data, r = ((w.event.special[i.origType] || {}).handle || i.handler).apply(s.elem, a), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
        }
        return l.postDispatch && l.postDispatch.call(this, e), e.result
    }, handlers: function (e, n) {
        var r, i, s, o, u = [], a = n.delegateCount, f = e.target;
        if (a && f.nodeType && (!e.button || e.type !== "click"))for (; f != this; f = f.parentNode || this)if (f.nodeType === 1 && (f.disabled !== !0 || e.type !== "click")) {
            s = [];
            for (o = 0; o < a; o++)i = n[o], r = i.selector + " ", s[r] === t && (s[r] = i.needsContext ? w(r, this).index(f) >= 0 : w.find(r, this, null, [f]).length), s[r] && s.push(i);
            s.length && u.push({elem: f, handlers: s})
        }
        return a < n.length && u.push({elem: this, handlers: n.slice(a)}), u
    }, fix: function (e) {
        if (e[w.expando])return e;
        var t, n, r, i = e.type, s = e, u = this.fixHooks[i];
        u || (this.fixHooks[i] = u = tt.test(i) ? this.mouseHooks : et.test(i) ? this.keyHooks : {}), r = u.props ? this.props.concat(u.props) : this.props, e = new w.Event(s), t = r.length;
        while (t--)n = r[t], e[n] = s[n];
        return e.target || (e.target = s.srcElement || o), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, u.filter ? u.filter(e, s) : e
    }, props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (e, t) {
        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (e, n) {
        var r, i, s, u = n.button, a = n.fromElement;
        return e.pageX == null && n.clientX != null && (i = e.target.ownerDocument || o, s = i.documentElement, r = i.body, e.pageX = n.clientX + (s && s.scrollLeft || r && r.scrollLeft || 0) - (s && s.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || r && r.scrollTop || 0) - (s && s.clientTop || r && r.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
    }}, special: {load: {noBubble: !0}, focus: {trigger: function () {
        if (this !== ot() && this.focus)try {
            return this.focus(), !1
        } catch (e) {
        }
    }, delegateType: "focusin"}, blur: {trigger: function () {
        if (this === ot() && this.blur)return this.blur(), !1
    }, delegateType: "focusout"}, click: {trigger: function () {
        if (w.nodeName(this, "input") && this.type === "checkbox" && this.click)return this.click(), !1
    }, _default: function (e) {
        return w.nodeName(e.target, "a")
    }}, beforeunload: {postDispatch: function (e) {
        e.result !== t && (e.originalEvent.returnValue = e.result)
    }}}, simulate: function (e, t, n, r) {
        var i = w.extend(new w.Event, n, {type: e, isSimulated: !0, originalEvent: {}});
        r ? w.event.trigger(i, null, t) : w.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
    }}, w.removeEvent = o.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === i && (e[r] = null), e.detachEvent(r, n))
    }, w.Event = function (e, t) {
        if (!(this instanceof w.Event))return new w.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? it : st) : this.type = e, t && w.extend(this, t), this.timeStamp = e && e.timeStamp || w.now(), this[w.expando] = !0
    }, w.Event.prototype = {isDefaultPrevented: st, isPropagationStopped: st, isImmediatePropagationStopped: st, preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = it;
        if (!e)return;
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }, stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = it;
        if (!e)return;
        e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = it, this.stopPropagation()
    }}, w.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (e, t) {
        w.event.special[e] = {delegateType: t, bindType: t, handle: function (e) {
            var n, r = this, i = e.relatedTarget, s = e.handleObj;
            if (!i || i !== r && !w.contains(r, i))e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
            return n
        }}
    }), w.support.submitBubbles || (w.event.special.submit = {setup: function () {
        if (w.nodeName(this, "form"))return!1;
        w.event.add(this, "click._submit keypress._submit", function (e) {
            var n = e.target, r = w.nodeName(n, "input") || w.nodeName(n, "button") ? n.form : t;
            r && !w._data(r, "submitBubbles") && (w.event.add(r, "submit._submit", function (e) {
                e._submit_bubble = !0
            }), w._data(r, "submitBubbles", !0))
        })
    }, postDispatch: function (e) {
        e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && w.event.simulate("submit", this.parentNode, e, !0))
    }, teardown: function () {
        if (w.nodeName(this, "form"))return!1;
        w.event.remove(this, "._submit")
    }}), w.support.changeBubbles || (w.event.special.change = {setup: function () {
        if (Z.test(this.nodeName)) {
            if (this.type === "checkbox" || this.type === "radio")w.event.add(this, "propertychange._change", function (e) {
                e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
            }), w.event.add(this, "click._change", function (e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), w.event.simulate("change", this, e, !0)
            });
            return!1
        }
        w.event.add(this, "beforeactivate._change", function (e) {
            var t = e.target;
            Z.test(t.nodeName) && !w._data(t, "changeBubbles") && (w.event.add(t, "change._change", function (e) {
                this.parentNode && !e.isSimulated && !e.isTrigger && w.event.simulate("change", this.parentNode, e, !0)
            }), w._data(t, "changeBubbles", !0))
        })
    }, handle: function (e) {
        var t = e.target;
        if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox")return e.handleObj.handler.apply(this, arguments)
    }, teardown: function () {
        return w.event.remove(this, "._change"), !Z.test(this.nodeName)
    }}), w.support.focusinBubbles || w.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var n = 0, r = function (e) {
            w.event.simulate(t, e.target, w.event.fix(e), !0)
        };
        w.event.special[t] = {setup: function () {
            n++ === 0 && o.addEventListener(e, r, !0)
        }, teardown: function () {
            --n === 0 && o.removeEventListener(e, r, !0)
        }}
    }), w.fn.extend({on: function (e, n, r, i, s) {
        var o, u;
        if (typeof e == "object") {
            typeof n != "string" && (r = r || n, n = t);
            for (o in e)this.on(o, n, r, e[o], s);
            return this
        }
        r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
        if (i === !1)i = st; else if (!i)return this;
        return s === 1 && (u = i, i = function (e) {
            return w().off(e), u.apply(this, arguments)
        }, i.guid = u.guid || (u.guid = w.guid++)), this.each(function () {
            w.event.add(this, e, i, r, n)
        })
    }, one: function (e, t, n, r) {
        return this.on(e, t, n, r, 1)
    }, off: function (e, n, r) {
        var i, s;
        if (e && e.preventDefault && e.handleObj)return i = e.handleObj, w(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
        if (typeof e == "object") {
            for (s in e)this.off(s, n, e[s]);
            return this
        }
        if (n === !1 || typeof n == "function")r = n, n = t;
        return r === !1 && (r = st), this.each(function () {
            w.event.remove(this, e, r, n)
        })
    }, trigger: function (e, t) {
        return this.each(function () {
            w.event.trigger(e, t, this)
        })
    }, triggerHandler: function (e, t) {
        var n = this[0];
        if (n)return w.event.trigger(e, t, n, !0)
    }});
    var ut = /^.[^:#\[\.,]*$/, at = /^(?:parents|prev(?:Until|All))/, ft = w.expr.match.needsContext, lt = {children: !0, contents: !0, next: !0, prev: !0};
    w.fn.extend({find: function (e) {
        var t, n = [], r = this, i = r.length;
        if (typeof e != "string")return this.pushStack(w(e).filter(function () {
            for (t = 0; t < i; t++)if (w.contains(r[t], this))return!0
        }));
        for (t = 0; t < i; t++)w.find(e, r[t], n);
        return n = this.pushStack(i > 1 ? w.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
    }, has: function (e) {
        var t, n = w(e, this), r = n.length;
        return this.filter(function () {
            for (t = 0; t < r; t++)if (w.contains(this, n[t]))return!0
        })
    }, not: function (e) {
        return this.pushStack(ht(this, e || [], !0))
    }, filter: function (e) {
        return this.pushStack(ht(this, e || [], !1))
    }, is: function (e) {
        return!!ht(this, typeof e == "string" && ft.test(e) ? w(e) : e || [], !1).length
    }, closest: function (e, t) {
        var n, r = 0, i = this.length, s = [], o = ft.test(e) || typeof e != "string" ? w(e, t || this.context) : 0;
        for (; r < i; r++)for (n = this[r]; n && n !== t; n = n.parentNode)if (n.nodeType < 11 && (o ? o.index(n) > -1 : n.nodeType === 1 && w.find.matchesSelector(n, e))) {
            n = s.push(n);
            break
        }
        return this.pushStack(s.length > 1 ? w.unique(s) : s)
    }, index: function (e) {
        return e ? typeof e == "string" ? w.inArray(this[0], w(e)) : w.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    }, add: function (e, t) {
        var n = typeof e == "string" ? w(e, t) : w.makeArray(e && e.nodeType ? [e] : e), r = w.merge(this.get(), n);
        return this.pushStack(w.unique(r))
    }, addBack: function (e) {
        return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }}), w.each({parent: function (e) {
        var t = e.parentNode;
        return t && t.nodeType !== 11 ? t : null
    }, parents: function (e) {
        return w.dir(e, "parentNode")
    }, parentsUntil: function (e, t, n) {
        return w.dir(e, "parentNode", n)
    }, next: function (e) {
        return ct(e, "nextSibling")
    }, prev: function (e) {
        return ct(e, "previousSibling")
    }, nextAll: function (e) {
        return w.dir(e, "nextSibling")
    }, prevAll: function (e) {
        return w.dir(e, "previousSibling")
    }, nextUntil: function (e, t, n) {
        return w.dir(e, "nextSibling", n)
    }, prevUntil: function (e, t, n) {
        return w.dir(e, "previousSibling", n)
    }, siblings: function (e) {
        return w.sibling((e.parentNode || {}).firstChild, e)
    }, children: function (e) {
        return w.sibling(e.firstChild)
    }, contents: function (e) {
        return w.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : w.merge([], e.childNodes)
    }}, function (e, t) {
        w.fn[e] = function (n, r) {
            var i = w.map(this, t, n);
            return e.slice(-5) !== "Until" && (r = n), r && typeof r == "string" && (i = w.filter(r, i)), this.length > 1 && (lt[e] || (i = w.unique(i)), at.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    }), w.extend({filter: function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), t.length === 1 && r.nodeType === 1 ? w.find.matchesSelector(r, e) ? [r] : [] : w.find.matches(e, w.grep(t, function (e) {
            return e.nodeType === 1
        }))
    }, dir: function (e, n, r) {
        var i = [], s = e[n];
        while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !w(s).is(r)))s.nodeType === 1 && i.push(s), s = s[n];
        return i
    }, sibling: function (e, t) {
        var n = [];
        for (; e; e = e.nextSibling)e.nodeType === 1 && e !== t && n.push(e);
        return n
    }});
    var dt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", vt = / jQuery\d+="(?:null|\d+)"/g, mt = new RegExp("<(?:" + dt + ")[\\s/>]", "i"), gt = /^\s+/, yt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bt = /<([\w:]+)/, wt = /<tbody/i, Et = /<|&#?\w+;/, St = /<(?:script|style|link)/i, xt = /^(?:checkbox|radio)$/i, Tt = /checked\s*(?:[^=]|=\s*.checked.)/i, Nt = /^$|\/(?:java|ecma)script/i, Ct = /^true\/(.*)/, kt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Lt = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], area: [1, "<map>", "</map>"], param: [1, "<object>", "</object>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: w.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]}, At = pt(o), Ot = At.appendChild(o.createElement("div"));
    Lt.optgroup = Lt.option, Lt.tbody = Lt.tfoot = Lt.colgroup = Lt.caption = Lt.thead, Lt.th = Lt.td, w.fn.extend({text: function (e) {
        return w.access(this, function (e) {
            return e === t ? w.text(this) : this.empty().append((this[0] && this[0].ownerDocument || o).createTextNode(e))
        }, null, e, arguments.length)
    }, append: function () {
        return this.domManip(arguments, function (e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var t = Mt(this, e);
                t.appendChild(e)
            }
        })
    }, prepend: function () {
        return this.domManip(arguments, function (e) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var t = Mt(this, e);
                t.insertBefore(e, t.firstChild)
            }
        })
    }, before: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this)
        })
    }, after: function () {
        return this.domManip(arguments, function (e) {
            this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
        })
    }, remove: function (e, t) {
        var n, r = e ? w.filter(e, this) : this, i = 0;
        for (; (n = r[i]) != null; i++)!t && n.nodeType === 1 && w.cleanData(jt(n)), n.parentNode && (t && w.contains(n.ownerDocument, n) && Pt(jt(n, "script")), n.parentNode.removeChild(n));
        return this
    }, empty: function () {
        var e, t = 0;
        for (; (e = this[t]) != null; t++) {
            e.nodeType === 1 && w.cleanData(jt(e, !1));
            while (e.firstChild)e.removeChild(e.firstChild);
            e.options && w.nodeName(e, "select") && (e.options.length = 0)
        }
        return this
    }, clone: function (e, t) {
        return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
            return w.clone(this, e, t)
        })
    }, html: function (e) {
        return w.access(this, function (e) {
            var n = this[0] || {}, r = 0, i = this.length;
            if (e === t)return n.nodeType === 1 ? n.innerHTML.replace(vt, "") : t;
            if (typeof e == "string" && !St.test(e) && (w.support.htmlSerialize || !mt.test(e)) && (w.support.leadingWhitespace || !gt.test(e)) && !Lt[(bt.exec(e) || ["", ""])[1].toLowerCase()]) {
                e = e.replace(yt, "<$1></$2>");
                try {
                    for (; r < i; r++)n = this[r] || {}, n.nodeType === 1 && (w.cleanData(jt(n, !1)), n.innerHTML = e);
                    n = 0
                } catch (s) {
                }
            }
            n && this.empty().append(e)
        }, null, e, arguments.length)
    }, replaceWith: function () {
        var e = w.map(this, function (e) {
            return[e.nextSibling, e.parentNode]
        }), t = 0;
        return this.domManip(arguments, function (n) {
            var r = e[t++], i = e[t++];
            i && (r && r.parentNode !== i && (r = this.nextSibling), w(this).remove(), i.insertBefore(n, r))
        }, !0), t ? this : this.remove()
    }, detach: function (e) {
        return this.remove(e, !0)
    }, domManip: function (e, t, n) {
        e = p.apply([], e);
        var r, i, s, o, u, a, f = 0, l = this.length, c = this, h = l - 1, d = e[0], v = w.isFunction(d);
        if (v || !(l <= 1 || typeof d != "string" || w.support.checkClone || !Tt.test(d)))return this.each(function (r) {
            var i = c.eq(r);
            v && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
        });
        if (l) {
            a = w.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = a.firstChild, a.childNodes.length === 1 && (a = r);
            if (r) {
                o = w.map(jt(a, "script"), _t), s = o.length;
                for (; f < l; f++)i = a, f !== h && (i = w.clone(i, !0, !0), s && w.merge(o, jt(i, "script"))), t.call(this[f], i, f);
                if (s) {
                    u = o[o.length - 1].ownerDocument, w.map(o, Dt);
                    for (f = 0; f < s; f++)i = o[f], Nt.test(i.type || "") && !w._data(i, "globalEval") && w.contains(u, i) && (i.src ? w._evalUrl(i.src) : w.globalEval((i.text || i.textContent || i.innerHTML || "").replace(kt, "")))
                }
                a = r = null
            }
        }
        return this
    }}), w.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (e, t) {
        w.fn[e] = function (e) {
            var n, r = 0, i = [], s = w(e), o = s.length - 1;
            for (; r <= o; r++)n = r === o ? this : this.clone(!0), w(s[r])[t](n), d.apply(i, n.get());
            return this.pushStack(i)
        }
    }), w.extend({clone: function (e, t, n) {
        var r, i, s, o, u, a = w.contains(e.ownerDocument, e);
        w.support.html5Clone || w.isXMLDoc(e) || !mt.test("<" + e.nodeName + ">") ? s = e.cloneNode(!0) : (Ot.innerHTML = e.outerHTML, Ot.removeChild(s = Ot.firstChild));
        if ((!w.support.noCloneEvent || !w.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !w.isXMLDoc(e)) {
            r = jt(s), u = jt(e);
            for (o = 0; (i = u[o]) != null; ++o)r[o] && Bt(i, r[o])
        }
        if (t)if (n) {
            u = u || jt(e), r = r || jt(s);
            for (o = 0; (i = u[o]) != null; o++)Ht(i, r[o])
        } else Ht(e, s);
        return r = jt(s, "script"), r.length > 0 && Pt(r, !a && jt(e, "script")), r = u = i = null, s
    }, buildFragment: function (e, t, n, r) {
        var i, s, o, u, a, f, l, c = e.length, h = pt(t), p = [], d = 0;
        for (; d < c; d++) {
            s = e[d];
            if (s || s === 0)if (w.type(s) === "object")w.merge(p, s.nodeType ? [s] : s); else if (!Et.test(s))p.push(t.createTextNode(s)); else {
                u = u || h.appendChild(t.createElement("div")), a = (bt.exec(s) || ["", ""])[1].toLowerCase(), l = Lt[a] || Lt._default, u.innerHTML = l[1] + s.replace(yt, "<$1></$2>") + l[2], i = l[0];
                while (i--)u = u.lastChild;
                !w.support.leadingWhitespace && gt.test(s) && p.push(t.createTextNode(gt.exec(s)[0]));
                if (!w.support.tbody) {
                    s = a === "table" && !wt.test(s) ? u.firstChild : l[1] === "<table>" && !wt.test(s) ? u : 0, i = s && s.childNodes.length;
                    while (i--)w.nodeName(f = s.childNodes[i], "tbody") && !f.childNodes.length && s.removeChild(f)
                }
                w.merge(p, u.childNodes), u.textContent = "";
                while (u.firstChild)u.removeChild(u.firstChild);
                u = h.lastChild
            }
        }
        u && h.removeChild(u), w.support.appendChecked || w.grep(jt(p, "input"), Ft), d = 0;
        while (s = p[d++]) {
            if (r && w.inArray(s, r) !== -1)continue;
            o = w.contains(s.ownerDocument, s), u = jt(h.appendChild(s), "script"), o && Pt(u);
            if (n) {
                i = 0;
                while (s = u[i++])Nt.test(s.type || "") && n.push(s)
            }
        }
        return u = null, h
    }, cleanData: function (e, t) {
        var n, r, s, o, u = 0, a = w.expando, f = w.cache, l = w.support.deleteExpando, h = w.event.special;
        for (; (n = e[u]) != null; u++)if (t || w.acceptData(n)) {
            s = n[a], o = s && f[s];
            if (o) {
                if (o.events)for (r in o.events)h[r] ? w.event.remove(n, r) : w.removeEvent(n, r, o.handle);
                f[s] && (delete f[s], l ? delete n[a] : typeof n.removeAttribute !== i ? n.removeAttribute(a) : n[a] = null, c.push(s))
            }
        }
    }, _evalUrl: function (e) {
        return w.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }}), w.fn.extend({wrapAll: function (e) {
        if (w.isFunction(e))return this.each(function (t) {
            w(this).wrapAll(e.call(this, t))
        });
        if (this[0]) {
            var t = w(e, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstChild && e.firstChild.nodeType === 1)e = e.firstChild;
                return e
            }).append(this)
        }
        return this
    }, wrapInner: function (e) {
        return w.isFunction(e) ? this.each(function (t) {
            w(this).wrapInner(e.call(this, t))
        }) : this.each(function () {
            var t = w(this), n = t.contents();
            n.length ? n.wrapAll(e) : t.append(e)
        })
    }, wrap: function (e) {
        var t = w.isFunction(e);
        return this.each(function (n) {
            w(this).wrapAll(t ? e.call(this, n) : e)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            w.nodeName(this, "body") || w(this).replaceWith(this.childNodes)
        }).end()
    }});
    var It, qt, Rt, Ut = /alpha\([^)]*\)/i, zt = /opacity\s*=\s*([^)]*)/, Wt = /^(top|right|bottom|left)$/, Xt = /^(none|table(?!-c[ea]).+)/, Vt = /^margin/, $t = new RegExp("^(" + E + ")(.*)$", "i"), Jt = new RegExp("^(" + E + ")(?!px)[a-z%]+$", "i"), Kt = new RegExp("^([+-])=(" + E + ")", "i"), Qt = {BODY: "block"}, Gt = {position: "absolute", visibility: "hidden", display: "block"}, Yt = {letterSpacing: 0, fontWeight: 400}, Zt = ["Top", "Right", "Bottom", "Left"], en = ["Webkit", "O", "Moz", "ms"];
    w.fn.extend({css: function (e, n) {
        return w.access(this, function (e, n, r) {
            var i, s, o = {}, u = 0;
            if (w.isArray(n)) {
                s = qt(e), i = n.length;
                for (; u < i; u++)o[n[u]] = w.css(e, n[u], !1, s);
                return o
            }
            return r !== t ? w.style(e, n, r) : w.css(e, n)
        }, e, n, arguments.length > 1)
    }, show: function () {
        return rn(this, !0)
    }, hide: function () {
        return rn(this)
    }, toggle: function (e) {
        return typeof e == "boolean" ? e ? this.show() : this.hide() : this.each(function () {
            nn(this) ? w(this).show() : w(this).hide()
        })
    }}), w.extend({cssHooks: {opacity: {get: function (e, t) {
        if (t) {
            var n = Rt(e, "opacity");
            return n === "" ? "1" : n
        }
    }}}, cssNumber: {columnCount: !0, fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": w.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (e, n, r, i) {
        if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style)return;
        var s, o, u, a = w.camelCase(n), f = e.style;
        n = w.cssProps[a] || (w.cssProps[a] = tn(f, a)), u = w.cssHooks[n] || w.cssHooks[a];
        if (r === t)return u && "get"in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
        o = typeof r, o === "string" && (s = Kt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(w.css(e, n)), o = "number");
        if (r == null || o === "number" && isNaN(r))return;
        o === "number" && !w.cssNumber[a] && (r += "px"), !w.support.clearCloneStyle && r === "" && n.indexOf("background") === 0 && (f[n] = "inherit");
        if (!u || !("set"in u) || (r = u.set(e, r, i)) !== t)try {
            f[n] = r
        } catch (l) {
        }
    }, css: function (e, n, r, i) {
        var s, o, u, a = w.camelCase(n);
        return n = w.cssProps[a] || (w.cssProps[a] = tn(e.style, a)), u = w.cssHooks[n] || w.cssHooks[a], u && "get"in u && (o = u.get(e, !0, r)), o === t && (o = Rt(e, n, i)), o === "normal" && n in Yt && (o = Yt[n]), r === "" || r ? (s = parseFloat(o), r === !0 || w.isNumeric(s) ? s || 0 : o) : o
    }}), e.getComputedStyle ? (qt = function (t) {
        return e.getComputedStyle(t, null)
    }, Rt = function (e, n, r) {
        var i, s, o, u = r || qt(e), a = u ? u.getPropertyValue(n) || u[n] : t, f = e.style;
        return u && (a === "" && !w.contains(e.ownerDocument, e) && (a = w.style(e, n)), Jt.test(a) && Vt.test(n) && (i = f.width, s = f.minWidth, o = f.maxWidth, f.minWidth = f.maxWidth = f.width = a, a = u.width, f.width = i, f.minWidth = s, f.maxWidth = o)), a
    }) : o.documentElement.currentStyle && (qt = function (e) {
        return e.currentStyle
    }, Rt = function (e, n, r) {
        var i, s, o, u = r || qt(e), a = u ? u[n] : t, f = e.style;
        return a == null && f && f[n] && (a = f[n]), Jt.test(a) && !Wt.test(n) && (i = f.left, s = e.runtimeStyle, o = s && s.left, o && (s.left = e.currentStyle.left), f.left = n === "fontSize" ? "1em" : a, a = f.pixelLeft + "px", f.left = i, o && (s.left = o)), a === "" ? "auto" : a
    }), w.each(["height", "width"], function (e, t) {
        w.cssHooks[t] = {get: function (e, n, r) {
            if (n)return e.offsetWidth === 0 && Xt.test(w.css(e, "display")) ? w.swap(e, Gt, function () {
                return un(e, t, r)
            }) : un(e, t, r)
        }, set: function (e, n, r) {
            var i = r && qt(e);
            return sn(e, n, r ? on(e, t, r, w.support.boxSizing && w.css(e, "boxSizing", !1, i) === "border-box", i) : 0)
        }}
    }), w.support.opacity || (w.cssHooks.opacity = {get: function (e, t) {
        return zt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
    }, set: function (e, t) {
        var n = e.style, r = e.currentStyle, i = w.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "", s = r && r.filter || n.filter || "";
        n.zoom = 1;
        if ((t >= 1 || t === "") && w.trim(s.replace(Ut, "")) === "" && n.removeAttribute) {
            n.removeAttribute("filter");
            if (t === "" || r && !r.filter)return
        }
        n.filter = Ut.test(s) ? s.replace(Ut, i) : s + " " + i
    }}), w(function () {
        w.support.reliableMarginRight || (w.cssHooks.marginRight = {get: function (e, t) {
            if (t)return w.swap(e, {display: "inline-block"}, Rt, [e, "marginRight"])
        }}), !w.support.pixelPosition && w.fn.position && w.each(["top", "left"], function (e, t) {
            w.cssHooks[t] = {get: function (e, n) {
                if (n)return n = Rt(e, t), Jt.test(n) ? w(e).position()[t] + "px" : n
            }}
        })
    }), w.expr && w.expr.filters && (w.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0 || !w.support.reliableHiddenOffsets && (e.style && e.style.display || w.css(e, "display")) === "none"
    }, w.expr.filters.visible = function (e) {
        return!w.expr.filters.hidden(e)
    }), w.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        w.cssHooks[e + t] = {expand: function (n) {
            var r = 0, i = {}, s = typeof n == "string" ? n.split(" ") : [n];
            for (; r < 4; r++)i[e + Zt[r] + t] = s[r] || s[r - 2] || s[0];
            return i
        }}, Vt.test(e) || (w.cssHooks[e + t].set = sn)
    });
    var ln = /%20/g, cn = /\[\]$/, hn = /\r?\n/g, pn = /^(?:submit|button|image|reset|file)$/i, dn = /^(?:input|select|textarea|keygen)/i;
    w.fn.extend({serialize: function () {
        return w.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            var e = w.prop(this, "elements");
            return e ? w.makeArray(e) : this
        }).filter(function () {
            var e = this.type;
            return this.name && !w(this).is(":disabled") && dn.test(this.nodeName) && !pn.test(e) && (this.checked || !xt.test(e))
        }).map(function (e, t) {
            var n = w(this).val();
            return n == null ? null : w.isArray(n) ? w.map(n, function (e) {
                return{name: t.name, value: e.replace(hn, "\r\n")}
            }) : {name: t.name, value: n.replace(hn, "\r\n")}
        }).get()
    }}), w.param = function (e, n) {
        var r, i = [], s = function (e, t) {
            t = w.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        n === t && (n = w.ajaxSettings && w.ajaxSettings.traditional);
        if (w.isArray(e) || e.jquery && !w.isPlainObject(e))w.each(e, function () {
            s(this.name, this.value)
        }); else for (r in e)vn(r, e[r], n, s);
        return i.join("&").replace(ln, "+")
    }, w.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        w.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), w.fn.extend({hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e)
    }, bind: function (e, t, n) {
        return this.on(e, null, t, n)
    }, unbind: function (e, t) {
        return this.off(e, null, t)
    }, delegate: function (e, t, n, r) {
        return this.on(t, e, n, r)
    }, undelegate: function (e, t, n) {
        return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
    }});
    var mn, gn, yn = w.now(), bn = /\?/, wn = /#.*$/, En = /([?&])_=[^&]*/, Sn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, xn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Tn = /^(?:GET|HEAD)$/, Nn = /^\/\//, Cn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, kn = w.fn.load, Ln = {}, An = {}, On = "*/".concat("*");
    try {
        gn = s.href
    } catch (Mn) {
        gn = o.createElement("a"), gn.href = "", gn = gn.href
    }
    mn = Cn.exec(gn.toLowerCase()) || [], w.fn.load = function (e, n, r) {
        if (typeof e != "string" && kn)return kn.apply(this, arguments);
        var i, s, o, u = this, a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), w.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (o = "POST"), u.length > 0 && w.ajax({url: e, type: o, dataType: "html", data: n}).done(function (e) {
            s = arguments, u.html(i ? w("<div>").append(w.parseHTML(e)).find(i) : e)
        }).complete(r && function (e, t) {
            u.each(r, s || [e.responseText, t, e])
        }), this
    }, w.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        w.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), w.extend({active: 0, lastModified: {}, etag: {}, ajaxSettings: {url: gn, type: "GET", isLocal: xn.test(mn[1]), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: {"*": On, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript"}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"}, converters: {"* text": String, "text html": !0, "text json": w.parseJSON, "text xml": w.parseXML}, flatOptions: {url: !0, context: !0}}, ajaxSetup: function (e, t) {
        return t ? Pn(Pn(e, w.ajaxSettings), t) : Pn(w.ajaxSettings, e)
    }, ajaxPrefilter: _n(Ln), ajaxTransport: _n(An), ajax: function (e, n) {
        function N(e, n, r, i) {
            var l, g, y, E, S, T = n;
            if (b === 2)return;
            b = 2, u && clearTimeout(u), f = t, o = i || "", x.readyState = e > 0 ? 4 : 0, l = e >= 200 && e < 300 || e === 304, r && (E = Hn(c, x, r)), E = Bn(c, E, x, l);
            if (l)c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (w.lastModified[s] = S), S = x.getResponseHeader("etag"), S && (w.etag[s] = S)), e === 204 || c.type === "HEAD" ? T = "nocontent" : e === 304 ? T = "notmodified" : (T = E.state, g = E.data, y = E.error, l = !y); else {
                y = T;
                if (e || !T)T = "error", e < 0 && (e = 0)
            }
            x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [g, T, x]) : d.rejectWith(h, [x, T, y]), x.statusCode(m), m = t, a && p.trigger(l ? "ajaxSuccess" : "ajaxError", [x, c, l ? g : y]), v.fireWith(h, [x, T]), a && (p.trigger("ajaxComplete", [x, c]), --w.active || w.event.trigger("ajaxStop"))
        }

        typeof e == "object" && (n = e, e = t), n = n || {};
        var r, i, s, o, u, a, f, l, c = w.ajaxSetup({}, n), h = c.context || c, p = c.context && (h.nodeType || h.jquery) ? w(h) : w.event, d = w.Deferred(), v = w.Callbacks("once memory"), m = c.statusCode || {}, g = {}, y = {}, b = 0, E = "canceled", x = {readyState: 0, getResponseHeader: function (e) {
            var t;
            if (b === 2) {
                if (!l) {
                    l = {};
                    while (t = Sn.exec(o))l[t[1].toLowerCase()] = t[2]
                }
                t = l[e.toLowerCase()]
            }
            return t == null ? null : t
        }, getAllResponseHeaders: function () {
            return b === 2 ? o : null
        }, setRequestHeader: function (e, t) {
            var n = e.toLowerCase();
            return b || (e = y[n] = y[n] || e, g[e] = t), this
        }, overrideMimeType: function (e) {
            return b || (c.mimeType = e), this
        }, statusCode: function (e) {
            var t;
            if (e)if (b < 2)for (t in e)m[t] = [m[t], e[t]]; else x.always(e[x.status]);
            return this
        }, abort: function (e) {
            var t = e || E;
            return f && f.abort(t), N(0, t), this
        }};
        d.promise(x).complete = v.add, x.success = x.done, x.error = x.fail, c.url = ((e || c.url || gn) + "").replace(wn, "").replace(Nn, mn[1] + "//"), c.type = n.method || n.type || c.method || c.type, c.dataTypes = w.trim(c.dataType || "*").toLowerCase().match(S) || [""], c.crossDomain == null && (r = Cn.exec(c.url.toLowerCase()), c.crossDomain = !(!r || r[1] === mn[1] && r[2] === mn[2] && (r[3] || (r[1] === "http:" ? "80" : "443")) === (mn[3] || (mn[1] === "http:" ? "80" : "443")))), c.data && c.processData && typeof c.data != "string" && (c.data = w.param(c.data, c.traditional)), Dn(Ln, c, n, x);
        if (b === 2)return x;
        a = c.global, a && w.active++ === 0 && w.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !Tn.test(c.type), s = c.url, c.hasContent || (c.data && (s = c.url += (bn.test(s) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = En.test(s) ? s.replace(En, "$1_=" + yn++) : s + (bn.test(s) ? "&" : "?") + "_=" + yn++)), c.ifModified && (w.lastModified[s] && x.setRequestHeader("If-Modified-Since", w.lastModified[s]), w.etag[s] && x.setRequestHeader("If-None-Match", w.etag[s])), (c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + On + "; q=0.01" : "") : c.accepts["*"]);
        for (i in c.headers)x.setRequestHeader(i, c.headers[i]);
        if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && b !== 2) {
            E = "abort";
            for (i in{success: 1, error: 1, complete: 1})x[i](c[i]);
            f = Dn(An, c, n, x);
            if (!f)N(-1, "No Transport"); else {
                x.readyState = 1, a && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
                    x.abort("timeout")
                }, c.timeout));
                try {
                    b = 1, f.send(g, N)
                } catch (T) {
                    if (!(b < 2))throw T;
                    N(-1, T)
                }
            }
            return x
        }
        return x.abort()
    }, getJSON: function (e, t, n) {
        return w.get(e, t, n, "json")
    }, getScript: function (e, n) {
        return w.get(e, t, n, "script")
    }}), w.each(["get", "post"], function (e, n) {
        w[n] = function (e, r, i, s) {
            return w.isFunction(r) && (s = s || i, i = r, r = t), w.ajax({url: e, type: n, dataType: s, data: r, success: i})
        }
    }), w.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /(?:java|ecma)script/}, converters: {"text script": function (e) {
        return w.globalEval(e), e
    }}}), w.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), w.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = o.head || w("head")[0] || o.documentElement;
            return{send: function (t, i) {
                n = o.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, t) {
                    if (t || !n.readyState || /loaded|complete/.test(n.readyState))n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success")
                }, r.insertBefore(n, r.firstChild)
            }, abort: function () {
                n && n.onload(t, !0)
            }}
        }
    });
    var jn = [], Fn = /(=)\?(?=&|$)|\?\?/;
    w.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var e = jn.pop() || w.expando + "_" + yn++;
        return this[e] = !0, e
    }}), w.ajaxPrefilter("json jsonp", function (n, r, i) {
        var s, o, u, a = n.jsonp !== !1 && (Fn.test(n.url) ? "url" : typeof n.data == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Fn.test(n.data) && "data");
        if (a || n.dataTypes[0] === "jsonp")return s = n.jsonpCallback = w.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, a ? n[a] = n[a].replace(Fn, "$1" + s) : n.jsonp !== !1 && (n.url += (bn.test(n.url) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
            return u || w.error(s + " was not called"), u[0]
        }, n.dataTypes[0] = "json", o = e[s], e[s] = function () {
            u = arguments
        }, i.always(function () {
            e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, jn.push(s)), u && w.isFunction(o) && o(u[0]), u = o = t
        }), "script"
    });
    var In, qn, Rn = 0, Un = e.ActiveXObject && function () {
        var e;
        for (e in In)In[e](t, !0)
    };
    w.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return!this.isLocal && zn() || Wn()
    } : zn, qn = w.ajaxSettings.xhr(), w.support.cors = !!qn && "withCredentials"in qn, qn = w.support.ajax = !!qn, qn && w.ajaxTransport(function (n) {
        if (!n.crossDomain || w.support.cors) {
            var r;
            return{send: function (i, s) {
                var o, u, a = n.xhr();
                n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                if (n.xhrFields)for (u in n.xhrFields)a[u] = n.xhrFields[u];
                n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (u in i)a.setRequestHeader(u, i[u])
                } catch (f) {
                }
                a.send(n.hasContent && n.data || null), r = function (e, i) {
                    var u, f, l, c;
                    try {
                        if (r && (i || a.readyState === 4)) {
                            r = t, o && (a.onreadystatechange = w.noop, Un && delete In[o]);
                            if (i)a.readyState !== 4 && a.abort(); else {
                                c = {}, u = a.status, f = a.getAllResponseHeaders(), typeof a.responseText == "string" && (c.text = a.responseText);
                                try {
                                    l = a.statusText
                                } catch (h) {
                                    l = ""
                                }
                                !u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                            }
                        }
                    } catch (p) {
                        i || s(-1, p)
                    }
                    c && s(u, l, c, f)
                }, n.async ? a.readyState === 4 ? setTimeout(r) : (o = ++Rn, Un && (In || (In = {}, w(e).unload(Un)), In[o] = r), a.onreadystatechange = r) : r()
            }, abort: function () {
                r && r(t, !0)
            }}
        }
    });
    var Xn, Vn, $n = /^(?:toggle|show|hide)$/, Jn = new RegExp("^(?:([+-])=|)(" + E + ")([a-z%]*)$", "i"), Kn = /queueHooks$/, Qn = [nr], Gn = {"*": [function (e, t) {
        var n = this.createTween(e, t), r = n.cur(), i = Jn.exec(t), s = i && i[3] || (w.cssNumber[e] ? "" : "px"), o = (w.cssNumber[e] || s !== "px" && +r) && Jn.exec(w.css(n.elem, e)), u = 1, a = 20;
        if (o && o[3] !== s) {
            s = s || o[3], i = i || [], o = +r || 1;
            do u = u || ".5", o /= u, w.style(n.elem, e, o + s); while (u !== (u = n.cur() / r) && u !== 1 && --a)
        }
        return i && (o = n.start = +o || +r || 0, n.unit = s, n.end = i[1] ? o + (i[1] + 1) * i[2] : +i[2]), n
    }]};
    w.Animation = w.extend(er, {tweener: function (e, t) {
        w.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
        var n, r = 0, i = e.length;
        for (; r < i; r++)n = e[r], Gn[n] = Gn[n] || [], Gn[n].unshift(t)
    }, prefilter: function (e, t) {
        t ? Qn.unshift(e) : Qn.push(e)
    }}), w.Tween = rr, rr.prototype = {constructor: rr, init: function (e, t, n, r, i, s) {
        this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (w.cssNumber[n] ? "" : "px")
    }, cur: function () {
        var e = rr.propHooks[this.prop];
        return e && e.get ? e.get(this) : rr.propHooks._default.get(this)
    }, run: function (e) {
        var t, n = rr.propHooks[this.prop];
        return this.options.duration ? this.pos = t = w.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : rr.propHooks._default.set(this), this
    }}, rr.prototype.init.prototype = rr.prototype, rr.propHooks = {_default: {get: function (e) {
        var t;
        return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = w.css(e.elem, e.prop, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
    }, set: function (e) {
        w.fx.step[e.prop] ? w.fx.step[e.prop](e) : e.elem.style && (e.elem.style[w.cssProps[e.prop]] != null || w.cssHooks[e.prop]) ? w.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
    }}}, rr.propHooks.scrollTop = rr.propHooks.scrollLeft = {set: function (e) {
        e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }}, w.each(["toggle", "show", "hide"], function (e, t) {
        var n = w.fn[t];
        w.fn[t] = function (e, r, i) {
            return e == null || typeof e == "boolean" ? n.apply(this, arguments) : this.animate(ir(t, !0), e, r, i)
        }
    }), w.fn.extend({fadeTo: function (e, t, n, r) {
        return this.filter(nn).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
    }, animate: function (e, t, n, r) {
        var i = w.isEmptyObject(e), s = w.speed(t, n, r), o = function () {
            var t = er(this, w.extend({}, e), s);
            (i || w._data(this, "finish")) && t.stop(!0)
        };
        return o.finish = o, i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
    }, stop: function (e, n, r) {
        var i = function (e) {
            var t = e.stop;
            delete e.stop, t(r)
        };
        return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
            var t = !0, n = e != null && e + "queueHooks", s = w.timers, o = w._data(this);
            if (n)o[n] && o[n].stop && i(o[n]); else for (n in o)o[n] && o[n].stop && Kn.test(n) && i(o[n]);
            for (n = s.length; n--;)s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
            (t || !r) && w.dequeue(this, e)
        })
    }, finish: function (e) {
        return e !== !1 && (e = e || "fx"), this.each(function () {
            var t, n = w._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], s = w.timers, o = r ? r.length : 0;
            n.finish = !0, w.queue(this, e, []), i && i.stop && i.stop.call(this, !0);
            for (t = s.length; t--;)s[t].elem === this && s[t].queue === e && (s[t].anim.stop(!0), s.splice(t, 1));
            for (t = 0; t < o; t++)r[t] && r[t].finish && r[t].finish.call(this);
            delete n.finish
        })
    }}), w.each({slideDown: ir("show"), slideUp: ir("hide"), slideToggle: ir("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (e, t) {
        w.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), w.speed = function (e, t, n) {
        var r = e && typeof e == "object" ? w.extend({}, e) : {complete: n || !n && t || w.isFunction(e) && e, duration: e, easing: n && t || t && !w.isFunction(t) && t};
        r.duration = w.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in w.fx.speeds ? w.fx.speeds[r.duration] : w.fx.speeds._default;
        if (r.queue == null || r.queue === !0)r.queue = "fx";
        return r.old = r.complete, r.complete = function () {
            w.isFunction(r.old) && r.old.call(this), r.queue && w.dequeue(this, r.queue)
        }, r
    }, w.easing = {linear: function (e) {
        return e
    }, swing: function (e) {
        return.5 - Math.cos(e * Math.PI) / 2
    }}, w.timers = [], w.fx = rr.prototype.init, w.fx.tick = function () {
        var e, n = w.timers, r = 0;
        Xn = w.now();
        for (; r < n.length; r++)e = n[r], !e() && n[r] === e && n.splice(r--, 1);
        n.length || w.fx.stop(), Xn = t
    }, w.fx.timer = function (e) {
        e() && w.timers.push(e) && w.fx.start()
    }, w.fx.interval = 13, w.fx.start = function () {
        Vn || (Vn = setInterval(w.fx.tick, w.fx.interval))
    }, w.fx.stop = function () {
        clearInterval(Vn), Vn = null
    }, w.fx.speeds = {slow: 600, fast: 200, _default: 400}, w.fx.step = {}, w.expr && w.expr.filters && (w.expr.filters.animated = function (e) {
        return w.grep(w.timers, function (t) {
            return e === t.elem
        }).length
    }), w.fn.offset = function (e) {
        if (arguments.length)return e === t ? this : this.each(function (t) {
            w.offset.setOffset(this, e, t)
        });
        var n, r, s = {top: 0, left: 0}, o = this[0], u = o && o.ownerDocument;
        if (!u)return;
        return n = u.documentElement, w.contains(n, o) ? (typeof o.getBoundingClientRect !== i && (s = o.getBoundingClientRect()), r = sr(u), {top: s.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0), left: s.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)}) : s
    }, w.offset = {setOffset: function (e, t, n) {
        var r = w.css(e, "position");
        r === "static" && (e.style.position = "relative");
        var i = w(e), s = i.offset(), o = w.css(e, "top"), u = w.css(e, "left"), a = (r === "absolute" || r === "fixed") && w.inArray("auto", [o, u]) > -1, f = {}, l = {}, c, h;
        a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), w.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using"in t ? t.using.call(e, f) : i.css(f)
    }}, w.fn.extend({position: function () {
        if (!this[0])return;
        var e, t, n = {top: 0, left: 0}, r = this[0];
        return w.css(r, "position") === "fixed" ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), w.nodeName(e[0], "html") || (n = e.offset()), n.top += w.css(e[0], "borderTopWidth", !0), n.left += w.css(e[0], "borderLeftWidth", !0)), {top: t.top - n.top - w.css(r, "marginTop", !0), left: t.left - n.left - w.css(r, "marginLeft", !0)}
    }, offsetParent: function () {
        return this.map(function () {
            var e = this.offsetParent || u;
            while (e && !w.nodeName(e, "html") && w.css(e, "position") === "static")e = e.offsetParent;
            return e || u
        })
    }}), w.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, n) {
        var r = /Y/.test(n);
        w.fn[e] = function (i) {
            return w.access(this, function (e, i, s) {
                var o = sr(e);
                if (s === t)return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                o ? o.scrollTo(r ? w(o).scrollLeft() : s, r ? s : w(o).scrollTop()) : e[i] = s
            }, e, i, arguments.length, null)
        }
    }), w.each({Height: "height", Width: "width"}, function (e, n) {
        w.each({padding: "inner" + e, content: n, "": "outer" + e}, function (r, i) {
            w.fn[i] = function (i, s) {
                var o = arguments.length && (r || typeof i != "boolean"), u = r || (i === !0 || s === !0 ? "margin" : "border");
                return w.access(this, function (n, r, i) {
                    var s;
                    return w.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? w.css(n, r, u) : w.style(n, r, i, u)
                }, n, o ? i : t, o, null)
            }
        })
    }), w.fn.size = function () {
        return this.length
    }, w.fn.andSelf = w.fn.addBack, typeof module == "object" && module && typeof module.exports == "object" ? module.exports = w : (e.jQuery = e.$ = w, typeof define == "function" && define.amd && define("jquery", [], function () {
        return w
    }))
};
jQueryFn(window);
var origJQuery = window.jQuery;
window.mytt = window.mytt || {}, jQueryFn(window), mytt.$ = mytt.jQuery = jQuery.noConflict(!0), window.jQuery = origJQuery, function () {
    function C(e, t, n) {
        if (e === t)return e !== 0 || 1 / e == 1 / t;
        if (e == null || t == null)return e === t;
        e._chain && (e = e._wrapped), t._chain && (t = t._wrapped);
        if (e.isEqual && S.isFunction(e.isEqual))return e.isEqual(t);
        if (t.isEqual && S.isFunction(t.isEqual))return t.isEqual(e);
        var r = a.call(e);
        if (r != a.call(t))return!1;
        switch (r) {
            case"[object String]":
                return e == String(t);
            case"[object Number]":
                return e != +e ? t != +t : e == 0 ? 1 / e == 1 / t : e == +t;
            case"[object Date]":
            case"[object Boolean]":
                return+e == +t;
            case"[object RegExp]":
                return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
        }
        if (typeof e != "object" || typeof t != "object")return!1;
        var i = n.length;
        while (i--)if (n[i] == e)return!0;
        n.push(e);
        var s = 0, o = !0;
        if (r == "[object Array]") {
            s = e.length, o = s == t.length;
            if (o)while (s--)if (!(o = s in e == s in t && C(e[s], t[s], n)))break
        } else {
            if ("constructor"in e != "constructor"in t || e.constructor != t.constructor)return!1;
            for (var u in e)if (S.has(e, u)) {
                s++;
                if (!(o = S.has(t, u) && C(e[u], t[u], n)))break
            }
            if (o) {
                for (u in t)if (S.has(t, u) && !(s--))break;
                o = !s
            }
        }
        return n.pop(), o
    }

    var e = this, t = e._, n = {}, r = Array.prototype, i = Object.prototype, s = Function.prototype, o = r.slice, u = r.unshift, a = i.toString, f = i.hasOwnProperty, l = r.forEach, c = r.map, h = r.reduce, p = r.reduceRight, d = r.filter, v = r.every, m = r.some, g = r.indexOf, y = r.lastIndexOf, b = Array.isArray, w = Object.keys, E = s.bind, S = function (e) {
        return new P(e)
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = S), exports._ = S) : e._ = S, S.VERSION = "1.3.3";
    var x = S.each = S.forEach = function (e, t, r) {
        if (e == null)return;
        if (l && e.forEach === l)e.forEach(t, r); else if (e.length === +e.length) {
            for (var i = 0, s = e.length; i < s; i++)if (i in e && t.call(r, e[i], i, e) === n)return
        } else for (var o in e)if (S.has(e, o) && t.call(r, e[o], o, e) === n)return
    };
    S.map = S.collect = function (e, t, n) {
        var r = [];
        return e == null ? r : c && e.map === c ? e.map(t, n) : (x(e, function (e, i, s) {
            r[r.length] = t.call(n, e, i, s)
        }), e.length === +e.length && (r.length = e.length), r)
    }, S.reduce = S.foldl = S.inject = function (e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (h && e.reduce === h)return r && (t = S.bind(t, r)), i ? e.reduce(t, n) : e.reduce(t);
        x(e, function (e, s, o) {
            i ? n = t.call(r, n, e, s, o) : (n = e, i = !0)
        });
        if (!i)throw new TypeError("Reduce of empty array with no initial value");
        return n
    }, S.reduceRight = S.foldr = function (e, t, n, r) {
        var i = arguments.length > 2;
        e == null && (e = []);
        if (p && e.reduceRight === p)return r && (t = S.bind(t, r)), i ? e.reduceRight(t, n) : e.reduceRight(t);
        var s = S.toArray(e).reverse();
        return r && !i && (t = S.bind(t, r)), i ? S.reduce(s, t, n, r) : S.reduce(s, t)
    }, S.find = S.detect = function (e, t, n) {
        var r;
        return T(e, function (e, i, s) {
            if (t.call(n, e, i, s))return r = e, !0
        }), r
    }, S.filter = S.select = function (e, t, n) {
        var r = [];
        return e == null ? r : d && e.filter === d ? e.filter(t, n) : (x(e, function (e, i, s) {
            t.call(n, e, i, s) && (r[r.length] = e)
        }), r)
    }, S.reject = function (e, t, n) {
        var r = [];
        return e == null ? r : (x(e, function (e, i, s) {
            t.call(n, e, i, s) || (r[r.length] = e)
        }), r)
    }, S.every = S.all = function (e, t, r) {
        var i = !0;
        return e == null ? i : v && e.every === v ? e.every(t, r) : (x(e, function (e, s, o) {
            if (!(i = i && t.call(r, e, s, o)))return n
        }), !!i)
    };
    var T = S.some = S.any = function (e, t, r) {
        t || (t = S.identity);
        var i = !1;
        return e == null ? i : m && e.some === m ? e.some(t, r) : (x(e, function (e, s, o) {
            if (i || (i = t.call(r, e, s, o)))return n
        }), !!i)
    };
    S.include = S.contains = function (e, t) {
        var n = !1;
        return e == null ? n : g && e.indexOf === g ? e.indexOf(t) != -1 : (n = T(e, function (e) {
            return e === t
        }), n)
    }, S.invoke = function (e, t) {
        var n = o.call(arguments, 2);
        return S.map(e, function (e) {
            return(S.isFunction(t) ? t || e : e[t]).apply(e, n)
        })
    }, S.pluck = function (e, t) {
        return S.map(e, function (e) {
            return e[t]
        })
    }, S.where = function (e, t, n) {
        return S.isEmpty(t) ? n ? void 0 : [] : S[n ? "find" : "filter"](e, function (e) {
            for (var n in t)if (t[n] !== e[n])return!1;
            return!0
        })
    }, S.findWhere = function (e, t) {
        return S.where(e, t, !0)
    }, S.max = function (e, t, n) {
        if (!t && S.isArray(e) && e[0] === +e[0])return Math.max.apply(Math, e);
        if (!t && S.isEmpty(e))return-Infinity;
        var r = {computed: -Infinity};
        return x(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o >= r.computed && (r = {value: e, computed: o})
        }), r.value
    }, S.min = function (e, t, n) {
        if (!t && S.isArray(e) && e[0] === +e[0])return Math.min.apply(Math, e);
        if (!t && S.isEmpty(e))return Infinity;
        var r = {computed: Infinity};
        return x(e, function (e, i, s) {
            var o = t ? t.call(n, e, i, s) : e;
            o < r.computed && (r = {value: e, computed: o})
        }), r.value
    }, S.shuffle = function (e) {
        var t = [], n;
        return x(e, function (e, r, i) {
            n = Math.floor(Math.random() * (r + 1)), t[r] = t[n], t[n] = e
        }), t
    }, S.sortBy = function (e, t, n) {
        var r = S.isFunction(t) ? t : function (e) {
            return e[t]
        };
        return S.pluck(S.map(e, function (e, t, i) {
            return{value: e, criteria: r.call(n, e, t, i)}
        }).sort(function (e, t) {
            var n = e.criteria, r = t.criteria;
            return n === void 0 ? 1 : r === void 0 ? -1 : n < r ? -1 : n > r ? 1 : 0
        }), "value")
    }, S.groupBy = function (e, t) {
        var n = {}, r = S.isFunction(t) ? t : function (e) {
            return e[t]
        };
        return x(e, function (e, t) {
            var i = r(e, t);
            (n[i] || (n[i] = [])).push(e)
        }), n
    }, S.sortedIndex = function (e, t, n) {
        n || (n = S.identity);
        var r = 0, i = e.length;
        while (r < i) {
            var s = r + i >> 1;
            n(e[s]) < n(t) ? r = s + 1 : i = s
        }
        return r
    }, S.toArray = function (e) {
        return e ? S.isArray(e) ? o.call(e) : S.isArguments(e) ? o.call(e) : e.toArray && S.isFunction(e.toArray) ? e.toArray() : S.values(e) : []
    }, S.size = function (e) {
        return S.isArray(e) ? e.length : S.keys(e).length
    }, S.first = S.head = S.take = function (e, t, n) {
        return t != null && !n ? o.call(e, 0, t) : e[0]
    }, S.initial = function (e, t, n) {
        return o.call(e, 0, e.length - (t == null || n ? 1 : t))
    }, S.last = function (e, t, n) {
        return t != null && !n ? o.call(e, Math.max(e.length - t, 0)) : e[e.length - 1]
    }, S.rest = S.tail = function (e, t, n) {
        return o.call(e, t == null || n ? 1 : t)
    }, S.compact = function (e) {
        return S.filter(e, function (e) {
            return!!e
        })
    }, S.flatten = function (e, t) {
        return S.reduce(e, function (e, n) {
            return S.isArray(n) ? e.concat(t ? n : S.flatten(n)) : (e[e.length] = n, e)
        }, [])
    }, S.without = function (e) {
        return S.difference(e, o.call(arguments, 1))
    }, S.uniq = S.unique = function (e, t, n) {
        var r = n ? S.map(e, n) : e, i = [];
        return e.length < 3 && (t = !0), S.reduce(r, function (n, r, s) {
            if (t ? S.last(n) !== r || !n.length : !S.include(n, r))n.push(r), i.push(e[s]);
            return n
        }, []), i
    }, S.union = function () {
        return S.uniq(S.flatten(arguments, !0))
    }, S.intersection = S.intersect = function (e) {
        var t = o.call(arguments, 1);
        return S.filter(S.uniq(e), function (e) {
            return S.every(t, function (t) {
                return S.indexOf(t, e) >= 0
            })
        })
    }, S.difference = function (e) {
        var t = S.flatten(o.call(arguments, 1), !0);
        return S.filter(e, function (e) {
            return!S.include(t, e)
        })
    }, S.zip = function () {
        var e = o.call(arguments), t = S.max(S.pluck(e, "length")), n = new Array(t);
        for (var r = 0; r < t; r++)n[r] = S.pluck(e, "" + r);
        return n
    }, S.indexOf = function (e, t, n) {
        if (e == null)return-1;
        var r, i;
        if (n)return r = S.sortedIndex(e, t), e[r] === t ? r : -1;
        if (g && e.indexOf === g)return e.indexOf(t);
        for (r = 0, i = e.length; r < i; r++)if (r in e && e[r] === t)return r;
        return-1
    }, S.lastIndexOf = function (e, t) {
        if (e == null)return-1;
        if (y && e.lastIndexOf === y)return e.lastIndexOf(t);
        var n = e.length;
        while (n--)if (n in e && e[n] === t)return n;
        return-1
    }, S.range = function (e, t, n) {
        arguments.length <= 1 && (t = e || 0, e = 0), n = arguments[2] || 1;
        var r = Math.max(Math.ceil((t - e) / n), 0), i = 0, s = new Array(r);
        while (i < r)s[i++] = e, e += n;
        return s
    };
    var N = function () {
    };
    S.bind = function (t, n) {
        var r, i;
        if (t.bind === E && E)return E.apply(t, o.call(arguments, 1));
        if (!S.isFunction(t))throw new TypeError;
        return i = o.call(arguments, 2), r = function () {
            if (this instanceof r) {
                N.prototype = t.prototype;
                var e = new N, s = t.apply(e, i.concat(o.call(arguments)));
                return Object(s) === s ? s : e
            }
            return t.apply(n, i.concat(o.call(arguments)))
        }
    }, S.bindAll = function (e) {
        var t = o.call(arguments, 1);
        return t.length == 0 && (t = S.functions(e)), x(t, function (t) {
            e[t] = S.bind(e[t], e)
        }), e
    }, S.memoize = function (e, t) {
        var n = {};
        return t || (t = S.identity), function () {
            var r = t.apply(this, arguments);
            return S.has(n, r) ? n[r] : n[r] = e.apply(this, arguments)
        }
    }, S.delay = function (e, t) {
        var n = o.call(arguments, 2);
        return setTimeout(function () {
            return e.apply(null, n)
        }, t)
    }, S.defer = function (e) {
        return S.delay.apply(S, [e, 1].concat(o.call(arguments, 1)))
    }, S.throttle = function (e, t) {
        var n, r, i, s, o, u, a = S.debounce(function () {
            o = s = !1
        }, t);
        return function () {
            n = this, r = arguments;
            var f = function () {
                i = null, o && e.apply(n, r), a()
            };
            return i || (i = setTimeout(f, t)), s ? o = !0 : u = e.apply(n, r), a(), s = !0, u
        }
    }, S.debounce = function (e, t, n) {
        var r;
        return function () {
            var i = this, s = arguments, o = function () {
                r = null, n || e.apply(i, s)
            };
            n && !r && e.apply(i, s), clearTimeout(r), r = setTimeout(o, t)
        }
    }, S.once = function (e) {
        var t = !1, n;
        return function () {
            return t ? n : (t = !0, n = e.apply(this, arguments))
        }
    }, S.wrap = function (e, t) {
        return function () {
            var n = [e].concat(o.call(arguments, 0));
            return t.apply(this, n)
        }
    }, S.compose = function () {
        var e = arguments;
        return function () {
            var t = arguments;
            for (var n = e.length - 1; n >= 0; n--)t = [e[n].apply(this, t)];
            return t[0]
        }
    }, S.after = function (e, t) {
        return e <= 0 ? t() : function () {
            if (--e < 1)return t.apply(this, arguments)
        }
    }, S.keys = w || function (e) {
        if (e !== Object(e))throw new TypeError("Invalid object");
        var t = [];
        for (var n in e)S.has(e, n) && (t[t.length] = n);
        return t
    }, S.values = function (e) {
        return S.map(e, S.identity)
    }, S.functions = S.methods = function (e) {
        var t = [];
        for (var n in e)S.isFunction(e[n]) && t.push(n);
        return t.sort()
    }, S.extend = function (e) {
        return x(o.call(arguments, 1), function (t) {
            for (var n in t)e[n] = t[n]
        }), e
    }, S.pick = function (e) {
        var t = {};
        return x(S.flatten(o.call(arguments, 1)), function (n) {
            n in e && (t[n] = e[n])
        }), t
    }, S.defaults = function (e) {
        return x(o.call(arguments, 1), function (t) {
            for (var n in t)e[n] == null && (e[n] = t[n])
        }), e
    }, S.clone = function (e) {
        return S.isObject(e) ? S.isArray(e) ? e.slice() : S.extend({}, e) : e
    }, S.tap = function (e, t) {
        return t(e), e
    }, S.isEqual = function (e, t) {
        return C(e, t, [])
    }, S.isEmpty = function (e) {
        if (e == null)return!0;
        if (S.isArray(e) || S.isString(e))return e.length === 0;
        for (var t in e)if (S.has(e, t))return!1;
        return!0
    }, S.isElement = function (e) {
        return!!e && e.nodeType == 1
    }, S.isArray = b || function (e) {
        return a.call(e) == "[object Array]"
    }, S.isObject = function (e) {
        return e === Object(e)
    }, S.isArguments = function (e) {
        return a.call(e) == "[object Arguments]"
    }, S.isArguments(arguments) || (S.isArguments = function (e) {
        return!!e && !!S.has(e, "callee")
    }), S.isFunction = function (e) {
        return a.call(e) == "[object Function]"
    }, S.isString = function (e) {
        return a.call(e) == "[object String]"
    }, S.isNumber = function (e) {
        return a.call(e) == "[object Number]"
    }, S.isFinite = function (e) {
        return S.isNumber(e) && isFinite(e)
    }, S.isNaN = function (e) {
        return e !== e
    }, S.isBoolean = function (e) {
        return e === !0 || e === !1 || a.call(e) == "[object Boolean]"
    }, S.isDate = function (e) {
        return a.call(e) == "[object Date]"
    }, S.isRegExp = function (e) {
        return a.call(e) == "[object RegExp]"
    }, S.isNull = function (e) {
        return e === null
    }, S.isUndefined = function (e) {
        return e === void 0
    }, S.has = function (e, t) {
        return f.call(e, t)
    }, S.noConflict = function () {
        return e._ = t, this
    }, S.identity = function (e) {
        return e
    }, S.times = function (e, t, n) {
        for (var r = 0; r < e; r++)t.call(n, r)
    }, S.escape = function (e) {
        return("" + e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    }, S.result = function (e, t) {
        if (e == null)return null;
        var n = e[t];
        return S.isFunction(n) ? n.call(e) : n
    }, S.mixin = function (e) {
        x(S.functions(e), function (t) {
            B(t, S[t] = e[t])
        })
    };
    var k = 0;
    S.uniqueId = function (e) {
        var t = k++;
        return e ? e + t : t
    }, S.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var L = /.^/, A = {"\\": "\\", "'": "'", r: "\r", n: "\n", t: "	", u2028: "\u2028", u2029: "\u2029"};
    for (var O in A)A[A[O]] = O;
    var M = /\\|'|\r|\n|\t|\u2028|\u2029/g, _ = /\\(\\|'|r|n|t|u2028|u2029)/g, D = function (e) {
        return e.replace(_, function (e, t) {
            return A[t]
        })
    };
    S.template = function (e, t, n) {
        n = S.defaults(n || {}, S.templateSettings);
        var r = "__p+='" + e.replace(M, function (e) {
            return"\\" + A[e]
        }).replace(n.escape || L, function (e, t) {
            return"'+\n_.escape(" + D(t) + ")+\n'"
        }).replace(n.interpolate || L, function (e, t) {
            return"'+\n(" + D(t) + ")+\n'"
        }).replace(n.evaluate || L, function (e, t) {
            return"';\n" + D(t) + "\n;__p+='"
        }) + "';\n";
        n.variable || (r = "with(obj||{}){\n" + r + "}\n"), r = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + r + "return __p;\n";
        var i = new Function(n.variable || "obj", "_", r);
        if (t)return i(t, S);
        var s = function (e) {
            return i.call(this, e, S)
        };
        return s.source = "function(" + (n.variable || "obj") + "){\n" + r + "}", s
    }, S.chain = function (e) {
        return S(e).chain()
    };
    var P = function (e) {
        this._wrapped = e
    };
    S.prototype = P.prototype;
    var H = function (e, t) {
        return t ? S(e).chain() : e
    }, B = function (e, t) {
        P.prototype[e] = function () {
            var e = o.call(arguments);
            return u.call(e, this._wrapped), H(t.apply(S, e), this._chain)
        }
    };
    S.mixin(S), x(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
        var t = r[e];
        P.prototype[e] = function () {
            var n = this._wrapped;
            t.apply(n, arguments);
            var r = n.length;
            return(e == "shift" || e == "splice") && r === 0 && delete n[0], H(n, this._chain)
        }
    }), x(["concat", "join", "slice"], function (e) {
        var t = r[e];
        P.prototype[e] = function () {
            return H(t.apply(this._wrapped, arguments), this._chain)
        }
    }), P.prototype.chain = function () {
        return this._chain = !0, this
    }, P.prototype.value = function () {
        return this._wrapped
    }
}.call(this), define("underscore", function (e) {
    return function () {
        var t, n;
        return t || e._
    }
}(this));
var cookieFn = function (e, t) {
    function r(e) {
        return a.raw ? e : encodeURIComponent(e)
    }

    function i(e) {
        return a.raw ? e : decodeURIComponent(e)
    }

    function s(e) {
        return r(a.json ? JSON.stringify(e) : String(e))
    }

    function o(e) {
        e.indexOf('"') === 0 && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return e = decodeURIComponent(e.replace(n, " ")), a.json ? JSON.parse(e) : e
        } catch (t) {
        }
    }

    function u(t, n) {
        var r = a.raw ? t : o(t);
        return e.isFunction(n) ? n(r) : r
    }

    var n = /\+/g, a = e.cookie = function (n, o, f) {
        if (o !== undefined && !e.isFunction(o)) {
            f = e.extend({}, a.defaults, f);
            if (typeof f.expires == "number") {
                var l = f.expires, c = f.expires = new Date;
                c.setTime(+c + l * 864e5)
            }
            return t.cookie = [r(n), "=", s(o), f.expires ? "; expires=" + f.expires.toUTCString() : "", f.path ? "; path=" + f.path : "", f.domain ? "; domain=" + f.domain : "", f.secure ? "; secure" : ""].join("")
        }
        var h = n ? undefined : {}, p = t.cookie ? t.cookie.split("; ") : [];
        for (var d = 0, v = p.length; d < v; d++) {
            var m = p[d].split("="), g = i(m.shift()), y = m.join("=");
            if (n && n === g) {
                h = u(y, o);
                break
            }
            !n && (y = u(y)) !== undefined && (h[g] = y)
        }
        return h
    };
    a.defaults = {}, e.removeCookie = function (t, n) {
        return e.cookie(t) === undefined ? !1 : (e.cookie(t, "", e.extend({}, n, {expires: -1})), !e.cookie(t))
    }
};
cookieFn(jQuery, document), cookieFn(mytt.jQuery, document), define("jquery-cookie", ["jquery"], function () {
}), function ($) {
    $.timer = function (func, time, autostart) {
        return this.set = function (func, time, autostart) {
            this.init = !0;
            if (typeof func == "object") {
                var paramList = ["autostart", "time"];
                for (var arg in paramList)func[paramList[arg]] != undefined && eval(paramList[arg] + " = func[paramList[arg]]");
                func = func.action
            }
            return typeof func == "function" && (this.action = func), isNaN(time) || (this.intervalTime = time), autostart && !this.isActive && (this.isActive = !0, this.setTimer()), this
        }, this.once = function (e) {
            var t = this;
            return isNaN(e) && (e = 0), window.setTimeout(function () {
                t.action()
            }, e), this
        }, this.play = function (e) {
            return this.isActive || (e ? this.setTimer() : this.setTimer(this.remaining), this.isActive = !0), this
        }, this.pause = function () {
            return this.isActive && (this.isActive = !1, this.remaining -= new Date - this.last, this.clearTimer()), this
        }, this.stop = function () {
            return this.isActive = !1, this.remaining = this.intervalTime, this.clearTimer(), this
        }, this.toggle = function (e) {
            return this.isActive ? this.pause() : e ? this.play(!0) : this.play(), this
        }, this.reset = function () {
            return this.isActive = !1, this.play(!0), this
        }, this.clearTimer = function () {
            window.clearTimeout(this.timeoutObject)
        }, this.setTimer = function (e) {
            var t = this;
            if (typeof this.action != "function")return;
            isNaN(e) && (e = this.intervalTime), this.remaining = e, this.last = new Date, this.clearTimer(), this.timeoutObject = window.setTimeout(function () {
                t.go()
            }, e)
        }, this.go = function () {
            this.isActive && (this.action(), this.setTimer())
        }, this.init ? new $.timer(func, time, autostart) : (this.set(func, time, autostart), this)
    }
}(jQuery), define("jquery-timer", ["jquery"], function (e) {
    return function () {
        var t, n;
        return t || e.$.timer
    }
}(this)), function ()
{
    var e = this, t = e.Backbone, n = [], r = n.push, i = n.slice, s = n.splice, o;
    typeof exports != "undefined" ? o = exports : o = e.Backbone = {}, o.VERSION = "1.0.0";
    var u = e._;
    !u && typeof require != "undefined" && (u = require("underscore")), o.$ = e.jQuery || e.Zepto || e.ender || e.$, o.noConflict = function () {
        return e.Backbone = t, this
    }, o.emulateHTTP = !1, o.emulateJSON = !1;
    var a = o.Events = {on: function (e, t, n) {
        if (!l(this, "on", e, [t, n]) || !t)return this;
        this._events || (this._events = {});
        var r = this._events[e] || (this._events[e] = []);
        return r.push({callback: t, context: n, ctx: n || this}), this
    }, once: function (e, t, n) {
        if (!l(this, "once", e, [t, n]) || !t)return this;
        var r = this, i = u.once(function () {
            r.off(e, i), t.apply(this, arguments)
        });
        return i._callback = t, this.on(e, i, n)
    }, off: function (e, t, n) {
        var r, i, s, o, a, f, c, h;
        if (!this._events || !l(this, "off", e, [t, n]))return this;
        if (!e && !t && !n)return this._events = {}, this;
        o = e ? [e] : u.keys(this._events);
        for (a = 0, f = o.length; a < f; a++) {
            e = o[a];
            if (s = this._events[e]) {
                this._events[e] = r = [];
                if (t || n)for (c = 0, h = s.length; c < h; c++)i = s[c], (t && t !== i.callback && t !== i.callback._callback || n && n !== i.context) && r.push(i);
                r.length || delete this._events[e]
            }
        }
        return this
    }, trigger: function (e) {
        if (!this._events)return this;
        var t = i.call(arguments, 1);
        if (!l(this, "trigger", e, t))return this;
        var n = this._events[e], r = this._events.all;
        return n && c(n, t), r && c(r, arguments), this
    }, stopListening: function (e, t, n) {
        var r = this._listeners;
        if (!r)return this;
        var i = !t && !n;
        typeof t == "object" && (n = this), e && ((r = {})[e._listenerId] = e);
        for (var s in r)r[s].off(t, n, this), i && delete this._listeners[s];
        return this
    }}, f = /\s+/, l = function (e, t, n, r) {
        if (!n)return!0;
        if (typeof n == "object") {
            for (var i in n)e[t].apply(e, [i, n[i]].concat(r));
            return!1
        }
        if (f.test(n)) {
            var s = n.split(f);
            for (var o = 0, u = s.length; o < u; o++)e[t].apply(e, [s[o]].concat(r));
            return!1
        }
        return!0
    }, c = function (e, t) {
        var n, r = -1, i = e.length, s = t[0], o = t[1], u = t[2];
        switch (t.length) {
            case 0:
                while (++r < i)(n = e[r]).callback.call(n.ctx);
                return;
            case 1:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s);
                return;
            case 2:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s, o);
                return;
            case 3:
                while (++r < i)(n = e[r]).callback.call(n.ctx, s, o, u);
                return;
            default:
                while (++r < i)(n = e[r]).callback.apply(n.ctx, t)
        }
    }, h = {listenTo: "on", listenToOnce: "once"};
    u.each(h, function (e, t) {
        a[t] = function (t, n, r) {
            var i = this._listeners || (this._listeners = {}), s = t._listenerId || (t._listenerId = u.uniqueId("l"));
            return i[s] = t, typeof n == "object" && (r = this), t[e](n, r, this), this
        }
    }), a.bind = a.on, a.unbind = a.off, u.extend(o, a);
    var p = o.Model = function (e, t) {
        var n, r = e || {};
        t || (t = {}), this.cid = u.uniqueId("c"), this.attributes = {}, t.collection && (this.collection = t.collection), t.parse && (r = this.parse(r, t) || {}), t._attrs || (t._attrs = r);
        if (n = u.result(this, "defaults"))r = u.defaults({}, r, n);
        this.set(r, t), this.changed = {}, this.initialize.apply(this, arguments)
    };
    u.extend(p.prototype, a, {changed: null, validationError: null, idAttribute: "id", initialize: function () {
    }, toJSON: function (e) {
        return u.clone(this.attributes)
    }, sync: function () {
        return o.sync.apply(this, arguments)
    }, get: function (e) {
        return this.attributes[e]
    }, escape: function (e) {
        return u.escape(this.get(e))
    }, has: function (e) {
        return this.get(e) != null
    }, set: function (e, t, n) {
        var r, i, s, o, a, f, l, c;
        if (e == null)return this;
        typeof e == "object" ? (i = e, n = t) : (i = {})[e] = t, n || (n = {});
        if (!this._validate(i, n))return!1;
        s = n.unset, a = n.silent, o = [], f = this._changing, this._changing = !0, f || (this._previousAttributes = u.clone(this.attributes), this.changed = {}), c = this.attributes, l = this._previousAttributes, this.idAttribute in i && (this.id = i[this.idAttribute]);
        for (r in i)t = i[r], u.isEqual(c[r], t) || o.push(r), u.isEqual(l[r], t) ? delete this.changed[r] : this.changed[r] = t, s ? delete c[r] : c[r] = t;
        if (!a) {
            o.length && (this._pending = !0);
            for (var h = 0, p = o.length; h < p; h++)this.trigger("change:" + o[h], this, c[o[h]], n)
        }
        if (f)return this;
        if (!a)while (this._pending)this._pending = !1, this.trigger("change", this, n);
        return this._pending = !1, this._changing = !1, this
    }, unset: function (e, t) {
        return this.set(e, void 0, u.extend({}, t, {unset: !0}))
    }, clear: function (e) {
        var t = {};
        for (var n in this.attributes)t[n] = void 0;
        return this.set(t, u.extend({}, e, {unset: !0}))
    }, hasChanged: function (e) {
        return e == null ? !u.isEmpty(this.changed) : u.has(this.changed, e)
    }, changedAttributes: function (e) {
        if (!e)return this.hasChanged() ? u.clone(this.changed) : !1;
        var t, n = !1, r = this._changing ? this._previousAttributes : this.attributes;
        for (var i in e) {
            if (u.isEqual(r[i], t = e[i]))continue;
            (n || (n = {}))[i] = t
        }
        return n
    }, previous: function (e) {
        return e == null || !this._previousAttributes ? null : this._previousAttributes[e]
    }, previousAttributes: function () {
        return u.clone(this._previousAttributes)
    }, fetch: function (e) {
        e = e ? u.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
        var t = this, n = e.success;
        return e.success = function (r) {
            if (!t.set(t.parse(r, e), e))return!1;
            n && n(t, r, e), t.trigger("sync", t, r, e)
        }, j(this, e), this.sync("read", this, e)
    }, save: function (e, t, n) {
        var r, i, s, o = this.attributes;
        e == null || typeof e == "object" ? (r = e, n = t) : (r = {})[e] = t, n = u.extend({validate: !0}, n);
        if (r && !n.wait) {
            if (!this.set(r, n))return!1
        } else if (!this._validate(r, n))return!1;
        r && n.wait && (this.attributes = u.extend({}, o, r)), n.parse === void 0 && (n.parse = !0);
        var a = this, f = n.success;
        return n.success = function (e) {
            a.attributes = o;
            var t = a.parse(e, n);
            n.wait && (t = u.extend(r || {}, t));
            if (u.isObject(t) && !a.set(t, n))return!1;
            f && f(a, e, n), a.trigger("sync", a, e, n)
        }, j(this, n), i = this.isNew() ? "create" : n.patch ? "patch" : "update", i === "patch" && (n.attrs = r), s = this.sync(i, this, n), r && n.wait && (this.attributes = o), s
    }, destroy: function (e) {
        e = e ? u.clone(e) : {};
        var t = this, n = e.success, r = function () {
            t.trigger("destroy", t, t.collection, e)
        };
        e.success = function (i) {
            (e.wait || t.isNew()) && r(), n && n(t, i, e), t.isNew() || t.trigger("sync", t, i, e)
        };
        if (this.isNew())return e.success(), !1;
        j(this, e);
        var i = this.sync("delete", this, e);
        return e.wait || r(), i
    }, url: function () {
        var e = u.result(this, "urlRoot") || u.result(this.collection, "url") || B();
        return this.isNew() ? e : e + (e.charAt(e.length - 1) === "/" ? "" : "/") + encodeURIComponent(this.id)
    }, parse: function (e, t) {
        return e
    }, clone: function () {
        return new this.constructor(this.attributes)
    }, isNew: function () {
        return this.id == null
    }, isValid: function (e) {
        return this._validate({}, u.extend(e || {}, {validate: !0}))
    }, _validate: function (e, t) {
        if (!t.validate || !this.validate)return!0;
        e = u.extend({}, this.attributes, e);
        var n = this.validationError = this.validate(e, t) || null;
        return n ? (this.trigger("invalid", this, n, u.extend(t || {}, {validationError: n})), !1) : !0
    }});
    var d = ["keys", "values", "pairs", "invert", "pick", "omit"];
    u.each(d, function (e) {
        p.prototype[e] = function () {
            var t = i.call(arguments);
            return t.unshift(this.attributes), u[e].apply(u, t)
        }
    });
    var v = o.Collection = function (e, t) {
        t || (t = {}), t.model && (this.model = t.model), t.comparator !== void 0 && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, u.extend({silent: !0}, t))
    }, m = {add: !0, remove: !0, merge: !0}, g = {add: !0, remove: !1};
    u.extend(v.prototype, a, {model: p, initialize: function () {
    }, toJSON: function (e) {
        return this.map(function (t) {
            return t.toJSON(e)
        })
    }, sync: function () {
        return o.sync.apply(this, arguments)
    }, add: function (e, t) {
        return this.set(e, u.extend({merge: !1}, t, g))
    }, remove: function (e, t) {
        e = u.isArray(e) ? e.slice() : [e], t || (t = {});
        var n, r, i, s;
        for (n = 0, r = e.length; n < r; n++) {
            s = this.get(e[n]);
            if (!s)continue;
            delete this._byId[s.id], delete this._byId[s.cid], i = this.indexOf(s), this.models.splice(i, 1), this.length--, t.silent || (t.index = i, s.trigger("remove", s, this, t)), this._removeReference(s)
        }
        return this
    }, set: function (e, t) {
        t = u.defaults({}, t, m), t.parse && (e = this.parse(e, t)), u.isArray(e) || (e = e ? [e] : []);
        var n, i, o, a, f, l, c = t.at, h = this.comparator && c == null && t.sort !== !1, p = u.isString(this.comparator) ? this.comparator : null, d = [], v = [], g = {}, y = t.add, b = t.merge, w = t.remove, E = !h && y && w ? [] : !1;
        for (n = 0, i = e.length; n < i; n++) {
            if (!(o = this._prepareModel(a = e[n], t)))continue;
            (f = this.get(o)) ? (w && (g[f.cid] = !0), b && (a = a === o ? o.attributes : t._attrs, f.set(a, t), h && !l && f.hasChanged(p) && (l = !0))) : y && (d.push(o), o.on("all", this._onModelEvent, this), this._byId[o.cid] = o, o.id != null && (this._byId[o.id] = o)), E && E.push(f || o), delete t._attrs
        }
        if (w) {
            for (n = 0, i = this.length; n < i; ++n)g[(o = this.models[n]).cid] || v.push(o);
            v.length && this.remove(v, t)
        }
        if (d.length || E && E.length)h && (l = !0), this.length += d.length, c != null ? s.apply(this.models, [c, 0].concat(d)) : (E && (this.models.length = 0), r.apply(this.models, E || d));
        l && this.sort({silent: !0});
        if (t.silent)return this;
        for (n = 0, i = d.length; n < i; n++)(o = d[n]).trigger("add", o, this, t);
        return(l || E && E.length) && this.trigger("sort", this, t), this
    }, reset: function (e, t) {
        t || (t = {});
        for (var n = 0, r = this.models.length; n < r; n++)this._removeReference(this.models[n]);
        return t.previousModels = this.models, this._reset(), this.add(e, u.extend({silent: !0}, t)), t.silent || this.trigger("reset", this, t), this
    }, push: function (e, t) {
        return e = this._prepareModel(e, t), this.add(e, u.extend({at: this.length}, t)), e
    }, pop: function (e) {
        var t = this.at(this.length - 1);
        return this.remove(t, e), t
    }, unshift: function (e, t) {
        return e = this._prepareModel(e, t), this.add(e, u.extend({at: 0}, t)), e
    }, shift: function (e) {
        var t = this.at(0);
        return this.remove(t, e), t
    }, slice: function () {
        return i.apply(this.models, arguments)
    }, get: function (e) {
        return e == null ? void 0 : this._byId[e.id] || this._byId[e.cid] || this._byId[e]
    }, at: function (e) {
        return this.models[e]
    }, where: function (e, t) {
        return u.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function (t) {
            for (var n in e)if (e[n] !== t.get(n))return!1;
            return!0
        })
    }, findWhere: function (e) {
        return this.where(e, !0)
    }, sort: function (e) {
        if (!this.comparator)throw new Error("Cannot sort a set without a comparator");
        return e || (e = {}), u.isString(this.comparator) || this.comparator.length === 1 ? this.models = this.sortBy(this.comparator, this) : this.models.sort(u.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
    }, sortedIndex: function (e, t, n) {
        t || (t = this.comparator);
        var r = u.isFunction(t) ? t : function (e) {
            return e.get(t)
        };
        return u.sortedIndex(this.models, e, r, n)
    }, pluck: function (e) {
        return u.invoke(this.models, "get", e)
    }, fetch: function (e) {
        e = e ? u.clone(e) : {}, e.parse === void 0 && (e.parse = !0);
        var t = e.success, n = this;
        return e.success = function (r) {
            var i = e.reset ? "reset" : "set";
            n[i](r, e), t && t(n, r, e), n.trigger("sync", n, r, e)
        }, j(this, e), this.sync("read", this, e)
    }, create: function (e, t) {
        t = t ? u.clone(t) : {};
        if (!(e = this._prepareModel(e, t)))return!1;
        t.wait || this.add(e, t);
        var n = this, r = t.success;
        return t.success = function (e, t, i) {
            i.wait && n.add(e, i), r && r(e, t, i)
        }, e.save(null, t), e
    }, parse: function (e, t) {
        return e
    }, clone: function () {
        return new this.constructor(this.models)
    }, _reset: function () {
        this.length = 0, this.models = [], this._byId = {}
    }, _prepareModel: function (e, t) {
        if (e instanceof p)return e.collection || (e.collection = this), e;
        t || (t = {}), t.collection = this;
        var n = new this.model(e, t);
        return n.validationError ? (this.trigger("invalid", this, e, t), !1) : n
    }, _removeReference: function (e) {
        this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
    }, _onModelEvent: function (e, t, n, r) {
        if ((e === "add" || e === "remove") && n !== this)return;
        e === "destroy" && this.remove(t, r), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], t.id != null && (this._byId[t.id] = t)), this.trigger.apply(this, arguments)
    }});
    var y = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
    u.each(y, function (e) {
        v.prototype[e] = function () {
            var t = i.call(arguments);
            return t.unshift(this.models), u[e].apply(u, t)
        }
    });
    var b = ["groupBy", "countBy", "sortBy"];
    u.each(b, function (e) {
        v.prototype[e] = function (t, n) {
            var r = u.isFunction(t) ? t : function (e) {
                return e.get(t)
            };
            return u[e](this.models, r, n)
        }
    });
    var w = o.View = function (e) {
        this.cid = u.uniqueId("view"), e || (e = {}), u.extend(this, u.pick(e, S)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
    }, E = /^(\S+)\s*(.*)$/, S = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
    u.extend(w.prototype, a, {tagName: "div", $: function (e) {
        return this.$el.find(e)
    }, initialize: function () {
    }, render: function () {
        return this
    }, remove: function () {
        return this.$el.remove(), this.stopListening(), this
    }, setElement: function (e, t) {
        return this.$el && this.undelegateEvents(), this.$el = e instanceof o.$ ? e : o.$(e), this.el = this.$el[0], t !== !1 && this.delegateEvents(), this
    }, delegateEvents: function (e) {
        if (!e && !(e = u.result(this, "events")))return this;
        this.undelegateEvents();
        for (var t in e) {
            var n = e[t];
            u.isFunction(n) || (n = this[e[t]]);
            if (!n)continue;
            var r = t.match(E), i = r[1], s = r[2];
            n = u.bind(n, this), i += ".delegateEvents" + this.cid, s === "" ? this.$el.on(i, n) : this.$el.on(i, s, n)
        }
        return this
    }, undelegateEvents: function () {
        return this.$el.off(".delegateEvents" + this.cid), this
    }, _ensureElement: function () {
        if (!this.el) {
            var e = u.extend({}, u.result(this, "attributes"));
            this.id && (e.id = u.result(this, "id")), this.className && (e["class"] = u.result(this, "className"));
            var t = o.$("<" + u.result(this, "tagName") + ">").attr(e);
            this.setElement(t, !1)
        } else this.setElement(u.result(this, "el"), !1)
    }}), o.sync = function (e, t, n) {
        var r = T[e];
        u.defaults(n || (n = {}), {emulateHTTP: o.emulateHTTP, emulateJSON: o.emulateJSON});
        var i = {type: r, dataType: "json"};
        n.url || (i.url = u.result(t, "url") || B()), n.data == null && t && (e === "create" || e === "update" || e === "patch") && (i.contentType = "application/json", i.data = JSON.stringify(n.attrs || t.toJSON(n))), n.emulateJSON && (i.contentType = "application/x-www-form-urlencoded", i.data = i.data ? {model: i.data} : {});
        if (n.emulateHTTP && (r === "PUT" || r === "DELETE" || r === "PATCH")) {
            i.type = "POST", n.emulateJSON && (i.data._method = r);
            var s = n.beforeSend;
            n.beforeSend = function (e) {
                e.setRequestHeader("X-HTTP-Method-Override", r);
                if (s)return s.apply(this, arguments)
            }
        }
        i.type !== "GET" && !n.emulateJSON && (i.processData = !1), i.type === "PATCH" && x && (i.xhr = function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        });
        var a = n.xhr = o.ajax(u.extend(i, n));
        return t.trigger("request", t, a, n), a
    };
    var x = typeof window != "undefined" && !!window.ActiveXObject && (!window.XMLHttpRequest || !(new XMLHttpRequest).dispatchEvent), T = {create: "POST", update: "PUT", patch: "PATCH", "delete": "DELETE", read: "GET"};
    o.ajax = function () {
        return o.$.ajax.apply(o.$, arguments)
    };
    var N = o.Router = function (e) {
        e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    }, C = /\((.*?)\)/g, k = /(\(\?)?:\w+/g, L = /\*\w+/g, A = /[\-{}\[\]+?.,\\\^$|#\s]/g;
    u.extend(N.prototype, a, {initialize: function () {
    }, route: function (e, t, n) {
        u.isRegExp(e) || (e = this._routeToRegExp(e)), u.isFunction(t) && (n = t, t = ""), n || (n = this[t]);
        var r = this;
        return o.history.route(e, function (i) {
            var s = r._extractParameters(e, i);
            n && n.apply(r, s), r.trigger.apply(r, ["route:" + t].concat(s)), r.trigger("route", t, s), o.history.trigger("route", r, t, s)
        }), this
    }, navigate: function (e, t) {
        return o.history.navigate(e, t), this
    }, _bindRoutes: function () {
        if (!this.routes)return;
        this.routes = u.result(this, "routes");
        var e, t = u.keys(this.routes);
        while ((e = t.pop()) != null)this.route(e, this.routes[e])
    }, _routeToRegExp: function (e) {
        return e = e.replace(A, "\\$&").replace(C, "(?:$1)?").replace(k, function (e, t) {
            return t ? e : "([^/]+)"
        }).replace(L, "(.*?)"), new RegExp("^" + e + "$")
    }, _extractParameters: function (e, t) {
        var n = e.exec(t).slice(1);
        return u.map(n, function (e) {
            return e ? decodeURIComponent(e) : null
        })
    }});
    var O = o.History = function () {
        this.handlers = [], u.bindAll(this, "checkUrl"), typeof window != "undefined" && (this.location = window.location, this.history = window.history)
    }, M = /^[#\/]|\s+$/g, _ = /^\/+|\/+$/g, D = /msie [\w.]+/, P = /\/$/;
    O.started = !1, u.extend(O.prototype, a, {interval: 50, getHash: function (e) {
        var t = (e || this).location.href.match(/#(.*)$/);
        return t ? t[1] : ""
    }, getFragment: function (e, t) {
        if (e == null)if (this._hasPushState || !this._wantsHashChange || t) {
            e = this.location.pathname;
            var n = this.root.replace(P, "");
            e.indexOf(n) || (e = e.substr(n.length))
        } else e = this.getHash();
        return e.replace(M, "")
    }, start: function (e) {
        if (O.started)throw new Error("Backbone.history has already been started");
        O.started = !0, this.options = u.extend({}, {root: "/"}, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
        var t = this.getFragment(), n = document.documentMode, r = D.exec(navigator.userAgent.toLowerCase()) && (!n || n <= 7);
        this.root = ("/" + this.root + "/").replace(_, "/"), r && this._wantsHashChange && (this.iframe = o.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? o.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange"in window && !r ? o.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = t;
        var i = this.location, s = i.pathname.replace(/[^\/]$/, "$&/") === this.root;
        if (this._wantsHashChange && this._wantsPushState) {
            if (!this._hasPushState && !s)return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
            this._hasPushState && s && i.hash && (this.fragment = this.getHash().replace(M, ""), this.history.replaceState({}, document.title, this.root + this.fragment + i.search))
        }
        if (!this.options.silent)return this.loadUrl()
    }, stop: function () {
        o.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), O.started = !1
    }, route: function (e, t) {
        this.handlers.unshift({route: e, callback: t})
    }, checkUrl: function (e) {
        var t = this.getFragment();
        t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe)));
        if (t === this.fragment)return!1;
        this.iframe && this.navigate(t), this.loadUrl()
    }, loadUrl: function (e) {
        var t = this.fragment = this.getFragment(e);
        return u.any(this.handlers, function (e) {
            if (e.route.test(t))return e.callback(t), !0
        })
    }, navigate: function (e, t) {
        if (!O.started)return!1;
        if (!t || t === !0)t = {trigger: t};
        e = this.getFragment(e || "");
        if (this.fragment === e)return;
        this.fragment = e;
        var n = this.root + e;
        if (this._hasPushState)this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n); else {
            if (!this._wantsHashChange)return this.location.assign(n);
            this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
        }
        if (t.trigger)return this.loadUrl(e)
    }, _updateHash: function (e, t, n) {
        if (n) {
            var r = e.href.replace(/(javascript:|#).*$/, "");
            e.replace(r + "#" + t)
        } else e.hash = "#" + t
    }}), o.history = new O;
    var H = function (e, t) {
        var n = this, r;
        e && u.has(e, "constructor") ? r = e.constructor : r = function () {
            return n.apply(this, arguments)
        }, u.extend(r, n, t);
        var i = function () {
            this.constructor = r
        };
        return i.prototype = n.prototype, r.prototype = new i, e && u.extend(r.prototype, e), r.__super__ = n.prototype, r
    };
    p.extend = v.extend = N.extend = w.extend = O.extend = H;
    var B = function () {
        throw new Error('A "url" property or function must be specified')
    }, j = function (e, t) {
        var n = t.error;
        t.error = function (r) {
            n && n(e, r, t), e.trigger("error", e, r, t)
        }
    }
}.call(this), define("backbone", ["underscore", "jquery", "jquery-cookie", "jquery-timer"], function (e) {
    return function () {
        var t, n;
        return t || e.Backbone
    }
}(this)), Backbone.Validation = function (e) {
    var t = {forceUpdate: !1, selector: "name", labelFormatter: "sentenceCase", valid: Function.prototype, invalid: Function.prototype}, n = {formatLabel: function (e, n) {
        return a[t.labelFormatter](e, n)
    }, format: function () {
        var e = Array.prototype.slice.call(arguments), t = e.shift();
        return t.replace(/\{(\d+)\}/g, function (t, n) {
            return typeof e[n] != "undefined" ? e[n] : t
        })
    }}, r = function (t, n, i) {
        return n = n || {}, i = i || "", e.each(t, function (e, s) {
            t.hasOwnProperty(s) && (!e || typeof e != "object" || e instanceof Array || e instanceof Date || e instanceof RegExp || e instanceof Backbone.Model || e instanceof Backbone.Collection ? n[i + s] = e : r(e, n, i + s + "."))
        }), n
    }, i = function () {
        var i = function (t) {
            return e.reduce(e.keys(t.validation || {}), function (e, t) {
                return e[t] = void 0, e
            }, {})
        }, o = function (t, n) {
            var r = t.validation ? t.validation[n] || {} : {};
            if (e.isFunction(r) || e.isString(r))r = {fn: r};
            return e.isArray(r) || (r = [r]), e.reduce(r, function (t, n) {
                return e.each(e.without(e.keys(n), "msg"), function (e) {
                    t.push({fn: f[e], val: n[e], msg: n.msg})
                }), t
            }, [])
        }, u = function (t, r, i, s) {
            return e.reduce(o(t, r), function (o, u) {
                var a = e.extend({}, n, f), l = u.fn.call(a, i, r, u.val, t, s);
                return l === !1 || o === !1 ? !1 : l && !o ? u.msg || l : o
            }, "")
        }, a = function (t, n) {
            var i, s = {}, o = !0, a = e.clone(n), f = r(n);
            return e.each(f, function (e, n) {
                i = u(t, n, e, a), i && (s[n] = i, o = !1)
            }), {invalidAttrs: s, isValid: o}
        }, l = function (t, n) {
            return{preValidate: function (t, n) {
                return u(this, t, n, e.extend({}, this.attributes))
            }, isValid: function (t) {
                var n = r(this.attributes);
                return e.isString(t) ? !u(this, t, n[t], e.extend({}, this.attributes)) : e.isArray(t) ? e.reduce(t, function (t, r) {
                    return t && !u(this, r, n[r], e.extend({}, this.attributes))
                }, !0, this) : (t === !0 && this.validate(), this.validation ? this._isValid : !0)
            }, validate: function (s, o) {
                var u = this, f = !s, l = e.extend({}, n, o), c = i(u), h = e.extend({}, c, u.attributes, s), p = r(s || h), d = a(u, h);
                u._isValid = d.isValid, e.each(c, function (e, n) {
                    var r = d.invalidAttrs.hasOwnProperty(n);
                    r || l.valid(t, n, l.selector)
                }), e.each(c, function (e, n) {
                    var r = d.invalidAttrs.hasOwnProperty(n), i = p.hasOwnProperty(n);
                    r && (i || f) && l.invalid(t, n, d.invalidAttrs[n], l.selector)
                }), e.defer(function () {
                    u.trigger("validated", u._isValid, u, d.invalidAttrs), u.trigger("validated:" + (u._isValid ? "valid" : "invalid"), u, d.invalidAttrs)
                });
                if (!l.forceUpdate && e.intersection(e.keys(d.invalidAttrs), e.keys(p)).length > 0)return d.invalidAttrs
            }}
        }, c = function (t, n, r) {
            e.extend(n, l(t, r))
        }, h = function (e) {
            delete e.validate, delete e.preValidate, delete e.isValid
        }, p = function (e) {
            c(this.view, e, this.options)
        }, d = function (e) {
            h(e)
        };
        return{version: "0.8.1", configure: function (n) {
            e.extend(t, n)
        }, bind: function (n, r) {
            var i = n.model, o = n.collection;
            r = e.extend({}, t, s, r);
            if (typeof i == "undefined" && typeof o == "undefined")throw"Before you execute the binding your view must have a model or a collection.\nSee http://thedersen.com/projects/backbone-validation/#using-form-model-validation for more information.";
            i ? c(n, i, r) : o && (o.each(function (e) {
                c(n, e, r)
            }), o.bind("add", p, {view: n, options: r}), o.bind("remove", d))
        }, unbind: function (e) {
            var t = e.model, n = e.collection;
            t && h(e.model), n && (n.each(function (e) {
                h(e)
            }), n.unbind("add", p), n.unbind("remove", d))
        }, mixin: l(null, t)}
    }(), s = i.callbacks = {valid: function (e, t, n) {
        e.$("[" + n + '~="' + t + '"]').removeClass("invalid").removeAttr("data-error")
    }, invalid: function (e, t, n, r) {
        e.$("[" + r + '~="' + t + '"]').addClass("invalid").attr("data-error", n)
    }}, o = i.patterns = {digits: /^\d+$/, number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/, email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i}, u = i.messages = {required: "{0} is required", acceptance: "{0} must be accepted", min: "{0} must be greater than or equal to {1}", max: "{0} must be less than or equal to {1}", range: "{0} must be between {1} and {2}", length: "{0} must be {1} characters", minLength: "{0} must be at least {1} characters", maxLength: "{0} must be at most {1} characters", rangeLength: "{0} must be between {1} and {2} characters", oneOf: "{0} must be one of: {1}", equalTo: "{0} must be the same as {1}", pattern: "{0} must be a valid {1}"}, a = i.labelFormatters = {none: function (e) {
        return e
    }, sentenceCase: function (e) {
        return e.replace(/(?:^\w|[A-Z]|\b\w)/g, function (e, t) {
            return t === 0 ? e.toUpperCase() : " " + e.toLowerCase()
        }).replace(/_/g, " ")
    }, label: function (e, t) {
        return t.labels && t.labels[e] || a.sentenceCase(e, t)
    }}, f = i.validators = function () {
        var t = String.prototype.trim ? function (e) {
            return e === null ? "" : String.prototype.trim.call(e)
        } : function (e) {
            var t = /^\s+/, n = /\s+$/;
            return e === null ? "" : e.toString().replace(t, "").replace(n, "")
        }, n = function (t) {
            return e.isNumber(t) || e.isString(t) && t.match(o.number)
        }, r = function (n) {
            return!(e.isNull(n) || e.isUndefined(n) || e.isString(n) && t(n) === "" || e.isArray(n) && e.isEmpty(n))
        };
        return{fn: function (t, n, r, i, s) {
            return e.isString(r) && (r = i[r]), r.call(i, t, n, s)
        }, required: function (t, n, i, s, o) {
            var a = e.isFunction(i) ? i.call(s, t, n, o) : i;
            if (!a && !r(t))return!1;
            if (a && !r(t))return this.format(u.required, this.formatLabel(n, s))
        }, acceptance: function (t, n, r, i) {
            if (t !== "true" && (!e.isBoolean(t) || t === !1))return this.format(u.acceptance, this.formatLabel(n, i))
        }, min: function (e, t, r, i) {
            if (!n(e) || e < r)return this.format(u.min, this.formatLabel(t, i), r)
        }, max: function (e, t, r, i) {
            if (!n(e) || e > r)return this.format(u.max, this.formatLabel(t, i), r)
        }, range: function (e, t, r, i) {
            if (!n(e) || e < r[0] || e > r[1])return this.format(u.range, this.formatLabel(t, i), r[0], r[1])
        }, length: function (e, n, i, s) {
            if (!r(e) || t(e).length !== i)return this.format(u.length, this.formatLabel(n, s), i)
        }, minLength: function (e, n, i, s) {
            if (!r(e) || t(e).length < i)return this.format(u.minLength, this.formatLabel(n, s), i)
        }, maxLength: function (e, n, i, s) {
            if (!r(e) || t(e).length > i)return this.format(u.maxLength, this.formatLabel(n, s), i)
        }, rangeLength: function (e, n, i, s) {
            if (!r(e) || t(e).length < i[0] || t(e).length > i[1])return this.format(u.rangeLength, this.formatLabel(n, s), i[0], i[1])
        }, oneOf: function (t, n, r, i) {
            if (!e.include(r, t))return this.format(u.oneOf, this.formatLabel(n, i), r.join(", "))
        }, equalTo: function (e, t, n, r, i) {
            if (e !== i[n])return this.format(u.equalTo, this.formatLabel(t, r), this.formatLabel(n, r))
        }, pattern: function (e, t, n, i) {
            if (!r(e) || !e.toString().match(o[n] || n))return this.format(u.pattern, this.formatLabel(t, i), n)
        }}
    }();
    return i
}(_), define("validation", ["jquery", "backbone"], function () {
}), this.Handlebars = {}, function (e) {
    e.VERSION = "1.0.rc.1", e.helpers = {}, e.partials = {}, e.registerHelper = function (e, t, n) {
        n && (t.not = n), this.helpers[e] = t
    }, e.registerPartial = function (e, t) {
        this.partials[e] = t
    }, e.registerHelper("helperMissing", function (e) {
        if (arguments.length === 2)return undefined;
        throw new Error("Could not find property '" + e + "'")
    });
    var t = Object.prototype.toString, n = "[object Function]";
    e.registerHelper("blockHelperMissing", function (r, i) {
        var s = i.inverse || function () {
        }, o = i.fn, u = "", a = t.call(r);
        return a === n && (r = r.call(this)), r === !0 ? o(this) : r === !1 || r == null ? s(this) : a === "[object Array]" ? r.length > 0 ? e.helpers.each(r, i) : s(this) : o(r)
    }), e.K = function () {
    }, e.createFrame = Object.create || function (t) {
        e.K.prototype = t;
        var n = new e.K;
        return e.K.prototype = null, n
    }, e.registerHelper("each", function (t, n) {
        var r = n.fn, i = n.inverse, s = "", o;
        n.data && (o = e.createFrame(n.data));
        if (t && t.length > 0)for (var u = 0, a = t.length; u < a; u++)o && (o.index = u), s += r(t[u], {data: o}); else s = i(this);
        return s
    }), e.registerHelper("if", function (r, i) {
        var s = t.call(r);
        return s === n && (r = r.call(this)), !r || e.Utils.isEmpty(r) ? i.inverse(this) : i.fn(this)
    }), e.registerHelper("unless", function (t, n) {
        var r = n.fn, i = n.inverse;
        return n.fn = i, n.inverse = r, e.helpers["if"].call(this, t, n)
    }), e.registerHelper("with", function (e, t) {
        return t.fn(e)
    }), e.registerHelper("log", function (t) {
        e.log(t)
    })
}(this.Handlebars);
var handlebars = function () {
    function n() {
        this.yy = {}
    }

    var e = {trace: function () {
    }, yy: {}, symbols_: {error: 2, root: 3, program: 4, EOF: 5, statements: 6, simpleInverse: 7, statement: 8, openInverse: 9, closeBlock: 10, openBlock: 11, mustache: 12, partial: 13, CONTENT: 14, COMMENT: 15, OPEN_BLOCK: 16, inMustache: 17, CLOSE: 18, OPEN_INVERSE: 19, OPEN_ENDBLOCK: 20, path: 21, OPEN: 22, OPEN_UNESCAPED: 23, OPEN_PARTIAL: 24, params: 25, hash: 26, DATA: 27, param: 28, STRING: 29, INTEGER: 30, BOOLEAN: 31, hashSegments: 32, hashSegment: 33, ID: 34, EQUALS: 35, pathSegments: 36, SEP: 37, $accept: 0, $end: 1}, terminals_: {2: "error", 5: "EOF", 14: "CONTENT", 15: "COMMENT", 16: "OPEN_BLOCK", 18: "CLOSE", 19: "OPEN_INVERSE", 20: "OPEN_ENDBLOCK", 22: "OPEN", 23: "OPEN_UNESCAPED", 24: "OPEN_PARTIAL", 27: "DATA", 29: "STRING", 30: "INTEGER", 31: "BOOLEAN", 34: "ID", 35: "EQUALS", 37: "SEP"}, productions_: [0, [3, 2], [4, 3], [4, 1], [4, 0], [6, 1], [6, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 3], [13, 4], [7, 2], [17, 3], [17, 2], [17, 2], [17, 1], [17, 1], [25, 2], [25, 1], [28, 1], [28, 1], [28, 1], [28, 1], [28, 1], [26, 1], [32, 2], [32, 1], [33, 3], [33, 3], [33, 3], [33, 3], [33, 3], [21, 1], [36, 3], [36, 1]], performAction: function (t, n, r, i, s, o, u) {
        var a = o.length - 1;
        switch (s) {
            case 1:
                return o[a - 1];
            case 2:
                this.$ = new i.ProgramNode(o[a - 2], o[a]);
                break;
            case 3:
                this.$ = new i.ProgramNode(o[a]);
                break;
            case 4:
                this.$ = new i.ProgramNode([]);
                break;
            case 5:
                this.$ = [o[a]];
                break;
            case 6:
                o[a - 1].push(o[a]), this.$ = o[a - 1];
                break;
            case 7:
                this.$ = new i.BlockNode(o[a - 2], o[a - 1].inverse, o[a - 1], o[a]);
                break;
            case 8:
                this.$ = new i.BlockNode(o[a - 2], o[a - 1], o[a - 1].inverse, o[a]);
                break;
            case 9:
                this.$ = o[a];
                break;
            case 10:
                this.$ = o[a];
                break;
            case 11:
                this.$ = new i.ContentNode(o[a]);
                break;
            case 12:
                this.$ = new i.CommentNode(o[a]);
                break;
            case 13:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                break;
            case 14:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                break;
            case 15:
                this.$ = o[a - 1];
                break;
            case 16:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1]);
                break;
            case 17:
                this.$ = new i.MustacheNode(o[a - 1][0], o[a - 1][1], !0);
                break;
            case 18:
                this.$ = new i.PartialNode(o[a - 1]);
                break;
            case 19:
                this.$ = new i.PartialNode(o[a - 2], o[a - 1]);
                break;
            case 20:
                break;
            case 21:
                this.$ = [[o[a - 2]].concat(o[a - 1]), o[a]];
                break;
            case 22:
                this.$ = [[o[a - 1]].concat(o[a]), null];
                break;
            case 23:
                this.$ = [
                    [o[a - 1]],
                    o[a]
                ];
                break;
            case 24:
                this.$ = [
                    [o[a]],
                    null
                ];
                break;
            case 25:
                this.$ = [
                    [new i.DataNode(o[a])],
                    null
                ];
                break;
            case 26:
                o[a - 1].push(o[a]), this.$ = o[a - 1];
                break;
            case 27:
                this.$ = [o[a]];
                break;
            case 28:
                this.$ = o[a];
                break;
            case 29:
                this.$ = new i.StringNode(o[a]);
                break;
            case 30:
                this.$ = new i.IntegerNode(o[a]);
                break;
            case 31:
                this.$ = new i.BooleanNode(o[a]);
                break;
            case 32:
                this.$ = new i.DataNode(o[a]);
                break;
            case 33:
                this.$ = new i.HashNode(o[a]);
                break;
            case 34:
                o[a - 1].push(o[a]), this.$ = o[a - 1];
                break;
            case 35:
                this.$ = [o[a]];
                break;
            case 36:
                this.$ = [o[a - 2], o[a]];
                break;
            case 37:
                this.$ = [o[a - 2], new i.StringNode(o[a])];
                break;
            case 38:
                this.$ = [o[a - 2], new i.IntegerNode(o[a])];
                break;
            case 39:
                this.$ = [o[a - 2], new i.BooleanNode(o[a])];
                break;
            case 40:
                this.$ = [o[a - 2], new i.DataNode(o[a])];
                break;
            case 41:
                this.$ = new i.IdNode(o[a]);
                break;
            case 42:
                o[a - 2].push(o[a]), this.$ = o[a - 2];
                break;
            case 43:
                this.$ = [o[a]]
        }
    }, table: [
        {3: 1, 4: 2, 5: [2, 4], 6: 3, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 24: [1, 15]},
        {1: [3]},
        {5: [1, 16]},
        {5: [2, 3], 7: 17, 8: 18, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 19], 20: [2, 3], 22: [1, 13], 23: [1, 14], 24: [1, 15]},
        {5: [2, 5], 14: [2, 5], 15: [2, 5], 16: [2, 5], 19: [2, 5], 20: [2, 5], 22: [2, 5], 23: [2, 5], 24: [2, 5]},
        {4: 20, 6: 3, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 4], 22: [1, 13], 23: [1, 14], 24: [1, 15]},
        {4: 21, 6: 3, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 4], 22: [1, 13], 23: [1, 14], 24: [1, 15]},
        {5: [2, 9], 14: [2, 9], 15: [2, 9], 16: [2, 9], 19: [2, 9], 20: [2, 9], 22: [2, 9], 23: [2, 9], 24: [2, 9]},
        {5: [2, 10], 14: [2, 10], 15: [2, 10], 16: [2, 10], 19: [2, 10], 20: [2, 10], 22: [2, 10], 23: [2, 10], 24: [2, 10]},
        {5: [2, 11], 14: [2, 11], 15: [2, 11], 16: [2, 11], 19: [2, 11], 20: [2, 11], 22: [2, 11], 23: [2, 11], 24: [2, 11]},
        {5: [2, 12], 14: [2, 12], 15: [2, 12], 16: [2, 12], 19: [2, 12], 20: [2, 12], 22: [2, 12], 23: [2, 12], 24: [2, 12]},
        {17: 22, 21: 23, 27: [1, 24], 34: [1, 26], 36: 25},
        {17: 27, 21: 23, 27: [1, 24], 34: [1, 26], 36: 25},
        {17: 28, 21: 23, 27: [1, 24], 34: [1, 26], 36: 25},
        {17: 29, 21: 23, 27: [1, 24], 34: [1, 26], 36: 25},
        {21: 30, 34: [1, 26], 36: 25},
        {1: [2, 1]},
        {6: 31, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 24: [1, 15]},
        {5: [2, 6], 14: [2, 6], 15: [2, 6], 16: [2, 6], 19: [2, 6], 20: [2, 6], 22: [2, 6], 23: [2, 6], 24: [2, 6]},
        {17: 22, 18: [1, 32], 21: 23, 27: [1, 24], 34: [1, 26], 36: 25},
        {10: 33, 20: [1, 34]},
        {10: 35, 20: [1, 34]},
        {18: [1, 36]},
        {18: [2, 24], 21: 41, 25: 37, 26: 38, 27: [1, 45], 28: 39, 29: [1, 42], 30: [1, 43], 31: [1, 44], 32: 40, 33: 46, 34: [1, 47], 36: 25},
        {18: [2, 25]},
        {18: [2, 41], 27: [2, 41], 29: [2, 41], 30: [2, 41], 31: [2, 41], 34: [2, 41], 37: [1, 48]},
        {18: [2, 43], 27: [2, 43], 29: [2, 43], 30: [2, 43], 31: [2, 43], 34: [2, 43], 37: [2, 43]},
        {18: [1, 49]},
        {18: [1, 50]},
        {18: [1, 51]},
        {18: [1, 52], 21: 53, 34: [1, 26], 36: 25},
        {5: [2, 2], 8: 18, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 2], 22: [1, 13], 23: [1, 14], 24: [1, 15]},
        {14: [2, 20], 15: [2, 20], 16: [2, 20], 19: [2, 20], 22: [2, 20], 23: [2, 20], 24: [2, 20]},
        {5: [2, 7], 14: [2, 7], 15: [2, 7], 16: [2, 7], 19: [2, 7], 20: [2, 7], 22: [2, 7], 23: [2, 7], 24: [2, 7]},
        {21: 54, 34: [1, 26], 36: 25},
        {5: [2, 8], 14: [2, 8], 15: [2, 8], 16: [2, 8], 19: [2, 8], 20: [2, 8], 22: [2, 8], 23: [2, 8], 24: [2, 8]},
        {14: [2, 14], 15: [2, 14], 16: [2, 14], 19: [2, 14], 20: [2, 14], 22: [2, 14], 23: [2, 14], 24: [2, 14]},
        {18: [2, 22], 21: 41, 26: 55, 27: [1, 45], 28: 56, 29: [1, 42], 30: [1, 43], 31: [1, 44], 32: 40, 33: 46, 34: [1, 47], 36: 25},
        {18: [2, 23]},
        {18: [2, 27], 27: [2, 27], 29: [2, 27], 30: [2, 27], 31: [2, 27], 34: [2, 27]},
        {18: [2, 33], 33: 57, 34: [1, 58]},
        {18: [2, 28], 27: [2, 28], 29: [2, 28], 30: [2, 28], 31: [2, 28], 34: [2, 28]},
        {18: [2, 29], 27: [2, 29], 29: [2, 29], 30: [2, 29], 31: [2, 29], 34: [2, 29]},
        {18: [2, 30], 27: [2, 30], 29: [2, 30], 30: [2, 30], 31: [2, 30], 34: [2, 30]},
        {18: [2, 31], 27: [2, 31], 29: [2, 31], 30: [2, 31], 31: [2, 31], 34: [2, 31]},
        {18: [2, 32], 27: [2, 32], 29: [2, 32], 30: [2, 32], 31: [2, 32], 34: [2, 32]},
        {18: [2, 35], 34: [2, 35]},
        {18: [2, 43], 27: [2, 43], 29: [2, 43], 30: [2, 43], 31: [2, 43], 34: [2, 43], 35: [1, 59], 37: [2, 43]},
        {34: [1, 60]},
        {14: [2, 13], 15: [2, 13], 16: [2, 13], 19: [2, 13], 20: [2, 13], 22: [2, 13], 23: [2, 13], 24: [2, 13]},
        {5: [2, 16], 14: [2, 16], 15: [2, 16], 16: [2, 16], 19: [2, 16], 20: [2, 16], 22: [2, 16], 23: [2, 16], 24: [2, 16]},
        {5: [2, 17], 14: [2, 17], 15: [2, 17], 16: [2, 17], 19: [2, 17], 20: [2, 17], 22: [2, 17], 23: [2, 17], 24: [2, 17]},
        {5: [2, 18], 14: [2, 18], 15: [2, 18], 16: [2, 18], 19: [2, 18], 20: [2, 18], 22: [2, 18], 23: [2, 18], 24: [2, 18]},
        {18: [1, 61]},
        {18: [1, 62]},
        {18: [2, 21]},
        {18: [2, 26], 27: [2, 26], 29: [2, 26], 30: [2, 26], 31: [2, 26], 34: [2, 26]},
        {18: [2, 34], 34: [2, 34]},
        {35: [1, 59]},
        {21: 63, 27: [1, 67], 29: [1, 64], 30: [1, 65], 31: [1, 66], 34: [1, 26], 36: 25},
        {18: [2, 42], 27: [2, 42], 29: [2, 42], 30: [2, 42], 31: [2, 42], 34: [2, 42], 37: [2, 42]},
        {5: [2, 19], 14: [2, 19], 15: [2, 19], 16: [2, 19], 19: [2, 19], 20: [2, 19], 22: [2, 19], 23: [2, 19], 24: [2, 19]},
        {5: [2, 15], 14: [2, 15], 15: [2, 15], 16: [2, 15], 19: [2, 15], 20: [2, 15], 22: [2, 15], 23: [2, 15], 24: [2, 15]},
        {18: [2, 36], 34: [2, 36]},
        {18: [2, 37], 34: [2, 37]},
        {18: [2, 38], 34: [2, 38]},
        {18: [2, 39], 34: [2, 39]},
        {18: [2, 40], 34: [2, 40]}
    ], defaultActions: {16: [2, 1], 24: [2, 25], 38: [2, 23], 55: [2, 21]}, parseError: function (t, n) {
        throw new Error(t)
    }, parse: function (t) {
        function v(e) {
            r.length = r.length - 2 * e, i.length = i.length - e, s.length = s.length - e
        }

        function m() {
            var e;
            return e = n.lexer.lex() || 1, typeof e != "number" && (e = n.symbols_[e] || e), e
        }

        var n = this, r = [0], i = [null], s = [], o = this.table, u = "", a = 0, f = 0, l = 0, c = 2, h = 1;
        this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, typeof this.lexer.yylloc == "undefined" && (this.lexer.yylloc = {});
        var p = this.lexer.yylloc;
        s.push(p);
        var d = this.lexer.options && this.lexer.options.ranges;
        typeof this.yy.parseError == "function" && (this.parseError = this.yy.parseError);
        var g, y, b, w, E, S, x = {}, T, N, C, k;
        for (; ;) {
            b = r[r.length - 1];
            if (this.defaultActions[b])w = this.defaultActions[b]; else {
                if (g === null || typeof g == "undefined")g = m();
                w = o[b] && o[b][g]
            }
            if (typeof w == "undefined" || !w.length || !w[0]) {
                var L = "";
                if (!l) {
                    k = [];
                    for (T in o[b])this.terminals_[T] && T > 2 && k.push("'" + this.terminals_[T] + "'");
                    this.lexer.showPosition ? L = "Parse error on line " + (a + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + k.join(", ") + ", got '" + (this.terminals_[g] || g) + "'" : L = "Parse error on line " + (a + 1) + ": Unexpected " + (g == 1 ? "end of input" : "'" + (this.terminals_[g] || g) + "'"), this.parseError(L, {text: this.lexer.match, token: this.terminals_[g] || g, line: this.lexer.yylineno, loc: p, expected: k})
                }
            }
            if (w[0]instanceof Array && w.length > 1)throw new Error("Parse Error: multiple actions possible at state: " + b + ", token: " + g);
            switch (w[0]) {
                case 1:
                    r.push(g), i.push(this.lexer.yytext), s.push(this.lexer.yylloc), r.push(w[1]), g = null, y ? (g = y, y = null) : (f = this.lexer.yyleng, u = this.lexer.yytext, a = this.lexer.yylineno, p = this.lexer.yylloc, l > 0 && l--);
                    break;
                case 2:
                    N = this.productions_[w[1]][1], x.$ = i[i.length - N], x._$ = {first_line: s[s.length - (N || 1)].first_line, last_line: s[s.length - 1].last_line, first_column: s[s.length - (N || 1)].first_column, last_column: s[s.length - 1].last_column}, d && (x._$.range = [s[s.length - (N || 1)].range[0], s[s.length - 1].range[1]]), S = this.performAction.call(x, u, f, a, this.yy, w[1], i, s);
                    if (typeof S != "undefined")return S;
                    N && (r = r.slice(0, -1 * N * 2), i = i.slice(0, -1 * N), s = s.slice(0, -1 * N)), r.push(this.productions_[w[1]][0]), i.push(x.$), s.push(x._$), C = o[r[r.length - 2]][r[r.length - 1]], r.push(C);
                    break;
                case 3:
                    return!0
            }
        }
        return!0
    }}, t = function () {
        var e = {EOF: 1, parseError: function (t, n) {
            if (!this.yy.parser)throw new Error(t);
            this.yy.parser.parseError(t, n)
        }, setInput: function (e) {
            return this._input = e, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = {first_line: 1, first_column: 0, last_line: 1, last_column: 0}, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this
        }, input: function () {
            var e = this._input[0];
            this.yytext += e, this.yyleng++, this.offset++, this.match += e, this.matched += e;
            var t = e.match(/(?:\r\n?|\n).*/g);
            return t ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), e
        }, unput: function (e) {
            var t = e.length, n = e.split(/(?:\r\n?|\n)/g);
            this._input = e + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - t - 1), this.offset -= t;
            var r = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), n.length - 1 && (this.yylineno -= n.length - 1);
            var i = this.yylloc.range;
            return this.yylloc = {first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: n ? (n.length === r.length ? this.yylloc.first_column : 0) + r[r.length - n.length].length - n[0].length : this.yylloc.first_column - t}, this.options.ranges && (this.yylloc.range = [i[0], i[0] + this.yyleng - t]), this
        }, more: function () {
            return this._more = !0, this
        }, less: function (e) {
            this.unput(this.match.slice(e))
        }, pastInput: function () {
            var e = this.matched.substr(0, this.matched.length - this.match.length);
            return(e.length > 20 ? "..." : "") + e.substr(-20).replace(/\n/g, "")
        }, upcomingInput: function () {
            var e = this.match;
            return e.length < 20 && (e += this._input.substr(0, 20 - e.length)), (e.substr(0, 20) + (e.length > 20 ? "..." : "")).replace(/\n/g, "")
        }, showPosition: function () {
            var e = this.pastInput(), t = (new Array(e.length + 1)).join("-");
            return e + this.upcomingInput() + "\n" + t + "^"
        }, next: function () {
            if (this.done)return this.EOF;
            this._input || (this.done = !0);
            var e, t, n, r, i, s;
            this._more || (this.yytext = "", this.match = "");
            var o = this._currentRules();
            for (var u = 0; u < o.length; u++) {
                n = this._input.match(this.rules[o[u]]);
                if (n && (!t || n[0].length > t[0].length)) {
                    t = n, r = u;
                    if (!this.options.flex)break
                }
            }
            if (t) {
                s = t[0].match(/(?:\r\n?|\n).*/g), s && (this.yylineno += s.length), this.yylloc = {first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: s ? s[s.length - 1].length - s[s.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + t[0].length}, this.yytext += t[0], this.match += t[0], this.matches = t, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._input = this._input.slice(t[0].length), this.matched += t[0], e = this.performAction.call(this, this.yy, this, o[r], this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1);
                if (e)return e;
                return
            }
            return this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {text: "", token: null, line: this.yylineno})
        }, lex: function () {
            var t = this.next();
            return typeof t != "undefined" ? t : this.lex()
        }, begin: function (t) {
            this.conditionStack.push(t)
        }, popState: function () {
            return this.conditionStack.pop()
        }, _currentRules: function () {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules
        }, topState: function () {
            return this.conditionStack[this.conditionStack.length - 2]
        }, pushState: function (t) {
            this.begin(t)
        }};
        return e.options = {}, e.performAction = function (t, n, r, i) {
            var s = i;
            switch (r) {
                case 0:
                    n.yytext.slice(-1) !== "\\" && this.begin("mu"), n.yytext.slice(-1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1), this.begin("emu"));
                    if (n.yytext)return 14;
                    break;
                case 1:
                    return 14;
                case 2:
                    return n.yytext.slice(-1) !== "\\" && this.popState(), n.yytext.slice(-1) === "\\" && (n.yytext = n.yytext.substr(0, n.yyleng - 1)), 14;
                case 3:
                    return 24;
                case 4:
                    return 16;
                case 5:
                    return 20;
                case 6:
                    return 19;
                case 7:
                    return 19;
                case 8:
                    return 23;
                case 9:
                    return 23;
                case 10:
                    return n.yytext = n.yytext.substr(3, n.yyleng - 5), this.popState(), 15;
                case 11:
                    return 22;
                case 12:
                    return 35;
                case 13:
                    return 34;
                case 14:
                    return 34;
                case 15:
                    return 37;
                case 16:
                    break;
                case 17:
                    return this.popState(), 18;
                case 18:
                    return this.popState(), 18;
                case 19:
                    return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\"/g, '"'), 29;
                case 20:
                    return n.yytext = n.yytext.substr(1, n.yyleng - 2).replace(/\\"/g, '"'), 29;
                case 21:
                    return n.yytext = n.yytext.substr(1), 27;
                case 22:
                    return 31;
                case 23:
                    return 31;
                case 24:
                    return 30;
                case 25:
                    return 34;
                case 26:
                    return n.yytext = n.yytext.substr(1, n.yyleng - 2), 34;
                case 27:
                    return"INVALID";
                case 28:
                    return 5
            }
        }, e.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|$)))/, /^(?:\{\{>)/, /^(?:\{\{#)/, /^(?:\{\{\/)/, /^(?:\{\{\^)/, /^(?:\{\{\s*else\b)/, /^(?:\{\{\{)/, /^(?:\{\{&)/, /^(?:\{\{![\s\S]*?\}\})/, /^(?:\{\{)/, /^(?:=)/, /^(?:\.(?=[} ]))/, /^(?:\.\.)/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}\}\})/, /^(?:\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@[a-zA-Z]+)/, /^(?:true(?=[}\s]))/, /^(?:false(?=[}\s]))/, /^(?:[0-9]+(?=[}\s]))/, /^(?:[a-zA-Z0-9_$-]+(?=[=}\s\/.]))/, /^(?:\[[^\]]*\])/, /^(?:.)/, /^(?:$)/], e.conditions = {mu: {rules: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], inclusive: !1}, emu: {rules: [2], inclusive: !1}, INITIAL: {rules: [0, 1, 28], inclusive: !0}}, e
    }();
    return e.lexer = t, n.prototype = e, e.Parser = n, new n
}();
typeof require != "undefined" && typeof exports != "undefined" && (exports.parser = handlebars, exports.Parser = handlebars.Parser, exports.parse = function () {
    return handlebars.parse.apply(handlebars, arguments)
}, exports.main = function (t) {
    if (!t[1])throw new Error("Usage: " + t[0] + " FILE");
    var n, r;
    return typeof process != "undefined" ? n = require("fs").readFileSync(require("path").resolve(t[1]), "utf8") : n = require("file").path(require("file").cwd()).join(t[1]).read({charset: "utf-8"}), exports.parser.parse(n)
}, typeof module != "undefined" && require.main === module && exports.main(typeof process != "undefined" ? process.argv.slice(1) : require("system").args)), Handlebars.Parser = handlebars, Handlebars.parse = function (e) {
    return Handlebars.Parser.yy = Handlebars.AST, Handlebars.Parser.parse(e)
}, Handlebars.print = function (e) {
    return(new Handlebars.PrintVisitor).accept(e)
}, Handlebars.logger = {DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3, log: function (e, t) {
}}, Handlebars.log = function (e, t) {
    Handlebars.logger.log(e, t)
}, function () {
    Handlebars.AST = {}, Handlebars.AST.ProgramNode = function (e, t) {
        this.type = "program", this.statements = e, t && (this.inverse = new Handlebars.AST.ProgramNode(t))
    }, Handlebars.AST.MustacheNode = function (e, t, n) {
        this.type = "mustache", this.escaped = !n, this.hash = t;
        var r = this.id = e[0], i = this.params = e.slice(1), s = this.eligibleHelper = r.isSimple;
        this.isHelper = s && (i.length || t)
    }, Handlebars.AST.PartialNode = function (e, t) {
        this.type = "partial", this.id = e, this.context = t
    };
    var e = function (e, t) {
        if (e.original !== t.original)throw new Handlebars.Exception(e.original + " doesn't match " + t.original)
    };
    Handlebars.AST.BlockNode = function (t, n, r, i) {
        e(t.id, i), this.type = "block", this.mustache = t, this.program = n, this.inverse = r, this.inverse && !this.program && (this.isInverse = !0)
    }, Handlebars.AST.ContentNode = function (e) {
        this.type = "content", this.string = e
    }, Handlebars.AST.HashNode = function (e) {
        this.type = "hash", this.pairs = e
    }, Handlebars.AST.IdNode = function (e) {
        this.type = "ID", this.original = e.join(".");
        var t = [], n = 0;
        for (var r = 0, i = e.length; r < i; r++) {
            var s = e[r];
            s === ".." ? n++ : s === "." || s === "this" ? this.isScoped = !0 : t.push(s)
        }
        this.parts = t, this.string = t.join("."), this.depth = n, this.isSimple = e.length === 1 && !this.isScoped && n === 0
    }, Handlebars.AST.DataNode = function (e) {
        this.type = "DATA", this.id = e
    }, Handlebars.AST.StringNode = function (e) {
        this.type = "STRING", this.string = e
    }, Handlebars.AST.IntegerNode = function (e) {
        this.type = "INTEGER", this.integer = e
    }, Handlebars.AST.BooleanNode = function (e) {
        this.type = "BOOLEAN", this.bool = e
    }, Handlebars.AST.CommentNode = function (e) {
        this.type = "comment", this.comment = e
    }
}(), Handlebars.Exception = function (e) {
    var t = Error.prototype.constructor.apply(this, arguments);
    for (var n in t)t.hasOwnProperty(n) && (this[n] = t[n]);
    this.message = t.message
}, Handlebars.Exception.prototype = new Error, Handlebars.SafeString = function (e) {
    this.string = e
}, Handlebars.SafeString.prototype.toString = function () {
    return this.string.toString()
}, function () {
    var e = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, t = /[&<>"'`]/g, n = /[&<>"'`]/, r = function (t) {
        return e[t] || "&amp;"
    };
    Handlebars.Utils = {escapeExpression: function (e) {
        return e instanceof Handlebars.SafeString ? e.toString() : e == null || e === !1 ? "" : n.test(e) ? e.replace(t, r) : e
    }, isEmpty: function (e) {
        return typeof e == "undefined" ? !0 : e === null ? !0 : e === !1 ? !0 : Object.prototype.toString.call(e) === "[object Array]" && e.length === 0 ? !0 : !1
    }}
}(), Handlebars.Compiler = function () {
}, Handlebars.JavaScriptCompiler = function () {
}, function (e, t) {
    e.prototype = {compiler: e, disassemble: function () {
        var e = this.opcodes, t, n = [], r, i;
        for (var s = 0, o = e.length; s < o; s++) {
            t = e[s];
            if (t.opcode === "DECLARE")n.push("DECLARE " + t.name + "=" + t.value); else {
                r = [];
                for (var u = 0; u < t.args.length; u++)i = t.args[u], typeof i == "string" && (i = '"' + i.replace("\n", "\\n") + '"'), r.push(i);
                n.push(t.opcode + " " + r.join(" "))
            }
        }
        return n.join("\n")
    }, guid: 0, compile: function (e, t) {
        this.children = [], this.depths = {list: []}, this.options = t;
        var n = this.options.knownHelpers;
        this.options.knownHelpers = {helperMissing: !0, blockHelperMissing: !0, each: !0, "if": !0, unless: !0, "with": !0, log: !0};
        if (n)for (var r in n)this.options.knownHelpers[r] = n[r];
        return this.program(e)
    }, accept: function (e) {
        return this[e.type](e)
    }, program: function (e) {
        var t = e.statements, n;
        this.opcodes = [];
        for (var r = 0, i = t.length; r < i; r++)n = t[r], this[n.type](n);
        return this.isSimple = i === 1, this.depths.list = this.depths.list.sort(function (e, t) {
            return e - t
        }), this
    }, compileProgram: function (e) {
        var t = (new this.compiler).compile(e, this.options), n = this.guid++, r;
        this.usePartial = this.usePartial || t.usePartial, this.children[n] = t;
        for (var i = 0, s = t.depths.list.length; i < s; i++) {
            r = t.depths.list[i];
            if (r < 2)continue;
            this.addDepth(r - 1)
        }
        return n
    }, block: function (e) {
        var t = e.mustache, n = e.program, r = e.inverse;
        n && (n = this.compileProgram(n)), r && (r = this.compileProgram(r));
        var i = this.classifyMustache(t);
        i === "helper" ? this.helperMustache(t, n, r) : i === "simple" ? (this.simpleMustache(t), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("pushLiteral", "{}"), this.opcode("blockValue")) : (this.ambiguousMustache(t, n, r), this.opcode("pushProgram", n), this.opcode("pushProgram", r), this.opcode("pushLiteral", "{}"), this.opcode("ambiguousBlockValue")), this.opcode("append")
    }, hash: function (e) {
        var t = e.pairs, n, r;
        this.opcode("push", "{}");
        for (var i = 0, s = t.length; i < s; i++)n = t[i], r = n[1], this.accept(r), this.opcode("assignToHash", n[0])
    }, partial: function (e) {
        var t = e.id;
        this.usePartial = !0, e.context ? this.ID(e.context) : this.opcode("push", "depth0"), this.opcode("invokePartial", t.original), this.opcode("append")
    }, content: function (e) {
        this.opcode("appendContent", e.string)
    }, mustache: function (e) {
        var t = this.options, n = this.classifyMustache(e);
        n === "simple" ? this.simpleMustache(e) : n === "helper" ? this.helperMustache(e) : this.ambiguousMustache(e), e.escaped && !t.noEscape ? this.opcode("appendEscaped") : this.opcode("append")
    }, ambiguousMustache: function (e, t, n) {
        var r = e.id, i = r.parts[0];
        this.opcode("getContext", r.depth), this.opcode("pushProgram", t), this.opcode("pushProgram", n), this.opcode("invokeAmbiguous", i)
    }, simpleMustache: function (e, t, n) {
        var r = e.id;
        r.type === "DATA" ? this.DATA(r) : r.parts.length ? this.ID(r) : (this.addDepth(r.depth), this.opcode("getContext", r.depth), this.opcode("pushContext")), this.opcode("resolvePossibleLambda")
    }, helperMustache: function (e, t, n) {
        var r = this.setupFullMustacheParams(e, t, n), i = e.id.parts[0];
        if (this.options.knownHelpers[i])this.opcode("invokeKnownHelper", r.length, i); else {
            if (this.knownHelpersOnly)throw new Error("You specified knownHelpersOnly, but used the unknown helper " + i);
            this.opcode("invokeHelper", r.length, i)
        }
    }, ID: function (e) {
        this.addDepth(e.depth), this.opcode("getContext", e.depth);
        var t = e.parts[0];
        t ? this.opcode("lookupOnContext", e.parts[0]) : this.opcode("pushContext");
        for (var n = 1, r = e.parts.length; n < r; n++)this.opcode("lookup", e.parts[n])
    }, DATA: function (e) {
        this.options.data = !0, this.opcode("lookupData", e.id)
    }, STRING: function (e) {
        this.opcode("pushString", e.string)
    }, INTEGER: function (e) {
        this.opcode("pushLiteral", e.integer)
    }, BOOLEAN: function (e) {
        this.opcode("pushLiteral", e.bool)
    }, comment: function () {
    }, opcode: function (e) {
        this.opcodes.push({opcode: e, args: [].slice.call(arguments, 1)})
    }, declare: function (e, t) {
        this.opcodes.push({opcode: "DECLARE", name: e, value: t})
    }, addDepth: function (e) {
        if (isNaN(e))throw new Error("EWOT");
        if (e === 0)return;
        this.depths[e] || (this.depths[e] = !0, this.depths.list.push(e))
    }, classifyMustache: function (e) {
        var t = e.isHelper, n = e.eligibleHelper, r = this.options;
        if (n && !t) {
            var i = e.id.parts[0];
            r.knownHelpers[i] ? t = !0 : r.knownHelpersOnly && (n = !1)
        }
        return t ? "helper" : n ? "ambiguous" : "simple"
    }, pushParams: function (e) {
        var t = e.length, n;
        while (t--)n = e[t], this.options.stringParams ? (n.depth && this.addDepth(n.depth), this.opcode("getContext", n.depth || 0), this.opcode("pushStringParam", n.string)) : this[n.type](n)
    }, setupMustacheParams: function (e) {
        var t = e.params;
        return this.pushParams(t), e.hash ? this.hash(e.hash) : this.opcode("pushLiteral", "{}"), t
    }, setupFullMustacheParams: function (e, t, n) {
        var r = e.params;
        return this.pushParams(r), this.opcode("pushProgram", t), this.opcode("pushProgram", n), e.hash ? this.hash(e.hash) : this.opcode("pushLiteral", "{}"), r
    }};
    var n = function (e) {
        this.value = e
    };
    t.prototype = {nameLookup: function (e, n, r) {
        return/^[0-9]+$/.test(n) ? e + "[" + n + "]" : t.isValidJavaScriptVariableName(n) ? e + "." + n : e + "['" + n + "']"
    }, appendToBuffer: function (e) {
        return this.environment.isSimple ? "return " + e + ";" : "buffer += " + e + ";"
    }, initializeBuffer: function () {
        return this.quotedString("")
    }, namespace: "Handlebars", compile: function (e, t, n, r) {
        this.environment = e, this.options = t || {}, Handlebars.log(Handlebars.logger.DEBUG, this.environment.disassemble() + "\n\n"), this.name = this.environment.name, this.isChild = !!n, this.context = n || {programs: [], aliases: {}}, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.registers = {list: []}, this.compileStack = [], this.compileChildren(e, t);
        var i = e.opcodes, s;
        this.i = 0;
        for (o = i.length; this.i < o; this.i++)s = i[this.i], s.opcode === "DECLARE" ? this[s.name] = s.value : this[s.opcode].apply(this, s.args);
        return this.createFunctionContext(r)
    }, nextOpcode: function () {
        var e = this.environment.opcodes, t = e[this.i + 1];
        return e[this.i + 1]
    }, eat: function (e) {
        this.i = this.i + 1
    }, preamble: function () {
        var e = [];
        if (!this.isChild) {
            var t = this.namespace, n = "helpers = helpers || " + t + ".helpers;";
            this.environment.usePartial && (n = n + " partials = partials || " + t + ".partials;"), this.options.data && (n += " data = data || {};"), e.push(n)
        } else e.push("");
        this.environment.isSimple ? e.push("") : e.push(", buffer = " + this.initializeBuffer()), this.lastContext = 0, this.source = e
    }, createFunctionContext: function (e) {
        var t = this.stackVars.concat(this.registers.list);
        t.length > 0 && (this.source[1] = this.source[1] + ", " + t.join(", "));
        if (!this.isChild) {
            var n = [];
            for (var r in this.context.aliases)this.source[1] = this.source[1] + ", " + r + "=" + this.context.aliases[r]
        }
        this.source[1] && (this.source[1] = "var " + this.source[1].substring(2) + ";"), this.isChild || (this.source[1] += "\n" + this.context.programs.join("\n") + "\n"), this.environment.isSimple || this.source.push("return buffer;");
        var i = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
        for (var s = 0, o = this.environment.depths.list.length; s < o; s++)i.push("depth" + this.environment.depths.list[s]);
        if (e)return i.push(this.source.join("\n  ")), Function.apply(this, i);
        var u = "function " + (this.name || "") + "(" + i.join(",") + ") {\n  " + this.source.join("\n  ") + "}";
        return Handlebars.log(Handlebars.logger.DEBUG, u + "\n\n"), u
    }, blockValue: function () {
        this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
        var e = ["depth0"];
        this.setupParams(0, e), this.replaceStack(function (t) {
            return e.splice(1, 0, t), t + " = blockHelperMissing.call(" + e.join(", ") + ")"
        })
    }, ambiguousBlockValue: function () {
        this.context.aliases.blockHelperMissing = "helpers.blockHelperMissing";
        var e = ["depth0"];
        this.setupParams(0, e);
        var t = this.topStack();
        e.splice(1, 0, t), this.source.push("if (!" + this.lastHelper + ") { " + t + " = blockHelperMissing.call(" + e.join(", ") + "); }")
    }, appendContent: function (e) {
        this.source.push(this.appendToBuffer(this.quotedString(e)))
    }, append: function () {
        var e = this.popStack();
        this.source.push("if(" + e + " || " + e + " === 0) { " + this.appendToBuffer(e) + " }"), this.environment.isSimple && this.source.push("else { " + this.appendToBuffer("''") + " }")
    }, appendEscaped: function () {
        var e = this.nextOpcode(), t = "";
        this.context.aliases.escapeExpression = "this.escapeExpression", e && e.opcode === "appendContent" && (t = " + " + this.quotedString(e.args[0]), this.eat(e)), this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + t))
    }, getContext: function (e) {
        this.lastContext !== e && (this.lastContext = e)
    }, lookupOnContext: function (e) {
        this.pushStack(this.nameLookup("depth" + this.lastContext, e, "context"))
    }, pushContext: function () {
        this.pushStackLiteral("depth" + this.lastContext)
    }, resolvePossibleLambda: function () {
        this.context.aliases.functionType = '"function"', this.replaceStack(function (e) {
            return"typeof " + e + " === functionType ? " + e + "() : " + e
        })
    }, lookup: function (e) {
        this.replaceStack(function (t) {
            return t + " == null || " + t + " === false ? " + t + " : " + this.nameLookup(t, e, "context")
        })
    }, lookupData: function (e) {
        this.pushStack(this.nameLookup("data", e, "data"))
    }, pushStringParam: function (e) {
        this.pushStackLiteral("depth" + this.lastContext), this.pushString(e)
    }, pushString: function (e) {
        this.pushStackLiteral(this.quotedString(e))
    }, push: function (e) {
        this.pushStack(e)
    }, pushLiteral: function (e) {
        this.pushStackLiteral(e)
    }, pushProgram: function (e) {
        e != null ? this.pushStackLiteral(this.programExpression(e)) : this.pushStackLiteral(null)
    }, invokeHelper: function (e, t) {
        this.context.aliases.helperMissing = "helpers.helperMissing";
        var n = this.lastHelper = this.setupHelper(e, t);
        this.register("foundHelper", n.name), this.pushStack("foundHelper ? foundHelper.call(" + n.callParams + ") " + ": helperMissing.call(" + n.helperMissingParams + ")")
    }, invokeKnownHelper: function (e, t) {
        var n = this.setupHelper(e, t);
        this.pushStack(n.name + ".call(" + n.callParams + ")")
    }, invokeAmbiguous: function (e) {
        this.context.aliases.functionType = '"function"', this.pushStackLiteral("{}");
        var t = this.setupHelper(0, e), n = this.lastHelper = this.nameLookup("helpers", e, "helper");
        this.register("foundHelper", n);
        var r = this.nameLookup("depth" + this.lastContext, e, "context"), i = this.nextStack();
        this.source.push("if (foundHelper) { " + i + " = foundHelper.call(" + t.callParams + "); }"), this.source.push("else { " + i + " = " + r + "; " + i + " = typeof " + i + " === functionType ? " + i + "() : " + i + "; }")
    }, invokePartial: function (e) {
        var t = [this.nameLookup("partials", e, "partial"), "'" + e + "'", this.popStack(), "helpers", "partials"];
        this.options.data && t.push("data"), this.context.aliases.self = "this", this.pushStack("self.invokePartial(" + t.join(", ") + ");")
    }, assignToHash: function (e) {
        var t = this.popStack(), n = this.topStack();
        this.source.push(n + "['" + e + "'] = " + t + ";")
    }, compiler: t, compileChildren: function (e, t) {
        var n = e.children, r, i;
        for (var s = 0, o = n.length; s < o; s++) {
            r = n[s], i = new this.compiler, this.context.programs.push("");
            var u = this.context.programs.length;
            r.index = u, r.name = "program" + u, this.context.programs[u] = i.compile(r, t, this.context)
        }
    }, programExpression: function (e) {
        this.context.aliases.self = "this";
        if (e == null)return"self.noop";
        var t = this.environment.children[e], n = t.depths.list, r, i = [t.index, t.name, "data"];
        for (var s = 0, o = n.length; s < o; s++)r = n[s], r === 1 ? i.push("depth0") : i.push("depth" + (r - 1));
        return n.length === 0 ? "self.program(" + i.join(", ") + ")" : (i.shift(), "self.programWithDepth(" + i.join(", ") + ")")
    }, register: function (e, t) {
        this.useRegister(e), this.source.push(e + " = " + t + ";")
    }, useRegister: function (e) {
        this.registers[e] || (this.registers[e] = !0, this.registers.list.push(e))
    }, pushStackLiteral: function (e) {
        return this.compileStack.push(new n(e)), e
    }, pushStack: function (e) {
        return this.source.push(this.incrStack() + " = " + e + ";"), this.compileStack.push("stack" + this.stackSlot), "stack" + this.stackSlot
    }, replaceStack: function (e) {
        var t = e.call(this, this.topStack());
        return this.source.push(this.topStack() + " = " + t + ";"), "stack" + this.stackSlot
    }, nextStack: function (e) {
        var t = this.incrStack();
        return this.compileStack.push("stack" + this.stackSlot), t
    }, incrStack: function () {
        return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), "stack" + this.stackSlot
    }, popStack: function () {
        var e = this.compileStack.pop();
        return e instanceof n ? e.value : (this.stackSlot--, e)
    }, topStack: function () {
        var e = this.compileStack[this.compileStack.length - 1];
        return e instanceof n ? e.value : e
    }, quotedString: function (e) {
        return'"' + e.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"'
    }, setupHelper: function (e, t) {
        var n = [];
        this.setupParams(e, n);
        var r = this.nameLookup("helpers", t, "helper");
        return{params: n, name: r, callParams: ["depth0"].concat(n).join(", "), helperMissingParams: ["depth0", this.quotedString(t)].concat(n).join(", ")}
    }, setupParams: function (e, t) {
        var n = [], r = [], i, s, o;
        n.push("hash:" + this.popStack()), s = this.popStack(), o = this.popStack();
        if (o || s)o || (this.context.aliases.self = "this", o = "self.noop"), s || (this.context.aliases.self = "this", s = "self.noop"), n.push("inverse:" + s), n.push("fn:" + o);
        for (var u = 0; u < e; u++)i = this.popStack(), t.push(i), this.options.stringParams && r.push(this.popStack());
        return this.options.stringParams && n.push("contexts:[" + r.join(",") + "]"), this.options.data && n.push("data:data"), t.push("{" + n.join(",") + "}"), t.join(", ")
    }};
    var r = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield".split(" "), i = t.RESERVED_WORDS = {};
    for (var s = 0, o = r.length; s < o; s++)i[r[s]] = !0;
    t.isValidJavaScriptVariableName = function (e) {
        return!t.RESERVED_WORDS[e] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(e) ? !0 : !1
    }
}(Handlebars.Compiler, Handlebars.JavaScriptCompiler), Handlebars.precompile = function (e, t) {
    t = t || {};
    var n = Handlebars.parse(e), r = (new Handlebars.Compiler).compile(n, t);
    return(new Handlebars.JavaScriptCompiler).compile(r, t)
}, Handlebars.compile = function (e, t) {
    function r() {
        var n = Handlebars.parse(e), r = (new Handlebars.Compiler).compile(n, t), i = (new Handlebars.JavaScriptCompiler).compile(r, t, undefined, !0);
        return Handlebars.template(i)
    }

    t = t || {};
    var n;
    return function (e, t) {
        return n || (n = r()), n.call(this, e, t)
    }
}, Handlebars.VM = {template: function (e) {
    var t = {escapeExpression: Handlebars.Utils.escapeExpression, invokePartial: Handlebars.VM.invokePartial, programs: [], program: function (e, t, n) {
        var r = this.programs[e];
        return n ? Handlebars.VM.program(t, n) : r ? r : (r = this.programs[e] = Handlebars.VM.program(t), r)
    }, programWithDepth: Handlebars.VM.programWithDepth, noop: Handlebars.VM.noop};
    return function (n, r) {
        return r = r || {}, e.call(t, Handlebars, n, r.helpers, r.partials, r.data)
    }
}, programWithDepth: function (e, t, n) {
    var r = Array.prototype.slice.call(arguments, 2);
    return function (n, i) {
        return i = i || {}, e.apply(this, [n, i.data || t].concat(r))
    }
}, program: function (e, t) {
    return function (n, r) {
        return r = r || {}, e(n, r.data || t)
    }
}, noop: function () {
    return""
}, invokePartial: function (e, t, n, r, i, s) {
    var o = {helpers: r, partials: i, data: s};
    if (e === undefined)throw new Handlebars.Exception("The partial " + t + " could not be found");
    if (e instanceof Function)return e(n, o);
    if (!Handlebars.compile)throw new Handlebars.Exception("The partial " + t + " could not be compiled when running in runtime-only mode");
    return i[t] = Handlebars.compile(e, {data: s !== undefined}), i[t](n, o)
}}, Handlebars.template = Handlebars.VM.template, define("handlebars", ["jquery"], function () {
});
if (typeof intuit == "undefined" || !intuit)intuit = {};
intuit.ius || (intuit.ius = {}), intuit.ius.passwordMeter = function (e) {
    var t = ["123456", "password", "12345678", "dragon", "qwerty", "696969", "mustang", "letmein", "baseball", "master", "michael", "football", "shadow", "monkey", "abc123", "jordan", "harley", "soccer", "ranger", "iwantu", "jennifer", "hunter", "batman", "trustno1", "thomas", "tigger", "robert", "access", "buster", "1234567"], n = 5.5127238959734e-7, r = 5.496012731080276e-12;
    baselineEntropy = 2.5, passwordChangeRate = 120, passwordTriesPerDay = 10;
    var i = function (e) {
        return Math.log(e) / Math.LN2
    }, s = function (e) {
        var t = 0, n = [
            {character: "newline", count: 1}
        ], r = e.split(""), s = e.length + 1, o = [];
        for (var u = 0; u < r.length; u++) {
            var a = !1;
            for (var f = 0; f < n.length; f++)if (n[f].character === r[u]) {
                a = !0, n[f].count++;
                break
            }
            a || n.push({character: r[u], count: 1})
        }
        for (var u = 0; u < n.length; u++) {
            var o = n[u].count / s;
            t += o * i(1 / o)
        }
        return t
    }, o = function (e) {
        var n = e.replace(/[0-9]/g, "").toLowerCase();
        for (var r = 0, i = t.length; r < i; r++) {
            var s = t[r];
            if (n === s)return!0;
            if (s.match(/[0-9]/g) && e.indexOf(s) !== -1) {
                var o = e.replace(s, "");
                if (o.replace(/[0-9]/g, "") === "")return!0
            }
        }
        return!1
    }, u = function (e) {
        var t = 0, n, r = escape(e);
        return r.match(/[a-z]/) && (t += 26), r.match(/[A-Z]/) && (t += 26), r.match(/\d+/) && (t += 10), r.match(/[!@#$%^&*()+-.,=_`~]/) && (t += 19), r.match(/[:;"'<>?{|}\[\]\\\/]/) && (t += 15), n = Math.pow(t, r.length), passwordChangeRate * passwordTriesPerDay / n
    }, a = function (e) {
        var t = u(e), i = s(e), a = o(e);
        if (t > .09 || i < baselineEntropy || a || e.match(/ +/) !== null || e.length < 6)return"bad";
        if (t <= .09 && t > n)return"weak";
        if (t <= n && t > r)return"medium";
        if (t <= r)return"strong"
    }, f = function (t) {
        var n = e(t).attr("id") || "";
        return n + "_pwdStrengthIndicator"
    }, l = function (t) {
        var n = f(t), r = e('<div aria-live="polite"></div>').attr("id", n).hide().append(e("<span></span>").addClass("indicator_text").css({display: "inline-block", margin: "5px 0 0 0"})).append(e("<div></div>").attr("id", n + "_progressBar").css({margin: "2px 0", height: "10px", width: e(t).outerWidth() + "px", border: "#CCCCCC 1px solid"}).append(e('<div><span class="accessible"></span></div>').addClass("progressBar_fill").css({height: "10px", border: "#ffffff 0px none"})));
        return r.clone().wrap("<p>").parent().html()
    };
    e.fn.ius_passwordStrength = function (t) {
        var n = e.extend({}, e.fn.ius_passwordStrength.defaults, t);
        return this.filter("input[type=password]").each(function () {
            $this = e(this), $this.after(l(this)), $this.keyup(function () {
                var t = e(this), r = e("#" + f(this)), i = r.find("div.progressBar_fill"), s = r.find("span.indicator_text"), o = r.find("span.accessible"), u = t.val(), l = a(u);
                if (u.length > 0) {
                    switch (l) {
                        case"bad":
                            i.css({background: n.bad.color, width: n.bad.barLength + "%"}), s.text("Keep going. Your password is too weak."), o.text("This password is too weak"), t.attr("data-password-strength", "bad");
                            break;
                        case"weak":
                            i.css({background: n.weak.color, width: n.weak.barLength + "%"}), s.text("Your password is fair."), o.text("This password is acceptable, but weak."), t.attr("data-password-strength", "weak");
                            break;
                        case"medium":
                            i.css({background: n.medium.color, width: n.medium.barLength + "%"}), s.text("Your password is good."), o.text("This password is acceptable, but could be stronger."), t.attr("data-password-strength", "medium");
                            break;
                        case"strong":
                            i.css({background: n.strong.color, width: n.strong.barLength + "%"}), s.text("Your password is excellent."), o.text("This is a strong password."), t.attr("data-password-strength", "strong")
                    }
                    r.show()
                } else r.hide()
            })
        })
    }, e.fn.ius_passwordStrength.getStrength = function (e) {
        return a(e)
    }, e.fn.ius_passwordStrength.defaults = {strong: {color: "#228B22", barLength: 100}, medium: {color: "#FFD700", barLength: 75}, weak: {color: "#FF8C30", barLength: 50}, bad: {color: "#DC143C", barLength: 20}}
}, intuit.ius.jQuery && intuit.ius.passwordMeter(intuit.ius.jQuery), intuit.ius.passwordMeter($), define("password-meter", ["jquery"], function () {
}), function (e, t) {
    function n(e, t, n) {
        this._d = e, this._isUTC = !!t, this._a = e._a || null, e._a = null, this._lang = n || !1
    }

    function r(e) {
        var t = this._data = {}, n = e.years || e.y || 0, r = e.months || e.M || 0, s = e.weeks || e.w || 0, o = e.days || e.d || 0, u = e.hours || e.h || 0, a = e.minutes || e.m || 0, f = e.seconds || e.s || 0, l = e.milliseconds || e.ms || 0;
        this._milliseconds = l + f * 1e3 + a * 6e4 + u * 36e5, this._days = o + s * 7, this._months = r + n * 12, t.milliseconds = l % 1e3, f += i(l / 1e3), t.seconds = f % 60, a += i(f / 60), t.minutes = a % 60, u += i(a / 60), t.hours = u % 24, o += i(u / 24), o += s * 7, t.days = o % 30, r += i(o / 30), t.months = r % 12, n += i(r / 12), t.years = n, this._lang = !1
    }

    function i(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e)
    }

    function s(e, t) {
        var n = e + "";
        while (n.length < t)n = "0" + n;
        return n
    }

    function o(e, t, n) {
        var r = t._milliseconds, i = t._days, s = t._months, o;
        r && e._d.setTime(+e + r * n), i && e.date(e.date() + i * n), s && (o = e.date(), e.date(1).month(e.month() + s * n).date(Math.min(o, e.daysInMonth())))
    }

    function u(e) {
        return Object.prototype.toString.call(e) === "[object Array]"
    }

    function a(e, t) {
        var n = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), i = 0, s;
        for (s = 0; s < n; s++)~~e[s] !== ~~t[s] && i++;
        return i + r
    }

    function f(t, n) {
        var r, i;
        for (r = 1; r < 7; r++)t[r] = t[r] == null ? r === 2 ? 1 : 0 : t[r];
        return t[7] = n, i = new e(0), n ? (i.setUTCFullYear(t[0], t[1], t[2]), i.setUTCHours(t[3], t[4], t[5], t[6])) : (i.setFullYear(t[0], t[1], t[2]), i.setHours(t[3], t[4], t[5], t[6])), i._a = t, i
    }

    function l(e, t) {
        var n, r, i = [];
        !t && D && (t = require("./lang/" + e));
        for (n = 0; n < P.length; n++)t[P[n]] = t[P[n]] || M.en[P[n]];
        for (n = 0; n < 12; n++)r = k([2e3, n]), i[n] = new RegExp("^" + (t.months[n] || t.months(r, "")) + "|^" + (t.monthsShort[n] || t.monthsShort(r, "")).replace(".", ""), "i");
        return t.monthsParse = t.monthsParse || i, M[e] = t, t
    }

    function c(e) {
        var t = typeof e == "string" && e || e && e._lang || null;
        return t ? M[t] || l(t) : k
    }

    function h(e) {
        return et[e] ? "'+(" + et[e] + ")+'" : e.replace(F, "").replace(/\\?'/g, "\\'")
    }

    function p(e) {
        return c().longDateFormat[e] || e
    }

    function d(e) {
        var t = "var a,b;return '" + e.replace(B, h) + "';", n = Function;
        return new n("t", "v", "o", "p", "m", t)
    }

    function v(e) {
        return Z[e] || (Z[e] = d(e)), Z[e]
    }

    function m(e, t) {
        function n(n, i) {
            return r[n].call ? r[n](e, t) : r[n][i]
        }

        var r = c(e);
        while (j.test(t))t = t.replace(j, p);
        return Z[t] || (Z[t] = d(t)), Z[t](e, n, r.ordinal, s, r.meridiem)
    }

    function g(e) {
        switch (e) {
            case"DDDD":
                return U;
            case"YYYY":
                return z;
            case"S":
            case"SS":
            case"SSS":
            case"DDD":
                return R;
            case"MMM":
            case"MMMM":
            case"dd":
            case"ddd":
            case"dddd":
            case"a":
            case"A":
                return W;
            case"Z":
            case"ZZ":
                return X;
            case"T":
                return V;
            case"MM":
            case"DD":
            case"YY":
            case"HH":
            case"hh":
            case"mm":
            case"ss":
            case"M":
            case"D":
            case"d":
            case"H":
            case"h":
            case"m":
            case"s":
                return q;
            default:
                return new RegExp(e.replace("\\", ""))
        }
    }

    function y(e, t, n, r) {
        var i;
        switch (e) {
            case"M":
            case"MM":
                n[1] = t == null ? 0 : ~~t - 1;
                break;
            case"MMM":
            case"MMMM":
                for (i = 0; i < 12; i++)if (c().monthsParse[i].test(t)) {
                    n[1] = i;
                    break
                }
                break;
            case"D":
            case"DD":
            case"DDD":
            case"DDDD":
                t != null && (n[2] = ~~t);
                break;
            case"YY":
                t = ~~t, n[0] = t + (t > 70 ? 1900 : 2e3);
                break;
            case"YYYY":
                n[0] = ~~Math.abs(t);
                break;
            case"a":
            case"A":
                r.isPm = (t + "").toLowerCase() === "pm";
                break;
            case"H":
            case"HH":
            case"h":
            case"hh":
                n[3] = ~~t;
                break;
            case"m":
            case"mm":
                n[4] = ~~t;
                break;
            case"s":
            case"ss":
                n[5] = ~~t;
                break;
            case"S":
            case"SS":
            case"SSS":
                n[6] = ~~(("0." + t) * 1e3);
                break;
            case"Z":
            case"ZZ":
                r.isUTC = !0, i = (t + "").match(Q), i && i[1] && (r.tzh = ~~i[1]), i && i[2] && (r.tzm = ~~i[2]), i && i[0] === "+" && (r.tzh = -r.tzh, r.tzm = -r.tzm)
        }
    }

    function b(e, t) {
        var n = [0, 0, 1, 0, 0, 0, 0], r = {tzh: 0, tzm: 0}, i = t.match(B), s, o;
        for (s = 0; s < i.length; s++)o = (g(i[s]).exec(e) || [])[0], e = e.replace(g(i[s]), ""), y(i[s], o, n, r);
        return r.isPm && n[3] < 12 && (n[3] += 12), r.isPm === !1 && n[3] === 12 && (n[3] = 0), n[3] += r.tzh, n[4] += r.tzm, f(n, r.isUTC)
    }

    function w(e, t) {
        var r, i = e.match(I) || [], s, o = 99, u, f, l;
        for (u = 0; u < t.length; u++)f = b(e, t[u]), s = m(new n(f), t[u]).match(I) || [], l = a(i, s), l < o && (o = l, r = f);
        return r
    }

    function E(t) {
        var n = "YYYY-MM-DDT", r;
        if ($.exec(t)) {
            for (r = 0; r < 4; r++)if (K[r][1].exec(t)) {
                n += K[r][0];
                break
            }
            return X.exec(t) ? b(t, n + " Z") : b(t, n)
        }
        return new e(t)
    }

    function S(e, t, n, r, i) {
        var s = i.relativeTime[e];
        return typeof s == "function" ? s(t || 1, !!n, e, r) : s.replace(/%d/i, t || 1)
    }

    function x(e, t, n) {
        var r = A(Math.abs(e) / 1e3), i = A(r / 60), s = A(i / 60), o = A(s / 24), u = A(o / 365), a = r < 45 && ["s", r] || i === 1 && ["m"] || i < 45 && ["mm", i] || s === 1 && ["h"] || s < 22 && ["hh", s] || o === 1 && ["d"] || o <= 25 && ["dd", o] || o <= 45 && ["M"] || o < 345 && ["MM", A(o / 30)] || u === 1 && ["y"] || ["yy", u];
        return a[2] = t, a[3] = e > 0, a[4] = n, S.apply({}, a)
    }

    function T(e, t) {
        k.fn[e] = function (e) {
            var n = this._isUTC ? "UTC" : "";
            return e != null ? (this._d["set" + n + t](e), this) : this._d["get" + n + t]()
        }
    }

    function N(e) {
        k.duration.fn[e] = function () {
            return this._data[e]
        }
    }

    function C(e, t) {
        k.duration.fn["as" + e] = function () {
            return+this / t
        }
    }

    var k, L = "1.7.0", A = Math.round, O, M = {}, _ = "en", D = typeof module != "undefined" && module.exports, P = "months|monthsShort|weekdays|weekdaysShort|weekdaysMin|longDateFormat|calendar|relativeTime|ordinal|meridiem".split("|"), H = /^\/?Date\((\-?\d+)/i, B = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|zz?|ZZ?)/g, j = /(LT|LL?L?L?)/g, F = /(^\[)|(\\)|\]$/g, I = /([0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)/gi, q = /\d\d?/, R = /\d{1,3}/, U = /\d{3}/, z = /\d{1,4}/, W = /[0-9a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+/i, X = /Z|[\+\-]\d\d:?\d\d/i, V = /T/i, $ = /^\s*\d{4}-\d\d-\d\d(T(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, J = "YYYY-MM-DDTHH:mm:ssZ", K = [
        ["HH:mm:ss.S", /T\d\d:\d\d:\d\d\.\d{1,3}/],
        ["HH:mm:ss", /T\d\d:\d\d:\d\d/],
        ["HH:mm", /T\d\d:\d\d/],
        ["HH", /T\d\d/]
    ], Q = /([\+\-]|\d\d)/gi, G = "Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"), Y = {Milliseconds: 1, Seconds: 1e3, Minutes: 6e4, Hours: 36e5, Days: 864e5, Months: 2592e6, Years: 31536e6}, Z = {}, et = {M: "(a=t.month()+1)", MMM: 'v("monthsShort",t.month())', MMMM: 'v("months",t.month())', D: "(a=t.date())", DDD: "(a=new Date(t.year(),t.month(),t.date()),b=new Date(t.year(),0,1),a=~~(((a-b)/864e5)+1.5))", d: "(a=t.day())", dd: 'v("weekdaysMin",t.day())', ddd: 'v("weekdaysShort",t.day())', dddd: 'v("weekdays",t.day())', w: "(a=new Date(t.year(),t.month(),t.date()-t.day()+5),b=new Date(a.getFullYear(),0,4),a=~~((a-b)/864e5/7+1.5))", YY: "p(t.year()%100,2)", YYYY: "p(t.year(),4)", a: "m(t.hours(),t.minutes(),!0)", A: "m(t.hours(),t.minutes(),!1)", H: "t.hours()", h: "t.hours()%12||12", m: "t.minutes()", s: "t.seconds()", S: "~~(t.milliseconds()/100)", SS: "p(~~(t.milliseconds()/10),2)", SSS: "p(t.milliseconds(),3)", Z: '((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(a/60),2)+":"+p(~~a%60,2)', ZZ: '((a=-t.zone())<0?((a=-a),"-"):"+")+p(~~(10*a/6),4)'}, tt = "DDD w M D d".split(" "), nt = "M D H h m s w".split(" ");
    while (tt.length)O = tt.pop(), et[O + "o"] = et[O] + "+o(a)";
    while (nt.length)O = nt.pop(), et[O + O] = "p(" + et[O] + ",2)";
    et.DDDD = "p(" + et.DDD + ",3)", k = function (r, i) {
        if (r === null || r === "")return null;
        var s, o;
        return k.isMoment(r) ? new n(new e(+r._d), r._isUTC, r._lang) : (i ? u(i) ? s = w(r, i) : s = b(r, i) : (o = H.exec(r), s = r === t ? new e : o ? new e(+o[1]) : r instanceof e ? r : u(r) ? f(r) : typeof r == "string" ? E(r) : new e(r)), new n(s))
    }, k.utc = function (e, t) {
        return u(e) ? new n(f(e, !0), !0) : (typeof e == "string" && !X.exec(e) && (e += " +0000", t && (t += " Z")), k(e, t).utc())
    }, k.unix = function (e) {
        return k(e * 1e3)
    }, k.duration = function (e, t) {
        var n = k.isDuration(e), i = typeof e == "number", s = n ? e._data : i ? {} : e, o;
        return i && (t ? s[t] = e : s.milliseconds = e), o = new r(s), n && (o._lang = e._lang), o
    }, k.humanizeDuration = function (e, t, n) {
        return k.duration(e, t === !0 ? null : t).humanize(t === !0 ? !0 : n)
    }, k.version = L, k.defaultFormat = J, k.lang = function (e, t) {
        var n;
        if (!e)return _;
        (t || !M[e]) && l(e, t);
        if (M[e]) {
            for (n = 0; n < P.length; n++)k[P[n]] = M[e][P[n]];
            k.monthsParse = M[e].monthsParse, _ = e
        }
    }, k.langData = c, k.isMoment = function (e) {
        return e instanceof n
    }, k.isDuration = function (e) {
        return e instanceof r
    }, k.lang("en", {months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), longDateFormat: {LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D YYYY", LLL: "MMMM D YYYY LT", LLLL: "dddd, MMMM D YYYY LT"}, meridiem: function (e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }, calendar: {sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[last] dddd [at] LT", sameElse: "L"}, relativeTime: {future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years"}, ordinal: function (e) {
        var t = e % 10;
        return~~(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th"
    }}), k.fn = n.prototype = {clone: function () {
        return k(this)
    }, valueOf: function () {
        return+this._d
    }, unix: function () {
        return Math.floor(+this._d / 1e3)
    }, toString: function () {
        return this._d.toString()
    }, toDate: function () {
        return this._d
    }, toArray: function () {
        var e = this;
        return[e.year(), e.month(), e.date(), e.hours(), e.minutes(), e.seconds(), e.milliseconds(), !!this._isUTC]
    }, isValid: function () {
        return this._a ? !a(this._a, (this._a[7] ? k.utc(this) : this).toArray()) : !isNaN(this._d.getTime())
    }, utc: function () {
        return this._isUTC = !0, this
    }, local: function () {
        return this._isUTC = !1, this
    }, format: function (e) {
        return m(this, e ? e : k.defaultFormat)
    }, add: function (e, t) {
        var n = t ? k.duration(+t, e) : k.duration(e);
        return o(this, n, 1), this
    }, subtract: function (e, t) {
        var n = t ? k.duration(+t, e) : k.duration(e);
        return o(this, n, -1), this
    }, diff: function (e, t, n) {
        var r = this._isUTC ? k(e).utc() : k(e).local(), i = (this.zone() - r.zone()) * 6e4, s = this._d - r._d - i, o = this.year() - r.year(), u = this.month() - r.month(), a = this.date() - r.date(), f;
        return t === "months" ? f = o * 12 + u + a / 30 : t === "years" ? f = o + (u + a / 30) / 12 : f = t === "seconds" ? s / 1e3 : t === "minutes" ? s / 6e4 : t === "hours" ? s / 36e5 : t === "days" ? s / 864e5 : t === "weeks" ? s / 6048e5 : s, n ? f : A(f)
    }, from: function (e, t) {
        return k.duration(this.diff(e)).lang(this._lang).humanize(!t)
    }, fromNow: function (e) {
        return this.from(k(), e)
    }, calendar: function () {
        var e = this.diff(k().sod(), "days", !0), t = this.lang().calendar, n = t.sameElse, r = e < -6 ? n : e < -1 ? t.lastWeek : e < 0 ? t.lastDay : e < 1 ? t.sameDay : e < 2 ? t.nextDay : e < 7 ? t.nextWeek : n;
        return this.format(typeof r == "function" ? r.apply(this) : r)
    }, isLeapYear: function () {
        var e = this.year();
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }, isDST: function () {
        return this.zone() < k([this.year()]).zone() || this.zone() < k([this.year(), 5]).zone()
    }, day: function (e) {
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return e == null ? t : this.add({d: e - t})
    }, startOf: function (e) {
        switch (e.replace(/s$/, "")) {
            case"year":
                this.month(0);
            case"month":
                this.date(1);
            case"day":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return this
    }, endOf: function (e) {
        return this.startOf(e).add(e.replace(/s?$/, "s"), 1).subtract("ms", 1)
    }, sod: function () {
        return this.clone().startOf("day")
    }, eod: function () {
        return this.clone().endOf("day")
    }, zone: function () {
        return this._isUTC ? 0 : this._d.getTimezoneOffset()
    }, daysInMonth: function () {
        return k.utc([this.year(), this.month() + 1, 0]).date()
    }, lang: function (e) {
        return e === t ? c(this) : (this._lang = e, this)
    }};
    for (O = 0; O < G.length; O++)T(G[O].toLowerCase(), G[O]);
    T("year", "FullYear"), k.duration.fn = r.prototype = {weeks: function () {
        return i(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + this._days * 864e5 + this._months * 2592e6
    }, humanize: function (e) {
        var t = +this, n = this.lang().relativeTime, r = x(t, !e, this.lang());
        return e && (r = (t <= 0 ? n.past : n.future).replace(/%s/i, r)), r
    }, lang: k.fn.lang};
    for (O in Y)Y.hasOwnProperty(O) && (C(O, Y[O]), N(O.toLowerCase()));
    C("Weeks", 6048e5), D && (module.exports = k), typeof ender == "undefined" && (this.moment = k), typeof define == "function" && define.amd && define("moment", [], function () {
        return k
    })
}.call(this, Date), function () {
    if (!Backbone)throw"Please include Backbone.js before Backbone.ModelBinder.js";
    return Backbone.ModelBinder = function (e) {
        _.bindAll(this), this._modelSetOptions = e || {}
    }, Backbone.ModelBinder.VERSION = "0.1.5", Backbone.ModelBinder.Constants = {}, Backbone.ModelBinder.Constants.ModelToView = "ModelToView", Backbone.ModelBinder.Constants.ViewToModel = "ViewToModel", _.extend(Backbone.ModelBinder.prototype, {bind: function (e, t, n, r) {
        this.unbind(), this._model = e, this._rootEl = t, this._modelSetOptions = _.extend({}, this._modelSetOptions, r);
        if (!this._model)throw"model must be specified";
        if (!this._rootEl)throw"rootEl must be specified";
        n ? (this._attributeBindings = $.extend(!0, {}, n), this._initializeAttributeBindings(), this._initializeElBindings()) : this._initializeDefaultBindings(), this._bindModelToView(), this._bindViewToModel()
    }, unbind: function () {
        this._unbindModelToView(), this._unbindViewToModel(), this._attributeBindings && (delete this._attributeBindings, this._attributeBindings = undefined)
    }, _initializeAttributeBindings: function () {
        var e, t, n, r, i;
        for (e in this._attributeBindings) {
            t = this._attributeBindings[e];
            if (_.isString(t))n = {elementBindings: [
                {selector: t}
            ]}; else if (_.isArray(t))n = {elementBindings: t}; else {
                if (!_.isObject(t))throw"Unsupported type passed to Model Binder " + n;
                n = {elementBindings: [t]}
            }
            for (r = 0; r < n.elementBindings.length; r++)i = n.elementBindings[r], i.attributeBinding = n;
            n.attributeName = e, this._attributeBindings[e] = n
        }
    }, _initializeDefaultBindings: function () {
        var e, t, n, r;
        this._attributeBindings = {}, t = $("[name]", this._rootEl);
        for (e = 0; e < t.length; e++) {
            n = t[e], r = $(n).attr("name");
            if (!this._attributeBindings[r]) {
                var i = {attributeName: r};
                i.elementBindings = [
                    {attributeBinding: i, boundEls: [n]}
                ], this._attributeBindings[r] = i
            } else this._attributeBindings[r].elementBindings.push({attributeBinding: this._attributeBindings[r], boundEls: [n]})
        }
    }, _initializeElBindings: function () {
        var e, t, n, r, i, s, o;
        for (e in this._attributeBindings) {
            t = this._attributeBindings[e];
            for (n = 0; n < t.elementBindings.length; n++) {
                r = t.elementBindings[n], r.selector === "" ? i = $(this._rootEl) : i = $(r.selector, this._rootEl);
                if (i.length === 0)throw"Bad binding found. No elements returned for binding selector " + r.selector;
                r.boundEls = [];
                for (s = 0; s < i.length; s++)o = i[s], r.boundEls.push(o)
            }
        }
    }, _bindModelToView: function () {
        this._model.on("change", this._onModelChange, this), this.copyModelAttributesToView()
    }, copyModelAttributesToView: function (e) {
        var t, n;
        for (t in this._attributeBindings)if (e === undefined || _.indexOf(e, t) !== -1)n = this._attributeBindings[t], this._copyModelToView(n)
    }, _unbindModelToView: function () {
        this._model && (this._model.off("change", this._onModelChange), this._model = undefined)
    }, _bindViewToModel: function () {
        $(this._rootEl).delegate("", "change", this._onElChanged), $(this._rootEl).delegate("[contenteditable]", "blur", this._onElChanged)
    }, _unbindViewToModel: function () {
        this._rootEl && ($(this._rootEl).undelegate("", "change", this._onElChanged), $(this._rootEl).undelegate("[contenteditable]", "blur", this._onElChanged))
    }, _onElChanged: function (e) {
        var t, n, r, i;
        t = $(e.target)[0], n = this._getElBindings(t);
        for (r = 0; r < n.length; r++)i = n[r], this._isBindingUserEditable(i) && this._copyViewToModel(i, t)
    }, _isBindingUserEditable: function (e) {
        return e.elAttribute === undefined || e.elAttribute === "text" || e.elAttribute === "html"
    }, _getElBindings: function (e) {
        var t, n, r, i, s, o, u = [];
        for (t in this._attributeBindings) {
            n = this._attributeBindings[t];
            for (r = 0; r < n.elementBindings.length; r++) {
                i = n.elementBindings[r];
                for (s = 0; s < i.boundEls.length; s++)o = i.boundEls[s], o === e && u.push(i)
            }
        }
        return u
    }, _onModelChange: function () {
        var e, t;
        for (e in this._model.changedAttributes())t = this._attributeBindings[e], t && this._copyModelToView(t)
    }, _copyModelToView: function (e) {
        var t, n, r, i, s = this._model.get(e.attributeName);
        for (t = 0; t < e.elementBindings.length; t++) {
            n = e.elementBindings[t];
            if (!n.isSetting) {
                var o = this._getConvertedValue(Backbone.ModelBinder.Constants.ModelToView, n, s);
                for (r = 0; r < n.boundEls.length; r++)i = n.boundEls[r], this._setEl($(i), n, o)
            }
        }
    }, _setEl: function (e, t, n) {
        t.elAttribute ? this._setElAttribute(e, t, n) : this._setElValue(e, n)
    }, _setElAttribute: function (e, t, n) {
        switch (t.elAttribute) {
            case"html":
                e.html(n);
                break;
            case"text":
                e.text(n);
                break;
            case"enabled":
                e.attr("disabled", !n);
                break;
            case"displayed":
                e[n ? "show" : "hide"]();
                break;
            case"hidden":
                e[n ? "hide" : "show"]();
                break;
            case"css":
                e.css(t.cssAttribute, n);
                break;
            case"class":
                var r = this._model.previous(t.attributeBinding.attributeName);
                _.isUndefined(r) || (r = this._getConvertedValue(Backbone.ModelBinder.Constants.ModelToView, t, r), e.removeClass(r)), n && e.addClass(n);
                break;
            default:
                e.attr(t.elAttribute, n)
        }
    }, _setElValue: function (e, t) {
        if (e.attr("type"))switch (e.attr("type")) {
            case"radio":
                e.val() === t && e.attr("checked", "checked");
                break;
            case"checkbox":
                t ? e.attr("checked", "checked") : e.removeAttr("checked");
                break;
            default:
                e.val(t)
        } else e.is("input") || e.is("select") || e.is("textarea") ? e.val(t) : e.text(t)
    }, _copyViewToModel: function (e, t) {
        e.isSetting || (e.isSetting = !0, this._setModel(e, $(t)), e.converter && this._copyModelToView(e.attributeBinding), e.isSetting = !1)
    }, _getElValue: function (e, t) {
        switch (t.attr("type")) {
            case"checkbox":
                return t.prop("checked") ? !0 : !1;
            default:
                return t.attr("contenteditable") !== undefined ? t.html() : t.val()
        }
    }, _setModel: function (e, t) {
        var n = {}, r = this._getElValue(e, t);
        r = this._getConvertedValue(Backbone.ModelBinder.Constants.ViewToModel, e, r), n[e.attributeBinding.attributeName] = r;
        var i = _.extend({}, this._modelSetOptions, {changeSource: "ModelBinder"});
        this._model.set(n, i)
    }, _getConvertedValue: function (e, t, n) {
        return t.converter && (n = t.converter(e, n, t.attributeBinding.attributeName, this._model)), n
    }}), Backbone.ModelBinder.CollectionConverter = function (e) {
        this._collection = e;
        if (!this._collection)throw"Collection must be defined";
        _.bindAll(this, "convert")
    }, _.extend(Backbone.ModelBinder.CollectionConverter.prototype, {convert: function (e, t) {
        return e === Backbone.ModelBinder.Constants.ModelToView ? t ? t.id : undefined : this._collection.get(t)
    }}), Backbone.ModelBinder.createDefaultBindings = function (e, t, n, r) {
        var i, s, o, u, a = {};
        i = $("[" + t + "]", e);
        for (s = 0; s < i.length; s++) {
            o = i[s], u = $(o).attr(t);
            if (!a[u]) {
                var f = {selector: "[" + t + '="' + u + '"]'};
                a[u] = f, n && (a[u].converter = n), r && (a[u].elAttribute = r)
            }
        }
        return a
    }, Backbone.ModelBinder.combineBindings = function (e, t) {
        _.each(t, function (t, n) {
            var r = {selector: t.selector};
            t.converter && (r.converter = t.converter), t.elAttribute && (r.elAttribute = t.elAttribute), e[n] ? e[n] = [e[n], r] : e[n] = r
        })
    }, Backbone.ModelBinder
}(), define("modelbinder", ["underscore", "jquery", "backbone"], function (e) {
    return function () {
        var t, n;
        return t || e.Backbone.ModelBinder
    }
}(this)), function (e, t) {
    function n(e, t, n) {
        var r = l[t.type] || {};
        return e == null ? n || !t.def ? null : t.def : (e = r.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : r.mod ? (e + r.mod) % r.mod : 0 > e ? 0 : r.max < e ? r.max : e)
    }

    function r(t) {
        var n = a(), r = n._rgba = [];
        return t = t.toLowerCase(), d(u, function (e, i) {
            var s, o = i.re.exec(t), u = o && i.parse(o), a = i.space || "rgba";
            if (u)return s = n[a](u), n[f[a].cache] = s[f[a].cache], r = n._rgba = s._rgba, !1
        }), r.length ? (r.join() === "0,0,0,0" && e.extend(r, p.transparent), n) : p[t]
    }

    function i(e, t, n) {
        return n = (n + 1) % 1, n * 6 < 1 ? e + (t - e) * n * 6 : n * 2 < 1 ? t : n * 3 < 2 ? e + (t - e) * (2 / 3 - n) * 6 : e
    }

    var s = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", o = /^([\-+])=\s*(\d+\.?\d*)/, u = [
        {re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (e) {
            return[e[1], e[2], e[3], e[4]]
        }},
        {re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, parse: function (e) {
            return[e[1] * 2.55, e[2] * 2.55, e[3] * 2.55, e[4]]
        }},
        {re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/, parse: function (e) {
            return[parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }},
        {re: /#([a-f0-9])([a-f0-9])([a-f0-9])/, parse: function (e) {
            return[parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }},
        {re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/, space: "hsla", parse: function (e) {
            return[e[1], e[2] / 100, e[3] / 100, e[4]]
        }}
    ], a = e.Color = function (t, n, r, i) {
        return new e.Color.fn.parse(t, n, r, i)
    }, f = {rgba: {props: {red: {idx: 0, type: "byte"}, green: {idx: 1, type: "byte"}, blue: {idx: 2, type: "byte"}}}, hsla: {props: {hue: {idx: 0, type: "degrees"}, saturation: {idx: 1, type: "percent"}, lightness: {idx: 2, type: "percent"}}}}, l = {"byte": {floor: !0, max: 255}, percent: {max: 1}, degrees: {mod: 360, floor: !0}}, c = a.support = {}, h = e("<p>")[0], p, d = e.each;
    h.style.cssText = "background-color:rgba(1,1,1,.5)", c.rgba = h.style.backgroundColor.indexOf("rgba") > -1, d(f, function (e, t) {
        t.cache = "_" + e, t.props.alpha = {idx: 3, type: "percent", def: 1}
    }), a.fn = e.extend(a.prototype, {parse: function (i, s, o, u) {
        if (i === t)return this._rgba = [null, null, null, null], this;
        if (i.jquery || i.nodeType)i = e(i).css(s), s = t;
        var l = this, c = e.type(i), h = this._rgba = [], v;
        s !== t && (i = [i, s, o, u], c = "array");
        if (c === "string")return this.parse(r(i) || p._default);
        if (c === "array")return d(f.rgba.props, function (e, t) {
            h[t.idx] = n(i[t.idx], t)
        }), this;
        if (c === "object")return i instanceof a ? d(f, function (e, t) {
            i[t.cache] && (l[t.cache] = i[t.cache].slice())
        }) : d(f, function (t, r) {
            var s = r.cache;
            d(r.props, function (e, t) {
                if (!l[s] && r.to) {
                    if (e === "alpha" || i[e] == null)return;
                    l[s] = r.to(l._rgba)
                }
                l[s][t.idx] = n(i[e], t, !0)
            }), l[s] && e.inArray(null, l[s].slice(0, 3)) < 0 && (l[s][3] = 1, r.from && (l._rgba = r.from(l[s])))
        }), this
    }, is: function (e) {
        var t = a(e), n = !0, r = this;
        return d(f, function (e, i) {
            var s, o = t[i.cache];
            return o && (s = r[i.cache] || i.to && i.to(r._rgba) || [], d(i.props, function (e, t) {
                if (o[t.idx] != null)return n = o[t.idx] === s[t.idx], n
            })), n
        }), n
    }, _space: function () {
        var e = [], t = this;
        return d(f, function (n, r) {
            t[r.cache] && e.push(n)
        }), e.pop()
    }, transition: function (e, t) {
        var r = a(e), i = r._space(), s = f[i], o = this.alpha() === 0 ? a("transparent") : this, u = o[s.cache] || s.to(o._rgba), c = u.slice();
        return r = r[s.cache], d(s.props, function (e, i) {
            var s = i.idx, o = u[s], a = r[s], f = l[i.type] || {};
            if (a === null)return;
            o === null ? c[s] = a : (f.mod && (a - o > f.mod / 2 ? o += f.mod : o - a > f.mod / 2 && (o -= f.mod)), c[s] = n((a - o) * t + o, i))
        }), this[i](c)
    }, blend: function (t) {
        if (this._rgba[3] === 1)return this;
        var n = this._rgba.slice(), r = n.pop(), i = a(t)._rgba;
        return a(e.map(n, function (e, t) {
            return(1 - r) * i[t] + r * e
        }))
    }, toRgbaString: function () {
        var t = "rgba(", n = e.map(this._rgba, function (e, t) {
            return e == null ? t > 2 ? 1 : 0 : e
        });
        return n[3] === 1 && (n.pop(), t = "rgb("), t + n.join() + ")"
    }, toHslaString: function () {
        var t = "hsla(", n = e.map(this.hsla(), function (e, t) {
            return e == null && (e = t > 2 ? 1 : 0), t && t < 3 && (e = Math.round(e * 100) + "%"), e
        });
        return n[3] === 1 && (n.pop(), t = "hsl("), t + n.join() + ")"
    }, toHexString: function (t) {
        var n = this._rgba.slice(), r = n.pop();
        return t && n.push(~~(r * 255)), "#" + e.map(n, function (e, t) {
            return e = (e || 0).toString(16), e.length === 1 ? "0" + e : e
        }).join("")
    }, toString: function () {
        return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
    }}), a.fn.parse.prototype = a.fn, f.hsla.to = function (e) {
        if (e[0] == null || e[1] == null || e[2] == null)return[null, null, null, e[3]];
        var t = e[0] / 255, n = e[1] / 255, r = e[2] / 255, i = e[3], s = Math.max(t, n, r), o = Math.min(t, n, r), u = s - o, a = s + o, f = a * .5, l, c;
        return o === s ? l = 0 : t === s ? l = 60 * (n - r) / u + 360 : n === s ? l = 60 * (r - t) / u + 120 : l = 60 * (t - n) / u + 240, f === 0 || f === 1 ? c = f : f <= .5 ? c = u / a : c = u / (2 - a), [Math.round(l) % 360, c, f, i == null ? 1 : i]
    }, f.hsla.from = function (e) {
        if (e[0] == null || e[1] == null || e[2] == null)return[null, null, null, e[3]];
        var t = e[0] / 360, n = e[1], r = e[2], s = e[3], o = r <= .5 ? r * (1 + n) : r + n - r * n, u = 2 * r - o, a, f, l;
        return[Math.round(i(u, o, t + 1 / 3) * 255), Math.round(i(u, o, t) * 255), Math.round(i(u, o, t - 1 / 3) * 255), s]
    }, d(f, function (r, i) {
        var s = i.props, u = i.cache, f = i.to, l = i.from;
        a.fn[r] = function (r) {
            f && !this[u] && (this[u] = f(this._rgba));
            if (r === t)return this[u].slice();
            var i, o = e.type(r), c = o === "array" || o === "object" ? r : arguments, h = this[u].slice();
            return d(s, function (e, t) {
                var r = c[o === "object" ? e : t.idx];
                r == null && (r = h[t.idx]), h[t.idx] = n(r, t)
            }), l ? (i = a(l(h)), i[u] = h, i) : a(h)
        }, d(s, function (t, n) {
            if (a.fn[t])return;
            a.fn[t] = function (i) {
                var s = e.type(i), u = t === "alpha" ? this._hsla ? "hsla" : "rgba" : r, a = this[u](), f = a[n.idx], l;
                return s === "undefined" ? f : (s === "function" && (i = i.call(this, f), s = e.type(i)), i == null && n.empty ? this : (s === "string" && (l = o.exec(i), l && (i = f + parseFloat(l[2]) * (l[1] === "+" ? 1 : -1))), a[n.idx] = i, this[u](a)))
            }
        })
    }), a.hook = function (t) {
        var n = t.split(" ");
        d(n, function (t, n) {
            e.cssHooks[n] = {set: function (t, i) {
                var s, o, u = "";
                if (e.type(i) !== "string" || (s = r(i))) {
                    i = a(s || i);
                    if (!c.rgba && i._rgba[3] !== 1) {
                        o = n === "backgroundColor" ? t.parentNode : t;
                        while ((u === "" || u === "transparent") && o && o.style)try {
                            u = e.css(o, "backgroundColor"), o = o.parentNode
                        } catch (f) {
                        }
                        i = i.blend(u && u !== "transparent" ? u : "_default")
                    }
                    i = i.toRgbaString()
                }
                try {
                    t.style[n] = i
                } catch (i) {
                }
            }}, e.fx.step[n] = function (t) {
                t.colorInit || (t.start = a(t.elem, n), t.end = a(t.end), t.colorInit = !0), e.cssHooks[n].set(t.elem, t.start.transition(t.end, t.pos))
            }
        })
    }, a.hook(s), e.cssHooks.borderColor = {expand: function (e) {
        var t = {};
        return d(["Top", "Right", "Bottom", "Left"], function (n, r) {
            t["border" + r + "Color"] = e
        }), t
    }}, p = e.Color.names = {aqua: "#00ffff", black: "#000000", blue: "#0000ff", fuchsia: "#ff00ff", gray: "#808080", green: "#008000", lime: "#00ff00", maroon: "#800000", navy: "#000080", olive: "#808000", purple: "#800080", red: "#ff0000", silver: "#c0c0c0", teal: "#008080", white: "#ffffff", yellow: "#ffff00", transparent: [null, null, null, 0], _default: "#ffffff"}
}(jQuery), define("jquery-color", ["jquery"], function () {
}), function (e) {
    e.fn.customSelect = function (t) {
        var n = {replacedClass: "replaced", customSelectClass: "custom-select", activeClass: "active", wrapperElement: '<div class="custom-select-container" />'};
        t && e.extend(n, t), this.each(function () {
            var t = e(this);
            t.addClass(n.replacedClass), t.wrap(n.wrapperElement);
            var r = function () {
                val = e("option:selected", this).text(), i.find("span span").text(val)
            };
            t.change(r), t.keyup(r);
            var i = e('<span class="' + n.customSelectClass + '" aria-hidden="true"><span><span>' + e("option:selected", this).text() + "</span></span></span>");
            t.after(i), t.bind({mouseenter: function () {
                i.addClass(n.activeClass)
            }, mouseleave: function () {
                i.removeClass(n.activeClass)
            }, focus: function () {
                i.addClass(n.activeClass)
            }, blur: function () {
                i.removeClass(n.activeClass)
            }})
        })
    }
}(jQuery), define("jquery-customselect", ["jquery"], function () {
});
var HIDE_CHAR = "•", HIDE_TIME = 1e3;
(function (e) {
    function t() {
        var e = document.createElement("input"), t = "onpaste";
        return e.setAttribute(t, ""), typeof e[t] == "function" ? "paste" : "input"
    }

    var n = -1, r, i = t() + ".maskSsn", s = navigator.userAgent, o = /iphone/i.test(s), u = /android/i.test(s), a;
    e.maskSsn = {definitions: {9: "[0-9]", a: "[A-Za-z]", "*": "[A-Za-z0-9]"}, dataName: "rawmaskSsnFn", placeholder: "_"}, e.fn.extend({caretSsn: function (e, t) {
        var n;
        if (this.length === 0 || this.is(":hidden"))return;
        return typeof e == "number" ? (t = typeof t == "number" ? t : e, this.each(function () {
            this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
        })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {begin: e, end: t})
    }, unmaskSsn: function () {
        return this.trigger("unmaskSsn")
    }, maskSsn: function (t, s, f, l, c) {
        var h, p, d, v, m, g;
        return l && (HIDE_CHAR = l), c && (HIDE_TIME = c), !t && this.length > 0 ? (h = e(this[0]), h.data(e.maskSsn.dataName)()) : (s = e.extend({placeholder: e.maskSsn.placeholder, completed: null}, s), p = e.maskSsn.definitions, d = [], v = g = t.length, m = null, e.each(t.split(""), function (e, t) {
            t == "?" ? (g--, v = e) : p[t] ? (d.push(new RegExp(p[t])), m === null && (m = d.length - 1)) : d.push(null)
        }), this.trigger("unmaskSsn").each(function () {
            function y(e) {
                while (++e < g && !d[e]);
                return e
            }

            function b(e) {
                while (--e >= 0 && !d[e]);
                return e
            }

            function w(e, t, n) {
                return t > e.length - 1 ? e : e.substr(0, t) + n + e.substr(t + 1)
            }

            function E(e, t) {
                var n, r;
                if (e < 0)return;
                for (n = e, r = y(t); n < g; n++)if (d[n]) {
                    if (!(r < g && d[n].test(c[r])))break;
                    c[n] = c[r], c[r] = s.placeholder, r = y(r)
                }
                C(), l.caretSsn(Math.max(m, e))
            }

            function S(e) {
                var t, n, r, i;
                for (t = e, n = s.placeholder; t < g; t++)if (d[t]) {
                    r = y(t), i = c[t], c[t] = n;
                    if (!(r < g && d[r].test(i)))break;
                    n = i
                }
            }

            function x(e) {
                var t = e.which, n, i, s;
                t === 8 || t === 46 || o && t === 127 ? (n = l.caretSsn(), i = n.begin, s = n.end, clearTimeout(r), s - i === 0 && (i = t !== 46 ? b(i) : s = y(i - 1), s = t === 46 ? y(s) : s), N(i, s), E(i, s - 1), e.preventDefault()) : t == 27 && (l.val(h), l.caretSsn(0, k()), e.preventDefault())
            }

            function T(t) {
                var i = t.which, o = l.caretSsn(), a, f, h;
                if (t.ctrlKey || t.altKey || t.metaKey || i < 32)return;
                i && (n = o.begin, o.end - o.begin !== 0 && (N(o.begin, o.end), E(o.begin, o.end - 1)), a = y(o.begin - 1), a < g && (f = String.fromCharCode(i), d[a].test(f) && (S(a), c[a] = f, C(), clearTimeout(r), r = setTimeout(function () {
                    l.val(w(l.val(), o.begin, HIDE_CHAR)), u ? setTimeout(e.proxy(e.fn.caretSsn, l, h), 0) : l.caretSsn(h)
                }, HIDE_TIME), h = y(a), u ? setTimeout(e.proxy(e.fn.caretSsn, l, h), 0) : l.caretSsn(h), s.completed && h >= g && s.completed.call(l))), t.preventDefault())
            }

            function N(e, t) {
                var n;
                for (n = e; n < t && n < g; n++)d[n] && (c[n] = s.placeholder)
            }

            function C() {
                f.val(c.join("").replace(/_/g, "").replace(/-/g, ""));
                var e = c[n] == undefined ? "" : c[n];
                l.val(w(c.join("").replace(/[0-9]/g, HIDE_CHAR), n, e)), n = -1
            }

            function k(e) {
                var t = c.join(""), r = -1, i, o;
                for (i = 0, pos = 0; i < g; i++)if (d[i]) {
                    c[i] = s.placeholder;
                    while (pos++ < t.length) {
                        o = t.charAt(pos - 1);
                        if (d[i].test(o)) {
                            c[i] = o, r = i;
                            break
                        }
                    }
                    if (pos > t.length)break
                } else c[i] === t.charAt(pos) && i !== v && (pos++, r = i);
                return e ? (n = -1, C()) : r + 1 < v ? (l.val(""), N(0, g)) : (C(), l.val(l.val().substring(0, r + 1))), v ? i : m
            }

            var l = e(this), c = e.map(t.split(""), function (e, t) {
                if (e != "?")return p[e] ? s.placeholder : e
            }), h = l.val();
            l.data(e.maskSsn.dataName, function () {
                return e.map(c, function (e, t) {
                    return d[t] && e != s.placeholder ? e : null
                }).join("")
            }), l.attr("readonly") || l.one("unmaskSsn", function () {
                l.unbind(".maskSsn").removeData(e.maskSsn.dataName)
            }).bind("focus.maskSsn", function () {
                l.val().length == 0 && N(0, g), clearTimeout(a);
                var e, n;
                h = l.val(), e = h.lastIndexOf(HIDE_CHAR) + 1, a = setTimeout(function () {
                    C(), e == t.length ? l.caretSsn(0, e) : l.caretSsn(e)
                }, 10)
            }).bind("blur.maskSsn", function () {
                l.val(l.val().replace(/[0-9]/g, HIDE_CHAR)), clearTimeout(r), l.val() != h && l.change()
            }).bind("keydown.maskSsn", x).bind("keypress.maskSsn", T).bind(i, function () {
                setTimeout(function () {
                    var e = k(!0);
                    l.caretSsn(e), s.completed && e == l.val().length && s.completed.call(l)
                }, 0)
            }), k()
        }))
    }})
})(jQuery), define("jquery-maskedinput-ssn", ["jquery"], function () {
});
var tipsyGlobal = {storage: [], resizeTimeout: null};
(function (e) {
    function t(e) {
        (e.attr("title") || typeof e.attr("original-title") != "string") && e.attr("original-title", e.attr("title") || "").removeAttr("title")
    }

    function n(n, r) {
        this.$element = e(n), this.options = r, this.enabled = !0, this.visible = !1, t(this.$element)
    }

    n.prototype = {show: function () {
        var t = this.getTitle();
        if (t && this.enabled) {
            var n = this.tip();
            n.find(".tipsy-inner")[this.options.html ? "html" : "text"](t), n[0].className = "tipsy", n.remove().css({top: 0, left: 0, visibility: "hidden", display: "block"}).appendTo(document.body);
            var r = e.extend({}, this.$element.offset(), {width: this.$element[0].offsetWidth, height: this.$element[0].offsetHeight}), i = n[0].offsetWidth, s = n[0].offsetHeight, o = typeof this.options.gravity == "function" ? this.options.gravity.call(this.$element[0]) : this.options.gravity, u;
            switch (o.charAt(0)) {
                case"n":
                    u = {top: r.top + r.height + this.options.offset, left: r.left + r.width / 2 - i / 2};
                    break;
                case"s":
                    u = {top: r.top - s - this.options.offset, left: r.left + r.width / 2 - i / 2};
                    break;
                case"e":
                    u = {top: r.top + r.height / 2 - s / 2, left: r.left - i - this.options.offset};
                    break;
                case"w":
                    u = {top: r.top + r.height / 2 - s / 2, left: r.left + r.width + this.options.offset}
            }
            o.length == 2 && (o.charAt(1) == "w" ? u.left = r.left + r.width / 2 - 15 : u.left = r.left + r.width / 2 - i + 15), n.css(u).addClass("tipsy-" + o), this.options.fade ? n.stop().css({opacity: 0, display: "block", visibility: "visible"}).animate({opacity: this.options.opacity}) : n.css({visibility: "visible", opacity: this.options.opacity}), this.resizeTracking()
        }
        this.visible = !0
    }, hide: function () {
        this.options.fade ? this.tip().stop().fadeOut(function () {
            e(this).remove()
        }) : this.tip().remove(), this.visible = !1
    }, getTitle: function () {
        var e, n = this.$element, r = this.options;
        t(n);
        var e, r = this.options;
        return typeof r.title == "string" ? e = n.attr(r.title == "title" ? "original-title" : r.title) : typeof r.title == "function" && (e = r.title.call(n[0])), e = ("" + e).replace(/(^\s*|\s*$)/, ""), e || r.fallback
    }, tip: function () {
        return this.$tip || (this.$tip = e('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>')), this.$tip
    }, validate: function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, enable: function () {
        this.enabled = !0
    }, disable: function () {
        this.enabled = !1
    }, toggleEnabled: function () {
        this.enabled = !this.enabled
    }, resizeTracking: function () {
        e(window).on("resize.tipsyEvents", function () {
            tipsyGlobal.resizeTimeout && clearTimeout(tipsyGlobal.resizeTimeout), tipsyGlobal.resizeTimeout = setTimeout(function () {
                for (var e = 0; e < tipsyGlobal.storage.length; e++)tipsyGlobal.storage[e].visible && (tipsyGlobal.storage[e].hide(), tipsyGlobal.storage[e].show())
            }, 200)
        })
    }}, e.fn.tipsy = function (t) {
        function r(r) {
            var i = e.data(r, "tipsy");
            return i || (i = new n(r, e.fn.tipsy.elementOptions(r, t)), tipsyGlobal.storage.push(i), e.data(r, "tipsy", i)), i
        }

        function i() {
            var e = r(this);
            e.hoverState = "in", t.delayIn == 0 ? e.show() : setTimeout(function () {
                e.hoverState == "in" && e.show()
            }, t.delayIn)
        }

        function s() {
            var e = r(this);
            e.hoverState = "out", t.delayOut == 0 ? e.hide() : setTimeout(function () {
                e.hoverState == "out" && e.hide()
            }, t.delayOut)
        }

        if (t === !0)return this.data("tipsy");
        if (typeof t == "string")return this.data("tipsy")[t]();
        t = e.extend({}, e.fn.tipsy.defaults, t), t.live || this.each(function () {
            r(this)
        });
        if (t.trigger != "manual") {
            var o = t.live ? "live" : "bind", u = t.trigger == "hover" ? "mouseenter" : "focus", a = t.trigger == "hover" ? "mouseleave" : "blur";
            this[o](u, i)[o](a, s)
        }
        return this
    }, e.fn.tipsy.defaults = {delayIn: 0, delayOut: 0, fade: !1, fallback: "", gravity: "n", html: !1, live: !1, offset: 0, opacity: .8, title: "title", trigger: "hover"}, e.fn.tipsy.elementOptions = function (t, n) {
        return e.metadata ? e.extend({}, n, e(t).metadata()) : n
    }, e.fn.tipsy.autoNS = function () {
        return e(this).offset().top > e(document).scrollTop() + e(window).height() / 2 ? "s" : "n"
    }, e.fn.tipsy.autoWE = function () {
        return e(this).offset().left > e(document).scrollLeft() + e(window).width() / 2 ? "e" : "w"
    }
})(jQuery), define("jquery-tipsy", ["jquery"], function () {
}), window.url = function () {
    function e(e) {
        return!isNaN(parseFloat(e)) && isFinite(e)
    }

    return function (n, r) {
        var i = r || window.location.toString();
        i.substring(0, 2) === "//" ? i = "http:" + i : i.split("://").length === 1 && (i = "http://" + i), r = i.split("/");
        var s = {auth: ""}, o = r[2].split("@");
        o.length === 1 ? o = o[0].split(":") : (s.auth = o[0], o = o[1].split(":")), s.protocol = r[0], s.hostname = o[0], s.port = o[1] || "80", s.pathname = "/" + r.slice(3, r.length).join("/").split("?")[0].split("#")[0];
        var u = s.pathname;
        u.split(".").length === 1 && u[u.length - 1] !== "/" && (u += "/");
        var a = s.hostname, f = a.split("."), l = u.split("/");
        if (!n)return i;
        if (n === "hostname")return a;
        if (n === "domain")return f.slice(-2).join(".");
        if (n === "tld")return f.slice(-1).join(".");
        if (n === "sub")return f.slice(0, f.length - 2).join(".");
        if (n === "port")return s.port || "80";
        if (n === "protocol")return s.protocol.split(":")[0];
        if (n === "auth")return s.auth;
        if (n === "user")return s.auth.split(":")[0];
        if (n === "pass")return s.auth.split(":")[1] || "";
        if (n === "path")return u;
        if (n[0] === ".") {
            n = n.substring(1);
            if (e(n))return n = parseInt(n), f[n < 0 ? f.length + n : n - 1] || ""
        } else {
            if (e(n))return n = parseInt(n), l[n < 0 ? l.length - 1 + n : n] || "";
            if (n === "file")return l.slice(-1)[0];
            if (n === "filename")return l.slice(-1)[0].split(".")[0];
            if (n === "fileext")return l.slice(-1)[0].split(".")[1] || "";
            if (n[0] === "?" || n[0] === "#") {
                var c = i, h = null;
                n[0] === "?" ? c = (c.split("?")[1] || "").split("#")[0] : n[0] === "#" && (c = c.split("#")[1] || "");
                if (!n[1])return c;
                n = n.substring(1), c = c.split("&");
                for (var p = 0, d = c.length; p < d; p++) {
                    h = c[p].split("=");
                    if (h[0] === n)return h[1]
                }
                return null
            }
        }
        return""
    }
}(), define("js-url", ["jquery"], function () {
}), window.matchMedia = window.matchMedia || function (e, t) {
    var n, r = e.documentElement, i = r.firstElementChild || r.firstChild, s = e.createElement("body"), o = e.createElement("div");
    return o.id = "mq-test-1", o.style.cssText = "position:absolute;top:-100em", s.style.background = "none", s.appendChild(o), function (e) {
        return o.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>', r.insertBefore(s, i), n = o.offsetWidth === 42, r.removeChild(s), {matches: n, media: e}
    }
}(document), define("matchMedia", function () {
}), window.enquire = function (e) {
    function t(e, t) {
        var n = 0, r = e.length, i;
        for (n; n < r; n++) {
            i = t(e[n], n);
            if (i === !1)break
        }
    }

    function n(e) {
        return Object.prototype.toString.apply(e) === "[object Array]"
    }

    function r(e) {
        return typeof e == "function"
    }

    function i(e) {
        this.initialised = !1, this.options = e, e.deferSetup || this.setup()
    }

    function s(e, t) {
        this.query = e, this.isUnconditional = t, this.handlers = [], this.matched = !1
    }

    function o() {
        if (!e)throw new Error("matchMedia is required");
        var t = new s("only all");
        this.queries = {}, this.listening = !1, this.browserIsIncapable = !t.matchMedia()
    }

    return i.prototype = {setup: function (e) {
        this.options.setup && this.options.setup(e), this.initialised = !0
    }, on: function (e) {
        this.initialised || this.setup(e), this.options.match(e)
    }, off: function (e) {
        this.options.unmatch && this.options.unmatch(e)
    }, destroy: function () {
        this.options.destroy ? this.options.destroy() : this.off()
    }, equals: function (e) {
        return this.options === e || this.options.match === e
    }}, s.prototype = {matchMedia: function () {
        return e(this.query).matches
    }, addHandler: function (e, t) {
        var n = new i(e);
        this.handlers.push(n), t && this.matched && n.on()
    }, removeHandler: function (e) {
        var n = this.handlers;
        t(n, function (t, r) {
            if (t.equals(e))return t.destroy(), !n.splice(r, 1)
        })
    }, assess: function (e) {
        this.matchMedia() || this.isUnconditional ? this.match(e) : this.unmatch(e)
    }, match: function (e) {
        if (this.matched)return;
        t(this.handlers, function (t) {
            t.on(e)
        }), this.matched = !0
    }, unmatch: function (e) {
        if (!this.matched)return;
        t(this.handlers, function (t) {
            t.off(e)
        }), this.matched = !1
    }}, o.prototype = {register: function (e, i, o) {
        var u = this.queries, a = o && this.browserIsIncapable, f = this.listening;
        return u.hasOwnProperty(e) || (u[e] = new s(e, a), this.listening && u[e].assess()), r(i) && (i = {match: i}), n(i) || (i = [i]), t(i, function (t) {
            u[e].addHandler(t, f)
        }), this
    }, unregister: function (e, n) {
        var r = this.queries;
        return r.hasOwnProperty(e) ? (n ? r[e].removeHandler(n) : (t(this.queries[e].handlers, function (e) {
            e.destroy()
        }), delete r[e]), this) : this
    }, fire: function (e) {
        var t = this.queries, n;
        for (n in t)t.hasOwnProperty(n) && t[n].assess(e);
        return this
    }, listen: function (e) {
        function s(t) {
            var n;
            r(t, function (t) {
                n && clearTimeout(n), n = setTimeout(function () {
                    i.fire(t)
                }, e)
            })
        }

        var t = "resize", n = "orientationChange", r = window.addEventListener || window.attachEvent, i = this;
        return e = e || 500, window.attachEvent && (t = "on" + t, n = "on" + n), this.listening ? this : (i.fire(), s(t), s(n), this.listening = !0, this)
    }}, new o
}(window.matchMedia), define("enquire", ["jquery", "matchMedia"], function () {
});
var Mojo = {events: {}};
Mojo.events.pubsub = function () {
    function n(e, n) {
        if (!t[e])return!1;
        for (var r = 0; r < t[e].length; r++) {
            var i = t[e][r];
            if (i.object === n)return!0
        }
        return!1
    }

    var e = {subscribeForEvent: function (e, r, i) {
        t[e] || (t[e] = new Array), i || (i = window);
        if (!n(e, i)) {
            var s = new Object;
            s.object = i, s.callback = r, t[e].push(s), i.subscribedForEvent = !0
        }
    }, unSubscribe: function (e) {
        for (var n in t)this.unSubscribeForEvent(n, e)
    }, unSubscribeForEvent: function (e, n) {
        var r = t[e];
        if (!r)return;
        for (var i = 0; i < r.length; i++) {
            var s = r[i].object;
            if (n == s) {
                t[e].splice(i, 1);
                break
            }
        }
    }, publishEvent: function (e, n) {
        var r = t[e];
        if (!r)return;
        for (var i = 0; i < r.length; i++) {
            var s = r[i].object, o = r[i].callback;
            o && s && o.call(s, n)
        }
    }}, t = new Object;
    return e
}(), define("mojo-pubsub", function () {
}), function (e, t, n) {
    if (!("console"in e)) {
        var r = e.console = {};
        r.log = r.warn = r.error = r.debug = function () {
        }
    }
    t === {} && (t = {fn: {}, extend: function () {
        var e = arguments[0];
        for (var t = 1, n = arguments.length; t < n; t++) {
            var r = arguments[t];
            for (var i in r)e[i] = r[i]
        }
        return e
    }}), t.fn.pm = function () {
        return console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])"), this
    }, t.pm = e.pm = function (e) {
        i.send(e)
    }, t.pm.bind = e.pm.bind = function (e, t, n, r, s) {
        i.bind(e, t, n, r, s === !0)
    }, t.pm.unbind = e.pm.unbind = function (e, t) {
        i.unbind(e, t)
    }, t.pm.origin = e.pm.origin = null, t.pm.poll = e.pm.poll = 200;
    var i = {send: function (e) {
        var n = t.extend({}, i.defaults, e), r = n.target;
        if (!n.target) {
            console.warn("postmessage target window required");
            return
        }
        if (!n.type) {
            console.warn("postmessage type required");
            return
        }
        var s = {data: n.data, type: n.type};
        n.success && (s.callback = i._callback(n.success)), n.error && (s.errback = i._callback(n.error)), "postMessage"in r && !n.hash ? (i._bind(), r.postMessage(JSON.stringify(s), n.origin || "*")) : (i.hash._bind(), i.hash.send(n, s))
    }, bind: function (e, t, n, r, s) {
        i._replyBind(e, t, n, r, s)
    }, _replyBind: function (n, r, s, o, u) {
        "postMessage"in e && !o ? i._bind() : i.hash._bind();
        var a = i.data("listeners.postmessage");
        a || (a = {}, i.data("listeners.postmessage", a));
        var f = a[n];
        f || (f = [], a[n] = f), f.push({fn: r, callback: u, origin: s || t.pm.origin})
    }, unbind: function (e, t) {
        var n = i.data("listeners.postmessage");
        if (n)if (e)if (t) {
            var r = n[e];
            if (r) {
                var s = [];
                for (var o = 0, u = r.length; o < u; o++) {
                    var a = r[o];
                    a.fn !== t && s.push(a)
                }
                n[e] = s
            }
        } else delete n[e]; else for (var o in n)delete n[o]
    }, data: function (e, t) {
        return t === n ? i._data[e] : (i._data[e] = t, t)
    }, _data: {}, _CHARS: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), _random: function () {
        var e = [];
        for (var t = 0; t < 32; t++)e[t] = i._CHARS[0 | Math.random() * 32];
        return e.join("")
    }, _callback: function (e) {
        var t = i.data("callbacks.postmessage");
        t || (t = {}, i.data("callbacks.postmessage", t));
        var n = i._random();
        return t[n] = e, n
    }, _bind: function () {
        i.data("listening.postmessage") || (e.addEventListener ? e.addEventListener("message", i._dispatch, !1) : e.attachEvent && e.attachEvent("onmessage", i._dispatch), i.data("listening.postmessage", 1))
    }, _dispatch: function (e) {
        try {
            var t = JSON.parse(e.data)
        } catch (n) {
            console.warn("postmessage data invalid json: ", n);
            return
        }
        if (!t.type) {
            console.warn("postmessage message type required");
            return
        }
        var r = i.data("callbacks.postmessage") || {}, s = r[t.type];
        if (s)s(t.data); else {
            var o = i.data("listeners.postmessage") || {}, u = o[t.type] || [];
            for (var a = 0, f = u.length; a < f; a++) {
                var l = u[a];
                if (l.origin && l.origin !== "*" && e.origin !== l.origin) {
                    console.warn("postmessage message origin mismatch", e.origin, l.origin);
                    if (t.errback) {
                        var c = {message: "postmessage origin mismatch", origin: [e.origin, l.origin]};
                        i.send({target: e.source, data: c, type: t.errback})
                    }
                    continue
                }
                function h(n) {
                    t.callback && i.send({target: e.source, data: n, type: t.callback})
                }

                try {
                    l.callback ? l.fn(t.data, h, e) : h(l.fn(t.data, e))
                } catch (n) {
                    if (!t.errback)throw n;
                    i.send({target: e.source, data: n, type: t.errback})
                }
            }
        }
    }};
    i.hash = {send: function (t, n) {
        var r = t.target, s = t.url;
        if (!s) {
            console.warn("postmessage target window url is required");
            return
        }
        s = i.hash._url(s);
        var o, u = i.hash._url(e.location.href);
        if (e == r.parent)o = "parent"; else try {
            for (var a = 0, f = parent.frames.length; a < f; a++) {
                var l = parent.frames[a];
                if (l == e) {
                    o = a;
                    break
                }
            }
        } catch (c) {
            o = e.name
        }
        if (o == null) {
            console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list");
            return
        }
        var h = {"x-requested-with": "postmessage", source: {name: o, url: u}, postmessage: n}, p = "#x-postmessage-id=" + i._random();
        r.location = s + p + encodeURIComponent(JSON.stringify(h))
    }, _regex: /^\#x\-postmessage\-id\=(\w{32})/, _regex_len: "#x-postmessage-id=".length + 32, _bind: function () {
        i.data("polling.postmessage") || (setInterval(function () {
            var t = "" + e.location.hash, n = i.hash._regex.exec(t);
            if (n) {
                var r = n[1];
                i.hash._last !== r && (i.hash._last = r, i.hash._dispatch(t.substring(i.hash._regex_len)))
            }
        }, t.pm.poll || 200), i.data("polling.postmessage", 1))
    }, _dispatch: function (t) {
        if (!t)return;
        try {
            t = JSON.parse(decodeURIComponent(t));
            if (!(t["x-requested-with"] === "postmessage" && t.source && t.source.name != null && t.source.url && t.postmessage))return
        } catch (n) {
            return
        }
        var r = t.postmessage, s = i.data("callbacks.postmessage") || {}, o = s[r.type];
        if (o)o(r.data); else {
            var u;
            t.source.name === "parent" ? u = e.parent : u = e.frames[t.source.name];
            var a = i.data("listeners.postmessage") || {}, f = a[r.type] || [];
            for (var l = 0, c = f.length; l < c; l++) {
                var h = f[l];
                if (h.origin) {
                    var p = /https?\:\/\/[^\/]*/.exec(t.source.url)[0];
                    if (h.origin !== "*" && p !== h.origin) {
                        console.warn("postmessage message origin mismatch", p, h.origin);
                        if (r.errback) {
                            var d = {message: "postmessage origin mismatch", origin: [p, h.origin]};
                            i.send({target: u, data: d, type: r.errback, hash: !0, url: t.source.url})
                        }
                        continue
                    }
                }
                function v(e) {
                    r.callback && i.send({target: u, data: e, type: r.callback, hash: !0, url: t.source.url})
                }

                try {
                    h.callback ? h.fn(r.data, v) : v(h.fn(r.data))
                } catch (n) {
                    if (!r.errback)throw n;
                    i.send({target: u, data: n, type: r.errback, hash: !0, url: t.source.url})
                }
            }
        }
    }, _url: function (e) {
        return("" + e).replace(/#.*$/, "")
    }}, t.extend(i, {defaults: {target: null, url: null, type: null, data: null, success: null, error: null, origin: "*", hash: !1}})
}(this, typeof jQuery == "undefined" ? {} : jQuery), "JSON"in window && window.JSON || (JSON = {}), function () {
    function f(e) {
        return e < 10 ? "0" + e : e
    }

    function quote(e) {
        return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
            var t = meta[e];
            return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }

    function str(e, t) {
        var n, r, i, s, o = gap, u, a = t[e];
        a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
        switch (typeof a) {
            case"string":
                return quote(a);
            case"number":
                return isFinite(a) ? String(a) : "null";
            case"boolean":
            case"null":
                return String(a);
            case"object":
                if (!a)return"null";
                gap += indent, u = [];
                if (Object.prototype.toString.apply(a) === "[object Array]") {
                    s = a.length;
                    for (n = 0; n < s; n += 1)u[n] = str(n, a) || "null";
                    return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                }
                if (rep && typeof rep == "object") {
                    s = rep.length;
                    for (n = 0; n < s; n += 1)r = rep[n], typeof r == "string" && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                } else for (r in a)Object.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
        }
    }

    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
        return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
        var r;
        gap = "", indent = "";
        if (typeof n == "number")for (r = 0; r < n; r += 1)indent += " "; else typeof n == "string" && (indent = n);
        rep = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number")return str("", {"": e});
        throw new Error("JSON.stringify")
    }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
        function walk(e, t) {
            var n, r, i = e[t];
            if (i && typeof i == "object")for (n in i)Object.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
            return reviver.call(e, t, i)
        }

        var j;
        cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
            return"\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({"": j}, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), define("postmessage", ["jquery"], function () {
}), PasswordMeter.prototype = {version: "1.0.1", COMPLEXITY: {VERYWEAK: 0, WEAK: 1, GOOD: 2, STRONG: 3, VERYSTRONG: 4}, STATUS: {FAILED: 0, PASSED: 1, EXCEEDED: 2}, strReverse: function (e) {
    var t = "";
    for (var n = 0; n < e.length; n++)t = e.charAt(n) + t;
    return t
}, int2str: function (e) {
    return e == 0 ? "0" : parseInt(e, 10)
}, float2str: function (e) {
    return e == 0 ? "0.00" : parseFloat(e.toFixed(2))
}, determineStatus: function (e) {
    return e == 0 ? this.STATUS.PASSED : e > 0 ? this.STATUS.EXCEEDED : this.STATUS.FAILED
}, determineBinaryStatus: function (e) {
    return e == 0 ? this.STATUS.PASSED : this.STATUS.FAILED
}}, define("pwdStrength", ["jquery"], function () {
}), $(function () {
    function e() {
        $(".global-wrapper").prepend('<div class="overlay slide-menu-overlay"></div>'), $(".navbar").addClass("active"), $("body").addClass("nav-active"), $(".navigationFlyout").show(), $(".global-wrapper").addClass("menu-slide-in"), $(".global-wrapper, .navigationFlyout, .bigWhiteBackground, .site-footer").addClass("burgerTime"), $(".navDestination").on("click.SignoutNavigation", function () {
            t(), $(".navDestination").off("click.SignoutNavigation")
        })
    }

    function t() {
        $(".overlay").fadeOut(function () {
            $(this).remove()
        }), $(".navbar").removeClass("active"), $("body").removeClass("nav-active"), $(".global-wrapper").removeClass("burgerTime"), $(".navigationFlyout").removeClass("burgerTime"), $(".bigWhiteBackground").removeClass("burgerTime"), $(".site-footer").removeClass("burgerTime"), setTimeout("$('.global-wrapper').removeClass('menu-slide-in')", 500);
        var e = $(".navbar").offset().top;
        window.scrollTo(0, e)
    }

    screen.width <= 320 && window.addEventListener("load", function () {
        setTimeout(function () {
            window.scrollTo(0, 1), $("body").css("border-top", "1px solid #005BBB")
        }, 0)
    }), $(".category").each(function () {
        $(this).addClass("active"), $(this).next(".menu").addClass("active")
    }), $(window).bind("resize.hamburger", function () {
        $(this).width() > 991 && $("div.overlay").length && t()
    }), window.myTTAdjustForOrientation = function () {
        t()
    }, $("#navigation").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function (e) {
        $("#navigation").removeClass("slide-out")
    }), $("#navigation .category").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function (e) {
        e.stopPropagation()
    }), $("#navigation .menu").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function (e) {
        e.stopPropagation()
    }), $("body").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", ".overlay.fade-out", function (e) {
        $(this).remove()
    }), $(".flyout-toggle").click(function () {
        var n = $(".global-wrapper").css("margin-left");
        n != "0px" && n != "auto" ? t() : e()
    }), $(".navDestination").click(function (e) {
        return logger.log("clicked a flyoutlink"), $(this).attr("id") == "signOutFlyOut" && app.redirect("signOut"), $("#navigation").hasClass("menu-slide-in") && t(), e
    }), $("body").on("click touchend", ".overlay", function () {
        t()
    }), $(window).on("orientationchange", window.myTTAdjustForOrientation)
}), define("navbar", ["jquery"], function () {
}), $(function () {
    isSupported() || ($("#navSearchBox").addClass("legacySearchBox placeholder"), $("#navSearchBox").data("isplaceholder", "1"), $("#navSearchBox").focus(function () {
        $("#navSearchBox").data("isplaceholder", "0"), $("#navSearchBox").keydown(function (e) {
            $("#navSearchBox").removeClass("placeholder")
        })
    }), $("#navSearchBox").blur(function () {
        $.trim($("#navSearchBox").val()).length == 0 && ($("#navSearchBox").addClass("legacySearchBox placeholder"), $("#navSearchBox").data("isplaceholder", "1"))
    })), $("#navSearchBox").focus(function () {
        $(window).on("resize.searchBar", function () {
            $("#navSearchBox").is(":visible") || showSearchBox()
        }), $(window).on("keypress.searchBar", function (e) {
            $("#navSearchBox").is(":visible") && $("#navSearchBox").val().length > 0 && e.keyCode == 13 && (e.preventDefault(), $("#navSearchBox").submit())
        })
    }), $("#navSearchBox").blur(function () {
        $(window).off("resize.searchBar"), $(window).off("keypress.searchBar")
    }), $("#navSearchBox").attr("placeholder", appVars.searchBoxPlaceholderText), $("#navSearchForm").submit(function (e) {
        e.preventDefault();
        var t = $("#navSearchBox").val();
        if ($("#navSearchBox").is(":visible") && $("#navSearchBox").data("isplaceholder") == "0" && t.length > 0) {
            var n = appVars.searchDomain.replace("[SEARCHTERM]", t);
            try {
                app.trigger("SearchPerformed", {query: t})
            } catch (r) {
            }
            window.open(n)
        } else showSearchBox()
    })
}), define("searchbar", ["jquery"], function () {
});
if (_.isUndefined(window.Tax) || _.isObject(window.Tax) == 0)window.Tax = {};
Tax.SysReqs = {compatTables: {green: {}, yellow: {}, beta: {}, red: {}}, isCookieEnabled: !1, isGreen: !1, isYellow: !1, isBeta: !1, isRed: !1, isBrowserCompatible: !1, isCompatible: !1, cookieName: "ttoReady", autocheck: !0, skipCookieCheck: !1, loaded: function () {
    Tax.SysInfo.parse(), Tax.SysReqs.setMyAccount(), Tax.SysReqs.autocheck && Tax.SysReqs.checkCompatible()
}, initialize: function () {
}, reset: function () {
    Tax.SysReqs.isCookieEnabled = !1, Tax.SysReqs.isGreen = !1, Tax.SysReqs.isYellow = !1, Tax.SysReqs.isRed = !1, Tax.SysReqs.isBrowserCompatible = !1, Tax.SysReqs.isCompatible = !1, Tax.SysReqs.autocheck = !0, Tax.SysReqs.skipCookieCheck = !1
}, checkCompatible: function () {
    var e = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.green), t = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.yellow), n = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.beta), r = Tax.SysReqs.checkSystemCompatible(Tax.SysReqs.compatTables.red);
    e && (Tax.SysReqs.isGreen = !0, Tax.SysReqs.isBrowserCompatible = !0), t && (Tax.SysReqs.isYellow = !0, Tax.SysReqs.isGreen = !1, Tax.SysReqs.isBrowserCompatible = !0), n && (Tax.SysReqs.isYellow = !0, Tax.SysReqs.isGreen = !1, Tax.SysReqs.isBeta = !0, Tax.SysReqs.isBrowserCompatible = !0);
    if (r || !Tax.SysReqs.isGreen && !Tax.SysReqs.isYellow)Tax.SysReqs.isRed = !0, Tax.SysReqs.isYellow = !1, Tax.SysReqs.isGreen = !1;
    Tax.SysReqs.checkCookieEnabled(), Tax.SysReqs.isCompatible = Tax.SysReqs.isRed == 0 && Tax.SysReqs.isBrowserCompatible && Tax.SysReqs.isCookieEnabled
}, checkCookieEnabled: function () {
    var e = "";
    Tax.SysReqs.isGreen ? e = "Green" : Tax.SysReqs.isYellow || Tax.SysReqs.isBeta ? e = "Yellow" : e = "Red", e = e + "|" + Tax.SysInfo.browser.id + "|" + Tax.SysInfo.browser.name + "|" + Tax.SysInfo.browser.version + "|" + Tax.SysInfo.os.id + "|" + Tax.SysInfo.os.name, mytt.$.cookie(Tax.SysReqs.cookieName, e);
    if (Tax.SysReqs.skipCookieCheck || mytt.$.cookie(Tax.SysReqs.cookieName))Tax.SysReqs.isCookieEnabled = !0
}, checkSystemCompatible: function (e) {
    var t = Tax.SysReqs.getSubTable(e, Tax.SysInfo.os.id);
    if (t.hasOwnProperty("all"))return!0;
    var n = Tax.SysReqs.getSubTable(t, Tax.SysInfo.browser.id);
    if (!n)return!1;
    var r = Tax.SysReqs.evaluateRules(n, Tax.SysInfo.browser.version);
    return r
}, evaluateRules: function (e, t) {
    for (var n in e) {
        if (!e.hasOwnProperty(n))continue;
        var r = e[n], i = Tax.SysReqs.evaluateRule(n, r, t);
        if (!i)return!1
    }
    return!0
}, evaluateRule: function (e, t, n) {
    switch (e) {
        case"min":
            return n >= t;
        case"max":
            return n <= t;
        case"only":
            return n == t
    }
    return!1
}, getSubTable: function (e, t) {
    if (t != "all")var n = Tax.SysReqs.getSubTable(e, "all"); else var n = !1;
    if (e.hasOwnProperty(t) && n) {
        var r = $.extend(!0, {}, n, e[t]);
        return r
    }
    return e.hasOwnProperty(t) ? e[t] : n ? n : !1
}, setMyAccount: function () {
    Tax.SysReqs.compatTables.green = {all: {all: !0}}, Tax.SysReqs.compatTables.yellow = {all: {}}, Tax.SysReqs.compatTables.beta = {all: {}}, Tax.SysReqs.compatTables.red = {all: {msie: {max: 7}}, ios_3_0: {all: !0}, ios_3_1: {all: !0}, ios_3_2: {all: !0}, ios_4_2: {all: !0}, ios_4_3: {all: !0}}
}, setTTO: function () {
    Tax.SysReqs.compatTables.green = {chromeos: {all: !0}, winXP: {msie: {min: 8, max: 10}, chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, winXP64: {msie: {min: 8, max: 10}, chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, winVista: {msie: {min: 8, max: 10}, chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, winVista64: {msie: {min: 8, max: 10}, chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, win7: {msie: {min: 8, max: 11}, chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, win8: {msie: {min: 8, max: 11}, chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, win8_1: {msie: {min: 11}, chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, mac10_3: {firefox: {min: 6}}, mac10_4: {firefox: {min: 6}, safari: {min: 5}}, mac10_5: {chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, mac10_6: {chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, mac10_7: {chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, macx: {chrome: {min: 4}, firefox: {min: 6}, safari: {min: 5}}, ios: {ipadsafari: {min: 5}, iphonesafari: {min: 5}, crios: {min: 1}}, android: {all: !0}, kindlefire: {all: !0}}, Tax.SysReqs.compatTables.yellow = {win2000: {firefox: {min: 3, max: 4.99}}, winXP: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, winXP64: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, winVista: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, winVista64: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, win7: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, win8: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, win8_1: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, mac10_5: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, mac10_6: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, macx: {opera: {min: 9.8}, firefox: {min: 3, max: 4.99}}, linux: {chrome: {min: 9}, firefox: {min: 3, max: 4.99}}}, Tax.SysReqs.compatTables.beta = {all: {}}, Tax.SysReqs.compatTables.red = {all: {}}
}}, Tax.SysInfo = function () {
    function e() {
        function e() {
            var e = navigator.userAgent, t = navigator.vendor, n = [
                {name: "CriOS", browser: function () {
                    return/CriOS/.test(e)
                }},
                {name: "IphoneSafari", browser: function () {
                    return/iPhone/.test(e)
                }, version: function () {
                    var t = e.indexOf("Version/");
                    return t == -1 ? -1 : ["", e.substring(t + 8)]
                }},
                {name: "IpadSafari", browser: function () {
                    return/iPad/.test(e)
                }, version: function () {
                    var t = e.indexOf("Version/");
                    return t == -1 ? -1 : ["", e.substring(t + 8)]
                }},
                {name: "Chrome", browser: function () {
                    return/Chrome/.test(e)
                }},
                {name: "Safari", browser: function () {
                    return/Apple/.test(e) && !/Chrome/.test(e)
                }, version: function () {
                    var t = e.indexOf("Version/");
                    return t == -1 ? -1 : ["", e.substring(t + 8)]
                }},
                {name: "Opera", browser: function () {
                    return window.opera != undefined
                }},
                {name: "iCab", browser: function () {
                    return/iCab/.test(t)
                }},
                {name: "Konqueror", browser: function () {
                    return/KDE/.test(t)
                }},
                {id: "aol", name: "AOL Explorer", browser: function () {
                    return/America Online Browser/.test(e)
                }, version: function () {
                    return e.match(/rev(\d+(?:\.\d+)+)/)
                }},
                {name: "Flock", browser: function () {
                    return/Flock/.test(e)
                }},
                {name: "Camino", browser: function () {
                    return/Camino/.test(t)
                }},
                {name: "Firefox", browser: function () {
                    return/Firefox/.test(e)
                }, version: function () {
                    return e.match(/Firefox\/(\\d+(?:\\.\\d+)?)/.test(e))
                }},
                {name: "Netscape", browser: function () {
                    return/Netscape/.test(e)
                }},
                {id: "msie", name: "Internet Explorer", browser: function () {
                    return/Trident\/7/.test(e) && !/MSIE/.test(e)
                }, version: function () {
                    return["MSIE 11.0", "11.0"]
                }},
                {id: "msie", name: "Internet Explorer", browser: function () {
                    return/MSIE/.test(e)
                }, version: function () {
                    return e.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/)
                }},
                {name: "Mozilla", browser: function () {
                    return/Gecko|Mozilla/.test(e)
                }, version: function () {
                    return e.match(/rv:(\d+(?:\.\d+)+)/)
                }}
            ];
            for (var r = 0; r < n.length; r++) {
                var i = n[r].id ? n[r].id : n[r].name.toLowerCase();
                n[r].id = i
            }
            for (var r = 0; r < n.length; r++)if (n[r].browser()) {
                this.browser.id = n[r].id, this.browser.name = n[r].name;
                var s;
                if (n[r].version != undefined && (s = n[r].version()))this.browser.version = parseFloat(s[1]); else {
                    var o = new RegExp(n[r].name + "(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)");
                    s = e.match(o), s != undefined && (this.browser.version = parseFloat(s[1]))
                }
                break
            }
        }

        function t() {
            var e = navigator.userAgent.toLowerCase(), t = [
                {id: "kindlefire", name: "kindlefire", t: "silk-accelerated"},
                {id: "win95", name: "Windows 95", t: ["win95", "windows95"]},
                {id: "win98", name: "Windows 98", t: ["windows 98", "win 9x 4.90"]},
                {id: "winNT", name: "Windows NT", t: ["winnt4.0", "windows nt 4.0"]},
                {id: "win2000", name: "Windows 2000", t: "windows nt 5.0"},
                {id: "winXP", name: "Windows XP", t: "windows nt 5.1"},
                {id: "winXP64", name: "Windows XP 64", t: "windows nt 5.2"},
                {id: "winVista", name: "Windows Vista", t: "windows nt 6.0"},
                {id: "winVista64", name: "Windows Vista 64", t: "win64"},
                {id: "win7", name: "Windows 7", t: "windows nt 6.1"},
                {id: "win8", name: "Windows 8", t: "windows nt 6.2"},
                {id: "win8_1", name: "Windows 8.1", t: "windows nt 6.3"},
                {id: "ios_3_0", name: "iOS3 0", t: ["iphone os 3.0", "iphone os 3_0"]},
                {id: "ios_3_1", name: "iOS3 1", t: ["iphone os 3.1", "iphone os 3_1"]},
                {id: "ios_3_2", name: "iOS3 2", t: ["iphone os 3.2", "iphone os 3_2", "ipad; cpu os 3.2", "ipad; cpu os 3_2"]},
                {id: "ios_4_2", name: "iOS4 2", t: ["iphone os 4.2", "iphone os 4_2", "ipad; cpu os 4.2", "ipad; cpu os 4_2"]},
                {id: "ios_4_3", name: "iOS4 3", t: ["iphone os 4.3", "iphone os 4_3", "ipad; cpu os 4.3", "ipad; cpu os 4_3"]},
                {id: "ios", name: "iOS", t: ["ipad", "iphone"]},
                {id: "android", name: "Android", t: ["android"]},
                {id: "mac10_7", name: "Mac OS X 10.7", t: ["mac os x 10.7", "mac os x 10_7"]},
                {id: "mac10_6", name: "Mac OS X 10.6", t: ["mac os x 10.6", "mac os x 10_6"]},
                {id: "mac10_5", name: "Mac OS X 10.5", t: ["mac os x 10.5", "mac os x 10_5"]},
                {id: "mac10_4", name: "Mac OS X 10.4", t: ["mac os x 10.4", "mac os x 10_4"]},
                {id: "mac10_3", name: "Mac OS X 10.3", t: ["mac os x 10.3", "mac os x 10_3"]},
                {id: "macx", name: "Mac OS X", t: "mac"},
                {id: "linux", name: "Linux", t: "linux"},
                {id: "chromeos", name: "chromeos", t: "CrOS", caseSensitive: !0}
            ];
            for (var n = 0; n < t.length; n++) {
                var r = [];
                typeof t[n].t == "string" ? r.push(t[n].t) : r = t[n].t;
                for (var i = 0; i < r.length; i++) {
                    var s = e;
                    t[n].caseSensitive != undefined && t[n].caseSensitive == 1 && (s = navigator.userAgent);
                    if (s.indexOf(r[i]) != -1) {
                        this.os.id = t[n].id, this.os.name = t[n].name;
                        break
                    }
                }
                if (this.os.id != "unknown")break
            }
        }

        this.browser = {id: "unknown", name: "unknown", version: 0}, this.os = {id: "unknown", name: "unknown"}, this.parse = function () {
            e.call(this), t.call(this)
        }
    }

    return new e
}(), Tax.SysReqs.loaded(), define("tax-sysreqs", ["jquery", "jquery-cookie", "underscore"], function () {
}), !function (e) {
    e(function () {
        e.support.transition = function () {
            var e = function () {
                var e = document.createElement("bootstrap"), t = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"}, n;
                for (n in t)if (e.style[n] !== undefined)return t[n]
            }();
            return e && {end: e}
        }()
    })
}(window.jQuery), !function (e) {
    var t = '[data-dismiss="alert"]', n = function (n) {
        e(n).on("click", t, this.close)
    };
    n.prototype.close = function (t) {
        function n() {
            s.trigger("closed").remove()
        }

        var r = e(this), i = r.attr("data-target"), s;
        i || (i = r.attr("href"), i = i && i.replace(/.*(?=#[^\s]*$)/, "")), s = e(i), t && t.preventDefault(), s.length || (s = r.hasClass("alert") ? r : r.parent()), s.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented())return;
        s.removeClass("in"), e.support.transition && s.hasClass("fade") ? s.on(e.support.transition.end, n) : n()
    };
    var r = e.fn.alert;
    e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this), i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e.fn.alert.noConflict = function () {
        return e.fn.alert = r, this
    }, e(document).on("click.alert.data-api", t, n.prototype.close)
}(window.jQuery), !function (e) {
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled", n = this.$element, r = n.data(), i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.closest('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var n = e.fn.button;
    e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("button"), s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {loadingText: "loading..."}, e.fn.button.Constructor = t, e.fn.button.noConflict = function () {
        return e.fn.button = n, this
    }, e(document).on("click.button.data-api", "[data-toggle^=button]", function (t) {
        var n = e(t.target);
        n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
    })
}(window.jQuery), !function (e) {
    var t = function (t, n) {
        this.$element = e(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = n, this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {cycle: function (t) {
        return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
    }, getActiveIndex: function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, to: function (t) {
        var n = this.getActiveIndex(), r = this;
        if (t > this.$items.length - 1 || t < 0)return;
        return this.sliding ? this.$element.one("slid", function () {
            r.to(t)
        }) : n == t ? this.pause().cycle() : this.slide(t > n ? "next" : "prev", e(this.$items[t]))
    }, pause: function (t) {
        return t || (this.paused = !0), this.$element.find(".next, .prev").length && e.support.transition.end && (this.$element.trigger(e.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
    }, next: function () {
        if (this.sliding)return;
        return this.slide("next")
    }, prev: function () {
        if (this.sliding)return;
        return this.slide("prev")
    }, slide: function (t, n) {
        var r = this.$element.find(".item.active"), i = n || r[t](), s = this.interval, o = t == "next" ? "left" : "right", u = t == "next" ? "first" : "last", a = this, f;
        this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u](), f = e.Event("slide", {relatedTarget: i[0], direction: o});
        if (i.hasClass("active"))return;
        this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
            var t = e(a.$indicators.children()[a.getActiveIndex()]);
            t && t.addClass("active")
        }));
        if (e.support.transition && this.$element.hasClass("slide")) {
            this.$element.trigger(f);
            if (f.isDefaultPrevented())return;
            i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function () {
                i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function () {
                    a.$element.trigger("slid")
                }, 0)
            })
        } else {
            this.$element.trigger(f);
            if (f.isDefaultPrevented())return;
            r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
        }
        return s && this.cycle(), this
    }};
    var n = e.fn.carousel;
    e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("carousel"), s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n), o = typeof n == "string" ? n : s.slide;
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : o ? i[o]() : s.interval && i.pause().cycle()
        })
    }, e.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, e.fn.carousel.Constructor = t, e.fn.carousel.noConflict = function () {
        return e.fn.carousel = n, this
    }, e(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function (t) {
        var n = e(this), r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")), s = e.extend({}, i.data(), n.data()), o;
        i.carousel(s), (o = n.attr("data-slide-to")) && i.data("carousel").pause().to(o).cycle(), t.preventDefault()
    })
}(window.jQuery), !function (e) {
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {constructor: t, dimension: function () {
        var e = this.$element.hasClass("width");
        return e ? "width" : "height"
    }, show: function () {
        var t, n, r, i;
        if (this.transitioning || this.$element.hasClass("in"))return;
        t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
        if (r && r.length) {
            i = r.data("collapse");
            if (i && i.transitioning)return;
            r.collapse("hide"), i || r.data("collapse", null)
        }
        this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), e.support.transition && this.$element[t](this.$element[0][n])
    }, hide: function () {
        var t;
        if (this.transitioning || !this.$element.hasClass("in"))return;
        t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
    }, reset: function (e) {
        var t = this.dimension();
        return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
    }, transition: function (t, n, r) {
        var i = this, s = function () {
            n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
        };
        this.$element.trigger(n);
        if (n.isDefaultPrevented())return;
        this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
    }, toggle: function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }};
    var n = e.fn.collapse;
    e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("collapse"), s = e.extend({}, e.fn.collapse.defaults, r.data(), typeof n == "object" && n);
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {toggle: !0}, e.fn.collapse.Constructor = t, e.fn.collapse.noConflict = function () {
        return e.fn.collapse = n, this
    }, e(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
        var n = e(this), r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""), s = e(i).data("collapse") ? "toggle" : n.data();
        n[e(i).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), e(i).collapse(s)
    })
}(window.jQuery), !function (e) {
    function t() {
        e(".dropdown-backdrop").remove(), e(r).each(function () {
            n(e(this)).removeClass("open")
        })
    }

    function n(t) {
        var n = t.attr("data-target"), r;
        n || (n = t.attr("href"), n = n && /#/.test(n) && n.replace(/.*(?=#[^\s]*$)/, "")), r = n && e(n);
        if (!r || !r.length)r = t.parent();
        return r
    }

    var r = "[data-toggle=dropdown]", i = function (t) {
        var n = e(t).on("click.dropdown.data-api", this.toggle);
        e("html").on("click.dropdown.data-api", function () {
            n.parent().removeClass("open")
        })
    };
    i.prototype = {constructor: i, toggle: function (r) {
        var i = e(this), s, o;
        if (i.is(".disabled, :disabled"))return;
        return s = n(i), o = s.hasClass("open"), t(), o || ("ontouchstart"in document.documentElement && e('<div class="dropdown-backdrop"/>').insertBefore(e(this)).on("click", t), s.toggleClass("open")), i.focus(), !1
    }, keydown: function (t) {
        var i, s, o, u, a, f;
        if (!/(38|40|27)/.test(t.keyCode))return;
        i = e(this), t.preventDefault(), t.stopPropagation();
        if (i.is(".disabled, :disabled"))return;
        u = n(i), a = u.hasClass("open");
        if (!a || a && t.keyCode == 27)return t.which == 27 && u.find(r).focus(), i.click();
        s = e("[role=menu] li:not(.divider):visible a", u);
        if (!s.length)return;
        f = s.index(s.filter(":focus")), t.keyCode == 38 && f > 0 && f--, t.keyCode == 40 && f < s.length - 1 && f++, ~f || (f = 0), s.eq(f).focus()
    }};
    var s = e.fn.dropdown;
    e.fn.dropdown = function (t) {
        return this.each(function () {
            var n = e(this), r = n.data("dropdown");
            r || n.data("dropdown", r = new i(this)), typeof t == "string" && r[t].call(n)
        })
    }, e.fn.dropdown.Constructor = i, e.fn.dropdown.noConflict = function () {
        return e.fn.dropdown = s, this
    }, e(document).on("click.dropdown.data-api", t).on("click.dropdown.data-api", ".dropdown form", function (e) {
        e.stopPropagation()
    }).on("click.dropdown.data-api", r, i.prototype.toggle).on("keydown.dropdown.data-api", r + ", [role=menu]", i.prototype.keydown)
}(window.jQuery), !function (e) {
    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    t.prototype = {constructor: t, toggle: function () {
        return this[this.isShown ? "hide" : "show"]()
    }, show: function () {
        var t = this, n = e.Event("show");
        this.$element.trigger(n);
        if (this.isShown || n.isDefaultPrevented())return;
        this.isShown = !0, this.escape(), this.backdrop(function () {
            var n = e.support.transition && t.$element.hasClass("fade");
            t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in").attr("aria-hidden", !1), t.enforceFocus(), n ? t.$element.one(e.support.transition.end, function () {
                t.$element.focus().trigger("shown")
            }) : t.$element.focus().trigger("shown")
        })
    }, hide: function (t) {
        t && t.preventDefault();
        var n = this;
        t = e.Event("hide"), this.$element.trigger(t);
        if (!this.isShown || t.isDefaultPrevented())return;
        this.isShown = !1, this.escape(), e(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), e.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal()
    }, enforceFocus: function () {
        var t = this;
        e(document).on("focusin.modal", function (e) {
            t.$element[0] !== e.target && !t.$element.has(e.target).length && t.$element.focus()
        })
    }, escape: function () {
        var e = this;
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (t) {
            t.which == 27 && e.hide()
        }) : this.isShown || this.$element.off("keyup.dismiss.modal")
    }, hideWithTransition: function () {
        var t = this, n = setTimeout(function () {
            t.$element.off(e.support.transition.end), t.hideModal()
        }, 500);
        this.$element.one(e.support.transition.end, function () {
            clearTimeout(n), t.hideModal()
        })
    }, hideModal: function () {
        var e = this;
        this.$element.hide(), this.backdrop(function () {
            e.removeBackdrop(), e.$element.trigger("hidden")
        })
    }, removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, backdrop: function (t) {
        var n = this, r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var i = e.support.transition && r;
            this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.$backdrop.click(this.options.backdrop == "static" ? e.proxy(this.$element[0].focus, this.$element[0]) : e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in");
            if (!t)return;
            i ? this.$backdrop.one(e.support.transition.end, t) : t()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, t) : t()) : t && t()
    }};
    var n = e.fn.modal;
    e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("modal"), s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, e.fn.modal.Constructor = t, e.fn.modal.noConflict = function () {
        return e.fn.modal = n, this
    }, e(document).on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
        var n = e(this), r = n.attr("href"), i = e(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")), s = i.data("modal") ? "toggle" : e.extend({remote: !/#/.test(r) && r}, i.data(), n.data());
        t.preventDefault(), i.modal(s).one("hide", function () {
            n.focus()
        })
    })
}(window.jQuery), !function (e) {
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {constructor: t, init: function (t, n, r) {
        var i, s, o, u, a;
        this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, o = this.options.trigger.split(" ");
        for (a = o.length; a--;)u = o[a], u == "click" ? this.$element.on("click." + this.type, this.options.selector, e.proxy(this.toggle, this)) : u != "manual" && (i = u == "hover" ? "mouseenter" : "focus", s = u == "hover" ? "mouseleave" : "blur", this.$element.on(i + "." + this.type, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s + "." + this.type, this.options.selector, e.proxy(this.leave, this)));
        this.options.selector ? this._options = e.extend({}, this.options, {trigger: "manual", selector: ""}) : this.fixTitle()
    }, getOptions: function (t) {
        return t = e.extend({}, e.fn[this.type].defaults, this.$element.data(), t), t.delay && typeof t.delay == "number" && (t.delay = {show: t.delay, hide: t.delay}), t
    }, enter: function (t) {
        var n = e.fn[this.type].defaults, r = {}, i;
        this._options && e.each(this._options, function (e, t) {
            n[e] != t && (r[e] = t)
        }, this), i = e(t.currentTarget)[this.type](r).data(this.type);
        if (!i.options.delay || !i.options.delay.show)return i.show();
        clearTimeout(this.timeout), i.hoverState = "in", this.timeout = setTimeout(function () {
            i.hoverState == "in" && i.show()
        }, i.options.delay.show)
    }, leave: function (t) {
        var n = e(t.currentTarget)[this.type](this._options).data(this.type);
        this.timeout && clearTimeout(this.timeout);
        if (!n.options.delay || !n.options.delay.hide)return n.hide();
        n.hoverState = "out", this.timeout = setTimeout(function () {
            n.hoverState == "out" && n.hide()
        }, n.options.delay.hide)
    }, show: function () {
        var t, n, r, i, s, o, u = e.Event("show");
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(u);
            if (u.isDefaultPrevented())return;
            t = this.tip(), this.setContent(), this.options.animation && t.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, t[0], this.$element[0]) : this.options.placement, t.detach().css({top: 0, left: 0, display: "block"}), this.options.container ? t.appendTo(this.options.container) : t.insertAfter(this.$element), n = this.getPosition(), r = t[0].offsetWidth, i = t[0].offsetHeight;
            switch (s) {
                case"bottom":
                    o = {top: n.top + n.height, left: n.left + n.width / 2 - r / 2};
                    break;
                case"top":
                    o = {top: n.top - i, left: n.left + n.width / 2 - r / 2};
                    break;
                case"left":
                    o = {top: n.top + n.height / 2 - i / 2, left: n.left - r};
                    break;
                case"right":
                    o = {top: n.top + n.height / 2 - i / 2, left: n.left + n.width}
            }
            this.applyPlacement(o, s), this.$element.trigger("shown")
        }
    }, applyPlacement: function (e, t) {
        var n = this.tip(), r = n[0].offsetWidth, i = n[0].offsetHeight, s, o, u, a;
        n.offset(e).addClass(t).addClass("in"), s = n[0].offsetWidth, o = n[0].offsetHeight, t == "top" && o != i && (e.top = e.top + i - o, a = !0), t == "bottom" || t == "top" ? (u = 0, e.left < 0 && (u = e.left * -2, e.left = 0, n.offset(e), s = n[0].offsetWidth, o = n[0].offsetHeight), this.replaceArrow(u - r + s, s, "left")) : this.replaceArrow(o - i, o, "top"), a && n.offset(e)
    }, replaceArrow: function (e, t, n) {
        this.arrow().css(n, e ? 50 * (1 - e / t) + "%" : "")
    }, setContent: function () {
        var e = this.tip(), t = this.getTitle();
        e.find(".tooltip-inner")[this.options.html ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
    }, hide: function () {
        function t() {
            var t = setTimeout(function () {
                r.off(e.support.transition.end).detach()
            }, 500);
            r.one(e.support.transition.end, function () {
                clearTimeout(t), r.detach()
            })
        }

        var n = this, r = this.tip(), i = e.Event("hide");
        this.$element.trigger(i);
        if (i.isDefaultPrevented())return;
        return r.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? t() : r.detach(), this.$element.trigger("hidden"), this
    }, fixTitle: function () {
        var e = this.$element;
        (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").attr("title", "")
    }, hasContent: function () {
        return this.getTitle()
    }, getPosition: function () {
        var t = this.$element[0];
        return e.extend({}, typeof t.getBoundingClientRect == "function" ? t.getBoundingClientRect() : {width: t.offsetWidth, height: t.offsetHeight}, this.$element.offset())
    }, getTitle: function () {
        var e, t = this.$element, n = this.options;
        return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
    }, tip: function () {
        return this.$tip = this.$tip || e(this.options.template)
    }, arrow: function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, validate: function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, enable: function () {
        this.enabled = !0
    }, disable: function () {
        this.enabled = !1
    }, toggleEnabled: function () {
        this.enabled = !this.enabled
    }, toggle: function (t) {
        var n = t ? e(t.currentTarget)[this.type](this._options).data(this.type) : this;
        n.tip().hasClass("in") ? n.hide() : n.show()
    }, destroy: function () {
        this.hide().$element.off("." + this.type).removeData(this.type)
    }};
    var n = e.fn.tooltip;
    e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tooltip"), s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, e.fn.tooltip.noConflict = function () {
        return e.fn.tooltip = n, this
    }
}(window.jQuery), !function (e) {
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {constructor: t, setContent: function () {
        var e = this.tip(), t = this.getTitle(), n = this.getContent();
        e.find(".popover-title")[this.options.html ? "html" : "text"](t), e.find(".popover-content")[this.options.html ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
    }, hasContent: function () {
        return this.getTitle() || this.getContent()
    }, getContent: function () {
        var e, t = this.$element, n = this.options;
        return e = (typeof n.content == "function" ? n.content.call(t[0]) : n.content) || t.attr("data-content"), e
    }, tip: function () {
        return this.$tip || (this.$tip = e(this.options.template)), this.$tip
    }, destroy: function () {
        this.hide().$element.off("." + this.type).removeData(this.type)
    }});
    var n = e.fn.popover;
    e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("popover"), s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}), e.fn.popover.noConflict = function () {
        return e.fn.popover = n, this
    }
}(window.jQuery), !function (e) {
    function t(t, n) {
        var r = e.proxy(this.process, this), i = e(t).is("body") ? e(window) : e(t), s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll-spy.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }

    t.prototype = {constructor: t, refresh: function () {
        var t = this, n;
        this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function () {
            var n = e(this), r = n.data("target") || n.attr("href"), i = /^#\w/.test(r) && e(r);
            return i && i.length && [
                [i.position().top + (!e.isWindow(t.$scrollElement.get(0)) && t.$scrollElement.scrollTop()), r]
            ] || null
        }).sort(function (e, t) {
            return e[0] - t[0]
        }).each(function () {
            t.offsets.push(this[0]), t.targets.push(this[1])
        })
    }, process: function () {
        var e = this.$scrollElement.scrollTop() + this.options.offset, t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, n = t - this.$scrollElement.height(), r = this.offsets, i = this.targets, s = this.activeTarget, o;
        if (e >= n)return s != (o = i.last()[0]) && this.activate(o);
        for (o = r.length; o--;)s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
    }, activate: function (t) {
        var n, r;
        this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
    }};
    var n = e.fn.scrollspy;
    e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("scrollspy"), s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {offset: 10}, e.fn.scrollspy.noConflict = function () {
        return e.fn.scrollspy = n, this
    }, e(window).on("load", function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), !function (e) {
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype = {constructor: t, show: function () {
        var t = this.element, n = t.closest("ul:not(.dropdown-menu)"), r = t.attr("data-target"), i, s, o;
        r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
        if (t.parent("li").hasClass("active"))return;
        i = n.find(".active:last a")[0], o = e.Event("show", {relatedTarget: i}), t.trigger(o);
        if (o.isDefaultPrevented())return;
        s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function () {
            t.trigger({type: "shown", relatedTarget: i})
        })
    }, activate: function (t, n, r) {
        function i() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), o ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
        }

        var s = n.find("> .active"), o = r && e.support.transition && s.hasClass("fade");
        o ? s.one(e.support.transition.end, i) : i(), s.removeClass("in")
    }};
    var n = e.fn.tab;
    e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e.fn.tab.noConflict = function () {
        return e.fn.tab = n, this
    }, e(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
        t.preventDefault(), e(this).tab("show")
    })
}(window.jQuery), !function (e) {
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = e(this.options.menu), this.shown = !1, this.listen()
    };
    t.prototype = {constructor: t, select: function () {
        var e = this.$menu.find(".active").attr("data-value");
        return this.$element.val(this.updater(e)).change(), this.hide()
    }, updater: function (e) {
        return e
    }, show: function () {
        var t = e.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
        return this.$menu.insertAfter(this.$element).css({top: t.top + t.height, left: t.left}).show(), this.shown = !0, this
    }, hide: function () {
        return this.$menu.hide(), this.shown = !1, this
    }, lookup: function (t) {
        var n;
        return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (n = e.isFunction(this.source) ? this.source(this.query, e.proxy(this.process, this)) : this.source, n ? this.process(n) : this)
    }, process: function (t) {
        var n = this;
        return t = e.grep(t, function (e) {
            return n.matcher(e)
        }), t = this.sorter(t), t.length ? this.render(t.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
    }, matcher: function (e) {
        return~e.toLowerCase().indexOf(this.query.toLowerCase())
    }, sorter: function (e) {
        var t = [], n = [], r = [], i;
        while (i = e.shift())i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
        return t.concat(n, r)
    }, highlighter: function (e) {
        var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        return e.replace(new RegExp("(" + t + ")", "ig"), function (e, t) {
            return"<strong>" + t + "</strong>"
        })
    }, render: function (t) {
        var n = this;
        return t = e(t).map(function (t, r) {
            return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
        }), t.first().addClass("active"), this.$menu.html(t), this
    }, next: function (t) {
        var n = this.$menu.find(".active").removeClass("active"), r = n.next();
        r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
    }, prev: function (e) {
        var t = this.$menu.find(".active").removeClass("active"), n = t.prev();
        n.length || (n = this.$menu.find("li").last()), n.addClass("active")
    }, listen: function () {
        this.$element.on("focus", e.proxy(this.focus, this)).on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", e.proxy(this.keydown, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this)).on("mouseleave", "li", e.proxy(this.mouseleave, this))
    }, eventSupported: function (e) {
        var t = e in this.$element;
        return t || (this.$element.setAttribute(e, "return;"), t = typeof this.$element[e] == "function"), t
    }, move: function (e) {
        if (!this.shown)return;
        switch (e.keyCode) {
            case 9:
            case 13:
            case 27:
                e.preventDefault();
                break;
            case 38:
                e.preventDefault(), this.prev();
                break;
            case 40:
                e.preventDefault(), this.next()
        }
        e.stopPropagation()
    }, keydown: function (t) {
        this.suppressKeyPressRepeat = ~e.inArray(t.keyCode, [40, 38, 9, 13, 27]), this.move(t)
    }, keypress: function (e) {
        if (this.suppressKeyPressRepeat)return;
        this.move(e)
    }, keyup: function (e) {
        switch (e.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown)return;
                this.select();
                break;
            case 27:
                if (!this.shown)return;
                this.hide();
                break;
            default:
                this.lookup()
        }
        e.stopPropagation(), e.preventDefault()
    }, focus: function (e) {
        this.focused = !0
    }, blur: function (e) {
        this.focused = !1, !this.mousedover && this.shown && this.hide()
    }, click: function (e) {
        e.stopPropagation(), e.preventDefault(), this.select(), this.$element.focus()
    }, mouseenter: function (t) {
        this.mousedover = !0, this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
    }, mouseleave: function (e) {
        this.mousedover = !1, !this.focused && this.shown && this.hide()
    }};
    var n = e.fn.typeahead;
    e.fn.typeahead = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("typeahead"), s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1}, e.fn.typeahead.Constructor = t, e.fn.typeahead.noConflict = function () {
        return e.fn.typeahead = n, this
    }, e(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
        var n = e(this);
        if (n.data("typeahead"))return;
        n.typeahead(n.data())
    })
}(window.jQuery), !function (e) {
    var t = function (t, n) {
        this.options = e.extend({}, e.fn.affix.defaults, n), this.$window = e(window).on("scroll.affix.data-api", e.proxy(this.checkPosition, this)).on("click.affix.data-api", e.proxy(function () {
            setTimeout(e.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = e(t), this.checkPosition()
    };
    t.prototype.checkPosition = function () {
        if (!this.$element.is(":visible"))return;
        var t = e(document).height(), n = this.$window.scrollTop(), r = this.$element.offset(), i = this.options.offset, s = i.bottom, o = i.top, u = "affix affix-top affix-bottom", a;
        typeof i != "object" && (s = o = i), typeof o == "function" && (o = i.top()), typeof s == "function" && (s = i.bottom()), a = this.unpin != null && n + this.unpin <= r.top ? !1 : s != null && r.top + this.$element.height() >= t - s ? "bottom" : o != null && n <= o ? "top" : !1;
        if (this.affixed === a)return;
        this.affixed = a, this.unpin = a == "bottom" ? r.top - n : null, this.$element.removeClass(u).addClass("affix" + (a ? "-" + a : ""))
    };
    var n = e.fn.affix;
    e.fn.affix = function (n) {
        return this.each(function () {
            var r = e(this), i = r.data("affix"), s = typeof n == "object" && n;
            i || r.data("affix", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.affix.Constructor = t, e.fn.affix.defaults = {offset: 0}, e.fn.affix.noConflict = function () {
        return e.fn.affix = n, this
    }, e(window).on("load", function () {
        e('[data-spy="affix"]').each(function () {
            var t = e(this), n = t.data();
            n.offset = n.offset || {}, n.offsetBottom && (n.offset.bottom = n.offsetBottom), n.offsetTop && (n.offset.top = n.offsetTop), t.affix(n)
        })
    })
}(window.jQuery), define("bootstrap", ["jquery"], function () {
});
var akamaiPrefix = appVars.cdnDomain + "/" + appVars.version, cacheBuster = appVars.version;
appVars.toAkamai !== "true" && (akamaiPrefix = ".."), requirejs.config({paths: {jquery: [akamaiPrefix + "/lib/jquery-1.10.2", "../lib/jquery-1.10.2"], underscore: [akamaiPrefix + "/lib/underscore", "../lib/underscore"], backbone: [akamaiPrefix + "/lib/backbone-1.0.0", "../lib/backbone-1.0.0"], modelbinder: [akamaiPrefix + "/lib/backbone.modelbinder", "../lib/backbone.modelbinder"], validation: [akamaiPrefix + "/lib/backbone.validation", "../lib/backbone.validation"], clientinsight: [akamaiPrefix + "/lib/clientinsight", "../lib/clientinsight"], enquire: [akamaiPrefix + "/lib/enquire", "../lib/enquire"], handlebars: [akamaiPrefix + "/lib/handlebars", "../lib/handlebars"], "jquery-color": [akamaiPrefix + "/lib/jquery.color-2.1.0.min", "../lib/jquery.color-2.1.0.min"], "jquery-cookie": [akamaiPrefix + "/lib/jquery.cookie", "../lib/jquery.cookie"], "jquery-customselect": [akamaiPrefix + "/lib/jquery.customselect", "../lib/jquery.customselect"], "jquery-mask": [akamaiPrefix + "/lib/jquery.mask", "../lib/jquery.mask"], "jquery-maskedinput-ssn": [akamaiPrefix + "/lib/jquery.maskedinput.ssn", "../lib/jquery.maskedinput.ssn"], "jquery-mockjax": [akamaiPrefix + "/lib/jquery.mockjax", "../lib/jquery.mockjax"], "jquery-timer": [akamaiPrefix + "/lib/jquery.timer", "../lib/jquery.timer"], "jquery-tipsy": [akamaiPrefix + "/lib/jquery.tipsy", "../lib/jquery.tipsy"], "js-url": [akamaiPrefix + "/lib/js-url.min", "../lib/js-url.min"], matchMedia: [akamaiPrefix + "/lib/matchMedia", "../lib/matchMedia"], "mobile-pageslider": [akamaiPrefix + "/lib/mobile.pageslider", "../lib/mobile.pageslider"], modernizr: [akamaiPrefix + "/lib/modernizr", "../lib/modernizr"], "mojo-pubsub": [akamaiPrefix + "/lib/mojo.pubsub", "../lib/mojo.pubsub"], moment: [akamaiPrefix + "/lib/moment.min", "../lib/moment.min"], postmessage: [akamaiPrefix + "/lib/postmessage", "../lib/postmessage"], pwdStrength: [akamaiPrefix + "/lib/pwdStrength", "../lib/pwdStrength"], "tax-sysreqs": [akamaiPrefix + "/lib/tax.sysreqs", "../lib/tax.sysreqs"], "password-meter": [akamaiPrefix + "/lib/password-strength-meter", "../lib/password-strength-meter"], navbar: [akamaiPrefix + "/lib/navbar", "../lib/navbar"], searchbar: [akamaiPrefix + "/lib/searchbar", "../lib/searchbar"], respond: [akamaiPrefix + "/lib/respond", "../lib/respond"], ius: ["https://" + appVars.iusDomain + "/IUS-Plugins/v2/scripts/ius.min.js?v=" + cacheBuster], bootstrap: [akamaiPrefix + "/lib/bootstrap", "../lib/bootstrap"], accounting: [akamaiPrefix + "/lib/accounting", "../lib/accounting"], "jquery-knob": [akamaiPrefix + "/lib/jquery.knob", "../lib/jquery.knob"], "jquery-printthis": [akamaiPrefix + "/lib/jquery.printthis", "../lib/jquery.printthis"]}, waitSeconds: 60, shim: {underscore: {exports: "_"}, backbone: {deps: ["underscore", "jquery", "jquery-cookie", "jquery-timer"], exports: "Backbone"}, bootstrap: {deps: ["jquery"]}, ius: {deps: ["jquery"]}, "jquery-cookie": {deps: ["jquery"]}, "jquery-timer": {deps: ["jquery"], exports: "$.timer"}, validation: {deps: ["jquery", "backbone"]}, enquire: {deps: ["jquery", "matchMedia"]}, handlebars: {deps: ["jquery"]}, "jquery-color": {deps: ["jquery"]}, "jquery-customselect": {deps: ["jquery"]}, "jquery-knob": {deps: ["jquery"]}, "jquery-mask": {deps: ["jquery"]}, "jquery-maskedinput-ssn": {deps: ["jquery"]}, "jquery-printthis": {deps: ["jquery"]}, "jquery-tipsy": {deps: ["jquery"]}, "js-url": {deps: ["jquery"]}, matchMedia: {deps: []}, "mobile-pageslider": {deps: ["jquery"]}, "mojo-pubsub": {deps: []}, moment: {deps: []}, postmessage: {deps: ["jquery"]}, pwdStrength: {deps: ["jquery"]}, navbar: {deps: ["jquery"]}, searchbar: {deps: ["jquery"]}, "tax-sysreqs": {deps: ["jquery", "jquery-cookie", "underscore"]}, "password-meter": {deps: ["jquery"]}, clientinsight: {deps: ["jquery-cookie"]}, modelbinder: {deps: ["underscore", "jquery", "backbone"], exports: "Backbone.ModelBinder"}}}), define("RequireLibs", ["jquery", "backbone", "underscore", "validation", "handlebars", "password-meter", "moment", "modelbinder", "jquery-color", "jquery-cookie", "jquery-customselect", "jquery-maskedinput-ssn", "jquery-timer", "jquery-tipsy", "js-url", "matchMedia", "enquire", "mojo-pubsub", "postmessage", "pwdStrength", "navbar", "searchbar", "tax-sysreqs", "bootstrap"], function () {
}), requirejs.onError = function (e) {
    throw logger && logger.error("Error loading modules in require.js: errType=" + e.requireType + ", failedModules=" + e.requireModules), e
}, require(["RequireLibs"], function () {
    require(["Application", "startup", "Constants", "routers/AppRouter", "modules/ModuleAppRouter", "utility/ClientLogUtil", "utility/HandlebarsHelpers", "clientinsight"], function (e, t, n, r, i, s, o, u) {
        try {
            $(function () {
                window.mytt || (window.mytt = {});
                if (Tax.SysReqs.isCompatible) {
                    window.app = new e, window.app.router = new r, window.app.moduleRouter = new i, window.app.initialize(), Backbone.sync = window.app.dataRegistry.sync;
                    var t = new CI.tracker;
                    t.init("MYACCOUNT", "/lib/resources/myaccountconfig-" + appVars.ciEnvionmentConfig + ".xml", undefined, mytt.$, logger), Backbone.History.started || Backbone.history.start()
                } else window.location = "/incompatible"
            })
        } catch (a) {
            throw logger && logger.error('JavaScriptException: func=index.function error="' + a + '"'), a
        }
    })
}), define("index", function () {
}), define("utility/RequestRetryHandler", [], function () {
    var e = 3, t = {shouldRetryRequest: function (t, n) {
        t.hasOwnProperty("retryCount") || (t.retryCount = 0, t.retryLimit = e);
        if (t.retryCount < t.retryLimit) {
            var r = n.status;
            if (r == mytt.c.httpStatus.BAD_GATEWAY || r == mytt.c.httpStatus.SERVICE_UNAVAILABLE || r == 0) {
                t.retryCount++;
                var i = "Retrying " + t.url + " on " + r + " (" + t.retryCount + ")";
                return logger.warn(i), !0
            }
        }
        return!1
    }};
    return t
}), define("cfp", ["utility/RequestRetryHandler"], function (e) {
    function u(e) {
        return logger.log(e), _.isObject(e) === !1 ? !1 : typeof e.hasOwnProperty == "function" ? e.hasOwnProperty("errorStatus") : e.errorStatus ? !0 : !1
    }

    function a(e) {
        if (u(e) && _.isObject(e.errorStatus)) {
            var t = e.errorStatus, n = f(t.description);
            l(o, t, t.code, n)
        }
        return e
    }

    function f(e) {
        var t = e.match(/duration=\d+/gi);
        if (t !== null && t.length > 0) {
            var n = t[0].match(/\d+/g);
            if (n !== null && n.length > 0)return n[0]
        }
        return null
    }

    function l(e, t, n, r) {
        return e.hasOwnProperty(n) ? (typeof e[n] == "string" ? t.description = e[n] : typeof e[n] == "function" ? t.description = e[n](r) : l(e[n], t, t.name), t) : (t.description = s.globalError, t)
    }

    function c(t, n) {
        function f(t, n, r) {
            if (t.status === mytt.c.httpStatus.UNAUTHORIZED) {
                appVars.featureIusSignin ? app.toScreen("modules/authwidgets/views/screens/SignInScreen") : app.toScreen("SignInScreen");
                return
            }
            if (this.url && this.url.indexOf("updateInfo") === -1) {
                if (e.shouldRetryRequest(this, t)) {
                    jQuery.ajax(this);
                    return
                }
                var s = "url: " + this.url;
                s += " | responseText: " + t.responseText + " | status: " + t.status, s += " | statusText: " + n + " | errorThrown: " + r, logger.error("Ajax error: " + s)
            }
            _.isFunction(o.error) && o.error.call(o.context, i)
        }

        function l(e) {
            if (u(e)) {
                if (_.isFunction(o.error)) {
                    _.isObject(e.errorStatus) && o.hasOwnProperty("name") && (e.errorStatus.name = o.name);
                    var t = a(e);
                    o.error.call(o.context, t)
                }
            } else _.isFunction(o.success) && o.success.call(o.context, e)
        }

        var s, o = _.extend({}, r, t);
        _.isFunction(o.beforeSend) && o.beforeSend.call(o.context, n), n || (n = {}), o.endpointFunction.length > 0 ? s = o.endpointBase + o.endpointFunction : s = o.url, jQuery.ajax({type: o.type, url: s, async: o.async, data: n, cache: o.cache, error: f, success: l, contentType: typeof o.contentType == "undefined" ? !0 : o.contentType, processData: o.processData, xhr: o.xhr})
    }

    function h(e, t) {
        var n;
        t ? n = _.extend({endpointFunction: "/login"}, e) : n = _.extend({endpointFunction: "/start"}, e), _.isFunction(n.success) && _.wrap(n.success, function (e, t, n) {
            var r = {sessionToken: n.sessionToken.value, userIdentifier: n.value};
            e.call(t, r)
        }), c(n, t)
    }

    function p(e) {
        var t = _.extend({endpointFunction: "/endSession"}, e);
        c(t)
    }

    function d(e) {
        var t = _.extend({endpointFunction: "/forgetUser"}, e);
        c(t)
    }

    function v(e) {
        var t = _.extend({endpointFunction: "/validateSession"}, e);
        c(t)
    }

    function m(e) {
        var t = _.extend({endpointFunction: "/getIAMSession"}, e);
        c(t)
    }

    function g(e, t) {
        var n = _.extend({endpointFunction: "/updateSession"}, e);
        c(n, t)
    }

    function y(e, t) {
        var n = _.extend({endpointFunction: "/updateInfo"}, e);
        c(n, t)
    }

    function b(e, t) {
        var n = _.extend({endpointFunction: "/createAccount", name: "CreateAccount"}, e);
        c(n, t)
    }

    function w(e) {
        var t = _.extend({endpointFunction: "/getAccount"}, e);
        c(t)
    }

    function E(e) {
        var t = _.extend({endpointFunction: "/isAccountFederated", type: "get"}, e);
        c(t)
    }

    function S(e, t) {
        var n = _.extend({endpointFunction: "/linkAccount"}, e);
        c(n, t)
    }

    function x(e, t) {
        var n = _.extend({endpointFunction: "/unlinkAccount"}, e);
        c(n, t)
    }

    function T(e, t) {
        var n = _.extend({endpointFunction: "/updateMobile"}, e);
        c(n, t)
    }

    function N(e, t) {
        var n = _.extend({endpointFunction: "/updateEmailInfo"}, e);
        c(n, t)
    }

    function C(e, t) {
        var n = _.extend({endpointFunction: "/updateUserID", name: "UpdateAccount"}, e);
        c(n, t)
    }

    function k(e, t) {
        var n = _.extend({endpointFunction: "/updatePassword"}, e);
        c(n, t)
    }

    function L(e, t) {
        var n = _.extend({endpointFunction: "/updatePersonalInfo"}, e);
        c(n, t)
    }

    function A(e, t) {
        var n = _.extend({endpointFunction: "/updateSecurityInfo"}, e);
        c(n, t)
    }

    function O(e, t) {
        var n = _.extend({endpointFunction: "/getUserState", type: "get"}, e);
        c(n, t)
    }

    function M(e, t) {
        var n = _.extend({endpointFunction: "/getUserStateLite", type: "get"}, e);
        c(n, t)
    }

    function D(e, t) {
        var n = _.extend({endpointFunction: "/getTaxReturnsDetail", type: "get"}, e);
        c(n, t)
    }

    function P(e, t) {
        var n = _.extend({endpointFunction: "/getTaxReturnBinary", type: "get"}, e);
        c(n, t)
    }

    function H(e, t) {
        var n = _.extend({endpointFunction: "/getHealthcareState", type: "get"}, e);
        c(n, t)
    }

    function B(e, t) {
        var n = _.extend({endpointFunction: "/getValidateConsent", type: "get"}, e);
        c(n, t)
    }

    function j(e, t) {
        var n = _.extend({endpointFunction: "/getBenefitList", type: "get"}, e);
        c(n, t)
    }

    function F(e) {
        logger.log("Doing matt logging");
        var t = _.extend({endpointFunction: "/writeMattLog", type: "post"}, e);
        c(t)
    }

    function I(e, t) {
        var n = _.extend({endpointFunction: "/getPricingDetails"}, e);
        c(n, t)
    }

    function q(e, t) {
        var n = _.extend({endpointFunction: "/getPriorYearUserState"}, e);
        c(n, t)
    }

    function R(e, t) {
        var n = _.extend({endpointFunction: "/getOrderHistory", type: "get"}, e);
        c(n, t)
    }

    function U(e, t) {
        var n = _.extend({endpointFunction: "/getOrderHistoryDetails", type: "get"}, e);
        c(n, t)
    }

    function z(e) {
        var t = _.extend({endpointFunction: "/createCsrf"}, e);
        c(t)
    }

    function W(e) {
        var t = _.extend({endpointFunction: "/clearCfpSession"}, e);
        c(t)
    }

    function X(e) {
        var t = _.extend({endpointFunction: "/docs", type: "get"}, e);
        c(t)
    }

    function V(e, t) {
        var n = _.extend({endpointFunction: "/docs", type: "post"}, e);
        c(n, t)
    }

    function $(e) {
        var t = _.extend({type: "delete"}, e);
        c(t, {})
    }

    function J(e, t, n) {
        if (!n)return n;
        var r = _.extend({endpointFunction: "/docs/" + n, type: "post"}, e);
        c(r, t)
    }

    function K(e, t) {
        var n = _.extend({endpointFunction: "/docs/" + t.docID, type: "get"}, e);
        c(n, t)
    }

    function Q(e, t) {
        var n = _.extend({endpointFunction: "/taxdocs", type: "get"}, e);
        c(n, t)
    }

    function G(e, t) {
        var n = _.extend({endpointFunction: "/offerings", type: "get"}, e);
        c(n, t)
    }

    function Y(e, t) {
        var n = _.extend({endpointFunction: "/getUserRefund", type: "get"}, e);
        c(n, t)
    }

    function Z(e, t) {
        var n = _.extend({endpointFunction: "/getInstaRefund", type: "get"}, e);
        c(n, t)
    }

    var t = "application/x-www-form-urlencoded", n = "json", r = {context: null, version: null, namespaceBase: null, endpointBase: "/svc", endpointFunction: "", async: !0, convertXml: !0, type: "post", contentType: t, dataType: n, cache: !1, error: null, success: null, beforeSend: null, createCookie: null, readCookie: null, deleteCookie: null, startAnonSession: !0, sim: !1, simFlag: null}, i = {errorStatus: {code: "9", description: "Service encountered an unexpected error processing the request", scope: "JS"}}, s = {unableToMatchAccountInfo: "We weren't able to match an account with the information you provided. Please double-check it and try again.", userIdNotAvailable: 'This user ID is already taken. You can <a href="' + appVars.myTTDomain + "/" + window.location.search + '">sign in</a> or <a href="' + appVars.myTTDomain + "/" + window.location.search + '#recovery">recover your account.</a>', userIdNotAvailableForEdit: "This user ID is already taken. Please choose a different one.", userIdContainsSpaces: "Please choose a user ID that does not have any spaces.", passwordResetExpired: "We weren't able to reset your password. Either the link expired or was already used. If you can't remember your password, you can reset it again.", unableToFindEmailAddresses: "We weren't able to find the e-mail address(es) you entered. Please try any additional addresses below.", accountDisabled15Mins: "For security reasons, your account has been disabled for 15 minutes. Please check your entries and try again later.", userIdInPassword: "Your password must not contain any part of your user ID, any spaces, or any simple combination of numbers or letters. (Example: 12345, AAABBB.)", inactiveSessionEnded: "We've signed you out. You were idle for 20 minutes and we want to keep your information secure. If you want to sign back in, enter your info below. ", cookiesDisabled: "TurboTax Online works best with cookies turned on. Please enable them in your Web browser preferences and try again.", globalError: "Sorry, we ran into an unexpected error. Please try again.", disallowedPassword: "The password you entered is not strong enough. We recommend using a less common word.", invalidUserId: "This is not a valid user ID. Please enter a new one.", incorrectSecurityQuestionAnswer: "This doesn't match what we have on file for you. Please try again.", createAccountSessionExists: 'To create a new account, you must first <a class="signOut" automationid="signOut" href="javascript:void(0);">sign out</a>.', blankPassword: "Your password may not be blank. Please enter a password.", blankEmail: "Your email address may not blank. Please enter an email.", blankDocumentID: "Your document ID is blank. Please enter the document ID.", accountDisabled15Mins: function (e) {
        return e = typeof e == "undefined" || e === null ? 15 : e, "Account locked because the info entered doesn't match our records. Try again in " + e + " minutes." + ' <a href="http://' + appVars.turboTaxComDomain + '/support/iq/Signing-In/Message---Account-has-been-locked-because-the-user-IDs-or-passwords-don-t-match----/SLN64616.html" target="_blank">More Info</a>'
    }, accountDisabled60minOnInvalidSecurityCredentials: function (e) {
        return e = typeof e == "undefined" || e === null ? 60 : e, "Account locked because the info entered doesn't match our records. Try again in " + e + " minutes." + ' <a href="http://' + appVars.turboTaxComDomain + '/support/iq/Signing-In/Message---Sorry--you-ve-exceeded-the-number-of-allowed-sign-in-attempts----/SLN74220.html" target="_blank">More Info</a>'
    }, SizeLimitExceededException: "We can't upload documents bigger than" + appVars.maxFileUploadSize / 1048576 + " MB. Please adjust the size and try uploading again.", authorizationError: 'We weren\'t able to process your request at this time.  You may need to <a class="signOut" automationid="signOut" href="javascript:void(0);">sign out</a> and try again.', authenticationError: "Your session is no longer active.  Please sign in.", genericAccountCreateError: "Unable to create account. Please try again."}, o = {1: s.createAccountSessionExists, 106: s.unableToMatchAccountInfo, 10106: s.unableToMatchAccountInfo, 115: s.unableToMatchAccountInfo, 10115: s.unableToMatchAccountInfo, 107: {CreateAccount: s.userIdNotAvailable, UpdateAccount: s.userIdNotAvailableForEdit}, 10107: {CreateAccount: s.userIdNotAvailable, UpdateAccount: s.userIdNotAvailableForEdit}, 104: s.accountDisabled15Mins, 10104: s.accountDisabled15Mins, 11104: s.accountDisabled60minOnInvalidSecurityCredentials, 108: s.userIdInPassword, 10108: s.userIdInPassword, "011": s.unableToFindEmailAddresses, 10011: s.unableToFindEmailAddresses, 10001: s.incorrectSecurityQuestionAnswer, 116: s.passwordResetExpired, 10116: s.incorrectSecurityQuestionAnswer, 2001: s.userIdContainsSpaces, 1001: s.authenticationError, 1002: s.authorizationError, 10111: s.disallowedPassword, 10105: s.invalidUserId, 10012: s.incorrectSecurityQuestionAnswer, 550: s.SizeLimitExceededException, 11001: s.blankPassword, 11002: s.blankEmail, 11003: s.blankDocumentID}, et = {defaultErrorResponse: i, descriptionMap: s, errorMap: o, remapErrorDescription: a, isError: u, startSession: h, endSession: p, forgetUser: d, validateSession: v, getIamSession: m, updateSession: g, createAccount: b, getAccount: w, updateEmail: N, updateUserID: C, updatePassword: k, updateMobile: T, updatePersonalInfo: L, updateSecurityInfo: A, getUserState: O, getUserStateLite: M, getTaxReturnsDetail: D, createCsrf: z, getOrderHistory: R, getOrderHistoryDetails: U, clearCfpSession: W, isAccountFederated: E, linkAccount: S, unlinkAccount: x, updateInfo: y, getDocStoreFiles: X, getDocument: K, getTaxDocuments: Q, updateDocument: J, deleteDocument: $, createDocument: V, getHealthcareState: H, getPricingDetails: I, getPriorYearUserState: q, writeMattLog: F, getTaxReturnBinary: P, getValidateConsent: B, getBenefitList: j, getOfferings: G, getUserRefund: Y, getInstaRefund: Z};
    return et
}), define("base/Component", [], function () {
    return Backbone.Component = function () {
        this.initialize.apply(this, arguments)
    }, _.extend(Backbone.Component.prototype, {initialize: function () {
        return this
    }}), Backbone.Component.extend = Backbone.View.extend, Backbone.Component
}), define("components/FeatureSwitch", [], function () {
    var e = {isEnabled: function (e) {
        if (appVars.hasOwnProperty(e)) {
            var t = appVars[e];
            return _.isBoolean(t) ? t === !0 : _.isString(t) ? t === "true" : _.isFunction(t) ? t.call(t) : !1
        }
        return!1
    }};
    return e
}), define("components/SecurityComponent", ["cfp", "base/Component", "components/FeatureSwitch"], function (e, t, n) {
    var r = t.extend({authenticated: !1, warmState: !1, authNotRequired: null, authLevel: 0, initialize: function (e) {
        e = e || {}, _.defaults(e, {authNotRequired: [], singleFactorAuthRequired: []}), this.authNotRequired = e.authNotRequired, this.singleFactorAuthRequired = e.singleFactorAuthRequired;
        var t = mytt.$.cookie("authState");
        this.setAuthLevel(t), app.on(mytt.c.events.CREATEACCOUNT_SUCCESS, function () {
            this.authenticated = !0, this.authLevel = mytt.c.authLevel.SINGLE_FACTOR_AUTHENTICATION, this.warmState = !1
        }, this)
    }, setAuthLevel: function (e) {
        if (mytt.c.authLevel[e])this.authLevel = mytt.c.authLevel[e]; else if (_.isString(e) || _.isNumber(e)) {
            _.isString(e) && (e = parseInt(e));
            if (e) {
                var t = _.find(mytt.c.authLevel, function (t) {
                    return t == e
                });
                t && (this.authLevel = t)
            } else this.authLevel = mytt.c.authLevel.UNKNOWN
        } else this.authLevel = mytt.c.authLevel.UNKNOWN;
        this.setAuthVars()
    }, setAuthVars: function () {
        this.authenticated = this.isMinimallyAuthenticatedAt(mytt.c.authLevel.STRONG_SINGLE_FACTOR_PUBLIC_AUTHENTICATION), this.authenticated == 0 && (this.authenticated = this.isLowerAuthAllowed())
    }, isMinimallyAuthenticatedAt: function (e) {
        return this.authLevel >= e
    }, isAuthNotRequired: function (e) {
        return _.indexOf(this.authNotRequired, e) != -1
    }, isAuthenticated: function () {
        return this.authenticated
    }, isAuthenticatedForScreen: function (e) {
        if (n.isEnabled("featureSecurityIncrease")) {
            if (this.authLevel >= mytt.c.authLevel.STRONG_SINGLE_FACTOR_PRIVATE_AUTHENTICATION)return!0;
            if (this.authLevel == mytt.c.authLevel.SINGLE_FACTOR_AUTHENTICATION && this.isSingleFactorAuthRequired(e))return!0
        } else if (this.isLowerAuthAllowed())return!0;
        return this.isAuthenticated() || this.isAuthNotRequired(e)
    }, isLowerAuthAllowed: function () {
        return n.isEnabled("featureSecurityIncrease") == 0 && this.authLevel >= mytt.c.authLevel.SINGLE_FACTOR_AUTHENTICATION
    }, isSingleFactorAuthRequired: function (e) {
        return _.indexOf(this.singleFactorAuthRequired, e) != -1
    }, isWarmState: function () {
        return!1
    }, isAnonymous: function () {
        return this.authenticated === !1
    }, hasUserName: function () {
        return!_.isUndefined(mytt.$.cookie("userName"))
    }, getUserName: function () {
        return mytt.$.cookie("userName")
    }, removeUserName: function () {
        mytt.$.removeCookie("userName", {path: "/"})
    }, getFirstName: function () {
        return mytt.$.cookie("firstName")
    }, removeFirstName: function () {
        mytt.$.removeCookie("firstName", {path: "/"})
    }, hasSessionToken: function () {
        return!_.isUndefined(mytt.$.cookie("sessionToken"))
    }, hasUserIdentifier: function () {
        return!_.isUndefined(mytt.$.cookie("userIdentifier"))
    }, removeSessionToken: function () {
        mytt.$.removeCookie("sessionToken", {path: "/"})
    }, clearAuthState: function () {
        this.authenticated = !1, this.hasSessionToken() && this.removeSessionToken(), this.hasUserIdentifier() && this.removeUserIdentifier(), app.security.authLevel = 0
    }, removeUserIdentifier: function () {
        mytt.$.removeCookie("userIdentifier", {path: "/"})
    }, signIn: function (t, r) {
        logger.log("SecurityComponent:signIn"), n.isEnabled("featureSecurityIncrease") && r.set("deviceId", app.model.get("did")), _.extend({context: null, success: null, error: null, complete: null}, t), e.startSession({context: this, success: function (e) {
            this.onSignInSuccess.call(this, e, t)
        }, error: function (e) {
            this.onSignInError.call(this, e, t)
        }}, r.toJSON())
    }, updateSession: function (t, n) {
        logger.log("SecurityComponent:updateSession"), _.extend({context: null, success: null, error: null, complete: null}, t), n.set("deviceId", app.model.get("did")), e.updateSession({context: this, success: function (e) {
            this.onUpdateSessionSuccess.call(this, e, t)
        }, error: function (e) {
            this.onSignInError.call(this, e, t)
        }}, n.toJSON())
    }, onSignInSuccess: function (e, t, r) {
        logger.log("onSIGNINSUCCESS IN SECURITY COMPONENTE"), logger.log("supressucess is"), logger.log(r), this.setAuthLevel(e.aal), this.isMinimallyAuthenticatedAt(mytt.c.authLevel.STRONG_SINGLE_FACTOR_PUBLIC_AUTHENTICATION) || !n.isEnabled("featureSecurityIncrease") ? (this.authenticated = !0, _.isFunction(t.success) && t.success.call(t.context), logger.log("supressucess is"), logger.log(r), r !== !0 && app.trigger(mytt.c.events.SIGNIN_SUCCESS)) : this.isMinimallyAuthenticatedAt(mytt.c.authLevel.SINGLE_FACTOR_AUTHENTICATION) ? (this.authenticated = !1, this.authLevel = mytt.c.authLevel.SINGLE_FACTOR_AUTHENTICATION, app.model.set("securityQuestion", e.question), app.model.set("altAuthOnFile", e.hasAltAuthInfo), app.toScreen("SignInUnrecognizedDeviceScreen")) : app.toScreen("SignInScreen")
    }, onUpdateSessionSuccess: function (e, t, n) {
        this.setAuthLevel(e.aal), this.isMinimallyAuthenticatedAt(mytt.c.authLevel.STRONG_SINGLE_FACTOR_PUBLIC_AUTHENTICATION) ? (this.authenticated = !0, _.isFunction(t.success) && t.success.call(t.context)) : app.toScreen("SignInScreen")
    }, onSignInError: function (e, t) {
        _.isFunction(t.error) && t.error.call(t.context, e), app.trigger(mytt.c.events.SIGNIN_ERROR, e)
    }, signOut: function (t) {
        logger.log("SecurityComponent:signOut"), _.extend({context: null, success: null, error: null, complete: null}, t), app.trigger(mytt.c.events.SIGNOUT_START), e.endSession({context: this, success: function () {
            this.clearAuthState(), window.location.hash = "", _.isFunction(t.success) && t.success.call(t.context), _.isFunction(t.complete) && t.complete.call(t.context), app.trigger(mytt.c.events.SIGNOUT_SUCCESS)
        }, error: function (e) {
            this.clearAuthState(), window.location.hash = "";
            var n = "Received error during sign out: " + e.errorStatus.description;
            logger.error(n), _.isFunction(t.error) && t.error.call(t.context), _.isFunction(t.complete) && t.complete.call(t.context), app.trigger(mytt.c.events.SIGNOUT_ERROR)
        }})
    }});
    return r
}), define("components/TemplateFactoryComponent", ["base/Component"], function (e) {
    var t = e.extend({templateCache: null, initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.templateCache = {}
    }, getPopupTemplate: function () {
        return _.isUndefined(arguments) && logger.warn("Cannot read property '0' of reference undefined: arguments in TemplateFactoryComponent: getPopupTemplate"), arguments[0] = "popups/" + arguments[0], this.getTemplate.apply(this, arguments)
    }, getNotificationTemplate: function () {
        return _.isUndefined(arguments) && logger.warn("Cannot read property '0' of reference undefined: arguments in TemplateFactoryComponent: getNotificationTemplate"), arguments[0] = "notifications/" + arguments[0], this.getTemplate.apply(this, arguments)
    }, getTemplate: function (e, t, n) {
        logger.log(e);
        if (arguments.length == 1)return this.getTemplateLegacy(e);
        var r = this.getTemplateCacheKey(e);
        if (arguments.length == 2 && _.isString(t)) {
            if (this.templateCache.hasOwnProperty(r)) {
                var i = 'Template "' + e + '" fetched from cache';
                return logger.log(i), this.templateCache[r]
            }
            return this.getTemplateFromSource.apply(this, arguments)
        }
        if (this.templateCache.hasOwnProperty(r)) {
            var i = 'Template "' + e + '" fetched from cache';
            logger.log(i), t.call(n, this.templateCache[r])
        }
        return this.getTemplateFromServer.apply(this, arguments), null
    }, getTemplateFromServer: function (e, t, n) {
        var r = this.getTemplateCacheKey(e), i = this;
        e.indexOf("modules/") < 0 ? e = "templates/" + e + ".html" : e += ".html", require(["text!" + e], function (s) {
            var o = 'Template "' + e + '" fetched from server';
            logger.log(o), i.templateCache[r] = Handlebars.compile(s), t.call(n, i.templateCache[r])
        })
    }, getTemplateFromSource: function (e, t) {
        var n = this.getTemplateCacheKey(e), r = 'Template "' + e + '" fetched from source';
        return logger.log(r), this.templateCache[n] = Handlebars.compile(t), this.templateCache[n]
    }, getTemplateLegacy: function (e) {
        var t = 'Legacy getTemplate for "' + e + '"';
        logger.warn(t);
        var n = e.charAt(0).toLowerCase() + e.substring(1);
        if (Handlebars.hasOwnProperty("templates") && Handlebars.templates.hasOwnProperty(n)) {
            var t = "Return handlebars template " + n;
            return logger.info(t), Handlebars.template(Handlebars.templates[n])
        }
        if (this.templateCache.hasOwnProperty(e))return this.templateCache[e];
        var r = this.getDomIdOfTemplate(e), i = $(r).html();
        if (_.isUndefined(i)) {
            var t = 'No template source found for template name "' + e + '"';
            return logger.error(), function () {
            }
        }
        return this.templateCache[e] = Handlebars.compile(i), this.templateCache[e]
    }, getTemplateCacheKey: function (e) {
        return e.replace("/", "_", "g")
    }, getDomIdOfTemplate: function (e) {
        var t = /[A-Z][a-z]+/g, n, r = "";
        while ((n = t.exec(e)) !== null)r.length == 0 ? r += "#" + n[0].toLowerCase() : r += "-" + n[0].toLowerCase();
        return r += "-template", r
    }});
    return t
}), define("components/DataCache", [], function () {
    var e = {}, t = {getFromCache: function (t, n) {
        n || (n = t.url);
        if (t.cacheResponse && t.type == "GET" && e.hasOwnProperty(n)) {
            var r = e[n] ? $.extend(!0, {}, e[n]) : null;
            if (r !== null) {
                var i = "Served " + n + " response from cache";
                return logger.info(i), r
            }
        } else e[n] = null;
        return null
    }, removeFromCache: function (t, n) {
        n || (n = t.url), e[n] = null
    }, saveToCache: function (t, n, r) {
        r || (r = t.url), t.cacheResponse && (e[r] = $.extend(!0, {}, n))
    }, getCacheKey: function (e) {
        var t = e;
        _.isFunction(e) && (t = e.prototype);
        var n = _.isFunction(t.cacheKey) ? t.cacheKey() : t.cacheKey;
        return n || (n = _.isFunction(t.url) ? t.url() : t.url), n ? n : null
    }, clear: function () {
        _.each(e, function (t, n) {
            t = null, e[n] = null
        }), e = {}
    }, dumpCache: function () {
        _.each(e, function (e, t) {
            logger.log(t + ":"), logger.log(e), logger.log("--")
        })
    }, getResponseCache: function () {
        return $.extend(!0, {}, e)
    }};
    return t
}), define("components/DataRegistryComponent", ["cfp", "base/Component", "utility/RequestRetryHandler", "components/DataCache"], function (e, t, n, r) {
    var i = t.extend({cache: null, responseCache: null, openRequests: null, defaults: null, initialize: function (e) {
        return t.prototype.initialize.apply(this, arguments), this.cache = {}, this.responseCache = {}, this.openRequests = {}, this.defaults = _.extend({modelClass: Backbone.Model, load: "", loadOptions: {}, success: function () {
        }, error: function () {
        }, whileLoading: function (e) {
            app.wrapper.enableLoadingState.call(app.wrapper, e)
        }, preparse: function (e) {
            return e
        }, cache: !0, cacheResponse: !0, forceReload: !1, context: null}, e), app.on(mytt.c.events.SCREEN_LOAD_BEGIN, this.abort, this), this
    }, abort: function () {
        _.each(this.openRequests, function (e) {
            e.abort()
        }), this.openRequests = {}
    }, sync: function (t, i, s) {
        var o = function (e, t) {
            return!e || !e[t] ? null : _.isFunction(e[t]) ? e[t]() : e[t]
        }, u = function () {
            throw new Error('A "url" property or function must be specified')
        }, a = {create: "POST", update: "PUT", "delete": "DELETE", read: "GET"}, f = a[t];
        s || (s = {});
        var l = {type: f, dataType: "json", cache: !1, cacheResponse: !0, forceReload: !1, checkAuth: !0, whileLoading: app.dataRegistry.defaults.whileLoading, loadingMessage: null, noLoading: !1};
        s.url || (l.url = o(i, "url") || u()), !s.data && i && (t == "create" || t == "update") && (l.contentType = "application/json", l.data = JSON.stringify(i.toJSON())), Backbone.emulateJSON && (l.contentType = "application/x-www-form-urlencoded", l.data = l.data ? {model: l.data} : {}), Backbone.emulateHTTP && (f === "PUT" || f === "DELETE") && (Backbone.emulateJSON && (l.data._method = f), l.type = "POST", l.beforeSend = function (e) {
            e.setRequestHeader("X-HTTP-Method-Override", f)
        }), l.type !== "GET" && !Backbone.emulateJSON && (l.processData = !1);
        var c = app.getCurrentScreenName(), h = _.extend(l, s), p = r.getCacheKey(i);
        if (s.forceReload)r.removeFromCache(h, p); else {
            var d = r.getFromCache(h, p);
            if (d != null && _.isFunction(h.success)) {
                h.success.call(h.context, d);
                return
            }
        }
        s.noLoading == 0 && (h.loadingMessage != null ? h.whileLoading.call(h.context, h.loadingMessage) : h.whileLoading.call(h.context));
        var v = function () {
            if (h.checkAuth)if (h.curAuthLevel) {
                if (app.security.isMinimallyAuthenticatedAt(h.curAuthLevel) == 0)return!0
            } else if (app.security.isAuthenticated() == 0)return!0;
            return app.getCurrentScreenName() != c ? !0 : !1
        }, m = function (t) {
            delete app.dataRegistry.openRequests[y];
            if (n.shouldRetryRequest(this, t)) {
                jQuery.ajax(this);
                return
            }
            if (v())return;
            _.isFunction(h.error) && h.error.call(h.context, e.defaultErrorResponse)
        }, g = function (t, n, s) {
            delete app.dataRegistry.openRequests[y];
            if (v())return;
            if (e.isError(t)) {
                if (_.isFunction(h.error)) {
                    var o = e.remapErrorDescription(t);
                    h.error.call(h.context, o)
                }
            } else r.saveToCache(h, t, r.getCacheKey(i)), _.isFunction(h.success) && h.success.call(h.context, t)
        }, y = _.uniqueId("ajax-"), b = jQuery.ajax({type: h.type, url: h.url, async: h.async, contentType: h.contentType, data: h.data, dataType: h.dataType, processData: h.processData, cache: h.cache, error: m, success: g});
        app.dataRegistry.openRequests[y] = b
    }, fetch: function (t) {
        var n = function (e, n) {
            n = t.preparse.call(t.context, n);
            var r = new e(n, {parse: !0});
            return r
        };
        _.defaults(t, this.defaults), t.cacheResponse = t.cache;
        if (t.load.substring(0, 3) == "get") {
            t.type = "GET";
            var i = t.load + ":" + $.param(t.loadOptions);
            if (t.forceReload)r.removeFromCache(t, i); else {
                var s = r.getFromCache(t, i);
                if (s) {
                    var o = n(t.modelClass, s);
                    t.success.call(t.context, o, !1);
                    return
                }
            }
        }
        var u = app.getCurrentScreenName();
        t.noLoading == 1 ? logger.log("skip loading display") : t.loadingMessage != null ? t.whileLoading.call(t.context, t.loadingMessage) : t.whileLoading.call(t.context);
        if (_.isFunction(e[t.load]) == 0) {
            var a = 'Unknown CFP service call: "' + t.load + '"';
            logger.error(a)
        }
        e[t.load]({success: function (e) {
            if (app.security.isAuthenticated() == 0 || app.getCurrentScreenName() != u)return;
            t.cacheResponse && r.saveToCache(t, e, i);
            var s = n(t.modelClass, e);
            t.success.call(t.context, s, !0)
        }, error: function (e) {
            if (app.security.isAuthenticated() == 0 || app.getCurrentScreenName() != u)return;
            t.error.call(t.context, e)
        }, context: this}, t.loadOptions)
    }, clear: function () {
        r.clear()
    }});
    return i
}), define("components/IdleTimerComponent", ["base/Component", "cfp"], function (e, t) {
    var n = e.extend({timerContainer: {}, renewTime: 10, warningTime: 60, initialize: function () {
        return e.prototype.initialize.apply(this, arguments), app.security.isAuthenticated() && this.startAll(), app.on(mytt.c.events.SIGNIN_SUCCESS, this.startAll, this), app.on(mytt.c.events.SIGNOUT_START, this.clearTimers, this), app.on(mytt.c.events.SCREEN_LOAD_SUCCESS, this.resetIdleTimer, this), this
    }, minutesToMilliseconds: function (e) {
        var t = parseFloat(e) * 60;
        return this.secondsToMilliseconds(t)
    }, secondsToMilliseconds: function (e) {
        return parseFloat(e) * 1e3
    }, startAll: function () {
        this.startIdleTimer(), this.startRenewTimer()
    }, startRenewTimer: function () {
        var e = this;
        this.timerContainer.hasOwnProperty("renewTimer") && clearTimeout(this.timerContainer.renewTimer), this.timerContainer.renewTimer = setTimeout(function () {
            e.renewSession.call(e, e.startRenewTimer)
        }, this.minutesToMilliseconds(this.renewTime));
        if (logger.isLoggingLog()) {
            var t = "Session timer started: " + this.renewTime + " minutes";
            logger.log(t)
        }
    }, renewSession: function (e) {
        app.security.isAuthenticated() && t.validateSession({error: function () {
            app.security.signOut({context: this, complete: function () {
                appVars.featureIusSignin ? app.toScreen("modules/authwidgets/views/screens/SignInScreen") : app.toScreen("SignInScreen")
            }})
        }, success: e, context: this})
    }, startIdleTimer: function () {
        var e = this;
        this.timerContainer.hasOwnProperty("idleTimer") && clearTimeout(this.timerContainer.idleTimer);
        var t = this.minutesToMilliseconds(appVars.sessionTimeout) - this.minutesToMilliseconds(1);
        this.timerContainer.idleTimer = setTimeout(function () {
            app.wrapper.darken(), e.startFinalWarning.call(e)
        }, t);
        if (logger.isLoggingLog()) {
            var n = t / 6e4, r = "Idle timer started: " + n + " minutes";
            logger.log(r)
        }
    }, resetIdleTimer: function () {
        this.timerContainer.hasOwnProperty("idleTimer") && (clearTimeout(this.timerContainer.idleTimer), this.startIdleTimer())
    }, slideOutHamburger: function () {
        $("div.overlay").length && ($(".overlay").fadeOut(function () {
            $(this).remove()
        }), $(".navbar").removeClass("active"), $("body").removeClass("nav-active"), $(".global-wrapper").removeClass("burgerTime"), $(".navigationFlyout").removeClass("burgerTime"), $(".bigWhiteBackground").removeClass("burgerTime"), $(".site-footer").removeClass("burgerTime"), setTimeout("$('.global-wrapper').removeClass('menu-slide-in')", 500))
    }, startFinalWarning: function () {
        var e = this;
        if (logger.isLoggingLog()) {
            var t = "Session idle (" + this.warningTime + " seconds remaining) timer started";
            logger.log(t)
        }
        this.timerContainer.hasOwnProperty("finalWarningTimer") && clearTimeout(this.timerContainer.finalWarningTimer), this.slideOutHamburger(), app.wrapper.darken(), app.trigger(mytt.c.events.ONE_MINUTE_TIMER_START), this.timerContainer.finalWarningTimer = setTimeout(function () {
            e.onSessionTimeout.call(e)
        }, this.secondsToMilliseconds(this.warningTime))
    }, onSessionTimeout: function () {
        this.clearTimers(), logger.isLoggingLog() && logger.log("Session expired due to idleness"), app.trigger(mytt.c.events.ONE_MINUTE_TIMER_END), app.security.signOut({context: this, complete: function () {
            app.trigger(mytt.c.events.TIMEOUT_SUCCESS), this.slideOutHamburger(), appVars.featureIusSignin ? app.toScreen("modules/authwidgets/views/screens/SignInScreen") : app.toScreen("SignInScreen")
        }})
    }, reset: function () {
        logger.isLoggingLog() && logger.log("Session reset requested"), this.clearTimers(), this.renewSession(this.startAll)
    }, clearTimers: function () {
        for (var e in this.timerContainer)clearTimeout(this.timerContainer[e]);
        this.timerContainer = {}, logger.isLoggingLog() && logger.log("Session timers cleared")
    }});
    return n
}), define("models/Offerings", [], function () {
    var e = Backbone.Model.extend({}), t = Backbone.Collection.extend({url: "/svc/offerings", cacheKey: "offerings", parse: function (t) {
        var n = {};
        return n.offerings = t.offering, n.offerings.length ? n.offerings = _.map(n.offerings, function (t) {
            return new e(t)
        }) : n.offerings = null, n.offerings
    }, getOfferingValue: function (e, t) {
        var n = this.getOfferingOfType(e);
        if (n == null)return null;
        var r = n.get("taxYear");
        if (r == null)return null;
        var i = parseInt(t);
        for (var s = 0, o = r.length; s < o; s++)if (r[s].year === i)return r[s].value;
        return null
    }, getOfferingOfType: function (e) {
        var t = this.where({offeringType: e});
        return _.isUndefined(t) && logger.warn("Cannot read property '0' of reference undefined: offering in Offerings: getOfferingOfType"), t.length == 0 ? null : t[0]
    }, getProductOfferingValue: function (e) {
        return this.getOfferingValue(mytt.c.offering.PRODUCT, e)
    }, getTransitionalOfferingValue: function (e) {
        return this.getOfferingValue(mytt.c.offering.TRANSITIONAL, e)
    }, getCurrentProductOffering: function () {
        return this.getProductOfferingValue(appVars.taxYear)
    }, getCurrentTransitionalProductOffering: function () {
        return this.getTransitionalOfferingValue(appVars.taxYear)
    }});
    return t
}), define("mixins/TemplateContext", [], function () {
    var e = {setContext: function (e) {
        this._templateContext = {}, _.isArray(e) ? _.each(e, function (e) {
            if (_.isFunction(this[e]))this._templateContext[e] = this[e]; else {
                var t = e + " is not a valid method.";
                logger.error(t)
            }
        }, this) : _.isObject(e) ? this._templateContext = e : logger.error("Bad context received.")
    }, getContext: function (e) {
        if (!this.hasOwnProperty("_templateContext")) {
            var t = _.functions(Backbone.Model.prototype), n = ["constructor", "getContext", "setContext", "templateContextExclusions"];
            if (_.isFunction(this.templateContextExclusions)) {
                var r = this.templateContextExclusions.call(this);
                n = n.concat(r)
            }
            var i = _.functions(this), s = _.difference(i, t, n);
            this.setContext(s)
        }
        var o = this.toJSON();
        return _.each(this._templateContext, function (e, t) {
            _.isFunction(e) ? o[t] = e.call(this) : o[t] = e
        }, this), _.isObject(e) ? _.extend(o, e) : o
    }};
    return e
}), define("base/Model", ["mixins/TemplateContext"], function (e) {
    var t = Backbone.Model.extend({});
    return _.extend(t.prototype, e), t
}), define("models/inner/RefundRange", [], function () {
    var e = Backbone.Model.extend({parse: function (e) {
        return(_.isUndefined(e.start) || _.isUndefined(e.finish)) && mytt.c.refundRangePositions.UNAVAILABLE, e.start = this.setRefundDate(e.start, !0), e.finish = this.setRefundDate(e.finish, !1), e
    }, initialize: function () {
        this.set("position", this.setPositionInRange())
    }, setRefundDate: function (e, t) {
        var n = {}, r = e.value;
        return e.inclusive || (t ? r = moment(e.value).subtract("days", 1).valueOf() : r = moment(e.value).add("days", 1).valueOf()), n.value = r, n.date = moment(new Date(r)), n
    }, setPositionInRange: function () {
        if (_.isUndefined(this.get("start").value) || _.isUndefined(this.get("finish").value))return mytt.c.refundRangePositions.RANGE_UNAVAILABLE;
        var e = moment(appVars.currentDate).sod(), t = moment(this.get("start").value).sod(), n = moment(this.get("finish").value).sod();
        if (e.diff(t, "days") >= 0 && e.diff(n, "days") <= 0)return mytt.c.refundRangePositions.DURING;
        if (e.diff(n, "days") > 0)return mytt.c.refundRangePositions.AFTER;
        if (e.diff(t, "days") < 0)return mytt.c.refundRangePositions.BEFORE
    }});
    return e
}), define("models/inner/RefundInfo", ["base/Model", "models/inner/RefundRange"], function (e, t) {
    var n = e.extend({initialize: function () {
        return this.set("hasBalanceDue", this.hasBalanceDue()), this.set("hasRefund", this.hasRefund()), this.set("hasZeroBalance", this.hasZeroBalance()), this.set("hasRefundEstimate", this.hasRefundEstimate()), this.set("refundType", this.refundType()), this.set("refundEndOfLooseRange", this.refundEndOfLooseRange()), this.set("refundEndOfLooseRangePlusOne", this.refundEndOfLooseRangePlusOne()), this.set("refundDeliveryPhase", this.refundDeliveryPhase()), this.set("afterEstimatedDate", this.afterEstimatedDate()), this.set("refundRangeText", this.refundRangeText()), this.set("beforeEndOfTightRange", this.beforeEndOfTightRange()), this.set("beforeStartOfTightRange", this.beforeStartOfTightRange()), this.set("percentFundedAvailable", this.percentFundedAvailable()), this.set("percentFundedHidden", this.percentFundedHidden()), this
    }, parse: function (e) {
        var n = e;
        return!_.isUndefined(e.refundOrPaymentAmount) && !_.isNull(e.refundOrPaymentAmount) && (n.refundOrPaymentAmount = e.refundOrPaymentAmount.amount), !_.isUndefined(e.refundRangeLoose) && !_.isNull(e.refundRangeLoose) ? (n.refundRangeLoose = new t(e.refundRangeLoose, {parse: !0}), !_.isUndefined(e.refundRangeTight) && !_.isNull(e.refundRangeTight) ? e["refundRangeLoose"].get("start").value != e["refundRangeTight"].start.value || e["refundRangeLoose"].get("finish").value != e["refundRangeTight"].finish.value ? n.refundRangeTight = new t(e.refundRangeTight, {parse: !0}) : n.refundRangeTight = !1 : n.refundRangeTight = !1) : (n.refundRangeLoose = !1, n.refundRangeTight = !1), n
    }, afterEstimatedDate: function () {
        return this.hasRefundEstimate() ? appVars.currentDate > this.get("refundRangeTight").get("finish").value : !1
    }, percentFundedAvailable: function () {
        return this.get("percentFundedForAckDate") < 60
    }, percentFundedHidden: function () {
        return this.get("percentFundedForAckDate") >= 60
    }, refundType: function () {
        if (parseInt(this.get("refundOrPaymentAmount")) <= 0)return mytt.c.refundType.BALANCE_DUE;
        if (parseInt(this.get("refundOrPaymentAmount")) > 0)return mytt.c.refundType.REFUND;
        if (parseInt(this.get("refundOrPaymentAmount")) == 0)return mytt.c.refundType.ZERO_BALANCE
    }, isCheckByMail: function () {
        var e = this.get("paymentMethodType");
        return e ? e == mytt.c.refundPaymentMethodType.REFUND_RETURN_TRADITIONAL_CHECK || e == mytt.c.refundPaymentMethodType.BALANCE_DUE_RETURN_TRADITIONAL_CHECK : !1
    }, hasBalanceDue: function () {
        var e = this.get("paymentMethodType");
        return e ? e == mytt.c.refundPaymentMethodType.BALANCE_DUE_RETURN_TRADITIONAL_CHECK || e == mytt.c.refundPaymentMethodType.BALANCE_DUE_RETURN_DIRECT_DEBIT || e == mytt.c.refundPaymentMethodType.BALANCE_DUE_RETURN_CREDIT_CARD_PAYMENT : !1
    }, hasRefund: function () {
        var e = this.get("paymentMethodType");
        return e ? e == mytt.c.refundPaymentMethodType.REFUND_RETURN_TRADITIONAL_CHECK || e == mytt.c.refundPaymentMethodType.REFUND_RETURN_DIRECT_DEPOSIT || e == mytt.c.refundPaymentMethodType.REFUND_RETURN_REFUND_TRANSFER || e == mytt.c.refundPaymentMethodType.EVEN_RETURN : !1
    }, hasZeroBalance: function () {
        var e = this.get("paymentMethodType");
        return e ? e == mytt.c.refundPaymentMethodType.EVEN_RETURN : !1
    }, hasLooseRange: function () {
        return this.get("refundRangeLoose") !== !1
    }, hasRefundEstimate: function () {
        return this.get("refundRangeTight") !== !1
    }, refundEndOfLooseRange: function () {
        if (this.hasLooseRange()) {
            if (_.isUndefined(this.get("refundRangeLoose")))return;
            return this.get("refundRangeLoose").get("finish").date.format("MMMM D")
        }
    }, refundEndOfLooseRangePlusOne: function () {
        if (this.hasLooseRange()) {
            if (_.isUndefined(this.get("refundRangeLoose")))return;
            var e = new moment(this.get("refundRangeLoose").get("finish").date);
            return e.add("days", 1).format("MMMM D")
        }
    }, refundRangeText: function () {
        if (this.hasRefundEstimate())return _.isUndefined(this.get("refundRangeTight")) ? null : this.get("refundRangeTight").get("start").date.month() == this.get("refundRangeTight").get("finish").date.month() ? this.get("refundRangeTight").get("start").date.format("MMMM D") + " – " + this.get("refundRangeTight").get("finish").date.format("D") : this.get("refundRangeTight").get("start").date.format("MMMM D") + " – " + this.get("refundRangeTight").get("finish").date.format("MMMM D")
    }, beforeEndOfTightRange: function () {
        var e = this.refundDeliveryPhase();
        return this.hasRefundEstimate() ? e == mytt.c.refundDeliveryPhase.BEFORE_LOOSE || e == mytt.c.refundDeliveryPhase.WITHIN_LOOSE_BEFORE_TIGHT || e == mytt.c.refundDeliveryPhase.WITHIN_LOOSE_WITHIN_TIGHT : !1
    }, beforeStartOfTightRange: function () {
        var e = this.refundDeliveryPhase();
        return this.hasRefundEstimate() ? e == mytt.c.refundDeliveryPhase.WITHIN_LOOSE_BEFORE_TIGHT : !1
    }, refundDeliveryPhase: function () {
        if (!this.hasLooseRange())return mytt.c.refundDeliveryPhase.RANGE_UNAVAILABLE;
        switch (this.get("refundRangeLoose").get("position")) {
            case"BEFORE":
                return mytt.c.refundDeliveryPhase.BEFORE_LOOSE;
            case"DURING":
                return mytt.c.refundDeliveryPhase.WITHIN_LOOSE;
            case"AFTER":
                return mytt.c.refundDeliveryPhase.AFTER_LOOSE
        }
    }});
    return n
}), define("models/inner/HoldInfo", [], function () {
    var e = Backbone.Model.extend({initialize: function () {
        return this.set("isLateLeg", this.isLateLeg()), this
    }, parse: function (e) {
        return _.isUndefined(e) && logger.warn("Cannot read property '0' of reference undefined: response in HoldInfo: parse"), _.isArray(e) ? e.length < 1 ? null : e.length == 1 ? e[0] : e.length > 1 ? e[e.length - 1] : e : null
    }, isLateLeg: function () {
        return this.attributes.hasOwnProperty("holdMessage") ? this.get("holdType").indexOf("LATE_LEGISLATION") > -1 : null
    }});
    return e
}), define("models/inner/FilingInfo", ["base/Model", "models/inner/RefundInfo", "models/inner/HoldInfo"], function (e, t, n) {
    var r = / /g, i = e.extend({trackOrangeBtn: !1, incompleteOrangeBtn: !1, parse: function (e) {
        return e.hasOwnProperty("refundInfo") && (e.refundInfo = new t(e.refundInfo, {parse: !0})), e.hasOwnProperty("holdInfo") && (e.holdInfo = new n(e.holdInfo, {parse: !0})), e
    }, initialize: function () {
        return e.prototype.initialize.apply(this, arguments), this.setContext({isEfiledRejected: this.isEfiledRejected, isFederal: this.isFederal, hasRefund: this.hasRefund, isFiledPrint: this.isFiledPrint, isEfiledPending: this.isEfiledPending, isHeldLateLeg: this.isHeldLateLeg, returnStatusDateString: this.getReturnStatusDate, agencyReceiveDateString: this.getAgencyReceiveDate, efeReceiveDateString: this.getEfeReceiveDate, taxAuthorityUnderscores: this.setTaxAuthorityUnderscores, returnStatusCustomerMessage: this.setReturnStatus, refundRangeText: this.refundInfo}), this.set("getReturnStatusDateString", this.getReturnStatusDateString()), this.set("wheresMyMoneyMessage", this.wheresMyMoneyMessage()), this.set("unfinished", this.isStarted()), this
    }, isPrintedRefund: function (e) {
        return e ? parseInt(e) ? e.substr(0, 1) == "-" : !0 : !1
    }, isStarted: function () {
        return this.get("returnStatus") == mytt.c.filingStates.STARTED
    }, isEfiledOrPrint: function () {
        return this.isEfiledAccepted() || this.isEfiledPending() || this.isEfiledRejected() || this.isFiledPrint() ? !0 : !1
    }, isEfiled: function () {
        return this.isEfiledAccepted() || this.isEfiledPending() || this.isEfiledRejected() ? !0 : !1
    }, isEfiledAccepted: function () {
        return this.get("returnStatus") == mytt.c.filingStates.EFILED_ACCEPTED
    }, isEfiledPending: function () {
        return this.get("returnStatus") == mytt.c.filingStates.EFILED_PENDING
    }, isEfiledRejected: function () {
        return this.get("returnStatus") == mytt.c.filingStates.EFILED_REJECTED || this.get("returnStatus") == mytt.c.filingStates.EFILED_HAS_ERRORS
    }, isFiledPrint: function () {
        return this.get("returnStatus") == mytt.c.filingStates.FILED_PRINT
    }, isFederal: function () {
        return this.get("taxAuthority") == "Federal"
    }, getRefundInfo: function () {
        return this.get("refundInfo")
    }, getTaxReturnId: function () {
        return this.get("taxReturnId")
    }, getReceivedDateObject: function () {
        return moment(new Date(parseInt(this.get("agencyReceiveDate"))))
    }, getReturnStatusDateString: function () {
        return _.isNull(this.get("returnStatusDate")) ? "" : moment(new Date(parseInt(this.get("returnStatusDate")))).format("MMMM D")
    }, getReturnStatusDateStringSlash: function () {
        return _.isNull(this.get("returnStatusDate")) ? "" : moment(new Date(parseInt(this.get("returnStatusDate")))).format("MM/DD/YY")
    }, getReturnStatusDateStringSlash2: function () {
        return _.isNull(this.get("returnStatusDate")) ? "" : moment(new Date(parseInt(this.get("returnStatusDate")))).format("M/D/YY")
    }, getAgencyReceiveDate: function () {
        return _.isNull(this.get("agencyReceiveDate")) ? "" : moment(new Date(parseInt(this.get("agencyReceiveDate")))).format("MMMM D")
    }, getEfeReceiveDate: function () {
        return _.isNull(this.get("efeReceiveDate")) ? "" : moment(new Date(parseInt(this.get("efeReceiveDate")))).format("MMMM D")
    }, getEfeReceiveDateSlash: function () {
        return _.isNull(this.get("efeReceiveDate")) ? "" : moment(new Date(parseInt(this.get("efeReceiveDate"), 10))).format("MM/DD/YY")
    }, getFormattedDeadline: function () {
        var e = new Date(appVars.filingDeadlineTime);
        if (isNaN(e)) {
            var t = appVars.filingDeadlineTime.split(/\D/);
            e = new Date(Date.UTC(t[0], --t[1] || "", t[2] || "", t[3] || "", t[4] || "", t[5] || "", t[6] || ""))
        }
        var n = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], r = n[e.getMonth()], i = e.getDate(), s = ["st", "nd", "rd", "th"], o = "";
        return i % 10 == 1 ? o = s[0] : i % 10 == 2 ? o = s[1] : i % 10 == 3 ? o = s[2] : o = s[3], r + " " + i + o
    }, setTaxAuthorityUnderscores: function () {
        return _.isUndefined(this.get("taxAuthority")) ? "" : this.get("taxAuthority").replace(r, "_")
    }, isHeldLateLeg: function () {
        if (_.isUndefined(this.get("holdInfo")))return!1;
        var e = this.get("holdInfo").get("isLateLeg");
        return _.isUndefined(e) || _.isNull(e) ? !1 : !0
    }, wasFetchedPreviously: function () {
        var e = this.setTaxAuthorityUnderscores() + "FilingInfoFetched", t = mytt.$.cookie(e);
        if (t === null) {
            var n = parseInt(appVars.taxYear, 10) + 1, r = new Date(n, 11, 1);
            return mytt.$.cookie(e, app.getSessionId(), {path: "/", expires: r}), !1
        }
        return t === app.getSessionId() ? !1 : !0
    }, wheresMyMoneyMessage: function () {
        var e = "", t = "";
        if (_.isUndefined(this.getRefundInfo()) || _.isNull(this.getRefundInfo()))return"";
        var n = this.getRefundInfo().get("refundDeliveryPhase");
        switch (n) {
            case mytt.c.refundDeliveryPhase.AFTER_LOOSE:
            case"":
                break;
            case mytt.c.refundDeliveryPhase.BEFORE_LOOSE:
                e = "OK, " + this.getRefundInfo().get("refundRangeLoose").get("start").date.format("MMMM D") + " is the very earliest you could get your money from the IRS.";
                break;
            case mytt.c.refundDeliveryPhase.WITHIN_LOOSE_BEFORE_TIGHT:
            case mytt.c.refundDeliveryPhase.WITHIN_LOOSE_WITHIN_TIGHT:
                n == mytt.c.refundDeliveryPhase.WITHIN_LOOSE_BEFORE_TIGHT ? e = "OK, it's still early &#151; your estimated delivery range is " + this.getRefundInfo().refundRangeText() + "." : e = "OK, you're still within the estimated delivery range of " + this.getRefundInfo().refundRangeText() + ".", this.getRefundInfo().percentFundedHidden() || (this.getRefundInfo().get("percentFundedForAckDate") ? t += this.getRefundInfo().get("percentFundedForAckDate") + "%" : t += "0%", t += " of people whose returns were accepted on " + this.getReturnStatusDateString() + " have received their money.");
                break;
            case mytt.c.refundDeliveryPhase.WITHIN_LOOSE_AFTER_TIGHT:
            case mytt.c.refundDeliveryPhase.WITHIN_LOOSE:
                e = "OK, you're still within the current IRS refund delivery window.", t = "We expect you'll get your money between now and " + this.getRefundInfo().refundEndOfLooseRange() + "."
        }
        return{header: new Handlebars.SafeString(e), subheader: new Handlebars.SafeString(t)}
    }, setReturnStatus: function () {
        var e = this;
        if (_.isString(e.get("returnStatus")) == 0)return"";
        var t = "", n = e.isFederal() ? "The IRS" : e.get("taxAuthority").replace(/_/g, " "), r = e.isFederal() ? "Federal" : e.get("taxAuthority").replace(/_/g, " "), i = e.get("taxAuthority") != null ? e.get("taxAuthority").replace(/_/g, " ") + " accepted your state return" : "Your return has been accepted", s = e.get("taxAuthority") == "Federal" ? "federal" : "state", o = "", u = "", a = "", f = "", l = "", c = moment(appVars.irsEfileOpenTime).format("MMMM D"), h = !1, p = {header: {lateLeg: "Your " + r + " return is in line for processing.", lateLegFed: "Your federal return is in line for processing.", paid: "Your " + r + " return is not yet filed.", paidFed: "Your federal return is not yet filed.", refundReceived: "Congratulations on wrapping up your " + appVars.taxYear + " taxes!", zeroBalance: "The IRS accepted your federal return on " + this.getEfeReceiveDate() + ".", zeroBalanceState: n + " accepted your return on " + this.getEfeReceiveDate() + ".", pending: "You've successfully transmitted your " + r + " return.", pendingFed: "You've successfully transmitted your " + appVars.taxYear + " " + r + " tax return on " + this.getReturnStatusDateStringSlash() + ".", acceptedBeforeIrsEfileOpenFed: "Your return was accepted early by the IRS! If you have a refund, the IRS begins processing returns on " + c + ".", pendingBeforeIrsEfileOpenFed: "The IRS will begin processing returns on " + c + ".", stateProcessingStartsOn: "Your return will be automatically sent to the state tax agency once the IRS begins processing returns on " + c + ".", stateEarlyAccept: "Your return was accepted early! If you have a refund, processing begins on " + c + ".", accepted: (this.getReturnStatusDateString() != "" ? "The IRS accepted your federal return on " + this.getReturnStatusDateString() : "The IRS has accepted your federal return") + ".", acceptedState: i + (this.getReturnStatusDateString() != "" ? " on " + this.getReturnStatusDateString() : "") + ".", rejectedFed: "The IRS rejected your federal return on " + this.getReturnStatusDateString() + "." + "<br/>Don't worry, we'll help you fix what went wrong and get it filed again.", rejectedState: r + " rejected your state return on " + this.getReturnStatusDateString() + "." + "<br/>Don't worry, we'll help you fix what went wrong and get it filed again.", printedFed: "Mail your return by this year's filing deadline: " + this.getFormattedDeadline() + ".", printedState: "Mail your state return by the filing deadline.<br/>Tax payment or refund info prints out with your return.", errors: "Please correct errors on this return.", incomplete: "Finish telling us what has changed from last year and you're ready to file!", stateNotTrackingRefunds: "We don't track your state refund, but you can <a href='http://support.turbotax.intuit.com/redirect/trackStateRefund' target='_blank'>check your state agency's website</a> for more info."}, buttonHtml: {faqReturnStillPending: {href: "https://support.turbotax.intuit.com/redirect/confirmation-from-irs", cssClass: "", text: "Here's why your return hasn't been sent to the IRS yet"}, faqStateReturnAcceptance: {href: "https://support.turbotax.intuit.com/redirect/state-return-acceptance", cssClass: "", text: "Here's why your return hasn't been sent to " + n + " yet"}, btnTtoContinueReturn: {href: "javascript:void(0);", sameWindow: !0, cssClass: "sendToProductOffering btn btn-medium btn-gray btn-block", text: "Finish my return"}, faqFedConfirmation: {href: "https://support.turbotax.intuit.com/redirect/confirmation-from-irs", cssClass: "", text: "How do I know the IRS received my tax return?"}, faqFedAcceptance: {href: "https://support.turbotax.intuit.com/redirect/federal-return-acceptance", cssClass: "", text: "When is the IRS going to accept my return?"}, faqStateAcceptance: {href: "https://support.turbotax.intuit.com/redirect/state-return-acceptance", cssClass: "", text: "When is my state tax return going to get accepted?"}, faqAccepted: {href: "https://support.turbotax.intuit.com/redirect/accepted-definition"}, btnRefundTracker: {href: "#refundTracker", sameWindow: !0, cssClass: "btn btn-medium btn-gray btn-block", text: "Track my refund"}, faqWheresRefund: {href: "https://support.turbotax.intuit.com/redirect/wheres-my-refund", cssClass: "", text: "When will I get my tax refund?"}, faqTrackStateRefund: {href: "https://support.turbotax.intuit.com/redirect/track-state-refund", cssClass: "", prefix: "", suffix: "", text: "Help me track my state refund"}, faqRefundStatus: {href: "https://support.turbotax.intuit.com/redirect/refund-check-status", cssClass: "", text: "Here's how to check on your refund."}, btnMailRefundStatus: {href: "https://support.turbotax.intuit.com/redirect/refund-check-status", cssClass: "btn btn-medium btn-gray btn-block", text: "Track my refund"}, btnTtoFixNow: {href: "javascript:void(0);", sameWindow: !0, cssClass: "sendToProductOffering btn btn-medium btn-orange btn-block", text: "Fix this return"}, balDueFed: {href: "https://support.turbotax.intuit.com/redirect/payment-debit-date", cssClass: "", text: "When will your tax payment go through to the IRS?"}, balDueState: {href: "https://support.turbotax.intuit.com/redirect/track-state-refund", cssClass: "", text: "Contact your state agency for info on your state tax payment."}, faqImportantDates: {href: "https://support.turbotax.intuit.com/redirect/important-dates", cssClass: "", text: "Check other important dates and deadlines for " + appVars.taxYear + " federal returns."}, printedState: {href: "https://support.turbotax.intuit.com/redirect/track-state-refund", cssClass: "", text: "Check with your state tax agency for this year's filing deadline."}, pendingState: {href: "https://support.turbotax.intuit.com/redirect/track-state-refund", cssClass: "", text: "Here's how to contact your state tax agency."}, pendingFed: {href: "https://support.turbotax.intuit.com/redirect/confirmation-from-irs", cssClass: "", text: "Here's how to check that the IRS received your tax return."}, acceptedContactState: {href: "https://support.turbotax.intuit.com/redirect/track-state-refund", cssClass: "", text: "Here's how to contact your state tax agency."}}};
        e.isHeldLateLeg() && e.get("returnStatus") != mytt.c.filingStates.EFILED_REJECTED ? appVars.isAfterIrsEfileOpen ? t = "LATE_LEG" : t = "LATE_LEG" : !appVars.isAfterIrsEfileOpen && e.get("returnStatus") != mytt.c.filingStates.FILED_PRINT && e.get("returnStatus") != mytt.c.filingStates.EFILED_ACCEPTED && e.get("returnStatus") != mytt.c.filingStates.EFILED_REJECTED && e.get("returnStatus") != mytt.c.filingStates.EFILED_HAS_ERRORS ? t = mytt.c.filingStates.PRE_EFILE_OPEN : e.get("paidOnDate") ? t = mytt.c.filingStates.REFUND_RECEIVED : t = e.get("returnStatus");
        switch (t) {
            case mytt.c.filingStates.PRE_EFILE_OPEN:
                u = "Pending", e.isFederal() ? (o = p.header.pendingBeforeIrsEfileOpenFed, a = '<a href="' + p.buttonHtml.faqReturnStillPending.href + '" target="_blank" class="dashboard-link">Pending</a>') : (o = p.header.stateProcessingStartsOn, a = '<a href="' + p.buttonHtml.faqStateAcceptance.href + '" target="_blank" class="dashboard-link">Pending</a>');
                break;
            case"LATE_LEG":
                l = "long-content", u = "Pending", e.isFederal() ? (o = p.header.lateLegFed, a = '<a href="' + p.buttonHtml.faqReturnStillPending.href + '" target="_blank" class="dashboard-link">Pending</a>') : (o = p.header.lateLeg, a = '<a href="' + p.buttonHtml.faqStateAcceptance.href + '" target="_blank" class="dashboard-link">Pending</a>');
                break;
            case mytt.c.filingStates.FILED_PRINT:
                this.getReturnStatusDateStringSlash() === "" ? u = "Printed" : u = "Printed on " + this.getReturnStatusDateStringSlash(), f = "", e.isFederal() ? (a = '<span class="dashboard-link-no-hover-dashboard-printed">Printed</span>', o = p.header.printedFed) : (a = '<span class="dashboard-link-no-hover-dashboard-printed">Printed</span>', o = p.header.printedState), h = !0;
                break;
            case mytt.c.filingStates.EFILED_PENDING:
                u = "Pending", o = p.header.pendingFed, a = '<a href="' + p.buttonHtml.pendingFed.href + '" target="_blank" class="dashboard-link">Pending</a>', h = !0;
                break;
            case mytt.c.filingStates.EFILED_REJECTED:
                o = p.header.rejectedFed, u = "Rejected on " + this.getEfeReceiveDateSlash(), e.isFederal() || (o = p.header.rejectedState), f = p.buttonHtml.btnTtoFixNow, a = '<a href="' + f.href + '" class="dashboard-link sendToProductOffering">Rejected</a>';
                break;
            case mytt.c.filingStates.EFILED_HAS_ERRORS:
                o = p.header.errors, u = "Needs errors corrected.", f = p.buttonHtml.btnTtoFixNow, a = '<a href="' + f.href + '" class="dashboard-link sendToProductOffering">Has Errors</a>';
                break;
            case mytt.c.filingStates.EFILED_ACCEPTED:
                h = !0, a = '<a href="' + p.buttonHtml.faqAccepted.href + '" target="_blank" class="dashboard-link">Accepted</a>', this.getReturnStatusDateStringSlash() === "" ? u = "Accepted" : u = "Accepted on " + this.getReturnStatusDateStringSlash(), e.isFederal() ? o = p.header.accepted : o = p.header.acceptedState, appVars.isAfterIrsEfileOpen || !this.isFederal() ? this.getRefundInfo().hasRefund() ? e.isFederal() ? e.getRefundInfo().isCheckByMail() ? (f = p.buttonHtml.btnMailRefundStatus, this.trackOrangeBtn && (f.cssClass = f.cssClass.replace("btn-gray", "btn-orange"))) : this.getRefundInfo().hasLooseRange() && (f = p.buttonHtml.btnRefundTracker, this.trackOrangeBtn && (f.cssClass = f.cssClass.replace("btn-gray", "btn-orange"))) : o = p.header.stateNotTrackingRefunds : e.isFederal() ? o = p.header.zeroBalance : o = p.header.zeroBalanceState : e.isFederal() ? (a = '<a href="' + p.buttonHtml.faqImportantDates.href + '" target="_blank" class="dashboard-link">Accepted</a>', o = p.header.acceptedBeforeIrsEfileOpenFed) : (a = '<span class="dashboard-link-no-hover">Accepted</span>', o = p.header.stateEarlyAccept);
                break;
            case mytt.c.filingStates.REFUND_RECEIVED:
                u = "Complete", a = '<span class="dashboard-link-no-hover">Complete</span>', o = p.header.refundReceived;
                break;
            default:
                u = new Handlebars.SafeString('<a href="javascript:void(0); "class="sendToProductOffering">Finish this return</a>'), a = '<a href="javascript:void(0);" class="dashboard-link-no-hover sendToProductOffering">Incomplete</a>', o = p.header.incomplete
        }
        return{newMessage: new Handlebars.SafeString(o), returnMessage: u, button: f, efileShortStatus: new Handlebars.SafeString(a.replace("{{ttcomDomain}}", Handlebars.helpers.ttcomDomain()))}
    }});
    return i
}), define("models/inner/FilingInfos", ["models/inner/FilingInfo"], function (e) {
    var t = function (e, t) {
        return e.get("agencyReceiveDate") <= t.get("agencyReceiveDate") ? t : e
    }, n = Backbone.Collection.extend({model: e, isEfiledPrinted: null, comparator: function (e) {
        return(e.get("taxAuthority") != undefined ? e.get("taxAuthority") : "").indexOf("Federal") == 0 ? 0 : 1
    }, hasPrintedFilings: function () {
        var e = this.where({returnStatus: "FILED_PRINT"});
        return e.length > 0
    }, hasIncompleteFilings: function () {
        var e = this.find(function (e) {
            return e.isStarted()
        });
        return e != null
    }, hasRejectedFilings: function () {
        var e = this.find(function (e) {
            return e.isEfiledRejected()
        });
        return e != null
    }, getIncompleteFilings: function () {
        return this.filter(function (e) {
            return e.isStarted()
        })
    }, getCompletedFilings: function () {
        var e = this.filter(function (e) {
            return!e.isStarted()
        }, this);
        return e
    }, setPrintOrEfiled: function () {
        var e = this;
        $.each(this.models, function (t, n) {
            n.isEfiledOrPrint() && (e.isEfiledPrinted = !0)
        })
    }, getLatestFederalFiling: function () {
        var e = this.filter(function (e) {
            return e.isFederal()
        });
        _.isUndefined(e) && logger.warn("Cannot read property '0' of reference undefined: feds in FilingInfo: getLatestFederalFiling");
        if (e.length == 0)return null;
        if (e.length == 1)return e[0];
        var n = _.reduce(e, t, e[0]);
        return n
    }, getCondensedSortedFilings: function () {
        var e = this.getCompletedFilings(), n = this.getIncompleteFilings(), r = e.concat(n), i = !1, s = !1;
        e = r;
        var o = _.groupBy(e, function (e) {
            return e.get("taxAuthority")
        }), u = [];
        return _.each(o, function (e) {
            _.isUndefined(e) && logger.warn("Cannot read property '0' of reference undefined: group in FilingInfo: getCondensedSortedFilings");
            var n = _.reduce(e, t, e[0]);
            n.isFederal() ? u.unshift(n) : u.push(n), n.isEfiledRejected() ? i = !0 : n.isStarted() && (s = !0)
        }, this), u = _.sortBy(u, function (e) {
            return e.isStarted()
        }, this), i || (s ? _.each(u, function (e) {
            e.incompleteOrangeBtn = !0
        }) : _.each(u, function (e) {
            e.trackOrangeBtn = !0
        })), u
    }, getCondensedSortedPaidFilings: function () {
        var e = this.getCompletedFilings(), n = _.groupBy(e, function (e) {
            return e.get("taxAuthority")
        }), r = [];
        return _.each(n, function (e) {
            _.isUndefined(e) && logger.warn("Cannot read property '0' of reference undefined: group in FilingInfo: getCondensedSortedPaidFilings");
            var n = _.reduce(e, t, e[0]);
            n.isFederal() ? r.unshift(n) : r.push(n)
        }, this), r
    }});
    return n
}), define("models/inner/ReturnFolder", ["models/inner/FilingInfos"], function (e) {
    var t = Backbone.Model.extend({parse: function (t) {
        function i(e, t) {
            return e != null ? e.replace(/\s/g, "") : e == null && t != null ? t + "TurboTaxReturn" : "TurboTaxReturn"
        }

        var n = t.agencyFilingInformation || [], r = new e(n, {parse: !0});
        return{taxReturnName: t.taxReturnName || null, appSku: t.appSku || null, applicationId: t.applicationId || null, taxReturnId: t.taxReturnId || null, taxYear: t.taxYear || null, paid: t.paid, returnFiled: t.returnFiled || null, statusSummary: t.statusSummary || null, filingInfos: r, taxReturnPdfFileName: i(t.taxReturnName || null, t.taxYear || null)}
    }, isPaidFor: function () {
        return this.get("paid")
    }, isOffSeason: function () {
        return!appVars.myttOffSeasonBypass && (this.isFiledOffSeason() || app.isOffSeason())
    }, isFiledOffSeason: function () {
        return this.get("statusSummary") == mytt.c.taxReturnStatus.TAX_RETURN_FILED_OFF_SEASON
    }, isNotStarted: function () {
        return this.get("statusSummary") == mytt.c.taxReturnStatus.TAX_RETURN_NOT_STARTED
    }, isStarted: function () {
        return this.get("statusSummary") == mytt.c.taxReturnStatus.TAX_RETURN_STARTED_NOT_COMPLETED
    }, isPostFiling: function () {
        return appVars.myttOffSeasonBypass && !this.isStarted() && !this.isNotStarted() || this.get("statusSummary") == mytt.c.taxReturnStatus.TAX_RETURN_FILED
    }, isCurrentTaxYear: function () {
        return this.get("taxYear") == appVars.taxYear
    }, isAmendable: function () {
        return this.get("taxYear") >= appVars.taxYear - 3
    }, isProductName: function (e) {
        return e == this.get("appSku")
    }, hasPrintedFilings: function () {
        return this.getFilingInfos().hasPrintedFilings()
    }, getFilingInfos: function () {
        return this.get("filingInfos")
    }, isSnapTaxFolder: function () {
        return this.get("applicationId") == "INTUIT_CTG_INSTANTRETURN_IPHONEAPP" || this.get("applicationId") == "INTUIT_CTG_INSTANTRETURN_ANDROIDAPP"
    }, isPaidFolder: function () {
        return this.get("appSku") == "Basic" || this.get("appSku") == "DeductionMaximizer" || this.get("appSku") == "HomeAndBusiness" || this.get("appSku") == "Premier"
    }, isTaxReturnFiled: function () {
        if (this != null)return this.get("statusSummary") != mytt.c.taxReturnStatus.TAX_RETURN_STARTED_NOT_COMPLETED
    }, isWindows: function () {
        return this.get("applicationId") == "INTUIT_CG_TTN_WIN" || this.get("applicationId") == "INTUIT_CG_TTN_PLATFORM"
    }, isMac: function () {
        return this.get("applicationId") == "INTUIT_CG_TTN_MAC" || this.get("applicationId") == "INTUIT_CG_TTN_MAS"
    }, isIpad: function () {
        return this.get("applicationId") == "INTUIT_CG_TTN_IPAD"
    }, isTTO: function () {
        return this.get("applicationId") == "INTUIT_CTG_TTO_PLATFORM" || this.get("applicationId") == "INTUIT_CG_NUE" || this.get("applicationId") == "INTUIT_CG_TTO_BATCH"
    }, showInTimeline: function () {
        return!this.isCurrentTaxYear() || this.isTaxReturnFiled() && this.get("taxReturnId") != app.dashboardCYTaxReturnID ? !0 : !1
    }, setFilingStatus: function () {
        var e = this.getFilingInfos(), t = this;
        e && $.each(e.models, function (e, n) {
            n.set("filingStatus", function () {
                return t.isTTO() ? n.isEfiledOrPrint() ? "Filed " : "Unfinished " : ""
            })
        })
    }});
    return t
}), define("models/inner/ReturnFolders", ["models/inner/ReturnFolder"], function (e) {
    var t = Backbone.Collection.extend({model: e, comparator: function (e) {
        return-~~e.get("taxYear")
    }, getForTaxYear: function (e) {
        var t = this.where({taxYear: e});
        return _.isUndefined(t) && logger.warn("Cannot read property '0' of reference undefined: folder in ReturnFolders: getForTaxYear"), t.length > 0 ? t[0] : null
    }, getForTaxYearNotSnapTax: function (e) {
        var t = this.where({taxYear: e});
        if (!_.isUndefined(t)) {
            for (var n = 0; n < t.length; n++)if (!t[n].get("isSnapTax"))return t[n];
            return null
        }
        logger.warn("Cannot read property '0' of reference undefined: folder in ReturnFolders: getForTaxYearNotSnapTax")
    }, getForDocId: function (e) {
        var t = this.where({taxReturnId: e});
        return _.isUndefined(t) && logger.warn("Cannot read property '0' of reference undefined: folder in ReturnFolders: getForDocId"), t.length > 0 ? t[0] : null
    }});
    return t
}), define("models/inner/PdfEntitlement", [], function () {
    var e = Backbone.Model.extend({isAllowed: function () {
        return this.get("allowed") === !0
    }});
    return e
}), define("models/TaxReturnDetail", ["models/inner/ReturnFolders", "models/inner/PdfEntitlement"], function (e, t) {
    var n = Backbone.Model.extend({url: "/svc/getTaxReturnsDetail", parse: function (n) {
        var r = new e(n.taxReturnFolders || [], {parse: !0}), i = !1;
        i = new t(n.priorYearPdfTaxReturnEntitlement || {}, {parse: !0});
        var s = r.getForTaxYear(appVars.taxYear), o = s != null && s.isPostFiling();
        return r.each(function (e, t, n) {
            e.set("isAmendable", e.isAmendable()), e.set("isSnapTax", e.isSnapTaxFolder()), e.set("isPaid", e.isPaidFolder()), (e.isPostFiling() || e.isFiledOffSeason()) && e.isCurrentTaxYear() ? e.set("displayEfileDetails", !0) : e.set("displayEfileDetails", !1), e.isCurrentTaxYear() && e.set("isCurrentYearFolder", !0), (e.isPostFiling() || e.isFiledOffSeason()) && app.isInSeason() && e.isCurrentTaxYear() && e.set("showStartStateReturnLink", !0), e.set("isPostFiling", e.isPostFiling()), e.set("isFiled", e.isFiledOffSeason() || e.isPostFiling()), e.set("TtaxReturnStartedNotCompleted", e.isStarted());
            var r = this.getEntitlementState(e, i);
            e.set("isPdfEntitled", r == mytt.c.entitlement.ALLOWED || e.isCurrentTaxYear()), e.set("showPDF", !0)
        }, this), {id: 1, folders: r, pdfEntitlement: i}
    }, isCurrentYearReturnPostFiling: function () {
        var e = this.get("folders").getForTaxYear(appVars.taxYear);
        return e != null ? e.isPostFiling() : !1
    }, isCurrentYearReturnStarted: function () {
        var e = this.get("folders").getForTaxYear(appVars.taxYear);
        return e != null ? e.isStarted() && !e.isSnapTaxFolder() : !1
    }, isCurrentYearReturnOffSeason: function () {
        var e = this.get("folders").getForTaxYear(appVars.taxYear);
        return e != null ? e.isOffSeason() : !1
    }, isCurrentYearSnapTax: function () {
        var e = this.get("folders").getForTaxYear(appVars.taxYear);
        return e != null ? e.isSnapTaxFolder() : !1
    }, getTaxReturnNameByDocId: function (e) {
        var t = this.get("folders").getForDocId(e);
        return t != null ? t.get("taxReturnPdfFileName") : null
    }, getPriorYearTaxReturn: function () {
        var e = parseInt(appVars.taxYear) - 1;
        if (this.get("folders").getForTaxYear(e.toString())) {
            var t = this.get("folders").getForTaxYear(e.toString());
            return t
        }
        return null
    }, getPriorYearTaxReturnId: function () {
        var e = parseInt(appVars.taxYear) - 1;
        if (this.get("folders").getForTaxYear(e.toString())) {
            var t = this.get("folders").getForTaxYear(e.toString()).get("taxReturnId");
            return t
        }
        return null
    }, getPriorYearTaxReturnIdNotSnapTax: function () {
        var e = parseInt(appVars.taxYear) - 1;
        if (this.get("folders").getForTaxYearNotSnapTax(e.toString())) {
            var t = this.get("folders").getForTaxYearNotSnapTax(e.toString()).get("taxReturnId");
            return t
        }
        return null
    }, getTaxReturnIDForYear: function (e) {
        if (!_.isUndefined(e)) {
            var t = parseInt(e);
            return this.get("folders").getForTaxYearNotSnapTax(t.toString()) ? this.get("folders").getForTaxYearNotSnapTax(t.toString()).get("taxReturnId") : null
        }
        return null
    }, getEntitlementState: function (e, t) {
        return t = t || this.get("pdfEntitlement"), t.isAllowed() ? mytt.c.entitlement.ALLOWED : mytt.c.entitlement.UNPAID
    }, isExistingCustomer: function () {
        return this.get("folders").length
    }});
    return n
}), define("components/IntegrationComponent", ["cfp", "base/Component", "models/Offerings", "components/FeatureSwitch", "models/TaxReturnDetail"], function (e, t, n, r, i) {
    var s = t.extend({ttoParams: null, dispatcherParams: null, offerings: null, skipDispatcher: !1, initialize: function () {
        t.prototype.initialize.apply(this, arguments), this.ttoParams = {}, this.qaSpecific = {}, this.ttoParams.priorityCode = _.getParameterByName("priorityCode") || mytt.$.cookie("priorityCode"), this.ttoParams.priorityCode && mytt.$.cookie("priorityCode", this.ttoParams.priorityCode, {domain: ".intuit.com"});
        var e = mytt.$.cookie("productid");
        return e && e == "4" && (this.ttoParams.productid = 4), this.ttoParams.referrer = _.getParameterByName("referrer"), this.ttoParams.customerType = mytt.c.customer.TYPE_NEW, this.qaSpecific.subdomain = _.getParameterByName("ttback"), this.dispatcherParams = {allowsso: !0, authrole: mytt.c.customer.TEXT_NEW, priorityCode: this.ttoParams.priorityCode, referrer: this.ttoParams.referrer}, this
    }, setCustomerType: function () {
        app.dataRegistry.fetch({modelClass: i, load: "getTaxReturnsDetail", noLoading: !0, success: function (e) {
            e.isExistingCustomer() && (this.ttoParams.customerType = mytt.c.customer.TYPE_EXISTING, this.dispatcherParams.authrole = mytt.c.customer.TEXT_EXISTING)
        }, context: this})
    }, sendToProductOffering: function (e) {
        _.isBoolean(e) == 0 && (e = !0), this.setCustomerType();
        if (this.isEasyExtensionRequest()) {
            var t = !0;
            this.sendToFlagship(e, t);
            return
        }
        var r = this;
        app.dataRegistry.fetch({modelClass: n, load: "getOfferings", cache: !0, noLoading: !0, loadOptions: {}, success: function (t) {
            r.offerings = t, r.routeBasedOnOffering(e)
        }, error: function (t) {
            r.offerings = null;
            var n = "Received error " + t.errorStatus.code + ' retrieving offering: "' + t.errorStatus.description + '"';
            r.routeBasedOnOffering(e)
        }, context: this})
    }, routeBasedOnOffering: function (e) {
        if (this.offerings) {
            var t = this.offerings.getCurrentProductOffering();
            t == mytt.c.offering.FLAGSHIP_VALUE ? this.sendToFlagship(e) : t == mytt.c.offering.TAXPREP_VALUE ? this.sendToTaxPrep(e) : this.sendToAuthDispatcher(e)
        } else this.sendToAuthDispatcher(e)
    }, isEasyExtensionRequest: function () {
        var e = mytt.$.cookie("productid");
        return e && e == mytt.c.product.EZEXTENSION
    }, sendToFlagship: function (e, t) {
        _.isBoolean(e) === !1 && (e = !0);
        if (app.security.isAuthenticated() === !1)return;
        if (e) {
            Tax.SysReqs.reset(), Tax.SysReqs.setTTO(), Tax.SysReqs.checkCompatible();
            if (Tax.SysReqs.isRed || Tax.SysReqs.isYellow) {
                app.router.navigate("redBrowser", {trigger: !0});
                return
            }
        }
        var n = this.getFlagshipAddress(), r = appVars.ttoPath;
        if (_.isBoolean(t) === !0 || this.isEasyExtensionRequest())this.ttoParams.productid = mytt.c.product.EZEXTENSION, this.ttoParams.eze = !0, this.ttoParams.ffa = _.getParameterByName("FFA") == "true", r = appVars.ttoExtensionPath;
        var i = n + $.trim(r);
        logger.log("Flagship redirect"), mytt.$.removeCookie("productid", {domain: ".intuit.com", path: "/"}), this.redirectToURL(i, this.ttoParams)
    }, sendToTaxPrep: function (e) {
        _.isBoolean(e) === !1 && (e = !0);
        if (e) {
            Tax.SysReqs.reset(), Tax.SysReqs.setTTO(), Tax.SysReqs.checkCompatible();
            if (Tax.SysReqs.isRed || Tax.SysReqs.isYellow) {
                app.router.navigate("redBrowser", {trigger: !0});
                return
            }
        }
        if (app.security.isAuthenticated() === !1)return;
        var t = this.getTaxPrepAddress() + $.trim(appVars.taxPrepPath);
        logger.log("TaxPrep redirect"), mytt.$.removeCookie("productid"), this.redirectToURL(t, this.ttoParams)
    }, sendToInstaRefund: function (e) {
        _.isBoolean(e) === !1 && (e = !0);
        if (app.security.isAuthenticated() === !1)return;
        var t = "https://" + $.trim(appVars.instaRefundDomain);
        logger.log("InstaRefund redirect"), this.redirectToURL(t)
    }, sendToAuthDispatcher: function (e) {
        _.isBoolean(e) === !1 && (e = !0);
        if (!appVars.featureDispatcher || this.skipDispatcher)this.ttoParams.productid = mytt.$.cookie("productid"), this.sendToFlagship(e); else {
            if (e) {
                Tax.SysReqs.reset(), Tax.SysReqs.setTTO(), Tax.SysReqs.checkCompatible();
                if (Tax.SysReqs.isRed || Tax.SysReqs.isYellow) {
                    app.router.navigate("redBrowser", {trigger: !0});
                    return
                }
            }
            var t = {};
            _.extend(t, this.ttoParams), _.extend(t, this.dispatcherParams), logger.log("Auth Dispatcher redirect"), this.redirectToURL(this.getAuthDispatcherAddress(), t)
        }
    }, getQASubDomain: function (e) {
        var t = ["turbotaxweb.qprd.turbotaxonline.intuit.com", "turbotaxweb.lvprd.turbotaxonline.intuit.com", "turbotaxweb.qstg1.turbotaxonline.intuit.com", "turbotaxweb.lvstg.turbotaxonline.intuit.com", "turbotaxweb.qstg2.turbotaxonline.intuit.com", "turbotaxweb.lvstg2.turbotaxonline.intuit.com", "turbotaxweb.stg2.turbotaxonline.intuit.com"];
        logger.log("checking for a separate domain for qa redirections");
        if (this.qaSpecific.subdomain) {
            if (r.isEnabled("featureRedirectServerQA"))return logger.log(this.qaSpecific.subdomain + " was passed in ?ttback and will be used as the subdomain"), this.qaSpecific.subdomain;
            for (var n = 0; n < t.length; n++)if (this.qaSpecific.subdomain.localeCompare(t[n]) == 0)return logger.log(this.qaSpecific.subdomain + " was passed in ?ttback and will be used as the subdomain"), this.qaSpecific.subdomain
        }
        return logger.log("no qa redirect"), e
    }, getTurboTaxComAddress: function () {
        return $.trim(appVars.ttoProtocol) + "://" + $.trim(appVars.turboTaxComDomain)
    }, redirectToURL: function (t, n) {
        var r = !1, i = {};
        for (var s in n) {
            var o = n[s];
            _.isNull(o) || (i[s] = o)
        }
        t = t + "?" + $.param(i);
        if (r) {
            var u = function () {
                window.location.href = t
            };
            e.clearCfpSession({success: u, error: u}), logger.log("Redirecting to the URL: " + t)
        } else logger.log("Redirecting to the URL: " + t), window.location.href = t;
        return t
    }, getFlagshipAddress: function () {
        var e = $.trim(appVars.ttoDomain);
        return e = this.getQASubDomain(e), $.trim(appVars.ttoProtocol) + "://" + e
    }, getTaxPrepAddress: function () {
        return $.trim(appVars.ttoProtocol) + "://" + $.trim(appVars.taxPrepDomain)
    }, getAuthDispatcherAddress: function () {
        var e = this.getTurboTaxComAddress();
        return e + "/services/authentication/dispatcher.jsp"
    }});
    return s
}), define("models/UserABTestState", ["base/Model"], function (e) {
    var t = e.extend({initialize: function () {
        app.model.get("uiData").has("currentABtest") && app.model.get("uiData").has("currentABrecipe") ? (this.testName = app.model.get("uiData").get("currentABtest"), this.recipeName = app.model.get("uiData").get("currentABrecipe")) : (this.testName = null, this.recipeName = null), this.isAllocated = !_.isNull(this.testName) && !_.isEmpty(this.testName)
    }, addUserToTest: function (e, t, n) {
        this.testName = e, this.recipeName = t, this.isAllocated = !0, app.trigger("ABTest:Success", {segment: t}), app.model.get("uiData").set("currentABtest", e), app.model.get("uiData").set("currentABrecipe", t), app.model.get("uiData").save(null, {noLoading: !0, success: n})
    }, clearUserTest: function (e) {
        this.testName = "", this.recipeName = "", this.isAllocated = !1, app.model.get("uiData").set("currentABtest", ""), app.model.get("uiData").set("currentABrecipe", ""), app.model.get("uiData").save(null, {noLoading: !0, success: e})
    }});
    return t
}), define("models/ABTests", ["base/Model"], function (e) {
    var t = function (e) {
        return this.getScreenPathForRecipe = function (e) {
            return"../../abtesting/" + this.testName.toLowerCase() + "/" + this.getRecipeName(e) + "/" + this.screenName
        }, this.getRecipeName = function (e) {
            return e.substr(this.testName.length + 1)
        }, $.extend(e, this)
    }, n = e.extend({parse: function (e) {
        var n = {};
        this.affectedScreens = _.pluck(e, "screenName"), this.testNames = _.pluck(e, "testName"), _.each(e, function (e) {
            e = new t(e)
        }), this.tests = e
    }, screenHasActiveTest: function (e) {
        return _.contains(this.affectedScreens, e)
    }, getTestFromScreenName: function (e) {
        var t = _.where(this.tests, {screenName: e});
        return _.isUndefined(t) && logger.warn("Cannot read property '0' of reference undefined: testFromScreenName in ABTest: getTestFromScreenName"), t[0]
    }});
    return n
}), define("components/ABTestComponent", ["models/UserABTestState", "models/ABTests"], function (e, t) {
    var n = [], r = {userHasYellowBrowser: function () {
        return Tax.SysReqs.isYellow
    }}, i = {abTests: new t(n, {parse: !0}), getUserABTestState: function () {
        this.userABTestState = new e
    }, getScreen: function (e, t) {
        return this.userABTestState == null && this.getUserABTestState(), this.eligibilityFilter(e, t)
    }, eligibilityFilter: function (e, t) {
        var n = this.abTests.getTestFromScreenName(e);
        if (this.userABTestState.isAllocated) {
            if (n.testName == this.userABTestState.testName) {
                if (r.userHasYellowBrowser())return logger.log("User in test " + this.userABTestState.testName + " has ineligible browser pollution."), app.trigger("TransitionScreen", {screenName: e}), e;
                var i = n.getScreenPathForRecipe(this.userABTestState.recipeName);
                return app.trigger("TransitionScreen", {screenName: i}), i
            }
            if (_.contains(this.abTests.testNames, this.userABTestState.testName))return app.trigger("TransitionScreen", {screenName: e}), e;
            this.userABTestState.clearUserTest()
        }
        if (!n.eligibility())return app.trigger("TransitionScreen", {screenName: e}), e;
        if (Math.random() * 100 > n.percentOfTraffic)return app.trigger("TransitionScreen", {screenName: e}), e;
        var s = Math.floor(Math.random() * n.recipes.length);
        return this.userABTestState.addUserToTest(n.testName, n.recipes[s], t), n.getScreenPathForRecipe(n.recipes[s])
    }};
    return i
}), define("views/HeaderView", [], function () {
    var e = Backbone.View.extend({events: {"click .signOut": "signOut", "click .signIn": "signIn", "click .goHome": "sendToHome"}, initialize: function (e) {
        if (appVars.framing != mytt.c.framing.NONE)return;
        this.$el.show(), this.makeFFAFriendly(app.getFFAStatus()), app.security.isAuthenticated() ? this.showUtilityLinks() : this.hideUtilityLinks(), app.on(mytt.c.events.SIGNIN_RENDER, function () {
            this.hideUtilityLinks()
        }, this), app.on(mytt.c.events.SIGNIN_SUCCESS, function () {
            this.showUtilityLinks(), document.title = "My TurboTax"
        }, this), app.on(mytt.c.events.DASHBOARD_RENDER, function () {
            this.showUtilityLinks()
        }, this), app.on(mytt.c.events.CREATEACCOUNT_RENDER, function () {
            this.hideUtilityLinks()
        }, this), app.on(mytt.c.events.TIMEOUT_SUCCESS, function () {
            this.hideUtilityLinks()
        }, this), app.on(mytt.c.events.SIGNOUT_SUCCESS, function () {
            this.hideUtilityLinks()
        }, this), app.on(mytt.c.events.APP_SKU_CHANGE, function (e) {
            this.makeFFAFriendly(e), this.checkMoneyToolEligibility(e)
        }, this), app.on(mytt.c.events.HEALTHCARE_ELIGIBILITY_CHECKED, function () {
            this.checkHealthcareVisibility()
        }, this)
    }, dropdownVisible: !0, signOut: function () {
        app.redirect("signOut")
    }, signIn: function () {
        app.security.isAuthenticated() ? this.signOut() : window.location.href = "/"
    }, sendToHome: function () {
        logger.log("MyTT phone Home")
    }, checkHealthcareVisibility: function () {
        app.model.get("isHealthcareEligible") ? $(".healthcareLink").parent().show() : $(".healthcareLink").parent().hide()
    }, showUtilityLinks: function () {
        $(".auth-only").removeClass("hidden"), $(".non-auth").addClass("hidden"), this.dropdownVisible = !0
    }, hideUtilityLinks: function () {
        $(".auth-only").addClass("hidden"), $(".non-auth").not(".signIn").removeClass("hidden"), this.dropdownVisible = !1
    }, makeFFAFriendly: function (e) {
        e ? ($("#privacy").attr("href", $("#privacy").attr("data-ffa-href")), $("#license").hide()) : ($("#privacy").attr("href", $("#privacy").attr("data-dest")), $("#license").show())
    }, checkMoneyToolEligibility: function (e) {
        e && $(".moneyTools").each(function () {
            $(this).parent().remove()
        })
    }});
    return e
}), define("base/WidgetView", [], function () {
    var e = Backbone.View.extend({name: "UnnamedWidget", children: null, initialize: function () {
        this.children = []
    }, append: function (e) {
        _.isArray(e) ? this.$el.append.apply(this.$el, e) : this.$el.append(e)
    }, RETURN_EL: !0, addAndRenderAs: function (e, t, n) {
        var r = new e({model: t});
        return r.render(), this.children.push(r), n === this.RETURN_EL ? r.el : r
    }, RETURN_EL_ARRAY: !0, addAndRenderModelsAs: function (e, t, n) {
        var r = [];
        return _.each(t, function (t) {
            var i = this.addAndRenderAs(e, t);
            n === this.RETURN_EL_ARRAY ? r.push(i.el) : r.push(i)
        }, this), r
    }, close: function () {
        if (this.children == null) {
            var e = this.name + " does not call WidgetView.initialize";
            logger.warn(e)
        } else $.each(this.children, function (e, t) {
            _.isFunction(t.close) && t.close()
        }), this.children.length = 0;
        this.undelegateEvents(), app.off(null, null, this)
    }});
    return e
}), define("views/widgets/IdleTimerPopupWidget", ["base/WidgetView"], function (e) {
    var t = e.extend({name: "IdleTimerPopupWidget", events: {"click .idleTimerReset": "resetTimer", "click .signOut": "signOut"}, initialize: function () {
        e.prototype.initialize.apply(this, arguments), app.on(mytt.c.events.ONE_MINUTE_TIMER_START, function () {
            this.remove(), this.start()
        }, this), app.on(mytt.c.events.SIGNOUT_START, this.remove, this)
    }, intervalContainer: [], start: function () {
        var e = app.idleTimer.warningTime, t = $("#time-inactivity-alert span");
        this.showUI(), t.html(e);
        var n = this;
        this.intervalContainer.push(setInterval(function () {
            e <= 0 ? n.remove() : (e--, t.html(e))
        }, 1e3))
    }, remove: function () {
        for (var e in this.intervalContainer)clearInterval(this.intervalContainer[e]);
        this.intervalContainer = [], this.hideUI()
    }, showUI: function () {
        $("body").addClass("enableIdleTimerUI"), app.wrapper.darken()
    }, hideUI: function () {
        $("body").removeClass("enableIdleTimerUI"), app.wrapper.lighten()
    }, resetTimer: function () {
        app.idleTimer.reset(), this.remove()
    }, signOut: function () {
        this.hideUI(), app.security.signOut({context: this, complete: function () {
            appVars.featureIusSignin ? app.toScreen("modules/authwidgets/views/screens/SignInScreen") : app.toScreen("SignInScreen")
        }})
    }});
    return t
}), define("text", ["module"], function (e) {
    var t, n, r = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], i = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, s = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, o = typeof location != "undefined" && location.href, u = o && location.protocol && location.protocol.replace(/\:/, ""), a = o && location.hostname, f = o && (location.port || undefined), l = [], c = e.config && e.config() || {};
    t = {version: "2.0.5", strip: function (e) {
        if (e) {
            e = e.replace(i, "");
            var t = e.match(s);
            t && (e = t[1])
        } else e = "";
        return e
    }, jsEscape: function (e) {
        return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
    }, createXhr: c.createXhr || function () {
        var e, t, n;
        if (typeof XMLHttpRequest != "undefined")return new XMLHttpRequest;
        if (typeof ActiveXObject != "undefined")for (t = 0; t < 3; t += 1) {
            n = r[t];
            try {
                e = new ActiveXObject(n)
            } catch (i) {
            }
            if (e) {
                r = [n];
                break
            }
        }
        return e
    }, parseName: function (e) {
        var t, n, r, i = !1, s = e.indexOf("."), o = e.indexOf("./") === 0 || e.indexOf("../") === 0;
        return s !== -1 && (!o || s > 1) ? (t = e.substring(0, s), n = e.substring(s + 1, e.length)) : t = e, r = n || t, s = r.indexOf("!"), s !== -1 && (i = r.substring(s + 1) === "strip", r = r.substring(0, s), n ? n = r : t = r), {moduleName: t, ext: n, strip: i}
    }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (e, n, r, i) {
        var s, o, u, a = t.xdRegExp.exec(e);
        return a ? (s = a[2], o = a[3], o = o.split(":"), u = o[1], o = o[0], (!s || s === n) && (!o || o.toLowerCase() === r.toLowerCase()) && (!u && !o || u === i)) : !0
    }, finishLoad: function (e, n, r, i) {
        r = n ? t.strip(r) : r, c.isBuild && (l[e] = r), i(r)
    }, load: function (e, n, r, i) {
        if (i.isBuild && !i.inlineText) {
            r();
            return
        }
        c.isBuild = i.isBuild;
        var s = t.parseName(e), l = s.moduleName + (s.ext ? "." + s.ext : ""), h = n.toUrl(l), p = c.useXhr || t.useXhr;
        !o || p(h, u, a, f) ? t.get(h, function (n) {
            t.finishLoad(e, s.strip, n, r)
        }, function (e) {
            r.error && r.error(e)
        }) : n([l], function (e) {
            t.finishLoad(s.moduleName + "." + s.ext, s.strip, e, r)
        })
    }, write: function (e, n, r, i) {
        if (l.hasOwnProperty(n)) {
            var s = t.jsEscape(l[n]);
            r.asModule(e + "!" + n, "define(function () { return '" + s + "';});\n")
        }
    }, writeFile: function (e, n, r, i, s) {
        var o = t.parseName(n), u = o.ext ? "." + o.ext : "", a = o.moduleName + u, f = r.toUrl(o.moduleName + u) + ".js";
        t.load(a, r, function (n) {
            var r = function (e) {
                return i(f, e)
            };
            r.asModule = function (e, t) {
                return i.asModule(e, f, t)
            }, t.write(e, a, r, s)
        }, s)
    }};
    if (c.env === "node" || !c.env && typeof process != "undefined" && process.versions && !!process.versions.node)n = require.nodeRequire("fs"), t.get = function (e, t) {
        var r = n.readFileSync(e, "utf8");
        r.indexOf("﻿") === 0 && (r = r.substring(1)), t(r)
    }; else if (c.env === "xhr" || !c.env && t.createXhr())t.get = function (e, n, r, i) {
        var s = t.createXhr(), o;
        s.open("GET", e, !0);
        if (i)for (o in i)i.hasOwnProperty(o) && s.setRequestHeader(o.toLowerCase(), i[o]);
        c.onXhr && c.onXhr(s, e), s.onreadystatechange = function (t) {
            var i, o;
            s.readyState === 4 && (i = s.status, i > 399 && i < 600 ? (o = new Error(e + " HTTP status: " + i), o.xhr = s, r(o)) : n(s.responseText))
        }, s.send(null)
    }; else if (c.env === "rhino" || !c.env && typeof Packages != "undefined" && typeof java != "undefined")t.get = function (e, t) {
        var n, r, i = "utf-8", s = new java.io.File(e), o = java.lang.System.getProperty("line.separator"), u = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), i)), a = "";
        try {
            n = new java.lang.StringBuffer, r = u.readLine(), r && r.length() && r.charAt(0) === 65279 && (r = r.substring(1)), n.append(r);
            while ((r = u.readLine()) !== null)n.append(o), n.append(r);
            a = String(n.toString())
        } finally {
            u.close()
        }
        t(a)
    };
    return t
}), define("text!templates/Loading.html", [], function () {
    return'<div class="bigWhiteBackground"></div>\n<div class="row loadingScreen">\n    <div class="col-xs-12">\n        <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/spinnerNew{{at2x}}.gif" alt="Loading Spinner" class="loadingSpinner"/>\n        <p class="loadingMessage">{{message}}</p>\n    </div>\n</div>\n\n'
}), define("views/WrapperView", ["views/HeaderView", "views/widgets/IdleTimerPopupWidget", "text!templates/Loading.html"], function (e, t, n) {
    var r = Backbone.View.extend({header: null, idleTimerPopupWidget: null, currentScreen: null, events: {"click .back": "goBack"}, getScreen: function (e, t, n, r) {
        return e.indexOf("modules/") < 0 && (e = "views/screens/" + e), require([e], function (e) {
            var i = new e(t);
            r.call(n, i)
        }), null
    }, initialize: function () {
        this.header = new e({el: $("header").get(0), wrapper: this}), this.idleTimerPopupWidget = new t({el: $("#time-inactivity-alert").get(0), wrapper: this})
    }, goBack: function () {
        return logger.log("back"), window.history.back(), !1
    }, toScreen: function (e, t) {
        function i(t) {
            if (t == null)throw console.exception("Attempted to change to unknown screen: " + e), "Attempted to change to unknown screen: " + e;
            this.currentScreen != null && _.isFunction(this.currentScreen.close) && this.currentScreen.close.call(this.currentScreen), this.currentScreen = t, this.currentScreen.$el.attr("data-sid", this.currentScreen.name), app.trigger(mytt.c.events.SCREEN_LOAD_SUCCESS, e), this.currentScreen.render();
            var r = new Date, i = r - n, s = "Changed to screen '" + e + "' in " + i + " ms";
            e != "ErrorScreen" && (app.lastScreenChange.screenLoadSuccessTime = r, app.lastScreenChange.inTransition = !1), logger.info(s), $("body").scrollTop(0), app.trigger(mytt.c.events.APP_SKU_CHANGE, app.getFFAStatus())
        }

        var n = new Date;
        e != "ErrorScreen" && (app.lastScreenChange.screenName = e), app.trigger(mytt.c.events.SCREEN_LOAD_BEGIN, e);
        var r = {el: $("#viewport").get(0), name: e};
        t && (r.model = t), this.getScreen(e, r, this, i)
    }, enableLoadingState: function (e) {
        var t = $("#viewport");
        _.isUndefined(e) && (e = "Loading...");
        if (t.children('div[data-template="Loading"]').length > 0)return;
        logger.log("Displaying Loading template");
        var r = app.templateFactory.getTemplate("Loading", n);
        t.html(r({message: e}))
    }, darken: function () {
        $("#time-inactivity-alert-overlay").height($(document).height()).show()
    }, lighten: function () {
        $("#time-inactivity-alert-overlay").hide()
    }});
    return r
}), define("routers/AppRouter", [], function () {
    var e = Backbone.Router.extend({routes: {"": "toAuthOrDashboard", taxReturns: "toAuthOrDashboard", accountInfo: "toAccountInfo", "accountInfo/success/:field": "toAccountInfoSuccess", "accountInfo/edit/:type": "toAccountInfoEdit", IGotMyMoney: "toIGotMyMoney", orders: "toOrders", "orders/detail/:orderId": "toOrderDetails", "orders/print/:orderId": "toPrintOrder", refundTracker: "toRefundTracker", refundTrackerDisqualify: "toRefundTrackerDisqualify", refundOutsideLooseRange: "toRefundOutsideLooseRange", WhereIsMyRefund: "toRefundOutsideLooseRange", signOut: "toSignOut", redBrowser: "toRedBrowser", thankYouRefund: "toThankYouRefund", authEditSecurity: "toAuthEditSecurity", addAuthSuccess: "toAddAuthSuccess", healthcareSummary: "toHealthcareSummary", healthcareConsent: "toHealthcareConsent", healthcare: "toHealthcare", ttoComingSoon: "toTTOComingSoon", RUEDashboard: "toRUEDashboard", productSelector: "toProductSelector", "*notFound": "toNotFound"}, hasTriggeredSignIn: !1, toAuthOrDashboard: function () {
        app.security.isAuthenticated() ? (logger.info("AppRouter:dashboard"), this.hasTriggeredSignIn ? app.toScreen("DashboardScreen") : (this.hasTriggeredSignIn = !0, logger.log("triggering the sign in event"), app.trigger(mytt.c.events.SIGNIN_SUCCESS))) : (logger.info("AppRouter:toSignIn"), appVars.featureIusSignin ? (app.toScreen("modules/authwidgets/views/screens/SignInScreen"), this.hasTriggeredSignIn = !0) : (app.toScreen("SignInScreen"), this.hasTriggeredSignIn = !0))
    }, toSignInUnrecognized: function () {
        logger.info("AppRouter:toSignInUnrecognized"), app.toScreen("SignInScreenUnrecognizedScreen")
    }, toProductSelector: function () {
        logger.info("AppRouter:toProductSelector"), app.trigger("ProductSelector")
    }, toSignOut: function () {
        logger.info("AppRouter:toSignOut"), app.security.signOut({context: this, complete: function () {
            appVars.featureIusSignin ? app.toScreen("modules/authwidgets/views/screens/SignInScreen") : app.toScreen("SignInScreen")
        }})
    }, toAccountInfo: function () {
        logger.info("AppRouter:accountInfo"), app.toScreen("AccountInfoScreen")
    }, toAccountInfoSigninTurboTax: function () {
        logger.info("AppRouter:accountInfo"), app.toScreen("AccountInfoSigninTurboTaxScreen")
    }, toAccountInfoSuccess: function (e) {
        logger.info("AppRouter:accountInfo"), app.toScreen("AccountInfoScreen")
    }, toAccountInfoEdit: function (e) {
        switch (e) {
            case"security":
                logger.info("AppRouter:accountInfoEditSecurity"), app.toScreen("AccountInfoEditSecurityScreen");
                break;
            case"name":
                logger.info("AppRouter:accountInfoEditName"), app.toScreen("AccountInfoEditNameScreen");
                break;
            case"mobile":
                logger.info("AppRouter:accountInfoEditMobile"), app.toScreen("AccountInfoEditMobileScreen");
                break;
            case"userid":
                logger.info("AppRouter:accountInfoEditUserID"), app.toScreen("AccountInfoEditUserIDScreen");
                break;
            case"password":
                logger.info("AppRouter:accountInfoEditPassword"), app.toScreen("AccountInfoEditPasswordScreen");
                break;
            case"email":
                logger.info("AppRouter:AccountInfoEditEmail"), app.toScreen("AccountInfoEditEmailScreen")
        }
    }, toNotFound: function () {
        logger.info("AppRouter:notFoundReally?"), app.toScreen("NotFoundScreen")
    }, toOrders: function () {
        logger.info("AppRouter:orders"), app.toScreen("OrderHistoryScreen")
    }, toOrderDetails: function (e) {
        logger.info("AppRouter:orderDetails:" + e);
        var t = new Backbone.Model({orderNumber: e});
        app.toScreen("OrderHistoryDetailsScreen", t)
    }, toPrintOrder: function (e) {
        logger.info("AppRouter:orderDetails:" + e);
        var t = new Backbone.Model({orderNumber: e});
        app.toScreen("OrderHistoryPrintScreen", t)
    }, toMoneyTools: function () {
        logger.info("AppRouter:toMoneyTools"), app.toScreen("MoneyToolsScreen")
    }, toRefundTracker: function () {
        logger.info("AppRouter:RefundTracker"), app.toScreen("RefundTrackerScreen")
    }, toIGotMyMoney: function () {
        logger.info("AppRouter:IGotMyMoney"), app.toScreen("GotMyMoneyScreen")
    }, toRefundTrackerDisqualify: function () {
        logger.info("AppRouter:toRefundTrackerDisqualify"), app.toScreen("RefundTrackerDisqualifyScreen")
    }, toRefundOutsideLooseRange: function () {
        logger.info("AppRouter:toRefundOutsideLooseRange"), app.toScreen("RefundOutsideLooseRangeScreen")
    }, toRedBrowser: function () {
        logger.info("AppRouter:redBrowser"), app.toScreen("RedBrowserScreen")
    }, toThankYouRefund: function () {
        logger.info("AppRouter:toThankYouRefund"), app.toScreen("ThankYouRefundScreen")
    }, toAuthEditSecurity: function () {
        logger.info("AppRouter:toAuthEditSecurity"), app.toScreen("AuthEditSecurityScreen")
    }, toAddAuthSuccess: function () {
        logger.info("AppRouter:toAddAuthSuccess"), app.toScreen("AddAuthSuccessScreen")
    }, toHealthcareSummary: function () {
        logger.info("AppRouter:toHealthcareSummary"), app.toScreen("HealthcareSummaryScreen")
    }, toHealthcareConsent: function () {
        logger.info("AppRouter:toHealthcareConsent"), app.toScreen("HealthcareConsentScreen")
    }, toHealthcare: function () {
        logger.info("AppRouter:toHealthcare"), app.toScreen("HealthcareScreen")
    }, toTTOComingSoon: function () {
        logger.info("AppRouter:toTTOComingSoon"), app.toScreen("TTOComingSoonScreen")
    }, toRUEDashboard: function () {
        logger.info("AppRouter:toRUEDashboard"), app.toScreen("RUEDashboardWidget")
    }});
    return e
}), define("modules/ModuleAppRouter", [], function () {
    var e = Backbone.Router.extend({routes: {sample: "toSampleScreen", benefitFinder: "toBenefitFinderScreen", moneyTools: "toMoneyTools", "taxReturns/detail": "toEfileReturnsTaxReturns", "taxReturns/:getCopyYear/:documentId/:isNotStarted": "toGetCopyTaxReturns", "orders/:orderYear": "toOrderHistoryYear", "orders/detail/:orderId": "toOrderDetails", vault: "toVaultHome", "vault/closed": "toVaultClosed", "vault/:id": "toVaultHome", "vault/:id/view": "toVaultDoc", "vault/error/:errorCode/:errorDesc": "toVaultError", passwordrecovery: "toPasswordRecovery", signin: "toSignIn", useridrecovery: "toAccountRecovery", accountrecovery: "toAccountRecovery", recovery: "toCombinedRecovery", getID: "toAltCombinedRecovery"}, toSampleScreen: function () {
        logger.info("AppRouter:toSampleScreen"), app.toScreen("modules/sample/views/screens/SampleScreen")
    }, toBenefitFinderScreen: function () {
        logger.info("AppRouter:toBenefitFinderScreen"), appVars.featureMoneyFinder ? app.toScreen("modules/benefitfinder/views/screens/BenefitFinderScreen") : app.toScreen("modules/benefitfinder/views/screens/NoBenefitFinderScreen")
    }, toMoneyTools: function () {
        logger.info("AppRouter:toMoneyToolsTest"), app.toScreen("modules/moneytools/views/screens/MoneyToolsScreen")
    }, toMyTaxReturnsScreen: function () {
        logger.info("AppRouter:toMyTaxReturnsScreen"), app.toScreen("modules/mytaxreturns/views/screens/MyTaxReturnsScreen")
    }, toGetCopyTaxReturns: function (e, t, n) {
        logger.info("AppRouter:toGetCopyTaxReturns");
        var r = new Backbone.Model({taxYear: e, documentId: t, isNotStarted: n});
        app.toScreen("GetCopyTaxReturnsScreen", r)
    }, toEfileReturnsTaxReturns: function () {
        logger.info("AppRouter:toEfileReturnsTaxReturns:" + appVars.taxYear);
        var e = new Backbone.Model({taxYear: appVars.taxYear});
        app.toScreen("EfileDetailsTaxReturnsScreen", e)
    }, toOrderHistoryYear: function (e) {
        logger.info("AppRouter:toOrderHistoryYear:" + e);
        var t = new Backbone.Model({orderYear: e});
        app.toScreen("OrderHistoryScreen", t)
    }, toOrderDetails: function (e) {
        logger.info("ModuleAppRouter:orderDetails:" + e);
        var t = new Backbone.Model({orderNumber: e});
        app.toScreen("OrderHistoryDetailsScreen", t)
    }, toVaultHome: function (e) {
        logger.info("Approuter:toVaultHome");
        var t = new Backbone.Model({contextDocId: e});
        app.toScreen("modules/vault/views/screens/VaultHomeScreen", t)
    }, toVaultDoc: function (e) {
        logger.info("Approuter:toVaultDoc");
        var t = new Backbone.Model({id: e});
        app.toScreen("modules/vault/views/screens/VaultDocScreen", t)
    }, toVaultDocWithUpload: function () {
        logger.info("Approuter:toVaultDoc");
        var e = new Backbone.Model({hasDocToUpload: !0});
        app.toScreen("modules/vault/views/screens/VaultDocScreen", e)
    }, toVaultTurnaway: function () {
        logger.info("Approuter:toVaultTurnaway"), app.toScreen("modules/vault/views/screens/VaultTurnawayScreen")
    }, toVaultError: function (e, t) {
        logger.info("AppRouter:toVaultError");
        var n = new Backbone.Model({errorCode: e, errorDesc: decodeURIComponent((t + "").replace(/\+/g, "%20"))});
        app.toScreen("modules/vault/views/screens/VaultErrorScreen", n)
    }, toVaultClosed: function () {
        logger.warn("Approuter:toVaultClosed"), app.toScreen("modules/vault/views/screens/VaultClosedScreen")
    }, toPasswordRecovery: function () {
        logger.info("AppRouter:toPasswordRecovery"), app.toScreen("modules/authwidgets/views/screens/PasswordRecoveryScreen")
    }, toSignIn: function () {
        app.security.isAuthenticated() ? app.router.toAuthOrDashboard() : appVars.featureIusSignin ? (logger.info("AppRouter:toSignIn"), app.toScreen("SignInScreen"), logger.error("Contingency sign in screen has been activated."), this.hasTriggeredSignIn = !0) : (logger.info("AppRouter:toSignIn"), app.toScreen("modules/authwidgets/views/screens/SignInScreen"), this.hasTriggeredSignIn = !0)
    }, toAccountRecovery: function () {
        logger.info("AppRouter:toAccountRecovery"), app.toScreen("modules/authwidgets/views/screens/AccountRecoveryScreen")
    }, toCombinedRecovery: function () {
        logger.info("AppRouter:toCombinedRecovery"), app.toScreen("modules/authwidgets/views/screens/CombinedRecoveryScreen")
    }, toAltCombinedRecovery: function () {
        logger.info("AppRouter:toAltCombinedRecovery"), app.toScreen("modules/authwidgets/views/screens/AltCombinedRecoveryScreen")
    }});
    return e
}), define("models/inner/UIDataYear", [], function () {
    var e = Backbone.Model.extend({parse: function (e) {
        return e
    }});
    return e
}), define("models/inner/UIDataYears", ["models/inner/UIDataYear"], function (e) {
    var t = Backbone.Collection.extend({model: e});
    return t
}), define("models/UIData", ["models/inner/UIDataYears"], function (e) {
    var t = Backbone.Model.extend({url: "/svc/uiData", parse: function (t) {
        var n, r = {};
        return t.hasOwnProperty("uiData") && !_.isEmpty(t.uiData) && (r = jQuery.parseJSON(t.uiData), n = r.years), r.years = new e(n, {parse: !0}), r
    }, getCurrentYear: function () {
        var e = null;
        return _.isUndefined(this.get("years")) || this.get("years").models.length > 0 && _.each(this.get("years").models, function (t) {
            t.get("taxYear") == appVars.taxYear && (e = t)
        }, this), _.isNull(e) && (e = this.addCurrentYear()), _.isUndefined(arguments) && logger.warn("Cannot read property '0' of reference undefined: arguments in UIData: getCurrentYear"), arguments.length == 1 && !_.isNull(e) ? e.get(arguments[0]) : e
    }, setCurrentYear: function (e, t) {
        var n = this.getCurrentYear();
        _.isNull(n) && this.addCurrentYear(), n.set(e, t)
    }, addCurrentYear: function () {
        return this.has("years") || this.set("years", new e), this.get("years").add([
            {taxYear: appVars.taxYear}
        ]), this.get("years").models[this.get("years").length - 1]
    }});
    return t
}), define("models/UserState", ["models/inner/ReturnFolder"], function (e) {
    var t = Backbone.Model.extend({url: "/svc/getUserState", parse: function (t) {
        var n = t.taxReturnFolders || [];
        return this.on("change", function (e) {
            var t = e.get("folder") ? e.get("folder").isProductName("FreeFileEdition") : !1;
            app.trigger(mytt.c.events.APP_SKU_CHANGE, t)
        }), n.length == 0 ? {id: 1, folder: new e({statusSummary: mytt.c.taxReturnStatus.TAX_RETURN_NOT_STARTED}), dashboard: t.dashboard, ssn: t.primarySSN4Digits, filingStatus: t.filingStatus, healthcareStatus: t.insured, amountForPrinted: t.amountForPrinted} : (taxReturnFolderCurrentYear = _.where(n, {taxYear: appVars.taxYear}), app.dashboardCYTaxReturnID = taxReturnFolderCurrentYear[0].taxReturnId, {id: 1, folder: new e(taxReturnFolderCurrentYear[0], {parse: !0}), dashboard: t.dashboard, ssn: t.primarySSN4Digits, filingStatus: t.filingStatus, healthcareStatus: t.insured, amountForPrinted: t.amountForPrinted})
    }, getFolder: function () {
        return this.get("folder")
    }, isOffSeason: function () {
        return this.get("folder").isOffSeason()
    }, isNotStarted: function () {
        return this.get("folder").isNotStarted()
    }, isStarted: function () {
        return this.get("folder").isStarted()
    }, isPostFiling: function () {
        return this.get("folder").isPostFiling()
    }, getTaxReturnId: function () {
        return this.get("folder").get("taxReturnId")
    }, getFilingInfos: function () {
        return this.get("folder").getFilingInfos()
    }, getFilingInfoFederal: function () {
        var e = this.get("folder").getFilingInfos();
        return e ? e.getLatestFederalFiling() : null
    }, getFederalFilingTrackingNumber: function () {
        var e = this.getFilingInfoFederal();
        return e ? e.get("trackingNumber") : null
    }, getSSN: function () {
        return this.get("ssn")
    }, getFilingStatus: function () {
        return this.get("filingStatus")
    }, getHealthcareStatus: function () {
        return this.get("healthcareStatus")
    }});
    return t
}), define("Application", ["cfp", "components/SecurityComponent", "components/FeatureSwitch", "components/TemplateFactoryComponent", "components/DataRegistryComponent", "components/IdleTimerComponent", "components/IntegrationComponent", "components/ABTestComponent", "views/WrapperView", "routers/AppRouter", "modules/ModuleAppRouter", "models/UIData", "models/UserState"], function (e, t, n, r, i, s, o, u, a, f, l, c, h) {
    function p() {
    }

    return _.extend(p.prototype, {cfp: null, wrapper: null, router: null, moduleRouter: null, model: null, security: null, templateFactory: null, dataRegistry: null, idleTimer: null, integration: null, resumeRoute: null, deferredActions: null, intentions: null, lastScreenChange: null, initialize: function () {
        return logger.log("Application:initialize"), window.onerror = this.handleJavascriptError, _.extend(this, Backbone.Events), window.Mojo = {events: {pubsub: {subscribeForEvent: function (e, t, n) {
            app.on(e, t, n)
        }, unSubscribeForEvent: function (e, t) {
            app.off(e, null, t)
        }, unSubscribe: function (e) {
            app.off(null, null, e)
        }, publishEvent: function () {
            app.trigger.apply(app, arguments)
        }}}}, this.cfp = e, this.model = new Backbone.Model, this.security = new t({authNotRequired: ["SignInScreen", "CreateAccountScreen", "ErrorScreen", "NotFoundScreen", "RedBrowserScreen", "GotMyMoneyScreen", "ThankYouRefundScreen", "RefundOutsideLooseRangeScreen", "TTOComingSoonScreen", "modules/authwidgets/views/screens/PasswordRecoveryScreen", "modules/authwidgets/views/screens/SignInScreen", "modules/authwidgets/views/screens/UserRecoveryScreen", "modules/authwidgets/views/screens/AccountRecoveryScreen", "modules/authwidgets/views/screens/CombinedRecoveryScreen", "modules/authwidgets/views/screens/AltCombinedRecoveryScreen", "NewPostFileScreen", "NewNotStartedScreen", "NewInProgressScreen"], singleFactorAuthRequired: ["SignInUnrecognizedDeviceScreen"]}), this.templateFactory = new r, this.dataRegistry = new i({error: function (t) {
            var n = t.errorStatus.code, r = "ErrorScreen";
            if (n > 0 && e.errorMap[n] == e.descriptionMap.authenticationError)logger.log("Acting on authError returned from CFP, clearing out auth state and redirecting to SignIn"), app.security.clearAuthState(), r = "SignInScreen"; else {
                var i = "Received error " + n + ' retrieving user state: "' + t.errorStatus.description + '"';
                logger.error(i)
            }
            app.wrapper.toScreen(r, new Backbone.Model(t))
        }}), this.idleTimer = new s, this.integration = new o, this.deferredActions = [], this.lastScreenChange = {screenName: null, screenLoadSuccessTime: null, inTransition: !1}, this.on(mytt.c.events.SIGNIN_SUCCESS, this.signInSuccess, this), this.on(mytt.c.events.SIGNOUT_SUCCESS, this.signOutSuccess, this), this.on(mytt.c.events.SIGNOUT_ERROR, this.signOutSuccess, this), this.on(mytt.c.events.APPLICATION_INITIALIZE, this.initModel(), this), this.on(mytt.c.events.APP_SKU_CHANGE, function (e) {
            this.setFFAStatus(e)
        }), this.wrapper = new a({el: $("#wrapper").get(0)}), appVars.useMockData && require(["components/Mocks"], function (e) {
            this.mocks = new e
        }), app.trigger(mytt.c.events.APPLICATION_INITIALIZE), logger.log("checking for query string username..."), this.un = _.getParameterByName("username"), logger.log(this.un), this.un && mytt.$.cookie("recoveryName", this.un), this
    }, initModel: function () {
        this.model.set("ffa", !1)
    }, toScreen: function (e, t) {
        var n = function (e, t, n) {
            _.isUndefined(n) == 0 && (n = n.clone());
            if (e.security.isAuthenticatedForScreen(t))e.preScreenChangeActions.call(e, e.security.isAuthenticated(), function () {
                app.on("TransitionScreen", function (t) {
                    e.wrapper.toScreen(t.screenName, n)
                }, this);
                if (e.security.isAuthenticated() && e.abTestComponent.abTests.screenHasActiveTest(t))var r = e.abTestComponent.getScreen(t, function () {
                    e.wrapper.toScreen(r, n)
                }); else e.wrapper.toScreen(t, n)
            }), _.each(e.deferredActions, function (t) {
                _.isFunction(t) && t.call(e)
            }); else {
                var r = 'Attempt to access auth-secured screen "' + t + '" without properly authenticating.';
                logger.info(r), e.resumeRoute = {screenName: t, model: n}, appVars.featureIusSignin ? app.toScreen("modules/authwidgets/views/screens/SignInScreen") : e.wrapper.toScreen("SignInScreen")
            }
            e.deferredActions = []
        };
        _.defer(n, this, e, t)
    }, getFFAStatus: function () {
        var e = !1, t = mytt.$.cookie("tto_location");
        if (t && t != "") {
            var n = t.split("#");
            n.length && n.length > 4 && n[5] == 4 && (e = !0)
        }
        return _.isUndefined(this.model.get("uiData")) || this.model.get("uiData").getCurrentYear("ffa") && (e = !0), e
    }, setFFAStatus: function (e) {
        _.isUndefined(this.model.get("uiData")) || e != this.getFFAStatus() && (app.model.get("uiData").setCurrentYear("ffa", e), app.model.get("uiData").save())
    }, preScreenChangeActions: function (e, t) {
        if (this.getSessionId() == null) {
            var n = (new Date).getTime();
            this.model.set("sessionId", "sess-" + n)
        }
        e && this.abTestComponent == null && (this.abTestComponent = u);
        if (e && this.model.get("uiData") == null) {
            var r = new c;
            r.fetch({success: t, error: t, context: this, parse: !0}), this.model.set("uiData", r)
        } else t.call(this)
    }, redirect: function (e) {
        app.router.navigate(e, {trigger: !0})
    }, signOutSuccess: function () {
        logger.log("signOutSuccess"), this.dataRegistry.clear(), this.model.clear({silent: !0}), this.model = new Backbone.Model, this.initModel()
    }, signInSuccess: function () {
        logger.log("authSuccess"), mytt.$.removeCookie("recoveryName");
        var e = moment(new Date(appVars.currentDate)), t = e.add("years", 1);
        mytt.$.cookie("myttacct", "true", {domain: ".intuit.com", path: "/", secure: !0, expires: t.toDate()});
        if (n.isEnabled("featureRedirectOnSignIn"))var r = decodeURIComponent(url("?ttback"));
        this.resumeRoute != null ? this.dataRegistry.fetch({modelClass: h, load: "getUserState", loadOptions: {}, success: this.onUserStateLoadSuccess, error: this.onUserStateLoadError, context: this}) : this.toScreen("DashboardScreen")
    }, onUserStateLoadSuccess: function (e) {
        var t = this, n = t.resumeRoute;
        t.resumeRoute = null, logger.info("Application: urlResume getUserState success. Directing to " + n.screenName), t.toScreen(n.screenName, n.model)
    }, onUserStateLoadError: function (e) {
        var t = this;
        logger.error("Application: urlResume getUserState failed. Directing to Dashboard to recover"), t.toScreen("DashboardScreen")
    }, getCurrentScreen: function () {
        return this.wrapper.currentScreen
    }, getCurrentScreenName: function () {
        return this.wrapper.currentScreen == null ? "NoCurrentScreen" : this.wrapper.currentScreen.name
    }, addDeferredAction: function (e) {
        _.isFunction(e) && this.deferredActions.push(e)
    }, handleJavascriptError: function (e, t, n) {
        logger.log("handleJavaScriptError:msg"), logger.log(e);
        if (e.indexOf("depth0") != -1 || e.indexOf("GetTaxReturnStatusesForAllRequest") != -1 || e.indexOf("NPObject") != -1)return;
        var r = e;
        t && (r += " in " + t), n && (r += "#" + n);
        var i = 'JS error: "' + r + '"';
        if (app.lastScreenChange != null) {
            app.lastScreenChange.screenName && (i += " on screen " + app.lastScreenChange.screenName);
            if (app.lastScreenChange.screenLoadSuccessTime) {
                var s = new Date;
                i += " for " + (s - app.lastScreenChange.screenLoadSuccessTime) / 1e3 + "s"
            }
        }
        logger.error(i);
        var o = {code: "Red", description: r, name: "Javascript", scope: "MyAccountBrowser"};
        if (app.lastScreenChange != null && app.lastScreenChange.screenName && app.lastScreenChange.screenName.indexOf("modules/authwidgets/views/screens/SignInScreen") != -1 && !app.lastScreenChange.inTransition) {
            app.lastScreenChange.inTransition = !0, logger.warn("SignInScreen error bubbled up to handleJavascriptError, taking user to CFP SignInScreen");
            var u;
            window.location.search ? u = appVars.myTTDomain + "/" + window.location.search + "&k=v" + "#signin" : u = appVars.myTTDomain + "/" + "?k=v" + "#signin", window.location.href = u
        } else appVars.featureFatalJS && app.wrapper.toScreen("ErrorScreen", new Backbone.Model({errorStatus: o}));
        return!0
    }, getSessionId: function () {
        return this.model.get("sessionId")
    }, isOffSeason: function () {
        return appVars.seasonPart === "POST_SEASON"
    }, isPreTTODown: function () {
        return appVars.seasonPart === "PRE_TTO_DOWN"
    }, isInSeason: function () {
        return appVars.seasonPart === "IN_SEASON"
    }, isExtSeason: function () {
        return appVars.seasonPart === "EXTENSION_SEASON"
    }}), p
}), define("text!templates/PopupFrame.html", [], function () {
    return'<div class="popupArrow"></div>\n<div class="popup">\n	<a class="close" href="javascript:void(0)">X</a>\n	<div class="popupContent"></div>\n</div>'
}), define("text!templates/PopupFrameMsg.html", [], function () {
    return'<div class="popup popupMsg ">\n	<a class="close" href="javascript:void(0)">X</a>\n	<div class="popupContent"></div>\n</div>'
}), define("text!templates/PopupFrameMsgNoClose.html", [], function () {
    return'<div class="popup popupMsg ">\n	<div class="popupContent"></div>\n</div>'
}), define("text!templates/PopupFrameNoArrow.html", [], function () {
    return'<div class="popup">\n	<a class="close" href="javascript:void(0)">X</a>\n	<div class="popupContent"></div>\n</div>'
}), define("text!templates/PopupFrameNoClose.html", [], function () {
    return'<div class="popupArrow"></div>\n<div class="popup">\n	<div class="popupContent"></div>\n</div>'
}), define("text!templates/popups/EditComplete.html", [], function () {
    return"<div>a</div>"
}), define("text!templates/popups/PopupBadLogin.html", [], function () {
    return'<div class="popup-bad-login">\n    <p class="firstLine">User ID or password doesn\'t match our records. <br/>Please try again.</p>\n    <p class="link"> <a href="#recovery"> Get help with your user ID or password </a></p>\n</div>'
}), define("text!templates/popups/PopupConfirmDocDelete.html", [], function () {
    return'<h2>Are you sure you want to delete this document?</h2>\n\n<a id="delete" class="btn btn-small btn-blue confirmation">Delete</a> <a id="cancel" class="btn btn-small btn-gray close-btn">Cancel</a>\n'
}), define("text!templates/popups/PopupHealthcareTaxReturn.html", [], function () {
    return'<div class="health-care-popup">\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            Your health care report is based on your:\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12">\n        <ul>\n            <li>income</li>\n            <li>filing status</li>\n            <li>state of residence</li>\n            <li>number of exemptions</li>\n            <li>age (and spouse\'s, if applicable)</li>\n            <li>dependent status (and spouse\'s, if applicable)</li>\n        </ul>\n        </div>\n    </div>\n</div>'
}), define("text!templates/popups/PopupHealthcareNewHealthcareLaw.html", [], function () {
    return'<div class="health-care-popup">\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            What is the new health care law?\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            On March 23, 2010, President Obama signed the Affordable Care Act \n            (ACA). The law puts in place comprehensive health insurance reforms \n            that will roll out over 4 years and beyond. The goal of the ACA is to:\n            <ul>\n                <li>Increase the number of Americans covered by health insurance</li>\n                <li>Decrease the cost of health care</li>\n            </ul>\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            Beginning on January 1, 2014, everyone has to have health insurance \n            in America, with a few exceptions. The following groups are not \n            required to sign up for health care under the ACA: American Indians,\n            prisoners, undocumented immigrants, some religious groups, people \n            whose family income is so low they don\'t have to file a tax return, and \n            folks covered through Medicaid, Medicare, an employer or veteran\'s \n            health program.\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            Other key points:\n            <ul>\n                <li>No one will be excluded from getting insurance</li>\n                <li>\n                    There is a government subsidy available to help pay for health \n                    insurance for people within a certain income range\n                </li>\n                <li>\n                    Insurance companies can\'t refuse to cover people like they used to, \n                    and they can\'t revoke coverage when people get sick.\n                </li>\n                <li>\n                    People won\'t be forced to pay extra for insurance because of pre-\n                    existing conditions.\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>'
}), define("text!templates/popups/PopupHealthCareHaveQuestions.html", [], function () {
    return'<div class="health-care-popup">\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            Get your health care questions answered in minutes at the <a href="https://ttlc.intuit.com/health-care" target="_blank">TurboTax AnswerXchange</a>\n        </div>\n    </div>\n</div>'
}), define("text!templates/popups/PopupHealthcareOfferedCoverage.html", [], function () {
    return'<div class="health-care-popup">\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            People who are offered coverage under most employer group insurance plans are \n            <div class="subsidy-bold">not</div> eligible for subsidies to help pay for health insurance. </br>\n            However, you could be eligible for a subsidy if your employer\'s plan doesn\'t meet\n            these coverage requirements of the Affordable Care Act (ACA):\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            <div class="subsidy-bold">* Is it affordable?</div> If your cost for the annual premium through your employer\'s \n            plan is less than 9.5 percent of your annual wages, it is considered affordable.\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            <div class="subsidy-bold">* Does it cover the minimum?</div> If your employer\'s plan doesn\'t pay at least 60 \n            percent of the total medical cost of medical services, it\'s not considered minimum \n            coverage\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12">\n            Check with your employer to see if their health insurance plan meets these \n            requirements.\n        </div>\n    </div>\n</div>'
}), define("text!templates/popups/PopupHealthcarePenalty.html", [], function () {
    return'<div class="health-care-popup">\n    <div class="row">\n        <div class="col-sm-12">\n            The new health care law only affects people who are not insured in \n            2014. If you are not insured in 2014 a penalty may appear on your \n            taxes on 2015 ($95 or 1% of your income per person).\n        </div>\n    </div>\n</div>'
}), define("text!templates/popups/PopupHealthcareQualifyForSubsidy.html", [], function () {
    return'<div class="health-care-popup">\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            New health insurance marketplaces opened on October 1, 2013. \n            You are now able to choose from many different plans.\n        </div>\n    </div>\n    <h3>An example</h3>\n    <div class="row">\n        <div class="col-sm-8">\n            You choose a health plan that costs\n        </div>\n        <div class="col-sm-4">\n            $300 per month\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-8">\n            You apply your subsidy of\n        </div>\n        <div class="col-sm-4">\n            $180 per month\n        </div>\n    </div>\n    <div class="row monthly-premium">\n        <div class="col-sm-8">\n            Your monthly out-of-pocket premium\n        </div>\n        <div class="col-sm-4">\n            $120 per month\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12 health-care-popup-section">\n            Based on your income, number of people in family, and age, you\'re eligible \n            for this government subsidy to help pay for health insurance.\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-sm-12">\n            Our estimates are based on subsidy data.\n        </div>\n    </div>\n</div>'
}), define("text!templates/popups/PopupIGotIt.html", [], function () {
    return'<div id="refund-i-got-it-popup" class="tracker">\n    <h3>That\'s great news! Could you tell us when you got it?</h3>\n    <h4>Knowing when you received your refund will help us provide better estimates for everyone.</h4>\n    \n    <div id="buttons">\n        {{#each buttons}}\n        <a href="">{{this.label}}</a>\n        {{/each}}\n    </div>\n    \n</div>'
}), define("text!templates/popups/PopupOrderHistory.html", [], function () {
    return'<div class="order-history-popup">\n    <h3>Some orders may not appear here because:</h3>\n    <p><span>You have more than one user ID.</span><br/>If you know your other user ID, try logging in with it to see if you ordered through that account. If you aren\'t sure what it is, we can help you <a href="#recovery" class="signOutAndRecover">identify your other ID(s)</a> and get you signed in with the correct one.</p>\n    <p><span>You deducted a TurboTax fee from your refund.</span><br/>Fees for products or services that you deducted from your tax refund may not appear here as an order.</p>\n    <p><span>You did not purchase directly from TurboTax.</span><br/>We don\'t have order details for purchases made at other online retailers, stores or mobile app shops.</p>\n    <p><span>You have not yet paid for the current year.</span><br/>Orders will only appear here when you have paid for them.</p> \n</div>'
}), define("text!templates/popups/PopupPasswordMsg.html", [], function () {
    return'<div class="password-strength">\n  <div class="strength-meter {{strength}}">\n      {{getFromArray messages message_id}}\n  </div>\n  <ul id="passwordTips">\n      <li>Needs at least 6 characters with no spaces or common words</li>\n      <li>Gets better with uppercase, lowercase, or numbers added in</li>\n      <li>Is best with all of the above plus a special character</li>\n  </ul>\n</div>'
}), define("text!templates/popups/PopupRefundWheresMyRefund.html", [], function () {
    return'<div id="refund-details-popup" class="tracker container">\n     <div id="more-title">\n        <h4>If you\'re still waiting for your money, here\'s some information</h4>\n    </div>\n    \n\n   <div class="col-xs-12 refund-popup-content">\n       {{#if afterLooseState}}\n       <p>   Although the IRS sends 9 out of 10 refunds within 21 days, some returns require\n           additional reviews that delay refund delivery. <strong>Your refund may be delayed\n               if you\'re late with certain types of government tax or loan payments.</strong>\n       </p>\n       <p>\n           The Department of the Treasury\'s Financial Management Service (FMS) can\n           offset your refund (take money from your refund)\n           for any unpaid federal or government debt without giving you prior notice.\n       </p>\n       {{/if}}\n       <p>\n           {{#if afterLooseState}}\n                To get your most up-to-date refund status from the IRS, you\'ll need the following:\n           {{else}}\n                <p>To get the most up-to-date refund status, visit the IRS Where\'s My Refund tool.</p>\n                <p>The IRS updates this tool once per day.</p>\n                <p>Here\'s what you\'ll need:</p>\n            {{/if}}\n           <!--<ol class=\'info-for-IRS-tool\'>\n                <li>Social Security Number</li>\n                <li>Filing Status</li>\n                <li>Refund Amount{{#if refundPaymentPositive}}: <strong>{{formatCurrency refundInfo.refundOrPaymentAmount "true" "notNegative"}}</strong>{{/if}}</li>\n           </ol>-->\n\n            <div class="col-xs-5 center">\n                <p>\n                    Social Security Number (SSN):\n                </p>\n                <p>\n                    <strong>XXX-XX-{{ssn}}</strong>\n                </p>\n            </div>\n           <div class="col-xs-3 center">\n               <p>\n                 Filing Status:\n               </p>\n               <p>\n                <strong>{{filingStatus}}</strong>\n               </p>\n           </div>\n           <div class="col-xs-4 center">\n               <p>\n                 Refund Amount:\n               </p>\n               <p>\n                   {{#if refundPaymentPositive}}<strong>{{formatCurrency refundInfo.refundOrPaymentAmount "true" "notNegative"}}</strong>\n                   {{else}}Not available now.<br>Please try back later.\n                   {{/if}}\n               </p>\n           </div>\n\n       </p>\n   </div>\n   <div class="col-xs-12 refund-popup-content footer">\n        {{#if afterLooseState}}\n        <span class="refund-popup-faux-button"><p>Visit the <a href="https://sa.www4.irs.gov/irfof/IRServlet?app=IRFOF&selectLanguage=en" target="_blank">IRS Where\'s My Refund tool</a></p></span>\n        <span class="spacer">or</span>\n        <span class="refund-popup-faux-button"><p>Call the IRS at (800) 829-1040</p></span>\n       {{else}}\n       <a href="https://sa.www4.irs.gov/irfof/IRServlet?app=IRFOF&selectLanguage=en" target="_blank" class="btn btn-medium btn-orange btn-block">IRS Where\'s My Refund tool</a>\n       {{/if}}\n   </div>\n</div>\n'
}), define("text!templates/popups/PopupTaxReturns.html", [], function () {
    return'<div class="taxreturnpopup">\n    <h4><span>Why isn’t my tax return listed here?</span>\n        Here are a few common reasons:</h4>\n    <p><span>You have more than one user ID.</span>\n    You may have filed your return under a different user ID.  We can help you <a href="#recovery" class="signOutAndRecover">identify your ID(s)</a> and get you signed in with the correct one.</p>\n    \n    <!--<p><span>You filed taxes using TurboTax installed from a CD or download.</span>-->\n    <!--Only returns filed with TurboTax Online are available here. Here’s how to <a href="https://support.turbotax.intuit.com/redirect/access-desktop-return" target="_blank">get a copy of returns filed with TurboTax that you installed or downloaded</a>.</p>-->\n    \n    <!--<p><span>You did not complete a return you started in TurboTax Online.</span>-->\n     <!--We do not save <a href="https://support.turbotax.intuit.com/redirect/incomplete-returns" target="_blank">returns that have not been completed</a> by the mid-October shutdown of TurboTax Online.</p>-->\n\n    \n    <p><span>You did not use TurboTax to complete your tax return.</span>\n     We have no way of recovering returns that were completed outside of TurboTax. You may be able to <a target="_blank" href="https://support.turbotax.intuit.com/redirect/order-irs-copy">get a copy of your return from the IRS</a>.</p>\n\n</div>'
}), define("text!templates/popups/PopupTaxReturnsUnavailable.html", [], function () {
    return'<div class="noEntitlement">\n    <h3>Access to prior year returns is locked</h3>\n    <p>To get your prior year returns, you\'ll need to purchase a copy of TurboTax Federal Edition for the {{TAX_YEAR}} tax year. Once you\'ve paid, you\'ll be able to access your return.</p>\n    <p>Steps to take:</p>\n    <ul>\n        <li>Click on the orange button above.</li>\n        <li>Go to <strong>Print Center</strong> on the left side of the screen.</li>\n        <li>Choose the first option, <strong>Print, save or preview this year\'s return.</strong></li>\n        <li>You\'ll see options for purchasing the product.</li>\n    </ul>\n    <p><a href="https://support.turbotax.intuit.com/redirect/order-irs-copy" target="_blank">You can also get a free copy of your tax return transcript from the IRS.</a></p>\n</div>'
}), define("text!templates/popups/PopupTaxReturnsUnavailablePostFile.html", [], function () {
    return'<h3>Access to prior returns is locked</h3>\n<p>You’re unable to access your earlier returns, but you do have access to your {{TAX_YEAR}} return until October 15, {{TAX_YEAR "1"}}.</p>\n<p>Want to keep access to your prior year returns? Next tax year, purchase any TurboTax product (Basic or above), and get your returns whenever you need them.</p>'
}), define("text!templates/popups/PopupTextMsg.html", [], function () {
    return'<div class="text-message">\n	<h3>What will TurboTax text you about?</h3>\n	<ul>\n		<li>Updates on e-file and refund status</li>\n		<li>Alerts on suspicious account activity</li>\n		<li>Messages about products or services you may want to know about</li>\n	</ul>\n	<p class="disclaimer">\n            Text alerts are optional and you can change your preferences at any time\n            TurboTax respects your privacy and will never sell your personal information\n        </p>\n</div>'
}), define("text!templates/popups/PopupUseridMsg.html", [], function () {
    return'<div class="popup-userid-tips">\n<h3>A good user ID is...</h3>\n<ul>\n	<li>Between 4 and 50 characters with a mix of numbers and letters, and no spaces</li>\n	<li>Unique and easy to remember</li>\n	<li>Not your Social Security or driver\'s license number</li>\n</ul>\n</div>'
}), define("text!templates/popups/PopupViewAmend.html", [], function () {
    return'<div class="changeAmend popupMsgChangeAmend container">\n    {{#if rejectedState}}\n        <div class="row">\n            <div class="col-xs-12">\n                <p class="amend">All of your returns must be accepted before you can amend. Fix and re-file your rejected return.</p>\n            </div>\n        </div>\n    {{else}}\n        {{#if pendingState}}\n            <div class="row">\n                <div class="col-xs-12">\n                    <p class="amend">Your returns are still pending. You can amend (change) your returns as soon as they\'ve been accepted.</p>\n                </div>\n            </div>\n        {{else}}\n            {{#if showOnline}}\n                <div class="row">\n                    <div class="col-sm-12 amend-header-container">\n                        <h1 class="popupHeading">Are you sure you\'d like to amend your return?</h1>\n                        <h2 class="amendFYI">Your return must be accepted before you can amend it.</h2>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="col-sm-6 amend-container">\n                        <div class="amend-instructions">\n                            <p class="amend">If you\'d just like to view your return, you can download your PDF.</p>\n                            <p class="amend">Not sure if you need to amend your return? <a href="{{ttoAmendInstructions}}" target="_blank" automationid="amendLinkOnline">Learn More</a></p>\n                        </div>\n                        <div class="amend-actions">\n                            {{#if taxDocumentId}}\n                                <a class="getTaxReturnEntitledLink btn btn-medium btn-gray btn-block" data-taxyear="{{selectedYear}}" data-snaptax="false" automationid="getCopyTaxReturns_{{selectedYear}}" data-popup-x="0" data-popup-y="-40" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-cardflip="true" href="svc/getTaxReturnPdf?{{getDocumentIdQueryString taxDocumentId}}">Review return (.pdf)</a>\n                            {{/if}}\n                        </div>\n                    </div>\n                    <div class="col-sm-6 amend-container">\n                        <div class="amend-instructions">\n                            <p class="amend">If you\'d like to make changes to your return, follow these instructions.</p>\n                            <p class="amend">First, click the amend button below.  On the next page, click the "Amend/Change My Return" button.</p>\n                        </div>\n                        <div class="amend-actions">\n                            <a href="javascript:void(0);" class="sendToProductOffering btn btn-medium btn-orange btn-block" automationid="amendLinkOnline">Amend (change) return</a>\n                        </div>\n                    </div>\n                </div>\n                <div class="row">\n                    <div class="amend-instructions">\n                        Or, you can amend by downloading the\n                        <a href="{{ttoDownloadBtn}}" target="_blank" automationid="amendLinkDownload" alt="Download"title="Download">TurboTax software</a>.\n                        <br>\n                        <a href="https://support.turbotax.intuit.com/redirect/amend-tto-2013" target="_blank">Learn More</a>\n                    </div>\n                </div>\n                <!--<div class="row">-->\n                    <!--<div class="col-sm-6">-->\n                        <!--<a class="getTaxReturnEntitledLink btn btn-medium btn-gray btn-block" data-taxyear="{{selectedYear}}" data-snaptax="false" automationid="getCopyTaxReturns_{{selectedYear}}" data-popup-x="0" data-popup-y="-40" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-cardflip="true" href="#taxReturns/{{selectedYear}}/{{taxDocumentId}}/false">Review return (.pdf)</a>-->\n                    <!--</div>-->\n                    <!--<div class="col-sm-6">-->\n                        <!--<a href="javascript:void(0);" class="sendToProductOffering btn btn-medium btn-orange btn-block" automationid="amendLinkOnline">Amend (change) return</a>-->\n                    <!--</div>-->\n                <!--</div>-->\n            {{else}}\n                <div class="row">\n                    <div class="col-sm-12">\n                        <h3 class="popupHeading">How to amend your {{selectedYear}} return</h3>\n                        <hr class="popupHeadingHR" />\n                    </div>\n                </div>\n                {{#if isTaxFileAvailable}}\n                    <div class="row">\n                        <div class="col-xs-12">\n                            <p class="amend">1. <a href="javascript:void(0);" class="downloadTaxFile" automationid="downloadTaxFile" target="_blank">Download your .tax file</a><br/>\n                                2. Then <a href="{{ttoDownloadBtn}}" target="_blank" automationid="amendLinkDownload" title="Download">download TurboTax Desktop {{selectedYear}}</a><br/>\n                                3. Finally, open your .tax file using TurboTax Desktop {{selectedYear}},<br/>\n                                and amend your return.  <a href="{{ttoReadArticleLink}}" target="_blank">Learn More</a>\n                            </p>\n                        </div>\n                    </div>\n                {{else}}\n                    <div class="row">\n                        <div class="col-xs-12">\n                            <p class="amend-offSeason">\n                                To amend your {{selectedYear}} return, <a href={{ttoReadArticleLink}} target="_blank">follow these instructions.</a>\n                            </p>\n                        </div>\n                    </div>\n                {{/if}}\n            {{/if}}\n        {{/if}}\n    {{/if}}\n</div>\n'
}), define("text!templates/popups/PopupViewEfile.html", [], function () {
    return'<div class="e-file-details">\n\n    <p class="title">\n        {{#foreach folder}}\n            Your {{taxYear}} federal e-file details\n        {{/foreach}}\n    </p>\n\n    <table class="details">\n        <tr>\n            <td>Received by TurboxTax</td>\n            <td>Tue Apr 5</td>\n            <td>01:06:28 PDT 2012</td>\n        </tr>\n\n    </table>\n\n</div>'
}), define("text!templates/popups/PopupStateAdditionalPaid.html", [], function () {
    return'<h1>Save Time. Transfer Information to TurboTax State.</h1>\n<p>After you finish your federal tax return, we&rsquo;ll transfer your information automatically and you&rsquo;ll be given the option of completing your state taxes using TurboTax, <strong>for only <span class="strikethrough">$39.99</span> <span class="sale-price">$36.99</span> per state.</strong></p>\n<p>Add TurboTax State from the State Taxes section of your TurboTax federal product.</p>\n<p class="state-additional-image">\n    <img width="602" height="160" src="https://images.turbotax.intuit.com/images/state-1-2-3n.png" class="png" alt="Filing your state taxes is easy with TurboTax" />\n</p>\n<div class="state-additional-cost">\n    <h2>How much does TurboTax Online State cost?</h2>\n    <p>\n        <strong>TurboTax State with Basic, Deluxe, Premier, Military Edition and Home &amp; Business:<br /> Only </strong>\n        <strong><span class="strikethrough">$39.99</span> <span class="sale-price">$36.99</span>\n            per state.</strong><br />\n        Prices are determined at the time of print or efile and are subject to change without notice.\n    </p>\n</div>\n'
}), define("text!templates/popups/PopupStateAdditionalFree.html", [], function () {
    return'<h1>Save Time. Transfer Information to TurboTax State.</h1>\n<p>\n    After you finish your federal tax return, we’ll transfer your information automatically and you’ll be given the option of completing your state taxes using TurboTax, <strong>for only\n    <span class="strikethrough">$29.99</span> <span class="">$27.99</span>\n    per state.</strong>	</p>\n<p>Add TurboTax State from the State Taxes section of your TurboTax federal product.</p>\n<p class="state-additional-image">\n    <img width="602" height="160" src="https://images.turbotax.intuit.com/images/state-1-2-3n.png" class="png" alt="Filing your state taxes is easy with TurboTax" />\n</p>\n<div class="state-additional-cost">\n    <h2>How much does TurboTax Online State cost?</h2>\n    <p>\n        <strong>TurboTax State with Free Edition: Only <span class="strikethrough">$29.99</span> <span class="">$27.99</span>\n            per state.</strong><br /> Prices are determined at the time of print or efile and are subject to change without notice.\n    </p>\n</div>\n\n\n		\n		'
}), define("text!templates/popups/PopupStateAdditionalMilitaryPaid.html", [], function () {
    return'<h1>Save Time. Transfer Information to TurboTax State.</h1>\n<p>After you finish your federal tax return, we&rsquo;ll transfer your information automatically and you&rsquo;ll be given the option of completing your state taxes using TurboTax, <strong>for only <span class="strikethrough">$39.99</span> <span class="sale-price">$36.99</span></strong><strong> per state.</strong></p>\n<p>Add TurboTax State from the State Taxes section of your TurboTax federal product.</p>\n<p class="state-additional-image">\n    <img width="602" height="160" src="https://images.turbotax.intuit.com/images/state-1-2-3n.png" class="png" alt="Filing your state taxes is easy with TurboTax" />\n</p>\n<div class="state-additional-cost">\n    <h2>How much does TurboTax Online State cost?</h2>\n    <p>\n        <strong>TurboTax State with Military Edition: Only  <span class="strikethrough">$39.99</span> <span class="sale-price">$36.99</span><strong></strong>\n            per state.</strong><br /> Prices are determined at the time of print or efile and are subject to change without notice.\n    </p>\n</div>'
}), define("text!templates/popups/PopupStateAdditionalMilitaryFree.html", [], function () {
    return'<h1>Save Time. Transfer Information to TurboTax State.</h1>\n<p>After you finish your federal tax return, we&rsquo;ll transfer your information automatically and you&rsquo;ll be given the option of completing your state taxes using TurboTax, <strong>for only <span class="list-price strikethrough">$36.99</span> <span class="sale-price">FREE</span> per state.</strong></p>\n<p>Add TurboTax State from the State Taxes section of your TurboTax federal product.</p>\n<p class="state-additional-image">\n    <img width="602" height="160" src="https://images.turbotax.intuit.com/images/state-1-2-3n.png" class="png" alt="Filing your state taxes is easy with TurboTax" />\n</p>\n<div class="state-additional-cost">\n    <h2>How much does TurboTax Online State cost?</h2>\n    <p>\n        <strong>TurboTax State with Military Edition: Only <span class="list-price strikethrough" style="color:#999999;">$36.99</span> <span class="sale-price">FREE</span>\n            per state.</strong><br /> Prices are determined at the time of print or efile and are subject to change without notice.\n    </p>\n</div>\n\n\n\n'
}), define("text!templates/popups/PopupArb.html", [], function () {
    return'<div class="arb-popup">\n    <h1>\n        Exclusive refund bonus\n        <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/rue/amazon-logo.png" alt="Loading Spinner" class="arb-logo"/>\n    </h1>\n    <hr/>\n        <h4>When you’re ready to file</h4>\n\n        <ul class="outer">\n            <li class="money">\n                <ul class="inner">\n                    <li>Use any increment of $100 from your federal tax refund to purchase an Amazon.com Gift Card</li>\n                    <li>TurboTax will give you an <strong>extra 5%</strong> on your gift card if you are using Federal Free Edition or Basic</li>\n                    <li>TurboTax will give you an <strong>extra 10%</strong> on your gift card if you are using Deluxe, Premier, Home &amp; Business or Military Edition</li>\n                    <li>For example, if you file with TurboTax Deluxe, you can use $500 of your refund to receive a $550 Amazon.com Gift Card</li>\n                </ul>\n            </li>\n\n            <li class="envelope">\n                Once your refund is available/funded, we\'ll email you your Amazon.com claim code within 1-2 business days.\n            </li>\n\n            <li class="gift">\n                Shop on Amazon.com for almost everything — including groceries! This exclusive bonus is just another way TurboTax helps you make your hard-earned dollars go even further this year. <strong>Enjoy!</strong>\n            </li>\n        </ul>\n\n        <hr>\n\n\n        <p class="disclaimer" style="color: #666;">Amazon.com Gift Card offer is for federal refunds only. Limits apply ($2000 per e-card, maximum $10,000 per customer). Offer available only for TurboTax Online or CD/download versions sold and shipped, or downloaded directly from Intuit or Amazon.</p>\n        <p class="disclaimer" style="color: #666;">Amazon.com is not a sponsor of this promotion. Amazon.com Gift Cards ("GCs") are sold by Intuit, an authorized and independent reseller of Amazon.com Gift Cards. Except as required by law, GCs cannot be transferred for value or redeemed for cash. GCs may be used only for purchases of eligible goods at Amazon.com or certain of its affiliated websites. For complete terms and conditions, see <a href="http://www.amazon.com/gc-legal" target="_blank">www.amazon.com/gc-legal</a>. GCs are issued by ACI Gift Cards, Inc., a Washington corporation. All Amazon ®, ™ &amp; © are IP of Amazon.com, Inc. or its affiliates. No expiration date or service fees.</p>\n\n    </div>\n</div>'
}), define("text!templates/popups/PopupBankInfoWrapper.html", [], function () {
    return'<div class="popupRefundDetails">\n    <h1>My refund details</h1>\n    <hr class="popupHeadingHR">\n    <div id="bankInfoContent">\n        <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/spinnerNew{{at2x}}.gif" alt="Loading Spinner" class="loadingSpinner"/>\n        <p class="loadingMessage">Loading...</p>\n    </div>\n</div>'
}), define("text!templates/popups/PopupSkipYear.html", [], function () {
    return'<div class="taxreturnpopup">\n    <h1 class="popupSkipYearHeader">Still need to file your  tax return?</h1>\n    <hr class="popupHeadingHR">\n    <p class="popupSkipYearContent">\n        Although TurboTax Online {{currentSkipYear}} is no longer available, you can still\n        <a href="https://shop.turbotax.intuit.com/personal-taxes/past-years-products.jsp#tax_year_{{currentSkipYear}}" target="_blank">order the TurboTax CD or downloadable software</a>\n        to prepare your {{currentSkipYear}} tax return. You\'ll need to install the software on your computer.\n    </p>\n    <p class="popupSkipYearContent">\n        After completing your {{currentSkipYear}} return, print and mail it - the IRS has shut down e-filing for tax year {{currentSkipYear}}.\n    </p>\n</div>\n'
}), define("text!templates/popups/PopupUnfinishedReturn.html", [], function () {
    return'<div class="unfinishedReturn">\n    <h3>\n        <b>Here are some possible reasons why this return is unfinished:</b>\n    </h3>\n    <div>\n        <ul>\n            <li>You started this return using one user ID, but started a new return using another user ID.</li>\n            <li>You started this return using TurboTax Online, but finished it using the CD or download version.</li>\n            <li>You started this return in TurboTax, but finished it using another tax service.</li>\n        </ul>\n    </div>\n\n</div>'
}), define("text!templates/popups/PopupPrintCenterInfo.html", [], function () {
    return'<div class="popupPrint">\n    <h4>To print all your forms and worksheets:</h4>\n    <hr>\n    <p>1. Click the button below to access the "Welcome Back" screen</p>\n    <p>2. Go to bottom left of the screen and choose <span>Print Center</span></p>\n    <p>3. Choose <span>Print this year\'s return</span>.</p>\n    <p class="printInfoButton"><a class="btn btn-small-block btn-orange small-block buttonTopSpace sendToProductOffering" href="javascript:void(0);">Continue</a></p>\n</div>'
}), define("views/widgets/PopupWidget", ["base/WidgetView", "text!templates/PopupFrame.html", "text!templates/PopupFrameMsg.html", "text!templates/PopupFrameMsgNoClose.html", "text!templates/PopupFrameNoArrow.html", "text!templates/PopupFrameNoClose.html", "text!templates/popups/EditComplete.html", "text!templates/popups/PopupBadLogin.html", "text!templates/popups/PopupConfirmDocDelete.html", "text!templates/popups/PopupHealthcareTaxReturn.html", "text!templates/popups/PopupHealthcareNewHealthcareLaw.html", "text!templates/popups/PopupHealthCareHaveQuestions.html", "text!templates/popups/PopupHealthcareOfferedCoverage.html", "text!templates/popups/PopupHealthcarePenalty.html", "text!templates/popups/PopupHealthcareQualifyForSubsidy.html", "text!templates/popups/PopupIGotIt.html", "text!templates/popups/PopupOrderHistory.html", "text!templates/popups/PopupPasswordMsg.html", "text!templates/popups/PopupRefundWheresMyRefund.html", "text!templates/popups/PopupTaxReturns.html", "text!templates/popups/PopupTaxReturnsUnavailable.html", "text!templates/popups/PopupTaxReturnsUnavailablePostFile.html", "text!templates/popups/PopupTextMsg.html", "text!templates/popups/PopupUseridMsg.html", "text!templates/popups/PopupViewAmend.html", "text!templates/popups/PopupViewEfile.html", "text!templates/popups/PopupStateAdditionalPaid.html", "text!templates/popups/PopupStateAdditionalFree.html", "text!templates/popups/PopupStateAdditionalMilitaryPaid.html", "text!templates/popups/PopupStateAdditionalMilitaryFree.html", "text!templates/popups/PopupArb.html", "text!templates/popups/PopupBankInfoWrapper.html", "text!templates/popups/PopupSkipYear.html", "text!templates/popups/PopupUnfinishedReturn.html", "text!templates/popups/PopupPrintCenterInfo.html"], function (e, t) {
    var n = e.extend({name: "PopupWidget", defaults: null, initialize: function (t) {
        e.prototype.initialize.apply(this, arguments), this.options = t || {}, _.defaults(t, {launcher: null, elementHeight: null, frame: "PopupFrame", content: "", msgText: null, offset: {x: 0, y: 0}, autoOpen: !0}), _.isFunction(t.onConfirmation) && (this.onConfirmation = t.onConfirmation), app.templateFactory.getTemplate(this.options.frame, function (e) {
            this.templateFrame = e, app.templateFactory.getPopupTemplate(this.options.content, function (e) {
                this.templateContent = e, t.autoOpen && this.render()
            }, this)
        }, this)
    }, render: function () {
        var e = this, t = this.model ? this.model.toJSON() : {};
        return $("#popWrap").length || ($("body").append('<div class="popupWrapper" id="popup"/>'), $("body").append('<div id="popWrap" style="min-width: 100%;min-height: 100%; position: fixed;top:0;left:0;z-index:1002;background-color:rgb(0,0,0); opacity: .5; filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);"/>')), $("#popWrap").css({height: $(document).height()}), this.options.className && $(".popupWrapper").addClass(this.options.className), logger.log("load templates"), $(".popupWrapper").html(this.templateFrame()), $(".popupContent").html(this.templateContent(t)), this.options.msgText != null && $(".popupContent").text(e.options.msgText), this.positionPopup(), $(window).on("resize.popupEvents", function () {
            e.positionPopup(!0)
        }), $("#popup").click(function (e) {
            e.stopPropagation()
        }), $(".popupWrapper .close, .popupWrapper .close-btn").on("click.popupEvents", function () {
            e.close()
        }), $("#popWrap").click(function (t) {
            e.close(), logger.log("you clicked popWrap"), t.stopPropagation()
        }), logger.log("set handlers"), $(".sendToProductOffering").on("click", function () {
            e.close(), app.integration.sendToProductOffering()
        }), $(".downloadTaxFile").attr("href", "svc/getTaxReturnBinary?taxDocumentId=" + e.options.taxDocumentId), $(".signOutAndRecover").click(function (e) {
            logger.log(e), e.preventDefault(), logger.log("SIGN OUT SCREEN"), app.security.signOut({context: this, complete: function () {
                app.toScreen("modules/authwidgets/views/screens/CombinedRecoveryScreen")
            }})
        }), _.isFunction(this.onConfirmation) && $(".popupWrapper .confirmation").on("click.popupEvents", function (t) {
            e.close(), e.onConfirmation.call(e, t)
        }), $(document).keyup(function (t) {
            t.keyCode == 27 && e.close()
        }), $(".popupContent:first-child").focus(), e.options != null && typeof e.options.callback == "function" && e.options.callback(), this
    }, positionPopup: function (e) {
        var t = this.options.launcher, n = _.isNumber(t.offsetWidth) ? t.offsetWidth : 0, r = $(window).height(), i = $(window).width(), s = -$(".popupWrapper").width() / 2, o = $(".popupWrapper").height(), u = -o / 2, a = this;
        $(".popupWrapper").hasClass("fullScreenPopup") ? (logger.log("full screen popup"), $(".popupWrapper").css({top: 0, left: 0})) : (logger.log("windowHeight: " + r), logger.log("popupHeight: " + o), logger.log("margin-left: " + u), logger.log("margin-top: " + s), logger.log("bigger popup than window? " + (o > r)), o < r && i > 599 ? $(".popupWrapper").css({"margin-left": s, "margin-top": u, left: a.options.offset.override && !e ? a.options.offset.x : "50%", top: a.options.offset.override && !e ? a.options.offset.y : "50%", height: "auto", position: "fixed"}) : i > 599 && $(".popupWrapper").css({"margin-left": s, left: "50%", top: r > 200 ? .025 * r + "px" : "50%", position: "fixed", height: r > 200 ? .95 * r + "px" : "auto"}))
    }, close: function () {
        e.prototype.close.apply(this, arguments), $("#popWrap").remove(), $(".tipsy").remove(), $(".popupWrapper").off("resize.popupEvents"), $(".popupWrapper").off("click.popupEvents"), $(".popupWrapper").remove(), $(window).off("resize.popupEvents"), $(window).off("resize.cardflip"), $("#time-inactivity-alert-overlay").hide(), logger.log("close handlers")
    }, fadeOut: function (e) {
        _.isNumber(e) || (e = 0);
        var t = this;
        $(".popupWrapper").fadeOut(e, function () {
            t.close()
        })
    }});
    return n
}), define("components/CardflipComponent", ["base/Component"], function (e) {
    var t = e.extend({effect: "flip", from: null, to: null, reverseClass: "reverse", callback: null, initialize: function () {
        return e.prototype.initialize.apply(this, arguments), Modernizr.cssanimations || (this.effect = "fade"), this.from = $(".global-wrapper"), this.to = $(".cardflip-wrapper"), this.reverseClass = "", this
    }, toggleViewportClass: function (e) {
        e ? ($("body").removeClass("viewport-transitioning"), $("body").removeClass("viewport-" + this.effect), $("body").removeClass("white-bg")) : ($("body").addClass("viewport-transitioning"), $("body").addClass("viewport-" + this.effect), $("body").addClass("white-bg"))
    }, cleanFrom: function () {
        $(this.from).addClass("invisible").removeClass("out in reverse " + this.effect).height("")
    }, startOut: function () {
        this.toggleViewportClass();
        var e = this;
        Modernizr.csstransitions ? $(this.from).one("webkitAnimationEnd animationend", function () {
            e.doneOut()
        }) : setTimeout(function () {
            e.doneOut()
        }, 175), $(this.from).height((window.innerHeight || $(window).height()) + $(window).scrollTop()).addClass(this.effect + " out " + this.reverseClass)
    }, doneOut: function () {
        $(this.from) && this.cleanFrom(), this.startIn()
    }, startIn: function () {
        var e = this;
        $(".site-footer").toggleClass("invisible"), $(this.to).css("z-index", -10), $(this.to).removeClass("invisible"), $(this.to).addClass("visible"), $(this.to).height(window.innerHeight || $(window).height()), $(this.to).css("z-index", ""), Modernizr.csstransitions ? $(this.to).one("webkitAnimationEnd animationend", function () {
            e.doneIn()
        }) : setTimeout(function () {
            e.doneIn()
        }, 225), $(this.to).addClass(this.effect + " in " + this.reverseClass)
    }, doneIn: function () {
        $(this.to).removeClass("out in reverse " + this.effect).height(""), this.toggleViewportClass(!0), this.reverseClass = this.reverseClass === "reverse" ? "" : "reverse", this.changeScreens(), typeof this.callback == "function" && (this.callback(), this.callback = null)
    }, changeScreens: function () {
        var e = this.to;
        this.to = this.from, this.from = e
    }, doFlip: function (e) {
        if (this.from === null || this.to === null)return!1;
        typeof e == "function" && (this.callback = e), this.startOut()
    }});
    return t
}), define("text!templates/CardflipFrame.html", [], function () {
    return'<div class="cardflip">\n  <div class="cardflip-header">\n    <a href="javascript:void(0)" class="go-back">Go back</a>\n  </div>\n  <div class="cardflip-content">\n    <h2>Test content</h2>\n    <p>Hello, world!</p>\n  </div>\n</div>'
}), define("views/widgets/PopFlipWidget", ["base/WidgetView", "views/widgets/PopupWidget", "components/CardflipComponent", "text!templates/CardflipFrame.html"], function (e, t, n, r) {
    var i = e.extend({name: "PopFlipWidget", options: null, cardflipComponent: null, useCardflip: !1, usingCardflip: !1, cardFlipDisable: !1, popup: null, initialize: function (n) {
        e.prototype.initialize.apply(this, arguments);
        var s = this;
        this.options = n || {}, _.defaults(this.options, {launcher: null, elementHeight: null, frame: "PopupFrame", content: "PopupExample", msgText: null, offset: {x: 0, y: 0}, width: null, autoOpen: !0, cardFlipDisable: !1, onConfirmation: function (e) {
            e.preventDefault(), s.trigger(i.CONFIRMATION_RECEIVED)
        }}), _.isFunction(n.onConfirmation) && (this.onConfirmation = n.onConfirmation), this.options.cardFlipDisable || ($(document).width() < 600 ? s.useCardflip = !0 : s.useCardflip = !1), s.usingCardflip = s.useCardflip, this.options.cardFlipDisable || $(window).on("resize.cardflip", function (e) {
            $(document).width() < 600 ? s.useCardflip || (s.useCardflip = !0) : s.useCardflip && (s.useCardflip = !1), s.useCardflip != s.usingCardflip && (s.useCardflip ? (s.popup.close(), s.initialize(s.options)) : (s.close(), s.usingCardflip = s.useCardflip, setTimeout(function () {
                s.initialize(s.options), s.option != null && typeof s.option.callback == "function" && s.options.callback()
            }, 800)))
        }), logger.log("cardFlipDisable? " + this.options.cardFlipDisable);
        if (!this.useCardflip || this.options.cardFlipDisable)return this.popup = new t(this.options), this.popup;
        this.popup = null, this.templateFrame = app.templateFactory.getTemplate("CardflipFrame", r), app.templateFactory.getPopupTemplate(this.options.content, function (e) {
            this.templateContent = e, n.autoOpen && this.render()
        }, this)
    }, render: function () {
        var e = this, t = this.model ? this.model.toJSON() : {};
        return $(".cardflip-wrapper").remove(), $("body").append('<div class="cardflip-wrapper" />'), this.options.className && $(".cardflip-wrapper").addClass(this.options.className), this.options.width && $(".cardflip-wrapper").css("width", this.options.width), $(".cardflip-wrapper").html(this.templateFrame()), $(".cardflip-content").html(this.templateContent(t)), this.options.msgText != null && $(".cardflip-content").text(e.options.msgText), this.cardflipComponent = new n, this.cardflipComponent.doFlip(this.options.callback), window.scrollTo(0, 0), _.isFunction(this.onConfirmation) && $(".cardflip-wrapper .confirmation").on("click.cardFlipEvents", function (t) {
            e.close(), e.onConfirmation.call(e, t)
        }), $(".cardflip-wrapper .go-back").on("click.cardFlipEvents", function (t) {
            e.close(), e.options.runOnClose && e.options.onConfirmation(t)
        }), $(".close-btn").on("click", function () {
            e.close()
        }), $(".sendToProductOffering").on("click", function () {
            e.close(), app.integration.sendToProductOffering()
        }), $(".cardflip-content:first-child").focus(), $(".signOutAndRecover").click(function (e) {
            logger.log(e), e.preventDefault(), logger.log("SIGN OUT SCREEN"), app.security.signOut({context: this, complete: function () {
                app.toScreen("modules/authwidgets/views/screens/CombinedRecoveryScreen")
            }})
        }), $(".downloadTaxFile").attr("href", "svc/getTaxReturnBinary?taxDocumentId=" + e.options.taxDocumentId), this
    }, swapContent: function (e) {
        this.templateContent = app.templateFactory.getPopupTemplate(this.options.content, function (e) {
            this.templateContent = e, this.popup != null && (this.popup.templateContent = this.templateContent);
            var t = this.model ? this.model.toJSON() : {};
            this.usingCardflip ? $(".cardflip-content").html(this.templateContent(t)) : $(".popupContent").html(this.templateContent(t))
        }, this)
    }, close: function () {
        var t = this;
        this.cardflipComponent !== null ? this.cardflipComponent.doFlip(function () {
            e.prototype.close.apply(t, arguments), $(".cardflip-wrapper").off("click.cardFlipEvents"), $(".cardflip-wrapper").remove(), $(window).off("resize.cardflip"), t.cardflipComponent = null
        }) : this.popup !== null && this.popup.close()
    }});
    return i.CONFIRMATION_RECEIVED = "ConfirmationReceived", i
}), define("base/ScreenView", ["base/WidgetView", "views/widgets/PopupWidget", "views/widgets/PopFlipWidget"], function (e, t, n) {
    var r = e.extend({template: null, events: null, name: null, parentScreenName: null, initialize: function (t) {
        e.prototype.initialize.apply(this, arguments), _.isString(t.name) ? this.name = t.name : this.name = "UnnamedScreen", _.isString(t.parentScreenName) && (this.parentScreenName = t.parentScreenName), _.isObject(this.model) && (this.modelBinder = new Backbone.ModelBinder);
        var n = {"click .popupLink": "newPopup", "click .sendToProductOffering": function (e) {
            e.preventDefault();
            var t = $(e.currentTarget).attr("data-productId");
            t && mytt.$.cookie("productid", t, {domain: ".intuit.com"}), app.integration.sendToProductOffering(!0)
        }};
        return _.isNull(this.events) ? this.events = n : _.extend(this.events, n), this
    }, render: function () {
        return this.$el.html(this.template()), this
    }, close: function () {
        e.prototype.close.apply(this, arguments), $(".tipsy").remove(), $(window).off("resize.tipsyEvents")
    }, newPopup: function (e, r) {
        var i = $(e.currentTarget), s = i.attr("data-popup-cardflip") === "true" ? n : t, o = new s({launcher: e.currentTarget, elementHeight: i.height(), className: i.attr("data-popup-cssclass"), content: i.attr("data-popup-content"), frame: i.attr("data-popup-frame"), msgText: i.attr("data-popup-msg"), model: r ? r.model : null, offset: {x: isNaN(i.attr("data-popup-x")) ? 0 : i.attr("data-popup-x"), y: isNaN(i.attr("data-popup-y")) ? 0 : i.attr("data-popup-y")}});
        r ? r.children.push(o) : this.children.push(o), e.preventDefault ? e.preventDefault() : e.returnValue = !1
    }});
    return r
}), define("text!modules/authwidgets/templates/SignInScreen.html", [], function () {
    return'{{#if postFileState}}\n    <div class="bigWhiteBackground"></div>\n{{/if}}\n\n<div class="row {{#unless postFileState}}signInFramed{{/unless}}">\n    <div class="col-xs-12{{#if postFileState}} col-md-4 col-sm-4 SigninBackground signInFramed{{/if}}">\n\n        <!--this div gets filled in by the IUS widget-->\n        <div id="ius-sign-in-widget">\n            <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/spinnerNew{{at2x}}.gif" alt="Loading Spinner" class="loadingSpinner"/>\n            <p class="loadingMessage">Loading...</p>\n        </div>\n        <div id="signInAdditionalLinks" style="display:none">\n            <p class="SignInLiscenseAgreement">\n                By clicking Sign In, you agree to our <a id="showTtoLicenseAgreement" data-link-id="128" href="https://turbotax.intuit.com/corp/ttolicense.jsp" target="_blank">License Agreement</a>.\n            </p>\n            <a href="/{{queryStringParameters}}#recovery" id="recoveryLink">I forgot my username or password</a><br/>\n            New to TurboTax? <a href="/createAccount{{queryStringParameters}}">Create an account.</a>\n        </div>\n    </div>\n\n    {{#if postFileState}}\n    {{> PFPartial}}\n    {{/if}}\n\n</div>\n'
}), define("text!templates/CreditScoreScreen.html", [], function () {
    return'<div class="col-sm-8 col-md-8 col-xs-12 col-lg-8 creditscorescreen">\n    <div class="row ">\n        <div class="col-md-12">\n            <!--<img  class ="creditScoreGridImg" height =100% src="{{akamaiPrefix}}/{{lessOrCss}}/images/grid.png" alt="grid">-->\n\n            <div class="creditScoreGrid">\n                <h1 >The average credit score is 688</h1>\n                <h3 >How do you think yours stacks up?</h3>\n                <img class="creditScoreScale" src="{{akamaiPrefix}}/{{lessOrCss}}/images/creditscale.png" alt="credit scale"/>\n            </div>\n\n            <div class="creditScoreContent">TurboTax recommends knowing exactly where you stand today and every day. An easy way to start is by visiting Intuit\'s\n                <img class="creditscoreImage" src="{{akamaiPrefix}}/{{lessOrCss}}/images/credit_monitor.png" alt="credit score"/></div>\n            <div class="creditScoreListDesc"> Get these benefits and more in 2 easy steps:\n                <ul class="creditscoreList">\n                    <li>See your 3-bureau credit score and <strong>what\'s helping or hurting it</strong></li>\n                    <li>Get daily <strong>credit monitoring & alerts </strong>to track mistakes and suspicious activity</li>\n                    <li>Take advantage of a <strong>FREE 14-day trial</strong> then receive the rate of $16.99/month thereafter<super>*</super></li>\n                </ul>\n\n            </div>\n        </div>\n\n    </div>\n\n\n    <div class="row " style="margin-top:-25px">\n        <div class="col-md-8 col-sm-12 creditScoreBtnLeftText">Viewing your score doesn\'t affect it,<br class="responsiveBr"><strong> so there is no harm in looking</strong>.\n        </div>\n        <div class="col-md-4 col-sm-12 creditScoreButton">\n            <a href="{{fcs_tracking \'SignOut\'}}" target="_blank" class="btn btn-medium btn-orange creditScoreButton">Get my score</a>\n            <div class="creditScoreButtonFooter">With enrollment in Mint Credit Monitor</div>\n        </div>\n    </div>\n    <div class="row">\n        <div class="col-md-12">\n            <hr style="margin-top:20px">\n            <div class="creditScoreAgreement"> <super>*</super>You may cancel your free trial at any time within the 14-day period without any charge. Terms and conditions may\n                apply and are subject to change without notice.</div>\n\n        </div>\n\n    </div>\n\n</div>\n\n'
}), define("modules/authwidgets/views/screens/SignInScreen", ["base/ScreenView", "text!modules/authwidgets/templates/SignInScreen.html", "ius", "cfp", "text!templates/CreditScoreScreen.html"], function (e, t, n, r, i) {
    try {
        var s = e.extend({initialize: function () {
            try {
                mytt.$.removeCookie("userIdentifier", {path: "/", secure: !0, domain: ".intuit.com"}), mytt.$.removeCookie("userIdentifier"), mytt.$.cookie("ius_signin", "active"), $("#HeaderSignInButton").hide(), e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("modules/authwidgets/templates/SignInScreen", t), this.useContingency = !1;
                try {
                    _.isUndefined(intuit.ius.signIn) == 0 && _.isNull(intuit.ius.signIn) == 0 ? intuit.ius.signIn.setup({offeringId: "Intuit.cg.myturbotax", enableStrongAuth: !0, theme: "none", turnOffTracking: appVars.featureWidgetAnalyticsOff, onLoad: function () {
                        try {
                            $("#recoveryLink").show(), $("html").hasClass("touch") || ($("#ius-remember").is(":checked") ? $("#ius-password").focus() : $("#ius-userid").focus())
                        } catch (e) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onLoad error="' + e + '"'), e
                        }
                    }, onSignInSuccess: function (e) {
                        try {
                            logger.log("signinmessage:"), logger.log(e), logger.log("SignIn success"), window.location.reload()
                        } catch (t) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onSignInSuccess error="' + t + '"'), t
                        }
                    }, accountRecoveryLink: appVars.myTTDomain + "/" + window.location.search + "#recovery", onSignInFail: function (e) {
                        try {
                            logger.log(e);
                            if (_.isUndefined(e) || _.isNull(e) || _.isNull(e.responseCode) && _.isNull(e.responseDetail) && _.isNull(e.responseMessage) || e.httpStatus == "503" || e.httpStatus == "500") {
                                var t = "IUS widget is returning fatal error, redirecting user to contingency";
                                _.isUndefined(e) ? t += " message=undefined" : _.isNull(e) ? t += " message=null" : (t += " responseCode=" + e.responseCode, t += " responseDetail='" + e.responseDetail + "'", t += " responseMessage='" + e.responseMessage + "'", t += " httpStatus=" + e.httpStatus), logger.error(t), window.location.href = appVars.myTTDomain + "/" + window.location.search + "#signin";
                                return
                            }
                            if (!_.isUndefined(e) && !_.isNull(e) && e.httpStatus != "200" && e.responseCode != "INVALID_CREDENTIALS" && e.responseCode != "LOCKED_OUT" && e.responseCode != "INVALID_PASSWORD" && e.responseCode != "INVALID_USERNAME" && e.responseCode != "USER_NOT_FOUND") {
                                var n = "IUS widget returned:";
                                n += " responseCode=" + e.responseCode, n += " responseDetail='" + e.responseDetail + "'", n += " responseMessage='" + e.responseMessage + "'", n += " httpStatus=" + e.httpStatus, logger.warn(n)
                            }
                            if (e.responseCode == "LOW_SECURITY_ACCOUNT" || e.responseCode == "ADDITIONAL_AUTH_INFO_REQD")logger.error("No alt auth info"), $("#ius-sign-in-error").html('Before you can log in, we need to verify your identity. <a href="https://shop.turbotax.intuit.com/support/iq/My-Account/Message---We-need-a-little-more-information-from-you-/SLN76256.html" target="_blank">Find instructions here.</a>');
                            e.responseCode == "ACCESS_DENIED" && (logger.log("Beaconing SignIn:ACCESS_DENIED"), app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, "IUSLEVEL", {userState: "3"}), mytt.$.cookie("ARProgress", "SignIn:4225", {expires: 3, path: "/", domain: ".intuit.com"}), mytt.$.cookie("ARTR", !0, {expires: 3, path: "/", domain: ".intuit.com"}), $("#signInAdditionalLinks").hide()), e.responseCode == "LOCKED_OUT" && (logger.log("hiding the additonal links"), $("#signInAdditionalLinks").hide()), app.trigger("OIISignInError", {errorcode: e.responseCode})
                        } catch (r) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onSignInFail error="' + r + '"'), r
                        }
                    }, onViewDisplayed: function (e) {
                        try {
                            r(e), e === "sign-in-view" ? $("#signInAdditionalLinks").show() : $("#signInAdditionalLinks").hide()
                        } catch (t) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onViewDisplayed error="' + t + '"'), t
                        }
                    }, onUpdateContactInfoSuccess: function (e) {
                        try {
                            logger.log("updateInfoSuccess"), logger.log(e);
                            var t = "username:" + e.isUserNameUpdated + "|email:" + e.isEmailUpdated + "|phone:" + e.isPhoneUpdated + "|scenario:" + e.scenario;
                            app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, "SignInFlow", {userState: "Updates:" + t})
                        } catch (n) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onUpdateContactInfoSuccess error="' + n + '"'), n
                        }
                    }, onUpdateContactInfoFail: function () {
                        try {
                            app.trigger("OIISignInError", {errorcode: "Failed to save contact info."}), logger.log("updateInfoFail")
                        } catch (e) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onUpdateContactInfoFail error="' + e + '"'), e
                        }
                    }, onAdaptiveSignInSuccess: function (e) {
                        try {
                            logger.log("adaptivesigninsuccess"), logger.log(e), $("#ius-sign-in-submit-btn").addClass("ius-loading-btn"), logger.log("risk Level sez:");
                            if (e) {
                                var t = e.riskLevel, n = "";
                                e.iamTicket && (n = e.iamTicket.userId), logger.log(t), logger.log("beaconing a SCREEN_LOAD_DETAIL:{userState : " + t + ", authId: " + n + "})"), app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, "IUSLEVEL", {userState: t, authId: n})
                            }
                        } catch (r) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onAdaptiveSignInSuccess error="' + r + '"'), r
                        }
                    }, onSendSignInConfirmationSuccess: function (e) {
                        try {
                            logger.log("sent signin confirmation"), logger.log(e)
                        } catch (t) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onSendSignInConfirmationSuccess error="' + t + '"'), t
                        }
                    }, onSendSignInConfirmationFail: function () {
                        try {
                            logger.log("failed to send confirmation")
                        } catch (e) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onSendSignInConfirmationFail error="' + e + '"'), e
                        }
                    }, onVerifySignInConfirmationSuccess: function (e) {
                        try {
                            logger.log("verified"), logger.log(e)
                        } catch (t) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onVerifySignInConfirmationSuccess error="' + t + '"'), t
                        }
                    }, onVerifySignInConfirmationFail: function () {
                        try {
                            app.trigger("OIISignInError", {errorcode: "Invalid PIN entry."}), logger.log("failed to verify")
                        } catch (e) {
                            throw logger.error('JavaScriptException: func=SignInScreen.authWidget.setup.onVerifySignInConfirmationFail error="' + e + '"'), e
                        }
                    }, contactUsLink: "https://turbotax.intuit.com/support/", customerSupportLink: "https://turbotax.intuit.com/support/", errorMessageOverride: [
                        {responseCode: "INVALID_CONFIRMATION_ID", message: "The confirmation code you entered is expired or is incorrect."},
                        {responseCode: "INVALID_PIN", message: "Your security code is incorrect."},
                        {responseCode: "INVALID_SECURITY_QUESTION_OR_ANSWER", message: "Your security question or answer is not valid."},
                        {responseCode: "INVALID_SECURITY_ANSWER", message: "Your answer to the security question is not valid."},
                        {responseCode: "ALT_INFO_DOES_NOT_MATCH", message: "The information you entered does not match our records."},
                        {responseCode: "INVALID_ALT_INFO", message: "The information you entered does not match our records."}
                    ], contentOverride: [
                        {id: "ius-sign-in-header", content: "Sign In"},
                        {id: "ius-label-userid", content: "User ID"},
                        {id: "ius-link-sign-up", content: ""},
                        {id: "ius-welcome-back-header-text", content: "Welcome back to TurboTax!"},
                        {id: "ius-label-confirm-email", content: "Email"},
                        {id: "ius-label-confirm-phone", content: "Mobile phone number"},
                        {id: "ius-otp-email-sub-header", content: "We sent you an email with a confirmation code.<br/>Enter it below to confirm your TurboTax account."},
                        {id: "ius-label-text-sent", content: "We've sent a code to:"},
                        {id: "ius-account-disabled-sub-header", content: "We've noticed some suspicious behavior on your account. To keep your information safe, we've temporarily locked your account from further access."},
                        {id: "ius-account-disabled-contact-support", content: "Reference code 4225"},
                        {id: "ius-strong-auth-security-question-header", content: "Just making sure you're really you"},
                        {id: "ius-strong-auth-ssn-header", content: "Just making sure you're really you"},
                        {id: "ius-strong-auth-ssn-sub-header", content: "If you can't remember the answer to your security question, you can enter your Social Security number instead."},
                        {id: "ius-strong-auth-security-question-sub-header", content: "We've added security questions to keep your account safe and secure."}
                    ]}) : this.handleSignInWidgetError("SignInScreen.authWidget.initialize", "intuit.ius.signIn is null or undefined")
                } catch (n) {
                    throw logger && logger.error('JavaScriptException: func=SignInScreen.authWidget.setup error="' + n + '"'), n
                }
                function r(e) {
                    try {
                        logger.log("Beaconing SignIn:" + e), app.trigger(mytt.c.events.SCREEN_LOAD_SUCCESS, "SignIn:" + e), mytt.$.cookie("ARProgress", "SignIn:" + e, {expires: 3, path: "/", domain: ".intuit.com"})
                    } catch (t) {
                        throw logger.error('JavaScriptException: func=SignInScreen.authWidget.pageViewBeacon error="' + t + '"'), t
                    }
                }
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInScreen.authWidget.initialize error="' + n + '"'), n
            }
        }, render: function () {
            try {
                return logger.log("SignIn:Display"), this.useContingency == 0 && (Handlebars.registerPartial("PFPartial", i), !_.isUndefined(app.postfiling) || !_.isNull(app.postfiling) ? postFilingState = app.postfiling : postFilingState = !1, postFilingState == 1 && (app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, this.name, {userState: "PostFileSignOutScreenMessaging"}), logger.log("postfile signout ci call")), this.$el.html(this.template({postFileState: postFilingState}))), app.trigger(mytt.c.events.SIGNIN_RENDER), this
            } catch (e) {
                throw logger && logger.error('JavaScriptException: func=SignInScreen.authWidget.render error="' + e + '"'), e
            }
        }, handleSignInWidgetError: function (e, t) {
            this.logJavaScriptException(e, "gotoContingencySignIn", t), this.useContingency = !0, this.goToContingencySignIn()
        }, logAndIgnoreJavaScriptException: function (e, t) {
            this.logJavaScriptException(e, "ignored", t)
        }, logJavaScriptException: function (e, t, n) {
            logger && logger.error("JavaScriptException: func=" + e + ' error="' + n + '" action=' + t)
        }, goToContingencySignIn: function () {
            window.location.href = this.getFreshUrl() + "#signin"
        }, getFreshUrl: function () {
            var e = "";
            return window.location.search ? e += window.location.search + "&" : e += "?", appVars.myTTDomain + "/" + e + "k=v"
        }});
        return s
    } catch (o) {
        throw logger && logger.error('JavaScriptException: func=SignInScreen.authWidget.define error="' + o + '"'), o
    }
}), define("text!templates/notifications/Frame.html", [], function () {
    return'<div class="notification">\n  <div class="notificationContent"></div>\n</div>'
}), define("text!templates/notifications/ErrorMessage.html", [], function () {
    return'<p class="msgText"></p>'
}), define("views/widgets/NotificationWidget", ["base/WidgetView", "text!templates/notifications/Frame.html", "text!templates/notifications/ErrorMessage.html"], function (e, t) {
    var n = e.extend({name: "NotificationWidget", defaults: null, initialize: function (n) {
        e.prototype.initialize.apply(this, arguments), this.options = n || {}, _.defaults(this.options, {container: $("#wrapper"), content: "ErrorMessage", type: "info", msgText: null}), this.templateFrame = app.templateFactory.getNotificationTemplate("Frame", t), app.templateFactory.getNotificationTemplate(this.options.content, function (e) {
            this.templateContent = e, this.render()
        }, this)
    }, render: function () {
        var e = this, t = this.model ? this.model.toJSON() : {};
        return $(".notificationWrapper").remove(), $(this.options.container).prepend('<div class="notificationWrapper" />'), this.options.type && $(".notificationWrapper").addClass(this.options.type), $(".notificationWrapper").html(this.templateFrame()), $(".notificationContent").html(this.templateContent(t)), this.options.msgText !== null && $(".notificationContent").find("p").html(e.options.msgText), $(".notificationWrapper .close").on("click", function () {
            e.close()
        }), this
    }, close: function () {
        e.prototype.close.apply(this, arguments), $(".notificationWrapper").remove()
    }});
    return n
}), define("base/FormView", ["base/WidgetView", "views/widgets/NotificationWidget"], function (e, t) {
    var n = e.extend({originalAttributes: null, s: !1, isSubmitting: !1, hasSuccessfulSubmission: !1, lastBlurred: null, events: null, initialize: function (t) {
        e.prototype.initialize.apply(this, arguments);
        var n = {"focus input": "hidePlaceholder", "blur input": "showPlaceholder", "keyup input": "keydown", 'click input[name="submit"]': "submit", "click .submit": "submit", "click .cancel": "cancel", "click .healthCareSubmit": "submit"}, r = this;
        return this.$el.submit(function (e) {
            return r.onSubmit(e)
        }), _.isNull(this.events) ? this.events = n : _.extend(this.events, n), this.modelBinder = new Backbone.ModelBinder, this.initOriginalAttributes(t), this.initModelBinding(t), this.initValidation(t), this.initCustom(t), this
    }, initOriginalAttributes: function () {
        this.originalAttributes = this.model.toJSON()
    }, initModelBinding: function () {
        this.modelBinder.bind(this.model, this.el)
    }, initValidation: function () {
        var e = this;
        this.$el.find('input[name*="Verify"]').blur(function () {
            e.lastBlurred = this
        }), Backbone.Validation.bind(this, {forceUpdate: !0, valid: _.wrap(this.valid, function (e, t, n) {
            t.isSubmitted() && e.call(t, t, n)
        }), invalid: _.wrap(this.invalid, function (t, n, r, i) {
            _.defer(function () {
                var s = $(e.lastBlurred).attr("name") || "";
                (n.isSubmitted() || r === s || r === s.replace("Verify", "")) && t.call(n, n, r, i)
            })
        })}), this.$el.find("input, select").tipsy({trigger: "manual", gravity: "s", opacity: 1})
    }, initCustom: function () {
    }, valid: function (e, t, n) {
        if (_.isString(t)) {
            var r = e.$el.find('[name="' + t + '"]');
            if (r.length !== 0 || r.selector === '[name="createAccountMobileNumber"]')r.attr("title", "").tipsy("hide"), r.removeClass("error"), r.removeAttr("aria-invalid")
        } else e.$el.find("p.error").empty();
        n && e.$el.find("p.success").text(n)
    }, invalid: function (e, n, r, i) {
        $("form").find("input").filter(".error:visible:first").focus();
        if (_.isString(n)) {
            var s = e.$el.find('[name="' + n + '"]'), o = n + "Error";
            if (s.length !== 0) {
                s.attr("title", r).tipsy("show");
                var u = ".tipsy-inner:contains('" + r + "')";
                $(u).attr("id", o), $("#" + n).attr("aria-describedby", o), s.addClass("error"), s.attr("aria-invalid", "true"), s.attr("role", "alert")
            }
            app.trigger("InvalidInput:" + n, this.model), this.trigger("InvalidInput:" + n)
        } else _.isObject(i) ? (this.notification = new t({el: e.el, container: i.container, type: i.type, msgText: r}), e.$el.children().push(this.notification)) : e.$el.find("p.error").text(r).focus()
    }, keydown: function (e) {
        e.keyCode === mytt.c.ENTER_KEY && (logger.log("enter"), $(e.currentTarget).blur(), this.submit(e))
    }, isSubmitted: function (e) {
        return _.isBoolean(e) && (this.s = e), this.s
    }, onSubmit: function (e) {
        this.submit(e), e.preventDefault()
    }, submit: function (e) {
        this.doPreSubmit() && this.doSubmit() && this.doPostSubmit(), e.preventDefault()
    }, doPreSubmit: function (e) {
        return this.hasSuccessfulSubmission || this.isSubmitting === !0 ? !1 : (this.isSubmitted(!0), e || this.model.isValid(!0) ? (logger.log("model valid - submitting and locking UI"), this.isSubmitting = !0, this.lockUIState(), !0) : !1)
    }, doSubmit: function () {
        logger.error("doSubmit is not implemented!")
    }, doPostSubmit: function () {
    }, success: function () {
        this.hasSuccessfulSubmission = !0, this.valid(this, null)
    }, error: function () {
        this.isSubmitting = !1, $("form").find("input").filter(".error:visible:first").focus(), this.lockUIState()
    }, cancelSubmit: function () {
        this.isSubmitting && ($("form").find("input").filter(".error:visible:first").focus(), this.isSubmitting = !1, this.lockUIState())
    }, cancel: function () {
        return this.model.set(this.originalAttributes, {silent: !0}), !0
    }, close: function () {
        e.prototype.close.apply(this, arguments), this.cancel(), this.modelBinder.unbind(), Backbone.Validation.unbind(this)
    }, lockUIState: function () {
        var e = this, t = "", n = "less", r = "";
        appVars.toAkamai === "true" && (t = appVars.cdnDomain + "/" + appVars.version, n = "css"), r = t + "/" + n + "/images/ajax-loader.gif", this.isSubmitting === !0 ? (logger.log("isSubmitting : false, LOCK UI"), this.$(".submit").addClass("disabled locked").prepend('<div class="loadingEffect"><img src="' + r + '" alt="Loading effect on submit button" ></div>')) : (e.$(".submit").removeClass("disabled locked"), $(".loadingEffect").remove(), logger.log("UI UNLOCK"))
    }, hidePlaceholder: function (e) {
        this.togglePlaceholder(e, !1)
    }, showPlaceholder: function (e) {
        this.togglePlaceholder(e, !0)
    }, togglePlaceholder: function (e, t) {
        var n = null;
        if (_.isString(e)) {
            n = this.$el.find('input[name="' + e + '"]');
            if (n.length === 0)return
        } else n = $(e.target);
        var r = this.$el.find("label[for=" + n.attr("name") + "]");
        if (!r.hasClass("overlabel"))return;
        n.val() || (t ? (r.show(), n.data("class") && n.addClass(n.data("class"))) : (r.hide(), n.attr("class") && (n.data("class", n.attr("class")), n.removeClass(n.attr("class")))))
    }, lockButton: function (e, t) {
        var n = "", r = "less";
        appVars.toAkamai === "true" && (n = appVars.cdnDomain + "/" + appVars.version, r = "css");
        var i = n + "/" + r + "/images/ajax-loader.gif";
        t && (i = n + "/" + r + "/images/ajax-loader.gif"), logger.log("the special image url is:" + i), logger.log("your daily css selctor is: " + e), logger.log("LOCKSPECIFICBUTTON has LOCKED UI"), $(".submit").addClass("disabled"), $(e).addClass("disabled locked").prepend('<div class="loadingEffect"><img src="' + i + '" alt="loading effect on submit button"></div>')
    }});
    return n
}), define("utility/ModelViewConverters", [], function () {
    return{phoneNumber: function (e, t) {
        if (e == "ModelToView")return _.isString(t) == 0 ? "" : "(" + t.substr(0, 3) + ") " + t.substr(3, 3) + "-" + t.substr(6, 4);
        var n = t.replace(/[\(\)\- ]/g, "");
        return n
    }, capitalized: function (e, t) {
        return e == "ModelToView" ? _.isString(t) == 0 ? "" : $.trim(t.charAt(0).toUpperCase() + t.substr(1)) : $.trim(t)
    }, truncateString: function (e, t, n) {
        return e == "ModelToView" ? t.length > n ? $.trim(t.substring(0, n) + "...") : $.trim(t) : $.trim(t)
    }, returnInfoCurrency: function (e, t) {
        if (e == "ModelToView" && t.amount.amount)return"$" + t.amount.amount.commafy()
    }, equal: function (e, t, n) {
        if (e == "ModelToView") {
            var r = n.hash.status || "";
            if (arguments.length < 3)throw new Error("Handlebars Helper equal needs 2 parameters");
            return t != r ? n.inverse(this) : n.fn(this)
        }
    }, money: function (e, t, n, r) {
        if (e === "ModelToView") {
            _.isNumber(t) || (t = parseFloat(t)), r = r || 2;
            var i = t.toFixed(r), s = i.indexOf(".");
            return n = n || 0, s < n && (i = (new Array(n - s + 1)).join("0") + i), "$" + i
        }
    }, formatDate: function (e, t, n, r) {
        logger.log("formatDate"), logger.log(t);
        if (e === "ModelToView") {
            var i = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"), s = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"), o = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"), u = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"), a = new Date(t), f = a.getDate(), l = a.getDay(), c = a.getMonth(), h = a.getFullYear();
            return n ? r ? i[c] + " " + f : o[l] + " " + i[c] + " " + f : u[l] + " " + s[c] + " " + f
        }
        if (e === "MonthDayYear") {
            var a = new Date(t), f = a.getDate(), l = a.getDay(), c = a.getMonth() + 1, h = a.getFullYear();
            return c + "/" + f + "/" + h
        }
    }, formatHour: function (e, t) {
        var n = new Date(t), r = n.getUTCHours() + "";
        r.length === 1 && (r = "0" + r);
        var i = n.getUTCMinutes() + "";
        i.length === 1 && (i = "0" + i);
        var s = n.getUTCSeconds() + "";
        return s.length === 1 && (s = "0" + s), r + ":" + i + ":" + s
    }, hasAttribute: function (e) {
    }, trim: function (e, t) {
        return e == "ModelToView" ? t : _.isString(t) ? $.trim(t) : ""
    }}
}), define("models/SignIn", [], function () {
    try {
        var e = Backbone.Model.extend({defaults: {userName: "", password: "", rememberMe: !1, ioBB: ""}, validation: {}, initialize: function () {
            try {
                logger.log(this), this.setValidation()
            } catch (e) {
                throw logger && logger.error('JavaScriptException: func=SignIn.initialize error="' + e + '"'), e
            }
        }, stopValidation: function () {
            this.clearValidation()
        }, clearValidation: function () {
            this.validation = {}
        }, setValidation: function () {
            this.validation = {userName: [
                {fn: "checkUserNameFill", required: !0},
                {required: !0, rangeLength: [4, 255]},
                {fn: "checkUserNameChange", required: !0}
            ], password: [
                {fn: "checkPasswordFill", required: !0},
                {required: !0, rangeLength: [6, 32]}
            ], ioBB: [
                {fn: "checkIOBB", required: !1}
            ]}
        }, checkIOBB: function (e, t, n) {
            try {
                this.attributes.ioBB = $("#ioBB").val();
                return
            } catch (r) {
                throw logger && logger.error('JavaScriptException: func=SignIn.checkIOBB error="' + r + '"'), r
            }
        }, checkUserNameChange: function (e, t, n) {
            try {
                app.security.getUserName() && e != app.security.getUserName() && (this.attributes.rememberMe = !1);
                return
            } catch (r) {
                throw logger && logger.error('JavaScriptException: func=SignIn.checkUserNameChange error="' + r + '"'), r
            }
        }, checkPasswordFill: function () {
            try {
                if (this.attributes.password == "") {
                    var e = $("#password").val();
                    this.attributes.password = e
                }
                return
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignIn.checkPasswordFill error="' + t + '"'), t
            }
        }, checkUserNameFill: function () {
            try {
                if (this.attributes.userName == "") {
                    var e = $("#userName").val();
                    logger.log("it was blank, but im pretty sure username should be..."), logger.log(e), this.attributes.userName = e
                }
                return
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignIn.checkUserNameFill error="' + t + '"'), t
            }
        }});
        return e
    } catch (t) {
        throw logger && logger.error('JavaScriptException: func=SignIn.define error="' + t + '"'), t
    }
}), define("text!templates/notifications/BadLogin.html", [], function () {
    return"<p>User ID or password doesn't match our records. Please try again.</p>"
}), define("views/forms/SignInFormView", ["base/FormView", "views/widgets/NotificationWidget", "utility/ModelViewConverters", "views/widgets/PopFlipWidget", "models/SignIn", "text!templates/notifications/BadLogin.html"], function (e, t, n, r, i, s) {
    try {
        var o = {_skipLightenOnSuccess: !0, initModelBinding: function () {
            try {
                var e = Backbone.ModelBinder.createDefaultBindings(this.el, "name");
                e.userName.converter = n.trim, this.modelBinder.bind(this.model, this.el, e)
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignInFormView.initModelBinding error="' + t + '"'), t
            }
        }, doSubmit: function () {
            try {
                this.notification && this.notification.close(), app.security.signIn({success: this.success, error: this.error, context: this}, this.model)
            } catch (e) {
                throw logger && logger.error('JavaScriptException: func=SignInFormView.doSubmit error="' + e + '"'), e
            }
        }, success: function () {
            try {
                e.prototype.success.apply(this, arguments), this.model.clear({silent: !0})
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignInFormView.success error="' + t + '"'), t
            }
        }, error: function (n) {
            try {
                e.prototype.error.apply(this, arguments), app.wrapper.lighten();
                var r = [106, 10106, 115, 10115];
                this.model.stopValidation(), this.model.unset("password"), this.model.setValidation();
                if ($.inArray(n.errorStatus.code, r) > -1)this.notification = new t({el: this.el, container: this.$el, content: "BadLogin", type: "error"}), $("#wrapper").children().push(this.notification); else {
                    var i = {container: this.$el, type: "error"};
                    this.invalid(this, null, n.errorStatus.description, i)
                }
            } catch (s) {
                throw logger && logger.error('JavaScriptException: func=SignInFormView.error error="' + s + '"'), s
            }
        }, close: function () {
            try {
                e.prototype.close.apply(this, arguments), app.wrapper.lighten()
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignInFormView.close error="' + t + '"'), t
            }
        }};
        return e.extend(o)
    } catch (u) {
        throw logger && logger.error('JavaScriptException: func=SignInFormView.define error="' + u + '"'), u
    }
}), define("text!templates/SignIn.html", [], function () {
    return'<div class="bigWhiteBackground"></div>\n<div class="login-dashboard-signed-out row">\n    <div class="col-sm-12">\n        <h1 id="greeting">Sign {{#if userName}}in with {{userName}}{{else}}In{{/if}}</h1>\n        <form id="signInForm">\n            <div class="row">\n                <div class="col-sm-7 input-text signout-input">\n                    <label for="userName">User ID</label>\n                    <input type="text" id="userName" name="userName" maxlength="255" aria-required="true" value="{{userName}}" class="signInInput"/>\n                </div>\n            </div>\n            <div class="row">\n                <div class="col-sm-7 input-text signout-input">\n                    <label for="password">Password</label>\n                    <input type="password" id="password" name="password" maxlength="255" aria-required="true" class="signInInput"/>\n                </div>\n            </div>\n            <div class="signin-btn-bottom">\n                <a class="submit btn  btn-blue btn-large btn-txt-unbold" id="signIn" automationid="SignIn" name="signIn" role="button" href="#" title="Sign In">\n                    Sign In<img class="buttonIcon" src="{{akamaiPrefix}}/{{lessOrCss}}/images/icn_lock_button{{at2x}}.png" height="19px" width="15px" alt="securely"/>\n                </a>\n            </div>\n            <div class="right-links row">\n                <div class="col-sm-12">\n                    <p>\n                        By clicking Sign In, you agree to our <a id="showTtoLicenseAgreement" data-link-id="128" href="https://turbotax.intuit.com/corp/ttolicense.jsp" target="_blank">License Agreement</a>.\n                    </p>\n                    <a automationid="accountrecovery" href="{{queryStringParameters}}#recovery">I forgot my user ID or password</a>\n                </div>\n            </div>\n            <div class="right-links row">\n                <div class="col-sm-12">\n                    New to TurboTax? <a href="/createAccount{{queryStringParameters}}">Create an account.</a>\n                </div>\n                <input class="text medium" tabindex="1" type="hidden" name="ioBB" id="ioBB" width="100" />\n\n            </div>\n        </form>\n    </div>\n</div>\n'
}), define("views/screens/SignInScreen", ["base/ScreenView", "views/forms/SignInFormView", "models/SignIn", "text!templates/SignIn.html"], function (e, t, n, r) {
    try {
        var i = {checked: !0, context: "", initialize: function () {
            try {
                e.prototype.initialize.apply(this, arguments), logger.info("SignInScreen:Contingency"), $("#HeaderSignInButton").hide(), this.template = app.templateFactory.getTemplate("ColdState", r), this.model = new n
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignInScreen.contingency.initialize error="' + t + '"'), t
            }
        }, render: function () {
            try {
                return this.context = {}, this.processTemplate(), this
            } catch (e) {
                throw logger && logger.error('JavaScriptException: func=SignInScreen.contingency.render error="' + e + '"'), e
            }
        }, processTemplate: function () {
            try {
                this.$el.html(this.template(this.context));
                var e = new t({el: $("#signInForm").get(0), model: this.model, errorWindowOffset: {x: 440, y: -80}});
                this.children.push(e), app.trigger(mytt.c.events.SIGNIN_RENDER)
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInScreen.contingency.processTemplate error="' + n + '"'), n
            }
        }};
        return e.extend(i)
    } catch (s) {
        throw logger && logger.error('JavaScriptException: func=SignInScreen.contingency.define error="' + s + '"'), s
    }
}), define("models/AccountInfo", ["base/Model"], function (e) {
    var t = Backbone.Model.extend({defaults: {answer: ""}, validation: {question: [
        {required: !0, msg: "You have to pick a security question"}
    ], answer: [
        {required: !0, msg: "You have to give an answer"}
    ], currentPassword: {required: !0}}, parse: function (e) {
        var t = {};
        return _.isNull(e.question) || (t.question = e.question), t
    }}), n = Backbone.Model.extend({defaults: {email: "", emailVerify: ""}, validation: {email: [
        {required: !0, msg: "We need your email address"},
        {pattern: "email", msg: "Must be a valid email - try again"}
    ], emailVerify: [
        {required: !0, msg: "Please confirm your email"},
        {pattern: "email", msg: "Must be a valid email - try again"},
        {equalToNonSensitive: "email", msg: "Email doesn't match - try again"}
    ], currentPassword: {required: !0, rangeLength: [6, 32]}}, initialize: function () {
        this.set({emailVerify: this.get("email")})
    }, parse: function (e) {
        var t = {};
        return _.isNull(e.email) || (t.email = e.email), t
    }}), r = Backbone.Model.extend({defaults: {firstName: "", lastName: "", middleName: ""}, validation: {firstName: [
        {required: !0, msg: "We need your first name"}
    ], lastName: [
        {required: !0, msg: "We need your last name, too"}
    ]}, parse: function (e) {
        var t = {};
        return t.middleName = "", _.isNull(e.firstName) || (_.isNull(e.middleName) ? t.firstName = e.firstName : t.firstName = e.firstName + " " + e.middleName), t.lastName = _.isNull(e.lastName) ? "" : e.lastName, t
    }}), i = Backbone.Model.extend({defaults: {userName: "", userNameVerify: "", currentPassword: ""}, validation: {userName: [
        {required: !0, msg: "You have to pick a user ID"},
        {rangeLength: [4, 50]}
    ], userNameVerify: [
        {required: !0, msg: "Please confirm your user ID"},
        {equalToNonSensitive: "userName", msg: "User ID doesn't match - try again"}
    ], currentPassword: {required: !0, rangeLength: [6, 32]}}, initialize: function () {
        this.set({userNameVerify: this.get("userName")}), this.on("change:userName", function (e, t) {
            e.isValid("userName")
        })
    }, parse: function (e) {
        var t = {};
        return _.isNull(e.userName) || (t.userName = e.userName), t
    }}), s = Backbone.Model.extend({defaults: {newPassword: "", newPasswordVerify: "", currentPassword: ""}, validation: {newPassword: [
        {noSpaces: !0, msg: "Password can't have any spaces"},
        {required: !0, msg: "You have to pick a password"},
        {rangeLength: [6, 32]},
        {passwordStrength: [6, 32], msg: "Password can't have spaces or be a common or simple combination"}
    ], newPasswordVerify: [
        {required: !0, msg: "Please confirm your password"},
        {equalTo: "newPassword", msg: "Password doesn't match - try again"}
    ], currentPassword: {required: !0}}}), o = Backbone.Model.extend({defaults: {areaCode: "", number: "", mobileNumber: "", mobileNumberVerify: "", allowSMS: !1}, validation: {areaCode: {required: !1, pattern: "digits", length: 3}, number: {required: !1, pattern: "digits", length: 7}, mobileNumber: [
        {skipRemainingIfEmpty: !0},
        {pattern: "digits", msg: "Must be a valid mobile number - try again"},
        {length: 10, msg: "Must be a valid mobile number - try again"}
    ], mobileNumberVerify: [
        {skipRemainingIfOtherEmpty: "mobileNumber"},
        {min: 1, msg: "Please confirm your mobile number"},
        {equalTo: "mobileNumber", msg: "Mobile number doesn't match - try again"}
    ]}, initialize: function () {
        this.set({mobileNumberVerify: this.get("mobileNumber")}), this.on("change:mobileNumber", function (e, t) {
            e.isValid("mobileNumber") && e.set({areaCode: t.substring(0, 3), number: t.substring(3)})
        })
    }, parse: function (e) {
        var t = {};
        return _.isNull(e.areaCode) == 0 && _.isNull(e.number) == 0 && (t.areaCode = e.areaCode, t.number = e.number, t.mobileNumber = e.areaCode + e.number, _.isNull(e.allowSMS) == 0 && (t.allowSMS = e.allowSMS)), t
    }}), u = Backbone.Model.extend({defaults: {userName: "", userNameVerify: "", newPassword: "", newPasswordVerify: "", question: "", answer: "", currentPassword: ""}, validation: {userName: {required: !0, rangeLength: [4, 50]}, userNameVerify: [
        {required: !0},
        {equalTo: "userName", msg: "User ID does not match"}
    ], newPassword: {required: !0, rangeLength: [6, 32]}, newPasswordVerify: [
        {required: !0},
        {equalTo: "newPassword", msg: "Password does not match"}
    ], question: {required: !0}, answer: {required: !0}, currentPassword: {required: !0}}, parse: function (e) {
        var t = {};
        return _.isNull(e.userName) == 0 && (t.userName = e.userName), _.isNull(e.question) == 0 && (t.question = e.question), t
    }}), a = Backbone.Model.extend({defaults: {firstName: "", lastName: "", email: "", emailVerify: "", areaCode: "", number: "", mobileNumber: "", allowSMS: !1, currentPassword: ""}, validation: {firstName: {required: !0}, lastName: {required: !0}, email: {required: !0, pattern: "email"}, emailVerify: [
        {required: !0},
        {equalTo: "email", msg: "Email does not match"}
    ], areaCode: {required: !1, pattern: "digits", length: 3}, number: {required: !1, pattern: "digits", length: 7}, mobileNumber: {required: !1, pattern: "digits", length: 10}, currentPassword: {required: !0, rangeLength: [6, 32]}}, initialize: function () {
        this.on("change:mobileNumber", function (e, t) {
            e.isValid("mobileNumber") && e.set({areaCode: t.substring(0, 3), number: t.substring(3)})
        })
    }, parse: function (e) {
        var t = {};
        return t.middleName = "", _.isNull(e.firstName) || (_.isNull(e.middleName) ? t.firstName = e.firstName : t.firstName = e.firstName + " " + e.middleName), t.lastName = _.isNull(e.lastName) ? "" : e.lastName, _.isNull(e.email) == 0 && (t.email = e.email), _.isNull(e.areaCode) == 0 && _.isNull(e.number) == 0 && (t.areaCode = e.areaCode, t.number = e.number, t.mobileNumber = e.areaCode + e.number, _.isNull(e.allowSMS) == 0 && (t.allowSMS = e.allowSMS)), t
    }}), f = e.extend({url: "svc/getAccount", templateContextExclusions: function () {
        return["getFederatedAccount"]
    }, parse: function (e) {
        return{id: 1, contactInfo: new a(e, {parse: !0}), securityInfo: new u(e, {parse: !0}), userid: new i(e, {parse: !0}), password: new s(e, {parse: !0}), mobile: new o(e, {parse: !0}), editName: new r(e, {parse: !0}), editSecurityQuestion: new t(e, {parse: !0}), email: new n(e, {parse: !0}), federatedAccount: e.federatedAccount}
    }, getFederatedAccount: function () {
        return this.get("federatedAccount")
    }, isAccountFederated: function () {
        return this.getFederatedAccount() != mytt.c.federation.NOT_FEDERATED && this.getFederatedAccount() != mytt.c.federation.UNKNOWN
    }, getUserName: function () {
        return this.get("userid").get("userName")
    }});
    return f
}), define("models/SignInUnrecognized", ["utility/ModelViewConverters"], function (e) {
    try {
        var t = Backbone.Model.extend({defaults: {question: "", whichQuestion: "security-question", answer: "", ssn: "", hasQuestion: "", hasSSN: ""}, validation: {answer: [
            {fn: "validateAnswer", msg: ""}
        ], ssn: [
            {fn: "validateSSN", msg: ""}
        ]}, validateAnswer: function (e, t, n) {
            try {
                logger.log(this.attributes.whichQuestion), logger.log(e), this.attributes.ssn = $("#ssn").val();
                if (this.attributes.whichQuestion == "ssn")return;
                if (e)return;
                return $("#question-toggle").css("display") == "none" ? "You must enter your info in one of the two fields above to sign in." : (logger.log("answer should be filled in please"), "You must enter your answer in the field above to sign in.")
            } catch (r) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognized.validateAnswer error="' + r + '"'), r
            }
        }, validateSSN: function (e) {
            try {
                e = $("#ssn").val(), this.attributes.ssn = $("#ssn").val();
                if (this.attributes.whichQuestion == "security-question")return;
                e = e.replace(/-/g, "");
                var t = /^[0-9]{9}$/, n = e.match(t);
                if (n)return;
                return e ? "Please enter your 9-digit Social Security number in this format: xxx-xx-xxxx." : $("#question-toggle").css("display") == "none" ? "You must enter your info in one of the two fields above to sign in." : "You must enter your answer in the field above to sign in."
            } catch (r) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognized.validateSSN error="' + r + '"'), r
            }
        }});
        return t
    } catch (n) {
        throw logger && logger.error('JavaScriptException: func=SignInUnrecognized.define error="' + n + '"'), n
    }
}), define("views/forms/SignInUnrecognizedFormView", ["cfp", "base/FormView", "views/forms/SignInFormView", "utility/ModelViewConverters"], function (e, t, n, r) {
    try {
        var i = t.extend({events: {"click #question-toggle": "ssnShow", "keypress #ssn": "ssnPress", "keyup #ssn": "ssnActive", "keyup #answer": "answerActive"}, initModelBinding: function () {
            try {
                var e = Backbone.ModelBinder.createDefaultBindings(this.el, "name");
                this.modelBinder.bind(this.model, this.el, e), jQuery("#ssn").bind("paste", function (e) {
                    e.preventDefault()
                }), jQuery("#ssn").bind("copy", function (e) {
                    e.preventDefault()
                }), $("form").find("input").filter(":visible:first").focus()
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.initModelBinding error="' + t + '"'), t
            }
        }, ssnPress: function (e) {
            try {
                var t = e.which ? e.which : e.keyCode;
                t > 31 && (t < 48 || t > 57) && t != 45 && (e.returnValue = !1, e.preventDefault && e.preventDefault())
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.ssnPress error="' + n + '"'), n
            }
        }, ssnActive: function (e) {
            try {
                var t = 9;
                e.keyCode != t ? (logger.log("INTENTION: SSN"), $("#answer").val(""), this.model.attributes.whichQuestion = "ssn", this.model.attributes.answer = "") : logger.log("that was a tab, not going to do the switch")
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.ssnActive error="' + n + '"'), n
            }
        }, answerActive: function (e) {
            try {
                var t = 9;
                e.keyCode != t ? (logger.log("INTENTION: ANSWER"), $("#ssn").val(""), this.model.attributes.whichQuestion = "security-question", this.model.attributes.ssn = "") : logger.log("that was a tab, not going to do the switch")
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.answerActive error="' + n + '"'), n
            }
        }, ssnShow: function (e) {
            try {
                e.preventDefault(), $("#ssn-section").toggle(), $("#ssn").focus(), $("#question-toggle").hide(), $(".tipsy").hide()
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.ssnShow error="' + t + '"'), t
            }
        }, doSubmit: function () {
            try {
                this.notification && this.notification.close();
                var e = new Backbone.Model;
                if (!_.isUndefined(this.model.get("ssn"))) {
                    var t = this.model.get("ssn").replace(/\-/g, "");
                    e.set("ssn", t)
                }
                e.set("question", this.model.get("question")), e.set("answer", this.model.get("answer")), app.security.updateSession({success: this.success, error: this.error, context: this}, e)
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.doSubmit error="' + n + '"'), n
            }
        }, success: function (e) {
            try {
                var t = _.isNull(this.model.get("question")) || _.isUndefined(this.model.get("question"));
                this.model.clear({silent: !0}), t ? app.toScreen("AuthEditSecurityScreen") : app.trigger(mytt.c.events.SIGNIN_SUCCESS)
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.success error="' + n + '"'), n
            }
        }, error: function (e) {
            try {
                t.prototype.error.apply(this, arguments), this.invalid(this, "CFP Error", e.errorStatus.description, null)
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.error error="' + n + '"'), n
            }
        }, invalid: function (e, t, n, r) {
            try {
                _.isString(t) && (logger.log("Error Message is: " + n), logger.log("Error Notification is: " + r), $(".errorWrap").show(), $("#errorReport").html(n), app.trigger("InvalidInput:" + t, this.model), this.trigger("InvalidInput:" + t))
            } catch (i) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.invalid error="' + i + '"'), i
            }
        }});
        return i
    } catch (s) {
        throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedFormView.define error="' + s + '"'), s
    }
}), define("text!templates/SignInUnrecognizedDevice.html", [], function () {
    return'<div class="bigWhiteBackground"></div>\n<div class="login-signin-unrecognized container-fluid alignWithFooter">\n    {{#if hasQuestion}}\n        {{#if hasSSN}}\n            {{! both question and ssn, aka happy path }}\n            <div class="row-fluid">\n                <div class="span12">\n                    <h1>Just making sure you\'re really you</h1>\n                    <p class="p-title">\n                        We’ve added security questions to keep your account safe and secure.\n                    </p>\n                </div>\n                <div class="span12" style="margin-left:0">\n                    <form action="" method="post" id="signInUnrecognizedForm">\n                        <div class="row-fluid" id="security-question-section">\n                            <div class="input-text">\n                                <label for="answer">{{question}}</label>\n                                <input type="text" id="answer" name="answer" automationid="deviceAuthAnswer" autofocus="autofocus" class="signInInput"/>\n                            </div>\n                        </div>\n\n                        <a href="#" id="question-toggle" automationid="showSSN">Can\'t remember your answer?</a>\n\n                        <div class="row-fluid" id="ssn-section" style="display:none">\n\n                            <p class="p-black">\n                                If you can\'t remember the answer to your security question, you can enter your Social Security number instead.\n                            </p>\n\n                            <div class="input-text" id="dont-remember">\n                                <label for="ssn">Social Security Number</label>\n                                <input type="password" pattern="[0-9]*" id="ssn" name="ssn" aria-required="true" automationid="deviceAuthSSN" original-title="" class="signInInput">\n                            </div>\n\n                            <p style="margin-top:10px;"><a class="help" href="https://support.turbotax.intuit.com/redirect/security-question-help" target="_blank">Still having trouble signing in?</a></p>\n\n                        </div>\n\n                        <div class="errorWrap" style="display:none">\n                            <p id="errorReport"></p>\n                        </div>\n\n                        <div class="row-fluid signin-btn-bottom">\n                            <a class="submit btn btn-txt-unbold btn-large btn-blue" id="signIn" automationid="SignIn" name="signIn" role="button" href="#" title="Sign In" automationid="deviceAuthContinue">\n                                Continue<img class="buttonIcon" src="/less/images/icn_lock_button{{at2x}}.png" height="19px" width="15px"/>\n                            </a>\n                        </div>\n\n                    </form>\n                </div>\n            </div>\n        {{else}}\n            {{! question only }}\n            <div class="row-fluid">\n                <div class="span12">\n                    <h1>Just making sure you\'re really you</h1>\n                    <p class="p-title">\n                        We’ve added security questions to keep your account safe and secure.\n                    </p>\n                </div>\n                <div class="span12" style="margin-left:0">\n                    <form action="" method="post" id="signInUnrecognizedForm">\n                        <div class="row-fluid" id="security-question-section">\n                            <div class="input-text">\n                                <label for="answer">{{question}}</label>\n                                <input type="text" id="answer" name="answer" automationid="deviceAuthAnswer" autofocus="autofocus"/>\n                            </div>\n                        </div>\n\n                        <p style="margin-top:10px;">Can\'t remember your answer?<a href="https://{{ttcomDomain}}/support/contact/" automationid="securityQuestionHelp" target="_blank"> Don\'t worry, we can help.</a></p>\n\n                        <div class="errorWrap" style="display:none">\n                            <p id="errorReport"></p>\n                        </div>\n\n                        <div class="row-fluid signin-btn-bottom">\n                            <a class="submit btn btn-txt-unbold btn-large btn-blue" id="signIn" automationid="SignIn" name="signIn" role="button" href="#" title="Sign In" automationid="deviceAuthContinue">\n                                Continue<img class="buttonIcon" src="/less/images/icn_lock_button{{at2x}}.png" height="19px" width="15px"/>\n                            </a>\n                        </div>\n\n                    </form>\n                </div>\n            </div>\n        {{/if}}\n    {{else}}\n        {{#if hasSSN}}\n            {{! just ssn on file }}\n            <div class="row-fluid">\n                <div class="span12">\n                    <h1>Help keep your account safe</h1>\n                    <p class="p-title">\n                        We\'re adding new safeguards to keep your account even more secure. Simply enter your Social Security number and we\'ll sign you in.\n                    </p>\n                </div>\n                <div class="span12" style="margin-left:0">\n                    <form action="" method="post" id="signInUnrecognizedForm">\n                        <div class="row-fluid" id="ssn-section">\n                            <div class="input-text" id="dont-remember">\n                                <label for="ssn">Social Security Number</label>\n                                <input type="password" pattern="[0-9]*" id="ssn" name="ssn" aria-required="true" automationid="deviceAuthSSN" original-title="" autofocus="autofocus">\n                            </div>\n                        </div>\n\n                        <p style="margin-top:10px;"><a href="https://support.turbotax.intuit.com/redirect/ssn-help" automationid="securityQuestionHelp" target="_blank">Having trouble with your Social Security number?</a></p>\n\n                        <div class="errorWrap" style="display:none">\n                            <p id="errorReport"></p>\n                        </div>\n\n                        <div class="row-fluid signin-btn-bottom">\n                            <a class="submit btn btn-txt-unbold btn-large btn-blue" id="signIn" automationid="SignIn" name="signIn" role="button" href="#" title="Sign In" automationid="deviceAuthContinue">\n                                Continue<img class="buttonIcon" src="/less/images/icn_lock_button{{at2x}}.png" height="19px" width="15px"/>\n                            </a>\n                        </div>\n\n                    </form>\n                </div>\n            </div>\n\n        {{else}}\n            {{! nothing on file, sad path }}\n            <div id="noSSN" class="noSSN row-fluid">\n                <div class="span12">\n                    <h1>We need a little more information from you</h1>\n                    <p style="margin:0;">\n                        Before you can log in, we need to verify your identity.\n                    </p>\n                    <p>\n                        <a href="https://shop.turbotax.intuit.com/support/iq/My-Account/Message---We-need-a-little-more-information-from-you-/SLN76256.html" target="_blank">Find instructions here.</a>\n                    </p>\n                </div>\n            </div>\n        {{/if}}\n    {{/if}}\n</div>\n'
}), define("views/screens/SignInUnrecognizedDeviceScreen", ["base/ScreenView", "models/AccountInfo", "models/UserState", "models/SignInUnrecognized", "views/forms/SignInUnrecognizedFormView", "text!templates/SignInUnrecognizedDevice.html"], function (e, t, n, r, i, s) {
    try {
        var o = e.extend({initialize: function () {
            try {
                e.prototype.initialize.apply(this, arguments)
            } catch (t) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedDeviceScreen.initialize error="' + t + '"'), t
            }
        }, render: function () {
            try {
                this.template = app.templateFactory.getTemplate("SignInUnrecognizedDevice", s);
                var e = app.model.get("securityQuestion");
                logger.log("secQuestion:" + e);
                var t = app.model.get("altAuthOnFile");
                logger.log("hasSSN:" + t);
                var n = !1;
                _.isNull(e) || _.isUndefined(e) || _.isEmpty(e) || !e ? (e = !1, n = !1) : n = !0, logger.log("hasSecurityQuestion:" + n), n ? t ? (this.model = {hasQuestion: !0, hasSSN: !0, question: e}, logger.log("happy path"), logger.info("Both SSN and Question are options"), app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, "SignInUnrecognizedDevice", {userState: mytt.c.unrecognizedDevice.EITHER})) : (logger.info("Security question is only option"), this.model = {hasQuestion: !0, hasSSN: !1, question: e}, app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, "SignInUnrecognizedDevice", {userState: mytt.c.unrecognizedDevice.QUESTION})) : t ? (logger.info("SSN is only option"), this.model = {hasQuestion: !1, hasSSN: !0}, app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, "SignInUnrecognizedDevice", {userState: mytt.c.unrecognizedDevice.SSN})) : (logger.warn("No alt auth info"), this.model = {hasQuestion: !1, hasSSN: !1}, app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, "SignInUnrecognizedDevice", {userState: mytt.c.unrecognizedDevice.NONE})), this.signInUnrecognizedModel = new r, this.signInUnrecognizedModel.set("question", this.model.question), this.signInUnrecognizedModel.set("hasQuestion", this.model.hasQuestion), this.signInUnrecognizedModel.set("hasSSN", this.model.hasSSN), this.$el.html(this.template(this.model));
                var o = new i({el: $("#signInUnrecognizedForm").get(0), model: this.signInUnrecognizedModel, errorWindowOffset: {x: 440, y: -80}});
                return this.children.push(o), this
            } catch (u) {
                throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedDeviceScreen.render error="' + u + '"'), u
            }
        }});
        return o
    } catch (u) {
        throw logger && logger.error('JavaScriptException: func=SignInUnrecognizedDeviceScreen.define error="' + u + '"'), u
    }
}),define("text!templates/dashboard/ReturnFiled.html", [], function () {
    return'<div class="row dashboard-row refund-row col-xs-12 col-sm-10">\n    <div class="col-xs-4 small-block refund-amt-row refund-sm {{refundAmountNull}}">\n        {{#if isFederal}}\n            {{#if isFiledPrint}}\n                <span class="hero-refundAmount{{#if ../printedRefund}} positiveReturn{{/if}}">\n                {{#if ../printAmount}}{{formatCurrency ../printAmount "true" "notNegative"}}{{else}}$0{{/if}}</span>\n                <span class="hero-refundCaption">{{taxAuthority}} {{refundAmtDescriptor ../printAmount}}</span>\n            {{else}}\n                <span class="hero-refundAmount{{#if refundInfo.hasRefund}} positiveReturn{{/if}}">\n                {{#if refundInfo.refundOrPaymentAmount}}{{formatCurrency refundInfo.refundOrPaymentAmount "true" "notNegative"}}{{else}}$0{{/if}}</span>\n                <span class="hero-refundCaption">{{taxAuthority}} {{refundAmtDescriptor refundInfo.refundOrPaymentAmount}}</span>\n            {{/if}}\n        {{else}}\n            {{#if isFiledPrint}}\n                <img class="printer-img" src="{{akamaiPrefix}}/{{lessOrCss}}/images/printer.png" alt="printer"/>\n\n            {{/if}}\n            <span class="hero-refundAmount{{#if refundInfo.hasRefund}} positiveReturn{{/if}}">{{#if refundInfo.refundOrPaymentAmount}}{{formatCurrency refundInfo.refundOrPaymentAmount "true" "notNegative"}}{{else}}{{#unless isFiledPrint}}$0{{/unless}}{{/if}}</span>\n            <span class="hero-refundCaption">{{#if isFiledPrint}} {{formatAuthorityShort taxAuthority}} Return Printed{{else}}{{taxAuthority}} {{refundAmtDescriptor refundInfo.refundOrPaymentAmount}}{{/if}}</span>\n        {{/if}}\n    </div>\n    <div class="col-xs-8 small-block status-row">\n        <div class="row">\n            <div class="col-xs-12 col-sm-12 hero-refundRow">\n                {{#if isFiledPrint}}\n                    <span class="hero-refundStatus">{{taxAuthority}} return status: {{returnStatusCustomerMessage.efileShortStatus}}</span>\n                {{else}}\n                    <span class="hero-refundStatus">{{taxAuthority}} e-file status: {{returnStatusCustomerMessage.efileShortStatus}}</span>\n                {{/if}}\n\n                <p class="timeline-subtitle timeline-refund-details {{#unless isFederal}}timeline-refund-states{{/unless}}">\n                    {{returnStatusCustomerMessage.newMessage}}\n                    {{#if isFiledPrint}}\n                        {{#if isFederal}}\n                            <p><a href="https://support.turbotax.intuit.com/redirect/tax-refund-timing" target="_blank" >Learn more about federal refund status</a></p>\n                        {{else}}\n                            <p><a href="https://support.turbotax.intuit.com/redirect/track-state-refund" target="_blank">Learn more about state refund status</a></p>\n                        {{/if}}\n                    {{/if}}\n                </p>\n\n                {{#if isFederal}}\n                    {{#if hasPaymentAmount}}\n                        <p><a href="javascript:void(0);" class="refundDetails" automationid="refundDetails" data-has-refund="{{#if refundInfo.hasRefund}}true{{else}}false{{/if}}" data-payment-type="{{refundInfo.paymentMethodType}}" data-popup-content="PopupBankInfo" data-popup-frame="PopupFrameMsg" data-popup-cardflip="true" data-popup-x="252" data-popup-y="0">Get my refund details</a></p>\n                    {{/if}}\n                {{/if}}\n                {{#if isEfiledPending}}\n                    <div class="next-steps">\n                        <div class="next-steps-img-container"><img class="next-steps-img" src="{{akamaiPrefix}}/{{lessOrCss}}/images/action_arrow.png" alt="Next Steps" width="35px" height="35px" /></div>\n                        <div class="next-steps-text hero-refundDetails">Next step: Keep watching your email. We\'ll send you another message when your returns are accepted or rejected.</div>\n                    </div>\n                {{else}}\n                    {{#unless ../notRefundEligible}}\n                        {{aLink returnStatusCustomerMessage.button}}\n                    {{/unless}}\n                {{/if}}\n            </div>\n        </div>\n    </div>\n</div>\n'
}),define("text!templates/dashboard/ReturnsIncomplete.html", [], function () {
    return'<div class="row dashboard-row refund-row col-xs-12 col-sm-10">\n    <div class="col-xs-4 small-block refund-amt-row refund-sm {{refundAmountNull}}">\n        <span class="hero-refundAmount incomplete">$<span class="hero-refundIncomplete">-------</span></span>\n        <span class="hero-refundCaption">{{taxAuthority}} {{#if refundInfo.hasBalanceDue}}Tax Due{{else}}Return{{/if}}</span>\n    </div>\n    <div class="col-xs-8 small-block status-row">\n        <div class="row">\n            <div class="col-xs-12 col-sm-12 hero-refundRow">\n                <span class="hero-refundStatus">{{taxAuthority}} e-file status: <a href="javascript:void(0);" class="dashboard-link sendToProductOffering">Incomplete</a></span>\n                <p class="timeline-subtitle timeline-refund-details {{#unless isFederal}}timeline-refund-states{{/unless}}">\n                    Finish telling us what has changed from last year, and you\'re ready to file!\n                </p>\n                <a id="btn-finish" href="javascript:void(0);" class="sendToProductOffering btn btn-medium btn-gray btn-block">Finish this return</a>\n            </div>\n        </div>\n    </div>\n</div>'
}),define("text!templates/dashboard/ReturnsIncompleteOrange.html", [], function () {
    return'<div class="row dashboard-row refund-row col-xs-12 col-sm-10">\n    <div class="col-xs-4 small-block refund-amt-row refund-sm {{refundAmountNull}}">\n        <span class="hero-refundAmount incomplete">$<span class="hero-refundIncomplete">-------</span></span>\n        <span class="hero-refundCaption">{{taxAuthority}} {{#if refundInfo.hasBalanceDue}}Tax Due{{else}}Return{{/if}}</span>\n    </div>\n    <div class="col-xs-8 small-block status-row">\n        <div class="row">\n            <div class="col-xs-12 col-sm-12 hero-refundRow">\n                <span class="hero-refundStatus">{{taxAuthority}} e-file status: <a href="javascript:void(0);" class="dashboard-link sendToProductOffering">Incomplete</a></span>\n                <p class="timeline-subtitle timeline-refund-details {{#unless isFederal}}timeline-refund-states{{/unless}}">\n                    Finish telling us what has changed from last year, and you\'re ready to file!\n                </p>\n                <br/>\n                <a id="btn-finish" href="javascript:void(0);" class="sendToProductOffering btn btn-medium btn-orange btn-block">Finish this return</a>\n\n            </div>\n        </div>\n    </div>\n</div>'
}),define("views/widgets/dashboard/ReturnWidget", ["base/WidgetView", "text!templates/dashboard/ReturnFiled.html", "text!templates/dashboard/ReturnsIncomplete.html", "text!templates/dashboard/ReturnsIncompleteOrange.html"], function (e, t, n, r) {
    var i = e.extend({name: "ReturnWidget", className: "return", initialize: function () {
        e.prototype.initialize.apply(this, arguments)
    }, render: function () {
        this.model.isStarted() ? this.model.incompleteOrangeBtn ? this.template = app.templateFactory.getTemplate("ReturnIncompleteOrange", r) : this.template = app.templateFactory.getTemplate("ReturnIncomplete", n) : this.template = app.templateFactory.getTemplate("ReturnFiled", t);
        var e;
        if (this.model.getRefundInfo().get("refundOrPaymentAmount") != null || this.model.get("returnStatus") == "FILED_PRINT" || this.model.get("returnStatus") == "STARTED")e = !0;
        return e || this.model.set("refundAmountNull", "hidden"), this.append(this.template(this.model.getContext())), this
    }});
    return i
}),define("text!templates/dashboard/TTOPostfile.html", [], function () {
    return'<div class="row dashboard-hero" id="dashboard-hero-card">\n\n    <div id="current-year-returns-list"></div>\n\n</div>\n'
}),define("text!templates/dashboard/TTOPostfileHealthcareRow.html", [], function () {
    return'\n    <div class="row refund-row bottomSpace">\n        <div class="col-xs-3 col-md-1 small-block refund-amt-row rightSpace">\n            <div class="hero-refundAmount icon-placement"><img id="healthcare-logo" src="/less/images/health_care_icon.png" alt="" /></div>\n            <div class="small-show nextYearSmallTitle">\n                {{#if isUserInsured}}\n                <span class="hero-refundStatus">You have health insurance: <a href="https://turbotax.intuit.com/health-care" target="_blank" class="dashboard-link-no-hover">Check new options</a></span>\n                {{/if}}\n\n                {{#if isUserNotInsured}}\n                <span class="hero-refundStatus">Open enrollment ended on March 31: <a href="https://turbotax.intuit.com/health-care" target="_blank" class="dashboard-link-no-hover">Action needed</a></span>\n\n                {{/if}}\n\n                {{#if isInsuranceStatusUnknown}}\n                <span class="hero-refundStatus">Your 2014 health care coverage: <a href="https://turbotax.intuit.com/health-care" target="_blank" class="dashboard-link-no-hover">Ready for review</a></span>\n\n                {{/if}}\n            </div>\n        </div>\n        <div class="col-xs-9 col-sm-9 col-md-10 small-block leftSpaceIcon">\n            <div class="row">\n                <div class="col-xs-12 col-sm-12 col-md-8">\n                    {{#if isUserInsured}}\n                    <span class="hero-refundStatus small-hide">You have health insurance: <a href="https://turbotax.intuit.com/health-care" target="_blank" class="dashboard-link-no-hover">Check new options</a></span>\n                    <p class="hero-refundDetails timeline-subtitle">\n                        We\'ll walk through new options the health care law brings at <a href="https://turbotax.intuit.com/health-care" target="_blank" class="dashboard-link-no-hover">TurboTax Health.</a></p>\n                    {{/if}}\n\n                    {{#if isUserNotInsured}}\n                    <span class="hero-refundStatus small-hide">Open enrollment ended on March 31: <a href="https://turbotax.intuit.com/health-care" target="_blank" class="dashboard-link-no-hover">Action needed</a></span>\n                    <p class="hero-refundDetails timeline-subtitle">\n                        We\'ll go over your health care options to minimize the impact on next year\'s refund.\n                    </p>\n                    {{/if}}\n\n                    {{#if isInsuranceStatusUnknown}}\n                    <span class="hero-refundStatus small-hide">Your 2014 health care coverage: <a href="https://turbotax.intuit.com/health-care" target="_blank" class="dashboard-link-no-hover">Ready for review</a></span>\n                    <p class="hero-refundDetails timeline-subtitle">\n                        We\'ll check to make sure you\'re covered under the new health care law, the Affordable Care Act.\n                    </p>\n                    {{/if}}\n                </div>\n\n                {{#if isUserInsured}}\n                <div class="col-xs-12 col-sm-12 col-md-4">\n                    <a id="btn-finish" href="https://turbotax.intuit.com/health-care" class="btn btn-medium btn-blue btn-block" target="_blank">Find out more</a>\n                </div>\n                {{/if}}\n                {{#if isUserNotInsured}}\n                <div class="col-xs-12 col-sm-12 col-md-4">\n                    <a id="btn-finish" href="https://turbotax.intuit.com/health-care" class="btn btn-medium btn-blue btn-block" target="_blank">Find out my options</a>\n                </div>\n                {{/if}}\n\n                {{#if isInsuranceStatusUnknown}}\n                <div class="col-xs-12 col-sm-12 col-md-4">\n                    <a id="btn-finish" href="https://turbotax.intuit.com/health-care" class="btn btn-medium btn-blue btn-block" target="_blank">Check your coverage</a>\n                </div>\n                {{/if}}\n\n            </div>\n        </div>\n    </div>'
}),define("text!templates/dashboard/TTOPostfileMoneyfinderRow.html", [], function () {
    return'<div>\n    <div class="row refund-row bottomRowSpace">\n        <div class="col-xs-3 col-md-1 small-block refund-amt-row rightSpace">\n            <div class="hero-refundAmount icon-placement"><img id="moneyfinder-logo" src="/less/images/money_finder_icon.png" alt="" /></div>\n            <div class="small-show nextYearSmallTitle"><span class="hero-refundStatus">You could be missing out on money that\'s yours</span></div>\n        </div>\n        <div class="col-xs-9 col-sm-9 col-md-10 small-block leftSpaceIcon">\n            <div class="row">\n                <div class="col-xs-12 col-sm-12 col-md-8">\n                    <span class="hero-refundStatus small-hide">You could be missing out on money that\'s yours</span>\n                    <p class="hero-refundDetails timeline-subtitle">\n                        One in 10 people has unclaimed money waiting for them. Check if you do.\n                    </p>\n                </div>\n                <div class="col-xs-12 col-sm-12 col-md-4">\n                    <a id="btn-finish" href="https://ctg.discovery.intuit.com/moneyfinder/mytt.html" class="btn btn-medium btn-blue btn-block" target="_blank">Get Started</a>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'
}),define("text!templates/popups/PopupBankInfoDetails.html", [], function () {
    return'<div class="bankInfoContainer">\n\n    {{#unless netSpendSelected}}\n    {{#if bankAccounts}}\n        {{#foreach bankAccounts}}\n        <div class="row">\n            <div class="col-xs-8">\n                <h3>{{bankName}}</h3>\n                <p>Routing Number: {{showMaskedNumber routingNumber}}</p>\n                <p>Account Number: {{showMaskedNumber accountNumber}}</p>\n            </div>\n            {{#if amount}}\n            <div class="col-xs-4 popupAmount popupRefundAmount amount {{#if ../../hasRefund}} positiveReturn{{/if}}">{{formatCurrency amount "true" "notNegative"}}</div>\n            {{/if}}\n        </div>\n        <br>\n        {{/foreach}}\n    <br>\n    {{/if}}\n    {{/unless}}\n    {{#if directDebit}}\n    <div class="row">\n        <div class="col-xs-12">\n            <h3>Settlement Date </h3>\n            <p>{{formatDate settlementDate \'false\' \'false\' \'MMMM dd, YYYY\'}}</p>\n        </div>\n    </div>\n    {{/if}}\n    {{#if amazonSelected}}\n    <div class="row">\n        <div class="col-xs-8">\n            <h3>Amazon.com Gift Card</h3>\n            <p>{{amazonBonusPercent}}% bonus from TurboTax</p>\n            <p>You\'ll get your gift code(s) at {{amazonEmail}}</p>\n        </div>\n        <div class="col-xs-4 popupAmount popupRefundAmount amount positiveReturn">{{showAmazonReturn amazonAmount amazonBonusPercent}}</div>\n    </div>\n    <br>\n\n    {{/if}}\n    {{#if netSpendSelected}}\n    <div class="row">\n        <div class="col-xs-8">\n            <h3 class="netSpendHeader">NetSpend Premier&#174 Visa&#174 Prepaid Card</h3>\n        </div>\n        <div class="col-xs-4 popupAmount popupRefundAmount amount positiveReturn">{{formatCurrency netSpendAmount}}</div>\n    </div>\n    {{/if}}\n    {{#if refundCheck}}\n    <div class="row">\n        <div class="col-xs-8">\n            <h3>Paper check by mail to:</h3>\n            <p class="address">{{address}}</p>\n            <p class="address">{{city}}, {{state}} {{zip}}</p>\n        </div>\n        {{#if checkAmount}}\n        <div class="col-xs-4 popupAmount popupRefundAmount amount {{#if ../../hasRefund}} positiveReturn{{/if}}">{{formatCurrency checkAmount "true" "notNegative"}}</div>\n        {{/if}}\n    </div>\n    <br>\n    {{/if}}\n    {{#if bondAmountSelf}}\n    <div class="row">\n        <div class="col-xs-8">\n            <h3>Your Series I savings bond</h3>\n        </div>\n        <div class="col-xs-4 popupAmount popupRefundAmount amount positiveReturn">{{formatCurrency bondAmountSelf "true" "notNegative"}}</div>\n    </div>\n    {{/if}}\n    <br>\n    {{#foreach bonds}}\n    <div class="row">\n        <div class="col-xs-8">\n            <h3>Series I savings bond</h3>\n            <p>Bond owner: {{ownerName}}</p>\n            {{#if beneficiary}}\n            <p>Beneficiary: {{coName}}</p>\n            {{else}}\n            <p>Co-owner: {{coName}}</p>\n            {{/if}}\n        </div>\n        {{#if amount}}\n        <div class="col-xs-4 popupAmount popupRefundAmount amount positiveReturn">{{formatCurrency amount "true" "notNegative"}}</div>\n        {{/if}}\n    </div>\n    <br>\n    {{/foreach}}\n</div>\n<div style="padding-top: 10px; border-top: 1px solid #eee">\n    {{#if bankAccounts}}\n        <div><a href="https://support.turbotax.intuit.com/redirect/dd-change" target="_blank">Need to change your bank account info?</a></div>\n    {{/if}}\n    {{#if isRT}}\n        <div><a href="https://support.turbotax.intuit.com/redirect/refund-decrease" target="_blank">Why did my refund amount change?</a></div>\n    {{/if}}\n    {{#if amazonSelected}}\n        <div> <a href="https://support.turbotax.intuit.com/redirect/amazon-questions" target="_blank">Haven\'t received your Amazon.com Gift Card code yet?</a></div>\n    {{/if}}\n</div>'
}),define("text!templates/popups/PopupBankInfoError.html", [], function () {
    return'<div class="col-xs-12 timeline-row card-shadow">\n    <div id="timelineErrorMsg">\n        <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/timeline-error{{at2x}}.png" alt="" class="timelineErrorIcon"><p>Oops, we\'re having trouble retrieving your refund details. Please try again.</p>\n    </div>\n</div>'
}),define("text!templates/SecondaryActions.html", [], function () {
    return'<div class="secondary-actions-wrapper col-xs-12">\n    <div class="actionMenuWrapperNew actionMenuInHero">\n        <div class="secondary-action-chevron">&nbsp;</div>\n        <div class="col-xs-12 secondaryActionContainer">\n            <div id="topActionMenu" class="offseasonSecondiLinksWrapNew collapsedActions">\n                <span id="actionsText">Some things you can do:</span>\n\n                <div class="collapsedActionsWrapperNew">\n                    <a class="dashboard-link sendToProductOffering TTO_START offseasonSecondiLinkNew" data-actionname="addstate" href="javascript:void(0);"><span class="offseasonSecondiLinkText">Add a state</span></a>\n                    <a automationid="amendLinkTaxReturns_{{TAX_YEAR}}" data-rejected="{{rejectedState}}" data-actionname="amend" data-pending="{{pendingState}}" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck"  href="#myTaxReturns/{{taxYear}}" data-popup-cardflip="true" class="dashboard-link offseasonSecondiLinkNew amendLinkTaxReturn" data-timeline-year="{{taxYear}}" data-ci="{{taxYear}}"><span data-rejected="{{rejectedState}}" data-pending="{{pendingState}}" class="offseasonSecondiLinkText">Amend (change) return</span></a>\n                    {{#if taxReturnId}}\n\n                    <a href="/svc/getTaxReturnPdf?{{getDocumentIdQueryString taxReturnId}}" data-actionname="pdf" data-ci="{{TAX_YEAR}}" class="dashboard-link offseasonSecondiLinkNew"><span class="offseasonSecondiLinkText">Download/print return (PDF)</span></a>\n\n                    <a href="https://support.turbotax.intuit.com/redirect/get-online-datafile" data-actionname="dotTax" data-ci="{{TAX_YEAR}}" target="_blank" class="dashboard-link offseasonSecondiLinkNew">Download .tax file</a>\n                    {{/if}}\n                    <a href="javascript:void(0)" automationid="printCenterLink" data-actionname="printcenter" class="printCenterLink dashboard-link offseasonSecondiLinkNew" data-popup-content="PopupPrintCenterInfo" data-popup-frame="PopupFrameMsg" data-popup-cardflip="true"><span class="offseasonSecondiLinkText"> Print forms and worksheets</span></a>\n                    <a href={{FAFSALink}} data-actionname="fafsa" class="dashboard-link offseasonSecondiLinkNew" target="_blank">Get tax data for FAFSA</a>\n                    <!--leaving actual vault link in secondary actions. changing link name to be something else so no one will render it-->\n                    <a href="#vault" data-actionname="donotrender" class="dashboard-link offseasonSecondiLinkNew"><span class="offseasonSecondiLinkText"> Go to TurboTax Vault</span></a>\n                    <a href="javascript:void(0)" class="dashboard-link offseasonSecondiLinkNew" data-actionname="priorreturns"><span class="offseasonSecondiLinkText">View prior year returns</span></a>\n\n                    <a href="#accountInfo" data-actionname="accountinfo" class="dashboard-link offseasonSecondiLinkNew"><span class="offseasonSecondiLinkText"> Edit account settings</span></a>\n                    <a href="https://{{ttcomDomain}}/commerce/account/secure/edit_billing.jsp" data-actionname="billing" class="dashboard-link offseasonSecondiLinkNew" target="_blank" data-actionname="billing"><span class="offseasonSecondiLinkText">Edit billing options</span></a>\n                    <a href="https://{{ttcomDomain}}/efile/efile_status_lookup.jsp" data-actionname="status-lookup" class="dashboard-link offseasonSecondiLinkNew" target="_blank">Check your e-file status</a>\n                    <a href="#orders" data-actionname="order" class="dashboard-link offseasonSecondiLinkNew">Get order details</a>\n                    <a href="#taxReturns/detail" automationid="viewEFile_{{taxYear}}" data-actionname="efile" class="dashboard-link offseasonSecondiLinkNew">View e-file details</a>\n\n                    <a href="#moneyTools" class="dashboard-link offseasonSecondiLinkNew" data-actionname="moneytools"><span class="offseasonSecondiLinkText">View My Money Tools</span></a>\n\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'
}),define("views/widgets/SecondaryActionsWidget", ["base/WidgetView", "text!templates/SecondaryActions.html"], function (e, t) {
    var n = e.extend({name: "SecondaryAction", model: {}, initialize: function (n, r, i) {
        e.prototype.initialize.apply(this, arguments), this.model.taxReturnId = i.get("folder").get("taxReturnId"), this.model.rejectedState = i.get("rejectedState"), this.model.pendingState = i.get("pendingState"), this.template = app.templateFactory.getTemplate("template/SecondaryActions", t), n.append(this.template(this.model)), r[0] != "all" && n.find(".collapsedActionsWrapperNew > a").each(function (e, t) {
            r.toString().indexOf($(t).data("actionname")) == -1 && $(t).remove()
        });
        var s = n.find("a.dashboard-link").first().data("actionname");
        n.find('a[data-actionname="' + s + '"]').addClass("first");
        var o = this;
        return this
    }});
    return n
}),define("models/UserRefund", [], function () {
    var e = Backbone.Model.extend({url: "/svc/getUserRefund", model: null, parse: function (e) {
        this.model = new Backbone.Model(e), this.model.set("address", this.model.get("address").toLowerCase()), this.model.set("city", this.model.get("city").toLowerCase());
        var t = this.model.get("amazonAmount");
        $.each(this.model.get("bankAccounts"), function (e, t) {
            var n = t.amount.slice(0, -1);
            t.amount = n
        }), t != null && $.each(this.model.get("bankAccounts"), function (e, n) {
            n.amount = parseInt(n.amount, 10) - parseInt(t, 10)
        }), $.each(this.model.get("bonds"), function (e, t) {
            var n = t.amount.slice(0, -1);
            t.amount = n
        });
        if (this.model.get("netSpendSelected")) {
            var n = this.model.get("netSpendAmount");
            this.model.set("netSpendAmount", n.substring(0, n.length - 2))
        }
        this.model.get("refundCheck") && this.model.get("checkAmount") != null && this.model.set("checkAmount", this.model.get("checkAmount").slice(0, -1)), this.model.get("bondAmountSelf") != null && this.model.set("bondAmountSelf", this.model.get("bondAmountSelf").slice(0, -1));
        if (t != null) {
            this.model.set("amazonEmail", this.model.get("amazonEmail").toLowerCase()), this.model.set("amazonAmount", t.slice(0, t.length - 3));
            var r = this.model.get("amazonBonusPercent");
            this.model.set("amazonBonusPercent", r.slice(0, r.length - 3))
        }
        return this
    }});
    return e
}),define("views/widgets/dashboard/TTOPostfileWidget", ["base/WidgetView", "base/ScreenView", "views/widgets/dashboard/ReturnWidget", "views/widgets/PopFlipWidget", "models/TaxReturnDetail", "models/AccountInfo", "text!templates/dashboard/TTOPostfile.html", "text!templates/dashboard/TTOPostfileHealthcareRow.html", "text!templates/dashboard/TTOPostfileMoneyfinderRow.html", "text!templates/popups/PopupBankInfoDetails.html", "text!templates/popups/PopupBankInfoError.html", "views/widgets/SecondaryActionsWidget", "models/UserRefund"], function (e, t, n, r, i, s, o, u, a, f, l, c, h) {
    var p = e.extend({name: "TTOPostfileWidget", events: {"click .amendLinkTaxReturn": "amendPopup", "click .refundDetails": "getBankInfo", "click .printCenterLink": "printCenterInfoPopup"}, actualRenderedFilings: null, initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("templates/dashboard/TTOPostfile", o);
        var t = this.model.getFilingInfos();
        this.actualRenderedFilings = t.getCondensedSortedFilings();
        var n = !1;
        this.model.rejectedState = !1, this.model.pendingState = !1, $(".dashboard-row-header.dashboard-healthcare").click(this.toggle), this.model.set("hasEfiledReturn", !1);
        var r = this;
        $.each(this.actualRenderedFilings, function (e, t) {
            var i = t.getContext().returnStatusCustomerMessage.button;
            if (typeof i != "undefined" && i != "" || t.isStarted())i.href == "#refundTracker" && !r.model.isPostFiling() && t.set("notRefundEligible", !0), n = !0;
            t.isEfiledRejected() && r.model.set("rejectedState", !0), t.isEfiledPending() && !r.model.get("rejectedState") && r.model.set("pendingState", !0), t.isFederal() && !t.getRefundInfo().hasBalanceDue() && appVars.featureRefundInfo && (t.get("refundInfo").get("refundOrPaymentAmount") ? t.set("hasPaymentAmount", !0) : t.set("hasPaymentAmount", !1)), t.isEfiled() && r.model.set("hasEfiledReturn", !0), t.isFiledPrint() && (t.set("printAmount", r.model.get("amountForPrinted")), t.set("printedRefund", t.isPrintedRefund(r.model.get("amountForPrinted"))))
        });
        var i = this.model.getTaxReturnId();
        if (i) {
            var s = $.param({taxDocumentId: i}), u = "/svc/getTaxReturnPdf?" + s;
            this.model.set("downloadPDFLink", u)
        }
        n && this.model.set("hasPrimaryAction", !0)
    }, render: function () {
        logger.info("TTOPostfileWidget:render");
        var e = this.addAndRenderModelsAs(n, this.actualRenderedFilings, this.RETURN_EL_ARRAY), t = ["addstate", "amend", "order", "fafsa", "printcenter", "dotTax"];
        (this.model.get("folder").isPaidFor() || !this.model.get("folder").isPaidFolder() && (this.model.get("folder").isTaxReturnFiled() || this.model.get("folder").isFiledOffSeason())) && t.push("pdf"), this.model.get("hasEfiledReturn") && t.push("efile"), app.getFFAStatus() || t.push("moneytools"), this.append(this.template(this.model.attributes)), this.secondaryActions = new c($("div.row.dashboard-hero"), t, this.model);
        var r = $(this.$el.find("#current-year-returns-list").get(0)), i = app.templateFactory.getTemplate("templates/dashboard/TTOPostfileHealthcareRow", u), s = app.templateFactory.getTemplate("templates/dashboard/TTOPostfileMoneyfinderRow", a), o = $("#dashboard-healthcare-details .timeline-section-content"), f = {notOrangeBtn: this.model.get("hasPrimaryAction"), IsInsured: app.healthcareCovered}, l = app.healthcareCovered;
        return l === "FULL" ? (f.isUserInsured = !0, f.isUserNotInsured = !1, f.isInsuranceStatusUnknown = !1) : l === "NONE" ? (f.isUserInsured = !1, f.isUserNotInsured = !0, f.isInsuranceStatusUnknown = !1) : (f.isUserInsured = !1, f.isUserNotInsured = !1, f.isInsuranceStatusUnknown = !0), this.model.get("pendingOrPrintedOnly") ? (app.getFFAStatus() || (o.html(i(f)), o.append(s), $("#dashboard-healthcare-timeline").removeClass("hidden")), r.append(e)) : (r.html(e), app.getFFAStatus() || (o.html(i(f)), o.append(s), $("#dashboard-healthcare-timeline").removeClass("hidden"))), $(".refund-amt-row.hidden").length > 0 && $(".refund-amt-row").addClass("hidden"), app.isMobile || app.trigger("beginAnimation.dashboard"), this
    }, amendPopup: function (e) {
        e.preventDefault();
        var t = new Date, n = ~~appVars.taxYear, s = n + 1, o = n, u = appVars.seasonPart == "POST_SEASON", a = o.toString().slice(-2), f = !1, l = !1, c = appVars.ttoProtocol + "://" + appVars.turboTaxComDomain + appVars.ttoAmendDownload + a, h = $(e.currentTarget).data("rejected"), p = $(e.currentTarget).data("pending"), d = "";
        o == 2010 && (d = appVars.ttoAmendInstructions2010), o == 2011 && (d = appVars.ttoAmendInstructions2011), o == 2012 && (d = appVars.ttoAmendInstructions2012), o === n && (u || (f = !0)), o >= 2012 && (l = !0);
        var v = this.model.getTaxReturnId(), m = 0, g = 0;
        $(window).width() <= 767 && (m = 350, g = -230);
        var y = new r({launcher: e.currentTarget, elementHeight: $(e.currentTarget).height(), content: "PopupViewAmend", frame: "PopupFrameMsg", taxDocumentId: v, offset: {x: m, y: g}, model: new i({showOnline: f, isTaxFileAvailable: l, selectedYear: o, dateLimit: s, ttoDownloadBtn: c, ttoReadArticleLink: d, rejectedState: h, pendingState: p, taxDocumentId: v, ttoAmendInstructions: appVars.ttoAmendInstructions}), autoOpen: !0});
        this.children.push(y), e.preventDefault()
    }, getBankInfo: function (e) {
        function u() {
            function e(e) {
                var t = app.templateFactory.getTemplate("templates/popups/PopupBankInfoDetails", f), n = $(".refundDetails").data("payment-type") === mytt.c.refundPaymentMethodType.REFUND_RETURN_REFUND_TRANSFER ? !0 : !1, r = $(".refundDetails").data("has-refund");
                e.model.set("hasRefund", r), e.model.set("isRT", n), $("#bankInfoContent").html(t(e.model.attributes))
            }

            app.dataRegistry.fetch({modelClass: h, load: "getUserRefund", loadOptions: {taxDocumentId: app.currentYearTaxId}, noLoading: !0, cache: !0, success: e, error: this.renderBankInfoError, context: this})
        }

        var t = "50%", n = "25%", i = !0;
        $(window).width() <= 767 && (t = 350, n = -230, i = !1);
        var s = new r({launcher: e.currentTarget, elementHeight: $(e.currentTarget).height(), content: "PopupBankInfoWrapper", frame: "PopupFrameMsg", offset: {x: t, y: n, override: i}, autoOpen: !0, callback: u});
        this.children.push(s);
        var o = this.model.getTaxReturnId();
        app.currentYearTaxId = o
    }, printCenterInfoPopup: function (e) {
        t.prototype.newPopup(e, this)
    }, toggle: function (e) {
        var t = $("#dashboard-healthcare-heading"), n = $("#dashboard-healthcare-heading").find(".timeline-heading"), r = $("#dashboard-healthcare-details").find(".timeline-section-content"), i = !0;
        t.hasClass("joined") && (i = !1), i && (n.toggleClass("inactive"), n.toggleClass("active"), r.slideToggle())
    }, renderBankInfoError: function (e) {
        var t = app.templateFactory.getTemplate("templates/popups/PopupBankInfoError", l);
        $("#bankInfoContent").html(t)
    }});
    return p
}),define("text!templates/dashboard/TTODown.html", [], function () {
    return'<div class="row dashboard-hero">\n    <div class="dashboard-colorizer"></div>\n    <div class="col-xs-12">\n        <h1 id="offseasonDashTitle">My TurboTax</h1>\n        <p class="offseasonDashBody offseasonDashBodyExtended">Tax season opens in early December.</p>\n    </div>\n    <div class="col-xs-12">\n        <p class="offseasonDashBody offseasonDashBodyWrap">\n            In the meantime, we can help you get organized for this tax season with TurboTax Vault. It\'s a safe and secure way to keep all your tax documents together. And it\'s free.\n        </p>\n        <a href="#vault" class="btn btn-orange btn-large small-block">Go to TurboTax Vault</a>\n    </div>\n    <div class="col-xs-12">\n        <hr class="secondaryActionDivider"/>\n        <div class="offseasonSecondiLinksWrap">\n            <!--<a href="#taxReturns" class="offseasonSecondiLink"><span class="glyphicon glyphicon-eye-open"></span> <span class="offseasonSecondiLinkText">View prior year returns</span></a>-->\n            <a href="javascript:void(0)" id="ViewPriorYrReturns" class="offseasonSecondiLink"><span class="glyphicon glyphicon-eye-open"></span> <span class="offseasonSecondiLinkText">View prior year returns</span>\n            {{#unless isFFA}}\n            <a href="#healthcare" class="offseasonSecondiLink"><span class="TD-plus"></span> <span class="offseasonSecondiLinkText">See my health care summary</span></a>\n            {{/unless}}\n        </div>\n    </div>\n</div>'
}),define("views/widgets/dashboard/TTODownWidget", ["base/WidgetView", "text!templates/dashboard/TTODown.html"], function (e, t) {
    var n = e.extend({name: "TTODownWidget", events: {"click #ViewPriorYrReturns": "viewPriorYearReturns"}, initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("templates/dashboard/TTODown", t)
    }, render: function () {
        logger.info("TTODownWidget:render"), this.$el.html(this.template(this.model.toJSON())), app.isMobile || app.trigger("beginAnimation.dashboard")
    }, viewPriorYearReturns: function () {
        var e = $("#timeline-wrapper").offset().top - 125;
        $("html").hasClass("touch") ? $(window).scrollTop(e) : $("html, body").animate({scrollTop: e}, 1e3)
    }});
    return n
}),define("models/PriorYearUserState", [], function () {
    var e = Backbone.Model.extend({url: "/svc/getPriorYearUserState", parse: function (e) {
        var t = !1, n = !1, r = !1, i = !1, s = !1, o = !1, u = !1, a = !1, f = !1, l = !1, c = !1, h = !1, p = !1, d = !1, v = !1, m = !1, g = !1, y = !1, b = !1, w = !1, E = !1, S = !1, x = !1, y = !1, T = !1, N = !1, C = !1, k = "", L = !1, A = !1, O = !1, M = !1, _ = !1, D = !1, P = !1, H = !1;
        if (e.hasOwnProperty("typeOf1040"))switch (e.typeOf1040) {
            case"1040":
                k = "1040", L = !0;
                break;
            case"1040A":
                k = "1040A";
                break;
            case"1040EZ":
                k = "1040EZ";
                break;
            case"UNKNOWN":
                k = "UNKNOWN"
        }
        if (e.hasOwnProperty("priorYearInitialSku"))switch (e.priorYearInitialSku) {
            case"BasicFree":
                n = {id: 512, name: "Free Edition"};
                break;
            case"Basic":
                n = {id: 2, name: "Basic"};
                break;
            case"DeductionMaximizer":
                n = {id: 16, name: "Deluxe"};
                break;
            case"Premier":
                n = {id: 8, name: "Premier"};
                break;
            case"HomeAndBusiness":
                n = {id: 32, name: "Home & Business"};
                break;
            case"MilitaryE":
                n = {id: 4096, name: "Military Edition"};
                break;
            case"MilitaryO":
                n = {id: 8192, name: "Military Edition"};
                break;
            case"FreeFileEdition":
                n = {id: 4, name: "Freedom Edition"}
        }
        e.hasOwnProperty("priorYearComplete") && (t = e.priorYearComplete), e.hasOwnProperty("priorYearScheduleA") && (r = e.priorYearScheduleA), e.hasOwnProperty("priorYearScheduleB") && (i = e.priorYearScheduleB), e.hasOwnProperty("priorYearScheduleC") && (s = e.priorYearScheduleC), e.hasOwnProperty("priorYearScheduleCEZS") && (u = e.priorYearScheduleCEZS), e.hasOwnProperty("priorYearScheduleCEZT") && (a = e.priorYearScheduleCEZT), e.hasOwnProperty("priorYearScheduleD") && (f = e.priorYearScheduleD), e.hasOwnProperty("priorYearScheduleE") && (l = e.priorYearScheduleE), e.hasOwnProperty("priorYearScheduleF") && (c = e.priorYearScheduleF);
        if (e.hasOwnProperty("priorYearSku"))switch (e.priorYearSku) {
            case"BasicFree":
                h = {id: 512, name: "Free Edition"};
                break;
            case"Basic":
                h = {id: 2, name: "Basic"}, S = !0;
                break;
            case"DeductionMaximizer":
                h = {id: 16, name: "Deluxe"}, S = !0;
                break;
            case"Premier":
                h = {id: 8, name: "Premier"};
                break;
            case"HomeAndBusiness":
                h = {id: 32, name: "Home & Business"}, S = !0;
                break;
            case"MilitaryE":
                h = {id: 4096, name: "Military Edition"}, S = !0;
                break;
            case"MilitaryO":
                h = {id: 8192, name: "Military Edition"}, S = !0;
                break;
            case"FreeFileEdition":
                h = {id: 4, name: "Freedom Edition"}
        }
        e.hasOwnProperty("priorYearStateAttached") && (p = e.priorYearStateAttached), e.hasOwnProperty("priorYearTaxableState") && (d = e.priorYearTaxableState), h.name == "Free Edition" && r === !0 && (O = !0);
        if (u || a)o = !0;
        h.name == "Basic" && r === !0 && (M = !0);
        if (f === !0 || l === !0)v = !0;
        h.name == "Basic" && (l === !0 || c === !0) && (_ = !0), h.name == "Deluxe" && (f === !0 || l === !0) && (D = !0), h.name == "Deluxe" && (s === !0 || c === !0) && (P = !0);
        if (s === !0 || c === !0)m = !0;
        h.name == "Basic" && (b = !0), h.name == "Premier" && (E = !0), h.name == "Deluxe" && (w = !0), h.name == "HomeAndBusiness" && (x = !0), h.name == "Free Edition" && (g = !0), h.id == 4096 && (N = !0), h.id == 8192 && (T = !0);
        if (h.id == 4096 || h.id == 8192)C = !0;
        h.id == 4 && (y = !0);
        if (h.id == 16 || h.id == 8 || h.id == 32 || h.id == 4096 || h.id == 8192)H = !0;
        return{priorYearComplete: t, priorYearInitialSku: n, priorYearScheduleA: r, priorYearScheduleB: i, priorYearScheduleC: s, priorYearScheduleCEZS: u, priorYearScheduleCEZT: a, priorYearScheduleCLight: o, priorYearScheduleD: f, priorYearScheduleE: l, priorYearScheduleF: c, priorYearSku: h, priorYearStateAttached: p, priorYearTaxableState: d, isScheduleDorScheduleE: v, isScheduleCorScheduleF: m, isPaid: S, isFree: g, isFFA: y, isBasic: b, isDeluxe: w, isHB: x, isPremier: E, isMilitaryE: N, isMilitaryO: T, isMilitary: C, isFFA: y, typeOf1040: k, is1040Long: L, isPremiumProduct: H}
    }, isFFA: function () {
        return this.get("priorYearSku").id == 4
    }, isFree: function () {
        return this.get("priorYearSku").name == "Free Edition"
    }, isBasic: function () {
        return this.get("priorYearSku").name == "Basic"
    }, isDeluxe: function () {
        return this.get("priorYearSku").name == "Deluxe"
    }, isPremier: function () {
        return this.get("priorYearSku").name == "Premier"
    }, isHB: function () {
        return this.get("priorYearSku").name == "Home & Business"
    }, isMilitaryE: function () {
        return this.get("priorYearSku").name == "MilitaryE"
    }, isMilitaryO: function () {
        return this.get("priorYearSku").name == "MilitaryO"
    }, isScheduleDorScheduleE: function () {
        return this.get("priorYearScheduleD") || this.get("priorYearScheduleE")
    }, isScheduleCorScheduleF: function () {
        return this.get("priorYearScheduleC") || this.get("priorYearScheduleF")
    }, isMilitary: function () {
        return this.get("priorYearSku").id == 8192 || this.get("priorYearSku").id == 4096
    }, is1040Long: function () {
        return this.get("typeOf1040") == "1040"
    }});
    return e
}),define("models/PricingDetails", [], function () {
    var e = Backbone.Model.extend({url: "/svc/getPricingDetails", parse: function (e) {
        var t = [], n = [];
        return e.hasOwnProperty("featureList") && (t = e.featureList), e.hasOwnProperty("productFamilyList") && (n = e.productFamilyList), {featureList: t, productFamilyList: n}
    }, _standardPricingModel: null, getStandardItemPrices: function () {
        if (!this._standardPricingModel) {
            var e = this.toJSON(), t = e.productFamilyList.productFamily, n = {}, r, i, s, o, u, a = this;
            _.each(t, function (e) {
                r = a.mapProductNameToProductId(e.name), i = e.productList.product, s = _.where(i, {name: "STATE"}), o = _.where(s[0].item, {name: "FeePrep"})[0].pricing, s = _.where(i, {name: "US"}), u = _.where(s[0].item, {name: "FeePrep"})[0].pricing, n[r] = {fed: {finalPrice: u.finalPrice, listPrice: u.listPrice, salePrice: u.salePrice}, state: {finalPrice: o.finalPrice, listPrice: o.listPrice, salePrice: o.salePrice}}
            }), this._standardPricingModel = n
        }
        return this._standardPricingModel
    }, mapProductNameToProductId: function (e) {
        switch (e) {
            case"BASIC":
                return 2;
            case"DELUXE":
                return 16;
            case"PREMIER":
                return 8;
            case"HBIZ":
                return 32;
            case"LEO":
                return 512;
            case"MILITARYE":
                return 4096;
            case"MILITARYO":
                return 8192;
            case"FFA":
                return 4
        }
    }});
    return e
}),define("modules/vault/models/TaxDocument", [], function () {
    var e = Backbone.Model.extend({urlRoot: "/svc/taxdocs", initialize: function () {
    }});
    return e
}),define("modules/vault/models/TaxDocuments", ["cfp", "modules/vault/models/TaxDocument"], function (e, t) {
    var n = Backbone.Collection.extend({urlRoot: "/svc/taxdocs", parse: function (e) {
        var n = e, r = {};
        return r.documents = n.document, r.documents.length ? _.map(r.documents, function (e) {
            return new t(e)
        }) : null
    }});
    return n
}),define("text!templates/dashboard/Eliminator.html", [], function () {
    return'<script type="text/javascript">\n\n\n    $(function () {\n        $(\'.js-poptip-state-add\').popover({\n            animation: false,\n            trigger: \'hover\',\n            html:true\n        });\n        $(\'[class^=".js-poptip-state"]\').click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n</script>\n<script type="text/javascript">\n\n    //Eliminator\n\n    var experiences = experiences || {};\n\n\n    experiences.eliminator = {\n        //product name with priority of product selector - reorder to change priority\n\n        productMap: {\n            "free": 0,\n            "basic": 1,\n            "deluxe": 2,\n            "military": 3,\n            "premier": 4,\n            "hb": 5\n        },\n        init: function () {\n            var that = this;\n\n            $(\'.js-eliminator-btn\').one(\'click\', function (e) {\n                prodSelector(e, true);\n                $(\'.eliminator-new .lineup\').addClass(\'activatedElement\');\n                $(\'.eliminator-new .headlines, .eliminator-new .submit-options, .eliminator-new\').addClass(\'animate-hide\');\n                $(\'.eliminator-new .lineup-wrapper, .eliminator-new .guarantees\').addClass(\'animate-show\').removeClass(\'animate-hide\');\n                $(\'#elim-form input\').change(function (e) {\n                    prodSelector(e, false);\n                });\n                e.preventDefault();\n            });\n            function productMapper(productName) {\n                switch (productName) {\n                    case "free":\n                        return [512, 2];\n                        break;\n                    case "basic":\n                        return [512, 2];\n                        break;\n                    case "deluxe":\n                        return [16];\n                        break;\n                    case "military":\n                        return [8192, 4096]\n                        break;\n                    case "premier":\n                        return [8];\n                        break;\n                    case "hb":\n                        return [32];\n                        break;\n                }\n            }\n\n            function prodSelector(e, preventDefault) {\n                $(\'.opt\').addClass(\'animate-hide\').removeClass(\'animate-show\');      //hide result divs\n                $(\'.product-pod\').removeClass(\'selected\');\n                var currentProduct = that.currentActiveProduct();    //set current product to checkbox data attribute with highest index\n                experiences.eliminator.currentProduct = productMapper(currentProduct);\n                $(\'.opt[data-eliminator-result="\' + currentProduct + \'"]\').addClass(\'animate-show\').removeClass(\'animate-hide\');      //show result div with eliminator-result data matching product.\n                $(\'.product-pod[data-lineup-pod="\' + currentProduct + \'"]\').addClass(\'selected\');\n\n//                //Highlight both free and basic pods if eliminator suggests free\n                if (experiences.RUEShared.freeBasicCombo) { //Toggle combo in recipe C Value Tier, and recipe C rollout Baseline.\n\n                    if (currentProduct == "free") {\n                        $(\'.product-pod[data-lineup-pod="basic"]\').addClass(\'selected\');\n                    }\n                    if (preventDefault) {\n                        e.preventDefault();\n                    }\n                }\n\n            }\n\n        },\n        currentActiveProduct: function () {\n            //compare checked checkboxes, active product is highest priority product in experiences.eliminator.productMap\n            var that = this;\n            var currentProductPriority = 0;\n            var currentProduct = "deluxe";\n            $(\'#elim-form input:checked\').each(function () {\n                if (that.productMap[$(this).data(\'eliminator-cb\')] >= currentProductPriority) {\n                    currentProductPriority = that.productMap[$(this).data(\'eliminator-cb\')];\n                    currentProduct = $(this).data(\'eliminator-cb\');\n                }\n            });\n            return currentProduct;\n        }\n\n\n    };\n\n    $(function () {\n        experiences.eliminator.init();\n        /*$(\'.select-box\').click(function(e){\n         var clickElement = $(this).find(\'label\');\n         clickElement.trigger(\'click\');\n\n         });*/\n        $(\'.select-box\').click(function(){\n            $(this).children(\'input[type=checkbox]\').attr(\'checked\',\'true\');\n//            alert(\'yo\')\n        })\n    });\n\n</script>\n\n{{> Subnav}}\n<div class="row">\n<section class="eliminator-new base">\n<div class="switch-content underline">\n\n    <div class="headlines">\n        <!--p class="superheadline">Welcome {{#if globalModel.firstName}}back, {{capitalizeAndTruncate globalModel.firstName 15}}{{/if}}</p-->\n        <h2 class="headline">Help us find the right TurboTax product for you</h2>\n\n        <p class="subhead">Check all boxes below that apply</p>\n    </div>\n    <form id="elim-form">\n        <div class="row">\n\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-male icon"></div>\n                    <input id="single" type="checkbox" data-eliminator-cb="free">\n                    <label for="single" class="single single-line">Single</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-children"></div>\n                    <input id="has-children" type="checkbox" data-eliminator-cb="free">\n                    <label for="has-children" class="children">Have children/<br>dependents</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-home"></div>\n                    <input id="homeowner" type="checkbox" data-eliminator-cb="deluxe">\n                    <label for="homeowner" class="homeowner single-line">Own a home</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-dollar-bill"></div>\n                    <input id="deductions" type="checkbox" data-eliminator-cb="deluxe">\n                    <label for="deductions" class="deductions">Maximize deductions<br/> and credits</label>\n                </div>\n            </div>\n\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-stock2"></div>\n                    <input id="stocks" type="checkbox" data-eliminator-cb="premier">\n                    <label for="stocks" class="stocks"><span\n                            class="short">Sold stock/<br>Own rental property</span><span class="long">Sold stock or bonds/<br>Own rental property</span></label>\n                </div>\n            </div>\n            <div class="select-box last">\n                <div class="inner">\n                    <div class="TD-briefcase2"></div>\n                    <input id="hb" type="checkbox" data-eliminator-cb="hb">\n                    <label for="hb" class="bizowner">Own a business/<br>Sole proprietor</label>\n                </div>\n            </div>\n        </div>\n    </form>\n    <div class="submit-options">\n        <a class="js-eliminator-btn btn btn-orange btn-large" href="#" data-ci-id="">Show Recommendation</a>\n\n\n    </div>\n</div>\n\n{{#if templateState.eliminatorFreeBasicRecco}}\n\n    <div class="opt animate-hide double" data-eliminator-result="free">\n        <div class="row">\n            <div class="info">\n                <h2 class="headline"><strong>TurboTax Federal Free Edition</strong> or <strong>Basic</strong> is right\n                    for you</h2>\n\n                <div class="recco-product">\n                    <div class="row">\n                        <div class="col-md-4 col-md-offset-2">\n                            <h3>TurboTax Federal Free Edition</h3>\n                            <ul class="subhead-bullets height-match">\n                                <li>Easily prep, print and efile your tax return</li>\n                                <li>Save time and avoid errors by importing<br class="visible-lg"> your W-2</li>\n                                <li>Get answers by live chat</li>\n                            </ul>\n\n                            <p>\n                                <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-512"\n                                   href="#"\n                                   data-productId="512">Start with Free Edition</a>\n                            </p>\n\n                            <div>{{#if pricing}} <span class="price">$0 Federal</span><span class="ast">*</span> {{/if}}</div>\n                            <div class="state-add">\n\n\n                                <a href="#" class="js-poptip-state-add" data-placement="top" data-content=\'{{printStateAddPopOver pricing 512 "state"}}\'>State additional</a>\n                                {{#if VTRecipeA}} <i class="">New reduced price!</i>{{/if}}\n                            </div>\n                            <div class="divider"></div>\n                        </div>\n                        <div class="col-md-4 col-md-offset-1">\n                            <h3>TurboTax Basic</h3>\n                            <ul class="subhead-bullets height-match">\n                                <li>Easily prep, print and efile your tax return</li>\n                                <li>Save time and avoid errors by importing<br class="visible-lg"> your W-2</li>\n                                <li>Get answers by live chat <i>or</i> phone</li>\n                                <li>Get year-over-year transfer of tax info</li>\n                                <li>Get ongoing access to previous TurboTax returns</li>\n                            </ul>\n                            <p>\n                                <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-2" href="#"\n                                   data-productId="2">Start With Basic</a>\n                            </p>\n\n                            <div class="price">\n                                {{#if pricing}}{{printPricing pricing 2 "fed"}} Federal<span\n                                        class="ast">*</span> {{/if}}\n                            </div>\n                            <div class="state-add">\n                                <a href="#" class="js-poptip-state-add" data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n{{else}}\n    <div class="opt animate-hide" data-eliminator-result="free">\n        <div class="row">\n            <div class="info">\n                <div class="col-md-7 col-md-offset-1">\n                    <h3 class="headline"><strong>TurboTax Federal Free Edition</strong> works for you</h3>\n\n                    <ul class="subhead-bullets">\n                        <li>Easy prep, print and efile of your return</li>\n                        <li>Automatically import W-2 data</li>\n                        <li>Get expert tax advice by phone</li>\n                    </ul>\n                    <div class="divider"></div>\n                </div>\n                <div class="col-md-3">\n                    <div class="recco-product">\n                        <p>\n                            <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-512" href="#"\n                               data-productId="512">Start for Free</a>\n                        </p>\n                        <div class="price">\n                        {{#if pricing}} <span class="price">Free</span> <span class="federal"> federal</span>{{/if}}\n                        </div>\n                        <ul class="sub-links">\n                            <li class="state-add">\n                                <a href="#" class="js-poptip-state-add" rel="popover" data-placement="top" data-content=\'{{printStateAddPopOver pricing 512 "state"}}\'>State additional</a>\n                                {{#if VTRecipeA}} <i class="">New reduced price!</i>{{/if}}\n                            </li>\n                            <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{#unless templateState.eliminatorDisableCompChart}}\n            {{> CompChart}}\n        {{/unless}}\n    </div>\n\n{{/if}}\n\n\n\n<div class="opt animate-hide" data-eliminator-result="basic">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n                <h3 class="headline"><strong>TurboTax Basic</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li class="previous-plus">Get everything in Federal Free Edition, plus:</li>\n                    <li>Get answers by phone or live chat</li>\n                    <li>Transfer last year\'s TurboTax return</li>\n                    <li>Get ongoing access to filed returns</li>\n                </ul>\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n                    <p>\n                        <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-2" href="#"\n                           data-productId="2">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 2 "fed" false true}} federal{{/if}}\n                    </div>\n\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a> | <span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                            <span class="phone-support">Support by phone </span><span\n                                class="chat-support">Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class="opt" data-eliminator-result="deluxe">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Deluxe</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n\n                    <li>Actively searches for homeowner tax breaks and 350+ deductions and credits</li>\n                    <li>Applies the maximum value of your charitable donations with ItsDeductible&trade;</li>\n                    <li>Extra coaching with reporting most independent contractor, freelance or 1099-MISC income</li>\n                    <li>Plus, an extra 10% bonus on top of your federal refund (<a href="#" class="arb-link js-arb-popup pop-arb">see offer details</a>)</li>\n\n                </ul>\n\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n                    <p>\n                        <a class="btn btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-16" href="#"\n                           data-productId="16">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 16 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 16 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class="opt  animate-hide" data-eliminator-result="premier">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Premier</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li>Get all the forms you need to report investment sales</li>\n                    <li>Calculate cost basis for all stock sales automatically</li>\n                    <li>Get tax-saving rental property deductions</li>\n                    <li>Helps you keep every investment dollar you deserve</li>\n                </ul>\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n\n                    <p>\n                        <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-8" href="#" data-productId="8">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 8 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 8 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class="opt  animate-hide" data-eliminator-result="hb">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Home &amp; Business</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li>File Schedule C for your business income</li>\n                    <li>Get every dollar from your business tax deductions</li>\n                    <li>Save time with simplified asset depreciation</li>\n                    <li>File both personal <em>and</em> small business taxes</li>\n                </ul>\n\n\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n\n\n                    <p>\n                        <a class="btn btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-32" href="#"\n                           data-productId="32">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 32 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 32 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class="opt animate-hide double military" data-eliminator-result="military">\n    <div class="row">\n        <div class="info">\n            <h2 class="headline">We recommend <strong>TurboTax Military Edition</strong></h2>\n\n            <p class="subhead">Plus, get an extra 10% on top of your federal refund <a href="" class="pop-arb">See offer\n                details</a></p>\n\n            <ul class="subhead-bullets">\n                <li>Get the military tax break you deserve</li>\n                <li>Guidance for military and civilian income</li>\n                <li>We search for military-related expenses</li>\n                <li>Helps determine your state of residence</li>\n            </ul>\n\n            <div class="recco-product">\n                <div class="row">\n                    <div class="col-md-3 col-md-offset-2">\n                        <h3>E1 &ndash; E5</h3>\n\n                        <p class="clear">\n                            <a class="btn btn-orange btn-large sendToProductOffering" data-ci="selector-4096" href="#"\n                               data-productId="4096">Start for Free</a>\n                        </p>\n\n                        <div class="price">\n                            {{#if pricing}} {{printPricing pricing 4096 "fed"}} Federal<span class="ast">*</span>{{/if}}\n                        </div>\n                        {{printPricing pricing 4096 "state"}}<span class="ast">*</span> <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 4096 "state"}}\' data-placement="top">state (optional)</a>\n                    </div>\n                    <div class="divider"></div>\n                    <div class="col-md-3 col-md-offset-2">\n                        <h3>E6 &ndash; E10 &amp; Officer</h3>\n\n                        <p class="clear">\n                            <a class="btn btn-orange btn-large sendToProductOffering" data-ci="selector-8192" href="#"\n                               data-productId="8192">Start for Free</a>\n                        </p>\n\n                        <div class="price">\n                            {{#if pricing}} {{printPricing pricing 8192 "fed"}} Federal<span class="ast">*</span>\n                            {{/if}}\n                        </div>\n                        <div class="state-add">\n                            {{printPricing pricing 8192 "state"}}<span class="ast">*</span> <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 8192 "state"}}\' data-placement="top">state (optional)</a>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n</div>\n\n\n\n{{#if templateState.isAllProductsButtonClicker}}\n{{> LineupFive}}\n{{else}}\n{{> LineupFour}}\n{{/if}}\n\n</section>\n\n{{> Disclaimer}}\n\n\n</div>\n\n'
}),define("text!templates/dashboard/EliminatorTwo.html", [], function () {
    return'<script type="text/javascript">\n\n\n    $(function () {\n        $(\'.js-poptip-state-add\').popover({\n            animation: false,\n            trigger: \'hover\',\n            html:true\n        });\n        $(\'[class^=".js-poptip-state"]\').click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n</script>\n<script type="text/javascript">\n\n    //Eliminator\n\n    var experiences = experiences || {};\n\n\n    experiences.eliminator = {\n        //product name with priority of product selector - reorder to change priority\n\n        productMap: {\n            "free": 0,\n            "basic": 1,\n            "deluxe": 2,\n            "military": 3,\n            "premier": 4,\n            "hb": 5\n        },\n        init: function () {\n            var that = this;\n\n            $(\'.js-eliminator-btn\').one(\'click\', function (e) {\n                prodSelector(e, true);\n                $(\'.eliminator-new .lineup\').addClass(\'activatedElement\');\n                $(\'.eliminator-new .headlines, .eliminator-new .submit-options, .eliminator-new\').addClass(\'animate-hide\');\n                $(\'.eliminator-new .lineup-wrapper, .eliminator-new .guarantees\').addClass(\'animate-show\').removeClass(\'animate-hide\');\n                $(\'#elim-form input\').change(function (e) {\n                    prodSelector(e, false);\n                });\n                e.preventDefault();\n            });\n            function productMapper(productName) {\n                switch (productName) {\n                    case "free":\n                        return [512, 2];\n                        break;\n                    case "basic":\n                        return [512, 2];\n                        break;\n                    case "deluxe":\n                        return [16];\n                        break;\n                    case "military":\n                        return [8192, 4096]\n                        break;\n                    case "premier":\n                        return [8];\n                        break;\n                    case "hb":\n                        return [32];\n                        break;\n                }\n            }\n\n            function prodSelector(e, preventDefault) {\n                $(\'.opt\').addClass(\'animate-hide\').removeClass(\'animate-show\');      //hide result divs\n                $(\'.product-pod\').removeClass(\'selected\');\n                var currentProduct = that.currentActiveProduct();    //set current product to checkbox data attribute with highest index\n                experiences.eliminator.currentProduct = productMapper(currentProduct);\n                $(\'.opt[data-eliminator-result="\' + currentProduct + \'"]\').addClass(\'animate-show\').removeClass(\'animate-hide\');      //show result div with eliminator-result data matching product.\n                $(\'.product-pod[data-lineup-pod="\' + currentProduct + \'"]\').addClass(\'selected\');\n\n//                //Highlight both free and basic pods if eliminator suggests free\n                if (experiences.RUEShared.freeBasicCombo) { //Toggle combo in recipe C Value Tier, and recipe C rollout Baseline.\n\n                    if (currentProduct == "free") {\n                        $(\'.product-pod[data-lineup-pod="basic"]\').addClass(\'selected\');\n                    }\n                    if (preventDefault) {\n                        e.preventDefault();\n                    }\n                }\n\n            }\n\n        },\n        currentActiveProduct: function () {\n            //compare checked checkboxes, active product is highest priority product in experiences.eliminator.productMap\n            var that = this;\n            var currentProductPriority = 0;\n            var currentProduct = "deluxe";\n            $(\'#elim-form input:checked\').each(function () {\n                if (that.productMap[$(this).data(\'eliminator-cb\')] >= currentProductPriority) {\n                    currentProductPriority = that.productMap[$(this).data(\'eliminator-cb\')];\n                    currentProduct = $(this).data(\'eliminator-cb\');\n                }\n            });\n            return currentProduct;\n        }\n\n\n    };\n\n    $(function () {\n        experiences.eliminator.init();\n        /*$(\'.select-box\').click(function(e){\n         var clickElement = $(this).find(\'label\');\n         clickElement.trigger(\'click\');\n\n         });*/\n        $(\'.select-box\').click(function(){\n            $(this).children(\'input[type=checkbox]\').attr(\'checked\',\'true\');\n//            alert(\'yo\')\n        })\n    });\n\n</script>\n\n\n\n{{> Subnav}}\n<div class="row">\n<section class="eliminator-new base">\n\n{{#if templateState.isAllProductsButtonClicker}}\n\n<div class="switch-content underline">\n\n    <div class="headlines">\n        <!--p class="superheadline">Welcome {{#if globalModel.firstName}}back, {{capitalizeAndTruncate globalModel.firstName 15}}{{/if}}</p-->\n        <h2 class="headline">Help us find the right TurboTax product for you</h2>\n\n        <p class="subhead">Check all boxes below that apply</p>\n    </div>\n    <form id="elim-form">\n        <div class="row">\n\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-male icon"></div>\n                    <input id="single" type="checkbox" data-eliminator-cb="free">\n                    <label for="single" class="single single-line">Single</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-children"></div>\n                    <input id="has-children" type="checkbox" data-eliminator-cb="free">\n                    <label for="has-children" class="children">Have children/<br>dependents</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-home"></div>\n                    <input id="homeowner" type="checkbox" data-eliminator-cb="deluxe">\n                    <label for="homeowner" class="homeowner single-line">Own a home</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-dollar-bill"></div>\n                    <input id="deductions" type="checkbox" data-eliminator-cb="deluxe">\n                    <label for="deductions" class="deductions">Maximize deductions<br/> and credits</label>\n                </div>\n            </div>\n\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-stock2"></div>\n                    <input id="stocks" type="checkbox" data-eliminator-cb="premier">\n                    <label for="stocks" class="stocks"><span\n                            class="short">Sold stock/<br>Own rental property</span><span class="long">Sold stock or bonds/<br>Own rental property</span></label>\n                </div>\n            </div>\n            <div class="select-box last">\n                <div class="inner">\n                    <div class="TD-briefcase2"></div>\n                    <input id="hb" type="checkbox" data-eliminator-cb="hb">\n                    <label for="hb" class="bizowner">Own a business/<br>Sole proprietor</label>\n                </div>\n            </div>\n        </div>\n    </form>\n    <div class="submit-options">\n        <a class="js-eliminator-btn btn btn-orange btn-large" href="#" data-ci-id="">Show Recommendation</a>\n\n\n    </div>\n</div>\n\n{{#if templateState.eliminatorFreeBasicRecco}}\n\n    <div class="opt animate-hide double" data-eliminator-result="free">\n        <div class="row">\n            <div class="info">\n                <h2 class="headline"><strong>TurboTax Federal Free Edition</strong> or <strong>Basic</strong> is right\n                    for you</h2>\n\n                <div class="recco-product">\n                    <div class="row">\n                        <div class="col-md-4 col-md-offset-2">\n                            <h3>TurboTax Federal Free Edition</h3>\n                            <ul class="subhead-bullets height-match">\n                                <li>Easily prep, print and efile your tax return</li>\n                                <li>Save time and avoid errors by importing<br class="visible-lg"> your W-2</li>\n                                <li>Get answers by live chat</li>\n                            </ul>\n\n                            <p>\n                                <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-512"\n                                   href="#"\n                                   data-productId="512">Start with Free Edition</a>\n                            </p>\n\n                            <div>{{#if pricing}} <span class="price">$0 Federal</span><span class="ast">*</span> {{/if}}</div>\n                            <div class="state-add">\n\n\n                                <a href="#" class="js-poptip-state-add" data-placement="top" data-content=\'{{printStateAddPopOver pricing 512 "state"}}\'>State additional</a>\n                                {{#if VTRecipeA}} <i class="">New reduced price!</i>{{/if}}\n                            </div>\n                            <div class="divider"></div>\n                        </div>\n                        <div class="col-md-4 col-md-offset-1">\n                            <h3>TurboTax Basic</h3>\n                            <ul class="subhead-bullets height-match">\n                                <li>Easily prep, print and efile your tax return</li>\n                                <li>Save time and avoid errors by importing<br class="visible-lg"> your W-2</li>\n                                <li>Get answers by live chat <i>or</i> phone</li>\n                                <li>Get year-over-year transfer of tax info</li>\n                                <li>Get ongoing access to previous TurboTax returns</li>\n                            </ul>\n                            <p>\n                                <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-2" href="#"\n                                   data-productId="2">Start With Basic</a>\n                            </p>\n\n                            <div class="price">\n                                {{#if pricing}}{{printPricing pricing 2 "fed"}} Federal<span\n                                        class="ast">*</span> {{/if}}\n                            </div>\n                            <div class="state-add">\n                                <a href="#" class="js-poptip-state-add" data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n{{else}}\n    <div class="opt animate-hide" data-eliminator-result="free">\n        <div class="row">\n            <div class="info">\n                <div class="col-md-7 col-md-offset-1">\n                    <h3 class="headline"><strong>TurboTax Federal Free Edition</strong> works for you</h3>\n\n                    <ul class="subhead-bullets">\n                        <li>Easy prep, print and efile of your return</li>\n                        <li>Automatically import W-2 data</li>\n                        <li>Get expert tax advice by phone</li>\n                    </ul>\n                    <div class="divider"></div>\n                </div>\n                <div class="col-md-3">\n                    <div class="recco-product">\n                        <p>\n                            <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-512" href="#"\n                               data-productId="512">Start for Free</a>\n                        </p>\n                        <div class="price">\n                        {{#if pricing}} <span class="price">Free</span> <span class="federal"> federal</span>{{/if}}\n                        </div>\n                        <ul class="sub-links">\n                            <li class="state-add">\n                                <a href="#" class="js-poptip-state-add" rel="popover" data-placement="top" data-content=\'{{printStateAddPopOver pricing 512 "state"}}\'>State additional</a>\n                                {{#if VTRecipeA}} <i class="">New reduced price!</i>{{/if}}\n                            </li>\n                            <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{#unless templateState.eliminatorDisableCompChart}}\n            {{> CompChart}}\n        {{/unless}}\n    </div>\n\n{{/if}}\n\n\n\n<div class="opt animate-hide" data-eliminator-result="basic">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n                <h3 class="headline"><strong>TurboTax Basic</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li class="previous-plus">Get everything in Federal Free Edition, plus:</li>\n                    <li>Get answers by phone or live chat</li>\n                    <li>Transfer last year\'s TurboTax return</li>\n                    <li>Get ongoing access to filed returns</li>\n                </ul>\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n                    <p>\n                        <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-2" href="#"\n                           data-productId="2">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 2 "fed" false true}} federal{{/if}}\n                    </div>\n\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a> | <span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                            <span class="phone-support">Support by phone </span><span\n                                class="chat-support">Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class="opt" data-eliminator-result="deluxe">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Deluxe</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n\n                    <li>Actively searches for homeowner tax breaks and 350+ deductions and credits</li>\n                    <li>Applies the maximum value of your charitable donations with ItsDeductible&trade;</li>\n                    <li>Extra coaching with reporting most independent contractor, freelance or 1099-MISC income</li>\n                    <li>Plus, an extra 10% bonus on top of your federal refund (<a href="#" class="arb-link js-arb-popup pop-arb">see offer details</a>)</li>\n\n                </ul>\n\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n                    <p>\n                        <a class="btn btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-16" href="#"\n                           data-productId="16">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 16 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 16 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class="opt  animate-hide" data-eliminator-result="premier">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Premier</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li>Get all the forms you need to report investment sales</li>\n                    <li>Calculate cost basis for all stock sales automatically</li>\n                    <li>Get tax-saving rental property deductions</li>\n                    <li>Helps you keep every investment dollar you deserve</li>\n                </ul>\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n\n                    <p>\n                        <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-8" href="#" data-productId="8">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 8 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 8 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class="opt  animate-hide" data-eliminator-result="hb">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Home &amp; Business</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li>File Schedule C for your business income</li>\n                    <li>Get every dollar from your business tax deductions</li>\n                    <li>Save time with simplified asset depreciation</li>\n                    <li>File both personal <em>and</em> small business taxes</li>\n                </ul>\n\n\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n\n\n                    <p>\n                        <a class="btn btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-32" href="#"\n                           data-productId="32">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 32 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 32 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class="opt animate-hide double military" data-eliminator-result="military">\n    <div class="row">\n        <div class="info">\n            <h2 class="headline">We recommend <strong>TurboTax Military Edition</strong></h2>\n\n            <p class="subhead">Plus, get an extra 10% on top of your federal refund <a href="" class="pop-arb">See offer\n                details</a></p>\n\n            <ul class="subhead-bullets">\n                <li>Get the military tax break you deserve</li>\n                <li>Guidance for military and civilian income</li>\n                <li>We search for military-related expenses</li>\n                <li>Helps determine your state of residence</li>\n            </ul>\n\n            <div class="recco-product">\n                <div class="row">\n                    <div class="col-md-3 col-md-offset-2">\n                        <h3>E1 &ndash; E5</h3>\n\n                        <p class="clear">\n                            <a class="btn btn-orange btn-large sendToProductOffering" data-ci="selector-4096" href="#"\n                               data-productId="4096">Start for Free</a>\n                        </p>\n\n                        <div class="price">\n                            {{#if pricing}} {{printPricing pricing 4096 "fed"}} Federal<span class="ast">*</span>{{/if}}\n                        </div>\n                        {{printPricing pricing 4096 "state"}}<span class="ast">*</span> <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 4096 "state"}}\' data-placement="top">state (optional)</a>\n                    </div>\n                    <div class="divider"></div>\n                    <div class="col-md-3 col-md-offset-2">\n                        <h3>E6 &ndash; E10 &amp; Officer</h3>\n\n                        <p class="clear">\n                            <a class="btn btn-orange btn-large sendToProductOffering" data-ci="selector-8192" href="#"\n                               data-productId="8192">Start for Free</a>\n                        </p>\n\n                        <div class="price">\n                            {{#if pricing}} {{printPricing pricing 8192 "fed"}} Federal<span class="ast">*</span>\n                            {{/if}}\n                        </div>\n                        <div class="state-add">\n                            {{printPricing pricing 8192 "state"}}<span class="ast">*</span> <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 8192 "state"}}\' data-placement="top">state (optional)</a>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n</div>\n\n\n\n\n{{> LineupFive}}\n{{else}}\n\n    <div class="switch-content underline">\n\n        <div class="headlines">\n\n            <h2 class="headline">TurboTax Online Products</h2>\n\n            <p class="subhead">Select a product and we\'ll customize as you go</p>\n        </div>\n\n    </div>\n\n{{> LineupTwo}}\n{{/if}}\n\n</section>\n\n{{> Disclaimer}}\n\n\n</div>\n\n'
}),define("text!templates/dashboard/EliminatorThree.html", [], function () {
    return'<script type="text/javascript">\n\n\n    $(function () {\n        $(\'.js-poptip-state-add\').popover({\n            animation: false,\n            trigger: \'hover\',\n            html:true\n        });\n\n        $(\'.js-hb-poptip\').popover({\n            animation: false,\n            content : $(\'.hb-callout\').html(),\n            trigger: \'hover\',\n            html:true\n        });\n\n        $(\'[class^=".js-poptip-state"]\').click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n</script>\n<script type="text/javascript">\n\n    //Eliminator\n\n    var experiences = experiences || {};\n\n\n    experiences.eliminator = {\n        //product name with priority of product selector - reorder to change priority\n\n        productMap: {\n            "free": 0,\n            "basic": 1,\n            "deluxe": 2,\n            "military": 3,\n            "premier": 4,\n            "hb": 5\n        },\n        init: function () {\n            var that = this;\n\n            $(\'.js-eliminator-btn\').one(\'click\', function (e) {\n                prodSelector(e, true);\n                $(\'.eliminator-new .lineup\').addClass(\'activatedElement\');\n                $(\'.eliminator-new .headlines, .eliminator-new .submit-options, .eliminator-new\').addClass(\'animate-hide\');\n                $(\'.eliminator-new .lineup-wrapper, .eliminator-new .guarantees\').addClass(\'animate-show\').removeClass(\'animate-hide\');\n                $(\'#elim-form input\').change(function (e) {\n                    prodSelector(e, false);\n                });\n                e.preventDefault();\n            });\n            function productMapper(productName) {\n                switch (productName) {\n                    case "free":\n                        return [512, 2];\n                        break;\n                    case "basic":\n                        return [512, 2];\n                        break;\n                    case "deluxe":\n                        return [16];\n                        break;\n                    case "military":\n                        return [8192, 4096]\n                        break;\n                    case "premier":\n                        return [8];\n                        break;\n                    case "hb":\n                        return [32];\n                        break;\n                }\n            }\n\n            function prodSelector(e, preventDefault) {\n                $(\'.opt\').addClass(\'animate-hide\').removeClass(\'animate-show\');      //hide result divs\n                $(\'.product-pod\').removeClass(\'selected\');\n                var currentProduct = that.currentActiveProduct();    //set current product to checkbox data attribute with highest index\n                experiences.eliminator.currentProduct = productMapper(currentProduct);\n                $(\'.opt[data-eliminator-result="\' + currentProduct + \'"]\').addClass(\'animate-show\').removeClass(\'animate-hide\');      //show result div with eliminator-result data matching product.\n                $(\'.product-pod[data-lineup-pod="\' + currentProduct + \'"]\').addClass(\'selected\');\n\n//                //Highlight both free and basic pods if eliminator suggests free\n                if (experiences.RUEShared.freeBasicCombo) { //Toggle combo in recipe C Value Tier, and recipe C rollout Baseline.\n\n                    if (currentProduct == "free") {\n                        $(\'.product-pod[data-lineup-pod="basic"]\').addClass(\'selected\');\n                    }\n                    if (preventDefault) {\n                        e.preventDefault();\n                    }\n                }\n\n            }\n\n        },\n        currentActiveProduct: function () {\n            //compare checked checkboxes, active product is highest priority product in experiences.eliminator.productMap\n            var that = this;\n            var currentProductPriority = 0;\n            var currentProduct = "deluxe";\n            $(\'#elim-form input:checked\').each(function () {\n                if (that.productMap[$(this).data(\'eliminator-cb\')] >= currentProductPriority) {\n                    currentProductPriority = that.productMap[$(this).data(\'eliminator-cb\')];\n                    currentProduct = $(this).data(\'eliminator-cb\');\n                }\n            });\n            return currentProduct;\n        }\n\n\n    };\n\n    $(function () {\n        experiences.eliminator.init();\n        /*$(\'.select-box\').click(function(e){\n         var clickElement = $(this).find(\'label\');\n         clickElement.trigger(\'click\');\n\n         });*/\n        $(\'.select-box\').click(function(){\n            $(this).children(\'input[type=checkbox]\').attr(\'checked\',\'true\');\n//            alert(\'yo\')\n        })\n    });\n\n</script>\n<style type="text/css">\n    @media (min-width: 992px) {\n        .eliminator-new .select-box {\n            width: 19.5%;\n        }\n        .eliminator-new .select-box.last2 {\n            border-right:0;\n        }\n    }\n</style>\n{{> Subnav}}\n<div class="row">\n<section class="eliminator-new base">\n<div class="switch-content underline">\n\n    <div class="headlines">\n        <!--p class="superheadline">Welcome {{#if globalModel.firstName}}back, {{capitalizeAndTruncate globalModel.firstName 15}}{{/if}}</p-->\n        <h2 class="headline">Help us find the right TurboTax product for you</h2>\n\n        <p class="subhead">Check all boxes below that apply</p>\n    </div>\n    <form id="elim-form">\n        <div class="row">\n\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-male icon"></div>\n                    <input id="single" type="checkbox" data-eliminator-cb="free">\n                    <label for="single" class="single single-line">Single</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-children"></div>\n                    <input id="has-children" type="checkbox" data-eliminator-cb="free">\n                    <label for="has-children" class="children">Have children/<br>dependents</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-home"></div>\n                    <input id="homeowner" type="checkbox" data-eliminator-cb="deluxe">\n                    <label for="homeowner" class="homeowner single-line">Own a home</label>\n                </div>\n            </div>\n            <div class="select-box">\n                <div class="inner">\n                    <div class="TD-dollar-bill"></div>\n                    <input id="deductions" type="checkbox" data-eliminator-cb="deluxe">\n                    <label for="deductions" class="deductions">Maximize deductions<br/> and credits</label>\n                </div>\n            </div>\n\n            <div class="select-box last2">\n                <div class="inner">\n                    <div class="TD-stock2"></div>\n                    <input id="stocks" type="checkbox" data-eliminator-cb="premier">\n                    <label for="stocks" class="stocks"><span\n                            class="short">Sold stock/<br>Own rental property</span><span class="long">Sold stock or bonds/<br>Own rental property</span></label>\n                </div>\n            </div>\n        </div>\n    </form>\n    <div class="submit-options">\n        <a class="js-eliminator-btn btn btn-orange btn-large" href="#" data-ci-id="">Show Recommendation</a>\n\n\n    </div>\n</div>\n\n{{#if templateState.eliminatorFreeBasicRecco}}\n\n    <div class="opt animate-hide double" data-eliminator-result="free">\n        <div class="row">\n            <div class="info">\n                <h2 class="headline"><strong>TurboTax Federal Free Edition</strong> or <strong>Basic</strong> is right\n                    for you</h2>\n\n                <div class="recco-product">\n                    <div class="row">\n                        <div class="col-md-4 col-md-offset-2">\n                            <h3>TurboTax Federal Free Edition</h3>\n                            <ul class="subhead-bullets height-match">\n                                <li>Easily prep, print and efile your tax return</li>\n                                <li>Save time and avoid errors by importing<br class="visible-lg"> your W-2</li>\n                                <li>Get answers by live chat</li>\n                            </ul>\n\n                            <p>\n                                <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-512"\n                                   href="#"\n                                   data-productId="512">Start with Free Edition</a>\n                            </p>\n\n                            <div>{{#if pricing}} <span class="price">$0 Federal</span><span class="ast">*</span> {{/if}}</div>\n                            <div class="state-add">\n\n\n                                <a href="#" class="js-poptip-state-add" data-placement="top" data-content=\'{{printStateAddPopOver pricing 512 "state"}}\'>State additional</a>\n                                {{#if VTRecipeA}} <i class="">New reduced price!</i>{{/if}}\n                            </div>\n                            <div class="divider"></div>\n                        </div>\n                        <div class="col-md-4 col-md-offset-1">\n                            <h3>TurboTax Basic</h3>\n                            <ul class="subhead-bullets height-match">\n                                <li>Easily prep, print and efile your tax return</li>\n                                <li>Save time and avoid errors by importing<br class="visible-lg"> your W-2</li>\n                                <li>Get answers by live chat <i>or</i> phone</li>\n                                <li>Get year-over-year transfer of tax info</li>\n                                <li>Get ongoing access to previous TurboTax returns</li>\n                            </ul>\n                            <p>\n                                <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-2" href="#"\n                                   data-productId="2">Start With Basic</a>\n                            </p>\n\n                            <div class="price">\n                                {{#if pricing}}{{printPricing pricing 2 "fed"}} Federal<span\n                                        class="ast">*</span> {{/if}}\n                            </div>\n                            <div class="state-add">\n                                <a href="#" class="js-poptip-state-add" data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n{{else}}\n    <div class="opt animate-hide" data-eliminator-result="free">\n        <div class="row">\n            <div class="info">\n                <div class="col-md-7 col-md-offset-1">\n                    <h3 class="headline"><strong>TurboTax Federal Free Edition</strong> works for you</h3>\n\n                    <ul class="subhead-bullets">\n                        <li>Easy prep, print and efile of your return</li>\n                        <li>Automatically import W-2 data</li>\n                        <li>Get expert tax advice by phone</li>\n                    </ul>\n                    <div class="divider"></div>\n                </div>\n                <div class="col-md-3">\n                    <div class="recco-product">\n                        <p>\n                            <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-512" href="#"\n                               data-productId="512">Start for Free</a>\n                        </p>\n                        <div class="price">\n                        {{#if pricing}} <span class="price">Free</span> <span class="federal"> federal</span>{{/if}}\n                        </div>\n                        <ul class="sub-links">\n                            <li class="state-add">\n                                <a href="#" class="js-poptip-state-add" rel="popover" data-placement="top" data-content=\'{{printStateAddPopOver pricing 512 "state"}}\'>State additional</a>\n                                {{#if VTRecipeA}} <i class="">New reduced price!</i>{{/if}}\n                            </li>\n                            <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n        {{#unless templateState.eliminatorDisableCompChart}}\n            {{> CompChart}}\n        {{/unless}}\n    </div>\n\n{{/if}}\n\n\n\n<div class="opt animate-hide" data-eliminator-result="basic">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n                <h3 class="headline"><strong>TurboTax Basic</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li class="previous-plus">Get everything in Federal Free Edition, plus:</li>\n                    <li>Get answers by phone or live chat</li>\n                    <li>Transfer last year\'s TurboTax return</li>\n                    <li>Get ongoing access to filed returns</li>\n                </ul>\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n                    <p>\n                        <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-2" href="#"\n                           data-productId="2">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 2 "fed" false true}} federal{{/if}}\n                    </div>\n\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a> | <span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                            <span class="phone-support">Support by phone </span><span\n                                class="chat-support">Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<div class="opt" data-eliminator-result="deluxe">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Deluxe</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n\n                    <li>Actively searches for homeowner tax breaks and 350+ deductions and credits</li>\n                    <li>Applies the maximum value of your charitable donations with ItsDeductible&trade;</li>\n                    <li>Extra coaching with reporting most independent contractor, freelance or 1099-MISC income</li>\n                    <li>Plus, an extra 10% bonus on top of your federal refund (<a href="#" class="arb-link js-arb-popup pop-arb">see offer details</a>)</li>\n\n                </ul>\n\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n                    <p>\n                        <a class="btn btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-16" href="#"\n                           data-productId="16">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 16 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 16 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class="opt  animate-hide" data-eliminator-result="premier">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Premier</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li>Get all the forms you need to report investment sales</li>\n                    <li>Calculate cost basis for all stock sales automatically</li>\n                    <li>Get tax-saving rental property deductions</li>\n                    <li>Helps you keep every investment dollar you deserve</li>\n                </ul>\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n\n                    <p>\n                        <a class="btn  btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-8" href="#" data-productId="8">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 8 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 8 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class="opt  animate-hide" data-eliminator-result="hb">\n    <div class="row">\n        <div class="info">\n            <div class="col-md-7 col-md-offset-1">\n\n                <h3 class="headline"><strong>TurboTax Home &amp; Business</strong> is right for you</h3>\n\n                <ul class="subhead-bullets">\n                    <li>File Schedule C for your business income</li>\n                    <li>Get every dollar from your business tax deductions</li>\n                    <li>Save time with simplified asset depreciation</li>\n                    <li>File both personal <em>and</em> small business taxes</li>\n                </ul>\n\n\n                <div class="divider"></div>\n            </div>\n            <div class="col-md-3">\n                <div class="recco-product">\n\n\n                    <p>\n                        <a class="btn btn-block btn-orange btn-large sendToProductOffering" data-ci="selector-32" href="#"\n                           data-productId="32">Start for Free</a>\n                    </p>\n\n                    <div class="price">\n                        {{#if pricing}} {{printPricing pricing 32 "fed" false true}} <span class="federal"> federal</span>{{/if}}\n                    </div>\n                    <ul class="sub-links">\n                        <li class="state-add">\n                            <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 32 "state"}}\' data-placement="top">State additional</a><span\n                                class="pay-file">Pay when you file*</span>\n                        </li>\n                        <li class="support-links">\n                           <span class="phone-support">\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png"\n                                 alt="Talk to a tax expert by phone"/>Support by phone </span>\n                            <span class="chat-support">\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png"\n                                 alt="Chat live with a tax expert"/>Live chat*</span>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<div class="opt animate-hide double military" data-eliminator-result="military">\n    <div class="row">\n        <div class="info">\n            <h2 class="headline">We recommend <strong>TurboTax Military Edition</strong></h2>\n\n            <p class="subhead">Plus, get an extra 10% on top of your federal refund <a href="" class="pop-arb">See offer\n                details</a></p>\n\n            <ul class="subhead-bullets">\n                <li>Get the military tax break you deserve</li>\n                <li>Guidance for military and civilian income</li>\n                <li>We search for military-related expenses</li>\n                <li>Helps determine your state of residence</li>\n            </ul>\n\n            <div class="recco-product">\n                <div class="row">\n                    <div class="col-md-3 col-md-offset-2">\n                        <h3>E1 &ndash; E5</h3>\n\n                        <p class="clear">\n                            <a class="btn btn-orange btn-large sendToProductOffering" data-ci="selector-4096" href="#"\n                               data-productId="4096">Start for Free</a>\n                        </p>\n\n                        <div class="price">\n                            {{#if pricing}} {{printPricing pricing 4096 "fed"}} Federal<span class="ast">*</span>{{/if}}\n                        </div>\n                        {{printPricing pricing 4096 "state"}}<span class="ast">*</span> <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 4096 "state"}}\' data-placement="top">state (optional)</a>\n                    </div>\n                    <div class="divider"></div>\n                    <div class="col-md-3 col-md-offset-2">\n                        <h3>E6 &ndash; E10 &amp; Officer</h3>\n\n                        <p class="clear">\n                            <a class="btn btn-orange btn-large sendToProductOffering" data-ci="selector-8192" href="#"\n                               data-productId="8192">Start for Free</a>\n                        </p>\n\n                        <div class="price">\n                            {{#if pricing}} {{printPricing pricing 8192 "fed"}} Federal<span class="ast">*</span>\n                            {{/if}}\n                        </div>\n                        <div class="state-add">\n                            {{printPricing pricing 8192 "state"}}<span class="ast">*</span> <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 8192 "state"}}\' data-placement="top">state (optional)</a>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n    </div>\n\n</div>\n\n\n\n{{#if templateState.isAllProductsButtonClicker}}\n{{> LineupFive}}\n{{else}}\n{{> LineupThree}}\n{{/if}}\n\n</section>\n\n{{#unless templateState.isAllProductsButtonClicker}}\n    <p style="text-align: center;font-weight: 400;text-size: 20px;font-size: 20px;margin: 1em 0 4px 0;">For small business income and expenses, TurboTax has you covered.</p>\n    <p style="text-align:center;margin-bottom:1em;">\n        <a class="js-hb-poptip">Learn more</a>\n    </p>\n\n    <div class="hb-callout" style="display:none">If you are a small business owner or a sole proprietor, start your return in TurboTax Premier. We’ll guide you along the way when it’s time to enter business income and expenses.</div>\n\n{{/unless}}\n\n\n{{> Disclaimer}}\n\n\n</div>\n\n'
}),define("text!templates/dashboard/LineupTwo.html", [], function () {
    return'<script type="text/javascript">\n\n\n    $(function () {\n\n        $(\'.pod-title\').on("touchstart, click", function (e) {\n            if (window.innerWidth < 768) {\n                $(this).parent(\'.product-pod\').toggleClass(\'expanded\');\n                e.preventDefault();\n            }\n        });\n\n        $(\'.js-poptip-phone\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.phone-content\').html(),\n            html: true\n        });\n        $(\'.js-poptip-chat\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.chat-content\').html(),\n            html: true\n        });\n\n    });\n\n\n\n</script>\n<style type="text/css">\n    .eliminator-new .headlines {\n        margin-top: 0;\n        margin-bottom: 30px;\n    }\n\n    @media (min-width: 768px) {\n        .lineup.two-col .col-sm10-2:first-child {\n            margin-left: 20%;\n        }\n\n        .col-sm10-2 {\n            width: 30%;\n        }\n    }\n</style>\n<div class="container lineup two-col">\n    <div class="row10">\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n\n            <!-- Free -->\n\n            <div class="product-pod free complex "  data-lineup-pod="free">\n                <h3 class="pod-title">Federal Free Edition</h3>\n                <div class="indent">\n                    <p class="description">Easy to use and file</p>\n                    <a data-link-id="596" id="freeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="512">Start for Free</a>\n                    <div class="pricing">\n                        <span class="price"> <span class="font-md">Free federal</span></span>\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 512 "state"  }}\' data-placement="top">State additional</a><br />\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n                            <li>Simple federal tax returns</li>\n                            <li>First-time filers or students</li>\n                            <li>Imports W-2 income data</li>\n                            <li>Tech support by live chat*</li>\n                        </ul>\n                    </div>\n\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                    </div>\n\n\n\n                </div>\n            </div>\n\n          </div>\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n\n            <!-- Deluxe -->\n\n\n            <div class="product-pod deluxe complex" data-lineup-pod="deluxe">\n\n                <h3 class="pod-title">Maximum Deductions</h3>\n                <div class="indent">\n                    <p class="description">Added support and guidance</p>\n                    <a data-link-id="600" id="deluxeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="16">Start for Free</a>\n                    <div class="pricing">\n                       Starting at {{printPricing pricing 16 "fed"}}*\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 16 "state"  }}\' data-placement="top">State additional</a><br />\n                            <span>Pay when you file*</span>\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n                            <li>Searches 350+ tax deductions & credits</li>\n                            <li>Investments & rental property income</li>\n                            <li>Personal & small business tax returns</li>\n                            <li>Support by live chat & phone*</li>\n                        </ul>\n                    </div>\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                        <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                        </a>\n                    </div>\n\n\n\n                </div>\n            </div>\n         </div>\n\n\n    </div>\n</div>\n\n<div class="chat-content" style="display:none">Chat live with a tax expert</div>\n<div class="phone-content" style="display:none">Talk to a tax expert by phone</div>\n'
}),define("text!templates/dashboard/LineupThree.html", [], function () {
    return'<script type="text/javascript">\n\n\n    $(function () {\n\n        $(\'.pod-title\').on("touchstart, click", function (e) {\n            if (window.innerWidth < 768) {\n                $(this).parent(\'.product-pod\').toggleClass(\'expanded\');\n                e.preventDefault();\n            }\n        });\n\n        $(\'.js-poptip-phone\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.phone-content\').html(),\n            html: true\n        });\n        $(\'.js-poptip-chat\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.chat-content\').html(),\n            html: true\n        });\n\n    });\n\n\n\n</script>\n\n\n<div class="container lineup three-col">\n    <div class="row10">\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n\n            <!-- Free -->\n\n            <div class="product-pod free complex "  data-lineup-pod="free">\n                <h3 class="pod-title">Free Edition</h3>\n                <div class="indent">\n                    <p class="description">Simple/1040EZ tax returns</p>\n                    <a data-link-id="596" id="freeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="512">Start for Free</a>\n                    <div class="pricing">\n                        <span class="price"> <span class="font-md">Free federal</span></span>\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 512 "state"  }}\' data-placement="top">State additional</a><br />\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n                            <li>I\'m a first-time filer or a student</li>\n                            <li>I want access to tech support by live chat*</li>\n                            <li>I want to import my W-2 income data</li>\n\n                        </ul>\n                        <p class="left"></p>\n                    </div>\n\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                    </div>\n\n\n\n                </div>\n            </div>\n\n          </div>\n        <div class="col-xs10-10 col-sm10-2 banner-popular">\n\n\n            <!-- Deluxe -->\n\n\n            <div class="product-pod deluxe complex" data-lineup-pod="deluxe">\n                <div class="popular-banner"><span>MOST POPULAR</span></div>\n                <h3 class="pod-title">Deluxe<img id="img-badge" src="/less/images/rue/flag-most-popular.png"/> </h3>\n                <div class="indent">\n                    <p class="description">Maximize your <br> tax deductions</p>\n                    <a data-link-id="600" id="deluxeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="16">Start for Free</a>\n                    <div class="pricing">\n                        {{printPricing pricing 16 "fed"}}*\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 16 "state"  }}\' data-placement="top">State additional</a><br />\n                            <span>Pay when you file*</span>\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n\n                            <li>I want extra guidance on 350+ deductions</li>\n                            <li>I need to claim homeowner tax deductions</li>\n                            <li>I have charitable donations to deduct</li>\n                            <li>I want ongoing access to my filed returns</li>\n\n                        </ul>\n                        <p class="left"><strong>Plus, covers everything in Free Edition</strong></p>\n                    </div>\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                        <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                        </a>\n                    </div>\n\n\n\n                </div>\n            </div>\n         </div>\n\n        <div class="col-xs10-10 col-sm10-2 banner">\n        <!-- Premier -->\n\n        <div class="product-pod premier complex " data-lineup-pod="premier">\n            <h3 class="pod-title">Premier</h3>\n            <div class="indent">\n                <p class="description">Investments and <br> rental property</p>\n                <a data-link-id="602" id="premierOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="8">Start for Free</a>\n                <div class="pricing">\n                    {{printPricing pricing 8 "fed"}}*\n                    <p class="callout">\n                        <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 8 "state"  }}\' data-placement="top">State additional</a>  <br />\n                        <span>Pay when you file*</span>\n                    </p>\n                </div>\n                <div class="even-height">\n                    <ul class="features">\n                        <li>I sold stock, ESPP, bonds or mutual funds</li>\n                        <li> I want automatic cost basis calculations</li>\n                        <li>I have rental property income and expenses</li>\n                    </ul>\n                    <p class="left"><strong>Plus, covers everything in Deluxe</strong></p>\n                </div>\n                <div class="support-icons">\n                    <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                        <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                    </a>\n                    <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                        <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                    </a>\n                </div>\n\n            </div>\n        </div>\n\n</div>\n\n    </div>\n</div>\n\n<div class="chat-content" style="display:none">Chat live with a tax expert</div>\n<div class="phone-content" style="display:none">Talk to a tax expert by phone</div>'
}),define("text!templates/dashboard/LineupFour.html", [], function () {
    return'<script type="text/javascript">\n\n\n    $(function () {\n\n        $(\'.pod-title\').on("touchstart, click", function (e) {\n            if (window.innerWidth < 768) {\n                $(this).parent(\'.product-pod\').toggleClass(\'expanded\');\n                e.preventDefault();\n            }\n        });\n\n        $(\'.js-poptip-phone\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.phone-content\').html(),\n            html: true\n        });\n        $(\'.js-poptip-chat\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.chat-content\').html(),\n            html: true\n        });\n\n    });\n\n\n\n</script>\n\n<div class="container lineup four-col">\n    <div class="row10">\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n\n            <!-- Free -->\n\n            <div class="product-pod free complex "  data-lineup-pod="free">\n                <h3 class="pod-title">Free Edition</h3>\n                <div class="indent">\n                    <p class="description">Simple/1040EZ tax returns</p>\n                    <a data-link-id="596" id="freeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="512">Start for Free</a>\n                    <div class="pricing">\n                        <span class="price"> <span class="font-md">Free federal</span></span>\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 512 "state"  }}\' data-placement="top">State additional</a><br />\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n                            <li>I\'m a first-time filer or a student</li>\n                            <li>I want access to tech support by live chat*</li>\n                            <li>I want to import my W-2 income data</li>\n                            {{#if templateState.yoyTest}}\n                                <li class="nobull"><p class="arb-box">Does not transfer<br class="visible-md"> last year\'s\n                                    tax return</p></li>\n                            {{else}}\n                                <li class="nobull"><p class="arb-box">Now transfers<br class="visible-md visible-lg"> last\n                                    year\'s tax return</p></li>\n                            {{/if}}\n                        </ul>\n                        <p class="left"></p>\n                    </div>\n\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                    </div>\n\n\n\n                </div>\n            </div>\n\n          </div>\n        <div class="col-xs10-10 col-sm10-2 banner-popular">\n\n\n            <!-- Deluxe -->\n\n\n            <div class="product-pod deluxe complex" data-lineup-pod="deluxe">\n                <div class="popular-banner"><span>MOST POPULAR</span></div>\n                <h3 class="pod-title">Deluxe<img id="img-badge" src="/less/images/rue/flag-most-popular.png"/> </h3>\n                <div class="indent">\n                    <p class="description">Maximize your <br> tax deductions</p>\n                    <a data-link-id="600" id="deluxeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="16">Start for Free</a>\n                    <div class="pricing">\n                        {{printPricing pricing 16 "fed"}}\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 16 "state"  }}\' data-placement="top">State additional</a><br />\n                            <span>Pay when you file*</span>\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n\n                            <li>I want extra guidance on 350+ deductions</li>\n                            <li>I need to claim homeowner tax deductions</li>\n                            <li>I have charitable donations to deduct</li>\n                            <li>I want ongoing access to my filed returns</li>\n\n                        </ul>\n                        <p class="left"><strong>Plus, covers everything in Free Edition</strong></p>\n                    </div>\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                        <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                        </a>\n                    </div>\n\n\n\n                </div>\n            </div>\n         </div>\n\n        <div class="col-xs10-10 col-sm10-2 banner">\n        <!-- Premier -->\n\n        <div class="product-pod premier complex " data-lineup-pod="premier">\n            <h3 class="pod-title">Premier</h3>\n            <div class="indent">\n                <p class="description">Investments and <br> rental property</p>\n                <a data-link-id="602" id="premierOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="8">Start for Free</a>\n                <div class="pricing">\n                    {{printPricing pricing 8 "fed"}}\n                    <p class="callout">\n                        <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 8 "state"  }}\' data-placement="top">State additional</a>  <br />\n                        <span>Pay when you file*</span>\n                    </p>\n                </div>\n                <div class="even-height">\n                    <ul class="features">\n                        <li>I sold stock, ESPP, bonds or mutual funds</li>\n                        <li> I want automatic cost basis calculations</li>\n                        <li>I have rental property income and expenses</li>\n                    </ul>\n                    <p class="left"><strong>Plus, covers everything in Deluxe</strong></p>\n                </div>\n                <div class="support-icons">\n                    <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                        <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                    </a>\n                    <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                        <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                    </a>\n                </div>\n\n            </div>\n        </div>\n\n</div>\n<div class="col-xs10-10 col-sm10-2 banner">\n\n\n    <!-- HomeBusiness -->\n\n    <div class="product-pod hb complex "  data-lineup-pod="hb">\n        <h3 class="pod-title">Home &amp; Business</h3>\n        <div class="indent">\n            <p class="description">Small business owner or sole proprietor</p>\n            <a data-link-id="604" id="hbOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="32">Start for Free</a>\n            <div class="pricing">\n                {{printPricing pricing 32 "fed"}}\n                <p class="callout">\n                    <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 32 "state"  }}\' data-placement="top">State additional</a><br />\n                    <span>Pay when you file*</span>\n                </p>\n            </div>\n            <div class="even-height">\n                <ul class="features">\n                    <li>I have profit or loss from a small or home business</li>\n                    <li>I have home office tax deductions</li>\n                    <li>I have small business asset depreciation</li>\n                </ul>\n                <p class="left"><strong>Plus, covers everything in Premier</strong></p>\n            </div>\n            <div class="support-icons">\n                <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                    <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                </a>\n                <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                    <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                </a>\n            </div>\n\n\n        </div>\n    </div>\n\n    </div>\n    </div>\n</div>\n\n<div class="chat-content" style="display:none">Chat live with a tax expert</div>\n<div class="phone-content" style="display:none">Talk to a tax expert by phone</div>'
}),define("text!templates/dashboard/LineupFive.html", [], function () {
    return'<script type="text/javascript">\n\n\n    $(function () {\n\n        $(\'.pod-title\').on("touchstart, click", function (e) {\n            if (window.innerWidth < 768) {\n                $(this).parent(\'.product-pod\').toggleClass(\'expanded\');\n                e.preventDefault();\n            }\n        });\n\n        $(\'.js-poptip-phone\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.phone-content\').html(),\n            html: true\n        });\n        $(\'.js-poptip-chat\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.chat-content\').html(),\n            html: true\n        });\n        $(\'[class^=".js-poptip"]\').click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n\n</script>\n\n<div class="lineup five-col">\n    <div class="row10">\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n\n            <!-- Free -->\n\n            <div class="product-pod free complex "  data-lineup-pod="free">\n                <h3 class="pod-title">Free Edition</h3>\n                <div class="indent">\n                    <p class="description">Simple/1040EZ tax returns</p>\n                    <a data-link-id="596" id="freeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="512">Start for Free</a>\n                    <div class="pricing">\n                        <span class="price"> <span class="font-md">Free federal</span></span>\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 512 "state"  }}\' data-placement="top">State additional</a>\n                            <br>\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n                            <li>I\'m a first-time filer or a student</li>\n                            <li>I want access to tech support by live chat*</li>\n                            <li>I want to import my W-2 income data</li>\n                            {{#if templateState.yoyTest}}\n                                <li class="nobull"><p class="arb-box">Does not transfer<br class="visible-md"> last year\'s\n                                    tax return</p></li>\n                            {{else}}\n                                <li class="nobull"><p class="arb-box">Now transfers<br class="visible-md visible-lg"> last\n                                    year\'s tax return</p></li>\n                            {{/if}}\n                        </ul>\n                        <p class="left"></p>\n                    </div>\n\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                    </div>\n\n\n                </div>\n            </div>\n\n        </div>\n\n\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n        <!-- Basic -->\n\n        <div class="product-pod basic complex" data-lineup-pod="basic">\n            <h3 class="pod-title">Basic</h3>\n            <div class="indent">\n                <p class="description">Added support and guidance</p>\n                <a data-link-id="600" id="basicOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="2">Start for Free</a>\n                <div class="pricing">\n                    {{printPricing pricing 2 "fed"}}\n                    <p class="callout">\n                        <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 2 "state"  }}\' data-placement="top">State additional</a> <br />\n                        <span>Pay when you file*</span>\n                    </p>\n                </div>\n\n                <div class="even-height">\n                    <ul class="features">\n                        <li>I want access to tech support by live chat and phone*</li>\n                        <li>I want ongoing access to my filed tax returns</li>\n                        <li>I have independent contractor income (1099-Misc)</li>\n\n                    </ul>\n                    <p class="left"><strong>Plus, covers everything in Free Edition</strong></p>\n                </div>\n\n                <div class="support-icons">\n                    <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                        <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                    </a>\n                    <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                        <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                    </a>\n                </div>\n\n            </div>\n\n         </div>\n\n    </div>\n\n        <div class="col-xs10-10 col-sm10-2 banner-popular">\n\n            <!-- Deluxe -->\n\n            <div class="product-pod deluxe complex "  data-lineup-pod="deluxe">\n                <div class="popular-banner"><span>MOST POPULAR</span></div>\n                <h3 class="pod-title">Deluxe<img id="img-badge" src="/less/images/rue/flag-most-popular.png"/> </h3>\n                <div class="indent">\n                    <p class="description">Maximize your <br> tax deductions</p>\n                    <a data-link-id="600" id="deluxeOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="16">Start for Free</a>\n                    <div class="pricing">\n                        {{printPricing pricing 16 "fed"}}\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 16 "state"  }}\' data-placement="top">State additional</a><br />\n                            <span>Pay when you file*</span>\n                        </p>\n                    </div>\n\n                    <div class="even-height">\n                        <ul class="features">\n\n                            <li>I want extra guidance on 350+ deductions</li>\n                            <li>I need to claim homeowner tax deductions</li>\n                            <li>I have charitable donations to deduct</li>\n                            <li>I want help to assess and reduce my risk of audit</li>\n\n                        </ul>\n                        <p class="left"><strong>Plus, covers everything in Basic</strong></p>\n                    </div>\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                        <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                        </a>\n                    </div>\n\n\n                </div>\n            </div>\n        </div>\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n\n            <!-- Premier -->\n\n            <div class="product-pod premier complex " data-lineup-pod="premier">\n                <h3 class="pod-title">Premier</h3>\n                <div class="indent">\n                    <p class="description">Investments and <br> rental property</p>\n                    <a data-link-id="602" id="premierOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="8">Start for Free</a>\n                    <div class="pricing">\n                        {{printPricing pricing 8 "fed"}}\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 8 "state"  }}\' data-placement="top">State additional</a><br />\n                            <span>Pay when you file*</span>\n                        </p>\n                    </div>\n                    <div class="even-height">\n                        <ul class="features">\n                            <li>I sold stock, ESPP, bonds or mutual funds</li>\n                            <li> I want automatic cost basis calculations</li>\n                            <li>I have rental property income and expenses</li>\n                        </ul>\n                        <p class="left"><strong>Plus, covers everything in Deluxe</strong></p>\n                    </div>\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                        <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                        </a>\n                    </div>\n\n                </div>\n            </div>\n\n        </div>\n        <div class="col-xs10-10 col-sm10-2 banner">\n\n\n            <!-- HomeBusiness -->\n\n            <div class="product-pod hb complex "  data-lineup-pod="hb">\n                <h3 class="pod-title">Home &amp; Business</h3>\n                <div class="indent">\n                    <p class="description">Small business owner or sole proprietor</p>\n                    <a data-link-id="604" id="hbOnline" class="btn btn-blue btn-wide-sm sendToProductOffering" href="#" data-productId="32">Start for Free</a>\n                    <div class="pricing">\n                        {{printPricing pricing 32 "fed"}}\n                        <p class="callout">\n                            <a href="#" class="js-poptip-state-add" data-content=\'{{ printStateAddPopOver pricing 32 "state"  }}\' data-placement="top">State additional</a> <br />\n                            <span>Pay when you file*</span>\n                        </p>\n                    </div>\n                    <div class="even-height">\n                        <ul class="features">\n                            <li>I have profit or loss from a small or home business</li>\n                            <li>I have home office tax deductions</li>\n                            <li>I have small business asset depreciation</li>\n                        </ul>\n                        <p class="left"><strong>Plus, covers everything in Premier</strong></p>\n                    </div>\n                    <div class="support-icons">\n                        <a class="js-poptip-chat" href="#" data-placement="top"  data-content="Chat live with a tax expert" >\n                            <img class="chat-icon" src="/less/images/rue/icon-circle-chat.png" alt="Chat live with a tax expert">\n                        </a>\n                        <a class="js-poptip-phone" href="#" data-placement="top" data-content="Talk to a tax expert by phone" >\n                            <img class="phone-icon" src="/less/images/rue/icon-circle-phone.png" alt="Talk to a tax expert by phone">\n                        </a>\n                    </div>\n\n\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n\n<div class="chat-content" style="display:none">Chat live with a tax expert</div>\n<div class="phone-content" style="display:none">Talk to a tax expert by phone</div>'
}),define("text!templates/dashboard/Subnav.html", [], function () {
    return'{{#unless templateState.DSTestRecipeB }}\n<div id="actionMenuWrapper">\n    <div class="col-xs-12 reducedTopMargin">\n        <div id="topActionMenu" class="offseasonSecondiLinksWrap collapsedActions">\n            <span id="actionsText">Other things you can do</span><a href="javascript:void(0);"><img\n                src="/less/images/timeline-right.png" id="actionsIcon" class="inactive"></a>\n            <!--<a href="javascript:void(0)" id="ViewPriorYrReturns" class="offseasonSecondiLink first" style="font-size: 1.6rem;"><div class="offseasonSecondiLinkText col-xs-12">View prior year returns</div></a>-->\n            <!--<a href="#vault" class="offseasonSecondiLink">-->\n                <!--<div class="offseasonSecondiLinkText col-xs-12">Go to TurboTax Vault</div>-->\n            <!--</a>-->\n            <a href="http://{{ttcomDomain}}/commerce/account/secure/downloads_unlocks.jsp" class="offseasonSecondiLink"\n               target="_blank">\n                <div class="offseasonSecondiLinkText col-xs-12">Access CD/Download software</div>\n            </a>\n        </div>\n    </div>\n</div>\n\n{{/unless}}'
}),define("text!templates/dashboard/CompChart.html", [], function () {
    return'<script type="text/javascript">\n$(document).ready(function () {\n\n//togle nav dots\n$(\'.ccc-nav li\').click(function () {\n    if (!$(this).hasClass(\'active\')) {\n        $(\'.ccc-nav li\').toggleClass(\'active\');\n        $(\'.comp-chart-wrapper\').toggleClass(\'ccc2\');\n    }\n});\n\n//wrap dynamic dollar sign in span for styling\nif ($(\'#competitive-comp-chart .ttprice\').length != 0) {\n    var $temp = $(\'#competitive-comp-chart .ttprice\').html();\n    var $temp2 = $temp.replace(/\\$/g, \'<span class="dollar-sign">&#36;</span>\');\n    $("#competitive-comp-chart .ttprice").html($temp2);\n}\n\n\n});\n\n</script>\n\n\n<div class="row" id=competitive-comp-chart>\n<div class="col-xs-12 text-center nopad">\n\n\n<ul class="ccc-nav">\n    <li class="active"><span aria-hidden="true" class="TD-circle-full"></span></li>\n    <li><span aria-hidden="true" class="TD-circle-full"></span></li>\n</ul>\n\n<div class="comp-chart-wrapper"><!--\n-->\n    <div class="col details">\n        <table class="table">\n            <thead>\n            <tr class="row1">\n                <th></th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class="row2">\n                <td>Federal return price</td>\n            </tr>\n            {{#isStateSaleRowEligible pricing 512 "state"}}\n\n            <tr class="row3">\n                <td><strong>State return price</strong></td>\n            </tr>\n            {{/isStateSaleRowEligible}}\n\n            <tr class="row4">\n                <td>Automatically import your <span class="W2">W-2</span> income data</td>\n            </tr>\n            <tr class="row5">\n                <td>Free answers from a tax expert by phone</td>\n            </tr>\n            <tr class="row6">\n                <td><a class="js-arb-popup pop-arb" href="#"><strong>5&#37; bonus</strong> on top of your\n                    federal refund</a></td>\n            </tr>\n            </tbody>\n            <tfoot>\n            <tr class="row7">\n                <td></td>\n            </tr>\n\n            </tfoot>\n        </table>\n    </div><!--\n--><div class="col tt">\n        <table class="table">\n            <thead>\n            <tr class="row1">\n                <th>\n                    <p class="brand">TurboTax</p>\n\n                    <p class="ffe-text">Federal Free Edition</p>\n                </th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class="row2">\n                <td><span class="free">Free</span></td>\n            </tr>\n\n\n            {{#isStateSaleRowEligible pricing 512 "state"}}\n            <tr class="row3">\n                <td class="no-padding">\n                    <div class="lto">\n                        <strong>${{printPricing pricing 512 "state" \'priceOnly\'}}</strong>\n                        <img src="/less/images/rue/badge-green-limited.png" class="img-lto" alt="Limited Time Offer"/>\n                        <span class="lto-text limited">Limited</span>\n                    </div>\n                </td>\n            </tr>\n            {{/isStateSaleRowEligible}}\n            <tr class="row4">\n                <td><span aria-hidden="true" class="TD-check3"></span></td>\n            </tr>\n            <tr class="row5">\n                <td><span aria-hidden="true" class="TD-check3"></span></td>\n            </tr>\n            <tr class="row6">\n                <td class="no-padding">\n                    <div class="lto">\n                        <span aria-hidden="true" class="TD-check3"></span>\n                        <span class="exclusive">Exclusive</span>\n                    </div>\n                </td>\n            </tr>\n            </tbody>\n            <tfoot>\n            <tr class="row7">\n                <td class="best-value">Best Value</td>\n            </tr>\n\n            </tfoot>\n        </table>\n    </div><!--\n--><div class="col hrb">\n        <table class="table">\n            <thead>\n            <tr class="row1">\n                <th>\n                    <p class="brand">H&amp;R Block</p>\n\n                    <p class="ffe-text">Federal Free Edition</p>\n                </th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class="row2">\n                <td>Free</td>\n            </tr>\n            {{#isStateSaleRowEligible pricing 512 "state"}}\n            <tr class="row3">\n                <td><span class="dollar-sign">&#36;</span>27.99</td>\n            </tr>\n            {{/isStateSaleRowEligible}}\n\n            <tr class="row4">\n                <td><span aria-hidden="true" class="TD-x3"></span></td>\n            </tr>\n            <tr class="row5">\n                <td><span aria-hidden="true" class="TD-x3"></span></td>\n            </tr>\n            <tr class="row6">\n                <td><span aria-hidden="true" class="TD-x3"></span></td>\n            </tr>\n            </tbody>\n            <tfoot>\n            <tr class="row7">\n                <td></td>\n            </tr>\n\n            </tfoot>\n        </table>\n    </div><!--\n--><div class="col ta">\n        <table class="table">\n            <thead>\n            <tr class="row1">\n                <th>\n                    <p class="brand">TaxACT</p>\n\n                    <p class="ffe-text">Federal Free Edition</p>\n                </th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr class="row2">\n                <td>Free</td>\n            </tr>\n            {{#isStateSaleRowEligible pricing 512 "state"}}\n\n            <tr class="row3">\n                <td><span class="dollar-sign">&#36;</span>14.99</td>\n            </tr>\n            {{/isStateSaleRowEligible}}\n\n            <tr class="row4">\n                <td><span aria-hidden="true" class="TD-x3"></span></td>\n            </tr>\n            <tr class="row5">\n                <td><span aria-hidden="true" class="TD-x3"></span></td>\n            </tr>\n            <tr class="row6">\n                <td><span aria-hidden="true" class="TD-x3"></span></td>\n            </tr>\n            </tbody>\n            <tfoot>\n            <tr class="row7">\n                <td></td>\n            </tr>\n\n            </tfoot>\n        </table>\n    </div>\n</div>\n\n</div>\n<!--\n--></div>\n\n'
}),define("text!templates/dashboard/SkuRecco.html", [], function () {
    return'<style type="text/css">\n\n    .py-sched-c-light, .py-sched-c, .py-sched-a, .py-sched-d, .py-sched-e, .py-sched-f {\n        display: none\n    }\n\n</style>\n\n<script type="text/javascript">\n\n    $(function () {\n\n\n        $(\'.js-poptip-state-add\').popover({\n            animation: false,\n            trigger: \'hover\',\n            html:true\n        });\n\n        // SCHEDULES\n\n        $(\'.js-poptip-whats-this-py-sched-a\').popover({\n            animation: false,\n            content: $(\'.py-sched-a\').html(),\n            trigger: \'hover\',\n            html: true\n        });\n        $(\'.js-poptip-whats-this-py-sched-c-light\').popover({\n            animation: false,\n            content: $(\'.py-sched-c-light\').html(),\n            trigger: \'hover\',\n            html: true\n        });\n        $(\'.js-poptip-whats-this-py-sched-c\').popover({\n            animation: false,\n            content: $(\'.py-sched-c\').html(),\n            trigger: \'hover\',\n            html: true\n        });\n        $(\'.js-poptip-whats-this-py-sched-d\').popover({\n            animation: false,\n            content: $(\'.py-sched-d\').html(),\n            trigger: \'hover\',\n            html: true\n        });\n        $(\'.js-poptip-whats-this-py-sched-e\').popover({\n            animation: false,\n            content: $(\'.py-sched-e\').html(),\n            trigger: \'hover\',\n            html: true\n        });\n        $(\'.js-poptip-whats-this-py-sched-f\').popover({\n            animation: false,\n            content: $(\'.py-sched-f\').html(),\n            trigger: \'hover\',\n            html: true\n        });\n\n        $("[class^=js-poptip]").click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n\n</script>\n<div class="row dashboard-hero">\n\n    {{> Subnav}}\n    <div class="col-xs-12">\n        <!--<h1>My TurboTax</h1>-->\n\n        <div id="SkuReccoContainer" class="dashboard-hero-container">\n            <div class="row">\n                <div class="col-xs-12 col-sm-6">\n                    <h2 class="ns-h1">Welcome back{{#if globalModel.firstName}}, {{capitalizeAndTruncate\n                        globalModel.firstName 15}}{{/if}}</h2>\n                    {{#if templateState.scheduleRecco}}\n                    <p class="tagline">Based on your tax needs, TurboTax {{recommendationSku.name}} is right for\n                        you.</p>\n                    <hr/>\n                    <h2 class="ns-h1" style="font-size: 18px;">Here\'s why you need {{recommendationSku.name}}</h2>\n\n                    <!--\n                    {{#each TaxReturnDetail.pyAuthorityAmounts}}\n                        {{this.authority}} {{refundAmtDescriptor this.amount}} {{formatCurrency this.amount withChange}}\n                    {{/each}}\n                    -->\n\n\n                    {{#if templateState.scheduleCorF}}\n                    {{#if pyUserState.priorYearScheduleC}}\n                    <a href="#" class="js-poptip-whats-this-py-sched-c pull-right whatsthis" data-placement="left">What\'s\n                        this?</a></span>\n                    <p>You file a Schedule C and/or have business tax deductions. </p>\n\n                    {{/if}}\n                    {{#if pyUserState.priorYearScheduleF}}\n                    <a href="#" class="js-poptip-whats-this-py-sched-f pull-right whatsthis" data-placement="left">What\'s\n                        this?</a></span>\n                    <p>You file Schedule F and/or have profits or losses from farming. </p>\n                    {{/if}}\n                    {{else}}\n\n                    {{#if templateState.scheduleAorCLight }}\n                    {{#if pyUserState.priorYearScheduleCLight}}\n                    <a href="#" class="js-poptip-whats-this-py-sched-c-light pull-right whatsthis"\n                       data-placement="left">What\'s this?</a></span>\n                    <p>You file Schedule C-EZ for self-employment or personal business income and/or business\n                        profit.</p>\n                    {{/if}}\n\n                    {{/if}}\n\n                    {{#if templateState.scheduleDorE}}\n                    {{#if pyUserState.priorYearScheduleD}}\n                    <a href="#" class="js-poptip-whats-this-py-sched-d pull-right whatsthis" data-placement="left">What\'s\n                        this?</a></span>\n                    <p>You report capital gains/losses from the sale of stock, bonds, or mutual funds. </p>\n                    {{/if}}\n                    {{#if pyUserState.priorYearScheduleE}}\n                    <a href="#" class="js-poptip-whats-this-py-sched-e pull-right whatsthis" data-placement="left">What\'s\n                        this?</a></span>\n                    <p>You have income/loss to report from rental property, an estate, a trust, etc.</p>\n                    {{/if}}\n                    {{/if}}\n\n\n                    {{/if}}\n                    <hr/>\n\n                        {{#if TaxReturnDetail.pyAuthorityAmounts}}\n\n                            <h2 class="ns-h1" style="font-size:18px">Your 2012 Tax Return Summary:</h2>\n                            {{#each TaxReturnDetail.pyAuthorityAmounts}}\n                                <div class="col-xs-12">\n                                    <div class="row">\n\n                                        <div class="col-xs-8 bottom-dash">\n                                            <p class="dashboard-ns-hero-p">{{authority}} {{#if refundDue}}Refund{{else}}Tax\n                                                Balance{{/if}}</p>\n                                        </div>\n                                        <div class="col-xs-4 bottom-dash">\n                                            <p class="dashboard-ns-hero-p pull-right">{{formatCurrency amount false true}}</p>\n                                        </div>\n\n                                    </div>\n                                    <hr class="dashed-hr"/>\n                                </div>\n                            {{/each}}\n                        {{/if}}\n                    {{else}}\n                        <hr/>\n                        {{#if templateState.fedOverLimit}}\n                            <p class="tagline-large">Last year, you got a federal <strong>refund of {{formatCurrency templateState.fedAmount false true}}</strong> using TurboTax {{pyUserState.priorYearSku.name}}.</p>\n                            <p class="sub-tagline-large">Let\'s keep going with {{pyUserState.priorYearSku.name}} for {{templateState.taxYear}}, and we\'ll help you get every dollar you deserve. Imagine what you can do with your refund this year!</p>\n                        {{else}}\n                            <p class="tagline-large">Last year, TurboTax {{pyUserState.priorYearSku.name}} helped you get your taxes done right.</p>\n                            <p class="sub-tagline-large">Let\'s keep going with {{pyUserState.priorYearSku.name}} for {{templateState.taxYear}}, and we\'ll help you get every dollar you deserve.</p>\n                        {{/if}}\n\n\n\n\n                    {{/if}}\n\n\n\n\n                </div>\n                <div class="col-xs-12 col-sm-6">\n\n\n                    {{#if pyUserState.isMilitary}}\n                    <div class="dashboard-hero-colorbox military-recco">\n                        <h3><span class="embolden medium-block">E1 &ndash; E5</span></h3>\n                        {{#if pricing}}<span class="medium-block">{{printPricing pricing 4096 "fed"}} Federal</span>{{/if}}\n                        {{printPricing pricing 4096 "state"}} <a href="#" class="js-poptip-state-add"\n                                                                 data-content=\'{{printStateAddPopOver pricing 4096 "state"}}\'\n                                                                 data-placement="top">state (optional)</a>\n\n                        <div class="cta-wrap">\n                            <a class="btn btn-orange btn-medium btn-block ns-action-buttons sendToProductOffering"\n                               data-ci="strong-4096" href="#" data-productId="4096">Start with Military</a>\n                        </div>\n                        <hr style="color:#ccc">\n                        <h3><span class="embolden medium-block">E6 &ndash; E10 &amp; Officer</span></h3>\n                        {{#if pricing}}<span class="large">{{printPricing pricing 8192 "fed"}}  Federal</span>{{/if}}\n                        {{printPricing pricing 8192 "state"}} <a href="#" class="js-poptip-state-add"\n                                                                 data-content=\'{{printStateAddPopOver pricing 8192 "state"}}\'\n                                                                 data-placement="top">state (optional)</a>\n\n                        <div class="cta-wrap">\n                            <a class="btn btn-orange btn-medium btn-block ns-action-buttons sendToProductOffering"\n                               href="#" data-ci="strong-8192" data-productId="8192">Start with Military</a>\n                            <a class="select-product goToEliminator">Select a different product</a>\n\n                            <p class="plusMore">Plus, get an additional <strong>10% on top of your refund</strong></p>\n\n                            <a href="#" class="arb-link js-arb-popup pop-arb">See offer details</a>\n\n\n                        </div>\n\n                    </div>\n                    {{else}}\n                    <div class="dashboard-hero-colorbox">\n                        <h3><span class="embolden medium-block">TurboTax {{ recommendationSku.name }}</span>\n                            {{#unless templateState.scheduleRecco}}\n                            <span class="medium-block">is right for you</span>\n                            {{/unless}}\n                        </h3>\n                        {{#if pricing}}<span\n                            class="large">{{printPricing pricing recommendationSku.id "fed"}} Federal</span>{{/if}}\n                        <a href="#" class="js-poptip-state-add" data-content=\'{{printStateAddPopOver pricing recommendationSku.id "state"}}\' data-placement="top">State\n                            additional</a>\n\n                        <div class="cta-wrap">\n                            <a class="btn btn-orange btn-medium btn-block ns-action-buttons sendToProductOffering"\n                               href="#" data-ci="strong-{{recommendationSku.id}}"\n                               data-productId="{{recommendationSku.id}}">\n                                Start with {{ recommendationSku.name }}\n                            </a>\n                            <a class="select-product goToEliminator">Select a different product</a>\n\n                            <p class="plusMore">Plus, get an additional <strong>\n                                {{#if recommendationSku.isPremium }}\n                                10%\n                                {{else}} 5%\n                                {{/if}}\n                                on top of your refund</strong></p>\n\n                            <a href="#" class="arb-link js-arb-popup pop-arb">See offer details</a>\n                        </div>\n                    </div>\n\n                    {{/if}}\n\n                </div>\n            </div>\n\n        </div>\n\n\n        {{> Disclaimer}}\n\n    </div>\n</div>\n\n{{#if templateState.scheduleRecco}}\n<div class="py-sched-a">\n    When itemizing your deductions to get the biggest refund possible, you will need to file a <b>Schedule A</b>. This\n    form allows you to deduct a variety of deductions, which include a portion of your medical or dental expenses,\n    unreimbursed business expenses, interest, and other miscellaneous expenses. TurboTax Basic supports Schedule\n    A and more.\n</div>\n<div class="py-sched-c-light">\n    When reporting profit from a sole proprietorship or personal business where there are no other employees or\n    inventory, or another self-employed profession, you will need to file a <b>Schedule C-EZ</b> . TurboTax Basic\n    supports <b>Schedule C-EZ</b> and more.\n</div>\n<div class="py-sched-c">\n    When reporting income/losses from a small business or a self-employed profession, you will need to file a <b>Schedule\n    C</b>. This form is for filing a tax return for a small business, sole proprietor or a self-employed profession.\n    TurboTax Home & Business supports Schedule C and more.\n</div>\n<div class="py-sched-d">\n    When reporting capital gains/losses you will need to file a <b>Schedule D</b>. This form is for reporting the sales\n    or\n    exchange of stocks, bonds, mutual funds, employee stock plans, and other capital assets or gain distributions.\n    TurboTax Premier supports Schedule D and offers automatic calculations of capital gains/losses from\n    investments and\n    more.\n</div>\n<div class="py-sched-e">\n    When reporting income/loss from rental properties you will need to file a <b>Schedule E</b>. This form is for filing\n    a tax return with real estate rentals, trusts, partnerships, S corporations, royalties, estates, or residual\n    interests in\n    REMICs. TurboTax Premier supports Schedule E and more.\n</div>\n<div class="py-sched-f">\n    When reporting profits/losses from a farm or a self-employed farming profession, you will need to file a <b>Schedule\n    F</b>. This form is for self-employed farmers who are also considered to be sole proprietors. TurboTax Home &\n    Business supports Schedule F and more.\n</div>\n{{/if}}\n\n\n'
}),define("text!templates/dashboard/SkuRecco2.html", [], function () {
    return'<script type="text/javascript">\n\n    $(function () {\n\n        $(\'.js-poptip-whats-this\').popover({\n            animation: false,\n            content: $(\'.whats-this\').html(),\n            trigger: \'hover\',\n            html: true\n        });\n\n        $(\'.js-poptip-state-add\').popover({\n            animation: false,\n            trigger: \'hover\',\n            html:true\n        });\n\n        $(\'[class^=".js-poptip"]\').click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n\n</script>\n<div class="row dashboard-hero sku-recco-free">\n\n    {{> Subnav}}\n    <div class="col-xs-12">\n        <!--<h1>My TurboTax</h1>-->\n\n        <div id="SkuReccoContainer" class="dashboard-hero-container">\n            <div class="row">\n                <div class="col-xs-12 col-sm-6">\n                    <h2 class="ns-h1">Welcome back{{#if globalModel.firstName}}, {{capitalizeAndTruncate\n                        globalModel.firstName 15}}{{/if}}</h2>\n                    {{#if templateState.yoyTest}}\n                       <p class="tagline">Based on your tax needs, TurboTax Basic is right for you. Basic transfers your information from last year so about <strong>30% of your tax return will already be done</strong>.</p>\n                    {{else}}\n                        <p class="tagline">Based on your tax needs, TurboTax Basic is right for you.</p>\n                    {{/if}}\n\n                    <hr/>\n                    <h2 class="ns-h1">Here\'s why you need Basic</h2>\n                    <a href="#" class="js-poptip-whats-this pull-right whatsthis" data-placement="top">What\'s\n                        this?</a></span>\n                    <p>You itemize your deductions to get your biggest possible refund.</p>\n\n\n                </div>\n\n                <div class="col-xs-12 col-sm-6">\n                    <div class="adjuster-right" style="background-color:#f5f6f8;">\n                        <h3><span class="embolden medium-block">TurboTax Basic</span></h3>\n                        {{#if pricing}}<span class="priceSection"><span class="large">{{printPricing pricing 2 "fed"}} Federal</span></span>{{/if}}\n                        <a href="#" class="js-poptip-state-add"  data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a>\n\n                        <div class="cta-wrap">\n                            <a class="btn btn-orange btn-medium btn-block ns-action-buttons sendToProductOffering"\n                               data-ci="strong-2" href="#"\n                               data-productId="2">Start with Basic</a>\n                        </div>\n                        <a class="btn btn-gray btn-medium btn-block btn-smaller ns-action-buttons goToEliminator">Select a different product</a>\n\n                        <p class="plusMore">Plus, get an additional <strong>5% on top of your refund</strong></p>\n                        <a href="#" class="arb-link js-arb-popup pop-arb">See offer details</a>\n                    </div>\n\n                </div>\n            </div>\n\n        </div>\n\n\n        {{> Disclaimer}}\n\n    </div>\n</div>\n\n\n\n\n<div class="whats-this" style="display:none">When itemizing your deductions to maximize your refund, you will need to\n    file a Schedule A. This form allows you to deduct a variety of deductions, which include a portion of your medical\n    or dental expenses, unreimbursed business expenses, interest, and other miscellaneous expenses. TurboTax Basic\n    supports Schedule A and more.\n</div>\n'
}),define("text!templates/dashboard/SkuReccoVTBasic.html", [], function () {
    return'<script type="text/javascript">\n\n    $(function(){\n        $(\'.js-poptip-whats-this\').popover({\n            animation: false,\n            trigger: \'hover\',\n            content: $(\'.whats-this\').html(),\n            html: true\n        });\n\n        $(\'.js-poptip-state-add\').popover({\n            animation: false,\n            trigger: \'hover\',\n            html:true\n        });\n\n        $(\'[class^=".js-poptip"]\').click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n\n</script>\n<div class="row dashboard-hero sku-recco-free">\n\n    {{> Subnav}}\n\n    <div class="col-xs-12">\n        <!--<h1>My TurboTax</h1>-->\n\n        <div id="SkuReccoContainer" class="dashboard-hero-container">\n            <div class="adjuster-left">\n            <div class="row">\n                <div class="col-xs-12">\n                    <h2 class="ns-h1">Welcome back{{#if globalModel.firstName}}, {{capitalizeAndTruncate globalModel.firstName 15}}{{/if}}</h2>\n                </div>\n\n            </div>\n            <div class="row">\n                <div class="col-xs-12 col-sm-6">\n\n                    <p class="large lead">Get a head start with TurboTax Basic. We\'ll transfer your information from\n                        last year so about <strong>30% of your tax return will already be done</strong>. </p>\n\n                    <hr>\n                    <h2 class="ns-h1">\n                        <strong>Choose Basic now</strong> and we will transfer:\n                    </h2>\n                            <ul>\n                                <li class="icn-personal">\n                                    <p class="large bold">Personal Info</p>\n                                    <p>50+ fields of info are ready to transfer</p>\n                                </li>\n                                <li class="icn-wages li-dashedTop">\n                                    <p class="large bold">Wages &amp; Income</p>\n                                    <p>Essential employer info is ready to transfer</p>\n                                </li>\n                                <li class="icn-deductions li-dashedTop">\n                                    <p class="large bold">Deductions &amp; Credits</p>\n\n                                    <p>We\'ll check last year\'s deductions and credits and search for more to ensure you\n                                        don\'t miss a thing</p>\n                                </li>\n                                <li class="icn-efile li-dashedTop">\n                                    <p class="large bold">E-file</p>\n\n                                    <p><i>We will transfer last year\'s adjusted gross income (AGI) and <br\n                                            class="visible-lg"/>PIN - required for e-file</i></p>\n                                </li>\n                            </ul>\n                            <p class="icn-align">(You will be able to edit your info later)</p>\n                    </div>\n                <div class="col-xs-12 col-sm-offset-1 col-sm-5">\n                    <div class="adjuster-right">\n                    <h3><span class="embolden medium-block">TurboTax Basic</span></h3>\n                        <span class="priceSection">{{#if pricing}}<span class="large">{{printPricing pricing 2 "fed"}} Federal</span>{{/if}}\n                        <a href="#" class="js-poptip-state-add" data-content=\'{{printStateAddPopOver pricing 2 "state"}}\' data-placement="top">State additional</a></span>\n\n                        <div class="cta-wrap">\n                            <a class="btn btn-orange btn-medium btn-block ns-action-buttons sendToProductOffering" data-ci="strong-2" href="#"\n                               data-productId="2">Transfer my info with Basic</a>\n                        </div>\n                        <a class="btn btn-gray btn-medium btn-block btn-smaller ns-action-buttons goToEliminator">Select a different product</a>\n                        <p class="plusMore">Plus, get an additional <strong>5% on top of your refund</strong></p>\n                        <a href="#" class="arb-link js-arb-popup pop-arb">See offer details</a>\n                    </div>\n                </div>\n                </div>\n\n            </div>\n\n        </div>\n\n\n        {{> Disclaimer}}\n\n    </div>\n</div>\n\n<div style="display:none" class="whats-this">When itemizing your deductions to maximize your refund, you will need to file a Schedule A. This\n    form allows you to deduct a variety of deductions, which include a portion of your medical or dental expenses,\n    unreimbursed business expenses, interest, and other miscellaneous expenses. TurboTax Basic supports Schedule A and\n    more.\n</div>\n'
}),define("text!templates/dashboard/SkuReccoVTBasic2.html", [], function () {
    return'<script type="text/javascript">\n\n    $(function(){\n        $(\'.js-poptip-state-add\').popover({\n            animation: false,\n            trigger: \'hover\',\n            html:true\n        });\n\n        $(\'[class^=".js-poptip"]\').click(function (e) {\n            e.preventDefault();\n        });\n    });\n\n\n</script>\n<div class="row dashboard-hero sku-recco-free">\n\n    {{> Subnav}}\n\n    <div class="col-xs-12">\n        <!--<h1>My TurboTax</h1>-->\n\n        <div id="SkuReccoContainer" class="dashboard-hero-container">\n            <div class="adjuster-left">\n                <div class="row">\n                    <div class="col-xs-12">\n                        <h2 class="ns-h1">Welcome back{{#if globalModel.firstName}}, {{capitalizeAndTruncate globalModel.firstName 15}}{{/if}}</h2>\n                    </div>\n\n                </div>\n                <div class="row">\n                    <div class="col-xs-12 col-sm-6">\n                        {{#if pyUserState.isFFA}}\n                        <p class="large lead">Based on your tax needs, TurboTax Federal Free Edition is right for you.</p>\n                        {{else}}\n                        <p class="large lead">Last year, TurboTax Federal Free Edition helped you get your taxes done right. Let’s do the same this year!</p>\n                        {{/if}}\n\n                        <hr>\n                        <h2 class="ns-h1">\n                            Now, get even more value with TurboTax Free Edition\n                        </h2>\n                        <ul>\n                            {{#unless templateState.FFATransferNotSupported}}\n                            <li class="icn-transfer">\n                                <p class="large bold">Transfer last year\'s tax return</p>\n                                <p><i>30% of your tax return will already be done</i></p>\n                            </li>\n                            {{/unless}}\n                            <li class="icn-w2 li-dashedTop">\n                                <p class="large bold">Import your W-2</p>\n                                <p><i>Quickly and accurately import your W-2 info</i></p>\n                            </li>\n                            <li class="icn-money li-dashedTop">\n                                <p class="large bold">Get more money</p>\n                                <p>\n                                    <i>Get an additional 5% on top of your federal refund</i>\n                                    <br/>\n                                    <a href="#" class="arb-link js-arb-popup pop-arb">See offer details</a>\n                                </p>\n                            </li>\n\n                        </ul>\n                    </div>\n                    <div class="col-xs-12 col-sm-offset-1  col-sm-5">\n                        <div class="adjuster-right" style="background-color:#f5f6f8;">\n                            <h3><span class="embolden medium-block"><strong>TurboTax Federal Free Edition</strong></span></h3>\n                        <span class="priceSection">{{#if pricing}}<span class="large">$0 Federal</span>{{/if}} <br>\n                        <a href="#" class="js-poptip-state-add" data-content=\'{{printStateAddPopOver pricing 512 "state"}}\' data-placement="top">State additional</a></span>\n\n                            <div class="cta-wrap">\n                                <a class="btn btn-orange btn-medium btn-block ns-action-buttons sendToProductOffering" data-ci="strong-512" href="#"\n                                   data-productId="512">Start with Free</a>\n                            </div>\n                            <a class="btn btn-gray btn-medium btn-block btn-smaller ns-action-buttons goToEliminator">Select a different product</a>\n\n\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n\n\n        {{> Disclaimer}}\n\n    </div>\n\n</div>\n'
}),define("text!templates/dashboard/InProgress.html", [], function () {
    return'<div class="row dashboard-hero">\n    <div class="dashboard-colorizer"></div>\n    <div class="col-xs-12">\n        <h1>My TurboTax</h1>\n        <p class="tagline">Let\'s get your taxes done right.</p>\n        <div class="row dashboard-row">\n            <div class="col-xs-12">\n                <p class="dashboard-hero-p">\n                    <a href="#" data-ci="continue" class="btn btn-large btn-orange small-block topSpace sendToProductOffering spacer-right">Get Started</a><span> Have questions? <a href="javascript:void(0);" onclick="focusSearchBar()">We\'ve got answers</a>.</span>\n                </p>\n            </div>\n        </div>\n    </div>\n    <div class="col-xs-12">\n        <hr class="secondaryActionDivider"/>\n        <div class="offseasonSecondiLinksWrap">\n            <a href="#" class="offseasonSecondiLink"><span class="glyphicon glyphicon-eye-open"></span> <span class="offseasonSecondiLinkText">View prior year returns</span></a>\n        </div>\n    </div>\n</div>\n'
}),define("text!templates/dashboard/Disclaimer.html", [], function () {
    return'<script type="text/javascript">\n    $(\'.disc-collapse-btn\').click(function(){\n        $(\'.disc-items\').toggleClass(\'expanded\');\n        $(\'.disc-items\').toggleClass(\'collapsed\');\n    })\n</script>\n\n\n<div class="row offers-disclaimer">\n    <div class="col-md-12">\n        <p class="disc-collapse-btn"><strong>* Important Offer Details and Disclosures</strong><span class="icon-circle-arrow-down"></span></p>\n        <ul class="disc-items collapsed">\n            <li><b>Try for Free/Pay When You File:</b> TurboTax Online pricing is based on your tax situation and varies by product. Actual prices are determined at the time of print or efile and are subject to change without notice.</li>\n\n            <li><strong>About our Customer Support Agents:</strong> Tech and product support (phone & chat) hours vary by time of year. Phone not available in Free Edition.</li>\n        </ul>\n    </div>\n</div>'
}),define("views/widgets/dashboard/RUEDashboardWidget", ["base/WidgetView", "models/TaxReturnDetail", "models/UserState", "models/PriorYearUserState", "models/PricingDetails", "modules/vault/models/TaxDocuments", "text!templates/dashboard/Eliminator.html", "text!templates/dashboard/EliminatorTwo.html", "text!templates/dashboard/EliminatorThree.html", "text!templates/dashboard/LineupTwo.html", "text!templates/dashboard/LineupThree.html", "text!templates/dashboard/LineupFour.html", "text!templates/dashboard/LineupFive.html", "text!templates/dashboard/Subnav.html", "text!templates/dashboard/CompChart.html", "text!templates/dashboard/SkuRecco.html", "text!templates/dashboard/SkuRecco2.html", "text!templates/dashboard/SkuReccoVTBasic.html", "text!templates/dashboard/SkuReccoVTBasic2.html", "text!templates/dashboard/InProgress.html", "text!templates/dashboard/Disclaimer.html", "views/widgets/PopFlipWidget"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E) {
    try {
        var S = e.extend({name: "RUEDashboardWidget", pyUserState: [], taxReturnDetail: [], pricingDetail: [], templateState: {taxYear: appVars.taxYear}, recommendationSku: [], analyticsConfig: [], events: {"click .goToEliminator": "goToEliminator", "click .goToSkuRecco": "goToSkuRecco", "click .pop-arb": "popupArb", "click .offseasonSecondiLinksWrap": "actionMenuAction", "click .js-eliminator-btn": "eliminatorAnalytics", "click #elim-form input": "eliminatorAnalytics", "click #ViewPriorYrReturns": "viewPriorYearReturns"}, initialize: function () {
            try {
                e.prototype.initialize.apply(this, arguments), Handlebars.registerPartial("LineupTwo", f), Handlebars.registerPartial("LineupThree", l), Handlebars.registerPartial("LineupFour", c), Handlebars.registerPartial("LineupFive", h), Handlebars.registerPartial("Subnav", p), Handlebars.registerPartial("CompChart", d), Handlebars.registerPartial("Disclaimer", w), Handlebars.registerPartial("LineupFour", c), Handlebars.registerPartial("LineupFive", h), Handlebars.registerPartial("Subnav", p), Handlebars.registerPartial("CompChart", d), Handlebars.registerPartial("Disclaimer", w), this.catchAllTemplate = app.templateFactory.getTemplate("templates/dashboard/Eliminator", o), this.bizModelTest = this.bizModelTestLogic(this.getPriorityCode());
                if (this.bizModelTest === "RecipeB" || this.bizModelTest === "RecipeD")this.catchAllTemplate = app.templateFactory.getTemplate("templates/dashboard/EliminatorThree", a);
                this.bizModelTest === "RecipeC" && (this.catchAllTemplate = app.templateFactory.getTemplate("templates/dashboard/EliminatorTwo", u)), this.template = this.catchAllTemplate, this.skuRecco = app.templateFactory.getTemplate("templates/dashboard/SkuRecco", v), this.skuRecco2 = app.templateFactory.getTemplate("templates/dashboard/SkuRecco2", m), this.skuReccoVTBasic = app.templateFactory.getTemplate("templates/dashboard/SkuReccoVTBasic", g), this.skuReccoVTBasic2 = app.templateFactory.getTemplate("templates/dashboard/SkuReccoVTBasic2", y), this.inProgress = app.templateFactory.getTemplate("templates/dashboard/InProgress", b), this.yoyTest = this.yoyTestLogic(this.getPriorityCode()), experiences = [], experiences.eliminator = [], experiences.RUEShared = [], experiences.eliminator.currentProduct = "";
                var t = this.getInProgressSku();
                t && t != "512" ? (this.template = this.inProgress, this.analyticsConfig.version = "RetPaidSel") : this.getInProgressSku() == "512" && (this.template = this.inProgress, this.analyticsConfig.version = "RetFreeSel", this.analyticsConfig.recommendation = [512]), this.render()
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=RUEDashboardWidget.initialize error="' + n + '"'), n
            }
        }, popupArb: function (e) {
            e.preventDefault(), this.popupArbInstance = new E({launcher: e.currentTarget, autoOpen: !0, frame: "PopupFrameNoArrow", className: "popupArb", content: "PopupArb"}), this.children.push(this.popupArbInstance)
        }, render: function () {
            return app.dataRegistry.fetch({modelClass: i, load: "getPricingDetails", noLoading: !0, success: this.onPricingDetailsLoadSuccess, error: function (e) {
                logger.error("Pricing error:" + e.errorStatus.description), this.getTaxReturnDetail()
            }, context: this}), this
        }, getTaxReturnDetail: function () {
            app.dataRegistry.fetch({modelClass: t, load: "getTaxReturnsDetail", noLoading: !0, success: this.onTaxReturnDetailLoadSuccess, error: this.onTaxReturnDetailLoadError, context: this})
        }, onTaxReturnDetailLoadError: function (e) {
            this.templateLoader("error")
        }, onTaxReturnDetailLoadSuccess: function (e) {
            try {
                this.taxReturnDetail = e;
                var t = this, n = e.getPriorYearTaxReturn();
                if (n != null) {
                    var i = n.get("filingInfos").getCondensedSortedFilings(), o = [], u, a, f, l, c;
                    for (var h = 0; h < i.length; h++)f = i[h], f.isEfiledAccepted() && (u = f.get("taxAuthority"), a = f.get("refundInfo").get("refundOrPaymentAmount"), l = a <= 0, o.push({authority: u, amount: a, refundDue: l}));
                    o.length > 0 && (c = o.shift(), logger.log(c.amount), c.amount <= -100 && (this.templateState.fedAmount = c.amount, this.templateState.fedOverLimit = !0), o = _.sortBy(o, "authority"), o.unshift(c), this.taxReturnDetail.set("pyAuthorityAmounts", o));
                    var p = e.getPriorYearTaxReturnIdNotSnapTax();
                    app.dataRegistry.fetch({modelClass: r, load: "getPriorYearUserState", noLoading: !0, loadOptions: {taxDocumentId: p}, cache: !0, success: this.onPriorYearUserStateLoadSuccess, error: this.onPriorYearUserStateLoadError, context: t}), logger.log(this.taxReturnDetail)
                } else this.templateLoader("error"), app.dataRegistry.fetch({modelClass: s, load: "getTaxDocuments", cache: !1, noLoading: !0, loadOptions: {}, success: function (e) {
                    e && e.models && e.models.length && ($(".headlines h2").html("We have your W-2 info. Now, help us find the right TurboTax product for you"), app.integration.skipDispatcher = !0)
                }, error: function (e) {
                    logger.error("ListTaxDocuments error:" + e.errorStatus.description)
                }, context: this})
            } catch (d) {
                throw logger && logger.error('JavaScriptException: func=RUEDashboardWidget.onTaxReturnDetailLoadSuccess error="' + d + '"'), d
            }
        }, onPricingDetailsLoadSuccess: function (e) {
            this.pricing = e.getStandardItemPrices(), this.getTaxReturnDetail()
        }, onPriorYearUserStateLoadError: function () {
            this.analytics(this.analyticsConfig), this.templateLoader("error")
        }, onPriorYearUserStateLoadSuccess: function (e) {
            this.pyUserState = e, this.templateChooser()
        }, getInProgressSku: function () {
            var e = mytt.$.cookie("productid");
            return logger.log("Product ID: " + e), _.isEmpty(e) ? !1 : e
        }, getPriorityCode: function () {
            var e = mytt.$.cookie("priorityCode");
            return logger.log("Priority Code: " + e), _.isEmpty(e) ? !1 : e
        }, scheduleBackTestLogic: function (e) {
            switch (e) {
                case"1860500000":
                    break;
                case"1860600000":
                    return"RecipeB";
                case"1860700000":
                    return"RecipeC";
                case"1861100000":
                    return"RecipeD"
            }
        }, bizModelTestLogic: function (e) {
            switch (e) {
                case"1862100000":
                    break;
                case"1862000000":
                    return"RecipeB";
                case"1861900000":
                    return"RecipeC";
                case"1861800000":
                    return"RecipeD"
            }
        }, yoyTestLogic: function (e) {
            switch (e) {
                case"1861100000":
                    return this.templateState.yoyTest = !0, "RecipeB"
            }
        }, templateChooser: function () {
            try {
                this.afterHBScheduleRecco = !1, this.afterPremierScheduleRecco = !1;
                var e = this.getInProgressSku(), t = this.scheduleBackTestLogic(this.getPriorityCode());
                logger.log("in progress" + e), e && e != "512" ? (this.template = this.inProgress, this.analyticsConfig.version = "RetPaidSel") : this.getInProgressSku() == "512" ? (this.template = this.inProgress, this.analyticsConfig.version = "RetFreeSel", this.analyticsConfig.recommendation = [512]) : this.pyUserState.get("priorYearComplete") === !0 && (this.pyUserState.isMilitary() && e != "512" ? (this.templateState.isMilitary = !0, this.template = this.skuRecco, this.analyticsConfig.recommendation = [8192, 4096], this.analyticsConfig.version = "PYPaidSame") : this.pyUserState.isFFA() && e != "512" ? (this.templateState.FFATransferNotSupported = !0, this.template = this.skuReccoVTBasic2, this.analyticsConfig.recommendation = [512], this.analyticsConfig.version = "PYFFA") : (this.pyUserState.get("priorYearScheduleC") || this.pyUserState.get("priorYearScheduleF")) && t !== "RecipeB" ? (this.recommendationSku = {id: 32, name: "Home & Business"}, this.templateState.scheduleCorF = !0, this.templateState.scheduleRecco = !0, this.template = this.skuRecco, this.analyticsConfig.recommendation = [32], this.analyticsConfig.version = "PYTradeUp", this.pyUserState.get("priorYearScheduleC") && (this.analyticsConfig.version = this.analyticsConfig.version + "C"), this.pyUserState.get("priorYearScheduleF") && (this.analyticsConfig.version = this.analyticsConfig.version + "F")) : this.pyUserState.isPremier() && e != "512" ? (this.recommendationSku = {id: 8, name: "Premier"}, this.template = this.skuRecco, this.analyticsConfig.recommendation = [8], this.analyticsConfig.version = "PYPaidSame", this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : (this.pyUserState.get("priorYearScheduleD") || this.pyUserState.get("priorYearScheduleE")) && t !== "RecipeC" ? (this.recommendationSku = {id: 8, name: "Premier"}, this.templateState.scheduleDorE = !0, this.templateState.scheduleRecco = !0, this.template = this.skuRecco, this.analyticsConfig.recommendation = [8], this.analyticsConfig.version = "PYTradeUp", this.pyUserState.get("priorYearScheduleD") && (this.analyticsConfig.version = this.analyticsConfig.version + "D"), this.pyUserState.get("priorYearScheduleE") && (this.analyticsConfig.version = this.analyticsConfig.version + "E"), this.afterHBScheduleRecco = !0) : this.pyUserState.isDeluxe() && e != "512" ? (this.recommendationSku = {id: 16, name: "Deluxe"}, this.template = this.skuRecco, this.analyticsConfig.recommendation = [16], this.analyticsConfig.version = "PYPaidSame", this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : this.pyUserState.isBasic() && e != "512" ? (this.recommendationSku = {id: 2, name: "Basic"}, this.template = this.skuRecco, this.analyticsConfig.recommendation = [2], this.analyticsConfig.version = "PYPaidSame", this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : this.pyUserState.get("priorYearScheduleCLight") && this.pyUserState.isHB() ? (this.recommendationSku = {id: 2, name: "Basic"}, this.templateState.scheduleAorCLight = !0, this.templateState.scheduleRecco = !0, this.template = this.skuRecco, this.analyticsConfig.recommendation = [2], this.analyticsConfig.version = "PYTradeUp", this.pyUserState.get("priorYearScheduleCLight") && (this.analyticsConfig.version = this.analyticsConfig.version + "Cl"), this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : this.pyUserState.isFree() && this.yoyTest === "RecipeB" ? this.pyUserState.get("priorYearScheduleA") ? (this.recommendationSku = {id: 2, name: "Basic"}, this.templateState.scheduleRecco = !0, this.template = this.skuRecco2, this.analyticsConfig.recommendation = [2], this.analyticsConfig.version = "PYFreeSchA", this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : (this.templateState.FFATransferNotSupported = !0, this.template = this.skuReccoVTBasic, this.analyticsConfig.recommendation = [2], this.analyticsConfig.version = "PYBasic", this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : this.pyUserState.isFree() ? this.pyUserState.get("priorYearScheduleA") ? (this.recommendationSku = {id: 2, name: "Basic"}, this.templateState.scheduleRecco = !0, this.template = this.skuRecco2, this.analyticsConfig.recommendation = [2], this.analyticsConfig.version = "PYFreeSchA", this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : (this.template = this.skuReccoVTBasic2, this.analyticsConfig.recommendation = [512], this.analyticsConfig.version = "PYFree", this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0) : (this.afterHBScheduleRecco = !0, this.afterPremierScheduleRecco = !0));
                if (typeof this.recommendationSku.id != "undefined") {
                    if (this.recommendationSku.id == "8" || this.recommendationSku.id == "16" || this.recommendationSku.id == "32")this.recommendationSku.isPremium = !0;
                    logger.log("recommendationSku: " + this.recommendationSku)
                }
                t === "RecipeB" && this.afterHBScheduleRecco && (this.pyUserState.get("priorYearScheduleC") || this.pyUserState.get("priorYearScheduleF")) && (this.analyticsConfig.recommendation instanceof Array ? this.analyticsConfig.recommendation.push("32-skipped") : this.analyticsConfig.recommendation = ["32-skipped"]), t === "RecipeC" && this.afterPremierScheduleRecco && (this.pyUserState.get("priorYearScheduleD") || this.pyUserState.get("priorYearScheduleE")) && (this.analyticsConfig.recommendation instanceof Array ? this.analyticsConfig.recommendation.push("8-skipped") : this.analyticsConfig.recommendation = ["8-skipped"]), this.templateLoader("default")
            } catch (n) {
                throw logger && logger.error('JavaScriptException: func=RUEDashboardWidget.templateChooser error="' + n + '"'), n
            }
        }, templateLoader: function (e) {
            try {
                var t, n, r = !1, i = {templateState: this.templateState, pricing: this.pricing};
                switch (e) {
                    case"eliminator":
                        t = {TaxReturnDetail: this.taxReturnDetail.toJSON(), pyUserState: this.pyUserState.toJSON()}, r = !0, this.template = this.catchAllTemplate;
                        break;
                    case"error":
                        t = {globalModel: this.model.toJSON(), recommendationSku: this.recommendationSku};
                        break;
                    case"default":
                        t = {globalModel: this.model.toJSON(), recommendationSku: this.recommendationSku, TaxReturnDetail: this.taxReturnDetail.toJSON(), pyUserState: this.pyUserState.toJSON()}
                }
                this.analytics(this.analyticsConfig, r), t = $.extend({}, i, t), this.$el.html(this.template(t))
            } catch (s) {
                throw logger && logger.error('JavaScriptException: func=RUEDashboardWidget.templateLoader error="' + s + '"'), s
            }
            app.isMobile || app.trigger("beginAnimation.dashboard")
        }, goToEliminator: function (e) {
            this.templateState.isAllProductsButtonClicker = !0, this.templateLoader("eliminator"), e.preventDefault()
        }, goToSkuRecco: function (e) {
            location.reload(!1)
        }, actionMenuAction: function (e) {
            if ($(".offseasonSecondiLinksWrap").hasClass("collapsedActions") && !$(".offseasonSecondiLink").is(":visible"))return $(".offseasonSecondiLinksWrap").removeClass("collapsedActions"), $(".offseasonSecondiLink").addClass("isVisible"), $("#actionsIcon").attr("src", "/less/images/timeline-down.png"), !0;
            if (!$(".offseasonSecondiLinksWrap").hasClass("collapsedActions") && $("#actionsIcon").is(":visible") && $(".offseasonSecondiLink").is(":visible"))return $(".offseasonSecondiLinksWrap").addClass("collapsedActions"), $(".offseasonSecondiLink").removeClass("isVisible"), $("#actionsIcon").attr("src", "/less/images/timeline-right.png"), !0
        }, analytics: function (e, t) {
            try {
                var n = this, r = {ttcomProduct: "", version: "NoReco", recommendation: "", checkboxes: "", userstate: mytt.c.filingStates.NOT_STARTED + "|" + "SKU_SELECTOR", pyUserState: this.pyUserState || {}};
                t && (this.analyticsConfig.version = "SKUSelU", n.analyticsConfig.checkboxes = "", $("#elim-form input:checked").each(function () {
                    n.analyticsConfig.checkboxes = $(this).attr("id") + "|" + n.analyticsConfig.checkboxes
                }), this.analyticsConfig.recommendation ? this.analyticsConfig.recommendation = this.analyticsConfig.recommendation.concat(experiences.eliminator.currentProduct) : experiences.eliminator.currentProduct && (this.analyticsConfig.recommendation = experiences.eliminator.currentProduct)), n.analyticsConfig = $.extend({}, r, e), app.trigger("ProductOfferingView", n.analyticsConfig)
            } catch (i) {
                throw logger && logger.error('JavaScriptException: func=RUEDashboardWidget.analytics error="' + i + '"'), i
            }
        }, popTip: function () {
            $(".js-poptip").popover(), $(".js-poptip").click(function (e) {
                e.preventDefault()
            })
        }, viewPriorYearReturns: function () {
            var e = $("#timeline-wrapper").offset().top - 125;
            $("html").hasClass("touch") ? $(window).scrollTop(e) : $("html, body").animate({scrollTop: e}, 1e3)
        }});
        return S
    } catch (x) {
        throw logger && logger.error('JavaScriptException: func=RUEDashboardWidget.define error="' + x + '"'), x
    }
}),define("text!templates/dashboard/TTOInProgress.html", [], function () {
    return'<div class="row dashboard-hero">\n    <div id="current-year-returns-list" >\n        <div class="row dashboard-row">\n            <div class="col-xs-8 small-block">\n                <p class="dashboard-hero-p in-progress-p small-block">Just a quick reminder, we’re here to help you get your taxes done right. To call, chat or ask our community of experts, type a question above to get started.</p>\n\n                    <a href="#" class="btn btn-large btn-orange small-block topSpace sendToProductOffering in-progress-button">Continue your {{TAX_YEAR}} taxes</a>\n                </p>\n            </div>\n            <div class="col-xs-3 in-progress-p small-block">\n                <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/warmth.png" class="in-progress-warmth-img">\n            </div>\n        </div>\n    </div>\n\n\n</div>\n'
}),define("views/widgets/dashboard/TTOInProgressWidget", ["base/WidgetView", "views/widgets/dashboard/ReturnWidget", "views/widgets/PopFlipWidget", "models/TaxReturnDetail", "text!templates/dashboard/TTOInProgress.html", "views/widgets/SecondaryActionsWidget"], function (e, t, n, r, i, s) {
    var o = e.extend({name: "TTOInProgressWidget", events: {"click #ViewPriorYrReturns": "viewPriorYearReturns", "click  .amendLinkTaxReturn": "amendPopup"}, initialize: function () {
        this.model.rejectedState = !1, this.model.pendingState = !1, e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("template/dashboard/TTOInProgress", i)
    }, render: function () {
        logger.info("TTOInProgressWidget:render"), this.$el.html(this.template(this.model.toJSON()));
        var e = ["accountinfo"];
        this.secondaryActions = new s($("div.row.dashboard-hero"), e, this.model), app.isMobile || app.trigger("beginAnimation.dashboard")
    }, amendPopup: function (e) {
        e.preventDefault();
        var t = new Date, i = ~~appVars.taxYear, s = i + 1, o = i, u = appVars.seasonPart == "POST_SEASON", a = o.toString().slice(-2), f = !1, l = !1, c = appVars.ttoProtocol + "://" + appVars.turboTaxComDomain + appVars.ttoAmendDownload + a, h = $(e.currentTarget).data("rejected"), p = $(e.currentTarget).data("pending"), d = "";
        o == 2010 && (d = appVars.ttoAmendInstructions2010), o == 2011 && (d = appVars.ttoAmendInstructions2011), o == 2012 && (d = appVars.ttoAmendInstructions2012), o === i && (u || (f = !0)), o >= 2012 && (l = !0);
        var v = this.model.getTaxReturnId(), m = 0, g = 0;
        $(window).width() <= 767 && (m = 350, g = -230);
        var y = $(e.currentTarget), b = new n({launcher: e.currentTarget, elementHeight: $(e.currentTarget).height(), content: "PopupViewAmend", frame: "PopupFrameMsg", taxDocumentId: v, offset: {x: m, y: g}, model: new r({showOnline: f, isTaxFileAvailable: l, selectedYear: o, dateLimit: s, ttoDownloadBtn: c, ttoReadArticleLink: d, rejectedState: h, pendingState: p, taxDocumentId: v, ttoAmendInstructions: appVars.ttoAmendInstructions}), autoOpen: !0});
        this.children.push(b), e.preventDefault()
    }, viewPriorYearReturns: function () {
        var e = $("#timeline-wrapper").offset().top - 125;
        $("html").hasClass("touch") ? $(window).scrollTop(e) : $("html, body").animate({scrollTop: e}, 1e3)
    }});
    return o
}),define("text!templates/dashboard/Native.html", [], function () {
    return'{{#if isIPad}}\n    <div id="iPad-container" class="col-xs-12">\n\n        <div id="iPad-content" class="timeline-section-content">\n\n            <div class="row">\n                <div id="iPad-agency-column" class="col-sm-8 col-xs-12 col-md-6">\n                    <ul class="timeline-item-list">\n                        {{#with folder}}\n                            {{#foreach filingInfos}}\n                            <li class="timeline-item">\n\n                                <h3 class="timeline-item-title">{{filingStatus}}{{taxAuthority}} tax return</h3>\n                                <p class="timeline-subtitle">with {{RUEAppSkuFormat ../appString}}</p>\n                                {{#unless refundAmountNull}}\n                                    {{#if refundInfo.refundOrPaymentAmount}}\n                                        <h4 class="timeline-item-amount"><span class="timeline-item-amount-descriptor2">{{refundAmtDescriptor refundInfo.refundOrPaymentAmount}} </span><span class="timeline-item-amount-amount{{#if refundInfo.hasRefund}} timeline-positive{{/if}}">{{formatCurrency refundInfo.refundOrPaymentAmount withChange}}</span><span class="timeline-item-amount-descriptor1">{{taxAuthority}} {{refundAmtDescriptor refundInfo.refundOrPaymentAmount}}</span></h4>\n                                    {{else}}\n                                        {{#if refundInfo.hasZeroBalance}}\n                                            <h4 class="timeline-item-amount"><span class="timeline-item-amount-descriptor2">Refund </span><span class="timeline-item-amount-amount timeline-positive">$0</span><span class="timeline-item-amount-descriptor1">{{taxAuthority}} Refund</span></h4>\n                                        {{/if}}\n                                    {{/if}}\n                                {{/unless}}\n                                {{#if isCurrentYearFolder}}\n                                    <p class="timeline-subtitle">{{messages.returnMessage}}</p>\n                                {{else}}\n                                    {{#unless unfinished}}\n                                        <p class="timeline-subtitle">{{messages.returnMessage}}</p>\n                                    {{/unless}}\n                                {{/if}}\n\n                                <!-- TODO: Check for TTO and iPad\n                                    <p class="timeline-subtitle">AGI {{AGI}}</p>\n                                 -->\n\n                            </li>\n                            {{/foreach}}\n                        {{/with}}\n                        {{#unless folder.filingInfos}}\n                        {{#if isTTO}}\n                        {{#if returnFiled }}\n                        <li class="timeline-item">\n                            <h3 class="timeline-item-title">Click <strong>Download/print return (PDF)</strong> to view your latest saved return.</h3>\n                        </li>\n                        {{else}}\n                        <li class="timeline-item">\n                            <h3 class="timeline-item-title">It looks like you started your tax return with us, but didn\'t finish.</h3>\n                        </li>\n                        {{/if}}\n                        {{else}}\n                        <li class="timeline-item">\n                            <h3 class="timeline-item-title">Click <strong>Download/print return (PDF)</strong> to view your latest saved return.</h3>\n                        </li>\n                        {{/if}}\n                        {{/unless}}\n\n                    </ul>\n                </div>\n\n                {{!-- actions --}}\n                <div class="col-xs-12 col-sm-4 col-md-3 col-md-offset-1 timeline-item-actions">\n                    <div class="secondary-action-chevron">&nbsp;</div>\n                    <span class="timeline-action-header">Some things you can do:</span><br>\n                {{#with folder}}\n                    {{#if isTTO}}\n                        {{#if isAmendable}}\n                            {{#if isCurrentYearFolder}}\n                                {{#if returnFiled}}\n                                    <a automationid="amendLinkTaxReturns_{{taxYear}}" data-rejected="{{rejectedState}}" data-pending="{{pendingState}}" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck"  href="#myTaxReturns/{{taxYear}}" data-popup-cardflip="true" class="timeline-item-action amendLinkTaxReturn" data-timeline-year="{{taxYear}}" data-ci="{{taxYear}}">Amend (change) return</a><hr class="timeline-hr"/>\n                                {{else}}\n                                    <a href="#" class="sendToProductOffering">Finish my taxes</a><hr class="timeline-hr">\n                                {{/if}}\n                            {{else}}\n                                <a automationid="amendLinkTaxReturns_{{taxYear}}" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck"  href="#myTaxReturns/{{taxYear}}" data-popup-cardflip="true" class="timeline-item-action amendLinkTaxReturn" data-timeline-year="{{taxYear}}" data-ci="{{taxYear}}">Amend (change) return</a><hr class="timeline-hr">\n                            {{/if}}\n                        {{/if}}\n                    {{/if}}\n\n                    <!-- Do not display order details for iPad -->\n                    {{#if displayEfileDetails}}\n                        {{#unless isSnapTax}}\n                            <a href="#taxReturns/detail" automationid="viewEFile_{{taxYear}}" id="viewEFile" class="timeline-item-action">View e-file details</a><hr class="timeline-hr">\n                        {{/unless}}\n                    {{/if}}\n\n                    {{#if isSnapTax}}\n                        {{#if taxReturnId}}\n                            <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-snaptax="true" automationid="getCopyTaxReturns_{{taxYear}}" data-ci="{{taxYear}}" href="#taxReturns/{{taxYear}}/{{taxReturnId}}/true">Download/print return (PDF)</a><hr class="timeline-hr">\n                        {{/if}}\n                    {{else}}\n                        {{#if isCurrentYearFolder}}\n                            {{#checkFilingStatus "PAID"}}\n                                {{#if taxReturnId}}\n                                    <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-snaptax="false" data-ci="{{taxYear}}" automationid="getCopyTaxReturns_{{taxYear}}" href="#taxReturns/{{taxYear}}/{{taxReturnId}}/true">Download/print return (PDF)</a><hr class="timeline-hr">\n                                    <a href="/svc/getTaxReturnBinary?{{getDocumentIdQueryString taxReturnId}}" class="timeline-item-action" data-ci="{{taxYear}}" target="_blank">Download .tax file</a><hr class="timeline-hr">\n                                {{/if}}\n                            {{/checkFilingStatus}}\n                        {{else}}\n                            {{#taxYearAvailableInCFP}}\n                                {{#if showPDF}}\n                                    {{#if isPdfEntitled}}\n                                        {{#if taxReturnId}}\n                                            <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-ci="{{taxYear}}" data-snaptax="false" automationid="getCopyTaxReturns_{{taxYear}}" href="#taxReturns/{{taxYear}}/{{taxReturnId}}/true">Download/print return (PDF)</a><hr class="timeline-hr">\n                                        {{/if}}\n                                        {{#if isDotTaxEligible}}\n                                            <a href="/svc/getTaxReturnBinary?{{getDocumentIdQueryString taxReturnId}}" target="_blank" data-ci="{{taxYear}}" class="timeline-item-action">Download .tax file</a><hr class="timeline-hr">\n                                        {{/if}}\n                                    {{else}}\n                                        <a class="popupLink timeline-item-action" automationid="getCopyTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download/print return (PDF)</a><hr class="timeline-hr">\n                                        {{#if isDotTaxEligible}}\n                                            <a class="popupLink timeline-item-action" automationid="getDotTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download .tax file</a><hr class="timeline-hr">\n                                        {{/if}}\n                                    {{/if}}\n                                {{else}}\n                                    {{#if isPdfEntitled}}\n                                        {{#if taxReturnId}}\n                                            <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-ci="{{taxYear}}" data-snaptax="false" automationid="getCopyTaxReturns_{{taxYear}}" href="#taxReturns/{{taxYear}}/{{taxReturnId}}/true">Download/print return (PDF)</a><hr class="timeline-hr">\n                                        {{/if}}\n                                        {{#if isDotTaxEligible}}\n                                            <a href="/svc/getTaxReturnBinary?{{getDocumentIdQueryString taxReturnId}}" target="_blank" data-ci="{{taxYear}}" class="timeline-item-action">Download .tax file</a><hr class="timeline-hr">\n                                        {{/if}}\n                                    {{else}}\n                                        <a class="popupLink timeline-item-action" automationid="getCopyTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download/print return (PDF)</a><hr class="timeline-hr">\n                                        {{#if isDotTaxEligible}}\n                                            <a class="popupLink timeline-item-action" automationid="getDotTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download .tax file</a><hr class="timeline-hr">\n                                        {{/if}}\n                                    {{/if}}\n                                {{/if}}\n                            {{/taxYearAvailableInCFP}}\n                        {{/if}}\n                    {{/if}}\n                    {{#if isCurrentYearFolder}}\n                        <a href={{FAFSALink}} class="timeline-item-action" target="_blank">Get tax data for FAFSA</a>\n                    {{/if}}\n                {{/with}}\n                </div>\n            </div>\n        </div>\n    </div>\n\n{{else}}\n    <div class="row dashboard-hero">\n        <div id="current-year-returns-list">\n        <div class="col-xs-12">\n            <p class="nativeDashSubHead">Thanks for using TurboTax.</p>\n            {{#if isSnapTax}}\n                {{#if STD}}\n                    <p class="nativeDashBody">\n                        Your SnapTax information has been transferred to TurboTax Online.\n                    </p>\n                    <a href="#" data-ci="continue" class="btn btn-large btn-orange small-block nativeContinueBtn sendToProductOffering">Continue Your Return</a>\n                {{else}}\n                    <p class="nativeDashBody">\n                        If you were notified in SnapTax that you need to transfer your data to TurboTax to complete your taxes, <a href="#" class="sendToProductOffering">continue your return online</a>.\n                    </p>\n                {{/if}}\n            {{/if}}\n\n            {{#if isDesktop}}\n                <p class="nativeDashBody">\n                    If you bought your copy of TurboTax from the TurboTax website, you can <a href="http://{{ttcomDomain}}/commerce/account/secure/downloads_unlocks.jsp">download it here</a>.\n                </p>\n            {{/if}}\n        </div>\n        </div>\n    </div>\n{{/if}}\n\n\n'
}),define("views/widgets/dashboard/NativeDashboardWidget", ["base/WidgetView", "text!templates/dashboard/Native.html", "views/widgets/SecondaryActionsWidget", "models/inner/FilingInfos"], function (e, t, n, r) {
    var i = e.extend({name: "NativeDashboardWidget", isIpad: !1, initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("templates/dashboard/Native", t);
        var n = this.model.get("dashboard");
        logger.log(n);
        var r = null;
        this.model.offerings && (r = this.model.offerings.getCurrentTransitionalProductOffering()), n == mytt.c.dashboardStates.DESKTOP ? (this.model.set("isDesktop", !0), this.model.set("application", "Desktop")) : n == mytt.c.dashboardStates.SNAPTAX || r == mytt.c.offering.SNAPTAX_VALUE ? (this.model.set("isSnapTax", !0), this.model.set("application", "SnapTax"), app.integration.skipDispatcher = !0, app.integration.ttoParams.referrer = "ST", r == mytt.c.offering.SNAPTAX_VALUE && this.model.set("STD", !0)) : n == mytt.c.dashboardStates.IPAD && (this.model.set("isIPad", !0), this.model.set("application", "iPad"))
    }, render: function () {
        logger.info("NativeDashboard:render");
        var e = this.model.get("folder");
        e && (this.setModelFolders(e), this.model.set("filingInfos", e.getFilingInfos())), this.$el.html(this.template(this.model.toJSON()));
        var t = ["status-lookup"];
        t.push("status-lookup"), this.model.get("isDesktop") == 1 ? t.push("billing") : t.push("pdf"), this.secondaryActions = new n($("div.row.dashboard-hero"), t, this.model), app.isMobile || app.trigger("beginAnimation.dashboard"), $("#animation-container").addClass("iPad-animation-container")
    }, setModelFolders: function (e) {
        var t = this.model;
        if (!e.get("filingInfos"))return;
        this.model.set("taxYear", e.get("taxYear"));
        var n = "", i = "", s = "Started";
        this.model.set("currentYearNotFiled", !e.isPostFiling() && !e.isOffSeason() && appVars.seasonPart != "POST_SEASON"), this.model.get("currentYearStarted") ? s = "Started" : this.model.get("currentYearNotFiled") ? s = "NotStarted" : e.isOffSeason() ? s = "PostSeason" : e.isPostFiling() ? s = "PostFiling" : s = "TTODown", e.set("isCurrentYearPostFiling", s == "PostFiling" || s == "PostSeason" ? !0 : !1), e.set("returnFiled", e.isTaxReturnFiled()), e.set("isTTO", e.isTTO()), e.setFilingStatus();
        var o = [];
        e.set("emptyFolders", o), o = [], parseInt(e.get("taxYear"), 10) >= parseInt(appVars.taxYear) - 1 && e.get("isSnapTax") == 0 && e.set({isDotTaxEligible: !0});
        var u = e.get("filingInfos").getCondensedSortedFilings(), a = new r(u);
        e.set({filingInfos: a}), e.set("rejectedState", !1), e.set("pendingState", !1), t.set("hasEfiledReturn", !1), e.get("filingInfos").each(function (n) {
            n.set({taxAuthorityUnderscores: n.setTaxAuthorityUnderscores(), messages: n.setReturnStatus()}), n.getRefundInfo().get("refundOrPaymentAmount") === null && e.set("refundAmountNull", !0), n.isEfiledRejected() && e.set("rejectedState", !0), n.isEfiledPending() && !e.get("rejectedState") && e.set("pendingState", !0), n.isEfiled() && t.set("hasEfiledReturn", !0)
        }), e.get("refundAmountNull") === !0 && e.get("filingInfos").each(function (e) {
            e.set("refundAmountNull", !0)
        }), e.get("filingInfos").setPrintOrEfiled(), e.set("isPaidOrEfiled", function () {
            var t = e.get("filingInfos"), n = _.where(t, {isEfiledPrinted: !0});
            if (n)return!0
        });
        var f = !1;
        e.get("isSnapTax") && (f = "SnapTax"), e.set("showInTimeline", e.showInTimeline()), e.isSnapTaxFolder() ? e.set("appString", f) : e.isIpad() ? (e.set("appString", e.get("appSku") + "_ipad"), this.isIpad = !0, this.setSecondaryActions(e)) : e.isWindows() ? e.set("appString", e.get("appSku") + "_win") : e.isMac() ? e.set("appString", e.get("appSku") + "_mac") : e.set("appString", e.get("appSku") || e.get("applicationId"));
        var l = e.get("appString");
        i === "" ? i += e.get("taxYear") + "(" + l + ")" : i += "," + e.get("taxYear") + "(" + l + ")", e.get("isPdfEntitled") ? n = "E" : n = "NE"
    }, setSecondaryActions: function (e) {
        e.set("isAmendable", e.isAmendable()), e.set("isSnapTax", e.isSnapTaxFolder()), e.set("isPaid", e.isPaidFolder()), (e.isPostFiling() || e.isFiledOffSeason()) && e.isCurrentTaxYear() ? e.set("displayEfileDetails", !0) : e.set("displayEfileDetails", !1), e.isCurrentTaxYear() && e.set("isCurrentYearFolder", !0), (e.isPostFiling() || e.isFiledOffSeason()) && app.isInSeason() && e.isCurrentTaxYear() && e.set("showStartStateReturnLink", !0), e.set("isPostFiling", e.isPostFiling()), e.set("isFiled", e.isFiledOffSeason() || e.isPostFiling()), e.set("TtaxReturnStartedNotCompleted", e.isStarted()), e.set("showPDF", !0)
    }});
    return i
}),define("text!templates/dashboard/Fallback.html", [], function () {
    return'<div class="dashboard container">\n    <div class="row dashboard-heroRow">\n       <img src="{{akamaiPrefix}}/less/images/not_started_image.png" alt="" class="dashboard-heroImage" />\n\n       <div class="dashboard-greetingCopy">\n           Life gets complicated. No matter how complex or simple, we can handle the changes in your life.\n       </div>\n       <a href="javascript:void(0)" class="btn btn-blue btn-large btn-small-block sendToProductOffering">Work on my taxes</a>\n    </div>\n\n    <div class="row dashboard-primaryActionRow">\n        <div class="col-xs-12 col-sm-4 dashboard-primaryAction">\n            <a href="#accountInfo">My Account Info</a>\n        </div>\n        <div class="col-xs-12 col-sm-4 dashboard-primaryAction">\n            <a href="#orders">My Orders</a>\n        </div>\n    </div>\n</div>\n'
}),define("views/widgets/dashboard/FallbackWidget", ["base/WidgetView", "text!templates/dashboard/Fallback.html"], function (e, t) {
    var n = e.extend({name: "TTONotStartedWidget", initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("templates/dashboard/Fallback", t)
    }, render: function () {
        logger.info("Fallback:render"), this.$el.html(this.template(this.model.toJSON())), app.isMobile || app.trigger("beginAnimation.dashboard")
    }});
    return n
}),define("text!templates/dashboard/InstaRefund.html", [], function () {
    return'<div class="row dashboard-hero">\n    <div id="current-year-returns-list" class="">\n        <p class="tagline">Thanks for using TurboTax.</p>\n        <div class="row dashboard-row">\n            <div class="col-xs-12">\n                If you received a notification from the IRS that a problem occurred with your return, <a href="https://ctg-prdws-qy.discovery.intuit.com/support.html" target="_blank">please contact customer care</a>.\n            </div>\n        </div>\n    </div>\n    <div class="secondary-actions-wrapper col-xs-12">\n        <div class="actionMenuWrapperNew actionMenuInHero">\n            <div class="secondary-action-chevron">&nbsp;</div>\n            <div class="col-xs-12 secondaryActionContainer">\n                <div id="topActionMenu" class="offseasonSecondiLinksWrapNew collapsedActions">\n                    <span id="actionsText">Some things you can do:</span>\n                    <div class="collapsedActionsWrapperNew">\n\n                        {{#if taxReturnId}}\n                        <a href="/svc/getTaxReturnPdf?{{getDocumentIdQueryString taxReturnId}}"  class="dashboard-link offseasonSecondiLinkNew"><span class="offseasonSecondiLinkText">Download/print return (PDF)</span></a>\n                        {{/if}}\n\n                        <a href="https://{{ttcomDomain}}/efile/efile_status_lookup.jsp" class="dashboard-link offseasonSecondiLinkNew" target="_blank">View e-file status</a>\n\n                        <a href="https://ctg-prdws-qy.discovery.intuit.com/support.html" class="dashboard-link offseasonSecondiLinkNew amendLinkTaxReturn" target="_blank">Amend (change) return</a>\n\n                        <a href="https://ctg-prdws-qy.discovery.intuit.com/support.html" class="dashboard-link offseasonSecondiLinkNew addState" target="_blank"><span class="offseasonSecondiLinkText">Add a state</span></a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n'
}),define("views/widgets/dashboard/InstaRefundWidget", ["base/WidgetView", "text!templates/dashboard/InstaRefund.html"], function (e, t) {
    var n = e.extend({name: "InstaRefundWidget", events: {"click .amendLinkTaxReturn": "amend", "click .addState": "addState"}, initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("templates/dashboard/InstaRefund", t)
    }, render: function () {
        logger.info("InstaRefundWidget:render");
        var e = this.model.get("folder");
        e && (this.model.taxReturnId = e.get("taxReturnId")), this.$el.html(this.template(this.model)), app.isMobile || app.trigger("beginAnimation.dashboard")
    }, amend: function () {
        app.integration.sendToFlagship(!0)
    }, addState: function () {
        app.integration.sendToFlagship(!0)
    }});
    return n
}),define("text!templates/dashboard/EasyExtension.html", [], function () {
    return'<div class="row dashboard-hero easy-extension-row">\n\n    <div id="current-year-returns-list" class="">\n\n        {{#if foundFilingData}}\n            <div class="col-xs-12">\n                <div class="row easy-extension-content-row">\n                    <div class="col-xs-3 small-block">\n\n                             {{#if rejectedState}}\n                                <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/extension{{statusIconId}}.png" class="easy-extension-status-icon-reject">\n                             {{else}}\n                                <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/extension{{statusIconId}}.png" class="easy-extension-status-icon">\n                             {{/if}}\n                    </div>\n                    <div class="col-xs-9 small-block">\n                        <p class="dashboard-hero-p">\n                            Federal tax status: <strong>Extension {{statusDescription}}</strong>\n                        </p>\n                        <p class="easy-extension-secondary-font">\n                            Federal tax extension submitted on {{statusDate}}\n                        </p>\n\n                        {{#if acceptedOrPendingState}}\n\n                            <a href="#" class="btn btn-large btn-orange small-block topSpace sendToProductOffering easy-extension-button">Continue your return</a>\n\n                        {{else}}\n                            {{#if rejectedState}}\n                                <!-- Send to EasyExtension offering, productId=2048 -->\n                                <a href="#"\n                                   class="btn btn-large btn-orange small-block topSpace sendToProductOffering easy-extension-button-reject" data-productId="2048">Fix it now</a>\n\n                                <a href="#"\n                                   class="btn btn-large btn-gray-light small-block topSpace sendToProductOffering easy-extension-button-reject">Continue your return</a>\n                            {{/if}}\n                        {{/if}}\n\n                    </div>\n                </div>\n            </div>\n\n        {{else}}\n            <!-- Catch-all for any other state that we were not expecting. -->\n            <div class="col-xs-12">\n                <div class="row easy-extension-content-row">\n                    <div class="col-xs-3 small-block">\n                        <!-- Use "Pending" image for the catch-all -->\n                        <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/extensionPending.png" class="easy-extension-status-icon">\n                    </div>\n                    <div class="col-xs-9 small-block">\n\n                        <p class="dashboard-hero-p">We’re here to help you get your taxes done right.</p>\n\n                        <p>&nbsp;</p>  <!-- spacer, to make consistent with the "status" (accepted/rejected) blocks on this dashboard. -->\n\n                        <a href="#" class="btn btn-large btn-orange small-block topSpace sendToProductOffering easy-extension-button">Continue your return</a>\n                    </div>\n                </div>\n            </div>\n        {{/if}}\n\n    </div>\n\n    <div class="secondary-actions-wrapper col-xs-12">\n        <div class="actionMenuWrapperNew actionMenuInHero">\n            <div class="secondary-action-chevron">&nbsp;</div>\n            <div class="col-xs-12 secondaryActionContainer">\n                <div id="topActionMenu" class="offseasonSecondiLinksWrapNew collapsedActions">\n                    <span id="actionsText">Some things you can do:</span>\n                    <div class="collapsedActionsWrapperNew">\n\n                        {{#unless rejectedState}}\n                        <a href="#" class="dashboard-link offseasonSecondiLinkNew sendToProductOffering" data-productId="2048"><span class="offseasonSecondiLinkText">Return to extension</span></a>\n                        {{/unless}}\n\n                        <a href="#accountInfo" data-actionname="accountinfo" class="dashboard-link offseasonSecondiLinkNew"><span class="offseasonSecondiLinkText"> Edit account settings</span></a>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n\n</div>\n'
}),define("views/widgets/dashboard/EasyExtensionWidget", ["base/WidgetView", "models/AccountInfo", "text!templates/dashboard/EasyExtension.html"], function (e, t, n) {
    var r = e.extend({name: "EasyExtensionWidget", actualRenderedFilings: {}, initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.template = app.templateFactory.getTemplate("templates/dashboard/EasyExtension", n);
        var t = this.model.getFilingInfos();
        t && (this.actualRenderedFilings = t.getCondensedSortedFilings()), this.model.foundFilingData = !1, this.model.rejectedState = !1, this.model.pendingState = !1, this.model.acceptedState = !1;
        var r = this;
        if (this.actualRenderedFilings && this.actualRenderedFilings.length > 0) {
            var i = this.actualRenderedFilings[0];
            if (i) {
                r.model.foundFilingData = !0;
                var s = i.isEfiledRejected(), o = i.isEfiledAccepted(), u = i.isEfiledPending();
                r.model.rejectedState = s, r.model.acceptedState = o, r.model.pendingState = u, r.model.acceptedOrPendingState = o || u, r.model.statusDate = i.getReturnStatusDateStringSlash2(), r.model.statusDescription = "Pending", r.model.statusIconId = "Pending", o ? (r.model.statusDescription = "Accepted", r.model.statusIconId = "Accepted") : s && (r.model.statusDescription = "Rejected", r.model.statusIconId = "Rejected")
            }
        }
    }, render: function () {
        logger.info("EasyExtensionWidget:render");
        var e = [];
        return app.getFFAStatus() || e.push("moneytools"), this.append(this.template(this.model)), app.isMobile || app.trigger("beginAnimation.dashboard"), this
    }});
    return r
}),define("components/DashboardContentComponent", ["views/widgets/dashboard/TTOPostfileWidget", "views/widgets/dashboard/TTODownWidget", "views/widgets/dashboard/RUEDashboardWidget", "views/widgets/dashboard/TTOInProgressWidget", "views/widgets/dashboard/NativeDashboardWidget", "views/widgets/dashboard/FallbackWidget", "views/widgets/dashboard/InstaRefundWidget", "views/widgets/dashboard/EasyExtensionWidget"], function (e, t, n, r, i, s, o, u) {
    var a = {selectedWidgets: [], $dashboardEl: null, getWidgets: function (e, t) {
        return this.selectedWidgets = [], this.dashboardContext = e, this.$dashboardEl = t, this.selectWidget(), app.security.hasUserName() && this.dashboardContext.accountInfo && mytt.$.cookie("firstName", this.dashboardContext.accountInfo.get("contactInfo").get("firstName")), mytt.$.removeCookie("recoveryName"), this.selectedWidgets
    }, selectWidget: function () {
        var e = this.dashboardContext, t = e.model.get("dashboard");
        if (t === mytt.c.dashboardStates.DESKTOP || t === mytt.c.dashboardStates.IPAD)this.selectNativeDashboard(); else if (t === mytt.c.dashboardStates.SNAPTAX)appVars.featureInstaRefund && e.isInstaRefund ? this.selectInstaRefundDashboard() : this.selectNativeDashboard(); else if (!e.model.offerings)this.selectFallbackDashboard(); else if (!e.model.offerings.getCurrentProductOffering())if (e.model.offerings.getCurrentTransitionalProductOffering() === mytt.c.offering.SNAPTAX_VALUE)this.selectNativeDashboard(); else {
            var n = mytt.$.cookie("productid");
            n && n !== "" ? app.integration.sendToProductOffering() : this.selectTTONotStartedDashboard()
        } else t === mytt.c.dashboardStates.IN_PROGRESS ? this.selectTTOInProgressDashboard() : t === mytt.c.dashboardStates.POST_FILING ? this.selectTTOPostfileDashboard() : t === mytt.c.dashboardStates.OFF_SEASON ? this.selectTTOPostfileDashboard() : t === mytt.c.dashboardStates.EASY_EXTENSION ? this.selectEasyExtensionDashboard() : this.selectTTOInProgressDashboard()
    }, selectNativeDashboard: function () {
        var e = new i({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(e)
    }, selectFallbackDashboard: function () {
        var e = new s({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(e)
    }, selectTTOPostfileDashboard: function () {
        var t = new e({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(t)
    }, selectTTOInProgressDashboard: function () {
        var e = new r({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(e)
    }, selectTTONotStartedDashboard: function () {
        this.dashboardContext.model.set("isFFA", app.getFFAStatus());
        var e = new n({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(e)
    }, selectTTODownDashboard: function () {
        this.dashboardContext.model.set("isFFA", app.getFFAStatus());
        var e = new t({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(e)
    }, selectInstaRefundDashboard: function () {
        var e = new o({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(e)
    }, selectEasyExtensionDashboard: function () {
        this.dashboardContext.model.set("isFFA", app.getFFAStatus());
        var e = new u({el: $(this.$dashboardEl).get(0), model: this.dashboardContext.model});
        this.selectedWidgets.push(e)
    }};
    return a
}),define("text!templates/Dashboard.html", [], function () {
    return'<div id="newAnimationContainer" style="position:relative">\n    <div class="dashboard row">\n        <h1 class="mytt header1">My Tax Timeline</h1>\n        <!-- This is a place holder for the healthcare post file details -->\n\n        <div class="dashboard row ">\n            <div id="dashboard-healthcare-timeline" class="dashboard-timeline row hidden">\n                <div id="dashboard-healthcare" class="timeline-section-content card-shadow top">\n\n\n                    <div id="dashboard-healthcare-heading" class="col-xs-12 timeline-row">\n                        <h2 class="timeline-heading dashboard-row-header status-notfiled {{#if showInactive}}inactive{{else}}active{{/if}} dashboard-healthcare">Let\'s look at {{TAX_YEAR 1}}</h2>\n\n                        <div id="dashboard-healthcare-wrapper">\n                            <div id="dashboard-healthcare-holder" class="alignWithFooter topRowSpace">\n                                <div id="dashboard-healthcare-details">\n                                    <div class="timeline-section-content timeline-section timeline-section-hidden">\n                                        <!--render healthcare details and money finder here -->\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </div>\n         </div>\n    </div>\n\n    <div id="dashboard-content-row" class="dashboard row">\n        <div id="dashboard-wrapper">\n            <div id="dashboard-content" class="content alignWithFooter card-shadow">\n                {{#if isRejected}}\n                    <h2 class="timeline-heading timeline-heading-noclick status-filed dashboard-row-header">Your {{TAX_YEAR}} return status has changed</h2>\n                {{else}}\n                    {{#if isStarted}}\n                        <h2 class="timeline-heading timeline-heading-noclick status-filed dashboard-row-header">Let\'s continue your {{TAX_YEAR}} taxes</h2>\n                    {{else}}\n                        {{#if isEfiled}}\n                            <h2 class="timeline-heading timeline-heading-noclick status-filed dashboard-row-header">Great job!  You filed your {{TAX_YEAR}} taxes</h2>\n                        {{else}}\n                            <h2 class="timeline-heading timeline-heading-noclick status-filed dashboard-row-header">{{TAX_YEAR}} Tax Year</h2>\n                        {{/if}}\n                    {{/if}}\n                {{/if}}\n                <div id="animation-container" class="animation-fix">\n                    <div id="dashboard-content-holder" {{#unless isMobile}}style="display:none;"{{/unless}}>\n                        <!-- render content here -->\n                    </div>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<div class="visible-xs isXS"></div>\n<div class="scroll-arrow-bounce"></div>\n\n'
}),define("text!templates/dashboard/TimelineContainer.html", [], function () {
    return'<div class="row dashboard-timeline">\n    <div id="timeline-wrapper" class="col-xs-12">\n        <!--<h1>My Tax Timeline</h1>-->\n\n        <div id="timeline" class="row">\n            <div class="col-xs-12">\n                <div id="timelineLoadingMsg">\n                    <img src="/less/images/timeline-loader.gif" alt="" /> Loading your tax timeline...\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n        <!--This is for animation on the dashboard + timeline -->\n<div class="animatedBorder" >\n    <div class="actualBorderAnimation">\n\n    </div>\n</div>\n\n\n'
}),define("text!templates/dashboard/MoneyTools.html", [], function () {
    return'<h1 class="money-tools-header">My Money Tools</h1>\n<div class="col-xs-12 money-tools money-tools-carousel">\n\n    <!--<p class="subheader">These easy-to-use personal finance tools and calculators make it easy to understand what\'s going on with your money.</p>-->\n\n    <div id="carousel-money-tools" class="row carousel slide">\n\n        <!-- Indicators -->\n\n      {{#unless isFFA}}\n      <ol class="carousel-indicators">\n            <li data-target="#carousel-money-tools" data-slide-to="0" class="active"></li>\n\n            <li data-target="#carousel-money-tools" data-slide-to="1"></li>\n            <li data-target="#carousel-money-tools" data-slide-to="2"></li>\n            <li data-target="#carousel-money-tools" data-slide-to="3"></li>\n            <li data-target="#carousel-money-tools" data-slide-to="4"></li>\n\n          <!--<li data-target="#carousel-money-tools" data-slide-to="3"></li>-->{{! add in another button for }}\n      </ol>\n      {{/unless}}\n        <!-- Slides -->\n        <div class="carousel-inner col-xs-12 card-shadow">\n\n            <div class="item active row">\n                <div class="col-xs-3 small-block">\n                    <img class="partner-logo" src="{{akamaiPrefix}}/{{lessOrCss}}/images/logo_benefitfinder.png" alt="TurboTax Benefit Finder" >\n                </div>\n                <div class="col-xs-9 small-block">\n                    <h2>Get all the money that you deserve!</h2>\n                    <p class="money-tools-content">TurboTax can help to find money that you didn\'t even know about. It helps you find this money and easily apply to receive it.</p>\n                    <a href="https://ctg.discovery.intuit.com/moneyfinder/mytt.html" id="moneyToolBenefitFinderBtn" automationid="moneyToolBenefitFinderBtn" data-nav="moneyToolBenefitFinder" title="TurboTax Benefit Finder" class="btn btn-medium btn-blue btn-text-spacing col-sm-4 partner-link small-block" target="_blank">Get Started</a>\n                </div>\n            </div>\n\n            {{#unless isFFA}}\n\n            <div class="item row">\n                <div class="col-xs-3 small-block">\n                    <img class="partner-logo" src="{{akamaiPrefix}}/{{lessOrCss}}/images/logo_fcs2.png" alt="TurboTax Tax Calculator" >\n                </div>\n                <div class="col-xs-9 small-block">\n                    <h2>The average credit score is 688.</h2>\n                    <p class="money-tools-carousel-subhead">How does yours compare?</p>\n                    <p class="money-tools-content">TurboTax recommends knowing exactly where you stand today and every day. Sign up now for a free 7-day trial.*</p>\n                    <a href="{{fcs_tracking \'MoneyTools\'}}" id="moneyToolFreeCreditBtn" automationid="moneyToolFreeCreditBtn" data-nav="moneyToolFreeCredit" title="FreeCreditScore.com" class="btn btn-medium btn-blue small-block" target="_blank">Get My Score</a>\n                    <img id="fcs-dnt" class="tracker visually-hidden" src="{{fcs_img \'MoneyTools\'}}" alt="FreeCreditScore.com tracker">\n                    <p class="caption">* You may cancel your free trial at anytime within the 7-day trial period, without charge. Terms and conditions apply and are subject to change without notice.</p>\n                </div>\n            </div>\n\n            <div class="item row">\n                <div class="col-xs-3 small-block">\n                    <img class="partner-logo" src="{{akamaiPrefix}}/{{lessOrCss}}/images/logo_mint.png" alt="Mint.com" >\n                </div>\n                <div class="col-xs-9 small-block">\n                    <h2>Get a handle on your money the free, easy way!</h2>\n                    <p class="money-tools-content">Mint does all the work of organizing your spending for you. It helps you set a budget, track your goals and make money decisions you feel good about.</p>\n                    <a href="https://www.mint.com/?cid=int_tt_em_MyTurboTax" id="moneyToolMintBtn" automationid="moneyToolMintBtn" data-nav="moneyToolMint" title="Mint.com" class="btn btn-medium btn-blue btn-text-spacing col-sm-4 partner-link small-block" target="_blank">Get It Now</a>\n                </div>\n            </div>\n            <div class="item row">\n                <div class="col-xs-3 small-block">\n                    <img class="partner-logo studentLoan" src="{{akamaiPrefix}}/{{lessOrCss}}/images/department_of_education.png" alt="Student Loan" >\n                </div>\n                <div class="col-xs-9 small-block">\n                    <h2>Need help paying back your federal student loan debt?</h2>\n                    <p class="money-tools-content">The U.S Department of Education has repayment options that could make your student loan more affordable. If you\'re just starting out, a new graduate, or just need a little help with your loans, these repayment plans could work for you!</p>\n                    <a href="https://studentloans.gov/myDirectLoan/mobile/repayment/repaymentEstimator.action?from=turboTax" id="moneyToolCarouselStudentLoanBtn" automationid="moneyToolStudentLoanBtn" data-nav="moneyToolStudentLoan" title="Student Loan" class="btn btn-medium btn-blue btn-text-spacing col-sm-4 partner-link small-block studentLoanBtn" target="_blank">Learn more at StudentAid.gov</a>\n                </div>\n            </div>\n            <div class="item row">\n                <div class="col-xs-3 small-block">\n                    <img class="partner-logo" src="{{akamaiPrefix}}/{{lessOrCss}}/images/logo_taxcaster2.png" alt="TurboTax Tax Calculator" >\n                </div>\n                <div class="col-xs-9 small-block">\n                    <h2>Get a quick free estimate of your next refund.</h2>\n                    <p class="money-tools-content">Before you file, calculate roughly how much you\'ll get back from the IRS or how much you\'ll owe them. Also, get personalized tax tips to help you save money next year.</p>\n                    <a href="http://{{ttcomDomain}}/tax-tools/calculators/taxcaster/" id="moneyToolTaxCasterBtn" automationid="moneyToolTaxCasterBtn" data-nav="moneyToolTaxCaster" title="TurboTax Tax Caster" class="btn btn-medium btn-blue btn-text-spacing col-sm-4 partner-link small-block" target="_blank">Get Started</a>\n                </div>\n            </div>\n           {{/unless}}\n        </div>\n\n        <div class="m-carousel-controls m-carousel-hud">\n        <!-- Left / Right Chevron Controls, if you implement this your going to need padding on the content -->\n        <a class="left carousel-control" href="#carousel-money-tools" data-slide="prev">\n            <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/timeline-left.png" class="carousel-control-img"/>\n        </a>\n        <a class="right carousel-control" href="#carousel-money-tools" data-slide="next">\n            <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/timeline-right.png" class="carousel-control-img"/>\n        </a>\n    </div>\n    </div>\n\n</div>'
}),define("text!modules/mytaxreturns/templates/MyTaxReturnsDash.html", [], function () {
    return'{{#if fail}}\n\n    <div class="col-xs-12 timeline-row card-shadow">\n        <div id="timelineErrorMsg">\n            <img src="{{akamaiPrefix}}/{{lessOrCss}}/images/timeline-error{{at2x}}.png" alt="" class="timelineErrorIcon"><p>There was a problem loading the timeline. You can refresh the page to try again.</p>\n        </div>\n    </div>\n\n{{else}}\n    {{#if noReturns}}\n\n        <div class="col-xs-12 timeline-row card-shadow">\n            <h2 class="timeline-heading timeline-heading-noclick joined">Joined TurboTax</h2>\n            <div class="timeline-section-content timeline-section-hidden">\n\n            </div>\n        </div>\n    {{else}}\n        <!--<div class="col-xs-12 timeline-row">-->\n            <!--<a href="#" id="taxReturnsHelp" automationid="taxReturnsHelp" data-popup-content="PopupTaxReturns" data-popup-frame="PopupFrameMsg" data-popup-cardflip="true" data-popup-x="252" data-popup-y="0">Can\'t find the return you need?</a>-->\n        <!--</div>-->\n        {{#foreach folders}}\n            <!--SKIP YEAR-->\n            {{#foreach emptyFolders}}\n                <div class="col-xs-12 timeline-row card-shadow">\n                    <h2 class="timeline-heading status-notfiled inactive">{{emptyYear}} Tax Return</h2>\n                    <div class="timeline-section-content timeline-section-hidden">\n                        <div class="row">\n                            <div class="col-sm-8 col-xs-12 col-md-6">\n                                <ul class="timeline-item-list">\n                                    <li class="timeline-item">\n                                        <p class="small-inline">\n                                            It looks like you didn\'t file with us in {{emptyYear}}.\n                                        </p>\n                                        <p class="small-inline">\n                                            <a href="#" id="taxReturnsHelp" automationid="taxReturnsHelp" data-popup-content="PopupTaxReturns" data-popup-frame="PopupFrameMsg" data-popup-cardflip="true" data-popup-x="252" data-popup-y="0">Think you filed with us?</a>\n                                        </p>\n                                    </li>\n                                </ul>\n                            </div>\n                            <div class="col-xs-12 col-sm-4 col-md-4 col-md-offset-1 timeline-item-actions skipYearActions">\n\n                                {{#ifRecentSkipYear emptyYear}}\n                                <div class="secondary-action-chevron">&nbsp;</div>\n                                <span class="timeline-action-header">Some things you can do:</span>\n                                    <a href="javascript:void(0);" class="skipYearFiledPopUp timeline-item-action" automationid="skipYearFiledPopUp" data-popup-content="PopupSkipYear" data-pop-year="{{emptyYear}}" data-popup-frame="PopupFrameMsg" data-popup-cardflip="true" data-popup-x="252" data-popup-y="0"> File {{emptyYear}} return with TurboTax</a>\n                                {{/ifRecentSkipYear}}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            {{/foreach}}\n            {{#if showInTimeline}}\n                <div class="col-xs-12 timeline-row card-shadow">\n\n                    <h2 class="timeline-heading status-filed inactive">{{taxYear}} Tax Return</h2>\n                    <div class="timeline-section-content timeline-section-hidden">\n\n                        <div class="row">\n                            <div class="col-sm-8 col-xs-12 col-md-6">\n                                <ul class="timeline-item-list">\n\n                                    {{#foreach filingInfos}}\n                                        <li class="timeline-item">\n\n                                         <h3 class="timeline-item-title">{{filingStatus}}{{taxAuthority}} tax return</h3>\n                                         <p class="timeline-subtitle">with {{RUEAppSkuFormat ../appString}}</p>\n                                         {{#if unfinished}}\n                                            <a href="javascript:void(0)" class="popupLink timeline-item-action" data-popup-content="PopupUnfinishedReturn" data-popup-frame="PopupFrameMsg" data-popup-cardflip="true" data-popup-x="252" data-popup-y="0">Learn more</a>\n\n                                         {{/if}}\n                                         {{#unless refundAmountNull}}\n                                            {{#if refundInfo.refundOrPaymentAmount}}\n                                                <h4 class="timeline-item-amount"><span class="timeline-item-amount-descriptor2">{{refundAmtDescriptor refundInfo.refundOrPaymentAmount}} </span><span class="timeline-item-amount-amount{{#if refundInfo.hasRefund}} timeline-positive{{/if}}">{{formatCurrency refundInfo.refundOrPaymentAmount withChange}}</span><span class="timeline-item-amount-descriptor1">{{taxAuthority}} {{refundAmtDescriptor refundInfo.refundOrPaymentAmount}}</span></h4>\n                                            {{else}}\n                                                {{#if refundInfo.hasZeroBalance}}\n                                                    <h4 class="timeline-item-amount"><span class="timeline-item-amount-descriptor2">Refund </span><span class="timeline-item-amount-amount timeline-positive">$0</span><span class="timeline-item-amount-descriptor1">{{taxAuthority}} Refund</span></h4>\n                                                {{/if}}\n                                            {{/if}}\n                                         {{/unless}}\n                                         {{#if isCurrentYearFolder}}\n                                            <p class="timeline-subtitle">{{messages.returnMessage}}</p>\n                                         {{else}}\n                                            {{#unless unfinished}}\n                                                <p class="timeline-subtitle">{{messages.returnMessage}}</p>\n                                            {{/unless}}\n                                         {{/if}}\n\n                                        <!-- TODO: Check for TTO and iPad\n                                            <p class="timeline-subtitle">AGI {{AGI}}</p>\n                                         -->\n\n                                        </li>\n                                    {{/foreach}}\n                                    {{#unless filingInfos}}\n                                        {{#if isTTO}}\n                                            {{#if returnFiled }}\n                                                <li class="timeline-item">\n                                                    <h3 class="timeline-item-title">Filed tax return(s)</h3>\n                                                    <p class="timeline-subtitle">with {{RUEAppSkuFormat ../appString}}</p>\n                                                </li>\n                                            {{else}}\n                                                <li class="timeline-item">\n                                                    <h3 class="timeline-item-title">It looks like you started your tax return with us, but didn\'t finish.</h3>\n                                                    <a href="javascript:void(0)" class="popupLink timeline-item-action" data-popup-content="PopupUnfinishedReturn" data-popup-frame="PopupFrameMsg" data-popup-cardflip="true" data-popup-x="252" data-popup-y="0">Learn more</a>\n\n                                                </li>\n                                            {{/if}}\n                                        {{else}}\n\n                                            <li class="timeline-item">\n                                                <h3 class="timeline-item-title">{{#if returnFiled }}Filed{{else}}Prepared{{/if}} tax return(s)</h3>\n                                                <p class="timeline-subtitle">with {{RUEAppSkuFormat ../appString}}</p>\n                                            </li>\n\n                                        {{/if}}\n                                    {{/unless}}\n\n                                </ul>\n                            </div>\n\n                            {{!-- actions --}}\n                            <div class="col-xs-12 col-sm-4 col-md-3 col-md-offset-1 timeline-item-actions">\n                                <div class="secondary-action-chevron">&nbsp;</div>\n                                <span class="timeline-action-header">Some things you can do:</span><br>\n\n                            {{#if isTTO}}\n                                {{#if isAmendable}}\n                                    {{#if isCurrentYearFolder}}\n                                        {{#if returnFiled}}\n                                            <a automationid="amendLinkTaxReturns_{{taxYear}}" data-rejected="{{rejectedState}}" data-pending="{{pendingState}}" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck"  href="#myTaxReturns/{{taxYear}}" data-popup-cardflip="true" class="timeline-item-action amendLinkTaxReturn" data-timeline-year="{{taxYear}}" data-ci="{{taxYear}}">Amend (change) return</a><hr class="timeline-hr"/>\n                                        {{else}}\n                                            <a href="#" class="sendToProductOffering">Finish my taxes</a><hr class="timeline-hr">\n                                        {{/if}}\n                                    {{else}}\n                                        <a automationid="amendLinkTaxReturns_{{taxYear}}" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck"  href="#myTaxReturns/{{taxYear}}" data-popup-cardflip="true" class="timeline-item-action amendLinkTaxReturn" data-timeline-year="{{taxYear}}" data-ci="{{taxYear}}">Amend (change) return</a><hr class="timeline-hr">\n                                    {{/if}}\n                                {{/if}}\n                            {{/if}}\n\n\n                            {{#taxYearAvailableInCFP}}\n                                {{#checkFilingStatus "PAID"}}\n                                    {{#unless isSnapTax}}\n                                        {{#unless isIPad}} <!--Don\'t show for iPad or SnapTax users -->\n                                            <a href="#orders/{{taxYear}}" class="timeline-item-action">Get order details</a><hr class="timeline-hr">\n                                        {{/unless}}\n                                    {{/unless}}\n                                {{/checkFilingStatus}}\n                            {{/taxYearAvailableInCFP}}\n\n                            {{#if displayEfileDetails}}\n                                {{#unless isSnapTax}}\n                                    <a href="#taxReturns/detail" automationid="viewEFile_{{taxYear}}" id="viewEFile" class="timeline-item-action">View e-file details</a><hr class="timeline-hr">\n                                {{/unless}}\n                            {{/if}}\n\n                            {{#if isSnapTax}}\n                                {{#if taxReturnId}}\n                                    <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-snaptax="true" automationid="getCopyTaxReturns_{{taxYear}}" data-ci="{{taxYear}}" href="{{#if isCurrentYearStarted}}/svc/getTaxReturnPdf?{{getDocumentIdQueryString taxReturnId}}{{else}}#taxReturns/{{taxYear}}/{{taxReturnId}}/false{{/if}}">Download/print return (PDF)</a><hr class="timeline-hr">\n                                {{/if}}\n                            {{else}}\n                                {{#if isCurrentYearFolder}}\n                                    {{#checkFilingStatus "PAID"}}\n                                        {{#if taxReturnId}}\n                                            <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-snaptax="false" data-ci="{{taxYear}}" automationid="getCopyTaxReturns_{{taxYear}}" href="{{#if isCurrentYearStarted}}/svc/getTaxReturnPdf?{{getDocumentIdQueryString taxReturnId}}{{else}}#taxReturns/{{taxYear}}/{{taxReturnId}}/false{{/if}}">Download/print return (PDF)</a><hr class="timeline-hr">\n                                            <a href="/svc/getTaxReturnBinary?{{getDocumentIdQueryString taxReturnId}}" class="timeline-item-action" data-ci="{{taxYear}}" target="_blank">Download .tax file</a><hr class="timeline-hr">\n                                        {{/if}}\n                                    {{/checkFilingStatus}}\n                                {{else}}\n                                {{#taxYearAvailableInCFP}}\n                                    {{#if showPDF}}\n                                        {{#if isPdfEntitled}}\n                                            {{#if taxReturnId}}\n                                                <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-ci="{{taxYear}}" data-snaptax="false" automationid="getCopyTaxReturns_{{taxYear}}" href="{{#if isCurrentYearStarted}}/svc/getTaxReturnPdf?{{getDocumentIdQueryString taxReturnId}}{{else}}#taxReturns/{{taxYear}}/{{taxReturnId}}/false{{/if}}">Download/print return (PDF)</a><hr class="timeline-hr">\n                                             {{/if}}\n                                            {{#if isDotTaxEligible}}\n                                                 <a href="/svc/getTaxReturnBinary?{{getDocumentIdQueryString taxReturnId}}" target="_blank" data-ci="{{taxYear}}" class="timeline-item-action">Download .tax file</a><hr class="timeline-hr">\n                                            {{/if}}\n                                        {{else}}\n                                             <a class="popupLink timeline-item-action" automationid="getCopyTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download/print return (PDF)</a><hr class="timeline-hr">\n                                            {{#if isDotTaxEligible}}\n                                                 <a class="popupLink timeline-item-action" automationid="getDotTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download .tax file</a><hr class="timeline-hr">\n                                            {{/if}}\n                                        {{/if}}\n                                     {{/if}}\n                                    {{else}}\n                                    {{#if isPdfEntitled}}\n                                         {{#if taxReturnId}}\n                                                <a class="getTaxReturnEntitledLink timeline-item-action" data-taxyear="{{taxYear}}" data-ci="{{taxYear}}" data-snaptax="false" automationid="getCopyTaxReturns_{{taxYear}}" href="{{#if isCurrentYearStarted}}/svc/getTaxReturnPdf?{{getDocumentIdQueryString taxReturnId}}{{else}}#taxReturns/{{taxYear}}/{{taxReturnId}}/false{{/if}}">Download/print return (PDF)</a><hr class="timeline-hr">\n                                          {{/if}}\n                                         {{#if isDotTaxEligible}}\n                                                <a href="/svc/getTaxReturnBinary?{{getDocumentIdQueryString taxReturnId}}" target="_blank" data-ci="{{taxYear}}" class="timeline-item-action">Download .tax file</a><hr class="timeline-hr">\n                                         {{/if}}\n                                    {{else}}\n                                        <a class="popupLink timeline-item-action" automationid="getCopyTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download/print return (PDF)</a><hr class="timeline-hr">\n                                        {{#if isDotTaxEligible}}\n                                            <a class="popupLink timeline-item-action" automationid="getDotTaxReturns_{{taxYear}}" data-popup-x="0" data-popup-y="-100" data-popup-frame="PopupFrameNoArrow" data-popup-cssclass="popupEntitlementCheck" data-popup-content="{{#if isCurrentYearPostFiling}}PopupTaxReturnsUnavailablePostFile{{else}}PopupTaxReturnsUnavailable{{/if}}" data-popup-cardflip="true" href="javascript:void(0);">Download .tax file</a><hr class="timeline-hr">\n                                        {{/if}}\n                                    {{/if}}\n                                {{/taxYearAvailableInCFP}}\n\n                             {{/if}}\n                            {{/if}}\n\n                            {{#if isCurrentYearFolder}}\n                                <a href={{FAFSALink}} class="timeline-item-action" target="_blank">Get tax data for FAFSA</a>\n                            {{/if}}\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            {{/if}}\n        {{/foreach}}\n        <div class="col-xs-12 timeline-row card-shadow">\n            <h2 class="timeline-heading timeline-heading-noclick joined">Joined TurboTax</h2>\n            <div class="timeline-section-content timeline-section-hidden">\n\n            </div>\n        </div>\n\n    {{/if}}\n{{/if}}\n'
}),define("modules/mytaxreturns/views/screens/TimelineWidget", ["base/WidgetView", "base/ScreenView", "models/TaxReturnDetail", "models/inner/FilingInfos", "views/widgets/PopFlipWidget", "text!modules/mytaxreturns/templates/MyTaxReturnsDash.html"], function (e, t, n, r, i, s) {
    var o = e.extend({name: "MyTimeline", events: {"click #taxReturnsHelp": "newPopup", "click .skipYearFiledPopUp": "newPopup", "click .amendLinkTaxReturn": "amendPopup", "click .timeline-heading": "toggle"}, initialize: function (t) {
        return e.prototype.initialize.apply(this, arguments), this.model = new n, this.$el = t, logger.log("timeline widget data fetch"), app.dataRegistry.fetch({modelClass: n, load: "getTaxReturnsDetail", noLoading: !0, success: this.onTaxOrderLoadSuccess, error: this.onTaxOrderLoadFail, context: this}), this
    }, onTaxOrderLoadFail: function (e, t, n) {
        logger.log(e), logger.log(e.status), logger.log(e.statusText), logger.log(e.responseText), logger.log(e.readyState), logger.log(t), logger.log(n), t == "abort" ? logger.error("Timeline call aborted.") : (logger.error("Timeline failed to load."), this.model = new Backbone.Model, this.model.set("fail", !0), this.template = app.templateFactory.getTemplate("MyTaxReturnsScreenDash", s), this.parentScreenName ? ciScreenName = this.parentScreenName : ciScreenName = "MyTaxReturnsScreenDash", app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, ciScreenName, {userState: "TimelineDetailFailure"}), this.$el.html(this.template(this.model.toJSON())))
    }, onTaxOrderLoadSuccess: function (e) {
        this.model = e, this.model.set("currentYearNotFiled", !this.model.isCurrentYearReturnPostFiling() && !this.model.isCurrentYearReturnOffSeason() && appVars.seasonPart != "POST_SEASON"), this.model.set("currentYearStarted", this.model.isCurrentYearReturnStarted()), this.model.set("currentYearSnapTax", this.model.isCurrentYearSnapTax()), this.template = app.templateFactory.getTemplate("MyTaxReturnsScreenDash", s);
        var t = "", n = "", i = "";
        this.model.get("currentYearStarted") ? i = "Started" : this.model.get("currentYearNotFiled") ? i = "NotStarted" : this.model.isCurrentYearReturnOffSeason() ? i = "PostSeason" : this.model.isCurrentYearReturnPostFiling() ? i = "PostFiling" : i = "TTODown";
        var o = 2013, u = this.model;
        this.model.get("folders").each(function (e) {
            var s = parseInt(e.get("taxYear"), 10);
            e.set("isCurrentYearPostFiling", i === "PostFiling" || i === "PostSeason" ? !0 : !1), e.set("isCurrentYearStarted", i !== "NotStarted"), e.set("returnFiled", e.isTaxReturnFiled()), e.set("isTTO", e.isTTO()), e.setFilingStatus();
            var a = [];
            if (o - s > 1)for (var f = 1; f < o - s; f++) {
                var l = {}, c = o - f;
                l.emptyYear = c, a.push(l), n += "," + c + "(NOTFILED)"
            }
            o = s, e.set("emptyFolders", a), a = [], parseInt(e.get("taxYear"), 10) >= parseInt(appVars.taxYear) - 1 && e.get("isSnapTax") == 0 && e.set({isDotTaxEligible: !0});
            var h = e.get("filingInfos").getCondensedSortedFilings(), p = new r(h);
            e.set({filingInfos: p}), e.set("rejectedState", !1), e.set("pendingState", !1), u.set("hasEfiledReturn", !1), e.get("filingInfos").each(function (t) {
                t.set({taxAuthorityUnderscores: t.setTaxAuthorityUnderscores(), messages: t.setReturnStatus()}), t.getRefundInfo().get("refundOrPaymentAmount") === null && e.set("refundAmountNull", !0), t.isEfiledRejected() && e.set("rejectedState", !0), t.isEfiledPending() && !e.get("rejectedState") && e.set("pendingState", !0), t.isEfiled() && u.set("hasEfiledReturn", !0)
            }), e.get("refundAmountNull") == 1 && e.get("filingInfos").each(function (e) {
                e.set("refundAmountNull", !0)
            }), e.get("filingInfos").setPrintOrEfiled(), e.set("isPaidOrEfiled", function () {
                var t = e.get("filingInfos"), n = _.where(t, {isEfiledPrinted: !0});
                if (n)return!0
            });
            var d = !1;
            e.get("isSnapTax") && (d = "SnapTax"), e.set("showInTimeline", e.showInTimeline()), e.set("isIPad", !1), e.isSnapTaxFolder() ? e.set("appString", d) : e.isIpad() ? (e.set("appString", e.get("appSku") + "_ipad"), e.set("isIPad", !0)) : e.isWindows() ? e.set("appString", e.get("appSku") + "_win") : e.isMac() ? e.set("appString", e.get("appSku") + "_mac") : e.set("appString", e.get("appSku") || e.get("applicationId"));
            var v = e.get("appString");
            n == "" ? n += e.get("taxYear") + "(" + v + ")" : n += "," + e.get("taxYear") + "(" + v + ")", e.get("isPdfEntitled") ? t = "E" : t = "NE"
        }), t == "" && (t = "NA");
        var a = i + "|" + t + "|" + n;
        logger.log(a);
        var f = null;
        this.parentScreenName ? f = this.parentScreenName : f = "MyTaxReturnsScreenDash", this.noReturns(this.model), this.model.get("noReturns") && (n = "NoReturns"), app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, f, {userState: a}), this.$el.html(this.template(this.model.toJSON()))
    }, noReturns: function (e) {
        var t = e.get("folders").where({showInTimeline: !0}).length;
        t ? e.set("noReturns", !1) : e.set("noReturns", !0)
    }, amendPopup: function (e) {
        e.preventDefault();
        var t = new Date, r = ~~appVars.taxYear, s = r + 1, o = ~~e.currentTarget.href.substr(e.currentTarget.href.length - 4), u = appVars.seasonPart == "POST_SEASON", a = o.toString().slice(-2), f = !1, l = !1, c = appVars.ttoProtocol + "://" + appVars.turboTaxComDomain + appVars.ttoAmendDownload + a, h = $(e.currentTarget).data("rejected"), p = $(e.currentTarget).data("pending"), d = "";
        o == 2010 && (d = appVars.ttoAmendInstructions2010), o == 2011 && (d = appVars.ttoAmendInstructions2011), o == 2012 && (d = appVars.ttoAmendInstructions2012), o === r && (u || (f = !0)), o >= 2012 && (l = !0);
        var v = this.model.getTaxReturnIDForYear(o), m = 0, g = 0;
        $(window).width() <= 767 && (m = 350, g = -230);
        var y = $(e.currentTarget), b = new i({launcher: e.currentTarget, elementHeight: $(e.currentTarget).height(), content: "PopupViewAmend", frame: "PopupFrameMsg", taxDocumentId: v, offset: {x: m, y: g}, model: new n({showOnline: f, isTaxFileAvailable: l, selectedYear: o, dateLimit: s, ttoDownloadBtn: c, ttoReadArticleLink: d, rejectedState: h, pendingState: p, taxDocumentId: v, ttoAmendInstructions: appVars.ttoAmendInstructions}), autoOpen: !0});
        this.children.push(b), e.preventDefault()
    }, toggle: function (e) {
        var t = $(e.target), n = t.parent().find(".timeline-section-content"), r = !0;
        t.hasClass("joined") && (r = !1), r && (t.toggleClass("inactive"), t.toggleClass("active"), $(".lt-ie9").length > 0 ? n.is(":visible") ? n.css({display: "none"}) : n.css({display: "block"}) : n.slideToggle())
    }, newPopup: function (e) {
        $(e.currentTarget).data("pop-year") && this.model.set("currentSkipYear", $(e.currentTarget).data("pop-year")), t.prototype.newPopup(e, this)
    }});
    return o
}),define("modules/vault/models/DocStoreFile", [], function () {
    var e = Backbone.Model.extend({urlRoot: "/svc/docs", initialize: function () {
        this.set("isPdf", this.isPdf()), this.set("hasThumbnail", this.hasThumbnail()), this.set("isTaxFile", this.isTaxFile())
    }, parse: function (e, t) {
        var n = JSON.parse(e);
        return n
    }, isPdf: function () {
        return this.get("mimeType").indexOf("pdf") != -1
    }, isTaxFile: function () {
        return this.get("name").indexOf(".tax") != -1
    }, hasThumbnail: function () {
        return this.get("mimeType").indexOf("jpg") != -1 || this.get("mimeType").indexOf("png") != -1 || this.get("mimeType").indexOf("jpeg") != -1 || this.get("mimeType").indexOf("gif") != -1 || this.get("mimeType").indexOf("bmp") != -1
    }});
    return e
}),define("modules/vault/components/TaxTopicsComponent", ["base/Component"], function (e) {
    var t = {topics: [
        {value: null, display: "Uncategorized"},
        {value: "OTHER", display: "Other"},
        {value: "INCOME_WAGES", display: "Work"},
        {value: "INCOME_INTEREST", display: "Interest"},
        {value: "INCOME_UNEMPLOYMENT", display: "Unemployment"},
        {value: "INCOME_STATE_REFUND", display: "State Refund"},
        {value: "DEDUCTION_STUDENT_LOAN_INTEREST", display: "Student Loan Interest"},
        {value: "INCOME_DIVIDENDS", display: "Dividends"},
        {value: "INCOME_RETIREMENT", display: "Retirement"},
        {value: "INCOME_GAMBLING_WINNINGS", display: "Gambling Winnings"},
        {value: "DEDUCTION_TUITION_EXPENSES", display: "Tuition Expenses"},
        {value: "DEDUCTION_MORTGAGE_INTEREST", display: "Deduction Mortgage Interest"},
        {value: "DEDUCTION_PROPERTY_TAX", display: "Property Tax"},
        {value: "DEDUCTION_CAR_REGISTRATION_FEES", display: "Car Registration Fees"},
        {value: "DEDUCTION_CHARITY_CASH", display: "Charity Cash"},
        {value: "DEDUCTION_CHARITY_GOODS", display: "Charity Goods"},
        {value: "DEDUCTION_CHARITY_MILES", display: "Charity Miles"},
        {value: "DEDUCTION_DAY_CARE_FEES", display: "Day Care Fees"},
        {value: "DEDUCTION_MEDICAL_LONG_TERM_CARE", display: "Medical Long Term Care"},
        {value: "DEDUCTION_MEDICAL_PREMIUMS", display: "Medical Premium"},
        {value: "DEDUCTION_MEDICAL_OUT_OF_POCKET", display: "Medical Out of Pocket"},
        {value: "DEDUCTION_MEDICAL_MILES", display: "Medical Miles"},
        {value: "DEDUCTION_SALES_TAX", display: "Sales Tax"},
        {value: "DEDUCTION_GAMBLING_LOSSES", display: "Gambling Losses"}
    ], listTaxTopics: function () {
        return this.topics
    }, getDisplayName: function (e) {
        return _.find(this.topics, function (t) {
            return t.value == e
        }).display
    }};
    return t
}),define("modules/vault/models/DocStoreFiles", ["cfp", "modules/vault/models/DocStoreFile", "modules/vault/components/TaxTopicsComponent"], function (e, t, n) {
    var r = Backbone.Collection.extend({urlRoot: "/svc/docs", parse: function (e, n) {
        var r = e, i = {};
        return i.files = r.acquiredDocuments, i.files.length ? _.map(i.files, function (e) {
            return new t(e)
        }) : null
    }, comparator: function (e) {
        return-e.get("lastUpdatedOn")
    }, validate: function () {
    }, _sortedDocs: null, _getSortedDocs: function () {
        if (this._sortedDocs == null) {
            var e = _.groupBy(this.toJSON(), "taxYear"), t = {};
            t = _.sortBy(e, function (e) {
                var t = _.pluck(e, "taxYear")[0];
                return t == null ? 0 : -t
            });
            var n = [], r = [];
            for (var i = 0; i < t.length; i++)n[i] = _.groupBy(t[i], "taxTopic"), r[i] = _(n[i]).sortBy("taxTopic");
            this._sortedDocs = r
        }
        return this._sortedDocs
    }, _sortedModel: null, getSortedModel: function () {
        if (this._sortedModel == null) {
            var e = this._getSortedDocs(), t, r, i, s, o, u = {};
            u.taxYears = [];
            for (var a = 0; a < e.length; a++) {
                t = e[a], r = t[0][0].taxYear, r = r == null ? "none" : r, u.taxYears[a] = {taxYearId: r, taxYearString: r == "none" ? "No Tax Year" : "Tax Year " + r, taxTopics: []}, i = 0;
                for (var f = 0; f < t.length; f++) {
                    s = t[f], i += s.length, o = s[0].taxTopic, u.taxYears[a].taxTopics[f] = {taxTopicId: o ? o : "none", taxTopicString: n.getDisplayName(o), numDocs: s.length, docs: []};
                    for (var l = 0; l < s.length; l++)u.taxYears[a].taxTopics[f].docs[l] = s[l]
                }
                u.taxYears[a].numDocs = i
            }
            this._sortedModel = u
        }
        return u
    }});
    return r
}),define("models/InstaRefund", [], function () {
    var e = Backbone.Model.extend({url: "/svc/getInstaRefund", cacheKey: "instaRefund"});
    return e
}),define("views/screens/DashboardScreen", ["base/ScreenView", "models/UserState", "models/AccountInfo", "components/DashboardContentComponent", "text!templates/Dashboard.html", "text!templates/dashboard/TimelineContainer.html", "text!templates/dashboard/MoneyTools.html", "modules/mytaxreturns/views/screens/TimelineWidget", "modules/vault/models/DocStoreFiles", "models/TaxReturnDetail", "models/Offerings", "models/InstaRefund"], function (e, t, n, r, i, s, o, u, a, f, l, c) {
    var h = e.extend({initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.model = new t;
        var n = mytt.$.cookie("ius_signin");
        n && (mytt.$.removeCookie("ius_signin"), appVars.featureIusSignin && app.cfp.writeMattLog({error: function () {
            logger.log("Failed writing matt log")
        }, success: function () {
            logger.log("Successfully wrote matt log")
        }, context: this})), app.once("beginAnimation.dashboard", function () {
            (!Modernizr.touch || window.innerWidth > 480) && setTimeout(function () {
                $("#dashboard-healthcare-wrapper .timeline-section-content").is(":visible") && $("#dashboard-healthcare-wrapper .timeline-section-content").parents("#dashboard-healthcare-heading").find(".dashboard-row-header").addClass("active").removeClass("inactive"), $("#dashboard-content-holder").not(":visible").slideToggle(750, "linear", function () {
                    $("#dashboard-healthcare-wrapper .timeline-section-content").is(":visible") && $("#dashboard-healthcare-wrapper .timeline-section-content").parents("#dashboard-healthcare-heading").find(".dashboard-row-header").addClass("active").removeClass("inactive"), app.returnRejected || $("#dashboard-healthcare-wrapper .timeline-section-content").not(":visible").slideToggle(750, "linear")
                })
            }, 750)
        }), this.template = app.templateFactory.getTemplate("Dashboard", i)
    }, events: {"click  .offseasonSecondiLinksWrapNew": "actionMenuAction"}, pageConfig: [], dashboardWidgets: null, accountInfoCallFailed: !1, userStateCallFailed: !1, isInstaRefund: !1, render: function () {
        return app.dataRegistry.fetch({modelClass: t, load: "getUserState", loadOptions: {}, success: this.onUserStateLoadSuccess, error: this.onUserStateLoadError, context: this}), this
    }, isXS: function () {
        return $(".isXS").css("display") === "block" ? !0 : !1
    }, getTaxReturnDetails: function () {
        app.dataRegistry.fetch({modelClass: f, load: "getTaxReturnsDetail", loadOptions: {}, success: this.getTaxReturnDetailsSuccess, error: this.getTaxReturnDetailsError, context: this})
    }, getTaxReturnDetailsSuccess: function (e) {
        this.taxReturnDetail = e, this.pickAndRenderWidgets()
    }, getTaxReturnDetailsError: function () {
        this.taxReturnDetail = null, this.pickAndRenderWidgets()
    }, pickAndRenderWidgets: function () {
        Modernizr.touch || window.innerWidth <= 480 ? (this.model.set("showInactive", !0), this.model.set("isMobile", !0), app.isMobile = !0) : app.isMobile = !1;
        var e = this, t = mytt.c.taxReturnStatus.TAX_RETURN_NOT_STARTED;
        this.model.get("folder") && (t = this.model.get("folder").get("statusSummary")), t == mytt.c.taxReturnStatus.EXTENSION ? e.model.set("isStarted", !0) : t != mytt.c.taxReturnStatus.TAX_RETURN_NOT_STARTED && $.each(this.model.get("folder").get("filingInfos").getCondensedSortedFilings(), function (t, n) {
            if (n.get("returnStatus") == mytt.c.filingStates.EFILED_REJECTED || n.get("returnStatus") == mytt.c.filingStates.EFILED_HAS_ERRORS)e.model.set("showInactive", !0), e.model.set("isRejected", !0), app.returnRejected = !0;
            (n.get("returnStatus") == mytt.c.filingStates.EFILED_ACCEPTED || n.get("returnStatus") == mytt.c.filingStates.EFILED_PENDING || n.get("returnStatus") == mytt.c.filingStates.FILED_PRINT) && e.model.set("isEfiled", !0), n.get("returnStatus") == mytt.c.filingStates.STARTED && e.model.set("isStarted", !0)
        }), this.$el.html(this.template(this.model.attributes));
        var n = this.$el.find("#dashboard-content-holder");
        this.dashboardWidgets = r.getWidgets(this, n), _.each(this.dashboardWidgets, function (e) {
            e.render()
        }), this.renderTimeline(), document.referrer && document.referrer.indexOf("createAccount") !== -1 && setTimeout(function () {
            app.trigger(mytt.c.events.DASHBOARD_CREATEACCOUNT_DETECTED)
        }, 3e3)
    }, getOffering: function () {
        var e = this;
        app.dataRegistry.fetch({modelClass: l, load: "getOfferings", cache: !0, noLoading: !0, loadOptions: {}, success: function (t) {
            e.model.offerings = t;
            var n = mytt.c.dashboardStates[this.model.get("dashboard")];
            appVars.featureInstaRefund && n !== mytt.c.dashboardStates.SNAPTAX && !e.model.offerings.getCurrentProductOffering() ? app.dataRegistry.fetch({modelClass: c, load: "getInstaRefund", cache: !0, noLoading: !0, loadOptions: {}, success: function (t) {
                t && t.get("isEligible") ? app.integration.sendToInstaRefund(!1) : e.getTaxReturnDetails()
            }, error: function () {
                e.getTaxReturnDetails()
            }, context: this}) : appVars.featureInstaRefund && n === mytt.c.dashboardStates.SNAPTAX ? app.dataRegistry.fetch({modelClass: c, load: "getInstaRefund", cache: !0, noLoading: !0, loadOptions: {}, success: function (t) {
                t && t.get("isEligible") && (e.isInstaRefund = !0), e.getTaxReturnDetails()
            }, error: function () {
                e.getTaxReturnDetails()
            }, context: this}) : this.getTaxReturnDetails()
        }, error: function () {
            e.model.offerings = null, this.getTaxReturnDetails()
        }, context: this})
    }, getAccount: function () {
        app.dataRegistry.fetch({modelClass: n, load: "getAccount", cache: !1, success: this.onAccountInfoLoadSuccess, error: this.onAccountInfoLoadError, context: this})
    }, onUserStateLoadSuccess: function (e) {
        app.postfiling = !1;
        var t = mytt.c.dashboardStates[e.get("dashboard")], n = "|";
        if (t === mytt.c.dashboardStates.POST_FILING) {
            var r = e.attributes.folder.attributes.filingInfos.models;
            n = "|";
            var i = function (e) {
                switch (e) {
                    case"Federal":
                        return"FED";
                    case"Alabama":
                        return"AL";
                    case"Alaska":
                        return"AK";
                    case"American_Samoa":
                        return"AS";
                    case"American Samoa":
                        return"AS";
                    case"Arizona":
                        return"AZ";
                    case"Arkansas":
                        return"AR";
                    case"California":
                        return"CA";
                    case"Colorado":
                        return"CO";
                    case"Connecticut":
                        return"CT";
                    case"Delaware":
                        return"DE";
                    case"District_of_Columbia":
                        return"DC";
                    case"District of Columbia":
                        return"DC";
                    case"Florida":
                        return"FL";
                    case"Georgia":
                        return"GA";
                    case"Hawaii":
                        return"HI";
                    case"Idaho":
                        return"ID";
                    case"Illinois":
                        return"IL";
                    case"Indiana":
                        return"IN";
                    case"Iowa":
                        return"IA";
                    case"Kansas":
                        return"KS";
                    case"Kentucky":
                        return"KY";
                    case"Louisiana":
                        return"LA";
                    case"Maine":
                        return"ME";
                    case"Maryland":
                        return"MD";
                    case"Massachusetts":
                        return"MA";
                    case"Michigan":
                        return"MI";
                    case"Minnesota":
                        return"MN";
                    case"Mississippi":
                        return"MS";
                    case"Missouri":
                        return"MO";
                    case"Montana":
                        return"MT";
                    case"Nebraska":
                        return"NE";
                    case"Nevada":
                        return"NV";
                    case"New_Hampshire":
                        return"NH";
                    case"New Hampshire":
                        return"NH";
                    case"New_Jersey":
                        return"NJ";
                    case"New Jersey":
                        return"NJ";
                    case"New_Mexico":
                        return"NM";
                    case"New Mexico":
                        return"NM";
                    case"New_York":
                        return"NY";
                    case"New York":
                        return"NY";
                    case"North_Carolina":
                        return"NC";
                    case"North Carolina":
                        return"NC";
                    case"North_Dakota":
                        return"ND";
                    case"North Dakota":
                        return"ND";
                    case"Ohio":
                        return"OH";
                    case"Oklahoma":
                        return"OK";
                    case"Oregon":
                        return"OR";
                    case"Pennsylvania":
                        return"PA";
                    case"Rhode_Island":
                        return"RI";
                    case"Rhode Island":
                        return"RI";
                    case"South_Carolina":
                        return"SC";
                    case"South Carolina":
                        return"SC";
                    case"South_Dakota":
                        return"SD";
                    case"South Dakota":
                        return"SD";
                    case"Tennessee":
                        return"TN";
                    case"Texas":
                        return"TX";
                    case"Utah":
                        return"UT";
                    case"Vermont":
                        return"VT";
                    case"Virginia":
                        return"VA";
                    case"Washington":
                        return"WA";
                    case"West_Virginia":
                        return"WV";
                    case"West Virginia":
                        return"WV";
                    case"Wisconsin":
                        return"WI";
                    case"Wyoming":
                        return"WY";
                    default:
                        return"U"
                }
            };
            for (var s = 0; s < r.length; s++) {
                var o = r[s].attributes.returnStatus, u = i(r[s].attributes.taxAuthority);
                logger.log(u), n += u + ":", logger.log(o), o === "EFILED_ACCEPTED" ? n += "a" : o === "EFILED_REJECTED" ? n += "r" : o === "STARTED" ? n += "i" : o === "EFILED_PENDING" ? n += "pe" : o === "FILED_PRINT" ? n += "pr" : n += "u", s < r.length - 1 && (n += ",")
            }
            logger.log(n)
        }
        (t === mytt.c.dashboardStates.POST_FILING || t === mytt.c.dashboardStates.OFF_SEASON) && !app.getFFAStatus() && (app.postfiling = !0), logger.log("USERSTATE: " + t), logger.log(e), this.model = e, this.getOffering(), (t === mytt.c.dashboardStates.POST_FILING || t === mytt.c.dashboardStates.OFF_SEASON) && e.getHealthcareStatus() != null && (app.healthcareCovered = e.getHealthcareStatus());
        var a = t + "|" + "h:" + app.healthcareCovered + n;
        logger.log("beaconing the following dashboard detail string:"), logger.log(a), app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, this.name, {userState: a})
    }, onUserStateLoadError: function (e) {
        var n = "Received error " + e.errorStatus.code + ' retrieving user state: "' + e.errorStatus.description + '"';
        logger.error(n), this.userStateCallFailed = !0, this.model = new t({}, {parse: !0}), app.trigger(mytt.c.events.SCREEN_LOAD_DETAIL, this.name, {userState: "UserStateFail - fallback"}), this.getOffering()
    }, onAccountInfoLoadSuccess: function (e) {
        this.accountInfo = e, this.getTaxReturnDetails()
    }, onAccountInfoLoadError: function (e) {
        var t = "Received error " + e.errorStatus.code + ' retrieving account info: "' + e.errorStatus.description + '"';
        logger.error(t), this.accountInfoCallFailed = !0, this.accountInfo = new n({}, {parse: !0}), this.getTaxReturnDetails()
    }, renderTimeline: function () {
        var e = app.templateFactory.getTemplate("TimelineContainer", s);
        $("#newAnimationContainer").append(e), this.model.set("isFFA", app.getFFAStatus()), this.timelineWidget = new u($("#timeline")), this.template = app.templateFactory.getTemplate("MoneyTools", o), $("#viewport").append(this.template(this.model.attributes));
        if (!this.model.get("isFFA")) {
            logger.log("only non-ffa users have carousel"), logger.log("FFA status is" + this.model.get("isFFA")), $("#carousel-money-tools").carousel({interval: 8e3, pause: "hover"});
            var t, n;
            $(".money-tools-carousel, .carousel-inner").on("touchstart.carousel", function (e) {
                t = e.originalEvent.changedTouches[0].pageX
            }), $(".money-tools-carousel, .carousel-inner").on("touchend.carousel", function (e) {
                n = e.originalEvent.changedTouches[0].pageX, t > n && t - n > 20 && $("#carousel-money-tools").carousel("next"), t < n && n - t > 20 && $("#carousel-money-tools").carousel("prev")
            })
        }
    }, close: function () {
        e.prototype.close.apply(this, arguments), _.each(this.dashboardWidgets, function (e) {
            e.close()
        }), this.timelineWidget && this.timelineWidget.close(), $("#carousel-money-tools").carousel("pause"), app.off("beginAnimation.dashboard")
    }, actionMenuAction: function () {
        if ($(".offseasonSecondiLinksWrapNew").hasClass("collapsedActions") && !$(".collapsedActionsWrapperNew").is(":visible"))return $(".offseasonSecondiLinksWrapNew").removeClass("collapsedActions"), $(".collapsedActionsWrapperNew").slideDown("slow", "linear", function () {
            $(this).css({display: "block", overflow: "auto"})
        }), $("#actionsIcon").attr("src", "/less/images/timeline-down.png"), !0;
        if (!$(".offseasonSecondiLinksWrapNew").hasClass("collapsedActions") && $("#actionsIcon").is(":visible") && $(".collapsedActionsWrapperNew").is(":visible"))return $(".offseasonSecondiLinksWrapNew").addClass("collapsedActions"), $(".collapsedActionsWrapperNew").slideUp("slow", "linear", function () {
            $(this).addClass("caw-visibility-toggle").removeAttr("style")
        }), $("#actionsIcon").attr("src", "/less/images/timeline-right.png"), !0
    }});
    return h
}),define("text!templates/AccountInfo.html", [], function () {
    return'<!-- This template uses v2 markup -->\n<div class="bigWhiteBackground"></div>\n<div class="account-info row">\n    <article class="subscreen-content col-sm-12">\n        <h1>Review and edit your account info</h1>\n            {{#with securityInfo}}\n            <div class="row">\n            <div class="col-sm-12">\n            <div class="row account-info-section">\n                <div class="col-sm-10 col-xs-9">\n                <div class="row">\n                    <div class="col-sm-3"><span class="account-info-label">User ID:</span></div>\n                    <div class="col-sm-9"><span>{{userName}}</span></div>\n                </div>\n                </div>\n                <div class="col-sm-2 col-xs-3"><a href="#accountInfo/edit/userid" id="useridEditBtn" automationid="useridEditBtn" data-nav="editUsername" title="Edit User ID" class="btn  btn-small  btn-blue btn-text-spacing edit pull-right">Edit<span class="visually-hidden"> User ID</span></a></div>\n            </div>\n            <div class ="row account-info-section">\n                <div class="col-sm-10 col-xs-9">\n                <div class="row">\n                    <div class="col-sm-3"><span class="account-info-label">Password:</span></div>\n                    <div class="col-sm-9"><span>&#149;&#149;&#149;&#149;&#149;&#149;&#149;&#149;</span></div>\n                </div>\n                </div>\n                <div class="col-sm-2 col-xs-3">\n                <a href="#accountInfo/edit/password" id="passwordEditBtn" automationid="passwordEditBtn" data-nav="editPassword" title="Edit Password" class="btn  btn-small  btn-blue btn-text-spacing edit pull-right">Edit<span class="visually-hidden"> Password</span></a>\n                </div>\n            </div>\n            {{/with}}\n            {{#with contactInfo}}\n            <div class="row account-info-section">\n                <div class="col-sm-10 col-xs-9">\n                <div class="row">\n                    <div class="col-sm-3"><span class="account-info-label">Name:</span></div>\n                    <div class="col-sm-9"><span class="nameValue">{{#if firstName}}{{capitalizeAndTruncate firstName 35}} {{capitalizeAndTruncate lastName 35}}{{/if}}</span></div>\n                </div>\n                </div>\n                <div class="col-sm-2 col-xs-3"><a href="#accountInfo/edit/name" id="nameEditBtn" automationid="nameEditBtn" data-nav="editName" title="Edit Name" class="btn btn-small  btn-blue btn-text-spacing edit pull-right">Edit<span class="visually-hidden"> Name</span></a></div>\n            </div>\n            <div class="row account-info-section">\n                <div class="col-sm-10 col-xs-9">\n                <div class="row">\n                    <div class="col-sm-3"><span class="account-info-label">Email:</span></div>\n                    <div class="col-sm-9"><span class="emailValue">{{email}}</span></div>\n                </div>\n                </div>\n                <div class="col-sm-2 col-xs-3"><a href="#accountInfo/edit/email" id="emailEditBtn" automationid="emailEditBtn" data-nav="editEmail" title="Edit Email" class="btn btn-small  btn-blue btn-text-spacing edit pull-right">Edit<span class="visually-hidden"> Email</span></a></div>\n            </div>\n\n\n\n            {{/with}}\n\n            {{#with securityInfo}}\n            <div class="row account-info-section">\n                <div class="col-sm-10 col-xs-9">\n                    <div class="row">\n                        <div class="col-sm-3"><span class="account-info-label">Security Question:</span></div>\n                        <div class="col-sm-9"><span class="securityQuestionValue">{{question}}</span></div>\n                    </div>\n                    <div class="row">\n                        <div class="col-sm-3"><span class="account-info-label">Your Answer:</span></div>\n                        <div class="col-sm-9"><span>&#149;&#149;&#149;&#149;&#149;&#149;&#149;&#149;</span></div>\n                    </div>\n                </div>\n                <div class="col-sm-2 col-xs-3"><a href="#accountInfo/edit/security" id="securityEditBtn" automationid="securityEditBtn" data-nav="editSecurity" title="Edit Security Question" class="btn  btn-small  btn-blue btn-text-spacing edit pull-right">Edit<span class="visually-hidden"> Security Question</span></a></div>\n            </div>\n            {{/with}}\n            {{#unless ffa}}\n            <div class="row account-info-section">\n                <div class="col-sm-10 col-xs-9">\n                <div class="row">\n                    <div class="col-sm-3"><span class="account-info-label">Billing &amp; Shipping:</span></div>\n                    <div class="col-sm-9"><span class="placeholder">Select Edit to review this information.</span></div>\n                </div>\n                </div>\n                <div class="col-sm-2 col-xs-3"><a href="https://{{ttcomDomain}}/commerce/account/secure/edit_billing.jsp" target="_blank" id="billingEditBtn" automationid="billingEditBtn" data-nav="billingEditBtn" title="Edit Billing & Shipping" class="btn btn-small  btn-blue btn-text-spacing edit pull-right">Edit<span class="visually-hidden"> Billing &amp; Shipping</span></a></div>\n            </div>\n            <div class="row account-info-section">\n                <div class="col-sm-10 col-xs-9">\n                <div class="row">\n                    <div class="col-sm-3"><span class="account-info-label">Payment Information:</span></div>\n                    <div class="col-sm-9"><span class="placeholder">Select Edit to review this information.</span></div>\n                </div>\n                </div>\n                <div class="col-sm-2 col-xs-3"><a href="https://{{ttcomDomain}}/commerce/account/secure/edit_payment_information.jsp" target="_blank" id="paymentEditBtn" automationid="paymentEditBtn" data-nav="paymentEditBtn" title="Edit Payment Information" class="btn btn-small  btn-blue btn-text-spacing edit pull-right">Edit<span class="visually-hidden"> Payment Information</span></a></div>\n            </div>\n            {{/unless}}\n            </div>\n            </div>\n    </article>\n</div>\n'
}),define("views/screens/AccountInfoScreen", ["base/ScreenView", "models/AccountInfo", "views/widgets/PopupWidget", "views/widgets/PopFlipWidget", "components/FeatureSwitch", "text!templates/AccountInfo.html"], function (e, t, n, r, i, s) {
    var o = e.extend({initialize: function () {
        e.prototype.initialize.apply(this, arguments), logger.log("AccountInfo:Initialize"), this.model = new t
    }, render: function () {
        return logger.log("AccountInfo:Render"), app.dataRegistry.fetch({modelClass: t, load: "getAccount", cache: !1, loadOptions: {}, success: this.onAccountInfoLoadSuccess, context: this}), this
    }, changesSavedPopup: function (e) {
        this.popupChangesSaved = new n({launcher: $("#" + e + "EditBtn"), elementHeight: "", content: "PopupUseridMsg", frame: "PopupFrameMsgNoClose", msgText: "Your changes have been saved", offset: {x: 90, y: -41}}), this.children.push(this.popupChangesSaved);
        var t = this;
        return setTimeout(function () {
            t.popupChangesSaved.fadeOut(2e3)
        }, 1500), !1
    }, checkChangesSaved: function () {
        var e = location.hash.split("/");
        e[1] == "success" && this.changesSavedPopup(e[2])
    }, onAccountInfoLoadSuccess: function (e) {
        this.model = e, logger.log("AccountInfo:Display"), this.template = app.templateFactory.getTemplate("AccountInfo", s), this.$el.html(this.template(this.model.getContext({ffa: app.getFFAStatus()}))), this.checkChangesSaved(), this.missingInfoToolTips()
    }, missingInfoToolTips: function () {
        var e = [];
        this.model.get("contactInfo").get("firstName") == "" && e.push({element: ".nameValue", text: "Name is missing", log: "No First Name"}), this.model.get("email").get("email") == "" && e.push({element: ".emailValue", text: "Email address is missing", log: "No Email address"}), this.model.get("mobile").get("mobileNumber") == "" && e.push({element: ".mobileValue", text: "Mobile number is missing", log: "No Mobile number"}), this.model.get("securityInfo").get("question") == "" && e.push({element: ".securityQuestionValue", text: "Security question missing", log: "No Security Question"}), _.each(e, function (e) {
            logger.log(e.log), $(e.element).html('<span class="highlight-on">' + e.text + "</span>"), $(e.element).off("hover")
        })
    }});
    return o
}),define("models/OrderHistory", [], function () {
    function t(e) {
        var t = (new Date(appVars.currentDate)).getFullYear(), n = _.filter(e, function (e) {
            return e.year >= t
        }), r = !1;
        return _.each(n, function (e) {
            for (var t = 0; t < e.orders.length; t++)for (var n = 0; n < e.orders[t].product.length; n++)if (e.orders[t].product[n].product.toLowerCase().indexOf("download") > -1) {
                r = !0;
                return
            }
        }), r
    }

    function n(e) {
        var t = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"), n = e, r = n.getDate(), i = n.getMonth(), s = n.getFullYear();
        return t[i] + " " + r + ", " + s
    }

    var e = Backbone.Model.extend({parse: function (e) {
        var r = /TY(\d{4,4})/, i = {}, s = _.map(e.orderSummary, function (e) {
            e.orderDate = new Date(e.orderDate);
            var t = e.product[0].product;
            if (t)return e.orderYear = parseInt(r.exec(t)[1]), e.orderDate = n(e.orderDate), e.orderYear
        });
        return s = _.uniq(s), i.years = [], _.each(s, function (t) {
            if (t) {
                var n = _.filter(e.orderSummary, function (e) {
                    return e.orderYear === t
                });
                i.years.push({year: t, orders: n})
            }
        }), i.downloadAvailable = t(i.years), i
    }});
    return e
}),define("text!templates/OrderHistory.html", [], function () {
    return'<div class="bigWhiteBackground"></div>\n<div class="row">\n    <article class="col-sm-12">\n        <div class="row">\n            <div class="col-sm-12">\n                <h1>Review your orders</h1>\n                {{#if years.length}}\n                    {{#if downloadAvailable}}\n                        <a class="btn btn-blue btn-medium" target="_blank" href="https://{{ttcomDomain}}/commerce/account/secure/login.jsp?pagecontext=download">View Downloads & Unlocks</a>\n                        <br/><br/>\n                    {{/if}}\n                    <a href="#orders" automationid="cant-find-order" id="cant-find-order" data-popup-content="PopupOrderHistory" data-popup-frame="PopupFrameMsg" data-popup-x="330" data-popup-y="0" data-popup-cardflip="true" >Can\'t find an order?</a>\n                {{/if}}\n            </div>\n        </div>\n        {{#unless years.length}}\n        <div class="noOrders">\n            <p class="graytext large">You don\'t have any orders on file. This could be because you: </p>\n            <div class="icn-block icn-multipleID">\n                <p><strong>Have more than one user ID</strong></p>\n                <p>If you know your other user ID, try logging in with it to see if you ordered through that account. If you aren\'t sure what it is, we can help you <a href="#recovery" class="signOutAndRecover">identify your other ID(s)</a> and get you signed in with the correct one.</p>\n            </div>\n            <div class="icn-block icn-deductedFee">\n                <p><strong>Deducted a TurboTax fee from your refund</strong></p>\n                <p>Fees for products or services that you deducted from your tax refund may not appear here as an order.</p>\n            </div>\n            <div class="icn-block icn-shoppingCart">\n                <p><strong>Did not purchase directly from TurboTax</strong></p>\n                <p>We don\'t have order details for purchases made at other online retailers, stores or mobile app shops.</p>\n            </div>\n            <div class="icn-block icn-calendar">\n                <p><strong>Have not yet paid for the current year</strong></p>\n                <p>Orders will only appear here when you have paid for them.</p>\n            </div>\n        </div>\n\n        {{else}}\n            {{#foreach years}}\n                <div class="order-history-section">\n                    <h2>Tax Year {{year}} Orders</h2>\n                    {{#foreach orders}}\n                        <section class="relative row">\n                            <div class="col-sm-9">\n                                <div class="row">\n                                    <div class="orderLabel col-xs-4">Date:</div>\n                                    <div class="col-xs-8">{{orderDate}}</div>\n                                </div>\n                                <div class="row">\n                                    <div class="orderLabel col-xs-4">Order Number:</div>\n                                    <div class="col-xs-8">{{orderNumber}}</div>\n                                </div>\n                                <div class="row">\n                                    <div class="orderLabel col-xs-4">Items Ordered:</div>\n                                    <ul class="item-list col-xs-8">\n                                    {{#foreach product}}\n                                        <div class="row col-xs-12"><li>{{product}}</li></div>\n                                    {{/foreach}}\n                                    </ul>\n                                </div>\n                            </div>\n                            <div class="col-sm-3 view-details-btn">\n                                <a href="#orders/detail/{{orderNumber}}" automationid="orderDetails" data-nav="orderDetails" title="View Details" class="btn btn-small  btn-blue btn-text-spacing btn-view-details order">View Details</a>\n                            </div>\n                        </section>\n\n                        {{#unless $last}}\n                            <hr class="orderSeparator" />\n                        {{/unless}}\n                    {{/foreach}}\n                    {{#unless $last}}\n                    <hr/>\n                    {{/unless}}\n                </div>\n            {{/foreach}}\n        {{/unless}}\n\n    </article>\n</div>\n'
}),define("views/screens/OrderHistoryScreen", ["base/ScreenView", "models/OrderHistory", "text!templates/OrderHistory.html"], function (e, t, n) {
    var r = e.extend({events: {"click #cant-find-order, #find-out-why": "newPopup"}, initialize: function () {
        e.prototype.initialize.apply(this, arguments), this.model !== undefined && this.model.get("orderYear") !== undefined ? this.orderYear = parseInt(this.model.get("orderYear")) : this.orderYear = null, this.model = new t
    }, render: function () {
        return app.dataRegistry.fetch({modelClass: t, load: "getOrderHistory", success: this.onOrderHistoryLoadSuccess, whileLoading: this.orderHistoryWhileLoading, context: this}), this
    }, orderHistoryWhileLoading: function () {
        app.wrapper.enableLoadingState.call(app.wrapper, "Looking for orders — this may take up to 30 seconds.")
    }, onOrderHistoryLoadSuccess: function (e) {
        this.template = app.templateFactory.getTemplate("OrderHistory", n), this.model = e, this.model.set("orderYear", this.orderYear), this.orderYear && this.model.set("years", _.where(this.model.get("years"), {year: this.orderYear})), this.$el.html(this.template(this.model.toJSON())), $(".signOutAndRecover").click(function (e) {
            logger.log(e), e.preventDefault(), logger.log("SIGN OUT SCREEN"), app.security.signOut({context: this, complete: function () {
                app.toScreen("modules/authwidgets/views/screens/CombinedRecoveryScreen")
            }})
        })
    }});
    return r
});