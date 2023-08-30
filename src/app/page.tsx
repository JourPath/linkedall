import Link from 'next/link';
import GetStarted from '@/components/sections/get-started';
import Image from 'next/image';

export default async function Home() {
  return (
    <main className="flex flex-col items-center text-left bg-[--white] text-[--dark-blue-3]">
      <section id="hero" className="flex flex-row mt-16 px-4">
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
      <section id="how-steps" className="mt-16 px-4">
        <h2 className="text-5xl font-bold text-center my-8">
          How it works in 3 steps
        </h2>
        <div className="flex flex-row justify-center items-center content-center">
          <div className="flex flex-col items-center w-1/4 mx-2">
            <Image
              src="/create-1.png"
              alt="linkedall list created"
              width={200}
              height={200}
            />
            <h3 className="text-2xl font-bold my-4">Create</h3>
            <p className="text-xl text-center">
              Create a list for your group or event
            </p>
          </div>
          <div className="flex flex-col items-center w-1/4 mx-2">
            <Image
              src="/share-2.png"
              alt="linkedall list shared"
              width={200}
              height={200}
            />
            <h3 className="text-2xl font-bold my-4">Share</h3>
            <p className="text-xl text-center">
              Share the list code for people to join
            </p>
          </div>
          <div className="flex flex-col items-center w-1/4 mx-2">
            <Image
              src="/connect-3.png"
              alt="connect with eachother"
              width={200}
              height={200}
            />
            <h3 className="text-2xl font-bold my-4">Connect</h3>
            <p className="text-xl text-center">
              Once joined connect with them on LinkedIn
            </p>
          </div>
        </div>
      </section>
      <section id="manage" className="flex flex-row justify-center my-16 px-4">
        <Image
          src="/manage-4.png"
          alt="linkedall list with 3 people, 1 greyed out"
          className="hidden lg:block"
          width={400}
          height={400}
        />
        <div className="w-1/2">
          <h2 className="font-bold text-5xl my-4 text-left">
            Track your connections
          </h2>
          <p className="text-left text-2xl my-12">
            LinkedAll will keep help you manage who you have connected with and
            who you haven't
          </p>
          <Link className="flex-1" href="#get-started" passHref>
            <button className="bg-[--blue-2] rounded-full text-[--white] py-4 w-11/12 ">
              Get Started
            </button>
          </Link>
        </div>
      </section>
      {/* Static sections showing features */}
      <section id="features"></section>
      {/* Testimonials */}
      <GetStarted />
    </main>
  );
}
