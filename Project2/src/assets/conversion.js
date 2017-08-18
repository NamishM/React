(function () {
  const g = this; const aa = function (a, b, d) { a.addEventListener ? a.addEventListener(b, d, !1) : a.attachEvent && a.attachEvent(`on${b}`, d); }; let k = function (a) { return { visible: 1, hidden: 2, prerender: 3, preview: 4 }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ''] || 0; },
    ba = function (a) { let b; a.mozVisibilityState ? b = 'mozvisibilitychange' : a.webkitVisibilityState ? b = 'webkitvisibilitychange' : a.visibilityState && (b = 'visibilitychange'); return b; },
    l = function (a, b) { if (k(b) == 3) return !1; a(); return !0; },
    ca = function (a, b) {
      if (!l(a, b)) {
        var d = !1,
          c = ba(b),
          e = function () {
            if (!d && l(a, b)) {
              d = !0; const f = e; b.removeEventListener ? b.removeEventListener(c, f, !1) : b.detachEvent &&
b.detachEvent(`on${c}`, f);
            }
          }; c && aa(b, c, e);
      }
    }; const n = function (a) { a = parseFloat(a); return isNaN(a) || a > 1 || a < 0 ? 0 : a; }; let da = n('0.04'),
    ea = n('0.01'),
    fa = n('0.1'); const ga = /^true$/.test('false') ? !0 : !1; let p = String.prototype.trim ? function (a) { return a.trim(); } : function (a) { return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, ''); },
    u = function (a, b) { return a < b ? -1 : a > b ? 1 : 0; }; let v; a: { const w = g.navigator; if (w) { const x = w.userAgent; if (x) { v = x; break a; } }v = ''; } var y = function (a) { y[' '](a); return a; }; y[' '] = function () {}; const z = function (a, b) { for (const d in a)Object.prototype.hasOwnProperty.call(a, d) && b.call(void 0, a[d], d, a); }; let ha = v.indexOf('Opera') != -1,
    A = v.indexOf('Trident') != -1 || v.indexOf('MSIE') != -1,
    ia = v.indexOf('Edge') != -1,
    B = v.indexOf('Gecko') != -1 && !(v.toLowerCase().indexOf('webkit') != -1 && v.indexOf('Edge') == -1) && !(v.indexOf('Trident') != -1 || v.indexOf('MSIE') != -1) && v.indexOf('Edge') == -1,
    ja = v.toLowerCase().indexOf('webkit') != -1 && v.indexOf('Edge') == -1,
    C = function () { const a = g.document; return a ? a.documentMode : void 0; },
    D;
  a: {
    let E = '',
      F = (function () { const a = v; if (B) return /rv\:([^\);]+)(\)|;)/.exec(a); if (ia) return /Edge\/([\d\.]+)/.exec(a); if (A) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a); if (ja) return /WebKit\/(\S+)/.exec(a); if (ha) return /(?:Version)[ \/]?(\S+)/.exec(a); }()); F && (E = F ? F[1] : ''); if (A) { const G = C(); if (G != null && G > parseFloat(E)) { D = String(G); break a; } }D = E;
  }
  let H = D,
    I = {},
    J = function (a) {
      if (!I[a]) {
        for (var b = 0, d = p(String(H)).split('.'), c = p(String(a)).split('.'), e = Math.max(d.length, c.length), f = 0; b == 0 && f < e; f++) {
          let h = d[f] || '',
            m = c[f] || '',
            q = RegExp('(\\d*)(\\D*)', 'g'),
            na = RegExp('(\\d*)(\\D*)', 'g'); do {
            let r = q.exec(h) || ['', '', ''],
              t = na.exec(m) || ['', '', '']; if (r[0].length == 0 && t[0].length == 0) break; b = u(r[1].length == 0 ? 0 : parseInt(r[1], 10), t[1].length == 0 ? 0 : parseInt(t[1], 10)) || u(r[2].length == 0, t[2].length == 0) || u(r[2], t[2]);
          } while (b == 0);
        }I[a] = b >= 0;
      }
    },
    K = g.document,
    ka = K && A ? C() ||
