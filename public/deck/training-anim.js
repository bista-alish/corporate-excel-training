// ── Module / progress map ──────────────────────────────────────
const MODULE_MAP = [
  null, null,                          // 0-1: title, agenda
  {n:1,name:'Excel Introduction'},     // 2
  {n:1,name:'Excel Introduction'},     // 3
  {n:1,name:'Excel Introduction'},     // 4 try-it
  {n:2,name:'Data Entry & Formatting'},{n:2,name:'Data Entry & Formatting'},{n:2,name:'Data Entry & Formatting'},{n:2,name:'Data Entry & Formatting'}, // 5-8
  {n:3,name:'Basic Functions'},{n:3,name:'Basic Functions'},{n:3,name:'Basic Functions'},{n:3,name:'Basic Functions'},{n:3,name:'Basic Functions'},      // 9-13
  {n:4,name:'Sorting, Filtering & Merging'},{n:4,name:'Sorting, Filtering & Merging'},{n:4,name:'Sorting, Filtering & Merging'},{n:4,name:'Sorting, Filtering & Merging'}, // 14-17
  {n:5,name:'Logical & Lookup Functions'},{n:5,name:'Logical & Lookup Functions'},{n:5,name:'Logical & Lookup Functions'},{n:5,name:'Logical & Lookup Functions'},{n:5,name:'Logical & Lookup Functions'},{n:5,name:'Logical & Lookup Functions'}, // 18-23
  {n:6,name:'Tables & Charts'},{n:6,name:'Tables & Charts'},{n:6,name:'Tables & Charts'},{n:6,name:'Tables & Charts'},{n:6,name:'Tables & Charts'},      // 24-28
  {n:7,name:'Pivot Tables'},{n:7,name:'Pivot Tables'},{n:7,name:'Pivot Tables'},{n:7,name:'Pivot Tables'},{n:7,name:'Pivot Tables'},                      // 29-33
  null, null, null                     // 34-36: capstone, takeaways, Q&A
];
const TOTAL_SLIDES = 37;

function updateProgress(idx) {
  const fill = document.getElementById('pbar-fill');
  const lbl  = document.getElementById('mod-label');
  if (fill) fill.style.width = ((idx + 1) / TOTAL_SLIDES * 100) + '%';
  if (!lbl) return;
  const m = MODULE_MAP[idx];
  const overrides = {0:'Welcome',1:"Today's Agenda",34:'Capstone Challenge',35:'Key Takeaways',36:'Q&A & Thank You'};
  if (m) { lbl.textContent = `Module ${m.n} of 7 — ${m.name}`; lbl.style.opacity='1'; }
  else if (overrides[idx]) { lbl.textContent = overrides[idx]; lbl.style.opacity='1'; }
  else lbl.style.opacity = '0';
}

// ── Helper: animate number counter ────────────────────────────
function animCount(el, target, prefix='', suffix='', dur=1200) {
  const endVal = parseFloat(String(target).replace(/[^0-9.]/g,''));
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min((now-t0)/dur, 1);
    const ease = 1 - Math.pow(1-p, 3);
    const cur = Math.round(ease * endVal);
    el.textContent = prefix + cur.toLocaleString('en-US') + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + endVal.toLocaleString('en-US') + suffix;
  })(t0);
}

// ── Helper: formula typewriter ────────────────────────────────
function typeFormula(slide, formula, onDone) {
  const el = slide.querySelector('.fbar-typed');
  if (!el) return;
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    if (i < formula.length) { el.textContent = formula.slice(0, ++i); }
    else {
      clearInterval(iv);
      const rc = slide.querySelector('.result-cell');
      if (rc) { setTimeout(() => { rc.classList.add('result'); if(rc.dataset.val) rc.textContent = rc.dataset.val; }, 350); }
      if (onDone) onDone();
    }
  }, 75);
}

// ── Per-slide animations ──────────────────────────────────────
const ANIMS = {};

// Slide 9: SUM
ANIMS[9] = s => setTimeout(() => typeFormula(s, '=SUM(C2:C9)'), 900);
// Slide 10: AVERAGE
ANIMS[10] = s => setTimeout(() => typeFormula(s, '=AVERAGE(C2:C9)'), 900);
// Slide 11: MIN
ANIMS[11] = s => setTimeout(() => typeFormula(s, '=MIN(C2:C9)'), 900);
// Slide 12: MAX
ANIMS[12] = s => setTimeout(() => typeFormula(s, '=MAX(C2:C9)'), 900);

// Slide 13: Stat card counters
ANIMS[13] = s => {
  setTimeout(() => {
    s.querySelectorAll('[data-counter]').forEach(el => {
      animCount(el, el.dataset.counter, el.dataset.pre||'', el.dataset.suf||'');
    });
  }, 500);
};

