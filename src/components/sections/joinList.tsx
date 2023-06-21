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
      <div className="bg-[--light-blue-2] border-2 border-[--dark-blue-3] flex flex-row items-center justify-between rounded px-2 mx-2 mb-2">
        <input
          value={shortId}
          type="text"
          onChange={(e) => {
            console.log(e.target.value);
            return setShortId(e.target.value);
          }}
        ></input>
        <button
          onClick={joinList}
          className="bg-[--blue-2] rounded-full text-[--white] p-2 m-2"
        >
          Join List
        </button>
      </div>
    </>
  );
}
