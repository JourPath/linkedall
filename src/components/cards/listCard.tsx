'use client';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
type IncomingList = {
  list_id: string;
  lists: {
    list_name: string;
    short_id: string;
  };
} | null;

export default function ListCard({ list }: { list: IncomingList }) {
  const leaveList = async (list_id: string) => {
    const response = await fetch('http://localhost:3000/api/participants', {
      method: 'PATCH',
      body: JSON.stringify({ list_id }),
    });
    const data = await response.json();
    return data;
  };
  return (
    <div className="bg-[--light-blue-1] rounded-full m-2 flex flex-row justify-between h-16 items-center pl-4">
      <div className="relative w-10 h-10 overflow-hidden dark:bg-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute w-10 h-10 text-[--blue-2] -left-1"
        >
          <path
            fillRule="evenodd"
            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <Link
        href={`/lists/${list?.lists.short_id}`}
        className="w-full h-12 justify-center flex"
      >
        <button className="text-lg font-medium text-[--dark-blue-3]">
          {list?.lists.list_name}
        </button>
      </Link>
      <Menu as="div" className="">
        <Menu.Button className="p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </Menu.Button>
        <Menu.Items>
          <Menu.Item
            as="div"
            className="absolute right-0 mt-2 mr-6 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-violet-500 text-white' : 'text-gray-900'
                } group flex w-full items-center rounded-md px-2 py-2 text-sm m-2`}
                onClick={() => leaveList(list?.list_id!)}
              >
                Leave List
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}
