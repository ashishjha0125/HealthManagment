import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
// You can find them in your Supabase Dashboard -> Project Settings -> API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bhhzsmxusliafnwpzwea.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__OLBJ_6AsB-HxvVLZH_lqw_CkVD8_r2';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
