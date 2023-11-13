'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import VerificationInput from 'react-verification-input';

const SignUpForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const { signUpWithEmail, signUpWithLinkedIn, verifyOTP } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');
  const listId = searchParams.get('listid');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signUpWithEmail(email, password, plan, listId);
      if (error) {
        setError(error);
      } else {
        setConfirm(true);
      }
    } catch (error) {
      console.log('Something went wrong!');
    }
  };

  const handleConfirm = async (token: string) => {
    setError(null);
    try {
      const error = await verifyOTP(email, token);
      if (error) {
        setError(error);
      } else {
        router.push(
          `auth/callback?plan=${plan}&&listid=${listId}&&signup=true`
        );
      }
    } catch (error) {
      console.log('Something went wrong!');
    }
  };

  return (
    <div className="text-center rounded-xl bg-[--light-blue-1]">
      <img src="/LinkedAll_blue_logo.svg" className="w-16 inline py-4" />
      <h3 className="font-bold text-2xl pb-4 ">
        {confirm ? 'Confirm' : 'Get Started'}
      </h3>
      {confirm ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl p-4">
            Please check your inbox for a confirmation code and enter it below
          </p>
          <VerificationInput
            length={6}
            validChars="0-9"
            onChange={setToken}
            onComplete={(token) => handleConfirm(token)}
            classNames={{
              character: 'VIcharacter',
              container: 'VIcontainer',
            }}
          />
          {error && <div>{error}</div>}
        </div>
      ) : (
        <>
          <button
            className="bg-[--white] border-2 border-[--light-blue-2] font-medium rounded-full py-4 w-11/12 my-4 "
            onClick={() => signUpWithLinkedIn(plan, listId)}
          >
            <img src="/In-Blue-48.png" className="w-7 inline pr-2" />
            Sign Up With LinkedIn
          </button>
          <div className="flex flex-row items-center">
            <div className="flex-1 h-1 bg-[--light-blue-2] ml-4" />
            <div>
              <p className="flex-1 align-self-center px-4">or</p>
            </div>
            <div className="flex-1 h-1 bg-[--light-blue-2] mr-4" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center my-4
        "
            id="signUpForm"
          >
            <label className="self-start px-4 font-medium">Email Address</label>
            <input
              className="rounded-full py-4 px-4 w-11/12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="Enter your email "
            />
            <label className="self-start px-4 pt-2  font-medium">
              Password
            </label>
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
              className="bg-[--blue-2] rounded-full text-[--white] my-4 py-4 w-11/12"
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
            <p>
              Already signed up?
              <Link
                href={{
                  pathname: '/login',
                  query: { listid: listId },
                }}
              >
                Log in
              </Link>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default SignUpForm;
