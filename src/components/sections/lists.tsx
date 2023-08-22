import ListCard from '../cards/list-card';

type Lists = {
  list_id: string;
  lists: {
    list_name: string | null;
    short_id: string;
  } | null;
}[];

export default function Lists({ lists }: { lists: Lists }) {
  return (
    <section>
      <div className="bg-[--light-blue-2] h-12 flex flex-row items-center justify-between rounded-t-lg mt-4 lg:mx-0">
        <h3 className="font-bold text-2xl w-3/4 px-2 text-[--dark-blue-3]">
          Lists
        </h3>
      </div>
      <div className="flex flex-col bg-[--white] px-2 mb-4 rounded-b-lg lg:mx-0">
        {lists?.map((list) => {
          return <ListCard key={list?.list_id} list={list} />;
        })}
      </div>
    </section>
  );
}
