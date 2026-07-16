# Changelog

## 0.2.0 - Interactive practice expansion

- Expanded the starter deck from 16 to 39 original PenTest+ study cards across Nmap, recon, web attacks, AD/Kerberos, cloud/containers, reporting, wireless/social engineering, and scripting/code interpretation.
- Added optional multiple-choice answers to the card schema.
- Turned Practice mode into an interactive answer-pick flow with immediate correct/trap feedback before the explanation.
- Added per-card correct/review counters on the card face and updated the mobile copy for the new flow.
- Verified tests, lint, production GitHub Pages build, SPA 404 fallback, manifest, service worker, and required PWA icons.

## 0.1.1 - GitHub Pages deployment

- Added GitHub Actions workflow to build, test, lint, and deploy the PWA to GitHub Pages.
- Configured GitHub Pages base path `/pt-app/` for CI builds.
- Updated React Router basename so app routes work from the project-page URL.
- Verified GitHub Pages build output, manifest scope/start URL, icons, service worker, and offline fallback.

## 0.1.0 - Phase 1

- Scaffolded React + TypeScript + Vite application.
- Added Tailwind CSS dark cyber playing-card visual foundation.
- Configured installable PWA support with manifest, service worker, offline fallback, app icons, maskable icon, and update prompt.
- Added mobile-first bottom navigation: Home, Learn, Practice, Builder, Progress.
- Added initial Phase 1 documentation and build status tracking.
