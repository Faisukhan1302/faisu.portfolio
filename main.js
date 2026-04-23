'use strict';

// ── THEME ──
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
let targetProgress = savedTheme === 'dark' ? 1 : 0;
let dayNightProgress = targetProgress;
function transitionTheme(toTheme) {
  targetProgress = toTheme === 'dark' ? 1 : 0;
  html.setAttribute('data-theme', toTheme);
  localStorage.setItem('theme', toTheme);
  buildCity();
}
themeBtn.addEventListener('click', () => transitionTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

// ── MOBILE MENU ──
const ham = document.getElementById('navHam');
const menu = document.getElementById('mobileMenu');
ham.addEventListener('click', () => { ham.classList.toggle('open'); menu.classList.toggle('open'); });
document.querySelectorAll('.mm-link').forEach(a => a.addEventListener('click', () => { ham.classList.remove('open'); menu.classList.remove('open'); }));

// ── NAV SCROLL ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => { nav.classList.toggle('scrolled', window.scrollY > 60); }, { passive: true });

// ── CURSOR ──
const cur = document.getElementById('sp-cursor');
const trail = document.getElementById('sp-trail');
let mx = 0, my = 0, tx = 0, ty = 0, isTouch = false;
document.addEventListener('touchstart', () => { isTouch = true; cur.style.display = 'none'; trail.style.display = 'none'; }, { passive: true });
document.addEventListener('mousemove', e => {
  if (isTouch) return;
  mx = e.clientX; my = e.clientY;
  cur.style.transform = `translate(calc(${mx}px - 50%),calc(${my}px - 50%))`;
});
(function animTrail() {
  tx += (mx - tx) * .13; ty += (my - ty) * .13;
  trail.style.transform = `translate(calc(${tx}px - 50%),calc(${ty}px - 50%))`;
  requestAnimationFrame(animTrail);
})();
document.querySelectorAll('a,button,.proj-card,.tl-body,.svc-card').forEach(el => {
  el.addEventListener('mouseenter', () => { trail.style.width = '66px'; trail.style.height = '66px'; trail.style.borderColor = 'rgba(226,54,54,.7)'; });
  el.addEventListener('mouseleave', () => { trail.style.width = '52px'; trail.style.height = '52px'; trail.style.borderColor = 'rgba(226,54,54,.4)'; });
});

// ── WEB TRAIL (subtle) ──
const wc = document.getElementById('web-canvas');
const wctx = wc.getContext('2d');
let pts = [];
function resizeWC() { wc.width = window.innerWidth; wc.height = window.innerHeight; }
resizeWC(); window.addEventListener('resize', resizeWC);
document.addEventListener('mousemove', e => { pts.push({ x: e.clientX, y: e.clientY, age: 0 }); if (pts.length > 20) pts.shift(); });
(function drawWeb() {
  wctx.clearRect(0, 0, wc.width, wc.height);
  pts.forEach(p => p.age++);
  pts = pts.filter(p => p.age < 40);
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1], p1 = pts[i];
    const a = Math.max(0, 1 - p1.age / 40) * .08;
    wctx.beginPath(); wctx.moveTo(p0.x, p0.y); wctx.lineTo(p1.x, p1.y);
    wctx.strokeStyle = `rgba(80,40,20,${a})`; wctx.lineWidth = .8; wctx.stroke();
  }
  requestAnimationFrame(drawWeb);
})();

