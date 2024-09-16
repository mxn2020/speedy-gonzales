'use client'

// src/components/admin/UserManagement.tsx

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr'

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_details')
      .select('*');
    
    if (error) console.error('Error fetching users:', error);
    else setUsers(data || []);
    setLoading(false);
  }

  async function deleteUser(userId: string) {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) console.error('Error deleting user:', error);
    else fetchUsers();
  }

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.full_name}</td>
              <td>{user.roles.join(', ')}</td>
              <td>
                <button onClick={() => deleteUser(user.id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}