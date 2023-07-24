'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { signUpWithEmail, signInWithLinkedIn } = useAuth();
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
    setEmail('');
    setPassword('');
  };

  return (
    <div className="text-center rounded-xl bg-[--light-blue-1] flex flex-col items-center">
      <div className="md:w-1/3 flex flex-col items-center md:my-8">
        <img src="/LinkedAll_blue_logo.svg" className="w-16 py-4" />
        <h3 className="font-bold text-2xl pb-4 ">Get Started</h3>
        <button
          className="bg-[--white] border-2 border-[--light-blue-2] font-medium rounded-full py-4 w-11/12 md:w-full my-4 "
          onClick={signInWithLinkedIn}
        >
          <img src="/In-Blue-48.png" className="w-7 inline pr-2" />
          Sign Up With LinkedIn
        </button>
        <div className="flex flex-row items-center w-full md:my-8">
          <div className="flex-1 h-1 bg-[--light-blue-2] ml-4 md:ml-0" />
          <div>
            <p className="flex-1 align-self-center px-4">or</p>
          </div>
          <div className="flex-1 h-1 bg-[--light-blue-2] mr-4 md:mr-0" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center my-4 md:w-full md:my-8
        "
          id="signUpForm"
        >
          <label className="self-start px-4 font-medium md:px-0">
            Email Address
          </label>
          <input
            className="rounded-full py-4 px-4 w-11/12 md:w-full md:mb-8"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email "
          />
          <label className="self-start px-4 pt-2  font-medium md:px-0">
            Password
          </label>
          <input
            className="rounded-full py-4 px-4 w-11/12 md:w-full md:mb-8"
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
            className="bg-[--blue-2] rounded-full text-[--white] my-4 py-4 w-11/12 md:w-full md:my-8"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-[--light-blue-3] text-xs">
            By clicking "Sign Up" I agree to LinkedAll's{' '}
            <Link href="/policy/terms" target="_blank">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/policy/privacy" target="_blank">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
