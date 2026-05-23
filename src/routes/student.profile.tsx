import { createFileRoute, redirect } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Mail, MapPin, Link2, Github, Linkedin, Loader2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { viewProfile , uploadResume , updateProfile } from "../services/student.service";

export const Route = createFileRoute("/student/profile")({
  beforeLoad: () => {
    const token = (typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    const role = (typeof window !== 'undefined' ? localStorage.getItem("role") : null);

    if(!token || role !== "student"){
      throw redirect({to:"/login"});
    }
  },
  head: () => ({ meta: [{ title: "Profile — PlaceHub" }] }),
  component: ProfilePage,
});

function ProfilePage() {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading , setUploading] = useState(false);
    const [student,setStudent] = useState<any>(null);
    const [loading,setLoading] = useState(true);
    const [name, setName] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [dept, setDept] = useState("");
    const [institute, setInstitute] = useState("");

    useEffect(() => {
      const loadProfile = async () => {
        try {
          const data = await viewProfile();
          setStudent(data);
          setName(data.name || "");
          setCgpa(data.cgpa !== null && data.cgpa !== undefined ? String(data.cgpa) : "");
          setDept(data.dept || "");
          setInstitute(data.institute || "");
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      loadProfile();
    }, []);
    
    const handleUploadClick = () => {
      fileInputRef.current?.click();
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if(!file){
        return;
      }

      if(file.type!=="application/pdf"){
        toast.error("Please upload a PDF file");
        return;
      }

      const formData = new FormData();
      formData.append("resume",file);

      try {
        setUploading(true);
        const res = await uploadResume(file);
        // console.log("Uploaded URL:", res.resumeUrl);
        toast.success("Resume uploaded successfully!");
      } catch (err:any) {
        toast.error(err.response?.data?.error||"Failed to upload the resume");
      } finally{
        setUploading(false);
      }
    }

    const handleSaveChanges = async () => {
      try{
        const parsedCgpa = parseFloat(cgpa);
        if(isNaN(parsedCgpa)||parsedCgpa<0||parsedCgpa>10){
          toast.error("Please enter a valid CGPA between 0 and 10");
          return;
        }
        await updateProfile({
          name,
          cgpa:parsedCgpa,
          dept,
          institute
        });
        toast.success("profile updated successfully");

        setStudent((prev:any)=>({
          ...prev,
          name,
          cgpa:parsedCgpa,
          dept,
          institute
        }));
      }catch(err:any){
        toast.error(err.response?.data?.error || "Failed to update profile");
      }
    }

    if(loading){
        return <div className="p-6">Loading...</div>;
    }

  return (
    <DashboardLayout role="student" title="Your profile" subtitle="Keep your profile up to date to get noticed.">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 bg-card p-6 shadow-card lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-gradient-primary text-xl text-white">AL</AvatarFallback>
            </Avatar>
            <div className="mt-4 text-lg font-semibold">{student?.name}</div>
            <div className="text-sm text-muted-foreground">{student?.dept}</div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{student?.institute}</span>
              {/* <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Mumbai, IN</span> */}
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileChange}/>

            <div className="mt-5 flex w-full gap-2">
              <Button className="flex-1 bg-gradient-primary hover:opacity-90" >Edit profile</Button>
              <Button variant="outline" className="border-border/60" onClick={handleUploadClick}
                disabled={uploading}
              >
                {uploading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 h-4 w-4" />
                )}Resume</Button>
            </div>
          </div>

          <div className="mt-6 space-y-3 border-t border-border/60 pt-5 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground"><Mail className="h-4 w-4" />{student?.email}</div>
            <div className="flex items-center gap-3 text-muted-foreground"><Linkedin className="h-4 w-4" /> linkedin.com/in/ada</div>
            <div className="flex items-center gap-3 text-muted-foreground"><Github className="h-4 w-4" /> github.com/ada</div>
            <div className="flex items-center gap-3 text-muted-foreground"><Link2 className="h-4 w-4" /> ada.dev</div>
          </div>
        </Card>

        <Card className="border-border/60 bg-card p-6 shadow-card lg:col-span-2">
          <div className="text-sm font-semibold">Personal information</div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2"><Label>Full name</Label><Input onChange={(e)=>setName(e.target.value)} defaultValue={student?.name} className="border-border/60 bg-secondary/30" /></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue={student?.email} className="border-border/60 bg-secondary/30" /></div>
            <div className="space-y-2"><Label>University</Label><Input onChange={(e)=>setInstitute(e.target.value)} defaultValue={student?.institute} className="border-border/60 bg-secondary/30" /></div>
            <div className="space-y-2"><Label>Degree</Label><Input onChange={(e)=>setDept(e.target.value)} defaultValue={student?.dept} className="border-border/60 bg-secondary/30" /></div>
            <div className="space-y-2"><Label>Graduation year</Label><Input defaultValue="2027" className="border-border/60 bg-secondary/30" /></div>
            <div className="space-y-2"><Label>CGPA</Label><Input onChange={(e)=>setCgpa(e.target.value)} defaultValue={String(student?.cgpa)} className="border-border/60 bg-secondary/30" /></div>
          </div>

          <div className="mt-6 space-y-2">
            <Label>About</Label>
            <Textarea
              rows={4}
              defaultValue="Final-year CS student passionate about distributed systems, design, and shipping product. Looking for full-time SWE roles starting summer 2026."
              className="border-border/60 bg-secondary/30"
            />
          </div>

          <div className="mt-6">
            <Label>Skills</Label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {["TypeScript", "React", "Node.js", "Postgres", "Go", "Figma", "System Design", "Distributed Systems"].map((s) => (
                <Badge key={s} variant="secondary" className="bg-secondary/60 text-foreground/80">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" className="border-border/60">Cancel</Button>
            <Button className="bg-gradient-primary hover:opacity-90" onClick={handleSaveChanges}>Save changes</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}