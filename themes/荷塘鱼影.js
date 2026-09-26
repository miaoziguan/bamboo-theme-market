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

/* ═══════════════════════════════════════════════════════════════════
   锦鲤运动学模型（三条时间尺度解耦）
   A 轨迹层：样条路径 + 冲滑速度剖面 → CSS motion path。浏览器按真实切线
              定向，姿态天然贴合；offset-distance 沿弧长线性插值，密采样
              只用于编码速度，不存在「折线抄近道」问题。
   B 身段层：体廓横截面叠加「振幅向后递增 + 相位向后滞后」的侧向行波，
              用 CSS 动画插值 SVG d 属性直接形变体廓——头稳尾摆的真行波，
              而非整只鱼一起剪切的刚体。
   C 附肢层：尾鳍绕尾柄旋转且相位再滞后；胸鳍独立扇动（与摆尾非同频）。
   ═══════════════════════════════════════════════════════════════════ */

// 数值压缩：去掉前导 0 与多余小数位（SVG path 与 CSS 均接受 .5 写法）
function kn(v) {
  var s = (Math.round(v * 100) / 100).toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  return s.replace(/^(-?)0\./, '$1.');
}

// Catmull-Rom 转三次贝塞尔：得到过点平滑曲线；各帧命令结构完全一致，d 才能插值
function koiSmooth(pts) {
  var d = '';
  for (var i = 0; i < pts.length - 1; i++) {
    var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || pts[i + 1];
    d += 'C' + kn(p1[0] + (p2[0] - p0[0]) / 6) + ',' + kn(p1[1] + (p2[1] - p0[1]) / 6) + ' ' +
      kn(p2[0] - (p3[0] - p1[0]) / 6) + ',' + kn(p2[1] - (p3[1] - p1[1]) / 6) + ' ' +
      kn(p2[0]) + ',' + kn(p2[1]) + ' ';
  }
  return d;
}

// 体型剖面：[体轴 x, 上缘半高, 下缘半高]
// 数值直接取自原手绘体廓（M22,-1 Q8,-8 -6,-9 Q-20,-5 -28,-1 …）的采样点，
// 因此叠加行波后仍是同一条写意鱼——只是这条鱼现在会弯了。
function koiProfile() {
  return [[22, 1, 1], [15, 4.1, 3.7], [8, 6.5, 5.8], [1, 8.1, 7.2], [-6, 9, 8],
    [-12.6, 7, 6.1], [-18.5, 5, 4.3], [-23.6, 3, 2.6], [-28, 1, 1]];
}

// 侧向行波：振幅沿体轴向后递增、相位向后滞后 → 真行波（头稳尾摆）
// 指数取 1.7 而非 2：增长更缓，避免体廓在 1/3 体长处出现折角
function koiWave(u, p, o) {
  var A = o.amp * (0.12 + 0.88 * Math.pow(u, 1.7));
  return A * Math.sin(2 * Math.PI * (u / o.lam - p) + o.phi);
}

// 由体轴 x 反查行波参数 u（背鳍等挂点用）
function koiUAt(x, prof) {
  for (var i = 0; i < prof.length - 1; i++) {
    if (x >= prof[i + 1][0]) {
      var span = prof[i][0] - prof[i + 1][0] || 1;
      return (i + (prof[i][0] - x) / span) / (prof.length - 1);
    }
  }
  return 1;
}

