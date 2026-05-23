import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Briefcase, FileText, Trophy, Eye, ArrowRight } from "lucide-react";
import { applications, jobs } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { getStudentDashboardStats } from "../services/student.service";

export const Route = createFileRoute("/student/dashboard")({
  beforeLoad: () => {
    if (typeof window === 'undefined') return;
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const role = (typeof window !== 'undefined' ? localStorage.getItem("role") : null);
    if(!token || role !== "student"){
      throw redirect({to:"/login"});
    }
  },
  head: () => ({ meta: [{ title: "Student Dashboard — PlaceHub" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getStudentDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard statistics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="student" title="Student Dashboard" subtitle="Loading your placement progress...">
        <div className="p-6 text-center">Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  const formatStatus = (status: string) => {
    if (!status) return "Applied";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };
  const applicationsCount = stats?.totalApplications?.length || 0;
  const shortlistedCount = stats?.shortlisted?.length || 0;
  const rejectedCount = stats?.rejected?.length || 0;
  const recentApplications = stats?.totalApplications || [];

  return (
    <DashboardLayout role="student" title="Welcome back, Ada" subtitle="Here's what's happening with your applications.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Applications" value={String(applicationsCount)} delta={12} icon={FileText} accent="primary" />
        <MetricCard label="Shortlisted" value={String(shortlistedCount)} delta={8} icon={Trophy} accent="highlight" />
        <MetricCard label="Rejected" value={String(rejectedCount)} delta={50} icon={Briefcase} accent="accent" />
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
                {recentApplications.slice(0, 5).map((a: any) => (
                  <tr key={a.applicationId} className="transition-colors hover:bg-secondary/20">
                    <td className="px-4 py-3 font-medium">{a.job?.role || "N/A"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.job?.company?.name || "N/A"}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={formatStatus(a.status)} />
                    </td>
                  </tr>
                ))}
                {recentApplications.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-sm text-muted-foreground">
                      You haven't applied to any jobs yet.
                    </td>
                  </tr>
                )}
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