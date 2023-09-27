'use client';

import { Profile } from '@/utils/types/collections.types';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect } from 'react';
import useSWR from 'swr';
import { useSupabase } from './supabase-provider';
import { get_list_from_short_id } from '@/utils/types/collections.types';

interface ContextI {
  user: Profile | null | undefined;
  error: any;
  isLoading: boolean;
  mutate: any;
  signOut: () => Promise<void>;
  signInWithLinkedIn: () => Promise<void>;
  signUpWithLinkedIn: (plan: string | null) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    plan: string | null
  ) => Promise<string | null>;
  verifyOTP: (email: string, token: string) => Promise<string | null>;
  signInWithEmail: (
    email: string,
    password: string,
    listId: string
  ) => Promise<string | null>;
}

const Context = createContext<ContextI>({
  user: null,
  error: null,
  isLoading: true,
  mutate: null,
  signOut: async () => {},
  signInWithLinkedIn: async () => {},
  signUpWithLinkedIn: async (plan: string | null) => {},
  signUpWithEmail: async (
    email: string,
    password: string,
    plan: string | null
  ) => null,
  verifyOTP: async (email: string, token: string) => null,
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
      .from('profiles')
      .select('*')
      .eq('id', serverSession?.user?.id)
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
  } = useSWR(serverSession ? 'profile-context' : null, getUser);

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Sign up with LinkedIn
  const signUpWithLinkedIn = async (plan: string | null) => {
    await supabase.auth.signInWithOAuth({
      provider: 'linkedin',
      options: {
        redirectTo: `https://www.linkedall.online/auth/callback?plan=${plan}`,
      },
    });
  };

  // Sign In with LinkedIn  // Sign in with LinkedIn
  const signInWithLinkedIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'linkedin',
      options: {
        redirectTo: `https://www.linkedall.online/auth/callback`,
      },
    });
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
        emailRedirectTo: `https://www.linkedall.online/auth/callback?plan=${plan}`,
      },
    });

    if (error) {
      return error.message;
    }

    return null;
  };

  // verify sign up with email

  const verifyOTP = async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
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

  const processListId = async (user: any, listId: string) => {
    const result = await supabase.rpc('get_list_from_short_id', {
      shortid: listId,
    });
    if (result.error) {
      console.log(result.error);
      return;
    }
    const list = result.data as get_list_from_short_id['Returns'];
    const { id } = list[0];
    const { error } = await supabase
      .from('list_participants')
      .insert({ list_id: id, participant_id: user?.user?.id });
    if (error) {
      console.error('Error processing listId:', error);
    }
  };

  // Sign-In with Email
  const signInWithEmail = async (
    email: string,
    password: string,
    listId: string
  ) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return error.message;
    }

    if (user && listId) {
      await processListId(user, listId);
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
    signUpWithLinkedIn,
    signUpWithEmail,
    verifyOTP,
    signInWithEmail,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useAuth must be inside SupabaseAuthProvider');
  } else {
    return context;
  }
};
