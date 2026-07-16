export const appConfig = {
  name: 'PenTest+ Battle Deck',
  shortName: 'Battle Deck',
  version: '0.1.0',
  cardDatabaseVersion: '2026.07.phase1',
  themeColor: '#070a12',
  accentColor: '#31f7c7',
  navItems: [
    { path: '/', label: 'Home', icon: '⌂' },
    { path: '/learn', label: 'Learn', icon: '◆' },
    { path: '/practice', label: 'Practice', icon: '⚔' },
    { path: '/builder', label: 'Builder', icon: '▣' },
    { path: '/progress', label: 'Progress', icon: '◉' },
  ],
} as const

export type NavItem = (typeof appConfig.navItems)[number]
