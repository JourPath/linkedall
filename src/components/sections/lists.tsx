import { createClient } from '@/lib/supabase/supabase-server';
import ListCard from '../cards/listCard';
import { headers } from 'next/headers';
import Link from 'next/link';

const getLists = async () => {
  const response = await fetch('http://localhost:3000/api/lists', {
    method: 'GET',
    headers: headers(),
  });
  const data = await response.json();
  return data;
};

// const getLists = async () => {
//   const supabase = createClient();
//   const { data: user } = await supabase.auth.getUser();
//   const { data, error } = await supabase
//     .from('list_participants')
//     .select('list_id, lists(list_name)')
//     .eq('participant_id', user.user?.id);
//   if (error) {
//     console.log(error);
//   } else {
//     return data;
//   }
// };

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
        {lists.data?.map((list) => {
          return <ListCard key={list.list_id} list={list} />;
        })}
      </div>
    </>
  );
}
