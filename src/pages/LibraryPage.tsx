import cardsData from '../data/cards.json'
import type { BattleCard } from '../types/Card'

const cards = cardsData as BattleCard[]

export function LibraryPage() {
  return (
    <div className="space-y-4 pt-2">
      <header>
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-magenta">Card Database</p>
        <h1 className="font-display text-4xl font-black text-white">Library</h1>
        <p className="mt-2 text-sm text-slate-400">JSON-powered cards grouped by exam topic.</p>
      </header>
      <div className="space-y-3">
        {cards.map((card) => (
          <article key={card.id} className="rounded-3xl border border-white/10 bg-white/[.04] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-neon">{card.category}</p>
                <h2 className="mt-1 text-lg font-black text-white">{card.frontPrompt}</h2>
              </div>
              <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-slate-300">{card.difficulty}</span>
            </div>
            <p className="mt-3 text-sm text-slate-300"><strong className="text-white">Answer:</strong> {card.answer}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {card.tags.map((tag) => <span key={tag} className="rounded-full bg-black/30 px-2 py-1 text-xs text-slate-400">#{tag}</span>)}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
