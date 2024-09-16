'use client'

// src/components/admin/SystemStats.tsx

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr'

export function SystemStats() {
  const [stats, setStats] = useState({ userCount: 0, adminCount: 0, superAdminCount: 0 });
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    async function fetchStats() {
      const { data: userCount } = await supabase
        .from('user_details')
        .select('id', { count: 'exact' });

      const { data: adminCount } = await supabase
        .from('user_roles')
        .select('id', { count: 'exact' })
        .eq('role', 'admin');

      const { data: superAdminCount } = await supabase
        .from('user_roles')
        .select('id', { count: 'exact' })
        .eq('role', 'super_admin');

      setStats({
        userCount: userCount?.count || 0,
        adminCount: adminCount?.count || 0,
        superAdminCount: superAdminCount?.count || 0,
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">System Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-gray-600">Total Users</p>
          <p className="text-2xl font-bold">{stats.userCount}</p>
        </div>
        <div>
          <p className="text-gray-600">Admins</p>
          <p className="text-2xl font-bold">{stats.adminCount}</p>
        </div>
        <div>
          <p className="text-gray-600">Super Admins</p>
          <p className="text-2xl font-bold">{stats.superAdminCount}</p>
        </div>
      </div>
    </div>
  );
}