"use client";

import { Profile } from "@/utils/types/collections.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateListForm({ user }: { user: Profile | null }) {
  const [listName, setListName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const response = await fetch("https://www.linkedall.online/api/lists", {
      method: "PUT",
      body: JSON.stringify({ user, listName }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseJson = await response.json();
    if (responseJson.error) {
      if (
        responseJson.error.message.includes(
          "new row violates row-level security policy"
        )
      ) {
        setError(
          "You have reached maximum lists for your plan. Please upgrade to create more lists."
        );
      }
    } else {
      const { short_id } = responseJson;
      router.push(`/lists/${short_id}`);
    }
  };

  return (
    <div className="text-center rounded-xl bg-[--light-blue-1]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center my-4
        "
        id="createListForm"
      >
        <label className="self-start px-4 font-medium">List Name</label>
        <input
          className="rounded-full py-4 px-4 w-11/12"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          required
          type="text"
          placeholder="Our New Group"
        />
        {error && <div>{error}</div>}
        <button
          className="bg-[--blue-2] rounded-full text-[--white] my-4 py-4 w-11/12"
          type="submit"
        >
          Create List
        </button>
      </form>
    </div>
  );
}
