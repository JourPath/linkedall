import Profile from '@/components/profile/profile';
import NavBar from '@/components/nav/navBar';
import HostedLists from '@/components/sections/hostedLists';
import Lists from '@/components/sections/lists';
import JoinList from '@/components/sections/joinList';

export default function Dashboard() {
  return (
    <main>
      <NavBar />
      <h1 className="font-bold text-5xl text-left p-4">Dashboard</h1>
      <JoinList />
      {/* @ts-expect-error Async Server Component */}
      <HostedLists />
      {/* @ts-expect-error Async Server Component */}
      <Lists />
      <Profile />
    </main>
  );
}
