import cardsData from '../data/cards.json'
import { useProgress } from '../hooks/useProgress'
import type { BattleCard } from '../types/Card'

const cards = cardsData as BattleCard[]

export function ProgressPage() {
  const { stats, resetProgress } = useProgress()
  return (
    <div className="space-y-5">
      <header className="space-y-2 pt-2"><p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-neon">Progress</p><h1 className="font-display text-3xl font-black text-white">Local study stats</h1><p className="text-sm leading-relaxed text-slate-400">Progress stays on this device for version one. Export/import arrives in a later phase.</p></header>
      <section className="grid grid-cols-2 gap-3">
        <Metric label="Cards viewed" value={stats.viewed} />
        <Metric label="Correct" value={stats.correct} tone="text-lime-300" />
        <Metric label="Review" value={stats.review} tone="text-amber" />
        <Metric label="Deck size" value={cards.length} />
      </section>
      <button className="min-h-12 w-full rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-black uppercase tracking-wider text-red-100" type="button" onClick={resetProgress}>Reset local progress</button>
    </div>
  )
}

function Metric({ label, value, tone = 'text-neon' }: { label: string; value: string | number; tone?: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4"><p className={`text-3xl font-black ${tone}`}>{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p></div>
}