// ── WEB SHOOT ──
const wso = document.getElementById('web-shoot-overlay');
const wsc = wso.getContext('2d');
let webAnims = [];
function resizeWSO() { wso.width = window.innerWidth; wso.height = window.innerHeight; }
resizeWSO(); window.addEventListener('resize', resizeWSO);
function shootWeb(ox, oy) {
  webAnims.push({ ox, oy, t0: Date.now(), maxR: Math.max(window.innerWidth, window.innerHeight) * .6, angles: Array.from({ length: 14 }, (_, i) => i * (Math.PI * 2 / 14)), rings: 6, dur: 1200 });
}
(function animWSO() {
  wsc.clearRect(0, 0, wso.width, wso.height);
  webAnims = webAnims.filter(a => Date.now() - a.t0 < a.dur + 300);
  for (const a of webAnims) {
    const prog = Math.min((Date.now() - a.t0) / a.dur, 1);
    const fade = prog < .7 ? 1 : 1 - (prog - .7) / .3;
    const r = a.maxR * prog;
    wsc.save();
    wsc.strokeStyle = `rgba(80,40,20,${fade * .45})`; wsc.lineWidth = 1.2;
    for (const ang of a.angles) { wsc.beginPath(); wsc.moveTo(a.ox, a.oy); wsc.lineTo(a.ox + Math.cos(ang) * r, a.oy + Math.sin(ang) * r); wsc.stroke(); }
    for (let ri = 1; ri <= a.rings; ri++) {
      const rr = r * (ri / a.rings); if (rr < 5) continue;
      wsc.strokeStyle = `rgba(80,40,20,${fade * .3})`; wsc.lineWidth = .8;
      wsc.beginPath();
      for (let si = 0; si < a.angles.length; si++) {
        const x1 = a.ox + Math.cos(a.angles[si]) * rr, y1 = a.oy + Math.sin(a.angles[si]) * rr;
        si === 0 ? wsc.moveTo(x1, y1) : wsc.lineTo(x1, y1);
      }
      wsc.closePath(); wsc.stroke();
    }
    wsc.restore();
  }
  requestAnimationFrame(animWSO);
})();
document.getElementById('shootWebBtn').addEventListener('click', function (e) {
  const r = this.getBoundingClientRect();
  shootWeb(r.left + r.width / 2, r.top + r.height / 2);
});

// ── HERO BG CANVAS ──
const hbc = document.getElementById('hero-bg-canvas');
const hctx = hbc.getContext('2d');
let stars = [], clouds = [];
function resizeHBC() { hbc.width = window.innerWidth; hbc.height = window.innerHeight; }
resizeHBC(); window.addEventListener('resize', () => { resizeHBC(); generateSceneObjects(); drawHeroBg(); });

function generateSceneObjects() {
  stars = Array.from({ length: 200 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.5 + .3, o: Math.random() * .8 + .2, twinkleSpeed: 0.5 + Math.random() * 2.5, twinkleOffset: Math.random() * Math.PI * 2 }));
  clouds = Array.from({ length: 6 }, () => ({ x: Math.random(), y: .05 + Math.random() * .3, w: 120 + Math.random() * 160, h: 30 + Math.random() * 40, o: .6 + Math.random() * .35, speed: .00004 + Math.random() * .00003 }));
}
generateSceneObjects();

// ── HELPERS ──
const lerp=(a,b,t)=>a+(b-a)*t;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const easeIn=t=>t*t*t;
const easeOut=t=>1-Math.pow(1-t,3);
const easeInOut=t=>t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1;
const lerpRGB=(a,b,t)=>`rgb(${Math.round(lerp(a[0],b[0],t))},${Math.round(lerp(a[1],b[1],t))},${Math.round(lerp(a[2],b[2],t))})`;

let scrollClouds = 0;

