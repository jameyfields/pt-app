import { Link } from 'react-router-dom'
import cardsData from '../data/cards.json'
import { useProgress } from '../hooks/useProgress'
import type { BattleCard } from '../types/Card'

const cards = cardsData as BattleCard[]

export function HomePage() {
  const { stats } = useProgress()
  const mastery = cards.length ? Math.round((stats.correct / Math.max(stats.correct + stats.review, 1)) * 100) : 0

  return (
    <div className="space-y-5">
      <header className="space-y-3 pt-2">
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-neon">Mobile Cyber Study PWA</p>
        <h1 className="font-display text-4xl font-black leading-none text-white sm:text-5xl">PenTest+ Battle Deck</h1>
        <p className="max-w-xl text-sm leading-relaxed text-slate-300">An installable Android-first study deck with multiple-choice drills, fill-in-the-blank recall, situational condition tests, commands, and exam-day memory hooks.</p>
      </header>

      <section className="rounded-[2rem] border border-neon/30 bg-panel/90 p-5 shadow-neon">
        <div className="grid grid-cols-3 gap-3 text-center">
          <Metric label="Cards" value={cards.length} />
          <Metric label="Mastery" value={`${mastery}%`} />
          <Metric label="Review" value={stats.review} tone="text-amber" />
        </div>
        <Link className="mt-5 flex min-h-12 items-center justify-center rounded-2xl border border-neon/40 bg-neon/15 px-4 py-3 text-sm font-black uppercase tracking-wider text-neon" to="/practice">Continue studying</Link>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        <QuickCard title="Learn" body="Command meaning, use case, memory hook, and exam trap." to="/learn" />
        <QuickCard title="Practice" body="Answer choices, type missing terms, and work scenario cards with swipe-based review." to="/practice" />
        <QuickCard title="Builder" body="Command chip challenge workspace placeholder for Phase 4." to="/builder" />
        <QuickCard title="Exam Cram" body="Fast review lane will focus on missed and high-yield cards." to="/progress" />
      </section>
    </div>
  )
}

function Metric({ label, value, tone = 'text-neon' }: { label: string; value: string | number; tone?: string }) {
  return <div className="rounded-2xl border border-white/10 bg-white/[.04] p-3"><p className={`text-2xl font-black ${tone}`}>{value}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</p></div>
}

function QuickCard({ title, body, to }: { title: string; body: string; to: string }) {
  return <Link className="min-h-32 rounded-[1.5rem] border border-white/10 bg-white/[.04] p-4 transition hover:border-neon/40 hover:bg-neon/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon" to={to}><h2 className="text-xl font-black text-white">{title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p></Link>
}
