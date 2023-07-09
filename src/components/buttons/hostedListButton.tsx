'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import Link from 'next/link';

export default function HostedListButton() {
  const { user } = useAuth();

  if (user?.linked_in) {
    return (
      <Link className="w-1/4" href="/lists/create" passHref>
        <button className="bg-[--blue-2] h-12 rounded-tr-lg px-2 w-full">
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
        </button>
      </Link>
    );
  } else {
    return <></>;
  }
}
