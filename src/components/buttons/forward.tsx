"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Forward({
  time,
  path,
}: {
  time: number;
  path: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${path}`);
    }, time);
    return () => clearTimeout(timer);
  });

  return (
    <>
      <p>You will be shortly transferred to {path} otherwise click below.</p>
      <Link href={`/profile`} className="w-full h-12 justify-center flex">
        <button className="bg-[--blue-2] rounded-full text-[--white] h-12 w-1/2 my-4">
          Go to {path}
        </button>
      </Link>
    </>
  );
}
