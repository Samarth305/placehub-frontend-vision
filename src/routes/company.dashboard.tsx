import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Briefcase, Users, UserCheck, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { applicants } from "@/lib/mock-data";

export const Route = createFileRoute("/company/dashboard")({
  head: () => ({ meta: [{ title: "Company Dashboard — PlaceHub" }] }),
  component: CompanyDashboard,
});

function CompanyDashboard() {
  return (
    <DashboardLayout role="company" title="Hello, Stripe team" subtitle="Pipeline overview for your open roles.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Open jobs" value="9" delta={2} icon={Briefcase} accent="primary" />
        <MetricCard label="Total applicants" value="324" delta={18} icon={Users} accent="accent" />
        <MetricCard label="Shortlisted" value="46" delta={9} icon={UserCheck} accent="highlight" />
        <MetricCard label="Job views" value="12.4k" delta={22} icon={Eye} accent="success" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MiniChart title="Applications received" subtitle="Last 6 months" />
        </div>
        <ActivityFeed />
      </div>

      <Card className="mt-6 border-border/60 bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm font-semibold">Latest applicants</div>
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">View all</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Candidate</th>
                <th className="px-4 py-3 text-left font-medium">Role</th>
                <th className="px-4 py-3 text-left font-medium">University</th>
                <th className="px-4 py-3 text-left font-medium">CGPA</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {applicants.slice(0, 5).map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-secondary/20">
                  <td className="px-4 py-3">
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.university}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.cgpa}</td>
                  <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}