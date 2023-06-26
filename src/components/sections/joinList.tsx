'use client';

import { useState } from 'react';

export default function JoinList() {
  const [shortId, setShortId] = useState('');

  async function joinList() {
    const response = await fetch('http://localhost:3000/api/join', {
      method: 'PUT',
      body: JSON.stringify({ shortId }),
    });
    const data = await response.json();
    return data;
  }

  return (
    <>
      <div className="bg-[--white]  flex flex-row items-center justify-between rounded-full mx-2 mb-2 my-4">
        <input
          className="h-12 w-3/4 rounded-l-full bg-[--white] text-2xl p-2"
          value={shortId}
          type="text"
          placeholder="Enter code here"
          minLength={6}
          maxLength={10}
          onChange={(e) => {
            return setShortId(e.target.value.toUpperCase());
          }}
        ></input>
        <button
          onClick={joinList}
          className="bg-[--blue-2] rounded-r-full text-[--white] h-12 w-1/4"
        >
          Join List
        </button>
      </div>
    </>
  );
}
