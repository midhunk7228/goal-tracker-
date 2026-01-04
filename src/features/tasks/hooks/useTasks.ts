import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";

type Task = Database["public"]["Tables"]["tasks"]["Row"];
type NewTask = Database["public"]["Tables"]["tasks"]["Insert"];
type UpdateTask = Database["public"]["Tables"]["tasks"]["Update"];

export function useTasks(goalId?: string) {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", goalId],
    queryFn: async () => {
      let query = supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (goalId) {
        query = query.eq("goal_id", goalId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Task[];
    },
  });

  // Hook to fetch tasks for today across all goals
  const useTodaysTasks = () =>
    useQuery({
      queryKey: ["tasks", "today"],
      queryFn: async () => {
        const today = new Date().toISOString().split("T")[0];
        const { data, error } = await supabase
          .from("tasks")
          .select("*, goals(title)")
          .eq("date", today);

        if (error) throw error;
        return data;
      },
    });

  const createTask = useMutation({
    mutationFn: async (newTask: NewTask) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert(newTask)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, ...updates }: UpdateTask & { id: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const toggleTaskCompletion = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: string;
      completed: boolean;
    }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update({ completed })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    toggleTaskCompletion,
    useTodaysTasks,
  };
}