// 体廓 + 背鳍子路径（背鳍基部略沉入体内，形变时不会露缝）
// 坐标系即 SVG 用户坐标：脊线 y=0、吻端 x=+22、尾柄 x=-27、尾鳍尖 x=-45
function koiFleshD(p, o) {
  var prof = o.prof, top = [], bot = [], i, u, x, dy;
  for (i = 0; i < prof.length; i++) {
    u = i / (prof.length - 1);
    x = prof[i][0];
    dy = koiWave(u, p, o);
    top.push([x, -prof[i][1] + dy]);
    bot.push([x, prof[i][2] + dy]);
  }
  var d = 'M' + kn(top[0][0]) + ',' + kn(top[0][1]) + ' ' + koiSmooth(top) +
    'L' + kn(bot[bot.length - 1][0]) + ',' + kn(bot[bot.length - 1][1]) + ' ' +
    koiSmooth(bot.reverse()) + 'Z';
  var fin = '';
  for (i = 0; i < o.fin.length; i++) {
    x = o.fin[i][0];
    dy = koiWave(koiUAt(x, prof), p, o);
    fin += (i ? 'L' : 'M') + kn(x) + ',' + kn(o.fin[i][1] + dy);
  }
  return d + ' ' + fin + 'Z';
}

// 体色：g 体长三色 / fin 鳍色 / fin2 鳍端色 / hl 脊背高光 / sh 两胁暗部
//       ray 鳍射线与鳃盖线 / patch 斑纹
function koiPalettes() {
  return {
    red: { g: ['#d64545', '#c43030', '#a01818'], fin: '#d64545', fin2: '#e8736b',
      hl: 'rgba(255,235,225,0.26)', sh: 'rgba(72,4,4,0.17)', ray: 'rgba(255,226,216,0.5)', patch: 'rgba(255,245,240,0.14)' },
    white: { g: ['#f5d060', '#e8c040', '#c89820'], fin: '#e8c040', fin2: '#f5e08a',
      hl: 'rgba(255,255,238,0.3)', sh: 'rgba(84,52,4,0.17)', ray: 'rgba(255,248,214,0.55)', patch: 'rgba(255,252,236,0.18)' },
    silver: { g: ['#b4e2d6', '#86c4ad', '#5f9e88'], fin: '#8cc8b0', fin2: '#b8e0d0',
      hl: 'rgba(255,255,255,0.3)', sh: 'rgba(22,62,52,0.17)', ray: 'rgba(240,255,250,0.5)', patch: 'rgba(255,255,255,0.2)' },
    dark: { g: ['#dbcce8', '#b2a2c6', '#8b7aa4'], fin: '#b2a2c6', fin2: '#cdbfe0',
      hl: 'rgba(250,245,255,0.28)', sh: 'rgba(44,24,64,0.17)', ray: 'rgba(245,238,255,0.45)', patch: 'rgba(255,255,255,0.13)' }
  };
}

// 尾鳍射线：沿上下叶外缘按比例取目标点，自尾柄发散（两端留白，成鳍条感）
function koiCubic(p0, p1, p2, p3, t) {
  var k = 1 - t;
  return [k * k * k * p0[0] + 3 * k * k * t * p1[0] + 3 * k * t * t * p2[0] + t * t * t * p3[0],
    k * k * k * p0[1] + 3 * k * k * t * p1[1] + 3 * k * t * t * p2[1] + t * t * t * p3[1]];
}

function koiTailRays() {
  var lobes = [
    [[-26, -1.6], [-30, -6], [-37, -12], [-43.5, -11.5]],
    [[-26, 1.6], [-30, 6], [-37, 12], [-43.5, 11.5]]
  ];
  var d = '';
  for (var e = 0; e < 2; e++) {
    var c = lobes[e], root = c[0];
    for (var k = 1; k <= 4; k++) {
      var tip = koiCubic(c[0], c[1], c[2], c[3], k / 4.7);
      d += 'M' + kn(root[0] + (tip[0] - root[0]) * 0.2) + ',' + kn(root[1] + (tip[1] - root[1]) * 0.2) +
        'L' + kn(root[0] + (tip[0] - root[0]) * 0.84) + ',' + kn(root[1] + (tip[1] - root[1]) * 0.84) + ' ';
    }
  }
  return d;
}

