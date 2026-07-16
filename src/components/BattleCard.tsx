import { useRef, useState } from 'react'
import type { BattleCard as BattleCardType, CardProgress } from '../types/Card'

interface BattleCardProps {
  card: BattleCardType
  progress: CardProgress
  onCorrect: () => void
  onReview: () => void
  onToggleFavorite: () => void
}

export function BattleCard({ card, progress, onCorrect, onReview, onToggleFavorite }: BattleCardProps) {
  const [flipped, setFlipped] = useState(false)
  const dragStartRef = useRef<number | null>(null)
  const [dragX, setDragX] = useState(0)

  function handlePointerDown(clientX: number) {
    dragStartRef.current = clientX
    setDragX(0)
  }

  function handlePointerMove(clientX: number) {
    if (dragStartRef.current === null) return
    setDragX(clientX - dragStartRef.current)
  }

  function finishSwipe() {
    if (dragX > 88) {
      setFlipped(false)
      onCorrect()
    } else if (dragX < -88) {
      setFlipped(false)
      onReview()
    } else if (Math.abs(dragX) < 10 && dragStartRef.current !== null) {
      setFlipped((value) => !value)
    }
    dragStartRef.current = null
    setDragX(0)
  }

  const rotate = Math.max(-10, Math.min(10, dragX / 16))

  return (
    <article className="relative mx-auto w-full max-w-md select-none">
      <div className="pointer-events-none absolute -left-2 top-16 z-0 rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-black uppercase tracking-widest text-red-200 opacity-80">
        Review
      </div>
      <div className="pointer-events-none absolute -right-2 top-16 z-0 rounded-full border border-neon/40 bg-neon/10 px-4 py-2 text-sm font-black uppercase tracking-widest text-neon opacity-80">
        Correct
      </div>

      <div
        className="relative z-10 min-h-[510px] touch-pan-y cursor-pointer rounded-[2rem] border border-neon/40 bg-panel/95 p-4 shadow-neon transition-transform duration-150 [perspective:1200px] sm:min-h-[560px]"
        style={{ transform: `translateX(${dragX}px) rotate(${rotate}deg)` }}
        onPointerDown={(event) => handlePointerDown(event.clientX)}
        onPointerMove={(event) => handlePointerMove(event.clientX)}
        onPointerUp={finishSwipe}
        onPointerCancel={finishSwipe}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') setFlipped((value) => !value)
          if (event.key === 'ArrowRight') onCorrect()
          if (event.key === 'ArrowLeft') onReview()
        }}
        aria-label="Flashcard. Tap to flip. Swipe right correct, left review."
      >
        <div className="absolute inset-0 rounded-[2rem] bg-grid bg-[length:22px_22px] opacity-35" />
        <div className="absolute inset-3 rounded-[1.6rem] border border-white/10" />
        <div className="relative flex h-full min-h-[478px] flex-col rounded-[1.55rem] border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-cyan-950/20 p-5 sm:min-h-[528px]">
          <header className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-neon">PenTest+ Battle Deck</p>
              <h2 className="mt-2 font-display text-xl font-black text-white">{card.category}</h2>
            </div>
            <button
              className={`rounded-full border px-3 py-2 text-lg ${progress.favorite ? 'border-amber bg-amber/20 text-amber' : 'border-white/10 bg-white/5 text-slate-300'}`}
              type="button"
              onPointerDown={(event) => event.stopPropagation()}
              onPointerUp={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation()
                onToggleFavorite()
              }}
              aria-label={progress.favorite ? 'Remove favorite' : 'Add favorite'}
            >
              ★
            </button>
          </header>

          <div className="my-4 flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
            <span className="rounded-full border border-white/10 px-2 py-1">{card.difficulty}</span>
            {progress.needsReview && <span className="rounded-full border border-red-400/40 bg-red-500/10 px-2 py-1 text-red-200">Needs Review</span>}
          </div>

          <div className="grid flex-1 place-items-center text-center">
            {!flipped ? (
              <div className="space-y-5">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-neon/50 bg-neon/10 text-3xl shadow-neon">?</div>
                <p className="text-2xl font-black leading-tight text-white sm:text-3xl">{card.frontPrompt}</p>
                <p className="text-sm text-slate-400">Tap to reveal the answer. Swipe like the card owes you money.</p>
              </div>
            ) : (
              <div className="w-full space-y-4 text-left">
                <div className="rounded-2xl border border-neon/30 bg-neon/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neon">Answer</p>
                  <p className="mt-2 text-xl font-black text-white">{card.answer}</p>
                </div>
                <InfoBlock label="Explanation" value={card.explanation} />
                {card.command && card.command !== 'N/A' && (
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Command</p>
                    <code className="mt-2 block overflow-x-auto whitespace-pre-wrap break-words text-sm text-amber">{card.command}</code>
                  </div>
                )}
                <InfoBlock label="Memory Hook" value={card.memoryHook} accent="text-amber" />
                <InfoBlock label="Exam Trap" value={card.examTrap} accent="text-magenta" />
              </div>
            )}
          </div>

          <footer className="mt-5 flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300">
                #{tag}
              </span>
            ))}
          </footer>
        </div>
      </div>
    </article>
  )
}

function InfoBlock({ label, value, accent = 'text-slate-300' }: { label: string; value: string; accent?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">{label}</p>
      <p className={`mt-2 text-sm leading-relaxed ${accent}`}>{value}</p>
    </div>
  )
}
