import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { changePassword } from "@/services/auth.services";

export const Route = createFileRoute("/change-password")({
  head: () => ({
    meta: [
      { title: "Change Password — PlaceHub" },
      { name: "description", content: "Update your PlaceHub account password." },
    ],
  }),
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - no backend wiring as requested
    if(newPassword!==confirmPassword){
      alert("New Password does not match with confirming password");
      return;
    }
    const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    if(!strongPasswordRegex.test(newPassword)){
      alert("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
      return;
    }

    try {
      await changePassword({oldPassword:currentPassword,newPassword});
      alert("Password changed successfully!");
      navigate({ to: "/login" });
    } catch (err:any) {
      alert(err.response?.data?.error || "Password change failed");
    }

  };

  return (
    <AuthShell
      title="Secure your account"
      subtitle="Update your password to keep your profile safe."
      footer={
        <>
          Need help? <Link to="#" className="text-primary hover:text-primary-glow">Contact support</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showPasswords ? "text" : "password"}
              placeholder="••••••••"
              className="border-border/60 bg-secondary/30 pr-10"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPasswords(!showPasswords)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type={showPasswords ? "text" : "password"}
            placeholder="••••••••"
            className="border-border/60 bg-secondary/30"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <p className="text-[10px] text-muted-foreground mt-1">
            Minimum 8 characters with at least one number and special character.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type={showPasswords ? "text" : "password"}
            placeholder="••••••••"
            className="border-border/60 bg-secondary/30"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-gradient-primary shadow-elegant hover:opacity-90 flex items-center justify-center gap-2"
          >
            <Lock size={16} /> Update Password
          </Button>
        </div>
      </form>
    </AuthShell>
  );
}
