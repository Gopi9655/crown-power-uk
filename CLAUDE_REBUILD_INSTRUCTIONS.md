# Crown Power Energy Systems — Full Production Rebuild

You are acting as the lead front-end engineer, senior UX engineer, design-systems engineer, accessibility engineer, and technical implementation owner.

This repository currently contains an older Crown Power website.

We are NOT incrementally redesigning that implementation.

We are performing a FRESH PRODUCTION REBUILD based on a completely new approved Claude Design project.

## SOURCE OF TRUTH

The complete approved design export is located at:

design-reference/

Important files include:

- design-reference/Home.dc.html
- design-reference/About.dc.html
- design-reference/Services.dc.html
- design-reference/Header.dc.html
- design-reference/Footer.dc.html
- design-reference/BESS.dc.html
- design-reference/BatteryProducts.dc.html
- design-reference/GridTransformer.dc.html
- design-reference/Contact.dc.html
- design-reference/MeetTheTeam.dc.html
- design-reference/Partners.dc.html
- design-reference/Internships.dc.html
- design-reference/Training.dc.html
- design-reference/Application.dc.html
- design-reference/Announcements.dc.html
- design-reference/WhyGreenEnergy.dc.html
- design-reference/HealthSafety.dc.html
- design-reference/Legal.dc.html
- design-reference/LegalLayout.dc.html
- design-reference/PrivacyPolicy.dc.html
- design-reference/CookiePolicy.dc.html
- design-reference/TermsConditions.dc.html
- design-reference/Accessibility.dc.html

Supporting documentation:

- design-reference/codex-handoff.md
- design-reference/content-migration-matrix.md
- design-reference/content-notes.md

Brand assets:

- design-reference/assets/crown-power-logo.png
- design-reference/assets/favicon.png

Screenshots and uploaded visual references are also available.

Read ALL of the above before implementing.

Do not assume the old production implementation is the intended design.

The Claude design export is now the primary visual and structural source of truth.

==================================================
CRITICAL IMPLEMENTATION STRATEGY
==================================================

Rebuild the production application cleanly.

Do NOT mechanically convert each .dc.html file into a standalone page full of duplicated HTML/CSS.

The .dc.html files are DESIGN REFERENCES.

Extract their:

- layout
- content
- visual hierarchy
- brand system
- typography
- component patterns
- spacing
- imagery
- interaction intent
- page structure

Then implement them as maintainable reusable Next.js components.

The final application should feel like one coherent engineered website, not 20 unrelated HTML conversions.

==================================================
DO NOT DELETE
==================================================

Do not delete:

.git/
design-reference/

Do not rewrite Git history.

You may replace/refactor the old application code as necessary.

==================================================
TECHNOLOGY
==================================================

First inspect the existing package.json and repository.

Prefer retaining the current stable production stack where sensible.

Expected target:

- Next.js
- React
- TypeScript
- Tailwind or the existing styling approach if appropriate

Do not introduce unnecessary frameworks.

Avoid large dependencies for simple UI behaviour.

Use modern semantic React/Next.js architecture.

==================================================
BRAND
==================================================

Use the approved Crown Power royal-blue / deep-navy / vivid-gold design.

The actual logo asset is:

design-reference/assets/crown-power-logo.png

The design identity is approximately based on:

Deep Crown Navy
#09206A

Crown Royal Blue
#0A3AA5

Supporting Blue
#386BCE

Crown Gold
#DBA612

Do not create a different visual identity.

Use appropriate tonal variants for accessibility.

Do not use bright gold as small text on white if contrast fails.

==================================================
GLOBAL GRID — IMPORTANT
==================================================

The Claude visual design is approved, but its exported HTML needs professional production refinement.

Create ONE shared horizontal container/grid system.

The current design references show a common issue where the full-width header may not align perfectly with the constrained page content.

Correct this in production.

Logo, hero content, primary sections, page headings, and footer should feel anchored to a consistent horizontal grid.

Recommended concept:

.site-container {
    width: min(calc(100% - (2 * var(--page-gutter))), var(--container-max));
    margin-inline: auto;
}

Use a max width around 1280–1320px unless detailed design analysis supports another choice.

Responsive gutters approximately:

large desktop: 40px
tablet: 28–32px
mobile: 20px

Use tokens/clamp rather than duplicating arbitrary values everywhere.

==================================================
GLOBAL HEADER
==================================================

Build one shared production Header.

Desktop information architecture:

Crown Power logo

Solutions
Products
Industries
Company
Insights

Contact

Request Consultation →

Do not mathematically centre the navigation in the viewport.

Correct professional hierarchy:

Logo | flexible space | nav | secondary action | primary CTA

Everything should sit inside the shared site container.

Header must be sticky.

Homepage at top:
- visually integrated with hero
- transparent/subtly translucent where readable

