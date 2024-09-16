import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function logActivityServer(action: string) {

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookies().getAll(),
        setAll: (updatedCookies) => updatedCookies.forEach(cookie => {
          cookies().set(cookie.name, cookie.value, cookie.options);
        }),
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase.rpc('log_activity', {
      user_id: user.id,
      action: action
    })

    if (error) {
      console.error('Error logging activity:', error)
    }
  }
}