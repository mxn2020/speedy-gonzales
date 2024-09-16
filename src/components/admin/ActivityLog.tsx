'use client'

// src/components/admin/ActivityLog.tsx

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr'

export function ActivityLog() {
  const [activities, setActivities] = useState([]);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  
  useEffect(() => {
    async function fetchActivities() {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) console.error('Error fetching activities:', error);
      else setActivities(data || []);
    }

    fetchActivities();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <ul className="space-y-2">
        {activities.map((activity) => (
          <li key={activity.id} className="text-sm">
            <span className="font-medium">{activity.user_email}</span> {activity.action} at{' '}
            {new Date(activity.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}