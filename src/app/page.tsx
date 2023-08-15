import Link from 'next/link';
import GetStarted from '@/components/sections/get-started';
import Image from 'next/image';

export default async function Home() {
  return (
    <main className="flex flex-col items-center text-left bg-[--white] text-[--dark-blue-3]">
      <section id="hero" className="flex flex-row my-8 px-4">
        <div>
          <h1 className="font-bold text-6xl my-4 text-left">
            Connect with <span className="text-[--blue-2]">All</span>
            <br></br> your contacts
          </h1>
          <p className="text-left text-2xl my-12">
            Create and join a list of connections<br></br> so you can all
            connect with eachother<br></br> on LinkedIn
          </p>
          <Link className="flex-1" href="#get-started" passHref>
            <button className="bg-[--blue-2] rounded-full text-[--white] py-4 w-11/12 ">
              Get Started
            </button>
          </Link>
        </div>
        <Image
          src="/Connect.png"
          alt="three business people looking at camera"
          className="hidden lg:block"
          width={400}
          height={400}
        />
      </section>
      {/* Some sort of carousel showing how it works */}
      {/* Section explaining with link to page on how it works in detail */}
      {/* Static sections showing features */}
      {/* Testimonials */}
      <GetStarted />
    </main>
  );
}
