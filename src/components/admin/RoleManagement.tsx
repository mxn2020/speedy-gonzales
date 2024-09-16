'use client'

// src/components/admin/RoleManagement.tsx

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr'

export function RoleManagement() {
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function assignRole() {
    const { data, error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role });

    if (error) setMessage(`Error: ${error.message}`);
    else setMessage('Role assigned successfully');

    setUserId('');
    setRole('');
  }

  return (
    <div>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className="mr-2 p-2 border rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mr-2 p-2 border rounded"
      >
        <option value="">Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={assignRole} className="p-2 bg-blue-500 text-white rounded">
        Assign Role
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}