After scrolling:
- deep Crown navy
- subtle transparency/backdrop blur
- restrained bottom border/shadow

Internal pages:
- solid professional header state

Use stable CSS variables such as:

--header-height

Do not rely on random hard-coded offsets.

Header must work at:
1920
1600
1440
1366
1280
1180
1024
tablet
mobile

At the point navigation no longer safely fits, switch to compact/mobile navigation.

Do not allow collisions.

==================================================
TYPOGRAPHY / TEXT MEASURE
==================================================

Do not force lines to equal visual length.

Do not insert arbitrary <br> tags just to mimic screenshots.

Use natural professional typography.

Use:

text-wrap: balance;

for headings where appropriate.

Use:

text-wrap: pretty;

for body copy where supported.

Hero H1 should retain:

Powering sustainable,
smart & reliable
energy systems.

but line wrapping should respond naturally to viewport size.

Approximate useful measures:

hero H1:
~16–18ch depending font

supporting marketing copy:
~50–60ch

general body:
~60–70ch

long-form/legal copy:
~68–78ch

Avoid excessively wide paragraphs.

==================================================
HOMEPAGE HERO
==================================================

Preserve the approved visual direction:

wind turbines
solar infrastructure
Crown navy/royal-blue overlay
gold highlight on "smart"

Keep:

POWER ENGINEERING · SMART ENERGY · RENEWABLE INFRASTRUCTURE

Powering sustainable,
smart & reliable
energy systems.

Primary CTA:
Explore Our Solutions

Secondary CTA:
Talk to Our Engineers

Refine professionally:

- shared horizontal grid
- precise text measure
- image focal positioning
- contrast
- vertical rhythm
- responsive behaviour
- CTA alignment

Do not turn hero into an oversized 100vh presentation slide without reason.

==================================================
SERVICES PAGE — IMPORTANT
==================================================

The current Claude reference has a sticky five-category navigation:

Renewable Integration
Smart Energy Technologies
Power Systems Solutions
Industrial & Commercial Services
Specialised Services

Keep the concept.

BUT refine it.

The current export makes the bar visually too similar in weight to the global navbar.

In production it must look like contextual/local navigation, not "Navbar #2".

Recommended:

Global Header
~70–76px

Local Services Nav
~50–56px

Local nav should:

- stick immediately below the global header
- be visually subordinate
- use smaller typography
- use restrained navy/light surface
- have a subtle border
- use a small gold active indicator
- share the global site container
- update active state based on current scroll section

Use IntersectionObserver or another lightweight method.

Clicking a category must scroll to the section without the heading disappearing behind the two sticky bars.

Use tokenised scroll margins based on:

--header-height
--local-nav-height
--anchor-gap

Do NOT hardcode arbitrary 150px offsets.

On mobile:
use horizontal scrolling or an accessible compact "On this page" control.

Do not allow five long labels to wrap awkwardly.

==================================================
SERVICES LAYOUT
==================================================

Preserve the premium alternating image/text composition.

Refine:

- image dimensions
- text alignment
- vertical spacing
- section rhythm
- responsive order
- shared grid

Avoid excessive empty space.

Use consistent section gaps.

Use CSS Grid where suitable.

Do not use arbitrary left/right margins for alternating rows.

==================================================
CONTENT PARITY
==================================================

The approved design contains the original-site content migration work.

Read:

design-reference/content-migration-matrix.md
design-reference/content-notes.md

Do not accidentally omit business content.

The rebuilt site must account for the approved content architecture for:

Home
About
Why Green Energy
Services
Battery Products
Smart Grid Transformer
BESS
Meet The Team
Partners & Contractors
Internships
Application
Training
Announcements
Health & Safety
Legal
Contact
Privacy
Cookies
Terms
Accessibility

Do not invent content simply to fill layouts.

==================================================
BUSINESS CREDIBILITY
==================================================

This is a real B2B engineering-company website.

It must feel legitimate to:

- procurement managers
- commercial clients
- engineers
- partners
- contractors
- job candidates
- interns
- compliance reviewers

Trust must come from real information:

- corporate identity
- actual offices
- actual contact channels
- actual people
- actual services
- company registration details
- policies
- health & safety
- real announcements

Do not fabricate:

- customer logos
- awards
- testimonials
- certifications
- installed MW
- project counts
- CO2 savings
- partners
- qualifications
- client names

Unsupported source claims should remain flagged for review rather than amplified.

==================================================
ABOUT PAGE
==================================================

Treat About as a major corporate credibility page.

It should communicate:

- who Crown Power is
- what it does
- engineering focus
- approach
- international presence
- leadership
- corporate identity
- business engagement routes

Do not reduce it to generic icon cards.

==================================================
PRODUCT / TECHNICAL PAGES
==================================================

Implement:

BESS
Smart Grid Transformer
Battery Products

as sophisticated technical/business pages.

Do not invent product specifications.

