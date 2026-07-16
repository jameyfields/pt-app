interface StatsPanelProps {
  total: number
  visible: number
  correct: number
  review: number
  favorites: number
  needsReview: number
}

export function StatsPanel({ total, visible, correct, review, favorites, needsReview }: StatsPanelProps) {
  const stats = [
    ['Visible', visible],
    ['Total', total],
    ['Correct', correct],
    ['Review', review],
    ['★', favorites],
    ['Again', needsReview],
  ]

  return (
    <section className="grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Progress stats">
      {stats.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-white/10 bg-white/[.04] p-3 text-center shadow-inner">
          <div className="font-display text-lg font-black text-white">{value}</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</div>
        </div>
      ))}
    </section>
  )
}
