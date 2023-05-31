'use client';

import { useEffect } from 'react';
import { supabase } from '../utils/supabase-client';

export default function Login() {
  useEffect(() => {
    supabase.auth.signInWithOAuth({
      provider: 'linkedin',
    });
  });

  return <div>Logging in</div>;
}
