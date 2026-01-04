import { useStreaks } from "../hooks/useStreaks";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  goalId: string;
}

export function StreakBadge({ goalId }: StreakBadgeProps) {
  const { streak, isLoading } = useStreaks(goalId);

  if (isLoading || !streak) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
        streak > 0
          ? "bg-orange-100 text-orange-600"
          : "bg-muted text-muted-foreground"
      )}
    >
      <Flame className={cn("h-3 w-3", streak > 0 && "fill-orange-600")} />
      <span>{streak} Day Streak</span>
    </div>
  );
}
