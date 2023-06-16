import { createClient } from '@/lib/supabase/supabase-server';
import ListCard from '../cards/listCard';
import { headers } from 'next/headers';

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
    <div className="bg-[--light-blue-2]">
      <h3 className="font-bold text-2xl">Lists</h3>
      <p>Display lists here</p>
      <div className="flex flex-col bg-[--white] border-x-2 border-b-2 border-[--dark-blue-3] px-2 mx-4">
        {lists.data?.map((list) => {
          return <ListCard key={list.list_id} list={list} />;
        })}
      </div>
    </div>
  );
}
