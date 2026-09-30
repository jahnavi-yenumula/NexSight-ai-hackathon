"use client"

import { useState } from "react"
import { TriangleAlert, Loader2, Sparkles, Boxes, Users, ArrowRightLeft, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { ALERTS, MATERIALS, WORKERS } from "@/lib/mock-data"
import { GlassCard, SectionHeader } from "./glass-card"

const BAR_COLORS = {
  cyan: "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]",
  rose: "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]",
  emerald: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]",
}

export function SupervisorView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {ALERTS.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <SectionHeader title="Constrained Materials" subtitle="Buffer stock vs. 3-shift demand" icon={Boxes} />
          <ul className="flex flex-col gap-5">
            {MATERIALS.map((m) => (
              <li key={m.name}>
                <div className="mb-2 flex items-baseline justify-between text-sm">
                  <span className="text-slate-200">{m.name}</span>
                  <span className="font-mono text-xs text-slate-400">
                    {m.units} ·{" "}
                    <span className={m.level < 30 ? "text-rose-400" : "text-slate-200"}>{m.level}%</span>
                  </span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-slate-800"
                  role="progressbar"
                  aria-label={`${m.name} buffer`}
                  aria-valuenow={m.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className={cn("h-full rounded-full", BAR_COLORS[m.color])} style={{ width: `${m.level}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <SectionHeader title="Workforce Routing" subtitle="Shift B · 5 operators on floor" icon={Users} />
          <ul className="flex flex-col gap-2">
            {WORKERS.map((w) => {
              const rerouted = w.status === "rerouted"
              return (
                <li
                  key={w.name}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border px-3 py-2.5",
                    rerouted
                      ? "border-amber-500/50 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                      : "border-slate-800 bg-slate-950/40",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-md font-mono text-xs font-semibold",
                      rerouted ? "bg-amber-500/20 text-amber-300" : "bg-slate-800 text-slate-300",
                    )}
                  >
                    {w.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-slate-100">{w.name}</p>
                    <p className="truncate font-mono text-xs text-slate-500">{w.station}</p>
                  </div>
                  <StatusPill status={w.status} />
                </li>
              )
            })}
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}

function StatusPill({ status }: { status: "active" | "rerouted" | "break" }) {
  if (status === "rerouted") {
    return (
      <span className="flex items-center gap-1 rounded border border-amber-500/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-400">
        <ArrowRightLeft className="size-3" /> Re-routed
      </span>
    )
  }
  if (status === "break") {
    return (
      <span className="flex items-center gap-1 rounded border border-slate-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        <Clock className="size-3" /> Break
      </span>
    )
  }
  return (
    <span className="rounded border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
      Active
    </span>
  )
}

function AlertCard({ alert }: { alert: (typeof ALERTS)[number] }) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle")
  const critical = alert.severity === "critical"

  function generate() {
    setState("loading")
    setTimeout(() => setState("done"), 1800)
  }

  return (
    <GlassCard
      className={cn(
        critical
          ? "border-rose-500/50 shadow-[0_0_25px_rgba(244,63,94,0.2)]"
          : "border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            critical ? "bg-rose-500/15 text-rose-400" : "bg-amber-500/15 text-amber-400",
          )}
        >
          <TriangleAlert className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                critical ? "text-rose-400" : "text-amber-400",
              )}
            >
              {critical ? "Critical" : "Warning"} · AI Alert
            </p>
            <span className="font-mono text-xs text-slate-400">
              P(disrupt) <span className={critical ? "text-rose-400" : "text-amber-400"}>{alert.probability}%</span>
            </span>
          </div>
          <h3 className="mt-1.5 text-pretty font-medium text-slate-50">{alert.title}</h3>
          <p className="mt-1.5 text-pretty text-sm leading-relaxed text-slate-400">{alert.detail}</p>
          <p className="mt-2 font-mono text-xs text-slate-500">{alert.impact}</p>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-800 pt-4">
        {state !== "done" ? (
          <button
            type="button"
            onClick={generate}
            disabled={state === "loading"}
            className="flex items-center gap-2 rounded-md border border-cyan-500/50 bg-cyan-500/10 px-3.5 py-2 text-xs font-bold uppercase tracking-widest text-cyan-300 transition-all hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:cursor-wait disabled:opacity-80"
          >
            {state === "loading" ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Sparkles className="size-3.5" />
            )}
            {state === "loading" ? "Analyzing Constraints…" : "Ask AI Action Plan"}
          </button>
        ) : (
          <div
            className="animate-fade-in rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            aria-live="polite"
          >
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-400">
              <Sparkles className="size-3" /> Generated AI Action
            </p>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-200">{alert.action}</p>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
