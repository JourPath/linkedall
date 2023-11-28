import { readUserSession } from "@/lib/supabase/actions";
import { createClient } from "@/lib/supabase/supabase-server";
import Link from "next/link";

export default async function HostedListButton() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await readUserSession();
  if (!session) return <></>;

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user?.id)
    .single();

  if (data?.linked_in) {
    return (
      <Link className="min-w-[35%] w-auto" href="/lists/create" passHref>
        <button className="bg-[--blue-2] h-12 rounded-tr-lg px-2 w-full whitespace-nowrap flex items-center justify-around">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6 text-[--white] inline font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p className="hidden lg:inline text-[--white] text-xl whitespace-nowrap">
            New List
          </p>
        </button>
      </Link>
    );
  } else {
    return <></>;
  }
}
