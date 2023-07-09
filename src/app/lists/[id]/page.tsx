import ClipboardCopy from '@/components/buttons/clipboardCopy';
import PersonCard from '@/components/cards/personcard';
import NavBar from '@/components/nav/navBar';
import ListParticipants from '@/components/sections/listParticipants';
import { createClient } from '@/lib/supabase/supabase-server';
import { headers } from 'next/headers';

export default async function ListPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { id, list_name },
    error,
  } = await supabase.rpc('get_list_from_short_id', {
    shortid: params.id,
  });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
  }
  const { data } = await supabase.rpc('get_list_participants', {
    list_id_param: id,
    profile_id_param: user.id,
  });

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-around content-center items-center mt-4 mr-4">
        <h1 className="text-bold text-2xl text-[--dark-blue-3] text-center underline decoration-[--blue-2] decoration-2 underline-offset-4 mb-2   ">
          {list_name}
        </h1>

        <ClipboardCopy copyText={params.id} />
      </div>
      {/* <p className="text-end m-2">People to add: {count - 1}</p> */}
      <ListParticipants data={data} />
    </>
  );
}

// Will need to make sure only pages for list with data are created
// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json());

//     return posts.map((post) => ({
//       slug: post.slug,
//     }));
// }
