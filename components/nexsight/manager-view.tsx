"use client"

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Gauge, DollarSign, Package, Radar, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { BOTTLENECKS, MACHINES, type RiskLevel } from "@/lib/mock-data"
import { GlassCard, SectionHeader } from "./glass-card"

const KPIS = [
  {
    label: "Plant Availability",
    value: "94.2%",
    delta: "+1.8% vs last week",
    up: true,
    icon: Gauge,
    tone: "cyan",
  },
  {
    label: "Revenue at Risk",
    value: "$18,200",
    delta: "2 critical assets",
    up: false,
    icon: DollarSign,
    tone: "rose",
  },
  {
    label: "Production Vol.",
    value: "3,847",
    delta: "units · 96% of target",
    up: true,
    icon: Package,
    tone: "cyan",
  },
] as const

const RISK_STYLES: Record<RiskLevel, string> = {
  low: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  medium: "border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.15)]",
  high: "animate-risk-pulse border-rose-500/60 bg-rose-500/15 text-rose-400",
}

const RISK_LABEL: Record<RiskLevel, string> = { low: "Nominal", medium: "Elevated", high: "Critical" }

export function ManagerView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {KPIS.map(({ label, value, delta, up, icon: Icon, tone }) => (
          <GlassCard
            key={label}
            className={cn(
              "relative overflow-hidden",
              tone === "rose"
                ? "border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                : "shadow-[0_0_15px_rgba(6,182,212,0.12)]",
            )}
          >
            <div
              aria-hidden="true"
              className={cn(
                "absolute -right-8 -top-8 size-28 rounded-full blur-2xl",
                tone === "rose" ? "bg-rose-500/20" : "bg-cyan-500/15",
              )}
            />
            <div className="relative flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
              <Icon className={cn("size-4", tone === "rose" ? "text-rose-400" : "text-cyan-400")} />
            </div>
            <p
              className={cn(
                "relative mt-3 font-mono text-3xl font-semibold tabular-nums",
                tone === "rose" ? "text-rose-400" : "text-slate-50",
              )}
            >
              {value}
            </p>
            <p className="relative mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              {up ? (
                <TrendingUp className="size-3.5 text-emerald-400" />
              ) : (
                <TrendingDown className="size-3.5 text-rose-400" />
              )}
              {delta}
            </p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <GlassCard className="lg:col-span-3">
          <SectionHeader
            title="Risk Topology"
            subtitle="Floor A · 12 CNC assets · ML disruption score"
            icon={Radar}
            right={
              <div className="hidden items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 sm:flex">
                <Legend color="bg-emerald-400" label="Low" />
                <Legend color="bg-amber-400" label="Med" />
                <Legend color="bg-rose-500" label="High" />
              </div>
            }
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {MACHINES.map((m) => (
              <li
                key={m.id}
                className={cn("rounded-lg border p-3 transition-transform hover:-translate-y-0.5", RISK_STYLES[m.risk])}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold">{m.id}</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">{RISK_LABEL[m.risk]}</span>
                </div>
                <p className="mt-1 truncate text-xs text-slate-400">{m.name}</p>
                <div className="mt-3 flex items-end justify-between">
                  <span className="truncate text-[10px] text-slate-500">{m.job}</span>
                  <span className="font-mono text-xs text-slate-300">
                    {m.oee}
                    <span className="text-slate-500">% OEE</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <SectionHeader title="Macro Bottlenecks" subtitle="Lost hours · trailing 7 days" icon={TrendingDown} />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BOTTLENECKS} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis type="number" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="cause"
                  stroke="#94a3b8"
                  fontSize={11}
                  width={100}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(6,182,212,0.06)" }}
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid #1e293b",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                  itemStyle={{ color: "#22d3ee" }}
                  formatter={(v) => [`${v} hrs`, "Lost"]}
                />
                <Bar dataKey="hours" radius={[0, 4, 4, 0]} barSize={18}>
                  {BOTTLENECKS.map((b, i) => (
                    <Cell key={b.cause} fill={i === 0 ? "#f43f5e" : i === 1 ? "#f59e0b" : "#06b6d4"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("size-2 rounded-full", color)} />
      {label}
    </span>
  )
}
