/* 竹林动效主题
 * © 2026 羽鳞君。保留所有权利。
 * 本主题为「竹林」插件用户专享内容：
 *   · 仅限已安装并使用本插件（bamboo-immortals）的用户在插件内使用；
 *   · 未经作者书面授权，任何人不得复制、转载、再分发、转售，
 *     亦不得在本插件之外以任何形式（含个人学习/自用）使用；
 *   · 违反上述条款将追究法律责任。
 */
// 文件名: 时间的鱼.js  →  变量名: __bamboo_theme_时间的鱼
const theme = {
  name: '时间的鱼',
  author: '羽鳞君',
  license: '竹林用户专享 · 未经授权禁止使用（含个人使用） © 2026 羽鳞君 保留所有权利',
  render() {
    // 结构：bamboo-root > svg
    // viewBox 宽度由 init() 根据容器实际宽度动态计算，内容自动铺满任意宽度
    return '<div class="bamboo-root" style="width:100%;height:300px;overflow:hidden;border-radius:var(--theme-inner-radius,26px);position:relative;background:var(--bbg,#010509)">' +
      '<svg viewBox="0 0 800 560" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" class="bamboo-svg">' +

      // ========== CSS Variables ==========
      // 使用 [data-theme-mode="dark"] 祖先选择器，纯 CSS 切换，无需 JS
      '<style>' +
      '.bamboo-root {' +
        '--bh: var(--accent-hue, 210);' +
        '--alo: var(--accent-lightness-offset, 0%);' +
        '--bbg:       hsl(var(--bh), 22%, calc(96% + var(--alo)));' +
        '--bglowD0:   hsl(calc(var(--bh) + 3), 20%, calc(93% + var(--alo)));' +
        '--bglowD1:   hsl(calc(var(--bh) + 5), 18%, calc(95% + var(--alo)));' +
        '--bglowM0:   hsl(calc(var(--bh) + 2), 25%, calc(91% + var(--alo)));' +
        '--bglowM1:   hsl(calc(var(--bh) + 0), 20%, calc(94% + var(--alo)));' +
        '--bglowM20:  hsl(calc(var(--bh) + 2), 22%, calc(92% + var(--alo)));' +
        '--bglowM21:  hsl(calc(var(--bh) + 0), 18%, calc(95% + var(--alo)));' +
        '--bglowN0:   hsl(calc(var(--bh) + 0), 28%, calc(89% + var(--alo)));' +
        '--bglowN1:   hsl(calc(var(--bh) - 2), 20%, calc(93% + var(--alo)));' +
        '--bpillar:   hsl(var(--bh), 18%, calc(88% + var(--alo)));' +
        '--bstreak1:  hsl(calc(var(--bh) + 10), 35%, calc(70% + var(--alo)));' +
        '--bstreak2:  hsl(calc(var(--bh) + 15), 38%, calc(62% + var(--alo)));' +
        '--bstreak3:  hsl(calc(var(--bh) + 20), 40%, calc(55% + var(--alo)));' +
        '--bstreakG:  hsl(calc(var(--bh) + 15), 38%, calc(60% + var(--alo)));' +
        '--bstreakGV: hsl(calc(var(--bh) + 12), 32%, calc(65% + var(--alo)));' +
        '--bbokeh:    hsl(calc(var(--bh) + 20), 30%, calc(72% + var(--alo)));' +
        '--bparticle: hsl(calc(var(--bh) + 25), 40%, calc(60% + var(--alo)));' +
        '--bclock1:   hsl(calc(var(--bh) + 15), 25%, calc(85% + var(--alo)));' +
        '--bclock2:   hsl(calc(var(--bh) + 12), 20%, calc(90% + var(--alo)));' +
        '--bctick:    hsl(calc(var(--bh) + 18), 30%, calc(65% + var(--alo)));' +
        '--bhand:     hsl(calc(var(--bh) + 22), 35%, calc(50% + var(--alo)));' +
        '--bhand2:    hsl(calc(var(--bh) + 25), 40%, calc(45% + var(--alo)));' +
        '--bfishA:    hsl(calc(var(--bh) + 18), 45%, calc(55% + var(--alo)));' +
        '--bfishAb:   hsl(calc(var(--bh) + 25), 50%, calc(50% + var(--alo)));' +
        '--bfishB:    hsl(calc(var(--bh) + 12), 40%, calc(60% + var(--alo)));' +
        '--bfishBb:   hsl(calc(var(--bh) + 18), 45%, calc(55% + var(--alo)));' +
        '--bmoon0:    hsl(calc(var(--bh) + 22), 30%, calc(75% + var(--alo)));' +
        '--bmoon1:    hsl(calc(var(--bh) + 18), 25%, calc(82% + var(--alo)));' +
        '--bmoon2:    hsl(calc(var(--bh) + 15), 20%, calc(88% + var(--alo)));' +
        '--bmoon3:    hsl(calc(var(--bh) + 8), 18%, calc(92% + var(--alo)));' +
        '--bflash:    hsl(calc(var(--bh) + 25), 50%, calc(70% + var(--alo)));' +
      '}' +
      '[data-theme-mode="dark"] .bamboo-root {' +
        '--bbg:       hsl(var(--bh), 25%, calc(0.9% + var(--alo)));' +
        '--bglowD0:   hsl(calc(var(--bh) + 3), 25%, calc(4.5% + var(--alo)));' +
        '--bglowD1:   hsl(calc(var(--bh) + 5), 25%, calc(2.8% + var(--alo)));' +
        '--bglowM0:   hsl(calc(var(--bh) + 2), 25%, calc(7.5% + var(--alo)));' +
        '--bglowM1:   hsl(calc(var(--bh) + 0), 25%, calc(3.8% + var(--alo)));' +
        '--bglowM20:  hsl(calc(var(--bh) + 2), 25%, calc(5.8% + var(--alo)));' +
        '--bglowM21:  hsl(calc(var(--bh) + 0), 25%, calc(2.6% + var(--alo)));' +
        '--bglowN0:   hsl(calc(var(--bh) + 0), 25%, calc(10.5% + var(--alo)));' +
        '--bglowN1:   hsl(calc(var(--bh) - 2), 25%, calc(5.5% + var(--alo)));' +
        '--bpillar:   hsl(var(--bh), 25%, calc(3.5% + var(--alo)));' +
        '--bstreak1:  hsl(calc(var(--bh) + 10), 25%, calc(11% + var(--alo)));' +
        '--bstreak2:  hsl(calc(var(--bh) + 15), 25%, calc(16% + var(--alo)));' +
        '--bstreak3:  hsl(calc(var(--bh) + 20), 25%, calc(20% + var(--alo)));' +
        '--bstreakG:  hsl(calc(var(--bh) + 15), 25%, calc(22% + var(--alo)));' +
        '--bstreakGV: hsl(calc(var(--bh) + 12), 25%, calc(14% + var(--alo)));' +
        '--bbokeh:    hsl(calc(var(--bh) + 20), 25%, calc(28% + var(--alo)));' +
        '--bparticle: hsl(calc(var(--bh) + 25), 25%, calc(65% + var(--alo)));' +
        '--bclock1:   hsl(calc(var(--bh) + 15), 25%, calc(20% + var(--alo)));' +
        '--bclock2:   hsl(calc(var(--bh) + 12), 25%, calc(14% + var(--alo)));' +
        '--bctick:    hsl(calc(var(--bh) + 18), 25%, calc(32% + var(--alo)));' +
        '--bhand:     hsl(calc(var(--bh) + 22), 25%, calc(52% + var(--alo)));' +
        '--bhand2:    hsl(calc(var(--bh) + 25), 25%, calc(72% + var(--alo)));' +
        '--bfishA:    hsl(calc(var(--bh) + 18), 25%, calc(42% + var(--alo)));' +
        '--bfishAb:   hsl(calc(var(--bh) + 25), 25%, calc(58% + var(--alo)));' +
        '--bfishB:    hsl(calc(var(--bh) + 12), 25%, calc(34% + var(--alo)));' +
        '--bfishBb:   hsl(calc(var(--bh) + 18), 25%, calc(48% + var(--alo)));' +
        '--bmoon0:    hsl(calc(var(--bh) + 22), 25%, calc(72% + var(--alo)));' +
        '--bmoon1:    hsl(calc(var(--bh) + 18), 25%, calc(50% + var(--alo)));' +
        '--bmoon2:    hsl(calc(var(--bh) + 15), 25%, calc(32% + var(--alo)));' +
        '--bmoon3:    hsl(calc(var(--bh) + 8), 25%, calc(18% + var(--alo)));' +
        '--bflash:    hsl(calc(var(--bh) + 25), 25%, calc(88% + var(--alo)));' +
      '}' +
      '</style>' +

      // ========== SVG Defs ==========
      '<defs>' +
        // Filters (unchanged — blur values are theme-independent)
        '<filter id="blurEdge" x="-60%" y="-60%" width="220%" height="220%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="2" result="s"/>' +
          '<feComposite in="SourceGraphic" in2="s" operator="over"/>' +
        '</filter>' +
        '<filter id="blurEdge2" x="-60%" y="-60%" width="220%" height="220%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="s"/>' +
          '<feComposite in="SourceGraphic" in2="s" operator="over"/>' +
        '</filter>' +
        '<filter id="blurEdge3" x="-60%" y="-60%" width="220%" height="220%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="5" result="s"/>' +
          '<feComposite in="SourceGraphic" in2="s" operator="over"/>' +
        '</filter>' +
        '<filter id="blurEdge4" x="-80%" y="-80%" width="260%" height="260%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="7" result="s"/>' +
          '<feComposite in="SourceGraphic" in2="s" operator="over"/>' +
        '</filter>' +
        '<filter id="fogOnly" x="-80%" y="-80%" width="260%" height="260%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="14"/>' +
        '</filter>' +
        '<filter id="birdGlow" x="-50%" y="-50%" width="200%" height="200%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="s"/>' +
          '<feComposite in="SourceGraphic" in2="s" operator="over"/>' +
        '</filter>' +
        '<filter id="birdGlowMid" x="-60%" y="-60%" width="220%" height="220%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="s"/>' +
          '<feComposite in="SourceGraphic" in2="s" operator="over"/>' +
        '</filter>' +
        '<filter id="birdGlowFar" x="-60%" y="-60%" width="220%" height="220%">' +
          '<feGaussianBlur in="SourceGraphic" stdDeviation="4.8" result="s"/>' +
          '<feComposite in="SourceGraphic" in2="s" operator="over"/>' +
        '</filter>' +

        // Theme-aware gradients
        '<radialGradient id="moonGrad" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="var(--bmoon0)" stop-opacity="0.22"/>' +
          '<stop offset="35%" stop-color="var(--bmoon1)" stop-opacity="0.12"/>' +
          '<stop offset="70%" stop-color="var(--bmoon2)" stop-opacity="0.03"/>' +
          '<stop offset="100%" stop-color="var(--bmoon3)" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="deepGlow" cx="48%" cy="44%">' +
          '<stop offset="0%" stop-color="var(--bglowD0)" stop-opacity="0.7"/>' +
          '<stop offset="55%" stop-color="var(--bglowD1)" stop-opacity="0.35"/>' +
          '<stop offset="100%" stop-color="var(--bbg)" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="midGlow" cx="55%" cy="38%">' +
          '<stop offset="0%" stop-color="var(--bglowM0)" stop-opacity="0.4"/>' +
          '<stop offset="45%" stop-color="var(--bglowM1)" stop-opacity="0.18"/>' +
          '<stop offset="100%" stop-color="var(--bbg)" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="midGlow2" cx="42%" cy="55%">' +
          '<stop offset="0%" stop-color="var(--bglowM20)" stop-opacity="0.3"/>' +
          '<stop offset="50%" stop-color="var(--bglowM21)" stop-opacity="0.12"/>' +
          '<stop offset="100%" stop-color="var(--bbg)" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="nearGlow" cx="50%" cy="45%">' +
          '<stop offset="0%" stop-color="var(--bglowN0)" stop-opacity="0.25"/>' +
          '<stop offset="40%" stop-color="var(--bglowN1)" stop-opacity="0.1"/>' +
          '<stop offset="100%" stop-color="var(--bbg)" stop-opacity="0"/>' +
        '</radialGradient>' +

        '<linearGradient id="streakGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
          '<stop offset="0%" stop-color="var(--bstreakG)" stop-opacity="0"/>' +
          '<stop offset="50%" stop-color="var(--bstreakG)" stop-opacity="0.6"/>' +
          '<stop offset="100%" stop-color="var(--bstreakG)" stop-opacity="0"/>' +
        '</linearGradient>' +
        '<linearGradient id="streakGradV" x1="0%" y1="0%" x2="0%" y2="100%">' +
          '<stop offset="0%" stop-color="var(--bstreakGV)" stop-opacity="0"/>' +
          '<stop offset="50%" stop-color="var(--bstreakGV)" stop-opacity="0.45"/>' +
          '<stop offset="100%" stop-color="var(--bstreakGV)" stop-opacity="0"/>' +
        '</linearGradient>' +

        // Clock faces
        '<g id="clockFace18">' +
          '<circle r="18" fill="none" stroke="var(--bclock1)" stroke-width="1.0" opacity="0.75"/>' +
          '<circle r="16.5" fill="none" stroke="var(--bclock2)" stroke-width="0.5" opacity="0.45"/>' +
          '<circle r="2.0" fill="var(--bctick)" opacity="0.95"/>' +
          '<g opacity="0.5" stroke="var(--bctick)" stroke-width="0.7" stroke-linecap="round">' +
            '<line x1="0" y1="-15" x2="0" y2="-12.5"/><line x1="7.5" y1="-13" x2="6.25" y2="-10.8"/>' +
            '<line x1="13" y1="-7.5" x2="10.8" y2="-6.25"/><line x1="15" y1="0" x2="12.5" y2="0"/>' +
            '<line x1="13" y1="7.5" x2="10.8" y2="6.25"/><line x1="7.5" y1="13" x2="6.25" y2="10.8"/>' +
            '<line x1="0" y1="15" x2="0" y2="12.5"/><line x1="-7.5" y1="13" x2="-6.25" y2="10.8"/>' +
            '<line x1="-13" y1="7.5" x2="-10.8" y2="6.25"/><line x1="-15" y1="0" x2="-12.5" y2="0"/>' +
            '<line x1="-13" y1="-7.5" x2="-10.8" y2="-6.25"/><line x1="-7.5" y1="-13" x2="-6.25" y2="-10.8"/>' +
          '</g>' +
        '</g>' +
        '<g id="clockFace12">' +
          '<circle r="12" fill="none" stroke="var(--bclock1)" stroke-width="0.8" opacity="0.65"/>' +
          '<circle r="11" fill="none" stroke="var(--bclock2)" stroke-width="0.4" opacity="0.4"/>' +
          '<circle r="1.5" fill="var(--bctick)" opacity="0.9"/>' +
          '<g opacity="0.45" stroke="var(--bctick)" stroke-width="0.6" stroke-linecap="round">' +
            '<line x1="0" y1="-10" x2="0" y2="-8.5"/><line x1="5" y1="-8.7" x2="4.2" y2="-7.4"/>' +
            '<line x1="8.7" y1="-5" x2="7.4" y2="-4.2"/><line x1="10" y1="0" x2="8.5" y2="0"/>' +
            '<line x1="8.7" y1="5" x2="7.4" y2="4.2"/><line x1="5" y1="8.7" x2="4.2" y2="7.4"/>' +
            '<line x1="0" y1="10" x2="0" y2="8.5"/><line x1="-5" y1="8.7" x2="-4.2" y2="7.4"/>' +
            '<line x1="-8.7" y1="5" x2="-7.4" y2="4.2"/><line x1="-10" y1="0" x2="-8.5" y2="0"/>' +
            '<line x1="-8.7" y1="-5" x2="-7.4" y2="-4.2"/><line x1="-5" y1="-8.7" x2="-4.2" y2="-7.4"/>' +
          '</g>' +
        '</g>' +
        '<g id="clockHands18">' +
          '<line x1="0" y1="0" x2="0" y2="-11" stroke="var(--bhand)" stroke-width="1.5" stroke-linecap="round" opacity="0.85"/>' +
          '<line x1="0" y1="0" x2="7" y2="-3" stroke="var(--bhand2)" stroke-width="1.0" stroke-linecap="round" opacity="0.7"/>' +
          '<circle cx="0" cy="-11" r="1.2" fill="var(--bhand2)" opacity="0.6"/>' +
        '</g>' +
        '<g id="clockHands12">' +
          '<line x1="0" y1="0" x2="0" y2="-7" stroke="var(--bhand)" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>' +
          '<line x1="0" y1="0" x2="5" y2="-2" stroke="var(--bhand2)" stroke-width="0.9" stroke-linecap="round" opacity="0.65"/>' +
        '</g>' +

        // Fish
        '<g id="birdA">' +
          '<ellipse cx="-2" cy="0" rx="11" ry="4.5" fill="var(--bfishA)" opacity="0.8"/>' +
          '<ellipse cx="-3" cy="1" rx="7" ry="2.2" fill="var(--bfishAb)" opacity="0.35"/>' +
          '<path d="M9,-0.8 Q14,-5 16,-3.5 Q12,-1 9,0.8 Q12,1 16,3.5 Q14,5 9,0.8Z" fill="var(--bfishA)" opacity="0.7"/>' +
        '</g>' +
        '<g id="birdB">' +
          '<ellipse cx="-1.5" cy="0" rx="8" ry="3.2" fill="var(--bfishB)" opacity="0.7"/>' +
          '<ellipse cx="-2" cy="0.8" rx="5" ry="1.6" fill="var(--bfishBb)" opacity="0.3"/>' +
          '<path d="M6.5,-0.6 Q10,-3.5 12,-2.5 Q8.5,-0.5 6.5,0.6 Q8.5,0.5 12,2.5 Q10,3.5 6.5,0.6Z" fill="var(--bfishB)" opacity="0.6"/>' +
        '</g>' +
      '</defs>' +

      // ====== BACKGROUND ======
      '<rect width="800" height="560" fill="var(--bbg)"/>' +

      // ====== GLOW OVERLAYS ======
      '<rect width="800" height="560" fill="url(#deepGlow)" id="deepGlowRect"/>' +
      '<rect width="800" height="560" fill="url(#midGlow)" id="midGlowRect"/>' +
      '<rect width="800" height="560" fill="url(#midGlow2)" id="midGlow2Rect"/>' +
      '<rect width="800" height="560" fill="url(#nearGlow)" id="nearGlowRect"/>' +

      // ====== LAYERS ======
      '<g id="pillarLayer1" filter="url(#fogOnly)"/>' +
      '<g id="streakLayer0" filter="url(#blurEdge4)"/>' +
      '<g id="bokehLayer1" filter="url(#blurEdge3)"/>' +
      '<g id="streakLayer1" filter="url(#blurEdge3)"/>' +
      '<g id="bokehLayer2" filter="url(#blurEdge2)"/>' +
      '<g id="streakLayer2" filter="url(#blurEdge)"/>' +
      '<g id="clocksLayer" filter="url(#blurEdge)"/>' +
      '<g id="particlesLayer" filter="url(#blurEdge)"/>' +
      '<g id="birdsFarLayer" filter="url(#birdGlowFar)"/>' +
      '<g id="birdsMidLayer" filter="url(#birdGlowMid)"/>' +
      '<g id="birdsNearLayer" filter="url(#birdGlow)"/>' +

      // ====== MOON DRIFT ======
      '<circle id="moonSpot" cx="400" cy="280" r="100" fill="url(#moonGrad)" opacity="0.8"/>' +
      '</svg></div>';
  },

  init: function() {
    var self = this;
    this._timers = [];
    var root = document.querySelector('.bamboo-root');
    if (!root) return;

    // ========== 动态 viewBox：让内容铺满任意宽度 ==========
    // 容器高度固定 300px，viewBox 高度固定 560
    // viewBox 宽度 = 560 * (容器宽度 / 300)，让 viewBox 宽高比 = 容器宽高比
    var svgEl = root.querySelector('.bamboo-svg');
    var BASE_H = 560;
    var w = root.offsetWidth || 800;
    var vbW = Math.max(400, Math.round(BASE_H * w / 300));  // 最小 400，防止过窄
    if (svgEl) svgEl.setAttribute('viewBox', '0 0 ' + vbW + ' ' + BASE_H);
    var W = vbW, H = BASE_H;  // 所有坐标基于动态 W，自动适配宽度
    // ==============================================================

    // Load GSAP if not present
    function loadGSAP(cb) {
      if (typeof gsap !== 'undefined') return cb();
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      s.onload = cb;
      document.head.appendChild(s);
    }

    // Track animation state for destroy()
    self._tweens = [];
    self._tickerId = null;
    self._running = true;

    function addTween(t) { self._tweens.push(t); return t; }

    loadGSAP(function() {
      if (!self._running) return;

      var NS = 'http://www.w3.org/2000/svg';
      var moonCx = W / 2;

      function el(tag) { return document.createElementNS(NS, tag); }
      function att(e, a) { for (var k in a) e.setAttribute(k, a[k]); return e; }
      var $ = function(id) { return document.getElementById(id); };

      // ---- Pillars ----
      // pillarData 的 x 坐标随 W 动态分布，始终铺满画面
      var pillarCount = 7;
      var pillarData = [];
      for (var pi = 0; pi < pillarCount; pi++) {
        var px = Math.round(W * (pi + 0.5) / pillarCount);
        var pw = 14 + Math.round(Math.random() * 8);
        var ph = 190 + Math.round(Math.random() * 110);
        pillarData.push({x: px, w: pw, h: ph});
      }
      var pillarXs = pillarData.map(function(d){return d.x;});
      var pillarEls = [];
      var pillarG = $('pillarLayer1');
      pillarData.forEach(function(d){
        var r = att(el('rect'), {
          x:d.x-d.w/2, y:H-d.h, width:d.w, height:d.h,
          fill:'var(--bpillar)', opacity:'0.2'
        });
        pillarG.appendChild(r); pillarEls.push(r);
        addTween(gsap.to(r, {
          opacity: 0.08 + Math.random()*0.18,
          duration: 4 + Math.random()*4, repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: Math.random()*-6
        }));
        addTween(gsap.to(r, {
          x: '+=' + ((Math.random()-0.5)*30).toFixed(1),
          duration: 20 + Math.random()*15, repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: Math.random()*-20,
          onUpdate: function(){
            var idx = pillarEls.indexOf(this.targets()[0]);
            if (idx >= 0) {
              pillarXs[idx] = pillarData[idx].x + gsap.getProperty(this.targets()[0], 'x');
            }
          }
        }));
      });

      // ---- Streaks ----
      function makeStreak(layerId, count, maxLen, maxW, colorVar, oMin, oMax, durMin, durMax){
        var g = $(layerId);
        for (var i=0;i<count;i++){
          var x1 = Math.random()*W, y1 = Math.random()*H;
          var ang = Math.random()*Math.PI*2;
          var len = 40 + Math.random()*maxLen;
          var x2 = x1 + Math.cos(ang)*len, y2 = y1 + Math.sin(ang)*len;
          var w = 0.4 + Math.random()*maxW;
          var l = att(el('line'), {
            x1:x1, y1:y1, x2:x2, y2:y2,
            style:'stroke:'+colorVar,
            'stroke-width':w, 'stroke-linecap':'round',
            opacity: oMin + Math.random()*(oMax-oMin)
          });
          g.appendChild(l);
          addTween(gsap.to(l, {
            opacity: oMin*0.5 + Math.random()*(oMax*0.5),
            duration: durMin + Math.random()*durMax, repeat: -1, yoyo: true, ease: 'sine.inOut',
            delay: Math.random()*-8
          }));
        }
      }
      // Must pass CSS variable references as full var() expressions
      makeStreak('streakLayer0', 14, 220, 1.2, 'var(--bstreak1)', 0.06, 0.18, 5, 6);
      makeStreak('streakLayer1', 18, 180, 0.9, 'var(--bstreak2)', 0.08, 0.22, 4, 5);
      makeStreak('streakLayer2', 12, 140, 0.7, 'var(--bstreak3)', 0.1, 0.28, 3, 4);

      // ---- Bokeh ----
      function makeBokeh(layerId, count, rMin, rMax, oMin, oMax, durMin, durMax){
        var g = $(layerId);
        for (var i=0;i<count;i++){
          var cx = Math.random()*W, cy = Math.random()*H;
          var r = rMin + Math.random()*(rMax-rMin);
          var c = att(el('circle'), {
            cx:cx, cy:cy, r:r,
            style:'fill:var(--bbokeh)',
            opacity: oMin + Math.random()*(oMax-oMin)
          });
          g.appendChild(c);
          addTween(gsap.to(c, {
            opacity: oMin*0.4, duration: durMin + Math.random()*durMax,
            repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random()*-6
          }));
          addTween(gsap.to(c, {
            cx: cx + (Math.random()-0.5)*10, cy: cy + (Math.random()-0.5)*8,
            duration: 6 + Math.random()*8, repeat: -1, yoyo: true, ease: 'sine.inOut',
            delay: Math.random()*-10
          }));
        }
      }
      makeBokeh('bokehLayer1', 22, 1.5, 4, 0.08, 0.2, 6, 7);
      makeBokeh('bokehLayer2', 16, 2, 5.5, 0.1, 0.25, 5, 6);

      // ---- Particles ----
      var pg = $('particlesLayer');
      for (var i=0;i<30;i++){
        var px = Math.random()*W, py = Math.random()*H;
        var pr = 0.5 + Math.random()*2;
        var p = att(el('circle'), {
          cx:px, cy:py, r:pr,
          style:'fill:var(--bparticle)',
          opacity:0.1+Math.random()*0.4
        });
        pg.appendChild(p);
        addTween(gsap.to(p, {
          opacity: 0.05+Math.random()*0.15, duration: 2+Math.random()*4,
          repeat: -1, yoyo: true, ease: 'sine.inOut', delay: Math.random()*-4
        }));
        addTween(gsap.to(p, {
          cx: px+(Math.random()-0.5)*14, cy: py+(Math.random()-0.5)*10,
          duration: 5+Math.random()*7, repeat: -1, yoyo: true, ease: 'sine.inOut',
          delay: Math.random()*-8
        }));
      }

      // ---- Clocks ----
      (function(){
        var clockG = $('clocksLayer');
        var NUM = 18;
        window._clockRefs = [];
        var cols = 6, rows = 3;
        var cellW = W/cols, cellH = H/rows;
        var minGap = 38;
        var cells = [];
        for (var r=0; r<rows; r++)
          for (var c=0; c<cols; c++)
            cells.push({x0:c*cellW+18, y0:r*cellH+18, x1:(c+1)*cellW-18, y1:(r+1)*cellH-18});
        for (var i=cells.length-1; i>0; i--){
          var j=Math.floor(Math.random()*(i+1));
          var t=cells[i]; cells[i]=cells[j]; cells[j]=t;
        }
        function collides(cx,cy,cr,ex){
          for (var p=0;p<ex.length;p++){
            var dx=cx-ex[p].cx, dy=cy-ex[p].cy;
            if (dx*dx+dy*dy < (cr+ex[p].cr+minGap)*(cr+ex[p].cr+minGap)) return true;
          }
          return false;
        }
        var placed = [];
        cells.forEach(function(cell){
          var scale=0.75+Math.random()*2.05;
          var faceRadius=scale>1.2?20:14, cr=scale*faceRadius;
          var bestCx,bestCy,ok=false;
          for (var a=0;a<60;a++){
            var cx=cell.x0+Math.random()*(cell.x1-cell.x0), cy=cell.y0+Math.random()*(cell.y1-cell.y0);
            if(!collides(cx,cy,cr,placed)){bestCx=cx;bestCy=cy;ok=true;break;}
          }
          if(!ok){bestCx=(cell.x0+cell.x1)/2+(Math.random()-0.5)*10;bestCy=(cell.y0+cell.y1)/2+(Math.random()-0.5)*10;}
          placed.push({cx:bestCx,cy:bestCy,cr:cr,scale:scale,useLarge:scale>1.2});
        });
        // Relaxation — more iterations for better spacing
        var margin=28;
        for (var iter=0;iter<16;iter++){
          for (var i=0;i<NUM;i++){
            var fx=0,fy=0;
            for (var k=0;k<NUM;k++){
              if (i===k) continue;
              var dx=placed[i].cx-placed[k].cx, dy=placed[i].cy-placed[k].cy;
              var dist=Math.sqrt(dx*dx+dy*dy);
              var md=placed[i].cr+placed[k].cr+minGap+2;
              if (dist<md && dist>0.01){var f=(md-dist)/dist*0.5;fx+=dx*f;fy+=dy*f;}
            }
            placed[i].cx=Math.max(margin,Math.min(W-margin,placed[i].cx+fx));
            placed[i].cy=Math.max(margin,Math.min(H-margin,placed[i].cy+fy));
          }
        }
        placed.forEach(function(cfg){
          var faceHref=cfg.useLarge?'#clockFace18':'#clockFace12';
          var handsGid=cfg.useLarge?'clockHands18':'clockHands12';
          var wrapper=el('g');
          wrapper.setAttribute('transform','translate('+cfg.cx.toFixed(1)+','+cfg.cy.toFixed(1)+') scale('+cfg.scale.toFixed(2)+')');
          var face=el('use'); face.setAttribute('href',faceHref); wrapper.appendChild(face);
          var pivot=el('g');
          var hands=el('use'); hands.setAttribute('href','#'+handsGid); pivot.appendChild(hands);
          wrapper.appendChild(pivot);
          clockG.appendChild(wrapper);
          var rotTween=addTween(gsap.to(pivot,{
            rotation:'-=360', duration:6+Math.random()*14, repeat:-1, ease:'none',
            delay:Math.random()*-18, svgOrigin:'0 0'
          }));
          window._clockRefs.push({
            wrapper:wrapper,pivot:pivot,rotTween:rotTween,
            baseCx:cfg.cx,baseCy:cfg.cy,baseDuration:rotTween.duration()
          });
          addTween(gsap.to(hands,{
            opacity:0.12+Math.random()*0.25, duration:1.5+Math.random()*3.5,
            repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*-5
          }));
          addTween(gsap.to(wrapper,{
            x:'+='+((Math.random()-0.5)*16).toFixed(1), y:'+='+((Math.random()-0.5)*12).toFixed(1),
            duration:7+Math.random()*10, repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*-12
          }));
        });
      })();

      // ---- Dream Reversal (#1) ----
      (function(){
        window._reversing=false;
        function reversal(){
          if (window._reversing || gsap.globalTimeline.paused()) return;
          window._reversing=true;
          gsap.globalTimeline.timeScale(-1);
          self._timers.push(setTimeout(function(){if(!self._running)return;gsap.globalTimeline.timeScale(1);window._reversing=false;},3000));
        }
        function schedule(){ var id=setTimeout(function(){if(!self._running)return;reversal();schedule();},(8+Math.random()*7)*1000); self._timers.push(id); }
        schedule();
      })();

      // ---- Fish layers ----
      (function(){
        function makeBirdLayer(layerId, count, scaleMin, scaleMax, opMin, opMax, speedMin, speedMax, bobAmp, startXRange){
          var layer=$(layerId);
          var placed=[], cellH=(H-80)/count, gap=12;
          function fishW(s){return 30*s;}
          function fishH(s){return 9*s;}
          for (var i=0;i<count;i++){
            var useA=Math.random()>0.5;
            var scale=scaleMin+Math.random()*(scaleMax-scaleMin);
            var fw=fishW(scale),fh=fishH(scale);
            var stripY0=40+i*cellH, stripY1=40+(i+1)*cellH;
            var sx,sy,ok;
            for (var a=0;a<35;a++){
              sx=-startXRange+Math.random()*startXRange*1.5;
              sy=stripY0+Math.random()*cellH; ok=true;
              for (var p=0;p<placed.length;p++){
                if (Math.abs(sx-placed[p].x)<(fw+placed[p].w)/2+gap && Math.abs(sy-placed[p].y)<(fh+placed[p].h)/2+gap)
                {ok=false;break;}
              }
              if (ok) break;
            }
            if (!ok){sx=-startXRange+Math.random()*startXRange*1.5;sy=(stripY0+stripY1)/2;}
            placed.push({x:sx,y:sy,w:fw,h:fh});
            var baseOp=opMin+Math.random()*(opMax-opMin);
            var wrapper=el('g');
            wrapper.setAttribute('transform','translate('+sx.toFixed(1)+','+sy.toFixed(1)+') scale('+scale.toFixed(2)+')');
            wrapper.style.opacity=baseOp.toFixed(2);
            wrapper.innerHTML=useA?'<use href="#birdA"/>':'<use href="#birdB"/>';
            layer.appendChild(wrapper);
            (function(b, i){
              addTween(gsap.to(b.el,{
                x:W+60+Math.random()*80,
                duration:speedMin+Math.random()*(speedMax-speedMin),
                repeat:-1,ease:'none',
                delay:i*(-(speedMin+speedMax)/2/count),
                onRepeat:function(){
                  gsap.set(this.targets()[0],{x:-60-Math.random()*startXRange,y:40+Math.random()*(H-80)});
                },
                onUpdate:function(){
                  var fishX=gsap.getProperty(this.targets()[0],'x');
                  var fishY=gsap.getProperty(this.targets()[0],'y');
                  var brighten=1;
                  for (var p=0;p<pillarXs.length;p++){
                    var dist=Math.abs(fishX-pillarXs[p]);
                    if (dist<50) brighten=Math.max(brighten,1+(1-dist/50)*0.8);
                  }
                  this.targets()[0].style.opacity=(b.baseOp*brighten).toFixed(3);
                  if (b.scale>0.7 && window._clockRefs){
                    for (var c=0;c<window._clockRefs.length;c++){
                      var cr=window._clockRefs[c];
                      var cwX=gsap.getProperty(cr.wrapper,'x')+cr.baseCx;
                      var cwY=gsap.getProperty(cr.wrapper,'y')+cr.baseCy;
                      var d=Math.sqrt((fishX-cwX)*(fishX-cwX)+(fishY-cwY)*(fishY-cwY));
                      cr.rotTween.timeScale(d<80?1+(1-d/80)*3:1);
                    }
                  }
                }
              }));
              addTween(gsap.to(b.el,{
                y:'+='+((Math.random()-0.5)*bobAmp).toFixed(1),
                duration:2+Math.random()*3,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*-3
              }));
              addTween(gsap.to(b.el,{
                rotation:'+='+((Math.random()-0.5)*8).toFixed(1),
                duration:1.8+Math.random()*3,repeat:-1,yoyo:true,ease:'sine.inOut',delay:Math.random()*-3
              }));
            })({el:wrapper,scale:scale,baseOp:baseOp});
          }
        }
        makeBirdLayer('birdsFarLayer',12,0.25,0.55,0.18,0.35,18,26,16,60);
        makeBirdLayer('birdsMidLayer',14,0.5,1.0,0.35,0.6,13,20,22,80);
        makeBirdLayer('birdsNearLayer',14,1.2,2.5,0.55,0.9,9,14,30,100);

        // ---- Lone fish + Quantum Split (#7) — ticker-driven ----
        var nearG=$('birdsNearLayer');
        var lone=el('g'), loneScale=1.8;
        lone.setAttribute('transform','translate('+(W+80)+',280) scale('+(-loneScale).toFixed(2)+','+loneScale.toFixed(2)+')');
        lone.style.opacity='0';
        lone.innerHTML='<use href="#birdA"/>';
        nearG.appendChild(lone);
        window._loneSplitGuard=false;
        var loneSwimState=null, cloneList=[];
        var tickLast=performance.now();

        function newLoneSwim(){
          var bobAmp=4+Math.random()*8, bobV=1.8+Math.random()*3.5;
          var swayAmp=2+Math.random()*4, swayV=2.2+Math.random()*3.8;
          var dur=10+Math.random()*8, dist=W+160+Math.random()*200;
          loneSwimState={
            x:W-10+Math.random()*40,y:280,
            speed:-dist/(dur*1000),
            bobP:Math.random()*Math.PI*2,swayP:Math.random()*Math.PI*2,
            bobA:bobAmp,bobV:bobV,swayA:swayAmp,swayV:swayV
          };
          lone.style.opacity='0.8';
        }

        function applyLoneTransform(s){
          var sway=Math.sin(s.swayP)*s.swayA;
          lone.setAttribute('transform',
            'translate('+s.x.toFixed(1)+','+s.y.toFixed(1)+') '+
            'scale('+(-loneScale).toFixed(2)+','+loneScale.toFixed(2)+') '+
            'rotate('+sway.toFixed(2)+')'
          );
        }

        function triggerSplit(splitX){
          if (window._loneSplitGuard) return;
          window._loneSplitGuard=true;
          loneSwimState=null; lone.style.opacity='0';
          var splitY=280, now=performance.now();
          var jitMs=1800, flyMs=2800+Math.random()*1800;
          var ca=el('g');
          ca.setAttribute('transform','translate('+splitX.toFixed(1)+','+splitY+') scale('+(-loneScale).toFixed(2)+','+loneScale.toFixed(2)+')');
          ca.style.opacity='0.8'; ca.innerHTML='<use href="#birdA"/>'; nearG.appendChild(ca);
          var cb=el('g');
          cb.setAttribute('transform','translate('+splitX.toFixed(1)+','+splitY+') scale('+loneScale.toFixed(2)+','+loneScale.toFixed(2)+')');
          cb.style.opacity='0.8'; cb.innerHTML='<use href="#birdA"/>'; nearG.appendChild(cb);
          var fl=att(el('circle'),{cx:splitX,cy:splitY,r:2,style:'fill:var(--bflash)',opacity:0.95});
          nearG.appendChild(fl);
          cloneList.push(
            {el:ca,type:'clone',startX:splitX,y:splitY,sx:-loneScale,sy:loneScale,targetX:W+140,born:now,jitMs:jitMs,flyMs:flyMs,jitP:Math.random()*Math.PI*2},
            {el:cb,type:'clone',startX:splitX,y:splitY,sx:loneScale,sy:loneScale,targetX:-140,born:now,jitMs:jitMs,flyMs:flyMs,jitP:Math.random()*Math.PI*2},
            {el:fl,type:'flash',born:now}
          );
          self._timers.push(setTimeout(function(){if(!self._running)return;window._loneSplitGuard=false;newLoneSwim();},(3.5+Math.random()*2)*1000));
        }

        // Ticker — immune to globalTimeline.pause() and timeScale(-1)
        self._tickerId = gsap.ticker.add(function(){
          if (!self._running) return;
          var now=performance.now(), dt=now-tickLast;
          if (dt>150) dt=150; tickLast=now;

          if (loneSwimState){
            var s=loneSwimState;
            s.x+=s.speed*dt; s.bobP+=s.bobV*dt/1000; s.swayP+=s.swayV*dt/1000;
            s.y=280+Math.sin(s.bobP)*s.bobA;
            applyLoneTransform(s);
            // 独鱼跨过画面中心（s.x 到达 W*0.5）时分裂
            if (!window._loneSplitGuard && s.prevX !== undefined) {
              if (s.prevX > W*0.5 && s.x <= W*0.5) triggerSplit(s.x);
            }
            s.prevX = s.x;
            if (s.x<-80){loneSwimState=null;self._timers.push(setTimeout(function(){if(!self._running)return;if(!window._loneSplitGuard)newLoneSwim();},50));}
          }
          for (var i=cloneList.length-1;i>=0;i--){
            var c=cloneList[i], elMs=now-c.born;
            if (c.type==='flash'){
              var fp=Math.min(1,elMs/1000);
              c.el.setAttribute('r',(2+fp*20).toFixed(1)); c.el.setAttribute('opacity',(0.95*(1-fp)).toFixed(3));
              if (fp>=1){c.el.remove();cloneList.splice(i,1);}
            } else {
              var jEl=Math.min(elMs,c.jitMs), fEl=Math.max(0,elMs-c.jitMs);
              var jDecay=1-Math.min(1,jEl/c.jitMs);
              var jitY=Math.sin(c.jitP+elMs*0.008)*4*jDecay;
              var jitR=Math.cos(c.jitP+elMs*0.01)*3*jDecay;
              var cx=c.startX, alpha=0.8;
              if (fEl>0){
                var fp2=Math.min(1,fEl/c.flyMs);
                var ep=1-Math.pow(1-fp2,3);
                cx=c.startX+(c.targetX-c.startX)*ep;
                alpha=0.8*(1-Math.pow(fp2,2.5));
              }
              c.el.setAttribute('transform',
                'translate('+cx.toFixed(1)+','+(c.y+jitY).toFixed(1)+') '+
                'scale('+c.sx.toFixed(2)+','+Math.abs(c.sy).toFixed(2)+') '+
                'rotate('+jitR.toFixed(2)+')'
              );
              c.el.style.opacity=alpha.toFixed(3);
              if (elMs>c.jitMs+c.flyMs){c.el.remove();cloneList.splice(i,1);}
            }
          }
        });
        newLoneSwim();
      })();

      // ---- Time Freeze (#8) ----
      (function(){
        function timeFreeze(){
          if (window._reversing){schedule();return;}
          gsap.globalTimeline.pause();
          self._timers.push(setTimeout(function(){if(!self._running)return;gsap.globalTimeline.resume();schedule();},800+Math.random()*1000));
        }
        function schedule(){var id=setTimeout(function(){if(!self._running)return;timeFreeze();},(14+Math.random()*20)*1000);self._timers.push(id);}
        schedule();
      })();

      // ---- Moon Drift (#9) ----
      (function(){
        var spot=$('moonSpot');
        function drift(){
          addTween(gsap.to(spot,{
            attr:{cx:120+Math.random()*(W-240),cy:80+Math.random()*(H-160)},
            duration:14+Math.random()*12,ease:'sine.inOut',onComplete:drift
          }));
        }
        drift();
        addTween(gsap.to(spot,{opacity:0.55+Math.random()*0.4,duration:8+Math.random()*6,repeat:-1,yoyo:true,ease:'sine.inOut'}));
      })();

      // ---- Background glow pulse ----
      addTween(gsap.to($('deepGlowRect'),{opacity:0.7+Math.random()*0.3,duration:8,repeat:-1,yoyo:true,ease:'sine.inOut'}));
      addTween(gsap.to($('midGlowRect'),{opacity:0.6+Math.random()*0.35,duration:6.5,repeat:-1,yoyo:true,ease:'sine.inOut',delay:-2}));
      addTween(gsap.to($('midGlow2Rect'),{opacity:0.4+Math.random()*0.35,duration:7,repeat:-1,yoyo:true,ease:'sine.inOut',delay:-1}));
      addTween(gsap.to($('nearGlowRect'),{opacity:0.5+Math.random()*0.4,duration:5,repeat:-1,yoyo:true,ease:'sine.inOut',delay:-4}));

    });
  },

  destroy: function() {
    this._running = false;
    // 清理所有 setTimeout 定时器
    if (this._timers) {
      for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]);
      this._timers = [];
    }
    // Kill all GSAP tweens
    if (this._tweens) {
      for (var i = 0; i < this._tweens.length; i++) {
        if (this._tweens[i] && this._tweens[i].kill) this._tweens[i].kill();
      }
      this._tweens = [];
    }
    // Remove ticker
    if (this._tickerId && typeof gsap !== 'undefined') {
      gsap.ticker.remove(this._tickerId);
      this._tickerId = null;
    }
    // Clean up globals
    window._clockRefs = null;
    window._reversing = null;
    window._loneSplitGuard = null;
  }
};

window.__bamboo_theme_时间的鱼 = theme;
