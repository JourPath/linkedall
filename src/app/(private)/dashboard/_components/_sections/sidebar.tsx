import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/shadcn/utils";
import { List } from "@/utils/types/collections.types";
import Image from "next/image";
import Link from "next/link";

type ListAll = {
  list_id: string;
  lists: {
    list_name: string | null;
    short_id: string | null;
    host_id: string;
  } | null;
};
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  lists: ListAll[];
  hostedLists: List[];
  userId: string;
}

export function Sidebar({
  className,
  lists,
  hostedLists,
  userId,
}: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4 h-screen">
        <Link href="/">
          <Image
            className="block px-5"
            height={48}
            width={200}
            src="/LinkedAll_1000x200.svg"
            alt="LinkedAll Logo"
          />
        </Link>
        <div className="px-3 py-2">
          <Button variant="default" className="w-full justify-start " asChild>
            <Link href="/dashboard/new-list">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Create List
            </Link>
          </Button>
          <div className="mt-2 space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <Link href="/dashboard" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-layout-dashboard mr-2 h-4 w-4"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight flex items-center">
            <svg
              aria-labelledby="hosted-lists"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-user h-5 w-5 mr-2"
            >
              <title id="hosted-lists">Hosted Lists</title>
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <circle cx="12" cy="8" r="2" />
              <path d="M15 13a3 3 0 1 0-6 0" />
            </svg>
            Hosted Lists
          </h2>
          <ScrollArea className="h-[100px] px-1">
            <div className="space-y-1 p-2">
              {hostedLists?.map((list) => (
                <Button
                  key={list.short_id}
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <Link
                    href={`/dashboard/lists/${list.short_id}`}
                    className="flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-[--blue-2] mr-2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {list.list_name}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-book-marked h-5 w-5 mr-2"
            >
              <polyline points="10 2 10 10 13 7 16 10 16 2" />
              <title id="lists">Lists</title>
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            Lists
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              {lists?.map((list) => {
                if (list.lists?.host_id !== userId) {
                  return (
                    <Button
                      key={list.lists?.list_name}
                      variant="ghost"
                      className="w-full justify-start font-normal flex content-center "
                    >
                      <Link
                        href={`/dashboard/lists/${list.lists?.short_id}`}
                        className="flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-[--blue-2] mr-2"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                            clipRule="evenodd"
                          />
                        </svg>

                        {list.lists?.list_name}
                      </Link>
                    </Button>
                  );
                }
              })}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
