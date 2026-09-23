/* 竹林动效主题
 * © 2026 羽鳞君。保留所有权利。
 * 本主题为「竹林」插件用户专享内容：
 *   · 仅限已安装并使用本插件（bamboo-immortals）的用户在插件内使用；
 *   · 未经作者书面授权，任何人不得复制、转载、再分发、转售，
 *     亦不得在本插件之外以任何形式（含个人学习/自用）使用；
 *   · 违反上述条款将追究法律责任。
 */
// 文件名: 雪原木屋.js  →  变量名: __bamboo_theme_雪原木屋
const theme = {
  name: '雪原木屋',
  author: '羽鳞君',
  license: '竹林用户专享 · 未经授权禁止使用（含个人使用） © 2026 羽鳞君 保留所有权利',

  render() {
    return `
<style>
.bamboo-root {
  --bh: var(--accent-hue, 210);
  --alo: var(--accent-lightness-offset, 0%);
  /* 明亮模式（白蓝日间）默认值 */
  --bg:          hsl(var(--bh), 30%, calc(98% + var(--alo)));
  --sky-top:     hsl(var(--bh), 28%, calc(66% + var(--alo)));
  --sky-mid:     hsl(var(--bh), 28%, calc(88% + var(--alo)));
  --sky-bottom:  hsl(var(--bh), 50%, calc(99% + var(--alo)));
  --sky-haze:    hsl(var(--bh), 50%, calc(99% + var(--alo)));
  --snow-1:      hsl(var(--bh), 25%, calc(94% + var(--alo)));
  --snow-2:      hsl(var(--bh), 28%, calc(98% + var(--alo)));
  --snow-3:      hsl(var(--bh), 30%, calc(99% + var(--alo)));
  --snow-surface:hsl(var(--bh), 28%, calc(98% + var(--alo)));
  --mt-ultra:    hsl(var(--bh), 25%, calc(84% + var(--alo)));
  --mt-far-top:  hsl(var(--bh), 30%, calc(74% + var(--alo)));
  --mt-far-mid:  hsl(var(--bh), 32%, calc(61% + var(--alo)));
  --mt-far-low:  hsl(var(--bh), 35%, calc(48% + var(--alo)));
  --mt-near-top: hsl(var(--bh), 35%, calc(54% + var(--alo)));
  --mt-near-mid: hsl(var(--bh), 38%, calc(41% + var(--alo)));
  --mt-near-low: hsl(var(--bh), 40%, calc(28% + var(--alo)));
  --mt-mid:      hsl(var(--bh), 32%, calc(71% + var(--alo)));
  --cabin-wall:  hsl(calc(var(--bh) - 10), 45%, calc(34% + var(--alo)));
  --cabin-roof:  hsl(calc(var(--bh) - 15), 50%, calc(20% + var(--alo)));
  --cabin-dark:  hsl(calc(var(--bh) - 10), 55%, calc(15% + var(--alo)));
  --window:      hsl(42, 90%, 62%);
  --window-glow: hsl(42, 92%, 58%);
  --bird:        hsl(var(--bh), 30%, calc(41% + var(--alo)));
  --dog-light:   hsl(38, 50%, 55%);
  --dog-dark:    hsl(35, 50%, 35%);
  --dog-collar:  hsl(0, 80%, 50%);
  --dog-eye:     hsl(30, 30%, 15%);
  --smoke:       hsl(var(--bh), 15%, calc(91% + var(--alo)));
  --mist-1:      hsl(var(--bh), 15%, calc(84% + var(--alo)));
  --mist-2:      hsl(var(--bh), 18%, calc(78% + var(--alo)));
  --flake-far:   hsl(var(--bh), 20%, calc(99% + var(--alo)));
  --flake-mid:   hsl(var(--bh), 15%, calc(99% + var(--alo)));
  --flake-near:  hsl(var(--bh), 10%, calc(99% + var(--alo)));
  --track:       hsl(var(--bh), 30%, calc(75% + var(--alo)));
  --mt-op-ultra: 0.18;
  --mt-op-far:   0.3;
  --mt-op-mid:   0.15;
}
[data-theme-mode="dark"] .bamboo-root {
  /* 暗色模式（月夜雪景） */
  --bg:          hsl(var(--bh), 25%, calc(7% + var(--alo)));
  --sky-top:     hsl(var(--bh), 40%, calc(5% + var(--alo)));
  --sky-mid:     hsl(var(--bh), 35%, calc(12% + var(--alo)));
  --sky-bottom:  hsl(var(--bh), 30%, calc(22% + var(--alo)));
  --sky-haze:    hsl(var(--bh), 30%, calc(22% + var(--alo)));
  --snow-1:      hsl(var(--bh), 18%, calc(28% + var(--alo)));
  --snow-2:      hsl(var(--bh), 20%, calc(36% + var(--alo)));
  --snow-3:      hsl(var(--bh), 22%, calc(44% + var(--alo)));
  --snow-surface:hsl(var(--bh), 20%, calc(36% + var(--alo)));
  --mt-ultra:    hsl(var(--bh), 20%, calc(32% + var(--alo)));
  --mt-far-top:  hsl(var(--bh), 25%, calc(28% + var(--alo)));
  --mt-far-mid:  hsl(var(--bh), 25%, calc(20% + var(--alo)));
  --mt-far-low:  hsl(var(--bh), 25%, calc(14% + var(--alo)));
  --mt-near-top: hsl(var(--bh), 30%, calc(18% + var(--alo)));
  --mt-near-mid: hsl(var(--bh), 30%, calc(12% + var(--alo)));
  --mt-near-low: hsl(var(--bh), 32%, calc(6% + var(--alo)));
  --mt-mid:      hsl(var(--bh), 28%, calc(22% + var(--alo)));
  --cabin-wall:  hsl(calc(var(--bh) - 10), 35%, calc(12% + var(--alo)));
  --cabin-roof:  hsl(calc(var(--bh) - 15), 40%, calc(7% + var(--alo)));
  --cabin-dark:  hsl(calc(var(--bh) - 10), 45%, calc(4% + var(--alo)));
  --bird:        hsl(var(--bh), 25%, calc(22% + var(--alo)));
  --dog-light:   hsl(38, 35%, 40%);
  --dog-dark:    hsl(35, 35%, 25%);
  --dog-collar:  hsl(0, 75%, 50%);
  --dog-eye:     hsl(30, 20%, 10%);
  --smoke:       hsl(var(--bh), 18%, calc(40% + var(--alo)));
  --mist-1:      hsl(var(--bh), 20%, calc(36% + var(--alo)));
  --mist-2:      hsl(var(--bh), 22%, calc(40% + var(--alo)));
  --flake-far:   hsl(var(--bh), 15%, calc(60% + var(--alo)));
  --flake-mid:   hsl(var(--bh), 15%, calc(72% + var(--alo)));
  --flake-near:  hsl(var(--bh), 12%, calc(82% + var(--alo)));
  --track:       hsl(var(--bh), 25%, calc(20% + var(--alo)));
  --mt-op-ultra: 0.7;
  --mt-op-far:   1;
  --mt-op-mid:   1;
}
</style>
<div class="bamboo-root" style="
  width:100%;
  height:300px;
  overflow:hidden;
  border-radius:var(--theme-inner-radius,26px);
  position:relative;
  background:var(--bg);
">
  <svg class="bamboo-svg" viewBox="0 0 1200 600"
       preserveAspectRatio="xMidYMid slice"
       style="width:100%;height:100%;display:block;"
       xmlns="http://www.w3.org/2000/svg">

    <defs>
      <!-- 天空渐变 -->
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="var(--sky-top)"/>
        <stop offset="40%"  stop-color="var(--sky-mid)"/>
        <stop offset="100%" stop-color="var(--sky-bottom)"/>
      </linearGradient>

      <!-- 大气雾霭 -->
      <linearGradient id="skyHaze" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="var(--sky-haze)" stop-opacity="0"/>
        <stop offset="50%"  stop-color="var(--sky-haze)" stop-opacity="0"/>
        <stop offset="80%"  stop-color="var(--sky-haze)" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="var(--sky-bottom)" stop-opacity="0.35"/>
      </linearGradient>

      <!-- 雪地渐变 -->
      <linearGradient id="snowGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="var(--snow-1)"/>
        <stop offset="30%"  stop-color="var(--snow-2)"/>
        <stop offset="100%" stop-color="var(--snow-3)"/>
      </linearGradient>

      <!-- 远山 -->
      <linearGradient id="mtFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="var(--mt-far-top)"/>
        <stop offset="25%"  stop-color="var(--mt-far-mid)"/>
        <stop offset="100%" stop-color="var(--mt-far-low)"/>
      </linearGradient>

      <!-- 近山 -->
      <linearGradient id="mtNear" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="var(--mt-near-top)"/>
        <stop offset="30%"  stop-color="var(--mt-near-mid)"/>
        <stop offset="100%" stop-color="var(--mt-near-low)"/>
      </linearGradient>

      <!-- 超远山 -->
      <linearGradient id="mtUltraFar" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stop-color="var(--mt-ultra)"/>
        <stop offset="30%"  stop-color="var(--mt-far-mid)"/>
        <stop offset="100%" stop-color="var(--mt-far-low)"/>
      </linearGradient>

      <!-- 滤镜 -->
      <filter id="cloudBlur"><feGaussianBlur stdDeviation="3"/></filter>
      <filter id="mountainHaze"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="farMountainHaze"><feGaussianBlur stdDeviation="5"/></filter>
      <filter id="ultraFarMountainHaze"><feGaussianBlur stdDeviation="4"/></filter>
      <filter id="dogBlur"><feGaussianBlur stdDeviation="1.2"/></filter>

      <!-- 裁剪区域 -->
      <clipPath id="sceneClip">
        <rect x="0" y="0" width="1200" height="600"/>
      </clipPath>
    </defs>

    <!-- 天空 -->
    <rect id="sky" x="0" y="0" width="1400" height="400" fill="url(#skyGrad)"/>
    <rect id="skyHazeRect" x="0" y="100" width="1400" height="300" fill="url(#skyHaze)"/>

    <!-- 星星 -->
    <g id="stars">
      <circle class="star" cx="120" cy="40" r="0.8" fill="#fff" opacity="0.25"/>
      <circle class="star" cx="340" cy="25" r="0.7" fill="#fff" opacity="0.18"/>
      <circle class="star" cx="550" cy="50" r="0.9" fill="#fff" opacity="0.22"/>
      <circle class="star" cx="780" cy="30" r="0.6" fill="#fff" opacity="0.15"/>
      <circle class="star" cx="950" cy="55" r="0.8" fill="#fff" opacity="0.20"/>
      <circle class="star" cx="1050"cy="20" r="0.7" fill="#fff" opacity="0.16"/>
      <circle class="star" cx="210" cy="65" r="0.5" fill="#fff" opacity="0.12"/>
      <circle class="star" cx="680" cy="18" r="0.9" fill="#fff" opacity="0.24"/>
    </g>

    <!-- 大雁编队 -->
    <g id="birdFlock">
      <g class="bird bird-lead" transform="translate(0, 0)">
        <line class="wing-l" x1="0" y1="0" x2="-9" y2="-5"
          style="stroke:var(--bird);stroke-width:1.6;stroke-linecap:round"/>
        <line class="wing-r" x1="0" y1="0" x2="9" y2="-5"
          style="stroke:var(--bird);stroke-width:1.6;stroke-linecap:round"/>
      </g>
      <g class="bird" transform="translate(-26, 10)">
        <line class="wing-l" x1="0" y1="0" x2="-8" y2="-4.5"
          style="stroke:var(--bird);stroke-width:1.4;stroke-linecap:round"/>
        <line class="wing-r" x1="0" y1="0" x2="8" y2="-4.5"
          style="stroke:var(--bird);stroke-width:1.4;stroke-linecap:round"/>
      </g>
      <g class="bird" transform="translate(26, 10)">
        <line class="wing-l" x1="0" y1="0" x2="-8" y2="-4.5"
          style="stroke:var(--bird);stroke-width:1.4;stroke-linecap:round"/>
        <line class="wing-r" x1="0" y1="0" x2="8" y2="-4.5"
          style="stroke:var(--bird);stroke-width:1.4;stroke-linecap:round"/>
      </g>
      <g class="bird" transform="translate(-52, 22)">
        <line class="wing-l" x1="0" y1="0" x2="-7" y2="-4"
          style="stroke:var(--bird);stroke-width:1.3;stroke-linecap:round"/>
        <line class="wing-r" x1="0" y1="0" x2="7" y2="-4"
          style="stroke:var(--bird);stroke-width:1.3;stroke-linecap:round"/>
      </g>
      <g class="bird" transform="translate(52, 22)">
        <line class="wing-l" x1="0" y1="0" x2="-7" y2="-4"
          style="stroke:var(--bird);stroke-width:1.3;stroke-linecap:round"/>
        <line class="wing-r" x1="0" y1="0" x2="7" y2="-4"
          style="stroke:var(--bird);stroke-width:1.3;stroke-linecap:round"/>
      </g>
      <g class="bird" transform="translate(-78, 36)">
        <line class="wing-l" x1="0" y1="0" x2="-6" y2="-3.5"
          style="stroke:var(--bird);stroke-width:1.1;stroke-linecap:round"/>
        <line class="wing-r" x1="0" y1="0" x2="6" y2="-3.5"
          style="stroke:var(--bird);stroke-width:1.1;stroke-linecap:round"/>
      </g>
      <g class="bird" transform="translate(78, 36)">
        <line class="wing-l" x1="0" y1="0" x2="-6" y2="-3.5"
          style="stroke:var(--bird);stroke-width:1.1;stroke-linecap:round"/>
        <line class="wing-r" x1="0" y1="0" x2="6" y2="-3.5"
          style="stroke:var(--bird);stroke-width:1.1;stroke-linecap:round"/>
      </g>
    </g>

    <!-- 山脉缩放容器 (init 里动态设 scale) -->
    <g id="mountainsScale">
      <!-- 超远山 -->
      <g id="ultraFarMountains" filter="url(#ultraFarMountainHaze)" opacity="var(--mt-op-ultra)">
        <path d="M-50,360 Q100,340 200,300 Q350,260 500,290 Q650,250 800,280 Q950,240 1100,270 Q1250,250 1400,280 L1450,360 Z" fill="url(#mtUltraFar)"/>
      </g>
      <!-- 远山 -->
      <g id="farMountains" filter="url(#farMountainHaze)" transform="translate(-100, 0)" opacity="var(--mt-op-far)">
        <path d="M-20,350 C40,340 60,260 100,220 C130,195 150,200 180,215 C210,230 230,200 260,175 C290,150 310,140 340,128 C370,140 390,165 420,195 C450,225 470,230 500,220 C530,210 550,185 580,165 C610,145 630,135 660,142 C690,150 710,175 740,200 C770,225 800,230 830,215 C860,200 880,170 910,148 C940,126 960,118 980,125 C1000,132 1020,155 1050,185 C1080,215 1100,230 1130,225 C1160,220 1180,200 1210,180 C1240,160 1260,155 1280,162 C1300,170 1330,200 1360,230 C1380,250 1400,260 1420,270 L1420,350 Z" fill="url(#mtFar)"/>
      </g>
      <!-- 中景山丘 -->
      <g id="midHills" filter="url(#mountainHaze)" transform="translate(-80, 0)" opacity="var(--mt-op-mid)">
        <path d="M0,380 Q50,320 120,340 Q180,290 250,330 Q320,270 400,310 Q480,260 550,300 Q620,250 700,290 Q780,240 850,280 Q920,250 1000,290 Q1080,240 1150,280 Q1220,260 1300,300 Q1360,270 1400,310 L1400,420 L0,420 Z"
          style="fill:var(--mt-mid);opacity:0.4"/>
      </g>
    </g>

    <!-- 木屋（黄金分割点, init 里动态定位） -->
    <g id="cabin" transform="translate(731, 382)">
      <!-- 暖光光晕：贴合房子形状 -->
      <g id="cabinGlow" opacity="0.18" filter="url(#cloudBlur)">
        <rect x="-23" y="-28" width="46" height="28" fill="var(--window-glow)" rx="1"/>
        <polygon points="-29,-28 0,-48 29,-28" fill="var(--window-glow)"/>
      </g>
      <rect x="-20" y="-24" width="40" height="24"
        style="fill:var(--cabin-wall);rx:1"/>
      <polygon points="-25,-24 0,-42 25,-24"
        style="fill:var(--cabin-roof)"/>
      <!-- 屋顶积雪 -->
      <path d="M-26,-24 Q-20,-28 -15,-32 Q-8,-38 0,-42 Q8,-38 15,-32 Q20,-28 26,-24 Q20,-26 15,-30 Q8,-36 0,-40 Q-8,-36 -15,-30 Q-20,-26 -26,-24 Z"
        style="fill:var(--snow-3);opacity:0.9"/>
      <!-- 烟囱 -->
      <rect x="8" y="-42" width="7" height="14"
        style="fill:var(--cabin-roof)"/>
      <rect x="6" y="-44" width="11" height="3"
        style="fill:var(--cabin-dark);rx:0.5"/>
      <!-- 窗户木框 -->
      <rect x="-11" y="-17" width="9" height="8"
        style="fill:var(--window);opacity:0.85;rx:0.5"/>
      <line x1="-6.5" y1="-17" x2="-6.5" y2="-9"
        style="stroke:var(--cabin-wall);stroke-width:0.8"/>
      <line x1="-11" y1="-13" x2="-2" y2="-13"
        style="stroke:var(--cabin-wall);stroke-width:0.8"/>
      <!-- 窗户暖光 -->
      <rect id="windowGlow" x="-13" y="-19" width="13" height="12"
        style="fill:var(--window-glow);opacity:0.15;rx:1" filter="url(#cloudBlur)"/>
      <!-- 门 -->
      <rect x="4" y="-15" width="8" height="15"
        style="fill:var(--cabin-dark);rx:0.5"/>
      <rect x="2" y="0" width="12" height="2"
        style="fill:var(--mt-near-low);rx:0.5"/>
      <!-- 炊烟 -->
      <g id="smokeGroup" filter="url(#cloudBlur)">
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
        <circle class="smoke-puff" cx="11.5" cy="-44" r="3"
          style="fill:var(--smoke);opacity:0"/>
      </g>
    </g>

    <!-- 木屋底部雪雾 -->
    <ellipse class="cabin-snow" cx="731" cy="387" rx="45" ry="7"
      style="fill:var(--snow-3);opacity:0.55" filter="url(#cloudBlur)"/>
    <ellipse class="cabin-snow" cx="731" cy="392" rx="55" ry="9"
      style="fill:var(--snow-3);opacity:0.35" filter="url(#cloudBlur)"/>
    <ellipse class="cabin-snow" cx="731" cy="398" rx="70" ry="11"
      style="fill:var(--snow-3);opacity:0.18" filter="url(#cloudBlur)"/>

    <!-- 雪地 -->
    <rect id="snowGround" x="0" y="380" width="1400" height="250" fill="url(#snowGrad)"/>

    <!-- 奔跑小狗 -->
    <g id="dog" transform="translate(-60, 396) scale(0.38)" filter="url(#dogBlur)">
      <path id="dogTail" d="M-9,1 Q-16,-7 -15,-10"
        style="stroke:var(--dog-light);stroke-width:2.5;fill:none;stroke-linecap:round"/>
      <g id="dogBodyGroup">
        <ellipse cx="0" cy="0" rx="11" ry="5.5"
          style="fill:var(--dog-light)"/>
        <!-- 项圈: 用 accent-hue 原色, 高饱和, 突出 -->
        <rect x="7" y="-4.5" width="3" height="9" rx="0.5"
          style="fill:var(--dog-collar)"/>
        <circle cx="12" cy="-2" r="4.5"
          style="fill:var(--dog-light)"/>
        <polygon points="10,-5.5 8,-0.5 14,-3"
          style="fill:var(--dog-dark)"/>
        <circle cx="14.5" cy="-3" r="0.85"
          style="fill:var(--dog-eye)"/>
        <circle cx="14.2" cy="-3.2" r="0.3" fill="#fff"/>
        <circle cx="16.5" cy="-1.5" r="0.75"
          style="fill:var(--dog-eye)"/>
        <path d="M16,-0.5 Q16.5,0 16.5,1.5"
          style="stroke:var(--dog-collar);stroke-width:0.9;fill:none;stroke-linecap:round"/>
      </g>
      <line id="frontLegL" x1="7" y1="5" x2="5" y2="12"
        style="stroke:var(--dog-dark);stroke-width:2;stroke-linecap:round"/>
      <line id="frontLegR" x1="6" y1="5" x2="8" y2="12"
        style="stroke:var(--dog-light);stroke-width:2;stroke-linecap:round"/>
      <line id="rearLegL" x1="-5" y1="5" x2="-7" y2="12"
        style="stroke:var(--dog-dark);stroke-width:2;stroke-linecap:round"/>
      <line id="rearLegR" x1="-4" y1="5" x2="-2" y2="12"
        style="stroke:var(--dog-light);stroke-width:2;stroke-linecap:round"/>
    </g>

    <!-- 窗户暖光雪地反光 -->
    <ellipse id="windowReflection" cx="720" cy="395" rx="12" ry="4"
      style="fill:var(--window-glow);opacity:0.10" filter="url(#cloudBlur)"/>

    <!-- 胎痕 -->
    <g id="tireTracks">
      <path d="M0,465 Q80,460 160,462 Q240,458 320,460 Q400,456 480,458 Q560,454 640,456 Q720,452 800,454 Q880,450 960,452 Q1040,448 1120,450 Q1200,446 1280,448"
        style="stroke:var(--track);stroke-width:4;fill:none;stroke-dasharray:8,6;opacity:0.5"/>
      <path d="M0,468 Q80,463 160,465 Q240,461 320,463 Q400,459 480,461 Q560,457 640,459 Q720,455 800,457 Q880,453 960,455 Q1040,451 1120,453 Q1200,449 1280,451"
        style="stroke:var(--track);stroke-width:3;fill:none;stroke-dasharray:6,8;opacity:0.35"/>
      <path d="M0,495 Q80,490 160,492 Q240,488 320,490 Q400,486 480,488 Q560,484 640,486 Q720,482 800,484 Q880,480 960,482 Q1040,478 1120,480 Q1200,476 1280,478"
        style="stroke:var(--track);stroke-width:4;fill:none;stroke-dasharray:8,6;opacity:0.5"/>
      <path d="M0,498 Q80,493 160,495 Q240,491 320,493 Q400,489 480,491 Q560,487 640,489 Q720,485 800,487 Q880,483 960,485 Q1040,481 1120,483 Q1200,479 1280,481"
        style="stroke:var(--track);stroke-width:3;fill:none;stroke-dasharray:6,8;opacity:0.35"/>
      <path d="M0,462 Q80,457 160,459 Q240,455 320,457 Q400,453 480,455 Q560,451 640,453 Q720,449 800,451 Q880,447 960,449 Q1040,445 1120,447 Q1200,443 1280,445"
        style="stroke:var(--snow-3);stroke-width:2;fill:none;opacity:0.4"/>
      <path d="M0,501 Q80,496 160,498 Q240,494 320,496 Q400,492 480,494 Q560,490 640,492 Q720,488 800,490 Q880,486 960,488 Q1040,484 1120,486 Q1200,482 1280,484"
        style="stroke:var(--snow-3);stroke-width:2;fill:none;opacity:0.4"/>
    </g>

    <!-- 前景雪丘 -->
    <g id="foregroundSnow" opacity="0.3">
      <ellipse class="fg-snow" cx="200" cy="530" rx="30" ry="4"
        style="fill:var(--snow-3)"/>
      <ellipse class="fg-snow" cx="500" cy="545" rx="25" ry="3"
        style="fill:var(--snow-3)"/>
      <ellipse class="fg-snow" cx="800" cy="535" rx="35" ry="4"
        style="fill:var(--snow-3)"/>
      <ellipse class="fg-snow" cx="1100" cy="550" rx="28" ry="3.5"
        style="fill:var(--snow-3)"/>
      <ellipse class="fg-snow" cx="350" cy="560" rx="20" ry="2.5"
        style="fill:var(--snow-3)"/>
      <ellipse class="fg-snow" cx="700" cy="555" rx="32" ry="3"
        style="fill:var(--snow-3)"/>
      <ellipse class="fg-snow" cx="1000" cy="540" rx="22" ry="3"
        style="fill:var(--snow-3)"/>
    </g>

    <!-- 飘雪 -->
    <g id="snowflakes" clip-path="url(#sceneClip)">
      <!-- 远景: 小慢淡 -->
      <circle class="snowflake" cx="50"  cy="-10" r="1.2" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="130" cy="-10" r="1"   fill="var(--flake-far)" style="opacity:0.3"/>
      <circle class="snowflake" cx="220" cy="-10" r="1.3" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="310" cy="-10" r="1.1" fill="var(--flake-far)" style="opacity:0.3"/>
      <circle class="snowflake" cx="400" cy="-10" r="1.2" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="490" cy="-10" r="1"   fill="var(--flake-far)" style="opacity:0.3"/>
      <circle class="snowflake" cx="580" cy="-10" r="1.3" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="670" cy="-10" r="1.1" fill="var(--flake-far)" style="opacity:0.3"/>
      <circle class="snowflake" cx="760" cy="-10" r="1.2" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="850" cy="-10" r="1"   fill="var(--flake-far)" style="opacity:0.3"/>
      <circle class="snowflake" cx="940" cy="-10" r="1.3" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="1030"cy="-10" r="1.1" fill="var(--flake-far)" style="opacity:0.3"/>
      <circle class="snowflake" cx="1120"cy="-10" r="1.2" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="90"  cy="-10" r="1.1" fill="var(--flake-far)" style="opacity:0.32"/>
      <circle class="snowflake" cx="270" cy="-10" r="1.2" fill="var(--flake-far)" style="opacity:0.33"/>
      <circle class="snowflake" cx="450" cy="-10" r="1"   fill="var(--flake-far)" style="opacity:0.3"/>
      <circle class="snowflake" cx="620" cy="-10" r="1.3" fill="var(--flake-far)" style="opacity:0.35"/>
      <circle class="snowflake" cx="800" cy="-10" r="1.1" fill="var(--flake-far)" style="opacity:0.32"/>
      <circle class="snowflake" cx="990" cy="-10" r="1.2" fill="var(--flake-far)" style="opacity:0.33"/>
      <circle class="snowflake" cx="1170"cy="-10" r="1"   fill="var(--flake-far)" style="opacity:0.3"/>
      <!-- 中景 -->
      <circle class="snowflake" cx="80"  cy="-10" r="2"   fill="var(--flake-mid)" style="opacity:0.55"/>
      <circle class="snowflake" cx="190" cy="-10" r="1.8" fill="var(--flake-mid)" style="opacity:0.5"/>
      <circle class="snowflake" cx="300" cy="-10" r="2.2" fill="var(--flake-mid)" style="opacity:0.55"/>
      <circle class="snowflake" cx="410" cy="-10" r="1.9" fill="var(--flake-mid)" style="opacity:0.5"/>
      <circle class="snowflake" cx="520" cy="-10" r="2.1" fill="var(--flake-mid)" style="opacity:0.55"/>
      <circle class="snowflake" cx="630" cy="-10" r="1.8" fill="var(--flake-mid)" style="opacity:0.5"/>
      <circle class="snowflake" cx="740" cy="-10" r="2"   fill="var(--flake-mid)" style="opacity:0.55"/>
      <circle class="snowflake" cx="850" cy="-10" r="2.2" fill="var(--flake-mid)" style="opacity:0.5"/>
      <circle class="snowflake" cx="960" cy="-10" r="1.9" fill="var(--flake-mid)" style="opacity:0.55"/>
      <circle class="snowflake" cx="1070"cy="-10" r="2.1" fill="var(--flake-mid)" style="opacity:0.5"/>
      <circle class="snowflake" cx="140" cy="-10" r="2"   fill="var(--flake-mid)" style="opacity:0.52"/>
      <circle class="snowflake" cx="360" cy="-10" r="1.9" fill="var(--flake-mid)" style="opacity:0.53"/>
      <circle class="snowflake" cx="580" cy="-10" r="2.1" fill="var(--flake-mid)" style="opacity:0.55"/>
      <circle class="snowflake" cx="800" cy="-10" r="1.8" fill="var(--flake-mid)" style="opacity:0.52"/>
      <circle class="snowflake" cx="1020"cy="-10" r="2"   fill="var(--flake-mid)" style="opacity:0.53"/>
      <!-- 近景: 大快亮 -->
      <circle class="snowflake" cx="60"  cy="-10" r="3"   fill="var(--flake-near)" style="opacity:0.75"/>
      <circle class="snowflake" cx="200" cy="-10" r="3.5" fill="var(--flake-near)" style="opacity:0.8"/>
      <circle class="snowflake" cx="350" cy="-10" r="2.8" fill="var(--flake-near)" style="opacity:0.75"/>
      <circle class="snowflake" cx="500" cy="-10" r="3.2" fill="var(--flake-near)" style="opacity:0.8"/>
      <circle class="snowflake" cx="650" cy="-10" r="3"   fill="var(--flake-near)" style="opacity:0.75"/>
      <circle class="snowflake" cx="800" cy="-10" r="3.5" fill="var(--flake-near)" style="opacity:0.8"/>
      <circle class="snowflake" cx="950" cy="-10" r="2.8" fill="var(--flake-near)" style="opacity:0.75"/>
      <circle class="snowflake" cx="1100"cy="-10" r="3.2" fill="var(--flake-near)" style="opacity:0.8"/>
      <circle class="snowflake" cx="1200"cy="-10" r="3"   fill="var(--flake-near)" style="opacity:0.75"/>
      <circle class="snowflake" cx="130" cy="-10" r="3.3" fill="var(--flake-near)" style="opacity:0.78"/>
      <circle class="snowflake" cx="430" cy="-10" r="2.9" fill="var(--flake-near)" style="opacity:0.76"/>
      <circle class="snowflake" cx="720" cy="-10" r="3.4" fill="var(--flake-near)" style="opacity:0.8"/>
      <circle class="snowflake" cx="1030"cy="-10" r="3.1" fill="var(--flake-near)" style="opacity:0.77"/>
      <circle class="snowflake" cx="1160"cy="-10" r="3.3" fill="var(--flake-near)" style="opacity:0.78"/>
    </g>

  </svg>
</div>`;
  },

  init() {
    var self = this;
    var root = document.querySelector('.bamboo-root');
    if (!root) return;

    self._running = true;
    self._tweens = [];
    self._delayedCalls = [];
    self._mm = null;
    self._root = root;

    // ========== 动态 viewBox: 让内容铺满任意宽度 ==========
    var svgEl = root.querySelector('.bamboo-svg');
    var BASE_H = 600;
    var cw = root.offsetWidth || 800;
    var W = Math.max(800, Math.round(BASE_H * cw / 300));
    if (svgEl) svgEl.setAttribute('viewBox', '0 0 ' + W + ' ' + BASE_H);
    self._W = W;
    // ============================================================

    // 动态设置铺满宽度的元素
    var sky = root.querySelector('#sky');
    if (sky) sky.setAttribute('width', W);
    var skyHazeRect = root.querySelector('#skyHazeRect');
    if (skyHazeRect) skyHazeRect.setAttribute('width', W);
    var snowGround = root.querySelector('#snowGround');
    if (snowGround) snowGround.setAttribute('width', W);
    var clipRect = root.querySelector('#sceneClip rect');
    if (clipRect) clipRect.setAttribute('width', W);

    // 山脉水平缩放铺满
    var mountainsScale = root.querySelector('#mountainsScale');
    if (mountainsScale) {
      mountainsScale.setAttribute('transform', 'scale(' + (W / 1200).toFixed(4) + ', 1)');
    }

    // 木屋定位到黄金分割点
    var cabinX = W * 0.61;
    var cabin = root.querySelector('#cabin');
    if (cabin) cabin.setAttribute('transform', 'translate(' + cabinX.toFixed(1) + ', 382)');

    // 雪雾跟随木屋
    root.querySelectorAll('.cabin-snow').forEach(function(el) {
      el.setAttribute('cx', cabinX.toFixed(1));
    });

    // 窗户反光跟随木屋
    var windowReflection = root.querySelector('#windowReflection');
    if (windowReflection) windowReflection.setAttribute('cx', (cabinX - 11).toFixed(1));

    // 飘雪 / 薄雾 / 前景雪丘按比例缩放 cx
    var ratio = W / 1200;
    ['snowflake', 'fg-snow'].forEach(function(cls) {
      root.querySelectorAll('.' + cls).forEach(function(el) {
        var cx = parseFloat(el.getAttribute('cx'));
        if (!isNaN(cx)) el.setAttribute('cx', (cx * ratio).toFixed(1));
      });
    });

    // GSAP 由 Bamboo Darts 平台 / Obsidian 全局提供; 不存在时自动加载 CDN
    if (typeof gsap === 'undefined') {
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      script.onload = function() { if (self._running) self._startAnimations(); };
      document.head.appendChild(script);
      return;
    }
    this._startAnimations();
  },

  _startAnimations() {
    var self = this;
    var root = self._root;
    var W = self._W;
    if (!root || !self._running) return;

    function addTween(t) { self._tweens.push(t); return t; }
    function addDelayedCall() {
      var dc = gsap.delayedCall.apply(gsap, arguments);
      self._delayedCalls.push(dc);
      return dc;
    }

    var $ = function(sel) { return root.querySelector(sel); };
    var $$ = function(sel) { return root.querySelectorAll(sel); };

    gsap.defaults({ overwrite: 'auto' });

    // ── 炊烟 ──
    var smokePuffs = $$('.smoke-puff');
    var smokeTL = addTween(gsap.timeline({ repeat: -1 }));
    smokePuffs.forEach(function(puff, i) {
      var delay = i * 0.65;
      smokeTL.to(puff, {
        y: function() { return -110 - Math.random() * 50; },
        x: function() { return 30 + Math.random() * 35; },
        duration: 8,
        ease: 'power1.out'
      }, delay);
      smokeTL.fromTo(puff,
        { attr: { r: 2.5 }, opacity: 0 },
        { attr: { r: 14 }, opacity: 0.35, duration: 3, ease: 'power1.out' },
        delay
      );
      smokeTL.to(puff, {
        opacity: 0, attr: { r: 22 }, duration: 5, ease: 'power1.in'
      }, delay + 4);
    });

    // ── 飘雪 ──
    var snowflakes = $$('.snowflake');
    snowflakes.forEach(function(flake, i) {
      var layer = i < 20 ? 0 : i < 35 ? 1 : 2;
      var dur = [14, 9, 6][layer];
      var delay = Math.random() * dur;
      addTween(gsap.fromTo(flake,
        { y: 0 },
        { y: 620, duration: dur + Math.random() * 3, ease: 'none', repeat: -1, delay: delay }
      ));
      addTween(gsap.fromTo(flake,
        { x: 0 },
        {
          x: function() { return (Math.random() - 0.5) * 80; },
          duration: 2.5 + Math.random() * 2,
          ease: 'sine.inOut', repeat: -1, yoyo: true,
          delay: Math.random() * 3
        }
      ));
    });

    // ── 星星闪烁 ──
    var stars = $$('.star');
    stars.forEach(function(star, i) {
      addTween(gsap.to(star, {
        opacity: '+=0.12', duration: 1.5 + Math.random() * 2,
        ease: 'sine.inOut', repeat: -1, yoyo: true,
        delay: Math.random() * 4
      }));
    });

    // ── 大雁 ──
    var birds = $$('.bird');
    var flapTL = addTween(gsap.timeline({ repeat: -1 }));
    birds.forEach(function(bird, i) {
      var wingL = bird.querySelector('.wing-l');
      var wingR = bird.querySelector('.wing-r');
      var isLead = bird.classList.contains('bird-lead');
      var angle = isLead ? 20 : 18;
      var flapDur = isLead ? 0.26 : 0.32;
      var stagger = i * 0.06;
      flapTL.fromTo(wingL,
        { rotation: -angle, transformOrigin: '0 0' },
        { rotation: angle, duration: flapDur, ease: 'sine.inOut' },
        stagger
      );
      flapTL.to(wingL, { rotation: -angle, duration: flapDur, ease: 'sine.inOut' });
      flapTL.fromTo(wingR,
        { rotation: angle, transformOrigin: '0 0' },
        { rotation: -angle, duration: flapDur, ease: 'sine.inOut' },
        stagger
      );
      flapTL.to(wingR, { rotation: angle, duration: flapDur, ease: 'sine.inOut' });
    });

    var flock = $('#birdFlock');
    var flyTL = addTween(gsap.timeline({ repeat: -1, repeatDelay: 22 }));
    addTween(gsap.set(flock, { x: W + 180, y: 65 }));
    flyTL.to(flock, { x: -250, y: 50, duration: 20, ease: 'none' });
    flyTL.to(flock, {
      y: '-=7', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: 3
    }, 0);

    // V 形轻微收放
    var vBreatheTL = addTween(gsap.timeline({ repeat: -1 }));
    birds.forEach(function(bird) {
      if (bird.classList.contains('bird-lead')) return;
      vBreatheTL.to(bird, { x: '+=3', y: '+=1.5', duration: 4, ease: 'sine.inOut' }, 0);
      vBreatheTL.to(bird, { x: '-=3', y: '-=1.5', duration: 4, ease: 'sine.inOut' });
    });

    // ── 窗户暖光 ──
    var windowGlow = $('#windowGlow');
    var windowReflection = $('#windowReflection');
    var cabinGlow = $('#cabinGlow');
    var glowTL = addTween(gsap.timeline({ repeat: -1 }));
    glowTL.to(windowGlow, { opacity: 0.38, duration: 0.8, ease: 'sine.inOut' });
    glowTL.to(windowGlow, { opacity: 0.18, duration: 0.5, ease: 'sine.inOut' });
    glowTL.to(windowGlow, { opacity: 0.45, duration: 0.6, ease: 'sine.inOut' });
    glowTL.to(windowGlow, { opacity: 0.15, duration: 0.7, ease: 'sine.inOut' });
    glowTL.to(windowGlow, { opacity: 0.33, duration: 0.9, ease: 'sine.inOut' });
    glowTL.to(windowGlow, { opacity: 0.22, duration: 0.4, ease: 'sine.inOut' });

    glowTL.to(windowReflection, { opacity: 0.20, duration: 0.8, ease: 'sine.inOut' }, 0);
    glowTL.to(windowReflection, { opacity: 0.08, duration: 0.5, ease: 'sine.inOut' });
    glowTL.to(windowReflection, { opacity: 0.24, duration: 0.6, ease: 'sine.inOut' });
    glowTL.to(windowReflection, { opacity: 0.06, duration: 0.7, ease: 'sine.inOut' });
    glowTL.to(windowReflection, { opacity: 0.18, duration: 0.9, ease: 'sine.inOut' });
    glowTL.to(windowReflection, { opacity: 0.10, duration: 0.4, ease: 'sine.inOut' });

    // 暖光光晕同步脉动
    glowTL.to(cabinGlow, { opacity: 0.20, duration: 0.8, ease: 'sine.inOut' }, 0);
    glowTL.to(cabinGlow, { opacity: 0.06, duration: 0.5, ease: 'sine.inOut' });
    glowTL.to(cabinGlow, { opacity: 0.22, duration: 0.6, ease: 'sine.inOut' });
    glowTL.to(cabinGlow, { opacity: 0.05, duration: 0.7, ease: 'sine.inOut' });
    glowTL.to(cabinGlow, { opacity: 0.15, duration: 0.9, ease: 'sine.inOut' });
    glowTL.to(cabinGlow, { opacity: 0.09, duration: 0.4, ease: 'sine.inOut' });

    // ── 小狗 ──
    var dogEl = $('#dog');
    addTween(gsap.fromTo(dogEl, { x: -80 }, {
      keyframes: [
        { x: W * 0.35, duration: 5, ease: 'none' },
        { x: W * 0.65, duration: 5, ease: 'none' },
        { x: W + 120, duration: 4, ease: 'none' }
      ],
      repeat: -1
    }));
    addTween(gsap.fromTo('#dogBodyGroup', { y: 0 }, { y: -3, duration: 0.16, ease: 'sine.inOut', repeat: -1, yoyo: true }));
    addTween(gsap.to('#dogTail', { rotation: -22, duration: 0.35, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: '-9 1' }));

    var legDur = 0.2;
    var lEase = 'sine.inOut';
    addTween(gsap.fromTo('#frontLegL', { rotation: -15 }, { rotation: 15, duration: legDur, ease: lEase, repeat: -1, yoyo: true, transformOrigin: '7 5' }));
    addTween(gsap.fromTo('#rearLegR',  { rotation: 15 },  { rotation: -15, duration: legDur, ease: lEase, repeat: -1, yoyo: true, transformOrigin: '-4 5' }));
    addTween(gsap.fromTo('#frontLegR', { rotation: 15 },  { rotation: -15, duration: legDur, ease: lEase, repeat: -1, yoyo: true, transformOrigin: '6 5', delay: legDur / 2 }));
    addTween(gsap.fromTo('#rearLegL',  { rotation: -15 }, { rotation: 15,  duration: legDur, ease: lEase, repeat: -1, yoyo: true, transformOrigin: '-5 5', delay: legDur / 2 }));

    // ── 阵风 ──
    var triggerGust = function() {
      if (!self._running) return;
      smokePuffs.forEach(function(puff, i) {
        addTween(gsap.to(puff, { x: '+=40', y: '-=20', duration: 1.5, ease: 'power2.out', delay: i * 0.1 }));
      });
      addDelayedCall(20 + Math.random() * 15, triggerGust);
    };
    addDelayedCall(12 + Math.random() * 8, triggerGust);

    // ── 雁群散开 ──
    var triggerBirdBreak = function() {
      if (!self._running) return;
      var idx = Math.floor(Math.random() * birds.length);
      var bird = birds[idx];
      var wingL = bird.querySelector('.wing-l');
      var wingR = bird.querySelector('.wing-r');
      addTween(gsap.to(wingL, { rotation: '+=12', duration: 0.12, ease: 'power1.out', yoyo: true, repeat: 3 }));
      addTween(gsap.to(wingR, { rotation: '-=12', duration: 0.12, ease: 'power1.out', yoyo: true, repeat: 3 }));
      addTween(gsap.to(bird, {
        x: '+=' + (Math.random() * 6 - 3), y: '+=' + (Math.random() * 4 - 2),
        duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1,
        onComplete: function() { if (self._running) gsap.set(bird, { x: 0, y: 0 }); }
      }));
      addDelayedCall(14 + Math.random() * 10, triggerBirdBreak);
    };
    addDelayedCall(12 + Math.random() * 8, triggerBirdBreak);

    // ── reduced motion (只暂停自己的动画, 不影响全局) ──
    var mm = gsap.matchMedia();
    self._mm = mm;
    mm.add('(prefers-reduced-motion: reduce)', function() {
      self._tweens.forEach(function(t) { t.pause(); });
    });
  },

  destroy() {
    this._running = false;
    // 先 kill delayedCalls (防止回调创建新 tween)
    if (this._delayedCalls) {
      for (var i = 0; i < this._delayedCalls.length; i++) {
        if (this._delayedCalls[i] && this._delayedCalls[i].kill) this._delayedCalls[i].kill();
      }
      this._delayedCalls = [];
    }
    // 再 kill tweens
    if (this._tweens) {
      for (var i = 0; i < this._tweens.length; i++) {
        if (this._tweens[i] && this._tweens[i].kill) this._tweens[i].kill();
      }
      this._tweens = [];
    }
    // revert matchMedia
    if (this._mm) { this._mm.revert(); this._mm = null; }
  }
};

window.__bamboo_theme_雪原木屋 = theme;