// Slide 14: Sort rows by dept A→Z
ANIMS[14] = s => {
  const rows = [...s.querySelectorAll('.sort-row')];
  if (!rows.length) return;
  const rowH = 44;
  // Dept order: Engineering(2), HR(5), Marketing(1,3,6), Sales(0,4)
  // original order: Sales, Marketing, Engineering, Marketing, Sales, HR, Marketing
  // sorted dept A-Z: Engineering(2), HR(5), Marketing(1,3,6), Sales(0,4)
  const newOrder = [2, 5, 1, 3, 6, 0, 4];
  setTimeout(() => {
    rows.forEach((row, origIdx) => {
      const newPos = newOrder.indexOf(origIdx);
      row.style.transform = `translateY(${(newPos - origIdx) * rowH}px)`;
    });
  }, 700);
};

// Slide 15: Filter animation (show only Marketing)
ANIMS[15] = s => {
  setTimeout(() => {
    s.querySelectorAll('.filter-row').forEach(row => {
      if (row.dataset.dept !== 'Marketing') row.classList.add('hidden');
    });
    const funnel = s.querySelector('.funnel-wrap');
    if (funnel) { funnel.style.opacity = '1'; funnel.style.transform = 'scale(1)'; }
  }, 900);
};

// Slide 16: Merge connection bridge
ANIMS[16] = s => {
  const bridge = s.querySelector('.merge-bridge');
  if (bridge) {
    setTimeout(() => { bridge.style.opacity = '1'; bridge.style.transform = 'scaleX(1)'; }, 700);
  }
  setTimeout(() => {
    s.querySelectorAll('.match-row').forEach((r,i) => {
      setTimeout(() => r.classList.add('hl'), i * 300);
    });
  }, 1400);
};

// Slide 19: VLOOKUP beam animation
ANIMS[19] = s => {
  const steps = [
    // 1. Highlight lookup value
    () => s.querySelectorAll('.vl-src').forEach(el => el.style.background='#FFF3CD'),
    // 2. Show beam
    () => { const b = s.querySelector('.vlbeam'); if(b){b.style.opacity='1';b.style.width='300px';} },
    // 3. Scan rows in Products
    () => {
      const scanRows = s.querySelectorAll('.vl-scan');
      scanRows.forEach((r,i) => {
        setTimeout(() => {
          s.querySelectorAll('.vl-scan').forEach(x => x.style.background='');
          r.style.background = '#FFF3CD';
        }, i * 380);
      });
    },
    // 4. Match found — highlight and cross to return col
    () => {
      s.querySelectorAll('.vl-scan').forEach(x => x.style.background='');
      s.querySelectorAll('.vl-match-row td').forEach(td => td.style.background='#DFFAEB');
      const b = s.querySelector('.vlbeam'); if(b){b.style.width='0';b.style.opacity='0';}
    },
    // 5. Result fills in original cell
    () => {
      const rc = s.querySelector('.vl-result-cell');
      if (rc) { rc.textContent = rc.dataset.val||'Keyboard'; rc.className+=' result-cell'; rc.style.color='#107C41'; rc.style.fontWeight='700'; rc.style.background='#DFFAEB'; rc.style.fontStyle='normal'; }
      const fbar = s.querySelector('.fbar-typed'); if(fbar) fbar.textContent='=VLOOKUP(B2,Products!A:C,2,0)';
    }
  ];
  steps.forEach((fn, i) => setTimeout(fn, i * 1300 + 500));
};

// Slide 20: COUNTIF — rows light up and counter increments
ANIMS[20] = s => {
  const rows = [...s.querySelectorAll('.cf-row')];
  const counterEl = s.querySelector('.cf-counter');
  let count = 0;
  rows.forEach((row, i) => {
    setTimeout(() => {
      rows.forEach(r => r.classList.remove('lit'));
      if (row.dataset.match === '1') {
        row.classList.add('lit');
        count++;
        if (counterEl) counterEl.textContent = count;
      }
    }, i * 450 + 500);
  });
};

// Slide 21: SUMIF — values flow visually
ANIMS[21] = s => {
  const rows = [...s.querySelectorAll('.sumif-row')];
  const totalEl = s.querySelector('.sumif-total');
  let running = 0;
  rows.forEach((row, i) => {
    if (row.dataset.match === '1') {
      setTimeout(() => {
        row.querySelectorAll('td').forEach(td => td.style.background = '#DFFAEB');
        running += parseFloat(row.dataset.val || 0);
        if (totalEl) {
          totalEl.style.background = '#DFFAEB';
          totalEl.textContent = '$' + running.toLocaleString('en-US');
        }
      }, i * 500 + 600);
    }
  });
};

