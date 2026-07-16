const starterChips = ['nmap', '-Pn', '-p-', '-sV', '-T4', 'target']

export function BuilderPage() {
  return (
    <div className="space-y-5">
      <header className="space-y-2 pt-2"><p className="font-display text-xs font-bold uppercase tracking-[0.35em] text-neon">Command Builder</p><h1 className="font-display text-3xl font-black text-white">Build the scan</h1><p className="text-sm leading-relaxed text-slate-400">Phase 4 will validate required switches, conflicts, and order-tolerant answers. The Phase 1 shell reserves the workspace.</p></header>
      <section className="rounded-[2rem] border border-white/10 bg-panel/90 p-5">
        <p className="text-sm font-bold uppercase tracking-widest text-amber">Example challenge</p>
        <p className="mt-2 text-xl font-black text-white">Known live host. Scan all TCP ports, identify service versions, use aggressive-but-stable timing.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {starterChips.map((chip) => <button key={chip} className="chip min-h-11" type="button">{chip}</button>)}
        </div>
        <pre className="mt-5 overflow-x-auto rounded-2xl border border-neon/20 bg-black/50 p-4 text-sm text-neon">nmap -Pn -p- -sV -T4 target</pre>
      </section>
    </div>
  )
}
