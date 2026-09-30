"use client"

import { Hexagon, LayoutDashboard, Radio, Activity, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { ROLES, type Role } from "@/lib/mock-data"

const NAV: { view: Role; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { view: "manager", label: "Executive Command", icon: LayoutDashboard },
  { view: "supervisor", label: "Operations Hub", icon: Radio },
  { view: "engineer", label: "Diagnostics", icon: Activity },
]

export function Sidebar({
  role,
  view,
  onNavigate,
  onLogout,
}: {
  role: Role
  view: Role
  onNavigate: (view: Role) => void
  onLogout: () => void
}) {
  return (
    <aside className="flex shrink-0 flex-col border-b border-slate-800 bg-slate-950/80 backdrop-blur-md md:sticky md:top-0 md:h-dvh md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Hexagon className="size-5 text-cyan-400" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-100">NexSight AI</p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Plant Intelligence</p>
        </div>
      </div>

      <div className="mx-4 rounded-lg border border-slate-800 bg-slate-900/50 p-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Logged in as</p>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-100">{ROLES[role].label}</p>
          <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-400">
            {ROLES[role].code}
          </span>
        </div>
      </div>

      <nav aria-label="Primary" className="mt-6 flex-1 px-3">
        <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">Consoles</p>
        <ul className="flex gap-1 overflow-x-auto md:flex-col">
          {NAV.map(({ view: v, label, icon: Icon }) => {
            const active = v === view
            return (
              <li key={v}>
                <button
                  type="button"
                  onClick={() => onNavigate(v)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500",
                    active
                      ? "bg-cyan-500/10 text-cyan-300 shadow-[inset_2px_0_0_rgb(6,182,212)]"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200",
                  )}
                >
                  <Icon className="size-4" />
                  {label}
                  {v === role ? (
                    <span className="ml-auto size-1.5 rounded-full bg-cyan-400" aria-label="Your role console" />
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Live · 12 Assets Streaming
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-800 px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
        >
          <LogOut className="size-3.5" />
          Log Out
        </button>
      </div>
    </aside>
  )
}
