import { useMemo, useRef, useState } from 'react'
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
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [typedAnswer, setTypedAnswer] = useState('')
  const dragStartRef = useRef<number | null>(null)
  const [dragX, setDragX] = useState(0)

  const questionType = card.questionType ?? (card.choices?.length ? 'multiple-choice' : 'flashcard')
  const choices = useMemo(() => card.choices ?? [], [card.choices])
  const hasChoices = choices.length > 0
  const expectedAnswers = useMemo(() => [card.answer, ...(card.acceptedAnswers ?? [])], [card.answer, card.acceptedAnswers])
  const submittedAnswer = selectedChoice ?? typedAnswer
  const answeredCorrectly = submittedAnswer ? isAcceptedAnswer(submittedAnswer, expectedAnswers) : false

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
    } else if (Math.abs(dragX) < 10 && dragStartRef.current !== null && !submittedAnswer) {
      setFlipped((value) => !value)
    }
    dragStartRef.current = null
    setDragX(0)
  }

  function handleChoice(choice: string) {
    setSelectedChoice(choice)
    setTypedAnswer(choice)
    setFlipped(true)
  }

  function handleFillBlankSubmit() {
    if (!typedAnswer.trim()) return
    setSelectedChoice(null)
    setFlipped(true)
  }

  const rotate = Math.max(-10, Math.min(10, dragX / 16))

  return (
    <article className="relative mx-auto w-full max-w-md select-none">
      <div className="pointer-events-none absolute -left-2 top-16 z-0 hidden rounded-full border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-black uppercase tracking-widest text-red-200 opacity-80 sm:block">
        Review
      </div>
      <div className="pointer-events-none absolute -right-2 top-16 z-0 hidden rounded-full border border-neon/40 bg-neon/10 px-4 py-2 text-sm font-black uppercase tracking-widest text-neon opacity-80 sm:block">
        Correct
      </div>

      <div
        className="relative z-10 min-h-[calc(100svh-17rem)] touch-pan-y cursor-pointer rounded-[1.5rem] border border-neon/40 bg-panel/95 p-3 shadow-neon transition-transform duration-150 [perspective:1200px] sm:min-h-[600px] sm:rounded-[2rem] sm:p-4"
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
        aria-label="Interactive flashcard. Choose or type an answer, tap to flip, swipe right correct, left review."
      >
        <div className="absolute inset-0 rounded-[1.5rem] bg-grid bg-[length:22px_22px] opacity-35 sm:rounded-[2rem]" />
        <div className="absolute inset-2 rounded-[1.2rem] border border-white/10 sm:inset-3 sm:rounded-[1.6rem]" />
        <div className="relative flex h-full min-h-[calc(100svh-18.5rem)] flex-col overflow-hidden rounded-[1.1rem] border border-white/10 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-cyan-950/20 p-4 sm:min-h-[568px] sm:rounded-[1.55rem] sm:p-5">
          <header className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.3em] text-neon">PenTest+ Battle Deck</p>
              <h2 className="mt-2 font-display text-lg font-black text-white sm:text-xl">{card.category}</h2>
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

          <div className="my-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-widest text-slate-400 sm:my-4 sm:text-xs">
            <span className="rounded-full border border-white/10 px-2 py-1">{card.difficulty}</span>
            <span className="rounded-full border border-neon/20 bg-neon/10 px-2 py-1 text-neon">{formatQuestionType(questionType)}</span>
            <span className="rounded-full border border-white/10 px-2 py-1">✓ {progress.correct}</span>
            <span className="rounded-full border border-white/10 px-2 py-1">↻ {progress.review}</span>
            {progress.needsReview && <span className="rounded-full border border-red-400/40 bg-red-500/10 px-2 py-1 text-red-200">Needs Review</span>}
          </div>

          <div className="grid flex-1 place-items-center overflow-y-auto pr-1 text-center">
            {!flipped ? (
              <div className="w-full space-y-4 sm:space-y-5">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-neon/50 bg-neon/10 text-2xl shadow-neon sm:h-16 sm:w-16 sm:text-3xl">
                  {questionType === 'fill-blank' ? '___' : questionType === 'scenario' ? '!' : '?'}
                </div>
                <p className="text-xl font-black leading-tight text-white sm:text-3xl">{card.frontPrompt}</p>

                {card.scenario && <ScenarioBlock condition={card.scenario.condition} bestAction={card.scenario.bestAction} revealAction={false} />}

                {questionType === 'fill-blank' ? (
                  <div className="space-y-3 text-left">
                    <label className="block text-xs font-bold uppercase tracking-[0.25em] text-slate-400" htmlFor={`answer-${card.id}`}>
                      Type the missing answer
                    </label>
                    <input
                      id={`answer-${card.id}`}
                      className="answer-input"
                      value={typedAnswer}
                      placeholder="Tap here and answer..."
                      autoCapitalize="none"
                      autoCorrect="off"
                      spellCheck={false}
                      onPointerDown={(event) => event.stopPropagation()}
                      onPointerUp={(event) => event.stopPropagation()}
                      onChange={(event) => setTypedAnswer(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                          event.stopPropagation()
                          handleFillBlankSubmit()
                        }
                      }}
                    />
                    <button
                      className="action-button w-full border-neon/40 bg-neon/10 text-neon"
                      type="button"
                      onPointerDown={(event) => event.stopPropagation()}
                      onPointerUp={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation()
                        handleFillBlankSubmit()
                      }}
                    >
                      Check Answer
                    </button>
                  </div>
                ) : hasChoices ? (
                  <div className="grid gap-2 text-left" aria-label="Answer choices">
                    {choices.map((choice, index) => (
                      <button
                        key={choice}
                        className="choice-button"
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onPointerUp={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation()
                          handleChoice(choice)
                        }}
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-neon/30 bg-neon/10 text-xs font-black text-neon">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{choice}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">Tap to reveal the answer. Swipe like the card owes you money.</p>
                )}
              </div>
            ) : (
              <div className="w-full space-y-4 text-left">
                {submittedAnswer && (
                  <div className={`rounded-2xl border p-4 ${answeredCorrectly ? 'border-neon/40 bg-neon/10' : 'border-red-400/40 bg-red-500/10'}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${answeredCorrectly ? 'text-neon' : 'text-red-200'}`}>
                      {answeredCorrectly ? 'Correct hit' : 'Trap spotted'}
                    </p>
                    <p className="mt-2 text-sm text-slate-200">You answered: <span className="font-bold text-white">{submittedAnswer}</span></p>
                  </div>
                )}
                {card.scenario && <ScenarioBlock condition={card.scenario.condition} bestAction={card.scenario.bestAction} revealAction />}
                <div className="rounded-2xl border border-neon/30 bg-neon/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-neon">Answer</p>
                  <p className="mt-2 text-lg font-black text-white sm:text-xl">{card.answer}</p>
                </div>
                <InfoBlock label="Explanation" value={card.explanation} />
                {card.command && card.command !== 'N/A' && (
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">Command / Payload</p>
                    <code className="mt-2 block overflow-x-auto whitespace-pre-wrap break-words text-sm text-amber">{card.command}</code>
                  </div>
                )}
                <InfoBlock label="Memory Hook" value={card.memoryHook} accent="text-amber" />
                <InfoBlock label="Exam Trap" value={card.examTrap} accent="text-magenta" />
              </div>
            )}
          </div>

          <footer className="mt-4 flex flex-wrap gap-2 sm:mt-5">
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

function isAcceptedAnswer(value: string, acceptedAnswers: string[]) {
  const normalizedValue = normalizeAnswer(value)
  return acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedValue)
}

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase().replace(/[“”]/g, '"').replace(/[’]/g, "'").replace(/\s+/g, ' ')
}

function formatQuestionType(type: string) {
  if (type === 'fill-blank') return 'Fill Blank'
  if (type === 'scenario') return 'Scenario'
  if (type === 'multiple-choice') return 'Choice'
  return 'Flashcard'
}

function ScenarioBlock({ condition, bestAction, revealAction }: { condition: string; bestAction: string; revealAction: boolean }) {
  return (
    <div className="rounded-2xl border border-amber/30 bg-amber/10 p-4 text-left">
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber">Situation</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-200">{condition}</p>
      {revealAction && (
        <>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-amber">Best Next Action</p>
          <p className="mt-2 text-sm leading-relaxed text-white">{bestAction}</p>
        </>
      )}
    </div>
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
