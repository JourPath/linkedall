"use client";

import { createClient } from "@/lib/supabase/supabase-browser";
import ListCard from "../cards/list-card";
// import { headers } from 'next/headers';
import { useEffect, useState } from "react";

type List =
  | {
      list_id: string;
      lists: {
        list_name: string | null;
        short_id: string;
      } | null;
    }[]
  | undefined;

export default async function Lists() {
  const [lists, setLists] = useState<List>([]);
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  useEffect(() => {
    const getLists = async () => {
      const { data, error } = await supabase
        .from("list_participants")
        .select("list_id, lists(list_name, short_id)")
        .eq("participant_id", user?.user?.id);

      if (error) {
        console.log(error);
      } else {
        setLists(data);
      }
      // const response = await fetch('https://www.linkedall.online/api/lists', {
      //   method: 'GET',
      // headers: headers(),
      // });
      // const data = await response.json();
    };
    getLists();
  }, [user]);

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
