// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ===== OPTIONAL HELPER FUNCTIONS =====

// Get current user session
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Ensure user is logged in
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not authenticated");
  return user;
}

// Standardized CRUD helpers for Jurnify
export const jurnifyAPI = {
  async getTasks() {
    await requireAuth();
    return supabase
      .from("tasks")
      .select("*")
      .order("due_date", { ascending: true });
  },

  async addTask(task) {
    await requireAuth();
    return supabase.from("tasks").insert([task]);
    // RLS akan otomatis mengecek `auth.uid()`
    // jadi TIDAK perlu mengirim user_id
  },

  async updateTask(id, payload) {
    await requireAuth();
    return supabase.from("tasks").update(payload).eq("id", id);
  },

  async deleteTask(id) {
    await requireAuth();
    return supabase.from("tasks").delete().eq("id", id);
  },

  async getEventsByDate(dateString) {
    await requireAuth();
    return supabase
      .from("events")
      .select("*")
      .eq("event_date", dateString)
      .order("start_time", { ascending: true });
  },

  async upsertEvent(event) {
    await requireAuth();
    if (event.id) {
      return supabase.from("events").update(event).eq("id", event.id);
    } else {
      return supabase.from("events").insert([event]);
    }
  },
};
