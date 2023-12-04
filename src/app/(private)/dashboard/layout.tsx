import { ModeToggle } from "@/components/mode-toggle";
import { NotificationButton } from "@/components/notification-button";
import { createClient } from "@/lib/supabase/supabase-server";
import { ProfileViewer } from "./_components/_sections/profile-viewer";
import { Sidebar } from "./_components/_sections/sidebar";
import { UserNav } from "./_components/user-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    return <div>Error fetching user 4</div>;
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
    .select()
    .eq("id", user?.id)
    .limit(1)
    .single();

  if (!lists.data || !hostedLists.data) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <main className="grid lg:grid-cols-12">
        <div className="lg:col-span-2 bg-sidebar">
          <Sidebar lists={lists.data} hostedLists={hostedLists.data} />
        </div>
        <div className="lg:col-span-7">{children}</div>
        <div className="lg:col-span-3">
          <div className="flex justify-between gap-4 m-4 p-2">
            <NotificationButton />
            <ModeToggle />
            <UserNav profile={profile.data} />
          </div>
          <ProfileViewer profile={profile.data} />
        </div>
      </main>
    </>
  );
}
