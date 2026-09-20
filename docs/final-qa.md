# Crown Power final QA — 20 September 2026

Baseline: `d5807b3` on `rebuild/claude-design`. This pass preserves the completed design and content. No deployment, push or commit was performed.

## Production error investigation

The earlier `Internal: NoFallbackError` **reproduced** after a fresh successful build and clean production start. Requests to unknown single-segment URLs, including `/favicon.ico`, returned HTTP 404 but also logged this internal error. It was not dismissed as an old-build artifact.

The trigger was Next.js 16.3.4's `dynamicParams = false` path in the shared `[slug]` route. The fix keeps `generateStaticParams()` for the ten approved editorial/legal pages, and uses an explicit allowlist plus `notFound()` for unknown slugs in both metadata and page rendering. No logs are suppressed and no framework files are patched. The allowlist also prevents object prototype names from being treated as content keys.

After rebuilding and restarting, all approved pages still load, and six missing-route cases return the branded HTTP 404 with `noindex`: `/qa-missing-page`, `/favicon.ico`, `/constructor`, `/toString`, `/__proto__`, `/products/qa-missing-page`. The production log is clean throughout the final browser runs. The actual favicon is the successful `/icon.png` metadata route; a legacy `/favicon.ico` request correctly returns 404.

## Homepage image investigation

The earlier checker classified `!complete || naturalWidth === 0` as broken after scrolling in 800px steps with only 90ms per step and 350ms at the end. That counts pending lazy images as failures. It also recorded `src`, which is the 3840px fallback, rather than the browser-selected `currentSrc`.

The replacement audit scrolls each image into view, awaits decode with a bounded timeout, checks dimensions, verifies its local asset, and requests the original asset, fallback URL and selected optimized URL. Both independent desktop (1440px) and mobile (390px) contexts pass: **19 image elements each, zero broken images, zero browser runtime errors**. All requested image responses are successful with image content types. All sources are local; no remote-domain configuration is required. Working image components were unchanged.

## Verification results

| Check | Result |
| --- | --- |
| Typecheck, ESLint, Next production build | Pass |
| Production start from fresh build | Pass; no remaining `NoFallbackError` |
| API tests | 6/6; isolated environment and mocked provider |
| Approved routes | 20/20 HTTP 200; one H1 and correct canonical per route |
| Internal links and anchors | No broken targets |
| Browser runtime errors | Zero |
| Axe | Zero violations on all 20 pages and tested interactive states |
| Responsive overflow | 240/240 checks pass across all 20 pages |
| Detailed layout | 60 checks: Home, Services, About, Privacy at 12 widths and 3 real zoom levels |
| Interaction checks | 48/48 pass |

Widths: 1920, 1600, 1440, 1366, 1280, 1180, 1024, 900, 768, 430, 390, 360px. Actual Chromium zoom: 125%, 150%, 200% at a 1440px browser viewport, confirmed with `chrome.tabs.getZoom` and resulting layout width/DPR.

Visual review used `Header.dc.html`, `Home.dc.html`, `Services.dc.html`, `About.dc.html`, `Footer.dc.html` and the handoff. Shared horizontal alignment, natural hero wrapping, image composition, CTA hierarchy, footer reflow, legal measure and mobile gutters remain consistent. No visual redesign was needed. The header switches before collision and becomes solid on scroll. Services stays subordinate below it; all five anchors remain clear and active state follows navigation at every checked width/zoom. Cookie controls remain reachable at small widths and zoom.

Keyboard tests cover desktop and mobile navigation, Escape and focus return, modal background-focus exclusion, gallery arrows, article return focus and form-error focus. Native dialogs permit focus to browser chrome; background page controls remain inert. Reduced-motion mode is exercised. Cookie acceptance/rejection does not enable unused categories; persistence and preferences reopening work. Contact/application validation and unavailable-delivery behavior pass. API tests cover rejection, accepted-provider responses and failure states without real mail. Earlier intercepted submitting/success/reset UI evidence remains applicable because form code is unchanged; live delivery was not tested.

Automated axe checks are not a formal WCAG certification. Browser testing here used Chromium; no cross-browser or field Core Web Vitals claim is made.

## Content parity

All 20 approved routes remain implemented. Review confirmed the 30 services, five grid links, full agricultural list, battery sizes/chemistries/recycling, BESS and transformer material, 31 supplied people, seven gallery images, four announcement titles/dates, engagement pages and six legal/policy documents. A rendered-text comparison of the migrated content found only intentional agriculture label expansion: “Farms & Livestock” becomes separate Farms/Livestock Facilities entries, and “Irrigation Systems” becomes Irrigation, matching the fuller content notes. No business content was removed in this QA pass and no new business claims were introduced.

## Remaining launch prerequisites

No known unresolved implementation failure in the tested scope. These existing company-owned items remain open:

1. Approve legal/policy wording, formal health and safety procedures, legal-department scope, and operational privacy/retention details.
2. Confirm battery catalogue/capacities/brands/pricing/availability and BESS/transformer ratings, voltages, efficiency, warranties and certifications. Missing specifications remain clearly distinguished.
3. Supply approved full announcement bodies; current design summaries are identified as summaries.
4. Confirm training courses/accreditations/fees/dates/outcomes and placement availability/paid or voluntary terms.
5. Confirm current government-policy context and any track-record/certification claims. ISO 9001 remains withheld.
6. Confirm current corporate/office/personnel details and publication rights for supplied imagery.
7. Configure real email delivery, rebuild, and perform a company-authorised delivery check. CV upload remains explicitly unavailable; documents are directed to email.

## Git and deployment readiness

Generated evidence stays under ignored `artifacts/rebuild-qa/`; useful scripts and this report are retained. `design-reference/` and `CLAUDE_REBUILD_INSTRUCTIONS.md` are unchanged. The canonical audit now compares parsed URL paths, so the valid homepage canonical without a trailing slash passes.

Ready to commit and push to GitHub and build a fresh Vercel preview. Public production launch remains conditional on the prerequisites above. No deployment was performed.

Recommended commit: `fix: finalize Crown Power production QA and missing-route handling`.
