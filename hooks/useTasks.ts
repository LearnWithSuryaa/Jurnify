import useSWR from "swr";
import { createSupabaseClient } from "../lib/supabaseClient";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  due_date: string;
  created_at: string;
  user_id: string;
}

const fetcher = async () => {
  const supabase = createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Task[];
};

export function useTasks() {
  const { data, error, isLoading, mutate } = useSWR<Task[]>("tasks", fetcher);

  return {
    tasks: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
