import NavBar from '@/components/nav/nav-bar';
import HostedLists from '@/components/sections/hosted-lists';
import Lists from '@/components/sections/lists';
import JoinList from '@/components/sections/join-list';

export default function Dashboard() {
  return (
    <main>
      <NavBar />
      <JoinList />
      {/* @ts-expect-error Async Server Component */}
      <HostedLists />
      {/* @ts-expect-error Async Server Component */}
      <Lists />
    </main>
  );
}
