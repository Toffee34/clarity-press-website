# Clarity Press — Project Knowledge Base

Guidance for anyone (human or AI) working on this site. The site is the marketing
front for **Clarity Press — Business Systems & Solutions**, which helps small
businesses build websites, capture leads, organize CRMs, follow up with customers,
and automate work. Every design decision should reduce a visitor's effort to
understand what Clarity Press does and reach out.

## Project shape (facts on the ground)

- **Single file:** everything lives in `index.html` — one static page, no framework,
  no build step, no external assets. Styles are one `<style>` block in `<head>`;
  content is the `<body>`.
- **One scrolling page** with anchor navigation: Services (`#services`),
  About (`#process`), Contact (`#contact`). Smooth-scroll is on.
- **Self-contained by rule.** No external images, fonts, CDNs, or scripts. New
  imagery is embedded (inline SVG or, if raster is unavoidable, a committed asset /
  base64) so the page stays a single portable file.

## Working workflow

- Make changes locally, then **update the live preview artifact** so the user can
  see it before anything ships.
- **Push only to the feature branch** (`claude/...`), never to `main`, unless the
  user explicitly asks. `main` is the live/deployed source of truth.
- The user reviews the branch (or a PR) and decides when to merge to `main`.

## Design principles (UX-architect direction going forward)

The goal is never decoration — it is to **reduce cognitive effort while maximizing
clarity, trust, accessibility, and conversions**. Justify choices with reasoning,
not taste.

### Hierarchy & information architecture
- Preserve the existing top-to-bottom narrative: **hook (hero) → what we do
  (services) → how we work (process) → act (contact)**. It mirrors a visitor's
  decision path; don't reorder without a reason.
- One primary action per section. The hero and contact both funnel to "get in
  touch" — keep that the single, obvious next step (goal-gradient effect).
- Group related things visually (Gestalt); don't let the page become a wall of
  equally-weighted blocks.

### Visual system (keep it consistent — treat these as tokens)
- **Type:** Georgia serif for headings, brand, and display; Arial/Helvetica for
  body. Don't introduce new families casually.
- **Color:** cream background `#FFFCF7` / `#F7F3EA`; near-black text `#181818`;
  gold accent `#B58A32` / `#a97816` / `#b8872c`; soft gold border `#DCCCA7`; dark
  contact section `#111111`. **Reuse these — don't invent new one-off colors.**
- **Radius:** 6px is the house rounding (nav links, buttons). Stay consistent.
- **Spacing:** section padding is generous (80–110px). Keep rhythm even; change
  spacing deliberately, not per-element.

### Voice / UX writing
- Copy is plain, specific, human — no jargon. Clarity Press *sells* clarity, so
  the site must model it.
- **Known inconsistency to watch:** Services uses "we/our"; Process and Contact
  slip into "I/me". Pick one voice (recommend "we") when copy is next touched.

### Accessibility (WCAG 2.1 AA baseline — do not regress)
- Maintain text contrast ≥ 4.5:1 and UI/large-text ≥ 3:1. The cream/near-black
  pairing passes; verify any new gold-on-light combination (gold text on cream can
  fail — use gold for accents/borders, not body text).
- Interactive targets ≥ 44×44px. The enlarged nav buttons and contact button meet
  this; keep new controls at that size.
- Decorative SVG (e.g. the logo flourishes) must stay `aria-hidden="true"` so
  screen readers skip it.
- Keep visible focus states and logical order; don't remove focus outlines.
- Respect `prefers-reduced-motion` if any real animation is ever added.

### Responsive
- Mobile breakpoint is `max-width: 700px`. Every new component needs a mobile
  check — grids collapse to one column; the nav stacks and its links wrap/center.
- Test narrow widths before shipping; the larger logo/nav is the most fragile spot.

## Evaluate before shipping
Quick self-check on any change: does it reduce cognitive load, match the existing
mental model, reuse the established patterns/tokens, keep hierarchy clear, stay
accessible, and work on mobile? If a change is decorative only, make sure it still
earns its place (guides attention or reinforces the brand) and never fights
clarity or contrast.

## Highest-value future improvements (not yet done — for when asked)
- Resolve the we/I voice inconsistency.
- Add a real contact method beyond the `mailto:` (simple form or scheduling link)
  to lower the barrier to conversion.
- Give "About" its own content, or rename the nav item to match the Process
  section it actually points to.
- Consider a lightweight trust element (logos, testimonial, or result) near the
  contact CTA — trust formation raises conversion.
