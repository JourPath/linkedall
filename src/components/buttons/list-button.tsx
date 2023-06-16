'use client';

import { List_Id } from '@/utils/types/collections.types';
import Link from 'next/link';

const deleteList = async (list_id: List_Id) => {
  console.log(list_id);
  const response = await fetch('http://localhost:3000/api/lists', {
    method: 'PATCH',
    body: JSON.stringify({ list_id }),
  });
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
};

const ListButton = ({ list }) => {
  return (
    <>
      <Link href={`/lists/${list.id}`}>{list.list_name}</Link>
      <button onClick={() => deleteList(list.list_id)}>X</button>
    </>
  );
};

export default ListButton;