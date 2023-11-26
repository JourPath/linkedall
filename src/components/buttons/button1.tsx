"use client";

export default function Button1() {
  async function createList() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/lists`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  }

  return <button onClick={createList}>Get Lists</button>;
}
