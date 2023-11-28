"use server";

import { createClient } from "@/lib/supabase/supabase-server";
import { redirect } from "next/navigation";

// Email and Password
export const signUpWithEmail = async (email: string, password: string) => {
  const supabase = await createClient();
  const result = await supabase.auth.signUp({
    email,
    password,
  });

  return JSON.stringify(result);
};

export const signInWithEmail = async (email: string, password: string) => {
  const supabase = await createClient();
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return JSON.stringify(result);
};

// Generic
export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
};

export const verifyOTP = async (email: string, token: string) => {
  const supabase = await createClient();
  const result = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  return result;
};
