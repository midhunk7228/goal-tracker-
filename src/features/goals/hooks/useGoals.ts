import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";

type Goal = Database["public"]["Tables"]["goals"]["Row"];
type NewGoal = Database["public"]["Tables"]["goals"]["Insert"];

export function useGoals() {
  const queryClient = useQueryClient();

  const {
    data: goals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Goal[];
    },
  });

  const createGoal = useMutation({
    mutationFn: async (newGoal: NewGoal) => {
      const { data, error } = await supabase
        .from("goals")
        .insert(newGoal)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
    },
  });

  return {
    goals,
    isLoading,
    error,
    createGoal,
  };
}
