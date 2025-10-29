import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseEnv = !!url && !!anon && /^https?:\/\//i.test(url);
export const supabase: SupabaseClient | null = hasSupabaseEnv ? createClient(url!, anon!) : null;