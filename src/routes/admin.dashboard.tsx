import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { MiniChart } from "@/components/dashboard/MiniChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Building2, Users, FileCheck, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pendingCompanies } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — PlaceHub" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <DashboardLayout role="admin" title="Admin overview" subtitle="System-wide health and pending approvals.">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total users" value="14,328" delta={6} icon={Users} accent="primary" />
        <MetricCard label="Verified companies" value="512" delta={3} icon={Building2} accent="accent" />
        <MetricCard label="Pending approvals" value="24" delta={-12} icon={Clock} accent="highlight" />
        <MetricCard label="Offers extended" value="1,842" delta={11} icon={FileCheck} accent="success" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MiniChart title="Platform growth" subtitle="New users per month" />
        </div>
        <ActivityFeed />
      </div>

      <Card className="mt-6 border-border/60 bg-card p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Companies pending approval</div>
            <div className="text-xs text-muted-foreground">{pendingCompanies.length} in queue</div>
          </div>
          <Button variant="outline" className="border-border/60">Review all</Button>
        </div>
        <ul className="space-y-3">
          {pendingCompanies.slice(0, 3).map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-lg border border-border/60 bg-secondary/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-primary text-sm font-semibold text-white">{c.name[0]}</div>
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.industry} · {c.size} employees</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-border/60">Reject</Button>
                <Button size="sm" className="bg-gradient-primary hover:opacity-90">Approve</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </DashboardLayout>
  );
}