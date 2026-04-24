# Design Handoff — Mastering Microsoft Excel (Corporate Training Deck)

**Project:** Corporate Excel  
**Client:** Vrit Jobs  
**Date:** April 25, 2026  
**Designed by:** Claude (Anthropic)

---

## Overview

A 37-slide, full-screen HTML presentation deck for Vrit Jobs' corporate Excel training program. The deck covers 7 training modules (Excel Introduction, Data Entry & Formatting, Basic Functions, Sort/Filter/Merge, Lookup Functions, Tables & Charts, Pivot Tables), each ending with a timed "Try It!" practice challenge, culminating in a capstone and Q&A slide.

The deck is designed to be run on a projector at 1920×1080. It auto-scales to fit any screen via `transform: scale()` letterboxing.

---

## About the Design Files

The files in this bundle are **HTML/CSS/JS design prototypes** — high-fidelity references showing intended visual design, typography, spacing, animations, and interactions. They are **not production code to copy directly**.

The task for Claude Code is to **recreate these designs in the target codebase** (e.g. a React app, a Next.js site, a native app), using its established patterns, libraries, and design system. If no codebase exists yet, the most appropriate framework should be chosen (React + Vite is recommended for a presentation tool).

---

## Fidelity

**High-fidelity.** All colors, typography, spacing, animations, and interactions are final and should be recreated pixel-accurately. The design uses a bespoke design system (tokens defined in `training-styles.css`) — these values must be preserved exactly.

---

## File Structure

| File | Purpose |
|---|---|
| `Excel Training.html` | Main presentation file — all 37 slides as `<section>` elements inside `<deck-stage>` |
| `training-styles.css` | Full design system: tokens, layout, typography, animation system, component styles |
| `training-anim.js` | Per-slide JavaScript animation controller (formula typewriter, VLOOKUP beam, counters, confetti, charts) |
| `deck-stage.js` | Self-contained web component `<deck-stage>` — handles scaling, keyboard nav, slide transitions, localStorage persistence, print/PDF |

---

## Design Tokens

All tokens are defined as CSS custom properties in `training-styles.css` under `:root`.

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--navy` | `#0C1F5C` | Slide headers, dark backgrounds, primary text headings |
| `--blue` | `#1B4DE4` | Primary accent — Module 1, links, borders, stat cards |
| `--orange` | `#E8561A` | Secondary accent — practice badges, Try It! cards, Module 2/4/6 |
| `--green` | `#107C41` | Excel green — formula cells, SUM results, Module 3/6 |
| `--excel-green` | `#217346` | Excel brand green — spreadsheet headers, ribbon |
| `--bg` | `#F4F7FF` | Slide background (pale blue-white) |
| `--light` | `#EAF0FF` | Light blue tint — info panels, selected states |
| `--text` | `#0C1040` | Body text (near-black navy) |
| `--muted` | `#3A4470` | Secondary text |
| `--border` | `rgba(27,77,228,0.13)` | Card and table borders |
| `--shadow` | `0 4px 24px rgba(12,31,92,0.10)` | Card elevation shadow |

### Typography

The deck uses two typefaces:

| Family | Import | Usage |
|---|---|---|
| **Plus Jakarta Sans** | Google Fonts (wght 400–800) | All headings, labels, module names, UI chrome |
| **Inter** | Google Fonts (wght 400–600) | Body text, descriptions, callouts |
| **JetBrains Mono** | Google Fonts (wght 400–600) | All formula/code text, cell references, syntax examples |

| Class | Size | Weight | Usage |
|---|---|---|---|
| `.t-xl` | 84px | 800 | Hero headings |
| `.t-lg` | 60px | 800 | Slide main title |
| `.t-md` | 42px | 700 | Section titles |
| `.t-sm` | 30px | 600 | Card titles |
| `.t-body` | 24px | 400 | Body paragraphs |
| `.t-muted` | 20px | 400 | Secondary text |
| `.mono` | inherited | 600 | Code/formula inline spans |

### Spacing

