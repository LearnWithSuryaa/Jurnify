import useSWR from "swr";
import { createSupabaseClient } from "../lib/supabaseClient";

export interface Event {
  id: string | null;
  title: string;
  description: string | null;
  event_date: string; // YYYY-MM-DD
  user_id?: string;
  metadata?: {
    category?: string;
  };
  created_at?: string;
}

const fetcher = async () => {
  const supabase = createSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id)
    .order("event_date", { ascending: true });

  if (error) throw error;
  return data as Event[];
};

export function useEvents() {
  const { data, error, isLoading, mutate } = useSWR<Event[]>("events", fetcher);

  return {
    events: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