// 单条鱼 SVG：三层结构
//   ① 底色层 kh-f：沿体长渐变，承「尾亮头深」的颜色识别
//   ② 体量层 kh-v：与底色层共用同一份 d 动画（同一个 @keyframes，不额外增加关键帧），
//      以 objectBoundingBox 竖向渐变压暗两胁、提亮脊背 → 圆背体积感；渐变随包围盒走，
//      所以鱼身弯成 S 时高光仍在体轴中线上
//   ③ 附肢层：尾鳍（单块深分叉扇形 + 鳍条射线 + 叶根辐射渐变）、胸鳍（半透明叶形）、
//      鳃盖弧、斑纹（有机形状而非椭圆，贴脊背不触边）
// 写意俯视鱼：左右对称、无眼；朝向由「尾鳍分叉在后、体廓收窄在前」读出。
function koiSVG(id, pal, o) {
  var flesh = koiFleshD(0, o);
  /* 尾鳍：一块连续深分叉扇形；叶根前伸 2 单位埋进体内，
     且整组绘制在体廓之后 —— 无论怎么侧移/旋转，接缝都被身体盖住，绝不脱节 */
  var tail = 'M-26,-1.6 C-30,-6 -37,-12 -43.5,-11.5 ' +
    'C-41.2,-7.5 -38.2,-3.4 -36.2,-0.5 C-38.2,3.4 -41.2,7.5 -43.5,11.5 ' +
    'C-37,12 -30,6 -26,1.6 Z';
  /* 胸鳍：根部同样埋进体内 1 单位以上，绘制在体廓之后 */
  var pector = function (s) {
    return 'M15.4,' + kn(s * 3) + ' C12.4,' + kn(s * 6.4) + ' 9.6,' + kn(s * 9.6) + ' 8.4,' + kn(s * 11.8) +
      ' C11.8,' + kn(s * 11.2) + ' 14.2,' + kn(s * 8.2) + ' 13.6,' + kn(s * 4.4) + ' Z';
  };
  return '<svg viewBox="' + o.vb + '" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%">' +
    '<defs>' +
      /* 体色沿体长：userSpaceOnUse 只沿体轴 → 形变不会在背鳍基部弦线上留色差缝 */
      '<linearGradient id="kb' + id + '" gradientUnits="userSpaceOnUse" x1="-45" y1="0" x2="22" y2="0">' +
        '<stop offset="0%" stop-color="' + pal.g[0] + '" />' +
        '<stop offset="45%" stop-color="' + pal.g[1] + '" />' +
        '<stop offset="100%" stop-color="' + pal.g[2] + '" />' +
      '</linearGradient>' +
      /* 体量：两胁压暗 → 中段透明 → 脊背提亮 */
      '<linearGradient id="kv' + id + '" x1="0%" y1="0%" x2="0%" y2="100%">' +
        '<stop offset="0%" stop-color="' + pal.sh + '" />' +
        '<stop offset="20%" stop-color="' + pal.sh + '" stop-opacity="0" />' +
        '<stop offset="50%" stop-color="' + pal.hl + '" />' +
        '<stop offset="80%" stop-color="' + pal.sh + '" stop-opacity="0" />' +
        '<stop offset="100%" stop-color="' + pal.sh + '" />' +
      '</linearGradient>' +
      /* 尾鳍：叶根实、叶缘淡（尾鳍组只平移旋转，坐标系稳定，可用 userSpaceOnUse） */
      '<radialGradient id="kt' + id + '" gradientUnits="userSpaceOnUse" cx="-27" cy="0" r="18">' +
        '<stop offset="0%" stop-color="' + pal.fin + '" stop-opacity="0.88" />' +
        '<stop offset="55%" stop-color="' + pal.fin + '" stop-opacity="0.72" />' +
        '<stop offset="100%" stop-color="' + pal.fin2 + '" stop-opacity="0.44" />' +
      '</radialGradient>' +
      /* 胸鳍：根实端淡（objectBoundingBox → 上下两鳍自动同向渐变） */
      '<linearGradient id="kp' + id + '" x1="100%" y1="50%" x2="0%" y2="50%">' +
        '<stop offset="0%" stop-color="' + pal.fin2 + '" stop-opacity="0.78" />' +
        '<stop offset="100%" stop-color="' + pal.fin2 + '" stop-opacity="0.34" />' +
      '</linearGradient>' +
    '</defs>' +
    '<g class="kh-t' + id + '">' +
      '<path d="' + tail + '" fill="url(#kt' + id + ')" />' +
      '<path d="' + koiTailRays() + '" stroke="' + pal.ray + '" stroke-width="0.45" fill="none" opacity="0.4" />' +
    '</g>' +
    '<g class="kh-p1' + id + '"><path d="' + pector(-1) + '" fill="url(#kp' + id + ')" /></g>' +
    '<g class="kh-p2' + id + '"><path d="' + pector(1) + '" fill="url(#kp' + id + ')" /></g>' +
    '<path class="kh-f' + id + '" d="' + flesh + '" fill="url(#kb' + id + ')" />' +
    '<path class="kh-v' + id + '" d="' + flesh + '" fill="url(#kv' + id + ')" />' +
    '<g class="kh-m' + id + '">' +
      /* 鳃盖：头后一道弧 */
      '<path d="M11.4,-4 C14,-1.4 14,1.4 11.4,4" stroke="' + pal.ray + '" stroke-width="0.6" fill="none" opacity="0.28" />' +
      /* 白斑：分置两侧不对称（避开中线的脊背高光，否则叠加成一片白雾），
         位置也贴近真实锦鲤的斑型 */
      '<ellipse cx="2.6" cy="-3.6" rx="6.2" ry="2.2" fill="' + pal.patch + '" transform="rotate(-8 2.6 -3.6)" />' +
      '<ellipse cx="-9.6" cy="2.9" rx="4.6" ry="1.8" fill="' + pal.patch + '" opacity="0.85" transform="rotate(6 -9.6 2.9)" />' +
      /* 脊背鳞光 */
      '<path d="M-20,-0.4 Q-2,-1.5 17,-0.5" stroke="' + pal.ray + '" stroke-width="0.45" fill="none" opacity="0.4" />' +
    '</g>' +
  '</svg>';
}

