# Motion system — 28 September 2026

The motion follows the portfolio's physical materials: the MUSKI360 disk,
tilted photographic prints, the Mentup screen above its court, and the footer's
rolling type. Reading and navigation remain the stable layer. The existing
assets, copy, palette, layout and Lenis integration are preserved.

| Moment | Behavior and limits |
| --- | --- |
| Opening and route entrances | The two name lines open through a short mask. Selected headings and content settle by 24 px, once per page mount. Duration: 520–680 ms; stagger capped at 165 ms. Mobile uses 12 px and 420 ms. |
| Scroll depth | On wide screens with a fine pointer, the name travels up to 28 px, disk −48 px, label −20 px, and portraits ±22 px with ±1° of rotation. Scroll progress drives the effects directly; there are no pinned scenes. |
| Disk and project media | The disk responds within ±3° pitch and ±5° yaw. Its controls reset pointer tilt. The Mentup screen settles from a shallow perspective into its court; focus/hover pauses that scroll animation. |
| Navigation and feedback | Links draw their underline toward the destination; arrows move 3–5 px. The mobile index enters with 40 ms spacing. Keyboard focus settles the index immediately. Certificate rows no longer animate padding. |
| Footer | Its existing letter roll now uses the shared timing curve, runs once on entry, and can be replayed by hover or focus. Touch does not synthesize a hover replay. |

`src/components/motion/PageMotion.jsx` owns the one-shot entrances, pointer
updates and teardown. `src/styles/motion.css` owns scroll timelines and
interaction states. Timing tokens live in `src/styles/global.css`; page markup
opts into entrances with `data-reveal`. The footer retains its own scoped
animation lifecycle. No dependencies were added.

The implementation uses [Web Animations](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)
for entrances and guarded [CSS scroll timelines](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline)
for depth. Unsupported timelines retain the static composition. Missing
observers or animation APIs do not hide the HTML. Global pause and live system
reduced-motion changes cancel animations and return to native scrolling;
coarse pointers and widths below 901 px use the static depth composition.
Observers, listeners and pending pointer frames are removed on teardown;
completed entrance effects are released. No continuous JavaScript animation
loop was added.

## Verification

- `npm run lint`, `npm run build`, and `git diff --check` passed.
- Chrome: **92/92** behavioral, fallback and layout checks passed. Five routes
  were checked at 320, 390, 768 and 1440 px. Ten automated accessibility scans
  found no violations. Desktop and mobile screenshots were visually reviewed.
  Two additional checks confirm safe startup when CSS timing tokens are absent.
- Edge: **16/16** existing scroll/navigation checks passed, including wheel
  interruption, anchors, skip links, history, pause/resume and mobile menu locks.
- Local Lighthouse mobile run against the production preview: **95 performance,
  100 accessibility, 100 best practices, 100 SEO**. FCP 2.0 s, LCP 2.7 s,
  CLS 0, TBT 0 ms. These are local lab results, not field measurements.
- Production assets: JS **319.09 kB / 99.24 kB gzip**; CSS **42.26 kB / 9.43 kB
  gzip**. Safari and physical touch/trackpad hardware were not tested.

The local regression script is `.design-review/motion-check.mjs` (uses the
workspace's existing Playwright/Axe tools); run it with
`node .design-review/motion-check.mjs` while the production preview is on port
4173. Reports: `.design-review/motion-chrome.json`,
`.design-review/lenis-msedge.json`, `.design-review/lighthouse-motion.json`.
Screenshots: `.design-review/output/playwright/motion-*.png`. These local
artifacts follow the repository's existing ignored review-directory convention.
The timing-token fallback check is `.design-review/motion-style-check.mjs`.
