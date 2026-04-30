import { Badge } from "@/components/ui/badge";

const map: Record<string, string> = {
  Applied: "bg-secondary text-foreground/80",
  New: "bg-secondary text-foreground/80",
  Reviewed: "bg-accent/15 text-accent",
  Shortlisted: "bg-highlight/15 text-highlight",
  Interview: "bg-primary/15 text-primary",
  Offer: "bg-success/15 text-success",
  Rejected: "bg-destructive/15 text-destructive",
  Active: "bg-success/15 text-success",
  Closed: "bg-muted text-muted-foreground",
  Draft: "bg-warning/15 text-warning",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="secondary" className={`border-0 font-medium ${map[status] ?? "bg-secondary text-foreground/80"}`}>
      {status}
    </Badge>
  );
}