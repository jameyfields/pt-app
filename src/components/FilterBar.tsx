import type { CardCategory } from '../types/Card'
import { categories } from '../utils/categories'

type FilterMode = 'all' | 'favorites' | 'review'

interface FilterBarProps {
  selectedCategory: CardCategory | 'All'
  mode: FilterMode
  onCategoryChange: (category: CardCategory | 'All') => void
  onModeChange: (mode: FilterMode) => void
}

export function FilterBar({ selectedCategory, mode, onCategoryChange, onModeChange }: FilterBarProps) {
  return (
    <section className="space-y-3" aria-label="Deck filters">
      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {(['All', ...categories] as Array<CardCategory | 'All'>).map((category) => (
          <button
            key={category}
            className={`chip whitespace-nowrap ${selectedCategory === category ? 'chip-active' : ''}`}
            onClick={() => onCategoryChange(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ['all', 'All Cards'],
          ['favorites', 'Favorites'],
          ['review', 'Needs Review'],
        ].map(([value, label]) => (
          <button
            key={value}
            className={`rounded-xl border px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
              mode === value
                ? 'border-neon bg-neon/15 text-neon shadow-neon'
                : 'border-white/10 bg-white/5 text-slate-300 active:scale-[.98]'
            }`}
            onClick={() => onModeChange(value as FilterMode)}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  )
}
