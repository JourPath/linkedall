'use client';

import { useState } from 'react';
import PersonCard from '../cards/personcard';
import { useAuth } from '@/utils/providers/supabase-auth-provider';
import { get_list_participants } from '@/utils/types/collections.types';

export default function ListParticipants({
  data,
}: {
  data: get_list_participants['Returns'];
}) {
  const [lp, setlp] = useState(data);
  const { user } = useAuth();
  return (
    <section>
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
