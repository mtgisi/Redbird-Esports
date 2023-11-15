(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const n of document.querySelectorAll('link[rel="modulepreload"]'))
        o(n);
    new MutationObserver(n=>{
        for (const r of n)
            if (r.type === "childList")
                for (const i of r.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && o(i)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function s(n) {
        const r = {};
        return n.integrity && (r.integrity = n.integrity),
        n.referrerPolicy && (r.referrerPolicy = n.referrerPolicy),
        n.crossOrigin === "use-credentials" ? r.credentials = "include" : n.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin",
        r
    }
    function o(n) {
        if (n.ep)
            return;
        n.ep = !0;
        const r = s(n);
        fetch(n.href, r)
    }
}
)();
function ks(e, t) {
    const s = Object.create(null)
      , o = e.split(",");
    for (let n = 0; n < o.length; n++)
        s[o[n]] = !0;
    return t ? n=>!!s[n.toLowerCase()] : n=>!!s[n]
}
const X = {}
  , ut = []
  , we = ()=>{}
  , Jn = ()=>!1
  , qn = /^on[^a-z]/
  , ss = e=>qn.test(e)
  , Ns = e=>e.startsWith("onUpdate:")
  , ce = Object.assign
  , js = (e,t)=>{
    const s = e.indexOf(t);
    s > -1 && e.splice(s, 1)
}
  , Yn = Object.prototype.hasOwnProperty
  , H = (e,t)=>Yn.call(e, t)
  , I = Array.isArray
  , ft = e=>os(e) === "[object Map]"
  , Ho = e=>os(e) === "[object Set]"
  , k = e=>typeof e == "function"
  , re = e=>typeof e == "string"
  , Hs = e=>typeof e == "symbol"
  , G = e=>e !== null && typeof e == "object"
  , Lo = e=>G(e) && k(e.then) && k(e.catch)
  , Uo = Object.prototype.toString
  , os = e=>Uo.call(e)
  , Vn = e=>os(e).slice(8, -1)
  , Do = e=>os(e) === "[object Object]"
  , Ls = e=>re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e
  , zt = ks(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted")
  , ns = e=>{
    const t = Object.create(null);
    return s=>t[s] || (t[s] = e(s))
}
  , Xn = /-(\w)/g
  , dt = ns(e=>e.replace(Xn, (t,s)=>s ? s.toUpperCase() : ""))
  , Zn = /\B([A-Z])/g
  , gt = ns(e=>e.replace(Zn, "-$1").toLowerCase())
  , Ko = ns(e=>e.charAt(0).toUpperCase() + e.slice(1))
  , ms = ns(e=>e ? `on ${Ko(e)}` : "")
  , At = (e,t)=>!Object.is(e, t)
  , gs = (e,t)=>{
    for (let s = 0; s < e.length; s++)
        e[s](t)
}
  , Vt = (e,t,s)=>{
    Object.defineProperty(e, t, {
        configurable: !0,
        enumerable: !1,
        value: s
    })
}
  , Qn = e=>{
    const t = parseFloat(e);
    return isNaN(t) ? e : t
}
;
let co;
const Ss = ()=>co || (co = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function $(e) {
    if (I(e)) {
        const t = {};
        for (let s = 0; s < e.length; s++) {
            const o = e[s]
              , n = re(o) ? sr(o) : $(o);
            if (n)
                for (const r in n)
                    t[r] = n[r]
        }
        return t
    } else {
        if (re(e))
            return e;
        if (G(e))
            return e
    }
}
const Gn = /;(?![^(]*\))/g
  , er = /:([^]+)/
  , tr = /\/\*[^]*?\*\//g;
function sr(e) {
    const t = {};
    return e.replace(tr, "").split(Gn).forEach(s=>{
        if (s) {
            const o = s.split(er);
            o.length > 1 && (t[o[0].trim()] = o[1].trim())
        }
    }
    ),
    t
}
function Us(e) {
    let t = "";
    if (re(e))
        t = e;
    else if (I(e))
        for (let s = 0; s < e.length; s++) {
            const o = Us(e[s]);
            o && (t += o + " ")
        }
    else if (G(e))
        for (const s in e)
            e[s] && (t += s + " ");
    return t.trim()
}
const or = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly"
  , nr = ks(or);
function Wo(e) {
    return !!e || e === ""
}
const te = e=>re(e) ? e : e == null ? "" : I(e) || G(e) && (e.toString === Uo || !k(e.toString)) ? JSON.stringify(e, zo, 2) : String(e)
  , zo = (e,t)=>t && t.__v_isRef ? zo(e, t.value) : ft(t) ? {
    [`Map(${t.size})`]: [...t.entries()].reduce((s,[o,n])=>(s[`${o} =>`] = n,
    s), {})
} : Ho(t) ? {
    [`Set(${t.size})`]: [...t.values()]
} : G(t) && !I(t) && !Do(t) ? String(t) : t;
let ge;
class Jo {
    constructor(t=!1) {
        this.detached = t,
        this._active = !0,
        this.effects = [],
        this.cleanups = [],
        this.parent = ge,
        !t && ge && (this.index = (ge.scopes || (ge.scopes = [])).push(this) - 1)
    }
    get active() {
        return this._active
    }
    run(t) {
        if (this._active) {
            const s = ge;
            try {
                return ge = this,
                t()
            } finally {
                ge = s
            }
        }
    }
    on() {
        ge = this
    }
    off() {
        ge = this.parent
    }
    stop(t) {
        if (this._active) {
            let s, o;
            for (s = 0,
            o = this.effects.length; s < o; s++)
                this.effects[s].stop();
            for (s = 0,
            o = this.cleanups.length; s < o; s++)
                this.cleanups[s]();
            if (this.scopes)
                for (s = 0,
                o = this.scopes.length; s < o; s++)
                    this.scopes[s].stop(!0);
            if (!this.detached && this.parent && !t) {
                const n = this.parent.scopes.pop();
                n && n !== this && (this.parent.scopes[this.index] = n,
                n.index = this.index)
            }
            this.parent = void 0,
            this._active = !1
        }
    }
}
function qo(e) {
    return new Jo(e)
}
function rr(e, t=ge) {
    t && t.active && t.effects.push(e)
}
function Yo() {
    return ge
}
function ir(e) {
    ge && ge.cleanups.push(e)
}
const Ds = e=>{
    const t = new Set(e);
    return t.w = 0,
    t.n = 0,
    t
}
  , Vo = e=>(e.w & De) > 0
  , Xo = e=>(e.n & De) > 0
  , lr = ({deps: e})=>{
    if (e.length)
        for (let t = 0; t < e.length; t++)
            e[t].w |= De
}
  , cr = e=>{
    const {deps: t} = e;
    if (t.length) {
        let s = 0;
        for (let o = 0; o < t.length; o++) {
            const n = t[o];
            Vo(n) && !Xo(n) ? n.delete(e) : t[s++] = n,
            n.w &= ~De,
            n.n &= ~De
        }
        t.length = s
    }
}
  , Xt = new WeakMap;
let St = 0
  , De = 1;
const Es = 30;
let xe;
const Ze = Symbol("")
  , $s = Symbol("");
class Ks {
    constructor(t, s=null, o) {
        this.fn = t,
        this.scheduler = s,
        this.active = !0,
        this.deps = [],
        this.parent = void 0,
        rr(this, o)
    }
    run() {
        if (!this.active)
            return this.fn();
        let t = xe
          , s = He;
        for (; t; ) {
            if (t === this)
                return;
            t = t.parent
        }
        try {
            return this.parent = xe,
            xe = this,
            He = !0,
            De = 1 << ++St,
            St <= Es ? lr(this) : ao(this),
            this.fn()
        } finally {
            St <= Es && cr(this),
            De = 1 << --St,
            xe = this.parent,
            He = s,
            this.parent = void 0,
            this.deferStop && this.stop()
        }
    }
    stop() {
        xe === this ? this.deferStop = !0 : this.active && (ao(this),
        this.onStop && this.onStop(),
        this.active = !1)
    }
}
function ao(e) {
    const {deps: t} = e;
    if (t.length) {
        for (let s = 0; s < t.length; s++)
            t[s].delete(e);
        t.length = 0
    }
}
let He = !0;
const Zo = [];
function bt() {
    Zo.push(He),
    He = !1
}
function xt() {
    const e = Zo.pop();
    He = e === void 0 ? !0 : e
}
function he(e, t, s) {
    if (He && xe) {
        let o = Xt.get(e);
        o || Xt.set(e, o = new Map);
        let n = o.get(s);
        n || o.set(s, n = Ds()),
        Qo(n)
    }
}
function Qo(e, t) {
    let s = !1;
    St <= Es ? Xo(e) || (e.n |= De,
    s = !Vo(e)) : s = !e.has(xe),
    s && (e.add(xe),
    xe.deps.push(e))
}
function Re(e, t, s, o, n, r) {
    const i = Xt.get(e);
    if (!i)
        return;
    let c = [];
    if (t === "clear")
        c = [...i.values()];
    else if (s === "length" && I(e)) {
        const u = Number(o);
        i.forEach((_,p)=>{
            (p === "length" || p >= u) && c.push(_)
        }
        )
    } else
        switch (s !== void 0 && c.push(i.get(s)),
        t) {
        case "add":
            I(e) ? Ls(s) && c.push(i.get("length")) : (c.push(i.get(Ze)),
            ft(e) && c.push(i.get($s)));
            break;
        case "delete":
            I(e) || (c.push(i.get(Ze)),
            ft(e) && c.push(i.get($s)));
            break;
        case "set":
            ft(e) && c.push(i.get(Ze));
            break
        }
    if (c.length === 1)
        c[0] && Os(c[0]);
    else {
        const u = [];
        for (const _ of c)
            _ && u.push(..._);
        Os(Ds(u))
    }
}
function Os(e, t) {
    const s = I(e) ? e : [...e];
    for (const o of s)
        o.computed && uo(o);
    for (const o of s)
        o.computed || uo(o)
}
function uo(e, t) {
    (e !== xe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
function ar(e, t) {
    var s;
    return (s = Xt.get(e)) == null ? void 0 : s.get(t)
}
const ur = ks("__proto__,__v_isRef,__isVue")
  , Go = new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e !== "arguments" && e !== "caller").map(e=>Symbol[e]).filter(Hs))
  , fr = Ws()
  , _r = Ws(!1, !0)
  , dr = Ws(!0)
  , fo = hr();
function hr() {
    const e = {};
    return ["includes", "indexOf", "lastIndexOf"].forEach(t=>{
        e[t] = function(...s) {
            const o = L(this);
            for (let r = 0, i = this.length; r < i; r++)
                he(o, "get", r + "");
            const n = o[t](...s);
            return n === -1 || n === !1 ? o[t](...s.map(L)) : n
        }
    }
    ),
    ["push", "pop", "shift", "unshift", "splice"].forEach(t=>{
        e[t] = function(...s) {
            bt();
            const o = L(this)[t].apply(this, s);
            return xt(),
            o
        }
    }
    ),
    e
}
function pr(e) {
    const t = L(this);
    return he(t, "has", e),
    t.hasOwnProperty(e)
}
function Ws(e=!1, t=!1) {
    return function(o, n, r) {
        if (n === "__v_isReactive")
            return !e;
        if (n === "__v_isReadonly")
            return e;
        if (n === "__v_isShallow")
            return t;
        if (n === "__v_raw" && r === (e ? t ? Pr : nn : t ? on : sn).get(o))
            return o;
        const i = I(o);
        if (!e) {
            if (i && H(fo, n))
                return Reflect.get(fo, n, r);
            if (n === "hasOwnProperty")
                return pr
        }
        const c = Reflect.get(o, n, r);
        return (Hs(n) ? Go.has(n) : ur(n)) || (e || he(o, "get", n),
        t) ? c : se(c) ? i && Ls(n) ? c : c.value : G(c) ? e ? rn(c) : is(c) : c
    }
}
const mr = en()
  , gr = en(!0);
function en(e=!1) {
    return function(s, o, n, r) {
        let i = s[o];
        if (ht(i) && se(i) && !se(n))
            return !1;
        if (!e && (!Zt(n) && !ht(n) && (i = L(i),
        n = L(n)),
        !I(s) && se(i) && !se(n)))
            return i.value = n,
            !0;
        const c = I(s) && Ls(o) ? Number(o) < s.length : H(s, o)
          , u = Reflect.set(s, o, n, r);
        return s === L(r) && (c ? At(n, i) && Re(s, "set", o, n) : Re(s, "add", o, n)),
        u
    }
}
function br(e, t) {
    const s = H(e, t);
    e[t];
    const o = Reflect.deleteProperty(e, t);
    return o && s && Re(e, "delete", t, void 0),
    o
}
function xr(e, t) {
    const s = Reflect.has(e, t);
    return (!Hs(t) || !Go.has(t)) && he(e, "has", t),
    s
}
function yr(e) {
    return he(e, "iterate", I(e) ? "length" : Ze),
    Reflect.ownKeys(e)
}
const tn = {
    get: fr,
    set: mr,
    deleteProperty: br,
    has: xr,
    ownKeys: yr
}
  , vr = {
    get: dr,
    set(e, t) {
        return !0
    },
    deleteProperty(e, t) {
        return !0
    }
}
  , wr = ce({}, tn, {
    get: _r,
    set: gr
})
  , zs = e=>e
  , rs = e=>Reflect.getPrototypeOf(e);
function Ht(e, t, s=!1, o=!1) {
    e = e.__v_raw;
    const n = L(e)
      , r = L(t);
    s || (t !== r && he(n, "get", t),
    he(n, "get", r));
    const {has: i} = rs(n)
      , c = o ? zs : s ? Ys : It;
    if (i.call(n, t))
        return c(e.get(t));
    if (i.call(n, r))
        return c(e.get(r));
    e !== n && e.get(t)
}
function Lt(e, t=!1) {
    const s = this.__v_raw
      , o = L(s)
      , n = L(e);
    return t || (e !== n && he(o, "has", e),
    he(o, "has", n)),
    e === n ? s.has(e) : s.has(e) || s.has(n)
}
function Ut(e, t=!1) {
    return e = e.__v_raw,
    !t && he(L(e), "iterate", Ze),
    Reflect.get(e, "size", e)
}
function _o(e) {
    e = L(e);
    const t = L(this);
    return rs(t).has.call(t, e) || (t.add(e),
    Re(t, "add", e, e)),
    this
}
function ho(e, t) {
    t = L(t);
    const s = L(this)
      , {has: o, get: n} = rs(s);
    let r = o.call(s, e);
    r || (e = L(e),
    r = o.call(s, e));
    const i = n.call(s, e);
    return s.set(e, t),
    r ? At(t, i) && Re(s, "set", e, t) : Re(s, "add", e, t),
    this
}
function po(e) {
    const t = L(this)
      , {has: s, get: o} = rs(t);
    let n = s.call(t, e);
    n || (e = L(e),
    n = s.call(t, e)),
    o && o.call(t, e);
    const r = t.delete(e);
    return n && Re(t, "delete", e, void 0),
    r
}
function mo() {
    const e = L(this)
      , t = e.size !== 0
      , s = e.clear();
    return t && Re(e, "clear", void 0, void 0),
    s
}
function Dt(e, t) {
    return function(o, n) {
        const r = this
          , i = r.__v_raw
          , c = L(i)
          , u = t ? zs : e ? Ys : It;
        return !e && he(c, "iterate", Ze),
        i.forEach((_,p)=>o.call(n, u(_), u(p), r))
    }
}
function Kt(e, t, s) {
    return function(...o) {
        const n = this.__v_raw
          , r = L(n)
          , i = ft(r)
          , c = e === "entries" || e === Symbol.iterator && i
          , u = e === "keys" && i
          , _ = n[e](...o)
          , p = s ? zs : t ? Ys : It;
        return !t && he(r, "iterate", u ? $s : Ze),
        {
            next() {
                const {value: y, done: S} = _.next();
                return S ? {
                    value: y,
                    done: S
                } : {
                    value: c ? [p(y[0]), p(y[1])] : p(y),
                    done: S
                }
            },
            [Symbol.iterator]() {
                return this
            }
        }
    }
}
function ke(e) {
    return function(...t) {
        return e === "delete" ? !1 : this
    }
}
function Sr() {
    const e = {
        get(r) {
            return Ht(this, r)
        },
        get size() {
            return Ut(this)
        },
        has: Lt,
        add: _o,
        set: ho,
        delete: po,
        clear: mo,
        forEach: Dt(!1, !1)
    }
      , t = {
        get(r) {
            return Ht(this, r, !1, !0)
        },
        get size() {
            return Ut(this)
        },
        has: Lt,
        add: _o,
        set: ho,
        delete: po,
        clear: mo,
        forEach: Dt(!1, !0)
    }
      , s = {
        get(r) {
            return Ht(this, r, !0)
        },
        get size() {
            return Ut(this, !0)
        },
        has(r) {
            return Lt.call(this, r, !0)
        },
        add: ke("add"),
        set: ke("set"),
        delete: ke("delete"),
        clear: ke("clear"),
        forEach: Dt(!0, !1)
    }
      , o = {
        get(r) {
            return Ht(this, r, !0, !0)
        },
        get size() {
            return Ut(this, !0)
        },
        has(r) {
            return Lt.call(this, r, !0)
        },
        add: ke("add"),
        set: ke("set"),
        delete: ke("delete"),
        clear: ke("clear"),
        forEach: Dt(!0, !0)
    };
    return ["keys", "values", "entries", Symbol.iterator].forEach(r=>{
        e[r] = Kt(r, !1, !1),
        s[r] = Kt(r, !0, !1),
        t[r] = Kt(r, !1, !0),
        o[r] = Kt(r, !0, !0)
    }
    ),
    [e, s, t, o]
}
const [Er,$r,Or,Cr] = Sr();
function Js(e, t) {
    const s = t ? e ? Cr : Or : e ? $r : Er;
    return (o,n,r)=>n === "__v_isReactive" ? !e : n === "__v_isReadonly" ? e : n === "__v_raw" ? o : Reflect.get(H(s, n) && n in o ? s : o, n, r)
}
const Tr = {
    get: Js(!1, !1)
}
  , Ar = {
    get: Js(!1, !0)
}
  , Ir = {
    get: Js(!0, !1)
}
  , sn = new WeakMap
  , on = new WeakMap
  , nn = new WeakMap
  , Pr = new WeakMap;
function Mr(e) {
    switch (e) {
    case "Object":
    case "Array":
        return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
        return 2;
    default:
        return 0
    }
}
function Rr(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Mr(Vn(e))
}
function is(e) {
    return ht(e) ? e : qs(e, !1, tn, Tr, sn)
}
function Fr(e) {
    return qs(e, !1, wr, Ar, on)
}
function rn(e) {
    return qs(e, !0, vr, Ir, nn)
}
function qs(e, t, s, o, n) {
    if (!G(e) || e.__v_raw && !(t && e.__v_isReactive))
        return e;
    const r = n.get(e);
    if (r)
        return r;
    const i = Rr(e);
    if (i === 0)
        return e;
    const c = new Proxy(e,i === 2 ? o : s);
    return n.set(e, c),
    c
}
function Le(e) {
    return ht(e) ? Le(e.__v_raw) : !!(e && e.__v_isReactive)
}
function ht(e) {
    return !!(e && e.__v_isReadonly)
}
function Zt(e) {
    return !!(e && e.__v_isShallow)
}
function ln(e) {
    return Le(e) || ht(e)
}
function L(e) {
    const t = e && e.__v_raw;
    return t ? L(t) : e
}
function ls(e) {
    return Vt(e, "__v_skip", !0),
    e
}
const It = e=>G(e) ? is(e) : e
  , Ys = e=>G(e) ? rn(e) : e;
function cn(e) {
    He && xe && (e = L(e),
    Qo(e.dep || (e.dep = Ds())))
}
function an(e, t) {
    e = L(e);
    const s = e.dep;
    s && Os(s)
}
function se(e) {
    return !!(e && e.__v_isRef === !0)
}
function Qt(e) {
    return Br(e, !1)
}
function Br(e, t) {
    return se(e) ? e : new kr(e,t)
}
class kr {
    constructor(t, s) {
        this.__v_isShallow = s,
        this.dep = void 0,
        this.__v_isRef = !0,
        this._rawValue = s ? t : L(t),
        this._value = s ? t : It(t)
    }
    get value() {
        return cn(this),
        this._value
    }
    set value(t) {
        const s = this.__v_isShallow || Zt(t) || ht(t);
        t = s ? t : L(t),
        At(t, this._rawValue) && (this._rawValue = t,
        this._value = s ? t : It(t),
        an(this))
    }
}
function f(e) {
    return se(e) ? e.value : e
}
const Nr = {
    get: (e,t,s)=>f(Reflect.get(e, t, s)),
    set: (e,t,s,o)=>{
        const n = e[t];
        return se(n) && !se(s) ? (n.value = s,
        !0) : Reflect.set(e, t, s, o)
    }
};
function un(e) {
    return Le(e) ? e : new Proxy(e,Nr)
}
function jr(e) {
    const t = I(e) ? new Array(e.length) : {};
    for (const s in e)
        t[s] = Lr(e, s);
    return t
}
class Hr {
    constructor(t, s, o) {
        this._object = t,
        this._key = s,
        this._defaultValue = o,
        this.__v_isRef = !0
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t
    }
    set value(t) {
        this._object[this._key] = t
    }
    get dep() {
        return ar(L(this._object), this._key)
    }
}
function Lr(e, t, s) {
    const o = e[t];
    return se(o) ? o : new Hr(e,t,s)
}
class Ur {
    constructor(t, s, o, n) {
        this._setter = s,
        this.dep = void 0,
        this.__v_isRef = !0,
        this.__v_isReadonly = !1,
        this._dirty = !0,
        this.effect = new Ks(t,()=>{
            this._dirty || (this._dirty = !0,
            an(this))
        }
        ),
        this.effect.computed = this,
        this.effect.active = this._cacheable = !n,
        this.__v_isReadonly = o
    }
    get value() {
        const t = L(this);
        return cn(t),
        (t._dirty || !t._cacheable) && (t._dirty = !1,
        t._value = t.effect.run()),
        t._value
    }
    set value(t) {
        this._setter(t)
    }
}
function Dr(e, t, s=!1) {
    let o, n;
    const r = k(e);
    return r ? (o = e,
    n = we) : (o = e.get,
    n = e.set),
    new Ur(o,n,r || !n,s)
}
function Ue(e, t, s, o) {
    let n;
    try {
        n = o ? e(...o) : e()
    } catch (r) {
        cs(r, t, s)
    }
    return n
}
function Se(e, t, s, o) {
    if (k(e)) {
        const r = Ue(e, t, s, o);
        return r && Lo(r) && r.catch(i=>{
            cs(i, t, s)
        }
        ),
        r
    }
    const n = [];
    for (let r = 0; r < e.length; r++)
        n.push(Se(e[r], t, s, o));
    return n
}
function cs(e, t, s, o=!0) {
    const n = t ? t.vnode : null;
    if (t) {
        let r = t.parent;
        const i = t.proxy
          , c = s;
        for (; r; ) {
            const _ = r.ec;
            if (_) {
                for (let p = 0; p < _.length; p++)
                    if (_[p](e, i, c) === !1)
                        return
            }
            r = r.parent
        }
        const u = t.appContext.config.errorHandler;
        if (u) {
            Ue(u, null, 10, [e, i, c]);
            return
        }
    }
    Kr(e, s, n, o)
}
function Kr(e, t, s, o=!0) {
    console.error(e)
}
let Pt = !1
  , Cs = !1;
const ue = [];
let Ie = 0;
const _t = [];
let Me = null
  , Ve = 0;
const fn = Promise.resolve();
let Vs = null;
function _n(e) {
    const t = Vs || fn;
    return e ? t.then(this ? e.bind(this) : e) : t
}
function Wr(e) {
    let t = Ie + 1
      , s = ue.length;
    for (; t < s; ) {
        const o = t + s >>> 1;
        Mt(ue[o]) < e ? t = o + 1 : s = o
    }
    return t
}
function Xs(e) {
    (!ue.length || !ue.includes(e, Pt && e.allowRecurse ? Ie + 1 : Ie)) && (e.id == null ? ue.push(e) : ue.splice(Wr(e.id), 0, e),
    dn())
}
function dn() {
    !Pt && !Cs && (Cs = !0,
    Vs = fn.then(pn))
}
function zr(e) {
    const t = ue.indexOf(e);
    t > Ie && ue.splice(t, 1)
}
function Jr(e) {
    I(e) ? _t.push(...e) : (!Me || !Me.includes(e, e.allowRecurse ? Ve + 1 : Ve)) && _t.push(e),
    dn()
}
function go(e, t=Pt ? Ie + 1 : 0) {
    for (; t < ue.length; t++) {
        const s = ue[t];
        s && s.pre && (ue.splice(t, 1),
        t--,
        s())
    }
}
function hn(e) {
    if (_t.length) {
        const t = [...new Set(_t)];
        if (_t.length = 0,
        Me) {
            Me.push(...t);
            return
        }
        for (Me = t,
        Me.sort((s,o)=>Mt(s) - Mt(o)),
        Ve = 0; Ve < Me.length; Ve++)
            Me[Ve]();
        Me = null,
        Ve = 0
    }
}
const Mt = e=>e.id == null ? 1 / 0 : e.id
  , qr = (e,t)=>{
    const s = Mt(e) - Mt(t);
    if (s === 0) {
        if (e.pre && !t.pre)
            return -1;
        if (t.pre && !e.pre)
            return 1
    }
    return s
}
;
function pn(e) {
    Cs = !1,
    Pt = !0,
    ue.sort(qr);
    const t = we;
    try {
        for (Ie = 0; Ie < ue.length; Ie++) {
            const s = ue[Ie];
            s && s.active !== !1 && Ue(s, null, 14)
        }
    } finally {
        Ie = 0,
        ue.length = 0,
        hn(),
        Pt = !1,
        Vs = null,
        (ue.length || _t.length) && pn()
    }
}
function Yr(e, t, ...s) {
    if (e.isUnmounted)
        return;
    const o = e.vnode.props || X;
    let n = s;
    const r = t.startsWith("update:")
      , i = r && t.slice(7);
    if (i && i in o) {
        const p = `${i === "modelValue" ? "model" : i}Modifiers`
          , {number: y, trim: S} = o[p] || X;
        S && (n = s.map(T=>re(T) ? T.trim() : T)),
        y && (n = s.map(Qn))
    }
    let c, u = o[c = ms(t)] || o[c = ms(dt(t))];
    !u && r && (u = o[c = ms(gt(t))]),
    u && Se(u, e, 6, n);
    const _ = o[c + "Once"];
    if (_) {
        if (!e.emitted)
            e.emitted = {};
        else if (e.emitted[c])
            return;
        e.emitted[c] = !0,
        Se(_, e, 6, n)
    }
}
function mn(e, t, s=!1) {
    const o = t.emitsCache
      , n = o.get(e);
    if (n !== void 0)
        return n;
    const r = e.emits;
    let i = {}
      , c = !1;
    if (!k(e)) {
        const u = _=>{
            const p = mn(_, t, !0);
            p && (c = !0,
            ce(i, p))
        }
        ;
        !s && t.mixins.length && t.mixins.forEach(u),
        e.extends && u(e.extends),
        e.mixins && e.mixins.forEach(u)
    }
    return !r && !c ? (G(e) && o.set(e, null),
    null) : (I(r) ? r.forEach(u=>i[u] = null) : ce(i, r),
    G(e) && o.set(e, i),
    i)
}
function as(e, t) {
    return !e || !ss(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""),
    H(e, t[0].toLowerCase() + t.slice(1)) || H(e, gt(t)) || H(e, t))
}
let ye = null
  , gn = null;
function Gt(e) {
    const t = ye;
    return ye = e,
    gn = e && e.type.__scopeId || null,
    t
}
function Vr(e, t=ye, s) {
    if (!t || e._n)
        return e;
    const o = (...n)=>{
        o._d && Co(-1);
        const r = Gt(t);
        let i;
        try {
            i = e(...n)
        } finally {
            Gt(r),
            o._d && Co(1)
        }
        return i
    }
    ;
    return o._n = !0,
    o._c = !0,
    o._d = !0,
    o
}
function bs(e) {
    const {type: t, vnode: s, proxy: o, withProxy: n, props: r, propsOptions: [i], slots: c, attrs: u, emit: _, render: p, renderCache: y, data: S, setupState: T, ctx: U, inheritAttrs: F} = e;
    let V, D;
    const A = Gt(e);
    try {
        if (s.shapeFlag & 4) {
            const M = n || o;
            V = Ae(p.call(M, M, y, r, T, S, U)),
            D = u
        } else {
            const M = t;
            V = Ae(M.length > 1 ? M(r, {
                attrs: u,
                slots: c,
                emit: _
            }) : M(r, null)),
            D = t.props ? u : Xr(u)
        }
    } catch (M) {
        Ct.length = 0,
        cs(M, e, 1),
        V = fe(Ge)
    }
    let Z = V;
    if (D && F !== !1) {
        const M = Object.keys(D)
          , {shapeFlag: ne} = Z;
        M.length && ne & 7 && (i && M.some(Ns) && (D = Zr(D, i)),
        Z = pt(Z, D))
    }
    return s.dirs && (Z = pt(Z),
    Z.dirs = Z.dirs ? Z.dirs.concat(s.dirs) : s.dirs),
    s.transition && (Z.transition = s.transition),
    V = Z,
    Gt(A),
    V
}
const Xr = e=>{
    let t;
    for (const s in e)
        (s === "class" || s === "style" || ss(s)) && ((t || (t = {}))[s] = e[s]);
    return t
}
  , Zr = (e,t)=>{
    const s = {};
    for (const o in e)
        (!Ns(o) || !(o.slice(9)in t)) && (s[o] = e[o]);
    return s
}
;
function Qr(e, t, s) {
    const {props: o, children: n, component: r} = e
      , {props: i, children: c, patchFlag: u} = t
      , _ = r.emitsOptions;
    if (t.dirs || t.transition)
        return !0;
    if (s && u >= 0) {
        if (u & 1024)
            return !0;
        if (u & 16)
            return o ? bo(o, i, _) : !!i;
        if (u & 8) {
            const p = t.dynamicProps;
            for (let y = 0; y < p.length; y++) {
                const S = p[y];
                if (i[S] !== o[S] && !as(_, S))
                    return !0
            }
        }
    } else
        return (n || c) && (!c || !c.$stable) ? !0 : o === i ? !1 : o ? i ? bo(o, i, _) : !0 : !!i;
    return !1
}
function bo(e, t, s) {
    const o = Object.keys(t);
    if (o.length !== Object.keys(e).length)
        return !0;
    for (let n = 0; n < o.length; n++) {
        const r = o[n];
        if (t[r] !== e[r] && !as(s, r))
            return !0
    }
    return !1
}
function Gr({vnode: e, parent: t}, s) {
    for (; t && t.subTree === e; )
        (e = t.vnode).el = s,
        t = t.parent
}
const ei = e=>e.__isSuspense;
function ti(e, t) {
    t && t.pendingBranch ? I(e) ? t.effects.push(...e) : t.effects.push(e) : Jr(e)
}
const Wt = {};
function Jt(e, t, s) {
    return bn(e, t, s)
}
function bn(e, t, {immediate: s, deep: o, flush: n, onTrack: r, onTrigger: i}=X) {
    var c;
    const u = Yo() === ((c = ae) == null ? void 0 : c.scope) ? ae : null;
    let _, p = !1, y = !1;
    if (se(e) ? (_ = ()=>e.value,
    p = Zt(e)) : Le(e) ? (_ = ()=>e,
    o = !0) : I(e) ? (y = !0,
    p = e.some(M=>Le(M) || Zt(M)),
    _ = ()=>e.map(M=>{
        if (se(M))
            return M.value;
        if (Le(M))
            return ct(M);
        if (k(M))
            return Ue(M, u, 2)
    }
    )) : k(e) ? t ? _ = ()=>Ue(e, u, 2) : _ = ()=>{
        if (!(u && u.isUnmounted))
            return S && S(),
            Se(e, u, 3, [T])
    }
    : _ = we,
    t && o) {
        const M = _;
        _ = ()=>ct(M())
    }
    let S, T = M=>{
        S = A.onStop = ()=>{
            Ue(M, u, 4)
        }
    }
    , U;
    if (Bt)
        if (T = we,
        t ? s && Se(t, u, 3, [_(), y ? [] : void 0, T]) : _(),
        n === "sync") {
            const M = Xi();
            U = M.__watcherHandles || (M.__watcherHandles = [])
        } else
            return we;
    let F = y ? new Array(e.length).fill(Wt) : Wt;
    const V = ()=>{
        if (A.active)
            if (t) {
                const M = A.run();
                (o || p || (y ? M.some((ne,We)=>At(ne, F[We])) : At(M, F))) && (S && S(),
                Se(t, u, 3, [M, F === Wt ? void 0 : y && F[0] === Wt ? [] : F, T]),
                F = M)
            } else
                A.run()
    }
    ;
    V.allowRecurse = !!t;
    let D;
    n === "sync" ? D = V : n === "post" ? D = ()=>de(V, u && u.suspense) : (V.pre = !0,
    u && (V.id = u.uid),
    D = ()=>Xs(V));
    const A = new Ks(_,D);
    t ? s ? V() : F = A.run() : n === "post" ? de(A.run.bind(A), u && u.suspense) : A.run();
    const Z = ()=>{
        A.stop(),
        u && u.scope && js(u.scope.effects, A)
    }
    ;
    return U && U.push(Z),
    Z
}
function si(e, t, s) {
    const o = this.proxy
      , n = re(e) ? e.includes(".") ? xn(o, e) : ()=>o[e] : e.bind(o, o);
    let r;
    k(t) ? r = t : (r = t.handler,
    s = t);
    const i = ae;
    mt(this);
    const c = bn(n, r.bind(o), s);
    return i ? mt(i) : Qe(),
    c
}
function xn(e, t) {
    const s = t.split(".");
    return ()=>{
        let o = e;
        for (let n = 0; n < s.length && o; n++)
            o = o[s[n]];
        return o
    }
}
function ct(e, t) {
    if (!G(e) || e.__v_skip || (t = t || new Set,
    t.has(e)))
        return e;
    if (t.add(e),
    se(e))
        ct(e.value, t);
    else if (I(e))
        for (let s = 0; s < e.length; s++)
            ct(e[s], t);
    else if (Ho(e) || ft(e))
        e.forEach(s=>{
            ct(s, t)
        }
        );
    else if (Do(e))
        for (const s in e)
            ct(e[s], t);
    return e
}
function qe(e, t, s, o) {
    const n = e.dirs
      , r = t && t.dirs;
    for (let i = 0; i < n.length; i++) {
        const c = n[i];
        r && (c.oldValue = r[i].value);
        let u = c.dir[o];
        u && (bt(),
        Se(u, s, 8, [e.el, c, e, t]),
        xt())
    }
}
function Ke(e, t) {
    return k(e) ? (()=>ce({
        name: e.name
    }, t, {
        setup: e
    }))() : e
}
const qt = e=>!!e.type.__asyncLoader
  , yn = e=>e.type.__isKeepAlive;
function oi(e, t) {
    vn(e, "a", t)
}
function ni(e, t) {
    vn(e, "da", t)
}
function vn(e, t, s=ae) {
    const o = e.__wdc || (e.__wdc = ()=>{
        let n = s;
        for (; n; ) {
            if (n.isDeactivated)
                return;
            n = n.parent
        }
        return e()
    }
    );
    if (us(t, o, s),
    s) {
        let n = s.parent;
        for (; n && n.parent; )
            yn(n.parent.vnode) && ri(o, t, s, n),
            n = n.parent
    }
}
function ri(e, t, s, o) {
    const n = us(t, e, o, !0);
    wn(()=>{
        js(o[t], n)
    }
    , s)
}
function us(e, t, s=ae, o=!1) {
    if (s) {
        const n = s[e] || (s[e] = [])
          , r = t.__weh || (t.__weh = (...i)=>{
            if (s.isUnmounted)
                return;
            bt(),
            mt(s);
            const c = Se(t, s, e, i);
            return Qe(),
            xt(),
            c
        }
        );
        return o ? n.unshift(r) : n.push(r),
        r
    }
}
const Fe = e=>(t,s=ae)=>(!Bt || e === "sp") && us(e, (...o)=>t(...o), s)
  , ii = Fe("bm")
  , li = Fe("m")
  , ci = Fe("bu")
  , ai = Fe("u")
  , ui = Fe("bum")
  , wn = Fe("um")
  , fi = Fe("sp")
  , _i = Fe("rtg")
  , di = Fe("rtc");
function hi(e, t=ae) {
    us("ec", e, t)
}
const pi = Symbol.for("v-ndc");
function at(e, t, s, o) {
    let n;
    const r = s && s[o];
    if (I(e) || re(e)) {
        n = new Array(e.length);
        for (let i = 0, c = e.length; i < c; i++)
            n[i] = t(e[i], i, void 0, r && r[i])
    } else if (typeof e == "number") {
        n = new Array(e);
        for (let i = 0; i < e; i++)
            n[i] = t(i + 1, i, void 0, r && r[i])
    } else if (G(e))
        if (e[Symbol.iterator])
            n = Array.from(e, (i,c)=>t(i, c, void 0, r && r[c]));
        else {
            const i = Object.keys(e);
            n = new Array(i.length);
            for (let c = 0, u = i.length; c < u; c++) {
                const _ = i[c];
                n[c] = t(e[_], _, c, r && r[c])
            }
        }
    else
        n = [];
    return s && (s[o] = n),
    n
}
const Ts = e=>e ? Rn(e) ? to(e) || e.proxy : Ts(e.parent) : null
  , $t = ce(Object.create(null), {
    $: e=>e,
    $el: e=>e.vnode.el,
    $data: e=>e.data,
    $props: e=>e.props,
    $attrs: e=>e.attrs,
    $slots: e=>e.slots,
    $refs: e=>e.refs,
    $parent: e=>Ts(e.parent),
    $root: e=>Ts(e.root),
    $emit: e=>e.emit,
    $options: e=>Zs(e),
    $forceUpdate: e=>e.f || (e.f = ()=>Xs(e.update)),
    $nextTick: e=>e.n || (e.n = _n.bind(e.proxy)),
    $watch: e=>si.bind(e)
})
  , xs = (e,t)=>e !== X && !e.__isScriptSetup && H(e, t)
  , mi = {
    get({_: e}, t) {
        const {ctx: s, setupState: o, data: n, props: r, accessCache: i, type: c, appContext: u} = e;
        let _;
        if (t[0] !== "$") {
            const T = i[t];
            if (T !== void 0)
                switch (T) {
                case 1:
                    return o[t];
                case 2:
                    return n[t];
                case 4:
                    return s[t];
                case 3:
                    return r[t]
                }
            else {
                if (xs(o, t))
                    return i[t] = 1,
                    o[t];
                if (n !== X && H(n, t))
                    return i[t] = 2,
                    n[t];
                if ((_ = e.propsOptions[0]) && H(_, t))
                    return i[t] = 3,
                    r[t];
                if (s !== X && H(s, t))
                    return i[t] = 4,
                    s[t];
                As && (i[t] = 0)
            }
        }
        const p = $t[t];
        let y, S;
        if (p)
            return t === "$attrs" && he(e, "get", t),
            p(e);
        if ((y = c.__cssModules) && (y = y[t]))
            return y;
        if (s !== X && H(s, t))
            return i[t] = 4,
            s[t];
        if (S = u.config.globalProperties,
        H(S, t))
            return S[t]
    },
    set({_: e}, t, s) {
        const {data: o, setupState: n, ctx: r} = e;
        return xs(n, t) ? (n[t] = s,
        !0) : o !== X && H(o, t) ? (o[t] = s,
        !0) : H(e.props, t) || t[0] === "$" && t.slice(1)in e ? !1 : (r[t] = s,
        !0)
    },
    has({_: {data: e, setupState: t, accessCache: s, ctx: o, appContext: n, propsOptions: r}}, i) {
        let c;
        return !!s[i] || e !== X && H(e, i) || xs(t, i) || (c = r[0]) && H(c, i) || H(o, i) || H($t, i) || H(n.config.globalProperties, i)
    },
    defineProperty(e, t, s) {
        return s.get != null ? e._.accessCache[t] = 0 : H(s, "value") && this.set(e, t, s.value, null),
        Reflect.defineProperty(e, t, s)
    }
};
function xo(e) {
    return I(e) ? e.reduce((t,s)=>(t[s] = null,
    t), {}) : e
}
let As = !0;
function gi(e) {
    const t = Zs(e)
      , s = e.proxy
      , o = e.ctx;
    As = !1,
    t.beforeCreate && yo(t.beforeCreate, e, "bc");
    const {data: n, computed: r, methods: i, watch: c, provide: u, inject: _, created: p, beforeMount: y, mounted: S, beforeUpdate: T, updated: U, activated: F, deactivated: V, beforeDestroy: D, beforeUnmount: A, destroyed: Z, unmounted: M, render: ne, renderTracked: We, renderTriggered: Ee, errorCaptured: K, serverPrefetch: W, expose: ie, inheritAttrs: pe, components: $e, directives: ot, filters: yt} = t;
    if (_ && bi(_, o, null),
    i)
        for (const ee in i) {
            const q = i[ee];
            k(q) && (o[ee] = q.bind(s))
        }
    if (n) {
        const ee = n.call(s, s);
        G(ee) && (e.data = is(ee))
    }
    if (As = !0,
    r)
        for (const ee in r) {
            const q = r[ee]
              , ze = k(q) ? q.bind(s, s) : k(q.get) ? q.get.bind(s, s) : we
              , Nt = !k(q) && k(q.set) ? q.set.bind(s) : we
              , Je = Bn({
                get: ze,
                set: Nt
            });
            Object.defineProperty(o, ee, {
                enumerable: !0,
                configurable: !0,
                get: ()=>Je.value,
                set: Oe=>Je.value = Oe
            })
        }
    if (c)
        for (const ee in c)
            Sn(c[ee], o, s, ee);
    if (u) {
        const ee = k(u) ? u.call(s) : u;
        Reflect.ownKeys(ee).forEach(q=>{
            Ei(q, ee[q])
        }
        )
    }
    p && yo(p, e, "c");
    function z(ee, q) {
        I(q) ? q.forEach(ze=>ee(ze.bind(s))) : q && ee(q.bind(s))
    }
    if (z(ii, y),
    z(li, S),
    z(ci, T),
    z(ai, U),
    z(oi, F),
    z(ni, V),
    z(hi, K),
    z(di, We),
    z(_i, Ee),
    z(ui, A),
    z(wn, M),
    z(fi, W),
    I(ie))
        if (ie.length) {
            const ee = e.exposed || (e.exposed = {});
            ie.forEach(q=>{
                Object.defineProperty(ee, q, {
                    get: ()=>s[q],
                    set: ze=>s[q] = ze
                })
            }
            )
        } else
            e.exposed || (e.exposed = {});
    ne && e.render === we && (e.render = ne),
    pe != null && (e.inheritAttrs = pe),
    $e && (e.components = $e),
    ot && (e.directives = ot)
}
function bi(e, t, s=we) {
    I(e) && (e = Is(e));
    for (const o in e) {
        const n = e[o];
        let r;
        G(n) ? "default"in n ? r = Ot(n.from || o, n.default, !0) : r = Ot(n.from || o) : r = Ot(n),
        se(r) ? Object.defineProperty(t, o, {
            enumerable: !0,
            configurable: !0,
            get: ()=>r.value,
            set: i=>r.value = i
        }) : t[o] = r
    }
}
function yo(e, t, s) {
    Se(I(e) ? e.map(o=>o.bind(t.proxy)) : e.bind(t.proxy), t, s)
}
function Sn(e, t, s, o) {
    const n = o.includes(".") ? xn(s, o) : ()=>s[o];
    if (re(e)) {
        const r = t[e];
        k(r) && Jt(n, r)
    } else if (k(e))
        Jt(n, e.bind(s));
    else if (G(e))
        if (I(e))
            e.forEach(r=>Sn(r, t, s, o));
        else {
            const r = k(e.handler) ? e.handler.bind(s) : t[e.handler];
            k(r) && Jt(n, r, e)
        }
}
function Zs(e) {
    const t = e.type
      , {mixins: s, extends: o} = t
      , {mixins: n, optionsCache: r, config: {optionMergeStrategies: i}} = e.appContext
      , c = r.get(t);
    let u;
    return c ? u = c : !n.length && !s && !o ? u = t : (u = {},
    n.length && n.forEach(_=>es(u, _, i, !0)),
    es(u, t, i)),
    G(t) && r.set(t, u),
    u
}
function es(e, t, s, o=!1) {
    const {mixins: n, extends: r} = t;
    r && es(e, r, s, !0),
    n && n.forEach(i=>es(e, i, s, !0));
    for (const i in t)
        if (!(o && i === "expose")) {
            const c = xi[i] || s && s[i];
            e[i] = c ? c(e[i], t[i]) : t[i]
        }
    return e
}
const xi = {
    data: vo,
    props: wo,
    emits: wo,
    methods: Et,
    computed: Et,
    beforeCreate: _e,
    created: _e,
    beforeMount: _e,
    mounted: _e,
    beforeUpdate: _e,
    updated: _e,
    beforeDestroy: _e,
    beforeUnmount: _e,
    destroyed: _e,
    unmounted: _e,
    activated: _e,
    deactivated: _e,
    errorCaptured: _e,
    serverPrefetch: _e,
    components: Et,
    directives: Et,
    watch: vi,
    provide: vo,
    inject: yi
};
function vo(e, t) {
    return t ? e ? function() {
        return ce(k(e) ? e.call(this, this) : e, k(t) ? t.call(this, this) : t)
    }
    : t : e
}
function yi(e, t) {
    return Et(Is(e), Is(t))
}
function Is(e) {
    if (I(e)) {
        const t = {};
        for (let s = 0; s < e.length; s++)
            t[e[s]] = e[s];
        return t
    }
    return e
}
function _e(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Et(e, t) {
    return e ? ce(Object.create(null), e, t) : t
}
function wo(e, t) {
    return e ? I(e) && I(t) ? [...new Set([...e, ...t])] : ce(Object.create(null), xo(e), xo(t ?? {})) : t
}
function vi(e, t) {
    if (!e)
        return t;
    if (!t)
        return e;
    const s = ce(Object.create(null), e);
    for (const o in t)
        s[o] = _e(e[o], t[o]);
    return s
}
function En() {
    return {
        app: null,
        config: {
            isNativeTag: Jn,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap,
        propsCache: new WeakMap,
        emitsCache: new WeakMap
    }
}
let wi = 0;
function Si(e, t) {
    return function(o, n=null) {
        k(o) || (o = ce({}, o)),
        n != null && !G(n) && (n = null);
        const r = En()
          , i = new Set;
        let c = !1;
        const u = r.app = {
            _uid: wi++,
            _component: o,
            _props: n,
            _container: null,
            _context: r,
            _instance: null,
            version: Zi,
            get config() {
                return r.config
            },
            set config(_) {},
            use(_, ...p) {
                return i.has(_) || (_ && k(_.install) ? (i.add(_),
                _.install(u, ...p)) : k(_) && (i.add(_),
                _(u, ...p))),
                u
            },
            mixin(_) {
                return r.mixins.includes(_) || r.mixins.push(_),
                u
            },
            component(_, p) {
                return p ? (r.components[_] = p,
                u) : r.components[_]
            },
            directive(_, p) {
                return p ? (r.directives[_] = p,
                u) : r.directives[_]
            },
            mount(_, p, y) {
                if (!c) {
                    const S = fe(o, n);
                    return S.appContext = r,
                    p && t ? t(S, _) : e(S, _, y),
                    c = !0,
                    u._container = _,
                    _.__vue_app__ = u,
                    to(S.component) || S.component.proxy
                }
            },
            unmount() {
                c && (e(null, u._container),
                delete u._container.__vue_app__)
            },
            provide(_, p) {
                return r.provides[_] = p,
                u
            },
            runWithContext(_) {
                Rt = u;
                try {
                    return _()
                } finally {
                    Rt = null
                }
            }
        };
        return u
    }
}
let Rt = null;
function Ei(e, t) {
    if (ae) {
        let s = ae.provides;
        const o = ae.parent && ae.parent.provides;
        o === s && (s = ae.provides = Object.create(o)),
        s[e] = t
    }
}
function Ot(e, t, s=!1) {
    const o = ae || ye;
    if (o || Rt) {
        const n = o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : Rt._context.provides;
        if (n && e in n)
            return n[e];
        if (arguments.length > 1)
            return s && k(t) ? t.call(o && o.proxy) : t
    }
}
function $i() {
    return !!(ae || ye || Rt)
}
function Oi(e, t, s, o=!1) {
    const n = {}
      , r = {};
    Vt(r, _s, 1),
    e.propsDefaults = Object.create(null),
    $n(e, t, n, r);
    for (const i in e.propsOptions[0])
        i in n || (n[i] = void 0);
    s ? e.props = o ? n : Fr(n) : e.type.props ? e.props = n : e.props = r,
    e.attrs = r
}
function Ci(e, t, s, o) {
    const {props: n, attrs: r, vnode: {patchFlag: i}} = e
      , c = L(n)
      , [u] = e.propsOptions;
    let _ = !1;
    if ((o || i > 0) && !(i & 16)) {
        if (i & 8) {
            const p = e.vnode.dynamicProps;
            for (let y = 0; y < p.length; y++) {
                let S = p[y];
                if (as(e.emitsOptions, S))
                    continue;
                const T = t[S];
                if (u)
                    if (H(r, S))
                        T !== r[S] && (r[S] = T,
                        _ = !0);
                    else {
                        const U = dt(S);
                        n[U] = Ps(u, c, U, T, e, !1)
                    }
                else
                    T !== r[S] && (r[S] = T,
                    _ = !0)
            }
        }
    } else {
        $n(e, t, n, r) && (_ = !0);
        let p;
        for (const y in c)
            (!t || !H(t, y) && ((p = gt(y)) === y || !H(t, p))) && (u ? s && (s[y] !== void 0 || s[p] !== void 0) && (n[y] = Ps(u, c, y, void 0, e, !0)) : delete n[y]);
        if (r !== c)
            for (const y in r)
                (!t || !H(t, y)) && (delete r[y],
                _ = !0)
    }
    _ && Re(e, "set", "$attrs")
}
function $n(e, t, s, o) {
    const [n,r] = e.propsOptions;
    let i = !1, c;
    if (t)
        for (let u in t) {
            if (zt(u))
                continue;
            const _ = t[u];
            let p;
            n && H(n, p = dt(u)) ? !r || !r.includes(p) ? s[p] = _ : (c || (c = {}))[p] = _ : as(e.emitsOptions, u) || (!(u in o) || _ !== o[u]) && (o[u] = _,
            i = !0)
        }
    if (r) {
        const u = L(s)
          , _ = c || X;
        for (let p = 0; p < r.length; p++) {
            const y = r[p];
            s[y] = Ps(n, u, y, _[y], e, !H(_, y))
        }
    }
    return i
}
function Ps(e, t, s, o, n, r) {
    const i = e[s];
    if (i != null) {
        const c = H(i, "default");
        if (c && o === void 0) {
            const u = i.default;
            if (i.type !== Function && !i.skipFactory && k(u)) {
                const {propsDefaults: _} = n;
                s in _ ? o = _[s] : (mt(n),
                o = _[s] = u.call(null, t),
                Qe())
            } else
                o = u
        }
        i[0] && (r && !c ? o = !1 : i[1] && (o === "" || o === gt(s)) && (o = !0))
    }
    return o
}
function On(e, t, s=!1) {
    const o = t.propsCache
      , n = o.get(e);
    if (n)
        return n;
    const r = e.props
      , i = {}
      , c = [];
    let u = !1;
    if (!k(e)) {
        const p = y=>{
            u = !0;
            const [S,T] = On(y, t, !0);
            ce(i, S),
            T && c.push(...T)
        }
        ;
        !s && t.mixins.length && t.mixins.forEach(p),
        e.extends && p(e.extends),
        e.mixins && e.mixins.forEach(p)
    }
    if (!r && !u)
        return G(e) && o.set(e, ut),
        ut;
    if (I(r))
        for (let p = 0; p < r.length; p++) {
            const y = dt(r[p]);
            So(y) && (i[y] = X)
        }
    else if (r)
        for (const p in r) {
            const y = dt(p);
            if (So(y)) {
                const S = r[p]
                  , T = i[y] = I(S) || k(S) ? {
                    type: S
                } : ce({}, S);
                if (T) {
                    const U = Oo(Boolean, T.type)
                      , F = Oo(String, T.type);
                    T[0] = U > -1,
                    T[1] = F < 0 || U < F,
                    (U > -1 || H(T, "default")) && c.push(y)
                }
            }
        }
    const _ = [i, c];
    return G(e) && o.set(e, _),
    _
}
function So(e) {
    return e[0] !== "$"
}
function Eo(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : ""
}
function $o(e, t) {
    return Eo(e) === Eo(t)
}
function Oo(e, t) {
    return I(t) ? t.findIndex(s=>$o(s, e)) : k(t) && $o(t, e) ? 0 : -1
}
const Cn = e=>e[0] === "_" || e === "$stable"
  , Qs = e=>I(e) ? e.map(Ae) : [Ae(e)]
  , Ti = (e,t,s)=>{
    if (t._n)
        return t;
    const o = Vr((...n)=>Qs(t(...n)), s);
    return o._c = !1,
    o
}
  , Tn = (e,t,s)=>{
    const o = e._ctx;
    for (const n in e) {
        if (Cn(n))
            continue;
        const r = e[n];
        if (k(r))
            t[n] = Ti(n, r, o);
        else if (r != null) {
            const i = Qs(r);
            t[n] = ()=>i
        }
    }
}
  , An = (e,t)=>{
    const s = Qs(t);
    e.slots.default = ()=>s
}
  , Ai = (e,t)=>{
    if (e.vnode.shapeFlag & 32) {
        const s = t._;
        s ? (e.slots = L(t),
        Vt(t, "_", s)) : Tn(t, e.slots = {})
    } else
        e.slots = {},
        t && An(e, t);
    Vt(e.slots, _s, 1)
}
  , Ii = (e,t,s)=>{
    const {vnode: o, slots: n} = e;
    let r = !0
      , i = X;
    if (o.shapeFlag & 32) {
        const c = t._;
        c ? s && c === 1 ? r = !1 : (ce(n, t),
        !s && c === 1 && delete n._) : (r = !t.$stable,
        Tn(t, n)),
        i = t
    } else
        t && (An(e, t),
        i = {
            default: 1
        });
    if (r)
        for (const c in n)
            !Cn(c) && !(c in i) && delete n[c]
}
;
function Ms(e, t, s, o, n=!1) {
    if (I(e)) {
        e.forEach((S,T)=>Ms(S, t && (I(t) ? t[T] : t), s, o, n));
        return
    }
    if (qt(o) && !n)
        return;
    const r = o.shapeFlag & 4 ? to(o.component) || o.component.proxy : o.el
      , i = n ? null : r
      , {i: c, r: u} = e
      , _ = t && t.r
      , p = c.refs === X ? c.refs = {} : c.refs
      , y = c.setupState;
    if (_ != null && _ !== u && (re(_) ? (p[_] = null,
    H(y, _) && (y[_] = null)) : se(_) && (_.value = null)),
    k(u))
        Ue(u, c, 12, [i, p]);
    else {
        const S = re(u)
          , T = se(u);
        if (S || T) {
            const U = ()=>{
                if (e.f) {
                    const F = S ? H(y, u) ? y[u] : p[u] : u.value;
                    n ? I(F) && js(F, r) : I(F) ? F.includes(r) || F.push(r) : S ? (p[u] = [r],
                    H(y, u) && (y[u] = p[u])) : (u.value = [r],
                    e.k && (p[e.k] = u.value))
                } else
                    S ? (p[u] = i,
                    H(y, u) && (y[u] = i)) : T && (u.value = i,
                    e.k && (p[e.k] = i))
            }
            ;
            i ? (U.id = -1,
            de(U, s)) : U()
        }
    }
}
const de = ti;
function Pi(e) {
    return Mi(e)
}
function Mi(e, t) {
    const s = Ss();
    s.__VUE__ = !0;
    const {insert: o, remove: n, patchProp: r, createElement: i, createText: c, createComment: u, setText: _, setElementText: p, parentNode: y, nextSibling: S, setScopeId: T=we, insertStaticContent: U} = e
      , F = (l,a,d,m=null,h=null,x=null,w=!1,b=null,v=!!a.dynamicChildren)=>{
        if (l === a)
            return;
        l && !wt(l, a) && (m = jt(l),
        Oe(l, h, x, !0),
        l = null),
        a.patchFlag === -2 && (v = !1,
        a.dynamicChildren = null);
        const {type: g, ref: O, shapeFlag: E} = a;
        switch (g) {
        case fs:
            V(l, a, d, m);
            break;
        case Ge:
            D(l, a, d, m);
            break;
        case ys:
            l == null && A(a, d, m, w);
            break;
        case le:
            $e(l, a, d, m, h, x, w, b, v);
            break;
        default:
            E & 1 ? ne(l, a, d, m, h, x, w, b, v) : E & 6 ? ot(l, a, d, m, h, x, w, b, v) : (E & 64 || E & 128) && g.process(l, a, d, m, h, x, w, b, v, nt)
        }
        O != null && h && Ms(O, l && l.ref, x, a || l, !a)
    }
      , V = (l,a,d,m)=>{
        if (l == null)
            o(a.el = c(a.children), d, m);
        else {
            const h = a.el = l.el;
            a.children !== l.children && _(h, a.children)
        }
    }
      , D = (l,a,d,m)=>{
        l == null ? o(a.el = u(a.children || ""), d, m) : a.el = l.el
    }
      , A = (l,a,d,m)=>{
        [l.el,l.anchor] = U(l.children, a, d, m, l.el, l.anchor)
    }
      , Z = ({el: l, anchor: a},d,m)=>{
        let h;
        for (; l && l !== a; )
            h = S(l),
            o(l, d, m),
            l = h;
        o(a, d, m)
    }
      , M = ({el: l, anchor: a})=>{
        let d;
        for (; l && l !== a; )
            d = S(l),
            n(l),
            l = d;
        n(a)
    }
      , ne = (l,a,d,m,h,x,w,b,v)=>{
        w = w || a.type === "svg",
        l == null ? We(a, d, m, h, x, w, b, v) : W(l, a, h, x, w, b, v)
    }
      , We = (l,a,d,m,h,x,w,b)=>{
        let v, g;
        const {type: O, props: E, shapeFlag: C, transition: P, dirs: j} = l;
        if (v = l.el = i(l.type, x, E && E.is, E),
        C & 8 ? p(v, l.children) : C & 16 && K(l.children, v, null, m, h, x && O !== "foreignObject", w, b),
        j && qe(l, null, m, "created"),
        Ee(v, l, l.scopeId, w, m),
        E) {
            for (const J in E)
                J !== "value" && !zt(J) && r(v, J, null, E[J], x, l.children, m, h, Pe);
            "value"in E && r(v, "value", null, E.value),
            (g = E.onVnodeBeforeMount) && Te(g, m, l)
        }
        j && qe(l, null, m, "beforeMount");
        const Y = (!h || h && !h.pendingBranch) && P && !P.persisted;
        Y && P.beforeEnter(v),
        o(v, a, d),
        ((g = E && E.onVnodeMounted) || Y || j) && de(()=>{
            g && Te(g, m, l),
            Y && P.enter(v),
            j && qe(l, null, m, "mounted")
        }
        , h)
    }
      , Ee = (l,a,d,m,h)=>{
        if (d && T(l, d),
        m)
            for (let x = 0; x < m.length; x++)
                T(l, m[x]);
        if (h) {
            let x = h.subTree;
            if (a === x) {
                const w = h.vnode;
                Ee(l, w, w.scopeId, w.slotScopeIds, h.parent)
            }
        }
    }
      , K = (l,a,d,m,h,x,w,b,v=0)=>{
        for (let g = v; g < l.length; g++) {
            const O = l[g] = b ? je(l[g]) : Ae(l[g]);
            F(null, O, a, d, m, h, x, w, b)
        }
    }
      , W = (l,a,d,m,h,x,w)=>{
        const b = a.el = l.el;
        let {patchFlag: v, dynamicChildren: g, dirs: O} = a;
        v |= l.patchFlag & 16;
        const E = l.props || X
          , C = a.props || X;
        let P;
        d && Ye(d, !1),
        (P = C.onVnodeBeforeUpdate) && Te(P, d, a, l),
        O && qe(a, l, d, "beforeUpdate"),
        d && Ye(d, !0);
        const j = h && a.type !== "foreignObject";
        if (g ? ie(l.dynamicChildren, g, b, d, m, j, x) : w || q(l, a, b, null, d, m, j, x, !1),
        v > 0) {
            if (v & 16)
                pe(b, a, E, C, d, m, h);
            else if (v & 2 && E.class !== C.class && r(b, "class", null, C.class, h),
            v & 4 && r(b, "style", E.style, C.style, h),
            v & 8) {
                const Y = a.dynamicProps;
                for (let J = 0; J < Y.length; J++) {
                    const oe = Y[J]
                      , be = E[oe]
                      , rt = C[oe];
                    (rt !== be || oe === "value") && r(b, oe, be, rt, h, l.children, d, m, Pe)
                }
            }
            v & 1 && l.children !== a.children && p(b, a.children)
        } else
            !w && g == null && pe(b, a, E, C, d, m, h);
        ((P = C.onVnodeUpdated) || O) && de(()=>{
            P && Te(P, d, a, l),
            O && qe(a, l, d, "updated")
        }
        , m)
    }
      , ie = (l,a,d,m,h,x,w)=>{
        for (let b = 0; b < a.length; b++) {
            const v = l[b]
              , g = a[b]
              , O = v.el && (v.type === le || !wt(v, g) || v.shapeFlag & 70) ? y(v.el) : d;
            F(v, g, O, null, m, h, x, w, !0)
        }
    }
      , pe = (l,a,d,m,h,x,w)=>{
        if (d !== m) {
            if (d !== X)
                for (const b in d)
                    !zt(b) && !(b in m) && r(l, b, d[b], null, w, a.children, h, x, Pe);
            for (const b in m) {
                if (zt(b))
                    continue;
                const v = m[b]
                  , g = d[b];
                v !== g && b !== "value" && r(l, b, g, v, w, a.children, h, x, Pe)
            }
            "value"in m && r(l, "value", d.value, m.value)
        }
    }
      , $e = (l,a,d,m,h,x,w,b,v)=>{
        const g = a.el = l ? l.el : c("")
          , O = a.anchor = l ? l.anchor : c("");
        let {patchFlag: E, dynamicChildren: C, slotScopeIds: P} = a;
        P && (b = b ? b.concat(P) : P),
        l == null ? (o(g, d, m),
        o(O, d, m),
        K(a.children, d, O, h, x, w, b, v)) : E > 0 && E & 64 && C && l.dynamicChildren ? (ie(l.dynamicChildren, C, d, h, x, w, b),
        (a.key != null || h && a === h.subTree) && In(l, a, !0)) : q(l, a, d, O, h, x, w, b, v)
    }
      , ot = (l,a,d,m,h,x,w,b,v)=>{
        a.slotScopeIds = b,
        l == null ? a.shapeFlag & 512 ? h.ctx.activate(a, d, m, w, v) : yt(a, d, m, h, x, w, v) : Be(l, a, v)
    }
      , yt = (l,a,d,m,h,x,w)=>{
        const b = l.component = Ki(l, m, h);
        if (yn(l) && (b.ctx.renderer = nt),
        Wi(b),
        b.asyncDep) {
            if (h && h.registerDep(b, z),
            !l.el) {
                const v = b.subTree = fe(Ge);
                D(null, v, a, d)
            }
            return
        }
        z(b, l, a, d, h, x, w)
    }
      , Be = (l,a,d)=>{
        const m = a.component = l.component;
        if (Qr(l, a, d))
            if (m.asyncDep && !m.asyncResolved) {
                ee(m, a, d);
                return
            } else
                m.next = a,
                zr(m.update),
                m.update();
        else
            a.el = l.el,
            m.vnode = a
    }
      , z = (l,a,d,m,h,x,w)=>{
        const b = ()=>{
            if (l.isMounted) {
                let {next: O, bu: E, u: C, parent: P, vnode: j} = l, Y = O, J;
                Ye(l, !1),
                O ? (O.el = j.el,
                ee(l, O, w)) : O = j,
                E && gs(E),
                (J = O.props && O.props.onVnodeBeforeUpdate) && Te(J, P, O, j),
                Ye(l, !0);
                const oe = bs(l)
                  , be = l.subTree;
                l.subTree = oe,
                F(be, oe, y(be.el), jt(be), l, h, x),
                O.el = oe.el,
                Y === null && Gr(l, oe.el),
                C && de(C, h),
                (J = O.props && O.props.onVnodeUpdated) && de(()=>Te(J, P, O, j), h)
            } else {
                let O;
                const {el: E, props: C} = a
                  , {bm: P, m: j, parent: Y} = l
                  , J = qt(a);
                if (Ye(l, !1),
                P && gs(P),
                !J && (O = C && C.onVnodeBeforeMount) && Te(O, Y, a),
                Ye(l, !0),
                E && ps) {
                    const oe = ()=>{
                        l.subTree = bs(l),
                        ps(E, l.subTree, l, h, null)
                    }
                    ;
                    J ? a.type.__asyncLoader().then(()=>!l.isUnmounted && oe()) : oe()
                } else {
                    const oe = l.subTree = bs(l);
                    F(null, oe, d, m, l, h, x),
                    a.el = oe.el
                }
                if (j && de(j, h),
                !J && (O = C && C.onVnodeMounted)) {
                    const oe = a;
                    de(()=>Te(O, Y, oe), h)
                }
                (a.shapeFlag & 256 || Y && qt(Y.vnode) && Y.vnode.shapeFlag & 256) && l.a && de(l.a, h),
                l.isMounted = !0,
                a = d = m = null
            }
        }
          , v = l.effect = new Ks(b,()=>Xs(g),l.scope)
          , g = l.update = ()=>v.run();
        g.id = l.uid,
        Ye(l, !0),
        g()
    }
      , ee = (l,a,d)=>{
        a.component = l;
        const m = l.vnode.props;
        l.vnode = a,
        l.next = null,
        Ci(l, a.props, m, d),
        Ii(l, a.children, d),
        bt(),
        go(),
        xt()
    }
      , q = (l,a,d,m,h,x,w,b,v=!1)=>{
        const g = l && l.children
          , O = l ? l.shapeFlag : 0
          , E = a.children
          , {patchFlag: C, shapeFlag: P} = a;
        if (C > 0) {
            if (C & 128) {
                Nt(g, E, d, m, h, x, w, b, v);
                return
            } else if (C & 256) {
                ze(g, E, d, m, h, x, w, b, v);
                return
            }
        }
        P & 8 ? (O & 16 && Pe(g, h, x),
        E !== g && p(d, E)) : O & 16 ? P & 16 ? Nt(g, E, d, m, h, x, w, b, v) : Pe(g, h, x, !0) : (O & 8 && p(d, ""),
        P & 16 && K(E, d, m, h, x, w, b, v))
    }
      , ze = (l,a,d,m,h,x,w,b,v)=>{
        l = l || ut,
        a = a || ut;
        const g = l.length
          , O = a.length
          , E = Math.min(g, O);
        let C;
        for (C = 0; C < E; C++) {
            const P = a[C] = v ? je(a[C]) : Ae(a[C]);
            F(l[C], P, d, null, h, x, w, b, v)
        }
        g > O ? Pe(l, h, x, !0, !1, E) : K(a, d, m, h, x, w, b, v, E)
    }
      , Nt = (l,a,d,m,h,x,w,b,v)=>{
        let g = 0;
        const O = a.length;
        let E = l.length - 1
          , C = O - 1;
        for (; g <= E && g <= C; ) {
            const P = l[g]
              , j = a[g] = v ? je(a[g]) : Ae(a[g]);
            if (wt(P, j))
                F(P, j, d, null, h, x, w, b, v);
            else
                break;
            g++
        }
        for (; g <= E && g <= C; ) {
            const P = l[E]
              , j = a[C] = v ? je(a[C]) : Ae(a[C]);
            if (wt(P, j))
                F(P, j, d, null, h, x, w, b, v);
            else
                break;
            E--,
            C--
        }
        if (g > E) {
            if (g <= C) {
                const P = C + 1
                  , j = P < O ? a[P].el : m;
                for (; g <= C; )
                    F(null, a[g] = v ? je(a[g]) : Ae(a[g]), d, j, h, x, w, b, v),
                    g++
            }
        } else if (g > C)
            for (; g <= E; )
                Oe(l[g], h, x, !0),
                g++;
        else {
            const P = g
              , j = g
              , Y = new Map;
            for (g = j; g <= C; g++) {
                const me = a[g] = v ? je(a[g]) : Ae(a[g]);
                me.key != null && Y.set(me.key, g)
            }
            let J, oe = 0;
            const be = C - j + 1;
            let rt = !1
              , ro = 0;
            const vt = new Array(be);
            for (g = 0; g < be; g++)
                vt[g] = 0;
            for (g = P; g <= E; g++) {
                const me = l[g];
                if (oe >= be) {
                    Oe(me, h, x, !0);
                    continue
                }
                let Ce;
                if (me.key != null)
                    Ce = Y.get(me.key);
                else
                    for (J = j; J <= C; J++)
                        if (vt[J - j] === 0 && wt(me, a[J])) {
                            Ce = J;
                            break
                        }
                Ce === void 0 ? Oe(me, h, x, !0) : (vt[Ce - j] = g + 1,
                Ce >= ro ? ro = Ce : rt = !0,
                F(me, a[Ce], d, null, h, x, w, b, v),
                oe++)
            }
            const io = rt ? Ri(vt) : ut;
            for (J = io.length - 1,
            g = be - 1; g >= 0; g--) {
                const me = j + g
                  , Ce = a[me]
                  , lo = me + 1 < O ? a[me + 1].el : m;
                vt[g] === 0 ? F(null, Ce, d, lo, h, x, w, b, v) : rt && (J < 0 || g !== io[J] ? Je(Ce, d, lo, 2) : J--)
            }
        }
    }
      , Je = (l,a,d,m,h=null)=>{
        const {el: x, type: w, transition: b, children: v, shapeFlag: g} = l;
        if (g & 6) {
            Je(l.component.subTree, a, d, m);
            return
        }
        if (g & 128) {
            l.suspense.move(a, d, m);
            return
        }
        if (g & 64) {
            w.move(l, a, d, nt);
            return
        }
        if (w === le) {
            o(x, a, d);
            for (let E = 0; E < v.length; E++)
                Je(v[E], a, d, m);
            o(l.anchor, a, d);
            return
        }
        if (w === ys) {
            Z(l, a, d);
            return
        }
        if (m !== 2 && g & 1 && b)
            if (m === 0)
                b.beforeEnter(x),
                o(x, a, d),
                de(()=>b.enter(x), h);
            else {
                const {leave: E, delayLeave: C, afterLeave: P} = b
                  , j = ()=>o(x, a, d)
                  , Y = ()=>{
                    E(x, ()=>{
                        j(),
                        P && P()
                    }
                    )
                }
                ;
                C ? C(x, j, Y) : Y()
            }
        else
            o(x, a, d)
    }
      , Oe = (l,a,d,m=!1,h=!1)=>{
        const {type: x, props: w, ref: b, children: v, dynamicChildren: g, shapeFlag: O, patchFlag: E, dirs: C} = l;
        if (b != null && Ms(b, null, d, l, !0),
        O & 256) {
            a.ctx.deactivate(l);
            return
        }
        const P = O & 1 && C
          , j = !qt(l);
        let Y;
        if (j && (Y = w && w.onVnodeBeforeUnmount) && Te(Y, a, l),
        O & 6)
            zn(l.component, d, m);
        else {
            if (O & 128) {
                l.suspense.unmount(d, m);
                return
            }
            P && qe(l, null, a, "beforeUnmount"),
            O & 64 ? l.type.remove(l, a, d, h, nt, m) : g && (x !== le || E > 0 && E & 64) ? Pe(g, a, d, !1, !0) : (x === le && E & 384 || !h && O & 16) && Pe(v, a, d),
            m && oo(l)
        }
        (j && (Y = w && w.onVnodeUnmounted) || P) && de(()=>{
            Y && Te(Y, a, l),
            P && qe(l, null, a, "unmounted")
        }
        , d)
    }
      , oo = l=>{
        const {type: a, el: d, anchor: m, transition: h} = l;
        if (a === le) {
            Wn(d, m);
            return
        }
        if (a === ys) {
            M(l);
            return
        }
        const x = ()=>{
            n(d),
            h && !h.persisted && h.afterLeave && h.afterLeave()
        }
        ;
        if (l.shapeFlag & 1 && h && !h.persisted) {
            const {leave: w, delayLeave: b} = h
              , v = ()=>w(d, x);
            b ? b(l.el, x, v) : v()
        } else
            x()
    }
      , Wn = (l,a)=>{
        let d;
        for (; l !== a; )
            d = S(l),
            n(l),
            l = d;
        n(a)
    }
      , zn = (l,a,d)=>{
        const {bum: m, scope: h, update: x, subTree: w, um: b} = l;
        m && gs(m),
        h.stop(),
        x && (x.active = !1,
        Oe(w, l, a, d)),
        b && de(b, a),
        de(()=>{
            l.isUnmounted = !0
        }
        , a),
        a && a.pendingBranch && !a.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === a.pendingId && (a.deps--,
        a.deps === 0 && a.resolve())
    }
      , Pe = (l,a,d,m=!1,h=!1,x=0)=>{
        for (let w = x; w < l.length; w++)
            Oe(l[w], a, d, m, h)
    }
      , jt = l=>l.shapeFlag & 6 ? jt(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : S(l.anchor || l.el)
      , no = (l,a,d)=>{
        l == null ? a._vnode && Oe(a._vnode, null, null, !0) : F(a._vnode || null, l, a, null, null, null, d),
        go(),
        hn(),
        a._vnode = l
    }
      , nt = {
        p: F,
        um: Oe,
        m: Je,
        r: oo,
        mt: yt,
        mc: K,
        pc: q,
        pbc: ie,
        n: jt,
        o: e
    };
    let hs, ps;
    return t && ([hs,ps] = t(nt)),
    {
        render: no,
        hydrate: hs,
        createApp: Si(no, hs)
    }
}
function Ye({effect: e, update: t}, s) {
    e.allowRecurse = t.allowRecurse = s
}
function In(e, t, s=!1) {
    const o = e.children
      , n = t.children;
    if (I(o) && I(n))
        for (let r = 0; r < o.length; r++) {
            const i = o[r];
            let c = n[r];
            c.shapeFlag & 1 && !c.dynamicChildren && ((c.patchFlag <= 0 || c.patchFlag === 32) && (c = n[r] = je(n[r]),
            c.el = i.el),
            s || In(i, c)),
            c.type === fs && (c.el = i.el)
        }
}
function Ri(e) {
    const t = e.slice()
      , s = [0];
    let o, n, r, i, c;
    const u = e.length;
    for (o = 0; o < u; o++) {
        const _ = e[o];
        if (_ !== 0) {
            if (n = s[s.length - 1],
            e[n] < _) {
                t[o] = n,
                s.push(o);
                continue
            }
            for (r = 0,
            i = s.length - 1; r < i; )
                c = r + i >> 1,
                e[s[c]] < _ ? r = c + 1 : i = c;
            _ < e[s[r]] && (r > 0 && (t[o] = s[r - 1]),
            s[r] = o)
        }
    }
    for (r = s.length,
    i = s[r - 1]; r-- > 0; )
        s[r] = i,
        i = t[i];
    return s
}
const Fi = e=>e.__isTeleport
  , le = Symbol.for("v-fgt")
  , fs = Symbol.for("v-txt")
  , Ge = Symbol.for("v-cmt")
  , ys = Symbol.for("v-stc")
  , Ct = [];
let ve = null;
function R(e=!1) {
    Ct.push(ve = e ? null : [])
}
function Bi() {
    Ct.pop(),
    ve = Ct[Ct.length - 1] || null
}
let Ft = 1;
function Co(e) {
    Ft += e
}
function Pn(e) {
    return e.dynamicChildren = Ft > 0 ? ve || ut : null,
    Bi(),
    Ft > 0 && ve && ve.push(e),
    e
}
function B(e, t, s, o, n, r) {
    return Pn(N(e, t, s, o, n, r, !0))
}
function ts(e, t, s, o, n) {
    return Pn(fe(e, t, s, o, n, !0))
}
function ki(e) {
    return e ? e.__v_isVNode === !0 : !1
}
function wt(e, t) {
    return e.type === t.type && e.key === t.key
}
const _s = "__vInternal"
  , Mn = ({key: e})=>e ?? null
  , Yt = ({ref: e, ref_key: t, ref_for: s})=>(typeof e == "number" && (e = "" + e),
e != null ? re(e) || se(e) || k(e) ? {
    i: ye,
    r: e,
    k: t,
    f: !!s
} : e : null);
function N(e, t=null, s=null, o=0, n=null, r=e === le ? 0 : 1, i=!1, c=!1) {
    const u = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Mn(t),
        ref: t && Yt(t),
        scopeId: gn,
        slotScopeIds: null,
        children: s,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: r,
        patchFlag: o,
        dynamicProps: n,
        dynamicChildren: null,
        appContext: null,
        ctx: ye
    };
    return c ? (Gs(u, s),
    r & 128 && e.normalize(u)) : s && (u.shapeFlag |= re(s) ? 8 : 16),
    Ft > 0 && !i && ve && (u.patchFlag > 0 || r & 6) && u.patchFlag !== 32 && ve.push(u),
    u
}
const fe = Ni;
function Ni(e, t=null, s=null, o=0, n=null, r=!1) {
    if ((!e || e === pi) && (e = Ge),
    ki(e)) {
        const c = pt(e, t, !0);
        return s && Gs(c, s),
        Ft > 0 && !r && ve && (c.shapeFlag & 6 ? ve[ve.indexOf(e)] = c : ve.push(c)),
        c.patchFlag |= -2,
        c
    }
    if (Yi(e) && (e = e.__vccOpts),
    t) {
        t = ji(t);
        let {class: c, style: u} = t;
        c && !re(c) && (t.class = Us(c)),
        G(u) && (ln(u) && !I(u) && (u = ce({}, u)),
        t.style = $(u))
    }
    const i = re(e) ? 1 : ei(e) ? 128 : Fi(e) ? 64 : G(e) ? 4 : k(e) ? 2 : 0;
    return N(e, t, s, o, n, i, r, !0)
}
function ji(e) {
    return e ? ln(e) || _s in e ? ce({}, e) : e : null
}
function pt(e, t, s=!1) {
    const {props: o, ref: n, patchFlag: r, children: i} = e
      , c = t ? Li(o || {}, t) : o;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && Mn(c),
        ref: t && t.ref ? s && n ? I(n) ? n.concat(Yt(t)) : [n, Yt(t)] : Yt(t) : n,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== le ? r === -1 ? 16 : r | 16 : r,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && pt(e.ssContent),
        ssFallback: e.ssFallback && pt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce
    }
}
function Hi(e=" ", t=0) {
    return fe(fs, null, e, t)
}
function Q(e="", t=!1) {
    return t ? (R(),
    ts(Ge, null, e)) : fe(Ge, null, e)
}
function Ae(e) {
    return e == null || typeof e == "boolean" ? fe(Ge) : I(e) ? fe(le, null, e.slice()) : typeof e == "object" ? je(e) : fe(fs, null, String(e))
}
function je(e) {
    return e.el === null && e.patchFlag !== -1 || e.memo ? e : pt(e)
}
function Gs(e, t) {
    let s = 0;
    const {shapeFlag: o} = e;
    if (t == null)
        t = null;
    else if (I(t))
        s = 16;
    else if (typeof t == "object")
        if (o & 65) {
            const n = t.default;
            n && (n._c && (n._d = !1),
            Gs(e, n()),
            n._c && (n._d = !0));
            return
        } else {
            s = 32;
            const n = t._;
            !n && !(_s in t) ? t._ctx = ye : n === 3 && ye && (ye.slots._ === 1 ? t._ = 1 : (t._ = 2,
            e.patchFlag |= 1024))
        }
    else
        k(t) ? (t = {
            default: t,
            _ctx: ye
        },
        s = 32) : (t = String(t),
        o & 64 ? (s = 16,
        t = [Hi(t)]) : s = 8);
    e.children = t,
    e.shapeFlag |= s
}
function Li(...e) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
        const o = e[s];
        for (const n in o)
            if (n === "class")
                t.class !== o.class && (t.class = Us([t.class, o.class]));
            else if (n === "style")
                t.style = $([t.style, o.style]);
            else if (ss(n)) {
                const r = t[n]
                  , i = o[n];
                i && r !== i && !(I(r) && r.includes(i)) && (t[n] = r ? [].concat(r, i) : i)
            } else
                n !== "" && (t[n] = o[n])
    }
    return t
}
function Te(e, t, s, o=null) {
    Se(e, t, 7, [s, o])
}
const Ui = En();
let Di = 0;
function Ki(e, t, s) {
    const o = e.type
      , n = (t ? t.appContext : e.appContext) || Ui
      , r = {
        uid: Di++,
        vnode: e,
        type: o,
        parent: t,
        appContext: n,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new Jo(!0),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: t ? t.provides : Object.create(n.provides),
        accessCache: null,
        renderCache: [],
        components: null,
        directives: null,
        propsOptions: On(o, n),
        emitsOptions: mn(o, n),
        emit: null,
        emitted: null,
        propsDefaults: X,
        inheritAttrs: o.inheritAttrs,
        ctx: X,
        data: X,
        props: X,
        attrs: X,
        slots: X,
        refs: X,
        setupState: X,
        setupContext: null,
        attrsProxy: null,
        slotsProxy: null,
        suspense: s,
        suspenseId: s ? s.pendingId : 0,
        asyncDep: null,
        asyncResolved: !1,
        isMounted: !1,
        isUnmounted: !1,
        isDeactivated: !1,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    return r.ctx = {
        _: r
    },
    r.root = t ? t.root : r,
    r.emit = Yr.bind(null, r),
    e.ce && e.ce(r),
    r
}
let ae = null, eo, it, To = "__VUE_INSTANCE_SETTERS__";
(it = Ss()[To]) || (it = Ss()[To] = []),
it.push(e=>ae = e),
eo = e=>{
    it.length > 1 ? it.forEach(t=>t(e)) : it[0](e)
}
;
const mt = e=>{
    eo(e),
    e.scope.on()
}
  , Qe = ()=>{
    ae && ae.scope.off(),
    eo(null)
}
;
function Rn(e) {
    return e.vnode.shapeFlag & 4
}
let Bt = !1;
function Wi(e, t=!1) {
    Bt = t;
    const {props: s, children: o} = e.vnode
      , n = Rn(e);
    Oi(e, s, n, t),
    Ai(e, o);
    const r = n ? zi(e, t) : void 0;
    return Bt = !1,
    r
}
function zi(e, t) {
    const s = e.type;
    e.accessCache = Object.create(null),
    e.proxy = ls(new Proxy(e.ctx,mi));
    const {setup: o} = s;
    if (o) {
        const n = e.setupContext = o.length > 1 ? qi(e) : null;
        mt(e),
        bt();
        const r = Ue(o, e, 0, [e.props, n]);
        if (xt(),
        Qe(),
        Lo(r)) {
            if (r.then(Qe, Qe),
            t)
                return r.then(i=>{
                    Ao(e, i, t)
                }
                ).catch(i=>{
                    cs(i, e, 0)
                }
                );
            e.asyncDep = r
        } else
            Ao(e, r, t)
    } else
        Fn(e, t)
}
function Ao(e, t, s) {
    k(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : G(t) && (e.setupState = un(t)),
    Fn(e, s)
}
let Io;
function Fn(e, t, s) {
    const o = e.type;
    if (!e.render) {
        if (!t && Io && !o.render) {
            const n = o.template || Zs(e).template;
            if (n) {
                const {isCustomElement: r, compilerOptions: i} = e.appContext.config
                  , {delimiters: c, compilerOptions: u} = o
                  , _ = ce(ce({
                    isCustomElement: r,
                    delimiters: c
                }, i), u);
                o.render = Io(n, _)
            }
        }
        e.render = o.render || we
    }
    mt(e),
    bt(),
    gi(e),
    xt(),
    Qe()
}
function Ji(e) {
    return e.attrsProxy || (e.attrsProxy = new Proxy(e.attrs,{
        get(t, s) {
            return he(e, "get", "$attrs"),
            t[s]
        }
    }))
}
function qi(e) {
    const t = s=>{
        e.exposed = s || {}
    }
    ;
    return {
        get attrs() {
            return Ji(e)
        },
        slots: e.slots,
        emit: e.emit,
        expose: t
    }
}
function to(e) {
    if (e.exposed)
        return e.exposeProxy || (e.exposeProxy = new Proxy(un(ls(e.exposed)),{
            get(t, s) {
                if (s in t)
                    return t[s];
                if (s in $t)
                    return $t[s](e)
            },
            has(t, s) {
                return s in t || s in $t
            }
        }))
}
function Yi(e) {
    return k(e) && "__vccOpts"in e
}
const Bn = (e,t)=>Dr(e, t, Bt)
  , Vi = Symbol.for("v-scx")
  , Xi = ()=>Ot(Vi)
  , Zi = "3.3.4"
  , Qi = "http://www.w3.org/2000/svg"
  , Xe = typeof document < "u" ? document : null
  , Po = Xe && Xe.createElement("template")
  , Gi = {
    insert: (e,t,s)=>{
        t.insertBefore(e, s || null)
    }
    ,
    remove: e=>{
        const t = e.parentNode;
        t && t.removeChild(e)
    }
    ,
    createElement: (e,t,s,o)=>{
        const n = t ? Xe.createElementNS(Qi, e) : Xe.createElement(e, s ? {
            is: s
        } : void 0);
        return e === "select" && o && o.multiple != null && n.setAttribute("multiple", o.multiple),
        n
    }
    ,
    createText: e=>Xe.createTextNode(e),
    createComment: e=>Xe.createComment(e),
    setText: (e,t)=>{
        e.nodeValue = t
    }
    ,
    setElementText: (e,t)=>{
        e.textContent = t
    }
    ,
    parentNode: e=>e.parentNode,
    nextSibling: e=>e.nextSibling,
    querySelector: e=>Xe.querySelector(e),
    setScopeId(e, t) {
        e.setAttribute(t, "")
    },
    insertStaticContent(e, t, s, o, n, r) {
        const i = s ? s.previousSibling : t.lastChild;
        if (n && (n === r || n.nextSibling))
            for (; t.insertBefore(n.cloneNode(!0), s),
            !(n === r || !(n = n.nextSibling)); )
                ;
        else {
            Po.innerHTML = o ? `<svg>${e}</svg>` : e;
            const c = Po.content;
            if (o) {
                const u = c.firstChild;
                for (; u.firstChild; )
                    c.appendChild(u.firstChild);
                c.removeChild(u)
            }
            t.insertBefore(c, s)
        }
        return [i ? i.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild]
    }
};
function el(e, t, s) {
    const o = e._vtc;
    o && (t = (t ? [t, ...o] : [...o]).join(" ")),
    t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : e.className = t
}
function tl(e, t, s) {
    const o = e.style
      , n = re(s);
    if (s && !n) {
        if (t && !re(t))
            for (const r in t)
                s[r] == null && Rs(o, r, "");
        for (const r in s)
            Rs(o, r, s[r])
    } else {
        const r = o.display;
        n ? t !== s && (o.cssText = s) : t && e.removeAttribute("style"),
        "_vod"in e && (o.display = r)
    }
}
const Mo = /\s*!important$/;
function Rs(e, t, s) {
    if (I(s))
        s.forEach(o=>Rs(e, t, o));
    else if (s == null && (s = ""),
    t.startsWith("--"))
        e.setProperty(t, s);
    else {
        const o = sl(e, t);
        Mo.test(s) ? e.setProperty(gt(o), s.replace(Mo, ""), "important") : e[o] = s
    }
}
const Ro = ["Webkit", "Moz", "ms"]
  , vs = {};
function sl(e, t) {
    const s = vs[t];
    if (s)
        return s;
    let o = dt(t);
    if (o !== "filter" && o in e)
        return vs[t] = o;
    o = Ko(o);
    for (let n = 0; n < Ro.length; n++) {
        const r = Ro[n] + o;
        if (r in e)
            return vs[t] = r
    }
    return t
}
const Fo = "http://www.w3.org/1999/xlink";
function ol(e, t, s, o, n) {
    if (o && t.startsWith("xlink:"))
        s == null ? e.removeAttributeNS(Fo, t.slice(6, t.length)) : e.setAttributeNS(Fo, t, s);
    else {
        const r = nr(t);
        s == null || r && !Wo(s) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : s)
    }
}
function nl(e, t, s, o, n, r, i) {
    if (t === "innerHTML" || t === "textContent") {
        o && i(o, n, r),
        e[t] = s ?? "";
        return
    }
    const c = e.tagName;
    if (t === "value" && c !== "PROGRESS" && !c.includes("-")) {
        e._value = s;
        const _ = c === "OPTION" ? e.getAttribute("value") : e.value
          , p = s ?? "";
        _ !== p && (e.value = p),
        s == null && e.removeAttribute(t);
        return
    }
    let u = !1;
    if (s === "" || s == null) {
        const _ = typeof e[t];
        _ === "boolean" ? s = Wo(s) : s == null && _ === "string" ? (s = "",
        u = !0) : _ === "number" && (s = 0,
        u = !0)
    }
    try {
        e[t] = s
    } catch {}
    u && e.removeAttribute(t)
}
function rl(e, t, s, o) {
    e.addEventListener(t, s, o)
}
function il(e, t, s, o) {
    e.removeEventListener(t, s, o)
}
function ll(e, t, s, o, n=null) {
    const r = e._vei || (e._vei = {})
      , i = r[t];
    if (o && i)
        i.value = o;
    else {
        const [c,u] = cl(t);
        if (o) {
            const _ = r[t] = fl(o, n);
            rl(e, c, _, u)
        } else
            i && (il(e, c, i, u),
            r[t] = void 0)
    }
}
const Bo = /(?:Once|Passive|Capture)$/;
function cl(e) {
    let t;
    if (Bo.test(e)) {
        t = {};
        let o;
        for (; o = e.match(Bo); )
            e = e.slice(0, e.length - o[0].length),
            t[o[0].toLowerCase()] = !0
    }
    return [e[2] === ":" ? e.slice(3) : gt(e.slice(2)), t]
}
let ws = 0;
const al = Promise.resolve()
  , ul = ()=>ws || (al.then(()=>ws = 0),
ws = Date.now());
function fl(e, t) {
    const s = o=>{
        if (!o._vts)
            o._vts = Date.now();
        else if (o._vts <= s.attached)
            return;
        Se(_l(o, s.value), t, 5, [o])
    }
    ;
    return s.value = e,
    s.attached = ul(),
    s
}
function _l(e, t) {
    if (I(t)) {
        const s = e.stopImmediatePropagation;
        return e.stopImmediatePropagation = ()=>{
            s.call(e),
            e._stopped = !0
        }
        ,
        t.map(o=>n=>!n._stopped && o && o(n))
    } else
        return t
}
const ko = /^on[a-z]/
  , dl = (e,t,s,o,n=!1,r,i,c,u)=>{
    t === "class" ? el(e, o, n) : t === "style" ? tl(e, s, o) : ss(t) ? Ns(t) || ll(e, t, s, o, i) : (t[0] === "." ? (t = t.slice(1),
    !0) : t[0] === "^" ? (t = t.slice(1),
    !1) : hl(e, t, o, n)) ? nl(e, t, o, r, i, c, u) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o),
    ol(e, t, o, n))
}
;
function hl(e, t, s, o) {
    return o ? !!(t === "innerHTML" || t === "textContent" || t in e && ko.test(t) && k(s)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || ko.test(t) && re(s) ? !1 : t in e
}
const pl = ce({
    patchProp: dl
}, Gi);
let No;
function ml() {
    return No || (No = Pi(pl))
}
const gl = (...e)=>{
    const t = ml().createApp(...e)
      , {mount: s} = t;
    return t.mount = o=>{
        const n = bl(o);
        if (!n)
            return;
        const r = t._component;
        !k(r) && !r.render && !r.template && (r.template = n.innerHTML),
        n.innerHTML = "";
        const i = s(n, !1, n instanceof SVGElement);
        return n instanceof Element && (n.removeAttribute("v-cloak"),
        n.setAttribute("data-v-app", "")),
        i
    }
    ,
    t
}
;
function bl(e) {
    return re(e) ? document.querySelector(e) : e
}
var xl = !1;
/*!
  * pinia v2.1.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let kn;
const ds = e=>kn = e
  , Nn = Symbol();
function Fs(e) {
    return e && typeof e == "object" && Object.prototype.toString.call(e) === "[object Object]" && typeof e.toJSON != "function"
}
var Tt;
(function(e) {
    e.direct = "direct",
    e.patchObject = "patch object",
    e.patchFunction = "patch function"
}
)(Tt || (Tt = {}));
function yl() {
    const e = qo(!0)
      , t = e.run(()=>Qt({}));
    let s = []
      , o = [];
    const n = ls({
        install(r) {
            ds(n),
            n._a = r,
            r.provide(Nn, n),
            r.config.globalProperties.$pinia = n,
            o.forEach(i=>s.push(i)),
            o = []
        },
        use(r) {
            return !this._a && !xl ? o.push(r) : s.push(r),
            this
        },
        _p: s,
        _a: null,
        _e: e,
        _s: new Map,
        state: t
    });
    return n
}
const jn = ()=>{}
;
function jo(e, t, s, o=jn) {
    e.push(t);
    const n = ()=>{
        const r = e.indexOf(t);
        r > -1 && (e.splice(r, 1),
        o())
    }
    ;
    return !s && Yo() && ir(n),
    n
}
function lt(e, ...t) {
    e.slice().forEach(s=>{
        s(...t)
    }
    )
}
const vl = e=>e();
function Bs(e, t) {
    e instanceof Map && t instanceof Map && t.forEach((s,o)=>e.set(o, s)),
    e instanceof Set && t instanceof Set && t.forEach(e.add, e);
    for (const s in t) {
        if (!t.hasOwnProperty(s))
            continue;
        const o = t[s]
          , n = e[s];
        Fs(n) && Fs(o) && e.hasOwnProperty(s) && !se(o) && !Le(o) ? e[s] = Bs(n, o) : e[s] = o
    }
    return e
}
const wl = Symbol();
function Sl(e) {
    return !Fs(e) || !e.hasOwnProperty(wl)
}
const {assign: Ne} = Object;
function El(e) {
    return !!(se(e) && e.effect)
}
function $l(e, t, s, o) {
    const {state: n, actions: r, getters: i} = t
      , c = s.state.value[e];
    let u;
    function _() {
        c || (s.state.value[e] = n ? n() : {});
        const p = jr(s.state.value[e]);
        return Ne(p, r, Object.keys(i || {}).reduce((y,S)=>(y[S] = ls(Bn(()=>{
            ds(s);
            const T = s._s.get(e);
            return i[S].call(T, T)
        }
        )),
        y), {}))
    }
    return u = Hn(e, _, t, s, o, !0),
    u
}
function Hn(e, t, s={}, o, n, r) {
    let i;
    const c = Ne({
        actions: {}
    }, s)
      , u = {
        deep: !0
    };
    let _, p, y = [], S = [], T;
    const U = o.state.value[e];
    !r && !U && (o.state.value[e] = {}),
    Qt({});
    let F;
    function V(K) {
        let W;
        _ = p = !1,
        typeof K == "function" ? (K(o.state.value[e]),
        W = {
            type: Tt.patchFunction,
            storeId: e,
            events: T
        }) : (Bs(o.state.value[e], K),
        W = {
            type: Tt.patchObject,
            payload: K,
            storeId: e,
            events: T
        });
        const ie = F = Symbol();
        _n().then(()=>{
            F === ie && (_ = !0)
        }
        ),
        p = !0,
        lt(y, W, o.state.value[e])
    }
    const D = r ? function() {
        const {state: W} = s
          , ie = W ? W() : {};
        this.$patch(pe=>{
            Ne(pe, ie)
        }
        )
    }
    : jn;
    function A() {
        i.stop(),
        y = [],
        S = [],
        o._s.delete(e)
    }
    function Z(K, W) {
        return function() {
            ds(o);
            const ie = Array.from(arguments)
              , pe = []
              , $e = [];
            function ot(z) {
                pe.push(z)
            }
            function yt(z) {
                $e.push(z)
            }
            lt(S, {
                args: ie,
                name: K,
                store: ne,
                after: ot,
                onError: yt
            });
            let Be;
            try {
                Be = W.apply(this && this.$id === e ? this : ne, ie)
            } catch (z) {
                throw lt($e, z),
                z
            }
            return Be instanceof Promise ? Be.then(z=>(lt(pe, z),
            z)).catch(z=>(lt($e, z),
            Promise.reject(z))) : (lt(pe, Be),
            Be)
        }
    }
    const M = {
        _p: o,
        $id: e,
        $onAction: jo.bind(null, S),
        $patch: V,
        $reset: D,
        $subscribe(K, W={}) {
            const ie = jo(y, K, W.detached, ()=>pe())
              , pe = i.run(()=>Jt(()=>o.state.value[e], $e=>{
                (W.flush === "sync" ? p : _) && K({
                    storeId: e,
                    type: Tt.direct,
                    events: T
                }, $e)
            }
            , Ne({}, u, W)));
            return ie
        },
        $dispose: A
    }
      , ne = is(M);
    o._s.set(e, ne);
    const We = o._a && o._a.runWithContext || vl
      , Ee = o._e.run(()=>(i = qo(),
    We(()=>i.run(t))));
    for (const K in Ee) {
        const W = Ee[K];
        if (se(W) && !El(W) || Le(W))
            r || (U && Sl(W) && (se(W) ? W.value = U[K] : Bs(W, U[K])),
            o.state.value[e][K] = W);
        else if (typeof W == "function") {
            const ie = Z(K, W);
            Ee[K] = ie,
            c.actions[K] = W
        }
    }
    return Ne(ne, Ee),
    Ne(L(ne), Ee),
    Object.defineProperty(ne, "$state", {
        get: ()=>o.state.value[e],
        set: K=>{
            V(W=>{
                Ne(W, K)
            }
            )
        }
    }),
    o._p.forEach(K=>{
        Ne(ne, i.run(()=>K({
            store: ne,
            app: o._a,
            pinia: o,
            options: c
        })))
    }
    ),
    U && r && s.hydrate && s.hydrate(ne.$state, U),
    _ = !0,
    p = !0,
    ne
}
function so(e, t, s) {
    let o, n;
    const r = typeof t == "function";
    typeof e == "string" ? (o = e,
    n = r ? s : t) : (n = e,
    o = e.id);
    function i(c, u) {
        const _ = $i();
        return c = c || (_ ? Ot(Nn, null) : null),
        c && ds(c),
        c = kn,
        c._s.has(o) || (r ? Hn(o, t, n, c) : $l(o, n, c)),
        c._s.get(o)
    }
    return i.$id = o,
    i
}
const et = so("gameStore", {
    state: ()=>({
        connected_to_rl: !1,
        connected_to_relay: !1,
        game_data: null
    }),
    actions: {
        update_tick(e) {
            this.game_data = e
        },
        getName(e) {
            return this.game_data ? this.game_data.game.teams[e].name : ""
        },
        getScore(e) {
            return this.game_data ? this.game_data.game.teams[e].score : 0
        },
        getTimeFormatted() {
            if (this.game_data) {
                const e = this.game_data.game.time_seconds;
                let t = ~~(e % 3600 / 60)
                  , s = ~~e % 60;
                return (this.game_data.game.isOT ? "+" : "") + t + ":" + (s < 10 ? "0" : "") + s
            } else
                return ""
        }
    }
})
  , tt = so("headerSettingsStore", {
    state: ()=>({
        image_urls: {
            0: "",
            1: ""
        },
        team_names: {
            0: "",
            1: ""
        },
        series_score: {
            0: 0,
            1: 0
        },
        info_text: "",
        series_text: "",
        best_of: 5,
        team_images_outside: !0,
        show_team_names: !0,
        show_team_images: !0,
        series_score_boxes: !0,
        show_team_boost_boxes: !0,
        show_stats_box: !0,
        hide_stat: {
            SCORE: !0,
            SHOTS: !0,
            GOALS: !0,
            ASSISTS: !0,
            SAVES: !0,
            TOUCHES: !1,
            BUMPS: !1
        }
    }),
    actions: {
        getInfoText() {
            return this.info_text
        },
        getBestOf() {
            return this.best_of
        },
        getTotalGames() {
            return Math.ceil(this.best_of / 2)
        },
        getImage(e) {
            return this.image_urls[e] !== "" ? this.image_urls[e] : "https://cdn.discordapp.com/attachments/1122913573606269084/1122944140552970291/rocket.png"
        },
        getName(e) {
            return this.team_names[e]
        },
        getSeriesScore(e) {
            return this.series_score[e]
        },
        show_stat(e) {
            return this.hide_stat[e]
        }
    }
})
  , st = so("cssStore", {
    state: ()=>({
        custom_css: {
            main_bar: "",
            name_box: "font-size: 32px; height: 77px; width: 250px; padding-left: 10px; padding-right: 10px; font-weight: 800; line-height: 0.90; background: #1b1b1b;",
            left_name_box: "color: #2196f3;",
            right_name_box: "color: #ff5722;",
            logo_box: "padding: 5px; width: 77px; height: 77px; background: #1b1b1b;",
            left_logo_box: "",
            right_logo_box: "",
            score_box: "font-size: 52px; height: 77px; width: 77px; color: white;",
            left_score_box: "background: #2196f3;",
            right_score_box: "background: #ff5722;",
            time_box: "color: white; font-size: 42px; height: 77px; width: 200px; background: #1b1b1b;",
            bottom_bar: "height: 30px; min-width: 354px; background-color: #282c34;",
            series_box: "background-color: #323844; width: 130px; padding-left: 15px; padding-right: 15px;",
            left_series_box: "",
            right_series_box: "",
            series_score_box: "margin-left: auto; margin-right: auto; border-radius: 50%;",
            series_score_box_point: "height: 18px; width: 18px;",
            series_score_box_empty: "height: 14px; width: 14px; border: 2px solid white;",
            left_series_score_box_point: "background-color: #2196f3;",
            left_series_score_box_empty: "",
            right_series_score_box_point: "background-color: #ff5722;",
            right_series_score_box_empty: "",
            game_box: "background-color: #282c34; font-size: 20px; width: 200px;",
            series_info_box: "background-color: #282c34; font-size: 18px; min-width: 480px; padding-left: 20px; padding-right: 20px; height: 30px;",
            team_box: "color: white; position: fixed; top: 190px;",
            left_team_box: "left: 0;",
            right_team_box: "right: 0;",
            player_box: "height: 43px; width: 265px; margin-bottom: 5px; background-color: #1b1b1b;",
            left_player_box: "",
            right_player_box: "",
            player_name: "font-size: 20px; position: absolute; top: 5px; text-transform: uppercase; text-overflow: ellipsis; max-width: 190px; white-space: nowrap; overflow: hidden;",
            left_player_name: "left: 5px;",
            right_player_name: "right: 5px;",
            player_boost: "font-size: 20px; position: absolute; top: 5px; text-transform: uppercase;",
            left_player_boost: "right: 5px; color: #2196f3;",
            right_player_boost: "left: 5px; color: #ff5722;",
            boost_meter: "width: 255px; height: 6px; margin-top: 30px; margin-left: auto; margin-right: auto; background-color: #323844;",
            left_boost_meter: "",
            right_boost_meter: "",
            left_boost_meter_bar: "background-color: #2196f3;",
            right_boost_meter_bar: "background-color: #ff5722;",
            stat_box: "background-color: #1b1b1b; height: 40px; min-width: 870px; display: flex;",
            stat_box_player: "padding-left: 20px; padding-right: 20px; padding-top: 6px; font-size: 24px; height: 34px; background: #323844; text-transform: uppercase; text-overflow: ellipsis; width: 220px; text-align: center; white-space: nowrap; overflow: hidden;",
            stat_box_statistic: "display: flex; justify-content: flex-end; margin: auto; white-space: nowrap; padding-left: 5px; padding-right: 5px;",
            stat_box_statistic_number: "font-size: 22px; margin-right: 5px; min-width: 25px; text-align: right;",
            stat_box_statistic_name: "padding-top: 4px;"
        }
    }),
    actions: {}
})
  , Ol = ["src"]
  , Cl = ["src"]
  , Tl = Ke({
    __name: "Header_MainBar",
    setup(e) {
        const t = et()
          , s = tt()
          , o = st();
        return (n,r)=>(R(),
        B("div", {
            class: "main_bar",
            style: $(`
          ${f(o).custom_css.main_bar};
       `)
        }, [f(s).show_team_names ? (R(),
        B("div", {
            key: 0,
            class: "name_box",
            style: $(`
          order: ${f(s).team_images_outside ? 1 : 0};
          ${f(o).custom_css.name_box};
          ${f(o).custom_css.left_name_box};
          `)
        }, te(f(s).getName(0) !== "" ? f(s).getName(0) : f(t).getName(0)), 5)) : Q("", !0), f(s).show_team_images ? (R(),
        B("img", {
            key: 1,
            class: "logo_box",
            style: $(`
          order: ${f(s).team_images_outside ? 0 : 1};
          ${f(o).custom_css.logo_box};
          ${f(o).custom_css.left_logo_box};
         `),
            src: f(s).getImage(0),
            alt: ""
        }, null, 12, Ol)) : Q("", !0), N("div", {
            class: "score_box",
            style: $(`
          order: 4;
          ${f(o).custom_css.score_box};
          ${f(o).custom_css.left_score_box};
         `)
        }, te(f(t).getScore(0)), 5), N("div", {
            class: "time_box",
            style: $(`
          order: 5;
          ${f(o).custom_css.time_box};
         `)
        }, te(f(t).getTimeFormatted()), 5), N("div", {
            class: "score_box",
            style: $(`
          order: 6;
          ${f(o).custom_css.score_box};
          ${f(o).custom_css.right_score_box};
         `)
        }, te(f(t).getScore(1)), 5), f(s).show_team_images ? (R(),
        B("img", {
            key: 2,
            class: "logo_box",
            style: $(`
          order: ${f(s).team_images_outside ? 10 : 9};
          ${f(o).custom_css.logo_box};
          ${f(o).custom_css.right_logo_box};
         `),
            src: f(s).getImage(1),
            alt: ""
        }, null, 12, Cl)) : Q("", !0), f(s).show_team_names ? (R(),
        B("div", {
            key: 3,
            class: "name_box",
            style: $(`
          order: ${f(s).team_images_outside ? 9 : 10};
          ${f(o).custom_css.name_box};
          ${f(o).custom_css.right_name_box};
         `)
        }, te(f(s).getName(1) !== "" ? f(s).getName(1) : f(t).getName(1)), 5)) : Q("", !0)], 4))
    }
});
const kt = (e,t)=>{
    const s = e.__vccOpts || e;
    for (const [o,n] of t)
        s[o] = n;
    return s
}
  , Al = kt(Tl, [["__scopeId", "data-v-7f56af2e"]])
  , Il = Ke({
    __name: "Header_BottomBar",
    setup(e) {
        const t = et()
          , s = tt()
          , o = st();
        return (n,r)=>(R(),
        B("div", {
            class: "bottom_bar",
            style: $(`${f(o).custom_css.bottom_bar}`)
        }, [f(s).getBestOf() !== 0 && !f(s).series_score_boxes ? (R(),
        B("div", {
            key: 0,
            class: "series_box",
            style: $(`${f(o).custom_css.series_box};${f(o).custom_css.left_series_box};`)
        }, te(f(s).getSeriesScore(0)), 5)) : Q("", !0), f(s).getBestOf() !== 0 && f(s).series_score_boxes ? (R(),
        B("div", {
            key: 1,
            class: "series_box",
            style: $(`${f(o).custom_css.series_box};${f(o).custom_css.left_series_box};`)
        }, [f(s).getBestOf() > 0 ? (R(!0),
        B(le, {
            key: 0
        }, at(Math.max(f(s).getTotalGames() - f(s).getSeriesScore(0), 0), i=>(R(),
        B("div", {
            class: "boxes",
            style: $(`
             ${f(o).custom_css.series_score_box};
             ${f(o).custom_css.series_score_box_empty};
             ${f(o).custom_css.left_series_score_box_empty};
           `)
        }, null, 4))), 256)) : Q("", !0), (R(!0),
        B(le, null, at(f(s).getSeriesScore(0), i=>(R(),
        B("div", {
            class: "boxes",
            style: $(`
             ${f(o).custom_css.series_score_box};
             ${f(o).custom_css.series_score_box_point};
             ${f(o).custom_css.left_series_score_box_point};
           `)
        }, null, 4))), 256))], 4)) : Q("", !0), N("div", {
            class: "game_box",
            style: $(`${f(o).custom_css.game_box};`)
        }, te(f(s).series_text && f(s).series_text !== "" ? f(s).series_text : "GAME " + (f(s).getSeriesScore(0) + f(s).getSeriesScore(1) + (f(t).game_data.game.hasWinner ? 0 : 1)) + (f(s).getBestOf() > 0 ? " - BO " + f(s).getBestOf() : "")), 5), f(s).getBestOf() !== 0 && !f(s).series_score_boxes ? (R(),
        B("div", {
            key: 2,
            class: "series_box",
            style: $(`${f(o).custom_css.series_box};${f(o).custom_css.right_series_box};`)
        }, te(f(s).getSeriesScore(1)), 5)) : Q("", !0), f(s).getBestOf() !== 0 && f(s).series_score_boxes ? (R(),
        B("div", {
            key: 3,
            class: "series_box",
            style: $(`${f(o).custom_css.series_box};${f(o).custom_css.right_series_box};`)
        }, [(R(!0),
        B(le, null, at(f(s).getSeriesScore(1), i=>(R(),
        B("div", {
            class: "boxes",
            style: $(`
             ${f(o).custom_css.series_score_box};
             ${f(o).custom_css.series_score_box_point};
             ${f(o).custom_css.right_series_score_box_point};
           `)
        }, null, 4))), 256)), f(s).getBestOf() > 0 ? (R(!0),
        B(le, {
            key: 0
        }, at(Math.max(f(s).getTotalGames() - f(s).getSeriesScore(1), 0), i=>(R(),
        B("div", {
            class: "boxes",
            style: $(`
             ${f(o).custom_css.series_score_box};
             ${f(o).custom_css.series_score_box_empty};
             ${f(o).custom_css.right_series_score_box_empty};
           `)
        }, null, 4))), 256)) : Q("", !0)], 4)) : Q("", !0)], 4))
    }
});
const Pl = kt(Il, [["__scopeId", "data-v-bd57c5e8"]])
  , Ml = Ke({
    __name: "Header_TopBar",
    setup(e) {
        const t = tt()
          , s = st();
        return (o,n)=>(R(),
        B("div", {
            class: "top_bar",
            style: $(`${f(s).custom_css.series_info_box};`)
        }, te(f(t).info_text), 5))
    }
});
const Rl = kt(Ml, [["__scopeId", "data-v-6758b77e"]])
  , Fl = {
    style: {
        display: "flex",
        "flex-flow": "column"
    }
}
  , Ln = Ke({
    __name: "Header",
    setup(e) {
        et();
        const t = tt();
        return (s,o)=>(R(),
        B("div", Fl, [f(t).info_text !== "" ? (R(),
        ts(Rl, {
            key: 0
        })) : Q("", !0), fe(Al), fe(Pl)]))
    }
})
  , Bl = Ke({
    __name: "Team_Boxes",
    setup(e) {
        const t = et()
          , s = st();
        return (o,n)=>(R(),
        B(le, null, [N("div", {
            class: "team_box_left",
            style: $(`
             ${f(s).custom_css.team_box};
             ${f(s).custom_css.left_team_box};
           `)
        }, [(R(!0),
        B(le, null, at(f(t).game_data.players, r=>(R(),
        B("div", null, [r.team === 0 ? (R(),
        B("div", {
            key: 0,
            class: "player_box",
            style: $(`
             ${f(s).custom_css.player_box};
             ${f(s).custom_css.left_player_box};
           `)
        }, [N("div", {
            style: $(`
             ${f(s).custom_css.player_boost};
             ${f(s).custom_css.left_player_boost};
           `)
        }, te(r.boost), 5), N("div", {
            style: $(`
             ${f(s).custom_css.player_name};
             ${f(s).custom_css.left_player_name};
           `)
        }, te(r.name), 5), N("div", {
            class: "boost_bar_outer",
            style: $(`
               ${f(s).custom_css.boost_meter};
               ${f(s).custom_css.left_boost_meter};
             `)
        }, [N("div", {
            class: "boost_bar_inner",
            style: $(`${f(s).custom_css.left_boost_meter_bar};width: ${r.boost}%;`)
        }, null, 4)], 4)], 4)) : Q("", !0)]))), 256))], 4), N("div", {
            class: "team_box_right",
            style: $(`
             ${f(s).custom_css.team_box};
             ${f(s).custom_css.right_team_box};
           `)
        }, [(R(!0),
        B(le, null, at(f(t).game_data.players, r=>(R(),
        B("div", null, [r.team === 1 ? (R(),
        B("div", {
            key: 0,
            class: "player_box",
            style: $(`
             ${f(s).custom_css.player_box};
             ${f(s).custom_css.right_player_box};
           `)
        }, [N("div", {
            style: $(`
             ${f(s).custom_css.player_boost};
             ${f(s).custom_css.right_player_boost};
           `)
        }, te(r.boost), 5), N("div", {
            style: $(`
             ${f(s).custom_css.player_name};
             ${f(s).custom_css.right_player_name};
           `)
        }, te(r.name), 5), N("div", {
            class: "boost_bar_outer",
            style: $(`
               ${f(s).custom_css.boost_meter};
               ${f(s).custom_css.right_boost_meter};
             `)
        }, [N("div", {
            class: "boost_bar_inner right_team_inner_boost",
            style: $(`${f(s).custom_css.right_boost_meter_bar};width: ${r.boost}%;`)
        }, null, 4)], 4)], 4)) : Q("", !0)]))), 256))], 4)], 64))
    }
});
const Un = kt(Bl, [["__scopeId", "data-v-74a0b76b"]])
  , kl = Ke({
    __name: "Stats_Box",
    setup(e) {
        const t = tt()
          , s = st()
          , o = et();
        return (n,r)=>(R(),
        B("div", {
            class: "selfBox",
            style: $(`${f(s).custom_css.stat_box};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_player};`)
        }, te(f(o).game_data.local_player.name), 5), f(t).show_stat("SCORE") ? (R(),
        B("div", {
            key: 0,
            style: $(`${f(s).custom_css.stat_box_statistic};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_number};`)
        }, te(f(o).game_data.local_player.score), 5), N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_name};`)
        }, " SCORE ", 4)], 4)) : Q("", !0), f(t).show_stat("SHOTS") ? (R(),
        B("div", {
            key: 1,
            style: $(`${f(s).custom_css.stat_box_statistic};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_number};`)
        }, te(f(o).game_data.local_player.shots), 5), N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_name};`)
        }, " SHOTS ", 4)], 4)) : Q("", !0), f(t).show_stat("GOALS") ? (R(),
        B("div", {
            key: 2,
            style: $(`${f(s).custom_css.stat_box_statistic};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_number};`)
        }, te(f(o).game_data.local_player.goals), 5), N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_name};`)
        }, " GOALS ", 4)], 4)) : Q("", !0), f(t).show_stat("ASSISTS") ? (R(),
        B("div", {
            key: 3,
            style: $(`${f(s).custom_css.stat_box_statistic};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_number};`)
        }, te(f(o).game_data.local_player.assists), 5), N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_name};`)
        }, " ASSISTS ", 4)], 4)) : Q("", !0), f(t).show_stat("SAVES") ? (R(),
        B("div", {
            key: 4,
            style: $(`${f(s).custom_css.stat_box_statistic};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_number};`)
        }, te(f(o).game_data.local_player.saves), 5), N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_name};`)
        }, " SAVES ", 4)], 4)) : Q("", !0), f(t).show_stat("TOUCHES") ? (R(),
        B("div", {
            key: 5,
            style: $(`${f(s).custom_css.stat_box_statistic};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_number};`)
        }, te(f(o).game_data.local_player.touches), 5), N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_name};`)
        }, " TOUCHES ", 4)], 4)) : Q("", !0), f(t).show_stat("BUMPS") ? (R(),
        B("div", {
            key: 6,
            style: $(`${f(s).custom_css.stat_box_statistic};`)
        }, [N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_number};`)
        }, te(f(o).game_data.local_player.cartouches), 5), N("div", {
            style: $(`${f(s).custom_css.stat_box_statistic_name};`)
        }, " CAR BUMPS ", 4)], 4)) : Q("", !0)], 4))
    }
});
const Dn = kt(kl, [["__scopeId", "data-v-446e706f"]])
  , Nl = N("img", {
    alt: "gameplay placeholder image",
    style: {
        height: "1080px",
        width: "1920px",
        "object-fit": "scale-down",
        position: "fixed",
        left: "0",
        top: "0",
        "z-index": "-6000"
    },
    src: "https://cdn.discordapp.com/attachments/1122913573606269084/1123683827169103942/28-06-2023.20.37.58.png"
}, null, -1)
  , jl = N("div", {
    style: {
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        "text-align": "center",
        color: "white",
        "font-size": "120px",
        "white-space": "nowrap",
        "text-shadow": "0 0 10px black",
        opacity: "0.75"
    }
}, [N("div", null, "BARL OVERLAY"), N("div", null, "PREVIEW MODE")], -1)
  , Hl = Ke({
    __name: "Preview_Main",
    setup(e) {
        const t = et();
        return tt(),
        st(),
        t.game_data = {
            game: {
                hasWinner: !1,
                isOT: !1,
                isPaused: !1,
                teams: [{
                    name: "BLUE",
                    score: 3
                }, {
                    name: "ORANGE",
                    score: 5
                }],
                time_milliseconds: 290,
                time_seconds: 290
            },
            gameMode: 24,
            hasGame: !1,
            local_player: {
                assists: 1,
                cartouches: 21,
                goals: 2,
                name: "YOUR NAME HERE",
                saves: 5,
                score: 541,
                shots: 5,
                team: 0,
                touches: 25
            },
            players: {
                "C-Block_7": {
                    boost: 0,
                    name: "AYYJAYY",
                    team: 1
                },
                Hollywood_6: {
                    boost: 93,
                    name: "Retals",
                    team: 1
                },
                Imp_2: {
                    boost: 100,
                    name: "ApparentlyJack",
                    team: 0
                },
                Raja_1: {
                    boost: 37,
                    name: "Chronic",
                    team: 0
                },
                Saltie_5: {
                    boost: 58,
                    name: "MajicBear",
                    team: 1
                },
                Slider_3: {
                    boost: 64,
                    name: "noly",
                    team: 0
                }
            }
        },
        (s,o)=>(R(),
        B(le, null, [Nl, jl, fe(Ln), fe(Un), fe(Dn)], 64))
    }
})
  , Ll = N("link", {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Aldrich"
}, null, -1)
  , Ul = N("link", {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
}, null, -1)
  , Dl = N("link", {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossorigin: ""
}, null, -1)
  , Kl = "t!UxUu%be0H4n5rx0a"
  , Wl = "ws://localhost:49888"
  , zl = "ws://localhost:49777"
  , Jl = Ke({
    __name: "App",
    setup(e) {
        const t = et()
          , s = tt()
          , o = st()
          , n = Qt(!1)
          , r = Qt("Aldrich");
        async function i(D) {
            const A = await fetch(`https://fonts.googleapis.com/css2?family=${D}&display=swap`).then(M=>M.text()).catch(()=>"Aldrich")
              , Z = document.createElement("style");
            Z.innerHTML = A,
            document.head.appendChild(Z),
            r.value = `'${D}', 'Aldrich', sans-serif`
        }
        let c, u;
        _(),
        setInterval(function() {
            (!c || c.readyState === WebSocket.CLOSED) && (V(),
            t.connected_to_rl = !1,
            _())
        }, 1e3),
        y(),
        setInterval(function() {
            (!u || u.readyState === WebSocket.CLOSED) && (V(),
            t.connected_to_relay = !1,
            y())
        }, 1e3);
        function _() {
            c = new WebSocket(Wl),
            c.onopen = function() {
                t.connected_to_rl = !0
            }
            ,
            c.onmessage = D=>{
                if (!t.connected_to_relay)
                    return;
                const A = JSON.parse(D.data);
                switch (A.event) {
                case "BARL:update":
                    if (A.data.gameMode === 9) {
                        p();
                        return
                    }
                    t.update_tick(A.data);
                    break;
                case "BARL:initialized":
                    U();
                    break;
                case "BARL:match_created":
                    U(),
                    T("what_settings", {});
                    break;
                case "BARL:countdown":
                    U();
                    break;
                case "BARL:match_ended":
                    t.game_data.game.teams[0].score > t.game_data.game.teams[1].score ? s.series_score[0] += 1 : t.game_data.game.teams[0].score < t.game_data.game.teams[1].score && (s.series_score[1] += 1),
                    T("series_score", s.series_score);
                    break;
                case "BARL:round_started":
                    U();
                    break;
                case "BARL:match_destroyed":
                    t.game_data && p();
                    break
                }
            }
        }
        function p() {
            t.game_data.hasGame = !1,
            t.game_data.game.frame = null
        }
        function y() {
            u = new WebSocket(zl),
            u.onopen = function() {
                t.connected_to_relay = !0
            }
            ,
            u.onmessage = D=>{
                const A = JSON.parse(D.data);
                switch (A.type) {
                case "header_data":
                    A.checksum !== Kl ? o.$reset() : (i(A.data.css.font_family),
                    o.custom_css = A.data.css);
                    break;
                case "header_update":
                    o.$reset();
                    break;
                case "match_data":
                    s.best_of = A.data.best_of,
                    s.info_text = A.data.info_text,
                    s.series_text = A.data.series_text,
                    s.series_score = A.data.series_score,
                    s.image_urls = A.data.image_urls,
                    s.team_names = A.data.names;
                    break;
                case "options_data":
                    s.team_images_outside = A.data.team_images_outside,
                    s.show_team_names = A.data.show_team_names,
                    s.show_team_images = A.data.show_team_images,
                    s.series_score_boxes = A.data.series_score_boxes,
                    s.show_team_boost_boxes = A.data.show_team_boost_boxes,
                    s.show_stats_box = A.data.show_stats_box,
                    A.data.hide_stat && (s.hide_stat = A.data.hide_stat);
                    break;
                case "preview_mode":
                    n.value = A.data;
                    break
                }
            }
        }
        function S(D, A, Z) {
            const M = {
                event: `${D}:${A}`,
                data: Z
            };
            c.send(JSON.stringify(M))
        }
        function T(D, A) {
            u.send(JSON.stringify({
                type: D,
                data: A
            }))
        }
        function U() {
            setTimeout(()=>{
                F()
            }
            , 250),
            setTimeout(()=>{
                F()
            }
            , 500),
            setTimeout(()=>{
                F()
            }
            , 1e3)
        }
        function F() {
            S("BARL", "CMD", "replay_gui matchinfo 1"),
            S("BARL", "CMD", "replay_gui hud 0")
        }
        function V() {
            console.clear()
        }
        return (D,A)=>(R(),
        B(le, null, [Ll, Ul, Dl, f(t).connected_to_relay && f(t).connected_to_rl && f(t).game_data && f(t).game_data.hasGame ? (R(),
        B("div", {
            key: 0,
            style: $({
                fontFamily: r.value
            })
        }, [fe(Ln), f(s).show_team_boost_boxes && !f(t).game_data.game.hasWinner ? (R(),
        ts(Un, {
            key: 0
        })) : Q("", !0), f(s).show_stats_box && !f(t).game_data.game.hasWinner && f(t).game_data.local_player ? (R(),
        ts(Dn, {
            key: 1
        })) : Q("", !0)], 4)) : f(t).connected_to_relay && n.value ? (R(),
        B("div", {
            key: 1,
            style: $({
                fontFamily: r.value
            })
        }, [fe(Hl)], 4)) : Q("", !0)], 64))
    }
})
  , Kn = gl(Jl);
Kn.use(yl());
Kn.mount("#app");
