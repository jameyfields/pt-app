# PenTest+ Battle Deck Build Status

## Current phase

Phase 3.5 — Mixed review modes: multiple choice, fill-in-the-blank, and situational condition tests.

## Phase checklist

- [x] Phase 1: Scaffold React + TypeScript + Vite + Tailwind application.
- [x] Phase 1: Configure PWA manifest, service worker, icons, standalone mode, theme color, offline fallback, and update prompt.
- [x] Phase 1: Add mobile-first app shell with safe-area support and required bottom navigation.
- [x] Phase 1: Add `npm run test` and initial automated checks.
- [x] Phase 2: Create the expanded card schema and 39-card sample deck.
- [x] Phase 3: Build interactive Learn and Practice card modes.
- [x] Phase 3.5: Add mixed review question types and mobile-friendly typed-answer/scenario cards.
- [ ] Phase 4: Build Command Builder.
- [ ] Phase 5: Add progress tracking and spaced repetition.
- [ ] Phase 6: Expand to at least 50 original Nmap cards.
- [ ] Phase 7: Run tests, correct failures, and produce a successful production build.

## Last verified commands

Verified successfully for mixed review modes:

```bash
npm run test
npm run lint
GITHUB_PAGES_BASE=/pt-app/ npm run build
```

PWA artifact verification passed for:

```text
dist/manifest.webmanifest
dist/sw.js
dist/icons/icon-192.png
dist/icons/icon-512.png
dist/icons/maskable-512.png
dist/404.html
```

## Notes

- Source material must be converted into original scenario cards and explanations. Do not copy WGU slides or reproduce proprietary material verbatim.
- The project is local-first. Progress storage starts local-only and will gain export/import in a later phase.
- PWA artifacts are expected in `dist/manifest.webmanifest` and `dist/sw.js` after production build.

## GitHub Pages deployment

Configured and verified in this milestone:

- Vite uses `/pt-app/` as the base path when building in GitHub Actions.
- React Router uses `import.meta.env.BASE_URL` as its basename so routes work under GitHub Pages.
- `.github/workflows/deploy-pages.yml` builds, tests, lints, uploads `dist/`, and deploys to GitHub Pages.
- GitHub Pages test URL after the workflow succeeds should be:

```text
https://jameyfields.github.io/pt-app/
```

Local verification command used:

```bash
GITHUB_ACTIONS=true GITHUB_PAGES_BASE=/pt-app/ npm run build
```

Verified manifest/app shell values:

```text
manifest.start_url = /pt-app/
manifest.scope = /pt-app/
icon paths start with /pt-app/
index.html asset paths start with /pt-app/assets/
```
