import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  parseISO,
  differenceInCalendarDays,
  isSameDay,
  subDays,
} from "date-fns";

export function useStreaks(goalId: string) {
  const { data: streak, isLoading } = useQuery({
    queryKey: ["streak", goalId],
    queryFn: async () => {
      // Fetch all completed tasks for this goal, ordered by date desc
      const { data, error } = await supabase
        .from("tasks")
        .select("date")
        .eq("goal_id", goalId)
        .eq("completed", true)
        .order("date", { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) return 0;

      const dates = data.map((t) => parseISO(t.date));

      // Remove duplicates just in case
      const uniqueDates = Array.from(
        new Set(dates.map((d) => d.toISOString().split("T")[0]))
      ).map((d) => parseISO(d));

      let currentStreak = 0;
      const today = new Date();
      // Check if we have a task for today
      let checkDate = today;

      // If no task today, check if we have one for yesterday to continue the streak
      const hasTaskToday = uniqueDates.some((d) => isSameDay(d, today));
      if (!hasTaskToday) {
        checkDate = subDays(today, 1);
      }

      // Iterate backwards
      while (true) {
        const hasTask = uniqueDates.some((d) => isSameDay(d, checkDate));
        if (hasTask) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        } else {
          break;
        }
      }

      return currentStreak;
    },
    // Refetch when tasks change (handled by query invalidation in useTasks)
  });

  return { streak, isLoading };
}
