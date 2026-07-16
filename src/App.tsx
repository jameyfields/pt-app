import { Route, Routes } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { PwaUpdatePrompt } from './components/PwaUpdatePrompt'
import { BuilderPage } from './pages/BuilderPage'
import { HomePage } from './pages/HomePage'
import { LearnPage } from './pages/LearnPage'
import { PracticePage } from './pages/PracticePage'
import { ProgressPage } from './pages/ProgressPage'

export function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-void text-slate-100">
      <div aria-hidden="true" className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,247,199,.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,204,102,.11),transparent_30%)]" />
      <div aria-hidden="true" className="fixed inset-0 bg-grid bg-[length:28px_28px] opacity-25" />
      <main className="relative mx-auto min-h-screen w-full max-w-3xl px-4 pb-28 pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </main>
      <PwaUpdatePrompt />
      <BottomNav />
    </div>
  )
}
