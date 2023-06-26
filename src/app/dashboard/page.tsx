import NavBar from '@/components/nav/navBar';
import HostedLists from '@/components/sections/hostedLists';
import Lists from '@/components/sections/lists';
import JoinList from '@/components/sections/joinList';

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
