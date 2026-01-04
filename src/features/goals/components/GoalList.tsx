import { useGoals } from "@/features/goals/hooks/useGoals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Target } from "lucide-react";
import { StreakBadge } from "@/features/analytics/components/StreakBadge";
import { EmptyState } from "@/components/ui/empty-state";
import { motion, AnimatePresence } from "framer-motion";

export function GoalList() {
  const { goals, isLoading } = useGoals();

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!goals?.length) {
    return (
      <EmptyState
        icon={Target}
        title="No Goals Yet"
        description="Create your first goal to start tracking your habits and consistency."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence>
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full border-muted-foreground/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold truncate pr-2">
                  {goal.title}
                </CardTitle>
                <StreakBadge goalId={goal.id} />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
                  {goal.description || "No description"}
                </p>
                <div className="text-xs font-mono bg-muted p-2 rounded inline-block text-muted-foreground">
                  {goal.frequency}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