(K.compatMode == 'CSS1Compat' ? parseInt(H, 10) : 5) : void 0; let L; if (!(L = !B && !A)) { let M; if (M = A)M = Number(ka) >= 9; L = M; }L || B && J('1.9.1'); A && J('9'); let la = function () { this.b = {}; this.a = {}; this.c = !1; for (let a = [1, 2, 3], b = 0, d = a.length; b < d; ++b) this.a[a[b]] = ''; },
    O = function (a, b, d) {
      const c = N; if (!c.c && (d ? c.a.hasOwnProperty(d) && c.a[d] == '' : 1)) {
        let e; a: { try { const f = window.top.location.hash; if (f) { const h = f.match(/\bdeid=([\d,]+)/); e = h && h[1] || ''; break a; } } catch (q) {}e = ''; } if (e = (e = e.match(new RegExp(`\\b(${a.join('|')})\\b`))) && e[0] || null)a = e; else {
          a: {
            if (!(Math.random() < 1E-4) && (e = Math.random(), e < b)) {
              b = window; try {
                const m = new Uint32Array(1); b.crypto.getRandomValues(m); e = m[0] /
65536 / 65536;
              } catch (q) { e = Math.random(); }a = a[Math.floor(e * a.length)]; break a;
            }a = null;
          }
        }a && a != '' && (d ? c.a.hasOwnProperty(d) && (c.a[d] = a) : c.b[a] = !0);
      }
    },
    P = function (a) { const b = N; return b.a.hasOwnProperty(a) ? b.a[a] : ''; },
    ma = function () {
      let a = N,
        b = []; z(a.b, (a, c) => { b.push(c); }); z(a.a, (a) => { a != '' && b.push(a); }); return b;
    }; let N,
    Q = 'google_conversion_id google_conversion_format google_conversion_type google_conversion_order_id google_conversion_language google_conversion_value google_conversion_currency google_conversion_domain google_conversion_label google_conversion_color google_disable_viewthrough google_remarketing_only google_remarketing_for_search google_conversion_items google_custom_params google_conversion_date google_conversion_time google_conversion_js_version onload_callback opt_image_generator google_conversion_page_url google_conversion_referrer_url'.split(' '),
    R = ['google_conversion_first_time', 'google_conversion_snippets']; function S(a) { return a != null ? (N ? P(2) : '') == '3455583315' ? encodeURIComponent(a.toString()) : escape(a.toString()) : ''; } function T(a) { return a != null ? a.toString().substring(0, 512) : ''; } function U(a, b) { const d = S(b); if (d != '') { const c = S(a); if (c != '') return '&'.concat(c, '=', d); } return ''; } function V(a) { const b = typeof a; return a == null || b == 'object' || b == 'function' ? null : String(a).replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/=/g, '\\='); }
  function oa(a) { let b; if ((a = a.google_custom_params) && typeof a === 'object' && typeof a.join !== 'function') { const d = []; for (b in a) if (Object.prototype.hasOwnProperty.call(a, b)) { let c = a[b]; if (c && typeof c.join === 'function') { for (var e = [], f = 0; f < c.length; ++f) { const h = V(c[f]); h != null && e.push(h); }c = e.length == 0 ? null : e.join(','); } else c = V(c); (e = V(b)) && c != null && d.push(`${e}=${c}`); }b = d.join(';'); } else b = ''; return b == '' ? '' : '&'.concat('data=', encodeURIComponent(b)); }
  function pa(a) { if (a != null) { a = a.toString(); if (a.length == 2) return U('hl', a); if (a.length == 5) return U('hl', a.substring(0, 2)) + U('gl', a.substring(3, 5)); } return ''; } function W(a) { return typeof a !== 'number' && typeof a !== 'string' ? '' : S(a.toString()); }
  function qa(a) {
    if (!a) return ''; a = a.google_conversion_items; if (!a) return ''; for (var b = [], d = 0, c = a.length; d < c; d++) {
      let e = a[d],
        f = []; e && (f.push(W(e.value)), f.push(W(e.quantity)), f.push(W(e.item_id)), f.push(W(e.adwords_grouping)), f.push(W(e.sku)), b.push(`(${f.join('*')})`));
    } return b.length > 0 ? `&item=${b.join('')}` : '';
  }
  function ra(a, b, d) {
    const c = []; if (a) { const e = a.screen; e && (c.push(U('u_h', e.height)), c.push(U('u_w', e.width)), c.push(U('u_ah', e.availHeight)), c.push(U('u_aw', e.availWidth)), c.push(U('u_cd', e.colorDepth))); a.history && c.push(U('u_his', a.history.length)); }d && typeof d.getTimezoneOffset === 'function' && c.push(U('u_tz', -d.getTimezoneOffset())); b && (typeof b.javaEnabled === 'function' && c.push(U('u_java', b.javaEnabled())), b.plugins && c.push(U('u_nplug', b.plugins.length)), b.mimeTypes && c.push(U('u_nmime', b.mimeTypes.length)));
    return c.join('');
  } function sa(a) { a = a ? a.title : ''; if (void 0 == a || a == '') return ''; const b = function (a) { try { return decodeURIComponent(a), !0; } catch (b) { return !1; } }; a = encodeURIComponent(a); for (var d = 128; !b(a.substr(0, d));)d--; return `&tiba=${a.substr(0, d)}`; }
  function X(a, b, d, c) { let e = ''; if (b) { let f; if (a.top == a)f = 0; else { let h = a.location.ancestorOrigins; if (h)f = h[h.length - 1] == a.location.origin ? 1 : 2; else { h = a.top; try { let m; if (m = !!h && h.location.href != null)c: { try { y(h.foo); m = !0; break c; } catch (q) {}m = !1; }f = m; } catch (q) { f = !1; }f = f ? 1 : 2; } }a = d || (f == 1 ? a.top.location.href : a.location.href); e += U('frm', f); e += U('url', T(a)); e += U('ref', T(c || b.referrer)); } return e; }
  function Y(a, b) { return !(ga || b && ta.test(navigator.userAgent)) || a && a.location && a.location.protocol && a.location.protocol.toString().toLowerCase() == 'https:' ? 'https:' : 'http:'; } function Z(a, b, d) { d = d.google_remarketing_only ? 'googleads.g.doubleclick.net' : d.google_conversion_domain || 'www.googleadservices.com'; return `${Y(a, /www[.]googleadservices[.]com/i.test(d))}//${d}/pagead/${b}`; }
  function ua(a, b, d, c) {
    let e = '/?'; c.google_conversion_type == 'landing' && (e = '/extclk?'); e = [c.google_remarketing_only ? 'viewthroughconversion/' : 'conversion/', S(c.google_conversion_id), e, 'random=', S(c.google_conversion_time)].join(''); e = Z(a, e, c); a = [U('cv', c.google_conversion_js_version), U('fst', c.google_conversion_first_time), U('num', c.google_conversion_snippets), U('fmt', c.google_conversion_format), U('value', c.google_conversion_value), U('currency_code', c.google_conversion_currency), U('label', c.google_conversion_label),
      U('oid', c.google_conversion_order_id), U('bg', c.google_conversion_color), pa(c.google_conversion_language), U('guid', 'ON'), U('disvt', c.google_disable_viewthrough), U('eid', ma().join()), qa(c), ra(a, b, c.google_conversion_date), oa(c), X(a, d, c.google_conversion_page_url, c.google_conversion_referrer_url), c.google_remarketing_for_search && !c.google_conversion_domain ? '&srr=n' : '', sa(d)].join(''); return e + a;
  }
  const va = function (a, b, d, c, e, f) { return `<iframe name="${a}" title="${b}" width="${c}" height="${e}" src="${d}" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true"${f ? ' style="display:none"' : ''} scrolling="no"></iframe>`; };
  function wa(a) { return { ar: 1, bg: 1, cs: 1, da: 1, de: 1, el: 1, en_AU: 1, en_US: 1, en_GB: 1, es: 1, et: 1, fi: 1, fr: 1, hi: 1, hr: 1, hu: 1, id: 1, is: 1, it: 1, iw: 1, ja: 1, ko: 1, lt: 1, nl: 1, no: 1, pl: 1, pt_BR: 1, pt_PT: 1, ro: 1, ru: 1, sk: 1, sl: 1, sr: 1, sv: 1, th: 1, tl: 1, tr: 1, vi: 1, zh_CN: 1, zh_TW: 1 }[a] ? `${a}.html` : 'en_US.html'; }
  var ta = /Android ([01]\.|2\.[01])/i,
    xa = function (a, b) { if (!b.google_remarketing_only || (N ? P(3) : '') != '376635471') return ''; const d = `${Y(a, !1)}//bid.g.doubleclick.net/xbbe/pixel?d=KAE`; return va('google_cookie_match_frame', 'Google cookie match frame', d, 1, 1, !0); };
  function ya(a, b, d, c) {
    c.google_conversion_format != 3 || c.google_remarketing_only || c.google_conversion_domain || N && O(['317150500', '317150501', '317150504', '317150505'], da, 1); let e = ''; c.google_remarketing_only && (N && O(['376635470', '376635471'], fa, 3), e = xa(a, c)); N && O(['3455583314', '3455583315'], ea, 2); const f = N ? P(1) : ''; b = ua(a, b, d, c); d = function (a, b, c) { return `<img height="${c}" width="${b}" border="0" alt="" src="${a}" />`; }; return c.google_conversion_format == 0 && c.google_conversion_domain == null ? `<a href="${Y(a,
      !1)}//services.google.com/sitestats/${wa(c.google_conversion_language)}?cid=${S(c.google_conversion_id)}" target="_blank">${d(b, 135, 27)}</a>${e}` : c.google_conversion_snippets > 1 || c.google_conversion_format == 3 ? f == '317150501' || f == '317150504' || f == '317150505' ? `${d(b, 1, 1)}<script src="${b.replace(/(&|\?)fmt=3(&|$)/, '$1fmt=4&adtest=on$2')}">\x3c/script>${e}` : d(b, 1, 1) + e : va('google_conversion_frame', 'Google conversion frame', b, c.google_conversion_format == 2 ? 200 : 300, c.google_conversion_format == 2 ? 26 : 13, !1) +
e;
  } function za() { return new Image(); } function Aa(a, b) { let d = za; typeof a.opt_image_generator === 'function' && (d = a.opt_image_generator); d = d(); b += U('async', '1'); d.src = b; d.onload = function () {}; } function Ba(a, b, d) {
    var c = Math.floor(1E9 * Math.random()),
      c = [S(d.google_conversion_id), '/?random=', c].join(''),
      c = `${Y(a, !1)}//www.google.com/ads/user-lists/${c}`; a = [U('label', d.google_conversion_label), U('fmt', '3'), X(a, b, d.google_conversion_page_url, d.google_conversion_referrer_url)].join(''); Aa(d, c + a);
  }
  function Ca(a) {
    if (a.google_conversion_type == 'landing' || !a.google_conversion_id || a.google_remarketing_only && a.google_disable_viewthrough) return !1; a.google_conversion_date = new Date(); a.google_conversion_time = a.google_conversion_date.getTime(); a.google_conversion_snippets = typeof a.google_conversion_snippets === 'number' && a.google_conversion_snippets > 0 ? a.google_conversion_snippets + 1 : 1; typeof a.google_conversion_first_time !== 'number' && (a.google_conversion_first_time = a.google_conversion_time); a.google_conversion_js_version =
'8'; a.google_conversion_format != 0 && a.google_conversion_format != 1 && a.google_conversion_format != 2 && a.google_conversion_format != 3 && (a.google_conversion_format = 1); N = new la(); return !0;
  } function Da(a) { for (let b = 0; b < Q.length; b++)a[Q[b]] = null; } function Ea(a) { for (var b = {}, d = 0; d < Q.length; d++)b[Q[d]] = a[Q[d]]; for (d = 0; d < R.length; d++)b[R[d]] = a[R[d]]; return b; }
  function Fa(a) { let b = document.getElementsByTagName('head')[0]; b || (b = document.createElement('head'), document.getElementsByTagName('html')[0].insertBefore(b, document.getElementsByTagName('body')[0])); const d = document.createElement('script'); d.src = Z(window, 'conversion_debug_overlay.js', a); b.appendChild(d); }(function (a, b, d) {
    if (a) {
      if (/[\?&;]google_debug/.exec(document.URL) != null)Fa(a); else {
        try {
          if (Ca(a)) {
            if (k(d) == 3) {
              let c = Ea(a),
                e = `google_conversion_${Math.floor(1E9 * Math.random())}`; d.write(`<span id="${e}"></span>`); ca(() => { try { const f = d.getElementById(e); f && (f.innerHTML = ya(a, b, d, c), c.google_remarketing_for_search && !c.google_conversion_domain && Ba(a, d, c)); } catch (h) {} }, d);
            } else d.write(ya(a, b, d, a)), a.google_remarketing_for_search && !a.google_conversion_domain && Ba(a, d, a);
          }
        } catch (f) {}Da(a);
      }
    }
  }(window, navigator,
    document));
}).call(this);
