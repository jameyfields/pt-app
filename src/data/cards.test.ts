import { describe, expect, it } from 'vitest'
import cardsData from './cards.json'
import type { BattleCard } from '../types/Card'

const cards = cardsData as BattleCard[]

describe('battle card review question types', () => {
  it('includes fill-in-the-blank cards with accepted typed answers', () => {
    const fillBlankCards = cards.filter((card) => card.questionType === 'fill-blank')

    expect(fillBlankCards.length).toBeGreaterThanOrEqual(6)
    expect(fillBlankCards.every((card) => card.acceptedAnswers && card.acceptedAnswers.length >= 2)).toBe(true)
    expect(fillBlankCards.some((card) => card.frontPrompt.includes('_____'))).toBe(true)
  })

  it('includes situational condition tests that describe trigger conditions and best next actions', () => {
    const scenarios = cards.filter((card) => card.questionType === 'scenario')

    expect(scenarios.length).toBeGreaterThanOrEqual(8)
    expect(scenarios.every((card) => card.scenario?.condition && card.scenario.bestAction)).toBe(true)
    expect(scenarios.some((card) => card.tags.includes('situational'))).toBe(true)
  })

  it('keeps multiple-choice cards explicit so the mobile UI can choose the right input', () => {
    const multipleChoiceCards = cards.filter((card) => card.questionType === 'multiple-choice')

    expect(multipleChoiceCards.length).toBeGreaterThan(20)
    expect(multipleChoiceCards.every((card) => card.choices && card.choices.includes(card.answer))).toBe(true)
  })
})
