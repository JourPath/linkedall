import Link from 'next/link';

export default async function Home() {
  return (
    <main>
      <Link href="/login">Login Page</Link>
      <Link href="/signup">Sign Up Page</Link>
    </main>
  );
}
