import NavBar from '@/components/nav/navbar';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex flex-col text-center bg-[--light-blue-1]">
      <NavBar />
      <h1 className="font-bold text-6xl">
        Making sure you connect with everyone
      </h1>
      <p>
        Create and join a list of connections so you can all connect after your
        event
      </p>
      <Link className="flex-1" href="/login" passHref>
        <button className="bg-[--blue-2] rounded-lg text-[--white] p-2 ">
          Get Started
        </button>
      </Link>
      {/* Some sort of carousel showing how it works */}
      {/* Section explaining with link to page on how it works in detail */}
      {/* Static sections showing features */}
      {/* Testimonials */}
      {/* Get started form section */}
      {/* Footer */}
      <Link className="flex-1 " href="/signup">
        Sign Up Page
      </Link>
    </main>
  );
}
