import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Quote } from "lucide-react";

export function AuthShell({
  title, subtitle, children, footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border/60 bg-sidebar lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-highlight/20 blur-3xl" />
        <div className="relative z-10">
          <Logo />
        </div>
        <div className="relative z-10 max-w-md">
          <Quote className="h-8 w-8 text-primary" />
          <p className="mt-4 text-2xl font-medium leading-relaxed text-foreground">
            "PlaceHub turned our campus placements into a 10x smoother experience. Students landed offers faster than ever."
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-sm font-semibold text-white">RM</div>
            <div>
              <div className="text-sm font-medium">Rohan Mehta</div>
              <div className="text-xs text-muted-foreground">Placement Director, IIT Bombay</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-xs text-muted-foreground">© 2026 PlaceHub Inc.</div>
      </div>
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="glass rounded-2xl p-8 shadow-elegant">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
          <div className="mt-8 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}