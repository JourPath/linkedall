import ClipboardCopy from '@/components/buttons/clipboard-copy';
import ListShareButtons from '@/components/buttons/list-share-buttons';
import JoinList from '@/components/sections/join-list';
import ListParticipants from '@/components/sections/list-participants';
import { createClient } from '@/lib/supabase/supabase-server';
import {
  get_list_from_short_id,
  get_list_participants,
} from '@/utils/types/collections.types';

export default async function ListPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const result = await supabase.rpc('get_list_from_short_id', {
    shortid: params.id,
  });

  if (result.error) {
    console.log(result.error);
    return;
  }

  const list = result.data as get_list_from_short_id['Returns'];
  const { id, list_name } = list[0];
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('No user found');
    return;
  }

  const participantsResult = await supabase.rpc('get_list_participants', {
    list_id_param: id as string,
    profile_id_param: user?.id,
  });

  if (participantsResult.error) {
    console.log(participantsResult.error);
    return;
  }

  const data = participantsResult.data as get_list_participants['Returns'];

  return (
    <section className="lg:grid lg:grid-cols-2 lg:mx-8 lg:gap-4 ">
      <div>
        <div className="flex flex-col justify-around content-center items-center mt-4 mr-4">
          <h1 className="text-bold text-2xl text-[--dark-blue-3] text-center underline decoration-[--blue-2] decoration-2 underline-offset-4 mb-2   ">
            {list_name as string}
          </h1>
          <ClipboardCopy copyText={params.id} />
          <ListShareButtons listName={list_name} />
        </div>
        {/* <p className="text-end m-2">People to add: {count - 1}</p> */}
        {data.length == 0 ? (
          <JoinList listId={params.id} />
        ) : (
          <ListParticipants data={data} listId={params.id} />
        )}
      </div>
      <div className="mt-28 text-[--white] font-bold font-josefin">
        <p className="bg-[--blue-1] rounded p-2 my-2">
          Here you will see all the people in this list{' '}
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
          Advised to only add a max of 5 a day as LinkedIn doesn't like you
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
