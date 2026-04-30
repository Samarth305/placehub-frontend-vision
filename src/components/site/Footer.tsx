import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The modern placement platform for ambitious students and forward-thinking companies.
          </p>
        </div>
        {[
          { title: "Product", items: ["Jobs", "For Students", "For Companies", "Pricing"] },
          { title: "Company", items: ["About", "Careers", "Press", "Contact"] },
          { title: "Resources", items: ["Blog", "Guides", "Help center", "Status"] },
        ].map((g) => (
          <div key={g.title}>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{g.title}</div>
            <ul className="mt-3 space-y-2">
              {g.items.map((i) => (
                <li key={i}>
                  <a className="text-sm text-foreground/80 transition-colors hover:text-foreground" href="#">{i}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>© 2026 PlaceHub Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}