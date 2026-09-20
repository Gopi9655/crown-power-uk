# Crown Power Energy Systems — Design Handoff Specification (for Codex → Next.js)

This document lets Codex implement the site systematically without inferring design from screenshots. Companion files: `content-migration-matrix.md`, `content-notes.md` (verified company data). Design source: the `*.dc.html` files in this project.

---

## 1. Sitemap & route map

| Route | File | Template type |
|---|---|---|
| `/` | Home.dc.html | Marketing / long-form |
| `/services` | Services.dc.html | Capability taxonomy (sticky sub-nav) |
| `/why-green-energy` | WhyGreenEnergy.dc.html | Editorial / advisory |
| `/products/bess` | BESS.dc.html | Product |
| `/products/smart-grid-transformer` | GridTransformer.dc.html | Product + gallery/lightbox |
| `/products/battery-products` | BatteryProducts.dc.html | Product / info |
| `/about` | About.dc.html | Corporate |
| `/team` | MeetTheTeam.dc.html | People (filter + modal) |
| `/partners` | Partners.dc.html | B2B engagement |
| `/internships` | Internships.dc.html | Talent |
| `/training` | Training.dc.html | Talent |
| `/application` | Application.dc.html | Form (state machine) |
| `/announcements` | Announcements.dc.html | Listing + article reader |
| `/contact` | Contact.dc.html | Contact + form |
| `/legal` | Legal.dc.html | LegalLayout |
| `/health-safety` | HealthSafety.dc.html | LegalLayout |
| `/privacy` | PrivacyPolicy.dc.html | LegalLayout |
| `/cookies` | CookiePolicy.dc.html | LegalLayout |
| `/terms` | TermsConditions.dc.html | LegalLayout |
| `/accessibility` | Accessibility.dc.html | LegalLayout |

Primary nav (mega): Solutions · Products · Industries · Company · Insights · Contact + "Request Consultation" CTA. Menu data lives in `Header.dc.html` `get menus()`.

---

## 2. Design tokens

### Colour (logo-derived)
```
--navy-950:#04123A   /* footer base, deepest */
--navy-900:#071B4D   /* primary dark ground, sections, hero overlay */
--navy-800:#0B2E6B   /* mid royal navy, cards on dark */
--navy-700:#0D3178   /* gradient partner */
--royal-600:#0A3AA5  /* logo royal blue (crown fill, mark) */
--blue-500:#176BFF   /* interactive/eyebrow accent on light */
--blue-300:#8FB8FF   /* eyebrow label on dark */
--blue-200:#4C86F5   /* diagram nodes/strokes */
--gold-500:#D9A81A   /* crown gold — accent on DARK, decorative */
--gold-400:#F2C63D   /* bright gold highlight / gradient top */
--gold-grad:linear-gradient(180deg,#F4CB3E,#D9A81A)  /* CTA buttons */
--gold-on-light:#9A6A00 /* REQUIRED for gold TEXT/meaningful icons on light (>=4.5:1) */
--ink:#0C1722  --body:#43525F  --muted:#5A6875  --faint:#8A98A6
--surface:#F6F8FA  --surface-2:#FBFCFE  --border:#E4E9EF  --white:#fff
--error:#C0392B  --success:#1E9E52
```
**Gold contrast rule (WCAG 2.2 AA):** bright gold (`#D9A81A/#F2C63D`) only on navy/dark grounds; on white/light, gold *text* and *meaningful icons* must use `--gold-on-light #9A6A00`. Decorative gold lines/borders/dots may stay bright on light.

### Type
Display/headings **Manrope** (700/800); body/UI **Inter** (400–700). Scale (clamp, desktop→mobile):
```
h1 clamp(30-34px, 4-5.4vw, 48-64px)/1.05, ls -0.02em, weight 800
h2 clamp(24-28px, 3-4vw, 34-46px)/1.12, ls -0.015em, weight 800
h3 19-23px/1.25 weight 700
lead clamp(18-20px,2-2.5vw,22-27px)/1.45 weight 600
body 16-17px/1.7-1.8; legal body 16.5px/1.8; small 13-14.5px
eyebrow 11-13px, ls 0.14-0.22em, uppercase, weight 600-800
button 14-16px weight 700
```

