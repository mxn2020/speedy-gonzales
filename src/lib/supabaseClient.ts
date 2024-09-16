import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('[supabaseClient] Creating Supabase client');
console.log('[supabaseClient] Supabase URL:', supabaseUrl);
console.log('[supabaseClient] Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Not set');

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

supabase.auth.onAuthStateChange((event, session) => {
  console.log('[supabaseClient] Auth state changed:', event, session ? 'Authenticated' : 'Not authenticated');
});