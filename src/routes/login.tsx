import { createFileRoute, Link, useNavigate} from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { loginStudent , loginCompany , loginAdmin } from "@/services/auth.services";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — PlaceHub" }, { name: "description", content: "Sign in to PlaceHub." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [ role , setRole ] = useState("student");
  const [ email , setEmail ] = useState("");
  const [ password , setPassword ] = useState("");

  const handleLogin = async () => {
    try {
      let res;

      if (role==='student'){
        res = await loginStudent({email,password});
      }
      if(role==='company'){
        res = await loginCompany({email,password});
      }
      if(role==='admin'){
        res = await loginAdmin({email,password});
      }

      (typeof window !== 'undefined' ? localStorage.setItem("token", res.token) : null);
      (typeof window !== 'undefined' ? localStorage.setItem("role", res.role) : null);
      window.dispatchEvent(new Event("storage"));

      if(role==='student')navigate({to:"/student/dashboard"});
      if(role==='company')navigate({to:"/company/dashboard"});
      if(role==='admin')navigate({to:"/admin/dashboard"});
    } catch (err) {
      alert("Login Failed");
    }
  }
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your PlaceHub account."
      footer={<>Don't have an account? <Link to="/signup" className="text-primary hover:text-primary-glow">Create one</Link></>}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="border-border/60 bg-secondary/30"><Github className="mr-2 h-4 w-4" /> GitHub</Button>
        <Button variant="outline" className="border-border/60 bg-secondary/30"><Mail className="mr-2 h-4 w-4" /> Google</Button>
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or continue with email <div className="h-px flex-1 bg-border" />
      </div>
      <form className="space-y-4">
        <Tabs value={role} onValueChange={setRole} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/30 border border-border/60">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@university.edu" className="border-border/60 bg-secondary/30" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</a>
          </div>
          <Input id="password" type="password" placeholder="••••••••" className="border-border/60 bg-secondary/30" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Button type="button" className="w-full bg-gradient-primary shadow-elegant hover:opacity-90" onClick={handleLogin}>Sign in</Button>
      </form>
    </AuthShell>
  );
}