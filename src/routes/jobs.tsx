import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/site/PublicLayout";
import { JobCard } from "@/components/jobs/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, BadgeDollarSign, Briefcase } from "lucide-react";
import { jobs } from "@/lib/mock-data";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/jobs")({
  head: () => ({ meta: [{ title: "Jobs — PlaceHub" }, { name: "description", content: "Browse curated jobs and internships from top companies." }] }),
  component: JobsPage,
});

const types = ["All", "Full-time", "Internship", "Contract"] as const;

function JobsPage() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("all");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [minSal, setMinSal] = useState([60]);

  const locations = useMemo(() => Array.from(new Set(jobs.map((j) => j.location))), []);

  const filtered = jobs.filter((j) => {
    const okQ = !q || (j.title + j.company + j.tags.join(" ")).toLowerCase().includes(q.toLowerCase());
    const okL = loc === "all" || j.location === loc;
    const okT = type === "All" || j.type === type;
    const okS = j.salaryNum >= minSal[0];
    return okQ && okL && okT && okS;
  });

  return (
    <PublicLayout>
      <div className="relative border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-hero opacity-70" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Find your next role</h1>
            <p className="mt-3 text-muted-foreground">Curated opportunities from verified companies. Updated daily.</p>
          </div>
          <Card className="glass mt-8 flex flex-col gap-3 border-border/60 p-4 shadow-card md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search role, company, or skill..."
                className="h-11 border-border/60 bg-background/40 pl-9"
              />
            </div>
            <Select value={loc} onValueChange={setLoc}>
              <SelectTrigger className="h-11 border-border/60 bg-background/40 md:w-48">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button className="h-11 bg-gradient-primary shadow-elegant hover:opacity-90 md:w-auto">Search</Button>
          </Card>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <Card className="border-border/60 bg-card p-5 shadow-card">
            <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <Filter className="h-4 w-4 text-primary" /> Filters
            </div>

            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" /> Type
              </div>
              <div className="flex flex-wrap gap-1.5">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
                      type === t
                        ? "border-primary/60 bg-primary/15 text-primary"
                        : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <BadgeDollarSign className="h-3.5 w-3.5" /> Min salary (k/yr)
              </div>
              <Slider value={minSal} onValueChange={setMinSal} min={0} max={200} step={5} />
              <div className="mt-2 text-xs text-muted-foreground">${minSal[0]}k+</div>
            </div>

            <div>
              <div className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Popular tags</div>
              <div className="flex flex-wrap gap-1.5">
                {["React", "Python", "Design", "ML", "Go", "SQL"].map((t) => (
                  <Badge key={t} variant="secondary" className="bg-secondary/60 text-foreground/80">{t}</Badge>
                ))}
              </div>
            </div>
          </Card>
        </aside>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{filtered.length}</span> roles found
            </div>
            <Select defaultValue="recent">
              <SelectTrigger className="h-9 w-44 border-border/60 bg-secondary/40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most recent</SelectItem>
                <SelectItem value="salary">Highest salary</SelectItem>
                <SelectItem value="relevance">Most relevant</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((j) => <JobCard key={j.id} job={j} />)}
          </div>
          {filtered.length === 0 && (
            <Card className="border-border/60 bg-card p-12 text-center shadow-card">
              <div className="text-sm font-medium">No results</div>
              <div className="mt-1 text-xs text-muted-foreground">Try adjusting your filters.</div>
            </Card>
          )}
        </div>
      </div>
    </PublicLayout>
  );
}