### Spacing / layout
Max content width **1280px** (legal **1100px**, article measure **760px**). Section padding `clamp(56-72px, 8-11vw, 100-132px)`. Gutters `clamp(20px,5vw,40px)`. Radii: cards 14-18px, pills/buttons 8-9px/100px, inputs 10px. Card border `1px #E4E9EF`. Shadows are soft, navy-tinted (`0 30px 60px -34px rgba(11,46,107,.4)`).

### Motion
150–400ms micro-interactions; reveal `.6-.7s cubic-bezier(.2,.7,.2,1)` opacity+translateY(24-26px) via IntersectionObserver (`[data-reveal][data-in="1"]`). Hover lifts `translateY(-2/-3px)`. **All reveal/animation gated behind `@media (prefers-reduced-motion: no-preference)`**; observer also short-circuits to visible when reduce is set. 2.8s safety timeout forces reveal.

### Breakpoints (QA targets)
1920/1600/1440/1366/1280/1024/768/430/390/360 + zoom 125/150/200%. Header collapses to burger `<981px`. LegalLayout TOC switches desktop-sticky ↔ mobile `<details>` at 900px. Grids use `repeat(auto-fit,minmax(min(100%,Npx),1fr))` to reflow without horizontal scroll.

---

## 3. Component inventory (→ React boundaries)

| Component | Source | Props / state | Notes |
|---|---|---|---|
| Header + MegaMenu + MobileNav | Header.dc.html | `variant: 'solid'\|'overlay'`; state: open menu, scrolled, mobileOpen | Sticky; transparent over hero (`overlay`), solidifies on scroll/open. Favicon link lives here. |
| Footer + CorporateInfo | Footer.dc.html | state: cookie consent | 5-col links, 3 offices + legal, bottom links bar |
| CookieBanner + CookiePreferences | Footer.dc.html (logic) | localStorage `cp-cookie-consent` | See §7 |
| Hero | per page | — | One composition, navy gradient over photo, gold eyebrow rule |
| SectionHeader / Eyebrow | per page | — | blue `#176BFF` on light / `#8FB8FF` on dark + gold rule |
| CapabilityCard / ServiceCard | Home, Services | list data | white card, image, gold index |
| ProductPanel + Gallery/Lightbox | BESS, GridTransformer | gallery state | lightbox on transformer |
| PersonProfile + Filter + Modal | MeetTheTeam | filter, selected | real roster |
| ArticleCard + ArticleReader | Announcements | selected index | in-page list↔article |
| Form (Contact / Application) | Contact, Application | values, errors, loading, submitted | front-end state machine, §6 |
| LegalLayout | LegalLayout.dc.html | eyebrow,title,summary,updated,reviewNote,contactHeading,contactNote,contactEmail,`sections[]`,`related[]` | reusable long-form: breadcrumb, sticky TOC, `<details>` mobile TOC, anchored sections, review flag, related nav |
| ProcessTimeline / DataStrip / OfficeCard | various | — | |

**Reusable data objects** for Next: `CorporateInfo` (name, Co.No 16070400, VAT 480 0284 11, reg office Crown Way Cardiff CF14 3UZ, jurisdiction), `Office[]` (UK/Lisbon/Dubai), `ContactChannel[]`, `Service[]`/`Sector[]`, `TeamMember[]`, `Announcement[]`. Centralise in a data module; Header/Footer/Contact/About consume it.

---

## 4. Interaction states
Design every control for default / hover / focus-visible / active / disabled / loading / success / error. Buttons: gold-gradient primary (dark navy text), ghost (border) secondary. Inputs: `1px #D3DBE3`, focus `#176BFF` + ring, error border `#C0392B` + message `#C0392B`. Links: default inherit; hover `#176BFF`. Nav items hover gold on dark.

## 5. Header behaviour
`overlay` variant on pages with dark photographic hero (Home, About, WhyGreenEnergy, Products, Partners, Internships, Training) — page main uses `margin-top:-76px` and hero pads `calc(76px + …)`. `solid` variant on light-top pages (Services, Contact, Application, Announcements, all LegalLayout pages). Solidifies on `scrollY>24` or menu open. Mega-menu opens on hover/click (desktop), full-screen stack (mobile).

