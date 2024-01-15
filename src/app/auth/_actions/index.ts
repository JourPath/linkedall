"use server";

import { createClientAction } from "@/lib/supabase/supabase-action";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema, signUpSchema } from "./schema";

// Email and Password
export const signUpWithEmail = async (
  formData: z.infer<typeof signUpSchema>
) => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  const { error } = await supabase.auth.signUp({
    email: formData.emailAddress,
    password: formData.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    return { error: error.message };
  } else {
    return { success: true };
  }
};

export const logInWithEmail = async (
  formData: z.infer<typeof signInSchema>
) => {
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.emailAddress,
    password: formData.password,
  });

  if (error) {
    return { error: error.message };
  }

  return redirect("/dashboard");
};

export const verifyOTP = async (email: string, token: string) => {
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  if (error) return { error: error.message };
  else return redirect("/dashboard");
};

// Generic
export const signOut = async () => {
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  const response = await supabase.auth.signOut();
  if (response.error) {
  } else {
    return redirect("/login");
  }
};

// LinkedIn
export const signUpWithLinkedIn = async () => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) return { error: error.message };
  else return redirect(data.url);
};

export const logInWithLinkedIn = async () => {
  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = await createClientAction(cookieStore);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "linkedin_oidc",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) return { error: error.message };
  else return redirect(data.url);
};