The layout uses `96px` horizontal padding on content areas, `80px` on slide headers, `56px` top padding below the header bar.

### Border Radius

| Usage | Value |
|---|---|
| Large cards | `20px` |
| Standard cards | `14–16px` |
| Small chips / badges | `99px` (pill) |
| Key keycap | `8px` |
| Excel cells | `0px` (no radius) |

---

## Slide Architecture

### Slide shell pattern

Every non-title slide follows this DOM pattern:

```html
<section class="grid-bg" data-label="Slide Name">
  <div class="s-hdr">
    <span class="s-tag">Module N · Module Name</span>
    <span class="s-ttl">Slide Title</span>
    <div class="s-logo"><!-- SVG logo injected by JS --></div>
  </div>
  <div class="s-body [row|center]" style="padding-top:44px;">
    <!-- Content -->
  </div>
</section>
```

The header bar (`.s-hdr`) is `80px` tall, full-width, `background: var(--navy)`. The `.s-tag` is a small orange pill badge with module label. The `.s-ttl` is the white slide title.

Content area (`.s-body`) sits below the header at `top: 80px`, padded `56px 96px`.

**Two-column layout:** Add class `row` to `.s-body` and use `flex:1` children.

**Centered layout:** Add class `center` for `align-items:center; justify-content:center`.

### Title Slide (`section.title-slide`)

Dark full-bleed slide (`background: var(--navy)`). Uses these classes:
- `.title-eye` — small orange eyebrow label (17px, uppercase, letter-spacing)
- `.title-main` — 108px/800 weight hero word-stack; `<span>` inside gets `color: var(--orange)`
- `.title-sub` — 26px subtitle
- `.title-chips` — horizontal row of metadata chips with orange dot
- `.title-logo-wrap` — absolutely positioned bottom-right

### Try It! Slides

Every module ends with a practice slide using:

```html
<section class="grid-bg" data-label="Try It Module N">
  <div class="s-hdr">...</div>
  <div class="try-wrap">
    <div class="try-card">
      <div class="try-glow"></div>   <!-- radial gradient decoration -->
      <div class="try-lbl">✦ Your Turn</div>
      <div class="try-h">Challenge Title</div>
      <ul class="try-tasks">
        <li><div class="tn">1</div> Task text</li>
      </ul>
      <div class="try-meta">
        <span class="badge b-time">⏱ N Minutes</span>
        <span class="badge b-begin|b-inter">Difficulty</span>
      </div>
    </div>
  </div>
</section>
```

The `.try-card` is `background: var(--navy)` with a radial orange glow in the top-right corner. The `.tn` number circles are 36×36px orange circles. Badge variants: `.b-time` (white), `.b-begin` (green, beginner), `.b-inter` (orange, intermediate).

---

## All 37 Slides

| # | Label | Type | Module |
|---|---|---|---|
| 1 | Title | Title | — |
| 2 | Agenda | Overview | — |
| 3 | Excel Interface | Learn | Module 1 |
| 4 | Excel Interface Part 2 | Learn | Module 1 |
| 5 | Try It Module 1 | Practice | Module 1 |
| 6 | Messy Data | Learn | Module 2 |
| 7 | Formatting Steps | Learn | Module 2 |
| 8 | Keyboard Shortcuts | Learn | Module 2 |
| 9 | Try It Module 2 | Practice | Module 2 |
| 10 | SUM Function | Learn + Animated | Module 3 |
| 11 | AVERAGE Function | Learn + Animated | Module 3 |
| 12 | MIN/MAX Functions | Learn + Animated | Module 3 |
| 13 | Functions Summary | Stats | Module 3 |
| 14 | Try It Module 3 | Practice | Module 3 |
| 15 | Sorting Data | Learn | Module 4 |
| 16 | Filtering Data | Learn + Animated | Module 4 |
| 17 | Merging Tables | Learn | Module 4 |
| 18 | Try It Module 4 | Practice | Module 4 |
| 19 | VLOOKUP | Learn + Animated | Module 5 |
| 20 | COUNTIF | Learn + Animated | Module 5 |
| 21 | SUMIF | Learn + Animated | Module 5 |
| 22 | Lookup Functions Review | Reference | Module 5 |
| 23 | IF Function | Learn | Module 5 |
| 24 | Try It Module 5 | Practice | Module 5 |
| 25 | Bar Chart | Learn + Animated | Module 6 |
| 26 | Pie Chart | Learn + Animated | Module 6 |
| 27 | Chart Decision Guide | Reference | Module 6 |
| 28 | Excel Tables Feature | Learn | Module 6 |
| 29 | Try It Module 6 | Practice | Module 6 |
| 30 | Pivot Raw Data | Learn + Animated | Module 7 |
| 31 | Pivot Compression | Learn + Animated | Module 7 |
| 32 | Pivot Field Layout | Learn + Animated | Module 7 |
| 33 | Pivot Slicers | Learn | Module 7 |
| 34 | Try It Module 7 | Practice | Module 7 |
| 35 | Capstone Challenge | Challenge | — |
| 36 | Key Takeaways | Summary | — |
| 37 | Thank You / Q&A | Closing | — |

