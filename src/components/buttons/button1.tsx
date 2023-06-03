'use client';

export default function Button1() {
  async function createList() {
    const response = await fetch('http://localhost:3000/api/lists', {
      method: 'GET',
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  return <button onClick={createList}>Get Lists</button>;
}