## 6. Form behaviour (front-end only)
Contact & Application: visible labels, required marked with `#9A6A00` asterisk, inline validation on submit, specific error messages, disabled+"Submitting…" loading (~1.1s simulated), success panel with reset. **No fake network success beyond the demo state** — Codex wires real submission/endpoint + server-error handling. Application file input is display-only (not uploaded). Consent checkbox required, links to Privacy.

## 7. Cookie behaviour
Banner (delayed 600ms if no stored consent): Accept all / Reject optional / Manage preferences. Modal categories: Strictly necessary (locked on), Analytics, Functional, Marketing — role="switch". Choice persisted in `localStorage['cp-cookie-consent']` `{analytics,functional,marketing,ts}`. Footer "Cookie Settings" reopens modal. **Codex:** connect real cookie/script gating to categories; enable only categories the production site truly uses; no dark patterns (reject is equal-weight).

## 8. Legal-content handling
LegalLayout renders draft, plain-language policy content with a visible "Legal / company review required" flag and per-page `reviewNote`. **Do not strengthen** operational/legal statements. Replace body text with company-approved wording before launch; keep the reading structure (TOC, anchors, measure, related, contact/escalation). Accessibility page: legacy browser instructions intentionally excluded as obsolete.

## 9. Accessibility (WCAG 2.2 AA)
Semantic landmarks, one H1/page, logical heading order, keyboard operability + visible focus, ≥4.5:1 text contrast (3:1 headline), non-colour signifiers (asterisk + text for required/errors), `prefers-reduced-motion` respected, ≥44px touch targets, accessible modal/menu/switch semantics, meaningful alt text, 200% zoom / 400% reflow safe (fluid grids, no fixed text heights).

## 10. SEO / metadata
Per page: one H1, descriptive `<title>` + meta description, semantic sections, breadcrumbs on legal pages, internal links between related pages. Schema candidates: `Organization` (CorporateInfo + offices + logo `assets/crown-power-logo.png`), `BreadcrumbList`, `Article` (announcements once bodies verified). No keyword stuffing.

## 11. Image / asset inventory
- `assets/crown-power-logo.png` — real logo, transparent bg (use on light surfaces + Organization schema/OG).
- `assets/favicon.png` — square crown+bolt crop, transparent.
- Vector crown+lightning mark — inline SVG in Header/Footer (two-tone: gold gradient crown + `#0A3AA5` interior + gold bolt). Compact responsive brand mark.
- Photography: hotlinked Wix static URLs (see `content-notes.md`). **Replace with owned/licensed, optimised images (next/image)**; present representational imagery as representational.

## 12. Logo usage rules
Header/footer: compact vector mark + "CROWN POWER / ENERGY SYSTEMS" wordmark (must stay faithful to real logo — do not drift into a new mark). Real raster logo used sparingly on light surfaces (About corporate block) + favicon + schema/OG. Never place the large raster repeatedly or on dark grounds (blue wordmark loses contrast).

## 13. Implementation notes (Next.js / Tailwind)
- Map tokens above to Tailwind theme (`colors`, `fontFamily` Manrope/Inter, container 1280, radii, shadows). Add `gold.onLight` (#9A6A00) and enforce the gold-contrast rule via component variants, not ad-hoc.
- Components → server components where static; client components for Header (scroll/menu), forms, Announcements reader, MeetTheTeam modal, CookieBanner.
- LegalLayout → one `<LegalLayout>` component fed MDX/CMS content per policy.
- Reveal animation → small IntersectionObserver hook, disabled under reduced-motion.
- Performance: no heavy hero video/WebGL/particles; `next/image`, font `display:swap`, lazy below-fold. Target good Core Web Vitals.
- Keep the two-speed rhythm: quiet long-form (About/legal/contact) vs expressive (hero/products/diagrams). Avoid repeated "heading + 3 cards".

## 14. Verification gate (must clear before launch)
See `content-migration-matrix.md` → "Content requiring verification". No claim, spec, certification, testimonial, count or date ships unless confirmed by Crown Power.