---

## Animation System

### Entrance animations (CSS-driven)

Every animatable element carries two attributes:
- `da` (data-animate) — animation type: `"up"`, `"fade"`, `"left"`, `"right"`, `"scale"`, `"down"`
- `dd` (data-delay) — stagger delay index `"1"` through `"12"` (each step = +0.14s)

When the parent `<section>` receives the class `.is-active`, all child `[da]` elements transition to `opacity:1; transform:none`. The `deck-stage.js` web component fires a `slidechange` event; `training-anim.js` listens and adds `.is-active` to the incoming slide.

```js
// In training-anim.js
deck.addEventListener('slidechange', e => {
  if (e.detail.previousSlide) e.detail.previousSlide.classList.remove('is-active');
  if (e.detail.slide) {
    e.detail.slide.classList.add('is-active');
    const fn = ANIMS[e.detail.index];
    if (fn) fn(e.detail.slide);
  }
  updateProgress(e.detail.index);
});
```

### Per-slide JavaScript animations (in `training-anim.js`)

| Slide | Animation | Key elements |
|---|---|---|
| 10–12 | **Formula typewriter** — types formula into `.fbar-typed` char-by-char, then reveals `.result-cell` with `data-val` | `.fbar-typed`, `.result-cell` |
| 13 | **Stat counter** — animates number from 0 to target with cubic ease | `[data-counter]`, `data-pre`, `data-suf` |
| 15 | **Sort rows** — translates `<tr class="sort-row">` elements by recalculated Y offsets (44px row height) | `.sort-row` |
| 16 | **Filter fade** — non-matching rows get `opacity:0.15` applied; `.funnel-wrap` scales in | `.filter-row[data-dept]`, `.funnel-wrap` |
| 16 | **Merge bridge** — `.merge-bridge` scales from 0 to 1 on X axis, then match rows highlight | `.merge-bridge`, `.match-row` |
| 19 | **VLOOKUP beam** — 5-step animation: src highlight → beam extends → scan rows → match → result fills | `.vl-src`, `.vlbeam`, `.vl-scan`, `.vl-match-row`, `.vl-result-cell` |
| 20 | **COUNTIF counter** — rows light up one-by-one, `.cf-counter` increments | `.cf-row[data-match]`, `.cf-counter` |
| 21 | **SUMIF running total** — matching rows highlight, `.sumif-total` accumulates | `.sumif-row[data-match][data-val]`, `.sumif-total` |
| 25 | **Bar chart grow** — `.bar-fill` elements animate `height: 0 → data-h` with spring easing | `.bar-fill[data-h]` |
| 26 | **Pie slice fan** — SVG `stroke-dashoffset` transitions to 0 with staggered delays | `.pie-slice` |
| 26 | **Line chart draw** — SVG path `stroke-dashoffset` animates to 0; dots fade in sequentially | `.line-path`, `.line-dot` |
| 31 | **Drag field** — `.drag-field` elements animate from `opacity:0` and staggered transforms to visible | `.drag-field[data-to]` |
| 37 | **Canvas confetti** — 150 colored particles fall from top of `#confetti-canvas` | `#confetti-canvas` |

