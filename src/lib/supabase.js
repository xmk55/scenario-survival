import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isCloudConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isCloudConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export function getSupabaseConfig() {
  return { url: supabaseUrl, anonKey: supabaseAnonKey };
}
