/** @license React v16.7.0-alpha.2
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict'; Object.defineProperty(exports, "__esModule", { value: !0 }); var d = null, f = !1, h = 3, k = -1, l = -1, m = !1, n = !1; function p() { if (!m) { var a = d.expirationTime; n ? q() : n = !0; r(t, a) } }
function u() {
    var a = d, b = d.next; if (d === b) d = null; else { var c = d.previous; d = c.next = b; b.previous = c } a.next = a.previous = null; c = a.callback; b = a.expirationTime; a = a.priorityLevel; var e = h, Q = l; h = a; l = b; try { var g = c() } finally { h = e, l = Q } if ("function" === typeof g) if (g = { callback: g, priorityLevel: a, expirationTime: b, next: null, previous: null }, null === d) d = g.next = g.previous = g; else {
        c = null; a = d; do { if (a.expirationTime >= b) { c = a; break } a = a.next } while (a !== d); null === c ? c = d : c === d && (d = g, p()); b = c.previous; b.next = c.previous = g; g.next = c; g.previous =
            b
    }
} function v() { if (-1 === k && null !== d && 1 === d.priorityLevel) { m = !0; try { do u(); while (null !== d && 1 === d.priorityLevel) } finally { m = !1, null !== d ? p() : n = !1 } } } function t(a) { m = !0; var b = f; f = a; try { if (a) for (; null !== d;) { var c = exports.unstable_now(); if (d.expirationTime <= c) { do u(); while (null !== d && d.expirationTime <= c) } else break } else if (null !== d) { do u(); while (null !== d && !w()) } } finally { m = !1, f = b, null !== d ? p() : n = !1, v() } }
var x = Date, y = "function" === typeof setTimeout ? setTimeout : void 0, z = "function" === typeof clearTimeout ? clearTimeout : void 0, A = "function" === typeof requestAnimationFrame ? requestAnimationFrame : void 0, B = "function" === typeof cancelAnimationFrame ? cancelAnimationFrame : void 0, C, D; function E(a) { C = A(function (b) { z(D); a(b) }); D = y(function () { B(C); a(exports.unstable_now()) }, 100) }
if ("object" === typeof performance && "function" === typeof performance.now) { var F = performance; exports.unstable_now = function () { return F.now() } } else exports.unstable_now = function () { return x.now() }; var r, q, w;
if ("undefined" !== typeof window && window._schedMock) { var G = window._schedMock; r = G[0]; q = G[1]; w = G[2] } else if ("undefined" === typeof window || "function" !== typeof window.addEventListener) { var H = null, I = -1, J = function (a, b) { if (null !== H) { var c = H; H = null; try { I = b, c(a) } finally { I = -1 } } }; r = function (a, b) { -1 !== I ? setTimeout(r, 0, a, b) : (H = a, setTimeout(J, b, !0, b), setTimeout(J, 1073741823, !1, 1073741823)) }; q = function () { H = null }; w = function () { return !1 }; exports.unstable_now = function () { return -1 === I ? 0 : I } } else {
"undefined" !== typeof console &&
    ("function" !== typeof A && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof B && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")); var K = null, L = !1, M = -1, N = !1, O = !1, P = 0, R = 33, S = 33; w = function () { return P <= exports.unstable_now() }; var T = "__reactIdleCallback$" + Math.random().toString(36).slice(2);
    window.addEventListener("message", function (a) { if (a.source === window && a.data === T) { L = !1; a = K; var b = M; K = null; M = -1; var c = exports.unstable_now(), e = !1; if (0 >= P - c) if (-1 !== b && b <= c) e = !0; else { N || (N = !0, E(U)); K = a; M = b; return } if (null !== a) { O = !0; try { a(e) } finally { O = !1 } } } }, !1); var U = function (a) { if (null !== K) { E(U); var b = a - P + S; b < S && R < S ? (8 > b && (b = 8), S = b < R ? R : b) : R = b; P = a + S; L || (L = !0, window.postMessage(T, "*")) } else N = !1 }; r = function (a, b) { K = a; M = b; O || 0 > b ? window.postMessage(T, "*") : N || (N = !0, E(U)) }; q = function () { K = null; L = !1; M = -1 }
}
exports.unstable_ImmediatePriority = 1; exports.unstable_UserBlockingPriority = 2; exports.unstable_NormalPriority = 3; exports.unstable_IdlePriority = 5; exports.unstable_LowPriority = 4; exports.unstable_runWithPriority = function (a, b) { switch (a) { case 1: case 2: case 3: case 4: case 5: break; default: a = 3 }var c = h, e = k; h = a; k = exports.unstable_now(); try { return b() } finally { h = c, k = e, v() } };
exports.unstable_scheduleCallback = function (a, b) {
    var c = -1 !== k ? k : exports.unstable_now(); if ("object" === typeof b && null !== b && "number" === typeof b.timeout) b = c + b.timeout; else switch (h) { case 1: b = c + -1; break; case 2: b = c + 250; break; case 5: b = c + 1073741823; break; case 4: b = c + 1E4; break; default: b = c + 5E3 }a = { callback: a, priorityLevel: h, expirationTime: b, next: null, previous: null }; if (null === d) d = a.next = a.previous = a, p(); else {
        c = null; var e = d; do { if (e.expirationTime > b) { c = e; break } e = e.next } while (e !== d); null === c ? c = d : c === d && (d = a, p());
        b = c.previous; b.next = c.previous = a; a.next = c; a.previous = b
    } return a
}; exports.unstable_cancelCallback = function (a) { var b = a.next; if (null !== b) { if (b === a) d = null; else { a === d && (d = b); var c = a.previous; c.next = b; b.previous = c } a.next = a.previous = null } }; exports.unstable_wrapCallback = function (a) { var b = h; return function () { var c = h, e = k; h = b; k = exports.unstable_now(); try { return a.apply(this, arguments) } finally { h = c, k = e, v() } } }; exports.unstable_getCurrentPriorityLevel = function () { return h };
exports.unstable_shouldYield = function () { return !f && (null !== d && d.expirationTime < l || w()) };
