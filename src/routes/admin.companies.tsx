import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Check, X } from "lucide-react";
// import { pendingCompanies } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { getPendingCompanies, updateCompanyStatus } from "@/services/admin.service";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/companies")({
   beforeLoad: () => {
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const role = (typeof window !== 'undefined' ? localStorage.getItem("role") : null);

    if(!token || role !== "admin"){
      throw redirect({to:"/login"});
    }
  },
  head: () => ({ meta: [{ title: "Companies — PlaceHub Admin" }] }),
  component: CompaniesApproval,
});

function CompaniesApproval() {
  const [q, setQ] = useState("");
  const [pendingCompanies , setPendingCompanies] = useState<any[]>([]);
  const [loading , setLoading] = useState(true);
  const list = pendingCompanies.filter((c) => !q || (c.name || "").toLowerCase().includes(q.toLowerCase()));

  useEffect(()=>{
    const loadCompanies = async () => {
      try {
        const data = await getPendingCompanies();
        setPendingCompanies(data);
      } catch (error) {
        toast.error("can not fetch pending companies");
      } finally{
        setLoading(false);
      }
    }
    loadCompanies();
  },[])

  const handleStatusUpdate = async (id:string,status:"APPROVED"|"REJECTED") => {
    try {
      await updateCompanyStatus(id,status);
      toast.success(`company ${status.toLowerCase()} successfully`);
      setPendingCompanies((prev)=>prev.filter((c)=>c.companyId!==id));
    } catch (err:any) {
      toast.error(err.response?.data?.error||"company status not updated")
    }
  }

  if (loading) {
    return (
      <DashboardLayout role="admin" title="Companies approval" subtitle="Review and verify new companies.">
        <div className="p-6">Loading companies...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin" title="Companies approval" subtitle="Review and verify new companies before they post jobs.">
      <Card className="border-border/60 bg-card shadow-card">
        <div className="flex flex-col gap-3 border-b border-border/60 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-sm font-semibold">Pending verification</div>
            <div className="text-xs text-muted-foreground">{list.length} awaiting review</div>
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search company" className="h-9 w-full border-border/60 bg-secondary/30 pl-9 md:w-72" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Company</th>
                <th className="px-5 py-3 text-left font-medium">Industry</th>
                <th className="px-5 py-3 text-left font-medium">Size</th>
                <th className="px-5 py-3 text-left font-medium">Contact</th>
                <th className="px-5 py-3 text-left font-medium">Submitted</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {list.map((c) => (
                <tr key={c.companyId} className="transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary text-sm font-semibold text-white">{c.name[0]}</div>
                      <div className="font-medium">{c.name}</div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.description}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.location}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{c.email}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" className="border-border/60" onClick={() => handleStatusUpdate(c.companyId, "REJECTED")}>
                        <X className="mr-1 h-3.5 w-3.5" /> Reject
                      </Button>
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90" onClick={() => handleStatusUpdate(c.companyId, "APPROVED")}>
                        <Check className="mr-1 h-3.5 w-3.5" /> Approve
                      </Button>
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