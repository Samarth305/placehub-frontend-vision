import { Link , useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

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
  const [open , setOpen ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if(token){
      setIsLoggedIn(true);
      setRole(storedRole||"");
    }else{
      setIsLoggedIn(false);
      setRole("");
    }
  }

  useEffect(()=>{
    checkAuth();
    window.addEventListener("storage",checkAuth);
    return () => {
      window.removeEventListener("storage",checkAuth);
    }
  },[]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
    navigate({to:"/login"});
  }

  const getDashboardRoute = () => {
    if(role==="student")return "/student/dashboard";
    if(role==="admin")return "/admin/dashboard";
    if(role==="company")return "/company/dashboard";
    return "/";
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
        <div className="relative flex items-center gap-2">
          {isLoggedIn ? (
            <>
            {/* Avatar */}
              <div
                ref={buttonRef}
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-white ring-offset-background transition-all hover:opacity-90 active:scale-95"
              >
                {role?.charAt(0).toUpperCase()}
              </div>
              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-card p-1 shadow-lg animate-in fade-in zoom-in duration-200"
                >
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground capitalize border-b border-border/50 mb-1">
                    Logged in as {role}
                  </div>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate({ to: getDashboardRoute() });
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate({ to: "/change-password" });
                    }}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary/60"
                  >
                    Change Password
                  </button>

                  <div className="my-1 h-px bg-border/50" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10"
                  >
                    Logout
                  </button>
                </div>
              )}
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