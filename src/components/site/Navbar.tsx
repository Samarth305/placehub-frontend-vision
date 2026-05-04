import { Link , useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const links = [
  { to: "/jobs", label: "Jobs" },
  { to: "/student/dashboard", label: "Students" },
  { to: "/company/dashboard", label: "Companies" },
  { to: "/admin/dashboard", label: "Admin" },
] as const;

export function Navbar() {

  const navigate = useNavigate();

  const [isLoggedIn , setIsLoggedIn] = useState(false);
  const [role , setRole] = useState("");

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if(token){
      setIsLoggedIn(true);
      setRole(storedRole||"");
    }
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    navigate({to:"/login"});
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-1.5 text-sm text-foreground bg-secondary/60" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
            <span className="rounded-md bg-secondary/60 px-3 py-1.5 text-sm capitalize text-foreground">
                {role}
              </span>

              <Button
                size="sm"
                variant="ghost"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )
          :(
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="bg-gradient-primary shadow-elegant hover:opacity-90"
              >
                <Link to="/signup">Get started</Link>
              </Button>
            </>
          )}
          {/* <Button asChild variant="ghost" size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-primary shadow-elegant hover:opacity-90">
            <Link to="/signup">Get started</Link>
          </Button> */}
        </div>
      </div>
    </header>
  );
}