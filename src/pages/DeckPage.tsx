import { useMemo, useState } from 'react'
import cardsData from '../data/cards.json'
import { BattleCard } from '../components/BattleCard'
import { FilterBar } from '../components/FilterBar'
import { StatsPanel } from '../components/StatsPanel'
import { useProgress } from '../hooks/useProgress'
import type { BattleCard as BattleCardType, CardCategory } from '../types/Card'

const cards = cardsData as BattleCardType[]
type FilterMode = 'all' | 'favorites' | 'review'

export function DeckPage() {
  const [selectedCategory, setSelectedCategory] = useState<CardCategory | 'All'>('All')
  const [mode, setMode] = useState<FilterMode>('all')
  const [index, setIndex] = useState(0)
  const { stats, getCardProgress, markCorrect, markReview, toggleFavorite, resetProgress } = useProgress()

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const progress = getCardProgress(card.id)
      const categoryMatch = selectedCategory === 'All' || card.category === selectedCategory
      const modeMatch =
        mode === 'all' || (mode === 'favorites' && progress.favorite) || (mode === 'review' && progress.needsReview)
      return categoryMatch && modeMatch
    })
  }, [selectedCategory, mode, getCardProgress])

  const current = filteredCards[index % Math.max(filteredCards.length, 1)]

  function advance() {
    setIndex((value) => (filteredCards.length ? (value + 1) % filteredCards.length : 0))
  }

  function handleCorrect() {
    if (!current) return
    markCorrect(current.id)
    advance()
  }

  function handleReview() {
    if (!current) return
    markReview(current.id)
    advance()
  }

  return (
    <div className="space-y-5">
      <header className="space-y-2 pt-2">
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-neon">Mobile Cyber Flashcards</p>
        <h1 className="font-display text-4xl font-black leading-none text-white sm:text-5xl">PenTest+ Battle Deck</h1>
        <p className="max-w-xl text-sm leading-relaxed text-slate-400">
          Tap to flip. Swipe right for correct. Swipe left for review. Progress stays local on this device.
        </p>
      </header>

      <StatsPanel total={cards.length} visible={filteredCards.length} {...stats} />
      <FilterBar
        selectedCategory={selectedCategory}
        mode={mode}
        onCategoryChange={(category) => {
          setSelectedCategory(category)
          setIndex(0)
        }}
        onModeChange={(nextMode) => {
          setMode(nextMode)
          setIndex(0)
        }}
      />

      {current ? (
        <>
          <BattleCard
            key={current.id}
            card={current}
            progress={getCardProgress(current.id)}
            onCorrect={handleCorrect}
            onReview={handleReview}
            onToggleFavorite={() => toggleFavorite(current.id)}
          />
          <div className="grid grid-cols-2 gap-3">
            <button className="action-button border-red-400/30 bg-red-500/10 text-red-100" onClick={handleReview} type="button">← Review Again</button>
            <button className="action-button border-neon/40 bg-neon/10 text-neon" onClick={handleCorrect} type="button">Correct →</button>
          </div>
        </>
      ) : (
        <div className="rounded-[2rem] border border-white/10 bg-white/[.04] p-8 text-center">
          <p className="text-xl font-black text-white">No cards match this filter.</p>
          <p className="mt-2 text-slate-400">Try All Cards or add favorites/review cards first.</p>
        </div>
      )}

      <button className="w-full rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm font-bold text-slate-300" type="button" onClick={resetProgress}>
        Reset local progress
      </button>
    </div>
  )
}
