/* Simple drawn dishes (used when no photo is available). */
(function (root) {
  'use strict';
  var PAL = { pk: ['#C8693E', '#E9B23B', '#8A3F26'], cn: ['#B33A1E', '#6FA84A', '#E9B23B'], it: ['#D8553B', '#F2D27A', '#4E8F46'], fast: ['#E9A23B', '#B2552E', '#6FA84A'], ar: ['#C89A4A', '#E9D27A', '#7A8F4A'] };
  function steam() { return '<path d="M46 34c-6-8 6-10 0-18M60 34c-6-8 6-10 0-18M74 34c-6-8 6-10 0-18" stroke="#B9B3A0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>'; }
  function svg(r) {
    var p = PAL[r.cu] || PAL.pk, bg = '#F6EEDD', s = '';
    if (r.meal === 'drink') {
      s = '<path d="M38 36h44l-6 56H44z" fill="#FFF" stroke="#CFC6AE" stroke-width="3"/><path d="M41 52h38l-4 38H45z" fill="' + p[1] + '"/><path d="M62 30l12-14" stroke="' + p[0] + '" stroke-width="4" stroke-linecap="round"/><ellipse cx="60" cy="52" rx="19" ry="4" fill="' + p[2] + '" opacity=".35"/>';
    } else if (r.meal === 'soup') {
      s = steam() + '<path d="M24 56h72c0 22-14 36-36 36S24 78 24 56z" fill="#FFF" stroke="#CFC6AE" stroke-width="3"/><ellipse cx="60" cy="56" rx="36" ry="7" fill="' + p[1] + '"/><circle cx="48" cy="56" r="3" fill="' + p[0] + '"/><circle cx="68" cy="55" r="3" fill="' + p[2] + '"/><circle cx="76" cy="57" r="2.5" fill="' + p[0] + '"/>';
    } else if (r.meal === 'sweet') {
      s = '<path d="M30 62h60c0 18-12 30-30 30S30 80 30 62z" fill="#FFF" stroke="#CFC6AE" stroke-width="3"/><ellipse cx="60" cy="62" rx="30" ry="7" fill="' + p[1] + '"/><circle cx="50" cy="55" r="9" fill="' + p[0] + '"/><circle cx="68" cy="53" r="9" fill="' + p[2] + '"/><circle cx="59" cy="46" r="8" fill="' + p[0] + '"/><circle cx="57" cy="42" r="2" fill="#FFF" opacity=".6"/>';
    } else if (r.meal === 'snack') {
      s = '<ellipse cx="60" cy="76" rx="44" ry="12" fill="#FFF" stroke="#CFC6AE" stroke-width="3"/><path d="M34 70c0-14 16-22 26-22s26 8 26 22z" fill="' + p[0] + '"/><circle cx="44" cy="62" r="7" fill="' + p[1] + '"/><circle cx="66" cy="58" r="8" fill="' + p[2] + '"/><circle cx="80" cy="68" r="6" fill="' + p[1] + '"/><circle cx="54" cy="70" r="6" fill="' + p[0] + '"/>';
    } else if (r.meal === 'break') {
      s = '<ellipse cx="60" cy="72" rx="46" ry="14" fill="#FFF" stroke="#CFC6AE" stroke-width="3"/><circle cx="52" cy="66" r="22" fill="' + p[1] + '"/><circle cx="52" cy="66" r="15" fill="' + p[0] + '" opacity=".35"/><circle cx="74" cy="72" r="13" fill="' + p[2] + '"/><circle cx="74" cy="72" r="6" fill="#FFF" opacity=".5"/>';
    } else {
      s = steam() + '<ellipse cx="60" cy="80" rx="48" ry="14" fill="#FFF" stroke="#CFC6AE" stroke-width="3"/><path d="M26 76c0-24 18-32 34-32s34 8 34 32c0 6-68 6-68 0z" fill="' + p[1] + '"/><circle cx="46" cy="62" r="8" fill="' + p[0] + '"/><circle cx="64" cy="58" r="9" fill="' + p[2] + '"/><circle cx="78" cy="68" r="7" fill="' + p[0] + '"/><circle cx="54" cy="72" r="6" fill="' + p[2] + '"/>';
    }
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="14" fill="' + bg + '"/>' + s + '</svg>';
  }
  root.AashiyanaDish = { svg: svg };
})(typeof self !== 'undefined' ? self : this);
