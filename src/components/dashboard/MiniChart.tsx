import { Card } from "@/components/ui/card";
import { chartData as mockChartData } from "@/lib/mock-data";

export function MiniChart({ title, subtitle, data }: { title: string; subtitle?: string; data?: any[] }) {
  const dataToUse = data && data.length > 0 ? data : mockChartData;
  const max = Math.max(...dataToUse.map((d) => d.v), 1); // fallback to 1 to avoid div by 0
  const w = 600;
  const h = 200;
  const pad = 24;
  const stepX = (w - pad * 2) / Math.max(dataToUse.length - 1, 1);
  const points = dataToUse.map((d, i) => {
    const x = pad + i * stepX;
    const y = h - pad - (d.v / max) * (h - pad * 2);
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => (i === 0 ? `M${x},${y}` : `L${x},${y}`)).join(" ");
  const area = `${path} L${points[points.length - 1]?.[0] || pad},${h - pad} L${points[0]?.[0] || pad},${h - pad} Z`;

  return (
    <Card className="border-border/60 bg-card p-5 shadow-card">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> This year</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-44 w-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.22 290)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="oklch(0.62 0.22 290)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#g1)" />
        <path d={path} fill="none" stroke="oklch(0.72 0.20 285)" strokeWidth="2" />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="oklch(0.78 0.13 200)" />
        ))}
        {dataToUse.map((d, i) => (
          <text key={d.m} x={pad + i * stepX} y={h - 6} textAnchor="middle" className="fill-muted-foreground" fontSize="10">{d.m}</text>
        ))}
      </svg>
    </Card>
  );
}