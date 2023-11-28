import { createClient } from "@/lib/supabase/supabase-server";
import { List } from "@/utils/types/collections.types";
import { Tab } from "@headlessui/react";
import JoinList from "../../../components/sections/join-list";
import HostedLists from "./hosted-lists";
import Lists from "./lists";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Lists = {
  list_id: string;
  lists: {
    list_name: string | null;
    short_id: string;
  } | null;
}[];

export default async function DashTabs({
  lists,
  hostedLists,
}: {
  lists: Lists;
  hostedLists: List[];
}) {
  const tabs = ["Create", "View", "Join"];

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) {
    return <div>Error fetching user</div>;
  }

  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="w-full px-2 py-2 sm:px-0 md:hidden">
      <Tab.Group manual>
        <Tab.List className="flex space-x-1 rounded-xl bg-[--light-blue-2] p-1 mb-4">
          {tabs.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-[--white] shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <img
              src="/Dashcard-1.png"
              alt="Create a new list for people to join"
              className="w-full rounded text-[--white]"
            />
            <HostedLists hostedLists={hostedLists} />
          </Tab.Panel>
          <Tab.Panel>
            <img
              src="/Dashcard-2.png"
              alt="See all the lists you have already joined"
              className="w-full rounded text-[--white]"
            />
            <Lists lists={lists} />
          </Tab.Panel>
          <Tab.Panel>
            <img
              src="/Dashcard-3.png"
              alt="Join an existing list by entering
their list code"
              className="w-full rounded text-[--white]"
            />
            <JoinList profile={profile.data} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
