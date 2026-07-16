import { NavLink } from 'react-router-dom'
import { appConfig } from '../config/appConfig'

export function BottomNav() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon ${
      isActive ? 'bg-neon/15 text-neon shadow-neon' : 'text-slate-400 hover:bg-white/[.04] hover:text-white'
    }`

  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-void/92 px-2 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] pt-2 backdrop-blur-xl sm:left-1/2 sm:max-w-xl sm:-translate-x-1/2 sm:rounded-t-3xl sm:border-x">
      <div className="flex gap-1">
        {appConfig.navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={linkClass} end={item.path === '/'}>
            <span className="text-base leading-none" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
