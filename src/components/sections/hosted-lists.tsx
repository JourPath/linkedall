'use client';

import { useState, useEffect } from 'react';
import HostedListCard from '../cards/hosted-list-card';
import HostedListButton from '../buttons/hosted-list-button';
import { List } from '@/utils/types/collections.types';
import { createClient } from '@/lib/supabase/supabase-browser';
import { useAuth } from '@/utils/providers/supabase-auth-provider';

const getHostedLists = async () => {
  const supabase = createClient();
  const { user } = useAuth();
  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('host_id', user?.id);
  if (error) {
    throw error;
  }

  return data;
};

export default async function HostedLists() {
  const [lists, setLists] = useState<List[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await getHostedLists();
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

    fetchLists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section>
      <div className="bg-[--light-blue-2] h-12 flex flex-row items-center justify-between rounded-t-lg mx-2 mt-4 lg:mx-0">
        <h3 className="font-bold text-2xl w-3/4 px-2 text-[--dark-blue-3] whitespace-nowrap">
          Hosted Lists
        </h3>
        <HostedListButton />
      </div>
      <div className="flex flex-col bg-[--white] px-2 mx-2 mb-4 rounded-b-lg lg:mx-0">
        {lists?.map((list) => {
          return <HostedListCard key={list.id} list={list} />;
        })}
      </div>
    </section>
  );
}
