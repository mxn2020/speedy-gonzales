// src/app/[locale]/admin/dashboard/page.tsx

import { Suspense } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AssignSuperAdmin } from '@/components/admin/AssignSuperAdmin';
import { UserManagement } from '@/components/admin/UserManagement';
import { RoleManagement } from '@/components/admin/RoleManagement';
import { SystemStats } from '@/components/admin/SystemStats';
import { ActivityLog } from '@/components/admin/ActivityLog';

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });
  
  const { data: { user } } = await supabase.auth.getUser();
  const { data: roles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user?.id);

  const isSuperAdmin = roles?.some(r => r.role === 'super_admin');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<div>Loading stats...</div>}>
          <SystemStats />
        </Suspense>
        
        <Suspense fallback={<div>Loading activity log...</div>}>
          <ActivityLog />
        </Suspense>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <Suspense fallback={<div>Loading user management...</div>}>
          <UserManagement />
        </Suspense>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Role Management</h2>
        <Suspense fallback={<div>Loading role management...</div>}>
          <RoleManagement />
        </Suspense>
      </div>

      {isSuperAdmin && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Super Admin Actions</h2>
          <AssignSuperAdmin />
        </div>
      )}
    </div>
  );
}