/* 竹林动效主题
 * © 2026 羽鳞君。保留所有权利。
 * 本主题为「竹林」插件用户专享内容：
 *   · 仅限已安装并使用本插件（bamboo-immortals）的用户在插件内使用；
 *   · 未经作者书面授权，任何人不得复制、转载、再分发、转售，
 *     亦不得在本插件之外以任何形式（含个人学习/自用）使用；
 *   · 违反上述条款将追究法律责任。
 */
// 文件名: 荷塘鱼影.js
// 变量名: __bamboo_theme_荷塘鱼影
// 主题: 荷塘鱼影 —— 极简对角称，双鲤游弋，明暗双模
// 7片荷叶，参数各不同

function lotusLeafSVG(id, waveAmp1, waveAmp2) {
  var segs = 48;
  var r = 90;
  var pathD = '';
  for (var i = 0; i <= segs; i++) {
    var a = (i / segs) * 2 * Math.PI - Math.PI / 2;
    var wave = Math.sin(a * 10) * waveAmp1 + Math.cos(a * 6) * waveAmp2;
    var rad = r + wave;
    var x = (100 + rad * Math.cos(a)).toFixed(2);
    var y = (100 + rad * Math.sin(a)).toFixed(2);
    pathD += (i === 0 ? 'M' : 'L') + x + ',' + y + ' ';
  }
  pathD += 'Z';

  var veins = '';
  for (var j = 0; j < 14; j++) {
    var va = (j * 25.7) * Math.PI / 180;
    var ex = (100 + 80 * Math.cos(va)).toFixed(1);
    var ey = (100 + 80 * Math.sin(va)).toFixed(1);
    var cx = (100 + 42 * Math.cos(va) + 4 * Math.sin(va)).toFixed(1);
    var cy = (100 + 42 * Math.sin(va) - 4 * Math.cos(va)).toFixed(1);
    veins += '<path d="M100,100 Q' + cx + ',' + cy + ' ' + ex + ',' + ey + '" />';
  }

  return '<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">' +
    '<defs>' +
      '<radialGradient id="lf' + id + '" cx="42%" cy="36%">' +
        '<stop offset="0%" stop-color="hsl(var(--accent-hue,150),38%,calc(68% + var(--accent-lightness-offset,0%)))" />' +
        '<stop offset="55%" stop-color="hsl(var(--accent-hue,150),34%,calc(58% + var(--accent-lightness-offset,0%)))" />' +
        '<stop offset="100%" stop-color="hsl(var(--accent-hue,150),30%,calc(48% + var(--accent-lightness-offset,0%)))" />' +
      '</radialGradient>' +
    '</defs>' +
    '<path d="' + pathD + '" fill="url(#lf' + id + ')" />' +
    '<g stroke="rgba(255,255,255,0.28)" stroke-width="0.8" fill="none" stroke-linecap="round">' + veins + '</g>' +

    /* 积水1 - 叶心大块 */
    '<ellipse cx="' + (id === '1' ? '90' : '105') + '" cy="' + (id === '1' ? '95' : '100') + '" rx="' + (id === '1' ? '22' : '18') + '" ry="' + (id === '1' ? '12' : '14') + '" fill="rgba(255,255,255,0.1)" transform="rotate(' + (id === '1' ? '-18' : '25') + ' ' + (id === '1' ? '90' : '105') + ' ' + (id === '1' ? '95' : '100') + ')" />' +
    /* 积水2 - 边缘小块 */
    '<ellipse cx="' + (id === '1' ? '118' : '72') + '" cy="' + (id === '1' ? '70' : '85') + '" rx="' + (id === '1' ? '14' : '10') + '" ry="' + (id === '1' ? '7' : '9') + '" fill="rgba(255,255,255,0.08)" transform="rotate(' + (id === '1' ? '22' : '-30') + ' ' + (id === '1' ? '118' : '72') + ' ' + (id === '1' ? '70' : '85') + ')" />' +
    /* 叶心 */
    '<circle cx="100" cy="100" r="' + (id === '1' ? '2.2' : '1.8') + '" fill="rgba(255,255,255,' + (id === '1' ? '0.14' : '0.1') + ')" />' +
  '</svg>';
}

// 荷面露珠 —— 静态分布 + 微颤动画（右下角荷叶专用）
// 每颗露珠 {left%, top%, scale}，大小不一更自然
function dewdropPositions() {
  return [
    { l: '30', t: '20', s: '0.6'  },   // 左上小露珠
    { l: '48', t: '18', s: '1.0'  },   // 顶偏右，大颗
    { l: '56', t: '34', s: '0.75' },   // 右侧中
    { l: '45', t: '46', s: '0.55' },   // 右下小
    { l: '30', t: '42', s: '0.9'  },   // 底部偏左，较大
    { l: '24', t: '30', s: '0.7'  }    // 左侧中
  ];
}

// 水珠沿叶脉滑落 —— Q-curve 路径采样生成 CSS keyframes（左上角荷叶专用）
function dewdropKF(name, veinIdx) {
  var va = (veinIdx * 25.7) * Math.PI / 180;
  var cx = 100 + 42 * Math.cos(va) + 4 * Math.sin(va);
  var cy = 100 + 42 * Math.sin(va) - 4 * Math.cos(va);
  var ex = 100 + 80 * Math.cos(va);
  var ey = 100 + 80 * Math.sin(va);

  function q(t) {
    var t1 = 1 - t;
    return {
      x: t1 * t1 * 100 + 2 * t1 * t * cx + t * t * ex,
      y: t1 * t1 * 100 + 2 * t1 * t * cy + t * t * ey
    };
  }

  function lx(v) { return (v / 2).toFixed(1); }
  function ly(v) { return (v / 2).toFixed(1); }

  var s = [q(0.15), q(0.35), q(0.58), q(0.78), q(1.0)];
  var xf = function(v) { return 'translate(-50%,-50%) scale(' + v + ')'; };

  return '@keyframes ' + name + '{' +
    '0%{left:50%;top:50%;opacity:0;transform:' + xf('0') + '}' +
    '10%{left:50%;top:50%;opacity:0.95;transform:' + xf('1') + '}' +
    '30%{left:' + lx(s[0].x) + '%;top:' + ly(s[0].y) + '%;opacity:0.9;transform:' + xf('0.96') + '}' +
    '52%{left:' + lx(s[1].x) + '%;top:' + ly(s[1].y) + '%;opacity:0.82;transform:' + xf('0.9') + '}' +
    '70%{left:' + lx(s[2].x) + '%;top:' + ly(s[2].y) + '%;opacity:0.65;transform:' + xf('0.8') + '}' +
    '84%{left:' + lx(s[3].x) + '%;top:' + ly(s[3].y) + '%;opacity:0.38;transform:' + xf('0.6') + '}' +
    '92%{left:' + lx(s[4].x) + '%;top:' + ly(s[4].y) + '%;opacity:0.08;transform:' + xf('0.25') + '}' +
    '98%{left:' + lx(s[4].x) + '%;top:' + (Number(ly(s[4].y)) + 2.5).toFixed(1) + '%;opacity:0;transform:' + xf('0.05') + '}' +
    '100%{left:50%;top:50%;opacity:0;transform:' + xf('0') + '}' +
  '}';
}

function lotusFlowerSVG() {
  var outer = '';
  var inner = '';
  for (var i = 0; i < 6; i++) {
    outer += '<ellipse cx="0" cy="-16" rx="7" ry="15" transform="rotate(' + (i * 60) + ')" />';
    inner += '<ellipse cx="0" cy="-9" rx="4.5" ry="9" transform="rotate(' + (i * 60 + 30) + ')" />';
  }
  return '<svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">' +
    '<g transform="translate(30,30)">' +
      '<g fill="hsl(340,65%,80%)">' + outer + '</g>' +
      '<g fill="hsl(340,72%,87%)">' + inner + '</g>' +
      '<circle r="4.5" fill="hsl(48,75%,65%)" />' +
      '<circle r="2.5" fill="hsl(48,85%,72%)" />' +
    '</g>' +
  '</svg>';
}