If the design references contain placeholders for missing technical data, preserve that distinction rather than fabricating numbers.

==================================================
TEAM
==================================================

Use only supplied real personnel.

Do not generate staff.

Do not invent qualifications.

Keep the design editorial and professional.

==================================================
LEGAL / POLICIES
==================================================

Build reusable long-form legal-page components.

Privacy
Cookies
Terms
Accessibility
Health & Safety
Legal Department

Long-form readability should be excellent.

Use:

- readable measure
- clear H2/H3 hierarchy
- TOC where beneficial
- anchor links
- responsive layout

Do not change legal meaning.

Do not invent legal wording.

==================================================
COOKIE CONSENT
==================================================

Implement the approved UX shell for:

Accept optional cookies
Reject optional cookies
Manage preferences

Only activate categories actually used by the implemented site.

Do not fake consent behaviour.

Persist preferences appropriately.

==================================================
FORMS
==================================================

Create professional states:

idle
focus
validation error
submitting
success
server error

Do not show false success.

If no real backend/API exists, make this clear in implementation rather than pretending a form delivered a message.

==================================================
RESPONSIVE / ACCESSIBILITY
==================================================

Target WCAG 2.2 AA.

Test:

1920
1600
1440
1366
1280
1180
1024
900
768
430
390
360

Also inspect at:

125%
150%
200% zoom

No:

- horizontal overflow
- nav collisions
- clipped headings
- hidden sticky-anchor targets
- unreadable gold-on-white text
- oversized whitespace
- manually forced desktop line wrapping
- broken legal layouts

Support:

- keyboard navigation
- focus-visible
- semantic landmarks
- accessible menus
- accessible mobile navigation
- Escape to close overlays
- prefers-reduced-motion

==================================================
MOTION
==================================================

Use restrained motion.

Motion should suggest:

energy
flow
connection
state change

Avoid:

- scroll hijacking
- cursor gimmicks
- heavy WebGL
- perpetual animation
- excessive parallax

Reduced-motion users must receive a complete experience.

==================================================
PERFORMANCE
==================================================

Build for strong Core Web Vitals.

Use Next.js image optimisation where appropriate.

Avoid huge source images being sent blindly.

Lazy-load below-fold imagery appropriately.

Avoid loading unnecessary JS for mostly static content.

==================================================
SEO / SEMANTICS
==================================================

Use:

- proper page metadata
- one logical H1 per page
- semantic heading order
- meaningful titles/descriptions
- internal links
- breadcrumbs where appropriate
- canonical structure where appropriate
- sitemap/robots support if suitable

Do not keyword-stuff.

==================================================
CODE QUALITY
==================================================

Build reusable components rather than copying markup across routes.

Likely shared pieces include:

Header
Footer
SiteContainer
Hero
PageHero
SectionHeading
CTA
Button
ServiceCategoryNav
ProductSection
OfficeCard
PersonProfile
ArticleCard
LegalLayout
CookieBanner
CookiePreferences
ContactForm
Breadcrumbs

Use strong TypeScript typing.

Avoid enormous page components.

Keep data/content separate from visual components where beneficial.

==================================================
IMPLEMENTATION PROCESS
==================================================

Work in this order:

1. Inspect repository and every design-reference file.
2. Read all handoff/content documentation.
3. Decide the clean production architecture.
4. Create/refine design tokens.
5. Build global layout/grid.
6. Build Header/navigation.
7. Build Footer.
8. Build homepage accurately.
9. Build Services + sticky local navigation.
10. Build About.
11. Build product/technical pages.
12. Build company/talent pages.
13. Build Contact.
14. Build Insights/Announcements.
15. Build legal/policy architecture.
16. Implement cookie preferences.
17. Responsive QA.
18. Accessibility QA.
19. Performance cleanup.
20. Run lint/typecheck/build.
21. Fix all errors.

==================================================
IMPORTANT
==================================================

Treat the Claude export as the NEW DESIGN SOURCE.

Do not preserve old implementation simply because it already exists.

Preserve only useful production infrastructure/code where doing so improves the new implementation.

The new website should visually correspond closely to the approved Claude design, while improving issues that are obvious artifacts of the design prototype:

- inconsistent horizontal grids
- non-production sticky behaviour
- awkward text measures
- excessive whitespace
- weak responsive behaviour
- accessibility contrast issues
- duplicated styles

==================================================
DO NOT DEPLOY IMMEDIATELY
==================================================

First produce a fully working local build.

After completing implementation:

run the available equivalents of:

npm install
npm run lint
npm run typecheck (if available)
npm run build

Fix all errors.

Then report:

- architecture used
- files replaced
- components created
- routes created
- content parity status
- responsive behaviour
- sticky navigation implementation
- accessibility fixes
- build result
- remaining content requiring company/legal verification

Do not deploy until the local production build succeeds.
