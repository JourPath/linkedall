'use client';

import { useState } from 'react';
import PersonCard from '../cards/personcard';

export default function ListParticipants({ data }) {
  const [lp, setlp] = useState(data);
  return (
    <section>
      {lp
        ?.sort((a, b) => a.connection - b.connection)
        .map((person) => {
          return (
            <PersonCard
              person={person}
              key={person.participant_id}
              setlp={setlp}
              lp={lp}
            />
          );
        })}
    </section>
  );
}
