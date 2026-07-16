import { describe, expect, it } from 'vitest'
import { appConfig } from './appConfig'

describe('Phase 1 app configuration', () => {
  it('uses the required app name and Android-friendly theme color', () => {
    expect(appConfig.name).toBe('PenTest+ Battle Deck')
    expect(appConfig.themeColor).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('defines the required bottom navigation destinations', () => {
    expect(appConfig.navItems.map((item) => item.label)).toEqual(['Home', 'Learn', 'Practice', 'Builder', 'Progress'])
    expect(appConfig.navItems.every((item) => item.path.startsWith('/'))).toBe(true)
  })
})