---

## Excel Mockup Component

Many slides include a realistic Excel spreadsheet mockup. The structure is:

```html
<div class="excel-shell">
  <div class="excel-ribbon">
    <div class="rtab active">Home</div>
    <div class="rtab">Insert</div>
    ...
  </div>
  <div class="excel-fbar">
    <div class="excel-nb">C7</div>          <!-- Name Box -->
    <div class="excel-fx">
      <span class="fbar-typed"></span>       <!-- Typewriter target -->
      <span class="cursor"></span>           <!-- Blinking cursor -->
    </div>
  </div>
  <div class="excel-body">
    <div class="excel-col-hdrs">...</div>    <!-- A, B, C headers -->
    <div class="excel-row">
      <div class="excel-rh">1</div>          <!-- Row number -->
      <div class="excel-cell hdr w3">Name</div>
      <div class="excel-cell result-cell" data-val="₹45,200"></div>
    </div>
  </div>
</div>
```

Cell state classes: `.hdr` (green Excel header), `.sel` (blue selected), `.result` (green formula result), `.formula` (green formula text with mono font), `.hl` (yellow highlighted row).

Width helpers: `.w1` 80px, `.w2` 140px, `.w3` 180px, `.w4` 120px, `.w5` 100px.

The `.result-cell` gets its value populated by `training-anim.js` typewriter animation using `data-val` attribute.

---

## Navigation & Persistence

The `<deck-stage>` web component (self-contained in `deck-stage.js`) handles:

- **Keyboard:** `→`, `Space`, `PageDown` = next; `←`, `PageUp` = prev; `Home` = first; `End` = last; `R` = reset; `1–9` = jump to slide
- **Touch:** Left-third tap = prev; right-third tap = next
- **Overlay:** Bottom-center floating pill with prev/next buttons and slide count — auto-hides after 1.8s idle
- **Persistence:** Current slide index saved to `localStorage` keyed by document path — survives refresh
- **Print/PDF:** `@media print` lays all slides as individual pages — browser Print → Save as PDF works

---

## Progress Bar & Module Label

`training-anim.js` maintains a `MODULE_MAP` array (indexed 0–36) mapping each slide to its module number and name. On `slidechange`, it updates:
- `#pbar-fill` width → `(index + 1) / 37 * 100%`
- `#mod-label` text → `"Module N of 7 — Module Name"` (or override for title/capstone/Q&A)

---

## Component Reference

### Callout box

```html
<div class="callout">
  <div class="callout-ttl">Title</div>
  <div class="callout-txt">Body text with <strong>bold</strong> support.</div>
</div>
```

Left border accent `5px solid var(--orange)`, light warm background, 12px border radius.

### Keyboard shortcut display

```html
<div class="kkey">
  <div class="keys">
    <div class="key">Ctrl</div>
    <div class="key-plus">+</div>
    <div class="key">B</div>
  </div>
  <div class="key-desc">Bold text</div>
</div>
```

`.key` mimics a physical keycap: white background, `border-bottom: 4px solid #aaa`, subtle box-shadow.

### Stat card (summary view)

```html
<div class="stat-card">
  <div class="stat-icon" style="background:#E6F2EC;">Σ</div>
  <div class="stat-val" data-counter="45200" data-pre="₹" data-suf="">0</div>
  <div class="stat-lbl">Total Payroll</div>
  <div class="stat-formula">=SUM(C2:C6)</div>
</div>
```

Animated on slide entry via `data-counter` attribute.

### Pipeline (Capstone)

