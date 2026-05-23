import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Plus, MoreHorizontal } from "lucide-react";
import { jobOpeningsOfCompany } from "@/services/job.services";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/company/jobs")({
   beforeLoad: () => {
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const role = (typeof window !== 'undefined' ? localStorage.getItem("role") : null);

    if(!token || role !== "company"){
      throw redirect({to:"/login"});
    }
  },
  head: () => ({ meta: [{ title: "Jobs — PlaceHub Company" }] }),
  component: CompanyJobs,
});

function CompanyJobs() {

  const [jobs , setJobs] = useState<any[]>([]);
  const [loading , setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    const loadJobs = async () => {
      try {
        const jobs = await jobOpeningsOfCompany();
        setJobs(jobs.jobList);
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    };
    loadJobs();
  },[]);
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }
  return (
    <DashboardLayout role="company" title="Job postings" subtitle="Manage all your open and draft roles.">
      <Card className="border-border/60 bg-card shadow-card">
        <div className="flex items-center justify-between border-b border-border/60 p-5">
          <div>
            <div className="text-sm font-semibold">All jobs</div>
            <div className="text-xs text-muted-foreground">{jobs.length} total</div>
          </div>
          <Button asChild className="bg-gradient-primary shadow-elegant hover:opacity-90">
            <Link to="/company/post-job">
              <Plus className="mr-1.5 h-4 w-4" /> New job
            </Link>
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
              {jobs.map((j) => (
                <tr key={j.jobId} className="transition-colors hover:bg-secondary/20" onClick={()=>navigate({to:"/company/applicants",search:{jobId:j.jobId}})}>
                  <td className="px-5 py-3.5">
                    <div className="font-medium">{j.role}</div>
                    <div className="text-xs text-muted-foreground">Posted {new Date(j.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">Full Time</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{j.location}</td>
                  <td className="px-5 py-3.5 text-muted-foreground" onClick={()=>navigate({to:"/company/applicants",search:{jobId:j.jobId}})}>{j._count?.applications}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={"Active"} /></td>
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