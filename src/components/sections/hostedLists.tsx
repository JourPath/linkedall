import { createClient } from '@/lib/supabase/supabase-server';
import ListButton from '@/components/buttons/list-button';
import Link from 'next/link';
import ListCard from '../cards/listCard';
import HostedListCard from '../cards/hostedListCard';

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
      <div className="bg-[--light-blue-2] h-12 flex flex-row items-center justify-between rounded-t-lg mx-2 mt-4">
        <h3 className="font-bold text-2xl w-3/4 px-2 text-[--dark-blue-3]">
          Hosted Lists
        </h3>
        <Link className="w-1/4" href="/lists/create" passHref>
          <button className="bg-[--blue-2] h-12 rounded-tr-lg px-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-6 h-6 text-[--white] inline font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </Link>
      </div>
      <div className="flex flex-col bg-[--white] px-2 mx-2 mb-4 rounded-b-lg">
        {lists?.map((list) => {
          return <HostedListCard key={list.id} list={list} />;
        })}
      </div>
    </>
  );
}