```html
<div class="pipeline">
  <div class="pipe-step" style="border-top:4px solid var(--blue);">
    <div class="pipe-icon">📥</div>
    <div class="pipe-num">01</div>
    <div class="pipe-title">Step Name</div>
    <div class="pipe-sub">Brief description</div>
  </div>
  <!-- ... -->
</div>
```

Each `.pipe-step` has `::after` pseudo-element showing `→` arrow, hidden on the last child.

### Agenda track

```html
<div class="agenda-track">
  <div class="amod m1-accent">
    <div class="am-num">Module 01</div>
    <div class="am-name">Excel Introduction</div>
    <div class="am-time">⏱ 20 min</div>
    <div class="am-badge">✦ Try It!</div>
  </div>
</div>
```

The `.agenda-track` uses flexbox with a gradient line via `::before`. Module accent classes: `.m1-accent` through `.m7-accent` set `border-top` color per module.

---

## Pending Design Changes (Not Yet Implemented)

These two changes were requested but not yet built — a developer should implement them:

### 1. Excel-style background grid (all slides)

Replace the current CSS dot-grid on `.grid-bg` with a proper spreadsheet grid texture:
- **Cell dimensions:** ~120px wide × 26px tall (wider than tall, matching Excel's default column/row proportions)
- **Color:** `#E8E8E8` or lighter on `#FFFFFF` — very subtle, never competes with content
- **Implementation:** CSS `background-image` with two `linear-gradient` layers (horizontal + vertical), or a repeating SVG `<pattern>` via `background-image: url("data:image/svg+xml,...")`
- **Applies to:** All slides except the dark title slide and the Q&A slide (which are already `background: var(--navy)`)
- **Column header strip:** Optionally add a 26px strip at the very top of each content slide (below the existing `.s-hdr`) with letters A, B, C… in `#F3F3F3` background — purely decorative

### 2. Interactive WebGL/Canvas cursor distortion on title slide only

On the title slide, the background grid should react to mouse movement with a gravitational warp effect:
- Cells closest to cursor should stretch/distort as if attracted by gravity
- Effect settles smoothly as cursor moves away (spring physics, not linear)
- WebGL (Three.js or raw GLSL shader) recommended for 60fps performance at 1920×1080
- Canvas 2D fallback acceptable if WebGL unavailable
- All other slides must remain static — this effect is **title slide only**
- The rest of the title slide content (MASTERING EXCEL hero text, chips, logo) must layer **on top of** the canvas/WebGL layer
- Suggested approach: a full-bleed `<canvas>` positioned `absolute; inset:0; z-index:0` inside the title slide section, with content `z-index:1`

---

## Assets

No external image assets are used. All visuals are:
- **SVG inline** — Vrit Jobs logo (V-chevron mark + wordmark), pie chart slices, line chart, decorative grids
- **CSS-drawn** — bar charts, Excel mockup cells, keyboard keys, pipeline arrows
- **Unicode/emoji** — icons in pipe-step cards and callouts

The **Vrit Jobs actual brand logo** (official SVG/PNG) should replace the current hand-drawn SVG approximation once available from the client.

---

## Known Issues / Notes

1. The `.s-tag` and `.s-logo` SVG text renders at 11–12px — intentional UI chrome, not readable content. The validator flags these but they are correct by design.
2. The decorative cell reference text on the title slide (`A1 B1…`) is at 14px — intentional watermark, not content.
3. All Google Fonts are loaded via `<link>` in `training-styles.css` — ensure internet connectivity for first render. Embed fonts locally for offline use.
4. The `deck-stage.js` component uses `localStorage` for slide persistence — this may conflict if multiple decks are open on the same domain. Key it by `location.pathname`.

---

## Quick Start (for the developer)

```bash
# Clone or copy these 4 files into a folder
Excel Training.html
training-styles.css
training-anim.js
deck-stage.js

# Serve locally (required — file:// won't load .css/.js files in some browsers)
npx serve .
# or
python3 -m http.server 8080

# Open in browser
open http://localhost:8080/Excel%20Training.html
```

Navigate with `→` / `Space`. Press `R` to reset to slide 1.
