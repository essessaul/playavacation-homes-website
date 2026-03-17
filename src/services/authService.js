import { supabase, hasSupabase } from "../lib/supabase";

export async function signIn(email, password) {
  if (!hasSupabase) return { error: new Error("Supabase is not configured yet.") };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signUp(email, password, role = "guest", displayName = "") {
  if (!hasSupabase) return { error: new Error("Supabase is not configured yet.") };
  return supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        display_name: displayName,
      },
    },
  });
}

export async function signOut() {
  if (!hasSupabase) return;
  await supabase.auth.signOut();
}

export async function getSession() {
  if (!hasSupabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getProfile(userId) {
  if (!hasSupabase || !userId) return null;
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  return data || null;
}
