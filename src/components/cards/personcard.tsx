'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PersonCard({ person }) {
  const [checked, setChecked] = useState(false);

  const handleChange = async (connection_id) => {
    checked
      ? await removedConnection(connection_id)
      : await addConnection(connection_id);
    setChecked(!checked);
    // const connections = await fetch('http://localhost:3000/api/connections', {
    //   method: 'GET',
    // });
    // const data = await connections.json();
    // console.log(data);
  };

  const handleClick = async (connection_id) => {
    if (!checked) {
      await addConnection(connection_id);
      setChecked(true);
    }
  };

  const addConnection = async (connection_id) => {
    const connections = await fetch('http://localhost:3000/api/connections', {
      method: 'POST',
      body: JSON.stringify({ connection_id }),
    });
    const data = await connections.json();
    console.log(data);
  };

  const removedConnection = async (connection_id) => {
    const connections = await fetch('http://localhost:3000/api/connections', {
      method: 'PUT',
      body: JSON.stringify({ connection_id }),
    });
    console.log(connections);
    const data = await connections.json();
    console.log(data);
  };

  return (
    <div>
      <div className="bg-[--light-blue-1] rounded-full m-2 flex flex-row justify-between h-16 items-center px-4">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-12 h-12 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <Link href={`https://linkedin.com/in/martinswdev`} target="blank">
          <button onClick={() => handleClick(person.participant_id)}>
            {person.profiles.full_name}
          </button>
        </Link>
        <div className="flex items-center">
          <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleChange(person.participant_id)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            Connected
          </label>
        </div>
      </div>
    </div>
  );
}
