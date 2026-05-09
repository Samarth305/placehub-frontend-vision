import { Briefcase, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { applyJobs } from "@/services/job.services";
import { useNavigate } from "@tanstack/react-router";

export function JobCard({ job , applied , onApplySuccess}: { job: any , applied: boolean , onApplySuccess:(jobId:string)=>void}) {
  const navigate = useNavigate();

  const handleApply = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      alert("Please login first");
      navigate({ to: "/login" });
      return;
    }

    if (role !== "student") {
      alert("Only students can apply");
      return;
    }

    try {
      await applyJobs(job.jobId);
      alert("Applied successfully!");
      onApplySuccess(job.jobId);
    } catch (err: any) {
      alert(err.response?.data?.error || "Apply failed");
    }
  };

  return (
    <Card className="group flex flex-col gap-4 border-border/60 bg-card p-5 shadow-card">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-primary text-white font-semibold">
          {job.company?.name?.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="truncate text-base font-semibold">
              {job.role}
            </h3>

            <span className="text-xs text-muted-foreground">
              New
            </span>
          </div>

          <div className="text-sm text-muted-foreground">
            {job.company?.name}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        Exciting opportunity for {job.role}
      </p>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {job.company?.location}
        </span>

        <span className="inline-flex items-center gap-1">
          <Briefcase className="h-3.5 w-3.5" />
          Full-time
        </span>

        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          ₹ {(job.ctc / 100000).toFixed(1)} LPA
        </span>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge>Applications: {job._count?.applications}</Badge>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Posted by {job.company?.name}
        </span>

        <Button
          size="sm"
          className={applied ? "bg-green-600" : "bg-gradient-primary"}
          onClick={handleApply}
          disabled={applied}
        >
          {applied?"Applied":"Apply"}
        </Button>
      </div>
    </Card>
  );
}