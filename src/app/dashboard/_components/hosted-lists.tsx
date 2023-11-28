import { List } from "@/utils/types/collections.types";
import HostedListButton from "./hosted-list-button";
import HostedListCard from "./hosted-list-card";

export default function HostedLists({ hostedLists }: { hostedLists: List[] }) {
  return (
    <section>
      <div className="bg-[--light-blue-2] h-12 flex flex-row items-center justify-between rounded-t-lg  mt-4 lg:mx-0">
        <h3 className="font-bold text-2xl w-3/4 px-2 text-[--dark-blue-3] whitespace-nowrap">
          Hosted Lists
        </h3>
        <HostedListButton />
      </div>
      <div className="flex flex-col bg-[--white] px-2  mb-4 rounded-b-lg lg:mx-0">
        {hostedLists?.map((list) => {
          return <HostedListCard key={list.id} list={list} />;
        })}
      </div>
    </section>
  );
}