function waveLayerSVG(id, opacity) {
  var w = 600;
  var paths = '';
  for (var row = 0; row < 5; row++) {
    var y = 20 + row * 22;
    var d = 'M0,' + y;
    for (var x = 0; x <= w; x += 20) {
      var offset = Math.sin(x * 0.04 + row * 1.3) * 4 + Math.cos(x * 0.025 + row * 0.7) * 2.5;
      d += ' L' + x + ',' + (y + offset).toFixed(1);
    }
    var op = (0.25 - row * 0.04) * opacity;
    paths += '<path d="' + d + '" stroke="hsla(var(--accent-hue,150),40%,calc(55% + var(--accent-lightness-offset,0%)),' + op.toFixed(3) + ')" stroke-width="0.8" fill="none" />';
  }
  return '<svg viewBox="0 0 ' + w + ' 120" preserveAspectRatio="none" style="width:200%;height:100%">' + paths + '</svg>';
}

function koiFishSVG() {
  return '<svg viewBox="0 0 80 40" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">' +
    '<defs>' +
      '<linearGradient id="koiBody" x1="0%" y1="0%" x2="100%" y2="20%">' +
        '<stop offset="0%" stop-color="#d64545" />' +
        '<stop offset="45%" stop-color="#c43030" />' +
        '<stop offset="100%" stop-color="#a01818" />' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(40,20)">' +
      /* 梭形身体 */
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="url(#koiBody)" />' +
      /* 分叉尾鳍 - 上叶 */
      '<path d="M-26,-1 C-30,-4 -38,-11 -45,-9 C-38,-5 -31,-2 -26,-1 Z" fill="#d64545" opacity="0.75" />' +
      /* 分叉尾鳍 - 下叶 */
      '<path d="M-26,-1 C-30,2 -38,9 -45,7 C-38,4 -31,1 -26,-1 Z" fill="#d64545" opacity="0.7" />' +
      /* 尾鳍脉络 */
      '<path d="M-26,-1 Q-35,-6 -45,-9" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" fill="none" />' +
      '<path d="M-26,-1 Q-35,4 -45,7" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" fill="none" />' +
      /* 背鳍 */
      '<path d="M-2,-8.5 Q-6,-13 -3,-14 Q1,-12 3,-9 Z" fill="#e86060" opacity="0.7" />' +
      /* 胸鳍 */
      '<path d="M12,5 Q8,12 10,13 Q14,10 14,6 Z" fill="#e86060" opacity="0.6" />' +
      '<path d="M12,-5 Q8,-11 10,-12 Q14,-9 14,-6 Z" fill="#e86060" opacity="0.6" />' +
      /* 身体轮廓线 */
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="0.8" />' +
      /* 自然斑纹 */
      '<ellipse cx="2" cy="-2" rx="10" ry="4.5" fill="rgba(255,255,255,0.22)" transform="rotate(-6 2 -2)" />' +
      '<ellipse cx="-12" cy="1" rx="7" ry="3" fill="rgba(255,255,255,0.16)" transform="rotate(3 -12 1)" />' +
      '<ellipse cx="-20" cy="-1" rx="4" ry="2" fill="rgba(255,255,255,0.12)" />' +
      /* 侧线 */
      '<path d="M-18,-0.5 Q-2,-2.5 16,-0.5" stroke="rgba(255,255,255,0.18)" stroke-width="0.5" fill="none" />' +
    '</g>' +
  '</svg>';
}

function koiWhiteSVG() {
  return '<svg viewBox="0 0 80 40" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">' +
    '<defs>' +
      '<linearGradient id="koiWhiteBody" x1="0%" y1="0%" x2="100%" y2="20%">' +
        '<stop offset="0%" stop-color="#f5d060" />' +
        '<stop offset="50%" stop-color="#e8c040" />' +
        '<stop offset="100%" stop-color="#c89820" />' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(40,20)">' +
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="url(#koiWhiteBody)" />' +
      '<path d="M-26,-1 C-30,-4 -38,-11 -45,-9 C-38,-5 -31,-2 -26,-1 Z" fill="#e8c040" opacity="0.7" />' +
      '<path d="M-26,-1 C-30,2 -38,9 -45,7 C-38,4 -31,1 -26,-1 Z" fill="#e8c040" opacity="0.65" />' +
      '<path d="M-26,-1 Q-35,-6 -45,-9" stroke="rgba(180,140,60,0.15)" stroke-width="0.5" fill="none" />' +
      '<path d="M-26,-1 Q-35,4 -45,7" stroke="rgba(180,140,60,0.15)" stroke-width="0.5" fill="none" />' +
      '<path d="M-2,-8.5 Q-6,-13 -3,-14 Q1,-12 3,-9 Z" fill="#f0d870" opacity="0.7" />' +
      '<path d="M12,5 Q8,12 10,13 Q14,10 14,6 Z" fill="#f0d870" opacity="0.55" />' +
      '<path d="M12,-5 Q8,-11 10,-12 Q14,-9 14,-6 Z" fill="#f0d870" opacity="0.55" />' +
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="none" stroke="rgba(180,140,60,0.2)" stroke-width="0.8" />' +
      '<ellipse cx="2" cy="2" rx="8" ry="3.5" fill="rgba(255,240,200,0.2)" transform="rotate(5 2 2)" />' +
      '<path d="M-18,-0.5 Q-2,-2.5 16,-0.5" stroke="rgba(180,140,60,0.15)" stroke-width="0.5" fill="none" />' +
    '</g>' +
  '</svg>';
}

function koiSilverSVG() {
  return '<svg viewBox="0 0 80 40" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">' +
    '<defs>' +
      '<linearGradient id="koiSilverBody" x1="0%" y1="0%" x2="100%" y2="20%">' +
        '<stop offset="0%" stop-color="#c8e8e0" />' +
        '<stop offset="40%" stop-color="#a0d0c0" />' +
        '<stop offset="100%" stop-color="#78b8a0" />' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(40,20)">' +
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="url(#koiSilverBody)" />' +
      '<path d="M-26,-1 C-30,-4 -38,-11 -45,-9 C-38,-5 -31,-2 -26,-1 Z" fill="#a0d0c0" opacity="0.7" />' +
      '<path d="M-26,-1 C-30,2 -38,9 -45,7 C-38,4 -31,1 -26,-1 Z" fill="#a0d0c0" opacity="0.65" />' +
      '<path d="M-26,-1 Q-35,-6 -45,-9" stroke="rgba(255,255,255,0.2)" stroke-width="0.5" fill="none" />' +
      '<path d="M-26,-1 Q-35,4 -45,7" stroke="rgba(255,255,255,0.2)" stroke-width="0.5" fill="none" />' +
      '<path d="M-2,-8.5 Q-6,-13 -3,-14 Q1,-12 3,-9 Z" fill="#b0d8c8" opacity="0.65" />' +
      '<path d="M12,5 Q8,12 10,13 Q14,10 14,6 Z" fill="#b0d8c8" opacity="0.5" />' +
      '<path d="M12,-5 Q8,-11 10,-12 Q14,-9 14,-6 Z" fill="#b0d8c8" opacity="0.5" />' +
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8" />' +
      '<ellipse cx="2" cy="-2" rx="8" ry="3.5" fill="rgba(255,255,255,0.28)" transform="rotate(-3 2 -2)" />' +
      '<path d="M-18,-0.5 Q-2,-2.5 16,-0.5" stroke="rgba(255,255,255,0.2)" stroke-width="0.5" fill="none" />' +
    '</g>' +
  '</svg>';
}

