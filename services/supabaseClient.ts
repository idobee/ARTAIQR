import { createClient, type SupabaseClient } from '@supabase/supabase-js';


const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  console.error('Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}
export const hasSupabaseEnv =
  typeof url === 'string' &&
  typeof anon === 'string' &&
  /^https?:\/\//i.test(url) &&
  anon.length > 0;

export const supabase: SupabaseClient | null = hasSupabaseEnv
  ? createClient(url!, anon!)
  : null;