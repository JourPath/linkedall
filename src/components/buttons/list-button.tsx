'use client';

import { List_Id } from '@/utils/types/collections.types';
import Link from 'next/link';

const deleteList = async (list_id: List_Id) => {
  const response = await fetch('http://localhost:3000/api/lists', {
    method: 'PATCH',
    body: JSON.stringify({ list_id }),
  });
  const data = await response.json();
  return data;
};

const ListButton = ({ list }) => {
  return (
    <>
      <Link href={`/lists/${list.id}`}>
        <div className="">{list.list_name}</div>
      </Link>
      <button onClick={() => deleteList(list.list_id)}>X</button>
    </>
  );
};

export default ListButton;
