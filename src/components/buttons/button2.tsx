'use client';

import { useAuth } from '../providers/supabase-auth-provider';

export default function Button2() {
  const { user } = useAuth();
  async function createList() {
    const response = await fetch('http://localhost:3000/api/lists', {
      method: 'POST',
      body: JSON.stringify({ user }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  return <button onClick={createList}>Create List</button>;
}
