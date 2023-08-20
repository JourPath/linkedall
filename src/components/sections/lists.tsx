'use client';

import { createClient } from '@/lib/supabase/supabase-browser';
import ListCard from '../cards/list-card';
import { useEffect, useState } from 'react';

type Lists = {
  list_id: string;
  lists: {
    list_name: string | null;
    short_id: string;
  } | null;
}[];

export default function Lists() {
  const [lists, setLists] = useState<Lists | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const getLists = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { data, error } = await supabase
          .from('list_participants')
          .select('list_id, lists(list_name, short_id)')
          .eq('participant_id', user?.id);

        if (error) {
          throw error;
        }

        setLists(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };
    getLists();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <div className="bg-[--light-blue-2] h-12 flex flex-row items-center justify-between rounded-t-lg mx-2 mt-4 lg:mx-0">
        <h3 className="font-bold text-2xl w-3/4 px-2 text-[--dark-blue-3]">
          Lists
        </h3>
      </div>
      <div className="flex flex-col bg-[--white] px-2 mx-2 mb-4 rounded-b-lg lg:mx-0">
        {lists?.map((list) => {
          return <ListCard key={list?.list_id} list={list} />;
        })}
      </div>
    </section>
  );
}
