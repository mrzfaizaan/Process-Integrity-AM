import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hymxodyqclzygzwnnjso.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_NhbQSYbocKPtDehbV0z1qg_TxBWhA6a';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getVisitorId() {
  const key = 'pi-am-visitor-id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