function drawHeroBg(ts = 0) {
  const p = dayNightProgress, W = hbc.width, H = hbc.height;
  hctx.clearRect(0, 0, W, H);
  // Sky
  const grad = hctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, lerpRGB([184,216,248],[1,1,10],p));
  grad.addColorStop(.35, lerpRGB([212,234,255],[5,5,20],p));
  grad.addColorStop(.65, lerpRGB([232,244,255],[8,8,22],p));
  grad.addColorStop(1, lerpRGB([244,240,232],[10,10,26],p));
  hctx.fillStyle = grad; hctx.fillRect(0, 0, W, H);
  // Stars
  const sv = clamp((p - .35) / .45, 0, 1);
  if (sv > 0) stars.forEach(s => {
    const tw = .65 + .35 * Math.sin(ts * .001 * s.twinkleSpeed + s.twinkleOffset);
    hctx.beginPath(); hctx.arc(s.x * W, s.y * H * .88, s.r, 0, Math.PI * 2);
    hctx.fillStyle = `rgba(255,255,255,${s.o * sv * tw})`; hctx.fill();
  });
  // Sun (sets first)
  const sunP = clamp(p * 1.7, 0, 1);
  const sxPos = W * .82, syDay = H * .1, sySet = H * 1.3;
  const sunY = lerp(syDay, sySet, easeIn(sunP));
  const sunA = clamp(1 - sunP * 1.4, 0, 1);
  if (sunA > 0.01) {
    const sGlow = hctx.createRadialGradient(sxPos, sunY, 28, sxPos, sunY, 110);
    sGlow.addColorStop(0, `rgba(255,220,60,${.5*sunA})`); sGlow.addColorStop(1, 'rgba(255,200,0,0)');
    hctx.beginPath(); hctx.arc(sxPos, sunY, 110, 0, Math.PI*2); hctx.fillStyle = sGlow; hctx.fill();
    hctx.save(); hctx.translate(sxPos, sunY); hctx.globalAlpha = sunA * .45;
    for (let i = 0; i < 12; i++) { hctx.rotate(Math.PI*2/12); hctx.beginPath(); hctx.moveTo(40,0); hctx.lineTo(68,0); hctx.strokeStyle='rgba(255,210,0,1)'; hctx.lineWidth=4; hctx.lineCap='round'; hctx.stroke(); }
    hctx.restore();
    const sCr = hctx.createRadialGradient(sxPos-8, sunY-8, 0, sxPos, sunY, 34);
    sCr.addColorStop(0, `rgba(255,248,208,${sunA})`); sCr.addColorStop(.45, `rgba(245,200,66,${sunA})`); sCr.addColorStop(1, `rgba(232,160,0,${sunA})`);
    hctx.beginPath(); hctx.arc(sxPos, sunY, 34, 0, Math.PI*2); hctx.fillStyle = sCr; hctx.fill();
  }
  // Horizon glow (sunset/sunrise)
  const hGlow = p < .5 ? easeInOut(p * 2) : easeInOut((1 - p) * 2);
  if (hGlow > .01) {
    const hg = hctx.createLinearGradient(0, H * .55, 0, H);
    hg.addColorStop(0, 'rgba(255,100,20,0)');
    hg.addColorStop(.5, `rgba(255,150,50,${hGlow * .38})`);
    hg.addColorStop(1, `rgba(255,80,10,${hGlow * .55})`);
    hctx.fillStyle = hg; hctx.fillRect(0, H * .55, W, H * .45);
  }
  // Moon (rises after sun sets)
  const moonP = clamp((p - .42) / .42, 0, 1);
  const mxPos = W * .82, myNight = H * .11, myStart = H * 1.35;
  const moonY = lerp(myStart, myNight, easeOut(moonP));
  const moonA = easeOut(moonP);
  if (moonA > .01) {
    const mGlow = hctx.createRadialGradient(mxPos, moonY, 32, mxPos, moonY, 140);
    mGlow.addColorStop(0, `rgba(255,248,200,${.22*moonA})`); mGlow.addColorStop(.5, `rgba(255,240,180,${.08*moonA})`); mGlow.addColorStop(1, 'transparent');
    hctx.beginPath(); hctx.arc(mxPos, moonY, 140, 0, Math.PI*2); hctx.fillStyle = mGlow; hctx.fill();
    hctx.beginPath(); hctx.arc(mxPos, moonY, 46, 0, Math.PI*2);
    hctx.fillStyle = `rgba(240,236,208,${moonA})`; hctx.fill();
    const mShad = hctx.createRadialGradient(mxPos+16, moonY-10, 8, mxPos, moonY, 46);
    mShad.addColorStop(0, 'rgba(200,190,150,0)'); mShad.addColorStop(.7, `rgba(160,150,110,${.3*moonA})`); mShad.addColorStop(1, `rgba(120,110,80,${.5*moonA})`);
    hctx.beginPath(); hctx.arc(mxPos, moonY, 46, 0, Math.PI*2); hctx.fillStyle = mShad; hctx.fill();
    [[mxPos-14,moonY+8,5],[mxPos+12,moonY+18,4],[mxPos-4,moonY-16,3.5],[mxPos+20,moonY-4,3]].forEach(([cx,cy,r])=>{ hctx.beginPath(); hctx.arc(cx,cy,r,0,Math.PI*2); hctx.fillStyle=`rgba(160,150,110,${.4*moonA})`; hctx.fill(); });
  }
  // Clouds (fade out at dusk)
  const cloudA = clamp(1 - p * 2.5, 0, 1);
  if (cloudA > 0) clouds.forEach(c => {
    const shift = (scrollClouds * c.speed * .06) % 1;
    const cx2 = ((c.x + shift) % 1.3 - .15) * W;
    hctx.save(); hctx.globalAlpha = c.o * cloudA;
    hctx.beginPath(); hctx.ellipse(cx2, c.y*H, c.w, c.h, 0, 0, Math.PI*2); hctx.fillStyle='rgba(255,255,255,.85)'; hctx.fill();
    hctx.beginPath(); hctx.ellipse(cx2-c.w*.28, c.y*H+6, c.w*.58, c.h*.68, 0, 0, Math.PI*2); hctx.fillStyle='rgba(255,255,255,.8)'; hctx.fill();
    hctx.beginPath(); hctx.ellipse(cx2+c.w*.32, c.y*H+9, c.w*.52, c.h*.62, 0, 0, Math.PI*2); hctx.fillStyle='rgba(255,255,255,.75)'; hctx.fill();
    hctx.restore();
  });
}
// Continuous bg loop — animates progress + twinkling
(function bgLoop(ts) {
  const diff = targetProgress - dayNightProgress;
  if (Math.abs(diff) > .001) dayNightProgress += diff * .022;
  else dayNightProgress = targetProgress;
  drawHeroBg(ts);
  requestAnimationFrame(bgLoop);
})();

