import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Mail } from "lucide-react";
import { useState } from "react";
import { signupStudent, signupCompany } from "@/services/auth.services";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — PlaceHub" }, { name: "description", content: "Sign up for PlaceHub." }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [ role , setRole ] = useState("student");
  const [ name , setName ] = useState("");
  const [ email , setEmail ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ cgpa , setCgpa ] = useState("");
  const [ dept , setDept ] = useState("");
  const [ institute , setInstitute ] = useState("");
  const [ location , setLocation ] = useState("");
  const [ description , setDescription ] = useState("");

  const handleSignup = async () => {
    try {
      // const name = firstName+" "+lastName;
      if(role==="student"){
        await signupStudent({name,email,password,cgpa:Number(cgpa),dept,institute});
      }
      if(role==="company"){
        await signupCompany({name,email,password,location,description});
      }

      alert("Signup Success");
      navigate({to:"/login"});
    } catch (err) {
      alert("Signup Failed");
    }
  }
  
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free for students, forever."
      footer={<>Already have an account? <Link to="/login" className="text-primary hover:text-primary-glow">Sign in</Link></>}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="border-border/60 bg-secondary/30"><Github className="mr-2 h-4 w-4" /> GitHub</Button>
        <Button variant="outline" className="border-border/60 bg-secondary/30"><Mail className="mr-2 h-4 w-4" /> Google</Button>
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" /> or sign up with email <div className="h-px flex-1 bg-border" />
      </div>
      <form className="space-y-4">
        <Tabs value={role} onValueChange={setRole} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/30 border border-border/60">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="first">Full Name</Label>
            <Input id="first" placeholder="Ada" className="border-border/60 bg-secondary/30" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" placeholder="Lovelace" className="border-border/60 bg-secondary/30" />
          </div> */}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@university.edu" className="border-border/60 bg-secondary/30" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 8 characters" className="border-border/60 bg-secondary/30" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        {role === "student" && (
          <>
            <div className="space-y-2">
              <Label>CGPA</Label>
              <Input
                placeholder="8.5"
                className="border-border/60 bg-secondary/30"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Input
                placeholder="Computer Engineering"
                className="border-border/60 bg-secondary/30"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Institute</Label>
              <Input
                placeholder="XYZ University"
                className="border-border/60 bg-secondary/30"
                value={institute}
                onChange={(e) =>
                  setInstitute(e.target.value)
                }
              />
            </div>
          </>
        )}
        {role === "company" && (
          <>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Bangalore"
                className="border-border/60 bg-secondary/30"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                placeholder="About company"
                className="border-border/60 bg-secondary/30"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />
            </div>
          </>
        )}
        <Button type="button" className="w-full bg-gradient-primary shadow-elegant hover:opacity-90" onClick={handleSignup}>Create account</Button>
        <p className="text-center text-xs text-muted-foreground">By signing up you agree to our Terms and Privacy Policy.</p>
      </form>
    </AuthShell>
  );
}