"use client";

import { useState, useEffect } from "react";
import PersonCard from "../cards/person-card";
import { useAuth } from "@/utils/providers/supabase-auth-provider";
import { get_list_participants } from "@/utils/types/collections.types";
import { useSearchParams } from "next/navigation";

export default function ListParticipants({
  data,
  listId,
}: {
  data: get_list_participants["Returns"];
  listId: string;
}) {
  const [lp, setlp] = useState(data);
  const [joinListError, setJoinListError] = useState<string | null>(null);
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const newTrue = searchParams.get("new");

  useEffect(() => {
    const joinList = async () => {
      const response = await fetch("https://www.linkedall.online/api/join", {
        method: "PUT",
        body: JSON.stringify({ shortId: listId }),
      });
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

    if (newTrue) {
      joinList();
    }
  }, [newTrue]);

  return (
    <section>
      {joinListError && <p>Error: {joinListError}</p>}
      {lp
        ?.sort((a, b) => Number(a.connection) - Number(b.connection))
        .map((person) => {
          if (person.participant_id !== user?.id) {
            return (
              <PersonCard
                person={person}
                key={person.participant_id}
                setlp={setlp}
                lp={lp}
              />
            );
          }
        })}
    </section>
  );
}
