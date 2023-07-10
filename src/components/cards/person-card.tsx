'use client';

import { createClient } from '@/lib/supabase/supabase-browser';
import { useAuth } from '@/utils/providers/supabase-auth-provider';
import Link from 'next/link';
import { useState } from 'react';

type Person = {
  list_id: string;
  participant_id: string;
  full_name: string;
  avatar_url: string;
  linked_in: string;
  created_at: string;
  connection: boolean;
};

type LP = {
  list_id: string;
  participant_id: string;
  full_name: string;
  avatar_url: string;
  linked_in: string;
  created_at: string;
  connection: boolean;
}[];

export default function PersonCard({
  person,
  setlp,
  lp,
}: {
  person: Person;
  setlp: Function;
  lp: LP;
}) {
  const [checked, setChecked] = useState(person.connection);
  const { user } = useAuth();
  const supabase = createClient();
  const list_id = person.list_id;

  const getConnection = async (person: Person, list_id: string) => {
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .eq('profile_id', user?.id)
      .eq('list_id', list_id)
      .eq('connection_id', person.participant_id);
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const handleChange = async (connection_id: string, list_id: string) => {
    if (connection_id != user?.id) {
      checked
        ? await removedConnection(connection_id, list_id)
        : await addConnection(connection_id, list_id);
      const currentlp = lp.findIndex(
        (participant) => participant.participant_id === connection_id
      );
      const updatedlp = { ...lp[currentlp], connection: !checked };
      const newlp = [
        ...lp.slice(0, currentlp),
        updatedlp,
        ...lp.slice(currentlp + 1),
      ];
      setlp(newlp);
    }
  };

  const handleClick = async (connection_id: string, list_id: string) => {
    if (!checked) {
      await addConnection(connection_id, list_id);
      setChecked(true);
    }
  };

  const addConnection = async (connection_id: string, list_id: string) => {
    setChecked(true);
    const connections = await fetch('https://www.linkedall.online/api/connections', {
      method: 'POST',
      body: JSON.stringify({ connection_id, list_id }),
    });
    const data = await connections.json();
  };

  const removedConnection = async (connection_id: string, list_id: string) => {
    setChecked(false);
    const connections = await fetch('https://www.linkedall.online/api/connections', {
      method: 'PUT',
      body: JSON.stringify({ connection_id, list_id }),
    });
    const data = await connections.json();
  };

  return (
    <div>
      <div
        className={` rounded-full m-2 flex flex-row justify-between h-16 items-center px-4 border-2 ${
          checked
            ? 'border-[--grey] bg-[--light-blue-1]'
            : 'border-[--light-blue-3] bg-[--light-blue-2]'
        }`}
      >
        <div
          className={`relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
        >
          {person.avatar_url ? (
            <img
              className={` ${checked ? 'grayscale' : ''} rounded-full`}
              src={person.avatar_url}
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className=""
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <p>{person.full_name}</p>
        <Link
          href={`https://linkedin.com/in/${person.linked_in}`}
          target="blank"
        >
          <button onClick={() => handleClick(person.participant_id, list_id)}>
            Connect
          </button>
        </Link>
        <div className="flex items-center">
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleChange(person.participant_id, list_id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </label>
        </div>
      </div>
    </div>
  );
  // }
}
