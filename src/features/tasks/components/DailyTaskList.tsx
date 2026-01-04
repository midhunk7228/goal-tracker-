import { useGoals } from "@/features/goals/hooks/useGoals";
import { useTasks } from "../hooks/useTasks";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyState } from "@/components/ui/empty-state";

export function DailyTaskList() {
  const { goals, isLoading: goalsLoading } = useGoals();
  const { useTodaysTasks, createTask, toggleTaskCompletion } = useTasks();
  const { data: tasks, isLoading: tasksLoading } = useTodaysTasks();
  const { user } = useAuth();

  const isLoading = goalsLoading || tasksLoading;

  const handleToggle = (
    goalId: string,
    existingTask: any,
    checked: boolean
  ) => {
    if (!user) return;

    if (existingTask) {
      toggleTaskCompletion.mutate({
        id: existingTask.id,
        completed: checked,
      });
    } else if (checked) {
      createTask.mutate({
        goal_id: goalId,
        user_id: user.id,
        completed: true,
        date: new Date().toISOString().split("T")[0],
      });
    }
  };

  return (
    <Card className="h-full border-none shadow-none md:border md:shadow-sm">
      <CardHeader>
        <CardTitle>Daily Check-in</CardTitle>
        <CardDescription>Mark your progress for today.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !goals?.length ? (
          <EmptyState
            icon={CheckSquare}
            title="No Active Tasks"
            description="Add a goal to see your daily checklist here."
            className="border-none p-0 min-h-[150px] border-0"
          />
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {goals.map((goal, index) => {
                const task = tasks?.find((t) => t.goal_id === goal.id);
                const isCompleted = task?.completed || false;

                return (
                  <motion.div
                    key={goal.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg transition-all md:hover:bg-muted/50 border",
                      isCompleted
                        ? "bg-primary/5 border-primary/20"
                        : "bg-card border-border"
                    )}
                  >
                    <Checkbox
                      id={`goal-${goal.id}`}
                      checked={isCompleted}
                      onCheckedChange={(checked) =>
                        handleToggle(goal.id, task, checked as boolean)
                      }
                      className="h-5 w-5 data-[state=checked]:bg-primary"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor={`goal-${goal.id}`}
                        className={cn(
                          "text-sm font-medium leading-none cursor-pointer select-none transition-colors",
                          isCompleted && "line-through text-muted-foreground"
                        )}
                      >
                        {goal.title}
                      </label>
                      <p className="text-xs text-muted-foreground">
                        {goal.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
