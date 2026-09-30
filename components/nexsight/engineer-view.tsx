"use client"

import { useState } from "react"
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Activity, Cpu, Terminal, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { FAILURE_PARTS, SOP_STEPS, TELEMETRY } from "@/lib/mock-data"
import { GlassCard, SectionHeader } from "./glass-card"

export function EngineerView() {
  return (
    <div className="flex flex-col gap-6">
      <GlassCard>
        <SectionHeader
          title="Live Telemetry · CNC-04"
          subtitle="Okuma MB-5000 · spindle vibration (mm/s RMS) & bearing temperature (°C)"
          icon={Activity}
          right={
            <span className="animate-risk-pulse rounded border border-rose-500/50 bg-rose-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-400">
              Anomaly Detected
            </span>
          }
        />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={TELEMETRY} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="vibFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="time" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} interval={3} />
              <YAxis yAxisId="vib" stroke="#f43f5e" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                yAxisId="temp"
                orientation="right"
                stroke="#3b82f6"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={[35, 70]}
              />
              <Tooltip
                contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#e2e8f0" }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <ReferenceLine
                yAxisId="vib"
                y={4.5}
                stroke="#f59e0b"
                strokeDasharray="4 4"
                label={{ value: "ISO 10816 Limit", fill: "#f59e0b", fontSize: 10, position: "insideTopLeft" }}
              />
              <Area
                yAxisId="vib"
                type="monotone"
                dataKey="vibration"
                name="Spindle Vibration"
                stroke="#f43f5e"
                strokeWidth={2}
                fill="url(#vibFill)"
              />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                name="Temperature"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Failure Probabilities" subtitle="ML model · 72h horizon" icon={Cpu} />
          <ul className="flex flex-col gap-5">
            {FAILURE_PARTS.map((p) => {
              const tone = p.probability >= 70 ? "rose" : p.probability >= 40 ? "amber" : "cyan"
              return (
                <li key={p.part}>
                  <div className="mb-2 flex items-baseline justify-between text-sm">
                    <span className="text-slate-200">{p.part}</span>
                    <span
                      className={cn(
                        "font-mono text-sm font-semibold",
                        tone === "rose" && "text-rose-400",
                        tone === "amber" && "text-amber-400",
                        tone === "cyan" && "text-cyan-400",
                      )}
                    >
                      {p.probability}%
                    </span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full bg-slate-800"
                    role="progressbar"
                    aria-label={`${p.part} failure probability`}
                    aria-valuenow={p.probability}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full",
                        tone === "rose" && "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.7)]",
                        tone === "amber" && "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]",
                        tone === "cyan" && "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]",
                      )}
                      style={{ width: `${p.probability}%` }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </GlassCard>

        <SopTerminal />
      </div>
    </div>
  )
}

function SopTerminal() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle")

  function generate() {
    setState("loading")
    setTimeout(() => setState("done"), 2000)
  }

  return (
    <GlassCard className="lg:col-span-3">
      <SectionHeader
        title="Generated SOP"
        subtitle="Lock-out / Tag-out · CNC-04 spindle service"
        icon={Terminal}
        right={
          <button
            type="button"
            onClick={generate}
            disabled={state === "loading"}
            className="flex shrink-0 items-center gap-2 rounded-md border border-emerald-500/50 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-300 transition-all hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:cursor-wait disabled:opacity-80"
          >
            {state === "loading" ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
            {state === "done" ? "Regenerate" : "AI Generate SOP"}
          </button>
        }
      />
      <div className="overflow-hidden rounded-lg border border-slate-800 bg-black">
        <div className="flex items-center gap-1.5 border-b border-slate-800 px-3 py-2">
          <span className="size-2.5 rounded-full bg-rose-500/70" />
          <span className="size-2.5 rounded-full bg-amber-500/70" />
          <span className="size-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 font-mono text-[10px] text-slate-500">nexsight@plant04:~/sop/cnc-04</span>
        </div>
        <div className="min-h-56 p-4 font-mono text-xs leading-relaxed text-emerald-400" aria-live="polite">
          <p className="text-slate-500">$ nexsight sop --asset CNC-04 --fault spindle_bearing --type LOTO</p>
          {state === "idle" ? (
            <p className="mt-2">
              {"> Awaiting command. Press AI Generate SOP to compile procedure."}
              <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 animate-pulse bg-emerald-400" />
            </p>
          ) : null}
          {state === "loading" ? (
            <div className="mt-2 flex flex-col gap-1">
              <p>{"> Loading asset manual OKM-MB5000-SVC-v4.2 ..."}</p>
              <p>{"> Cross-referencing OSHA 1910.147 energy control ..."}</p>
              <p className="flex items-center gap-2">
                <Loader2 className="size-3 animate-spin" /> Synthesizing procedure
              </p>
            </div>
          ) : null}
          {state === "done" ? (
            <div className="animate-fade-in mt-2">
              <p className="text-emerald-300">{"> SOP-LOTO-04 compiled · confidence 0.96 · est. 3h 20m"}</p>
              <ol className="mt-3 flex flex-col gap-3">
                {SOP_STEPS.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 text-cyan-400">[{String(i + 1).padStart(2, "0")}]</span>
                    <span className="text-pretty">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-amber-400">{"> WARNING: Two-person verification required before re-energizing."}</p>
            </div>
          ) : null}
        </div>
      </div>
    </GlassCard>
  )
}