// 胸鳍扇动：绕鳍根小幅摆动，周期与摆尾错开（0.72 倍）→ 避免机械同步
// sign 同时决定枢轴所在侧（p1 在体轴负侧）与摆向，两鳍因而天然镜像
function koiPectKF(name, o, sign) {
  var p = 'transform:translate(14.5px,' + kn(sign * 3.7) + 'px) rotate(';
  var q = 'deg) translate(-14.5px,' + kn(-sign * 3.7) + 'px)';
  return '@keyframes ' + name + '{' +
    '0%{' + p + kn(sign * 8) + q + '}' +
    '50%{' + p + kn(-sign * 3) + q + '}' +
    '100%{' + p + kn(sign * 8) + q + '}' +
  '}';
}

// 斑纹平移：跟随体轴中段（u≈0.5）的行波，避免纹样从体廓里飘出去
function koiMarkKF(name, o) {
  var N = o.samples, css = '@keyframes ' + name + '{';
  for (var i = 0; i <= N; i++) {
    css += pct(i / N) + '%{transform:translate(0,' + kn(koiWave(o.markU, i / N, o)) + 'px)}';
  }
  return css + '}';
}

// 关键帧百分比：0/100 不带小数，其余保留一位
function pct(f) {
  var pc = Math.round(f * 1000) / 10;
  return pc === 0 || pc === 100 ? String(pc) : pc.toFixed(1);
}

// 体轴 x 反查（koiUAt 的逆，供尾柄切向角计算）
function koiXAt(u, prof) {
  var f = u * (prof.length - 1), i = Math.min(prof.length - 2, Math.floor(f));
  return prof[i][0] + (prof[i + 1][0] - prof[i][0]) * (f - i);
}

// 体廓行波关键帧：每拍采样 samples 帧
function koiWaveKF(name, o) {
  var css = '@keyframes ' + name + '{';
  for (var i = 0; i <= o.samples; i++) {
    css += pct(i / o.samples) + '%{d:path("' + koiFleshD(i / o.samples, o) + '")}';
  }
  return css + '}';
}

