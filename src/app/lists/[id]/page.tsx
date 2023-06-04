export default function ListPage({ params }: { params: { id: string } }) {
  const listName = params.id;
  return <div>Page for {listName}</div>;
}

// Will need to make sure only pages for list with data are created
// export async function generateStaticParams() {
//     const posts = await fetch('https://.../posts').then((res) => res.json());

//     return posts.map((post) => ({
//       slug: post.slug,
//     }));
// }
