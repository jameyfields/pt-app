import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { CardProgress, ProgressMap } from '../types/Card'

const emptyProgress = (): CardProgress => ({
  correct: 0,
  review: 0,
  favorite: false,
  needsReview: false,
})

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<ProgressMap>('pentest-battle-deck-progress-v1', {})

  const stats = useMemo(() => {
    const values = Object.values(progress)
    return {
      viewed: values.length,
      correct: values.reduce((sum, item) => sum + item.correct, 0),
      review: values.reduce((sum, item) => sum + item.review, 0),
      favorites: values.filter((item) => item.favorite).length,
      needsReview: values.filter((item) => item.needsReview).length,
    }
  }, [progress])

  function getCardProgress(id: string): CardProgress {
    return progress[id] ?? emptyProgress()
  }

  function markCorrect(id: string) {
    setProgress((current) => {
      const existing = current[id] ?? emptyProgress()
      return {
        ...current,
        [id]: {
          ...existing,
          correct: existing.correct + 1,
          needsReview: false,
          lastSeen: new Date().toISOString(),
        },
      }
    })
  }

  function markReview(id: string) {
    setProgress((current) => {
      const existing = current[id] ?? emptyProgress()
      return {
        ...current,
        [id]: {
          ...existing,
          review: existing.review + 1,
          needsReview: true,
          lastSeen: new Date().toISOString(),
        },
      }
    })
  }

  function toggleFavorite(id: string) {
    setProgress((current) => {
      const existing = current[id] ?? emptyProgress()
      return {
        ...current,
        [id]: {
          ...existing,
          favorite: !existing.favorite,
        },
      }
    })
  }

  function resetProgress() {
    setProgress({})
  }

  return { progress, stats, getCardProgress, markCorrect, markReview, toggleFavorite, resetProgress }
}