// ── CITY SVG ──
function buildCity() {
  const dark = html.getAttribute('data-theme') === 'dark';
  const fill = dark ? '#1a1a2e' : '#6a8ab0';
  const wFill = dark ? 'rgba(255,220,80,.6)' : 'rgba(255,232,160,.7)';
  const svg = document.getElementById('citySvg');
  const buildings = [
    { x: 0, y: 148, w: 65, h: 132 }, { x: 69, y: 110, w: 56, h: 170 }, { x: 129, y: 52, w: 90, h: 228 },
    { x: 223, y: 130, w: 60, h: 150 }, { x: 287, y: 80, w: 76, h: 200 }, { x: 367, y: 140, w: 50, h: 140 },
    { x: 421, y: 30, w: 104, h: 250 }, { x: 529, y: 125, w: 64, h: 155 }, { x: 597, y: 76, w: 80, h: 204 },
    { x: 681, y: 100, w: 78, h: 180 }, { x: 763, y: 136, w: 52, h: 144 }, { x: 819, y: 64, w: 88, h: 216 },
    { x: 911, y: 122, w: 58, h: 158 }, { x: 973, y: 88, w: 78, h: 192 }, { x: 1055, y: 130, w: 54, h: 150 },
    { x: 1113, y: 90, w: 72, h: 190 }, { x: 1189, y: 118, w: 60, h: 162 }, { x: 1253, y: 94, w: 68, h: 186 },
    { x: 1325, y: 122, w: 56, h: 158 }, { x: 1385, y: 100, w: 55, h: 180 }
  ];
  let html2 = `<defs><linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${dark ? '#1e1e35' : '#7a9ac0'}"/><stop offset="100%" stop-color="${dark ? '#0d0d1a' : '#4a6890'}"/></linearGradient></defs>`;
  html2 += `<rect x="0" y="258" width="1440" height="22" fill="${dark ? '#0a0a14' : '#c8b890'}"/>`;
  buildings.forEach(b => {
    html2 += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="url(#bGrad)"/>`;
    if (!dark) {
      for (let row = b.y + 14; row < b.y + b.h - 14; row += 16) {
        for (let col = b.x + 8; col < b.x + b.w - 10; col += 14) {
          if (Math.random() > .4) html2 += `<rect x="${col}" y="${row}" width="8" height="7" fill="${wFill}" opacity="${.4 + Math.random() * .5}"/>`;
        }
      }
    } else {
      for (let row = b.y + 14; row < b.y + b.h - 14; row += 16) {
        for (let col = b.x + 8; col < b.x + b.w - 10; col += 14) {
          if (Math.random() > .65) html2 += `<rect x="${col}" y="${row}" width="8" height="7" fill="${wFill}" opacity="${.3 + Math.random() * .5}"/>`;
        }
      }
    }
  });
  svg.innerHTML = html2;
}
buildCity();
themeBtn.addEventListener('click', buildCity);



// ── PARALLAX ──
const heroEl = document.getElementById('hero');
const cityLayer = document.getElementById('cityLayer');
const spiderman = document.getElementById('spiderman');
window.addEventListener('scroll', () => {
  const sy = window.scrollY, hh = heroEl.offsetHeight;
  scrollClouds = sy;
  if (sy <= hh) {
    drawHeroBg();
    cityLayer.style.transform = `translateY(${sy * .18}px)`;
    if (spiderman) spiderman.style.transform = `translateY(${-sy * .14}px)`;
  }
}, { passive: true });
heroEl.addEventListener('mousemove', e => {
  const dx = (e.clientX - window.innerWidth / 2) / window.innerWidth;
  const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
  cityLayer.style.transform = `translate(${dx * 8}px,${dy * 4}px)`;
});

// ── SPIDEY DIALOGUES ──
const dialogues = [
  '"With great design comes great responsibility."',
  '"My web never misses. Neither does my design."',
  '"I\'m whatever the brand needs me to be."',
  '"Does whatever a designer can!"',
  '"Not the designer you deserve — but the one you need."',
  '"Thwip! Your brand identity is ready."',
  '"I don\'t just design. I protect brands."',
];
let dIdx = 0;
const bubble = document.getElementById('spideyBubble');
if (bubble) {
  setInterval(() => {
    bubble.style.opacity = '0'; bubble.style.transform = 'scale(0.8)';
    setTimeout(() => {
      dIdx = (dIdx + 1) % dialogues.length;
      bubble.textContent = dialogues[dIdx];
      bubble.style.transition = 'opacity .4s,transform .4s';
      bubble.style.opacity = '1'; bubble.style.transform = 'scale(1)';
    }, 400);
  }, 4000);
}

// ── CLICK BUBBLES ──
const words = ['THWIP!', 'POW!', 'BAM!', 'WOW!', 'PHEW!'];
document.addEventListener('click', e => {
  if (e.target.closest('#shootWebBtn') || e.target.closest('#themeToggle')) return;
  const el = document.createElement('div');
  el.className = 'click-bubble';
  el.textContent = words[Math.floor(Math.random() * words.length)];
  el.style.left = (e.clientX + 12) + 'px';
  el.style.top = (e.clientY - 44) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
});

// ── REVEAL ──
const revEls = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) { setTimeout(() => en.target.classList.add('visible'), i * 70); ro.unobserve(en.target); }
  });
}, { threshold: .08 });
revEls.forEach(el => ro.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
      const res = await fetch('https://formspree.io/f/xpwzgkjb', {
        method: 'POST', headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        status.textContent = '🕷 Message sent! I\'ll swing by soon.';
        status.style.color = '#f5c842'; form.reset();
        shootWeb(window.innerWidth / 2, window.innerHeight / 2);
      } else { status.textContent = '⚠ Something went wrong. Email me directly!'; status.style.color = '#ff8888'; }
    } catch { status.textContent = '⚠ Network error. Try emailing directly.'; status.style.color = '#ff8888'; }
    btn.textContent = 'Thwip Me a Message 🕸'; btn.disabled = false;
  });
}
