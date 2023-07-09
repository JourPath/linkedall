'use client';

import { useAuth } from '@/utils/providers/supabase-auth-provider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateListForm() {
  const [listName, setListName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/lists', {
        method: 'PUT',
        body: JSON.stringify({ user, listName }),
      });
      const data = await response.json();
      router.push('/dashboard');
    } catch (error) {
      console.log('Something went wrong!');
    }
  };

  return (
    <div className="text-center rounded-xl bg-[--light-blue-1]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center my-4
        "
        id="createListForm"
      >
        <label className="self-start px-4 font-medium">List Name</label>
        <input
          className="rounded-full py-4 px-4 w-11/12"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
          type="text"
          placeholder="Our New Group"
        />
        {error && <div>{error}</div>}
        <button
          className="bg-[--blue-2] rounded-full text-[--white] my-4 py-4 w-11/12"
          type="submit"
        >
          Create List
        </button>
      </form>
    </div>
  );
}
