(function buildSpideyCharacter() {
  const wrap = document.getElementById('spiderman');
  if (!wrap) return;

  // Remove img if present
  const oldImg = wrap.querySelector('.spiderman-img');
  if (oldImg) oldImg.remove();

  // Remove old sense wrapper
  const oldSense = wrap.querySelector('.spider-sense-wrap');

  // Create container
  const container = document.createElement('div');
  container.style.cssText = 'position:relative;width:100%;';

  // ── SPIDER-SENSE SVG (above head) ──
  const senseDiv = document.createElement('div');
  senseDiv.className = 'spider-sense-wrap';
  senseDiv.setAttribute('aria-hidden','true');
  senseDiv.innerHTML = `<svg class="spider-sense-svg" viewBox="-80 -55 340 160" fill="none" overflow="visible">
  <style>
    .sl{stroke:#3B5FC8;stroke-linecap:round;stroke-width:2.8;animation:ssP 2.4s ease-in-out infinite;}
    .sl:nth-child(1){animation-delay:0s}.sl:nth-child(2){animation-delay:.34s}.sl:nth-child(3){animation-delay:.68s}
    .sl:nth-child(4){animation-delay:1.02s}.sl:nth-child(5){animation-delay:1.36s}.sl:nth-child(6){animation-delay:1.7s}.sl:nth-child(7){animation-delay:2.04s}
    @keyframes ssP{0%{opacity:0;transform:scale(.82) translateY(3px)}30%{opacity:.9}70%{opacity:.9}100%{opacity:0;transform:scale(1.15) translateY(-5px)}}
    [data-theme="dark"] .sl{stroke:#5578F0}
  </style>
  <path class="sl" d="M100,12 C102,0 105,6 107,-6 C109,-18 112,-12 114,-24"/>
  <path class="sl" d="M76,24 C71,12 68,18 63,6 C58,-6 55,0 50,-12"/>
  <path class="sl" d="M124,24 C129,12 132,18 137,6 C142,-6 145,0 150,-12"/>
  <path class="sl" d="M52,54 C40,49 34,55 22,50 C10,45 4,51 -8,46"/>
  <path class="sl" d="M148,54 C160,49 166,55 178,50 C190,45 196,51 208,46"/>
  <path class="sl" d="M44,78 C32,74 26,80 14,76 C2,72 -4,78 -16,74"/>
  <path class="sl" d="M156,78 C168,74 174,80 186,76 C198,72 204,78 216,74"/>
</svg>`;

  // ── CHARACTER SVG ──
  const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 260 570');
  svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  svg.style.cssText = 'width:100%;height:auto;display:block;animation:spideyFloat 4.2s ease-in-out infinite;filter:drop-shadow(-3px 8px 22px rgba(0,0,0,.55));';
  svg.id = 'spideyCharSvg';

  svg.innerHTML = `
<defs>
  <linearGradient id="rH" x1="30%" y1="0%" x2="70%" y2="100%"><stop offset="0%" stop-color="#FF2828"/><stop offset="55%" stop-color="#CC0C0C"/><stop offset="100%" stop-color="#900000"/></linearGradient>
  <linearGradient id="rB" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stop-color="#EE1515"/><stop offset="60%" stop-color="#BB0A0A"/><stop offset="100%" stop-color="#880000"/></linearGradient>
  <linearGradient id="rA" x1="0%" y1="20%" x2="100%" y2="80%"><stop offset="0%" stop-color="#DD1010"/><stop offset="50%" stop-color="#FF2020"/><stop offset="100%" stop-color="#CC0808"/></linearGradient>
  <linearGradient id="bL" x1="20%" y1="0%" x2="80%" y2="100%"><stop offset="0%" stop-color="#1535DD"/><stop offset="50%" stop-color="#0E25BB"/><stop offset="100%" stop-color="#081580"/></linearGradient>
  <linearGradient id="bP" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#0A1890"/><stop offset="40%" stop-color="#1835DD"/><stop offset="60%" stop-color="#1835DD"/><stop offset="100%" stop-color="#0A1890"/></linearGradient>
  <pattern id="wP" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="15" y2="15" stroke="rgba(0,0,0,.38)" stroke-width=".65"/><line x1="15" y1="0" x2="0" y2="15" stroke="rgba(0,0,0,.38)" stroke-width=".65"/>
    <line x1="7.5" y1="0" x2="7.5" y2="15" stroke="rgba(0,0,0,.18)" stroke-width=".4"/><line x1="0" y1="7.5" x2="15" y2="7.5" stroke="rgba(0,0,0,.18)" stroke-width=".4"/>
  </pattern>
  <filter id="sh"><feDropShadow dx="2" dy="4" stdDeviation="5" flood-color="rgba(0,0,0,.45)"/></filter>
  <clipPath id="hC"><ellipse cx="130" cy="44" rx="37" ry="44"/></clipPath>
  <clipPath id="tC"><path d="M62,96 Q44,125 42,192 L42,300 L218,300 L218,192 Q216,125 198,96 Q172,86 130,84 Q88,86 62,96Z"/></clipPath>
  <clipPath id="lAC"><path d="M42,102 Q34,160 32,220 Q30,280 34,330 L72,330 Q78,280 80,220 Q82,160 78,102Z"/></clipPath>
  <clipPath id="rAC"><path d="M218,102 Q226,160 228,220 Q230,280 226,330 L188,330 Q182,280 180,220 Q178,160 182,102Z"/></clipPath>
</defs>

<!-- ══ LEFT ARM ══ -->
<g id="lArm">
  <path d="M66,100 C56,112 48,138 44,170 Q40,200 42,220 Q44,240 50,248 Q60,255 70,250 Q80,244 82,228 Q86,205 86,172 Q86,138 80,108Z" fill="url(#rA)"/>
  <path d="M66,100 C56,112 48,138 44,170 Q40,200 42,220 Q44,240 50,248 Q60,255 70,250 Q80,244 82,228 Q86,205 86,172 Q86,138 80,108Z" fill="url(#wP)" opacity=".42"/>
  <path d="M68,104 C62,118 58,140 56,168 Q54,192 56,215" stroke="url(#bP)" stroke-width="9" stroke-linecap="round" fill="none" opacity=".52"/>
  <path d="M50,248 Q44,272 40,300 Q38,322 40,340 Q50,350 62,346 Q74,340 76,322 Q80,300 80,272 Q78,255 70,250Z" fill="url(#rA)"/>
  <path d="M50,248 Q44,272 40,300 Q38,322 40,340 Q50,350 62,346 Q74,340 76,322 Q80,300 80,272 Q78,255 70,250Z" fill="url(#wP)" opacity=".42"/>
  <ellipse cx="52" cy="348" rx="16" ry="13" fill="url(#rA)"/>
  <path d="M36,340 Q36,358 52,364 Q68,360 70,346 Q62,346 62,348 Q50,350 40,340Z" fill="url(#rA)"/>
  <path d="M36,340 Q36,358 52,364 Q68,360 70,346 Q62,346 62,348 Q50,350 40,340Z" fill="url(#wP)" opacity=".4"/>
</g>

<!-- ══ RIGHT ARM ══ -->
<g id="rArm">
  <path d="M194,100 C204,112 212,138 216,170 Q220,200 218,220 Q216,240 210,248 Q200,255 190,250 Q180,244 178,228 Q174,205 174,172 Q174,138 180,108Z" fill="url(#rA)"/>
  <path d="M194,100 C204,112 212,138 216,170 Q220,200 218,220 Q216,240 210,248 Q200,255 190,250 Q180,244 178,228 Q174,205 174,172 Q174,138 180,108Z" fill="url(#wP)" opacity=".42"/>
  <path d="M192,104 C198,118 202,140 204,168 Q206,192 204,215" stroke="url(#bP)" stroke-width="9" stroke-linecap="round" fill="none" opacity=".52"/>
  <path d="M210,248 Q216,272 220,300 Q222,322 220,340 Q210,350 198,346 Q186,340 184,322 Q180,300 180,272 Q182,255 190,250Z" fill="url(#rA)"/>
  <path d="M210,248 Q216,272 220,300 Q222,322 220,340 Q210,350 198,346 Q186,340 184,322 Q180,300 180,272 Q182,255 190,250Z" fill="url(#wP)" opacity=".42"/>
  <ellipse cx="208" cy="348" rx="16" ry="13" fill="url(#rA)"/>
  <path d="M224,340 Q224,358 208,364 Q192,360 190,346 Q198,346 198,348 Q210,350 220,340Z" fill="url(#rA)"/>
  <path d="M224,340 Q224,358 208,364 Q192,360 190,346 Q198,346 198,348 Q210,350 220,340Z" fill="url(#wP)" opacity=".4"/>
</g>

<!-- ══ LEFT LEG ══ -->
<g id="lLeg">
  <path d="M94,308 Q82,325 78,365 Q74,398 76,428 Q80,448 90,452 Q102,456 112,448 Q122,438 124,415 Q128,385 128,352 Q128,320 124,305Z" fill="url(#bL)"/>
  <path d="M78,428 Q76,462 78,490 Q82,514 96,520 Q108,524 118,516 Q128,506 128,490 Q128,464 128,448 Q112,456 102,456 Q90,452 78,428Z" fill="url(#bL)"/>
  <path d="M62,508 Q64,526 80,534 Q100,538 120,528 Q128,518 128,505 Q118,516 108,524 Q96,520 82,514 Q76,510 78,490 Q76,498 72,504Z" fill="url(#rB)"/>
  <path d="M62,508 Q64,526 80,534 Q100,538 120,528 Q128,518 128,505 Q118,516 108,524 Q96,520 82,514 Q76,510 78,490 Q76,498 72,504Z" fill="url(#wP)" opacity=".38"/>
  <path d="M62,508 Q58,520 65,530 Q58,526 54,516 Q55,506 62,508Z" fill="url(#rB)"/>
</g>

<!-- ══ RIGHT LEG ══ -->
<g id="rLeg">
  <path d="M166,308 Q178,325 182,365 Q186,398 184,428 Q180,448 170,452 Q158,456 148,448 Q138,438 136,415 Q132,385 132,352 Q132,320 136,305Z" fill="url(#bL)"/>
  <path d="M182,428 Q184,462 182,490 Q178,514 164,520 Q152,524 142,516 Q132,506 132,490 Q132,464 132,448 Q148,456 158,456 Q170,452 182,428Z" fill="url(#bL)"/>
  <path d="M198,508 Q196,526 180,534 Q160,538 140,528 Q132,518 132,505 Q142,516 152,524 Q164,520 178,514 Q184,510 182,490 Q184,498 188,504Z" fill="url(#rB)"/>
  <path d="M198,508 Q196,526 180,534 Q160,538 140,528 Q132,518 132,505 Q142,516 152,524 Q164,520 178,514 Q184,510 182,490 Q184,498 188,504Z" fill="url(#wP)" opacity=".38"/>
  <path d="M198,508 Q202,520 195,530 Q202,526 206,516 Q205,506 198,508Z" fill="url(#rB)"/>
</g>

<!-- ══ TORSO ══ -->
<g id="torso">
  <!-- Main red torso -->
  <path d="M66,96 C50,110 44,148 42,192 Q40,228 52,248 Q68,268 90,272 L90,305 Q110,318 130,320 Q150,318 170,305 L170,272 Q192,268 208,248 Q220,228 218,192 C216,148 210,110 194,96 Q170,86 130,84 Q90,86 66,96Z" fill="url(#rB)" filter="url(#sh)"/>
  <path d="M66,96 C50,110 44,148 42,192 Q40,228 52,248 Q68,268 90,272 L90,305 Q110,318 130,320 Q150,318 170,305 L170,272 Q192,268 208,248 Q220,228 218,192 C216,148 210,110 194,96 Q170,86 130,84 Q90,86 66,96Z" fill="url(#wP)" opacity=".4"/>
  <!-- Blue side panels under arms -->
  <path d="M66,96 C50,110 44,148 42,192 Q42,222 55,240 Q68,256 88,262 Q84,228 82,190 Q82,148 84,112Z" fill="url(#bP)" opacity=".88"/>
  <path d="M194,96 C210,110 216,148 218,192 Q218,222 205,240 Q192,256 172,262 Q176,228 178,190 Q178,148 176,112Z" fill="url(#bP)" opacity=".88"/>
  <!-- Blue lower torso / hips -->
  <path d="M46,235 Q44,265 52,285 Q72,308 130,312 Q188,308 208,285 Q216,265 214,235 Q194,258 130,264 Q66,258 46,235Z" fill="url(#bP)"/>
  <!-- Red belly V-divider (classic Spider-Man H-panel) -->
  <path d="M84,215 L130,258 L176,215 Q166,236 130,240 Q94,236 84,215Z" fill="url(#rB)" opacity=".92"/>
  <!-- Belt -->
  <rect x="80" y="295" width="100" height="14" rx="4" fill="#050C3C"/>
  <rect x="122" y="290" width="16" height="22" rx="3" fill="#0D22AA"/>
  <circle cx="130" cy="302" r="6.5" fill="#1535CC"/>
  <!-- Spider logo -->
  <g transform="translate(130,178) scale(.95)" fill="#0A0A0A">
    <ellipse cx="0" cy="2" rx="12" ry="16"/><ellipse cx="0" cy="-9" rx="7" ry="7"/>
    <path d="M-12,-2 C-22,-6 -28,-3 -30,1" stroke="#0A0A0A" stroke-width="4.2" stroke-linecap="round" fill="none"/>
    <path d="M-12,5 C-22,3 -28,8 -32,12" stroke="#0A0A0A" stroke-width="4.2" stroke-linecap="round" fill="none"/>
    <path d="M-11,11 C-20,15 -24,20 -26,26" stroke="#0A0A0A" stroke-width="3.8" stroke-linecap="round" fill="none"/>
    <path d="M12,-2 C22,-6 28,-3 30,1" stroke="#0A0A0A" stroke-width="4.2" stroke-linecap="round" fill="none"/>
    <path d="M12,5 C22,3 28,8 32,12" stroke="#0A0A0A" stroke-width="4.2" stroke-linecap="round" fill="none"/>
    <path d="M11,11 C20,15 24,20 26,26" stroke="#0A0A0A" stroke-width="3.8" stroke-linecap="round" fill="none"/>
  </g>
</g>

<!-- ══ NECK ══ -->
<rect x="118" y="83" width="24" height="18" rx="4" fill="url(#rH)"/>

<!-- ══ HEAD ══ -->
<g id="head">
  <ellipse cx="130" cy="44" rx="37" ry="44" fill="url(#rH)" filter="url(#sh)"/>
  <!-- Web pattern on head -->
  <g clip-path="url(#hC)" opacity=".62">
    <line x1="130" y1="0" x2="130" y2="88" stroke="rgba(0,0,0,.24)" stroke-width=".8"/>
    <line x1="93" y1="44" x2="167" y2="44" stroke="rgba(0,0,0,.2)" stroke-width=".7"/>
    <path d="M93,20 Q130,8 167,20" fill="none" stroke="rgba(0,0,0,.17)" stroke-width=".68"/>
    <path d="M93,64 Q130,54 167,64" fill="none" stroke="rgba(0,0,0,.17)" stroke-width=".68"/>
    <path d="M93,80 Q130,72 167,80" fill="none" stroke="rgba(0,0,0,.14)" stroke-width=".58"/>
    <line x1="100" y1="4" x2="130" y2="88" stroke="rgba(0,0,0,.12)" stroke-width=".5"/>
    <line x1="160" y1="4" x2="130" y2="88" stroke="rgba(0,0,0,.12)" stroke-width=".5"/>
    <line x1="93" y1="28" x2="160" y2="62" stroke="rgba(0,0,0,.1)" stroke-width=".44"/>
    <line x1="167" y1="28" x2="100" y2="62" stroke="rgba(0,0,0,.1)" stroke-width=".44"/>
  </g>
  <!-- Blue side panels on mask -->
  <path d="M93,44 Q90,66 97,80 Q110,90 118,86 Q104,72 101,54 Q96,48 93,44Z" fill="#0E3A8A" opacity=".52"/>
  <path d="M167,44 Q170,66 163,80 Q150,90 142,86 Q156,72 159,54 Q164,48 167,44Z" fill="#0E3A8A" opacity=".52"/>
  <!-- Eyes -->
  <ellipse cx="112" cy="40" rx="23" ry="28" fill="white" transform="rotate(-15 112 40)"/>
  <ellipse cx="148" cy="40" rx="23" ry="28" fill="white" transform="rotate(15 148 40)"/>
  <ellipse cx="112" cy="40" rx="17" ry="22" fill="#d8eaf8" transform="rotate(-15 112 40)"/>
  <ellipse cx="148" cy="40" rx="17" ry="22" fill="#d8eaf8" transform="rotate(15 148 40)"/>
  <ellipse cx="112" cy="40" rx="23" ry="28" stroke="#050208" stroke-width="3.2" fill="none" transform="rotate(-15 112 40)"/>
  <ellipse cx="148" cy="40" rx="23" ry="28" stroke="#050208" stroke-width="3.2" fill="none" transform="rotate(15 148 40)"/>
  <ellipse cx="106" cy="31" rx="8" ry="10" fill="rgba(255,255,255,.55)" transform="rotate(-15 106 31)"/>
  <ellipse cx="154" cy="31" rx="8" ry="10" fill="rgba(255,255,255,.55)" transform="rotate(15 154 31)"/>
</g>`;

  container.appendChild(senseDiv);
  container.appendChild(svg);
  if (oldSense) wrap.removeChild(oldSense);
  wrap.appendChild(container);
})();
