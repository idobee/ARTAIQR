import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nbafgyzvieauspftfykt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYWZneXp2aWVhdXNwZnRmeWt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MTA4NTUsImV4cCI6MjA3NTQ4Njg1NX0.vBXfI2j85BkFFVfM02gKwU8t1u6hYhe-qzbaJMg6xI0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
