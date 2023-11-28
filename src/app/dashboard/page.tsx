import DashTabs from "@/app/dashboard/_components/dash-tabs";
import HostedLists from "@/app/dashboard/_components/hosted-lists";
import Lists from "@/app/dashboard/_components/lists";
import JoinList from "@/components/sections/join-list";
import { createClient } from "@/lib/supabase/supabase-server";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    return <div>Error fetching user</div>;
  }
  const lists = await supabase
    .from("list_participants")
    .select("list_id, lists(list_name, short_id)")
    .eq("participant_id", user?.id!);

  const hostedLists = await supabase
    .from("lists")
    .select("*")
    .eq("host_id", user.id);

  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (!lists.data || !hostedLists.data) {
    return <div>Error fetching data</div>;
  }

  return (
    <main className="">
      <DashTabs lists={lists.data} hostedLists={hostedLists.data} />
      <div className="hidden md:grid md:grid-cols-3 md:mx-8 md:gap-4 hidden md:block ">
        <div>
          <img
            src="/Dashcard-1.png"
            alt="Create a new list for people to join"
            className="w-full rounded text-[--white]"
          />
          <HostedLists hostedLists={hostedLists.data} />
        </div>
        <div>
          <img
            src="/Dashcard-2.png"
            alt="See all the lists you have already joined"
            className="w-full rounded text-[--white]"
          />
          <Lists lists={lists.data} />
        </div>
        <div>
          <img
            src="/Dashcard-3.png"
            alt="Join an existing list by entering
their list code"
            className="w-full rounded text-[--white]"
          />
          <JoinList profile={profile.data} />
        </div>
      </div>
    </main>
  );
}
