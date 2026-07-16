# PenTest+ Battle Deck Build Status

## Current phase

Phase 1 — Scaffold the application and PWA.

## Phase checklist

- [x] Phase 1: Scaffold React + TypeScript + Vite + Tailwind application.
- [x] Phase 1: Configure PWA manifest, service worker, icons, standalone mode, theme color, offline fallback, and update prompt.
- [x] Phase 1: Add mobile-first app shell with safe-area support and required bottom navigation.
- [x] Phase 1: Add `npm run test` and initial automated checks.
- [ ] Phase 2: Create the full card schema and 15-card sample deck.
- [ ] Phase 3: Build Learn and Practice modes.
- [ ] Phase 4: Build Command Builder.
- [ ] Phase 5: Add progress tracking and spaced repetition.
- [ ] Phase 6: Expand to at least 50 original Nmap cards.
- [ ] Phase 7: Run tests, correct failures, and produce a successful production build.

## Last verified commands

Verified successfully for Phase 1:

```bash
npm install
npm run test
npm run lint
npm run build
```

PWA artifact verification passed for:

```text
dist/manifest.webmanifest
dist/sw.js
dist/icons/icon-192.png
dist/icons/icon-512.png
dist/icons/maskable-512.png
dist/offline.html
```

## Notes

- Source material must be converted into original scenario cards and explanations. Do not copy WGU slides or reproduce proprietary material verbatim.
- The project is local-first. Progress storage starts local-only and will gain export/import in a later phase.
- PWA artifacts are expected in `dist/manifest.webmanifest` and `dist/sw.js` after production build.
