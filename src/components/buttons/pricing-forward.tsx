'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PricingForward() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/profile');
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <p>
        You will be shortly transferred to your profile, otherwise click below.
      </p>
      <Link href={`/profile`} className="w-full h-12 justify-center flex">
        <button className="bg-[--blue-2] rounded-full text-[--white] h-12 w-1/2 my-4">
          Go to Profile
        </button>
      </Link>
    </>
  );
}
