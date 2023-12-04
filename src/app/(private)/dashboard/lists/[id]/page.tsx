import ClipboardCopy from "@/app/(private)/dashboard/_components/_buttons/clipboard-copy";
import ListShareButtons from "@/app/(private)/dashboard/_components/_buttons/list-share-buttons";
import ListParticipants from "@/app/(private)/dashboard/_components/_displays/list-participants";
import { getList } from "../../_actions/list-actions";
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
    <section className="lg:grid lg:grid-cols-2 lg:mx-8 lg:gap-4 ">
      <div>
        <div className="flex flex-col justify-around content-center items-center mt-4 mr-4">
          <h1 className="text-bold text-2xl text-[--dark-blue-3] text-center underline decoration-[--blue-2] decoration-2 underline-offset-4 mb-2   ">
            {list.list_name as string}
          </h1>
          <ClipboardCopy copyText={params.id} />
          <ListShareButtons listName={list.list_name} />
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
      </div>
      <div className="mt-28 text-[--white] font-bold font-josefin">
        <p className="bg-[--blue-1] rounded p-2 my-2">
          Here you will see all the people in this list{" "}
        </p>
        <p className="bg-[--blue-1] rounded p-2 my-2">
          Everybody can see everybody else
        </p>
        <p className="bg-[--blue-1] rounded p-2 my-2">
          Click them to open their LinkedIn and add / follow them there
        </p>
        <p className="bg-[--blue-1] rounded p-2 my-2">
          Keep track of who you have added with the checkbox
        </p>
        <p className="bg-[--blue-1] rounded p-2 my-2">
          Clicking them automatically checks them off
        </p>
        <p className="bg-[--blue-1] rounded p-2 my-2">
          Advised to only add a max of 5 a day as LinkedIn doesn&apos;t like you
          adding too many at once
        </p>
      </div>
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
