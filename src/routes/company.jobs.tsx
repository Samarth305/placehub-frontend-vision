import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Plus, MoreHorizontal } from "lucide-react";
import { jobs } from "@/lib/mock-data";

export const Route = createFileRoute("/company/jobs")({
  head: () => ({ meta: [{ title: "Jobs — PlaceHub Company" }] }),
  component: CompanyJobs,
});

const statuses = ["Active", "Active", "Draft", "Active", "Closed", "Active", "Draft", "Active"];

function CompanyJobs() {
  return (
    <DashboardLayout role="company" title="Job postings" subtitle="Manage all your open and draft roles.">
      <Card className="border-border/60 bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border/60 p-5">
          <div>
            <div className="text-sm font-semibold">All jobs</div>
            <div className="text-xs text-muted-foreground">{jobs.length} total</div>
          </div>
          <Button className="bg-gradient-primary shadow-elegant hover:opacity-90">
            <Plus className="mr-1.5 h-4 w-4" /> New job
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Title</th>
                <th className="px-5 py-3 text-left font-medium">Type</th>
                <th className="px-5 py-3 text-left font-medium">Location</th>
                <th className="px-5 py-3 text-left font-medium">Applicants</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {jobs.map((j, i) => (
                <tr key={j.id} className="transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3.5">
                    <div className="font-medium">{j.title}</div>
                    <div className="text-xs text-muted-foreground">Posted {j.posted}</div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{j.type}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{j.location}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{12 + i * 7}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={statuses[i] ?? "Active"} /></td>
                  <td className="px-5 py-3.5 text-right">
                    <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}