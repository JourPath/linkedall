import PersonCard from '@/components/buttons/personcard';
import NavBar from '@/components/nav/navBar';
import { createClient } from '@/lib/supabase/supabase-server';
import Link from 'next/link';

export default async function ListPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('list_participants')
    .select('*, profiles(full_name)')
    .eq('list_id', params.id);

  if (error) {
    console.log(error, '<<< error');
  }
  const listName = params.id;
  console.log(params);
  const listShortId = params.short_id;
  return (
    <>
      <NavBar />
      <div>Page for {listName}</div>
      {data?.map((person) => {
        return <PersonCard person={person} />;
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
