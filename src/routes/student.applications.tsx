import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Search } from "lucide-react";
// import { applications } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { getApplications } from "@/services/job.services";

export const Route = createFileRoute("/student/applications")({
  head: () => ({ meta: [{ title: "Applications — PlaceHub" }] }),
  component: ApplicationsPage,
});

const tabs = ["All", "Applied", "Shortlisted", "Interview", "Offer", "Rejected"] as const;

function ApplicationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [q, setQ] = useState("");
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const load = async () =>{
      try {
        const data = await getApplications();
        // Handle both object { applications: [] } and raw array [] formats
        const applicationsList = Array.isArray(data) ? data : data?.applications || [];
        setApps(applicationsList);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  },[])

  if(loading)return  <div className="p-6">Loading...</div>;

  const list = apps.filter((a) => {
    const okT = tab === "All" || a.status?.toLowerCase() === tab.toLowerCase();
    const okQ = !q || ((a.job?.role || "") + (a.job?.company?.name || "")).toLowerCase().includes(q.toLowerCase());
    return okT && okQ;
  });

  return (
    <DashboardLayout role="student" title="Applications" subtitle="Track every application you've submitted.">
      <Card className="border-border/60 bg-card shadow-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  tab === t
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applications" className="h-9 w-full border-border/60 bg-secondary/30 pl-9 md:w-72" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Role</th>
                <th className="px-5 py-3 text-left font-medium">Company</th>
                <th className="px-5 py-3 text-left font-medium">Applied on</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {list.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3.5 font-medium">{a.job?.role || "Position"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.job?.company?.name || "Company"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.appliedAt ? new Date(a.appliedAt).toLocaleDateString() : "N/A"}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={"Applied"} /></td>
                  <td className="px-5 py-3.5 text-right">
                    <Button size="sm" variant="ghost" className="text-primary hover:text-primary-glow">View</Button>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-muted-foreground">No applications match.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}