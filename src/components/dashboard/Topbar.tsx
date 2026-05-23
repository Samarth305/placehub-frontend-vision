import { Bell, Search, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/services/notification.service";

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const data = await getNotifications();
        // Extract array from your backend response: { notifForThatUser: [...] }
        setNotifications(data.notifForThatUser || []);
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    };
    fetchNotifs();
  }, []);

  const hasUnread = notifications.some((n) => !n.isRead);

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    if (isRead) return; // Already read
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.notificationId === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-border/60 bg-background/70 px-6 backdrop-blur-xl">
      <div>
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="h-9 w-72 border-border/60 bg-secondary/40 pl-9" />
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-4 w-4" />
              {hasUnread && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-highlight" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border-border/60 bg-card p-0 shadow-card" align="end">
            <div className="flex items-center justify-between border-b border-border/60 p-4">
              <h4 className="text-sm font-semibold">Notifications</h4>
              {hasUnread && (
                <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="h-auto p-0 text-xs text-primary hover:text-primary-glow">
                  <CheckCheck className="mr-1 h-3 w-3" /> Mark all read
                </Button>
              )}
            </div>
            <div className="flex max-h-[300px] flex-col overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.notificationId}
                    onClick={() => handleMarkAsRead(n.notificationId, n.isRead)}
                    className={`flex cursor-pointer flex-col gap-1 border-b border-border/60 p-4 transition-colors hover:bg-secondary/20 ${
                      n.isRead ? "opacity-60" : "bg-primary/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{n.title}</span>
                      {!n.isRead && <span className="h-2 w-2 rounded-full bg-highlight" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{n.message}</p>
                    <span className="text-[10px] text-muted-foreground/60">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-gradient-primary text-xs text-white">PH</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}