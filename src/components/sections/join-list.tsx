'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import { useSupabase } from '@/utils/providers/supabase-provider';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function JoinList() {
  const { user, isLoading } = useAuth();
  const { supabase } = useSupabase();
  const [shortId, setShortId] = useState('');
  const [joinListError, setJoinListError] = useState<string | null>(null);
  const [profile, setProfile] = useState(user);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (user && !user.linked_in) {
      const getProfile = async () => {
        const profile = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user?.id)
          .single();
        setProfile(profile.data);
      };
      getProfile();
    }
    if (user) {
      setProfileLoading(false);
    }
  }, [user]);

  const joinList = async () => {
    try {
      const response = await fetch('https://www.linkedall.online/api/join', {
        method: 'PUT',
        body: JSON.stringify({ shortId }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An error occurred.');
      }
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setJoinListError(err.message);
      } else {
        setJoinListError('An unexpected error occurred.');
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (profileLoading) return <></>;

  if (!profile?.linked_in && !user?.linked_in) {
    return (
      <Link href="/profile">
        <p className="bg-amber-300 py-4 text-center w-full">
          Set LinkedIn URL to join lists
        </p>
      </Link>
    );
  }

  return (
    <div className="bg-[--white] h-12 flex flex-row items-center justify-between rounded-full  mb-2 my-4 lg:mx-0">
      <input
        className="h-12 w-3/4 rounded-l-full bg-[--white] text-xl p-2"
        value={shortId}
        type="text"
        placeholder="Enter code here"
        minLength={6}
        maxLength={10}
        onChange={(e) => {
          return setShortId(e.target.value.toUpperCase());
        }}
      />
      {joinListError && <p>Error: {joinListError}</p>}
      <button
        onClick={joinList}
        className="bg-[--blue-2] rounded-r-full text-[--white] h-12 w-1/4"
      >
        Join List
      </button>
    </div>
  );
}
