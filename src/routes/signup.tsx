import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — PlaceHub" }, { name: "description", content: "Sign up for PlaceHub." }] }),
  component: SignupPage,
});

function SignupPage() {
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
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="first">First name</Label>
            <Input id="first" placeholder="Ada" className="border-border/60 bg-secondary/30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last">Last name</Label>
            <Input id="last" placeholder="Lovelace" className="border-border/60 bg-secondary/30" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@university.edu" className="border-border/60 bg-secondary/30" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="At least 8 characters" className="border-border/60 bg-secondary/30" />
        </div>
        <Button type="button" className="w-full bg-gradient-primary shadow-elegant hover:opacity-90">Create account</Button>
        <p className="text-center text-xs text-muted-foreground">By signing up you agree to our Terms and Privacy Policy.</p>
      </form>
    </AuthShell>
  );
}