// 尾鳍关键帧：平移贴合尾柄侧移（不脱节）+ 绕尾柄旋转（相位再滞后 → 拖尾感）
function koiTailKF(name, o) {
  var pr = o.prof, u0 = 0.86, x0 = koiXAt(u0, pr), x1 = pr[pr.length - 1][0];
  var css = '@keyframes ' + name + '{';
  for (var i = 0; i <= o.samples; i++) {
    var p = i / o.samples, lag = p - o.tailLag;
    var ang = Math.atan2(koiWave(1, lag, o) - koiWave(u0, lag, o), x1 - x0) * 180 / Math.PI - 180;
    css += pct(p) + '%{transform:translate(0,' + kn(koiWave(1, p, o)) + 'px) ' +
      'translate(-27px,0) rotate(' + kn(ang) + 'deg) translate(27px,0)}';
  }
  return css + '}';
}

/* ═══ A 轨迹层 ═══
   Catmull-Rom 控制点 → 三次贝塞尔（路径串与取点共用，保证一致）
   时间→弧长：u(τ)=τ−a·sin(2πnτ)/(2πn)，du/dτ=1−a·cos ∈ [1−a,1+a] 恒正不倒退；
   a 越大「一冲一滑」对比越强。offset-distance 走弧长百分比，浏览器按真实
   切线定向，故姿态天然贴合轨迹，且密采样只用于编码速度、不存在折线抄近道。 */
