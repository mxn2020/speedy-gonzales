import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function logActivity(action: string) {
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