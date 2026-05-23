import { createFileRoute , useSearch , redirect} from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Download } from "lucide-react";
// import { applicants } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { getApplicants } from "@/services/job.services";
import { updateApplicationStatus } from "@/services/job.services";

export const Route = createFileRoute("/company/applicants")({
   beforeLoad: () => {
    if (typeof window === 'undefined') return;
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const role = (typeof window !== 'undefined' ? localStorage.getItem("role") : null);

    if(!token || role !== "company"){
      throw redirect({to:"/login"});
    }
  },
  head: () => ({ meta: [{ title: "Applicants — PlaceHub Company" }] }),
  component: ApplicantsPage,
});

function ApplicantsPage() {
  const [q, setQ] = useState("");
  const [ applicants , setApplicants ] = useState<any[]>([]);
  const [ loading , setLoading ] = useState(true);
  const { jobId } = useSearch({
    from:"/company/applicants"
  });
  const list = applicants.filter((a) =>
    !q || (a.student.name + a.job.role + a.student.institute).toLowerCase().includes(q.toLowerCase()),
  );

  useEffect(()=>{
    const loadApplicants = async () => {
      try {
        const data = await getApplicants(jobId);
        setApplicants(data.applicants);
      } catch (err) {
        console.log(err);
      } finally{
        setLoading(false);
      }
    }
    loadApplicants();
  },[jobId]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  const handleStatusUpdate = async(applicationId:string , status:string) => {
    try {
      await updateApplicationStatus(applicationId , status);
      setApplicants((prev)=>prev.map(app=>app.applicationId===applicationId?{...app,status}:app));
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (applicationId:string , status: string) => {
    try {
      
    } catch (err) {
      console.log(err);
    }
  }

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
                <tr key={a.applicationId} className="transition-colors hover:bg-secondary/20">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-secondary text-xs">{a.student.name.split(" ").map((n:string) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{a.student.name}</div>
                        <div className="text-xs text-muted-foreground">{a.student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.job.role}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.student.institute}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.student.cgpa}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={a.status} /></td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-2">
                     {a.student.resumeUrl?(
                      <Button size="sm" variant="outline" asChild><a href={a.student.resumeUrl} target="_blank" rel="noopener noreferrer"> Resume</a></Button>
                     ):(
                       <Button size="sm" variant="outline"  disabled>No Resume</Button>
                     )
                      
                     }
                      <Button size="sm" className="bg-green-600" onClick={()=>handleStatusUpdate(a.applicationId,"SHORTLISTED")} disabled={a.status==="SHORTLISTED"}>{a.status==="SHORTLISTED"?"Shortlisted":"Shortlist"}</Button>
                      <Button size="sm" className="destructive" onClick={()=>handleStatusUpdate(a.applicationId,"REJECTED")} disabled={a.status==="REJECTED"}>{a.status==="REJECTED"?"Rejected":"Reject"}</Button>
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