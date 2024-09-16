'use client'

// src/components/admin/AssignSuperAdmin.tsx

import React, { useState } from 'react';

export function AssignSuperAdmin() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/assign-super-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to assign super admin role');
      }

      setMessage(data.message);
      setUserId('');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Assign Super Admin Role</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
          required
        />
        <button type="submit">Assign Super Admin Role</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}