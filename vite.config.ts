import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { appConfig } from './src/config/appConfig'

const githubPagesBase = process.env.GITHUB_PAGES_BASE ?? '/pt-app/'
const base = process.env.GITHUB_ACTIONS === 'true' ? githubPagesBase : '/'
const withBase = (path: string) => `${base}${path}`.replace(/\/+/g, '/')

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'offline.html'],
      manifest: {
        name: appConfig.name,
        short_name: appConfig.shortName,
        description: 'Android-first PenTest+ study PWA for Nmap commands, flashcards, scenarios, and command-building drills.',
        theme_color: appConfig.themeColor,
        background_color: appConfig.themeColor,
        display: 'standalone',
        orientation: 'portrait',
        start_url: base,
        scope: base,
        icons: [
          { src: withBase('icons/icon-192.png'), sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: withBase('icons/icon-512.png'), sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: withBase('icons/maskable-512.png'), sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: withBase('icons/icon.svg'), sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,json,ico,webmanifest}'],
        navigateFallback: withBase('index.html'),
      },
      devOptions: { enabled: true },
    }),
  ],
})