function koiCR(p0, p1, p2, p3) {
  return [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6,
    p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
}

function koiBez(p1, c, p2, t) {
  var k = 1 - t, a = k * k * k, b = 3 * k * k * t, e = 3 * k * t * t, f = t * t * t;
  return [a * p1[0] + b * c[0] + e * c[2] + f * p2[0], a * p1[1] + b * c[1] + e * c[3] + f * p2[1]];
}

function koiTrack(o) {
  var cp = [], i, k;
  for (i = 0; i < o.pts.length; i++) cp.push([o.pts[i][0] * 4.8, o.pts[i][1] * 4.8]);
  var n = cp.length, segs = [], last = cp[n - 1];
  for (i = 0; i < n - 1; i++) {
    var p0 = cp[i - 1] || cp[i], p2 = cp[i + 1], p3 = cp[i + 2] || cp[i + 1];
    segs.push({ p1: cp[i], p2: p2, c: koiCR(p0, cp[i], p2, p3) });
  }
  // 路径串：M + C 段（稀疏但精确）
  var s = 'M' + kn(cp[0][0]) + ' ' + kn(cp[0][1]);
  for (i = 0; i < segs.length; i++) {
    s += 'C' + kn(segs[i].c[0]) + ' ' + kn(segs[i].c[1]) + ' ' + kn(segs[i].c[2]) + ' ' +
      kn(segs[i].c[3]) + ' ' + kn(segs[i].p2[0]) + ' ' + kn(segs[i].p2[1]);
  }
  o.pathStr = s;
  // 密集点 + 累积弧长：用于按弧长比例取点（深度/淡入淡出曲线）
  var dense = [cp[0]], acc = [0];
  for (i = 0; i < segs.length; i++) {
    for (k = 1; k <= 14; k++) dense.push(koiBez(segs[i].p1, segs[i].c, segs[i].p2, k / 14));
  }
  for (i = 1; i < dense.length; i++) {
    var dx = dense[i][0] - dense[i - 1][0], dy = dense[i][1] - dense[i - 1][1];
    acc[i] = acc[i - 1] + Math.sqrt(dx * dx + dy * dy);
  }
  var total = acc[acc.length - 1];
  o.atFrac = function (f) {
    var target = Math.max(0, Math.min(1, f)) * total, lo = 0, hi = acc.length - 1, mid;
    while (lo < hi - 1) { mid = (lo + hi) >> 1; if (acc[mid] <= target) lo = mid; else hi = mid; }
    var span = acc[hi] - acc[lo] || 1, r = (target - acc[lo]) / span;
    return [dense[lo][0] + (dense[hi][0] - dense[lo][0]) * r, dense[lo][1] + (dense[hi][1] - dense[lo][1]) * r];
  };
  return last && o;
}

// 巡航关键帧：只编码「弧长进度 + 深度缩放 + 透明度」，朝向交给 offset-rotate
function koiSwimKF(o) {
  var N = o.track, css = '@keyframes ' + o.anim + '{', i, t, u, pt, dep, sc, op, ramp, props;
  var sgn = o.mirror ? 'scaleX(-1) ' : '';
  for (i = 0; i <= N; i++) {
    t = i / N;
    u = t - o.burstA * Math.sin(2 * Math.PI * o.burstN * t) / (2 * Math.PI * o.burstN);
    pt = o.atFrac(u);
    dep = Math.max(0, Math.min(1, pt[1] / 480));      // 画面下方的鱼更近 → 更大更实
    ramp = t < 0.05 ? t / 0.05 : (t > 0.94 ? (1 - t) / 0.06 : 1);
    sc = 0.9 + 0.24 * dep;
    op = o.op * Math.max(0, ramp) * (0.8 + 0.4 * dep);
    props = ['offset-distance:' + (u * 100).toFixed(2) + '%'];
    if (i % 4 === 0 || i === N) props.push('transform:' + sgn + 'scale(' + sc.toFixed(3).replace(/^0/, '') + ')');
    if (i % 2 === 0 || i === N) props.push('opacity:' + op.toFixed(3).replace(/^0\./, '.'));
    css += pct(t) + '%{' + props.join(';') + '}';
  }
  return css + '}';
}

// 四条鱼：体型/速度/摆尾/姿态各异。pts 为画面百分比，命中点=鱼身几何中心
function koiSpecs() {
  var prof = koiProfile();
  /* 背鳍：低矮后掠的圆钝叶形（原来偏高，读起来像「背包」）；基部沉入体背内侧防脱缝 */
  var fin = [[1.4, -7.6], [-0.8, -9.6], [-3, -11], [-5.4, -11], [-7.4, -9.6], [-9, -7.6]];
  var base = { prof: prof, fin: fin, vb: '-52 -23 80 46', lam: 0.8, samples: 10,
    markU: 0.5, tailLag: 0.12, track: 40, cls: '', anim: '' };
  var raw = [
    { id: 'red', cls: 'lh-koi', anim: 'lh-koi-swim', w: 42, z: 3, lap: 26, beat: 1.35,
      amp: 3.4, phi: 0.6, op: 0.95, delay: 0, burstA: 0.72, burstN: 2,
      filter: 'drop-shadow(0 2px 6px rgba(180,30,30,0.16)) drop-shadow(0 0 .5px rgba(255,255,255,0.4)) blur(0.45px)',
      pts: [[-12, 98], [0, 74], [7, 50], [12, 37], [22, 30], [36, 34], [50, 39], [63, 33], [76, 22], [88, 12], [104, 3]] },
    /* 白鲤：右上 → 左下，镜像游动，故用 offset-rotate:auto 180deg + scaleX(-1) 保持腹部朝下 */
    { id: 'white', cls: 'lh-koi-white', anim: 'lh-koi2-swim', w: 37, z: 3, lap: 28, beat: 1.75,
      amp: 2.7, phi: 1.4, op: 0.9, delay: 8, burstA: 0.6, burstN: 2, mirror: true,
      filter: 'drop-shadow(0 2px 6px rgba(180,140,50,0.13)) drop-shadow(0 0 .5px rgba(255,255,255,0.35)) blur(0.4px)',
      pts: [[106, 6], [92, 16], [76, 26], [60, 36], [44, 47], [28, 58], [14, 70], [2, 82], [-10, 94]] },
    /* 银鲤：近水平慢漂，摆尾极缓，姿态克制 */
    { id: 'silver', cls: 'lh-koi-silver', anim: 'lh-koi3-swim', w: 36, z: 2, lap: 32, beat: 3,
      amp: 1.6, phi: 2.2, op: 0.78, delay: 14, burstA: 0.45, burstN: 1,
      filter: 'drop-shadow(0 2px 5px rgba(140,190,160,0.12)) blur(0.35px)',
      pts: [[-10, 44], [8, 40], [26, 43], [44, 38], [62, 42], [80, 39], [96, 41], [108, 40]] },
    /* 玄鲤：之字形探索，急冲急转 + 高频摆尾 */
    { id: 'dark', cls: 'lh-koi-dark', anim: 'lh-koi4-swim', w: 39, z: 2, lap: 24, beat: 1.05,
      amp: 3.1, phi: 0.2, op: 0.72, delay: 20, burstA: 0.6, burstN: 4,
      filter: 'drop-shadow(0 2px 4px rgba(180,160,200,0.1)) blur(0.35px)',
      pts: [[-10, 10], [4, 13], [14, 11], [24, 30], [33, 44], [42, 26], [50, 22], [60, 44], [70, 58], [82, 62], [94, 68], [106, 72]] }
  ];
  var out = [], i, j, o;
  for (i = 0; i < raw.length; i++) {
    o = {};
    for (j in base) o[j] = base[j];
    for (j in raw[i]) o[j] = raw[i][j];
    koiTrack(o);
    out.push(o);
  }
  return out;
}

/* ═══ 装配：CSS 与 DOM 一次性生成（同一份 spec，避免两处参数漂移） ═══ */
function koiFishCSS(o) {
  var c = '.' + o.cls, id = o.id, h = (o.w * 46 / 80).toFixed(1);
  var css = c + '{position:absolute;left:0;top:0;width:' + o.w + 'px;height:' + h + 'px;z-index:' + o.z + ';' +
    'offset-path:path("' + o.pathStr + '");offset-rotate:auto' + (o.mirror ? ' 180deg' : '') + ';' +
    'opacity:' + o.op + ';will-change:offset-distance;' +
    'animation:' + o.anim + ' ' + o.lap + 's linear infinite;animation-delay:' + o.delay + 's;' +
    'filter:' + o.filter + '}' + koiSwimKF(o);
  css += c + ' svg g{transform-origin:0 0}';
  /* 底色层与体量层共用同一份 d 关键帧：一层承担体色、一层承担明暗 */
  css += c + ' svg .kh-f' + id + ',' + c + ' svg .kh-v' + id + '{animation:khw' + id + ' ' + o.beat + 's linear infinite}' +
    koiWaveKF('khw' + id, o);
  css += c + ' svg .kh-t' + id + '{animation:kht' + id + ' ' + o.beat + 's linear infinite}' + koiTailKF('kht' + id, o);
  var pb = (o.beat * 0.72).toFixed(2);
  css += c + ' svg .kh-p1' + id + '{animation:khpa' + id + ' ' + pb + 's ease-in-out infinite}' + koiPectKF('khpa' + id, o, -1);
  css += c + ' svg .kh-p2' + id + '{animation:khpb' + id + ' ' + pb + 's ease-in-out infinite}' + koiPectKF('khpb' + id, o, 1);
  css += c + ' svg .kh-m' + id + '{animation:khm' + id + ' ' + o.beat + 's linear infinite}' + koiMarkKF('khm' + id, o);
  return css;
}

function koiScene() {
  var P = koiPalettes(), S = koiSpecs(), css = '', html = '', i;
  for (i = 0; i < S.length; i++) {
    css += koiFishCSS(S[i]);
    html += '<div class="' + S[i].cls + '">' + koiSVG(S[i].id, P[S[i].id], S[i]) + '</div>';
  }
  return { css: css, html: html };
}

var theme = {
  name: '荷塘鱼影',
  author: '羽鳞君',
  license: '竹林用户专享 · 未经授权禁止使用（含个人使用） © 2026 羽鳞君 保留所有权利',

  // 设计画布：正方形基准 480×480（1:1，原 512×320 按 ×0.9375 换算）；尺寸与等比缩放由框架统一处理（无需自行适配）
  design: { w: 480, h: 480 },

  render: function () {
    // 四条鱼的 CSS（体廓行波/尾鳍/胸鳍/巡航轨迹）与 DOM 由同一份模型生成
    var K = koiScene();
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

    /* 四条鱼的运动学 CSS（体廓行波 / 尾鳍 / 胸鳍 / 巡航轨迹）全部由模型生成 */
    K.css +
    '.lh-koi::after{content:"";position:absolute;left:0;top:50%;width:140%;height:50%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(200,85,55,0.2) 0%,rgba(200,110,70,0.05) 40%,transparent 75%);' +
      'border-radius:50%;transform:translate(-55%,-50%);' +
      'animation:lh-trail-red 3.2s ease-in-out infinite}' +
    '@keyframes lh-trail-red{0%,100%{opacity:0.4;transform:translate(-55%,-50%) scaleX(0.9)}' +
      '35%{opacity:0.85;transform:translate(-58%,-52%) scaleX(1.05)}' +
      '70%{opacity:0.55;transform:translate(-52%,-48%) scaleX(0.95)}}' +

    '.lh-koi-white::after{content:"";position:absolute;left:0;top:50%;width:100%;height:35%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(240,195,70,0.18) 0%,rgba(240,220,120,0.04) 40%,transparent 75%);' +
      'border-radius:50%;transform:translate(-50%,-50%);' +
      'animation:lh-trail-white 1.2s ease-in-out infinite}' +
    '@keyframes lh-trail-white{0%,100%{opacity:0.35;transform:translate(-50%,-50%) scaleX(0.9)}' +
      '25%{opacity:0.75;transform:translate(-52%,-50%) scaleX(1.02)}' +
      '50%{opacity:0.4;transform:translate(-48%,-50%) scaleX(0.95)}' +
      '75%{opacity:0.7;transform:translate(-51%,-50%) scaleX(1.0)}}' +

    '.lh-koi-silver::after{content:"";position:absolute;left:0;top:50%;width:180%;height:40%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(160,210,195,0.12) 0%,rgba(180,220,210,0.03) 50%,transparent 80%);' +
      'border-radius:50%;transform:translate(-50%,-50%);' +
      'animation:lh-trail-silver 7s ease-in-out infinite}' +
    '@keyframes lh-trail-silver{0%,100%{opacity:0.25;transform:translate(-50%,-50%)}50%{opacity:0.55;transform:translate(-52%,-48%)}}' +

    '.lh-koi-dark::after{content:"";position:absolute;left:0;top:50%;width:110%;height:45%;pointer-events:none;z-index:-1;' +
      'background:radial-gradient(ellipse at 85% center,rgba(180,155,210,0.15) 0%,rgba(200,180,225,0.03) 40%,transparent 75%);' +
      'border-radius:50%;transform:translate(-45%,-50%);' +
      'animation:lh-trail-dark 4.5s ease-in-out infinite}' +
    '@keyframes lh-trail-dark{0%,100%{opacity:0.2;transform:translate(-45%,-50%) scaleX(0.85)}' +
      '30%{opacity:0.65;transform:translate(-48%,-52%) scaleX(1.04)}' +
      '60%{opacity:0.3;transform:translate(-42%,-48%) scaleX(0.92)}' +
      '80%{opacity:0.55;transform:translate(-46%,-50%) scaleX(0.98)}}' +

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
    /* 降低动效：停掉全部动画后，四条鱼会退回各自路径起点（多在画面外），
       故显式把它们沿路径摆到画面内的位置，静态仍是一幅完整构图 */
    '@media (prefers-reduced-motion: reduce){' +
      '.lh-scene *{animation:none !important}' +
      '.lh-koi{offset-distance:26%}' +
      '.lh-koi-white{offset-distance:46%}' +
      '.lh-koi-silver{offset-distance:54%}' +
      '.lh-koi-dark{offset-distance:70%}' +
    '}' +
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
      K.html +
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
