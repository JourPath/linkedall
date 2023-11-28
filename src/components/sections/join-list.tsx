"use client";

import { Profile } from "@/utils/types/collections.types";
import Link from "next/link";
import { useState } from "react";

interface Props {
  listId?: string;
  profile: Profile | null;
}

export default function JoinList({ profile, listId = "" }: Props) {
  const [shortId, setShortId] = useState<string | undefined>(listId);
  const [joinListError, setJoinListError] = useState<string | null>(null);

  const joinList = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/join`,
      {
        method: "PUT",
        body: JSON.stringify({ shortId }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.error) {
      if (
        data.error.message.includes(
          "new row violates row-level security policy"
        )
      ) {
        setJoinListError(
          `You have joined the maximum lists for your plan. Please upgrade to join more lists. 
          
          or
          
          This list has too many participants. Please contact the list creator to upgrade their plan.`
        );
      }
    } else {
      return data;
    }
  };

  if (!profile?.linked_in) {
    return (
      <Link href="/profile">
        <p className="bg-amber-300 py-4 text-center w-full">
          Set LinkedIn URL to join lists
        </p>
      </Link>
    );
  }

  return (
    <div>
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
        <button
          onClick={joinList}
          className="bg-[--blue-2] rounded-r-full text-[--white] h-12 w-1/4"
        >
          Join List
        </button>
      </div>
      {joinListError && <p>Error: {joinListError}</p>}
    </div>
  );
}
