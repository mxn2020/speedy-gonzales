// src/app/api/assign-super-admin/route.ts

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { assignSuperAdminRole } from '@/lib/roleManagement';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  // Check if the current user is a super admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: roles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id);

  const isSuperAdmin = roles?.some(r => r.role === 'super_admin');
  if (!isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Get the user ID from the request body
  const { userId } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const result = await assignSuperAdminRole(userId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error assigning super admin role:', error);
    return NextResponse.json({ error: 'Failed to assign super admin role' }, { status: 500 });
  }
}