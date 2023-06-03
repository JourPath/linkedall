export default function ListPage({ params }: { params: { id: string } }) {
  const listName = params.id;
  return <div>Page for {listName}</div>;
}
