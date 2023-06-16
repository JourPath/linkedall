import { createClient } from '@/lib/supabase/supabase-server';
import ListButton from '@/components/buttons/list-button';
import Link from 'next/link';

const getHostedLists = async () => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser(); // <-- this works
  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('host_id', user?.user?.id);
  if (error) {
    console.log(error);
  } else {
    return data;
  }
};

export default async function HostedLists() {
  const lists = await getHostedLists();
  return (
    <>
      <div className="bg-[--light-blue-2] border-2 border-[--dark-blue-3] flex flex-row items-center justify-between rounded px-2 mx-2">
        <h3 className="font-bold text-2xl">Hosted Lists</h3>
        <Link className="" href="/lists/create" passHref>
          <button className="bg-[--blue-2] rounded-full text-[--white] p-2 m-2">
            Create List
          </button>
        </Link>
      </div>
      <div className="flex flex-col bg-[--white] border-x-2 border-b-2 border-[--dark-blue-3] px-2 mx-4">
        {lists?.map((list) => {
          return <ListButton key={list.id} list={list} />;
        })}
      </div>
    </>
  );
}
