"use client"

import { Factory, Hexagon, UserCog, Wrench, ChevronRight, ShieldCheck } from "lucide-react"
import { ROLES, type Role } from "@/lib/mock-data"

const ROLE_ICONS: Record<Role, React.ComponentType<{ className?: string }>> = {
  manager: Factory,
  supervisor: UserCog,
  engineer: Wrench,
}

const ROLE_DESCRIPTIONS: Record<Role, string> = {
  manager: "Plant-wide risk topology & revenue exposure",
  supervisor: "Live disruption alerts, materials & crew routing",
  engineer: "Telemetry, failure prediction & AI-generated SOPs",
}

export function LoginScreen({ onLogin }: { onLogin: (role: Role) => void }) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
      />

      <div className="animate-fade-in relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5 flex size-14 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
            <Hexagon className="size-7 text-cyan-400" strokeWidth={1.5} />
            <span className="absolute size-2 rounded-full bg-cyan-300" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">
            Early Warning System
          </p>
          <h1 className="mt-2 text-balance text-2xl font-semibold text-slate-50">
            NexSight AI: <span className="text-cyan-400">Plant Intelligence</span>
          </h1>
          <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-400">
            Predictive production disruption monitoring for CNC manufacturing.
          </p>
        </div>

        <div className="mt-8">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Demo Login — Select Role
          </p>
          <ul className="flex flex-col gap-2.5">
            {(Object.keys(ROLES) as Role[]).map((role) => {
              const Icon = ROLE_ICONS[role]
              return (
                <li key={role}>
                  <button
                    type="button"
                    onClick={() => onLogin(role)}
                    className="group flex w-full items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-3 text-left transition-all hover:border-cyan-500/60 hover:bg-cyan-500/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-400 transition-colors group-hover:border-cyan-500/50 group-hover:text-cyan-400">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-slate-100">{ROLES[role].label}</span>
                      <span className="block truncate text-xs text-slate-500">{ROLE_DESCRIPTIONS[role]}</span>
                    </span>
                    <ChevronRight className="size-4 text-slate-600 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-400" />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-800 pt-5 font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <ShieldCheck className="size-3.5 text-emerald-400" />
          Secure Node · Plant 04 · Uplink Nominal
        </div>
      </div>
    </main>
  )
}
