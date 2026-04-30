import { DashboardSidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({
  role, title, subtitle, children,
}: {
  role: "student" | "company" | "admin";
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}