function koiDarkSVG() {
  return '<svg viewBox="0 0 80 40" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">' +
    '<defs>' +
      '<linearGradient id="koiDarkBody" x1="0%" y1="0%" x2="100%" y2="20%">' +
        '<stop offset="0%" stop-color="#e0d0e8" />' +
        '<stop offset="50%" stop-color="#c0b0d0" />' +
        '<stop offset="100%" stop-color="#a090b8" />' +
      '</linearGradient>' +
    '</defs>' +
    '<g transform="translate(40,20)">' +
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="url(#koiDarkBody)" />' +
      '<path d="M-26,-1 C-30,-4 -38,-11 -45,-9 C-38,-5 -31,-2 -26,-1 Z" fill="#c0b0d0" opacity="0.7" />' +
      '<path d="M-26,-1 C-30,2 -38,9 -45,7 C-38,4 -31,1 -26,-1 Z" fill="#c0b0d0" opacity="0.65" />' +
      '<path d="M-26,-1 Q-35,-6 -45,-9" stroke="rgba(255,255,255,0.18)" stroke-width="0.5" fill="none" />' +
      '<path d="M-26,-1 Q-35,4 -45,7" stroke="rgba(255,255,255,0.18)" stroke-width="0.5" fill="none" />' +
      '<path d="M-2,-8.5 Q-6,-13 -3,-14 Q1,-12 3,-9 Z" fill="#c8b8d8" opacity="0.65" />' +
      '<path d="M12,5 Q8,12 10,13 Q14,10 14,6 Z" fill="#c8b8d8" opacity="0.5" />' +
      '<path d="M12,-5 Q8,-11 10,-12 Q14,-9 14,-6 Z" fill="#c8b8d8" opacity="0.5" />' +
      '<path d="M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 Q-20,4 -6,8 Q8,7 22,1 Q14,0 22,-1 Z" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="0.8" />' +
      '<ellipse cx="2" cy="2" rx="7" ry="3" fill="rgba(255,255,255,0.22)" transform="rotate(2 2 2)" />' +
      '<path d="M-18,-0.5 Q-2,-2.5 16,-0.5" stroke="rgba(255,255,255,0.15)" stroke-width="0.5" fill="none" />' +
    '</g>' +
  '</svg>';
}

