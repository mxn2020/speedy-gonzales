// src/hooks/useRole.ts
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

export function useRole() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .then(({ data, error }) => {
          if (data && !error) {
            setRoles(data.map(r => r.role));
          }
        });
    }
  }, [user, supabase]);

  const hasRole = (role: string) => roles.includes(role);
  const isSuperAdmin = () => hasRole('super_admin');

  return { roles, hasRole, isSuperAdmin };
}
