import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { CreateGoal } from "@/features/goals/components/CreateGoal";
import { GoalList } from "@/features/goals/components/GoalList";
import { DailyTaskList } from "@/features/tasks/components/DailyTaskList";
import { LogOut, Bell, BellRing } from "lucide-react";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { requestPermission, sendLocalNotification, permission } =
    useNotifications();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const activateNotification = async () => {
    if (permission !== "granted") {
      await requestPermission();
    } else {
      // Send test notification
      sendLocalNotification("Test Notification", {
        body: "Notifications are working perfectly!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your goals and track progress.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={activateNotification}
            title={
              permission === "granted"
                ? "Send Test Notification"
                : "Enable Notifications"
            }
          >
            {permission === "granted" ? (
              <BellRing className="h-4 w-4" />
            ) : (
              <Bell className="h-4 w-4" />
            )}
          </Button>

          <CreateGoal />
          <Button onClick={handleLogout} variant="outline" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1">
          <DailyTaskList />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
          <GoalList />
        </div>
      </div>
    </div>
  );
}
