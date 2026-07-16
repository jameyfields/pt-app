# PenTest+ Battle Deck

A production-oriented, mobile-first Progressive Web App for studying Nmap commands and PenTest+ concepts through cards, scenarios, and command-building drills.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- vite-plugin-pwa
- React Router
- Vitest
- Local JSON card data for version one

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local Vite URL. To test on an Android phone on the same Wi-Fi, use the Network URL Vite prints.

## Testing

```bash
npm run test
npm run lint
```

## Production build

```bash
npm run build
npm run preview
```

Production files are emitted to `dist/`.

## PWA testing

After `npm run build`, verify these exist:

```text
dist/manifest.webmanifest
dist/sw.js
dist/icons/icon-192.png
dist/icons/icon-512.png
dist/icons/maskable-512.png
```

Then run:

```bash
npm run preview
```

Use Chrome DevTools Lighthouse/Application panels to confirm manifest, service worker, offline readiness, and installability.

## Android installation

1. Host the built app on HTTPS. Cloudflare Pages, Netlify, GitHub Pages, or a small HTTPS server all work.
2. Open the site in Chrome on Android.
3. Use Chrome menu → Install app or Add to Home screen.
4. Launch from the new icon.
5. Open once while online so the shell and study deck cache.
6. Test in airplane mode.

## Hosting

Recommended simple hosts:

- Cloudflare Pages
- Netlify
- GitHub Pages
- Existing Linux server with HTTPS

Installable PWAs need HTTPS except for localhost development.

## Future Capacitor conversion

Once the PWA is stable:

```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
npx cap init
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Android Studio can then build an APK from the generated Android project.

## Card database editing

Current card data lives in:

```text
src/data/cards.json
```

Phase 2 will replace the starter shape with the required schema:

```ts
{
  id: string
  category: string
  subcategory: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  type: 'scenario' | 'command' | 'concept' | 'output-identification'
  frontPrompt: string
  choices?: string[]
  answer: string
  command?: string
  explanation: string
  whyOthersAreWrong?: string[]
  memoryHook: string
  examTrap: string
  relatedCommands?: string[]
  tags: string[]
  sourceTopic: string
}
```

## Backup and restore

Progress is local to the browser in version one. Export/import is scheduled for a later phase. Until then, use the same browser/profile/device for continuity.

## Copyright/source rules

Do not include copyrighted WGU slide images or copy reference documents verbatim. Convert concepts into original scenario cards, explanations, diagrams, and memory hooks.
