import Profile from '@/components/profile/profile';
import Button2 from '@/components/buttons/button2';
import ListDisplay from './list-display';
export default function Dashboard() {
  return (
    <section>
      <h2>Dashboard</h2>
      <Profile />
      {/* @ts-expect-error Async Server Component */}
      <ListDisplay />
      <Button2 />
    </section>
  );
}
