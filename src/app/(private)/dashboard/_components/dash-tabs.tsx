import { createClient } from "@/lib/supabase/supabase-server";
import { List } from "@/utils/types/collections.types";
import DashboardTabs from "./dashboard-tabs";
import Lists from "./lists";

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
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) {
    return <div>Error fetching user 3</div>;
  }

  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <DashboardTabs
      profile={profile.data}
      lists={lists}
      hostedLists={hostedLists}
    />
  );
}
