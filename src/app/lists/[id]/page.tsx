import PersonCard from '@/components/cards/personcard';
import NavBar from '@/components/nav/navBar';
import { createClient } from '@/lib/supabase/supabase-server';

export default async function ListPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: id, error } = await supabase.rpc('get_list_id_from_short_id', {
    shortid: params.id,
  });

  console.log(id);

  if (error) {
    console.log(error);
  }

  const { data } = await supabase
    .from('list_participants')
    .select('*, profiles(full_name), lists(list_name)')
    .eq('list_id', id?.id);

  console.log(data);
  return (
    <>
      <NavBar />

      <div className="flex flex-col justify-around content-center items-center mt-4 mr-4">
        <h1 className="text-bold text-2xl text-[--dark-blue-3] text-center">
          {data[0].lists.list_name}
        </h1>
        <p className="h-12 w-1/2 flex  items-center justify-center text-[--blue-2] border-2 border-[--blue-2] rounded-lg">
          List code: {params.id}
        </p>
      </div>
      {data?.map((person) => {
        return <PersonCard person={person} key={person.participant_id} />;
      })}
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
