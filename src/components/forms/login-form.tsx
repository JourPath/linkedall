"use client";

import { useAuth } from "@/utils/providers/supabase-auth-provider";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { signInWithEmail, signInWithLinkedIn } = useAuth();

  const searchParams = useSearchParams();
  const listId = searchParams.get("listid");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const error = await signInWithEmail(email, password, listId);
      if (error) {
        setError(error);
        setPassword("");
      }
    } catch (error) {
      console.log("Something went wrong!");
    }
  };

  return (
    <div className="text-center rounded-xl bg-[--light-blue-1]">
      <img
        src="/LinkedAll_blue_logo.svg"
        className="w-16 inline py-4"
        alt="LinkedAll Logo"
      />
      <h3 className="font-bold text-2xl pb-4 ">Log In</h3>
      <button
        className="bg-[--white] border-2 border-[--light-blue-2] font-medium rounded-full py-4 w-11/12 my-4"
        onClick={() => signInWithLinkedIn(listId)}
      >
        <img src="/In-Blue-48.png" className="w-7 inline pr-2" />
        Log In With LinkedIn
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
        id="loginForm"
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
        <label className="self-start px-4 pt-2  font-medium">Password</label>
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
          Log In
        </button>
        <p className="text-[--light-blue-3] text-xs">
          By clicking &quot;Sign Up&quot; I agree to LinkedAll&apos;s <br />
          <Link href="/policy/terms" target="_blank">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/policy/privacy" target="_blank">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          Not signed up yet?
          <Link
            href={{
              pathname: "/signup",
              query: { listid: listId },
            }}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
