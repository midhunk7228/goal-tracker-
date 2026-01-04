import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Database } from "@/types/database.types";
import { useTasks } from "../hooks/useTasks";

type Task = Database["public"]["Tables"]["tasks"]["Row"];

interface TaskItemProps {
  task: Task & { goals?: { title: string } };
}

export function TaskItem({ task }: TaskItemProps) {
  const { toggleTaskCompletion } = useTasks();
  const [isCompleted, setIsCompleted] = useState(task.completed);

  const handleToggle = (checked: boolean) => {
    setIsCompleted(checked);
    toggleTaskCompletion.mutate({
      id: task.id,
      completed: checked,
    });
  };

  return (
    <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50 transition-colors">
      <Checkbox
        id={`task-${task.id}`}
        checked={isCompleted}
        onCheckedChange={handleToggle}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            isCompleted && "line-through text-muted-foreground"
          )}
        >
          {task.notes || "Unnamed Task"}
          {/* Fallback to goal title if we link them properly later, or current Goal Title context */}
        </label>
        {task.goals?.title && (
          <p className="text-xs text-muted-foreground">{task.goals.title}</p>
        )}
      </div>
    </div>
  );
}
