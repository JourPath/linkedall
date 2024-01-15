import ClipboardCopy from "@/app/(private)/dashboard/_components/_buttons/clipboard-copy";
import ListShareButtons from "@/app/(private)/dashboard/_components/_buttons/list-share-buttons";
import ListParticipants from "@/app/(private)/dashboard/_components/_displays/list-participants";
import { getList } from "../../_actions/list-actions";
import LeaveList from "../../_components/_buttons/leave-list-button";
import { JoinListNew } from "../../_components/join-list-new";

export default async function ListPage({ params }: { params: { id: string } }) {
  const list_response = await getList(params.id);

  if (list_response?.error) {
    throw new Error(list_response.error.message);
  } else if (list_response?.message) {
    throw new Error(list_response?.message);
  } else if (!list_response?.data) {
    throw new Error("No list data");
  }
  const { list, list_participants, user_id } = list_response?.data;

  return (
    <section className="">
      <div className="flex flex-col justify-around content-center items-center mt-4 mr-4">
        <h1 className="text-bold text-2xl text-[--dark-blue-3] text-center underline decoration-[--blue-2] decoration-2 underline-offset-4 mb-2   ">
          {list.list_name as string}
        </h1>
        <ClipboardCopy copyText={params.id} />
        <ListShareButtons listName={list.list_name} />
        <LeaveList listId={list.id} hostId={list.host_id} userId={user_id} />
      </div>
      {/* <p className="text-end m-2">People to add: {count - 1}</p> */}
      {list_participants.length == 0 ? (
        <JoinListNew />
      ) : (
        <ListParticipants
          data={list_participants}
          listId={params.id}
          userId={user_id}
        />
      )}
    </section>
  );
}

// Will need to make sure only pages for list with data are created
// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json());

//     return posts.map((post) => ({
//       slug: post.slug,
//     }));
// }
