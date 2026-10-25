/* Real photographs from Wikimedia Commons (free licences). Looked up when the phone is online, cached on the phone,
   with the photographer and licence shown. Drawings are used when no photo is found. */
(function (root) {
  'use strict';
  var KEY = 'aashiyana.photo.', DAY = 864e5, queue = [], active = 0, MAX = 3, seen = {};
  function get(k) { try { var v = localStorage.getItem(KEY + k); return v ? JSON.parse(v) : null; } catch (e) { return null; } }
  function put(k, v) { try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) { /* storage full or unavailable */ } }
  function plain(h) { var d = document.createElement('div'); d.innerHTML = h || ''; return (d.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60); }
  function hit(term, cb) {
    var url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch=' +
      encodeURIComponent(term + ' filetype:bitmap') + '&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=640';
    fetch(url).then(function (r) { return r.json(); }).then(function (j) {
      var pages = j && j.query && j.query.pages ? Object.keys(j.query.pages).map(function (k) { return j.query.pages[k]; }) : [];
      pages.sort(function (a, b) { return (a.index || 0) - (b.index || 0); });
      for (var i = 0; i < pages.length; i++) {
        var ii = pages[i].imageinfo && pages[i].imageinfo[0]; if (!ii || ii.mime !== 'image/jpeg' || ii.width < 500) continue;
        if (/map|logo|flag|diagram|chart|stamp|icon|poster|menu|label|package|packet|sign/i.test(pages[i].title)) continue;
        var m = ii.extmetadata || {}, lic = m.LicenseShortName && m.LicenseShortName.value || '';
        if (!/^(CC BY|CC0|Public domain|PD)/i.test(lic)) continue;
        return cb({ u: ii.thumburl || ii.url, a: plain(m.Artist && m.Artist.value) || 'Wikimedia Commons', l: lic, p: ii.descriptionurl || '' });
      }
      cb(null);
    }).catch(function () { cb(undefined); });
  }
  function lookup(term, cb) {
    var c = get(term);
    if (c && c.none && Date.now() - c.t < 7 * DAY) return cb(null);
    if (c && c.u) return cb(c);
    queue.push([term, cb]); pump();
  }
  function pump() {
    while (active < MAX && queue.length) {
      (function (job) {
        active++;
        hit(job[0], function (r) {
          active--; if (r) put(job[0], r); else if (r === null) put(job[0], { none: 1, t: Date.now() });
          job[1](r || null); pump();
        });
      })(queue.shift());
    }
  }
  function show(el, r) {
    if (!r || !r.u || el.classList.contains('has')) return;
    var img = new Image(); img.alt = ''; img.decoding = 'async';
    img.onload = function () {
      el.classList.add('has'); el.insertBefore(img, el.firstChild);
      if (el.dataset.cap === '1') { var c = document.createElement('div'); c.className = 'pcap'; c.textContent = 'Photo: ' + r.a + ' · ' + r.l + ' · Wikimedia Commons'; el.parentNode.insertBefore(c, el.nextSibling); }
      seen[el.dataset.ph] = r;
    };
    img.onerror = function () { /* keep the drawing */ };
    img.src = r.u;
  }
  var io = null;
  function hydrate(rootEl) {
    var els = Array.prototype.slice.call((rootEl || document).querySelectorAll('[data-ph]:not(.has):not(.req)'));
    if (!els.length) return;
    function go(el) { el.classList.add('req'); lookup(el.dataset.ph, function (r) { show(el, r); }); }
    if ('IntersectionObserver' in window) {
      io = io || new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); go(e.target); } }); }, { rootMargin: '200px' });
      els.forEach(function (el) { io.observe(el); });
    } else els.forEach(go);
  }
  function credits() {
    var out = [];
    try { for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k.indexOf(KEY) === 0) { var v = JSON.parse(localStorage.getItem(k)); if (v && v.u) out.push({ term: k.slice(KEY.length), a: v.a, l: v.l, p: v.p }); } } } catch (e) { /* ignore */ }
    return out.sort(function (a, b) { return a.term < b.term ? -1 : 1; });
  }
  root.AashiyanaPhoto = { hydrate: hydrate, credits: credits };
})(typeof self !== 'undefined' ? self : this);
