'use client';

import { useAuth } from '@/components/providers/supabase-auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { signUpWithEmail, user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signUpWithEmail(email, password);
      if (error) {
        setError(error);
      } else {
        router.push('/confirm');
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
      <p>Sign Up Form</p>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div>{error}</div>}
        <button type="submit">Sign Up With Email</button>
      </form>
    </div>
  );
};

export default SignUpForm;
