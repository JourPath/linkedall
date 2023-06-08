'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import Link from 'next/link';
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
    <div className="rounded-xl bg-[--light-blue-1]">
      <img src="./LinkedAll_blue_logo.svg" className="w-16 inline py-4" />
      <h3 className="font-bold text-2xl pb-4 ">Get Started</h3>
      <button
        className="bg-[--white] border-2 border-[--light-blue-2] font-medium rounded-full py-4 w-11/12 "
        onClick={signInWithLinkedIn}
      >
        <img src="./In-Blue-48.png" className="w-7 inline pr-2" />
        Sign Up With LinkedIn
      </button>
      <p>or</p>
      <form onSubmit={handleSubmit} className="">
        <label className="font-medium">Email Address</label>
        <input
          className="rounded-full py-4 px-4 w-11/12"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
          type="email"
          placeholder="Enter your email "
        />
        <label className="font-medium">Password</label>
        <input
          className="rounded-full py-4 px-4 w-11/12"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          type="password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
        />
        {error && <div>{error}</div>}
        <button
          className="bg-[--blue-2] rounded-full text-[--white] my-4 py-4 w-11/12 "
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-[--light-blue-3] text-xs">
          By clicking "Sign Up" I agree to LinkedAll's Terms and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
