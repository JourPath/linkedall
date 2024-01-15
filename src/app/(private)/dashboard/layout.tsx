import { ModeToggle } from "@/components/mode-toggle";
import { NotificationButton } from "@/components/notification-button";
import Footer from "@/components/sections/footer";
import { createClientServer } from "@/lib/supabase/supabase-server";
import ProfileProvider from "@/utils/context/profile-context";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileDisplay from "./_components/_displays/profile-display";
import { ProfileViewer } from "./_components/_sections/profile-viewer";
import { Sidebar } from "./_components/_sections/sidebar";
import { UserNav } from "./_components/user-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const supabase = await createClientServer(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const user = session?.user;

  if (!user) {
    return <div>Error fetching user 4</div>;
  }
  const lists = await supabase
    .from("list_participants")
    .select("list_id, lists(list_name, short_id, host_id)")
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

  if (!profile.data) {
    return <div>Error fetching profile</div>;
  }

  return (
    <ProfileProvider>
      {profile.data?.full_name && profile.data?.linked_in ? (
        <main className="grid lg:grid-cols-12">
          <div className="lg:col-span-2 bg-sidebar">
            <Sidebar
              lists={lists.data}
              hostedLists={hostedLists.data}
              userId={user.id}
            />
          </div>
          <div className="lg:col-span-7">{children}</div>
          <div className="lg:col-span-3">
            <div className="flex justify-between gap-4 m-4 p-2">
              <NotificationButton />
              <ModeToggle />
              <UserNav profile={profile.data} />
            </div>
            <ProfileViewer profile={profile.data} user={user} />
          </div>
        </main>
      ) : (
        <ProfileDisplay profile={profile.data} editable={true} />
      )}
      <Footer />
    </ProfileProvider>
  );
}
