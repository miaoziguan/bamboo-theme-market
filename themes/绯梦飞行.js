/* 竹林动效主题
 * © 2026 羽鳞君。保留所有权利。
 * 本主题为「竹林」插件用户专享内容：
 *   · 仅限已安装并使用本插件（bamboo-immortals）的用户在插件内使用；
 *   · 未经作者书面授权，任何人不得复制、转载、再分发、转售，
 *     亦不得在本插件之外以任何形式（含个人学习/自用）使用；
 *   · 违反上述条款将追究法律责任。
 */
const theme = {
  name: "绯梦飞行",
  author: '羽鳞君',
  license: '竹林用户专享 · 未经授权禁止使用（含个人使用） © 2026 羽鳞君 保留所有权利',

  // 设计基准宽度：所有坐标基于此值
  _BASE_W: 960,
  _BASE_H: 340,

  render() {
    return `
      <style>
        .bubble-theme-container {
          position: relative;
          width: 100%;
          height: 340px;
          border-radius: var(--theme-inner-radius, 26px);
          overflow: hidden;
          background: linear-gradient(145deg, hsl(var(--accent-hue), 40%, calc(97% + var(--accent-lightness-offset, 0%))), hsl(var(--accent-hue), 35%, calc(94% + var(--accent-lightness-offset, 0%))));
          isolation: isolate;
        }

        .bubble-item {
          position: absolute;
          border-radius: 50%;
          box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.25);
          will-change: transform;
        }

        .bubble-item::before,
        .bubble-item::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          background: #fff;
          z-index: 10;
          filter: blur(2px);
        }
        .bubble-item::before { top: 25%; left: 22.5%; width: 15%; height: 15%; }
        .bubble-item::after  { top: 40%; left: 40%;   width: 10%; height: 10%; }

        .bubble-item .glow-ring {
          position: absolute;
          border-radius: 50%;
          inset: 10px;
          filter: blur(8px);
        }

        .bubble-item .glow-ring:nth-child(1) { border-left: 15px solid hsl(calc(var(--accent-hue) + 30), 100%, calc(70% + var(--accent-lightness-offset, 0%))); }
        .bubble-item .glow-ring:nth-child(2) { border-right: 15px solid hsl(var(--accent-hue), 100%, calc(70% + var(--accent-lightness-offset, 0%))); }
        .bubble-item .glow-ring:nth-child(3) { border-top: 15px solid hsl(calc(var(--accent-hue) + 60), 100%, calc(70% + var(--accent-lightness-offset, 0%))); }
        .bubble-item .glow-ring:nth-child(4) { inset: 30px; border-left: 15px solid hsl(var(--accent-hue), 100%, calc(70% + var(--accent-lightness-offset, 0%))); filter: blur(12px); }
        .bubble-item .glow-ring:nth-child(5) { inset: 10px; border-bottom: 10px solid #fff; filter: blur(8px); transform: rotate(330deg); }

        [data-theme-mode="dark"] .bubble-theme-container {
          background: radial-gradient(ellipse at center, hsl(var(--accent-hue), 50%, calc(15% + var(--accent-lightness-offset, 0%))) 0%, hsl(var(--accent-hue), 45%, calc(5% + var(--accent-lightness-offset, 0%))) 50%, hsl(var(--accent-hue), 40%, calc(2% + var(--accent-lightness-offset, 0%))) 100%);
        }
        [data-theme-mode="dark"] .bubble-theme-container .bubble-item {
          filter: brightness(0.35);
        }
        [data-theme-mode="dark"] .bubble-theme-container .ufo-beam {
          background: linear-gradient(180deg, hsla(var(--accent-hue), 20%, calc(90% + var(--accent-lightness-offset, 0%)), 0.65) 0%, hsla(var(--accent-hue), 20%, calc(90% + var(--accent-lightness-offset, 0%)), 0.12) 60%, transparent 100%);
          filter: blur(6px);
          box-shadow: 0 0 20px hsla(var(--accent-hue), 20%, calc(90% + var(--accent-lightness-offset, 0%)), 0.3);
          display: block;
        }

        .ufo {
          position: absolute;
          z-index: 4;
          pointer-events: none;
          will-change: transform, filter, opacity;
        }
        .ufo-dome {
          width: 36px; height: 22px;
          border-radius: 50% 50% 8% 8%;
          background: radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.55) 0%, hsla(var(--accent-hue), 60%, calc(90% + var(--accent-lightness-offset, 0%)), 0.95) 15%, hsla(var(--accent-hue), 50%, calc(78% + var(--accent-lightness-offset, 0%)), 0.75) 55%, hsla(var(--accent-hue), 40%, calc(65% + var(--accent-lightness-offset, 0%)), 0.55));
          box-shadow: inset 2px 3px 8px rgba(255,255,255,0.5), 0 0 6px rgba(255,255,255,0.3);
          position: absolute; top: 0; left: 50%; transform: translateX(-50%);
        }
        .ufo-body {
          width: 88px; height: 18px; border-radius: 50%;
          background: linear-gradient(180deg, hsl(var(--accent-hue), 60%, calc(85% + var(--accent-lightness-offset, 0%))) 0%, hsl(var(--accent-hue), 50%, calc(78% + var(--accent-lightness-offset, 0%))) 45%, hsl(var(--accent-hue), 40%, calc(72% + var(--accent-lightness-offset, 0%))) 100%);
          box-shadow: inset 0 4px 8px rgba(255,255,255,0.6), inset 0 1px 2px rgba(255,255,255,0.35), inset 0 -1px 3px rgba(255,255,255,0.15);
          position: absolute; top: 16px; left: 50%; transform: translateX(-50%);
        }
        .ufo-rim {
          position: absolute; top: 19px; left: 50%; transform: translateX(-50%);
          width: 80px; height: 12px; display: flex; justify-content: space-evenly; align-items: center; z-index: 2;
        }
        .ufo-rim i {
          display: block; width: 5px; height: 5px; border-radius: 50%;
          background: hsl(var(--accent-hue), 60%, calc(85% + var(--accent-lightness-offset, 0%)));
          box-shadow: 0 0 6px 2px hsla(var(--accent-hue), 60%, calc(85% + var(--accent-lightness-offset, 0%)), 0.7);
        }
        .ufo-beam {
          width: 34px; height: 60px; position: absolute; top: 30px; left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(180deg, hsla(var(--accent-hue), 20%, calc(90% + var(--accent-lightness-offset, 0%)), 0.4) 0%, hsla(var(--accent-hue), 20%, calc(90% + var(--accent-lightness-offset, 0%)), 0.06) 60%, transparent 100%);
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0 100%);
          filter: blur(3px); display: none;
        }
        @keyframes tw1 { 0%,100%{opacity:.3} 50%{opacity:.9} }
        @keyframes tw2 { 0%,100%{opacity:.5} 50%{opacity:.15} }
        @keyframes tw3 { 0%,100%{opacity:.2} 50%{opacity:.7} }
        .star-layer {
          position: absolute; top: 0; left: 0;
          width: 1px; height: 1px;
          border-radius: 50%; pointer-events: none; z-index: 5;
          display: none;
        }
        [data-theme-mode="dark"] .bubble-theme-container .star-layer {
          display: block;
        }
      </style>

      <div class="bubble-theme-container" id="bubbleContainer">
        <div class="star-layer stars-1" id="stars1"></div>
        <div class="star-layer stars-2" id="stars2"></div>
        <div class="star-layer stars-3" id="stars3"></div>
        <div class="ufo" id="ufo"><div class="ufo-dome"></div><div class="ufo-body"></div><div class="ufo-rim"><i></i><i></i><i></i><i></i><i></i></div><div class="ufo-beam"></div></div>
      </div>
    `;
  },

  init() {
    var self = this;
    const container = document.getElementById('bubbleContainer');
    if (!container) return;

    const BASE_W = this._BASE_W;
    const BASE_H = this._BASE_H;

    // ── 星星原始坐标（基准 960×340） ──
    const STAR_RAW = {
      s1: [
        [45,28],[185,145],[320,68],[478,205],[615,42],[755,178],
        [890,95],[125,268],[365,298],[548,118],[718,248],[858,308],
        [245,178],[418,52],[675,292],[808,15],[50,185],[585,318],[940,200]
      ],
      s2: [
        [78,88,.5],[228,38,.5],[408,168,.5],[568,88,.5],[718,208,.5],[868,138,.5],
        [148,238,.5],[348,318,.5],[508,258,.5],[668,48,.5],[828,278,.5],[920,60,.5]
      ],
      s3: [
        [25,158,1],[278,218,1],[528,38,1],[778,148,1],[398,278,1],[648,108,1],
        [898,248,1],[168,48,1]
      ]
    };

    // 根据当前容器宽度生成星星 box-shadow
    function buildStarShadow(raw, scaleW, scaleH) {
      return raw.map(function(p) {
        var x = Math.round(p[0] * scaleW);
        var y = Math.round(p[1] * scaleH);
        var r = p[2] !== undefined ? p[2] : 0;
        if (r === 0) return x + 'px ' + y + 'px #fff';
        if (r === .5) return x + 'px ' + y + 'px 0 .5px rgba(255,255,255,.6)';
        return x + 'px ' + y + 'px 0 1px rgba(255,255,255,.4)';
      }).join(',');
    }

    // ── 气泡配置（所有坐标为设计稿像素值）──
    const configs = [
      { size: 120, zoom: 0.55, l: -10, t: -12, d: 0 },
      { size: 120, zoom: 0.62, l: 38,  t: -8,  d: -1.2 },
      { size: 120, zoom: 0.58, l: 86,  t: -14, d: -2.4 },
      { size: 120, zoom: 0.60, l: 134, t: -10, d: -3.6 },
      { size: 120, zoom: 0.54, l: 182, t: -13, d: -4.8 },
      { size: 120, zoom: 0.63, l: 230, t: -9,  d: -6.0 },
      { size: 120, zoom: 0.57, l: 278, t: -15, d: -0.6 },
      { size: 120, zoom: 0.61, l: 326, t: -11, d: -1.8 },
      { size: 120, zoom: 0.56, l: 374, t: -13, d: -3.0 },
      { size: 120, zoom: 0.59, l: 422, t: -8,  d: -4.2 },
      { size: 120, zoom: 0.64, l: 470, t: -14, d: -5.4 },
      { size: 120, zoom: 0.55, l: 518, t: -10, d: -6.6 },
      { size: 120, zoom: 0.60, l: 566, t: -12, d: -0.3 },
      { size: 120, zoom: 0.58, l: 614, t: -9,  d: -1.5 },
      { size: 120, zoom: 0.62, l: 662, t: -15, d: -2.7 },
      { size: 120, zoom: 0.56, l: 710, t: -11, d: -3.9 },
      { size: 120, zoom: 0.61, l: 758, t: -13, d: -5.1 },
      { size: 120, zoom: 0.57, l: 806, t: -8,  d: -6.3 },
      { size: 120, zoom: 0.59, l: 854, t: -14, d: -0.9 },
      { size: 120, zoom: 0.55, l: 902, t: -10, d: -2.1 },
      { size: 120, zoom: 0.63, l: 14,  t: 32,  d: -1.0 },
      { size: 120, zoom: 0.57, l: 62,  t: 36,  d: -2.2 },
      { size: 120, zoom: 0.60, l: 110, t: 30,  d: -3.4 },
      { size: 120, zoom: 0.55, l: 158, t: 34,  d: -4.6 },
      { size: 120, zoom: 0.62, l: 206, t: 31,  d: -5.8 },
      { size: 120, zoom: 0.58, l: 254, t: 35,  d: -0.4 },
      { size: 120, zoom: 0.61, l: 302, t: 29,  d: -1.6 },
      { size: 120, zoom: 0.56, l: 350, t: 33,  d: -2.8 },
      { size: 120, zoom: 0.64, l: 398, t: 31,  d: -4.0 },
      { size: 120, zoom: 0.59, l: 446, t: 36,  d: -5.2 },
      { size: 120, zoom: 0.55, l: 494, t: 30,  d: -6.4 },
      { size: 120, zoom: 0.60, l: 542, t: 34,  d: -0.1 },
      { size: 120, zoom: 0.63, l: 590, t: 32,  d: -1.3 },
      { size: 120, zoom: 0.57, l: 638, t: 35,  d: -2.5 },
      { size: 120, zoom: 0.61, l: 686, t: 29,  d: -3.7 },
      { size: 120, zoom: 0.56, l: 734, t: 33,  d: -4.9 },
      { size: 120, zoom: 0.58, l: 782, t: 31,  d: -6.1 },
      { size: 120, zoom: 0.62, l: 830, t: 36,  d: -0.7 },
      { size: 120, zoom: 0.59, l: 878, t: 30,  d: -1.9 },
      { size: 120, zoom: 0.55, l: 926, t: 34,  d: -3.1 },
      { size: 120, zoom: 0.58, l: -10, t: 76,  d: -2.0 },
      { size: 120, zoom: 0.61, l: 38,  t: 80,  d: -3.2 },
      { size: 120, zoom: 0.56, l: 86,  t: 74,  d: -4.4 },
      { size: 120, zoom: 0.63, l: 134, t: 78,  d: -5.6 },
      { size: 120, zoom: 0.59, l: 182, t: 75,  d: -0.2 },
      { size: 120, zoom: 0.55, l: 230, t: 79,  d: -1.4 },
      { size: 120, zoom: 0.62, l: 278, t: 73,  d: -2.6 },
      { size: 120, zoom: 0.57, l: 326, t: 77,  d: -3.8 },
      { size: 120, zoom: 0.60, l: 374, t: 75,  d: -5.0 },
      { size: 120, zoom: 0.64, l: 422, t: 80,  d: -6.2 },
      { size: 120, zoom: 0.56, l: 470, t: 74,  d: -0.8 },
      { size: 120, zoom: 0.61, l: 518, t: 78,  d: -2.0 },
      { size: 120, zoom: 0.58, l: 566, t: 76,  d: -3.2 },
      { size: 120, zoom: 0.55, l: 614, t: 79,  d: -4.4 },
      { size: 120, zoom: 0.63, l: 662, t: 73,  d: -5.6 },
      { size: 120, zoom: 0.59, l: 710, t: 77,  d: -0.3 },
      { size: 120, zoom: 0.57, l: 758, t: 75,  d: -1.5 },
      { size: 120, zoom: 0.62, l: 806, t: 80,  d: -2.7 },
      { size: 120, zoom: 0.60, l: 854, t: 74,  d: -3.9 },
      { size: 120, zoom: 0.56, l: 902, t: 78,  d: -5.1 },
      { size: 120, zoom: 0.60, l: 14,  t: 120, d: -3.0 },
      { size: 120, zoom: 0.56, l: 62,  t: 124, d: -4.2 },
      { size: 120, zoom: 0.63, l: 110, t: 118, d: -5.4 },
      { size: 120, zoom: 0.58, l: 158, t: 122, d: -6.6 },
      { size: 120, zoom: 0.55, l: 206, t: 119, d: -0.5 },
      { size: 120, zoom: 0.61, l: 254, t: 123, d: -1.7 },
      { size: 120, zoom: 0.57, l: 302, t: 117, d: -2.9 },
      { size: 120, zoom: 0.62, l: 350, t: 121, d: -4.1 },
      { size: 120, zoom: 0.59, l: 398, t: 119, d: -5.3 },
      { size: 120, zoom: 0.55, l: 446, t: 124, d: -6.5 },
      { size: 120, zoom: 0.64, l: 494, t: 118, d: -0.2 },
      { size: 120, zoom: 0.58, l: 542, t: 122, d: -1.4 },
      { size: 120, zoom: 0.61, l: 590, t: 120, d: -2.6 },
      { size: 120, zoom: 0.56, l: 638, t: 123, d: -3.8 },
      { size: 120, zoom: 0.60, l: 686, t: 117, d: -5.0 },
      { size: 120, zoom: 0.63, l: 734, t: 121, d: -6.2 },
      { size: 120, zoom: 0.57, l: 782, t: 119, d: -0.9 },
      { size: 120, zoom: 0.59, l: 830, t: 124, d: -2.1 },
      { size: 120, zoom: 0.55, l: 878, t: 118, d: -3.3 },
      { size: 120, zoom: 0.62, l: 926, t: 122, d: -4.5 },
      { size: 120, zoom: 0.57, l: -10, t: 164, d: -4.0 },
      { size: 120, zoom: 0.62, l: 38,  t: 168, d: -5.2 },
      { size: 120, zoom: 0.55, l: 86,  t: 162, d: -6.4 },
      { size: 120, zoom: 0.60, l: 134, t: 166, d: -0.1 },
      { size: 120, zoom: 0.58, l: 182, t: 163, d: -1.3 },
      { size: 120, zoom: 0.63, l: 230, t: 167, d: -2.5 },
      { size: 120, zoom: 0.56, l: 278, t: 161, d: -3.7 },
      { size: 120, zoom: 0.61, l: 326, t: 165, d: -4.9 },
      { size: 120, zoom: 0.59, l: 374, t: 163, d: -6.1 },
      { size: 120, zoom: 0.55, l: 422, t: 168, d: -0.8 },
      { size: 120, zoom: 0.64, l: 470, t: 162, d: -2.0 },
      { size: 120, zoom: 0.57, l: 518, t: 166, d: -3.2 },
      { size: 120, zoom: 0.60, l: 566, t: 164, d: -4.4 },
      { size: 120, zoom: 0.56, l: 614, t: 167, d: -5.6 },
      { size: 120, zoom: 0.62, l: 662, t: 161, d: -0.4 },
      { size: 120, zoom: 0.58, l: 710, t: 165, d: -1.6 },
      { size: 120, zoom: 0.55, l: 758, t: 163, d: -2.8 },
      { size: 120, zoom: 0.63, l: 806, t: 168, d: -4.0 },
      { size: 120, zoom: 0.61, l: 854, t: 162, d: -5.2 },
      { size: 120, zoom: 0.57, l: 902, t: 166, d: -6.4 },
      { size: 120, zoom: 0.61, l: 14,  t: 208, d: -5.0 },
      { size: 120, zoom: 0.57, l: 62,  t: 212, d: -6.2 },
      { size: 120, zoom: 0.62, l: 110, t: 206, d: -0.7 },
      { size: 120, zoom: 0.56, l: 158, t: 210, d: -1.9 },
      { size: 120, zoom: 0.60, l: 206, t: 207, d: -3.1 },
      { size: 120, zoom: 0.55, l: 254, t: 211, d: -4.3 },
      { size: 120, zoom: 0.63, l: 302, t: 205, d: -5.5 },
      { size: 120, zoom: 0.58, l: 350, t: 209, d: -6.7 },
      { size: 120, zoom: 0.61, l: 398, t: 207, d: -0.4 },
      { size: 120, zoom: 0.56, l: 446, t: 212, d: -1.6 },
      { size: 120, zoom: 0.64, l: 494, t: 206, d: -2.8 },
      { size: 120, zoom: 0.59, l: 542, t: 210, d: -4.0 },
      { size: 120, zoom: 0.55, l: 590, t: 208, d: -5.2 },
      { size: 120, zoom: 0.62, l: 638, t: 211, d: -6.4 },
      { size: 120, zoom: 0.57, l: 686, t: 205, d: -0.1 },
      { size: 120, zoom: 0.60, l: 734, t: 209, d: -1.3 },
      { size: 120, zoom: 0.56, l: 782, t: 207, d: -2.5 },
      { size: 120, zoom: 0.63, l: 830, t: 212, d: -3.7 },
      { size: 120, zoom: 0.58, l: 878, t: 206, d: -4.9 },
      { size: 120, zoom: 0.55, l: 926, t: 210, d: -6.1 },
      { size: 120, zoom: 0.59, l: -10, t: 252, d: -6.0 },
      { size: 120, zoom: 0.55, l: 38,  t: 256, d: -0.5 },
      { size: 120, zoom: 0.62, l: 86,  t: 250, d: -1.7 },
      { size: 120, zoom: 0.57, l: 134, t: 254, d: -2.9 },
      { size: 120, zoom: 0.61, l: 182, t: 251, d: -4.1 },
      { size: 120, zoom: 0.56, l: 230, t: 255, d: -5.3 },
      { size: 120, zoom: 0.63, l: 278, t: 249, d: -6.5 },
      { size: 120, zoom: 0.58, l: 326, t: 253, d: -0.2 },
      { size: 120, zoom: 0.60, l: 374, t: 251, d: -1.4 },
      { size: 120, zoom: 0.55, l: 422, t: 256, d: -2.6 },
      { size: 120, zoom: 0.64, l: 470, t: 250, d: -3.8 },
      { size: 120, zoom: 0.57, l: 518, t: 254, d: -5.0 },
      { size: 120, zoom: 0.61, l: 566, t: 252, d: -6.2 },
      { size: 120, zoom: 0.56, l: 614, t: 255, d: -0.9 },
      { size: 120, zoom: 0.62, l: 662, t: 249, d: -2.1 },
      { size: 120, zoom: 0.58, l: 710, t: 253, d: -3.3 },
      { size: 120, zoom: 0.55, l: 758, t: 251, d: -4.5 },
      { size: 120, zoom: 0.63, l: 806, t: 256, d: -5.7 },
      { size: 120, zoom: 0.59, l: 854, t: 250, d: -0.4 },
      { size: 120, zoom: 0.56, l: 902, t: 254, d: -1.6 },
      { size: 120, zoom: 0.62, l: 14,  t: 296, d: -0.8 },
      { size: 120, zoom: 0.56, l: 62,  t: 300, d: -2.0 },
      { size: 120, zoom: 0.60, l: 110, t: 294, d: -3.2 },
      { size: 120, zoom: 0.55, l: 158, t: 298, d: -4.4 },
      { size: 120, zoom: 0.63, l: 206, t: 295, d: -5.6 },
      { size: 120, zoom: 0.57, l: 254, t: 299, d: -6.8 },
      { size: 120, zoom: 0.61, l: 302, t: 293, d: -0.6 },
      { size: 120, zoom: 0.56, l: 350, t: 297, d: -1.8 },
      { size: 120, zoom: 0.64, l: 398, t: 295, d: -3.0 },
      { size: 120, zoom: 0.58, l: 446, t: 300, d: -4.2 },
      { size: 120, zoom: 0.55, l: 494, t: 294, d: -5.4 },
      { size: 120, zoom: 0.62, l: 542, t: 298, d: -6.6 },
      { size: 120, zoom: 0.57, l: 590, t: 296, d: -0.3 },
      { size: 120, zoom: 0.61, l: 638, t: 299, d: -1.5 },
      { size: 120, zoom: 0.56, l: 686, t: 293, d: -2.7 },
      { size: 120, zoom: 0.60, l: 734, t: 297, d: -3.9 },
      { size: 120, zoom: 0.63, l: 782, t: 295, d: -5.1 },
      { size: 120, zoom: 0.57, l: 830, t: 300, d: -6.3 },
      { size: 120, zoom: 0.59, l: 878, t: 294, d: -0.9 },
      { size: 120, zoom: 0.55, l: 926, t: 298, d: -2.1 }
    ];

    // 存储每个气泡的动画状态和缩放后的实际位置
    var bubbles = [];
    var currentScaleW = 1;
    var currentScaleH = 1;

    // 根据 container 宽度计算缩放并更新布局
    function applyLayout() {
      var cw = container.offsetWidth || BASE_W;
      var ch = container.offsetHeight || BASE_H;
      currentScaleW = cw / BASE_W;
      currentScaleH = ch / BASE_H;

      // 更新星星层
      var s1 = document.getElementById('stars1');
      var s2 = document.getElementById('stars2');
      var s3 = document.getElementById('stars3');
      if (s1) s1.style.boxShadow = buildStarShadow(STAR_RAW.s1, currentScaleW, currentScaleH);
      if (s2) s2.style.boxShadow = buildStarShadow(STAR_RAW.s2, currentScaleW, currentScaleH);
      if (s3) s3.style.boxShadow = buildStarShadow(STAR_RAW.s3, currentScaleW, currentScaleH);

      // 更新气泡位置和大小
      bubbles.forEach(function(b, idx) {
        var cfg = configs[idx];
        var isBig = (idx % 5 === 0 || idx % 7 === 0);
        var isSmall = !isBig && (idx % 11 === 0 || idx % 13 === 0);
        var sizeBoost = isBig ? 1.4 : (isSmall ? 0.6 : 1.0);
        var actualZoom = cfg.zoom * sizeBoost;
        var size = cfg.size * actualZoom * currentScaleW;
        b.el.style.width = size + 'px';
        b.el.style.height = size + 'px';
        b.el.style.left = (cfg.l * currentScaleW) + 'px';
        b.el.style.top = (cfg.t * currentScaleH) + 'px';
        b.el.style.transform = 'scale(' + actualZoom + ')';
        b.centerX = cfg.l * currentScaleW + size / 2;
        b.centerY = cfg.t * currentScaleH + size / 2;
      });
    }

    // 创建气泡 DOM
    configs.forEach(function(cfg, idx) {
      var el = document.createElement('div');
      el.className = 'bubble-item';
      var isBig = (idx % 5 === 0 || idx % 7 === 0);
      var isSmall = !isBig && (idx % 11 === 0 || idx % 13 === 0);
      var sizeBoost = isBig ? 1.4 : (isSmall ? 0.6 : 1.0);

      // 景深效果
      var depth = isSmall ? 'bg' : (isBig ? 'fg' : 'mid');
      if (depth === 'bg') {
        el.style.opacity = '0.5'; el.style.filter = 'blur(1.5px)'; el.style.zIndex = '1';
      } else if (depth === 'fg') {
        el.style.opacity = '1'; el.style.zIndex = '3';
      } else {
        el.style.opacity = '0.8'; el.style.zIndex = '2';
      }

      // 发光环
      for (var i = 1; i <= 5; i++) {
        var ring = document.createElement('span');
        ring.className = 'glow-ring';
        if (i === 1 && idx % 3 === 0) {
          ring.style.borderLeft = '15px solid hsl(calc(var(--accent-hue) + 180), 100%, calc(70% + var(--accent-lightness-offset, 0%)))';
        } else if (i === 1 && idx % 4 === 0) {
          ring.style.borderLeft = '15px solid hsl(calc(var(--accent-hue) + 15), 100%, calc(70% + var(--accent-lightness-offset, 0%)))';
        }
        el.appendChild(ring);
      }

      container.appendChild(el);

      var ampMap = { bg: 12, mid: 20, fg: 28 };
      var actualZoom = cfg.zoom * sizeBoost;
      bubbles.push({
        el: el,
        delay: cfg.d,
        duration: 8,
        freq: 2 * Math.PI / 8,
        amplitude: ampMap[depth],
        centerX: 0,
        centerY: 0,
        actualZoom: actualZoom
      });
    });

    // 首次应用布局
    applyLayout();

    // 监听容器宽度变化
    try {
      var ro = new ResizeObserver(function() { if (!self._ro) return; applyLayout(); });
      ro.observe(container);
      this._ro = ro;
    } catch(e) {}

    // 动画循环
    var startTime = performance.now();
    var animationId = null;

    var animate = function(timestamp) {
      var elapsed = (timestamp - startTime) / 1000;
      var isDark = document.documentElement.classList.contains('dark');

      // ── UFO 路径：计算一次，气泡循环和 UFO 渲染共用 ──
      var period = 10;
      var progress = (elapsed % period) / period;
      var cw = container.offsetWidth;
      var ch = container.offsetHeight;
      var depthScale = 1.3 - progress * 0.9;
      var ufoX = -90 * currentScaleW + progress * (cw + 180 * currentScaleW);
      var ufoY = ch / 2 - Math.sin(progress * 2 * Math.PI) * (ch * 0.35);
      // 气泡用：UFO 中心（含深度偏移，与气泡互动位置吻合）
      var ufoCX = -999, ufoCY = -999;
      var ufo = document.getElementById('ufo');
      if (ufo && isDark) {
        ufoCX = ufoX + 44 * depthScale * currentScaleW;
        ufoCY = ufoY + 24 * depthScale * currentScaleH;
      }

      bubbles.forEach(function(b) {
        var offset = Math.sin((elapsed + b.delay) * b.freq) * b.amplitude * currentScaleH;
        var scale = b.actualZoom;
        if (isDark && ufoCX > -900) {
          var dx = b.centerX - ufoCX;
          var dy = (b.centerY + offset) - ufoCY;
          var dist = Math.sqrt(dx * dx + dy * dy);
          var radius = 110 * currentScaleW;
          if (dist < radius) {
            var t = 1 - dist / radius;
            b.el.style.filter = 'brightness(' + (0.35 + t * 1.15) + ')';
            b.el.style.transform = 'scale(' + scale + ') translateX(' + (t * 4 * currentScaleW) + 'px) translateY(' + offset + 'px)';
            return;
          }
        }
        b.el.style.filter = isDark ? 'brightness(0.35)' : '';
        b.el.style.transform = 'scale(' + scale + ') translateY(' + offset + 'px)';
      });

      if (ufo) {
        var depth = progress;
        var depthOpacity = 1.0 - depth * 0.6;
        var depthBlur = depth * 3.5;
        var glowStrength = (1.0 - depth) * 5 + 2;
        ufo.style.zIndex = depth < 0.33 ? '4' : (depth < 0.66 ? '2' : '1');
        ufo.style.filter = 'drop-shadow(0 0 ' + glowStrength + 'px hsla(var(--accent-hue), 50%, calc(65% + var(--accent-lightness-offset, 0%)), 0.3)) drop-shadow(0 0 ' + (glowStrength * 2.5) + 'px hsla(var(--accent-hue), 50%, calc(85% + var(--accent-lightness-offset, 0%)), 0.12)) blur(' + depthBlur + 'px)';
        ufo.style.opacity = depthOpacity;
        ufo.style.transform = 'translate(' + ufoX + 'px,' + ufoY + 'px) scale(' + depthScale + ') rotate(' + (-Math.cos(progress * 2 * Math.PI) * 15) + 'deg)';
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // 清理函数
    this._destroy = function() {
      if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
      if (this._ro)   { this._ro.disconnect(); this._ro = null; }
      while (container.firstChild) { container.removeChild(container.firstChild); }
    };
  },

  destroy() {
    if (this._destroy) { this._destroy(); this._destroy = null; }
  }
};

window.__bamboo_theme_绯梦飞行 = theme;
