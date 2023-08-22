import HostedLists from '@/components/sections/hosted-lists';
import Lists from '@/components/sections/lists';
import JoinList from '@/components/sections/join-list';
import DashTabs from '@/components/nav/dash-tabs';
import { createClient } from '@/lib/supabase/supabase-server';

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const lists = await supabase
    .from('list_participants')
    .select('list_id, lists(list_name, short_id)')
    .eq('participant_id', user?.id);

  const hostedLists = await supabase
    .from('lists')
    .select('*')
    .eq('host_id', user?.id);

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
          <JoinList />
        </div>
      </div>
    </main>
  );
}
