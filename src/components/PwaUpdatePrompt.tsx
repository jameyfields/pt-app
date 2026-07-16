import { useRegisterSW } from 'virtual:pwa-register/react'

export function PwaUpdatePrompt() {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW({ immediate: true })

  if (!needRefresh) return null

  return (
    <div className="fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-md rounded-3xl border border-amber/40 bg-panel/95 p-4 shadow-neon backdrop-blur" role="status" aria-live="polite">
      <p className="text-sm font-black text-white">Update ready</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-300">A fresh Battle Deck build is available. Reload when ready to swap in the latest cards and fixes.</p>
      <button className="mt-3 min-h-11 w-full rounded-2xl border border-amber/50 bg-amber/15 px-4 py-2 text-sm font-black text-amber" type="button" onClick={() => updateServiceWorker(true)}>
        Reload app
      </button>
    </div>
  )
}
