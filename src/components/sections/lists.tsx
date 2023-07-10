import ListCard from '../cards/list-card';
import { headers } from 'next/headers';

const getLists = async () => {
  const response = await fetch('https://www.linkedall.online/api/lists', {
    method: 'GET',
    headers: headers(),
  });
  const data = await response.json();
  return data;
};

type ListResponse = {
  list_id: string;
  lists: {
    list_name: string;
    short_id: string;
  };
} | null;

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
        {lists.data?.map((list: ListResponse) => {
          return <ListCard key={list?.list_id} list={list} />;
        })}
      </div>
    </>
  );
}
