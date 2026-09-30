import { cn } from "@/lib/utils"

export function GlassCard({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-md",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  right,
}: {
  title: string
  subtitle?: string
  icon?: React.ComponentType<{ className?: string }>
  right?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div className="flex items-center gap-2.5">
        {Icon ? <Icon className="size-4 text-cyan-400" /> : null}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-200">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
      {right}
    </div>
  )
}
