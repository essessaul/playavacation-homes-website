import { supabase, hasSupabase } from "../lib/supabase";
import { starterProperties } from "../data/starterData";

export async function getProperties() {
  if (!hasSupabase) return starterProperties;
  const { data, error } = await supabase.from("properties").select("*").order("name");
  if (error || !data?.length) return starterProperties;
  return data;
}

export async function getPropertyBySlug(slug) {
  if (!hasSupabase) return starterProperties.find((item) => item.slug === slug) || null;
  const { data, error } = await supabase.from("properties").select("*").eq("slug", slug).maybeSingle();
  if (error || !data) return starterProperties.find((item) => item.slug === slug) || null;
  return data;
}
