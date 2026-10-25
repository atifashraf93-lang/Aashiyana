/* Aashiyana kitchen tab: recipes, servings scaling, timers, shopping list. */
(function () {
  'use strict';
  var A = window.AashiyanaApp, R = window.RECIPES || [], Dish = window.AashiyanaDish, Ph = window.AashiyanaPhoto;
  if (!A || !R.length) return;
  var $ = A.$, $$ = A.$$, ur = A.ur, esc = A.esc, en = A.en, store = A.store, toast = A.toast;
  var CU = { all: ['سب', 'All'], pk: ['پاکستانی', 'Pakistani'], cn: ['چائنیز', 'Chinese'], it: ['اطالوی', 'Italian'], fast: ['فاسٹ فوڈ', 'Fast food'], ar: ['عربی', 'Arabic'] };
  var MEAL = { all: ['سب', 'All'], break: ['ناشتہ', 'Breakfast'], main: ['مین ڈش', 'Main'], snack: ['سنیکس', 'Snacks'], soup: ['سوپ', 'Soup'], sweet: ['میٹھا', 'Sweet'], drink: ['مشروب', 'Drinks'] };
  var TAGS = { ramadan: ['رمضان', 'Ramadan'], quick: ['جلدی بننے والے', 'Quick'], kids: ['بچوں کے لیے', 'Kids'], guests: ['مہمانوں کے لیے', 'Guests'], fav: ['پسندیدہ', 'Favourites'] };
  var UNIT = { kg: ['کلو', 'kg'], g: ['گرام', 'g'], pao: ['پاؤ', 'pao'], cup: ['کپ', 'cup'], tbsp: ['کھانے کا چمچ', 'tbsp'], tsp: ['چائے کا چمچ', 'tsp'], pc: ['عدد', ''], ml: ['ملی لیٹر', 'ml'], l: ['لیٹر', 'l'], '': ['', ''] };
  var LVL = ['', 'آسان', 'درمیانہ', 'مشکل'], LVLEN = ['', 'Easy', 'Medium', 'Hard'];
  var st = { cu: 'all', meal: 'all', tag: '', q: '', have: '' }, serv = {}, favs = store('rfav') || [];
  function byId(id) { return R.filter(function (r) { return r.id === id; })[0]; }
  function thumb(r, cap) { return '<div class="ph" data-ph="' + esc(r.photo) + '"' + (cap ? ' data-cap="1"' : '') + '>' + Dish.svg(r) + '</div>'; }

  function fmtNum(x) {
    if (x >= 10) return ur(Math.round(x));
    var q = Math.round(x * 4) / 4, w = Math.floor(q), f = q - w, fr = f === 0.25 ? '¼' : f === 0.5 ? '½' : f === 0.75 ? '¾' : '';
    if (q === 0) q = 0.25, w = 0, fr = '¼';
    return (w ? ur(w) : '') + (fr ? ' ' + fr : '');
  }
  function qty(i, f) {
    var q = i[2] * f, u = i[3];
    if (!i[2]) return ['حسبِ ذائقہ', 'to taste'];
    if (u === 'g' && q >= 1000) { q = q / 1000; u = 'kg'; }
    if (u === 'g') { q = Math.round(q / 5) * 5 || 5; return [ur(q) + ' گرام', q + ' g']; }
    if (u === 'ml') { q = Math.round(q / 10) * 10; return [ur(q) + ' ملی لیٹر', q + ' ml']; }
    if (u === 'pc') q = Math.max(0.5, Math.round(q * 2) / 2);
    var n = fmtNum(q), un = UNIT[u] || UNIT[''], enq = (Math.round(q * 4) / 4) + (un[1] ? ' ' + un[1] : '');
    return [n.trim() + (un[0] ? ' ' + un[0] : ''), enq];
  }

  function chips(map, cur, key) {
    return Object.keys(map).map(function (k) { return '<button class="chip" data-k="' + key + '" data-v="' + k + '" aria-pressed="' + (cur === k) + '">' + map[k][0] + '<span class="en">' + map[k][1] + '</span></button>'; }).join('');
  }
  function match(r) {
    if (st.cu !== 'all' && r.cu !== st.cu) return 0;
    if (st.meal !== 'all' && r.meal !== st.meal) return 0;
    if (st.tag === 'fav' && favs.indexOf(r.id) < 0) return 0;
    if (st.tag === 'quick' && r.mins > 30) return 0;
    if (st.tag && st.tag !== 'fav' && st.tag !== 'quick' && r.tags.indexOf(st.tag) < 0) return 0;
    var q = st.q.trim().toLowerCase();
    if (q && r.ur.indexOf(q) < 0 && r.en.toLowerCase().indexOf(q) < 0) return 0;
    var toks = st.have.split(/[,،]/).map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
    if (toks.length) {
      var n = 0; toks.forEach(function (t) { if (r.ing.some(function (i) { return i[0].indexOf(t) > -1 || i[1].toLowerCase().indexOf(t) > -1; })) n++; });
      return n || 0;
    }
    return 1;
  }
  function render() {
    var list = R.map(function (r) { return [r, match(r)]; }).filter(function (x) { return x[1]; });
    if (st.have.trim()) list.sort(function (a, b) { return b[1] - a[1]; });
    var shop = store('shop') || [];
    $('#tab-kitchen').innerHTML =
      '<h1 id="h-kitchen">باورچی خانہ <span class="en" style="display:inline">Kitchen</span></h1><p class="sub">' + ur(R.length) + ' آسان ترکیبیں، پاکستانی، چائنیز اور مزید</p>' +
      '<div class="search"><input id="kq" type="search" value="' + esc(st.q) + '" placeholder="ترکیب تلاش کریں  Search recipes" autocomplete="off"><input id="khave" type="search" value="' + esc(st.have) + '" placeholder="گھر میں کیا ہے؟ مثلاً: چکن، آلو  What do you have?" autocomplete="off"></div>' +
      '<div class="chips">' + chips(CU, st.cu, 'cu') + '</div><div class="chips">' + chips(MEAL, st.meal, 'meal') + '</div>' +
      '<div class="chips">' + Object.keys(TAGS).map(function (k) { return '<button class="chip" data-k="tag" data-v="' + k + '" aria-pressed="' + (st.tag === k) + '">' + (k === 'fav' ? '★ ' : '') + TAGS[k][0] + '<span class="en">' + TAGS[k][1] + '</span></button>'; }).join('') + '</div>' +
      '<button class="btn ghost" data-shop style="margin-top:2px">🛒 خریداری کی فہرست · Shopping list' + (shop.length ? ' (' + ur(shop.length) + ')' : '') + '</button>' +
      '<div id="klist">' + (list.length ? list.map(function (x) {
        var r = x[0];
        return '<button class="rcard rec" data-recipe="' + r.id + '">' + thumb(r) + '<span class="m"><b>' + r.ur + '</b>' + en(r.en) + '<small>⏱ ' + ur(r.mins) + ' منٹ · 👥 ' + ur(r.serves) + ' · ' + LVL[r.lvl] + (st.have.trim() ? ' · ' + ur(x[1]) + ' چیزیں ملتی ہیں' : '') + '</small></span></button>';
      }).join('') : '<div class="empty">کوئی ترکیب نہیں ملی۔<span class="en" style="text-align:center">No recipes found</span></div>') + '</div>' +
      '<p class="hint">مقدار اور وقت گھر کے اندازے پر ہیں، اپنے ذائقے کے مطابق کم زیادہ کریں۔ سب ترکیبیں حلال اجزا سے ہیں۔<br><button class="linkbtn" data-credits>تصاویر کے حوالہ جات · Photo credits</button></p>';
    if (Ph) Ph.hydrate($('#tab-kitchen'));
  }
  function keepFocus(id, fn) { var el = $(id), s = el && el.selectionStart; fn(); el = $(id); if (el) { el.focus(); try { el.setSelectionRange(s, s); } catch (e) { /* ignore */ } } }
  $('#tab-kitchen').addEventListener('input', function (e) {
    if (e.target.id === 'kq') { st.q = e.target.value; keepFocus('#kq', render); }
    if (e.target.id === 'khave') { st.have = e.target.value; keepFocus('#khave', render); }
  });
  $('#tab-kitchen').addEventListener('click', function (e) {
    var c = e.target.closest('[data-k]');
    if (c) { var k = c.dataset.k, v = c.dataset.v; if (k === 'tag') st.tag = st.tag === v ? '' : v; else st[k] = v; var y = $('#tab-kitchen').scrollTop; render(); $('#tab-kitchen').scrollTop = y; return; }
    if (e.target.closest('[data-shop]')) return shopView();
    if (e.target.closest('[data-credits]')) return creditsView();
  });

  /* ---------- recipe detail ---------- */
  function detail(id) {
    var r = byId(id), n = serv[id] || r.serves, f = n / r.serves, fav = favs.indexOf(id) > -1;
    A.openDetail('<div class="hero"><div class="ph big" data-ph="' + esc(r.photo) + '" data-cap="1">' + Dish.svg(r) + '</div><h1>' + r.ur + '</h1>' + en(r.en) +
      '<div class="tags"><span class="badge">' + CU[r.cu][0] + ' · ' + CU[r.cu][1] + '</span><span class="badge">⏱ ' + ur(r.mins) + ' منٹ</span><span class="badge">' + LVL[r.lvl] + ' · ' + LVLEN[r.lvl] + '</span></div></div>' +
      '<div class="stepper"><span>کتنے لوگوں کے لیے · Servings</span><button data-sv="-1" aria-label="کم">−</button><b>' + ur(n) + '</b><button data-sv="1" aria-label="زیادہ">+</button></div>' +
      '<h2>اجزا · Ingredients</h2><div class="facts"><ul class="list ing">' + r.ing.map(function (i) { var q = qty(i, f); return '<li><span>' + i[0] + '<span class="en">' + i[1] + '</span></span><b>' + q[0] + '<span class="en">' + q[1] + '</span></b></li>'; }).join('') + '</ul></div>' +
      '<div class="two"><button class="btn" data-addshop="' + id + '">🛒 فہرست میں شامل کریں</button><button class="btn ghost" data-rfav="' + id + '">' + (fav ? '★ پسندیدہ' : '☆ پسندیدہ') + '</button></div>' +
      '<h2>طریقہ · Method</h2><div class="facts"><ol class="steps">' + r.steps.map(function (s, i) {
        return '<li><input type="checkbox" data-rstep="' + i + '" aria-label="مکمل"><p>' + ur(i + 1) + '۔ ' + s[0] + (s[1] ? '<button class="tm" data-timer="' + s[1] + '" data-label="' + esc(r.ur) + '">⏱ ' + ur(s[1]) + ' منٹ ٹائمر</button>' : '') + '</p></li>';
      }).join('') + '</ol></div>' + (r.tip ? '<div class="warn" style="background:#EAF2DD">💡 ' + r.tip + '</div>' : '') +
      '<button class="btn share" data-rshare="' + id + '">شیئر کریں · Share</button>');
    if (Ph) Ph.hydrate($('#detail'));
  }
  function shareText(id) {
    var r = byId(id), n = serv[id] || r.serves, f = n / r.serves;
    return '🍽 ' + r.ur + ' (' + r.en + ')\n⏱ ' + r.mins + ' منٹ · ' + n + ' افراد\n\nاجزا:\n' + r.ing.map(function (i) { return '• ' + i[0] + ': ' + qty(i, f)[0]; }).join('\n') + '\n\nطریقہ:\n' + r.steps.map(function (s, i) { return (i + 1) + '۔ ' + s[0]; }).join('\n') + '\n\n— آشیانہ | Aashiyana';
  }

  /* ---------- timer ---------- */
  var tm = null, tmInt = 0;
  function beep() { try { var C = window.AudioContext || window.webkitAudioContext, c = new C(), t = c.currentTime; [0, 0.3, 0.6].forEach(function (d) { var o = c.createOscillator(), g = c.createGain(); o.frequency.value = 880; g.gain.setValueAtTime(0.25, t + d); g.gain.exponentialRampToValueAtTime(0.001, t + d + 0.25); o.connect(g); g.connect(c.destination); o.start(t + d); o.stop(t + d + 0.25); }); } catch (e) { /* audio unavailable */ } }
  function paintTimer() {
    var el = $('#ktimer');
    if (!tm) { el.hidden = true; return; }
    var left = Math.max(0, Math.round((tm.end - Date.now()) / 1000));
    if (left === 0) { clearInterval(tmInt); el.hidden = true; var lbl = tm.label; tm = null; beep(); if (navigator.vibrate) { try { navigator.vibrate([300, 150, 300, 150, 300]); } catch (e) { /* ignore */ } } toast('ٹائمر مکمل: ' + lbl); return; }
    el.hidden = false; el.innerHTML = '⏱ <b>' + ur(String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0')) + '</b> · ' + esc(tm.label) + ' <button data-tmstop>بند کریں</button>';
  }
  function startTimer(mins, label) {
    var LN = A.nativeLN(); clearInterval(tmInt);
    tm = { end: Date.now() + mins * 60000, label: label };
    tmInt = setInterval(paintTimer, 1000); paintTimer();
    if (LN) { LN.requestPermissions().then(function (r) { if (r && r.display === 'granted') LN.schedule({ notifications: [{ id: 700, title: 'ٹائمر مکمل', body: label, schedule: { at: new Date(tm.end), allowWhileIdle: true } }] }); }).catch(function () { /* optional */ }); }
    toast('ٹائمر شروع: ' + ur(mins) + ' منٹ');
  }

  /* ---------- shopping list ---------- */
  function addShop(id) {
    var r = byId(id), f = (serv[id] || r.serves) / r.serves, list = store('shop') || [];
    r.ing.forEach(function (i) {
      if (!i[2]) { if (!list.some(function (x) { return x.u === i[0]; })) list.push({ u: i[0], e: i[1], q: '', d: 0 }); return; }
      var q = qty(i, f)[0], ex = list.filter(function (x) { return x.u === i[0]; })[0];
      if (ex) ex.q = ex.q ? ex.q + ' + ' + q : q; else list.push({ u: i[0], e: i[1], q: q, d: 0 });
    });
    store('shop', list); toast('فہرست میں شامل ہو گیا');
  }
  function shopView() {
    var list = store('shop') || [];
    A.openDetail('<h1 style="font-size:26px">خریداری کی فہرست <span class="en" style="display:inline">Shopping list</span></h1>' + (list.length ? '<div class="facts"><ul class="steps">' + list.map(function (x, i) {
      return '<li class="' + (x.d ? 'done' : '') + '"><input type="checkbox" data-sh="' + i + '"' + (x.d ? ' checked' : '') + ' aria-label="خرید لیا"><p>' + x.u + (x.q ? ' · <b>' + x.q + '</b>' : '') + '</p></li>';
    }).join('') + '</ul></div><button class="btn share" data-shshare>شیئر کریں · Share</button><button class="btn ghost" data-shclear>خریدی ہوئی چیزیں ہٹائیں · Clear bought</button>' : '<div class="empty">فہرست خالی ہے۔<span class="en" style="text-align:center">Open a recipe and tap “Add to list”.</span></div>'));
  }
  function creditsView() {
    var c = Ph ? Ph.credits() : [];
    A.openDetail('<h1 style="font-size:24px">تصاویر کے حوالہ جات <span class="en" style="display:inline">Photo credits</span></h1><p class="sub">تصاویر Wikimedia Commons سے آزاد لائسنس پر لی جاتی ہیں۔ جو تصاویر آپ کے فون پر آ چکی ہیں ان کے فوٹوگرافر یہ ہیں:</p>' +
      (c.length ? '<div class="facts"><ul class="list">' + c.map(function (x) { return '<li>' + esc(x.term) + ' — ' + esc(x.a) + ' (' + esc(x.l) + ')</li>'; }).join('') + '</ul></div>' : '<div class="empty">ابھی کوئی تصویر لوڈ نہیں ہوئی۔<span class="en" style="text-align:center">Photos load when you are online.</span></div>'));
  }

  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-recipe]'))) return detail(t.dataset.recipe);
    if ((t = e.target.closest('[data-sv]'))) { var id = $('[data-addshop]').dataset.addshop, r = byId(id), n = (serv[id] || r.serves) + (+t.dataset.sv); serv[id] = Math.max(1, Math.min(30, n)); return detail(id); }
    if ((t = e.target.closest('[data-addshop]'))) return addShop(t.dataset.addshop);
    if ((t = e.target.closest('[data-rfav]'))) { var rid = t.dataset.rfav, ix = favs.indexOf(rid); if (ix > -1) favs.splice(ix, 1); else favs.push(rid); store('rfav', favs); return detail(rid); }
    if ((t = e.target.closest('[data-rshare]'))) { var txt = shareText(t.dataset.rshare); if (navigator.share) navigator.share({ text: txt }).catch(function () { /* cancelled */ }); else if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { toast('کاپی ہو گیا'); }); return; }
    if ((t = e.target.closest('[data-timer]'))) return startTimer(+t.dataset.timer, t.dataset.label);
    if (e.target.closest('[data-tmstop]')) { clearInterval(tmInt); tm = null; paintTimer(); return; }
    if ((t = e.target.closest('[data-shshare]'))) { var l = store('shop') || [], s = '🛒 خریداری کی فہرست\n' + l.map(function (x) { return '• ' + x.u + (x.q ? ': ' + x.q : ''); }).join('\n'); if (navigator.share) navigator.share({ text: s }).catch(function () { /* cancelled */ }); else if (navigator.clipboard) navigator.clipboard.writeText(s).then(function () { toast('کاپی ہو گیا'); }); return; }
    if (e.target.closest('[data-shclear]')) { store('shop', (store('shop') || []).filter(function (x) { return !x.d; })); return shopView(); }
    if (e.target.closest('[data-credits]') && !e.target.closest('#tab-kitchen')) return creditsView();
  });
  document.addEventListener('change', function (e) {
    var t = e.target.closest('input[data-rstep]'); if (t) t.closest('li').classList.toggle('done', t.checked);
    t = e.target.closest('input[data-sh]');
    if (t) { var l = store('shop') || []; l[+t.dataset.sh].d = t.checked ? 1 : 0; store('shop', l); t.closest('li').classList.toggle('done', t.checked); }
  });
  window.AashiyanaKitchen = { render: render };
  render();
})();