// Slide 24: Bar chart grow
ANIMS[24] = s => {
  setTimeout(() => {
    s.querySelectorAll('.bar-fill').forEach(b => { b.style.height = b.dataset.h || '100px'; });
  }, 400);
};

// Slide 25: Pie chart arc animation (SVG)
ANIMS[25] = s => {
  setTimeout(() => {
    s.querySelectorAll('.pie-slice').forEach((slice, i) => {
      slice.style.transitionDelay = (i * 0.18) + 's';
      slice.style.strokeDashoffset = '0';
    });
  }, 400);
};

// Slide 26: Line chart draw
ANIMS[26] = s => {
  setTimeout(() => {
    const path = s.querySelector('.line-path');
    if (path) { path.style.strokeDashoffset = '0'; }
    const dots = s.querySelectorAll('.line-dot');
    dots.forEach((d,i) => setTimeout(() => d.style.opacity='1', i*200+800));
  }, 400);
};

// Slide 27: all three chart types side by side
ANIMS[27] = s => {
  setTimeout(() => { s.querySelectorAll('.bar-fill').forEach(b => b.style.height = b.dataset.h||'80px'); }, 300);
  setTimeout(() => {
    s.querySelectorAll('.pie-slice').forEach((sl,i) => { sl.style.transitionDelay=(i*.15)+'s'; sl.style.strokeDashoffset='0'; });
  }, 500);
  setTimeout(() => {
    const lp = s.querySelector('.line-path'); if(lp) lp.style.strokeDashoffset='0';
  }, 700);
};

// Slide 29: Scroll raw data table upward
ANIMS[29] = s => {
  const body = s.querySelector('.scroll-body');
  if (!body) return;
  let pos = 0;
  const iv = setInterval(() => {
    pos += 42;
    body.style.transform = `translateY(-${pos}px)`;
    if (pos >= 380) clearInterval(iv);
  }, 90);
};

// Slide 30: Compress rows into pivot
ANIMS[30] = s => {
  const rows = [...s.querySelectorAll('.compress-row')];
  setTimeout(() => {
    rows.forEach((r, i) => setTimeout(() => r.classList.add('gone'), i * 60 + 200));
  }, 600);
};

// Slide 31: Drag field animation
ANIMS[31] = s => {
  const fields = s.querySelectorAll('.drag-field');
  fields.forEach((f, i) => {
    setTimeout(() => {
      f.style.transform = f.dataset.to || 'translateX(0)';
      f.style.opacity = '1';
      f.style.background = '#E6F2EC';
      f.style.borderColor = '#107C41';
    }, i * 400 + 400);
  });
};

// Slide 36: Confetti
ANIMS[36] = s => {
  const canvas = s.querySelector('#confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = 1920; canvas.height = 1080;
  const colors = ['#1B4DE4','#E8561A','#107C41','#F59E0B','#EC4899','#8B5CF6','#06B6D4'];
  const particles = Array.from({length: 150}, () => ({
    x: Math.random()*1920, y: -30,
    vx: (Math.random()-.5)*5, vy: Math.random()*5+3,
    color: colors[Math.floor(Math.random()*colors.length)],
    size: Math.random()*12+5,
    rot: Math.random()*360, rotv: (Math.random()-.5)*7,
    shape: Math.random()>.5?'rect':'circle', alpha: 1
  }));
  let alive = true;
  function draw() {
    if (!alive) return;
    ctx.clearRect(0,0,1920,1080);
    let all_done = true;
    particles.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.rot+=p.rotv; p.vy+=0.04;
      p.alpha = Math.max(0, 1 - p.y/1200);
      if (p.y < 1200) all_done = false;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
      if (p.shape==='rect') ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);
      else { ctx.beginPath(); ctx.arc(0,0,p.size/2,0,Math.PI*2); ctx.fill(); }
      ctx.restore();
    });
    if (!all_done) requestAnimationFrame(draw); else ctx.clearRect(0,0,1920,1080);
  }
  draw();
  setTimeout(() => { alive=false; ctx.clearRect(0,0,1920,1080); }, 6000);
};

// ── Main slidechange controller ───────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const deck = document.querySelector('deck-stage');
  if (!deck) return;

  deck.addEventListener('slidechange', e => {
    const {index, slide, previousSlide} = e.detail;
    if (previousSlide) previousSlide.classList.remove('is-active');
    if (slide) {
      slide.classList.add('is-active');
      const fn = ANIMS[index];
      if (fn) fn(slide);
    }
    updateProgress(index);
  });
});
