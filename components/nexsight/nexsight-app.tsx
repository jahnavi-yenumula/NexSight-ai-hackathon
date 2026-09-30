"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { ROLES, type Role } from "@/lib/mock-data"
import { LoginScreen } from "./login-screen"
import { Sidebar } from "./sidebar"
import { ManagerView } from "./manager-view"
import { SupervisorView } from "./supervisor-view"
import { EngineerView } from "./engineer-view"

const VIEWS: Record<Role, React.ComponentType> = {
  manager: ManagerView,
  supervisor: SupervisorView,
  engineer: EngineerView,
}

export function NexSightApp() {
  const [userRole, setUserRole] = useState<Role | null>(null)
  const [view, setView] = useState<Role>("manager")

  if (!userRole) {
    return (
      <LoginScreen
        onLogin={(role) => {
          setUserRole(role)
          setView(role)
        }}
      />
    )
  }

  const View = VIEWS[view]

  return (
    <div className="flex min-h-dvh flex-col bg-slate-950 text-slate-100 md:flex-row">
      <Sidebar role={userRole} view={view} onNavigate={setView} onLogout={() => setUserRole(null)} />
      <main className="relative min-w-0 flex-1">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-80 w-2/3 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.12),transparent_60%)]"
        />
        <header className="relative flex flex-wrap items-end justify-between gap-4 px-5 pb-2 pt-6 md:px-8 md:pt-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
              Plant 04 · CNC Machining
            </p>
            <h1 className="mt-1.5 text-2xl font-semibold text-slate-50">{ROLES[view].title}</h1>
          </div>
          <p className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <Clock className="size-3.5" />
            Shift B · Last sync 4s ago
          </p>
        </header>
        <div key={view} className="animate-fade-in relative px-5 py-6 md:px-8">
          <View />
        </div>
      </main>
    </div>
  )
}
