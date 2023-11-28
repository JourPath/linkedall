import CreateListForm from "@/app/lists/_components/create-list-form";
import { createClient } from "@/lib/supabase/supabase-server";

export default async function CreateList() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user || !session) {
    return <div>Error fetching user</div>;
  }
  const profile = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  return (
    <section className="bg-[--light-blue-1] h-screen">
      <h2 className="font-bold text-5xl text-left p-4">Create List</h2>
      <CreateListForm user={profile.data} />
    </section>
  );
}
