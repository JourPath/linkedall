'use client';

import { useState } from 'react';
import PersonCard from '../cards/personcard';
import { useAuth } from '@/utils/providers/supabase-auth-provider';

export default function ListParticipants({ data }) {
  const [lp, setlp] = useState(data);
  const { user } = useAuth();
  return (
    <section>
      {lp
        ?.sort((a, b) => a.connection - b.connection)
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
