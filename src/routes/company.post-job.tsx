import { createFileRoute, Navigate, useNavigate, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CalendarIcon, Rocket, Link as LinkIcon, IndianRupee, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createJob } from "@/services/job.services";

export const Route = createFileRoute("/company/post-job")({
   beforeLoad: () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if(!token || role !== "company"){
      throw redirect({to:"/login"});
    }
  },
  head: () => ({ meta: [{ title: "Post a Job — PlaceHub" }] }),
  component: PostJobPage,
});


function PostJobPage() {
  const [date , setDate] = useState<Date>();
  const [role , setRole] = useState("");
  const [ctc , setCtc] = useState<number>(0);
  const [jdUrl , setJdUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await createJob({
        role,
        ctc:ctc*100000,
        jdUrl,
        deadline:date
      })
      navigate({to:"/company/jobs"});
    } catch (err:any) {
      alert(err.response?.data?.error || "Failed");
    }
  }

  return (
    <DashboardLayout 
      role="company" 
      title="Create Job Opening" 
      subtitle="Fill in the details below to post a new opportunity for students."
    >
      <div className="mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="glass border-border/60 p-8 shadow-elegant">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Rocket className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Job Details</h2>
              <p className="text-sm text-muted-foreground">All fields are required to publish the opening.</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">Job Role / Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="role" 
                  placeholder="e.g. Software Development Engineer" 
                  className="border-border/60 bg-background/40 pl-9 focus:ring-primary/40"
                  value={role}
                  onChange={(e)=>setRole(e.target.value)}
                  required
                />
              </div>
              <p className="text-[11px] text-muted-foreground">Clear and descriptive titles get more applicants.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ctc" className="text-sm font-medium">Salary (CTC in LPA)</Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    id="ctc" 
                    type="number" 
                    step="0.1" 
                    placeholder="e.g. 12.5" 
                    className="border-border/60 bg-background/40 pl-9 focus:ring-primary/40"
                    value={ctc}
                    onChange={(e)=>setCtc(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Application Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start border-border/60 bg-background/40 text-left font-normal hover:bg-background/60",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="bg-card"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jdUrl" className="text-sm font-medium">Job Description (URL)</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  id="jdUrl" 
                  type="url" 
                  placeholder="https://company.com/careers/sde-jd.pdf" 
                  className="border-border/60 bg-background/40 pl-9 focus:ring-primary/40"
                  value={jdUrl}
                  onChange={(e)=>setJdUrl(e.target.value)}
                  required
                />
              </div>
              <p className="text-[11px] text-muted-foreground">Link to a PDF or a web page containing full job details.</p>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-gradient-primary shadow-elegant hover:opacity-90" onClick={handleSubmit}>
                <Rocket className="mr-2 h-4 w-4" /> Post Job Opening
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span>Your job will be instantly visible to thousands of qualified students.</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
