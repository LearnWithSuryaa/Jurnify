import useSWR from "swr";
import { createSupabaseClient } from "../lib/supabaseClient";

export interface Journal {
  id: string;
  title: string;
  content: string;
  mood: string;
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
    .from("journals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Journal[];
};

export function useJournals() {
  const { data, error, isLoading, mutate } = useSWR<Journal[]>(
    "journals",
    fetcher
  );

  return {
    journals: data || [],
    isLoading,
    isError: error,
    mutate,
  };
}
