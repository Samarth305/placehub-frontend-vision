import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Briefcase, Users, ShieldCheck, Zap, Building2, Rocket, BarChart3, CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trustedCompanies } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlaceHub — Launch Your Career Faster" },
      { name: "description", content: "Connect students with top companies through one modern placement platform." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-gradient-glow opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-24 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-highlight" />
              <span>Now hiring across 200+ companies</span>
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-foreground">Launch Your </span>
              <span className="text-gradient">Career Faster</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Connect students with top companies through one modern placement platform. Apply, track, and land your dream offer — all in one place.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elegant hover:opacity-90">
                <Link to="/signup">Get started <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border/60 bg-secondary/40 backdrop-blur">
                <Link to="/jobs">Browse jobs</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "12k+", l: "Active students" },
              { v: "500+", l: "Verified companies" },
              { v: "8.4k", l: "Offers extended" },
              { v: "94%", l: "Placement rate" },
            ].map((s) => (
              <Card key={s.l} className="glass border-border/60 p-5 text-center shadow-card">
                <div className="text-3xl font-semibold tracking-tight text-gradient">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by students placed at
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {trustedCompanies.map((c) => (
              <span key={c} className="text-lg font-semibold tracking-tight text-foreground/70">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">Why PlaceHub</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">Built for the modern placement cycle</h2>
          <p className="mt-4 text-muted-foreground">Everything students, companies, and placement cells need — in one beautifully designed product.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { icon: Briefcase, title: "Curated opportunities", desc: "Hand-picked roles from verified companies — full-time, internships, and contract." },
            { icon: Zap, title: "One-click apply", desc: "Apply to multiple jobs with a single profile. Track every application in real time." },
            { icon: BarChart3, title: "Smart analytics", desc: "Companies get rich insights on candidates. Students track their funnel." },
            { icon: ShieldCheck, title: "Verified employers", desc: "Every company is vetted by our admin team before posting roles." },
            { icon: Users, title: "Built for teams", desc: "Placement cells manage 1000s of students, companies, and offers effortlessly." },
            { icon: Rocket, title: "Move faster", desc: "Interview scheduling, offer letters, status updates — all automated." },
          ].map((f) => (
            <Card key={f.title} className="group border-border/60 bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold tracking-tight">{f.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles strip */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: Users, title: "For students", desc: "Build a profile, apply in one click, track every status — and get hired.", link: "/student/dashboard", cta: "Open student app" },
            { icon: Building2, title: "For companies", desc: "Post roles, screen verified students, and run interviews end-to-end.", link: "/company/dashboard", cta: "Open recruiter app" },
            { icon: ShieldCheck, title: "For admins", desc: "Approve companies, manage users, and oversee placements at scale.", link: "/admin/dashboard", cta: "Open admin console" },
          ].map((r) => (
            <Card key={r.title} className="relative overflow-hidden border-border/60 bg-card p-6 shadow-card">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
              <r.icon className="h-6 w-6 text-highlight" />
              <div className="mt-4 text-lg font-semibold tracking-tight">{r.title}</div>
              <p className="mt-1.5 text-sm text-muted-foreground">{r.desc}</p>
              <Button asChild variant="ghost" className="mt-4 px-0 text-primary hover:bg-transparent hover:text-primary-glow">
                <Link to={r.link}>{r.cta} <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-12 shadow-elegant">
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready to launch your career?</h3>
              <p className="mt-3 text-muted-foreground">Join 12,000+ students using PlaceHub to land roles at top companies.</p>
              <ul className="mt-6 space-y-2 text-sm text-foreground/80">
                {["Free for students", "No spammy recruiters", "Verified companies only"].map((b) => (
                  <li key={b} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> {b}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <Button asChild size="lg" className="bg-gradient-primary shadow-elegant hover:opacity-90">
                <Link to="/signup">Create free account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border/60 bg-background/40 backdrop-blur">
                <Link to="/jobs">Explore jobs</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
