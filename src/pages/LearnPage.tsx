import cardsData from '../data/cards.json'
import type { BattleCard } from '../types/Card'

const cards = cardsData as BattleCard[]

export function LearnPage() {
  const featured = cards.slice(0, 6)
  return (
    <div className="space-y-4">
      <PageHeader kicker="Learn Mode" title="Command meanings without tiny tables" body="Phase 1 creates the mobile shell. Phase 2 expands the schema and Phase 3 turns this into the full learning lane." />
      <div className="space-y-3">
        {featured.map((card) => (
          <article key={card.id} className="rounded-[1.5rem] border border-white/10 bg-panel/85 p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neon">{card.category}</p>
            <h2 className="mt-2 text-lg font-black text-white">{card.answer}</h2>
            <p className="mt-2 text-sm text-slate-300">{card.explanation}</p>
            <p className="mt-3 rounded-2xl border border-amber/30 bg-amber/10 p-3 text-sm text-amber">Memory hook: {card.memoryHook}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

function PageHeader({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return <header className="space-y-2 pt-2"><p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-neon">{kicker}</p><h1 className="font-display text-3xl font-black text-white">{title}</h1><p className="text-sm leading-relaxed text-slate-400">{body}</p></header>
}
