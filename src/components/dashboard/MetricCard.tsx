import { Card } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label, value, delta, icon: Icon, accent = "primary",
}: {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  accent?: "primary" | "accent" | "highlight" | "success";
}) {
  const up = (delta ?? 0) >= 0;
  const accentBg = {
    primary: "bg-primary/15 text-primary",
    accent: "bg-accent/15 text-accent",
    highlight: "bg-highlight/15 text-highlight",
    success: "bg-success/15 text-success",
  }[accent];

  return (
    <Card className="relative overflow-hidden border-border/60 bg-card p-5 shadow-card transition-all hover:border-border">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          {delta !== undefined && (
            <div className={`mt-2 inline-flex items-center gap-1 text-xs ${up ? "text-success" : "text-destructive"}`}>
              {up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {Math.abs(delta)}% vs last month
            </div>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentBg}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}