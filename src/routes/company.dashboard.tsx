import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Briefcase, Users, UserCheck, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { applicants } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { getCompanyDashboardStats } from "@/services/job.services";

export const Route = createFileRoute("/company/dashboard")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return;
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const role = (typeof window !== 'undefined' ? localStorage.getItem("role") : null);

    if (!token || role !== "company") {
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({ meta: [{ title: "Company Dashboard — PlaceHub" }] }),
  component: CompanyDashboard,
});

function CompanyDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getCompanyDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch company stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
  if (loading) {
    return (
      <DashboardLayout role="company" title="Dashboard" subtitle="Pipeline overview.">
        <div className="p-6">Loading dashboard data...</div>
      </DashboardLayout>
    );
  }
  // Helper variables
  const recentApplicants = stats?.recentApplicants || [];
  return (
    <DashboardLayout
      role="company"
      title="Hello, Stripe team"
      subtitle="Pipeline overview for your open roles."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Open jobs"
          value={String(stats?.openJobs || 0)}
          delta={0}
          icon={Briefcase}
          accent="primary"
        />
        <MetricCard
          label="Total applicants"
          value={String(stats?.totalApplicants || 0)}
          delta={0}
          icon={Users}
          accent="accent"
        />
        <MetricCard
          label="Shortlisted"
          value={String(stats?.shortlisted || 0)}
          delta={0}
          icon={UserCheck}
          accent="highlight"
        />
        <MetricCard label="Job views" value="12.4k" delta={0} icon={Eye} accent="success" />
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
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary-glow">
            View all
          </Button>
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
              {recentApplicants.map((a: any) => (
                <tr key={a.applicationId} className="transition-colors hover:bg-secondary/20">
                  <td className="px-4 py-3">
                    <div className="font-medium">{a.student?.name}</div>
                    <div className="text-xs text-muted-foreground">{a.student?.email}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.job?.role}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.student?.institute}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.student?.cgpa}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
              {recentApplicants.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No applications received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
