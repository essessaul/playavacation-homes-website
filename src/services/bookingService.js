import { supabase, hasSupabase } from "../lib/supabase";

export async function createBooking(payload) {
  if (!hasSupabase) {
    return { success: true, id: `DEV-${Date.now()}`, data: payload };
  }
  const { data, error } = await supabase.from("bookings").insert([payload]).select().single();
  if (error) return { success: false, error };
  return { success: true, id: data.id, data };
}
