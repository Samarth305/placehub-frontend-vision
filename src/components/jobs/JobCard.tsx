import { Briefcase, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Job } from "@/lib/mock-data";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="group flex flex-col gap-4 border-border/60 bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-elegant">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-base font-semibold text-white shadow-glow">
          {job.logo}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate text-base font-semibold tracking-tight">{job.title}</h3>
            <span className="text-xs text-muted-foreground">{job.posted}</span>
          </div>
          <div className="text-sm text-muted-foreground">{job.company}</div>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
        <span className="inline-flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{job.type}</span>
        <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{job.salary}</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((t) => (
          <Badge key={t} variant="secondary" className="bg-secondary/60 text-foreground/80">{t}</Badge>
        ))}
      </div>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Posted by {job.company}</span>
        <Button size="sm" className="bg-gradient-primary hover:opacity-90">Apply</Button>
      </div>
    </Card>
  );
}