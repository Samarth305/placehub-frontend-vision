import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Briefcase, FileText, Trophy, Eye, ArrowRight } from "lucide-react";
import { applications, jobs } from "@/lib/mock-data";

export const Route = createFileRoute("/student/dashboard")({
  head: () => ({ meta: [{ title: "Student Dashboard — PlaceHub" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  return (
    <DashboardLayout role="student" title="Welcome back, Ada" subtitle="Here's what's happening with your applications.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Applications" value="14" delta={12} icon={FileText} accent="primary" />
        <MetricCard label="Shortlisted" value="6" delta={8} icon={Trophy} accent="highlight" />
        <MetricCard label="Interviews" value="3" delta={50} icon={Briefcase} accent="accent" />
        <MetricCard label="Profile views" value="248" delta={-4} icon={Eye} accent="success" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MiniChart title="Application activity" subtitle="Submissions over the last 6 months" />
        </div>
        <ActivityFeed />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="border-border/60 bg-card p-5 shadow-card xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-semibold">Recent applications</div>
            <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
              <Link to="/student/applications">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-secondary/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">Role</th>
                  <th className="px-4 py-3 text-left font-medium">Company</th>
                  <th className="px-4 py-3 text-left font-medium">Applied</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {applications.slice(0, 5).map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-secondary/30">
                    <td className="px-4 py-3 font-medium">{a.jobTitle}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.company}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.appliedOn}</td>
                    <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="border-border/60 bg-card p-5 shadow-card">
          <div className="mb-4 text-sm font-semibold">Recommended for you</div>
          <ul className="space-y-3">
            {jobs.slice(0, 4).map((j) => (
              <li key={j.id} className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/20 p-3 transition-colors hover:border-primary/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary text-sm font-semibold text-white">{j.logo}</div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{j.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{j.company} · {j.location}</div>
                </div>
                <Button size="sm" variant="ghost" className="text-primary hover:text-primary-glow">View</Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  );
}