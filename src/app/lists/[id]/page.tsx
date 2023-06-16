import { createClient } from '@/lib/supabase/supabase-server';

export default async function ListPage({ params }: { params: { id: string } }) {
  const supabase = createClient(req: NextRequest);
  console.log(params.id);
  const { data, error } = await supabase
    .from('list_participants')
    .select('profiles(full_name)')
    .eq('list_id', params.id);

  if (error) {
    console.log(error, '<<< error');
  }
  console.log(data);

  const listName = params.id;
  return (
    <>
      <div>Page for {listName}</div>;
      {data?.map((person) => {
        return <p>{person.profiles.full_name}</p>;
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
