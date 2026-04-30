import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Briefcase, Users, FileText, Building2, ShieldCheck, User, Settings, LifeBuoy,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

type Item = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const groups: Record<"student" | "company" | "admin", { title: string; items: Item[] }[]> = {
  student: [
    { title: "Overview", items: [
      { to: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/student/applications", label: "Applications", icon: FileText },
      { to: "/jobs", label: "Browse jobs", icon: Briefcase },
    ]},
    { title: "Account", items: [
      { to: "/student/profile", label: "Profile", icon: User },
    ]},
  ],
  company: [
    { title: "Overview", items: [
      { to: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/company/jobs", label: "Jobs", icon: Briefcase },
      { to: "/company/applicants", label: "Applicants", icon: Users },
    ]},
  ],
  admin: [
    { title: "Overview", items: [
      { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/admin/companies", label: "Companies", icon: Building2 },
    ]},
    { title: "System", items: [
      { to: "/admin/dashboard", label: "Compliance", icon: ShieldCheck },
    ]},
  ],
};

export function DashboardSidebar({ role }: { role: "student" | "company" | "admin" }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar lg:flex">
      <div className="flex h-16 items-center border-b border-border/60 px-5">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {groups[role].map((g) => (
          <div key={g.title} className="mb-6">
            <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.title}
            </div>
            <div className="space-y-0.5">
              {g.items.map((it) => {
                const active = pathname === it.to;
                const Icon = it.icon;
                return (
                  <Link
                    key={it.label + it.to}
                    to={it.to}
                    className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all ${
                      active
                        ? "bg-secondary text-foreground shadow-card"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                    {it.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-border/60 p-3">
        <div className="space-y-0.5">
          <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground" href="#">
            <Settings className="h-4 w-4" /> Settings
          </a>
          <a className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground" href="#">
            <LifeBuoy className="h-4 w-4" /> Support
          </a>
        </div>
      </div>
    </aside>
  );
}