import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Building2, Users, FileCheck, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getAdminStats, getPendingCompanies, updateCompanyStatus } from "@/services/admin.service";
import { toast } from "sonner";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard")({
   beforeLoad: () => {
    if (typeof window === 'undefined') return;
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const role = (typeof window !== 'undefined' ? localStorage.getItem("role") : null);

    if(!token || role !== "admin"){
      throw redirect({to:"/login"});
    }
  },
  head: () => ({ meta: [{ title: "Admin Dashboard — PlaceHub" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, companiesData] = await Promise.all([
          getAdminStats(),
          getPendingCompanies()
        ]);
        setStats(statsData);
        setCompanies(companiesData);
      } catch (err) {
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateCompanyStatus(id, status);
      toast.success(`Company ${status.toLowerCase()} successfully`);
      setCompanies((prev) => prev.filter((c) => c.companyId !== id));
      // update stats locally
      setStats((prev: any) => ({
        ...prev,
        pendingCompanies: Math.max(0, prev.pendingCompanies - 1),
        approvedCompanies: status === "APPROVED" ? prev.approvedCompanies + 1 : prev.approvedCompanies
      }));
    } catch (err: any) {
      toast.error(err.response?.data?.error || `Failed to ${status.toLowerCase()} company`);
    }
  };

  if (loading) {
    return (
      <DashboardLayout role="admin" title="Admin overview" subtitle="System-wide health and pending approvals.">
        <div className="p-6">Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin" title="Admin overview" subtitle="System-wide health and pending approvals.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total users" value={stats?.totalStudents || 0} delta={0} icon={Users} accent="primary" />
        <MetricCard label="Verified companies" value={stats?.approvedCompanies || 0} delta={0} icon={Building2} accent="accent" />
        <MetricCard label="Pending approvals" value={stats?.pendingCompanies || 0} delta={0} icon={Clock} accent="highlight" />
        <MetricCard label="Total Applications" value={stats?.totalApplications || 0} delta={0} icon={FileCheck} accent="success" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MiniChart title="Platform growth" subtitle="New users per month" data={stats?.chartData} />
        </div>
        <ActivityFeed />
      </div>

      <Card className="mt-6 border-border/60 bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Companies pending approval</div>
            <div className="text-xs text-muted-foreground">{companies.length} in queue</div>
          </div>
          <Button variant="outline" className="border-border/60" asChild>
            <Link to="/admin/companies">Review all</Link>
          </Button>
        </div>
        
        {companies.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">No pending companies.</div>
        ) : (
          <ul className="space-y-3">
            {companies.slice(0, 3).map((c) => (
              <li key={c.companyId} className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-primary text-sm font-semibold text-white">{c.name[0].toUpperCase()}</div>
                  <div>
                    <div className="text-sm font-medium">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.email} {c.location ? `· ${c.location}` : ""}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-border/60" onClick={() => handleStatusUpdate(c.companyId, "REJECTED")}>Reject</Button>
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90" onClick={() => handleStatusUpdate(c.companyId, "APPROVED")}>Approve</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </DashboardLayout>
  );
}