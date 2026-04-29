# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Local dev server at http://localhost:4321
npm run build    # Production build → dist/
npm run preview  # Serve the dist/ build locally
```

Deploy: Vercel auto-detects Astro. Connect the repo — no config needed beyond `vercel.json`.

## Architecture

Astro static site (`output: 'static'`). Multi-course corporate training platform. Design source-of-truth: `Corporate_Excel.pptx` in repo root — minimal two-color palette (navy + blue), light theme.

```
src/
  pages/
    index.astro                 # Landing
    courses/index.astro         # Course catalog
    courses/[slug].astro        # Course detail (dynamic, driven by content collection)
    courses/[slug]/deck.astro   # Full-screen iframe deck viewer
    404.astro
  content/
    config.ts                   # Zod schema for course frontmatter
    courses/excel.md            # Excel course data (add more .md files for new courses)
  layouts/BaseLayout.astro      # html/head shell; noChrome=true skips header/footer
  components/
    SiteHeader.astro / SiteFooter.astro
    CourseCard.astro            # Used in catalog and landing
    ModuleList.astro            # Course detail: ordered list of modules
    PracticeDownloads.astro     # Course detail: per-module xlsx download links
  styles/
    tokens.css                  # Brand tokens (--navy, --blue, --orange, etc.) + Google Fonts
    global.css                  # Site chrome: header, footer, buttons, cards, grid

public/
  deck/                         # The Excel presentation deck — untouched from design handoff
    index.html                  # Renamed from "Excel Training.html"
    training-styles.css
    training-anim.js
    deck-stage.js
  practice/                     # Downloadable .xlsx exercise files (user-authored)
  favicon.svg
```

## Adding a New Course

Only requires two things — no code changes to pages or components:

1. Create `src/content/courses/<slug>.md` with the frontmatter schema (see `excel.md` as template).
   - `status: 'coming-soon'` shows the card dimmed with a badge; `'published'` enables the full detail page.
   - Set `deckPath: /deck-<slug>/` if the course has its own deck.
2. Drop practice files into `public/practice/` and reference them in the `practiceFiles` array in the frontmatter.

The catalog (`/courses`) and detail pages pick it up automatically via `getCollection('courses')`.

## Deck Architecture (deck/)

The deck is a self-contained vanilla HTML/CSS/JS presentation — a design handoff that should not be modified without care. Key facts:

- `<deck-stage>` is a custom web element (`deck-stage.js`) — handles scaling (1920×1080 → viewport), keyboard nav, localStorage persistence, print/PDF.
- Slides are `<section>` children of `<deck-stage>`. Non-active slides stay in DOM with `visibility:hidden`.
- Animations: CSS entrance (`da`/`dd` attributes on elements), plus per-slide JS in `training-anim.js` (`ANIMS[index]` keyed by 0-based slide index).
- `slidechange` CustomEvent fires on every nav: `e.detail.{ index, slide, previousSlide, reason }`.
- The deck viewer page (`courses/[slug]/deck.astro`) embeds it in a full-screen `<iframe>` with `noChrome=true` layout. The iframe auto-focuses on load for keyboard nav. `Escape` returns to the course detail page.

## Design Tokens

Defined in `src/styles/tokens.css` and reused site-wide:

```css
--navy: #0C1F5C   /* slide headers, dark backgrounds */
--blue: #1B4DE4   /* primary accent */
--orange: #E8561A /* secondary accent, CTAs */
--green: #107C41  /* formula/success */
```

Fonts: Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (code). All loaded from Google Fonts — internet required on first render. The deck's `training-styles.css` has its own copy of these tokens; that's intentional for isolation (iframe has no access to the parent's CSS).

## Content Collection Schema

Key fields in `src/content/config.ts`:

| Field | Type | Notes |
|---|---|---|
| `title` | string | Course display name |
| `tagline` | string | One-line marketing hook |
| `status` | `published` \| `coming-soon` | Controls visibility |
| `deckPath` | string? | iframe src (e.g. `/deck/`). Omit if no deck yet |
| `modules` | array | `{ n, name, summary, minutes }` |
| `practiceFiles` | array | `{ label, file, module? }` — `file` is the download href |
| `heroAccent` | string | Hex color for course accent bar |
| `order` | number | Sort order in catalog |

The slug is auto-derived from the filename (`excel.md` → slug `excel`).
