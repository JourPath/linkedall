"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteList, leaveList } from "../../_actions/list-actions";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LeaveList({
  listId,
  hostId,
  userId,
}: {
  listId: string;
  hostId: string;
  userId: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleLeave() {
    const response =
      hostId === userId ? await deleteList(listId) : await leaveList(listId);
    if (response?.error) {
      toast({
        title: "Uh oh! Something went wrong",
        description: response.error,
        variant: "destructive",
      });
    } else if (response?.message) {
      toast({
        title: "Success!",
        description: response.message,
        variant: "default",
      });
      router.push("/dashboard");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
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
            className="lucide lucide-more-horizontal"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
          <span className="sr-only">Open List Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Manage List</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={handleLeave}>
            <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
              {hostId === userId ? "Delete List" : "Leave List"}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
