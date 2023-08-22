'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import { useSupabase } from '@/utils/providers/supabase-provider';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HostedListButton() {
  const { user } = useAuth();
  const { supabase } = useSupabase();
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

  if (profileLoading) return <></>;

  if (profile?.linked_in || user?.linked_in) {
    return (
      <Link className="min-w-[35%] w-auto" href="/lists/create" passHref>
        <button className="bg-[--blue-2] h-12 rounded-tr-lg px-2 w-full whitespace-nowrap flex items-center justify-around">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-[--white] inline font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="hidden lg:inline text-[--white] text-xl whitespace-nowrap">
            New List
          </p>
        </button>
      </Link>
    );
  } else {
    return <></>;
  }
}
