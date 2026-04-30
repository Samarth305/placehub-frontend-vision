import { Card } from "@/components/ui/card";
import { activityFeed } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ActivityFeed() {
  return (
    <Card className="border-border/60 bg-card p-5 shadow-card">
      <div className="mb-4 text-sm font-semibold">Recent activity</div>
      <ul className="space-y-4">
        {activityFeed.map((a) => (
          <li key={a.id} className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-secondary text-xs">{a.who[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-sm">
                <span className="font-medium">{a.who}</span>{" "}
                <span className="text-muted-foreground">{a.action}</span>
              </div>
              <div className="text-xs text-muted-foreground">{a.when}</div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}