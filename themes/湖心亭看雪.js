/* 竹林动效主题
 * © 2026 羽鳞君。保留所有权利。
 * 本主题为「竹林」插件用户专享内容：
 *   · 仅限已安装并使用本插件（bamboo-immortals）的用户在插件内使用；
 *   · 未经作者书面授权，任何人不得复制、转载、再分发、转售，
 *     亦不得在本插件之外以任何形式（含个人学习/自用）使用；
 *   · 违反上述条款将追究法律责任。
 */
// 文件名: 湖心亭看雪.js  →  变量名: __bamboo_theme_湖心亭看雪
// 主题: 湖心亭看雪 —— 张岱《陶庵梦忆》
// 雾凇沆砀，天与云与山与水，上下一白。
// 湖上影子，惟长堤一痕、湖心亭一点、与余舟一芥、舟中人两三粒而已。
//
// 设计画布：正方形 480×480（1:1），内部按 960×960 viewBox 绘制，缩放比 0.5。
// 全程纯 CSS 动画（不依赖 GSAP），无定时器，destroy 无需额外清理。
var theme = {
  name: '湖心亭看雪',
  author: '羽鳞君',
  license: '竹林用户专享 · 未经授权禁止使用（含个人使用） © 2026 羽鳞君 保留所有权利',
  design: { w: 480, h: 480 },

  render: function () {
    // ── 飘雪：细、疏、慢（"人鸟声俱绝"的静，故全篇无鸟）──
    // 三条下落曲线按索引轮换，避免所有雪花同轨迹；x 用黄金比低差异序列铺开，疏而不匀
    var flakes = '';
    var GOLDEN = 0.6180339887;
    for (var i = 0; i < 44; i++) {
      var fx = (((i * GOLDEN) % 1) * 930) + 15;
      var fr = 1.0 + (i % 5) * 0.42;
      var fdur = 15 + (i % 7) * 3.2;
      var fdelay = -((i * 2.7) % fdur);
      var variant = i % 3;
      flakes += '<g class="lxt-flake lxt-fall-' + variant + '" style="animation-duration:' +
        fdur.toFixed(1) + 's;animation-delay:' + fdelay.toFixed(1) + 's">' +
        '<circle cx="' + fx.toFixed(1) + '" cy="0" r="' + fr.toFixed(2) + '"/></g>';
    }

    // ── 水波：极淡的横向短纹，缓慢呼吸；越近越大越长（近大远小 = 纵深） ──
    var ripples = '';
    var RIPPLE_N = 22;
    for (var j = 0; j < RIPPLE_N; j++) {
      var depth = j / (RIPPLE_N - 1);                     // 0=近地平线, 1=画面底部
      var ry = 500 + depth * 434 + (j % 4) * 5;
      var rrx = (22 + (j % 5) * 16) * (0.78 + depth * 0.72);
      var rcx = (((j * GOLDEN) % 1) * 880) + 50;
      var rop = 0.10 + (j % 4) * 0.038;
      ripples += '<ellipse class="lxt-ripple" cx="' + rcx.toFixed(1) + '" cy="' + ry.toFixed(1) +
        '" rx="' + rrx.toFixed(1) +
        '" ry="' + (1.0 + depth * 0.9).toFixed(2) + '" style="opacity:' + rop.toFixed(2) +
        ';animation-duration:' + (10 + (j % 4) * 2.6).toFixed(1) +
        's;animation-delay:-' + (j * 7.3 % 12).toFixed(1) + 's"/>';
    }

    // ── 星：仅暗色模式显示 ──
    var stars = '';
    var starPos = [[110, 62], [232, 40], [356, 88], [470, 34], [586, 70], [700, 46],
      [812, 92], [906, 38], [166, 122], [520, 118], [760, 130], [868, 150]];
    for (var s = 0; s < starPos.length; s++) {
      stars += '<circle class="lxt-star" cx="' + starPos[s][0] + '" cy="' + starPos[s][1] +
        '" r="' + (0.8 + (s % 3) * 0.3).toFixed(2) + '" fill="var(--star)" style="animation-duration:' +
        (2.4 + (s % 4) * 0.9).toFixed(1) + 's;animation-delay:-' + (s * 0.7).toFixed(1) + 's"/>';
    }

    // ── 山脊路径：三道递进（越远越浅），近脊同时用于湖面倒影 ──
    var ridgeUltra = 'M-20,470 Q90,430 190,418 Q290,406 380,426 Q470,444 560,432 ' +
      'Q650,420 740,434 Q830,448 920,436 Q950,432 980,438 L980,472 L-20,472 Z';
    var ridgeFar = 'M-20,470 Q80,442 160,430 Q240,418 320,436 Q400,452 470,444 ' +
      'Q540,436 610,446 Q680,456 750,440 Q820,424 890,438 Q930,446 980,452 L980,472 L-20,472 Z';
    var ridgeNear = 'M-20,470 Q60,458 140,450 Q220,442 300,454 Q380,464 450,458 ' +
      'Q520,452 590,460 Q660,468 730,458 Q800,448 870,456 Q930,462 980,466 L980,472 L-20,472 Z';

    return '' +
    '<style>' +
    /* ── 调色（昼雪 / 夜雪双模；一律由 --accent-hue 派生，与平台配色联动） ── */
    '.lxt-root{' +
      '--bh:var(--accent-hue,205);--alo:var(--accent-lightness-offset,0%);' +
      '--bg:hsl(var(--bh),20%,calc(96% + var(--alo)));' +
      '--sky-top:hsl(var(--bh),17%,calc(98% + var(--alo)));' +
      '--sky-bottom:hsl(var(--bh),22%,calc(95% + var(--alo)));' +
      '--water-far:hsl(var(--bh),24%,calc(93% + var(--alo)));' +
      '--water-near:hsl(var(--bh),28%,calc(85% + var(--alo)));' +
      '--mt-ultra:hsl(var(--bh),18%,calc(91% + var(--alo)));' +
      '--mt-far:hsl(var(--bh),20%,calc(87% + var(--alo)));' +
      '--mt-near:hsl(var(--bh),23%,calc(80% + var(--alo)));' +
      '--ink:hsl(var(--bh),26%,calc(34% + var(--alo)));' +
      '--ripple:hsl(var(--bh),26%,calc(78% + var(--alo)));' +
      '--haze:hsl(var(--bh),32%,100%);' +
      '--mist:hsl(var(--bh),26%,100%);' +
      '--flake:hsl(var(--bh),12%,100%);' +
      '--lamp:hsl(38,88%,62%);' +
      '--lamp-glow:hsl(38,90%,58%);' +
      '--star:transparent;' +
      '--vignette:hsla(var(--bh),28%,52%,0.11);' +
      'position:relative;width:100%;height:480px;overflow:hidden;' +
      'border-radius:var(--theme-inner-radius,26px);background:var(--bg);contain:paint}' +
    '.lxt-root::after{content:"";position:absolute;inset:0;border-radius:inherit;' +
      'pointer-events:none;box-shadow:inset 0 0 70px var(--vignette)}' +
    '.lxt-svg{width:100%;height:100%;display:block}' +
    '[data-theme-mode="dark"] .lxt-root{' +
      '--bg:hsl(var(--bh),30%,calc(7% + var(--alo)));' +
      '--sky-top:hsl(var(--bh),36%,calc(6% + var(--alo)));' +
      '--sky-bottom:hsl(var(--bh),30%,calc(15% + var(--alo)));' +
      '--water-far:hsl(var(--bh),28%,calc(14% + var(--alo)));' +
      '--water-near:hsl(var(--bh),26%,calc(8% + var(--alo)));' +
      '--mt-ultra:hsl(var(--bh),26%,calc(29% + var(--alo)));' +
      '--mt-far:hsl(var(--bh),26%,calc(23% + var(--alo)));' +
      '--mt-near:hsl(var(--bh),26%,calc(18% + var(--alo)));' +
      '--ink:hsl(var(--bh),30%,calc(3% + var(--alo)));' +
      '--ripple:hsl(var(--bh),25%,calc(26% + var(--alo)));' +
      '--haze:hsl(var(--bh),34%,calc(72% + var(--alo)));' +
      '--mist:hsl(var(--bh),30%,calc(64% + var(--alo)));' +
      '--flake:hsl(var(--bh),10%,calc(90% + var(--alo)));' +
      '--star:#fff;' +
      '--vignette:hsla(var(--bh),42%,2%,0.55)}' +

    /* ── 飘雪：细缓下落 + 三种横摆；仅 transform/opacity ── */
    '.lxt-flake{animation-name:lxt-fall-a;animation-timing-function:linear;animation-iteration-count:infinite}' +
    '.lxt-flake circle{fill:var(--flake);opacity:.9}' +
    '.lxt-fall-b{animation-name:lxt-fall-b}' +
    '.lxt-fall-c{animation-name:lxt-fall-c}' +
    '@keyframes lxt-fall-a{0%{transform:translate(0,-30px);opacity:0}' +
      '8%{opacity:.88}88%{opacity:.6}100%{transform:translate(14px,990px);opacity:0}}' +
    '@keyframes lxt-fall-b{0%{transform:translate(0,-30px);opacity:0}' +
      '10%{opacity:.82}86%{opacity:.55}100%{transform:translate(-26px,990px);opacity:0}}' +
    '@keyframes lxt-fall-c{0%{transform:translate(0,-30px);opacity:0}' +
      '6%{opacity:.92}90%{opacity:.65}100%{transform:translate(34px,990px);opacity:0}}' +

    /* ── 星闪（仅暗色） ── */
    '.lxt-star{display:none;opacity:.7}' +
    '[data-theme-mode="dark"] .lxt-star{display:block;animation-name:lxt-twinkle;' +
      'animation-timing-function:ease-in-out;animation-iteration-count:infinite;animation-direction:alternate}' +
    '@keyframes lxt-twinkle{from{opacity:.18}to{opacity:.72}}' +

    /* ── 水波轻呼吸 ── */
    '.lxt-ripple{fill:var(--ripple);transform-box:fill-box;transform-origin:center;' +
      'animation-name:lxt-ripple;animation-timing-function:ease-in-out;animation-iteration-count:infinite}' +
    '@keyframes lxt-ripple{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.07)}}' +

    /* ── 雾凇沆砀：三层相反方向漂移 ── */
    '.lxt-mist{animation-timing-function:ease-in-out;animation-iteration-count:infinite}' +
    '.lxt-mist-1{animation-name:lxt-mist-a;animation-duration:44s}' +
    '.lxt-mist-2{animation-name:lxt-mist-b;animation-duration:58s;animation-delay:-14s}' +
    '.lxt-mist-3{animation-name:lxt-mist-c;animation-duration:66s;animation-delay:-30s}' +
    '@keyframes lxt-mist-a{0%,100%{transform:translateX(-26px);opacity:.62}' +
      '50%{transform:translateX(26px);opacity:.92}}' +
    '@keyframes lxt-mist-b{0%,100%{transform:translateX(30px);opacity:.5}' +
      '50%{transform:translateX(-30px);opacity:.8}}' +
    '@keyframes lxt-mist-c{0%,100%{transform:translateX(-20px);opacity:.4}' +
      '50%{transform:translateX(22px);opacity:.68}}' +

    /* ── 长堤一痕：雾气来过则隐去（时隐时现的一痕） ── */
    '.lxt-causeway{animation:lxt-veil 27s ease-in-out infinite}' +
    '@keyframes lxt-veil{0%,100%{opacity:.5}50%{opacity:1}}' +

    /* ── 亭中炉火呼吸（低频，非彩蛋） ── */
    '.lxt-lamp{animation:lxt-lamp 4.6s ease-in-out infinite}' +
    '@keyframes lxt-lamp{0%,100%{opacity:.72}50%{opacity:1}}' +
    '.lxt-lamp-glow{transform-box:fill-box;transform-origin:center;' +
      'animation:lxt-glow 4.6s ease-in-out infinite}' +
    '@keyframes lxt-glow{0%,100%{opacity:.15;transform:scale(1)}50%{opacity:.3;transform:scale(1.14)}}' +

    /* ── 余舟一芥：极慢划过水面（独往湖心亭的行程感）+ 轻起伏 + 桨细摆 ── */
    '.lxt-boat-track{animation:lxt-drift 96s linear infinite;animation-delay:-38s}' +
    '@keyframes lxt-drift{from{transform:translateX(-150px)}to{transform:translateX(1100px)}}' +
    '.lxt-boat-bob{transform-box:fill-box;transform-origin:center;' +
      'animation:lxt-bob 7.4s ease-in-out infinite}' +
    '@keyframes lxt-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.6px)}}' +
    '.lxt-oar{transform-box:fill-box;transform-origin:right top;' +
      'animation:lxt-oar 5.6s ease-in-out infinite}' +
    '@keyframes lxt-oar{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}' +

    /* 无障碍：系统偏好减弱动效时，只保留静态构图 */
    '@media (prefers-reduced-motion: reduce){' +
      '.lxt-flake,.lxt-star,.lxt-ripple,.lxt-mist,.lxt-causeway,.lxt-lamp,.lxt-lamp-glow,' +
      '.lxt-boat-track,.lxt-boat-bob,.lxt-oar{animation:none!important}' +
      /* 舟停在画面中偏右，避免动画停用后贴在左边缘 */
      '.lxt-boat-track{transform:translateX(330px)}}' +
    '</style>' +

    '<div class="lxt-root">' +
    '<svg class="lxt-svg" viewBox="0 0 960 960" preserveAspectRatio="xMidYMid slice" ' +
      'xmlns="http://www.w3.org/2000/svg">' +

      '<defs>' +
        '<linearGradient id="lxtSky" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="var(--sky-top)"/>' +
          '<stop offset="100%" stop-color="var(--sky-bottom)"/>' +
        '</linearGradient>' +
        '<linearGradient id="lxtWater" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="var(--water-far)"/>' +
          '<stop offset="100%" stop-color="var(--water-near)"/>' +
        '</linearGradient>' +
        /* 地平线大气：天与云与山与水，上下一白 */
        '<linearGradient id="lxtHorizon" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="var(--haze)" stop-opacity="0"/>' +
          '<stop offset="52%" stop-color="var(--haze)" stop-opacity="0.34"/>' +
          '<stop offset="100%" stop-color="var(--haze)" stop-opacity="0"/>' +
        '</linearGradient>' +
        '<radialGradient id="lxtMistA" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="var(--mist)" stop-opacity="0.7"/>' +
          '<stop offset="100%" stop-color="var(--mist)" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="lxtMistB" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="var(--mist)" stop-opacity="0.5"/>' +
          '<stop offset="100%" stop-color="var(--mist)" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<radialGradient id="lxtLampGlow" cx="50%" cy="50%" r="50%">' +
          '<stop offset="0%" stop-color="var(--lamp-glow)" stop-opacity="0.55"/>' +
          '<stop offset="60%" stop-color="var(--lamp-glow)" stop-opacity="0.16"/>' +
          '<stop offset="100%" stop-color="var(--lamp-glow)" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<filter id="lxtBlurSoft"><feGaussianBlur stdDeviation="7"/></filter>' +
        '<filter id="lxtBlurMid"><feGaussianBlur stdDeviation="3"/></filter>' +
        '<filter id="lxtBlurTiny"><feGaussianBlur stdDeviation="0.9"/></filter>' +
      '</defs>' +

      /* 天空 */
      '<rect x="0" y="0" width="960" height="482" fill="url(#lxtSky)"/>' +
      stars +

      /* 远山：三道极淡轮廓，越远越浅（天与山与水上下一白） */
      '<g filter="url(#lxtBlurSoft)" opacity="0.5">' +
        '<path d="' + ridgeUltra + '" fill="var(--mt-ultra)"/>' +
      '</g>' +
      '<g filter="url(#lxtBlurSoft)" opacity="0.72">' +
        '<path d="' + ridgeFar + '" fill="var(--mt-far)"/>' +
      '</g>' +
      '<g filter="url(#lxtBlurMid)" opacity="0.82">' +
        '<path d="' + ridgeNear + '" fill="var(--mt-near)"/>' +
      '</g>' +

      /* 水面 */
      '<rect x="0" y="470" width="960" height="490" fill="url(#lxtWater)"/>' +
      /* 山影倒影：把近脊沿湖面翻转（y -> 940 - y），极淡且更模糊 → 读出"这是湖" */
      '<g filter="url(#lxtBlurSoft)" opacity="0.26" transform="translate(0,940) scale(1,-1)">' +
        '<path d="' + ridgeNear + '" fill="var(--mt-near)"/>' +
      '</g>' +

      /* 长堤一痕：远堤（更淡）/ 主堤 两道楔形墨痕，向右收束于湖心亭方向 */
      '<g class="lxt-causeway" filter="url(#lxtBlurSoft)">' +
        '<path d="M-10,487 L524,481 L524,484.5 L-10,491 Z" fill="var(--ink)" opacity="0.12"/>' +
        '<path d="M-10,503 L586,494 L586,499 L-10,511 Z" fill="var(--ink)" opacity="0.22"/>' +
        '<circle cx="96" cy="504" r="1.5" fill="var(--ink)" opacity="0.3"/>' +
        '<circle cx="214" cy="502" r="1.4" fill="var(--ink)" opacity="0.28"/>' +
        '<circle cx="338" cy="500" r="1.3" fill="var(--ink)" opacity="0.26"/>' +
        '<circle cx="452" cy="498" r="1.2" fill="var(--ink)" opacity="0.24"/>' +
      '</g>' +

      /* 雾凇沆砀：地平线大气带，把远山/长堤"沆砀"掉 */
      '<rect x="0" y="330" width="960" height="300" fill="url(#lxtHorizon)"/>' +

      /* 湖心亭一点（放大到 scale 1.55，兼顾"一点"的克制与可读性） */
      '<g transform="translate(600,470)">' +
        '<ellipse cx="0" cy="2" rx="27" ry="4.2" fill="var(--ink)" opacity="0.4" ' +
          'filter="url(#lxtBlurMid)"/>' +
        '<g transform="scale(1.55)">' +
          '<path d="M-14,-12 Q-7,-17 0,-23 Q7,-17 14,-12 Q7,-14 0,-13.4 Q-7,-14 -14,-12 Z" ' +
            'fill="var(--ink)" opacity="0.74"/>' +
          '<line x1="-9" y1="-12.5" x2="-9" y2="-1" stroke="var(--ink)" stroke-width="1" opacity="0.68"/>' +
          '<line x1="9" y1="-12.5" x2="9" y2="-1" stroke="var(--ink)" stroke-width="1" opacity="0.68"/>' +
          '<line x1="-12.5" y1="-12.4" x2="12.5" y2="-12.4" stroke="var(--ink)" stroke-width="0.8" opacity="0.5"/>' +
          '<rect x="-13" y="-1.6" width="26" height="1.8" fill="var(--ink)" opacity="0.55"/>' +
        '</g>' +
        /* 亭中炉火：全画面唯一的暖点 */
        '<ellipse class="lxt-lamp-glow" cx="0" cy="-11" rx="22" ry="15" fill="url(#lxtLampGlow)"/>' +
        '<circle class="lxt-lamp" cx="0" cy="-10.5" r="2.6" fill="var(--lamp)"/>' +
        /* 湖面暖光倒影 / 岛影 */
        '<ellipse cx="0" cy="11" rx="19" ry="8.5" fill="var(--lamp-glow)" opacity="0.11" ' +
          'filter="url(#lxtBlurSoft)"/>' +
        '<ellipse cx="0" cy="6" rx="24" ry="2.8" fill="var(--ink)" opacity="0.13" ' +
          'filter="url(#lxtBlurMid)"/>' +
      '</g>' +

      /* 水波 */
      '<g filter="url(#lxtBlurTiny)">' + ripples + '</g>' +

      /* 余舟一芥（近景，极慢右行）
       * 注意：纵向定位必须放在「无 CSS transform」的外层 <g> 上——CSS transform 会覆盖
       * SVG transform 属性，若把 translate 写在带动画的分组上会被动画顶掉（舟跑到画面顶端）。 */
      '<g transform="translate(0,742)">' +
        '<g class="lxt-boat-track">' +
          '<g class="lxt-boat-bob">' +
            /* 放大 1.4：近景之物，尺度上略大于亭，读得出"余舟一芥" */
            '<g transform="scale(1.4)">' +
              '<line class="lxt-oar" x1="8" y1="-2" x2="-2" y2="7" stroke="var(--ink)" ' +
                'stroke-width="0.9" stroke-linecap="round" opacity="0.45"/>' +
              '<path d="M-19,-1.5 Q0,7 19,-1.5 Q0,2.5 -19,-1.5 Z" fill="var(--ink)" opacity="0.68"/>' +
              '<path d="M-7,-1.6 Q-1,-9 5,-1.6 Z" fill="var(--ink)" opacity="0.74"/>' +
              /* 舟中人两三粒 */
              '<circle cx="9.5" cy="-4" r="1.9" fill="var(--ink)" opacity="0.62"/>' +
              '<circle cx="13.2" cy="-3.4" r="1.5" fill="var(--ink)" opacity="0.52"/>' +
              /* 舟中炉火 */
              '<ellipse class="lxt-lamp-glow" cx="-1" cy="-4" rx="9" ry="6.5" fill="url(#lxtLampGlow)"/>' +
              '<circle class="lxt-lamp" cx="-1" cy="-4" r="1.6" fill="var(--lamp)" opacity="0.92"/>' +
            '</g>' +
          '</g>' +
        '</g>' +
      '</g>' +

      /* 雾：三层不同方向漂移 */
      '<ellipse class="lxt-mist lxt-mist-1" cx="360" cy="436" rx="470" ry="118" fill="url(#lxtMistA)"/>' +
      '<ellipse class="lxt-mist lxt-mist-2" cx="700" cy="628" rx="510" ry="94" fill="url(#lxtMistB)"/>' +
      '<ellipse class="lxt-mist lxt-mist-3" cx="420" cy="856" rx="500" ry="116" fill="url(#lxtMistA)"/>' +

      /* 飘雪 */
      flakes +
    '</svg>' +
    '</div>';
  }
};

window.__bamboo_theme_湖心亭看雪 = theme;
