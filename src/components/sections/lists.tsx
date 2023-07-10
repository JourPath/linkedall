'use client';

import { createClient } from '@/lib/supabase/supabase-browser';
import ListCard from '../cards/list-card';
// import { headers } from 'next/headers';
import { useAuth } from '@/utils/providers/supabase-auth-provider';

const getLists = async () => {
  const supabase = createClient();
  const { user } = useAuth();
  const { data, error } = await supabase
    .from('list_participants')
    .select('list_id, lists(list_name, short_id)')
    .eq('participant_id', user?.id);

  if (error) {
    console.log(error);
  } else {
    return data;
  }
  // const response = await fetch('https://www.linkedall.online/api/lists', {
  //   method: 'GET',
  // headers: headers(),
  // });
  // const data = await response.json();
};

type List = {
  list_id: string;
  lists: {
    list_name: string | null;
    short_id: string;
  } | null;
};

export default async function Lists() {
  const lists = await getLists();
  return (
    <>
      <div className="bg-[--light-blue-2] h-12 flex flex-row items-center justify-between rounded-t-lg mx-2 mt-4">
        <h3 className="font-bold text-2xl w-3/4 px-2 text-[--dark-blue-3]">
          Lists
        </h3>
      </div>
      <div className="flex flex-col bg-[--white] px-2 mx-2 mb-4 rounded-b-lg">
        {lists?.map((list) => {
          return <ListCard key={list?.list_id} list={list} />;
        })}
      </div>
    </>
  );
}
