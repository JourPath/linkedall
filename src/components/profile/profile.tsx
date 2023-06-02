'use client';

import { useAuth } from '../providers/supabase-auth-provider';

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <>
      <div>Hello {user?.full_name}</div>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
}
