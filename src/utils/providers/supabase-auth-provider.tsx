"use client";

import { Profile } from "@/utils/types/collections.types";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { useSupabase } from "./supabase-provider";
import { revalidatePath } from "next/cache";

interface ContextI {
  user: Profile | null | undefined;
  error: any;
  isLoading: boolean;
  mutate: any;
  signOut: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    plan: string | null
  ) => Promise<string | null>;
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
}

const Context = createContext<ContextI>({
  user: null,
  error: null,
  isLoading: true,
  mutate: null,
  signOut: async () => {},
  signInWithLinkedIn: async () => {},
  signUpWithEmail: async (
    email: string,
    password: string,
    plan: string | null
  ) => null,
  signInWithEmail: async (email: string, password: string) => null,
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  // Get USER
  const getUser = async () => {
    const { data: user, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", serverSession?.user?.id)
      .single();
    if (error) {
      console.log(error);
      return null;
    } else {
      return user;
    }
  };

  // update user profile
  // const updateUserProfile = async () => {
  //   const { data: user, error } = await supabase
  //     .from('profiles')
  //     .select('*')
  //     .eq('id', serverSession?.user?.id)
  //     .single();
  //   if (error) {
  //     console.log(error);
  //     return null;
  //   } else {
  //     return user;
  //   }
  // };

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(serverSession ? "profile-context" : null, getUser);

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Sign in with LinkedIn
  const signInWithLinkedIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "linkedin",
      options: {
        redirectTo: "https://linkedall.online/auth/callback",
      },
    });
    router.refresh();
  };

  // Sign up with Email
  const signUpWithEmail = async (
    email: string,
    password: string,
    plan: string | null
  ) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `https://linkedall.online/auth/callback?plan=${plan}`,
      },
    });

    if (error) {
      return error.message;
    }

    return null;
  };

  // Example
  //   const handleSignUp = async () => {
  //     await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         emailRedirectTo: `${location.origin}/auth/callback`,
  //       },
  //     });
  //     router.refresh();
  //   };

  // Sign-In with Email
  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    return null;
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const exposed: ContextI = {
    user,
    error,
    isLoading,
    mutate,
    signOut,
    signInWithLinkedIn,
    signUpWithEmail,
    signInWithEmail,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be inside SupabaseAuthProvider");
  } else {
    return context;
  }
};
