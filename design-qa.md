# Crown Power design QA

Status: **PASS**  
Reviewed: 1 September 2026

## Visual comparison evidence

- Smart Grid Transformer reference/implementation at 910 × 540: [`artifacts/qa/gridtransformer-comparison-v2.png`](artifacts/qa/gridtransformer-comparison-v2.png)
- Team-card reference/implementation at 910 × 540: [`artifacts/qa/team-grid-comparison-v2.png`](artifacts/qa/team-grid-comparison-v2.png)
- Home, Services, open mobile navigation and Contact at 430 × 932: [`artifacts/qa/mobile-comparison-final.png`](artifacts/qa/mobile-comparison-final.png)

## Fidelity review

- **Typography:** Manrope display type and Inter body type reproduce the prototype's strong editorial hierarchy. Hero, section, card and utility text were checked for wrapping at all target widths.
- **Layout and spacing:** Image heroes, alternating service sections, restrained cards, dark/light section rhythm, CTAs, footer and team grid preserve the Claude Design composition. The transformer hero was iterated against the side-by-side comparison to correct header overlay, title scale, image scrim and vertical placement.
- **Colour and surfaces:** Deep midnight/navy, off-white, engineering blue and Crown gold are tokenized in `globals.css`; borders, radii and shadows remain restrained and consistent with the target.
- **Imagery:** All production photography and team/product imagery is localized under `public/images/` and rendered through `next/image`. No placeholder avatars, generated customer imagery, CSS illustrations or broken visible images remain.
- **Icons:** Lucide icons use a consistent stroke family and are aligned within navigation, contact, capability and gallery controls.
- **Copy:** Production copy is coherent and grounded in the supplied prototype/content notes or Crown Power's public material. Template/demo values and unsupported metrics are absent.

## Responsive and interaction review

- Browser checks passed at 1440, 1280, 1024, 768, 430 and 375 CSS pixels with no document-level horizontal overflow.
- The global header remains sticky; the Services category navigation computes to `position: static` and becomes a compact horizontal scroller on mobile.
- All five Services anchors resolve and land 24 px below the 72 px mobile header after the smooth-scroll offset correction.
- The mobile navigation opens with focus on Close, traps keyboard focus, closes with Escape and returns focus to its opener.
- Team filtering returns the expected set; the profile dialog traps focus, closes with Escape/backdrop/button and returns focus to the originating card.
- The transformer gallery opens an accessible dialog, supports previous/next controls and arrow keys, traps focus, closes with Escape and returns focus to the originating thumbnail.
- Empty contact submission exposes five field errors and an alert. With no Resend configuration, the API returns a real 503 fallback to `info@crownpoweruk.co.uk`; no false success state is shown.
- Internal-link crawl completed without failures, and the branded unknown route correctly returns 404.

## Accessibility and runtime review

- Semantic landmarks, skip link, heading hierarchy, visible focus, labelled controls, reduced-motion handling, image alt treatment and mobile tap targets are present.
- Modal body scroll is locked while open and restored on close.
- Browser console monitoring across core routes reported no exceptions or console errors.
- `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass on the final source.

## Accepted minor variance

- The header uses the genuine supplied Crown Power app-icon artwork rather than recreating the prototype crown mark with approximate vector/CSS art. This preserves brand-source integrity while maintaining the approved header proportions.