var theme = {
  name: '荷塘鱼影',
  author: '羽鳞君',
  license: '竹林用户专享 · 未经授权禁止使用（含个人使用） © 2026 羽鳞君 保留所有权利',

  // 设计画布：正方形基准 480×480（1:1，原 512×320 按 ×0.9375 换算）；尺寸与等比缩放由框架统一处理（无需自行适配）
  design: { w: 480, h: 480 },

  render: function () {
    var particles = '';
    var pPos = [
      ['30%', '0s', '12s'], ['55%', '-5s', '14s'], ['72%', '-2s', '11s']
    ];
    for (var i = 0; i < pPos.length; i++) {
      particles += '<div class="lh-particle" style="left:' + pPos[i][0] +
        ';animation-delay:' + pPos[i][1] + ';animation-duration:' + pPos[i][2] + '"></div>';
    }

    var ripples = '';
    var rPos = [
      ['48%', '62.5%', '0s', '6s'], ['30%', '75%', '-2s', '5s'],
      ['62%', '53%', '-4s', '5.5s'], ['42%', '87.5%', '-1s', '4.5s'],
      ['78%', '69%', '-3s', '5s'], ['72%', '83%', '-2.5s', '4.5s'],
      ['85%', '41%', '-1.5s', '5.5s'], ['75%', '31%', '-3.5s', '4.5s']
    ];
    for (var i = 0; i < rPos.length; i++) {
      ripples += '<div class="lh-ripple lh-ripple-inner" style="left:' + rPos[i][0] +
        ';top:' + rPos[i][1] + ';animation-delay:' + rPos[i][2] + ';animation-duration:' + rPos[i][3] + '"></div>';
      ripples += '<div class="lh-ripple lh-ripple-outer" style="left:' + rPos[i][0] +
        ';top:' + rPos[i][1] + ';animation-delay:' + rPos[i][2] + ';animation-duration:' + (parseFloat(rPos[i][3]) + 1.5) + 's"></div>';
    }

    // 左上角荷叶：水珠沿 3 条右下方叶脉滑落 + 涟漪
    var veinIdxs = [1, 2, 3];
    var veinEndpoints = [];
    for (var vi = 0; vi < veinIdxs.length; vi++) {
      var vIdx = veinIdxs[vi];
      var vd = (vIdx * 25.7) * Math.PI / 180;
      veinEndpoints.push({
        left: ((100 + 80 * Math.cos(vd)) / 2).toFixed(1),
        top:  ((100 + 80 * Math.sin(vd)) / 2).toFixed(1)
      });
    }

    // 右下角荷叶：6 颗露珠静态分布 + 微颤
    var drops = dewdropPositions();
    var wobbles = ['lh-wobble-a', 'lh-wobble-b', 'lh-wobble-c'];

    var leaves = '';

    // 左上角 —— 滑落水珠
    var ddSlide = '';
    for (var sv = 0; sv < veinIdxs.length; sv++) {
      ddSlide += '<div class="lh-dewdrop-slide" style="animation-name:lh-drop-v' + veinIdxs[sv] +
        ';animation-delay:-' + (sv * 2).toFixed(1) + 's"></div>';
    }
    var rpSlide = '';
    for (var sr = 0; sr < veinEndpoints.length; sr++) {
      rpSlide += '<div class="lh-drop-ripple" style="left:' + veinEndpoints[sr].left + '%;top:' + veinEndpoints[sr].top +
        '%;animation-delay:-' + (sr * 2).toFixed(1) + 's"></div>';
    }
    leaves += '<div class="lh-leaf lh-leaf-1">' + rpSlide + lotusLeafSVG('1', 2.8, 1.2) + ddSlide + '</div>';

    // 右下角 —— 静态露珠，每颗大小不同
    var ddWobble = '';
    for (var dw = 0; dw < drops.length; dw++) {
      var w = wobbles[dw % 3];
      var delay = -(dw * 0.6 + Math.random() * 0.3);
      var sc = drops[dw].s;
      ddWobble += '<div class="lh-dewdrop" style="left:' + drops[dw].l + '%;top:' + drops[dw].t +
        '%;width:' + (13 * sc).toFixed(1) + 'px;height:' + (14 * sc).toFixed(1) + 'px;' +
        'animation-name:' + w + ';animation-delay:' + delay.toFixed(2) + 's"></div>';
    }
    leaves += '<div class="lh-leaf lh-leaf-5">' + lotusLeafSVG('5', 2.6, 1.4) + ddWobble + '</div>';

    return '' +
    '<style>' +
    '.lh-scene{position:absolute;top:0;left:0;width:480px;height:480px;' +
      'border-radius:var(--theme-inner-radius,26px);overflow:hidden;' +
      'background:linear-gradient(175deg,' +
      'hsl(var(--accent-hue,150),28%,calc(86% + var(--accent-lightness-offset,0%))) 0%,' +
      'hsl(var(--accent-hue,150),32%,calc(76% + var(--accent-lightness-offset,0%))) 55%,' +
      'hsl(var(--accent-hue,150),34%,calc(68% + var(--accent-lightness-offset,0%))) 100%);}' +

    '.lh-water{position:absolute;inset:0;background:' +
      'radial-gradient(ellipse at 30% 70%,hsla(var(--accent-hue,150),45%,calc(60% + var(--accent-lightness-offset,0%)),0.25) 0%,transparent 50%),' +
      'radial-gradient(ellipse at 72% 35%,hsla(var(--accent-hue,150),42%,calc(55% + var(--accent-lightness-offset,0%)),0.18) 0%,transparent 45%);' +
      'animation:lh-shimmer 8s ease-in-out infinite alternate}' +

    '@keyframes lh-shimmer{0%{opacity:0.4;transform:translateX(-5px)}100%{opacity:0.8;transform:translateX(5px)}}' +

    '.lh-waves{position:absolute;bottom:0;left:0;width:200%;height:37.5%;z-index:1;' +
      'animation:lh-wave-drift 20s linear infinite}' +
    '.lh-waves-2{position:absolute;bottom:0;left:0;width:200%;height:31.25%;z-index:1;' +
      'animation:lh-wave-drift2 28s linear infinite;opacity:0.6}' +
    '@keyframes lh-wave-drift{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}' +
    '@keyframes lh-wave-drift2{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}' +

    '.lh-mist{position:absolute;left:-10%;width:120%;pointer-events:none;z-index:8}' +
    '.lh-mist-1{bottom:12.5%;height:25%;' +
      'background:radial-gradient(ellipse at 30% 50%,rgba(255,255,255,0.22) 0%,transparent 60%),' +
      'radial-gradient(ellipse at 70% 50%,rgba(255,255,255,0.14) 0%,transparent 55%);' +
      'animation:lh-mist1 16s ease-in-out infinite alternate}' +
    '.lh-mist-2{bottom:3.125%;height:31.25%;' +
      'background:radial-gradient(ellipse at 50% 60%,rgba(255,255,255,0.18) 0%,transparent 65%),' +
      'radial-gradient(ellipse at 20% 40%,rgba(255,255,255,0.12) 0%,transparent 50%);' +
      'animation:lh-mist2 22s ease-in-out infinite alternate;animation-delay:-5s}' +
    '.lh-mist-3{top:0;height:21.875%;' +
      'background:radial-gradient(ellipse at 40% 80%,rgba(255,255,255,0.2) 0%,transparent 60%);' +
      'animation:lh-mist3 18s ease-in-out infinite alternate;animation-delay:-8s}' +
    '@keyframes lh-mist1{0%{transform:translateX(-20px) translateY(0);opacity:0.5}100%{transform:translateX(20px) translateY(-3px);opacity:0.9}}' +
    '@keyframes lh-mist2{0%{transform:translateX(15px) translateY(0);opacity:0.4}100%{transform:translateX(-15px) translateY(-2px);opacity:0.8}}' +
    '@keyframes lh-mist3{0%{transform:translateX(-10px);opacity:0.35}100%{transform:translateX(15px);opacity:0.65}}' +

    /* 国画布境：疏密有致，虚实相生 */
    '.lh-leaf{position:absolute;transform-origin:center bottom}' +
    '.lh-leaf svg{display:block;filter:drop-shadow(0 3px 8px hsla(var(--accent-hue,150),45%,25%,0.12))}' +
    /* 主叶：清晰 */
    '.lh-leaf-1 svg{filter:drop-shadow(0 3px 8px hsla(var(--accent-hue,150),45%,25%,0.12)) blur(0.6px)}' +
    /* 对角呼应：微虚 */
    '.lh-leaf-5 svg{filter:drop-shadow(0 3px 8px hsla(var(--accent-hue,150),45%,25%,0.09)) blur(0.6px)}' +

    /* 主叶 — 左上角撑出画面，宽度随容器缩放 */
    '.lh-leaf-1{width:clamp(262px,25%,394px);top:-15%;left:-5%;animation:lh-sway1 7s ease-in-out infinite alternate;z-index:5}' +
    /* 对角呼应 — 右下角 */
    '.lh-leaf-5{width:clamp(262px,25%,394px);bottom:-10%;right:-5%;animation:lh-sway5 7.5s ease-in-out infinite alternate;animation-delay:-3s;z-index:4;opacity:0.82}' +

    '@keyframes lh-sway1{0%{transform:rotate(-3deg) translateY(0)}100%{transform:rotate(3deg) translateY(-3px)}}' +
    '@keyframes lh-sway5{0%{transform:rotate(-3deg)}100%{transform:rotate(2.5deg) translateY(-2px)}}' +

    /* 露珠：静态分布在右下角叶面，微颤晃动 */
    '.lh-dewdrop{position:absolute;width:clamp(7.5px,2%,12.2px);height:clamp(8.4px,2.2%,13.1px);border-radius:50%;' +
      'background:radial-gradient(circle at 32% 28%,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.18) 20%,rgba(255,255,255,0.02) 55%,' +
      'hsla(var(--accent-hue,150),40%,50%,0.25) 78%,hsla(var(--accent-hue,150),30%,30%,0.4) 100%);' +
      'box-shadow:0 1px 2.5px hsla(var(--accent-hue,150),30%,20%,0.22),' +
      'inset 0 -1px 2px hsla(var(--accent-hue,150),30%,15%,0.18);z-index:7;pointer-events:none;' +
      'transform:translate(-50%,-50%);' +
      'animation-duration:3.2s;animation-timing-function:ease-in-out;animation-iteration-count:infinite;animation-direction:alternate}' +

    /* 三种微颤变体 */
    '@keyframes lh-wobble-a{' +
      '0%{transform:translate(-50%,-50%) scale(1)}' +
      '100%{transform:translate(calc(-50% + 2px),calc(-50% - 1px)) scale(0.96)}}' +
    '@keyframes lh-wobble-b{' +
      '0%{transform:translate(-50%,-50%) scale(0.97)}' +
      '100%{transform:translate(calc(-50% - 1px),calc(-50% + 2px)) scale(1.03)}}' +
    '@keyframes lh-wobble-c{' +
      '0%{transform:translate(-50%,-50%) scale(1) rotate(0deg)}' +
      '100%{transform:translate(calc(-50% + 1.5px),calc(-50% + 1.5px)) scale(0.95) rotate(1.5deg)}}' +

    /* 水珠：左上角叶心形成 → 沿叶脉滑落 → 叶缘脱离 */
    '.lh-dewdrop-slide{position:absolute;left:50%;top:50%;width:11px;height:13px;border-radius:50%;' +
      'background:radial-gradient(circle at 30% 25%,rgba(255,255,255,0.95) 0%,rgba(255,255,255,0.2) 18%,rgba(255,255,255,0.03) 50%,' +
      'hsla(var(--accent-hue,150),40%,50%,0.25) 75%,hsla(var(--accent-hue,150),30%,30%,0.4) 100%);' +
      'box-shadow:0 1.5px 3px hsla(var(--accent-hue,150),30%,20%,0.25),' +
      'inset 0 -1px 2px hsla(var(--accent-hue,150),30%,15%,0.2);z-index:7;pointer-events:none;' +
      'animation-duration:6s;animation-timing-function:cubic-bezier(0.4,0,0.2,1);animation-iteration-count:infinite}' +

    dewdropKF('lh-drop-v1', 1) +
    dewdropKF('lh-drop-v2', 2) +
    dewdropKF('lh-drop-v3', 3) +

    /* 水珠滴落涟漪 — 叶缘触及水面瞬间扩散 */
    '.lh-drop-ripple{position:absolute;width:13px;height:13px;border-radius:50%;pointer-events:none;z-index:-1;' +
      'border:2px solid hsla(var(--accent-hue,150),38%,30%,0.58);' +
      'box-shadow:0 0 7px hsla(var(--accent-hue,150),38%,28%,0.28);' +
      'animation:lh-drop-ripple 6s ease-out infinite}' +
    '@keyframes lh-drop-ripple{' +
      '0%,84%{transform:translate(-50%,-50%) scale(0);opacity:0}' +
      '86%{transform:translate(-50%,-50%) scale(0.3);opacity:0.7}' +
      '100%{transform:translate(-50%,-50%) scale(4.5);opacity:0}}' +

    /* 涟漪内圈 - 明亮紧实 */
    '.lh-ripple-inner{position:absolute;width:22px;height:22px;margin-left:-11px;margin-top:-11px;border-radius:50%;' +
      'border:2px solid hsla(var(--accent-hue,150),52%,calc(48% + var(--accent-lightness-offset,0%)),0.4);' +
      'box-shadow:0 0 6px hsla(var(--accent-hue,150),52%,calc(48% + var(--accent-lightness-offset,0%)),0.1);' +
      'animation:lh-ripple-in ease-out infinite}' +
    /* 涟漪外圈 - 淡而扩散 */
    '.lh-ripple-outer{position:absolute;width:22px;height:22px;margin-left:-11px;margin-top:-11px;border-radius:50%;' +
      'border:1.2px solid hsla(var(--accent-hue,150),52%,calc(48% + var(--accent-lightness-offset,0%)),0.18);' +
      'animation:lh-ripple-out ease-out infinite}' +

    '@keyframes lh-ripple-in{' +
      '0%{transform:scale(0.15);opacity:0;border-width:2.5px}' +
      '10%{opacity:0.55}' +
      '100%{transform:scale(5);opacity:0;border-width:0.15px}}' +
    '@keyframes lh-ripple-out{' +
      '0%{transform:scale(0.3);opacity:0;border-width:1.2px}' +
      '12%{opacity:0.3}' +
      '100%{transform:scale(9);opacity:0;border-width:0.1px}}' +


    '.lh-particle{position:absolute;top:100%;width:4px;height:4px;border-radius:50%;' +
      'background:hsla(var(--accent-hue,150),45%,72%,0.2);animation:lh-float linear infinite}' +

    '@keyframes lh-float{' +
      '0%{top:100%;transform:translateX(0);opacity:0}' +
      '8%{opacity:0.3}' +
      '85%{opacity:0.12}' +
      '100%{top:-10%;transform:translateX(12px);opacity:0}}' +

    '.lh-flower{position:absolute;bottom:12.5%;left:20%;width:32px;z-index:7;' +
      'animation:lh-bob 5s ease-in-out infinite alternate;opacity:0.78}' +
    '.lh-flower svg{filter:drop-shadow(0 2px 6px hsla(340,45%,40%,0.15))}' +

    '@keyframes lh-bob{0%{transform:translateY(0) rotate(-2deg)}100%{transform:translateY(-3px) rotate(2deg)}}' +

    '.lh-koi{position:absolute;width:clamp(42px,6%,80px);height:clamp(21px,3%,39px);z-index:3;' +
      'left:-8%;top:88%;' +
      'animation:lh-koi-swim 28s ease-in-out infinite;' +
      'filter:drop-shadow(0 2px 6px rgba(180,30,30,0.15)) blur(0.5px)}' +
    '.lh-koi svg{animation:lh-koi-wiggle-red 5s ease-in-out infinite;transform-origin:center center}' +
    '.lh-koi::after{content:"";position:absolute;left:0;top:50%;width:140%;height:50%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(200,85,55,0.2) 0%,rgba(200,110,70,0.05) 40%,transparent 75%);' +
      'border-radius:50%;transform:translate(-55%,-50%);' +
      'animation:lh-trail-red 3.2s ease-in-out infinite}' +
    '@keyframes lh-trail-red{0%,100%{opacity:0.4;transform:translate(-55%,-50%) scaleX(0.9)}' +
      '35%{opacity:0.85;transform:translate(-58%,-52%) scaleX(1.05)}' +
      '70%{opacity:0.55;transform:translate(-52%,-48%) scaleX(0.95)}}' +

    /* 红鲤 LS弧线：底左垂直爬升→右转→S弯游上右，深度 scale 0.95→1.08→0.92 */
    '@keyframes lh-koi-swim{' +
      '0%{left:-8%;top:92%;opacity:0;transform:rotate(-85deg) scale(0.95)}' +
      '5%{opacity:0.65;transform:rotate(-80deg) scale(0.97)}' +
      '14%{left:3%;top:64%;transform:rotate(-75deg) scale(1.0)}' +
      '24%{left:6%;top:42%;transform:rotate(-60deg) scale(1.05)}' +
      '30%{left:8%;top:40%;transform:rotate(-30deg) scale(1.08)}' +
      '36%{left:14%;top:38%;transform:rotate(-8deg) scale(1.08)}' +
      '46%{left:30%;top:32%;transform:rotate(-6deg) scale(1.04)}' +
      '56%{left:48%;top:40%;transform:rotate(-3deg) scale(1.0)}' +
      '68%{left:66%;top:28%;transform:rotate(-5deg) scale(0.96)}' +
      '80%{left:84%;top:16%;transform:rotate(-3deg) scale(0.93)}' +
      '92%{left:98%;top:8%;opacity:0.65;transform:rotate(-2deg) scale(0.92)}' +
      '100%{left:105%;top:6%;opacity:0;transform:rotate(-2deg) scale(0.92)}}' +

    /* 红鲤身体波浪：慢宽，非对称——发力慢回弹快，skewY 大弧形弯曲 */
    '@keyframes lh-koi-wiggle-red{' +
      '0%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '14%{transform:rotate(5deg) scaleX(0.87) skewY(-3deg)}' +
      '22%{transform:rotate(1deg) scaleX(0.98) skewY(-0.5deg)}' +
      '30%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '42%{transform:rotate(-5deg) scaleX(1.08) skewY(3deg)}' +
      '50%{transform:rotate(-1deg) scaleX(1.02) skewY(0.5deg)}' +
      '58%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '72%{transform:rotate(4deg) scaleX(0.9) skewY(-2.5deg)}' +
      '80%{transform:rotate(1deg) scaleX(0.98) skewY(-0.5deg)}' +
      '88%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '100%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
    '}' +

    /* 白鲤：从右上追踪红鲤 → 中段绕圈超车 → 继续游向左下 */
    '.lh-koi-white{position:absolute;width:clamp(37px,5%,73px);height:clamp(19px,2.5%,34px);z-index:3;' +
      'left:105%;top:14%;transform:scaleX(-1);' +
      'animation:lh-koi2-swim 28s ease-in-out infinite;animation-delay:8s;' +
      'filter:drop-shadow(0 2px 6px rgba(180,140,50,0.12)) blur(0.4px)}' +
    '.lh-koi-white svg{animation:lh-koi-wiggle-white 1.8s ease-in-out infinite;transform-origin:center center}' +
    '.lh-koi-white::after{content:"";position:absolute;left:0;top:50%;width:100%;height:35%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(240,195,70,0.18) 0%,rgba(240,220,120,0.04) 40%,transparent 75%);' +
      'border-radius:50%;transform:translate(-50%,-50%);' +
      'animation:lh-trail-white 1.2s ease-in-out infinite}' +
    '@keyframes lh-trail-white{0%,100%{opacity:0.35;transform:translate(-50%,-50%) scaleX(0.9)}' +
      '25%{opacity:0.75;transform:translate(-52%,-50%) scaleX(1.02)}' +
      '50%{opacity:0.4;transform:translate(-48%,-50%) scaleX(0.95)}' +
      '75%{opacity:0.7;transform:translate(-51%,-50%) scaleX(1.0)}}' +

    /* 白鲤路径：从右上到左下的流畅弧线，始终面朝左下方 */
    '@keyframes lh-koi2-swim{' +
      '0%{left:105%;top:8%;opacity:0;transform:scaleX(-1) rotate(20deg)}' +
      '5%{opacity:0.5;transform:scaleX(-1) rotate(20deg)}' +
      '18%{left:78%;top:22%;transform:scaleX(-1) rotate(25deg)}' +
      '36%{left:52%;top:38%;transform:scaleX(-1) rotate(28deg)}' +
      '54%{left:30%;top:56%;transform:scaleX(-1) rotate(25deg)}' +
      '72%{left:10%;top:74%;transform:scaleX(-1) rotate(22deg)}' +
      '88%{left:-2%;top:86%;opacity:0.5;transform:scaleX(-1) rotate(20deg)}' +
      '100%{left:-8%;top:92%;opacity:0;transform:scaleX(-1) rotate(20deg)}}' +

    /* 白鲤身体波浪：快紧，非对称 stroke，skewY 模拟身体侧弯 */
    '@keyframes lh-koi-wiggle-white{' +
      '0%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '12%{transform:rotate(4deg) scaleX(0.88) skewY(-2.5deg)}' +
      '22%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '34%{transform:rotate(-3deg) scaleX(1.06) skewY(2deg)}' +
      '44%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '56%{transform:rotate(4deg) scaleX(0.9) skewY(-2deg)}' +
      '66%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '78%{transform:rotate(-3deg) scaleX(1.04) skewY(1.5deg)}' +
      '88%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '100%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
    '}' +

    /* 银鲤：近乎直线 L→R 水平漂移，微起伏，深度 scale 0.88→1.12→0.88 */
    '.lh-koi-silver{position:absolute;width:clamp(36px,4.5%,66px);height:clamp(17px,2.2%,30px);z-index:2;' +
      'left:-8%;top:40%;' +
      'animation:lh-koi3-swim 32s ease-in-out infinite;animation-delay:14s;' +
      'filter:drop-shadow(0 2px 5px rgba(140,190,160,0.12));opacity:0.65}' +
    '.lh-koi-silver svg{animation:lh-koi-wiggle-silver 8s ease-in-out infinite;transform-origin:center center}' +
    '.lh-koi-silver::after{content:"";position:absolute;left:0;top:50%;width:180%;height:40%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(160,210,195,0.12) 0%,rgba(180,220,210,0.03) 50%,transparent 80%);' +
      'border-radius:50%;transform:translate(-50%,-50%);' +
      'animation:lh-trail-silver 7s ease-in-out infinite}' +
    '@keyframes lh-trail-silver{0%,100%{opacity:0.25;transform:translate(-50%,-50%)}50%{opacity:0.55;transform:translate(-52%,-48%)}}' +

    '@keyframes lh-koi3-swim{' +
      '0%{left:-8%;top:40%;opacity:0;transform:rotate(0deg) scale(0.88)}' +
      '5%{opacity:0.45;transform:rotate(0.2deg) scale(0.9)}' +
      '18%{left:12%;top:42%;transform:rotate(1deg) scale(0.95)}' +
      '34%{left:32%;top:38%;transform:rotate(-0.5deg) scale(1.04)}' +
      '50%{left:52%;top:43%;transform:rotate(0.5deg) scale(1.12)}' +
      '66%{left:70%;top:37%;transform:rotate(-1deg) scale(1.04)}' +
      '82%{left:88%;top:41%;transform:rotate(0deg) scale(0.94)}' +
      '92%{left:100%;top:40%;opacity:0.45;transform:rotate(0deg) scale(0.88)}' +
      '100%{left:105%;top:40%;opacity:0;transform:rotate(0deg) scale(0.88)}}' +

    /* 银鲤身体波浪：极慢微弯，几乎不动但有生命的起伏 */
    '@keyframes lh-koi-wiggle-silver{' +
      '0%{transform:rotate(0deg) scaleX(0.92) skewY(0deg)}' +
      '20%{transform:rotate(0.6deg) scaleX(0.9) skewY(-1deg)}' +
      '32%{transform:rotate(0.1deg) scaleX(0.93) skewY(-0.2deg)}' +
      '45%{transform:rotate(0deg) scaleX(0.94) skewY(0deg)}' +
      '55%{transform:rotate(-0.4deg) scaleX(0.91) skewY(0.8deg)}' +
      '65%{transform:rotate(-0.1deg) scaleX(0.93) skewY(0.2deg)}' +
      '75%{transform:rotate(0deg) scaleX(0.94) skewY(0deg)}' +
      '88%{transform:rotate(0.5deg) scaleX(0.9) skewY(-0.7deg)}' +
      '100%{transform:rotate(0deg) scaleX(0.92) skewY(0deg)}' +
    '}' +

    /* 玄鲤：之字形 3 次急停转向，探索者性格 */
    '.lh-koi-dark{position:absolute;width:clamp(39px,5%,70px);height:clamp(19px,2.5%,33px);z-index:2;' +
      'left:-8%;top:14%;' +
      'animation:lh-koi4-swim 24s ease-in-out infinite;animation-delay:20s;' +
      'filter:drop-shadow(0 2px 4px rgba(180,160,200,0.1));opacity:0.55}' +
    '.lh-koi-dark svg{animation:lh-koi-wiggle-dark 2.5s ease-in-out infinite;transform-origin:center center}' +
    '.lh-koi-dark::after{content:"";position:absolute;left:0;top:50%;width:110%;height:45%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(180,155,210,0.15) 0%,rgba(200,180,225,0.03) 40%,transparent 75%);' +
      'border-radius:50%;transform:translate(-45%,-50%);' +
      'animation:lh-trail-dark 4.5s ease-in-out infinite}' +
    '@keyframes lh-trail-dark{0%,100%{opacity:0.2;transform:translate(-45%,-50%) scaleX(0.85)}' +
      '30%{opacity:0.65;transform:translate(-48%,-52%) scaleX(1.04)}' +
      '60%{opacity:0.3;transform:translate(-42%,-48%) scaleX(0.92)}' +
      '80%{opacity:0.55;transform:translate(-46%,-50%) scaleX(0.98)}}' +

    '@keyframes lh-koi4-swim{' +
      '0%{left:-8%;top:14%;opacity:0;transform:rotate(-5deg)}' +
      '5%{opacity:0.45;transform:rotate(-5deg)}' +
      '15%{left:10%;top:12%;transform:rotate(-8deg)}' +
      '22%{left:16%;top:12%;transform:rotate(-8deg)}' +
      '30%{left:30%;top:28%;transform:rotate(25deg)}' +
      '40%{left:38%;top:40%;transform:rotate(25deg)}' +
      '48%{left:52%;top:30%;transform:rotate(-20deg)}' +
      '55%{left:58%;top:28%;transform:rotate(-20deg)}' +
      '64%{left:72%;top:52%;transform:rotate(30deg)}' +
      '74%{left:84%;top:60%;transform:rotate(30deg)}' +
      '86%{left:96%;top:66%;transform:rotate(20deg)}' +
      '92%{left:102%;top:70%;opacity:0.45;transform:rotate(15deg)}' +
      '100%{left:105%;top:74%;opacity:0;transform:rotate(15deg)}}' +

    /* 玄鲤变速摆尾：急转弯爆冲 + 缓慢恢复，skewY 模拟折身 */
    '@keyframes lh-koi-wiggle-dark{' +
      '0%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '6%{transform:rotate(5deg) scaleX(0.84) skewY(-3deg)}' +
      '12%{transform:rotate(2deg) scaleX(0.95) skewY(-1deg)}' +
      '20%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '30%{transform:rotate(-4deg) scaleX(1.07) skewY(2.5deg)}' +
      '38%{transform:rotate(-1deg) scaleX(1.02) skewY(0.5deg)}' +
      '46%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '60%{transform:rotate(3deg) scaleX(0.92) skewY(-1.5deg)}' +
      '68%{transform:rotate(0.5deg) scaleX(0.98) skewY(-0.3deg)}' +
      '76%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
      '88%{transform:rotate(-2deg) scaleX(0.96) skewY(1deg)}' +
      '94%{transform:rotate(-0.5deg) scaleX(0.99) skewY(0.2deg)}' +
      '100%{transform:rotate(0deg) scaleX(1) skewY(0deg)}' +
    '}' +

    '/* ═══ 暗色模式 ═══ */' +
    '[data-theme-mode="dark"] .lh-scene{' +
      'background:radial-gradient(ellipse at 40% 45%,' +
      'hsl(var(--accent-hue,150),28%,calc(22% + var(--accent-lightness-offset,0%))) 0%,' +
      'hsl(var(--accent-hue,150),28%,calc(12% + var(--accent-lightness-offset,0%))) 100%)}' +
    '[data-theme-mode="dark"] .lh-water{' +
      'background:radial-gradient(ellipse at 30% 70%,hsla(var(--accent-hue,150),45%,calc(15% + var(--accent-lightness-offset,0%)),0.12) 0%,transparent 50%),' +
      'radial-gradient(ellipse at 72% 35%,hsla(var(--accent-hue,150),42%,calc(12% + var(--accent-lightness-offset,0%)),0.08) 0%,transparent 45%)}' +
    '[data-theme-mode="dark"] .lh-mist-1,[data-theme-mode="dark"] .lh-mist-2,[data-theme-mode="dark"] .lh-mist-3{display:none}' +
    '[data-theme-mode="dark"] .lh-waves,[data-theme-mode="dark"] .lh-waves-2{display:none}' +
    '[data-theme-mode="dark"] .lh-leaf svg{' +
      'filter:drop-shadow(0 0 30px hsla(45,50%,55%,0.35)) drop-shadow(0 0 10px hsla(45,45%,72%,0.5)) brightness(0.7)}' +
    '[data-theme-mode="dark"] .lh-leaf-1 svg{' +
      'filter:drop-shadow(0 0 80px hsla(45,40%,55%,0.15)) drop-shadow(0 0 45px hsla(45,50%,55%,0.4)) drop-shadow(0 0 16px hsla(45,40%,78%,0.55)) blur(0.6px) brightness(0.7)}' +
    '[data-theme-mode="dark"] .lh-leaf-5 svg{' +
      'filter:drop-shadow(0 0 60px hsla(45,40%,55%,0.12)) drop-shadow(0 0 28px hsla(45,50%,55%,0.3)) drop-shadow(0 0 8px hsla(45,40%,72%,0.45)) blur(0.6px) brightness(0.7)}' +
    '[data-theme-mode="dark"] .lh-dewdrop{' +
      'background:radial-gradient(circle at 30% 25%,rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.15) 18%,rgba(255,255,255,0.02) 50%,' +
      'hsla(var(--accent-hue,150),40%,30%,0.2) 75%,hsla(var(--accent-hue,150),30%,15%,0.35) 100%);' +
      'box-shadow:0 1.5px 3px hsla(var(--accent-hue,150),30%,10%,0.3),' +
      'inset 0 -1px 2px hsla(var(--accent-hue,150),30%,8%,0.25)}' +
    '[data-theme-mode="dark"] .lh-dewdrop-slide{' +
      'background:radial-gradient(circle at 30% 25%,rgba(255,255,255,0.9) 0%,rgba(255,255,255,0.15) 18%,rgba(255,255,255,0.02) 50%,' +
      'hsla(var(--accent-hue,150),40%,30%,0.2) 75%,hsla(var(--accent-hue,150),30%,15%,0.35) 100%);' +
      'box-shadow:0 1.5px 3px hsla(var(--accent-hue,150),30%,10%,0.3),' +
      'inset 0 -1px 2px hsla(var(--accent-hue,150),30%,8%,0.25)}' +
    '[data-theme-mode="dark"] .lh-ripple-inner{' +
      'border-color:hsla(45,55%,55%,0.5);' +
      'box-shadow:0 0 6px hsla(45,55%,55%,0.18)}' +
    '[data-theme-mode="dark"] .lh-ripple-outer{' +
      'border-color:hsla(45,50%,50%,0.25)}' +
    '[data-theme-mode="dark"] .lh-drop-ripple{' +
      'border-color:hsla(45,55%,55%,0.5);' +
      'box-shadow:0 0 5px hsla(45,55%,55%,0.22)}' +
    '[data-theme-mode="dark"] .lh-particle{' +
      'background:hsla(var(--accent-hue,150),45%,25%,0.08)}' +
    '[data-theme-mode="dark"] .lh-flower svg{' +
      'filter:drop-shadow(0 0 12px hsla(45,40%,70%,0.35)) drop-shadow(0 0 30px hsla(45,35%,60%,0.15)) blur(1.2px)}' +
    '[data-theme-mode="dark"] .lh-leaf::after{' +
      'content:"";position:absolute;width:22px;height:22px;left:50%;top:50%;margin:-11px 0 0 -11px;' +
      'border-radius:50%;background:radial-gradient(circle,hsla(45,45%,80%,0.5) 0%,transparent 75%);' +
      'pointer-events:none;z-index:10;transform:translateY(-30%)}' +
    '[data-theme-mode="dark"] .lh-koi{' +
      'filter:drop-shadow(0 0 6px rgba(255,100,60,0.7)) drop-shadow(0 0 18px rgba(255,130,90,0.4)) drop-shadow(0 0 45px rgba(255,150,110,0.2)) brightness(1.8)}' +
    '[data-theme-mode="dark"] .lh-koi-white{' +
      'filter:drop-shadow(0 0 6px rgba(255,220,100,0.7)) drop-shadow(0 0 18px rgba(255,240,160,0.4)) drop-shadow(0 0 45px rgba(255,240,180,0.2)) brightness(1.6)}' +
    '[data-theme-mode="dark"] .lh-koi-silver{' +
      'filter:drop-shadow(0 0 5px rgba(140,220,190,0.6)) drop-shadow(0 0 14px rgba(160,240,210,0.3)) brightness(1.4)}' +
    '[data-theme-mode="dark"] .lh-koi-dark{' +
      'filter:drop-shadow(0 0 5px rgba(200,170,220,0.5)) drop-shadow(0 0 12px rgba(220,190,240,0.25)) brightness(1.3)}' +

    /* 萤火虫 */
    '.lh-firefly{position:absolute;width:4px;height:4px;border-radius:50%;pointer-events:none;display:none;z-index:9;' +
      'background:#f0f8a0;box-shadow:0 0 8px #f0f8a0,0 0 20px rgba(200,240,80,0.7),0 0 45px rgba(180,220,60,0.35)}' +
    '[data-theme-mode="dark"] .lh-firefly{display:block}' +
    '@keyframes lh-ff1{0%,100%{transform:translate(0,0);opacity:0}12%{opacity:0.9;transform:translate(60px,-50px)}25%{opacity:0.12;transform:translate(-30px,-90px)}45%{opacity:0.85;transform:translate(-70px,-30px)}65%{opacity:0.08;transform:translate(-40px,50px)}80%{opacity:0.7;transform:translate(50px,-20px)}}' +
    '@keyframes lh-ff2{0%,100%{transform:translate(0,0);opacity:0}18%{opacity:0.8;transform:translate(-55px,-45px)}38%{opacity:0.1;transform:translate(-80px,30px)}55%{opacity:0.9;transform:translate(30px,-60px)}72%{opacity:0.15;transform:translate(60px,-15px)}88%{opacity:0.6;transform:translate(-15px,-35px)}}' +
    '@keyframes lh-ff3{0%,100%{transform:translate(0,0);opacity:0}10%{opacity:0.7;transform:translate(50px,30px)}28%{opacity:0.08;transform:translate(-60px,-70px)}48%{opacity:0.9;transform:translate(-35px,25px)}66%{opacity:0.12;transform:translate(55px,-40px)}82%{opacity:0.7;transform:translate(-20px,-50px)}}' +
    '@keyframes lh-ff4{0%,100%{transform:translate(0,0);opacity:0}14%{opacity:0.6;transform:translate(-45px,-60px)}32%{opacity:0.9;transform:translate(35px,-85px)}50%{opacity:0.1;transform:translate(-65px,-30px)}68%{opacity:0.8;transform:translate(50px,25px)}84%{opacity:0.15;transform:translate(-30px,-40px)}}' +
    '@keyframes lh-ff5{0%,100%{transform:translate(0,0);opacity:0}15%{opacity:0.85;transform:translate(-65px,20px)}30%{opacity:0.1;transform:translate(-30px,-50px)}50%{opacity:0.7;transform:translate(55px,-30px)}68%{opacity:0.08;transform:translate(40px,45px)}84%{opacity:0.8;transform:translate(-40px,-20px)}}' +
    '@keyframes lh-ff6{0%,100%{transform:translate(0,0);opacity:0}11%{opacity:0.75;transform:translate(45px,-65px)}26%{opacity:0.1;transform:translate(-50px,20px)}44%{opacity:0.9;transform:translate(30px,-55px)}60%{opacity:0.12;transform:translate(-70px,-25px)}76%{opacity:0.7;transform:translate(25px,35px)}90%{opacity:0.08;transform:translate(-35px,-45px)}}' +
    '@keyframes lh-ff7{0%,100%{transform:translate(0,0);opacity:0}13%{opacity:0.9;transform:translate(-60px,-40px)}30%{opacity:0.08;transform:translate(50px,-60px)}47%{opacity:0.75;transform:translate(35px,40px)}62%{opacity:0.15;transform:translate(-45px,-20px)}78%{opacity:0.85;transform:translate(15px,-55px)}}' +
    '@keyframes lh-ff8{0%,100%{transform:translate(0,0);opacity:0}16%{opacity:0.6;transform:translate(30px,-45px)}34%{opacity:0.85;transform:translate(-55px,-35px)}50%{opacity:0.1;transform:translate(40px,-70px)}66%{opacity:0.9;transform:translate(-25px,30px)}82%{opacity:0.15;transform:translate(-50px,-15px)}}' +
    '@keyframes lh-ff9{0%,100%{transform:translate(0,0);opacity:0}10%{opacity:0.8;transform:translate(35px,-55px)}28%{opacity:0.1;transform:translate(-65px,-20px)}46%{opacity:0.7;transform:translate(-20px,45px)}62%{opacity:0.08;transform:translate(50px,-35px)}78%{opacity:0.9;transform:translate(10px,-60px)}}' +
    '@keyframes lh-ffa{0%,100%{transform:translate(0,0);opacity:0}14%{opacity:0.85;transform:translate(-70px,-50px)}32%{opacity:0.12;transform:translate(40px,20px)}50%{opacity:0.7;transform:translate(-30px,-70px)}66%{opacity:0.1;transform:translate(60px,-15px)}82%{opacity:0.8;transform:translate(-20px,35px)}}' +
    '@keyframes lh-ffb{0%,100%{transform:translate(0,0);opacity:0}12%{opacity:0.7;transform:translate(-50px,35px)}26%{opacity:0.9;transform:translate(45px,-45px)}44%{opacity:0.08;transform:translate(15px,-70px)}60%{opacity:0.75;transform:translate(-60px,-10px)}76%{opacity:0.1;transform:translate(35px,25px)}90%{opacity:0.85;transform:translate(-25px,-40px)}}' +
    '@keyframes lh-ffc{0%,100%{transform:translate(0,0);opacity:0}15%{opacity:0.8;transform:translate(55px,-35px)}30%{opacity:0.1;transform:translate(-35px,-60px)}48%{opacity:0.9;transform:translate(-55px,15px)}64%{opacity:0.12;transform:translate(25px,40px)}80%{opacity:0.7;transform:translate(-45px,-25px)}}' +
    '</style>' +

    '<div class="lh-scene">' +
      '<div class="lh-water"></div>' +
      '<div class="lh-waves">' + waveLayerSVG('a', 1) + '</div>' +
      '<div class="lh-waves-2">' + waveLayerSVG('b', 0.7) + '</div>' +
      particles +
      ripples +
      '<div class="lh-firefly" style="left:28%;top:35%;animation:lh-ff1 7s ease-in-out infinite"></div>' +
      '<div class="lh-firefly" style="left:65%;top:50%;animation:lh-ff2 8s ease-in-out infinite;animation-delay:-3s"></div>' +
      '<div class="lh-firefly" style="left:48%;top:28%;animation:lh-ff3 9s ease-in-out infinite;animation-delay:-1s"></div>' +
      '<div class="lh-firefly" style="left:78%;top:62%;animation:lh-ff4 7.5s ease-in-out infinite;animation-delay:-5s"></div>' +
      '<div class="lh-firefly" style="left:12%;top:55%;animation:lh-ff5 6.5s ease-in-out infinite;animation-delay:-2s"></div>' +
      '<div class="lh-firefly" style="left:55%;top:75%;animation:lh-ff6 8.5s ease-in-out infinite;animation-delay:-4s"></div>' +
      '<div class="lh-firefly" style="left:35%;top:12%;animation:lh-ff7 7s ease-in-out infinite;animation-delay:-6s"></div>' +
      '<div class="lh-firefly" style="left:85%;top:38%;animation:lh-ff8 6s ease-in-out infinite;animation-delay:-1.5s"></div>' +
      '<div class="lh-firefly" style="left:8%;top:20%;animation:lh-ff9 7.5s ease-in-out infinite;animation-delay:-0.5s"></div>' +
      '<div class="lh-firefly" style="left:72%;top:18%;animation:lh-ffa 8s ease-in-out infinite;animation-delay:-3.5s"></div>' +
      '<div class="lh-firefly" style="left:42%;top:82%;animation:lh-ffb 6.5s ease-in-out infinite;animation-delay:-4.5s"></div>' +
      '<div class="lh-firefly" style="left:90%;top:70%;animation:lh-ffc 7s ease-in-out infinite;animation-delay:-2.5s"></div>' +
      '<div class="lh-koi">' + koiFishSVG() + '</div>' +
      '<div class="lh-koi-white">' + koiWhiteSVG() + '</div>' +
      '<div class="lh-koi-silver">' + koiSilverSVG() + '</div>' +
      '<div class="lh-koi-dark">' + koiDarkSVG() + '</div>' +
      leaves +
      '<div class="lh-flower">' + lotusFlowerSVG() + '</div>' +
      '<div class="lh-mist lh-mist-2"></div>' +
      '<div class="lh-mist lh-mist-1"></div>' +
      '<div class="lh-mist lh-mist-3"></div>' +
    '</div>';
  },

  init: function (container) {
    // 尺寸与等比缩放交由框架「设计画布契约」统一处理（design: 480×480），主题无需自行缩放。
    this._container = container || null;
  },

  destroy: function () {
    this._container = null;
  }
};

window.__bamboo_theme_荷塘鱼影 = theme;
