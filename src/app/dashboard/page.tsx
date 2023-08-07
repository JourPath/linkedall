import HostedLists from '@/components/sections/hosted-lists';
import Lists from '@/components/sections/lists';
import JoinList from '@/components/sections/join-list';

export default function Dashboard() {
  return (
    <main className="">
      <div className="lg:grid lg:grid-cols-3 lg:mx-8 lg:gap-4 ">
        <div>
          <img
            src="/Dashcard-1.png"
            alt="Create a new list for people to join"
            className="w-full rounded text-[--white]"
          />
          {/* @ts-expect-error Async Server Component */}
          <HostedLists />
        </div>
        <div>
          <img
            src="/Dashcard-2.png"
            alt="See all the lists you have already joined"
            className="w-full rounded text-[--white]"
          />
          {/* @ts-expect-error Async Server Component */}
          <Lists />
        </div>
        <div>
          <img
            src="/Dashcard-3.png"
            alt="Join an existing list by entering
their list code"
            className="w-full rounded text-[--white]"
          />
          <JoinList />
        </div>
      </div>
    </main>
  );
}
