import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anon) {
  console.error('Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

// 빈 문자열로도 객체는 만들어지므로, 최소한 빈 문자열 방지
export const supabase = createClient(url || 'about:blank', anon || 'about:blank');
