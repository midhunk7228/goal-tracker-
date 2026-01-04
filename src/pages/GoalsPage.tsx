import { GoalList } from "@/features/goals/components/GoalList";
import { CreateGoal } from "@/features/goals/components/CreateGoal";

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-muted/40 p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Goals</h1>
          <p className="text-muted-foreground">
            View and manage all your tracking goals.
          </p>
        </div>
        <CreateGoal />
      </div>
      <GoalList />
    </div>
  );
}
