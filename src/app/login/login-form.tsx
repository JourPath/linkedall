'use client';

import { useAuth } from '@/components/providers/supabase-auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail, signInWithLinkedIn, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signInWithEmail(email, password);
      if (error) {
        setError(error);
      }
    } catch (error) {
      console.log('Something went wrong!');
    }
  };

  // Check if there is a user
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  return (
    <div>
      <p className="font-bold">Login Form</p>
      <button onClick={signInWithLinkedIn}>Sign In With LinkedIn</button>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div>{error}</div>}
        <button type="submit">Sign In With Email</button>
      </form>
    </div>
  );
};

export default LoginForm;
