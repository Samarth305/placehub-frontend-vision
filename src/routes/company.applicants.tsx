import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Download } from "lucide-react";
import { applicants } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/company/applicants")({
  head: () => ({ meta: [{ title: "Applicants — PlaceHub Company" }] }),
  component: ApplicantsPage,
});

function ApplicantsPage() {
  const [q, setQ] = useState("");
  const list = applicants.filter((a) =>
    !q || (a.name + a.role + a.university).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <DashboardLayout role="company" title="Applicants" subtitle="Review and manage candidates across all roles.">
      <Card className="border-border/60 bg-card shadow-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, role, or university" className="h-9 w-full border-border/60 bg-secondary/30 pl-9 md:w-80" />
          </div>
          <Button variant="outline" className="border-border/60"><Download className="mr-1.5 h-4 w-4" /> Export</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Candidate</th>
                <th className="px-5 py-3 text-left font-medium">Role</th>
                <th className="px-5 py-3 text-left font-medium">University</th>
                <th className="px-5 py-3 text-left font-medium">CGPA</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {list.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-secondary text-xs">{a.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{a.name}</div>
                        <div className="text-xs text-muted-foreground">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.role}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.university}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.cgpa}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="ghost">View</Button>
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90">Shortlist</Button>
                    </div>
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