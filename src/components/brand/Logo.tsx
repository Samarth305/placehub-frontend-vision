import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
        <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Place<span className="text-gradient">Hub</span>
      </span>
    </Link>
  );
}