# Crown Power Energy Systems — production rebuild

A fresh implementation of the approved `design-reference/` export. The previous application markup, stylesheet, page templates and content routing have been replaced. `.git/`, `design-reference/` and `CLAUDE_REBUILD_INSTRUCTIONS.md` are preserved. Nothing has been deployed.

## Architecture

- Next.js 16.3.4 App Router, React 19, strict TypeScript and the existing Tailwind/CSS stack.
- Marketing, technical, company and legal pages are statically rendered. JavaScript is limited to navigation, cookie preferences, service tracking, profiles, the gallery, announcement reading and forms.
- `src/app/globals.css` owns the approved Manrope/Inter typography, navy/royal-blue/gold palette, responsive spacing and a single 1280px container. Light-surface gold text uses a darker accessible tone.
- `src/data/content/` contains content extracted from the approved references, without the prototype runtime or duplicated HTML/CSS. `src/data/site.ts` centralises corporate information, offices, navigation, sectors and metadata. `src/data/legal.ts` types the legal documents.
- `src/components/layout/`: Header, Logo, Footer and CookieConsent.
- `src/components/ui/`: Container, PageHero, shared sections/cards/process/office/CTA components, Modal, ImageGallery and ServiceCategoryNav.
- `src/components/pages/`: reusable LegalLayout, composed editorial pages and AnnouncementReader.
- `src/components/team/TeamDirectory.tsx` and `src/components/contact/ContactForm.tsx` provide the interactive directories and forms.

The old `/bess`, `/gridtransformer`, `/meet-the-team` and legacy single-segment content routes redirect permanently to their approved destinations. Obsolete generic content components and the previous favicon were replaced. Existing local photographs were retained where they match the new references; the actual supplied logo and favicon were added. The older `reference/claude-design/` directory is not used by the application.

## Approved routes and content parity

| Area                    | Routes                                                                             |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Marketing / engineering | `/`, `/services`, `/about`, `/why-green-energy`                                    |
| Products                | `/products/bess`, `/products/smart-grid-transformer`, `/products/battery-products` |
| People / engagement     | `/team`, `/partners`, `/internships`, `/training`, `/application`                  |
| Updates / contact       | `/announcements`, `/contact`                                                       |
| Legal / policies        | `/legal`, `/health-safety`, `/privacy`, `/cookies`, `/terms`, `/accessibility`     |

All 20 approved routes are implemented, with page-specific metadata, canonical URLs, one H1, sitemap and robots support. Content includes all 30 services, the complete agricultural subsector list, five live-grid links, all 31 supplied personnel, seven transformer gallery images, all four approved announcements and dates, battery chemistries and sizes, three offices, contact/social channels and corporate details. Legal bodies retain the approved reference wording and visible review flags. The original site's five UK policy priorities are preserved on Why Green Energy as dated source context requiring verification, not asserted as current policy.

The unverified ISO badge/claim is deliberately excluded. No customers, awards, project counts, product specifications or staff have been invented. Stock energy photography is identified as illustrative. The gallery and profiles use the supplied imagery.

## Navigation and accessibility

The sticky header is integrated into the homepage hero, then turns solid navy on scroll. Internal pages use the solid state. Navigation collapses below 1180px, before items can collide. Header, content and footer use the same container.

Services uses a lighter, smaller, horizontally scrollable contextual bar. An IntersectionObserver plus a requestAnimationFrame-throttled scroll listener updates the active category. `--header-height`, `--local-nav-height` and `--anchor-gap` set sticky positions and anchor clearances. Legal content has a sticky desktop TOC and a mobile disclosure.

Native modal dialogs provide keyboard containment, Escape closing and focus return. Other provisions include skip navigation, visible focus, semantic headings and landmarks, labelled inputs, linked validation errors, reduced-motion support, responsive text measures and equal-weight cookie acceptance/rejection.

## Local use and checks

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run start
```

The six Node test cases exercise the real submission handler with an isolated environment and mocked mail provider. They cover invalid/oversized/cross-origin requests, application fields, unavailable delivery, accepted delivery and provider failures. They cannot send mail or read local credentials.

For the browser audit, start the production server, then run:

```sh
npx playwright install chromium
npm run qa
```

An existing Chromium executable can be selected with `CHROMIUM_PATH=/usr/bin/chromium`. `QA_BASE_URL` defaults to `http://127.0.0.1:3000`. Playwright and axe are development-only dependencies. The audit checks all sitemap routes, H1/canonical metadata, internal links/anchors, browser errors, accessibility and all 12 requested viewport widths.

Local QA evidence is in `artifacts/rebuild-qa/`:

- 20 routes; 240 viewport checks at 1920, 1600, 1440, 1366, 1280, 1180, 1024, 900, 768, 430, 390 and 360px.
- Actual Chromium browser zoom at 125%, 150% and 200% across the main page templates, using the browser's `tabs.setZoom` API.
- Keyboard/menu/modal, service-anchor, team-filter, gallery, article-focus, cookie persistence and form-error checks.
- Submitting, success, server error and reset form states tested with intercepted requests and test-only configuration; no email was sent.
- Desktop/mobile screenshots and lazy-loaded image checks.

Automated checks supplement visual and keyboard checks; they are not a formal WCAG certification or field Core Web Vitals measurement.

## Form delivery and cookies

Both forms use `/api/contact`. Configure the existing Resend integration with the values described in `.env.example` before enabling real delivery. Pages capture the configured state at build time, so rebuild after adding delivery configuration. API keys remain server-side.

Without email configuration, forms visibly direct visitors to email and never claim success. The API returns 503. Provider errors preserve the user's entered details; success requires an accepted provider response with a message ID. CV upload is explicitly unavailable; candidates are directed to email documents.

No analytics, marketing or optional functional cookies/scripts are installed. Cookie preferences persist only in `localStorage['cp-cookie-consent']` for up to six months. Unused categories cannot be enabled. Footer Cookie Settings reopens preferences, and blocked storage is handled without crashing.

## Company / legal confirmation before launch

- Approval of all legal/policy wording, formal health and safety procedures, legal-department scope and operational privacy/retention details.
- Battery catalogue, capacities, brands, pricing and availability; BESS/transformer ratings, voltages, efficiency, warranties and certifications.
- Complete announcement bodies: only the four reference titles/dates and clearly identified design summaries are present.
- Training courses, accreditations, fees, dates and outcomes; placement availability and paid/voluntary terms.
- Current UK government policy wording/dates and any track-record or certification claims. ISO 9001 remains withheld.
- Confirmation that company/office details and supplied personnel roles remain current, and rights to publish supplied photography and portraits.
- Real email configuration and a company-authorised delivery check; document upload remains unavailable.

No deployment has been performed. Company review and delivery setup remain launch prerequisites.
