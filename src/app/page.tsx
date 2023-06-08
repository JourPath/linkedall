import NavBar from '@/components/nav/navbar';
import Link from 'next/link';
import SignUpForm from '../components/forms/sign-up-form';

export default async function Home() {
  return (
    <main className="flex flex-col items-center bg-[--white] text-[--dark-blue-3]">
      <NavBar />
      <section id="hero" className="my-8 px-4">
        <h1 className="font-bold text-6xl my-4 text-left">
          Connect with <span className="text-[--blue-2]">All</span> your
          contacts
        </h1>
        <p className=" text-left my-4">
          Create and join a list of connections so you can all connect after
          your event
        </p>
        <Link className="flex-1" href="#get-started" passHref>
          <button className="bg-[--blue-2] rounded-full text-[--white] py-4 w-11/12 ">
            Get Started
          </button>
        </Link>
      </section>
      {/* Some sort of carousel showing how it works */}
      {/* Section explaining with link to page on how it works in detail */}
      {/* Static sections showing features */}
      {/* Testimonials */}
      <section id="get-started" className="my-8 px-4">
        <h2 className="font-bold text-5xl text-left">Create a list now</h2>
        <p className="my-5 text-left">
          Sign up with LinkedIn to get started right away
        </p>
        <SignUpForm />
      </section>
      {/* Footer */}
    </main>
  );
}
