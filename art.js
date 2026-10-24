/* Aashiyana: hand-drawn style SVG illustrations generated in code. */
(function (root) {
  'use strict';
  function pot(c) {
    c = c || '#C8693E';
    return '<path d="M34 84h52l-6 28H40z" fill="' + c + '"/><rect x="30" y="78" width="60" height="9" rx="3" fill="' + c + '"/><rect x="30" y="78" width="60" height="3" rx="1.5" fill="#fff" opacity=".18"/>';
  }
  function leaf(x, y, rot, w, h, fill) {
    return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + w + '" ry="' + h + '" fill="' + fill + '" transform="rotate(' + rot + ' ' + x + ' ' + y + ')"/>';
  }
  var P = {
    vine: function (g, g2) {
      var s = '<path d="M60 80C58 60 40 52 30 62M60 80C64 58 82 50 92 60M60 80C60 56 60 44 62 30" stroke="#4E7A3A" stroke-width="3" fill="none" stroke-linecap="round"/>';
      [[30, 62, -40], [42, 52, 20], [92, 60, 40], [80, 50, -20], [62, 30, 10], [52, 42, -30], [72, 40, 30], [36, 74, -70], [88, 74, 70]].forEach(function (l, i) { s += leaf(l[0], l[1], l[2], 9, 12, i % 2 ? g : g2); });
      return s;
    },
    spiky: function (g, g2) {
      var s = '';
      [[-24, 30], [24, 30], [-12, 46], [12, 46], [0, 54]].forEach(function (a, i) {
        var x = 60 + a[0], top = 82 - a[1] - 16;
        s += '<path d="M' + (56 + a[0] / 6) + ' 82L' + x + ' ' + top + 'L' + (64 + a[0] / 6) + ' 82z" fill="' + (i % 2 ? g : g2) + '"/>';
      });
      return s;
    },
    aloe: function (g, g2) {
      var s = '';
      [-55, -35, -15, 15, 35, 55, 0].forEach(function (a, i) {
        s += '<path d="M60 82L' + (60 + Math.sin(a * Math.PI / 180) * 34) + ' ' + (82 - Math.cos(a * Math.PI / 180) * 44) + 'L' + (66 + Math.sin(a * Math.PI / 180) * 4) + ' 82z" fill="' + (i % 2 ? g : g2) + '"/>';
      });
      return s;
    },
    herb: function (g, g2) {
      var s = '<path d="M60 80V40M60 70L40 50M60 66L80 46M60 58L46 36M60 54L76 34" stroke="#4E7A3A" stroke-width="2.5" stroke-linecap="round"/>';
      [[60, 36], [40, 48], [80, 44], [46, 34], [76, 32], [50, 58], [72, 58], [60, 50], [34, 62], [86, 60]].forEach(function (l, i) { s += '<circle cx="' + l[0] + '" cy="' + l[1] + '" r="8" fill="' + (i % 2 ? g : g2) + '"/>'; });
      return s;
    },
    flower: function (g, f) {
      var s = '<path d="M60 80C60 60 60 50 60 38" stroke="#4E7A3A" stroke-width="3" stroke-linecap="round"/>' + leaf(48, 66, -35, 8, 14, g) + leaf(72, 62, 35, 8, 14, g);
      for (var i = 0; i < 8; i++) { var a = i * 45 * Math.PI / 180; s += '<circle cx="' + (60 + Math.cos(a) * 12) + '" cy="' + (34 + Math.sin(a) * 12) + '" r="8" fill="' + f + '"/>'; }
      return s + '<circle cx="60" cy="34" r="7" fill="#E9B23B"/>';
    },
    fruit: function (g, f) {
      var s = '<path d="M60 80V40" stroke="#4E7A3A" stroke-width="3"/>';
      [[44, 52, -30], [76, 48, 30], [50, 36, -50], [72, 34, 50], [60, 26, 0], [40, 68, -60], [80, 66, 60]].forEach(function (l) { s += leaf(l[0], l[1], l[2], 9, 14, g); });
      [[48, 62], [72, 58], [58, 46], [66, 70]].forEach(function (c) { s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="5.5" fill="' + f + '"/><circle cx="' + (c[0] - 1.5) + '" cy="' + (c[1] - 1.5) + '" r="1.5" fill="#fff" opacity=".5"/>'; });
      return s;
    },
    chilli: function (g, f) {
      var s = '<path d="M60 80V36" stroke="#4E7A3A" stroke-width="3"/>';
      [[44, 50, -30], [76, 46, 30], [52, 34, -50], [70, 32, 50], [60, 26, 0]].forEach(function (l) { s += leaf(l[0], l[1], l[2], 8, 13, g); });
      [[46, 60, 10], [74, 58, -10], [60, 62, 0]].forEach(function (c) { s += '<path d="M' + c[0] + ' ' + c[1] + 'q-3 14 3 22q6-10 3-22z" fill="' + f + '" transform="rotate(' + c[2] + ' ' + c[0] + ' ' + c[1] + ')"/>'; });
      return s;
    },
    cactus: function (g, f) {
      return '<rect x="50" y="34" width="20" height="50" rx="10" fill="' + g + '"/><path d="M50 62h-8a6 6 0 01-6-6V48a5 5 0 0110 0v8h4zM70 56h8a6 6 0 006-6V44a5 5 0 00-10 0v6h-4z" fill="' + g + '"/><circle cx="60" cy="32" r="5" fill="' + f + '"/><path d="M60 40v36M55 50v20M65 50v20" stroke="#fff" stroke-width="1" opacity=".3"/>';
    },
    palm: function (g, g2) {
      var s = '<path d="M60 82C60 66 60 56 60 44" stroke="#7A5A3A" stroke-width="4" stroke-linecap="round"/>';
      [[-70, 0], [-40, 1], [-10, 0], [20, 1], [50, 0], [80, 1]].forEach(function (a) {
        var r = a[0] * Math.PI / 180, x = 60 + Math.sin(r) * 38, y = 44 - Math.cos(r) * 26 + 10;
        s += '<path d="M60 46Q' + (60 + Math.sin(r) * 22) + ' ' + (30) + ' ' + x + ' ' + y + 'Q' + (60 + Math.sin(r) * 18) + ' ' + 42 + ' 60 46z" fill="' + (a[1] ? g : g2) + '"/>';
      });
      return s;
    },
    leafy: function (g, g2) {
      var s = '';
      [[40, 66, -40], [80, 66, 40], [50, 52, -20], [70, 52, 20], [60, 44, 0], [60, 64, 0]].forEach(function (l, i) { s += leaf(l[0], l[1], l[2], 12, 19, i % 2 ? g : g2); });
      return s;
    }
  };
  function plant(kind, a, b, potColor) {
    var body = (P[kind] || P.leafy)(a, b);
    return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="60" cy="62" r="54" fill="#E8F1DC"/>' + body + pot(potColor) + '</svg>';
  }

  /* Decor scenes */
  function frame(inner, bg) { return '<svg viewBox="0 0 160 110" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="160" height="110" rx="12" fill="' + (bg || '#F3E9D2') + '"/>' + inner + '</svg>'; }
  var floor = '<rect y="84" width="160" height="26" fill="#D9C7A0"/>';
  var SCENES = {
    lounge: frame(floor + '<rect x="20" y="52" width="86" height="34" rx="9" fill="#4F8F7B"/><rect x="14" y="60" width="16" height="26" rx="7" fill="#437D6B"/><rect x="96" y="60" width="16" height="26" rx="7" fill="#437D6B"/><rect x="28" y="44" width="28" height="22" rx="6" fill="#E9B23B"/><rect x="62" y="46" width="26" height="20" rx="6" fill="#C8693E"/><rect x="118" y="30" width="3" height="54" fill="#7A5A3A"/><path d="M110 32h19l-4 14h-11z" fill="#F4D58D"/><rect x="26" y="14" width="46" height="26" rx="3" fill="#fff" stroke="#B89B6A" stroke-width="3"/><circle cx="49" cy="27" r="7" fill="#A9CBA0"/><path d="M138 84v-14a10 10 0 0120 0v14z" fill="#C8693E"/><path d="M148 70v-18M148 60l-8-8M148 56l8-8" stroke="#4E7A3A" stroke-width="3" stroke-linecap="round"/>'),
    bedroom: frame(floor + '<rect x="22" y="48" width="92" height="38" rx="6" fill="#8D6E4F"/><rect x="22" y="58" width="92" height="26" rx="6" fill="#F4EFE3"/><rect x="22" y="58" width="92" height="12" rx="4" fill="#9AB8D3"/><rect x="28" y="50" width="26" height="14" rx="6" fill="#fff"/><rect x="58" y="50" width="26" height="14" rx="6" fill="#fff"/><rect x="124" y="60" width="22" height="26" rx="3" fill="#8D6E4F"/><path d="M127 60l8-14 8 14z" fill="#F4D58D"/><circle cx="48" cy="22" r="10" fill="none" stroke="#B89B6A" stroke-width="3"/><path d="M48 12v20M38 22h20" stroke="#B89B6A" stroke-width="2"/>'),
    kitchen: frame('<rect y="86" width="160" height="24" fill="#CDBA94"/><rect x="10" y="60" width="140" height="28" rx="3" fill="#F4EFE3"/><rect x="10" y="60" width="140" height="6" fill="#B89B6A"/><rect x="14" y="22" width="132" height="4" rx="2" fill="#8D6E4F"/><rect x="24" y="8" width="16" height="14" rx="3" fill="#A9CBA0"/><rect x="48" y="6" width="16" height="16" rx="3" fill="#E9B23B"/><rect x="72" y="9" width="16" height="13" rx="3" fill="#C8693E"/><path d="M110 22v-10a8 8 0 0116 0v10z" fill="#C8693E"/><path d="M118 12V0M118 8l-6-6M118 6l6-6" stroke="#4E7A3A" stroke-width="2.5" stroke-linecap="round"/><circle cx="40" cy="48" r="9" fill="#C8693E"/><rect x="36" y="38" width="8" height="5" fill="#8D6E4F"/><rect x="84" y="40" width="30" height="20" rx="3" fill="#7BA7A0"/>'),
    entrance: frame('<rect y="88" width="160" height="22" fill="#CDBA94"/><path d="M48 90V44a32 32 0 0164 0v46z" fill="#8D6E4F"/><path d="M54 90V46a26 26 0 0152 0v44z" fill="#A8845E"/><circle cx="98" cy="58" r="3.5" fill="#E9B23B"/><path d="M126 88v-18a9 9 0 0118 0v18z" fill="#C8693E"/><circle cx="135" cy="56" r="11" fill="#6FA35A"/><circle cx="128" cy="50" r="7" fill="#85B96E"/><circle cx="143" cy="52" r="6" fill="#E26E8D"/><path d="M16 88v-18a9 9 0 0118 0v18z" fill="#C8693E"/><circle cx="25" cy="58" r="10" fill="#6FA35A"/><path d="M80 6v8" stroke="#7A5A3A" stroke-width="2"/><path d="M72 14h16l-2 10h-12z" fill="#F4D58D"/>'),
    balcony: frame('<rect y="80" width="160" height="30" fill="#CDBA94"/><rect x="8" y="42" width="144" height="4" fill="#7A5A3A"/><path d="M14 46v38M34 46v38M54 46v38M74 46v38M94 46v38M114 46v38M134 46v38" stroke="#7A5A3A" stroke-width="3"/><path d="M24 86v-12a8 8 0 0116 0v12z" fill="#C8693E"/><circle cx="32" cy="62" r="11" fill="#6FA35A"/><path d="M62 86v-12a8 8 0 0116 0v12z" fill="#D88A5E"/><path d="M70 74V50M70 62l-9-9M70 58l9-9" stroke="#4E7A3A" stroke-width="3" stroke-linecap="round"/><circle cx="70" cy="48" r="5" fill="#E26E8D"/><rect x="98" y="62" width="38" height="8" rx="2" fill="#8D6E4F"/><rect x="102" y="70" width="3" height="14" fill="#8D6E4F"/><rect x="129" y="70" width="3" height="14" fill="#8D6E4F"/><circle cx="108" cy="56" r="6" fill="#E9B23B"/><circle cx="122" cy="56" r="6" fill="#6FA35A"/><path d="M16 12c10 8 20 8 30 0s20-8 30 0 20 8 30 0" stroke="#E26E8D" stroke-width="2.5" fill="none"/>'),
    wall: frame('<rect x="14" y="14" width="40" height="30" rx="2" fill="#fff" stroke="#8D6E4F" stroke-width="3"/><rect x="20" y="20" width="28" height="18" fill="#A9CBA0"/><rect x="62" y="10" width="30" height="40" rx="2" fill="#fff" stroke="#8D6E4F" stroke-width="3"/><circle cx="77" cy="30" r="9" fill="#E9B23B"/><rect x="100" y="18" width="44" height="28" rx="2" fill="#fff" stroke="#8D6E4F" stroke-width="3"/><path d="M106 40l12-14 10 10 6-6 8 10z" fill="#7BA7A0"/><rect x="30" y="58" width="36" height="32" rx="2" fill="#fff" stroke="#8D6E4F" stroke-width="3"/><path d="M36 84c6-14 12-14 18 0z" fill="#C8693E"/><rect x="76" y="62" width="50" height="28" rx="2" fill="#fff" stroke="#8D6E4F" stroke-width="3"/><circle cx="92" cy="76" r="7" fill="#E26E8D"/><circle cx="110" cy="76" r="7" fill="#4F8F7B"/>'),
    lights: frame('<rect y="86" width="160" height="24" fill="#2B3A55"/><path d="M0 24c26 16 54 16 80 0s54-16 80 0" stroke="#7A5A3A" stroke-width="2" fill="none"/><circle cx="20" cy="38" r="7" fill="#F4D58D"/><circle cx="46" cy="44" r="7" fill="#F4D58D"/><circle cx="74" cy="40" r="7" fill="#F4D58D"/><circle cx="104" cy="44" r="7" fill="#F4D58D"/><circle cx="132" cy="38" r="7" fill="#F4D58D"/><rect x="40" y="62" width="20" height="26" rx="4" fill="#fff" opacity=".85"/><circle cx="50" cy="75" r="6" fill="#F4D58D"/><rect x="100" y="62" width="20" height="26" rx="4" fill="#fff" opacity=".85"/><circle cx="110" cy="75" r="6" fill="#F4D58D"/>', '#34476B')
  };

  /* Small icons for DIY and hobbies (viewBox 64x64) */
  function ic(inner, bg) { return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="' + (bg || '#E8F1DC') + '"/>' + inner + '</svg>'; }
  var ICONS = {
    bottle: ic('<path d="M26 10h12v8c6 4 8 8 8 14v16a4 4 0 01-4 4H22a4 4 0 01-4-4V32c0-6 2-10 8-14z" fill="#9CCBE0" stroke="#4A87A6" stroke-width="2"/><path d="M32 40V28M32 34l-6-5M32 32l6-5" stroke="#4E7A3A" stroke-width="3" stroke-linecap="round"/>'),
    jar: ic('<rect x="20" y="18" width="24" height="32" rx="6" fill="#fff" stroke="#8D6E4F" stroke-width="2.5"/><rect x="22" y="12" width="20" height="6" rx="2" fill="#8D6E4F"/><path d="M32 44c-5-4-5-9 0-14 5 5 5 10 0 14z" fill="#F4A53B"/>', '#FBEFD0'),
    macrame: ic('<path d="M32 8v10M32 18l-14 12M32 18l14 12M32 18v14" stroke="#B89B6A" stroke-width="3" stroke-linecap="round"/><path d="M18 30l4 14M46 30l-4 14M32 32l-2 12M32 32l2 12" stroke="#B89B6A" stroke-width="2.5"/><path d="M20 44h24l-3 12H23z" fill="#C8693E"/>', '#F6EBD4'),
    paint: ic('<path d="M22 22h20l-3 28H25z" fill="#C8693E"/><rect x="20" y="18" width="24" height="6" rx="2" fill="#B05830"/><circle cx="32" cy="38" r="5" fill="#E9B23B"/><path d="M28 36l3 3 5-6" stroke="#fff" stroke-width="2" fill="none" opacity=".0"/><path d="M46 12l6 6-14 14-6-6z" fill="#4F8F7B"/>', '#FBE5D6'),
    frames: ic('<rect x="12" y="14" width="22" height="18" fill="#fff" stroke="#8D6E4F" stroke-width="2.5"/><rect x="38" y="12" width="14" height="22" fill="#fff" stroke="#8D6E4F" stroke-width="2.5"/><rect x="16" y="38" width="30" height="14" fill="#fff" stroke="#8D6E4F" stroke-width="2.5"/><circle cx="23" cy="23" r="4" fill="#E9B23B"/>', '#F6EBD4'),
    cushion: ic('<path d="M12 18q20-8 40 0 4 14 0 28-20 8-40 0-4-14 0-28z" fill="#E26E8D"/><path d="M20 24l24 16M44 24L20 40" stroke="#fff" stroke-width="2" opacity=".6"/><circle cx="32" cy="32" r="4" fill="#fff" opacity=".8"/>', '#FBE0E7'),
    needle: ic('<path d="M14 50L50 14" stroke="#8D8D8D" stroke-width="3" stroke-linecap="round"/><ellipse cx="46" cy="18" rx="2" ry="5" transform="rotate(45 46 18)" fill="#fff" stroke="#8D8D8D" stroke-width="1.5"/><path d="M22 44c-8 2-10 8-4 10s10-4 6-8-10-6-12-14" stroke="#E26E8D" stroke-width="2.5" fill="none" stroke-linecap="round"/><circle cx="16" cy="18" r="5" fill="#E26E8D"/><circle cx="16" cy="18" r="2" fill="#E9B23B"/>', '#FBE0E7'),
    crochet: ic('<circle cx="30" cy="38" r="14" fill="#9B7FD1"/><path d="M18 34q12 6 24-2M17 40q13 6 26-2M20 46q10 4 20-2" stroke="#fff" stroke-width="1.8" fill="none" opacity=".6"/><path d="M42 10l-14 24" stroke="#B89B6A" stroke-width="3" stroke-linecap="round"/><path d="M42 10q4-2 4 2" stroke="#B89B6A" stroke-width="3" fill="none"/>', '#EDE4FA'),
    knit: ic('<path d="M12 12l30 36M52 12L22 48" stroke="#B89B6A" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="12" r="3" fill="#8D6E4F"/><circle cx="52" cy="12" r="3" fill="#8D6E4F"/><circle cx="32" cy="46" r="10" fill="#4F8F7B"/>', '#DDF0EA'),
    mehndi: ic('<path d="M22 54V30a3 3 0 016 0v-8a3 3 0 016 0v-2a3 3 0 016 0v4a3 3 0 016 0v22c0 6-4 8-12 8s-12-2-12-8z" fill="#F0C9A5"/><g stroke="#9A4B1F" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M30 44q4-6 8 0t8 0M28 50h18"/><circle cx="36" cy="38" r="3"/><path d="M36 35v-4M33 37l-3-3M39 37l3-3"/></g>', '#F9E6D2'),
    cake: ic('<rect x="14" y="32" width="36" height="18" rx="4" fill="#E2A36B"/><path d="M14 36q6 6 12 0t12 0t12 0v-6H14z" fill="#fff"/><rect x="30" y="22" width="4" height="10" fill="#E26E8D"/><path d="M32 12c-3 4-3 6 0 8 3-2 3-4 0-8z" fill="#F4A53B"/><circle cx="20" cy="30" r="3" fill="#C8693E"/><circle cx="44" cy="30" r="3" fill="#C8693E"/>', '#FBEFD0'),
    candle: ic('<rect x="22" y="26" width="20" height="26" rx="3" fill="#F7E6B8" stroke="#D9B96A" stroke-width="2"/><path d="M32 26v-5" stroke="#555" stroke-width="2"/><path d="M32 10c-5 6-5 9 0 12 5-3 5-6 0-12z" fill="#F4A53B"/><path d="M28 36v10" stroke="#fff" stroke-width="2" opacity=".6"/>', '#FBF1D6'),
    brush: ic('<path d="M44 8l12 12-24 24-12-12z" fill="#C8693E"/><path d="M20 32l12 12c-2 8-10 10-18 8 2-6 0-14 6-20z" fill="#4F8F7B"/><circle cx="14" cy="52" r="4" fill="#E9B23B"/>', '#FBE5D6'),
    machine: ic('<path d="M12 44V28a6 6 0 016-6h26v8h-8v14z" fill="#7BA7A0"/><rect x="10" y="44" width="44" height="8" rx="3" fill="#4F8F7B"/><path d="M42 30v12" stroke="#555" stroke-width="2.5"/><circle cx="22" cy="30" r="4" fill="#fff"/>', '#DDF0EA'),
    shop: ic('<path d="M12 26l4-12h32l4 12z" fill="#E26E8D"/><rect x="14" y="26" width="36" height="24" fill="#F4EFE3" stroke="#B89B6A" stroke-width="2"/><rect x="26" y="36" width="12" height="14" fill="#8D6E4F"/><path d="M12 26q4 6 8 0t8 0 8 0 8 0 8 0" stroke="#fff" stroke-width="2" fill="none"/>', '#FBE0E7')
  };
  root.AashiyanaArt = { plant: plant, scenes: SCENES, icons: ICONS };
})(typeof self !== 'undefined' ? self : this);
