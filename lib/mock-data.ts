export type Role = "manager" | "supervisor" | "engineer"

export const ROLES: Record<Role, { label: string; title: string; code: string }> = {
  manager: { label: "Plant Manager", title: "Executive Command", code: "PM-01" },
  supervisor: { label: "Shift Supervisor", title: "Operations Hub", code: "SS-B2" },
  engineer: { label: "Maintenance Eng.", title: "Diagnostics", code: "ME-07" },
}

export type RiskLevel = "low" | "medium" | "high"

export const MACHINES: { id: string; name: string; risk: RiskLevel; oee: number; job: string }[] = [
  { id: "CNC-01", name: "Haas VF-2", risk: "low", oee: 91, job: "Bracket A-220" },
  { id: "CNC-02", name: "DMG Mori NLX", risk: "low", oee: 88, job: "Shaft S-14" },
  { id: "CNC-03", name: "Mazak QTN", risk: "medium", oee: 76, job: "Housing H-9" },
  { id: "CNC-04", name: "Okuma MB-5000", risk: "high", oee: 54, job: "Impeller I-3" },
  { id: "CNC-05", name: "Haas ST-20", risk: "low", oee: 93, job: "Flange F-72" },
  { id: "CNC-06", name: "Fanuc Robodrill", risk: "medium", oee: 71, job: "Manifold M-5" },
  { id: "CNC-07", name: "Hermle C42", risk: "low", oee: 89, job: "Rotor R-11" },
  { id: "CNC-08", name: "Doosan DNM", risk: "high", oee: 49, job: "Gearbox G-8" },
  { id: "CNC-09", name: "Makino a61", risk: "low", oee: 95, job: "Valve V-40" },
  { id: "CNC-10", name: "Mazak VCN", risk: "low", oee: 90, job: "Bracket A-221" },
  { id: "CNC-11", name: "Okuma LB3000", risk: "medium", oee: 73, job: "Pin P-66" },
  { id: "CNC-12", name: "DMG Mori DMU", risk: "low", oee: 87, job: "Cover C-18" },
]

export const BOTTLENECKS = [
  { cause: "Material Delay", hours: 14.2 },
  { cause: "Tool Wear", hours: 11.6 },
  { cause: "Spindle Fault", hours: 8.4 },
  { cause: "Operator Gap", hours: 6.1 },
  { cause: "QC Hold", hours: 4.3 },
  { cause: "Program Error", hours: 2.7 },
]

export const ALERTS = [
  {
    id: "a1",
    severity: "critical" as const,
    title: "High Disruption Probability on CNC-04",
    detail: "Spindle vibration trending +38% over 6h baseline. Predicted stoppage window: 2h 40m.",
    probability: 87,
    impact: "$11,400 at risk · Order #PO-7781",
    action:
      "Pause CNC-04 after current cycle (ETA 14 min). Transfer Impeller I-3 batch to CNC-07 (92% capability match, idle 40 min). Re-route J. Okafor to CNC-07 for setup. Dispatch maintenance for spindle bearing inspection — expected recovery 3.5h vs. 11h unplanned downtime.",
  },
  {
    id: "a2",
    severity: "warning" as const,
    title: "Material Shortfall: Ti-6Al-4V Bar Stock",
    detail: "Supplier ASN delayed 18h. Buffer covers 1.4 shifts at current consumption rate.",
    probability: 64,
    impact: "$6,800 at risk · 3 downstream jobs",
    action:
      "Resequence queue: pull Aluminum 6061 jobs (Flange F-72, Cover C-18) forward on CNC-05 and CNC-12. Defer Titanium Gearbox G-8 by one shift. Trigger expedited PO with secondary supplier Aerometals — lead time 9h, +4% unit cost.",
  },
]

export const MATERIALS = [
  { name: "Aluminum 6061-T6", level: 78, color: "cyan" as const, units: "412 bars" },
  { name: "Ti-6Al-4V Bar Stock", level: 22, color: "rose" as const, units: "38 bars" },
  { name: "Stainless 316L", level: 61, color: "emerald" as const, units: "205 bars" },
  { name: "Carbide End Mills Ø12", level: 44, color: "cyan" as const, units: "56 units" },
]

export const WORKERS = [
  { name: "Maria Chen", initials: "MC", station: "CNC-01 / CNC-02", status: "active" as const },
  { name: "James Okafor", initials: "JO", station: "CNC-04 → CNC-07", status: "rerouted" as const },
  { name: "Priya Nair", initials: "PN", station: "CNC-05 / CNC-06", status: "active" as const },
  { name: "Luis Romero", initials: "LR", station: "QC Cell B", status: "active" as const },
  { name: "Hana Sato", initials: "HS", station: "CNC-09 / CNC-10", status: "break" as const },
]

export const TELEMETRY = Array.from({ length: 30 }, (_, i) => {
  const t = `${String(8 + Math.floor(i / 4)).padStart(2, "0")}:${String((i % 4) * 15).padStart(2, "0")}`
  const base = 2.1 + Math.sin(i / 2.5) * 0.25 + (i % 3) * 0.05
  const spike = i >= 25 ? (i - 24) ** 1.7 * 0.9 : 0
  const temp = 42 + Math.cos(i / 3) * 1.5 + (i >= 25 ? (i - 24) * 3.2 : 0)
  return { time: t, vibration: +(base + spike).toFixed(2), temperature: +temp.toFixed(1) }
})

export const FAILURE_PARTS = [
  { part: "Main Spindle Bearing", probability: 85 },
  { part: "Ball Screw (Z-Axis)", probability: 52 },
  { part: "Coolant Pump", probability: 31 },
  { part: "Tool Changer Arm", probability: 18 },
]

export const SOP_STEPS = [
  "ISOLATE — Press E-STOP on CNC-04. Switch main disconnect to OFF and apply personal padlock + DANGER tag (LOTO-04-A).",
  "DISSIPATE — Bleed pneumatic line at regulator PR-2 to 0 PSI. Wait 5 min for spindle drive capacitor discharge; verify < 50V DC at test point TP-3.",
  "VERIFY — Attempt restart from control panel to confirm zero-energy state. Record verification in CMMS work order WO-55231.",
  "SERVICE — Remove spindle cartridge cover. Inspect front bearing set (P/N SKF 7014-CD) for spalling; replace if radial play > 0.005 mm. Re-torque to 45 Nm.",
]
