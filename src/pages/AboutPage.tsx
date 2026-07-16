export function AboutPage() {
  return (
    <div className="space-y-5 pt-2">
      <header>
        <p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-amber">Installable Offline PWA</p>
        <h1 className="font-display text-4xl font-black text-white">About</h1>
      </header>
      <section className="rounded-[2rem] border border-white/10 bg-white/[.04] p-5 text-slate-300">
        <p>
          PenTest+ Battle Deck is designed for quick mobile review: standing in a hallway, waiting before class,
          or fighting the tiny dragon known as “I know this, but I forgot the flag.”
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-400">
          <li>Install from your browser menu: “Add to Home Screen” or “Install app.”</li>
          <li>Cards and app shell work offline after first load/build.</li>
          <li>Progress, favorites, and review flags are saved only in this browser.</li>
          <li>Add more questions by editing <code className="text-neon">src/data/cards.json</code>.</li>
        </ul>
      </section>
    </div>
  )
}
