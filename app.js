/* Aashiyana app logic. Plants, decor, hobbies and a simple watering log. */
(function () {
  'use strict';
  var D = window.AashiyanaData, Art = window.AashiyanaArt;
  var DIG = '۰۱۲۳۴۵۶۷۸۹';
  function ur(n) { return String(n).replace(/\d/g, function (d) { return DIG[+d]; }); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function store(k, v) {
    try {
      if (v === undefined) { var x = localStorage.getItem('aashiyana.' + k); return x === null ? null : JSON.parse(x); }
      localStorage.setItem('aashiyana.' + k, JSON.stringify(v));
    } catch (e) { /* storage unavailable */ }
    return null;
  }
  var DAY = 86400000;
  var toastT = 0;
  function toast(m) { var t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, 2800); }
  function en(t) { return '<span class="en">' + esc(t) + '</span>'; }

  function plantById(id) { return D.PLANTS.filter(function (p) { return p.id === id; })[0]; }
  function pArt(p) { return Art.plant(p.kind, p.a, p.b); }
  function phPlant(p, cap) { return '<div class="ph" data-ph="' + esc(p.photo || p.en) + '"' + (cap ? ' data-cap="1"' : '') + '>' + pArt(p) + '</div>'; }
  function petBadge(p) { return p.pet === 'safe' ? '<span class="pet safe">🐾 پالتو کے لیے محفوظ</span>' : p.pet === 'toxic' ? '<span class="pet toxic">⚠ پالتو کے لیے نقصان دہ</span>' : ''; }

  /* ---------- tabs ---------- */
  function showTab(n) {
    $$('.tab').forEach(function (s) { s.hidden = s.id !== 'tab-' + n; });
    $$('#nav button').forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.tab === n)); });
    if (n === 'mine') renderMine();
    if (n === 'home') renderHome();
    closeDetail();
    if (n === 'kitchen' && window.AashiyanaKitchen) window.AashiyanaKitchen.render();
    if (window.AashiyanaPhoto) window.AashiyanaPhoto.hydrate($('#tab-' + n));
  }
  $('#nav').addEventListener('click', function (e) { var b = e.target.closest('button[data-tab]'); if (b) showTab(b.dataset.tab); });

  /* ---------- plants ---------- */
  var FILTERS = [['all', 'سب', 'All'], ['easy', 'آسان', 'Easy'], ['indoor', 'گھر کے اندر', 'Indoor'], ['balcony', 'بالکونی', 'Balcony'], ['garden', 'صحن / لان', 'Garden'], ['kitchen', 'کچن گارڈن', 'Kitchen'], ['pet', '🐾 پالتو کے لیے محفوظ', 'Pet-safe']];
  var filt = 'all';
  var cityId = store('city') || 'khi';
  function cityObj() { return D.CITIES.filter(function (c) { return c.id === cityId; })[0] || D.CITIES[0]; }
  function cityBlock() {
    var c = cityObj(), mo = new Date().getMonth(), frostNow = c.frost && (mo === 11 || mo === 0 || mo === 1);
    return '<div class="chips cityrow">' + D.CITIES.map(function (x) { return '<button class="chip" data-city="' + x.id + '" aria-pressed="' + (x.id === cityId) + '">' + x.ur + '<span class="en">' + x.en + '</span></button>'; }).join('') + '</div>' +
      '<p class="cnote">' + c.note + '</p>' + en(c.noteEn) + (frostNow ? '<div class="frost">❄ ان دنوں کورا پڑ سکتا ہے؛ نازک پودے اندر رکھیں اور رات کو ڈھانپ دیں۔<span class="en">Frost possible now; bring tender plants indoors or cover them at night.</span></div>' : '');
  }
  function renderMonth() {
    var m = new Date().getMonth();
    var list = D.PLANTS.filter(function (p) { return p.months.indexOf(m) > -1; });
    $('#monthBox').innerHTML = '<b>اس مہینے لگائیں: ' + D.MONTHS[m][0] + '</b>' + en('Sow or plant this month: ' + D.MONTHS[m][1]) + cityBlock() +
      (list.length ? '<div class="mchips">' + list.map(function (p) { return '<button data-plant="' + p.id + '">' + pArt(p) + '<span>' + p.ur.split(' (')[0] + '</span></button>'; }).join('') + '</div>' : '<p class="sub">اس مہینے کوئی خاص پودا نہیں۔</p>') +
      '<span class="en" style="margin-top:4px">General guide for Pakistan; timing varies by city and year.</span>';
  }
  document.addEventListener('click', function (e) { var c = e.target.closest('[data-city]'); if (c) { cityId = c.dataset.city; store('city', cityId); renderMonth(); } });
  function renderFilters() {
    $('#plantFilters').innerHTML = FILTERS.map(function (f) { return '<button class="chip" data-f="' + f[0] + '" aria-pressed="' + (filt === f[0]) + '">' + f[1] + '<span class="en">' + f[2] + '</span></button>'; }).join('');
  }
  function renderPlants() {
    var q = $('#plantSearch').value.trim().toLowerCase();
    var list = D.PLANTS.filter(function (p) {
      if (filt === 'easy' && !p.easy) return false;
      if (filt === 'pet' && p.pet !== 'safe') return false;
      if (filt !== 'all' && filt !== 'easy' && filt !== 'pet' && p.where.indexOf(filt) < 0) return false;
      return !q || p.ur.indexOf(q) > -1 || p.en.toLowerCase().indexOf(q) > -1;
    });
    $('#plantGrid').innerHTML = list.length ? list.map(function (p) {
      return '<button class="pcard" data-plant="' + p.id + '">' + phPlant(p) + '<b>' + p.ur.split(' (')[0] + '</b>' + en(p.en) + (p.easy ? '<span class="badge">آسان · Easy</span>' : '') + petBadge(p) + '</button>';
    }).join('') : '<div class="empty" style="grid-column:1/-1">کوئی پودا نہیں ملا۔ <span class="en" style="text-align:center">No plants found</span></div>';
    if (window.AashiyanaPhoto) window.AashiyanaPhoto.hydrate($('#plantGrid'));
  }
  $('#plantSearch').addEventListener('input', renderPlants);
  $('#plantFilters').addEventListener('click', function (e) { var b = e.target.closest('[data-f]'); if (b) { filt = b.dataset.f; renderFilters(); renderPlants(); } });

  function renderPests() {
    $('#pestList').innerHTML = D.PESTS.map(function (x) {
      return '<details class="pest"><summary>' + x.ur + '&nbsp;<span class="en" style="display:inline">· ' + x.en + '</span></summary><p><b>وجہ:</b> ' + x.cause + en(x.causeEn) + '</p><div class="fix"><p><b>حل:</b> ' + x.fix + en(x.fixEn) + '</p></div></details>';
    }).join('');
  }

  /* ---------- decor ---------- */
  function renderDecor() {
    $('#roomList').innerHTML = D.ROOMS.map(function (r) {
      return '<details class="scene"><summary style="list-style:none;cursor:pointer">' + Art.scenes[r.scene] + '<div class="ct"><b>' + r.ur + '</b>' + en(r.en) + '</div></summary>' +
        r.ideas.map(function (i) { return '<div class="idea"><strong>' + i[0] + '</strong>' + en(i[1]) + '<p>' + i[2] + '</p>' + en(i[3]) + '</div>'; }).join('') + '</details>';
    }).join('');
    $('#diyList').innerHTML = D.DIY.map(function (d) {
      return '<button class="rcard" data-diy="' + d.id + '">' + Art.icons[d.icon] + '<span class="m"><b>' + d.ur + '</b>' + en(d.en) + '<small>خرچ: ' + d.cost + ' · وقت: ' + d.time + '</small></span></button>';
    }).join('');
  }
  function renderHobbies() {
    $('#hobbyList').innerHTML = D.HOBBIES.map(function (h) {
      return '<button class="rcard" data-hobby="' + h.id + '">' + Art.icons[h.icon] + '<span class="m"><b>' + h.ur + '</b>' + en(h.en) + '<small>' + h.level + ' · ' + h.cost + '</small></span></button>';
    }).join('');
  }

  /* ---------- details ---------- */
  function openDetail(html) { var d = $('#detail'); d.innerHTML = '<button class="back" id="dBack">→ واپس <span class="en" style="display:inline">Back</span></button>' + html; d.hidden = false; d.scrollTop = 0; if (window.AashiyanaPhoto) window.AashiyanaPhoto.hydrate(d); }
  function closeDetail() { $('#detail').hidden = true; }
  function fact(label, labelEn, ur_, en_) { return '<div class="fact"><small>' + label + ' · ' + labelEn + '</small>' + ur_ + (en_ ? en(en_) : '') + '</div>'; }

  function shareBtn(kind, id) { return '<button class="btn share" data-share="' + kind + ':' + id + '">واٹس ایپ وغیرہ پر شیئر کریں · Share</button>'; }
  function shareText(kind, id) {
    var t;
    if (kind === 'plant') { var p = plantById(id); t = '🌿 ' + p.ur + ' (' + p.en + ')\nدھوپ: ' + p.sun + '\nپانی: ' + p.waterTxt + '\nٹپ: ' + p.tip; }
    else if (kind === 'diy') { var d = D.DIY.filter(function (x) { return x.id === id; })[0]; t = '🛠 ' + d.ur + ' (' + d.en + ')\nخرچ: ' + d.cost + ' · وقت: ' + d.time + '\n' + d.steps.map(function (s, i) { return ur(i + 1) + '۔ ' + s[0]; }).join('\n'); }
    else { var h = D.HOBBIES.filter(function (x) { return x.id === id; })[0]; t = '✨ ' + h.ur + ' (' + h.en + ')\n' + h.about + '\n' + h.steps.map(function (s, i) { return ur(i + 1) + '۔ ' + s[0]; }).join('\n'); }
    return t + '\n\n— آشیانہ | Aashiyana';
  }
  function plantDetail(id) {
    var p = plantById(id), mine = (store('mine') || {})[id];
    var months = p.months.map(function (m) { return D.MONTHS[m][0]; }).join('، ');
    var monthsEn = p.months.map(function (m) { return D.MONTHS[m][1].slice(0, 3); }).join(', ');
    openDetail('<div class="hero">' + phPlant(p, true) + '<h1>' + p.ur + '</h1>' + en(p.en) + '<div class="tags">' + petBadge(p) + p.where.map(function (w) { return '<span class="badge">' + D.WHERE[w][0] + ' · ' + D.WHERE[w][1] + '</span>'; }).join('') + '</div></div>' +
      '<div class="facts">' + fact('دھوپ', 'Sunlight', p.sun, p.sunEn) + fact('پانی', 'Watering', p.waterTxt, 'About every ' + p.water + ' days') + fact('مٹی', 'Soil', p.soil) +
      fact('کب لگائیں', 'When to plant', months, monthsEn) + fact('مفید ٹپ', 'Tip', p.tip, p.tipEn) + (p.pet ? fact('پالتو جانور', 'Pets', p.pet === 'safe' ? 'عام طور پر بلی اور کتے کے لیے محفوظ مانا جاتا ہے۔' : 'بلی اور کتے کے لیے نقصان دہ مانا جاتا ہے۔', p.pet === 'safe' ? 'Generally considered non-toxic to cats and dogs (ASPCA).' : 'Considered toxic to cats and dogs (ASPCA).') : '') + '</div>' +
      (p.warn ? '<div class="warn">⚠ ' + p.warn + en(p.warnEn) + '</div>' : '') +
      '<button class="btn' + (mine ? ' ghost' : '') + '" id="addMine" data-id="' + id + '"' + (mine ? ' disabled' : '') + '>' + (mine ? 'میرے باغ میں موجود ہے ✓' : 'میرے باغ میں شامل کریں · Add to my garden') + '</button>' + shareBtn('plant', id));
  }
  function diyDetail(id) {
    var d = D.DIY.filter(function (x) { return x.id === id; })[0], prog = store('diy.' + id) || [];
    openDetail('<div class="hero">' + Art.icons[d.icon] + '<h1>' + d.ur + '</h1>' + en(d.en) + '<div class="tags"><span class="badge">خرچ: ' + d.cost + ' · ' + d.costEn + '</span><span class="badge">وقت: ' + d.time + ' · ' + d.timeEn + '</span></div></div>' +
      '<h2>ضرورت کی چیزیں · Materials</h2><div class="facts"><ul class="list">' + d.need.map(function (n, i) { return '<li>' + n + en(d.needEn[i]) + '</li>'; }).join('') + '</ul></div>' +
      '<h2>طریقہ · Steps</h2><div class="facts"><ol class="steps">' + d.steps.map(function (s, i) {
        var on = prog.indexOf(i) > -1;
        return '<li class="' + (on ? 'done' : '') + '"><input type="checkbox" data-step="' + i + '" data-id="' + id + '"' + (on ? ' checked' : '') + ' aria-label="مکمل"><p>' + ur(i + 1) + '۔ ' + s[0] + en(s[1]) + '</p></li>';
      }).join('') + '</ol></div>' + shareBtn('diy', id));
  }
  function hobbyDetail(id) {
    var h = D.HOBBIES.filter(function (x) { return x.id === id; })[0];
    openDetail('<div class="hero">' + Art.icons[h.icon] + '<h1>' + h.ur + '</h1>' + en(h.en) + '<div class="tags"><span class="badge">' + h.level + ' · ' + h.levelEn + '</span><span class="badge">' + h.cost + ' · ' + h.costEn + '</span></div></div>' +
      '<div class="facts">' + fact('تعارف', 'About', h.about, h.aboutEn) + '</div>' +
      '<h2>ضرورت کی چیزیں · Materials</h2><div class="facts"><ul class="list">' + h.need.map(function (n, i) { return '<li>' + n + en(h.needEn[i]) + '</li>'; }).join('') + '</ul></div>' +
      '<h2>شروع کیسے کریں · Getting started</h2><div class="facts"><ol class="steps">' + h.steps.map(function (s, i) { return '<li><p>' + ur(i + 1) + '۔ ' + s[0] + en(s[1]) + '</p></li>'; }).join('') + '</ol></div>' +
      (h.safety ? '<div class="warn">⚠ ' + h.safety + en(h.safetyEn) + '</div>' : '') +
      '<div class="facts" style="margin-top:12px">' + fact('کمائی کا موقع', 'Earning idea', h.earn, h.earnEn) + '</div>' + shareBtn('hobby', id));
  }

  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-plant]'))) return plantDetail(t.dataset.plant);
    if ((t = e.target.closest('[data-diy]'))) return diyDetail(t.dataset.diy);
    if ((t = e.target.closest('[data-hobby]'))) return hobbyDetail(t.dataset.hobby);
    if (e.target.closest('#dBack')) return closeDetail();
    if ((t = e.target.closest('[data-share]'))) {
      var sp = t.dataset.share.split(':'), txt = shareText(sp[0], sp[1]);
      if (navigator.share) { navigator.share({ text: txt }).catch(function () { /* cancelled */ }); }
      else if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(function () { toast('کاپی ہو گیا'); }); }
      else toast('شیئر کی سہولت دستیاب نہیں');
      return;
    }
    if ((t = e.target.closest('#addMine'))) {
      var m = store('mine') || {}; m[t.dataset.id] = { added: Date.now(), watered: Date.now() }; store('mine', m);
      scheduleReminders(); toast('میرے باغ میں شامل ہو گیا'); return plantDetail(t.dataset.id);
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target.closest('input[data-step]'); if (!t) return;
    var key = 'diy.' + t.dataset.id, a = store(key) || [], i = +t.dataset.step, ix = a.indexOf(i);
    if (t.checked && ix < 0) a.push(i); if (!t.checked && ix > -1) a.splice(ix, 1);
    store(key, a); t.closest('li').classList.toggle('done', t.checked);
  });

  /* ---------- my garden ---------- */
  function renderMine() {
    var m = store('mine') || {}, ids = Object.keys(m).filter(plantById);
    if (!ids.length) { $('#mineList').innerHTML = '<div class="empty">ابھی کوئی پودا شامل نہیں۔<span class="en" style="text-align:center">No plants yet. Open a plant and tap “Add to my garden”.</span></div>'; return; }
    var now = Date.now();
    $('#mineList').innerHTML = ids.map(function (id) {
      var p = plantById(id), e = m[id], next = e.watered + p.water * DAY, left = Math.ceil((next - now) / DAY), late = left <= 0;
      var txt = late ? 'پانی دینے کا وقت ہو گیا' : (left === 1 ? 'کل پانی دیں' : ur(left) + ' دن بعد پانی دیں');
      return '<div class="gcard">' + pArt(p) + '<div class="m"><b>' + p.ur.split(' (')[0] + '</b>' + en(p.en) + '<span class="due ' + (late ? 'late' : 'ok') + '">' + txt + '</span></div>' +
        '<div style="display:flex;flex-direction:column;gap:6px"><button data-water="' + id + '">پانی دیا</button><button class="rm" data-rm="' + id + '">ہٹائیں</button></div></div>';
    }).join('');
  }
  $('#mineList').addEventListener('click', function (e) {
    var w = e.target.closest('[data-water]'), r = e.target.closest('[data-rm]'), m = store('mine') || {};
    if (w) { m[w.dataset.water].watered = Date.now(); store('mine', m); toast('پانی کا ریکارڈ درج ہو گیا'); renderMine(); scheduleReminders(); }
    if (r) { delete m[r.dataset.rm]; store('mine', m); renderMine(); scheduleReminders(); }
  });

  /* ---------- home ---------- */
  var TIPS = [
    ['پودے کو پانی دینے سے پہلے انگلی مٹی میں ڈال کر دیکھیں؛ اوپر کی مٹی خشک ہو تو پانی دیں۔', 'Check the soil with a finger before watering.'],
    ['صبح سویرے پانی دینا بہترین ہے، دوپہر کی دھوپ میں نہیں۔', 'Water in the early morning, not in the midday sun.'],
    ['چائے کی استعمال شدہ پتی خشک کر کے مٹی میں ملائیں، پودوں کے لیے اچھی کھاد ہے۔', 'Dried used tea leaves make a mild fertiliser.'],
    ['گملے کے نیچے سوراخ ضرور ہو، ورنہ جڑیں گل جاتی ہیں۔', 'Pots need drainage holes or roots rot.'],
    ['ہفتے میں ایک بار گملے کو گھما دیں تاکہ پودا ہر طرف سے دھوپ لے۔', 'Turn pots weekly so all sides get light.'],
    ['چاول دھونے کا پانی ٹھنڈا ہو کر پودوں کو دے سکتے ہیں۔', 'Cooled rice-washing water can be given to plants.']
  ];
  var WD = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
  function renderHome() {
    var n = new Date(), m = n.getMonth(), hr = n.getHours();
    $('#hDate').textContent = WD[n.getDay()] + '، ' + ur(n.getDate()) + ' ' + D.MONTHS[m][0] + ' ' + ur(n.getFullYear());
    $('#h-home').textContent = hr < 12 ? 'صبح بخیر' : hr < 18 ? 'السلام علیکم' : 'شام بخیر';
    $('#ti1').innerHTML = Art.plant('flower', '#3F7A3A', '#E04E7A').replace(/^<svg[^>]*>|<\/svg>$/g, '');
    ['decor:frames', 'hobby:crochet', 'mine:jar'].forEach(function (x, i) {
      $('#ti' + (i + 2)).innerHTML = Art.icons[x.split(':')[1]].replace(/^<svg[^>]*>|<\/svg>$/g, '');
    });
    $('#ti5').innerHTML = '<circle cx="32" cy="34" r="20" fill="#F4C95D"/><circle cx="32" cy="34" r="14" fill="#fff"/><path d="M18 14v14M14 14v8a4 4 0 008 0v-8M46 14c-4 4-5 9-5 15h5v21" stroke="#8A5A1E" stroke-width="3" fill="none" stroke-linecap="round"/>';
    $('#ti6').innerHTML = '<circle cx="20" cy="26" r="6" fill="#7C5CC4"/><circle cx="32" cy="18" r="6" fill="#7C5CC4"/><circle cx="44" cy="26" r="6" fill="#7C5CC4"/><path d="M32 30c-9 0-14 7-14 12 0 5 5 6 8 5 3-1 4-1 6-1s3 0 6 1c3 1 8 0 8-5 0-5-5-12-14-12z" fill="#7C5CC4"/>';
    var rr = window.RECIPES || [];
    if (rr.length) { var r0 = rr[Math.floor(n / DAY) % rr.length]; $('#homeRecipe').innerHTML = '<button class="rcard rec" data-recipe="' + r0.id + '" style="margin-top:12px"><div class="ph" data-ph="' + esc(r0.photo) + '">' + window.AashiyanaDish.svg(r0) + '</div><span class="m"><small style="color:var(--accent);font-weight:600">آج کیا پکائیں؟ · What to cook today</small><b>' + r0.ur + '</b>' + en(r0.en) + '<small>⏱ ' + ur(r0.mins) + ' منٹ · 👥 ' + ur(r0.serves) + '</small></span></button>'; }
    var tip = TIPS[Math.floor(n / DAY) % TIPS.length];
    $('#todayTip').innerHTML = '<h3>آج کا مشورہ · Tip of the day</h3><p>' + tip[0] + '</p>' + en(tip[1]);
    var mine = store('mine') || {}, due = Object.keys(mine).filter(plantById).filter(function (id) { return mine[id].watered + plantById(id).water * DAY <= n.getTime(); });
    $('#dueBox').innerHTML = due.length ? '<button class="due-row" data-go="mine" style="border:none;width:100%;text-align:start"><span>💧</span><span>' + ur(due.length) + ' پودوں کو پانی دینے کا وقت ہے<span class="en">' + due.length + ' plant(s) need water</span></span></button>' : '';
    var list = D.PLANTS.filter(function (p) { return p.months.indexOf(m) > -1; }).slice(0, 8);
    $('#homeMonth').innerHTML = '<b>اس مہینے لگائیں: ' + D.MONTHS[m][0] + '</b>' + en('Plant this month: ' + D.MONTHS[m][1]) +
      '<div class="mchips">' + list.map(function (p) { return '<button data-plant="' + p.id + '">' + pArt(p) + '<span>' + p.ur.split(' (')[0] + '</span></button>'; }).join('') + '</div>';
    var d = D.DIY[Math.floor(n / DAY) % D.DIY.length];
    $('#homeDiy').innerHTML = '<button class="rcard" data-diy="' + d.id + '">' + Art.icons[d.icon] + '<span class="m"><b>' + d.ur + '</b>' + en(d.en) + '<small>خرچ: ' + d.cost + ' · وقت: ' + d.time + '</small></span></button>';
  }
  document.addEventListener('click', function (e) { var g = e.target.closest('[data-go]'); if (g) { showTab(g.dataset.go); if (g.dataset.filter) { filt = g.dataset.filter; renderFilters(); renderPlants(); if (window.AashiyanaPhoto) window.AashiyanaPhoto.hydrate($('#tab-plants')); } } });

  /* ---------- reminders (Android app only) ---------- */
  function nativeLN() { var C = window.Capacitor; return (C && C.isNativePlatform && C.isNativePlatform() && C.Plugins && C.Plugins.LocalNotifications) || null; }
  function scheduleReminders() {
    var LN = nativeLN();
    if (!LN || !store('rem')) return Promise.resolve();
    var m = store('mine') || {}, list = [], now = Date.now(), i = 0;
    Object.keys(m).filter(plantById).forEach(function (id) {
      var p = plantById(id), due = new Date(m[id].watered + p.water * DAY);
      due.setHours(8, 0, 0, 0);
      if (due.getTime() <= now) { due = new Date(now + DAY); due.setHours(8, 0, 0, 0); }
      list.push({ id: 100 + (i++), title: 'پانی دینے کا وقت', body: p.ur.split(' (')[0] + ' کو پانی دیں', schedule: { at: due, allowWhileIdle: true } });
    });
    var n = new Date();
    for (var k = 1; k <= 6; k++) {
      var d = new Date(n.getFullYear(), n.getMonth() + k, 1, 9, 0, 0), mo = d.getMonth();
      var names = D.PLANTS.filter(function (p) { return p.months.indexOf(mo) > -1; }).slice(0, 4).map(function (p) { return p.ur.split(' (')[0]; }).join('، ');
      list.push({ id: 300 + k, title: 'اس مہینے کیا لگائیں؟', body: D.MONTHS[mo][0] + ': ' + names, schedule: { at: d, allowWhileIdle: true } });
    }
    return LN.getPending().then(function (p) {
      return p.notifications.length ? LN.cancel({ notifications: p.notifications.map(function (x) { return { id: x.id }; }) }) : null;
    }).then(function () { return LN.schedule({ notifications: list }); }).catch(function () { /* reminders unavailable */ });
  }
  function setupReminders() {
    var LN = nativeLN(); if (!LN) return;
    var card = $('#remCard'); card.hidden = false; card.style.display = '';
    var btn = $('#remBtn');
    function paint() { var on = !!store('rem'); btn.setAttribute('aria-pressed', String(on)); btn.textContent = on ? 'چالو' : 'بند'; }
    paint();
    btn.addEventListener('click', function () {
      if (store('rem')) {
        store('rem', false); paint(); toast('یاد دہانیاں بند');
        LN.getPending().then(function (p) { return p.notifications.length ? LN.cancel({ notifications: p.notifications.map(function (x) { return { id: x.id }; }) }) : null; }).catch(function () { /* ignore */ });
        return;
      }
      LN.requestPermissions().then(function (r) {
        if (r && r.display === 'granted') { store('rem', true); paint(); scheduleReminders(); toast('یاد دہانیاں چالو ہو گئیں'); }
        else toast('نوٹیفکیشن کی اجازت نہیں ملی');
      }).catch(function () { toast('یاد دہانی چالو نہیں ہو سکی'); });
    });
    scheduleReminders();
  }

  window.AashiyanaApp = { $: $, $$: $$, ur: ur, esc: esc, en: en, store: store, toast: toast, openDetail: openDetail, closeDetail: closeDetail, nativeLN: nativeLN };

  /* ---------- start ---------- */
  renderMonth(); renderFilters(); renderPlants(); renderDecor(); renderHobbies(); renderMine(); renderHome(); renderPests(); setupReminders();
  setTimeout(function () { var s = $('#splash'); s.classList.add('gone'); setTimeout(function () { s.remove(); }, 700); }, 1300);
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(function () { /* offline cache unavailable */ });
})();
