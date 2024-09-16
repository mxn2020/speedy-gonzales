// src/lib/roleManagement.ts

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function assignSuperAdminRole(userId: string) {
  const supabase = createServerComponentClient({ cookies });

  // First, check if the user already has the super_admin role
  const { data: existingRole, error: checkError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'super_admin')
    .single();

  if (checkError) {
    console.error('Error checking existing role:', checkError);
    throw checkError;
  }

  if (existingRole) {
    console.log('User is already a super admin');
    return { message: 'User is already a super admin' };
  }

  // If not, insert the super_admin role
  const { data, error } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role: 'super_admin' });

  if (error) {
    console.error('Error assigning super admin role:', error);
    throw error;
  }

  return { message: 'Super admin role assigned successfully' };
}

// Example usage in a server component or API route
async function handleAssignSuperAdmin(userId: string) {
  try {
    const result = await assignSuperAdminRole(userId);
    console.log(result.message);
    // Handle success (e.g., show a success message to the user)
  } catch (error) {
    console.error('Failed to assign super admin role:', error);
    // Handle error (e.g., show an error message to the user)
  }
}